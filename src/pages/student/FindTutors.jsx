import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function FindTutors() {
  const [filters, setFilters] = useState({
    subject: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    availability: ''
  });
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'student') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      if (user && user.favoritesTutors) {
        setFavorites(user.favoritesTutors);
      }
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (tutorId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') {
      toast.error('يجب تسجيل الدخول كطالب لإضافة المدرسين للمفضلة');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return;

    const user = users[userIndex];
    let updatedFavorites = user.favoritesTutors || [];
    
    if (updatedFavorites.includes(String(tutorId))) {
      // Remove from favorites
      updatedFavorites = updatedFavorites.filter(id => id !== String(tutorId));
      toast.success('تم إزالة المدرس من المفضلة');
    } else {
      // Add to favorites
      updatedFavorites.push(String(tutorId));
      toast.success('تم إضافة المدرس للمفضلة');
    }

    users[userIndex] = { ...user, favoritesTutors: updatedFavorites };
    localStorage.setItem('users', JSON.stringify(users));
    setFavorites(updatedFavorites);
  };

  const tutors = [
    {
      id: 1,
      name: 'محمد أحمد علي',
      subjects: ['الرياضيات', 'الفيزياء'],
      rating: 4.9,
      price: 150,
      totalSessions: 120,
      university: 'جامعة القاهرة - كلية الهندسة',
      availability: 'متاح اليوم',
      image: '👨‍🏫'
    },
    {
      id: 2,
      name: 'سارة محمود حسن',
      subjects: ['الكيمياء', 'الأحياء'],
      rating: 4.8,
      price: 130,
      totalSessions: 95,
      university: 'جامعة عين شمس - كلية الطب',
      availability: 'متاح غداً',
      image: '👩‍🏫'
    },
    {
      id: 3,
      name: 'أحمد حسن محمد',
      subjects: ['اللغة الإنجليزية'],
      rating: 4.7,
      price: 120,
      totalSessions: 80,
      university: 'الجامعة الأمريكية - كلية الآداب',
      availability: 'متاح اليوم',
      image: '👨‍🎓'
    },
    {
      id: 4,
      name: 'فاطمة علي أحمد',
      subjects: ['اللغة العربية', 'التاريخ'],
      rating: 4.9,
      price: 110,
      totalSessions: 150,
      university: 'جامعة القاهرة - كلية الآداب',
      availability: 'متاح بعد غد',
      image: '👩‍🎓'
    },
    {
      id: 5,
      name: 'عمر محمد سعيد',
      subjects: ['الرياضيات'],
      rating: 4.6,
      price: 140,
      totalSessions: 65,
      university: 'جامعة الإسكندرية - كلية العلوم',
      availability: 'متاح اليوم',
      image: '👨‍🏫'
    },
    {
      id: 6,
      name: 'نور الدين أحمد',
      subjects: ['الفيزياء', 'الرياضيات'],
      rating: 4.8,
      price: 160,
      totalSessions: 110,
      university: 'جامعة القاهرة - كلية الهندسة',
      availability: 'متاح غداً',
      image: '👨‍🔬'
    }
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTutors = tutors.filter(tutor => {
    if (filters.subject && !tutor.subjects.includes(filters.subject)) return false;
    if (filters.minPrice && tutor.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && tutor.price > parseInt(filters.maxPrice)) return false;
    if (filters.rating && tutor.rating < parseFloat(filters.rating)) return false;
    return true;
  });

  return (
    <Container className="py-5">
      <section aria-labelledby="find-tutors-title">
        <Row className="mb-4">
          <Col>
            <h1 id="find-tutors-title" className="fw-bold">ابحث عن مدرسك الجامعي المثالي</h1>
            <p className="text-muted">استعرض {tutors.length} طالب جامعي متاح للتدريس - أسعار مخفضة تبدأ من 100 جنيه/ساعة</p>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Filters Sidebar */}
          <Col lg={3}>
            <Card className="shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
              <Card.Header className="bg-white border-bottom">
                <h2 className="h5 mb-0 fw-bold">الفلترة</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="subject-filter" className="fw-bold">المادة</Form.Label>
                    <Form.Select 
                      id="subject-filter"
                      name="subject" 
                      onChange={handleFilterChange}
                      aria-label="اختر المادة للبحث"
                    >
                      <option value="">جميع المواد</option>
                      <option value="الرياضيات">الرياضيات</option>
                      <option value="الفيزياء">الفيزياء</option>
                      <option value="الكيمياء">الكيمياء</option>
                      <option value="الأحياء">الأحياء</option>
                      <option value="اللغة العربية">اللغة العربية</option>
                      <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">السعر (جنيه/ساعة)</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          id="min-price"
                          type="number"
                          placeholder="من"
                          name="minPrice"
                          onChange={handleFilterChange}
                          aria-label="الحد الأدنى للسعر"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          id="max-price"
                          type="number"
                          placeholder="إلى"
                          name="maxPrice"
                          onChange={handleFilterChange}
                          aria-label="الحد الأقصى للسعر"
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="rating-filter" className="fw-bold">التقييم الأدنى</Form.Label>
                    <Form.Select 
                      id="rating-filter"
                      name="rating" 
                      onChange={handleFilterChange}
                      aria-label="اختر التقييم الأدنى"
                    >
                      <option value="">الكل</option>
                      <option value="4.5">4.5+ ⭐</option>
                      <option value="4.0">4.0+ ⭐</option>
                      <option value="3.5">3.5+ ⭐</option>
                    </Form.Select>
                  </Form.Group>

                  <Button 
                    variant="outline-secondary" 
                    className="w-100" 
                    onClick={() => setFilters({
                      subject: '', minPrice: '', maxPrice: '', rating: '', availability: ''
                    })}
                    aria-label="إعادة تعيين جميع الفلاتر"
                  >
                    إعادة تعيين
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Tutors Grid */}
          <Col lg={9}>
            <div role="status" className="visually-hidden" aria-live="polite">
              تم العثور على {filteredTutors.length} مدرس
            </div>
            <Row className="g-4">
              {filteredTutors.map(tutor => (
                <Col md={6} key={tutor.id}>
                  <article className="h-100">
                    <Card className="h-100 shadow-sm border-0 hover-shadow">
                      <Card.Body>
                        <div className="d-flex align-items-start mb-3">
                          <div className="fs-1 me-3" aria-hidden="true">{tutor.image}</div>
                          <div className="flex-grow-1">
                            <h3 className="h5 fw-bold mb-1">{tutor.name}</h3>
                            <p className="text-muted small mb-2">{tutor.university}</p>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="badge bg-warning text-dark" aria-label={`التقييم ${tutor.rating} من 5`}>
                                <span aria-hidden="true">⭐</span> {tutor.rating}
                              </span>
                              <span className="text-muted small">
                                ({tutor.totalSessions} جلسة)
                              </span>
                            </div>
                          </div>
                          <Button 
                            variant="link" 
                            className={`p-0 ${favorites.includes(String(tutor.id)) ? 'text-danger' : 'text-muted'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(tutor.id);
                            }}
                            aria-label={`${favorites.includes(String(tutor.id)) ? 'إزالة' : 'إضافة'} ${tutor.name} ${favorites.includes(String(tutor.id)) ? 'من' : 'إلى'} المفضلة`}
                            style={{ fontSize: '1.5rem' }}
                          >
                            <span aria-hidden="true">{favorites.includes(String(tutor.id)) ? '❤️' : '🤍'}</span>
                          </Button>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex flex-wrap gap-1 mb-2" role="list" aria-label="المواد التي يدرسها">
                            {tutor.subjects.map((subject, idx) => (
                              <Badge key={idx} bg="light" text="dark" className="border" role="listitem">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-primary fs-5" aria-label={`السعر ${tutor.price} جنيه للساعة`}>
                              {tutor.price} جنيه/ساعة
                            </span>
                            <span className="badge bg-success">
                              {tutor.availability}
                            </span>
                          </div>
                        </div>

                        <div className="d-grid gap-2">
                          <Button 
                            as={Link} 
                            to={`/student/tutor/${tutor.id}`} 
                            variant="primary"
                            aria-label={`عرض الملف الشخصي لـ ${tutor.name}`}
                          >
                            عرض الملف الشخصي
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </article>
                </Col>
              ))}
            </Row>

            {filteredTutors.length === 0 && (
              <Card className="text-center py-5">
                <Card.Body role="status">
                  <div className="display-1 mb-3" aria-hidden="true">🔍</div>
                  <h2 className="h4">لم يتم العثور على نتائج</h2>
                  <p className="text-muted">جرب تغيير معايير البحث</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default FindTutors;
