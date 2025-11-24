import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaCalendarAlt, FaComments, FaStar, FaUsers } from 'react-icons/fa';

function Home() {
  const features = [
    {
      icon: <FaGraduationCap className="text-primary" style={{ fontSize: '3rem' }} />,
      title: 'طلاب جامعيون متميزون',
      description: 'تعلم من طلاب جامعيين نجحوا في الثانوية العامة وحصلوا على درجات عالية'
    },
    {
      icon: <FaBook className="text-success" style={{ fontSize: '3rem' }} />,
      title: 'أسعار معقولة',
      description: 'دروس خصوصية بأسعار أقل بكثير من المدرسين التقليديين - التعليم من الطلاب للطلاب'
    },
    {
      icon: <FaCalendarAlt className="text-warning" style={{ fontSize: '3rem' }} />,
      title: 'جدولة مرنة',
      description: 'احجز الحصص في الأوقات التي تناسبك - طلاب الجامعة متاحون في أوقات متنوعة'
    },
    {
      icon: <FaComments className="text-info" style={{ fontSize: '3rem' }} />,
      title: 'تواصل مباشر',
      description: 'تواصل مع مدرسك الجامعي بسهولة واحصل على إجابات سريعة لأسئلتك'
    }
  ];

  const stats = [
    { icon: <FaUsers />, value: '500+', label: 'طالب ثانوي' },
    { icon: <FaGraduationCap />, value: '100+', label: 'طالب جامعي مُدرّس' },
    { icon: <FaBook />, value: '1000+', label: 'حصة مكتملة' },
    { icon: <FaStar />, value: '4.8', label: 'تقييم الطلاب' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white text-center py-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} aria-labelledby="hero-title">
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1
        }}>
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'white',
            top: '-100px',
            right: '-100px',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'white',
            bottom: '-50px',
            left: '-50px',
            animation: 'float 8s ease-in-out infinite'
          }}></div>
        </div>
        
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-4">
            <img src="/logo.svg" alt="شعار ثانوية برو - كتاب مفتوح مع قبعة تخرج" width="120" height="120" className="mb-3" />
          </div>
          <h1 id="hero-title" className="display-2 fw-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            ثانوية برو
          </h1>
          <p className="lead mb-3" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
            التعليم من الطلاب للطلاب
          </p>
          <p className="mb-4" style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
            منصة مبتكرة تربط طلاب الجامعة المتفوقين بطلاب الثانوية العامة
            <br />
            <strong>دروس خصوصية عالية الجودة بأسعار في متناول الجميع</strong>
          </p>
          
          {/* Value Proposition Badges */}
          <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
            <span className="badge bg-light text-dark px-4 py-2" style={{ fontSize: '1rem', borderRadius: '25px' }}>
              ✓ أسعار مخفضة تصل لـ 50%
            </span>
            <span className="badge bg-light text-dark px-4 py-2" style={{ fontSize: '1rem', borderRadius: '25px' }}>
              ✓ مدرسون جامعيون متميزون
            </span>
            <span className="badge bg-light text-dark px-4 py-2" style={{ fontSize: '1rem', borderRadius: '25px' }}>
              ✓ جدولة مرنة
            </span>
          </div>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button 
              as={Link} 
              to="/register" 
              variant="light" 
              size="lg" 
              className="px-5 py-3 fw-bold"
              style={{ 
                fontSize: '1.2rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              aria-label="ابدأ الآن وأنشئ حساب جديد"
            >
              <FaGraduationCap className="me-2" aria-hidden="true" />
              ابدأ مجاناً الآن
            </Button>
            <Button 
              as={Link} 
              to="/login" 
              variant="outline-light" 
              size="lg" 
              className="px-5 py-3 fw-bold"
              style={{ 
                fontSize: '1.2rem',
                borderRadius: '50px',
                borderWidth: '2px'
              }}
              aria-label="تسجيل الدخول إلى حسابك"
            >
              تسجيل الدخول
            </Button>
          </div>
          
          {/* Trust Indicator */}
          <p className="mt-5 mb-0" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
            انضم لأكثر من 500 طالب ثانوي و 100 مدرس جامعي على المنصة
          </p>
        </Container>
      </section>

      {/* How It Works Section */}
      <Container className="py-5">
        <section aria-labelledby="how-it-works-title">
          <h2 id="how-it-works-title" className="text-center mb-3 fw-bold">كيف نساعدك في التفوق؟</h2>
          <p className="text-center text-muted mb-5" style={{ fontSize: '1.1rem' }}>
            نحن نجمع بين جودة التعليم الخاص والأسعار المناسبة لطلاب المدارس الحكومية
          </p>
          <Row className="text-center g-4">
            <Col md={3}>
              <div className="mb-3">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  1
                </div>
              </div>
              <h3 className="h5 fw-bold mb-2">سجل مجاناً</h3>
              <p className="text-muted">أنشئ حسابك وحدد المواد التي تحتاج مساعدة فيها</p>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  2
                </div>
              </div>
              <h3 className="h5 fw-bold mb-2">اختر مدرسك</h3>
              <p className="text-muted">تصفح ملفات المدرسين الجامعيين واختر الأنسب لك</p>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  3
                </div>
              </div>
              <h3 className="h5 fw-bold mb-2">احجز حصتك</h3>
              <p className="text-muted">اختر الوقت المناسب واحجز بأسعار مخفضة</p>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  4
                </div>
              </div>
              <h3 className="h5 fw-bold mb-2">ابدأ التعلم</h3>
              <p className="text-muted">احصل على دروس عالية الجودة وحقق التفوق</p>
            </Col>
          </Row>
        </section>
      </Container>

      {/* Stats Section */}
      <Container className="py-5">
        <section aria-labelledby="stats-title">
          <h2 id="stats-title" className="visually-hidden">إحصائيات المنصة</h2>
          <Row className="text-center">
            {stats.map((stat, index) => (
              <Col key={index} md={3} sm={6} className="mb-4">
                <Card className="border-0 shadow-lg h-100 hover-lift" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <Card.Body className="py-4">
                    <div className="fs-1 mb-3" aria-hidden="true">{stat.icon}</div>
                    <h3 className="display-4 fw-bold mb-2">{stat.value}</h3>
                    <p className="mb-0" style={{ fontSize: '1.1rem', opacity: 0.95 }}>{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      {/* Features Section */}
      <section className="bg-light py-5" aria-labelledby="features-title">
        <Container>
          <h2 id="features-title" className="text-center mb-3 fw-bold">لماذا التعليم من الطلاب للطلاب؟</h2>
          <p className="text-center text-muted mb-5" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
            نموذج مبتكر يوفر لك تعليماً عالي الجودة بتكلفة أقل، بينما يساعد الطلاب الجامعيين على كسب دخل إضافي
          </p>
          <Row>
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <Card className="border-0 shadow-sm h-100 text-center hover-lift" style={{
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid #667eea'
                }}>
                  <Card.Body className="p-4">
                    <div className="mb-4" aria-hidden="true" style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto',
                      borderRadius: '50%',
                      background: 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {feature.icon}
                    </div>
                    <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                    <p className="text-muted" style={{ lineHeight: '1.8' }}>{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <Container className="py-5">
        <section aria-labelledby="testimonial-title">
          <h2 id="testimonial-title" className="text-center mb-5 fw-bold">ماذا يقول طلابنا؟</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>★★★★★</span>
                  </div>
                  <p className="mb-3" style={{ fontStyle: 'italic', lineHeight: '1.8' }}>
                    "وفرت كثير من المصاريف مقارنة بالدروس الخصوصية العادية، والمدرسين فاهمين جداً لأنهم عدوا من نفس التجربة قريب"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                      أ
                    </div>
                    <div>
                      <strong>أحمد محمد</strong>
                      <br />
                      <small className="text-muted">طالب ثانوية عامة - علمي علوم</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>★★★★★</span>
                  </div>
                  <p className="mb-3" style={{ fontStyle: 'italic', lineHeight: '1.8' }}>
                    "المنصة سهلة جداً والمدرسين متعاونين. أقدر أحجز الحصص في أي وقت يناسبني، وده ساعدني أنظم وقتي"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                      س
                    </div>
                    <div>
                      <strong>سارة علي</strong>
                      <br />
                      <small className="text-muted">طالبة ثانوية عامة - أدبي</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>★★★★★</span>
                  </div>
                  <p className="mb-3" style={{ fontStyle: 'italic', lineHeight: '1.8' }}>
                    "المدرسين شرحهم واضح ومبسط، وبيستخدموا أمثلة من واقع الامتحانات. درجاتي اتحسنت بشكل ملحوظ"
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}>
                      م
                    </div>
                    <div>
                      <strong>محمد حسن</strong>
                      <br />
                      <small className="text-muted">طالب ثانوية عامة - علمي رياضة</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>

      {/* CTA Section */}
      <div className="py-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Container className="text-center">
          <section aria-labelledby="cta-title">
            <h2 id="cta-title" className="mb-4 fw-bold display-5">جاهز لبداية رحلتك نحو التفوق؟</h2>
            <p className="lead mb-5" style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
              انضم لآلاف الطلاب الذين وفروا المال وحققوا التفوق مع مدرسين جامعيين
            </p>
            <Button 
              as={Link} 
              to="/register" 
              variant="light" 
              size="lg" 
              className="px-5 py-3 fw-bold"
              style={{ 
                fontSize: '1.2rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
              aria-label="سجل الآن مجاناً"
            >
              سجل الآن مجاناً - التسجيل مجاني 100%
            </Button>
            <p className="mt-4 mb-0" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
              لا توجد رسوم خفية • إلغاء مجاني في أي وقت • دعم فني متاح 24/7
            </p>
          </section>
        </Container>
      </div>
    </div>
  );
}

export default Home;
