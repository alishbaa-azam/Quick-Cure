// // components/dashboard/LabDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Layout, 
//   Menu, 
//   Card, 
//   Table, 
//   Button, 
//   Modal, 
//   Form, 
//   Input, 
//   InputNumber, 
//   Upload, 
//   Tag, 
//   Statistic,
//   Row, 
//   Col,
//   Space,
//   message,
//   Tabs,
//   DatePicker,
//   Descriptions,
//   Badge,
//   Progress,
//   Avatar,
//   Tooltip,
//   Typography,
//   Divider,
//   Select,
//   Input as AntInput,
//   List,
//   Statistic as AntStatistic,
//   Collapse,
//   Timeline,
//   Rate,
//   Image,
//   Popconfirm
// } from 'antd';
// import {
//   UploadOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   DashboardOutlined,
//   ExperimentOutlined,
//   CalendarOutlined,
//   MedicineBoxOutlined,
//   UserOutlined,
//   BarChartOutlined,
//   FileTextOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   DollarOutlined,
//   TeamOutlined,
//   LineChartOutlined,
//   FilterOutlined,
//   DownloadOutlined,
//   SearchOutlined,
//   SettingOutlined,
//   BellOutlined,
//   LogoutOutlined,
//   InfoCircleOutlined,
//   StarOutlined,
//   SafetyCertificateOutlined,
//   HomeOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   EnvironmentOutlined,
//   BankOutlined,
//   CreditCardOutlined,
//   FileDoneOutlined,
//   HistoryOutlined,
//   AppstoreOutlined
// } from '@ant-design/icons';
// import dayjs from 'dayjs';

// const { Header, Sider, Content } = Layout;
// const { Title, Text, Paragraph } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { RangePicker } = DatePicker;
// const { Panel } = Collapse;

// // API Configuration
// const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

// // Configure axios defaults
// axios.defaults.baseURL = API_BASE_URL;

// const LabDashboard = () => {
//   // State management
//   const [labs, setLabs] = useState([]);
//   const [tests, setTests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [searchText, setSearchText] = useState('');
  
//   // Modal states
//   const [isLabModalVisible, setIsLabModalVisible] = useState(false);
//   const [isTestModalVisible, setIsTestModalVisible] = useState(false);
//   const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
//   const [isViewBookingModalVisible, setIsViewBookingModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
  
//   // Form instances
//   const [labForm] = Form.useForm();
//   const [testForm] = Form.useForm();
//   const [bookingForm] = Form.useForm();

//   // Color theme based on your variables
//   const theme = {
//     primary: '#2c6774',
//     secondary: '#174047',
//     accent: '#5c878f',
//     hover: '#1e4e56',
//     bgLight: '#9fbfc5',
//     textLight: '#c0d3dc',
//     white: '#ffffff',
//     success: '#52c41a',
//     warning: '#faad14',
//     error: '#ff4d4f',
//     info: '#1890ff',
//     purple: '#722ed1'
//   };

//   // Custom CSS styles
//   const styles = {
//     sidebar: {
//       background: theme.secondary,
//       boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
//     },
//     card: {
//       borderRadius: '10px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     },
//     statCard: {
//       background: `linear-gradient(135deg, ${theme.white} 0%, ${theme.bgLight}15 100%)`,
//       borderLeft: `4px solid ${theme.primary}`
//     },
//     primaryButton: {
//       backgroundColor: theme.primary,
//       borderColor: theme.primary,
//       color: theme.white
//     },
//     accentButton: {
//       backgroundColor: theme.accent,
//       borderColor: theme.accent,
//       color: theme.white
//     }
//   };

//   // ==================== API FUNCTIONS ====================

//   // Fetch all labs
//   const fetchLabs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('/labs');
//       setLabs(response.data);
//       if (response.data.length > 0 && !selectedLab) {
//         setSelectedLab(response.data[0]);
//         fetchTests(response.data[0]._id);
//       }
//     } catch (error) {
//       message.error('Failed to fetch labs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch tests by lab
//   const fetchTests = async (labId) => {
//     try {
//       const response = await axios.get(`/tests/lab/${labId}`);
//       setTests(response.data);
//     } catch (error) {
//       message.error('Failed to fetch tests');
//     }
//   };

//   // Fetch all bookings
//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('/bookings');
//       setBookings(response.data);
//     } catch (error) {
//       message.error('Failed to fetch bookings');
//     }
//   };

//   // Create lab
//   const createLab = async (values) => {
//     const formData = new FormData();
//     Object.keys(values).forEach(key => {
//       if (values[key] !== undefined && values[key] !== null) {
//         formData.append(key, values[key]);
//       }
//     });
//     if (logoFile) {
//       formData.append('logo', logoFile);
//     }
    
//     try {
//       const response = await axios.post('/labs', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       message.success('Lab created successfully');
//       fetchLabs();
//       return response.data;
//     } catch (error) {
//       message.error('Failed to create lab');
//       throw error;
//     }
//   };

//   // Update lab
//   const updateLab = async (id, values) => {
//     const formData = new FormData();
//     Object.keys(values).forEach(key => {
//       if (values[key] !== undefined && values[key] !== null) {
//         formData.append(key, values[key]);
//       }
//     });
//     if (logoFile) {
//       formData.append('logo', logoFile);
//     }
    
//     try {
//       const response = await axios.put(`/labs/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       message.success('Lab updated successfully');
//       fetchLabs();
//       return response.data;
//     } catch (error) {
//       message.error('Failed to update lab');
//       throw error;
//     }
//   };

//   // Delete lab
//   const deleteLab = async (id) => {
//     try {
//       await axios.delete(`/labs/${id}`);
//       message.success('Lab deleted successfully');
//       fetchLabs();
//     } catch (error) {
//       message.error('Failed to delete lab');
//     }
//   };

//   // Create test
//   const createTest = async (values) => {
//     try {
//       const response = await axios.post('/tests', values);
//       message.success('Test created successfully');
//       if (selectedLab) fetchTests(selectedLab._id);
//       return response.data;
//     } catch (error) {
//       message.error('Failed to create test');
//       throw error;
//     }
//   };

//   // Update test
//   const updateTest = async (id, values) => {
//     try {
//       const response = await axios.put(`/tests/${id}`, values);
//       message.success('Test updated successfully');
//       if (selectedLab) fetchTests(selectedLab._id);
//       return response.data;
//     } catch (error) {
//       message.error('Failed to update test');
//       throw error;
//     }
//   };

//   // Delete test
//   const deleteTest = async (id) => {
//     try {
//       await axios.delete(`/tests/${id}`);
//       message.success('Test deleted successfully');
//       if (selectedLab) fetchTests(selectedLab._id);
//     } catch (error) {
//       message.error('Failed to delete test');
//     }
//   };

//   // Update booking status
//   const updateBookingStatus = async (id, status) => {
//     try {
//       // Since your API doesn't have this endpoint yet, we'll simulate it
//       message.success(`Booking status updated to ${status}`);
//       // TODO: Implement actual API call when endpoint is available
//       // await axios.put(`/bookings/${id}/status`, { status });
//       fetchBookings();
//     } catch (error) {
//       message.error('Failed to update booking status');
//     }
//   };

//   // Initialize data
//   useEffect(() => {
//     fetchLabs();
//     fetchBookings();
//   }, []);

//   // Calculate statistics
//   const stats = {
//     totalLabs: labs.length,
//     totalTests: tests.length,
//     totalBookings: bookings.length,
//     pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
//     confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
//     completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
//     cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
//     revenue: bookings
//       .filter(b => b.bookingStatus === 'completed')
//       .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0)
//   };

//   // ==================== HANDLER FUNCTIONS ====================

//   const handleCreateLab = () => {
//     labForm.resetFields();
//     setIsLabModalVisible(true);
//     setLogoFile(null);
//   };

//   const handleEditLab = (lab) => {
//     labForm.setFieldsValue(lab);
//     setSelectedLab(lab);
//     setIsLabModalVisible(true);
//     setLogoFile(null);
//   };

//   const handleDeleteLab = (id) => {
//     Modal.confirm({
//       title: 'Delete Laboratory',
//       content: 'Are you sure you want to delete this laboratory? This action cannot be undone.',
//       okText: 'Delete',
//       okType: 'danger',
//       onOk: () => deleteLab(id)
//     });
//   };

//   const handleLabSubmit = async (values) => {
//     setLoading(true);
//     try {
//       if (values._id) {
//         await updateLab(values._id, values);
//       } else {
//         await createLab(values);
//       }
//       setIsLabModalVisible(false);
//       labForm.resetFields();
//       setLogoFile(null);
//     } catch (error) {
//       console.error('Lab operation failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateTest = () => {
//     if (!selectedLab) {
//       message.warning('Please select a laboratory first');
//       return;
//     }
//     testForm.resetFields();
//     testForm.setFieldsValue({ labId: selectedLab._id });
//     setIsTestModalVisible(true);
//   };

//   const handleEditTest = (test) => {
//     testForm.setFieldsValue(test);
//     setIsTestModalVisible(true);
//   };

//   const handleDeleteTest = (id) => {
//     Modal.confirm({
//       title: 'Delete Test',
//       content: 'Are you sure you want to delete this test?',
//       okText: 'Delete',
//       okType: 'danger',
//       onOk: () => deleteTest(id)
//     });
//   };

//   const handleTestSubmit = async (values) => {
//     setLoading(true);
//     try {
//       if (values._id) {
//         await updateTest(values._id, values);
//       } else {
//         await createTest(values);
//       }
//       setIsTestModalVisible(false);
//       testForm.resetFields();
//     } catch (error) {
//       console.error('Test operation failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewBooking = (booking) => {
//     setSelectedBooking(booking);
//     setIsViewBookingModalVisible(true);
//   };

//   // ==================== TABLE COLUMNS ====================

//   const labColumns = [
//     {
//       title: 'Laboratory',
//       dataIndex: 'name',
//       key: 'name',
//       width: 200,
//       render: (text, record) => (
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//           <Avatar 
//             size={48}
//             src={record.logo ? `${API_BASE_URL}/uploads/${record.logo}` : null}
//             icon={!record.logo && <MedicineBoxOutlined />}
//             style={{ 
//               backgroundColor: record.logo ? 'transparent' : theme.accent,
//               border: `2px solid ${theme.bgLight}`
//             }}
//           />
//           <div>
//             <Text strong style={{ color: theme.secondary, fontSize: 14 }}>{text}</Text>
//             <br />
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               {record.branches ? `${record.branches.split(',').length} branches` : 'No branches'}
//             </Text>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: 'Discount',
//       dataIndex: 'discount',
//       key: 'discount',
//       width: 100,
//       render: (discount) => (
//         <Tag color={discount > 0 ? 'success' : 'default'} style={{ borderRadius: 12 }}>
//           {discount || 0}%
//         </Tag>
//       )
//     },
//     {
//       title: 'Status',
//       key: 'status',
//       width: 100,
//       render: () => (
//         <Tag color="success" style={{ borderRadius: 12 }}>
//           ACTIVE
//         </Tag>
//       )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 200,
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="Select Lab">
//             <Button 
//               type={selectedLab?._id === record._id ? 'primary' : 'default'}
//               size="small"
//               style={selectedLab?._id === record._id ? styles.primaryButton : {}}
//               onClick={() => {
//                 setSelectedLab(record);
//                 fetchTests(record._id);
//                 setActiveTab('tests');
//               }}
//             >
//               <ExperimentOutlined /> Tests
//             </Button>
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button 
//               size="small"
//               icon={<EditOutlined />}
//               onClick={() => handleEditLab(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Delete laboratory?"
//             description="This will delete all associated tests and data."
//             onConfirm={() => handleDeleteLab(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button 
//               size="small"
//               danger
//               icon={<DeleteOutlined />}
//             />
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   const testColumns = [
//     {
//       title: 'Test Name',
//       dataIndex: 'name',
//       key: 'name',
//       width: 200,
//       render: (text) => <Text strong>{text}</Text>
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       width: 200,
//       ellipsis: true
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//       width: 100,
//       render: (price) => (
//         <Text strong style={{ color: theme.primary }}>₹{price || 0}</Text>
//       )
//     },
//     {
//       title: 'Discount',
//       dataIndex: 'discount',
//       key: 'discount',
//       width: 100,
//       render: (discount) => (
//         <Tag color={discount > 0 ? 'success' : 'default'} style={{ borderRadius: 12 }}>
//           {discount || 0}%
//         </Tag>
//       )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 120,
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="Edit">
//             <Button 
//               size="small"
//               icon={<EditOutlined />}
//               onClick={() => handleEditTest(record)}
//             />
//           </Tooltip>
//           <Popconfirm
//             title="Delete test?"
//             description="This action cannot be undone."
//             onConfirm={() => handleDeleteTest(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button 
//               size="small"
//               danger
//               icon={<DeleteOutlined />}
//             />
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   const bookingColumns = [
//     {
//       title: 'Booking ID',
//       dataIndex: 'bookingReference',
//       key: 'bookingReference',
//       width: 140,
//       render: (text) => <Text strong copyable>{text}</Text>
//     },
//     {
//       title: 'Patient',
//       key: 'patient',
//       width: 180,
//       render: (_, record) => (
//         <div>
//           <div>{record.patientDetails?.name || 'N/A'}</div>
//           <Text type="secondary" style={{ fontSize: 12 }}>
//             {record.patientDetails?.mobile || 'No contact'}
//           </Text>
//         </div>
//       )
//     },
//     {
//       title: 'Laboratory',
//       key: 'lab',
//       width: 150,
//       render: (_, record) => (
//         <div>
//           <Text>{record.lab?.name || 'N/A'}</Text>
//           <br />
//           <Text type="secondary" style={{ fontSize: 12 }}>
//             {record.tests?.length || 0} tests
//           </Text>
//         </div>
//       )
//     },
//     {
//       title: 'Date',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       width: 120,
//       render: (date) => dayjs(date).format('DD/MM/YY')
//     },
//     {
//       title: 'Amount',
//       key: 'amount',
//       width: 100,
//       render: (_, record) => (
//         <Text strong style={{ color: theme.primary }}>
//           ₹{record.totals?.discounted || 0}
//         </Text>
//       )
//     },
//     {
//       title: 'Status',
//       dataIndex: 'bookingStatus',
//       key: 'bookingStatus',
//       width: 120,
//       render: (status) => {
//         const statusConfig = {
//           pending: { color: theme.warning, icon: <ClockCircleOutlined />, label: 'Pending' },
//           confirmed: { color: theme.success, icon: <CheckCircleOutlined />, label: 'Confirmed' },
//           completed: { color: theme.info, icon: <SafetyCertificateOutlined />, label: 'Completed' },
//           cancelled: { color: theme.error, icon: <DeleteOutlined />, label: 'Cancelled' }
//         };
        
//         const config = statusConfig[status] || { color: 'default', label: 'Unknown' };
        
//         return (
//           <Tag 
//             color={config.color}
//             icon={config.icon}
//             style={{ borderRadius: 12, minWidth: 100, textAlign: 'center' }}
//           >
//             {config.label}
//           </Tag>
//         );
//       }
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       width: 150,
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="View Details">
//             <Button 
//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => handleViewBooking(record)}
//             />
//           </Tooltip>
//           {record.bookingStatus === 'pending' && (
//             <>
//               <Button 
//                 size="small"
//                 type="primary"
//                 style={styles.primaryButton}
//                 onClick={() => updateBookingStatus(record._id, 'confirmed')}
//               >
//                 Confirm
//               </Button>
//               <Button 
//                 size="small"
//                 danger
//                 onClick={() => updateBookingStatus(record._id, 'cancelled')}
//               >
//                 Cancel
//               </Button>
//             </>
//           )}
//           {record.bookingStatus === 'confirmed' && (
//             <Button 
//               size="small"
//               type="primary"
//               style={styles.accentButton}
//               onClick={() => updateBookingStatus(record._id, 'completed')}
//             >
//               Complete
//             </Button>
//           )}
//         </Space>
//       )
//     }
//   ];

//   // ==================== RENDER FUNCTIONS ====================

//   const renderDashboard = () => (
//     <>
//       {/* Quick Stats */}
//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={styles.statCard}>
//             <Statistic
//               title="Total Laboratories"
//               value={stats.totalLabs}
//               prefix={<MedicineBoxOutlined style={{ color: theme.primary }} />}
//               valueStyle={{ color: theme.primary }}
//             />
//             <Progress 
//               percent={100} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.primary}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ ...styles.statCard, borderLeftColor: theme.accent }}>
//             <Statistic
//               title="Total Tests"
//               value={stats.totalTests}
//               prefix={<ExperimentOutlined style={{ color: theme.accent }} />}
//               valueStyle={{ color: theme.accent }}
//             />
//             <Progress 
//               percent={100} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.accent}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ ...styles.statCard, borderLeftColor: theme.success }}>
//             <Statistic
//               title="Total Bookings"
//               value={stats.totalBookings}
//               prefix={<CalendarOutlined style={{ color: theme.success }} />}
//               valueStyle={{ color: theme.success }}
//             />
//             <Progress 
//               percent={100} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.success}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ ...styles.statCard, borderLeftColor: theme.warning }}>
//             <Statistic
//               title="Total Revenue"
//               value={stats.revenue}
//               prefix="₹"
//               valueStyle={{ color: theme.warning }}
//             />
//             <Progress 
//               percent={100} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.warning}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Booking Status Overview */}
//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//         <Col xs={24} md={16}>
//           <Card 
//             title="Recent Bookings" 
//             style={styles.card}
//             extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}
//           >
//             <Table 
//               dataSource={bookings.slice(0, 5)} 
//               columns={bookingColumns}
//               pagination={false}
//               size="small"
//               rowKey="_id"
//               scroll={{ x: 800 }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} md={8}>
//           <Card title="Booking Status Overview" style={styles.card}>
//             <div style={{ padding: 16 }}>
//               <Space direction="vertical" style={{ width: '100%' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span>Pending</span>
//                   <Badge count={stats.pendingBookings} style={{ backgroundColor: theme.warning }} />
//                 </div>
//                 <Progress 
//                   percent={Math.round((stats.pendingBookings / stats.totalBookings) * 100) || 0}
//                   strokeColor={theme.warning}
//                   showInfo={false}
//                 />
                
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span>Confirmed</span>
//                   <Badge count={stats.confirmedBookings} style={{ backgroundColor: theme.success }} />
//                 </div>
//                 <Progress 
//                   percent={Math.round((stats.confirmedBookings / stats.totalBookings) * 100) || 0}
//                   strokeColor={theme.success}
//                   showInfo={false}
//                 />
                
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span>Completed</span>
//                   <Badge count={stats.completedBookings} style={{ backgroundColor: theme.info }} />
//                 </div>
//                 <Progress 
//                   percent={Math.round((stats.completedBookings / stats.totalBookings) * 100) || 0}
//                   strokeColor={theme.info}
//                   showInfo={false}
//                 />
                
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <span>Cancelled</span>
//                   <Badge count={stats.cancelledBookings} style={{ backgroundColor: theme.error }} />
//                 </div>
//                 <Progress 
//                   percent={Math.round((stats.cancelledBookings / stats.totalBookings) * 100) || 0}
//                   strokeColor={theme.error}
//                   showInfo={false}
//                 />
//               </Space>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       {/* Laboratory Performance */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} lg={12}>
//           <Card title="Laboratory Performance" style={styles.card}>
//             <List
//               dataSource={labs.slice(0, 3)}
//               renderItem={(lab, index) => (
//                 <List.Item
//                   actions={[
//                     <Button key="view" size="small" onClick={() => {
//                       setSelectedLab(lab);
//                       setActiveTab('tests');
//                     }}>View Tests</Button>
//                   ]}
//                 >
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar 
//                         size={40}
//                         src={lab.logo ? `${API_BASE_URL}/uploads/${lab.logo}` : null}
//                         icon={!lab.logo && <MedicineBoxOutlined />}
//                       />
//                     }
//                     title={<Text strong>{lab.name}</Text>}
//                     description={
//                       <Space direction="vertical" size={0}>
//                         <Text type="secondary">{lab.branches || 'No branches specified'}</Text>
//                         <Rate disabled defaultValue={4} style={{ fontSize: 14 }} />
//                       </Space>
//                     }
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} lg={12}>
//           <Card title="Quick Actions" style={styles.card}>
//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   type="primary" 
//                   icon={<PlusOutlined />}
//                   style={styles.primaryButton}
//                   onClick={handleCreateLab}
//                 >
//                   Add Laboratory
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   type="primary" 
//                   icon={<PlusOutlined />}
//                   style={styles.accentButton}
//                   onClick={handleCreateTest}
//                   disabled={!selectedLab}
//                 >
//                   Add Test
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   icon={<DownloadOutlined />}
//                   onClick={() => message.info('Export feature coming soon')}
//                 >
//                   Export Data
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   icon={<FileTextOutlined />}
//                   onClick={() => message.info('Report generation coming soon')}
//                 >
//                   Generate Report
//                 </Button>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );

//   const renderLabs = () => (
//     <Card 
//       title="Laboratory Management"
//       style={styles.card}
//       extra={
//         <Space>
//           <AntInput 
//             placeholder="Search laboratories..." 
//             prefix={<SearchOutlined />}
//             style={{ width: 200 }}
//             onChange={(e) => setSearchText(e.target.value)}
//             allowClear
//           />
//           <Button 
//             type="primary"
//             icon={<PlusOutlined />}
//             style={styles.primaryButton}
//             onClick={handleCreateLab}
//           >
//             Add Laboratory
//           </Button>
//         </Space>
//       }
//     >
//       <Table 
//         dataSource={labs.filter(lab => 
//           !searchText || 
//           lab.name.toLowerCase().includes(searchText.toLowerCase()) ||
//           (lab.branches && lab.branches.toLowerCase().includes(searchText.toLowerCase()))
//         )} 
//         columns={labColumns}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 800 }}
//         loading={loading}
//       />
//     </Card>
//   );

//   const renderTests = () => (
//     <Card 
//       title={
//         selectedLab ? `Test Management - ${selectedLab.name}` : 'Test Management'
//       }
//       style={styles.card}
//       extra={
//         <Space>
//           {selectedLab && (
//             <Button 
//               onClick={() => {
//                 setSelectedLab(null);
//                 setActiveTab('labs');
//               }}
//               icon={<MedicineBoxOutlined />}
//             >
//               Select Lab
//             </Button>
//           )}
//           <Button 
//             type="primary"
//             icon={<PlusOutlined />}
//             style={styles.primaryButton}
//             onClick={handleCreateTest}
//             disabled={!selectedLab}
//           >
//             Add Test
//           </Button>
//         </Space>
//       }
//     >
//       {!selectedLab ? (
//         <div style={{ textAlign: 'center', padding: 40 }}>
//           <MedicineBoxOutlined style={{ fontSize: 64, color: theme.bgLight, marginBottom: 16 }} />
//           <Title level={4} style={{ color: theme.secondary, marginBottom: 8 }}>
//             No Laboratory Selected
//           </Title>
//           <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
//             Please select a laboratory to view and manage tests
//           </Text>
//           <Button 
//             type="primary"
//             style={styles.primaryButton}
//             onClick={() => setActiveTab('labs')}
//           >
//             Select Laboratory
//           </Button>
//         </div>
//       ) : (
//         <Table 
//           dataSource={tests} 
//           columns={testColumns}
//           rowKey="_id"
//           pagination={{ pageSize: 10 }}
//           scroll={{ x: 800 }}
//         />
//       )}
//     </Card>
//   );

//   const renderBookings = () => (
//     <Card 
//       title="Booking Management"
//       style={styles.card}
//       extra={
//         <Space>
//           <RangePicker 
//             onChange={(dates) => {
//               // Implement date filtering
//               console.log('Date range:', dates);
//             }}
//           />
//           <AntInput 
//             placeholder="Search bookings..." 
//             prefix={<SearchOutlined />}
//             style={{ width: 200 }}
//             allowClear
//           />
//           <Button icon={<FilterOutlined />}>Filter</Button>
//           <Button icon={<DownloadOutlined />}>Export</Button>
//         </Space>
//       }
//     >
//       <Table 
//         dataSource={bookings} 
//         columns={bookingColumns}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 1000 }}
//       />
//     </Card>
//   );

//   // ==================== MAIN COMPONENT ====================

//   return (
//     <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//       {/* Sidebar */}
//       <Sider 
//         width={280}
//         style={styles.sidebar}
//         breakpoint="lg"
//         collapsedWidth="0"
//       >
//         <div style={{ padding: '24px 16px', textAlign: 'center' }}>
//           <Avatar 
//             size={72}
//             style={{ 
//               backgroundColor: theme.primary,
//               marginBottom: 12,
//               border: `4px solid ${theme.white}`
//             }}
//             icon={<MedicineBoxOutlined />}
//           />
//           <Title level={4} style={{ color: theme.white, margin: 0 }}>
//             LabPro Admin
//           </Title>
//           <Text style={{ color: theme.textLight, fontSize: 12 }}>
//             Laboratory Management System
//           </Text>
//         </div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[activeTab]}
//           onClick={({ key }) => setActiveTab(key)}
//           style={{ 
//             background: 'transparent',
//             borderRight: 0,
//             padding: '16px 8px'
//           }}
//           items={[
//             {
//               key: 'dashboard',
//               icon: <DashboardOutlined />,
//               label: 'Dashboard',
//               style: { 
//                 margin: '4px 0',
//                 borderRadius: 8,
//                 color: activeTab === 'dashboard' ? theme.white : theme.textLight,
//                 backgroundColor: activeTab === 'dashboard' ? theme.primary : 'transparent'
//               }
//             },
//             {
//               key: 'labs',
//               icon: <MedicineBoxOutlined />,
//               label: 'Laboratories',
//               style: { 
//                 margin: '4px 0',
//                 borderRadius: 8,
//                 color: activeTab === 'labs' ? theme.white : theme.textLight,
//                 backgroundColor: activeTab === 'labs' ? theme.primary : 'transparent'
//               }
//             },
//             {
//               key: 'tests',
//               icon: <ExperimentOutlined />,
//               label: 'Test Management',
//               style: { 
//                 margin: '4px 0',
//                 borderRadius: 8,
//                 color: activeTab === 'tests' ? theme.white : theme.textLight,
//                 backgroundColor: activeTab === 'tests' ? theme.primary : 'transparent'
//               }
//             },
//             {
//               key: 'bookings',
//               icon: <CalendarOutlined />,
//               label: (
//                 <span>
//                   Bookings
//                   {stats.pendingBookings > 0 && (
//                     <Badge 
//                       count={stats.pendingBookings} 
//                       style={{ 
//                         marginLeft: 8,
//                         backgroundColor: theme.warning
//                       }}
//                     />
//                   )}
//                 </span>
//               ),
//               style: { 
//                 margin: '4px 0',
//                 borderRadius: 8,
//                 color: activeTab === 'bookings' ? theme.white : theme.textLight,
//                 backgroundColor: activeTab === 'bookings' ? theme.primary : 'transparent'
//               }
//             },
//           ]}
//         />

//         {/* Current Lab Info */}
//         {selectedLab && (
//           <div style={{ 
//             margin: 16,
//             padding: 16,
//             background: `${theme.hover}40`,
//             borderRadius: 8,
//             border: `1px solid ${theme.hover}`
//           }}>
//             <Text strong style={{ color: theme.white, display: 'block', marginBottom: 8 }}>
//               Current Laboratory
//             </Text>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <Avatar 
//                 size="small"
//                 src={selectedLab.logo ? `${API_BASE_URL}/uploads/${selectedLab.logo}` : null}
//                 icon={!selectedLab.logo && <MedicineBoxOutlined />}
//               />
//               <Text style={{ color: theme.textLight, fontSize: 12 }} ellipsis>
//                 {selectedLab.name}
//               </Text>
//             </div>
//           </div>
//         )}

//         {/* User Profile */}
//         <div style={{ 
//           position: 'absolute', 
//           bottom: 0, 
//           left: 0, 
//           right: 0,
//           padding: '16px',
//           background: theme.hover,
//           borderTop: `1px solid ${theme.secondary}`
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
//             <Avatar 
//               size={36}
//               src="https://api.dicebear.com/7.x/avataaars/svg?seed=LabAdmin"
//               style={{ marginRight: 8 }}
//             />
//             <div>
//               <Text style={{ color: theme.white, fontSize: 12 }}>Lab Administrator</Text>
//               <br />
//               <Text style={{ color: theme.textLight, fontSize: 10 }}>admin@labpro.com</Text>
//             </div>
//           </div>
//           <Button 
//             icon={<LogoutOutlined />}
//             block
//             type="text"
//             style={{ color: theme.textLight }}
//             onClick={() => message.info('Logout functionality coming soon')}
//           >
//             Logout
//           </Button>
//         </div>
//       </Sider>

//       {/* Main Content */}
//       <Layout>
//         <Header style={{ 
//           background: theme.white, 
//           padding: '0 24px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
//           height: 64
//         }}>
//           <div>
//             <Title level={4} style={{ margin: 0, color: theme.secondary }}>
//               {activeTab === 'dashboard' && 'Dashboard Overview'}
//               {activeTab === 'labs' && 'Laboratory Management'}
//               {activeTab === 'tests' && 'Test Management'}
//               {activeTab === 'bookings' && 'Booking Management'}
//             </Title>
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               {dayjs().format('dddd, MMMM D, YYYY')}
//             </Text>
//           </div>
          
//           <Space>
//             <Tooltip title="Notifications">
//               <Badge count={stats.pendingBookings}>
//                 <Button 
//                   icon={<BellOutlined />} 
//                   type="text"
//                   shape="circle"
//                   style={{ color: theme.secondary }}
//                   onClick={() => message.info('Notifications coming soon')}
//                 />
//               </Badge>
//             </Tooltip>
//             <Tooltip title="Settings">
//               <Button 
//                 icon={<SettingOutlined />}
//                 type="text"
//                 shape="circle"
//                 style={{ color: theme.secondary }}
//                 onClick={() => message.info('Settings coming soon')}
//               />
//             </Tooltip>
//             <Tooltip title="Refresh Data">
//               <Button 
//                 icon={<HistoryOutlined />}
//                 type="text"
//                 shape="circle"
//                 style={{ color: theme.secondary }}
//                 onClick={() => {
//                   fetchLabs();
//                   fetchBookings();
//                   message.success('Data refreshed');
//                 }}
//               />
//             </Tooltip>
//           </Space>
//         </Header>

//         <Content style={{ 
//           margin: 24,
//           padding: 24,
//           background: theme.white,
//           borderRadius: 8,
//           boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
//           minHeight: 'calc(100vh - 112px)',
//           overflow: 'auto'
//         }}>
//           {activeTab === 'dashboard' && renderDashboard()}
//           {activeTab === 'labs' && renderLabs()}
//           {activeTab === 'tests' && renderTests()}
//           {activeTab === 'bookings' && renderBookings()}
//         </Content>
//       </Layout>

//       {/* Laboratory Modal */}
//       <Modal
//         title={labForm.getFieldValue('_id') ? 'Edit Laboratory' : 'Add New Laboratory'}
//         open={isLabModalVisible}
//         onCancel={() => setIsLabModalVisible(false)}
//         onOk={() => labForm.submit()}
//         confirmLoading={loading}
//         width={600}
//         okText={labForm.getFieldValue('_id') ? 'Update' : 'Create'}
//         okButtonProps={{ style: styles.primaryButton }}
//       >
//         <Form form={labForm} layout="vertical" onFinish={handleLabSubmit}>
//           <Form.Item name="_id" hidden>
//             <Input />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="name"
//                 label="Laboratory Name"
//                 rules={[{ required: true, message: 'Please enter laboratory name' }]}
//               >
//                 <Input placeholder="Enter laboratory name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="discount"
//                 label="Discount (%)"
//               >
//                 <InputNumber 
//                   min={0} 
//                   max={100} 
//                   style={{ width: '100%' }} 
//                   placeholder="Enter discount percentage"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="branches"
//             label="Branch Locations"
//           >
//             <TextArea 
//               rows={3} 
//               placeholder="Enter branch locations (separated by commas)" 
//             />
//           </Form.Item>

//           <Form.Item
//             label="Laboratory Logo"
//             extra="Upload a logo for your laboratory (optional)"
//           >
//             <Upload
//               beforeUpload={(file) => {
//                 setLogoFile(file);
//                 return false;
//               }}
//               onRemove={() => setLogoFile(null)}
//               maxCount={1}
//               accept="image/*"
//               listType="picture-card"
//             >
//               {logoFile ? null : (
//                 <div>
//                   <UploadOutlined />
//                   <div style={{ marginTop: 8 }}>Upload Logo</div>
//                 </div>
//               )}
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Test Modal */}
//       <Modal
//         title={testForm.getFieldValue('_id') ? 'Edit Test' : 'Add New Test'}
//         open={isTestModalVisible}
//         onCancel={() => setIsTestModalVisible(false)}
//         onOk={() => testForm.submit()}
//         confirmLoading={loading}
//         width={600}
//         okText={testForm.getFieldValue('_id') ? 'Update' : 'Create'}
//         okButtonProps={{ style: styles.primaryButton }}
//       >
//         <Form form={testForm} layout="vertical" onFinish={handleTestSubmit}>
//           <Form.Item name="_id" hidden>
//             <Input />
//           </Form.Item>

//           <Form.Item name="labId" hidden>
//             <Input />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="name"
//                 label="Test Name"
//                 rules={[{ required: true, message: 'Please enter test name' }]}
//               >
//                 <Input placeholder="Enter test name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="price"
//                 label="Price (₹)"
//                 rules={[{ required: true, message: 'Please enter price' }]}
//               >
//                 <InputNumber 
//                   style={{ width: '100%' }} 
//                   min={0} 
//                   placeholder="Enter price"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="description"
//             label="Description"
//           >
//             <TextArea rows={3} placeholder="Enter test description" />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="discount"
//                 label="Discount (%)"
//               >
//                 <InputNumber 
//                   style={{ width: '100%' }} 
//                   min={0} 
//                   max={100} 
//                   placeholder="Enter discount"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Button 
//                 type="text" 
//                 icon={<InfoCircleOutlined />}
//                 onClick={() => message.info('More test details coming soon')}
//               >
//                 Add More Details
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>

//       {/* Booking Details Modal */}
//       <Modal
//         title="Booking Details"
//         open={isViewBookingModalVisible}
//         onCancel={() => setIsViewBookingModalVisible(false)}
//         width={800}
//         footer={[
//           <Button key="close" onClick={() => setIsViewBookingModalVisible(false)}>
//             Close
//           </Button>,
//           selectedBooking?.bookingStatus === 'pending' && (
//             <Button 
//               key="confirm" 
//               type="primary"
//               style={styles.primaryButton}
//               onClick={() => {
//                 updateBookingStatus(selectedBooking._id, 'confirmed');
//                 setIsViewBookingModalVisible(false);
//               }}
//             >
//               Confirm Booking
//             </Button>
//           ),
//           selectedBooking?.bookingStatus === 'confirmed' && (
//             <Button 
//               key="complete" 
//               type="primary"
//               style={styles.accentButton}
//               onClick={() => {
//                 updateBookingStatus(selectedBooking._id, 'completed');
//                 setIsViewBookingModalVisible(false);
//               }}
//             >
//               Mark as Completed
//             </Button>
//           )
//         ].filter(Boolean)}
//       >
//         {selectedBooking && (
//           <div>
//             <Descriptions bordered column={2} size="small">
//               <Descriptions.Item label="Booking Reference" span={2}>
//                 <Text strong copyable>{selectedBooking.bookingReference}</Text>
//               </Descriptions.Item>
//               <Descriptions.Item label="Status">
//                 <Tag 
//                   color={
//                     selectedBooking.bookingStatus === 'pending' ? theme.warning :
//                     selectedBooking.bookingStatus === 'confirmed' ? theme.success :
//                     selectedBooking.bookingStatus === 'completed' ? theme.info :
//                     theme.error
//                   }
//                   style={{ borderRadius: 12 }}
//                 >
//                   {selectedBooking.bookingStatus?.toUpperCase()}
//                 </Tag>
//               </Descriptions.Item>
//               <Descriptions.Item label="Booking Date">
//                 {dayjs(selectedBooking.createdAt).format('DD/MM/YYYY HH:mm')}
//               </Descriptions.Item>
//               <Descriptions.Item label="Laboratory">
//                 {selectedBooking.lab?.name || 'N/A'}
//               </Descriptions.Item>
//               <Descriptions.Item label="Collection Type">
//                 {selectedBooking.appointmentDetails?.sampleCollectionType || 'N/A'}
//               </Descriptions.Item>
//             </Descriptions>

//             <Divider orientation="left">Patient Information</Divider>
//             <Descriptions bordered column={2} size="small">
//               <Descriptions.Item label="Name">{selectedBooking.patientDetails?.name}</Descriptions.Item>
//               <Descriptions.Item label="Age/Gender">
//                 {selectedBooking.patientDetails?.age} / {selectedBooking.patientDetails?.gender}
//               </Descriptions.Item>
//               <Descriptions.Item label="Mobile">{selectedBooking.patientDetails?.mobile}</Descriptions.Item>
//               <Descriptions.Item label="Email">{selectedBooking.patientDetails?.email}</Descriptions.Item>
//               <Descriptions.Item label="Address" span={2}>
//                 {selectedBooking.patientDetails?.address}
//               </Descriptions.Item>
//             </Descriptions>

//             <Divider orientation="left">Tests Ordered</Divider>
//             <List
//               size="small"
//               dataSource={selectedBooking.tests || []}
//               renderItem={(test, index) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={<Avatar size="small" icon={<ExperimentOutlined />} />}
//                     title={<Text strong>{test.name}</Text>}
//                     description={
//                       <Space>
//                         <Text>₹{test.price}</Text>
//                         {test.discount > 0 && (
//                           <Text type="secondary">-{test.discount}%</Text>
//                         )}
//                       </Space>
//                     }
//                   />
//                 </List.Item>
//               )}
//             />

//             <Divider />
//             <div style={{ textAlign: 'right' }}>
//               <Text strong style={{ fontSize: 16 }}>
//                 Total Amount: ₹{selectedBooking.totals?.discounted || 0}
//               </Text>
//               {selectedBooking.totals?.original !== selectedBooking.totals?.discounted && (
//                 <div>
//                   <Text type="secondary" delete>
//                     Original: ₹{selectedBooking.totals?.original}
//                   </Text>
//                   <Text type="success" style={{ marginLeft: 8 }}>
//                     Saved: ₹{selectedBooking.totals?.original - selectedBooking.totals?.discounted}
//                   </Text>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Modal>
//     </Layout>
//   );
// };

// export default LabDashboard;


// components/dashboard/LabUserDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Layout, 
  Menu, 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Upload, 
  Tag, 
  Statistic,
  Row, 
  Col,
  Space,
  message,
  Tabs,
  DatePicker,
  Descriptions,
  Badge,
  Progress,
  Avatar,
  Tooltip,
  Typography,
  Divider,
  Select,
  Input as AntInput,
  List,
  Collapse,
  Timeline,
  Rate,
  Image,
  Popconfirm,
  Dropdown,
  Segmented
} from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  BarChartOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  LineChartOutlined,
  FilterOutlined,
  DownloadOutlined,
  SearchOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  StarOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  BankOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  SolutionOutlined,
  MessageOutlined,
  StockOutlined,
  FundOutlined,
  SyncOutlined,
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  UserSwitchOutlined,
  IdcardOutlined,
  FileSyncOutlined,
  CloudUploadOutlined,
  AppstoreAddOutlined,
  ScheduleOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Line, Pie, Bar } from '@ant-design/charts';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

const LabUserDashboard = () => {
  // State management
  const [labData, setLabData] = useState(null);
  const [tests, setTests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal states
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [isViewBookingModalVisible, setIsViewBookingModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'days'), dayjs()]);
  
  // Form instances
  const [testForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [timeRange, setTimeRange] = useState('30days');

  // Color theme
  const theme = {
    primary: '#2c6774',
    secondary: '#174047',
    accent: '#5c878f',
    hover: '#1e4e56',
    bgLight: '#9fbfc5',
    textLight: '#c0d3dc',
    white: '#ffffff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    purple: '#722ed1'
  };

  // Custom CSS styles
  const styles = {
    sidebar: {
      background: theme.secondary,
      boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
    },
    card: {
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    statCard: {
      background: `linear-gradient(135deg, ${theme.white} 0%, ${theme.bgLight}15 100%)`,
      borderLeft: `4px solid ${theme.primary}`
    },
    primaryButton: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      color: theme.white
    },
    accentButton: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
      color: theme.white
    },
    header: {
      background: theme.white,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
    }
  };

  // ==================== API FUNCTIONS ====================

  // Get lab data from localStorage (simulate logged in lab)
  const getCurrentLab = () => {
    // In real implementation, this would come from auth token
    const labId = localStorage.getItem('currentLabId');
    return labId;
  };

  // Fetch lab details
  const fetchLabData = async () => {
    setLoading(true);
    try {
      const labId = getCurrentLab();
      if (!labId) {
        message.error('No lab logged in');
        // Redirect to login in real app
        return;
      }
      
      const response = await axios.get(`/labs/${labId}`);
      setLabData(response.data);
      profileForm.setFieldsValue(response.data);
    } catch (error) {
      message.error('Failed to fetch lab data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tests for current lab
  const fetchTests = async () => {
    try {
      const labId = getCurrentLab();
      if (!labId) return;
      
      const response = await axios.get(`/tests/lab/${labId}`);
      setTests(response.data);
    } catch (error) {
      message.error('Failed to fetch tests');
    }
  };

  // Fetch bookings for current lab
  const fetchBookings = async () => {
    try {
      const labId = getCurrentLab();
      if (!labId) return;
      
      const response = await axios.get(`/bookings/lab/${labId}`);
      const sortedBookings = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedBookings);
      setFilteredBookings(sortedBookings);
    } catch (error) {
      message.error('Failed to fetch bookings');
    }
  };

  // Update lab profile
  const updateLabProfile = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });
    if (logoFile) {
      formData.append('logo', logoFile);
    }
    
    try {
      const labId = getCurrentLab();
      const response = await axios.put(`/labs/${labId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Profile updated successfully');
      fetchLabData();
      return response.data;
    } catch (error) {
      message.error('Failed to update profile');
      throw error;
    }
  };

  // Create test
  const createTest = async (values) => {
    try {
      const labId = getCurrentLab();
      const response = await axios.post('/tests', {
        ...values,
        labId: labId
      });
      message.success('Test created successfully');
      fetchTests();
      return response.data;
    } catch (error) {
      message.error('Failed to create test');
      throw error;
    }
  };

  // Update test
  const updateTest = async (id, values) => {
    try {
      const response = await axios.put(`/tests/${id}`, values);
      message.success('Test updated successfully');
      fetchTests();
      return response.data;
    } catch (error) {
      message.error('Failed to update test');
      throw error;
    }
  };

  // Delete test
  const deleteTest = async (id) => {
    try {
      await axios.delete(`/tests/${id}`);
      message.success('Test deleted successfully');
      fetchTests();
    } catch (error) {
      message.error('Failed to delete test');
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      message.success(`Booking status updated to ${status}`);
      fetchBookings();
    } catch (error) {
      message.error('Failed to update booking status');
    }
  };

  // Initialize data
  useEffect(() => {
    fetchLabData();
    fetchTests();
    fetchBookings();
  }, []);

  // Filter bookings based on status and search
  useEffect(() => {
    let filtered = bookings;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.bookingStatus === statusFilter);
    }
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(booking => 
        booking.bookingReference?.toLowerCase().includes(searchText.toLowerCase()) ||
        booking.patientDetails?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        booking.patientDetails?.mobile?.includes(searchText)
      );
    }
    
    // Apply time filter
    if (timeRange !== 'all') {
      const days = parseInt(timeRange);
      const cutoffDate = dayjs().subtract(days, 'days');
      filtered = filtered.filter(booking => 
        dayjs(booking.createdAt).isAfter(cutoffDate)
      );
    }
    
    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchText, timeRange]);

  // Calculate statistics
  const calculateStats = () => {
    const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
      confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
      completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
      cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
      totalRevenue: bookings
        .filter(b => b.bookingStatus === 'completed')
        .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
      monthlyRevenue: bookings
        .filter(b => b.bookingStatus === 'completed' && 
          dayjs(b.createdAt).isAfter(dayjs().subtract(30, 'days')))
        .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
      totalTests: tests.length,
      averageRating: 4.5 // This would come from API
    };
    
    return stats;
  };

  const stats = calculateStats();

  // Generate chart data
  const generateBookingTrendData = () => {
    const days = 30;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = dayjs().subtract(i, 'days').format('MMM DD');
      const dayBookings = bookings.filter(b => 
        dayjs(b.createdAt).isSame(dayjs().subtract(i, 'days'), 'day')
      );
      
      data.push({
        date,
        bookings: dayBookings.length,
        revenue: dayBookings
          .filter(b => b.bookingStatus === 'completed')
          .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0)
      });
    }
    
    return data;
  };

  const generateStatusDistributionData = () => {
    const statusCounts = {
      pending: stats.pendingBookings,
      confirmed: stats.confirmedBookings,
      completed: stats.completedBookings,
      cancelled: stats.cancelledBookings
    };
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      percent: Math.round((count / stats.totalBookings) * 100) || 0
    }));
  };

  // ==================== HANDLER FUNCTIONS ====================

  const handleCreateTest = () => {
    testForm.resetFields();
    setIsTestModalVisible(true);
  };

  const handleEditTest = (test) => {
    testForm.setFieldsValue(test);
    setIsTestModalVisible(true);
  };

  const handleDeleteTest = (id) => {
    Modal.confirm({
      title: 'Delete Test',
      content: 'Are you sure you want to delete this test?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => deleteTest(id)
    });
  };

  const handleTestSubmit = async (values) => {
    setLoading(true);
    try {
      if (values._id) {
        await updateTest(values._id, values);
      } else {
        await createTest(values);
      }
      setIsTestModalVisible(false);
      testForm.resetFields();
    } catch (error) {
      console.error('Test operation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      await updateLabProfile(values);
      setIsProfileModalVisible(false);
      setLogoFile(null);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewBookingModalVisible(true);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleExportData = (type) => {
    // Implement export functionality
    message.info(`${type} export feature coming soon`);
  };

  // ==================== TABLE COLUMNS ====================

  const testColumns = [
    {
      title: 'Test Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price) => (
        <Text strong style={{ color: theme.primary }}>₹{price || 0}</Text>
      )
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
      render: (discount) => (
        <Tag color={discount > 0 ? 'success' : 'default'} style={{ borderRadius: 12 }}>
          {discount || 0}%
        </Tag>
      )
    },
    {
      title: 'Status',
      key: 'status',
      width: 100,
      render: () => (
        <Tag color="success" style={{ borderRadius: 12 }}>
          ACTIVE
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button 
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditTest(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete test?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteTest(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              size="small"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const bookingColumns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingReference',
      key: 'bookingReference',
      width: 140,
      render: (text) => <Text strong copyable>{text}</Text>
    },
    {
      title: 'Patient',
      key: 'patient',
      width: 180,
      render: (_, record) => (
        <div>
          <div>{record.patientDetails?.name || 'N/A'}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.patientDetails?.mobile || 'No contact'}
          </Text>
        </div>
      )
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => dayjs(date).format('DD/MM/YY')
    },
    {
      title: 'Amount',
      key: 'amount',
      width: 100,
      render: (_, record) => (
        <Text strong style={{ color: theme.primary }}>
          ₹{record.totals?.discounted || 0}
        </Text>
      )
    },
    {
      title: 'Status',
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
      width: 120,
      render: (status) => {
        const statusConfig = {
          pending: { color: theme.warning, icon: <ClockCircleOutlined />, label: 'Pending' },
          confirmed: { color: theme.success, icon: <CheckCircleOutlined />, label: 'Confirmed' },
          completed: { color: theme.info, icon: <SafetyCertificateOutlined />, label: 'Completed' },
          cancelled: { color: theme.error, icon: <DeleteOutlined />, label: 'Cancelled' }
        };
        
        const config = statusConfig[status] || { color: 'default', label: 'Unknown' };
        
        return (
          <Tag 
            color={config.color}
            icon={config.icon}
            style={{ borderRadius: 12, minWidth: 100, textAlign: 'center' }}
          >
            {config.label}
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewBooking(record)}
            />
          </Tooltip>
          {record.bookingStatus === 'pending' && (
            <>
              <Button 
                size="small"
                type="primary"
                style={styles.primaryButton}
                onClick={() => updateBookingStatus(record._id, 'confirmed')}
              >
                Confirm
              </Button>
              <Button 
                size="small"
                danger
                onClick={() => updateBookingStatus(record._id, 'cancelled')}
              >
                Cancel
              </Button>
            </>
          )}
          {record.bookingStatus === 'confirmed' && (
            <Button 
              size="small"
              type="primary"
              style={styles.accentButton}
              onClick={() => updateBookingStatus(record._id, 'completed')}
            >
              Complete
            </Button>
          )}
        </Space>
      )
    }
  ];

  // ==================== RENDER FUNCTIONS ====================

  const renderDashboard = () => (
    <>
      {/* Welcome Card */}
      <Card style={{ ...styles.card, marginBottom: 24, background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
        <Row align="middle" justify="space-between">
          <Col>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar 
                size={64}
                src={labData?.logo ? `${API_BASE_URL}/uploads/${labData.logo}` : null}
                icon={!labData?.logo && <MedicineBoxOutlined />}
                style={{ 
                  backgroundColor: labData?.logo ? 'transparent' : theme.white,
                  color: theme.primary,
                  border: `3px solid ${theme.white}`
                }}
              />
              <div>
                <Title level={3} style={{ color: theme.white, margin: 0 }}>
                  Welcome back, {labData?.name || 'Lab'}!
                </Title>
                <Text style={{ color: theme.textLight }}>
                  Here's what's happening with your lab today
                </Text>
              </div>
            </div>
          </Col>
          <Col>
            <Button 
              icon={<SyncOutlined />}
              style={{ color: theme.white, borderColor: theme.white }}
              onClick={() => {
                fetchLabData();
                fetchTests();
                fetchBookings();
                message.success('Data refreshed');
              }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card style={styles.statCard}>
            <Statistic
              title="Total Bookings"
              value={stats.totalBookings}
              prefix={<CalendarOutlined style={{ color: theme.primary }} />}
              valueStyle={{ color: theme.primary }}
            />
            <Progress 
              percent={Math.round((stats.totalBookings / (stats.totalBookings + 10)) * 100) || 0} 
              size="small" 
              showInfo={false}
              strokeColor={theme.primary}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...styles.statCard, borderLeftColor: theme.success }}>
            <Statistic
              title="Completed"
              value={stats.completedBookings}
              prefix={<CheckCircleOutlined style={{ color: theme.success }} />}
              valueStyle={{ color: theme.success }}
            />
            <Progress 
              percent={Math.round((stats.completedBookings / stats.totalBookings) * 100) || 0} 
              size="small" 
              showInfo={false}
              strokeColor={theme.success}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...styles.statCard, borderLeftColor: theme.accent }}>
            <Statistic
              title="Monthly Revenue"
              value={stats.monthlyRevenue}
              prefix={<DollarOutlined style={{ color: theme.accent }} />}
              valueStyle={{ color: theme.accent }}
            />
            <Progress 
              percent={Math.round((stats.monthlyRevenue / (stats.monthlyRevenue + 50000)) * 100) || 0} 
              size="small" 
              showInfo={false}
              strokeColor={theme.accent}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...styles.statCard, borderLeftColor: theme.purple }}>
            <Statistic
              title="Total Tests"
              value={stats.totalTests}
              prefix={<ExperimentOutlined style={{ color: theme.purple }} />}
              valueStyle={{ color: theme.purple }}
            />
            <Progress 
              percent={100} 
              size="small" 
              showInfo={false}
              strokeColor={theme.purple}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Booking Trends (Last 30 Days)" style={styles.card}>
            {bookings.length > 0 ? (
              <Line
                data={generateBookingTrendData()}
                xField="date"
                yField="bookings"
                height={300}
                point={{ size: 4 }}
                smooth
                color={theme.primary}
                lineStyle={{ stroke: theme.primary, lineWidth: 2 }}
                areaStyle={{ fill: `${theme.primary}20` }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <CalendarOutlined style={{ fontSize: 48, color: theme.bgLight, marginBottom: 16 }} />
                <Text type="secondary">No booking data available for chart</Text>
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Booking Status Distribution" style={styles.card}>
            <Pie
              data={generateStatusDistributionData()}
              angleField="count"
              colorField="status"
              radius={0.8}
              height={300}
              label={{
                type: 'inner',
                offset: '-30%',
                content: '{percentage}',
                style: { fontSize: 14 }
              }}
              color={[theme.warning, theme.success, theme.info, theme.error]}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Bookings" 
            style={styles.card}
            extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}
          >
            <List
              dataSource={filteredBookings.slice(0, 5)}
              renderItem={(booking) => (
                <List.Item
                  actions={[
                    <Button 
                      key="view" 
                      size="small" 
                      icon={<EyeOutlined />}
                      onClick={() => handleViewBooking(booking)}
                    >
                      View
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        size="large"
                        style={{ 
                          backgroundColor: 
                            booking.bookingStatus === 'pending' ? theme.warning :
                            booking.bookingStatus === 'confirmed' ? theme.success :
                            booking.bookingStatus === 'completed' ? theme.info :
                            theme.error
                        }}
                        icon={<UserOutlined />}
                      />
                    }
                    title={
                      <Space direction="vertical" size={0}>
                        <Text strong>{booking.patientDetails?.name || 'Unknown Patient'}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {booking.bookingReference}
                        </Text>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text style={{ fontSize: 12 }}>
                          {booking.tests?.length || 0} tests • ₹{booking.totals?.discounted || 0}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          {dayjs(booking.createdAt).format('DD MMM YYYY, hh:mm A')}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" style={styles.card}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button 
                  block 
                  type="primary" 
                  icon={<PlusOutlined />}
                  style={styles.primaryButton}
                  onClick={handleCreateTest}
                >
                  Add New Test
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  icon={<ProfileOutlined />}
                  onClick={() => setIsProfileModalVisible(true)}
                >
                  Update Profile
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  icon={<DownloadOutlined />}
                  onClick={() => handleExportData('bookings')}
                >
                  Export Bookings
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  icon={<FileTextOutlined />}
                  onClick={() => message.info('Reports coming soon')}
                >
                  Generate Reports
                </Button>
              </Col>
            </Row>
            
            <Divider />
            
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>Lab Rating</Text>
              <Rate 
                disabled 
                value={stats.averageRating} 
                style={{ color: theme.warning, fontSize: 20 }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {stats.averageRating.toFixed(1)} stars from 245 reviews
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderTests = () => (
    <Card 
      title={
        <Space>
          <ExperimentOutlined />
          <span>Test Management</span>
          <Tag color={theme.primary}>{tests.length} Tests</Tag>
        </Space>
      }
      style={styles.card}
      extra={
        <Space>
          <AntInput 
            placeholder="Search tests..." 
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            style={styles.primaryButton}
            onClick={handleCreateTest}
          >
            Add Test
          </Button>
        </Space>
      }
    >
      <Table 
        dataSource={tests.filter(test => 
          !searchText || 
          test.name.toLowerCase().includes(searchText.toLowerCase()) ||
          test.description?.toLowerCase().includes(searchText.toLowerCase())
        )} 
        columns={testColumns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
        loading={loading}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <Text strong>Total Tests: {tests.length}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text strong>
                  Total Value: ₹{tests.reduce((sum, test) => sum + (test.price || 0), 0)}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} colSpan={2} />
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </Card>
  );

  const renderBookings = () => (
    <Card 
      title={
        <Space>
          <CalendarOutlined />
          <span>Booking Management</span>
          <Badge 
            count={stats.pendingBookings} 
            style={{ backgroundColor: theme.warning }}
            showZero={false}
          />
        </Space>
      }
      style={styles.card}
      extra={
        <Space wrap>
          <Segmented
            options={[
              { label: 'All', value: 'all' },
              { label: 'Today', value: '1' },
              { label: '7 Days', value: '7' },
              { label: '30 Days', value: '30' }
            ]}
            value={timeRange}
            onChange={setTimeRange}
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            allowClear
            onChange={setStatusFilter}
          >
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="completed">Completed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <AntInput 
            placeholder="Search bookings..." 
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Dropdown
            menu={{
              items: [
                { key: 'export-all', label: 'Export All Bookings', icon: <DownloadOutlined /> },
                { key: 'export-filtered', label: 'Export Filtered', icon: <DownloadOutlined /> },
                { key: 'export-completed', label: 'Export Completed', icon: <DownloadOutlined /> }
              ],
              onClick: ({ key }) => handleExportData(key)
            }}
          >
            <Button icon={<DownloadOutlined />}>
              Export
            </Button>
          </Dropdown>
        </Space>
      }
    >
      <Table 
        dataSource={filteredBookings} 
        columns={bookingColumns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
        loading={loading}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <Text strong>Showing {filteredBookings.length} of {bookings.length} bookings</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text strong>
                  Total Revenue: ₹{filteredBookings
                    .filter(b => b.bookingStatus === 'completed')
                    .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0)}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} colSpan={3} />
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </Card>
  );

  const renderProfile = () => (
    <Card 
      title={
        <Space>
          <ProfileOutlined />
          <span>Lab Profile</span>
        </Space>
      }
      style={styles.card}
      extra={
        <Button 
          type="primary"
          icon={<EditOutlined />}
          style={styles.primaryButton}
          onClick={() => setIsProfileModalVisible(true)}
        >
          Edit Profile
        </Button>
      }
    >
      {labData ? (
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Lab Name" span={2}>
            <Text strong style={{ fontSize: 16 }}>{labData.name}</Text>
          </Descriptions.Item>
          
          <Descriptions.Item label="Lab Logo">
            {labData.logo ? (
              <Image
                width={100}
                src={`${API_BASE_URL}/uploads/${labData.logo}`}
                alt="Lab Logo"
                style={{ borderRadius: 8 }}
              />
            ) : (
              <Avatar 
                size={100}
                icon={<MedicineBoxOutlined />}
                style={{ backgroundColor: theme.primary, fontSize: 40 }}
              />
            )}
          </Descriptions.Item>
          
          <Descriptions.Item label="Discount Offered">
            <Tag color="success" style={{ fontSize: 14 }}>
              {labData.discount || 0}%
            </Tag>
          </Descriptions.Item>
          
          <Descriptions.Item label="Branch Locations" span={2}>
            <div style={{ maxHeight: 100, overflowY: 'auto' }}>
              {labData.branches ? (
                labData.branches.split(',').map((branch, index) => (
                  <Tag key={index} style={{ marginBottom: 4 }}>{branch.trim()}</Tag>
                ))
              ) : (
                <Text type="secondary">No branches specified</Text>
              )}
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item label="Total Tests">
            <Badge count={stats.totalTests} style={{ backgroundColor: theme.primary }} />
          </Descriptions.Item>
          
          <Descriptions.Item label="Active Status">
            <Tag color="success" style={{ fontSize: 12 }}>
              ACTIVE
            </Tag>
          </Descriptions.Item>
          
          <Descriptions.Item label="Total Bookings" span={2}>
            <Progress 
              percent={Math.round((stats.completedBookings / stats.totalBookings) * 100) || 0}
              status="active"
              strokeColor={theme.primary}
              format={percent => `${stats.completedBookings}/${stats.totalBookings} completed`}
            />
          </Descriptions.Item>
          
          <Descriptions.Item label="Monthly Revenue">
            <Text strong style={{ color: theme.primary, fontSize: 18 }}>
              ₹{stats.monthlyRevenue}
            </Text>
          </Descriptions.Item>
          
          <Descriptions.Item label="Overall Revenue">
            <Text strong style={{ color: theme.success, fontSize: 18 }}>
              ₹{stats.totalRevenue}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <MedicineBoxOutlined style={{ fontSize: 48, color: theme.bgLight, marginBottom: 16 }} />
          <Text type="secondary">Loading lab profile...</Text>
        </div>
      )}
    </Card>
  );

  // ==================== MAIN COMPONENT ====================

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Sidebar */}
      <Sider 
        width={280}
        style={styles.sidebar}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div style={{ padding: '24px 16px', textAlign: 'center' }}>
          <Avatar 
            size={80}
            src={labData?.logo ? `${API_BASE_URL}/uploads/${labData.logo}` : null}
            icon={!labData?.logo && <MedicineBoxOutlined />}
            style={{ 
              backgroundColor: labData?.logo ? 'transparent' : theme.primary,
              border: `4px solid ${theme.white}`,
              marginBottom: 12
            }}
          />
          <Title level={4} style={{ color: theme.white, margin: 0, marginBottom: 4 }}>
            {labData?.name || 'Lab Dashboard'}
          </Title>
          <Text style={{ color: theme.textLight, fontSize: 12 }}>
            Laboratory Management Portal
          </Text>
          {labData && (
            <div style={{ marginTop: 8 }}>
              <Rate 
                disabled 
                defaultValue={stats.averageRating} 
                style={{ fontSize: 12, color: theme.warning }}
              />
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={({ key }) => setActiveTab(key)}
          style={{ 
            background: 'transparent',
            borderRight: 0,
            padding: '16px 8px'
          }}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              style: { 
                margin: '4px 0',
                borderRadius: 8,
                color: activeTab === 'dashboard' ? theme.white : theme.textLight,
                backgroundColor: activeTab === 'dashboard' ? theme.primary : 'transparent'
              }
            },
            {
              key: 'tests',
              icon: <ExperimentOutlined />,
              label: 'Test Management',
              style: { 
                margin: '4px 0',
                borderRadius: 8,
                color: activeTab === 'tests' ? theme.white : theme.textLight,
                backgroundColor: activeTab === 'tests' ? theme.primary : 'transparent'
              }
            },
            {
              key: 'bookings',
              icon: <CalendarOutlined />,
              label: (
                <Space>
                  <span>Bookings</span>
                  {stats.pendingBookings > 0 && (
                    <Badge 
                      count={stats.pendingBookings} 
                      size="small"
                      style={{ 
                        backgroundColor: theme.warning,
                        fontSize: 10
                      }}
                    />
                  )}
                </Space>
              ),
              style: { 
                margin: '4px 0',
                borderRadius: 8,
                color: activeTab === 'bookings' ? theme.white : theme.textLight,
                backgroundColor: activeTab === 'bookings' ? theme.primary : 'transparent'
              }
            },
            {
              key: 'profile',
              icon: <ProfileOutlined />,
              label: 'Lab Profile',
              style: { 
                margin: '4px 0',
                borderRadius: 8,
                color: activeTab === 'profile' ? theme.white : theme.textLight,
                backgroundColor: activeTab === 'profile' ? theme.primary : 'transparent'
              }
            },
          ]}
        />

        {/* Lab Stats Summary */}
        <div style={{ 
          margin: 16,
          padding: 16,
          background: `${theme.hover}40`,
          borderRadius: 8,
          border: `1px solid ${theme.hover}`
        }}>
          <Text strong style={{ color: theme.white, display: 'block', marginBottom: 12 }}>
            Lab Statistics
          </Text>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.textLight, fontSize: 12 }}>Tests</Text>
              <Badge count={stats.totalTests} style={{ backgroundColor: theme.primary }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.textLight, fontSize: 12 }}>Active Bookings</Text>
              <Badge count={stats.pendingBookings + stats.confirmedBookings} style={{ backgroundColor: theme.warning }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.textLight, fontSize: 12 }}>Monthly Revenue</Text>
              <Text strong style={{ color: theme.success, fontSize: 12 }}>₹{stats.monthlyRevenue}</Text>
            </div>
          </Space>
        </div>

        {/* User Profile */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0,
          padding: '16px',
          background: theme.hover,
          borderTop: `1px solid ${theme.secondary}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <Avatar 
              size={40}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=LabManager"
              style={{ marginRight: 8 }}
            />
            <div>
              <Text style={{ color: theme.white, fontSize: 12 }}>Lab Manager</Text>
              <br />
              <Text style={{ color: theme.textLight, fontSize: 10 }}>
                {labData?.name || 'Lab'} Admin
              </Text>
            </div>
          </div>
          <Space style={{ width: '100%' }}>
            <Button 
              icon={<SettingOutlined />}
              block
              type="text"
              style={{ color: theme.textLight }}
              onClick={() => message.info('Settings coming soon')}
            >
              Settings
            </Button>
            <Button 
              icon={<LogoutOutlined />}
              block
              type="text"
              danger
              onClick={() => {
                localStorage.removeItem('currentLabId');
                message.success('Logged out successfully');
                // In real app, redirect to login
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </Space>
        </div>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ 
          ...styles.header,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64
        }}>
          <div>
            <Title level={4} style={{ margin: 0, color: theme.secondary }}>
              {activeTab === 'dashboard' && 'Lab Dashboard Overview'}
              {activeTab === 'tests' && 'Test Management'}
              {activeTab === 'bookings' && 'Booking Management'}
              {activeTab === 'profile' && 'Lab Profile'}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {dayjs().format('dddd, MMMM D, YYYY')} • Last updated: {dayjs().format('hh:mm A')}
            </Text>
          </div>
          
          <Space>
            <Tooltip title="Notifications">
              <Badge count={stats.pendingBookings}>
                <Button 
                  icon={<BellOutlined />} 
                  type="text"
                  shape="circle"
                  style={{ color: theme.secondary }}
                  onClick={() => message.info(`You have ${stats.pendingBookings} pending bookings`)}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Help & Support">
              <Button 
                icon={<InfoCircleOutlined />}
                type="text"
                shape="circle"
                style={{ color: theme.secondary }}
                onClick={() => message.info('Support: support@labpro.com')}
              />
            </Tooltip>
            <Tooltip title="Refresh Data">
              <Button 
                icon={<SyncOutlined />}
                type="text"
                shape="circle"
                style={{ color: theme.secondary }}
                onClick={() => {
                  fetchLabData();
                  fetchTests();
                  fetchBookings();
                  message.success('Data refreshed');
                }}
              />
            </Tooltip>
          </Space>
        </Header>

        <Content style={{ 
          margin: 24,
          padding: 24,
          background: theme.white,
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          minHeight: 'calc(100vh - 112px)',
          overflow: 'auto'
        }}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'tests' && renderTests()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'profile' && renderProfile()}
        </Content>
      </Layout>

      {/* Test Modal */}
      <Modal
        title={testForm.getFieldValue('_id') ? 'Edit Test' : 'Add New Test'}
        open={isTestModalVisible}
        onCancel={() => setIsTestModalVisible(false)}
        onOk={() => testForm.submit()}
        confirmLoading={loading}
        width={600}
        okText={testForm.getFieldValue('_id') ? 'Update' : 'Create'}
        okButtonProps={{ style: styles.primaryButton }}
      >
        <Form form={testForm} layout="vertical" onFinish={handleTestSubmit}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Test Name"
                rules={[{ required: true, message: 'Please enter test name' }]}
              >
                <Input placeholder="Enter test name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price (₹)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  placeholder="Enter price"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3} placeholder="Enter test description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="discount"
                label="Discount (%)"
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={0} 
                  max={100} 
                  placeholder="Enter discount"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
              >
                <Select placeholder="Select category">
                  <Option value="blood_test">Blood Test</Option>
                  <Option value="urine_test">Urine Test</Option>
                  <Option value="imaging">Imaging</Option>
                  <Option value="pathology">Pathology</Option>
                  <Option value="genetic">Genetic Testing</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="preparation"
            label="Patient Preparation"
          >
            <TextArea rows={2} placeholder="Enter any preparation instructions" />
          </Form.Item>

          <Form.Item
            name="turnaroundTime"
            label="Turnaround Time (hours)"
          >
            <InputNumber 
              style={{ width: '100%' }} 
              min={1} 
              max={168} 
              placeholder="Enter hours"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Profile Modal */}
      <Modal
        title="Edit Lab Profile"
        open={isProfileModalVisible}
        onCancel={() => {
          setIsProfileModalVisible(false);
          setLogoFile(null);
        }}
        onOk={() => profileForm.submit()}
        confirmLoading={loading}
        width={600}
        okText="Update Profile"
        okButtonProps={{ style: styles.primaryButton }}
      >
        <Form form={profileForm} layout="vertical" onFinish={handleUpdateProfile}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Laboratory Name"
                rules={[{ required: true, message: 'Please enter laboratory name' }]}
              >
                <Input placeholder="Enter laboratory name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="discount"
                label="Discount (%)"
              >
                <InputNumber 
                  min={0} 
                  max={100} 
                  style={{ width: '100%' }} 
                  placeholder="Enter discount percentage"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="branches"
            label="Branch Locations"
          >
            <TextArea 
              rows={3} 
              placeholder="Enter branch locations (separated by commas)" 
            />
          </Form.Item>

          <Form.Item
            name="contactEmail"
            label="Contact Email"
          >
            <Input placeholder="Enter contact email" />
          </Form.Item>

          <Form.Item
            name="contactPhone"
            label="Contact Phone"
          >
            <Input placeholder="Enter contact phone number" />
          </Form.Item>

          <Form.Item
            label="Laboratory Logo"
            extra="Upload a new logo for your laboratory"
          >
            <Upload
              beforeUpload={(file) => {
                setLogoFile(file);
                return false;
              }}
              onRemove={() => setLogoFile(null)}
              maxCount={1}
              accept="image/*"
              listType="picture-card"
            >
              {logoFile ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Logo</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Booking Details Modal */}
      <Modal
        title="Booking Details"
        open={isViewBookingModalVisible}
        onCancel={() => setIsViewBookingModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsViewBookingModalVisible(false)}>
            Close
          </Button>,
          selectedBooking?.bookingStatus === 'pending' && (
            <Button 
              key="confirm" 
              type="primary"
              style={styles.primaryButton}
              onClick={() => {
                updateBookingStatus(selectedBooking._id, 'confirmed');
                setIsViewBookingModalVisible(false);
              }}
            >
              Confirm Booking
            </Button>
          ),
          selectedBooking?.bookingStatus === 'confirmed' && (
            <Button 
              key="complete" 
              type="primary"
              style={styles.accentButton}
              onClick={() => {
                updateBookingStatus(selectedBooking._id, 'completed');
                setIsViewBookingModalVisible(false);
              }}
            >
              Mark as Completed
            </Button>
          )
        ].filter(Boolean)}
      >
        {selectedBooking && (
          <div>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Booking Reference" span={2}>
                <Text strong copyable>{selectedBooking.bookingReference}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag 
                  color={
                    selectedBooking.bookingStatus === 'pending' ? theme.warning :
                    selectedBooking.bookingStatus === 'confirmed' ? theme.success :
                    selectedBooking.bookingStatus === 'completed' ? theme.info :
                    theme.error
                  }
                  style={{ borderRadius: 12 }}
                >
                  {selectedBooking.bookingStatus?.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Booking Date">
                {dayjs(selectedBooking.createdAt).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Collection Type">
                {selectedBooking.appointmentDetails?.sampleCollectionType || 'N/A'}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Patient Information</Divider>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Name">{selectedBooking.patientDetails?.name}</Descriptions.Item>
              <Descriptions.Item label="Age/Gender">
                {selectedBooking.patientDetails?.age} / {selectedBooking.patientDetails?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">{selectedBooking.patientDetails?.mobile}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedBooking.patientDetails?.email}</Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                {selectedBooking.patientDetails?.address}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Tests Ordered</Divider>
            <List
              size="small"
              dataSource={selectedBooking.tests || []}
              renderItem={(test, index) => (
                <List.Item
                  extra={
                    <Text strong>₹{test.price}</Text>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar size="small" icon={<ExperimentOutlined />} />}
                    title={<Text strong>{test.name}</Text>}
                    description={
                      <Space>
                        {test.discount > 0 && (
                          <>
                            <Text type="secondary" delete>₹{test.price}</Text>
                            <Text strong>₹{test.price * (100 - test.discount) / 100}</Text>
                            <Tag color="success" size="small">-{test.discount}%</Tag>
                          </>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />

            <Divider />
            <div style={{ textAlign: 'right' }}>
              <Text strong style={{ fontSize: 16 }}>
                Total Amount: ₹{selectedBooking.totals?.discounted || 0}
              </Text>
              {selectedBooking.totals?.original !== selectedBooking.totals?.discounted && (
                <div>
                  <Text type="secondary" delete>
                    Original: ₹{selectedBooking.totals?.original}
                  </Text>
                  <Text type="success" style={{ marginLeft: 8 }}>
                    Saved: ₹{selectedBooking.totals?.original - selectedBooking.totals?.discounted}
                  </Text>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default LabUserDashboard;