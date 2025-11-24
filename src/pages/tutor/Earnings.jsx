import { useState } from 'react';
import { Container, Card, Row, Col, Table, Badge, Form, Button } from 'react-bootstrap';
import { FaMoneyBillWave, FaChartLine, FaCalendar, FaDownload } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function TutorEarnings() {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState('2025-11');

  const earningsStats = {
    totalEarnings: user?.totalEarnings || 4500,
    thisMonth: 850,
    lastMonth: 720,
    pendingPayments: 360,
    totalSessions: 45,
    averagePerSession: 100
  };

  const monthlyEarnings = [
    { month: '2025-11', earnings: 850, sessions: 9 },
    { month: '2025-10', earnings: 720, sessions: 8 },
    { month: '2025-09', earnings: 1200, sessions: 12 },
    { month: '2025-08', earnings: 980, sessions: 10 },
    { month: '2025-07', earnings: 750, sessions: 6 }
  ];

  const recentTransactions = [
    {
      id: 1,
      date: '2025-11-20',
      studentName: 'أحمد محمد',
      subject: 'الرياضيات',
      duration: '2 ساعة',
      amount: 120,
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-11-19',
      studentName: 'سارة علي',
      subject: 'الفيزياء',
      duration: '1 ساعة',
      amount: 60,
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-11-18',
      studentName: 'محمد حسن',
      subject: 'الرياضيات',
      duration: '1.5 ساعة',
      amount: 90,
      status: 'completed'
    },
    {
      id: 4,
      date: '2025-11-17',
      studentName: 'فاطمة أحمد',
      subject: 'الفيزياء',
      duration: '2 ساعة',
      amount: 120,
      status: 'completed'
    },
    {
      id: 5,
      date: '2025-11-16',
      studentName: 'علي محمود',
      subject: 'الرياضيات',
      duration: '1 ساعة',
      amount: 60,
      status: 'completed'
    },
    {
      id: 6,
      date: '2025-11-25',
      studentName: 'نور حسن',
      subject: 'الفيزياء',
      duration: '1.5 ساعة',
      amount: 90,
      status: 'pending'
    },
    {
      id: 7,
      date: '2025-11-26',
      studentName: 'خالد أحمد',
      subject: 'الرياضيات',
      duration: '2 ساعة',
      amount: 120,
      status: 'pending'
    }
  ];

  const getStatusBadge = (status) => {
    return status === 'completed' ? (
      <Badge bg="success">مكتملة</Badge>
    ) : (
      <Badge bg="warning" text="dark">قيد الانتظار</Badge>
    );
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            <FaMoneyBillWave className="me-2 text-success" />
            الأرباح والمدفوعات
          </h1>
          <p className="text-muted mb-0">تتبع أرباحك ومدفوعاتك بالتفصيل</p>
        </div>
        <Button variant="primary">
          <FaDownload className="me-1" />
          تصدير التقرير
        </Button>
      </div>

      {/* Earnings Statistics */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0" style={{ borderTop: '4px solid var(--bs-success)' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">إجمالي الأرباح</p>
                  <h2 className="h3 mb-0 fw-bold text-success">{earningsStats.totalEarnings} جنيه</h2>
                  <small className="text-muted">{earningsStats.totalSessions} حصة مكتملة</small>
                </div>
                <FaChartLine size={40} className="text-success opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0" style={{ borderTop: '4px solid var(--bs-primary)' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">أرباح هذا الشهر</p>
                  <h2 className="h3 mb-0 fw-bold text-primary">{earningsStats.thisMonth} جنيه</h2>
                  <small className="text-success">
                    ↑ {Math.round(((earningsStats.thisMonth - earningsStats.lastMonth) / earningsStats.lastMonth) * 100)}% عن الشهر الماضي
                  </small>
                </div>
                <FaCalendar size={40} className="text-primary opacity-50" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0" style={{ borderTop: '4px solid var(--bs-warning)' }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">المدفوعات المعلقة</p>
                  <h2 className="h3 mb-0 fw-bold text-warning">{earningsStats.pendingPayments} جنيه</h2>
                  <small className="text-muted">سيتم الدفع قريباً</small>
                </div>
                <div className="text-warning opacity-50" style={{ fontSize: '2.5rem' }}>⏳</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Monthly Breakdown */}
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <h2 className="h5 mb-4">الأرباح الشهرية</h2>
              <div className="table-responsive">
                <Table className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>الشهر</th>
                      <th>الحصص</th>
                      <th>الأرباح</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyEarnings.map((item) => (
                      <tr key={item.month}>
                        <td className="fw-bold">{item.month}</td>
                        <td>{item.sessions}</td>
                        <td className="text-success fw-bold">{item.earnings} جنيه</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="mt-4 p-3 bg-light rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">متوسط الأرباح لكل حصة:</span>
                  <strong className="text-success">{earningsStats.averagePerSession} جنيه</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">متوسط الأرباح الشهرية:</span>
                  <strong className="text-primary">
                    {Math.round(monthlyEarnings.reduce((sum, m) => sum + m.earnings, 0) / monthlyEarnings.length)} جنيه
                  </strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Transactions */}
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">المعاملات الأخيرة</h2>
                <Form.Select 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{ width: '150px' }}
                  size="sm"
                >
                  <option value="2025-11">نوفمبر 2025</option>
                  <option value="2025-10">أكتوبر 2025</option>
                  <option value="2025-09">سبتمبر 2025</option>
                  <option value="2025-08">أغسطس 2025</option>
                </Form.Select>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>التاريخ</th>
                      <th>الطالب</th>
                      <th>المادة</th>
                      <th>المدة</th>
                      <th>المبلغ</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="small">{transaction.date}</td>
                        <td className="fw-bold">{transaction.studentName}</td>
                        <td>
                          <Badge bg="primary" className="small">{transaction.subject}</Badge>
                        </td>
                        <td className="small">{transaction.duration}</td>
                        <td className="text-success fw-bold">{transaction.amount} جنيه</td>
                        <td>{getStatusBadge(transaction.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment Info */}
      <Card className="shadow-sm border-0">
        <Card.Body className="bg-light">
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="h6 mb-2">💡 معلومات الدفع</h3>
              <p className="small text-muted mb-0">
                يتم تحويل الأرباح إلى حسابك البنكي في نهاية كل شهر. المدفوعات المعلقة تشمل الحصص التي لم تكتمل بعد.
                يرجى التأكد من تحديث معلومات الحساب البنكي في إعدادات الملف الشخصي.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="outline-primary" size="sm">
                تحديث معلومات الدفع
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TutorEarnings;
