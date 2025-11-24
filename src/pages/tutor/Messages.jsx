import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane, FaSearch } from 'react-icons/fa';

function TutorMessages() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: 'أحمد محمد علي',
      lastMessage: 'شكراً جزيلاً! الشرح كان واضحاً',
      lastMessageTime: '2025-11-22T10:30:00',
      unread: 2,
      avatar: '👨‍🎓'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'سارة أحمد حسن',
      lastMessage: 'متى يمكننا تحديد الجلسة القادمة؟',
      lastMessageTime: '2025-11-21T16:45:00',
      unread: 0,
      avatar: '👩‍🎓'
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'محمد حسن إبراهيم',
      lastMessage: 'هل يمكنك إرسال ملخص الدرس؟',
      lastMessageTime: '2025-11-20T14:20:00',
      unread: 1,
      avatar: '👨‍🎓'
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, senderId: 1, text: 'مرحباً أستاذ! هل يمكنني طرح بعض الأسئلة؟', timestamp: '2025-11-22T09:00:00', isStudent: true },
      { id: 2, senderId: user?.id, text: 'أهلاً وسهلاً! بالتأكيد، تفضل', timestamp: '2025-11-22T09:05:00', isStudent: false },
      { id: 3, senderId: 1, text: 'لم أفهم جزء المعادلات التفاضلية', timestamp: '2025-11-22T09:10:00', isStudent: true },
      { id: 4, senderId: user?.id, text: 'لا مشكلة، سأشرحها لك خطوة بخطوة في الجلسة القادمة', timestamp: '2025-11-22T09:15:00', isStudent: false },
      { id: 5, senderId: 1, text: 'شكراً جزيلاً! الشرح كان واضحاً', timestamp: '2025-11-22T10:30:00', isStudent: true }
    ],
    2: [
      { id: 1, senderId: 2, text: 'مساء الخير أستاذ', timestamp: '2025-11-21T15:00:00', isStudent: true },
      { id: 2, senderId: user?.id, text: 'مساء النور! كيف حالك؟', timestamp: '2025-11-21T15:05:00', isStudent: false },
      { id: 3, senderId: 2, text: 'بخير والحمد لله، الدرس الأخير كان ممتازاً', timestamp: '2025-11-21T15:10:00', isStudent: true },
      { id: 4, senderId: 2, text: 'متى يمكننا تحديد الجلسة القادمة؟', timestamp: '2025-11-21T16:45:00', isStudent: true }
    ],
    3: [
      { id: 1, senderId: 3, text: 'السلام عليكم', timestamp: '2025-11-20T14:00:00', isStudent: true },
      { id: 2, senderId: user?.id, text: 'وعليكم السلام ورحمة الله', timestamp: '2025-11-20T14:05:00', isStudent: false },
      { id: 3, senderId: 3, text: 'هل يمكنك إرسال ملخص الدرس؟', timestamp: '2025-11-20T14:20:00', isStudent: true }
    ]
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: user?.id,
      text: message,
      timestamp: new Date().toISOString(),
      isStudent: false
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    setConversations(prev =>
      prev.map(conv =>
        conv.id === parseInt(selectedChat)
          ? { ...conv, lastMessage: message, lastMessageTime: new Date().toISOString() }
          : conv
      )
    );

    setMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    
    return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="py-3" style={{ height: 'calc(100vh - 100px)' }}>
      <h2 className="mb-4 fw-bold">الرسائل</h2>
      
      <Row style={{ height: '100%' }}>
        <Col md={4} className="pe-0">
          <Card className="h-100 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <Form.Group className="mb-0">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="ابحث عن طالب..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-start-0"
                  />
                </div>
              </Form.Group>
            </Card.Header>
            <ListGroup variant="flush" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              {filteredConversations.map(conv => (
                <ListGroup.Item
                  key={conv.id}
                  action
                  active={selectedChat === conv.id}
                  onClick={() => {
                    setSelectedChat(conv.id);
                    setConversations(prev =>
                      prev.map(c => (c.id === conv.id ? { ...c, unread: 0 } : c))
                    );
                  }}
                  style={{ cursor: 'pointer' }}
                  className="py-3"
                >
                  <div className="d-flex align-items-start">
                    <div className="me-3" style={{ fontSize: '2rem' }}>{conv.avatar}</div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="mb-0 fw-bold">{conv.studentName}</h6>
                        <small className="text-muted">{formatTime(conv.lastMessageTime)}</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '200px' }}>
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <Badge bg="primary" pill>{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={8} className="ps-0">
          {selectedChat ? (
            <Card className="h-100 shadow-sm border-0 d-flex flex-column">
              <Card.Header className="bg-primary text-white d-flex align-items-center py-3">
                <div className="me-3" style={{ fontSize: '2rem' }}>
                  {conversations.find(c => c.id === selectedChat)?.avatar}
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">
                    {conversations.find(c => c.id === selectedChat)?.studentName}
                  </h5>
                  <small className="opacity-75">طالب</small>
                </div>
              </Card.Header>

              <Card.Body
                className="flex-grow-1 overflow-auto p-4"
                style={{ maxHeight: 'calc(100vh - 300px)', backgroundColor: '#f8f9fa' }}
              >
                {messages[selectedChat]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${msg.isStudent ? 'justify-content-start' : 'justify-content-end'}`}
                  >
                    <div
                      className={`p-3 rounded-3 ${
                        msg.isStudent ? 'bg-white' : 'bg-primary text-white'
                      }`}
                      style={{ maxWidth: '70%' }}
                    >
                      <p className="mb-1">{msg.text}</p>
                      <small className={msg.isStudent ? 'text-muted' : 'opacity-75'}>
                        {new Date(msg.timestamp).toLocaleTimeString('ar-EG', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </Card.Body>

              <Card.Footer className="bg-white border-top p-3">
                <Form onSubmit={handleSendMessage}>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      placeholder="اكتب رسالتك هنا..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border-end-0"
                    />
                    <Button variant="primary" type="submit" disabled={!message.trim()}>
                      <FaPaperPlane className="me-2" />
                      إرسال
                    </Button>
                  </div>
                </Form>
              </Card.Footer>
            </Card>
          ) : (
            <Card className="h-100 shadow-sm border-0 d-flex align-items-center justify-content-center">
              <div className="text-center text-muted">
                <div style={{ fontSize: '4rem' }}>💬</div>
                <h4 className="mt-3">اختر محادثة لبدء المراسلة</h4>
                <p>اختر طالباً من القائمة للبدء في المحادثة</p>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TutorMessages;
