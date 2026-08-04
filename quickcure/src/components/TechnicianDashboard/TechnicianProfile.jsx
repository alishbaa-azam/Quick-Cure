import React, { useState, useEffect } from 'react';
import {
  User, Phone, MapPin, FlaskConical, Calendar,
  Edit, Save, X, Shield, TrendingUp, Clock, ClipboardList
} from 'lucide-react';
import {
  Card, Row, Col, Statistic, Button, message, Form, Input,
  Select, Avatar, Descriptions, Tag, Spin, Typography, Space
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Text } = Typography;

const TechnicianProfile = () => {
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/technician/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTechnician(response.data.technician);
        form.setFieldsValue({
          phone: response.data.technician.phone,
          city: response.data.technician.city,
          availability: response.data.technician.availability
        });
      }
    } catch (error) {
      message.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch('/technician/profile', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      message.success('Profile updated successfully');
      setEditing(false);
      fetchProfile();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      'available': 'green',
      'busy': 'orange',
      'offline': 'default'
    };
    return colors[availability] || 'default';
  };

  const getAvailabilityLabel = (availability) => {
    const labels = {
      'available': 'Available',
      'busy': 'Busy',
      'offline': 'Offline'
    };
    return labels[availability] || availability;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your profile information</p>
        </div>
        {!editing && (
          <Button
            type="primary"
            icon={<Edit size={16} />}
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <Row gutter={[24, 24]}>
          {/* Left Side - Avatar and Basic Info */}
          <Col xs={24} md={8}>
            <div className="text-center">
              <Avatar 
                size={120} 
                icon={<User size={60} />}
                style={{ backgroundColor: '#2c6774', marginBottom: 16 }}
              />
              <h2 className="text-xl font-bold text-gray-800">
                {technician?.name || 'Technician'}
              </h2>
              <Tag color="blue" className="mt-2">
                <Shield size={12} className="mr-1" />
                Technician
              </Tag>
              
              {technician?.availability && (
                <div className="mt-3">
                  <Tag color={getAvailabilityColor(technician.availability)}>
                    {getAvailabilityLabel(technician.availability)}
                  </Tag>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <Text className="text-sm">{technician?.phone || 'Not provided'}</Text>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <Text className="text-sm">{technician?.city || 'Not provided'}</Text>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Side - Details */}
          <Col xs={24} md={16}>
            {editing ? (
              <Card title="Edit Profile" type="inner">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                      >
                        <Input placeholder="Enter phone number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter city' }]}
                      >
                        <Input placeholder="Enter city" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Availability Status"
                    name="availability"
                    rules={[{ required: true, message: 'Please select availability' }]}
                  >
                    <Select>
                      <Select.Option value="available">Available</Select.Option>
                      <Select.Option value="busy">Busy</Select.Option>
                      <Select.Option value="offline">Offline</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit" icon={<Save size={16} />}>
                        Save Changes
                      </Button>
                      <Button onClick={() => {
                        setEditing(false);
                        form.resetFields();
                      }} icon={<X size={16} />}>
                        Cancel
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            ) : (
              <Descriptions title="Profile Information" bordered column={1}>
                <Descriptions.Item label="Full Name">
                  {technician?.name || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {technician?.email || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {technician?.phone || 'Not provided'}
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  {technician?.city || 'Not provided'}
                </Descriptions.Item>
                <Descriptions.Item label="Availability">
                  <Tag color={getAvailabilityColor(technician?.availability)}>
                    {getAvailabilityLabel(technician?.availability)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Lab">
                  {technician?.labId?.name || 'Not assigned'}
                </Descriptions.Item>
                <Descriptions.Item label="Member Since">
                  {technician?.createdAt ? new Date(technician.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={technician?.assignedBookings?.length || 0}
              prefix={<ClipboardList size={20} className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Availability"
              value={getAvailabilityLabel(technician?.availability)}
              prefix={<Clock size={20} className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Performance"
              value="Excellent"
              prefix={<TrendingUp size={20} className="text-orange-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Status"
              value={technician?.isActive ? "Active" : "Inactive"}
              prefix={<Shield size={20} className="text-purple-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Account Information */}
      <Card title="Account Information">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="User ID">
            {technician?.userId || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Technician ID">
            {technician?._id || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Account Status">
            <Tag color={technician?.isActive ? 'green' : 'red'}>
              {technician?.isActive ? 'Active' : 'Inactive'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Account Created">
            {technician?.createdAt ? new Date(technician.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default TechnicianProfile;