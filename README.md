# ThanawyiaPro (ثانوية برو) 🎓

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-purple.svg)](https://vitejs.dev)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**منصة تعليمية تربط طلاب الجامعة بطلاب الثانوية العامة لتوفير دروس خصوصية بأسعار معقولة**

A modern educational platform connecting university students with high school students to provide affordable private tutoring services.

---

## 📑 Table of Contents
- [Quick Start](#-quick-start)
- [Demo Accounts](#-demo-accounts--testing)
- [Key Features](#-key-features)
- [Application Pages](#-application-pages)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Testing Guide](#-testing-guide)
- [Data Management](#-data-management)
- [Advanced Features](#-advanced-features)
- [Available Commands](#-available-commands)
- [Future Development](#-future-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ibrasonic/thanawiyapro.git
cd thanawiyapro

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser at
http://localhost:5173
```

---

## 🔐 Demo Accounts & Testing

### Test Accounts

| Role | Email | Phone | Password |
|------|-------|-------|----------|
| **Student** | ahmed@student.thanawyiapro.com | 01012345678 | Student@123 |
| **Tutor** | mohamed@tutor.thanawyiapro.com | 01234567890 | Tutor@123 |
| **Admin** | admin@thanawyiapro.com | - | Admin@123 |

> **Note:** You can login using either email or phone number

### Student Account Details
- **Name:** أحمد محمد علي
- **Track:** علمي رياضة
- **Available Pages:**
  - `/student/dashboard` - Dashboard
  - `/student/find-tutors` - Find Tutors
  - `/student/tutor/:id` - Tutor Profile
  - `/student/bookings` - Booking Management
  - `/student/chat/:id` - Chat System
  - `/student/payment-methods` - Payment Methods
  - `/checkout` - Checkout Page

### Tutor Account Details
- **Name:** محمد حسن إبراهيم
- **University:** القاهرة (Cairo)
- **Major:** هندسة (Engineering)
- **Year:** الثالثة (Third)
- **Subjects:** الرياضيات، الفيزياء
- **Rate:** 60 EGP/hour
- **Rating:** 4.9/5
- **Students:** 15
- **Total Earnings:** 4,500 EGP
- **Available Pages:**
  - `/tutor/dashboard` - Dashboard
  - `/tutor/profile` - Profile
  - `/tutor/sessions` - Session Management
  - `/tutor/students` - Students List
  - `/tutor/earnings` - Earnings Report
  - `/tutor/messages` - Messages
  - `/tutor/payment-methods` - Payment Methods

### Admin Account Details
- **Available Pages:**
  - `/admin/dashboard` - Dashboard
  - `/admin/users` - User Management
  - `/admin/tutors` - Tutor Review & Approval
  - `/admin/bookings` - Booking Management
  - `/admin/reports` - Reports & Analytics
  - `/admin/settings` - Platform Settings

---

## ✨ Key Features

### 🎯 Three-Role System

#### 🎓 **For Students**
- 🔍 Search tutors by subject, price, and rating
- 📅 Book sessions and manage appointments
- 💬 Direct messaging with tutors
- ⭐ Rate tutors after sessions
- 💳 Manage payment methods (Instapay, Vodafone Cash, Credit Cards)
- ❤️ Add tutors to favorites
- 📊 Track statistics and bookings

#### 👨‍🏫 **For Tutors**
- 💰 Earnings dashboard with statistics
- 📆 Session and schedule management
- 👥 Student tracking
- 💳 Payment method management (Instapay, Vodafone Cash, Bank Account)
- 💬 Messaging system with students
- 📈 Performance and rating tracking

#### 👨‍💼 **For Admins**
- 📊 Comprehensive control dashboard
- ✅ Review and approve/reject new tutors
- 👥 User management (students and tutors)
- 📋 Booking management
- 📈 Detailed reports and analytics
- ⚙️ Platform settings

### 💎 Technical Features

✅ **Fully Responsive Design** - Works on all devices  
✅ **Lazy Loading** - Smart page loading  
✅ **Error Boundary** - Error handling  
✅ **Code Splitting** - Optimized code bundles  
✅ **Custom Hooks** - Reusable hooks  
✅ **API Service Layer** - Organized service layer  
✅ **Protected Routes** - Route protection  
✅ **Toast Notifications** - Interactive notifications  
✅ **WCAG 2.1 AA** - Accessibility compliance  
✅ **RTL Support** - Full Arabic language support  
✅ **Form Validation** - Input validation (Egyptian phone, email, strong password)

---

## 🧪 Testing Guide

### How to Test

1. **Start the Project**
   ```bash
   npm install
   npm run dev
   ```

2. **Open Browser**
   Navigate to: `http://localhost:5173`

3. **Login**
   - Click "تسجيل الدخول" (Login)
   - Choose login method (email or phone)
   - Use one of the test accounts above

### Testing Registration

#### Register as Student:
1. Go to `/register`
2. Select "طالب" (Student)
3. Fill in the data:
   - Name (minimum 3 characters)
   - Email (valid format)
   - Phone (11 digits starting with 010/011/012/015)
   - Password (8+ chars, uppercase, lowercase, numbers)
4. Choose track (علمي علوم, علمي رياضة, or أدبي)
5. Select subjects (based on track)
6. Complete registration

#### Register as Tutor:
1. Go to `/register`
2. Select "مدرس" (Tutor)
3. Fill basic information
4. Fill academic data:
   - University
   - Major
   - Academic year
5. Select subjects to teach
6. Set hourly rate (10-500 EGP)
7. Choose available days
8. Complete registration

**Note:** Tutor account will be pending until approved by admin.

### Testing Features

#### ✓ Payment System
1. Login as student
2. Go to "طرق الدفع" (Payment Methods)
3. Add new payment method:
   - Instapay (phone number)
   - Vodafone Cash (phone number)
   - Bank Card (16 digits)
4. Set default payment method
5. Book a session with a tutor
6. Default payment method will be auto-selected

#### ✓ Favorites
1. Login as student
2. Search for tutors
3. Click heart icon to add to favorites
4. Go to tutor page and click "أضف للمفضلة"
5. Status is saved across all pages

#### ✓ Bookings
1. Login as student
2. Go to "حجوزاتي" (My Bookings)
3. View bookings with different statuses:
   - Confirmed (can join)
   - Pending (can confirm payment)
   - Completed (can book again)
4. Click "تأكيد الدفع" for pending bookings
5. Default payment method auto-selected

#### ✓ Tutor Dashboard
1. Login as tutor
2. View statistics:
   - Monthly earnings
   - Number of sessions
   - Number of students
   - Average rating
3. Go to "الأرباح" (Earnings) to view charts
4. Go to "الرسائل" (Messages) to communicate with students
5. Go to "طرق الدفع" (Payment Methods) to manage bank accounts

#### ✓ Admin Dashboard
1. Login as admin
2. View platform statistics
3. Go to "مراجعة المدرسين" (Tutor Review)
4. Review new tutors and approve/reject
5. Go to "إدارة المستخدمين" (User Management)
6. Search users and modify their status

### Important Test Points

#### Navigation & Security
- ✅ Try accessing protected pages without login
- ✅ Try accessing pages of different roles (e.g., student accessing tutor page)
- ✅ Navigate between pages using menus
- ✅ Use browser back button

#### Responsive Design
- ✅ Test on large screen (Desktop)
- ✅ Test on tablet (768px-1024px)
- ✅ Test on mobile (< 768px)
- ✅ Verify menus display correctly

#### Accessibility
- ✅ Navigate with keyboard (Tab to navigate, Enter to click)
- ✅ Read text with screen reader
- ✅ Verify clear focus indicators
- ✅ Test contrast ratios

#### Functions
- ✅ Login and logout
- ✅ Register as student and tutor
- ✅ Search tutors with filters
- ✅ Book session
- ✅ Manage payment methods
- ✅ Add/remove from favorites
- ✅ Pay from bookings page

### 🐛 Bug Reporting

If you find any issues during testing:
1. Check Console in Developer Tools (F12)
2. Take screenshot of screen and error
3. Write steps to reproduce the issue
4. Report issue in [GitHub Issues](https://github.com/ibrasonic/thanawiyapro/issues)

---

## 📚 Application Pages

### 🌐 Public Pages (3)
- 🏠 Home Page
- 🔐 Login (email or phone)
- 📝 Register (student/tutor)

### 🎓 Student Dashboard (6)
- 📊 Dashboard
- 🔍 Find Tutors
- 👤 Tutor Profile
- 📅 Booking Management
- 💬 Chat System
- 💳 Payment Methods

### 👨‍🏫 Tutor Dashboard (6)
- 📊 Dashboard
- 👤 Profile
- 📆 Session Management
- 👥 Students
- 💰 Earnings
- 💬 Messages
- 💳 Payment Methods

### 👨‍💼 Admin Dashboard (6)
- 📊 Dashboard
- 👥 User Management
- ✅ Tutor Review
- 📋 Booking Management
- 📈 Reports & Analytics
- ⚙️ Platform Settings

### 💳 Payment System (1)
- 🛒 Checkout Page

### 🔍 Additional (1)
- ❌ 404 Page

**Total: 24 Complete Pages**

---

## 🛠️ Tech Stack

### Core
- **React** 18.3.1 - UI library
- **Vite** 6.0.7 - Build tool
- **React Router** 7.9.6 - Navigation

### UI Framework
- **Bootstrap** 5.3.8 - CSS framework
- **React Bootstrap** 2.10.10 - Bootstrap components for React
- **React Icons** 5.5.0 - Icon library

### Utilities
- **Chart.js** 4.5.1 + **react-chartjs-2** 5.3.1 - Charts
- **react-toastify** 11.0.5 - Notifications
- **bcryptjs** 3.0.3 - Password encryption
- **PropTypes** 15.8.1 - Type checking

### Dev Tools
- **ESLint** 9.39.1 - Code linting
- **Prettier** 3.6.2 - Code formatting
- **eslint-plugin-jsx-a11y** 6.10.2 - Accessibility linting

---

## 📂 Project Structure

```
thanawiyapro/
├── public/
│   ├── data.json              # Demo data
│   └── logo.svg               
├── src/
│   ├── components/            # Shared components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── NavigationBar.jsx
│   ├── pages/                 # Application pages
│   │   ├── student/          # 6 student pages
│   │   ├── tutor/            # 6 tutor pages
│   │   ├── admin/            # 6 admin pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Checkout.jsx
│   │   └── NotFound.jsx
│   ├── services/              # Service layer
│   │   └── api.js            # 26 API functions
│   ├── context/               # React Context
│   │   └── AuthContext.jsx
│   ├── utils/                 # Helper functions
│   │   ├── storage.js
│   │   └── helpers.js
│   ├── App.jsx               # Main component with ProtectedRoute
│   ├── main.jsx              # Entry point
│   ├── App.css               # App styles
│   └── index.css             # Global styles
├── .gitignore                # Git ignore file
├── index.html                # Main HTML file
├── package.json              # Project information
├── vite.config.js            # Vite configuration
├── LICENSE                   # MIT License
└── README.md                 # This file
```

---

## 💾 Data Management

- Demo data stored in `public/data.json`
- Data copied to `localStorage` on startup
- Data includes:
  - ✅ Users (students, tutors, admins)
  - ✅ Bookings
  - ✅ Messages
  - ✅ Reviews
  - ✅ Transactions
  - ✅ Notifications

### Important Notes
- All data is stored in `localStorage` for demo purposes
- Initial data loaded from `public/data.json`
- Can reset data by clearing `localStorage`
- Project works without a backend
- All accounts defined in `src/utils/storage.js`

---

## 🎨 Advanced Features

### Security
- ✅ Password encryption using bcrypt
- ✅ Role-based route protection
- ✅ Input validation (Egyptian phone, email)
- ✅ Strong password requirements (8+ chars, uppercase, lowercase, numbers)

### Performance
- ✅ Lazy loading for pages
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Caching strategy

### Accessibility (WCAG 2.1 AA)
- ✅ Screen reader support
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ ARIA labels for interactive elements
- ✅ Semantic HTML
- ✅ Clear focus indicators
- ✅ High contrast ratios for text

### Payment System
- ✅ Multiple payment methods support
  - 📱 Instapay (students and tutors)
  - 📱 Vodafone Cash (students and tutors)
  - 💳 Credit Cards (students only)
  - 🏦 Bank Account/IBAN (tutors only)
- ✅ Set default payment method
- ✅ Manage and delete payment methods
- ✅ Display platform fees (5% for students, 15% for tutors)
- ✅ Professional checkout page

---

## 🚀 Available Commands

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 Additional Resources

For detailed testing procedures and more information, all test accounts and features are documented above in the [Demo Accounts & Testing](#-demo-accounts--testing) and [Testing Guide](#-testing-guide) sections.

---

## 🌟 Future Development

### Backend Integration
- [ ] REST API (Node.js/Express or Django)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] JWT Authentication
- [ ] Real payment system (Stripe/PayPal/Fawry)
- [ ] Real-time notifications (WebSockets/Firebase)

### Enhancements
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Dark Mode
- [ ] Multi-language support (i18n)
- [ ] Advanced rating and review system
- [ ] Live video sessions
- [ ] Push notifications
- [ ] Advanced reports and analytics
- [ ] AI-powered tutor recommendations

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For any inquiries or suggestions:
- 📧 Email: ibrahim.m.badawy@gmail.com
- 🐛 Report issues: [GitHub Issues](https://github.com/ibrasonic/thanawiyapro/issues)

---

## 👏 Acknowledgments

- Bootstrap for the amazing framework
- React Icons for the icon library
- Chart.js for beautiful charts
- The open-source community

---

**Developed with ❤️ to improve education in Egypt**
