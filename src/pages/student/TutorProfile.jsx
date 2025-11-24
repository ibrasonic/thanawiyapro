import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Tabs, Tab, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function TutorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '60',
    subject: '',
    notes: ''
  });
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status on mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'student') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      if (user && user.favoritesTutors) {
        setIsFavorite(user.favoritesTutors.includes(String(id)));
      }
    }
  }, [id]);

  // Toggle favorite
  const toggleFavorite = () => {
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
    
    if (updatedFavorites.includes(String(id))) {
      // Remove from favorites
      updatedFavorites = updatedFavorites.filter(tutorId => tutorId !== String(id));
      toast.success('تم إزالة المدرس من المفضلة');
      setIsFavorite(false);
    } else {
      // Add to favorites
      updatedFavorites.push(String(id));
      toast.success('تم إضافة المدرس للمفضلة');
      setIsFavorite(true);
    }

    users[userIndex] = { ...user, favoritesTutors: updatedFavorites };
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Mock tutor data
  const tutor = {
    id: 1,
    name: 'محمد أحمد علي',
    subjects: [
      { name: 'الرياضيات', price: 150 },
      { name: 'الفيزياء', price: 140 }
    ],
    rating: 4.9,
    totalSessions: 120,
    totalStudents: 45,
    university: 'جامعة القاهرة - كلية الهندسة',
    availability: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء'],
    availableTimes: ['8:00', '10:00', '14:00', '16:00', '18:00', '20:00'],
    bio: 'مدرس متخصص في الرياضيات والفيزياء مع خبرة 3 سنوات في تدريس طلاب الثانوية العامة. أسلوب تدريس مبسط وفعال يضمن فهم المادة بشكل كامل.',
    image: '👨‍🏫',
    reviews: [
      {
        id: 1,
        student: 'أحمد محمود',
        rating: 5,
        comment: 'مدرس ممتاز! شرحه واضح ومبسط جداً',
        date: '2025-11-15'
      },
      {
        id: 2,
        student: 'سارة علي',
        rating: 5,
        comment: 'استفدت كثيراً من الجلسات. أنصح به بشدة',
        date: '2025-11-10'
      },
      {
        id: 3,
        student: 'محمد حسن',
        rating: 4,
        comment: 'جيد جداً ومتعاون',
        date: '2025-11-05'
      }
    ]
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Find selected subject to get price
    const selectedSubject = tutor.subjects.find(s => s.name === bookingData.subject);
    const hourlyRate = selectedSubject ? selectedSubject.price : 150;
    const totalHours = parseInt(bookingData.duration) / 60;
    
    // Navigate to checkout with booking data
    navigate('/checkout', {
      state: {
        tutorName: tutor.name,
        subject: bookingData.subject,
        date: bookingData.date,
        time: bookingData.time,
        duration: `${bookingData.duration} دقيقة`,
        hourlyRate: hourlyRate,
        totalHours: totalHours,
        notes: bookingData.notes
      }
    });
    
    setShowBookingModal(false);
  };

  return (
    <Container className="py-5">
      <Row className="g-4">
        {/* Profile Header */}
        <Col lg={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start">
                <div className="display-1 me-4">{tutor.image}</div>
                <div className="flex-grow-1">
                  <h2 className="fw-bold mb-2">{tutor.name}</h2>
                  <p className="text-muted mb-3">{tutor.university}</p>
                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <div>
                      <span className="badge bg-warning text-dark fs-6">
                        ⭐ {tutor.rating}
                      </span>
                    </div>
                    <div className="text-muted">
                      📚 {tutor.totalSessions} جلسة
                    </div>
                    <div className="text-muted">
                      👥 {tutor.totalStudents} طالب
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    {tutor.subjects.map((subject, idx) => (
                      <Badge key={idx} bg="primary" className="fs-6">
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Tabs */}
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Tabs defaultActiveKey="about" className="mb-3">
                <Tab eventKey="about" title="نبذة">
                  <div className="py-3">
                    <h5 className="fw-bold mb-3">نبذة عن المدرس</h5>
                    <p className="text-muted">{tutor.bio}</p>
                  </div>
                </Tab>

                <Tab eventKey="subjects" title="المواد والأسعار">
                  <div className="py-3">
                    <h5 className="fw-bold mb-3">المواد المتاحة</h5>
                    <Row className="g-3">
                      {tutor.subjects.map((subject, idx) => (
                        <Col md={6} key={idx}>
                          <Card className="border">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold mb-0">{subject.name}</h6>
                                <span className="text-primary fw-bold">
                                  {subject.price} جنيه/ساعة
                                </span>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Tab>

                <Tab eventKey="availability" title="الأوقات المتاحة">
                  <div className="py-3">
                    <h5 className="fw-bold mb-3">الأيام المتاحة</h5>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {tutor.availability.map((day, idx) => (
                        <Badge key={idx} bg="success" className="fs-6 px-3 py-2">
                          {day}
                        </Badge>
                      ))}
                    </div>
                    <h5 className="fw-bold mb-3">الأوقات المتاحة</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {tutor.availableTimes.map((time, idx) => (
                        <Badge key={idx} bg="light" text="dark" className="fs-6 px-3 py-2 border">
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="reviews" title={`التقييمات (${tutor.reviews.length})`}>
                  <div className="py-3">
                    <h5 className="fw-bold mb-3">آراء الطلاب</h5>
                    {tutor.reviews.map(review => (
                      <Card key={review.id} className="mb-3 border">
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-2">
                            <h6 className="fw-bold mb-0">{review.student}</h6>
                            <span className="badge bg-warning text-dark">
                              ⭐ {review.rating}
                            </span>
                          </div>
                          <p className="text-muted mb-2">{review.comment}</p>
                          <small className="text-muted">{review.date}</small>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">احجز جلسة</h5>
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setShowBookingModal(true)}
                >
                  📅 احجز الآن
                </Button>
                <Button 
                  as={Link}
                  to={`/student/chat/${tutor.id}`}
                  variant="outline-primary"
                >
                  💬 راسل المدرس
                </Button>
                <Button 
                  variant={isFavorite ? 'danger' : 'outline-danger'}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? '❤️ إزالة من المفضلة' : '🤍 أضف للمفضلة'}
                </Button>
              </div>

              <hr />

              <div className="text-center">
                <p className="text-muted small mb-2">وقت الاستجابة المتوقع</p>
                <p className="fw-bold">أقل من 30 دقيقة</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>حجز جلسة مع {tutor.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBooking}>
            <Form.Group className="mb-3">
              <Form.Label>المادة</Form.Label>
              <Form.Select 
                required
                onChange={(e) => setBookingData({...bookingData, subject: e.target.value})}
              >
                <option value="">اختر المادة</option>
                {tutor.subjects.map((subject, idx) => (
                  <option key={idx} value={subject.name}>
                    {subject.name} - {subject.price} جنيه/ساعة
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>التاريخ</Form.Label>
                  <Form.Control 
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>الوقت</Form.Label>
                  <Form.Select 
                    required
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  >
                    <option value="">اختر الوقت</option>
                    {tutor.availableTimes.map((time, idx) => (
                      <option key={idx} value={time}>{time}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>مدة الجلسة</Form.Label>
              <Form.Select 
                value={bookingData.duration}
                onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
              >
                <option value="60">60 دقيقة</option>
                <option value="90">90 دقيقة</option>
                <option value="120">120 دقيقة</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ملاحظات (اختياري)</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                placeholder="أضف أي ملاحظات أو متطلبات خاصة..."
                onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
              />
            </Form.Group>

            <div className="bg-light p-3 rounded mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>السعر الأساسي:</span>
                <span className="fw-bold">150 جنيه</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>رسوم المنصة (15%):</span>
                <span className="fw-bold">22.5 جنيه</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fw-bold">الإجمالي:</span>
                <span className="fw-bold text-primary fs-5">172.5 جنيه</span>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-100">
              تأكيد الحجز
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TutorProfile;
