import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList, Calendar, CheckCircle, TrendingUp,
  Clock, MapPin, Phone, User
} from 'lucide-react';
import { message, Card, Row, Col, Statistic, Progress, Tag, Button, List, Avatar } from 'antd';
import axios from 'axios';

const TechnicianDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/technician/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setStats(response.data.stats);
        setTodaysBookings(response.data.todaysBookings);
      }
    } catch (error) {
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'assigned': 'orange',
      'sample_collected': 'blue',
      'in_lab': 'purple',
      'report_ready': 'green',
      'delivered': 'default'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'assigned': 'Assigned',
      'sample_collected': 'Sample Collected',
      'in_lab': 'In Lab',
      'report_ready': 'Report Ready',
      'delivered': 'Delivered'
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Technician Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your sample collection tasks</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Tasks"
              value={stats?.today || 0}
              suffix={`/ 6`}
              prefix={<ClipboardList size={20} className="text-blue-500" />}
            />
            <Progress 
              percent={((stats?.today || 0) / 6) * 100} 
              size="small"
              status={stats?.todayRemaining === 0 ? 'exception' : 'active'}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              {stats?.todayRemaining || 0} slots remaining
            </p>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Upcoming Tasks"
              value={stats?.upcoming || 0}
              prefix={<Calendar size={20} className="text-purple-500" />}
            />
            <p className="text-xs text-gray-500 mt-2">Next 7 days</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed (30 days)"
              value={stats?.completed || 0}
              prefix={<CheckCircle size={20} className="text-green-500" />}
            />
            <p className="text-xs text-gray-500 mt-2">This month</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Performance"
              value={stats?.completed || 0}
              suffix="tasks"
              prefix={<TrendingUp size={20} className="text-orange-500" />}
            />
            <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
          </Card>
        </Col>
      </Row>

      {/* Today's Tasks */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock size={20} />
              Today's Tasks
            </span>
            <Link to="/technician/today">
              <Button type="link" size="small">View All</Button>
            </Link>
          </div>
        }
      >
        {todaysBookings.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No tasks assigned for today</p>
            <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          <List
            itemLayout="vertical"
            dataSource={todaysBookings}
            renderItem={(booking) => (
              <List.Item
                key={booking._id}
                actions={[
                  <Link to={`/technician/today`} key="view">
                    <Button type="primary" size="small">
                      {booking.bookingStatus === 'assigned' ? 'Start Collection' : 
                       booking.bookingStatus === 'sample_collected' ? 'Mark In Lab' :
                       booking.bookingStatus === 'in_lab' ? 'Mark Delivered' : 'View Details'}
                    </Button>
                  </Link>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<User />} style={{ backgroundColor: '#2c6774' }} />}
                  title={
                    <div className="flex items-center justify-between">
                      <span>{booking.patientDetails?.name || 'Patient'}</span>
                      <Tag color={getStatusColor(booking.bookingStatus)}>
                        {getStatusLabel(booking.bookingStatus)}
                      </Tag>
                    </div>
                  }
                  description={
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <MapPin size={14} className="inline mr-1" />
                        {booking.patientDetails?.address || 'Address not provided'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <Phone size={14} className="inline mr-1" />
                        {booking.patientDetails?.mobile || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Tests: {(booking.tests || []).map(t => t.name).join(', ') || 'N/A'}
                      </p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Link to="/technician/today">
              <Button 
                type="default" 
                block 
                icon={<ClipboardList size={16} />}
                size="large"
              >
                View Today's Tasks
              </Button>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Link to="/technician/upcoming">
              <Button 
                type="default" 
                block 
                icon={<Calendar size={16} />}
                size="large"
              >
                Upcoming Tasks
              </Button>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Link to="/technician/completed">
              <Button 
                type="default" 
                block 
                icon={<CheckCircle size={16} />}
                size="large"
              >
                Completed Tasks
              </Button>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Link to="/technician/profile">
              <Button 
                type="default" 
                block 
                icon={<User size={16} />}
                size="large"
              >
                My Profile
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TechnicianDashboardHome;