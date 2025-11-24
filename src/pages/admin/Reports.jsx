import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { FaChartBar, FaDownload, FaCalendar, FaMoneyBillWave, FaUsers, FaTrophy } from 'react-icons/fa';
import { getData } from '../../services/api';
import { formatCurrency, formatDate, calculateStats, groupBy } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function AdminReports() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const allData = await getData();
      setData(allData);
      setStats(calculateStats(allData));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data || !stats) {
    return <LoadingSpinner fullScreen message="جاري تحميل التقارير..." />;
  }

  // Bookings by status
  const bookingsByStatus = groupBy(data.bookings, 'status');
  const statusChartData = {
    labels: ['مؤكدة', 'قيد الانتظار', 'مكتملة', 'ملغاة'],
    datasets: [{
      label: 'عدد الحجوزات',
      data: [
        bookingsByStatus.confirmed?.length || 0,
        bookingsByStatus.pending?.length || 0,
        bookingsByStatus.completed?.length || 0,
        bookingsByStatus.cancelled?.length || 0
      ],
      backgroundColor: [
        'rgba(40, 167, 69, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(23, 162, 184, 0.8)',
        'rgba(220, 53, 69, 0.8)'
      ]
    }]
  };

  // Revenue by month
  const revenueByMonth = data.transactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((acc, t) => {
      const month = new Date(t.createdAt).toLocaleDateString('ar-EG', { month: 'long' });
      acc[month] = (acc[month] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const revenueChartData = {
    labels: Object.keys(revenueByMonth),
    datasets: [{
      label: 'الإيرادات (جنيه)',
      data: Object.values(revenueByMonth),
      backgroundColor: 'rgba(13, 110, 253, 0.8)',
      borderColor: 'rgba(13, 110, 253, 1)',
      borderWidth: 2
    }]
  };

  // Top tutors by earnings
  const topTutors = data.users
    .filter(u => u.role === 'tutor' && u.approved)
    .sort((a, b) => (b.totalEarnings || 0) - (a.totalEarnings || 0))
    .slice(0, 5);

  // Top subjects
  const subjectCounts = data.bookings.reduce((acc, b) => {
    acc[b.subject] = (acc[b.subject] || 0) + 1;
    return acc;
  }, {});

  const topSubjects = Object.entries(subjectCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const subjectsChartData = {
    labels: topSubjects.map(([subject]) => subject),
    datasets: [{
      label: 'عدد الحصص',
      data: topSubjects.map(([, count]) => count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ]
    }]
  };

  const handleExportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange,
      statistics: stats,
      bookings: data.bookings,
      transactions: data.transactions
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${Date.now()}.json`;
    a.click();
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 mb-1">التقارير والإحصائيات</h1>
          <p className="text-muted mb-0">تحليل شامل لأداء المنصة</p>
        </div>
        <Button variant="primary" onClick={handleExportReport}>
          <FaDownload className="me-2" />
          تصدير التقرير
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row className="g-3 align-items-center">
            <Col md={4}>
              <Form.Label>من تاريخ</Form.Label>
              <Form.Control
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </Col>
            <Col md={4}>
              <Form.Label>إلى تاريخ</Form.Label>
              <Form.Control
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </Col>
            <Col md={4}>
              <Form.Label className="d-block">&nbsp;</Form.Label>
              <Button variant="primary" onClick={loadData}>
                تطبيق الفلتر
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Overview Statistics */}
      <Row className="g-3 mb-4">
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm bg-primary text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small opacity-75">إجمالي الإيرادات</p>
                  <h3 className="h4 mb-0 fw-bold">{formatCurrency(stats.totalRevenue)}</h3>
                </div>
                <div className="fs-1 opacity-75">
                  <FaMoneyBillWave />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm bg-success text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small opacity-75">عمولة المنصة</p>
                  <h3 className="h4 mb-0 fw-bold">{formatCurrency(stats.platformFee)}</h3>
                </div>
                <div className="fs-1 opacity-75">
                  <FaMoneyBillWave />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm bg-info text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small opacity-75">الحصص المكتملة</p>
                  <h3 className="h4 mb-0 fw-bold">{stats.completedSessions}</h3>
                </div>
                <div className="fs-1 opacity-75">
                  <FaCalendar />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm bg-warning text-dark">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 small opacity-75">المستخدمون النشطون</p>
                  <h3 className="h4 mb-0 fw-bold">{stats.totalStudents + stats.activeTutors}</h3>
                </div>
                <div className="fs-1 opacity-75">
                  <FaUsers />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">الحجوزات حسب الحالة</h5>
            </Card.Header>
            <Card.Body>
              <Pie data={statusChartData} options={{ maintainAspectRatio: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">المواد الأكثر طلباً</h5>
            </Card.Header>
            <Card.Body>
              <Bar data={subjectsChartData} options={{ maintainAspectRatio: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={12}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">الإيرادات الشهرية</h5>
            </Card.Header>
            <Card.Body>
              <Bar data={revenueChartData} options={{ maintainAspectRatio: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Tutors */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">
            <FaTrophy className="text-warning me-2" />
            أفضل المدرسين (حسب الأرباح)
          </h5>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead className="bg-light">
              <tr>
                <th>المرتبة</th>
                <th>الاسم</th>
                <th>الجامعة</th>
                <th>المواد</th>
                <th>عدد الحصص</th>
                <th>التقييم</th>
                <th>إجمالي الأرباح</th>
              </tr>
            </thead>
            <tbody>
              {topTutors.map((tutor, index) => (
                <tr key={tutor.id}>
                  <td>
                    <span className={`badge ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : 'bg-bronze'}`}>
                      #{index + 1}
                    </span>
                  </td>
                  <td className="fw-bold">{tutor.name}</td>
                  <td>{tutor.university}</td>
                  <td>
                    <small>{tutor.teachingSubjects?.join(', ')}</small>
                  </td>
                  <td>{tutor.completedSessions || 0}</td>
                  <td>
                    ⭐ {tutor.rating || 0} ({tutor.reviewsCount || 0})
                  </td>
                  <td className="fw-bold text-success">
                    {formatCurrency(tutor.totalEarnings || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminReports;
