import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initializeData } from './services/api';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Eager load public pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Lazy load all dashboard pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'));
const FindTutors = lazy(() => import('./pages/student/FindTutors'));
const TutorProfile = lazy(() => import('./pages/student/TutorProfile'));
const BookingManagement = lazy(() => import('./pages/student/BookingManagement'));
const ChatSystem = lazy(() => import('./pages/student/ChatSystem'));
const StudentPaymentMethods = lazy(() => import('./pages/student/PaymentMethods'));

const TutorDashboard = lazy(() => import('./pages/tutor/Dashboard'));
const TutorProfilePage = lazy(() => import('./pages/tutor/Profile'));
const TutorSessions = lazy(() => import('./pages/tutor/Sessions'));
const TutorStudents = lazy(() => import('./pages/tutor/Students'));
const TutorEarnings = lazy(() => import('./pages/tutor/Earnings'));
const TutorMessages = lazy(() => import('./pages/tutor/Messages'));
const TutorPaymentMethods = lazy(() => import('./pages/tutor/PaymentMethods'));

const Checkout = lazy(() => import('./pages/Checkout'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminTutors = lazy(() => import('./pages/admin/Tutors'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminReports = lazy(() => import('./pages/admin/Reports'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

const NotFound = lazy(() => import('./pages/NotFound'));

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner fullScreen message="جاري التحميل..." />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppContent() {
  useEffect(() => {
    initializeData().catch(error => {
      console.error('Failed to initialize data:', error);
    });
  }, []);

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">الانتقال إلى المحتوى الرئيسي</a>
      <NavigationBar />
      <main id="main-content" role="main">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner fullScreen message="جاري التحميل..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            
              {/* Student Routes */}
              <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/find-tutors" element={<ProtectedRoute allowedRoles={['student']}><FindTutors /></ProtectedRoute>} />
              <Route path="/student/tutor/:id" element={<ProtectedRoute allowedRoles={['student']}><TutorProfile /></ProtectedRoute>} />
              <Route path="/student/bookings" element={<ProtectedRoute allowedRoles={['student']}><BookingManagement /></ProtectedRoute>} />
              <Route path="/student/chat/:tutorId" element={<ProtectedRoute allowedRoles={['student']}><ChatSystem /></ProtectedRoute>} />
              <Route path="/student/chat" element={<ProtectedRoute allowedRoles={['student']}><ChatSystem /></ProtectedRoute>} />
              <Route path="/student/payment-methods" element={<ProtectedRoute allowedRoles={['student']}><StudentPaymentMethods /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute allowedRoles={['student']}><Checkout /></ProtectedRoute>} />
            
            {/* Tutor Routes */}
            <Route path="/tutor/dashboard" element={<ProtectedRoute allowedRoles={['tutor']}><TutorDashboard /></ProtectedRoute>} />
            <Route path="/tutor/profile" element={<ProtectedRoute allowedRoles={['tutor']}><TutorProfilePage /></ProtectedRoute>} />
            <Route path="/tutor/sessions" element={<ProtectedRoute allowedRoles={['tutor']}><TutorSessions /></ProtectedRoute>} />
            <Route path="/tutor/students" element={<ProtectedRoute allowedRoles={['tutor']}><TutorStudents /></ProtectedRoute>} />
            <Route path="/tutor/earnings" element={<ProtectedRoute allowedRoles={['tutor']}><TutorEarnings /></ProtectedRoute>} />
            <Route path="/tutor/messages" element={<ProtectedRoute allowedRoles={['tutor']}><TutorMessages /></ProtectedRoute>} />
            <Route path="/tutor/payment-methods" element={<ProtectedRoute allowedRoles={['tutor']}><TutorPaymentMethods /></ProtectedRoute>} />
            
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/tutors" element={<ProtectedRoute allowedRoles={['admin']}><AdminTutors /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
