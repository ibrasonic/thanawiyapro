import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table, Badge, Modal } from 'react-bootstrap';
import { FaSave, FaCog, FaMoneyBillWave, FaEnvelope, FaPhone, FaShieldAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { settingsAPI, getData, updateCollection } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsAPI.get();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      setErrorMessage('حدث خطأ أثناء تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErrorMessage('');
      
      const allData = await getData();
      allData.settings = settings;
      await updateCollection('settings', settings);
      
      setSuccessMessage('تم حفظ الإعدادات بنجاح');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  if (loading || !settings) {
    return <LoadingSpinner fullScreen message="جاري تحميل الإعدادات..." />;
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">
          <FaCog className="me-2" />
          إعدادات المنصة
        </h1>
        <p className="text-muted mb-0">إدارة الإعدادات العامة للمنصة</p>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      <Form onSubmit={handleSaveSettings}>
        <Row className="g-4">
          {/* Financial Settings */}
          <Col lg={6}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">
                  <FaMoneyBillWave className="me-2 text-success" />
                  الإعدادات المالية
                </h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>عمولة المنصة (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={settings.platformFee * 100}
                    onChange={(e) => handleChange('platformFee', parseFloat(e.target.value) / 100)}
                    required
                  />
                  <Form.Text className="text-muted">
                    النسبة المئوية التي تحصل عليها المنصة من كل حجز
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>الحد الأدنى للسحب (جنيه)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={settings.minWithdrawal}
                    onChange={(e) => handleChange('minWithdrawal', parseInt(e.target.value))}
                    required
                  />
                  <Form.Text className="text-muted">
                    أقل مبلغ يمكن للمدرس سحبه
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>مدة إلغاء الحجز (ساعات)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={settings.sessionCancellationHours}
                    onChange={(e) => handleChange('sessionCancellationHours', parseInt(e.target.value))}
                    required
                  />
                  <Form.Text className="text-muted">
                    عدد الساعات قبل الحصة التي يمكن فيها الإلغاء
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>العملة الأساسية</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.currencies.main}
                    onChange={(e) => handleNestedChange('currencies', 'main', e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-0">
                  <Form.Label>رمز العملة</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.currencies.symbol}
                    onChange={(e) => handleNestedChange('currencies', 'symbol', e.target.value)}
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Settings */}
          <Col lg={6}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">
                  <FaEnvelope className="me-2 text-primary" />
                  معلومات التواصل
                </h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>البريد الإلكتروني للدعم</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <Form.Control
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleChange('supportEmail', e.target.value)}
                      required
                    />
                  </div>
                  <Form.Text className="text-muted">
                    البريد الإلكتروني الذي سيتلقى رسائل المستخدمين
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>رقم هاتف الدعم</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>
                    <Form.Control
                      type="tel"
                      value={settings.supportPhone}
                      onChange={(e) => handleChange('supportPhone', e.target.value)}
                      required
                    />
                  </div>
                  <Form.Text className="text-muted">
                    رقم الهاتف الذي يمكن للمستخدمين التواصل معه
                  </Form.Text>
                </Form.Group>

                <Alert variant="info" className="mb-0">
                  <FaShieldAlt className="me-2" />
                  <strong>ملاحظة:</strong> تأكد من صحة معلومات التواصل حيث سيتم عرضها للمستخدمين
                </Alert>
              </Card.Body>
            </Card>
          </Col>

          {/* Platform Statistics */}
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">إحصائيات المنصة الحالية</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={3}>
                    <div className="text-center p-3 bg-light rounded">
                      <h3 className="h4 mb-1 text-primary fw-bold">{settings.platformFee * 100}%</h3>
                      <p className="mb-0 small text-muted">عمولة المنصة</p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center p-3 bg-light rounded">
                      <h3 className="h4 mb-1 text-success fw-bold">{settings.minWithdrawal}</h3>
                      <p className="mb-0 small text-muted">الحد الأدنى للسحب</p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center p-3 bg-light rounded">
                      <h3 className="h4 mb-1 text-warning fw-bold">{settings.sessionCancellationHours}</h3>
                      <p className="mb-0 small text-muted">ساعات الإلغاء</p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center p-3 bg-light rounded">
                      <h3 className="h4 mb-1 text-info fw-bold">{settings.currencies.symbol}</h3>
                      <p className="mb-0 small text-muted">العملة</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* System Information */}
          <Col lg={12}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0">معلومات النظام</h5>
              </Card.Header>
              <Card.Body>
                <Table>
                  <tbody>
                    <tr>
                      <td className="fw-bold">إصدار النظام</td>
                      <td>1.0.0</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">آخر تحديث</td>
                      <td>{new Date().toLocaleDateString('ar-EG')}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">حالة النظام</td>
                      <td>
                        <Badge bg="success">نشط</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">نوع قاعدة البيانات</td>
                      <td>JSON File Storage (Development Mode)</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">البيئة</td>
                      <td>
                        <Badge bg="warning" text="dark">Development</Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Save Button */}
        <div className="mt-4 d-flex justify-content-end gap-3">
          <Button
            variant="outline-secondary"
            onClick={loadSettings}
            disabled={saving}
          >
            إلغاء التغييرات
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                جاري الحفظ...
              </>
            ) : (
              <>
                <FaSave className="me-2" />
                حفظ الإعدادات
              </>
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AdminSettings;
