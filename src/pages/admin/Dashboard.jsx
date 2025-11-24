import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher, FaCalendarCheck, FaMoneyBillWave, FaUserCheck, FaUserClock, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';

function AdminDashboard() {
  const platformStats = [
    { icon: <FaUsers />, label: 'إجمالي الطلاب', value: 485, change: '+12%', color: 'primary' },
    { icon: <FaChalkboardTeacher />, label: 'إجمالي المدرسين', value: 127, change: '+8%', color: 'success' },
    { icon: <FaCalendarCheck />, label: 'الحصص المكتملة', value: 1250, change: '+15%', color: 'info' },
    { icon: <FaMoneyBillWave />, label: 'إجمالي الإيرادات', value: '125,000 جنيه', change: '+22%', color: 'warning' }
  ];

  const pendingApprovals = [
    {
      id: 1,
      name: 'أحمد خالد محمد',
      university: 'جامعة القاهرة',
      major: 'هندسة',
      year: 'الثالثة',
      subjects: ['الرياضيات', 'الفيزياء'],
      appliedDate: '2025-11-20'
    },
    {
      id: 2,
      name: 'نور حسن علي',
      university: 'عين شمس',
      major: 'علوم',
      year: 'الرابعة',
      subjects: ['الكيمياء', 'الأحياء'],
      appliedDate: '2025-11-21'
    },
    {
      id: 3,
      name: 'ياسمين محمود أحمد',
      university: 'الإسكندرية',
      major: 'آداب',
      year: 'الثانية',
      subjects: ['اللغة العربية', 'اللغة الإنجليزية'],
      appliedDate: '2025-11-22'
    }
  ];

  const recentActivities = [
    { type: 'new_student', message: 'طالب جديد: خالد أحمد سعيد', time: 'منذ 5 دقائق', icon: <FaUserCheck className="text-success" /> },
    { type: 'new_booking', message: 'حجز جديد: محمد علي مع فاطمة أحمد', time: 'منذ 15 دقيقة', icon: <FaCalendarCheck className="text-info" /> },
    { type: 'new_tutor', message: 'مدرس جديد: عمر حسن إبراهيم', time: 'منذ 30 دقيقة', icon: <FaChalkboardTeacher className="text-success" /> },
    { type: 'issue_reported', message: 'بلاغ: مشكلة في الدفع من سارة علي', time: 'منذ ساعة', icon: <FaExclamationTriangle className="text-danger" /> },
    { type: 'cancellation', message: 'إلغاء حصة: أحمد محمد', time: 'منذ ساعتين', icon: <FaCalendarCheck className="text-warning" /> }
  ];

  const quickStats = [
    { label: 'مدرسون نشطون', value: 98, total: 127, color: 'success' },
    { label: 'طلاب نشطون', value: 412, total: 485, color: 'primary' },
    { label: 'حصص اليوم', value: 45, total: 60, color: 'info' },
    { label: 'قيد المراجعة', value: 3, total: 3, color: 'warning' }
  ];

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h1 className="h3 mb-1">لوحة تحكم الإدارة</h1>
        <p className="text-muted mb-0">نظرة شاملة على منصة ثانوية برو</p>
      </div>

      {/* Platform Statistics */}
      <Row className="g-3 mb-4">
        {platformStats.map((stat, index) => (
          <Col key={index} md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0" style={{ borderTop: `4px solid var(--bs-${stat.color})` }}>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className={`fs-1 text-${stat.color}`} aria-hidden="true">
                    {stat.icon}
                  </div>
                  <Badge bg={stat.color} className="bg-opacity-25 text-dark border border-{stat.color}">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-muted mb-1 small">{stat.label}</p>
                <h2 className="h4 mb-0 fw-bold">{stat.value}</h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Stats Progress */}
      <Row className="g-3 mb-4">
        {quickStats.map((stat, index) => (
          <Col key={index} md={6} lg={3}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">{stat.label}</small>
                  <Badge bg={stat.color}>{stat.value}/{stat.total}</Badge>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className={`progress-bar bg-${stat.color}`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={stat.value}
                    aria-valuemin="0"
                    aria-valuemax={stat.total}
                  ></div>
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
            <FaChartLine className="me-2 text-primary" />
            إجراءات سريعة
          </h2>
          <div className="d-flex gap-2 flex-wrap">
            <Button as={Link} to="/admin/users" variant="primary">
              إدارة المستخدمين
            </Button>
            <Button as={Link} to="/admin/tutors" variant="success">
              مراجعة المدرسين ({pendingApprovals.length})
            </Button>
            <Button as={Link} to="/admin/bookings" variant="info">
              إدارة الحجوزات
            </Button>
            <Button as={Link} to="/admin/analytics" variant="warning">
              التقارير والتحليلات
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Row>
        {/* Pending Tutor Approvals */}
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">
                  <FaUserClock className="me-2 text-warning" />
                  طلبات مدرسين قيد المراجعة
                </h2>
                <Button as={Link} to="/admin/tutors" variant="link" size="sm">
                  عرض الكل ←
                </Button>
              </div>

              {pendingApprovals.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p>لا توجد طلبات قيد المراجعة</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover>
                    <thead className="table-light">
                      <tr>
                        <th>الاسم</th>
                        <th>الجامعة</th>
                        <th>التخصص</th>
                        <th>المواد</th>
                        <th>تاريخ التقديم</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApprovals.map((tutor) => (
                        <tr key={tutor.id}>
                          <td className="fw-bold">{tutor.name}</td>
                          <td className="small">{tutor.university}</td>
                          <td className="small">{tutor.major} - {tutor.year}</td>
                          <td>
                            {tutor.subjects.map((subject, i) => (
                              <Badge key={i} bg="primary" className="me-1 small">{subject}</Badge>
                            ))}
                          </td>
                          <td className="small">{tutor.appliedDate}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button size="sm" variant="success">قبول</Button>
                              <Button size="sm" variant="outline-danger">رفض</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h2 className="h5 mb-3">النشاط الأخير</h2>
              <div className="activity-feed">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="d-flex align-items-start mb-3 pb-3 border-bottom">
                    <div className="me-3 mt-1" style={{ fontSize: '1.5rem' }}>
                      {activity.icon}
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-1 small">{activity.message}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
              <Button as={Link} to="/admin/activity" variant="outline-primary" size="sm" className="w-100 mt-2">
                عرض جميع الأنشطة
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Platform Health */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h2 className="h5 mb-3">حالة المنصة</h2>
          <Row>
            <Col md={3} className="text-center mb-3 mb-md-0">
              <div className="mb-2">
                <div className="rounded-circle bg-success mx-auto" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-white fw-bold">✓</span>
                </div>
              </div>
              <p className="small mb-0 fw-bold">الخوادم</p>
              <small className="text-success">تعمل بشكل طبيعي</small>
            </Col>
            <Col md={3} className="text-center mb-3 mb-md-0">
              <div className="mb-2">
                <div className="rounded-circle bg-success mx-auto" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-white fw-bold">✓</span>
                </div>
              </div>
              <p className="small mb-0 fw-bold">قاعدة البيانات</p>
              <small className="text-success">تعمل بشكل طبيعي</small>
            </Col>
            <Col md={3} className="text-center mb-3 mb-md-0">
              <div className="mb-2">
                <div className="rounded-circle bg-success mx-auto" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-white fw-bold">✓</span>
                </div>
              </div>
              <p className="small mb-0 fw-bold">الدفع</p>
              <small className="text-success">تعمل بشكل طبيعي</small>
            </Col>
            <Col md={3} className="text-center">
              <div className="mb-2">
                <div className="rounded-circle bg-warning mx-auto" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-white fw-bold">!</span>
                </div>
              </div>
              <p className="small mb-0 fw-bold">الإشعارات</p>
              <small className="text-warning">تحميل متوسط</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminDashboard;
