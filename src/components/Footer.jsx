import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();

  return (
    <footer className="bg-dark text-white py-5 mt-5" role="contentinfo">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h3 className="h5 fw-bold mb-3">ثانوية برو</h3>
            <p className="text-muted">
              منصة التعليم من الطلاب للطلاب - نربط طلاب الجامعة بطلاب الثانوية العامة لتوفير دروس خصوصية بأسعار معقولة
            </p>
          </Col>
          
          <Col md={2}>
            <h4 className="h6 fw-bold mb-3">روابط سريعة</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none hover-link">
                  الرئيسية
                </Link>
              </li>
              {!user ? (
                <>
                  <li className="mb-2">
                    <Link to="/login" className="text-muted text-decoration-none hover-link">
                      تسجيل الدخول
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/register" className="text-muted text-decoration-none hover-link">
                      إنشاء حساب
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-2">
                    <Link to="/student/dashboard" className="text-muted text-decoration-none hover-link">
                      لوحة التحكم
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/student/find-tutors" className="text-muted text-decoration-none hover-link">
                      البحث عن مدرسين
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/student/bookings" className="text-muted text-decoration-none hover-link">
                      حجوزاتي
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Col>
          
          <Col md={3}>
            <h4 className="h6 fw-bold mb-3">تواصل معنا</h4>
            <ul className="list-unstyled">
              <li className="mb-2 text-muted">
                البريد: info@thanawiyapro.com
              </li>
              <li className="mb-2 text-muted">
                الهاتف: 01000000000
              </li>
              <li className="mb-2 text-muted">
                العنوان: القاهرة، مصر
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h4 className="h6 fw-bold mb-3">تابعنا</h4>
            <div className="d-flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted hover-link"
                aria-label="فيسبوك"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted hover-link"
                aria-label="تويتر"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted hover-link"
                aria-label="انستجرام"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted hover-link"
                aria-label="لينكد إن"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 border-secondary" />
        
        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0">
              &copy; {currentYear} ThanawyiaPRO. جميع الحقوق محفوظة.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/terms" className="text-muted text-decoration-none hover-link me-3">
              الشروط والأحكام
            </Link>
            <Link to="/privacy" className="text-muted text-decoration-none hover-link">
              سياسة الخصوصية
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
