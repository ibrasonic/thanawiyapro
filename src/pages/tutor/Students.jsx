import { useState } from 'react';
import { Container, Card, Table, Badge, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';
import { FaUsers, FaSearch, FaStar, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function TutorStudents() {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      subject: 'الرياضيات',
      totalSessions: 8,
      completedSessions: 6,
      upcomingSessions: 2,
      totalSpent: 480,
      averageRating: 5,
      lastSession: '2025-11-20',
      joinDate: '2025-09-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'سارة أحمد حسن',
      subject: 'الفيزياء',
      totalSessions: 5,
      completedSessions: 4,
      upcomingSessions: 1,
      totalSpent: 300,
      averageRating: 4,
      lastSession: '2025-11-19',
      joinDate: '2025-10-01',
      status: 'active'
    },
    {
      id: 3,
      name: 'محمد حسن إبراهيم',
      subject: 'الرياضيات',
      totalSessions: 12,
      completedSessions: 11,
      upcomingSessions: 1,
      totalSpent: 720,
      averageRating: 5,
      lastSession: '2025-11-18',
      joinDate: '2025-08-20',
      status: 'active'
    },
    {
      id: 4,
      name: 'فاطمة علي محمود',
      subject: 'الفيزياء',
      totalSessions: 6,
      completedSessions: 6,
      upcomingSessions: 0,
      totalSpent: 360,
      averageRating: 5,
      lastSession: '2025-11-10',
      joinDate: '2025-09-01',
      status: 'inactive'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.includes(searchTerm) ||
    student.subject.includes(searchTerm)
  );

  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalRevenue = students.reduce((sum, s) => sum + s.totalSpent, 0);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            <FaUsers className="me-2 text-primary" />
            إدارة الطلاب
          </h1>
          <p className="text-muted mb-0">عرض وإدارة قائمة طلابك</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0" style={{ borderTop: '4px solid var(--bs-primary)' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">إجمالي الطلاب</p>
                  <h2 className="h3 mb-0 fw-bold">{students.length}</h2>
                </div>
                <FaUsers size={40} className="text-primary opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0" style={{ borderTop: '4px solid var(--bs-success)' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">الطلاب النشطون</p>
                  <h2 className="h3 mb-0 fw-bold text-success">{activeStudents}</h2>
                </div>
                <div className="text-success opacity-50 fw-bold" style={{ fontSize: '2.5rem' }}>●</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0" style={{ borderTop: '4px solid var(--bs-info)' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">إجمالي الإيرادات</p>
                  <h2 className="h3 mb-0 fw-bold text-success">{totalRevenue} جنيه</h2>
                </div>
                <div className="text-success opacity-50" style={{ fontSize: '2.5rem' }}>💰</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Search */}
          <div className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="ابحث عن طالب بالاسم أو المادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          {/* Students Table */}
          {filteredStudents.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FaUsers size={60} className="mb-3 opacity-50" />
              <p>لا توجد نتائج</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>الطالب</th>
                    <th>المادة</th>
                    <th>إجمالي الحصص</th>
                    <th>المكتملة</th>
                    <th>القادمة</th>
                    <th>إجمالي المدفوع</th>
                    <th>التقييم</th>
                    <th>آخر حصة</th>
                    <th>الحالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div>
                          <div className="fw-bold">{student.name}</div>
                          <small className="text-muted">منذ {student.joinDate}</small>
                        </div>
                      </td>
                      <td>
                        <Badge bg="primary">{student.subject}</Badge>
                      </td>
                      <td className="fw-bold">{student.totalSessions}</td>
                      <td className="text-success">{student.completedSessions}</td>
                      <td className="text-info">{student.upcomingSessions}</td>
                      <td className="text-success fw-bold">{student.totalSpent} جنيه</td>
                      <td>
                        <Badge bg="warning">
                          <FaStar /> {student.averageRating}/5
                        </Badge>
                      </td>
                      <td className="small">{student.lastSession}</td>
                      <td>
                        {student.status === 'active' ? (
                          <Badge bg="success">نشط</Badge>
                        ) : (
                          <Badge bg="secondary">غير نشط</Badge>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            as={Link}
                            to={`/tutor/chat/${student.id}`}
                            size="sm"
                            variant="outline-primary"
                            title="إرسال رسالة"
                          >
                            <FaComments />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            title="عرض التفاصيل"
                          >
                            عرض
                          </Button>
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
    </Container>
  );
}

export default TutorStudents;
