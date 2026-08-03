import React, { useState, useEffect } from 'react';
import {
  Clock, MapPin, Phone, User, FlaskConical,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import {
  Card, Row, Col, Tag, Button, message, List, Avatar,
  Modal, Form, Input, Select, Space, Typography, Empty
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Text } = Typography;

const TodaysTasks = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [notifyModalVisible, setNotifyModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTodaysTasks();
  }, []);

  const fetchTodaysTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/technician/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setBookings(response.data.todaysBookings);
      }
    } catch (error) {
      message.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'assigned': 'orange',
      'sample_collected': 'blue',
      'in_lab': 'purple',
      'report_ready': 'green'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'assigned': 'Assigned',
      'sample_collected': 'Sample Collected',
      'in_lab': 'In Lab',
      'report_ready': 'Report Ready'
    };
    return labels[status] || status;
  };

  const handleStatusUpdate = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/technician/booking/${selectedBooking._id}/status`,
        { status: values.status, notes: values.notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      message.success('Status updated successfully');
      setStatusModalVisible(false);
      form.resetFields();
      fetchTodaysTasks();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleNotifyAdmin = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/technician/booking/${selectedBooking._id}/notify-admin`,
        { message: values.message, priority: values.priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      message.success('Lab admin notified successfully');
      setNotifyModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to notify admin');
    }
  };

  const getNextStatus = (currentStatus) => {
    const transitions = {
      'assigned': 'sample_collected',
      'sample_collected': 'in_lab',
      'in_lab': 'delivered',
      'report_ready': 'delivered'
    };
    return transitions[currentStatus];
  };

  const getNextStatusLabel = (currentStatus) => {
    const labels = {
      'assigned': 'Mark as Collected',
      'sample_collected': 'Mark as In Lab',
      'in_lab': 'Mark as Delivered',
      'report_ready': 'Mark as Delivered'
    };
    return labels[currentStatus];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Today's Tasks</h1>
        <p className="text-gray-600 mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Tasks List */}
      {bookings.length === 0 ? (
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-center">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
                <Text className="text-gray-500">No tasks assigned for today</Text>
                <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
              </div>
            }
          />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {bookings.map((booking) => (
            <Col xs={24} lg={12} key={booking._id}>
              <Card
                type="inner"
                title={
                  <div className="flex items-center justify-between">
                    <Space>
                      <Avatar icon={<User />} style={{ backgroundColor: '#2c6774' }} />
                      <span className="font-semibold">
                        {booking.patientDetails?.name || 'Patient'}
                      </span>
                    </Space>
                    <Tag color={getStatusColor(booking.bookingStatus)}>
                      {getStatusLabel(booking.bookingStatus)}
                    </Tag>
                  </div>
                }
                extra={
                  <Space>
                    <Button
                      size="small"
                      icon={<AlertCircle size={14} />}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setNotifyModalVisible(true);
                      }}
                    >
                      Notify Admin
                    </Button>
                    {getNextStatus(booking.bookingStatus) && (
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setStatusModalVisible(true);
                        }}
                      >
                        {getNextStatusLabel(booking.bookingStatus)}
                      </Button>
                    )}
                  </Space>
                }
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <Text type="secondary" className="text-xs">Address</Text>
                      <p className="text-sm">{booking.patientDetails?.address || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <Text type="secondary" className="text-xs">Mobile</Text>
                      <p className="text-sm">{booking.patientDetails?.mobile || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FlaskConical size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <Text type="secondary" className="text-xs">Tests</Text>
                      <p className="text-sm">
                        {(booking.tests || []).map(t => t.name).join(', ') || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {booking.appointmentDetails?.preferredDate && (
                    <div className="flex items-start gap-2">
                      <Clock size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <Text type="secondary" className="text-xs">Preferred Date</Text>
                        <p className="text-sm">
                          {new Date(booking.appointmentDetails.preferredDate).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    </div>
                  )}

                  {booking.lab && (
                    <div className="flex items-start gap-2">
                      <Text type="secondary" className="text-xs">Lab:</Text>
                      <p className="text-sm font-medium">{booking.lab.name}</p>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Status Update Modal */}
      <Modal
        title="Update Status"
        open={statusModalVisible}
        onCancel={() => {
          setStatusModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleStatusUpdate}
        >
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              {selectedBooking && getNextStatus(selectedBooking.bookingStatus) === 'sample_collected' && (
                <Select.Option value="sample_collected">Sample Collected</Select.Option>
              )}
              {selectedBooking && getNextStatus(selectedBooking.bookingStatus) === 'in_lab' && (
                <Select.Option value="in_lab">Received in Lab</Select.Option>
              )}
              {selectedBooking && ['in_lab', 'report_ready'].includes(selectedBooking.bookingStatus) && (
                <Select.Option value="delivered">Report Delivered</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Notes (Optional)"
            name="notes"
          >
            <TextArea rows={3} placeholder="Add any notes..." />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update Status
              </Button>
              <Button onClick={() => {
                setStatusModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Notify Admin Modal */}
      <Modal
        title="Notify Lab Admin"
        open={notifyModalVisible}
        onCancel={() => {
          setNotifyModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleNotifyAdmin}
        >
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter a message' }]}
          >
            <TextArea rows={4} placeholder="Enter your message to lab admin..." />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            initialValue="medium"
          >
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Send Notification
              </Button>
              <Button onClick={() => {
                setNotifyModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodaysTasks;