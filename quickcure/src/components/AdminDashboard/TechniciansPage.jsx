import React, { useState, useEffect } from 'react';
import {
  FlaskConical, Plus, Edit, Trash2, Eye, Search,
  Filter, User, Phone, MapPin, LabIcon
} from 'lucide-react';
import {
  Card, Row, Col, Table, Button, message, Modal, Form,
  Input, Select, Tag, Space, Typography, Avatar, Statistic,
  Descriptions, Spin, Empty
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Text } = Typography;

const TechniciansPage = () => {
  const [technicians, setTechnicians] = useState([]);
  const [labs, setLabs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterLab, setFilterLab] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch technicians
      const techResponse = await axios.get('/api/technicians', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch labs
      const labsResponse = await axios.get('/api/labs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch users without technician role
      const usersResponse = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (techResponse.data) {
        // Enrich technician data with user info
        const enrichedTechs = await Promise.all(
          (Array.isArray(techResponse.data) ? techResponse.data : []).map(async (tech) => {
            try {
              const user = await axios.get(`/api/users/${tech.userId || tech._id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              return { ...tech, user: user.data?.user };
            } catch {
              return tech;
            }
          })
        );
        setTechnicians(enrichedTechs);
      }
      
      if (labsResponse.data) {
        setLabs(Array.isArray(labsResponse.data) ? labsResponse.data : []);
      }
      
      if (usersResponse.data?.users) {
        // Filter users without technician role
        const nonTechUsers = usersResponse.data.users.filter(
          u => u.role !== 'technician'
        );
        setUsers(nonTechUsers);
      }
    } catch (error) {
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTechnician = () => {
    setEditingTechnician(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditTechnician = (record) => {
    setEditingTechnician(record);
    form.setFieldsValue({
      userId: record.userId || record._id,
      labId: record.labId,
      phone: record.phone,
      city: record.city,
      isActive: record.isActive
    });
    setModalVisible(true);
  };

  const handleViewDetails = (record) => {
    setSelectedTechnician(record);
    setDetailModalVisible(true);
  };

  const handleDeleteTechnician = async (record) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/technicians/${record._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      message.success('Technician deleted successfully');
      fetchData();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to delete technician');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      
      if (editingTechnician) {
        // Update existing technician
        await axios.put(
          `/api/technicians/${editingTechnician._id}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Technician updated successfully');
      } else {
        // Create new technician - need to assign role to user first
        if (!values.userId) {
          message.error('Please select a user');
          return;
        }
        
        // Update user role to technician
        await axios.put(
          `/api/admin/users/${values.userId}/role`,
          { role: 'technician', labId: values.labId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Create technician profile
        await axios.post(
          '/api/technicians',
          {
            ...values,
            userId: values.userId,
            availability: 'available',
            assignedBookings: []
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        message.success('Technician created successfully');
      }
      
      setModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = !searchText ||
      tech.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      tech.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      tech.phone?.includes(searchText);
    
    const matchesLab = !filterLab || tech.labId === filterLab;
    
    return matchesSearch && matchesLab;
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<User />} style={{ backgroundColor: '#2c6774' }} />
          <div>
            <div className="font-medium">{text || 'N/A'}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => phone || 'Not provided'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: (city) => city || 'Not provided'
    },
    {
      title: 'Lab',
      dataIndex: 'labId',
      key: 'labId',
      render: (labId) => {
        const lab = labs.find(l => l._id === labId);
        return lab ? (
          <Tag icon={<LabIcon size={12} />} color="blue">
            {lab.name}
          </Tag>
        ) : 'Not assigned';
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: (availability) => {
        const colors = {
          'available': 'green',
          'busy': 'orange',
          'offline': 'default'
        };
        return <Tag color={colors[availability] || 'default'}>{availability || 'N/A'}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => handleViewDetails(record)}
          />
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEditTechnician(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDeleteTechnician(record)}
          />
        </Space>
      )
    }
  ];

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
          <h1 className="text-2xl font-bold text-gray-800">Technicians Management</h1>
          <p className="text-gray-600 mt-1">Manage technicians across all labs</p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleAddTechnician}
        >
          Add Technician
        </Button>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Technicians"
              value={technicians.length}
              prefix={<FlaskConical size={20} className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active"
              value={technicians.filter(t => t.isActive).length}
              prefix={<User size={20} className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Available"
              value={technicians.filter(t => t.availability === 'available').length}
              prefix={<User size={20} className="text-orange-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Labs"
              value={labs.length}
              prefix={<LabIcon size={20} className="text-purple-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12}>
            <Input
              placeholder="Search by name, email, or phone"
              prefix={<Search size={16} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Select
              placeholder="Filter by lab"
              value={filterLab}
              onChange={setFilterLab}
              style={{ width: '100%' }}
              allowClear
            >
              {labs.map(lab => (
                <Select.Option key={lab._id} value={lab._id}>
                  {lab.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Technicians Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredTechnicians}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingTechnician ? 'Edit Technician' : 'Add Technician'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {!editingTechnician && (
            <Form.Item
              label="Select User"
              name="userId"
              rules={[{ required: true, message: 'Please select a user' }]}
            >
              <Select placeholder="Choose a user to assign as technician">
                {users.map(user => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label="Assign to Lab"
            name="labId"
            rules={[{ required: true, message: 'Please select a lab' }]}
          >
            <Select placeholder="Select lab">
              {labs.map(lab => (
                <Select.Option key={lab._id} value={lab._id}>
                  {lab.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please enter city' }]}
          >
            <Input placeholder="Enter city" />
          </Form.Item>

          {editingTechnician && (
            <Form.Item
              label="Status"
              name="isActive"
              valuePropName="checked"
            >
              <Select>
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTechnician ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => {
                setModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Details Modal */}
      <Modal
        title="Technician Details"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedTechnician && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Name">
              {selectedTechnician.name || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedTechnician.email || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedTechnician.phone || 'Not provided'}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {selectedTechnician.city || 'Not provided'}
            </Descriptions.Item>
            <Descriptions.Item label="Lab">
              {labs.find(l => l._id === selectedTechnician.labId)?.name || 'Not assigned'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedTechnician.isActive ? 'green' : 'red'}>
                {selectedTechnician.isActive ? 'Active' : 'Inactive'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Availability">
              <Tag color={
                selectedTechnician.availability === 'available' ? 'green' :
                selectedTechnician.availability === 'busy' ? 'orange' : 'default'
              }>
                {selectedTechnician.availability || 'N/A'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Assigned Tasks">
              {selectedTechnician.assignedBookings?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Member Since">
              {selectedTechnician.createdAt ? new Date(selectedTechnician.createdAt).toLocaleDateString('en-GB') : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Technician ID">
              {selectedTechnician._id}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default TechniciansPage;