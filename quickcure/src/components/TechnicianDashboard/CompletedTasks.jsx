import React, { useState, useEffect } from 'react';
import {
  CheckCircle, MapPin, Phone, User, FlaskConical,
  Clock, Download, Search, Filter
} from 'lucide-react';
import {
  Card, Row, Col, Tag, Button, message, List, Avatar,
  Input, Select, DatePicker, Statistic, Typography, Empty, Space
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

// const { Search } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const CompletedTasks = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    thisMonth: 0
  });

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/technician/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const completed = response.data.completedBookings || [];
        setBookings(completed);
        
        // Calculate stats
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        setStats({
          total: completed.length,
          thisWeek: completed.filter(b => new Date(b.deliveredAt) >= weekAgo).length,
          thisMonth: completed.filter(b => new Date(b.deliveredAt) >= monthAgo).length
        });
      }
    } catch (error) {
      message.error('Failed to load completed tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !searchText || 
      booking.patientDetails?.name?.toLowerCase().includes(searchText) ||
      booking.patientDetails?.mobile?.includes(searchText);
    
    const matchesDate = !dateRange || !booking.deliveredAt ||
      (new Date(booking.deliveredAt) >= dateRange[0].startOf('day').toDate() &&
       new Date(booking.deliveredAt) <= dateRange[1].endOf('day').toDate());
    
    return matchesSearch && matchesDate;
  });

  const exportToCSV = () => {
    const headers = ['Patient Name', 'Mobile', 'Address', 'Tests', 'Completed Date', 'Status'];
    const rows = filteredBookings.map(booking => [
      booking.patientDetails?.name || 'N/A',
      booking.patientDetails?.mobile || 'N/A',
      booking.patientDetails?.address || 'N/A',
      (booking.tests || []).map(t => t.name).join('; '),
      booking.deliveredAt ? new Date(booking.deliveredAt).toLocaleDateString('en-GB') : 'N/A',
      'Delivered'
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `completed_tasks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('CSV exported successfully');
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
        <h1 className="text-2xl font-bold text-gray-800">Completed Tasks</h1>
        <p className="text-gray-600 mt-1">View your completed sample collections</p>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Completed"
              value={stats.total}
              prefix={<CheckCircle size={20} className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="This Week"
              value={stats.thisWeek}
              prefix={<CheckCircle size={20} className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="This Month"
              value={stats.thisMonth}
              prefix={<CheckCircle size={20} className="text-purple-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search by patient name or mobile"
              allowClear
              enterButton={<Search size={16} />}
              size="large"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker
              size="large"
              onChange={handleDateChange}
              placeholder={['Start Date', 'End Date']}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Button
              type="primary"
              icon={<Download size={16} />}
              size="large"
              block
              onClick={exportToCSV}
            >
              Export to CSV
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Tasks List */}
      {filteredBookings.length === 0 ? (
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-center">
                <CheckCircle size={48} className="mx-auto text-gray-300 mb-3" />
                <Text className="text-gray-500">No completed tasks found</Text>
                <p className="text-sm text-gray-400 mt-1">Complete some tasks to see them here</p>
              </div>
            }
          />
        </Card>
      ) : (
        <Card>
          <List
            itemLayout="vertical"
            dataSource={filteredBookings}
            renderItem={(booking) => (
              <List.Item
                key={booking._id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={<User />} 
                      style={{ backgroundColor: '#10b981' }}
                      size="large"
                    />
                  }
                  title={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">
                          {booking.patientDetails?.name || 'Patient'}
                        </span>
                        <Tag color="green" icon={<CheckCircle size={12} />}>
                          Delivered
                        </Tag>
                      </div>
                      <Text type="secondary" className="text-sm">
                        {booking.deliveredAt && new Date(booking.deliveredAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </div>
                  }
                  description={
                    <div className="space-y-2 mt-3">
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
        </Card>
      )}
    </div>
  );
};

export default CompletedTasks;