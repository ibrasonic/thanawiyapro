import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { FaUserCheck, FaUserClock } from 'react-icons/fa';

function AdminTutors() {
  const pendingTutors = [
    { id: 1, name: 'أحمد خالد', university: 'القاهرة', major: 'هندسة', year: 'الثالثة', subjects: ['الرياضيات', 'الفيزياء'], appliedDate: '2025-11-20', bio: 'خبرة سنتين في التدريس' },
    { id: 2, name: 'نور حسن', university: 'عين شمس', major: 'علوم', year: 'الرابعة', subjects: ['الكيمياء', 'الأحياء'], appliedDate: '2025-11-21', bio: 'طالبة متفوقة' },
    { id: 3, name: 'ياسمين محمود', university: 'الإسكندرية', major: 'آداب', year: 'الثانية', subjects: ['اللغة العربية'], appliedDate: '2025-11-22', bio: 'شغوفة بالتدريس' }
  ];

  const handleApprove = (id) => {
    alert(`تم قبول المدرس رقم ${id}`);
    // Update user status in localStorage
  };

  const handleReject = (id) => {
    if (window.confirm('هل أنت متأكد من رفض هذا المدرس؟')) {
      alert(`تم رفض المدرس رقم ${id}`);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4"><FaUserClock className="me-2 text-warning" />مراجعة المدرسين</h1>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <h2 className="h5 mb-3">طلبات قيد المراجعة ({pendingTutors.length})</h2>
          
          {pendingTutors.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FaUserCheck size={60} className="mb-3 opacity-50" />
              <p>لا توجد طلبات قيد المراجعة</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>الاسم</th>
                    <th>الجامعة/التخصص</th>
                    <th>السنة</th>
                    <th>المواد</th>
                    <th>تاريخ التقديم</th>
                    <th>النبذة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingTutors.map((tutor) => (
                    <tr key={tutor.id}>
                      <td className="fw-bold">{tutor.name}</td>
                      <td>
                        <div className="small">
                          <div>{tutor.university}</div>
                          <div className="text-muted">{tutor.major}</div>
                        </div>
                      </td>
                      <td className="small">{tutor.year}</td>
                      <td>
                        {tutor.subjects.map((subject, i) => (
                          <Badge key={i} bg="primary" className="me-1 mb-1 small">{subject}</Badge>
                        ))}
                      </td>
                      <td className="small">{tutor.appliedDate}</td>
                      <td className="small" style={{ maxWidth: '200px' }}>{tutor.bio}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button 
                            size="sm" 
                            variant="success"
                            onClick={() => handleApprove(tutor.id)}
                          >
                            <FaUserCheck /> قبول
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline-danger"
                            onClick={() => handleReject(tutor.id)}
                          >
                            رفض
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

export default AdminTutors;
