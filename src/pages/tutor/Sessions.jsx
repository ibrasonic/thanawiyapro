import { useState } from 'react';
import { Container, Card, Table, Badge, Button, Tab, Tabs, Form, InputGroup } from 'react-bootstrap';
import { FaCalendarCheck, FaSearch, FaFilter } from 'react-icons/fa';

function TutorSessions() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const sessions = {
    upcoming: [
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
      },
      {
        id: 4,
        studentName: 'فاطمة أحمد',
        subject: 'الفيزياء',
        date: '2025-11-26',
        time: '14:00',
        duration: '2 ساعة',
        price: 120,
        status: 'confirmed'
      }
    ],
    completed: [
      {
        id: 5,
        studentName: 'علي محمود',
        subject: 'الرياضيات',
        date: '2025-11-20',
        time: '15:00',
        duration: '2 ساعة',
        price: 120,
        status: 'completed',
        rating: 5
      },
      {
        id: 6,
        studentName: 'نور حسن',
        subject: 'الفيزياء',
        date: '2025-11-19',
        time: '10:00',
        duration: '1 ساعة',
        price: 60,
        status: 'completed',
        rating: 4
      },
      {
        id: 7,
        studentName: 'خالد أحمد',
        subject: 'الرياضيات',
        date: '2025-11-18',
        time: '16:00',
        duration: '1.5 ساعة',
        price: 90,
        status: 'completed',
        rating: 5
      }
    ],
    cancelled: [
      {
        id: 8,
        studentName: 'ياسمين محمد',
        subject: 'الفيزياء',
        date: '2025-11-21',
        time: '14:00',
        duration: '1 ساعة',
        price: 60,
        status: 'cancelled',
        cancelledBy: 'الطالب'
      }
    ]
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge bg="success">مؤكدة</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">قيد الانتظار</Badge>;
      case 'completed':
        return <Badge bg="info">مكتملة</Badge>;
      case 'cancelled':
        return <Badge bg="danger">ملغاة</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const filteredSessions = sessions[activeTab].filter(session =>
    session.studentName.includes(searchTerm) ||
    session.subject.includes(searchTerm)
  );

  const renderSessionsTable = (sessionsList) => {
    if (sessionsList.length === 0) {
      return (
        <div className="text-center py-5 text-muted">
          <p>لا توجد حصص في هذه الفئة</p>
        </div>
      );
    }

    return (
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
              {activeTab === 'completed' && <th>التقييم</th>}
              {activeTab === 'cancelled' && <th>ألغيت بواسطة</th>}
              {activeTab === 'upcoming' && <th>الإجراءات</th>}
            </tr>
          </thead>
          <tbody>
            {sessionsList.map((session) => (
              <tr key={session.id}>
                <td className="fw-bold">{session.studentName}</td>
                <td>{session.subject}</td>
                <td>{session.date}</td>
                <td>{session.time}</td>
                <td>{session.duration}</td>
                <td className="text-success fw-bold">{session.price} جنيه</td>
                <td>{getStatusBadge(session.status)}</td>
                {activeTab === 'completed' && (
                  <td>
                    <Badge bg="warning">★ {session.rating}/5</Badge>
                  </td>
                )}
                {activeTab === 'cancelled' && (
                  <td className="text-muted small">{session.cancelledBy}</td>
                )}
                {activeTab === 'upcoming' && (
                  <td>
                    <div className="d-flex gap-1">
                      {session.status === 'pending' && (
                        <>
                          <Button size="sm" variant="success">قبول</Button>
                          <Button size="sm" variant="outline-danger">رفض</Button>
                        </>
                      )}
                      {session.status === 'confirmed' && (
                        <Button size="sm" variant="outline-secondary">إلغاء</Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            <FaCalendarCheck className="me-2 text-primary" />
            إدارة الحصص
          </h1>
          <p className="text-muted mb-0">عرض وإدارة جميع حصصك الدراسية</p>
        </div>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {/* Search and Filter */}
          <div className="mb-4">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="ابحث بالاسم أو المادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary">
                <FaFilter className="me-1" />
                تصفية
              </Button>
            </InputGroup>
          </div>

          {/* Statistics */}
          <div className="d-flex gap-4 mb-4 flex-wrap">
            <div>
              <small className="text-muted d-block">إجمالي الحصص القادمة</small>
              <strong className="h4 mb-0">{sessions.upcoming.length}</strong>
            </div>
            <div>
              <small className="text-muted d-block">الحصص المكتملة</small>
              <strong className="h4 mb-0">{sessions.completed.length}</strong>
            </div>
            <div>
              <small className="text-muted d-block">الحصص الملغاة</small>
              <strong className="h4 mb-0 text-danger">{sessions.cancelled.length}</strong>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="upcoming" title={`القادمة (${sessions.upcoming.length})`}>
              {renderSessionsTable(filteredSessions)}
            </Tab>
            <Tab eventKey="completed" title={`المكتملة (${sessions.completed.length})`}>
              {renderSessionsTable(filteredSessions)}
            </Tab>
            <Tab eventKey="cancelled" title={`الملغاة (${sessions.cancelled.length})`}>
              {renderSessionsTable(filteredSessions)}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TutorSessions;
