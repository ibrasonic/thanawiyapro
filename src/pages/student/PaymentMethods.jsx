import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Modal } from 'react-bootstrap';
import { FaWallet, FaMobileAlt, FaCreditCard, FaPlus, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

function StudentPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'instapay',
      name: 'إنستاباي',
      details: '01012345678',
      isDefault: true,
      icon: <FaMobileAlt />
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    type: 'instapay',
    phoneNumber: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const paymentTypes = [
    { value: 'instapay', label: 'إنستاباي', icon: <FaMobileAlt />, color: 'primary' },
    { value: 'vodafone', label: 'فودافون كاش', icon: <FaMobileAlt />, color: 'danger' },
    { value: 'card', label: 'بطاقة بنكية', icon: <FaCreditCard />, color: 'success' }
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMethod = () => {
    setEditingMethod(null);
    setFormData({
      type: 'instapay',
      phoneNumber: '',
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleEditMethod = (method) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      phoneNumber: method.phoneNumber || '',
      cardNumber: method.cardNumber || '',
      cardHolder: method.cardHolder || '',
      expiryDate: method.expiryDate || '',
      cvv: ''
    });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.type === 'instapay' || formData.type === 'vodafone') {
      if (!formData.phoneNumber || !/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phoneNumber)) {
        setError('رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقم');
        return;
      }
    } else if (formData.type === 'card') {
      const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
      if (!cardNumberClean || cardNumberClean.length !== 16) {
        setError('رقم البطاقة يجب أن يكون 16 رقماً');
        return;
      }
      if (!formData.cardHolder || formData.cardHolder.length < 3) {
        setError('اسم حامل البطاقة يجب أن يكون 3 أحرف على الأقل');
        return;
      }
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        setError('تاريخ الانتهاء غير صحيح (MM/YY)');
        return;
      }
      if (!formData.cvv || formData.cvv.length !== 3) {
        setError('رمز CVV يجب أن يكون 3 أرقام');
        return;
      }
    }

    const typeInfo = paymentTypes.find(t => t.value === formData.type);
    const newMethod = {
      id: editingMethod?.id || Date.now(),
      type: formData.type,
      name: typeInfo.label,
      details: formData.type === 'card' 
        ? `**** **** **** ${formData.cardNumber.slice(-4)}`
        : formData.phoneNumber,
      phoneNumber: formData.phoneNumber,
      cardNumber: formData.cardNumber,
      cardHolder: formData.cardHolder,
      expiryDate: formData.expiryDate,
      isDefault: editingMethod?.isDefault || paymentMethods.length === 0,
      icon: typeInfo.icon
    };

    if (editingMethod) {
      setPaymentMethods(prev => prev.map(m => m.id === editingMethod.id ? newMethod : m));
      setSuccess('تم تحديث طريقة الدفع بنجاح');
    } else {
      setPaymentMethods(prev => [...prev, newMethod]);
      setSuccess('تم إضافة طريقة الدفع بنجاح');
    }

    setShowModal(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف طريقة الدفع هذه؟')) {
      setPaymentMethods(prev => {
        const filtered = prev.filter(m => m.id !== id);
        if (filtered.length > 0 && prev.find(m => m.id === id)?.isDefault) {
          filtered[0].isDefault = true;
        }
        return filtered;
      });
      setSuccess('تم حذف طريقة الدفع بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(prev =>
      prev.map(m => ({ ...m, isDefault: m.id === id }))
    );
    setSuccess('تم تعيين طريقة الدفع الافتراضية بنجاح');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">طرق الدفع</h2>
          <p className="text-muted mb-0">أضف وأدر طرق الدفع الخاصة بك</p>
        </div>
        <Button variant="primary" onClick={handleAddMethod}>
          <FaPlus className="me-2" />
          إضافة طريقة جديدة
        </Button>
      </div>

      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col lg={8}>
          {paymentMethods.length === 0 ? (
            <Card className="shadow-sm border-0 text-center py-5">
              <Card.Body>
                <FaWallet size={60} className="text-muted mb-3" />
                <h4 className="mb-3">لا توجد طرق دفع مضافة</h4>
                <p className="text-muted mb-4">
                  أضف طريقة دفع واحدة على الأقل لحجز الحصص
                </p>
                <Button variant="primary" onClick={handleAddMethod}>
                  <FaPlus className="me-2" />
                  إضافة طريقة الدفع الأولى
                </Button>
              </Card.Body>
            </Card>
          ) : (
            paymentMethods.map(method => (
              <Card key={method.id} className="shadow-sm border-0 mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-start flex-grow-1">
                      <div className="me-3 mt-1" style={{ fontSize: '2rem' }}>
                        {method.icon}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className="mb-0 fw-bold">{method.name}</h5>
                          {method.isDefault && (
                            <Badge bg="success">
                              <FaCheckCircle className="me-1" />
                              افتراضية
                            </Badge>
                          )}
                        </div>
                        {method.cardHolder && (
                          <p className="mb-1 text-muted">
                            <strong>الاسم:</strong> {method.cardHolder}
                          </p>
                        )}
                        <p className="mb-0 text-muted">
                          <strong>التفاصيل:</strong> {method.details}
                        </p>
                        {method.expiryDate && (
                          <p className="mb-0 text-muted">
                            <strong>الانتهاء:</strong> {method.expiryDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          تعيين كافتراضية
                        </Button>
                      )}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditMethod(method)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(method.id)}
                        disabled={method.isDefault && paymentMethods.length === 1}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0 fw-bold">معلومات مهمة</h6>
            </Card.Header>
            <Card.Body>
              <ul className="mb-0 pe-3">
                <li className="mb-2">سيتم الدفع تلقائياً من طريقة الدفع الافتراضية</li>
                <li className="mb-2">بياناتك محمية ومشفرة بالكامل</li>
                <li className="mb-2">يمكنك تغيير طريقة الدفع في أي وقت</li>
                <li className="mb-0">لن يتم الخصم إلا بعد تأكيد الحجز</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mt-3">
            <Card.Header className="bg-success text-white">
              <h6 className="mb-0 fw-bold">الأمان</h6>
            </Card.Header>
            <Card.Body>
              <p className="mb-0 small">
                🔒 جميع المعاملات المالية محمية بتشفير SSL<br/>
                🛡️ لا نقوم بتخزين بيانات CVV<br/>
                ✅ معالجة آمنة 100%
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingMethod ? 'تعديل طريقة الدفع' : 'إضافة طريقة دفع جديدة'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>نوع طريقة الدفع</Form.Label>
              <div className="d-flex gap-3">
                {paymentTypes.map(type => (
                  <Card
                    key={type.value}
                    className={`flex-fill text-center cursor-pointer ${
                      formData.type === type.value ? `border-${type.color} border-3` : 'border'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body className="py-3">
                      <div className={`text-${type.color} mb-2`} style={{ fontSize: '2rem' }}>
                        {type.icon}
                      </div>
                      <div className="fw-bold">{type.label}</div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Form.Group>

            {(formData.type === 'instapay' || formData.type === 'vodafone') && (
              <Form.Group className="mb-3">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="مثال: 01012345678"
                  pattern="01[0-2,5]{1}[0-9]{8}"
                  maxLength="11"
                  required
                  dir="ltr"
                  style={{ textAlign: 'right' }}
                />
                <Form.Text className="text-muted d-block">
                  رقم مصري يبدأ بـ 010، 011، 012، أو 015
                </Form.Text>
              </Form.Group>
            )}

            {formData.type === 'card' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>رقم البطاقة</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>اسم حامل البطاقة</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    placeholder="الاسم كما هو مكتوب على البطاقة"
                    required
                    minLength="3"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>تاريخ الانتهاء</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        dir="ltr"
                        style={{ textAlign: 'right' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="3"
                        required
                        dir="ltr"
                        style={{ textAlign: 'right' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Alert variant="info" className="mb-0">
                  <small>
                    🔒 بياناتك محمية. لن نقوم بتخزين رمز CVV بعد التحقق
                  </small>
                </Alert>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" type="submit">
              {editingMethod ? 'حفظ التعديلات' : 'إضافة طريقة الدفع'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default StudentPaymentMethods;
