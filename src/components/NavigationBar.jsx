import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" dir="rtl" role="navigation" aria-label="القائمة الرئيسية" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center" aria-label="الصفحة الرئيسية - ثانوية برو">
          <img src="/logo.svg" alt="شعار ثانوية برو" width="40" height="40" className="me-2" />
          <span style={{ fontSize: '1.3rem' }}>ثانوية برو</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="فتح قائمة التنقل" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && user.role === 'student' && (
              <>
                <Nav.Link as={Link} to="/student/dashboard" aria-label="لوحة التحكم">لوحة التحكم</Nav.Link>
                <Nav.Link as={Link} to="/student/find-tutors" aria-label="البحث عن مدرسين">البحث عن مدرسين</Nav.Link>
                <Nav.Link as={Link} to="/student/bookings" aria-label="حجوزاتي">حجوزاتي</Nav.Link>
                <Nav.Link as={Link} to="/student/chat" aria-label="الرسائل">الرسائل</Nav.Link>
                <Nav.Link as={Link} to="/student/payment-methods" aria-label="طرق الدفع">طرق الدفع</Nav.Link>
              </>
            )}
            {user && user.role === 'tutor' && (
              <>
                <Nav.Link as={Link} to="/tutor/dashboard" aria-label="لوحة التحكم">لوحة التحكم</Nav.Link>
                <Nav.Link as={Link} to="/tutor/sessions" aria-label="الحصص">الحصص</Nav.Link>
                <Nav.Link as={Link} to="/tutor/students" aria-label="الطلاب">الطلاب</Nav.Link>
                <Nav.Link as={Link} to="/tutor/messages" aria-label="الرسائل">الرسائل</Nav.Link>
                <Nav.Link as={Link} to="/tutor/earnings" aria-label="الأرباح">الأرباح</Nav.Link>
                <Nav.Link as={Link} to="/tutor/payment-methods" aria-label="طرق الدفع">طرق الدفع</Nav.Link>
                <Nav.Link as={Link} to="/tutor/profile" aria-label="الملف الشخصي">الملف الشخصي</Nav.Link>
              </>
            )}
            {user && user.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin/dashboard" aria-label="لوحة التحكم">لوحة التحكم</Nav.Link>
                <Nav.Link as={Link} to="/admin/users" aria-label="المستخدمين">المستخدمين</Nav.Link>
                <Nav.Link as={Link} to="/admin/tutors" aria-label="مراجعة المدرسين">المدرسين</Nav.Link>
                <Nav.Link as={Link} to="/admin/bookings" aria-label="الحجوزات">الحجوزات</Nav.Link>
                <Nav.Link as={Link} to="/admin/reports" aria-label="التقارير">التقارير</Nav.Link>
                <Nav.Link as={Link} to="/admin/settings" aria-label="الإعدادات">الإعدادات</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown" align="end" aria-label="قائمة المستخدم">
                <NavDropdown.Item onClick={handleLogout} aria-label="تسجيل الخروج">
                  تسجيل الخروج
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" aria-label="تسجيل الدخول">تسجيل الدخول</Nav.Link>
                <Nav.Link as={Link} to="/register" aria-label="إنشاء حساب جديد">
                  <span className="btn btn-light btn-sm">إنشاء حساب</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
