import { createContext, useContext, useState, useEffect } from 'react';
import { initializeDemoData } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize demo data
    initializeDemoData();
    
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, loginMethod = 'email') => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    let foundUser;
    if (loginMethod === 'email') {
      foundUser = users.find(u => u.email === email && u.password === password);
    } else {
      foundUser = users.find(u => u.phone === email && u.password === password);
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: 'بيانات الدخول غير صحيحة' };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'البريد الإلكتروني مسجل بالفعل' };
    }
    if (users.find(u => u.phone === userData.phone)) {
      return { success: false, message: 'رقم الهاتف مسجل بالفعل' };
    }

    const newUser = {
      id: `${userData.userType}_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
      role: userData.userType || 'student',
      // Add tutor-specific defaults
      ...(userData.userType === 'tutor' && {
        rating: 0,
        studentsCount: 0,
        totalEarnings: 0,
        approved: false // Tutors need admin approval
      })
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
