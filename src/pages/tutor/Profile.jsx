import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaUniversity, FaBook, FaMoneyBillWave, FaCalendar } from 'react-icons/fa';

function TutorProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    university: user?.university || '',
    major: user?.major || '',
    year: user?.year || '',
    teachingSubjects: user?.teachingSubjects || [],
    hourlyRate: user?.hourlyRate || '',
    tutorBio: user?.tutorBio || '',
    availability: user?.availability || []
  });

  const subjects = [
    { name: 'الرياضيات', icon: '📐' },
    { name: 'الفيزياء', icon: '⚛️' },
    { name: 'الكيمياء', icon: '🧪' },
    { name: 'الأحياء', icon: '🧬' },
    { name: 'اللغة العربية', icon: '📝' },
    { name: 'اللغة الإنجليزية', icon: '🇬🇧' }
  ];

  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      teachingSubjects: prev.teachingSubjects.includes(subject)
        ? prev.teachingSubjects.filter(s => s !== subject)
        : [...prev.teachingSubjects, subject]
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Updated profile:', formData);
    setSuccess(true);
    setEditing(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">الملف الشخصي</h1>
        {!editing && (
          <Button variant="primary" onClick={() => setEditing(true)}>
            تعديل الملف الشخصي
          </Button>
        )}
      </div>

      {success && (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
          تم تحديث الملف الشخصي بنجاح!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            {/* Basic Info */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h2 className="h5 mb-4">
                  <FaUser className="me-2 text-primary" />
                  المعلومات الأساسية
                </h2>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name-input">الاسم الكامل</Form.Label>
                  <Form.Control
                    id="name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </Form.Group>

                <h3 className="h6 mt-4 mb-3">
                  <FaUniversity className="me-2 text-primary" />
                  المعلومات الأكاديمية
                </h3>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="university-input">الجامعة</Form.Label>
                      <Form.Select
                        id="university-input"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        disabled={!editing}
                        required
                      >
                        <option value="">اختر الجامعة</option>
                        <option value="القاهرة">جامعة القاهرة</option>
                        <option value="عين شمس">جامعة عين شمس</option>
                        <option value="الإسكندرية">جامعة الإسكندرية</option>
                        <option value="أسيوط">جامعة أسيوط</option>
                        <option value="المنصورة">جامعة المنصورة</option>
                        <option value="أخرى">أخرى</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="major-input">التخصص</Form.Label>
                      <Form.Control
                        id="major-input"
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        disabled={!editing}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="year-input">السنة الدراسية</Form.Label>
                  <Form.Select
                    id="year-input"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  >
                    <option value="">اختر السنة</option>
                    <option value="الأولى">السنة الأولى</option>
                    <option value="الثانية">السنة الثانية</option>
                    <option value="الثالثة">السنة الثالثة</option>
                    <option value="الرابعة">السنة الرابعة</option>
                    <option value="الخامسة">السنة الخامسة</option>
                    <option value="خريج">خريج</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Teaching Info */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h2 className="h5 mb-4">
                  <FaBook className="me-2 text-success" />
                  معلومات التدريس
                </h2>

                <Form.Group className="mb-3">
                  <Form.Label>المواد التي تدرسها</Form.Label>
                  <Row className="g-2">
                    {subjects.map((subject) => (
                      <Col md={6} key={subject.name}>
                        <Card
                          className={`text-center p-2 ${formData.teachingSubjects.includes(subject.name) ? 'border-success bg-success bg-opacity-10' : ''} ${editing ? '' : 'opacity-75'}`}
                          style={{ cursor: editing ? 'pointer' : 'default' }}
                          onClick={() => editing && handleSubjectToggle(subject.name)}
                        >
                          <small>
                            <span className="me-1">{subject.icon}</span>
                            {subject.name}
                            {formData.teachingSubjects.includes(subject.name) && (
                              <Badge bg="success" className="ms-2">✓</Badge>
                            )}
                          </small>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="rate-input">
                    <FaMoneyBillWave className="me-2" />
                    السعر بالساعة (جنيه)
                  </Form.Label>
                  <Form.Control
                    id="rate-input"
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    min="20"
                    max="200"
                  />
                  <Form.Text className="text-muted">
                    السعر الموصى به: 30-80 جنيه للساعة
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="bio-input">نبذة عنك وخبرتك التدريسية</Form.Label>
                  <Form.Control
                    id="bio-input"
                    as="textarea"
                    rows={5}
                    name="tutorBio"
                    value={formData.tutorBio}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Availability */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <h2 className="h5 mb-3">
                  <FaCalendar className="me-2 text-info" />
                  الأيام المتاحة للتدريس
                </h2>
                <Row>
                  {days.map((day) => (
                    <Col md={6} key={day} className="mb-2">
                      <Form.Check
                        type="checkbox"
                        id={`day-${day}`}
                        label={day}
                        checked={formData.availability.includes(day)}
                        onChange={() => handleDayToggle(day)}
                        disabled={!editing}
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {editing && (
              <div className="d-flex gap-2 mb-4">
                <Button type="submit" variant="success">
                  حفظ التغييرات
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: user?.name || '',
                      university: user?.university || '',
                      major: user?.major || '',
                      year: user?.year || '',
                      teachingSubjects: user?.teachingSubjects || [],
                      hourlyRate: user?.hourlyRate || '',
                      tutorBio: user?.tutorBio || '',
                      availability: user?.availability || []
                    });
                  }}
                >
                  إلغاء
                </Button>
              </div>
            )}
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <h2 className="h6 mb-3">إحصائيات الملف</h2>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">التقييم</span>
                    <Badge bg="warning">{user?.rating || 0} / 5</Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">عدد الطلاب</span>
                    <Badge bg="primary">{user?.studentsCount || 0}</Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">إجمالي الأرباح</span>
                    <Badge bg="success">{user?.totalEarnings || 0} جنيه</Badge>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">تاريخ التسجيل</span>
                    <small>{new Date(user?.createdAt).toLocaleDateString('ar-EG')}</small>
                  </div>
                </div>
                <hr />
                <div className="mb-2">
                  <Badge bg={user?.approved ? 'success' : 'warning'}>
                    {user?.approved ? 'حساب معتمد ✓' : 'قيد المراجعة'}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default TutorProfile;
