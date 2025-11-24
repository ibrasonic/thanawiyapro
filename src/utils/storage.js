// Initialize demo data
export const initializeDemoData = () => {
  // Always reinitialize to ensure correct data
  const demoUsers = [
    {
      id: 'student-001',
      email: 'ahmed@student.thanawyiapro.com',
      phone: '01012345678',
      password: 'Student@123',
      role: 'student',
      userType: 'student',
      name: 'أحمد محمد علي',
      track: 'علمي رياضة',
      bio: 'طالب في الصف الثالث الثانوي، أسعى للحصول على درجات عالية في الرياضيات والفيزياء',
      interests: ['الرياضيات', 'الفيزياء'],
      favoritesTutors: [],
      createdAt: new Date('2025-09-01').toISOString()
    },
    {
      id: 'student-002',
      email: 'sara@student.thanawyiapro.com',
      phone: '01123456789',
      password: 'Student@123',
      role: 'student',
      userType: 'student',
      name: 'سارة أحمد حسن',
      track: 'علمي علوم',
      bio: 'طالبة مجتهدة أحب الكيمياء والأحياء وأطمح للالتحاق بكلية الطب',
      interests: ['الكيمياء', 'الأحياء'],
      favoritesTutors: [],
      createdAt: new Date('2025-09-05').toISOString()
    },
    {
      id: 'tutor-001',
      email: 'mohamed@tutor.thanawyiapro.com',
      phone: '01234567890',
      password: 'Tutor@123',
      role: 'tutor',
      userType: 'tutor',
      name: 'محمد حسن إبراهيم',
      university: 'القاهرة',
      major: 'هندسة',
      year: 'الثالثة',
      teachingSubjects: ['الرياضيات', 'الفيزياء'],
      hourlyRate: 60,
      tutorBio: 'طالب هندسة بجامعة القاهرة، لدي خبرة سنتين في تدريس الرياضيات والفيزياء لطلاب الثانوية العامة. نجح جميع طلابي في الحصول على درجات أعلى من 85%',
      availability: ['السبت', 'الأحد', 'الاثنين', 'الأربعاء'],
      rating: 4.9,
      studentsCount: 15,
      totalEarnings: 4500,
      createdAt: new Date('2025-08-01').toISOString(),
      approved: true
    },
    {
      id: 'tutor-002',
      email: 'fatma@tutor.thanawyiapro.com',
      phone: '01345678901',
      password: 'Tutor@123',
      role: 'tutor',
      userType: 'tutor',
      name: 'فاطمة أحمد السيد',
      university: 'عين شمس',
      major: 'طب',
      year: 'الرابعة',
      teachingSubjects: ['الكيمياء', 'الأحياء'],
      hourlyRate: 70,
      tutorBio: 'طالبة طب بجامعة عين شمس، متخصصة في تدريس الكيمياء والأحياء بأسلوب مبسط وعملي. ساعدت أكثر من 20 طالب في الحصول على الدرجات النهائية',
      availability: ['الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
      rating: 5.0,
      studentsCount: 22,
      totalEarnings: 6800,
      createdAt: new Date('2025-07-15').toISOString(),
      approved: true
    },
    {
      id: 'admin-001',
      email: 'admin@thanawyiapro.com',
      password: 'Admin@123',
      role: 'admin',
      userType: 'admin',
      name: 'مسؤول النظام',
      createdAt: new Date('2025-01-01').toISOString()
    }
  ];

  localStorage.setItem('users', JSON.stringify(demoUsers));
};

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

// Get user by email or phone
export const getUserByEmailOrPhone = (identifier) => {
  const users = getUsers();
  return users.find(u => u.email === identifier || u.phone === identifier);
};

// Add new user
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

// Update user
export const updateUser = (userId, updates) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
  }
};

// Get user favorites
export const getUserFavorites = (userId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  return user?.favoritesTutors || [];
};

// Toggle favorite tutor
export const toggleFavoriteTutor = (userId, tutorId) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    const user = users[index];
    let favorites = user.favoritesTutors || [];
    
    if (favorites.includes(String(tutorId))) {
      favorites = favorites.filter(id => id !== String(tutorId));
    } else {
      favorites.push(String(tutorId));
    }
    
    users[index] = { ...user, favoritesTutors: favorites };
    localStorage.setItem('users', JSON.stringify(users));
    return favorites;
  }
  return [];
};
