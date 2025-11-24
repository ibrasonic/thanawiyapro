/**
 * Utility functions for the application
 */

/**
 * Format date to Arabic
 */
export function formatDate(dateString, includeTime = false) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  return date.toLocaleDateString('ar-EG', options);
}

/**
 * Format time to 12-hour format
 */
export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'م' : 'ص';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Format currency
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount).replace('EGP', 'جنيه');
}

/**
 * Format relative time (منذ ...)
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'الآن';
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  if (diffDays < 7) return `منذ ${diffDays} يوم`;
  if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسبوع`;
  if (diffDays < 365) return `منذ ${Math.floor(diffDays / 30)} شهر`;
  return `منذ ${Math.floor(diffDays / 365)} سنة`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate email
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate Egyptian phone number
 */
export function isValidPhone(phone) {
  const re = /^01[0-2,5]{1}[0-9]{8}$/;
  return re.test(phone);
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Calculate session end time
 */
export function calculateEndTime(startTime, durationHours) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationHours * 60;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

/**
 * Get status badge variant
 */
export function getStatusVariant(status) {
  const variants = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'danger',
    completed: 'info',
    approved: 'success',
    rejected: 'danger'
  };
  return variants[status] || 'secondary';
}

/**
 * Get status text in Arabic
 */
export function getStatusText(status) {
  const texts = {
    confirmed: 'مؤكدة',
    pending: 'قيد الانتظار',
    cancelled: 'ملغاة',
    completed: 'مكتملة',
    approved: 'موافق عليه',
    rejected: 'مرفوض'
  };
  return texts[status] || status;
}

/**
 * Calculate platform statistics
 */
export function calculateStats(data) {
  const users = data.users || [];
  const bookings = data.bookings || [];
  const transactions = data.transactions || [];

  const students = users.filter(u => u.role === 'student');
  const tutors = users.filter(u => u.role === 'tutor');
  const activeTutors = tutors.filter(t => t.approved);
  const completedSessions = bookings.filter(b => b.status === 'completed');
  const totalRevenue = transactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    totalStudents: students.length,
    totalTutors: tutors.length,
    activeTutors: activeTutors.length,
    pendingTutors: tutors.filter(t => !t.approved).length,
    totalSessions: bookings.length,
    completedSessions: completedSessions.length,
    pendingSessions: bookings.filter(b => b.status === 'pending').length,
    totalRevenue,
    platformFee: totalRevenue * 0.15
  };
}

/**
 * Group items by key
 */
export function groupBy(array, key) {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * Sort array by date
 */
export function sortByDate(array, dateKey = 'createdAt', descending = true) {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);
    return descending ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Filter array by search term
 */
export function searchFilter(array, searchTerm, searchKeys = []) {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase().trim();
  
  return array.filter(item => {
    if (searchKeys.length === 0) {
      // Search all string values
      return Object.values(item).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(term)
      );
    }
    
    // Search specific keys
    return searchKeys.some(key => {
      const value = item[key];
      return typeof value === 'string' && value.toLowerCase().includes(term);
    });
  });
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if date is today
 */
export function isToday(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * Check if date is in future
 */
export function isFuture(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Get greeting based on time
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'صباح الخير';
  if (hour < 18) return 'مساء الخير';
  return 'مساء الخير';
}

/**
 * Calculate average rating
 */
export function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Format duration
 */
export function formatDuration(hours) {
  if (hours === 1) return 'ساعة واحدة';
  if (hours === 2) return 'ساعتان';
  if (hours < 1) return `${hours * 60} دقيقة`;
  return `${hours} ساعات`;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
