import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'الجلسات القادمة', value: '3', icon: '📅', color: 'primary' },
    { title: 'المدرسين الجامعيين المفضلين', value: '5', icon: '⭐', color: 'warning' },
    { title: 'الجلسات المكتملة', value: '12', icon: '✓', color: 'success' },
    { title: 'الرصيد المتاح', value: '500 جنيه', icon: '💰', color: 'info' }
  ];

  const upcomingSessions = [
    {
      id: 1,
      tutor: 'محمد أحمد',
      subject: 'الرياضيات',
      date: '2025-11-22',
      time: '4:00 م',
      status: 'مؤكدة'
    },
    {
      id: 2,
      tutor: 'سارة علي',
      subject: 'الفيزياء',
      date: '2025-11-23',
      time: '6:00 م',
      status: 'قيد الانتظار'
    },
    {
      id: 3,
      tutor: 'أحمد حسن',
      subject: 'الكيمياء',
      date: '2025-11-24',
      time: '5:00 م',
      status: 'مؤكدة'
    }
  ];

  return (
    <Container className="py-5">
      <section aria-labelledby="dashboard-title">
        <Row className="mb-4">
          <Col>
            <h1 id="dashboard-title" className="fw-bold">مرحباً، {user?.name}</h1>
            <p className="text-muted">إليك نظرة عامة على نشاطك</p>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="g-4 mb-5" role="region" aria-label="إحصائيات سريعة">
          {stats.map((stat, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className={`border-0 shadow-sm h-100 border-start border-5 border-${stat.color}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h2 className="h6 text-muted mb-2">{stat.title}</h2>
                      <p className="h3 fw-bold mb-0" aria-label={`${stat.title}: ${stat.value}`}>{stat.value}</p>
                    </div>
                    <div className="fs-1" aria-hidden="true">{stat.icon}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      <Row className="g-4">
        {/* Upcoming Sessions */}
        <Col lg={8}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0 fw-bold">الجلسات القادمة</h2>
                <Button 
                  as={Link} 
                  to="/student/bookings" 
                  variant="outline-primary" 
                  size="sm"
                  aria-label="عرض جميع الحجوزات"
                >
                  عرض الكل
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {upcomingSessions.length === 0 ? (
                <div className="text-center py-4" role="status">
                  <p className="text-muted">لا توجد جلسات قادمة حالياً</p>
                  <Button as={Link} to="/student/find-tutors" variant="primary" className="mt-2">
                    ابحث عن مدرس جامعي
                  </Button>
                </div>
              ) : (
                upcomingSessions.map(session => (
                  <article key={session.id} className="border-bottom py-3">
                    <Row className="align-items-center">
                      <Col md={8}>
                        <h3 className="h6 fw-bold mb-1">{session.subject}</h3>
                        <p className="text-muted mb-1">
                          <small>المدرس: {session.tutor}</small>
                        </p>
                        <p className="text-muted mb-0">
                          <small>
                            <time dateTime={session.date}>📅 {session.date}</time> • 
                            <time>⏰ {session.time}</time>
                          </small>
                        </p>
                      </Col>
                      <Col md={4} className="text-end">
                        <span className={`badge bg-${session.status === 'مؤكدة' ? 'success' : 'warning'} mb-2`}>
                          {session.status}
                        </span>
                        <div className="mt-2">
                          <Button size="sm" variant="primary" aria-label={`انضم إلى جلسة ${session.subject} مع ${session.tutor}`}>
                            انضم
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </article>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Header className="bg-white border-bottom">
              <h2 className="h5 mb-0 fw-bold">إجراءات سريعة</h2>
            </Card.Header>
            <Card.Body className="d-grid gap-2">
              <Button 
                as={Link} 
                to="/student/find-tutors" 
                variant="primary"
                aria-label="ابحث عن مدرس جامعي"
              >
                <span aria-hidden="true">🔍</span> ابحث عن مدرس جامعي
              </Button>
              <Button 
                as={Link} 
                to="/student/bookings" 
                variant="outline-primary"
                aria-label="إدارة حجوزاتك"
              >
                <span aria-hidden="true">📅</span> إدارة الحجوزات
              </Button>
              <Button 
                as={Link} 
                to="/student/chat" 
                variant="outline-primary"
                aria-label="عرض رسائلك"
              >
                <span aria-hidden="true">💬</span> الرسائل
              </Button>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h2 className="h5 mb-0 fw-bold">المواد المهتم بها</h2>
            </Card.Header>
            <Card.Body>
              {user?.interests && user.interests.length > 0 ? (
                <div className="d-flex flex-wrap gap-2" role="list" aria-label="قائمة المواد المهتم بها">
                  {user.interests.map((interest, idx) => (
                    <span key={idx} className="badge bg-light text-dark border" role="listitem">
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">لم تحدد مواد بعد</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </section>
    </Container>
  );
}

export default Dashboard;
