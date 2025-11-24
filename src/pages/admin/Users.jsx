import { useState } from 'react';
import { Container, Card, Table, Badge, Button, InputGroup, Form, Tab, Tabs } from 'react-bootstrap';
import { FaUsers, FaSearch, FaUserCheck, FaUserTimes } from 'react-icons/fa';

function AdminUsers() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');

  const users = {
    students: [
      { id: 1, name: 'أحمد محمد علي', email: 'ahmed@student.com', phone: '01012345678', track: 'علمي رياضة', status: 'active', joinDate: '2025-09-01' },
      { id: 2, name: 'سارة أحمد حسن', email: 'sara@student.com', phone: '01123456789', track: 'علمي علوم', status: 'active', joinDate: '2025-09-05' }
    ],
    tutors: [
      { id: 1, name: 'محمد حسن إبراهيم', email: 'mohamed@tutor.com', university: 'القاهرة', major: 'هندسة', rating: 4.9, studentsCount: 15, status: 'active', approved: true },
      { id: 2, name: 'فاطمة أحمد السيد', email: 'fatma@tutor.com', university: 'عين شمس', major: 'طب', rating: 5.0, studentsCount: 22, status: 'active', approved: true }
    ]
  };

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4"><FaUsers className="me-2" />إدارة المستخدمين</h1>
      
      <Card className="shadow-sm border-0">
        <Card.Body>
          <InputGroup className="mb-4">
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control placeholder="ابحث عن مستخدم..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Tab eventKey="students" title={`الطلاب (${users.students.length})`}>
              <Table hover className="mt-3">
                <thead><tr><th>الاسم</th><th>البريد</th><th>الهاتف</th><th>الشعبة</th><th>الحالة</th><th>الإجراءات</th></tr></thead>
                <tbody>
                  {users.students.map(u => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td><Badge bg="primary">{u.track}</Badge></td>
                      <td><Badge bg="success">نشط</Badge></td>
                      <td>
                        <Button size="sm" variant="outline-danger"><FaUserTimes /> حظر</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="tutors" title={`المدرسون (${users.tutors.length})`}>
              <Table hover className="mt-3">
                <thead><tr><th>الاسم</th><th>البريد</th><th>الجامعة</th><th>التقييم</th><th>الطلاب</th><th>الحالة</th><th>الإجراءات</th></tr></thead>
                <tbody>
                  {users.tutors.map(u => (
                    <tr key={u.id}>
                      <td className="fw-bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.university}</td>
                      <td><Badge bg="warning">★ {u.rating}</Badge></td>
                      <td>{u.studentsCount}</td>
                      <td><Badge bg="success">معتمد</Badge></td>
                      <td>
                        <Button size="sm" variant="outline-secondary">عرض</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminUsers;
