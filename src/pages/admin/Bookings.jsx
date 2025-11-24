import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Tabs, Tab, Modal } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaUser, FaMoneyBillWave, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { bookingsAPI, usersAPI } from '../../services/api';
import { formatDate, formatTime, formatCurrency, getStatusVariant, getStatusText } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookingsData, usersData] = await Promise.all([
        bookingsAPI.getAll(),
        usersAPI.getAll()
      ]);
      setBookings(bookingsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (id) => {
    return users.find(u => u.id === id);
  };

  const filteredBookings = bookings.filter(booking => {
    const student = getUserById(booking.studentId);
    const tutor = getUserById(booking.tutorId);
    
    const matchesSearch = 
      student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const bookingsByStatus = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await bookingsAPI.update(bookingId, { status: newStatus });
      await loadData();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="جاري تحميل الحجوزات..." />;
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">إدارة الحجوزات</h1>
        <p className="text-muted mb-0">عرض وإدارة جميع الحجوزات على المنصة</p>
      </div>

      {/* Statistics Cards */}
      <Row className="g-3 mb-4">
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">إجمالي الحجوزات</p>
                  <h3 className="h4 mb-0 fw-bold">{bookingsByStatus.all}</h3>
                </div>
                <div className="fs-1 text-primary">
                  <FaCalendarAlt />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">قيد الانتظار</p>
                  <h3 className="h4 mb-0 fw-bold">{bookingsByStatus.pending}</h3>
                </div>
                <div className="fs-1 text-warning">
                  <FaCalendarAlt />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">مؤكدة</p>
                  <h3 className="h4 mb-0 fw-bold">{bookingsByStatus.confirmed}</h3>
                </div>
                <div className="fs-1 text-success">
                  <FaCheck />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">مكتملة</p>
                  <h3 className="h4 mb-0 fw-bold">{bookingsByStatus.completed}</h3>
                </div>
                <div className="fs-1 text-info">
                  <FaCheck />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="البحث بالطالب، المدرس، أو المادة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="confirmed">مؤكدة</option>
                <option value="completed">مكتملة</option>
                <option value="cancelled">ملغاة</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Bookings Table */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="table-responsive">
            <Table hover>
              <thead className="bg-light">
                <tr>
                  <th>رقم الحجز</th>
                  <th>الطالب</th>
                  <th>المدرس</th>
                  <th>المادة</th>
                  <th>التاريخ والوقت</th>
                  <th>المدة</th>
                  <th>السعر</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-4">
                      لا توجد حجوزات
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(booking => {
                    const student = getUserById(booking.studentId);
                    const tutor = getUserById(booking.tutorId);
                    
                    return (
                      <tr key={booking.id}>
                        <td className="fw-bold">{booking.id}</td>
                        <td>{student?.name || 'غير معروف'}</td>
                        <td>{tutor?.name || 'غير معروف'}</td>
                        <td>{booking.subject}</td>
                        <td>
                          <div>{formatDate(booking.date)}</div>
                          <small className="text-muted">{formatTime(booking.time)}</small>
                        </td>
                        <td>{booking.duration} ساعة</td>
                        <td className="fw-bold">{formatCurrency(booking.price)}</td>
                        <td>
                          <Badge bg={getStatusVariant(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewDetails(booking)}
                          >
                            <FaEye className="me-1" />
                            عرض
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الحجز {selectedBooking?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Row className="g-3">
              <Col md={6}>
                <h6 className="text-muted mb-2">معلومات الطالب</h6>
                <p className="mb-1 fw-bold">{getUserById(selectedBooking.studentId)?.name}</p>
                <p className="mb-0 small text-muted">{getUserById(selectedBooking.studentId)?.email}</p>
                <p className="mb-0 small text-muted">{getUserById(selectedBooking.studentId)?.phone}</p>
              </Col>
              <Col md={6}>
                <h6 className="text-muted mb-2">معلومات المدرس</h6>
                <p className="mb-1 fw-bold">{getUserById(selectedBooking.tutorId)?.name}</p>
                <p className="mb-0 small text-muted">{getUserById(selectedBooking.tutorId)?.email}</p>
                <p className="mb-0 small text-muted">{getUserById(selectedBooking.tutorId)?.phone}</p>
              </Col>
              <Col md={6}>
                <h6 className="text-muted mb-2">تفاصيل الحصة</h6>
                <p className="mb-1"><strong>المادة:</strong> {selectedBooking.subject}</p>
                <p className="mb-1"><strong>التاريخ:</strong> {formatDate(selectedBooking.date)}</p>
                <p className="mb-1"><strong>الوقت:</strong> {formatTime(selectedBooking.time)}</p>
                <p className="mb-1"><strong>المدة:</strong> {selectedBooking.duration} ساعة</p>
                <p className="mb-1"><strong>الموقع:</strong> {selectedBooking.location === 'online' ? 'أونلاين' : 'حضوري'}</p>
              </Col>
              <Col md={6}>
                <h6 className="text-muted mb-2">معلومات الدفع</h6>
                <p className="mb-1"><strong>السعر:</strong> {formatCurrency(selectedBooking.price)}</p>
                <p className="mb-1"><strong>الحالة:</strong> <Badge bg={getStatusVariant(selectedBooking.status)}>{getStatusText(selectedBooking.status)}</Badge></p>
                <p className="mb-1"><strong>تاريخ الحجز:</strong> {formatDate(selectedBooking.createdAt, true)}</p>
              </Col>
              {selectedBooking.notes && (
                <Col md={12}>
                  <h6 className="text-muted mb-2">ملاحظات</h6>
                  <p className="mb-0">{selectedBooking.notes}</p>
                </Col>
              )}
              {selectedBooking.meetingLink && (
                <Col md={12}>
                  <h6 className="text-muted mb-2">رابط الاجتماع</h6>
                  <a href={selectedBooking.meetingLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                    فتح رابط الاجتماع
                  </a>
                </Col>
              )}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminBookings;
