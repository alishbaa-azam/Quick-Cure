import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, Phone, User, FlaskConical,
  Clock, ChevronDown, ChevronUp
} from 'lucide-react';
import {
  Card, Row, Col, Tag, Button, message, List, Avatar,
  Collapse, Typography, Empty, Badge
} from 'antd';
import axios from 'axios';

const { Panel } = Collapse;
const { Text } = Typography;

const UpcomingTasks = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedBookings, setGroupedBookings] = useState({});

  useEffect(() => {
    fetchUpcomingTasks();
  }, []);

  const fetchUpcomingTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/technician/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const upcoming = response.data.upcomingBookings || [];
        setBookings(upcoming);
        groupBookingsByDate(upcoming);
      }
    } catch (error) {
      message.error('Failed to load upcoming tasks');
    } finally {
      setLoading(false);
    }
  };

  const groupBookingsByDate = (bookingsList) => {
    const grouped = bookingsList.reduce((acc, booking) => {
      if (booking.appointmentDetails?.preferredDate) {
        const date = new Date(booking.appointmentDetails.preferredDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(booking);
      }
      return acc;
    }, {});
    
    setGroupedBookings(grouped);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const dates = Object.keys(groupedBookings);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Upcoming Tasks</h1>
        <p className="text-gray-600 mt-1">
          {bookings.length} task{bookings.length !== 1 ? 's' : ''} scheduled for the next 7 days
        </p>
      </div>

      {/* Tasks List */}
      {bookings.length === 0 ? (
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-center">
                <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                <Text className="text-gray-500">No upcoming tasks</Text>
                <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
              </div>
            }
          />
        </Card>
      ) : (
        <Card>
          <Collapse
            bordered={false}
            defaultActiveKey={dates.slice(0, 3)}
            expandIcon={({ isActive }) => isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            className="bg-transparent"
          >
            {dates.map((date, index) => (
              <Panel 
                key={date} 
                header={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge count={groupedBookings[date].length} style={{ backgroundColor: '#2c6774' }} />
                      <span className="font-semibold text-gray-700">{date}</span>
                    </div>
                    <Text type="secondary" className="text-sm">
                      {groupedBookings[date].length} task{groupedBookings[date].length !== 1 ? 's' : ''}
                    </Text>
                  </div>
                }
              >
                <List
                  itemLayout="horizontal"
                  dataSource={groupedBookings[date]}
                  renderItem={(booking) => (
                    <List.Item
                      key={booking._id}
                      className="hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors"
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={<User />} 
                            style={{ backgroundColor: '#2c6774' }}
                            size="large"
                          />
                        }
                        title={
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {booking.patientDetails?.name || 'Patient'}
                            </span>
                            <Tag color={getStatusColor(booking.bookingStatus)}>
                              {getStatusLabel(booking.bookingStatus)}
                            </Tag>
                          </div>
                        }
                        description={
                          <div className="space-y-2 mt-2">
                            <div className="flex items-start gap-2">
                              <MapPin size={14} className="text-gray-400 mt-0.5" />
                              <Text type="secondary" className="text-sm">
                                {booking.patientDetails?.address || 'Address not provided'}
                              </Text>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <Phone size={14} className="text-gray-400 mt-0.5" />
                              <Text type="secondary" className="text-sm">
                                {booking.patientDetails?.mobile || 'N/A'}
                              </Text>
                            </div>

                            <div className="flex items-start gap-2">
                              <FlaskConical size={14} className="text-gray-400 mt-0.5" />
                              <Text type="secondary" className="text-sm">
                                Tests: {(booking.tests || []).map(t => t.name).join(', ') || 'N/A'}
                              </Text>
                            </div>

                            {booking.appointmentDetails?.preferredTime && (
                              <div className="flex items-start gap-2">
                                <Clock size={14} className="text-gray-400 mt-0.5" />
                                <Text type="secondary" className="text-sm">
                                  Time: {booking.appointmentDetails.preferredTime}
                                </Text>
                              </div>
                            )}

                            {booking.lab && (
                              <div className="flex items-center gap-2">
                                <Text type="secondary" className="text-xs">Lab:</Text>
                                <Text className="text-sm font-medium">{booking.lab.name}</Text>
                              </div>
                            )}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        </Card>
      )}
    </div>
  );
};

export default UpcomingTasks;