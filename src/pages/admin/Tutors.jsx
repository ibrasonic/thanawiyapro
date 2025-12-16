import { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { FaUserCheck, FaUserClock } from 'react-icons/fa';
import { tutorAPI } from '../../services/backendApi';

function AdminTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const response = await tutorAPI.getAllTutors();
      if (response.success) {
        setTutors(response.data);
      } else {
        setError('فشل في تحميل بيانات المدرسين');
      }
    } catch (err) {
      setError('حدث خطأ في تحميل البيانات');
      console.error('Error fetching tutors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (tutorId) => {
    try {
      await tutorAPI.updateTutor(tutorId, { isVerified: true });
      alert(`تم قبول المدرس`);
      fetchTutors(); // Refresh list
    } catch (err) {
      alert('فشل في قبول المدرس');
      console.error('Error approving tutor:', err);
    }
  };

  const handleReject = async (tutorId) => {
    if (window.confirm('هل أنت متأكد من رفض هذا المدرس؟')) {
      try {
        await tutorAPI.updateTutor(tutorId, { isVerified: false });
        alert(`تم رفض المدرس`);
        fetchTutors(); // Refresh list
      } catch (err) {
        alert('فشل في رفض المدرس');
        console.error('Error rejecting tutor:', err);
      }
    }
  };

  // Separate verified and pending tutors
  const pendingTutors = tutors.filter(t => !t.isVerified);
  const verifiedTutors = tutors.filter(t => t.isVerified);

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4"><FaUserClock className="me-2 text-warning" />مراجعة المدرسين</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Pending Tutors */}
      <Card className="shadow-sm border-0 mb-4">
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
                    <th>السعر/ساعة</th>
                    <th>تاريخ التقديم</th>
                    <th>النبذة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingTutors.map((tutor) => (
                    <tr key={tutor._id}>
                      <td className="fw-bold">{tutor.userId?.name || 'غير متوفر'}</td>
                      <td>
                        <div className="small">
                          <div>{tutor.university}</div>
                          <div className="text-muted">{tutor.major}</div>
                        </div>
                      </td>
                      <td className="small">{tutor.year}</td>
                      <td>
                        {tutor.teachingSubjects?.map((subject, i) => (
                          <Badge key={i} bg="primary" className="me-1 mb-1 small">{subject}</Badge>
                        ))}
                      </td>
                      <td className="small">{tutor.hourlyRate} جنيه</td>
                      <td className="small">{new Date(tutor.createdAt).toLocaleDateString('ar-EG')}</td>
                      <td className="small" style={{ maxWidth: '200px' }}>{tutor.tutorBio || 'لا يوجد'}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button 
                            size="sm" 
                            variant="success"
                            onClick={() => handleApprove(tutor._id)}
                          >
                            <FaUserCheck /> قبول
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline-danger"
                            onClick={() => handleReject(tutor._id)}
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

      {/* Verified Tutors */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h2 className="h5 mb-3 text-success">المدرسين المقبولين ({verifiedTutors.length})</h2>
          
          {verifiedTutors.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p>لا يوجد مدرسين مقبولين</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>الاسم</th>
                    <th>الجامعة/التخصص</th>
                    <th>المواد</th>
                    <th>السعر/ساعة</th>
                    <th>التقييم</th>
                    <th>الجلسات</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedTutors.map((tutor) => (
                    <tr key={tutor._id}>
                      <td className="fw-bold">{tutor.userId?.name || 'غير متوفر'}</td>
                      <td>
                        <div className="small">
                          <div>{tutor.university}</div>
                          <div className="text-muted">{tutor.major}</div>
                        </div>
                      </td>
                      <td>
                        {tutor.teachingSubjects?.map((subject, i) => (
                          <Badge key={i} bg="success" className="me-1 mb-1 small">{subject}</Badge>
                        ))}
                      </td>
                      <td className="small">{tutor.hourlyRate} جنيه</td>
                      <td className="small">⭐ {tutor.rating?.toFixed(1) || '0.0'} ({tutor.totalRatings || 0})</td>
                      <td className="small">{tutor.completedSessions || 0} جلسة</td>
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
