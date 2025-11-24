import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge, Modal } from 'react-bootstrap';
import { FaWallet, FaMobileAlt, FaUniversity, FaPlus, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

function TutorPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'instapay',
      name: 'إنستاباي',
      details: '01234567890',
      isDefault: true,
      icon: <FaMobileAlt />
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    type: 'instapay',
    accountName: '',
    phoneNumber: '',
    bankName: '',
    accountNumber: '',
    iban: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const paymentTypes = [
    { value: 'instapay', label: 'إنستاباي', icon: <FaMobileAlt />, color: 'primary' },
    { value: 'vodafone', label: 'فودافون كاش', icon: <FaMobileAlt />, color: 'danger' },
    { value: 'bank', label: 'حساب بنكي', icon: <FaUniversity />, color: 'success' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMethod = () => {
    setEditingMethod(null);
    setFormData({
      type: 'instapay',
      accountName: '',
      phoneNumber: '',
      bankName: '',
      accountNumber: '',
      iban: ''
    });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleEditMethod = (method) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      accountName: method.accountName || '',
      phoneNumber: method.details || '',
      bankName: method.bankName || '',
      accountNumber: method.accountNumber || '',
      iban: method.iban || ''
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
      if (!formData.accountName || formData.accountName.length < 3) {
        setError('اسم صاحب الحساب يجب أن يكون 3 أحرف على الأقل');
        return;
      }
    } else if (formData.type === 'bank') {
      if (!formData.bankName || !formData.accountNumber || !formData.iban) {
        setError('يرجى ملء جميع بيانات الحساب البنكي');
        return;
      }
    }

    const typeInfo = paymentTypes.find(t => t.value === formData.type);
    const newMethod = {
      id: editingMethod?.id || Date.now(),
      type: formData.type,
      name: typeInfo.label,
      accountName: formData.accountName,
      details: formData.type === 'bank' 
        ? `${formData.bankName} - ${formData.accountNumber}`
        : formData.phoneNumber,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      iban: formData.iban,
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
          <h2 className="fw-bold mb-1">طرق استلام الأموال</h2>
          <p className="text-muted mb-0">أضف وأدر طرق استلام أرباحك من الحصص</p>
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
                  أضف طريقة دفع واحدة على الأقل لاستلام أرباحك
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
                        {method.accountName && (
                          <p className="mb-1 text-muted">
                            <strong>الاسم:</strong> {method.accountName}
                          </p>
                        )}
                        <p className="mb-0 text-muted">
                          <strong>التفاصيل:</strong> {method.details}
                        </p>
                        {method.iban && (
                          <p className="mb-0 text-muted">
                            <strong>IBAN:</strong> {method.iban}
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
                <li className="mb-2">سيتم تحويل أرباحك إلى طريقة الدفع الافتراضية</li>
                <li className="mb-2">التحويلات تتم خلال 3-5 أيام عمل</li>
                <li className="mb-2">تأكد من صحة البيانات المدخلة</li>
                <li className="mb-0">يمكنك إضافة عدة طرق دفع</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mt-3">
            <Card.Header className="bg-warning text-dark">
              <h6 className="mb-0 fw-bold">الرسوم</h6>
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>رسوم المنصة:</strong> 15%
              </p>
              <p className="mb-0 small text-muted">
                يتم خصم رسوم المنصة من كل حصة قبل التحويل إليك
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
              <>
                <Form.Group className="mb-3">
                  <Form.Label>اسم صاحب الحساب</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    placeholder="أدخل الاسم الكامل"
                    required
                    minLength="3"
                  />
                </Form.Group>

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
              </>
            )}

            {formData.type === 'bank' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>اسم البنك</Form.Label>
                  <Form.Select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر البنك</option>
                    <option value="البنك الأهلي المصري">البنك الأهلي المصري</option>
                    <option value="بنك مصر">بنك مصر</option>
                    <option value="بنك القاهرة">بنك القاهرة</option>
                    <option value="البنك التجاري الدولي CIB">البنك التجاري الدولي CIB</option>
                    <option value="بنك الإسكندرية">بنك الإسكندرية</option>
                    <option value="بنك قطر الوطني QNB">بنك قطر الوطني QNB</option>
                    <option value="بنك HSBC">بنك HSBC</option>
                    <option value="بنك عودة">بنك عودة</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>اسم صاحب الحساب</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    placeholder="الاسم كما هو مسجل في البنك"
                    required
                    minLength="3"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>رقم الحساب البنكي</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="أدخل رقم الحساب"
                    required
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>رقم IBAN</Form.Label>
                  <Form.Control
                    type="text"
                    name="iban"
                    value={formData.iban}
                    onChange={handleChange}
                    placeholder="EG00 0000 0000 0000 0000 0000 00000"
                    required
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                  />
                </Form.Group>
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

export default TutorPaymentMethods;
