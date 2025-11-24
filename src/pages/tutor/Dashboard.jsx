import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaMoneyBillWave, FaUsers, FaCalendarCheck, FaStar, FaClock, FaChartLine } from 'react-icons/fa';

function TutorDashboard() {
  const { user } = useAuth();

  // Mock data for demonstration
  const stats = [
    { icon: <FaMoneyBillWave />, label: 'إجمالي الأرباح', value: user?.totalEarnings || 0, suffix: ' جنيه', color: 'success' },
    { icon: <FaUsers />, label: 'عدد الطلاب', value: user?.studentsCount || 0, suffix: ' طالب', color: 'primary' },
    { icon: <FaCalendarCheck />, label: 'الحصص القادمة', value: 5, suffix: ' حصة', color: 'info' },
    { icon: <FaStar />, label: 'التقييم', value: user?.rating || 0, suffix: ' / 5', color: 'warning' }
  ];

  const upcomingSessions = [
    {
      id: 1,
      studentName: 'أحمد محمد',
      subject: 'الرياضيات',
      date: '2025-11-23',
      time: '15:00',
      duration: '2 ساعة',
      price: 120,
      status: 'confirmed'
    },
    {
      id: 2,
      studentName: 'سارة علي',
      subject: 'الفيزياء',
      date: '2025-11-24',
      time: '10:00',
      duration: '1 ساعة',
      price: 60,
      status: 'pending'
    },
    {
      id: 3,
      studentName: 'محمد حسن',
      subject: 'الرياضيات',
      date: '2025-11-25',
      time: '16:00',
      duration: '1.5 ساعة',
      price: 90,
      status: 'confirmed'
    }
  ];

  const recentRequests = [
    {
      id: 1,
      studentName: 'خالد أحمد',
      subject: 'الفيزياء',
      preferredTime: 'مساءً 5-7',
      date: '2025-11-26',
      message: 'محتاج مساعدة في فهم الحركة الدائرية'
    },
    {
      id: 2,
      studentName: 'نور محمد',
      subject: 'الرياضيات',
      preferredTime: 'صباحاً 10-12',
      date: '2025-11-27',
      message: 'أريد مراجعة التفاضل والتكامل'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge bg="success">مؤكدة</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">قيد الانتظار</Badge>;
      case 'cancelled':
        return <Badge bg="danger">ملغاة</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (!user?.approved && user?.role === 'tutor') {
    return (
      <Container className="py-5">
        <Card className="text-center p-5 shadow-sm">
          <Card.Body>
            <div className="mb-4">
              <FaClock size={80} className="text-warning" />
            </div>
            <h1 className="h3 mb-3">حسابك قيد المراجعة</h1>
            <p className="text-muted mb-4">
              شكراً لتسجيلك كمدرس في ثانوية برو! نحن نراجع بياناتك حالياً وسيتم تفعيل حسابك خلال 24-48 ساعة.
            </p>
            <p className="text-muted">
              سنرسل لك إشعار عبر البريد الإلكتروني فور تفعيل حسابك.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <section aria-labelledby="dashboard-title">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 id="dashboard-title" className="h3 mb-1">مرحباً، {user?.name}</h1>
            <p className="text-muted mb-0">لوحة تحكم المدرس - {user?.university}</p>
          </div>
          <Badge bg="success" className="px-3 py-2">
            <FaStar className="me-1" /> مدرس معتمد
          </Badge>
        </div>

        {/* Stats Cards */}
        <Row className="g-3 mb-4">
          {stats.map((stat, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="h-100 shadow-sm border-0" style={{ borderTop: `4px solid var(--bs-${stat.color})` }}>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted mb-1 small">{stat.label}</p>
                      <h2 className="h4 mb-0 fw-bold">
                        <span aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}>
                          {stat.value}{stat.suffix}
                        </span>
                      </h2>
                    </div>
                    <div className={`fs-1 text-${stat.color}`} aria-hidden="true">
                      {stat.icon}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Actions */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Body>
            <h2 className="h5 mb-3">
              <FaChartLine className="me-2" aria-hidden="true" />
              إجراءات سريعة
            </h2>
            <div className="d-flex gap-2 flex-wrap">
              <Button as={Link} to="/tutor/profile" variant="primary" aria-label="تعديل الملف الشخصي">
                تعديل الملف الشخصي
              </Button>
              <Button as={Link} to="/tutor/sessions" variant="outline-primary" aria-label="عرض جميع الحصص">
                عرض جميع الحصص
              </Button>
              <Button as={Link} to="/tutor/students" variant="outline-success" aria-label="إدارة الطلاب">
                إدارة الطلاب
              </Button>
              <Button as={Link} to="/tutor/earnings" variant="outline-success" aria-label="تقرير الأرباح">
                تقرير الأرباح
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Row>
          {/* Upcoming Sessions */}
          <Col lg={7} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">
                    <FaCalendarCheck className="me-2 text-primary" aria-hidden="true" />
                    الحصص القادمة
                  </h2>
                  <Button as={Link} to="/tutor/sessions" variant="link" size="sm" aria-label="عرض جميع الحصص">
                    عرض الكل ←
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover>
                    <thead className="table-light">
                      <tr>
                        <th>الطالب</th>
                        <th>المادة</th>
                        <th>التاريخ</th>
                        <th>الوقت</th>
                        <th>المدة</th>
                        <th>السعر</th>
                        <th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingSessions.map((session) => (
                        <tr key={session.id}>
                          <td className="fw-bold">{session.studentName}</td>
                          <td>{session.subject}</td>
                          <td>{session.date}</td>
                          <td>{session.time}</td>
                          <td>{session.duration}</td>
                          <td className="text-success fw-bold">{session.price} جنيه</td>
                          <td>{getStatusBadge(session.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* New Requests */}
          <Col lg={5} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <h2 className="h5 mb-3">
                  <FaUsers className="me-2 text-info" aria-hidden="true" />
                  طلبات حجز جديدة
                </h2>
                
                {recentRequests.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <p>لا توجد طلبات جديدة</p>
                  </div>
                ) : (
                  recentRequests.map((request) => (
                    <Card key={request.id} className="mb-3 border">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h3 className="h6 mb-1 fw-bold">{request.studentName}</h3>
                            <Badge bg="primary" className="mb-2">{request.subject}</Badge>
                          </div>
                          <small className="text-muted">{request.date}</small>
                        </div>
                        <p className="small text-muted mb-2">
                          <FaClock className="me-1" aria-hidden="true" />
                          الوقت المفضل: {request.preferredTime}
                        </p>
                        <p className="small mb-3">{request.message}</p>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="success" aria-label={`قبول طلب ${request.studentName}`}>
                            قبول
                          </Button>
                          <Button size="sm" variant="outline-danger" aria-label={`رفض طلب ${request.studentName}`}>
                            رفض
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default TutorDashboard;
