import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight } from 'react-icons/fa';

function NotFound() {
  return (
    <Container className="py-5">
      <div className="text-center py-5">
        <div className="mb-4">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="h3 mb-3">الصفحة غير موجودة</h2>
          <p className="text-muted lead mb-4">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>
        </div>
        
        <div className="mb-5">
          <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <circle cx="150" cy="100" r="80" fill="#f8f9fa" />
            <path
              d="M110 90 Q 130 70, 150 90 Q 170 70, 190 90"
              stroke="#6c757d"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="130" cy="85" r="8" fill="#6c757d" />
            <circle cx="170" cy="85" r="8" fill="#6c757d" />
            <path
              d="M 120 130 Q 150 150, 180 130"
              stroke="#6c757d"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button as={Link} to="/" variant="primary" size="lg">
            <FaHome className="me-2" />
            العودة للرئيسية
          </Button>
          <Button onClick={() => window.history.back()} variant="outline-secondary" size="lg">
            <FaArrowRight className="me-2" />
            الرجوع للصفحة السابقة
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;
