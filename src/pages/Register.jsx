import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { isValidEmail, isValidPhone, sanitizeInput } from '../utils/helpers';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'student', // student or tutor
    // Student fields
    track: '',
    interests: [],
    bio: '',
    // Tutor fields
    university: '',
    major: '',
    year: '',
    teachingSubjects: [],
    hourlyRate: '',
    tutorBio: '',
    availability: []
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.userType) {
      setError('يرجى ملء جميع الحقول');
      return false;
    }

    // Validate name length
    if (formData.name.trim().length < 3) {
      setError('الاسم يجب أن يكون 3 أحرف على الأقل');
      return false;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      setError('البريد الإلكتروني غير صحيح');
      return false;
    }

    // Validate Egyptian phone number
    if (!isValidPhone(formData.phone)) {
      setError('رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقم');
      return false;
    }

    // Validate password strength
    if (!formData.password || formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return false;
    }

    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم على الأقل');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return false;
    }

    setError('');
    return true;
  };

  const validateStep2 = () => {
    if (formData.userType === 'student') {
      if (!formData.track) {
        setError('يرجى اختيار الشعبة الدراسية');
        return false;
      }
      if (!formData.bio) {
        setError('يرجى كتابة نبذة عنك');
        return false;
      }
    } else if (formData.userType === 'tutor') {
      if (!formData.university || !formData.major || !formData.year) {
        setError('يرجى ملء جميع الحقول الأكاديمية');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.userType === 'student' && formData.interests.length === 0) {
      setError('يرجى اختيار مادة واحدة على الأقل');
      return;
    }
    
    if (formData.userType === 'tutor') {
      if (formData.teachingSubjects.length === 0) {
        setError('يرجى اختيار المواد التي يمكنك تدريسها');
        return;
      }
      if (!formData.hourlyRate || !formData.tutorBio) {
        setError('يرجى ملء جميع حقول التدريس');
        return;
      }
    }

    // Transform data for backend (userType -> role)
    const registrationData = {
      ...formData,
      role: formData.userType
    };

    const result = await register(registrationData);
    if (result.success) {
      alert('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  // جميع المواد المتاحة مع تحديد الشعب المناسبة لكل مادة
  const allSubjects = [
    { name: 'الرياضيات', icon: '📐', tracks: ['علمي علوم', 'علمي رياضة'] },
    { name: 'الفيزياء', icon: '⚛️', tracks: ['علمي علوم', 'علمي رياضة'] },
    { name: 'الكيمياء', icon: '🧪', tracks: ['علمي علوم'] },
    { name: 'الأحياء', icon: '🧬', tracks: ['علمي علوم'] },
    { name: 'اللغة العربية', icon: '📝', tracks: ['أدبي'] },
    { name: 'اللغة الإنجليزية', icon: '🇬🇧', tracks: ['أدبي'] },
    { name: 'التاريخ', icon: '📜', tracks: ['أدبي'] },
    { name: 'الجغرافيا', icon: '🗺️', tracks: ['أدبي'] },
    { name: 'الفلسفة', icon: '🤔', tracks: ['أدبي'] },
    { name: 'علم النفس', icon: '🧠', tracks: ['أدبي'] }
  ];

  // تصفية المواد بناءً على الشعبة المختارة (للطلاب) أو كل المواد (للمدرسين)
  const subjects = formData.userType === 'tutor'
    ? allSubjects // المدرسون يمكنهم اختيار أي مادة
    : formData.track 
      ? allSubjects.filter(subject => subject.tracks.includes(formData.track))
      : [];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="shadow border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4 fw-bold">إنشاء حساب جديد</h1>
              
              <ProgressBar 
                now={Math.round((step / 3) * 100)} 
                className="mb-4"
                style={{ height: '8px' }}
                label={`${Math.round((step / 3) * 100)}%`}
                visuallyHidden
                aria-label={`تقدم التسجيل: الخطوة ${step} من 3`}
              />

              <div className="text-center mb-4" role="status" aria-live="polite">
                <small className="text-muted">
                  الخطوة {step} من 3 ({Math.round((step / 3) * 100)}%)
                </small>
              </div>

              {error && <Alert variant="danger" role="alert">{error}</Alert>}

              {/* Step 1: Basic Info */}
              {step === 1 && (
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold d-block mb-3">نوع الحساب</Form.Label>
                    <Row className="g-3">
                      <Col md={6}>
                        <Card 
                          className={`text-center p-3 h-100 ${formData.userType === 'student' ? 'border-primary border-3 bg-primary bg-opacity-10' : 'border'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setFormData({...formData, userType: 'student'})}
                          role="radio"
                          aria-checked={formData.userType === 'student'}
                          tabIndex={0}
                        >
                          <Card.Body>
                            <FaUserGraduate size={50} className="text-primary mb-3" aria-hidden="true" />
                            <h3 className="h5 fw-bold mb-2">طالب</h3>
                            <p className="text-muted small mb-0">أبحث عن مدرس جامعي لمساعدتي</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card 
                          className={`text-center p-3 h-100 ${formData.userType === 'tutor' ? 'border-success border-3 bg-success bg-opacity-10' : 'border'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setFormData({...formData, userType: 'tutor'})}
                          role="radio"
                          aria-checked={formData.userType === 'tutor'}
                          tabIndex={0}
                        >
                          <Card.Body>
                            <FaChalkboardTeacher size={50} className="text-success mb-3" aria-hidden="true" />
                            <h3 className="h5 fw-bold mb-2">مدرس</h3>
                            <p className="text-muted small mb-0">طالب جامعي يريد تدريس طلاب الثانوية</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name-input">الاسم الكامل</Form.Label>
                    <Form.Control
                      id="name-input"
                      type="text"
                      name="name"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength="3"
                      aria-required="true"
                      autoComplete="name"
                      aria-describedby="name-help"
                    />
                    <Form.Text id="name-help" className="text-muted d-block">
                      الاسم يجب أن يكون 3 أحرف على الأقل
                    </Form.Text>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="email-reg-input">البريد الإلكتروني</Form.Label>
                        <Form.Control
                          id="email-reg-input"
                          type="email"
                          name="email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          autoComplete="email"
                          dir="ltr"
                          style={{ textAlign: 'right' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="phone-reg-input">رقم الهاتف</Form.Label>
                        <Form.Control
                          id="phone-reg-input"
                          type="tel"
                          name="phone"
                          placeholder="مثال: 01012345678"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          autoComplete="tel"
                          pattern="01[0-2,5]{1}[0-9]{8}"
                          maxLength="11"
                          dir="ltr"
                          style={{ textAlign: 'right' }}
                          aria-describedby="phone-reg-help"
                        />
                        <Form.Text id="phone-reg-help" className="text-muted d-block">
                          رقم مصري يبدأ بـ 010، 011، 012، أو 015
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="password-reg-input">كلمة المرور</Form.Label>
                        <Form.Control
                          id="password-reg-input"
                          type="password"
                          name="password"
                          placeholder="كلمة مرور قوية"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          autoComplete="new-password"
                          minLength="8"
                          aria-describedby="password-help"
                        />
                        <Form.Text id="password-help" className="text-muted d-block">
                          8 أحرف على الأقل، تحتوي على حرف كبير وصغير ورقم
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="confirm-password-input">تأكيد كلمة المرور</Form.Label>
                        <Form.Control
                          id="confirm-password-input"
                          type="password"
                          name="confirmPassword"
                          placeholder="أعد كتابة كلمة المرور"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          aria-required="true"
                          autoComplete="new-password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" onClick={handleNext} className="w-100" aria-label="الانتقال للخطوة التالية">
                    التالي ←
                  </Button>
                </Form>
              )}

              {/* Step 2: Academic Info */}
              {step === 2 && formData.userType === 'student' && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label as="legend" className="fw-bold">الشعبة الدراسية</Form.Label>
                    <div className="d-grid gap-2" role="radiogroup" aria-labelledby="track-label">
                      {['علمي علوم', 'علمي رياضة', 'أدبي'].map(track => (
                        <div key={track} className="form-check p-3 border rounded">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="track"
                            id={track}
                            value={track}
                            checked={formData.track === track}
                            onChange={handleChange}
                            aria-required="true"
                          />
                          <label className="form-check-label fw-bold" htmlFor={track}>
                            {track}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="bio-input">نبذة مختصرة عنك</Form.Label>
                    <Form.Control
                      id="bio-input"
                      as="textarea"
                      rows={3}
                      name="bio"
                      placeholder="أخبرنا عن نفسك وأهدافك الدراسية..."
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => setStep(1)} className="w-50" aria-label="العودة للخطوة السابقة">
                      → السابق
                    </Button>
                    <Button variant="primary" onClick={handleNext} className="w-50" aria-label="الانتقال للخطوة التالية">
                      التالي ←
                    </Button>
                  </div>
                </Form>
              )}

              {/* Step 2: Tutor Academic Info */}
              {step === 2 && formData.userType === 'tutor' && (
                <Form>
                  <h2 className="h5 mb-4 fw-bold">المعلومات الأكاديمية</h2>
                  
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="university-input">الجامعة</Form.Label>
                    <Form.Select
                      id="university-input"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">اختر الجامعة</option>
                      <option value="القاهرة">جامعة القاهرة</option>
                      <option value="عين شمس">جامعة عين شمس</option>
                      <option value="الإسكندرية">جامعة الإسكندرية</option>
                      <option value="أسيوط">جامعة أسيوط</option>
                      <option value="المنصورة">جامعة المنصورة</option>
                      <option value="طنطا">جامعة طنطا</option>
                      <option value="الزقازيق">جامعة الزقازيق</option>
                      <option value="حلوان">جامعة حلوان</option>
                      <option value="الأزهر">جامعة الأزهر</option>
                      <option value="أخرى">أخرى</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="major-input">التخصص/الكلية</Form.Label>
                    <Form.Control
                      id="major-input"
                      type="text"
                      name="major"
                      placeholder="مثال: هندسة، طب، علوم، آداب"
                      value={formData.major}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="year-input">السنة الدراسية</Form.Label>
                    <Form.Select
                      id="year-input"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      aria-required="true"
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

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => setStep(1)} className="w-50" aria-label="العودة للخطوة السابقة">
                      → السابق
                    </Button>
                    <Button variant="success" onClick={handleNext} className="w-50" aria-label="الانتقال للخطوة التالية">
                      التالي ←
                    </Button>
                  </div>
                </Form>
              )}

              {/* Step 3: Student Interests */}
              {step === 3 && formData.userType === 'student' && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold" id="subjects-label">المواد التي تحتاج مساعدة فيها</Form.Label>
                    <p className="text-muted small">اختر المواد التي تريد التركيز عليها</p>
                    <Row className="g-3" role="group" aria-labelledby="subjects-label">
                      {subjects.map(subject => (
                        <Col md={6} key={subject.name}>
                          <Card
                            className={`text-center cursor-pointer ${
                              formData.interests.includes(subject.name) ? 'border-primary bg-light' : ''
                            }`}
                            onClick={() => handleInterestChange(subject.name)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleInterestChange(subject.name);
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                            tabIndex={0}
                            role="checkbox"
                            aria-checked={formData.interests.includes(subject.name)}
                            aria-label={subject.name}
                          >
                            <Card.Body className="py-3">
                              <div className="fs-2 mb-2" aria-hidden="true">{subject.icon}</div>
                              <div className="fw-bold">{subject.name}</div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="terms"
                      label={
                        <span>
                          أوافق على <Link to="/terms" className="text-primary">الشروط والأحكام</Link> و{' '}
                          <Link to="/privacy" className="text-primary">سياسة الخصوصية</Link>
                        </span>
                      }
                      required
                      aria-required="true"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => setStep(2)} className="w-50" aria-label="العودة للخطوة السابقة">
                      → السابق
                    </Button>
                    <Button variant="primary" type="submit" className="w-50" aria-label="إنشاء الحساب والتسجيل">
                      إنشاء الحساب ✓
                    </Button>
                  </div>
                </Form>
              )}

              {/* Step 3: Tutor Teaching Info */}
              {step === 3 && formData.userType === 'tutor' && (
                <Form onSubmit={handleSubmit}>
                  <h2 className="h5 mb-4 fw-bold">معلومات التدريس</h2>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold" id="teaching-subjects-label">المواد التي يمكنك تدريسها</Form.Label>
                    <p className="text-muted small">اختر جميع المواد التي تستطيع تدريسها بكفاءة</p>
                    <Row className="g-2" role="group" aria-labelledby="teaching-subjects-label">
                      {subjects.map(subject => (
                        <Col md={6} sm={6} key={subject.name}>
                          <Card
                            className={`text-center p-2 ${formData.teachingSubjects.includes(subject.name) ? 'border-success bg-success bg-opacity-10' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              const newSubjects = formData.teachingSubjects.includes(subject.name)
                                ? formData.teachingSubjects.filter(s => s !== subject.name)
                                : [...formData.teachingSubjects, subject.name];
                              setFormData({ ...formData, teachingSubjects: newSubjects });
                            }}
                            role="checkbox"
                            aria-checked={formData.teachingSubjects.includes(subject.name)}
                            tabIndex={0}
                          >
                            <Card.Body className="py-2">
                              <span className="fs-5" aria-hidden="true">{subject.icon}</span>
                              <small className="d-block fw-bold">{subject.name}</small>
                              {formData.teachingSubjects.includes(subject.name) && (
                                <Badge bg="success" className="mt-1">✓</Badge>
                              )}
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="hourly-rate-input">السعر بالساعة (جنيه مصري)</Form.Label>
                    <Form.Control
                      id="hourly-rate-input"
                      type="number"
                      name="hourlyRate"
                      placeholder="مثال: 50"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      min="20"
                      max="200"
                    />
                    <Form.Text className="text-muted">
                      السعر الموصى به: 30-80 جنيه للساعة (أقل من السوق بـ 40-60%)
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="tutor-bio-input">نبذة عنك وخبرتك التدريسية</Form.Label>
                    <Form.Control
                      id="tutor-bio-input"
                      as="textarea"
                      rows={4}
                      name="tutorBio"
                      placeholder="اكتب نبذة مختصرة عن خبرتك في التدريس، أسلوبك التعليمي، ونتائج طلابك السابقين..."
                      value={formData.tutorBio}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">الأيام المتاحة للتدريس</Form.Label>
                    <div>
                      {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                        <Form.Check
                          key={day}
                          type="checkbox"
                          id={`day-${day}`}
                          label={day}
                          checked={formData.availability.includes(day)}
                          onChange={() => {
                            const newAvailability = formData.availability.includes(day)
                              ? formData.availability.filter(d => d !== day)
                              : [...formData.availability, day];
                            setFormData({ ...formData, availability: newAvailability });
                          }}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="tutor-terms"
                      label={
                        <span>
                          أوافق على <Link to="/terms" className="text-primary">الشروط والأحكام</Link> و{' '}
                          <Link to="/privacy" className="text-primary">سياسة الخصوصية</Link>
                        </span>
                      }
                      required
                      aria-required="true"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => setStep(2)} className="w-50" aria-label="العودة للخطوة السابقة">
                      → السابق
                    </Button>
                    <Button variant="success" type="submit" className="w-50" aria-label="إنشاء حساب المدرس">
                      إنشاء الحساب ✓
                    </Button>
                  </div>
                </Form>
              )}

              <div className="text-center mt-4">
                <p className="text-muted">
                  لديك حساب بالفعل؟{' '}
                  <Link to="/login" className="text-primary fw-bold">
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
