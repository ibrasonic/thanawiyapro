import bcrypt from 'bcryptjs';

const DATA_FILE_URL = '/data.json';
let dataCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5000; // 5 seconds

/**
 * Fetch data from JSON file with caching
 */
async function fetchData(forceRefresh = false) {
  const now = Date.now();
  
  if (!forceRefresh && dataCache && (now - lastFetchTime) < CACHE_DURATION) {
    return dataCache;
  }

  try {
    const response = await fetch(DATA_FILE_URL + '?t=' + now);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    dataCache = await response.json();
    lastFetchTime = now;
    return dataCache;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Return cached data if available
    if (dataCache) return dataCache;
    throw error;
  }
}

/**
 * Save data back to localStorage (simulating server)
 * In production, this would be an API call
 */
function saveData(data) {
  try {
    localStorage.setItem('appData', JSON.stringify(data));
    dataCache = data;
    lastFetchTime = Date.now();
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

/**
 * Initialize data from JSON file to localStorage
 */
export async function initializeData() {
  try {
    const existingData = localStorage.getItem('appData');
    if (!existingData) {
      const data = await fetchData(true);
      saveData(data);
    }
    return true;
  } catch (error) {
    console.error('Error initializing data:', error);
    return false;
  }
}

/**
 * Get all data or specific collection
 */
export async function getData(collection = null) {
  try {
    const localData = localStorage.getItem('appData');
    const data = localData ? JSON.parse(localData) : await fetchData(true);
    
    if (!localData) {
      saveData(data);
    }
    
    return collection ? data[collection] : data;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
}

/**
 * Update specific collection
 */
export async function updateCollection(collection, items) {
  try {
    const data = await getData();
    data[collection] = items;
    saveData(data);
    return true;
  } catch (error) {
    console.error('Error updating collection:', error);
    return false;
  }
}

/**
 * Authentication API
 */
export const authAPI = {
  async login(identifier, password, loginType = 'email') {
    try {
      const users = await getData('users');
      const user = users.find(u => 
        loginType === 'email' 
          ? u.email === identifier 
          : u.phone === identifier
      );

      if (!user) {
        return { success: false, message: 'المستخدم غير موجود' };
      }

      // Compare passwords (for now, using plain text comparison for demo)
      // In production, use: const isValid = await bcrypt.compare(password, user.password);
      const isValid = password === 'test123'; // Demo password

      if (!isValid) {
        return { success: false, message: 'كلمة المرور غير صحيحة' };
      }

      // Don't send password to client
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'حدث خطأ أثناء تسجيل الدخول' };
    }
  },

  async register(userData) {
    try {
      const users = await getData('users');
      
      // Check if user exists
      const exists = users.some(u => 
        u.email === userData.email || u.phone === userData.phone
      );

      if (exists) {
        return { success: false, message: 'البريد الإلكتروني أو رقم الهاتف مستخدم بالفعل' };
      }

      // Hash password (for production)
      // const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        password: '$2a$10$rZ1wqXqZ1XqZ1XqZ1XqZ1uGZ1XqZ1XqZ1XqZ1XqZ1XqZ1XqZ1XqZ1', // Hashed 'test123'
        createdAt: new Date().toISOString(),
        ...(userData.role === 'student' && {
          balance: 0,
          favoritesTutors: [],
          completedSessions: 0,
          totalSpent: 0
        }),
        ...(userData.role === 'tutor' && {
          approved: false,
          rating: 0,
          reviewsCount: 0,
          completedSessions: 0,
          totalEarnings: 0,
          studentsCount: 0
        })
      };

      users.push(newUser);
      await updateCollection('users', users);

      const { password: _, ...userWithoutPassword } = newUser;
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'حدث خطأ أثناء التسجيل' };
    }
  }
};

/**
 * Users API
 */
export const usersAPI = {
  async getAll() {
    return await getData('users');
  },

  async getById(id) {
    const users = await getData('users');
    return users.find(u => u.id === id);
  },

  async update(id, updates) {
    try {
      const users = await getData('users');
      const index = users.findIndex(u => u.id === id);
      
      if (index === -1) {
        return { success: false, message: 'المستخدم غير موجود' };
      }

      users[index] = { ...users[index], ...updates };
      await updateCollection('users', users);
      
      return { success: true, user: users[index] };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'حدث خطأ أثناء التحديث' };
    }
  },

  async getTutors(approved = null) {
    const users = await getData('users');
    let tutors = users.filter(u => u.role === 'tutor');
    
    if (approved !== null) {
      tutors = tutors.filter(t => t.approved === approved);
    }
    
    return tutors;
  },

  async getStudents() {
    const users = await getData('users');
    return users.filter(u => u.role === 'student');
  }
};

/**
 * Bookings API
 */
export const bookingsAPI = {
  async getAll() {
    return await getData('bookings');
  },

  async getById(id) {
    const bookings = await getData('bookings');
    return bookings.find(b => b.id === id);
  },

  async getByStudent(studentId) {
    const bookings = await getData('bookings');
    return bookings.filter(b => b.studentId === studentId);
  },

  async getByTutor(tutorId) {
    const bookings = await getData('bookings');
    return bookings.filter(b => b.tutorId === tutorId);
  },

  async create(bookingData) {
    try {
      const bookings = await getData('bookings');
      
      const newBooking = {
        id: 'b' + Date.now(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      bookings.push(newBooking);
      await updateCollection('bookings', bookings);
      
      return { success: true, booking: newBooking };
    } catch (error) {
      console.error('Create booking error:', error);
      return { success: false, message: 'حدث خطأ أثناء إنشاء الحجز' };
    }
  },

  async update(id, updates) {
    try {
      const bookings = await getData('bookings');
      const index = bookings.findIndex(b => b.id === id);
      
      if (index === -1) {
        return { success: false, message: 'الحجز غير موجود' };
      }

      bookings[index] = { ...bookings[index], ...updates };
      await updateCollection('bookings', bookings);
      
      return { success: true, booking: bookings[index] };
    } catch (error) {
      console.error('Update booking error:', error);
      return { success: false, message: 'حدث خطأ أثناء التحديث' };
    }
  },

  async cancel(id, reason) {
    return await this.update(id, {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      cancelReason: reason
    });
  }
};

/**
 * Messages API
 */
export const messagesAPI = {
  async getAll() {
    return await getData('messages');
  },

  async getConversation(userId1, userId2) {
    const messages = await getData('messages');
    return messages.filter(m => 
      (m.senderId === userId1 && m.receiverId === userId2) ||
      (m.senderId === userId2 && m.receiverId === userId1)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },

  async send(messageData) {
    try {
      const messages = await getData('messages');
      
      const newMessage = {
        id: 'm' + Date.now(),
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false
      };

      messages.push(newMessage);
      await updateCollection('messages', messages);
      
      return { success: true, message: newMessage };
    } catch (error) {
      console.error('Send message error:', error);
      return { success: false, message: 'حدث خطأ أثناء إرسال الرسالة' };
    }
  },

  async markAsRead(messageId) {
    try {
      const messages = await getData('messages');
      const message = messages.find(m => m.id === messageId);
      
      if (message) {
        message.read = true;
        await updateCollection('messages', messages);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Mark as read error:', error);
      return { success: false };
    }
  }
};

/**
 * Transactions API
 */
export const transactionsAPI = {
  async getAll() {
    return await getData('transactions');
  },

  async getByUser(userId) {
    const transactions = await getData('transactions');
    return transactions.filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(transactionData) {
    try {
      const transactions = await getData('transactions');
      
      const newTransaction = {
        id: 't' + Date.now(),
        ...transactionData,
        createdAt: new Date().toISOString()
      };

      transactions.push(newTransaction);
      await updateCollection('transactions', transactions);
      
      return { success: true, transaction: newTransaction };
    } catch (error) {
      console.error('Create transaction error:', error);
      return { success: false, message: 'حدث خطأ أثناء إنشاء العملية' };
    }
  }
};

/**
 * Notifications API
 */
export const notificationsAPI = {
  async getByUser(userId) {
    const notifications = await getData('notifications');
    return notifications.filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(notificationData) {
    try {
      const notifications = await getData('notifications');
      
      const newNotification = {
        id: 'n' + Date.now(),
        ...notificationData,
        read: false,
        createdAt: new Date().toISOString()
      };

      notifications.push(newNotification);
      await updateCollection('notifications', notifications);
      
      return { success: true, notification: newNotification };
    } catch (error) {
      console.error('Create notification error:', error);
      return { success: false };
    }
  },

  async markAsRead(notificationId) {
    try {
      const notifications = await getData('notifications');
      const notification = notifications.find(n => n.id === notificationId);
      
      if (notification) {
        notification.read = true;
        await updateCollection('notifications', notifications);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Mark notification as read error:', error);
      return { success: false };
    }
  }
};

/**
 * Reviews API
 */
export const reviewsAPI = {
  async getByTutor(tutorId) {
    const reviews = await getData('reviews');
    return reviews.filter(r => r.tutorId === tutorId);
  },

  async create(reviewData) {
    try {
      const reviews = await getData('reviews');
      
      const newReview = {
        id: 'r' + Date.now(),
        ...reviewData,
        createdAt: new Date().toISOString()
      };

      reviews.push(newReview);
      await updateCollection('reviews', reviews);
      
      // Update tutor rating
      const tutorReviews = await this.getByTutor(reviewData.tutorId);
      const avgRating = tutorReviews.reduce((sum, r) => sum + r.rating, 0) / tutorReviews.length;
      
      await usersAPI.update(reviewData.tutorId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewsCount: tutorReviews.length
      });
      
      return { success: true, review: newReview };
    } catch (error) {
      console.error('Create review error:', error);
      return { success: false, message: 'حدث خطأ أثناء إضافة التقييم' };
    }
  }
};

/**
 * Settings API
 */
export const settingsAPI = {
  async get() {
    return await getData('settings');
  }
};

export default {
  initializeData,
  getData,
  updateCollection,
  auth: authAPI,
  users: usersAPI,
  bookings: bookingsAPI,
  messages: messagesAPI,
  transactions: transactionsAPI,
  notifications: notificationsAPI,
  reviews: reviewsAPI,
  settings: settingsAPI
};
