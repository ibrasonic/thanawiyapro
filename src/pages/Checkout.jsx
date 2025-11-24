import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup, Badge, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaMobileAlt, FaCheckCircle, FaUniversity, FaLock } from 'react-icons/fa';

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {
    tutorName: 'محمد حسن إبراهيم',
    subject: 'الرياضيات',
    date: '2025-11-25',
    time: '16:00',
    duration: '1.5 ساعة',
    hourlyRate: 60,
    totalHours: 1.5
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Mock payment methods - in real app, fetch from user profile
  const paymentMethods = [
    {
      id: 1,
      type: 'instapay',
      name: 'إنستاباي',
      details: '01012345678',
      icon: <FaMobileAlt />,
      color: 'primary',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      name: 'بطاقة بنكية',
      details: '**** **** **** 1234',
      icon: <FaCreditCard />,
      color: 'success',
      isDefault: false
    },
    {
      id: 3,
      type: 'vodafone',
      name: 'فودافون كاش',
      details: '01123456789',
      icon: <FaMobileAlt />,
      color: 'danger',
      isDefault: false
    }
  ];

  // Auto-select default payment method on mount
  useEffect(() => {
    const defaultMethod = paymentMethods.find(method => method.isDefault);
    if (defaultMethod) {
      setSelectedPaymentMethod(defaultMethod.id);
    }
  }, []);

  const subtotal = bookingData.hourlyRate * bookingData.totalHours;
  const platformFee = subtotal * 0.05; // 5% platform fee
  const total = subtotal + platformFee;

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      setError('يرجى اختيار طريقة الدفع');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    setProcessing(true);
    setError('');

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowConfirmModal(false);
      
      // Navigate to success page or dashboard
      navigate('/student/bookings', {
        state: {
          success: true,
          message: 'تم تأكيد الحجز والدفع بنجاح! ستتلقى إشعاراً قريباً'
        }
      });
    }, 2000);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0 fw-bold">إتمام الحجز والدفع</h4>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Booking Summary */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">ملخص الحجز</h5>
                <Card className="border">
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>المدرس:</strong> {bookingData.tutorName}
                        </p>
                        <p className="mb-2">
                          <strong>المادة:</strong> {bookingData.subject}
                        </p>
                        <p className="mb-0">
                          <strong>المدة:</strong> {bookingData.duration}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-2">
                          <strong>التاريخ:</strong> {new Date(bookingData.date).toLocaleDateString('ar-EG')}
                        </p>
                        <p className="mb-2">
                          <strong>الوقت:</strong> {bookingData.time}
                        </p>
                        <p className="mb-0">
                          <strong>السعر/ساعة:</strong> {bookingData.hourlyRate} جنيه
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">اختر طريقة الدفع</h5>
                
                {paymentMethods.length === 0 ? (
                  <Alert variant="warning">
                    لم تقم بإضافة أي طريقة دفع بعد.{' '}
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => navigate('/student/payment-methods')}
                    >
                      أضف طريقة دفع الآن
                    </Button>
                  </Alert>
                ) : (
                  <ListGroup>
                    {paymentMethods.map(method => (
                      <ListGroup.Item
                        key={method.id}
                        action
                        active={selectedPaymentMethod === method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        style={{ cursor: 'pointer' }}
                        className="d-flex align-items-center py-3"
                      >
                        <div className={`me-3 text-${method.color}`} style={{ fontSize: '1.5rem' }}>
                          {method.icon}
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold">
                            {method.name}
                            {method.isDefault && (
                              <Badge bg="success" className="ms-2" style={{ fontSize: '0.7rem' }}>
                                افتراضي
                              </Badge>
                            )}
                          </div>
                          <small className="text-muted">{method.details}</small>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <FaCheckCircle className="text-success" size={24} />
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                
                <div className="mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate('/student/payment-methods')}
                  >
                    إدارة طرق الدفع
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">تفاصيل المبلغ</h5>
                <Card className="border">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>سعر الحصة ({bookingData.totalHours} ساعة)</span>
                      <span>{subtotal.toFixed(2)} جنيه</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>رسوم المنصة (5%)</span>
                      <span>{platformFee.toFixed(2)} جنيه</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>الإجمالي</span>
                      <span className="text-primary">{total.toFixed(2)} جنيه</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              {/* Security Notice */}
              <Alert variant="info" className="mb-4">
                <FaLock className="me-2" />
                <small>
                  جميع المعاملات محمية بتشفير SSL. لن يتم خصم المبلغ إلا بعد تأكيد المدرس للحجز.
                </small>
              </Alert>

              {/* Action Buttons */}
              <div className="d-flex gap-3">
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => navigate(-1)}
                >
                  العودة
                </Button>
                <Button
                  variant="primary"
                  className="flex-grow-1"
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || paymentMethods.length === 0}
                >
                  تأكيد الدفع والحجز
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Additional Info */}
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-light">
              <h6 className="mb-0 fw-bold">سياسة الإلغاء</h6>
            </Card.Header>
            <Card.Body>
              <ul className="mb-0 pe-3">
                <li className="mb-2">يمكنك إلغاء الحجز قبل 24 ساعة من الموعد واسترداد المبلغ كاملاً</li>
                <li className="mb-2">الإلغاء قبل 12 ساعة من الموعد: استرداد 50%</li>
                <li className="mb-0">لا يمكن استرداد المبلغ في حالة الإلغاء قبل أقل من 12 ساعة</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => !processing && setShowConfirmModal(false)} centered>
        <Modal.Header closeButton={!processing}>
          <Modal.Title>تأكيد الدفع</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {processing ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">جاري المعالجة...</span>
              </div>
              <p className="mb-0">جاري معالجة الدفع، يرجى الانتظار...</p>
            </div>
          ) : (
            <>
              <p className="mb-3">
                هل أنت متأكد من إتمام الدفع بمبلغ <strong className="text-primary">{total.toFixed(2)} جنيه</strong> عن طريق{' '}
                <strong>{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</strong>؟
              </p>
              <Alert variant="warning" className="mb-0">
                <small>
                  <strong>ملاحظة:</strong> سيتم خصم المبلغ فوراً من طريقة الدفع المحددة
                </small>
              </Alert>
            </>
          )}
        </Modal.Body>
        {!processing && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" onClick={confirmPayment}>
              تأكيد الدفع
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Container>
  );
}

export default Checkout;
