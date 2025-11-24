import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function ChatSystem() {
  const { tutorId } = useParams();
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(tutorId || null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      tutorId: 1,
      tutorName: 'محمد أحمد علي',
      lastMessage: 'سأكون متاحاً في الموعد المحدد',
      lastMessageTime: '2025-11-21T10:30:00',
      unread: 2,
      avatar: '👨‍🏫'
    },
    {
      id: 2,
      tutorId: 2,
      tutorName: 'سارة محمود حسن',
      lastMessage: 'شكراً لك! سأرسل المواد قريباً',
      lastMessageTime: '2025-11-20T16:45:00',
      unread: 0,
      avatar: '👩‍🏫'
    },
    {
      id: 3,
      tutorId: 3,
      tutorName: 'أحمد حسن محمد',
      lastMessage: 'هل تحتاج مساعدة في موضوع معين؟',
      lastMessageTime: '2025-11-19T14:20:00',
      unread: 1,
      avatar: '👨‍🎓'
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, senderId: 1, text: 'مرحباً! كيف يمكنني مساعدتك؟', timestamp: '2025-11-21T09:00:00', isTutor: true },
      { id: 2, senderId: user?.id, text: 'أحتاج مساعدة في المعادلات التفاضلية', timestamp: '2025-11-21T09:05:00', isTutor: false },
      { id: 3, senderId: 1, text: 'بالتأكيد! سأشرح لك الموضوع بالتفصيل في الجلسة', timestamp: '2025-11-21T09:10:00', isTutor: true },
      { id: 4, senderId: user?.id, text: 'ممتاز! متى يمكننا تحديد موعد؟', timestamp: '2025-11-21T09:15:00', isTutor: false },
      { id: 5, senderId: 1, text: 'أنا متاح غداً الساعة 4 مساءً', timestamp: '2025-11-21T10:00:00', isTutor: true },
      { id: 6, senderId: 1, text: 'سأكون متاحاً في الموعد المحدد', timestamp: '2025-11-21T10:30:00', isTutor: true }
    ],
    2: [
      { id: 1, senderId: 2, text: 'مرحباً! سعيدة بالتواصل معك', timestamp: '2025-11-20T15:00:00', isTutor: true },
      { id: 2, senderId: user?.id, text: 'شكراً! الجلسة كانت مفيدة جداً', timestamp: '2025-11-20T16:30:00', isTutor: false },
      { id: 3, senderId: 2, text: 'شكراً لك! سأرسل المواد قريباً', timestamp: '2025-11-20T16:45:00', isTutor: true }
    ],
    3: [
      { id: 1, senderId: 3, text: 'أهلاً وسهلاً', timestamp: '2025-11-19T14:00:00', isTutor: true },
      { id: 2, senderId: 3, text: 'هل تحتاج مساعدة في موضوع معين؟', timestamp: '2025-11-19T14:20:00', isTutor: true }
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
      isTutor: false
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
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
  };

  const selectedConversation = conversations.find(c => c.id === parseInt(selectedChat));
  const currentMessages = messages[selectedChat] || [];

  return (
    <Container fluid className="py-3" style={{ height: 'calc(100vh - 100px)' }}>
      <Row className="h-100 g-3">
        {/* Conversations List */}
        <Col md={4} lg={3} className="h-100">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 fw-bold">المحادثات</h5>
            </Card.Header>
            <ListGroup variant="flush" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
              {conversations.map(conv => (
                <ListGroup.Item
                  key={conv.id}
                  active={selectedChat === conv.id.toString()}
                  onClick={() => setSelectedChat(conv.id.toString())}
                  style={{ cursor: 'pointer' }}
                  className="border-bottom"
                >
                  <div className="d-flex align-items-start">
                    <div className="fs-2 me-3">{conv.avatar}</div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="mb-0 fw-bold">{conv.tutorName}</h6>
                        <small className="text-muted">{formatTime(conv.lastMessageTime)}</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '200px' }}>
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <Badge bg="danger" pill>{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Chat Area */}
        <Col md={8} lg={9} className="h-100">
          {selectedChat ? (
            <Card className="shadow-sm border-0 h-100 d-flex flex-column">
              {/* Chat Header */}
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="fs-2 me-3">{selectedConversation?.avatar}</div>
                    <div>
                      <h5 className="mb-0 fw-bold">{selectedConversation?.tutorName}</h5>
                      <small className="text-success">● متصل</small>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      📞 اتصال صوتي
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      🎥 اتصال مرئي
                    </Button>
                  </div>
                </div>
              </Card.Header>

              {/* Messages */}
              <Card.Body 
                className="flex-grow-1 overflow-auto" 
                style={{ maxHeight: 'calc(100vh - 300px)', backgroundColor: '#f8f9fa' }}
              >
                {currentMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${!msg.isTutor ? 'justify-content-end' : ''}`}
                  >
                    <div
                      className={`p-3 rounded ${
                        msg.isTutor
                          ? 'bg-white border'
                          : 'bg-primary text-white'
                      }`}
                      style={{ maxWidth: '70%' }}
                    >
                      <p className="mb-1">{msg.text}</p>
                      <small className={msg.isTutor ? 'text-muted' : 'text-white-50'}>
                        {formatTime(msg.timestamp)}
                      </small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </Card.Body>

              {/* Message Input */}
              <Card.Footer className="bg-white border-top">
                <Form onSubmit={handleSendMessage}>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary">
                      📎
                    </Button>
                    <Form.Control
                      type="text"
                      placeholder="اكتب رسالتك..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-grow-1"
                    />
                    <Button variant="primary" type="submit">
                      ➤ إرسال
                    </Button>
                  </div>
                </Form>
              </Card.Footer>
            </Card>
          ) : (
            <Card className="shadow-sm border-0 h-100 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <div className="display-1 mb-3">💬</div>
                <h4>اختر محادثة لبدء المراسلة</h4>
                <p className="text-muted">حدد مدرساً من القائمة للبدء</p>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ChatSystem;
