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
//   Collapse,
//   Timeline,
//   Rate,
//   Image,
//   Popconfirm,
//   Dropdown,
//   Segmented
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
//   AppstoreOutlined,
//   ProfileOutlined,
//   PieChartOutlined,
//   AreaChartOutlined,
//   SolutionOutlined,
//   MessageOutlined,
//   StockOutlined,
//   FundOutlined,
//   SyncOutlined,
//   MoreOutlined,
//   CheckOutlined,
//   CloseOutlined,
//   UserSwitchOutlined,
//   IdcardOutlined,
//   FileSyncOutlined,
//   CloudUploadOutlined,
//   AppstoreAddOutlined,
//   ScheduleOutlined,
//   FolderOpenOutlined
// } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import { Line, Pie, Bar } from '@ant-design/charts';
// import { useNavigate } from 'react-router-dom';

// const { Header, Sider, Content } = Layout;
// const { Title, Text, Paragraph } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { RangePicker } = DatePicker;
// const { Panel } = Collapse;

// // API Configuration
// const API_BASE_URL = 'http://localhost:5000/api';

// // Configure axios defaults
// axios.defaults.baseURL = API_BASE_URL;

// const LabUserDashboard = () => {
//   const navigate = useNavigate();
  
//   // State management
//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   // Modal states
//   const [isTestModalVisible, setIsTestModalVisible] = useState(false);
//   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
//   const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
//   const [isViewBookingModalVisible, setIsViewBookingModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
//   const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'days'), dayjs()]);
  
//   // Form instances
//   const [testForm] = Form.useForm();
//   const [profileForm] = Form.useForm();
  
//   // Filter states
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchText, setSearchText] = useState('');
//   const [timeRange, setTimeRange] = useState('30days');

//   // Color theme
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
//     },
//     header: {
//       background: theme.white,
//       boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
//     }
//   };

//   // ==================== API FUNCTIONS ====================

//   // Get current user from localStorage
//   const getCurrentUser = () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       return user;
//     } catch (error) {
//       console.error("Error parsing user from localStorage:", error);
//       return null;
//     }
//   };

//   // Fetch lab data for the current user
//   const fetchLabData = async () => {
//     try {
//       setLoading(true);
      
//       // Get current user
//       const currentUser = getCurrentUser();
      
//       // Validate user
//       if (!currentUser) {
//         setError("Please login first");
//         setLoading(false);
//         return;
//       }

//       if (currentUser.role !== "lab") {
//         setError("Access denied. Lab users only.");
//         setLoading(false);
//         return;
//       }

//       // Fetch all labs
//       const { data: labs } = await axios.get("/labs");
      
//       // Find lab belonging to current user
//       const userLab = labs.find(lab => {
//         // Handle both populated and non-populated userId
//         const labUserId = lab.userId?._id || lab.userId;
//         const currentUserId = currentUser._id || currentUser.id;
        
//         return labUserId?.toString() === currentUserId?.toString();
//       });

//       if (!userLab) {
//         setError("Lab not registered");
//         setLoading(false);
//         return;
//       }

//       setLab(userLab);
      
//       // After getting lab, fetch tests and bookings
//       await Promise.all([
//         fetchTests(userLab._id),
//         fetchBookings(userLab._id)
//       ]);
      
//     } catch (error) {
//       console.error("Dashboard error:", error);
//       setError(error.response?.data?.message || "Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch tests for current lab
//   const fetchTests = async (labId) => {
//     try {
//       const response = await axios.get(`/tests/lab/${labId}`);
//       setTests(response.data);
//     } catch (error) {
//       console.error('Failed to fetch tests:', error);
//       message.error('Failed to fetch tests');
//     }
//   };

//   // Fetch bookings for current lab
//   const fetchBookings = async (labId) => {
//     try {
//       const response = await axios.get(`/bookings/lab/${labId}`);
//       const sortedBookings = response.data.sort((a, b) => 
//         new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setBookings(sortedBookings);
//       setFilteredBookings(sortedBookings);
//     } catch (error) {
//       console.error('Failed to fetch bookings:', error);
//       message.error('Failed to fetch bookings');
//     }
//   };

//   // Update lab profile
//   const updateLabProfile = async (values) => {
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
//       const response = await axios.put(`/labs/${lab._id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       message.success('Profile updated successfully');
//       fetchLabData();
//       return response.data;
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       message.error('Failed to update profile');
//       throw error;
//     }
//   };

//   // Create test
//   const createTest = async (values) => {
//     try {
//       const response = await axios.post('/tests', {
//         ...values,
//         labId: lab._id
//       });
//       message.success('Test created successfully');
//       fetchTests(lab._id);
//       return response.data;
//     } catch (error) {
//       console.error('Failed to create test:', error);
//       message.error('Failed to create test');
//       throw error;
//     }
//   };

//   // Update test
//   const updateTest = async (id, values) => {
//     try {
//       const response = await axios.put(`/tests/${id}`, values);
//       message.success('Test updated successfully');
//       fetchTests(lab._id);
//       return response.data;
//     } catch (error) {
//       console.error('Failed to update test:', error);
//       message.error('Failed to update test');
//       throw error;
//     }
//   };

//   // Delete test
//   const deleteTest = async (id) => {
//     try {
//       await axios.delete(`/tests/${id}`);
//       message.success('Test deleted successfully');
//       fetchTests(lab._id);
//     } catch (error) {
//       console.error('Failed to delete test:', error);
//       message.error('Failed to delete test');
//     }
//   };

//   // Update booking status
//   const updateBookingStatus = async (id, status) => {
//     try {
//       await axios.put(`/bookings/${id}/status`, { status });
//       message.success(`Booking status updated to ${status}`);
//       fetchBookings(lab._id);
//     } catch (error) {
//       console.error('Failed to update booking status:', error);
//       message.error('Failed to update booking status');
//     }
//   };

//   // Initialize data
//   useEffect(() => {
//     fetchLabData();
//   }, []);

//   // Filter bookings based on status and search
//   useEffect(() => {
//     let filtered = bookings;
    
//     // Apply status filter
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(booking => booking.bookingStatus === statusFilter);
//     }
    
//     // Apply search filter
//     if (searchText) {
//       filtered = filtered.filter(booking => 
//         booking.bookingReference?.toLowerCase().includes(searchText.toLowerCase()) ||
//         booking.patientDetails?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         booking.patientDetails?.mobile?.includes(searchText)
//       );
//     }
    
//     // Apply time filter
//     if (timeRange !== 'all') {
//       const days = parseInt(timeRange);
//       const cutoffDate = dayjs().subtract(days, 'days');
//       filtered = filtered.filter(booking => 
//         dayjs(booking.createdAt).isAfter(cutoffDate)
//       );
//     }
    
//     setFilteredBookings(filtered);
//   }, [bookings, statusFilter, searchText, timeRange]);

//   // Calculate statistics
//   const calculateStats = () => {
//     const stats = {
//       totalBookings: bookings.length,
//       pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
//       confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
//       completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
//       cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
//       totalRevenue: bookings
//         .filter(b => b.bookingStatus === 'completed')
//         .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
//       monthlyRevenue: bookings
//         .filter(b => b.bookingStatus === 'completed' && 
//           dayjs(b.createdAt).isAfter(dayjs().subtract(30, 'days')))
//         .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
//       totalTests: tests.length,
//       averageRating: 4.5 // This would come from API
//     };
    
//     return stats;
//   };

//   const stats = calculateStats();

//   // Show registration option if no lab
//   if (!loading && !lab && error === "Lab not registered") {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 24, background: theme.white, borderRadius: 8 }}>
//           <div className="text-center py-12">
//             <MedicineBoxOutlined style={{ fontSize: 64, color: theme.primary, marginBottom: 24 }} />
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Welcome to Lab Dashboard
//             </h2>
//             <p className="text-gray-600 mb-6">
//               You haven't registered your lab yet. Please register to continue.
//             </p>
//             <Button
//               type="primary"
//               size="large"
//               onClick={() => navigate("/lab/register")}
//               style={styles.primaryButton}
//             >
//               Register Lab
//             </Button>
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   if (loading && !lab) {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 24, background: theme.white, borderRadius: 8 }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64vh' }}>
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent"></div>
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   if (error && error !== "Lab not registered") {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 24, background: theme.white, borderRadius: 8 }}>
//           <div style={{ background: '#ffebee', border: '1px solid #ffcdd2', color: '#b71c1c', padding: '12px 16px', borderRadius: 4 }}>
//             {error}
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   // Generate chart data
//   const generateBookingTrendData = () => {
//     const days = 30;
//     const data = [];
    
//     for (let i = days - 1; i >= 0; i--) {
//       const date = dayjs().subtract(i, 'days').format('MMM DD');
//       const dayBookings = bookings.filter(b => 
//         dayjs(b.createdAt).isSame(dayjs().subtract(i, 'days'), 'day')
//       );
      
//       data.push({
//         date,
//         bookings: dayBookings.length,
//         revenue: dayBookings
//           .filter(b => b.bookingStatus === 'completed')
//           .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0)
//       });
//     }
    
//     return data;
//   };

//   const generateStatusDistributionData = () => {
//     const statusCounts = {
//       pending: stats.pendingBookings,
//       confirmed: stats.confirmedBookings,
//       completed: stats.completedBookings,
//       cancelled: stats.cancelledBookings
//     };
    
//     return Object.entries(statusCounts).map(([status, count]) => ({
//       status: status.charAt(0).toUpperCase() + status.slice(1),
//       count,
//       percent: Math.round((count / stats.totalBookings) * 100) || 0
//     }));
//   };

//   // ==================== HANDLER FUNCTIONS ====================

//   const handleCreateTest = () => {
//     testForm.resetFields();
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

//   const handleUpdateProfile = async (values) => {
//     setLoading(true);
//     try {
//       await updateLabProfile(values);
//       setIsProfileModalVisible(false);
//       setLogoFile(null);
//     } catch (error) {
//       console.error('Profile update failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewBooking = (booking) => {
//     setSelectedBooking(booking);
//     setIsViewBookingModalVisible(true);
//   };

//   const handleStatusFilter = (status) => {
//     setStatusFilter(status);
//   };

//   const handleExportData = (type) => {
//     // Implement export functionality
//     message.info(`${type} export feature coming soon`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     message.success('Logged out successfully');
//     navigate('/login');
//   };

//   // ==================== TABLE COLUMNS ====================

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
//         <Text strong style={{ color: theme.primary }}>Rs.{price || 0}</Text>
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
//           Rs.{record.totals?.discounted || 0}
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
//       {/* Welcome Card */}
//       <Card style={{ ...styles.card, marginBottom: 24, background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
//         <Row align="middle" justify="space-between">
//           <Col>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//               <Avatar 
//                 size={64}
//                 src={lab?.logo ? `${API_BASE_URL}/uploads/${lab.logo}` : null}
//                 icon={!lab?.logo && <MedicineBoxOutlined />}
//                 style={{ 
//                   backgroundColor: lab?.logo ? 'transparent' : theme.white,
//                   color: theme.primary,
//                   border: `3px solid ${theme.white}`
//                 }}
//               />
//               <div>
//                 <Title level={3} style={{ color: theme.white, margin: 0 }}>
//                   Welcome back, {lab?.name || 'Lab'}!
//                 </Title>
//                 <Text style={{ color: theme.textLight }}>
//                   Here's what's happening with your lab today
//                 </Text>
//               </div>
//             </div>
//           </Col>
//           <Col>
//             <Button 
//               icon={<SyncOutlined />}
//               style={{ color: theme.white, borderColor: theme.white }}
//               onClick={() => {
//                 fetchLabData();
//                 message.success('Data refreshed');
//               }}
//             >
//               Refresh
//             </Button>
//           </Col>
//         </Row>
//       </Card>

//       {/* Quick Stats */}
//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={styles.statCard}>
//             <Statistic
//               title="Total Bookings"
//               value={stats.totalBookings}
//               prefix={<CalendarOutlined style={{ color: theme.primary }} />}
//               valueStyle={{ color: theme.primary }}
//             />
//             <Progress 
//               percent={Math.round((stats.totalBookings / (stats.totalBookings + 10)) * 100) || 0} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.primary}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ ...styles.statCard, borderLeftColor: theme.success }}>
//             <Statistic
//               title="Completed"
//               value={stats.completedBookings}
//               prefix={<CheckCircleOutlined style={{ color: theme.success }} />}
//               valueStyle={{ color: theme.success }}
//             />
//             <Progress 
//               percent={Math.round((stats.completedBookings / stats.totalBookings) * 100) || 0} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.success}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ ...styles.statCard, borderLeftColor: theme.accent }}>
//             <Statistic
//               title="Monthly Revenue"
//               value={stats.monthlyRevenue}
//               prefix={<DollarOutlined style={{ color: theme.accent }} />}
//               valueStyle={{ color: theme.accent }}
//             />
//             <Progress 
//               percent={Math.round((stats.monthlyRevenue / (stats.monthlyRevenue + 50000)) * 100) || 0} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.accent}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} sm={12} md={6}>
//           <Card style={{ ...styles.statCard, borderLeftColor: theme.purple }}>
//             <Statistic
//               title="Total Tests"
//               value={stats.totalTests}
//               prefix={<ExperimentOutlined style={{ color: theme.purple }} />}
//               valueStyle={{ color: theme.purple }}
//             />
//             <Progress 
//               percent={100} 
//               size="small" 
//               showInfo={false}
//               strokeColor={theme.purple}
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts Section */}
//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//         <Col xs={24} lg={16}>
//           <Card title="Booking Trends (Last 30 Days)" style={styles.card}>
//             {bookings.length > 0 ? (
//               <Line
//                 data={generateBookingTrendData()}
//                 xField="date"
//                 yField="bookings"
//                 height={300}
//                 point={{ size: 4 }}
//                 smooth
//                 color={theme.primary}
//                 lineStyle={{ stroke: theme.primary, lineWidth: 2 }}
//                 areaStyle={{ fill: `${theme.primary}20` }}
//               />
//             ) : (
//               <div style={{ textAlign: 'center', padding: 40 }}>
//                 <CalendarOutlined style={{ fontSize: 48, color: theme.bgLight, marginBottom: 16 }} />
//                 <Text type="secondary">No booking data available for chart</Text>
//               </div>
//             )}
//           </Card>
//         </Col>
//         <Col xs={24} lg={8}>
//           <Card title="Booking Status Distribution" style={styles.card}>
//             {stats.totalBookings > 0 ? (
//               <Pie
//                 data={generateStatusDistributionData()}
//                 angleField="count"
//                 colorField="status"
//                 radius={0.8}
//                 height={300}
//                 label={{
//                   type: 'inner',
//                   offset: '-30%',
//                   content: '{percentage}',
//                   style: { fontSize: 14 }
//                 }}
//                 color={[theme.warning, theme.success, theme.info, theme.error]}
//               />
//             ) : (
//               <div style={{ textAlign: 'center', padding: 40 }}>
//                 <PieChartOutlined style={{ fontSize: 48, color: theme.bgLight, marginBottom: 16 }} />
//                 <Text type="secondary">No booking data available</Text>
//               </div>
//             )}
//           </Card>
//         </Col>
//       </Row>

//       {/* Recent Activity */}
//       <Row gutter={[16, 16]}>
//         <Col xs={24} lg={12}>
//           <Card 
//             title="Recent Bookings" 
//             style={styles.card}
//             extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}
//           >
//             <List
//               dataSource={filteredBookings.slice(0, 5)}
//               renderItem={(booking) => (
//                 <List.Item
//                   actions={[
//                     <Button 
//                       key="view" 
//                       size="small" 
//                       icon={<EyeOutlined />}
//                       onClick={() => handleViewBooking(booking)}
//                     >
//                       View
//                     </Button>
//                   ]}
//                 >
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar 
//                         size="large"
//                         style={{ 
//                           backgroundColor: 
//                             booking.bookingStatus === 'pending' ? theme.warning :
//                             booking.bookingStatus === 'confirmed' ? theme.success :
//                             booking.bookingStatus === 'completed' ? theme.info :
//                             theme.error
//                         }}
//                         icon={<UserOutlined />}
//                       />
//                     }
//                     title={
//                       <Space direction="vertical" size={0}>
//                         <Text strong>{booking.patientDetails?.name || 'Unknown Patient'}</Text>
//                         <Text type="secondary" style={{ fontSize: 12 }}>
//                           {booking.bookingReference}
//                         </Text>
//                       </Space>
//                     }
//                     description={
//                       <Space direction="vertical" size={0}>
//                         <Text style={{ fontSize: 12 }}>
//                           {booking.tests?.length || 0} tests • Rs.{booking.totals?.discounted || 0}
//                         </Text>
//                         <Text type="secondary" style={{ fontSize: 11 }}>
//                           {dayjs(booking.createdAt).format('DD MMM YYYY, hh:mm A')}
//                         </Text>
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
//                   onClick={handleCreateTest}
//                 >
//                   Add New Test
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   icon={<ProfileOutlined />}
//                   onClick={() => setIsProfileModalVisible(true)}
//                 >
//                   Update Profile
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   icon={<DownloadOutlined />}
//                   onClick={() => handleExportData('bookings')}
//                 >
//                   Export Bookings
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button 
//                   block 
//                   icon={<FileTextOutlined />}
//                   onClick={() => message.info('Reports coming soon')}
//                 >
//                   Generate Reports
//                 </Button>
//               </Col>
//             </Row>
            
//             <Divider />
            
//             <div style={{ textAlign: 'center' }}>
//               <Text strong style={{ display: 'block', marginBottom: 8 }}>Lab Rating</Text>
//               <Rate 
//                 disabled 
//                 value={stats.averageRating} 
//                 style={{ color: theme.warning, fontSize: 20 }}
//               />
//               <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
//                 {stats.averageRating.toFixed(1)} stars from 245 reviews
//               </Text>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );

//   const renderTests = () => (
//     <Card 
//       title={
//         <Space>
//           <ExperimentOutlined />
//           <span>Test Management</span>
//           <Tag color={theme.primary}>{tests.length} Tests</Tag>
//         </Space>
//       }
//       style={styles.card}
//       extra={
//         <Space>
//           <AntInput 
//             placeholder="Search tests..." 
//             prefix={<SearchOutlined />}
//             style={{ width: 200 }}
//             onChange={(e) => setSearchText(e.target.value)}
//             allowClear
//           />
//           <Button 
//             type="primary"
//             icon={<PlusOutlined />}
//             style={styles.primaryButton}
//             onClick={handleCreateTest}
//           >
//             Add Test
//           </Button>
//         </Space>
//       }
//     >
//       <Table 
//         dataSource={tests.filter(test => 
//           !searchText || 
//           test.name.toLowerCase().includes(searchText.toLowerCase()) ||
//           test.description?.toLowerCase().includes(searchText.toLowerCase())
//         )} 
//         columns={testColumns}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 800 }}
//         loading={loading}
//         summary={() => (
//           <Table.Summary fixed>
//             <Table.Summary.Row>
//               <Table.Summary.Cell index={0} colSpan={3}>
//                 <Text strong>Total Tests: {tests.length}</Text>
//               </Table.Summary.Cell>
//               <Table.Summary.Cell index={3}>
//                 <Text strong>
//                   Total Value: Rs.{tests.reduce((sum, test) => sum + (test.price || 0), 0)}
//                 </Text>
//               </Table.Summary.Cell>
//               <Table.Summary.Cell index={4} colSpan={2} />
//             </Table.Summary.Row>
//           </Table.Summary>
//         )}
//       />
//     </Card>
//   );

//   const renderBookings = () => (
//     <Card 
//       title={
//         <Space>
//           <CalendarOutlined />
//           <span>Booking Management</span>
//           <Badge 
//             count={stats.pendingBookings} 
//             style={{ backgroundColor: theme.warning }}
//             showZero={false}
//           />
//         </Space>
//       }
//       style={styles.card}
//       extra={
//         <Space wrap>
//           <Segmented
//             options={[
//               { label: 'All', value: 'all' },
//               { label: 'Today', value: '1' },
//               { label: '7 Days', value: '7' },
//               { label: '30 Days', value: '30' }
//             ]}
//             value={timeRange}
//             onChange={setTimeRange}
//           />
//           <Select
//             placeholder="Filter by status"
//             style={{ width: 150 }}
//             allowClear
//             onChange={setStatusFilter}
//             value={statusFilter}
//           >
//             <Option value="all">All Status</Option>
//             <Option value="pending">Pending</Option>
//             <Option value="confirmed">Confirmed</Option>
//             <Option value="completed">Completed</Option>
//             <Option value="cancelled">Cancelled</Option>
//           </Select>
//           <AntInput 
//             placeholder="Search bookings..." 
//             prefix={<SearchOutlined />}
//             style={{ width: 200 }}
//             onChange={(e) => setSearchText(e.target.value)}
//             allowClear
//             value={searchText}
//           />
//           <Dropdown
//             menu={{
//               items: [
//                 { key: 'export-all', label: 'Export All Bookings', icon: <DownloadOutlined /> },
//                 { key: 'export-filtered', label: 'Export Filtered', icon: <DownloadOutlined /> },
//                 { key: 'export-completed', label: 'Export Completed', icon: <DownloadOutlined /> }
//               ],
//               onClick: ({ key }) => handleExportData(key)
//             }}
//           >
//             <Button icon={<DownloadOutlined />}>
//               Export
//             </Button>
//           </Dropdown>
//         </Space>
//       }
//     >
//       <Table 
//         dataSource={filteredBookings} 
//         columns={bookingColumns}
//         rowKey="_id"
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 1000 }}
//         loading={loading}
//         summary={() => (
//           <Table.Summary fixed>
//             <Table.Summary.Row>
//               <Table.Summary.Cell index={0} colSpan={3}>
//                 <Text strong>Showing {filteredBookings.length} of {bookings.length} bookings</Text>
//               </Table.Summary.Cell>
//               <Table.Summary.Cell index={3}>
//                 <Text strong>
//                   Total Revenue: Rs.{filteredBookings
//                     .filter(b => b.bookingStatus === 'completed')
//                     .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0)}
//                 </Text>
//               </Table.Summary.Cell>
//               <Table.Summary.Cell index={4} colSpan={3} />
//             </Table.Summary.Row>
//           </Table.Summary>
//         )}
//       />
//     </Card>
//   );

//   const renderProfile = () => (
//     <Card 
//       title={
//         <Space>
//           <ProfileOutlined />
//           <span>Lab Profile</span>
//         </Space>
//       }
//       style={styles.card}
//       extra={
//         <Button 
//           type="primary"
//           icon={<EditOutlined />}
//           style={styles.primaryButton}
//           onClick={() => setIsProfileModalVisible(true)}
//         >
//           Edit Profile
//         </Button>
//       }
//     >
//       {lab ? (
//         <Descriptions bordered column={2} size="middle">
//           <Descriptions.Item label="Lab Name" span={2}>
//             <Text strong style={{ fontSize: 16 }}>{lab.name}</Text>
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Lab Logo">
//             {lab.logo ? (
//               <Image
//                 width={100}
//                 src={`${API_BASE_URL}/uploads/${lab.logo}`}
//                 alt="Lab Logo"
//                 style={{ borderRadius: 8 }}
//               />
//             ) : (
//               <Avatar 
//                 size={100}
//                 icon={<MedicineBoxOutlined />}
//                 style={{ backgroundColor: theme.primary, fontSize: 40 }}
//               />
//             )}
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Discount Offered">
//             <Tag color="success" style={{ fontSize: 14 }}>
//               {lab.discount || 0}%
//             </Tag>
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Branch Locations" span={2}>
//             <div style={{ maxHeight: 100, overflowY: 'auto' }}>
//               {lab.branches ? (
//                 lab.branches.split(',').map((branch, index) => (
//                   <Tag key={index} style={{ marginBottom: 4 }}>{branch.trim()}</Tag>
//                 ))
//               ) : (
//                 <Text type="secondary">No branches specified</Text>
//               )}
//             </div>
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Total Tests">
//             <Badge count={stats.totalTests} style={{ backgroundColor: theme.primary }} />
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Active Status">
//             <Tag color="success" style={{ fontSize: 12 }}>
//               ACTIVE
//             </Tag>
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Total Bookings" span={2}>
//             <Progress 
//               percent={Math.round((stats.completedBookings / stats.totalBookings) * 100) || 0}
//               status="active"
//               strokeColor={theme.primary}
//               format={percent => `${stats.completedBookings}/${stats.totalBookings} completed`}
//             />
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Monthly Revenue">
//             <Text strong style={{ color: theme.primary, fontSize: 18 }}>
//               Rs.{stats.monthlyRevenue}
//             </Text>
//           </Descriptions.Item>
          
//           <Descriptions.Item label="Overall Revenue">
//             <Text strong style={{ color: theme.success, fontSize: 18 }}>
//               Rs.{stats.totalRevenue}
//             </Text>
//           </Descriptions.Item>
//         </Descriptions>
//       ) : (
//         <div style={{ textAlign: 'center', padding: 40 }}>
//           <MedicineBoxOutlined style={{ fontSize: 48, color: theme.bgLight, marginBottom: 16 }} />
//           <Text type="secondary">Loading lab profile...</Text>
//         </div>
//       )}
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
//             size={80}
//             src={lab?.logo ? `${API_BASE_URL}/uploads/${lab.logo}` : null}
//             icon={!lab?.logo && <MedicineBoxOutlined />}
//             style={{ 
//               backgroundColor: lab?.logo ? 'transparent' : theme.primary,
//               border: `4px solid ${theme.white}`,
//               marginBottom: 12
//             }}
//           />
//           <Title level={4} style={{ color: theme.white, margin: 0, marginBottom: 4 }}>
//             {lab?.name || 'Lab Dashboard'}
//           </Title>
//           <Text style={{ color: theme.textLight, fontSize: 12 }}>
//             Laboratory Management Portal
//           </Text>
//           {lab && (
//             <div style={{ marginTop: 8 }}>
//               <Rate 
//                 disabled 
//                 defaultValue={stats.averageRating} 
//                 style={{ fontSize: 12, color: theme.warning }}
//               />
//             </div>
//           )}
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
//                 <Space>
//                   <span>Bookings</span>
//                   {stats.pendingBookings > 0 && (
//                     <Badge 
//                       count={stats.pendingBookings} 
//                       size="small"
//                       style={{ 
//                         backgroundColor: theme.warning,
//                         fontSize: 10
//                       }}
//                     />
//                   )}
//                 </Space>
//               ),
//               style: { 
//                 margin: '4px 0',
//                 borderRadius: 8,
//                 color: activeTab === 'bookings' ? theme.white : theme.textLight,
//                 backgroundColor: activeTab === 'bookings' ? theme.primary : 'transparent'
//               }
//             },
//             {
//               key: 'profile',
//               icon: <ProfileOutlined />,
//               label: 'Lab Profile',
//               style: { 
//                 margin: '4px 0',
//                 borderRadius: 8,
//                 color: activeTab === 'profile' ? theme.white : theme.textLight,
//                 backgroundColor: activeTab === 'profile' ? theme.primary : 'transparent'
//               }
//             },
//           ]}
//         />

//         {/* Lab Stats Summary */}
//         <div style={{ 
//           margin: 16,
//           padding: 16,
//           background: `${theme.hover}40`,
//           borderRadius: 8,
//           border: `1px solid ${theme.hover}`
//         }}>
//           <Text strong style={{ color: theme.white, display: 'block', marginBottom: 12 }}>
//             Lab Statistics
//           </Text>
//           <Space direction="vertical" style={{ width: '100%' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Text style={{ color: theme.textLight, fontSize: 12 }}>Tests</Text>
//               <Badge count={stats.totalTests} style={{ backgroundColor: theme.primary }} />
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Text style={{ color: theme.textLight, fontSize: 12 }}>Active Bookings</Text>
//               <Badge count={stats.pendingBookings + stats.confirmedBookings} style={{ backgroundColor: theme.warning }} />
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Text style={{ color: theme.textLight, fontSize: 12 }}>Monthly Revenue</Text>
//               <Text strong style={{ color: theme.success, fontSize: 12 }}>Rs.{stats.monthlyRevenue}</Text>
//             </div>
//           </Space>
//         </div>

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
//               size={40}
//               src="https://api.dicebear.com/7.x/avataaars/svg?seed=LabManager"
//               style={{ marginRight: 8 }}
//             />
//             <div>
//               <Text style={{ color: theme.white, fontSize: 12 }}>Lab Manager</Text>
//               <br />
//               <Text style={{ color: theme.textLight, fontSize: 10 }}>
//                 {lab?.name || 'Lab'} Admin
//               </Text>
//             </div>
//           </div>
//           <Space style={{ width: '100%' }}>
//             <Button 
//               icon={<SettingOutlined />}
//               block
//               type="text"
//               style={{ color: theme.textLight }}
//               onClick={() => message.info('Settings coming soon')}
//             >
//               Settings
//             </Button>
//             <Button 
//               icon={<LogoutOutlined />}
//               block
//               type="text"
//               danger
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Space>
//         </div>
//       </Sider>

//       {/* Main Content */}
//       <Layout>
//         <Header style={{ 
//           ...styles.header,
//           padding: '0 24px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           height: 64
//         }}>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <Title level={4} style={{ color: theme.secondary, margin: 0 }}>
//               {activeTab === 'dashboard' && 'Lab Dashboard Overview'}
//               {activeTab === 'tests' && 'Test Management'}
//               {activeTab === 'bookings' && 'Booking Management'}
//               {activeTab === 'profile' && 'Lab Profile'}
//             </Title>
//             <Text type="secondary" style={{ fontSize: 12 }}>
//               {dayjs().format('dddd, MMMM D, YYYY')} • Last updated: {dayjs().format('hh:mm A')}
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
//                   onClick={() => message.info(`You have ${stats.pendingBookings} pending bookings`)}
//                 />
//               </Badge>
//             </Tooltip>
//             <Tooltip title="Help & Support">
//               <Button 
//                 icon={<InfoCircleOutlined />}
//                 type="text"
//                 shape="circle"
//                 style={{ color: theme.secondary }}
//                 onClick={() => message.info('Support: support@labpro.com')}
//               />
//             </Tooltip>
//             <Tooltip title="Refresh Data">
//               <Button 
//                 icon={<SyncOutlined />}
//                 type="text"
//                 shape="circle"
//                 style={{ color: theme.secondary }}
//                 onClick={() => {
//                   fetchLabData();
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
//           {activeTab === 'tests' && renderTests()}
//           {activeTab === 'bookings' && renderBookings()}
//           {activeTab === 'profile' && renderProfile()}
//         </Content>
//       </Layout>

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
//                 label="Price (Rs.)"
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
//               <Form.Item
//                 name="category"
//                 label="Category"
//               >
//                 <Select placeholder="Select category">
//                   <Option value="blood_test">Blood Test</Option>
//                   <Option value="urine_test">Urine Test</Option>
//                   <Option value="imaging">Imaging</Option>
//                   <Option value="pathology">Pathology</Option>
//                   <Option value="genetic">Genetic Testing</Option>
//                   <Option value="other">Other</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             name="preparation"
//             label="Patient Preparation"
//           >
//             <TextArea rows={2} placeholder="Enter any preparation instructions" />
//           </Form.Item>

//           <Form.Item
//             name="turnaroundTime"
//             label="Turnaround Time (hours)"
//           >
//             <InputNumber 
//               style={{ width: '100%' }} 
//               min={1} 
//               max={168} 
//               placeholder="Enter hours"
//             />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Profile Modal */}
//       <Modal
//         title="Edit Lab Profile"
//         open={isProfileModalVisible}
//         onCancel={() => {
//           setIsProfileModalVisible(false);
//           setLogoFile(null);
//         }}
//         onOk={() => profileForm.submit()}
//         confirmLoading={loading}
//         width={600}
//         okText="Update Profile"
//         okButtonProps={{ style: styles.primaryButton }}
//       >
//         <Form form={profileForm} layout="vertical" onFinish={handleUpdateProfile}>
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
//             name="contactEmail"
//             label="Contact Email"
//           >
//             <Input placeholder="Enter contact email" />
//           </Form.Item>

//           <Form.Item
//             name="contactPhone"
//             label="Contact Phone"
//           >
//             <Input placeholder="Enter contact phone number" />
//           </Form.Item>

//           <Form.Item
//             label="Laboratory Logo"
//             extra="Upload a new logo for your laboratory"
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
//                 <List.Item
//                   extra={
//                     <Text strong>Rs.{test.price}</Text>
//                   }
//                 >
//                   <List.Item.Meta
//                     avatar={<Avatar size="small" icon={<ExperimentOutlined />} />}
//                     title={<Text strong>{test.name}</Text>}
//                     description={
//                       <Space>
//                         {test.discount > 0 && (
//                           <>
//                             <Text type="secondary" delete>Rs.{test.price}</Text>
//                             <Text strong>Rs.{test.price * (100 - test.discount) / 100}</Text>
//                             <Tag color="success" size="small">-{test.discount}%</Tag>
//                           </>
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
//                 Total Amount: Rs.{selectedBooking.totals?.discounted || 0}
//               </Text>
//               {selectedBooking.totals?.original !== selectedBooking.totals?.discounted && (
//                 <div>
//                   <Text type="secondary" delete>
//                     Original: Rs.{selectedBooking.totals?.original}
//                   </Text>
//                   <Text type="success" style={{ marginLeft: 8 }}>
//                     Saved: Rs.{selectedBooking.totals?.original - selectedBooking.totals?.discounted}
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

// export default LabUserDashboard;



// LabDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { Layout, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import dayjs from 'dayjs';

// import LabDashboardSidebar from './LabDashboardSidebar';
// import LabDashboardPages from './LabDashboardPages';
// import LabDashboardModals from './LabDashboardModals';

// const { Content } = Layout;
// const API_BASE_URL = 'http://localhost:5000/api';
// axios.defaults.baseURL = API_BASE_URL;

// export default function LabDashboard() {
//   const navigate = useNavigate();
  
//   // State
//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   // Modal States
//   const [isTestModalVisible, setIsTestModalVisible] = useState(false);
//   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
//   const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [editingTest, setEditingTest] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
  
//   // Filter States
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchText, setSearchText] = useState('');
//   const [timeRange, setTimeRange] = useState('30');

//   // Theme
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
//     info: '#1890ff'
//   };

//   // ========== API Functions ==========
//   const getCurrentUser = () => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   };

//   const fetchLabData = async () => {
//     try {
//       setLoading(true);
//       const currentUser = getCurrentUser();
      
//       if (!currentUser) {
//         setError("Please login first");
//         return;
//       }
//       if (currentUser.role !== "lab") {
//         setError("Access denied. Lab users only.");
//         return;
//       }

//       const { data: labs } = await axios.get("/labs");
//       const userLab = labs.find(lab => {
//         const labUserId = lab.userId?._id || lab.userId;
//         const currentUserId = currentUser._id || currentUser.id;
//         return labUserId?.toString() === currentUserId?.toString();
//       });

//       if (!userLab) {
//         setError("Lab not registered");
//         return;
//       }

//       setLab(userLab);
//       await Promise.all([
//         fetchTests(userLab._id),
//         fetchBookings(userLab._id)
//       ]);
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTests = async (labId) => {
//     try {
//       const response = await axios.get(`/tests/lab/${labId}`);
//       setTests(response.data);
//     } catch (error) {
//       message.error('Failed to fetch tests');
//     }
//   };

//   const fetchBookings = async (labId) => {
//     try {
//       const response = await axios.get(`/bookings/lab/${labId}`);
//       const sorted = response.data.sort((a, b) => 
//         new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setBookings(sorted);
//       setFilteredBookings(sorted);
//     } catch (error) {
//       message.error('Failed to fetch bookings');
//     }
//   };

//   const createTest = async (values) => {
//     try {
//       await axios.post('/tests', { ...values, labId: lab._id });
//       message.success('Test created');
//       fetchTests(lab._id);
//       return true;
//     } catch (error) {
//       message.error('Failed to create test');
//       return false;
//     }
//   };

//   const updateTest = async (id, values) => {
//     try {
//       await axios.put(`/tests/${id}`, values);
//       message.success('Test updated');
//       fetchTests(lab._id);
//       return true;
//     } catch (error) {
//       message.error('Failed to update test');
//       return false;
//     }
//   };

//   const deleteTest = async (id) => {
//     try {
//       await axios.delete(`/tests/${id}`);
//       message.success('Test deleted');
//       fetchTests(lab._id);
//     } catch (error) {
//       message.error('Failed to delete test');
//     }
//   };

//   const updateLabProfile = async (values) => {
//     try {
//       const formData = new FormData();
//       if (values.name) formData.append('name', values.name);
//       if (values.branches) formData.append('branches', values.branches);
//       if (values.discount !== undefined) formData.append('discount', values.discount.toString());
//       if (logoFile) formData.append('logo', logoFile);

//       await axios.put(`/labs/${lab._id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       message.success('Profile updated');
//       fetchLabData();
//       setLogoFile(null);
//       return true;
//     } catch (error) {
//       message.error(error.response?.data?.message || 'Failed to update profile');
//       return false;
//     }
//   };

//   const updateBookingStatus = async (id, status) => {
//     try {
//       await axios.put(`/bookings/${id}/status`, { status });
//       message.success(`Booking ${status}`);
//       fetchBookings(lab._id);
//     } catch (error) {
//       message.error('Failed to update booking');
//     }
//   };

//   // ========== Filter Effect ==========
//   useEffect(() => {
//     let filtered = bookings;
    
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(b => b.bookingStatus === statusFilter);
//     }
//     if (searchText) {
//       filtered = filtered.filter(b => 
//         b.bookingReference?.toLowerCase().includes(searchText.toLowerCase()) ||
//         b.patientDetails?.name?.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }
//     if (timeRange !== 'all') {
//       const days = parseInt(timeRange);
//       const cutoff = dayjs().subtract(days, 'days');
//       filtered = filtered.filter(b => dayjs(b.createdAt).isAfter(cutoff));
//     }
    
//     setFilteredBookings(filtered);
//   }, [bookings, statusFilter, searchText, timeRange]);

//   // ========== Stats ==========
//   const stats = {
//     totalBookings: bookings.length,
//     pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
//     confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
//     completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
//     cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
//     totalRevenue: bookings.filter(b => b.bookingStatus === 'completed')
//       .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
//     monthlyRevenue: bookings.filter(b => 
//       b.bookingStatus === 'completed' && 
//       dayjs(b.createdAt).isAfter(dayjs().subtract(30, 'days'))
//     ).reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
//     totalTests: tests.length
//   };

//   // ========== Handlers ==========
//   const handleTestSubmit = async (values) => {
//     setLoading(true);
//     const success = values._id 
//       ? await updateTest(values._id, values)
//       : await createTest(values);
//     if (success) {
//       setIsTestModalVisible(false);
//       setEditingTest(null);
//     }
//     setLoading(false);
//   };

//   const handleEditTest = (test) => {
//     setEditingTest(test);
//     setIsTestModalVisible(true);
//   };

//   const handleDeleteTest = (id) => {
//     Modal.confirm({
//       title: 'Delete Test',
//       content: 'Are you sure?',
//       onOk: () => deleteTest(id)
//     });
//   };

//   const handleViewBooking = (booking) => {
//     setSelectedBooking(booking);
//     setIsBookingModalVisible(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   // ========== Render ==========
//   if (!loading && !lab && error === "Lab not registered") {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
//           <div style={{ textAlign: 'center', padding: 48 }}>
//             <h2>Welcome to Lab Dashboard</h2>
//             <p>You haven't registered your lab yet.</p>
//             <Button type="primary" onClick={() => navigate("/lab/register")}>
//               Register Lab
//             </Button>
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   return (
//     <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//       <LabDashboardSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         lab={lab}
//         stats={stats}
//         theme={theme}
//         onLogout={handleLogout}
//       />
      
//       <Layout>
//         <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
//           <LabDashboardPages
//             activeTab={activeTab}
//             lab={lab}
//             tests={tests}
//             bookings={bookings}
//             filteredBookings={filteredBookings}
//             stats={stats}
//             theme={theme}
//             loading={loading}
//             searchText={searchText}
//             setSearchText={setSearchText}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             timeRange={timeRange}
//             setTimeRange={setTimeRange}
//             onAddTest={() => {
//               setEditingTest(null);
//               setIsTestModalVisible(true);
//             }}
//             onEditTest={handleEditTest}
//             onDeleteTest={handleDeleteTest}
//             onViewBooking={handleViewBooking}
//             onEditProfile={() => setIsProfileModalVisible(true)}
//             onUpdateStatus={updateBookingStatus}
//           />
//         </Content>
//       </Layout>

//       <LabDashboardModals
//         isTestModalVisible={isTestModalVisible}
//         setIsTestModalVisible={setIsTestModalVisible}
//         isProfileModalVisible={isProfileModalVisible}
//         setIsProfileModalVisible={setIsProfileModalVisible}
//         isBookingModalVisible={isBookingModalVisible}
//         setIsBookingModalVisible={setIsBookingModalVisible}
//         selectedBooking={selectedBooking}
//         editingTest={editingTest}
//         lab={lab}
//         logoFile={logoFile}
//         setLogoFile={setLogoFile}
//         theme={theme}
//         loading={loading}
//         onTestSubmit={handleTestSubmit}
//         onProfileSubmit={updateLabProfile}
//         onUpdateStatus={updateBookingStatus}
//         API_BASE_URL={API_BASE_URL}
//       />
//     </Layout>
//   );
// }








// LabDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { Layout, Button, message, Modal } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import dayjs from 'dayjs';

// import LabDashboardSidebar from './LabDashboardSidebar';
// import LabDashboardPages from './LabDashboardPages';
// import LabDashboardModals from './LabDashboardModals';

// const { Content } = Layout;
// const API_BASE_URL = 'http://localhost:5000/api';
// axios.defaults.baseURL = API_BASE_URL;

// export default function LabDashboard() {
//   const navigate = useNavigate();
  
//   // State
//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   // Modal States
//   const [isTestModalVisible, setIsTestModalVisible] = useState(false);
//   const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
//   const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [editingTest, setEditingTest] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);
  
//   // Filter States
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchText, setSearchText] = useState('');
//   const [timeRange, setTimeRange] = useState('30');

//   // Theme
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

//   // ========== API Functions ==========
//   const getCurrentUser = () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       return user;
//     } catch (error) {
//       console.error("Error parsing user:", error);
//       return null;
//     }
//   };

//   const fetchLabData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Get current user
//       const currentUser = getCurrentUser();
      
//       // Validate user
//       if (!currentUser) {
//         setError("Please login first");
//         setLoading(false);
//         return;
//       }

//       if (currentUser.role !== "lab") {
//         setError("Access denied. Lab users only.");
//         setLoading(false);
//         return;
//       }

//       // Fetch all labs
//       const { data: labs } = await axios.get("/labs");
      
//       // Find lab belonging to current user
//       const userLab = labs.find(lab => {
//         // Handle both populated and non-populated userId
//         const labUserId = lab.userId?._id || lab.userId;
//         const currentUserId = currentUser._id || currentUser.id;
        
//         return labUserId?.toString() === currentUserId?.toString();
//       });

//       if (!userLab) {
//         setError("Lab not registered");
//         setLoading(false);
//         return;
//       }

//       setLab(userLab);

//       // Fetch tests and bookings in parallel
//       await Promise.all([
//         fetchTests(userLab._id),
//         fetchBookings(userLab._id)
//       ]);
      
//     } catch (error) {
//       console.error("Dashboard error:", error);
//       setError(error.response?.data?.message || "Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTests = async (labId) => {
//     try {
//       const response = await axios.get(`/tests/lab/${labId}`);
//       setTests(response.data);
//     } catch (error) {
//       console.error('Failed to fetch tests:', error);
//       message.error('Failed to fetch tests');
//     }
//   };

//   const fetchBookings = async (labId) => {
//     try {
//       const response = await axios.get(`/bookings/lab/${labId}`);
//       const sorted = response.data.sort((a, b) => 
//         new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setBookings(sorted);
//       setFilteredBookings(sorted);
//     } catch (error) {
//       console.error('Failed to fetch bookings:', error);
//       message.error('Failed to fetch bookings');
//     }
//   };

//   const createTest = async (values) => {
//     try {
//       await axios.post('/tests', { ...values, labId: lab._id });
//       message.success('Test created successfully');
//       await fetchTests(lab._id);
//       return true;
//     } catch (error) {
//       console.error('Failed to create test:', error);
//       message.error('Failed to create test');
//       return false;
//     }
//   };

//   const updateTest = async (id, values) => {
//     try {
//       await axios.put(`/tests/${id}`, values);
//       message.success('Test updated successfully');
//       await fetchTests(lab._id);
//       return true;
//     } catch (error) {
//       console.error('Failed to update test:', error);
//       message.error('Failed to update test');
//       return false;
//     }
//   };

//   const deleteTest = async (id) => {
//     try {
//       await axios.delete(`/tests/${id}`);
//       message.success('Test deleted successfully');
//       await fetchTests(lab._id);
//     } catch (error) {
//       console.error('Failed to delete test:', error);
//       message.error('Failed to delete test');
//     }
//   };

//   const updateLabProfile = async (values) => {
//     try {
//       const formData = new FormData();
//       if (values.name) formData.append('name', values.name);
//       if (values.branches) formData.append('branches', values.branches);
//       if (values.discount !== undefined && values.discount !== null) {
//         formData.append('discount', values.discount.toString());
//       }
//       if (logoFile) formData.append('logo', logoFile);

//       await axios.put(`/labs/${lab._id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
      
//       message.success('Profile updated successfully');
//       await fetchLabData(); // Refresh all lab data
//       setLogoFile(null);
//       return true;
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       message.error(error.response?.data?.message || 'Failed to update profile');
//       return false;
//     }
//   };

//   const updateBookingStatus = async (id, status) => {
//     try {
//       await axios.put(`/bookings/${id}/status`, { status });
//       message.success(`Booking ${status} successfully`);
//       await fetchBookings(lab._id);
//     } catch (error) {
//       console.error('Failed to update booking:', error);
//       message.error('Failed to update booking status');
//     }
//   };

//   // Initialize data
//   useEffect(() => {
//     fetchLabData();
//   }, []);

//   // ========== Filter Effect ==========
//   useEffect(() => {
//     let filtered = bookings;
    
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(b => b.bookingStatus === statusFilter);
//     }
//     if (searchText) {
//       filtered = filtered.filter(b => 
//         b.bookingReference?.toLowerCase().includes(searchText.toLowerCase()) ||
//         b.patientDetails?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         b.patientDetails?.mobile?.includes(searchText)
//       );
//     }
//     if (timeRange !== 'all') {
//       const days = parseInt(timeRange);
//       const cutoff = dayjs().subtract(days, 'days');
//       filtered = filtered.filter(b => dayjs(b.createdAt).isAfter(cutoff));
//     }
    
//     setFilteredBookings(filtered);
//   }, [bookings, statusFilter, searchText, timeRange]);

//   // ========== Stats ==========
//   const stats = {
//     totalBookings: bookings.length,
//     pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
//     confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
//     completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
//     cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
//     totalRevenue: bookings.filter(b => b.bookingStatus === 'completed')
//       .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
//     monthlyRevenue: bookings.filter(b => 
//       b.bookingStatus === 'completed' && 
//       dayjs(b.createdAt).isAfter(dayjs().subtract(30, 'days'))
//     ).reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
//     totalTests: tests.length,
//     averageRating: 4.5
//   };

//   // ========== Handlers ==========
//   const handleTestSubmit = async (values) => {
//     setLoading(true);
//     const success = values._id 
//       ? await updateTest(values._id, values)
//       : await createTest(values);
//     if (success) {
//       setIsTestModalVisible(false);
//       setEditingTest(null);
//     }
//     setLoading(false);
//   };

//   const handleEditTest = (test) => {
//     setEditingTest(test);
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

//   const handleViewBooking = (booking) => {
//     setSelectedBooking(booking);
//     setIsBookingModalVisible(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     message.success('Logged out successfully');
//     navigate('/login');
//   };

//   // ========== Render ==========
  
//   // Show registration option if no lab
//   if (!loading && !lab && error === "Lab not registered") {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 48, background: '#fff', borderRadius: 8, textAlign: 'center' }}>
//           <div style={{ maxWidth: 500, margin: '0 auto' }}>
//             <h2 style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 16 }}>
//               Welcome to Lab Dashboard
//             </h2>
//             <p style={{ color: '#666', marginBottom: 24, fontSize: 16 }}>
//               You haven't registered your lab yet. Please register to start managing your laboratory.
//             </p>
//             <Button 
//               type="primary" 
//               size="large"
//               onClick={() => navigate("/lab/register")}
//               style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
//             >
//               Register Lab
//             </Button>
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   // Show loading state
//   if (loading && !lab) {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 48, background: '#fff', borderRadius: 8 }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
//             <div style={{ textAlign: 'center' }}>
//               <div className="animate-spin" style={{ 
//                 width: 48, 
//                 height: 48, 
//                 border: `4px solid ${theme.bgLight}`,
//                 borderTopColor: theme.primary,
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite',
//                 marginBottom: 16
//               }} />
//               <p style={{ color: theme.primary }}>Loading dashboard...</p>
//             </div>
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   // Show error state
//   if (error && error !== "Lab not registered") {
//     return (
//       <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//         <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
//           <div style={{ 
//             backgroundColor: '#ffebee', 
//             border: '1px solid #ffcdd2', 
//             color: '#b71c1c', 
//             padding: '16px 24px', 
//             borderRadius: 8,
//             textAlign: 'center'
//           }}>
//             <p style={{ margin: 0, fontSize: 16 }}>{error}</p>
//             <Button 
//               type="primary" 
//               onClick={fetchLabData}
//               style={{ marginTop: 16, backgroundColor: theme.primary }}
//             >
//               Try Again
//             </Button>
//           </div>
//         </Content>
//       </Layout>
//     );
//   }

//   // Main render
//   return (
//     <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
//       <style>
//         {`
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//         `}
//       </style>
      
//       <LabDashboardSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         lab={lab}
//         stats={stats}
//         theme={theme}
//         onLogout={handleLogout}
//       />
      
//       <Layout>
//         <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
//           <LabDashboardPages
//             activeTab={activeTab}
//             lab={lab}
//             tests={tests}
//             bookings={bookings}
//             filteredBookings={filteredBookings}
//             stats={stats}
//             theme={theme}
//             loading={loading}
//             searchText={searchText}
//             setSearchText={setSearchText}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             timeRange={timeRange}
//             setTimeRange={setTimeRange}
//             onAddTest={() => {
//               setEditingTest(null);
//               setIsTestModalVisible(true);
//             }}
//             onEditTest={handleEditTest}
//             onDeleteTest={handleDeleteTest}
//             onViewBooking={handleViewBooking}
//             onEditProfile={() => setIsProfileModalVisible(true)}
//             onUpdateStatus={updateBookingStatus}
//           />
//         </Content>
//       </Layout>

//       <LabDashboardModals
//         isTestModalVisible={isTestModalVisible}
//         setIsTestModalVisible={setIsTestModalVisible}
//         isProfileModalVisible={isProfileModalVisible}
//         setIsProfileModalVisible={setIsProfileModalVisible}
//         isBookingModalVisible={isBookingModalVisible}
//         setIsBookingModalVisible={setIsBookingModalVisible}
//         selectedBooking={selectedBooking}
//         editingTest={editingTest}
//         lab={lab}
//         logoFile={logoFile}
//         setLogoFile={setLogoFile}
//         theme={theme}
//         loading={loading}
//         onTestSubmit={handleTestSubmit}
//         onProfileSubmit={updateLabProfile}
//         onUpdateStatus={updateBookingStatus}
//         API_BASE_URL={API_BASE_URL}
//       />
//     </Layout>
//   );
// }


// LabDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Button, message, Modal, Avatar, Badge, Space, Tooltip, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  BellOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { Dropdown, Divider } from 'antd';
import LabDashboardSidebar from './LabDashboardSidebar';
import LabDashboardPages from './LabDashboardPages';
import LabDashboardModals from './LabDashboardModals';

const { Header, Content } = Layout;
const { Text, Title } = Typography;
const API_BASE_URL = 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

export default function LabDashboard() {
  const navigate = useNavigate();
  
  // State
  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal States
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  
  // Filter States
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [timeRange, setTimeRange] = useState('30');
  

  // Theme
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

  
  

  // Header styles
  const headerStyles = {
    background: theme.white,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    height: 64
  };

  // ========== API Functions ==========
  const getCurrentUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    } catch (error) {
      console.error("Error parsing user:", error);
      return null;
    }
  };

  const fetchLabData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get current user
      const currentUser = getCurrentUser();
      
      // Validate user
      if (!currentUser) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      if (currentUser.role !== "lab") {
        setError("Access denied. Lab users only.");
        setLoading(false);
        return;
      }

      // Fetch all labs
      const { data: labs } = await axios.get("/labs");
      
      // Find lab belonging to current user
      const userLab = labs.find(lab => {
        // Handle both populated and non-populated userId
        const labUserId = lab.userId?._id || lab.userId;
        const currentUserId = currentUser._id || currentUser.id;
        
        return labUserId?.toString() === currentUserId?.toString();
      });

      if (!userLab) {
        setError("Lab not registered");
        setLoading(false);
        return;
      }

      setLab(userLab);

      // Fetch tests and bookings in parallel
      await Promise.all([
        fetchTests(userLab._id),
        fetchBookings(userLab._id)
      ]);
      
    } catch (error) {
      console.error("Dashboard error:", error);
      setError(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchTests = async (labId) => {
    try {
      const response = await axios.get(`/tests/lab/${labId}`);
      setTests(response.data);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
      message.error('Failed to fetch tests');
    }
  };

  const fetchBookings = async (labId) => {
    try {
      const response = await axios.get(`/bookings/lab/${labId}`);
      const sorted = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sorted);
      setFilteredBookings(sorted);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      message.error('Failed to fetch bookings');
    }
  };

  const createTest = async (values) => {
    try {
      await axios.post('/tests', { ...values, labId: lab._id });
      message.success('Test created successfully');
      await fetchTests(lab._id);
      return true;
    } catch (error) {
      console.error('Failed to create test:', error);
      message.error('Failed to create test');
      return false;
    }
  };

  const updateTest = async (id, values) => {
    try {
      await axios.put(`/tests/${id}`, values);
      message.success('Test updated successfully');
      await fetchTests(lab._id);
      return true;
    } catch (error) {
      console.error('Failed to update test:', error);
      message.error('Failed to update test');
      return false;
    }
  };

  const deleteTest = async (id) => {
    try {
      await axios.delete(`/tests/${id}`);
      message.success('Test deleted successfully');
      await fetchTests(lab._id);
    } catch (error) {
      console.error('Failed to delete test:', error);
      message.error('Failed to delete test');
    }
  };

  const updateLabProfile = async (values) => {
    try {
      const formData = new FormData();
      if (values.name) formData.append('name', values.name);
      if (values.branches) formData.append('branches', values.branches);
      if (values.discount !== undefined && values.discount !== null) {
        formData.append('discount', values.discount.toString());
      }
      if (logoFile) formData.append('logo', logoFile);

      await axios.put(`/labs/${lab._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      message.success('Profile updated successfully');
      await fetchLabData(); // Refresh all lab data
      setLogoFile(null);
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      message.error(error.response?.data?.message || 'Failed to update profile');
      return false;
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      message.success(`Booking ${status} successfully`);
      await fetchBookings(lab._id);
    } catch (error) {
      console.error('Failed to update booking:', error);
      message.error('Failed to update booking status');
    }
  };

  // Initialize data
  useEffect(() => {
    fetchLabData();
  }, []);

  // ========== Filter Effect ==========
  useEffect(() => {
    let filtered = bookings;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.bookingStatus === statusFilter);
    }
    if (searchText) {
      filtered = filtered.filter(b => 
        b.bookingReference?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.patientDetails?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.patientDetails?.mobile?.includes(searchText)
      );
    }
    if (timeRange !== 'all') {
      const days = parseInt(timeRange);
      const cutoff = dayjs().subtract(days, 'days');
      filtered = filtered.filter(b => dayjs(b.createdAt).isAfter(cutoff));
    }
    
    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchText, timeRange]);

  // ========== Stats ==========
  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
    confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
    cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.bookingStatus === 'completed')
      .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
    monthlyRevenue: bookings.filter(b => 
      b.bookingStatus === 'completed' && 
      dayjs(b.createdAt).isAfter(dayjs().subtract(30, 'days'))
    ).reduce((sum, b) => sum + (b.totals?.discounted || 0), 0),
    totalTests: tests.length,
    averageRating: 4.5
  };

  // ========== Handlers ==========
  const handleTestSubmit = async (values) => {
    setLoading(true);
    const success = values._id 
      ? await updateTest(values._id, values)
      : await createTest(values);
    if (success) {
      setIsTestModalVisible(false);
      setEditingTest(null);
    }
    setLoading(false);
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
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

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsBookingModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    message.success('Logged out successfully');
    navigate('/login');
  };

  const handleRefresh = () => {
    fetchLabData();
    message.success('Data refreshed');
  };

  // ========== Render Header ==========
  const renderHeader = () => (
    <Header style={headerStyles}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Title level={4} style={{ color: theme.secondary, margin: 0 }}>
          {activeTab === 'dashboard' && 'Dashboard Overview'}
          {activeTab === 'tests' && 'Test Management'}
          {activeTab === 'bookings' && 'Booking Management'}
          {activeTab === 'profile' && 'Lab Profile'}
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {dayjs().format('dddd, MMMM D, YYYY')} • Last updated: {dayjs().format('hh:mm A')}
        </Text>
      </div>
      
      <Space size="middle">
        {/* Lab Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar 
            size={40}
            src={lab?.logo ? `${API_BASE_URL}/uploads/${lab.logo}` : null}
            icon={!lab?.logo && <span>L</span>}
            style={{ 
              backgroundColor: lab?.logo ? 'transparent' : theme.primary,
              color: theme.white
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ fontSize: 14 }}>{lab?.name || 'Lab'}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>Lab Manager</Text>
          </div>
        </div>

        <Divider type="vertical" style={{ height: 30 }} />

        {/* Notification Bell with Badge */}
        <Tooltip title={`${stats.pendingBookings} pending bookings`}>
          <Badge count={stats.pendingBookings} size="small" style={{ backgroundColor: theme.warning }}>
            <Button 
              icon={<BellOutlined />} 
              shape="circle"
              type="text"
              onClick={() => {
                setActiveTab('bookings');
                setStatusFilter('pending');
                message.info(`Showing ${stats.pendingBookings} pending bookings`);
              }}
            />
          </Badge>
        </Tooltip>

        {/* Help Button */}
        <Tooltip title="Help & Support">
          <Button 
            icon={<InfoCircleOutlined />}
            shape="circle"
            type="text"
            onClick={() => message.info('Contact support: support@labpro.com')}
          />
        </Tooltip>

        {/* Refresh Button */}
        <Tooltip title="Refresh Data">
          <Button 
            icon={<SyncOutlined spin={loading} />}
            shape="circle"
            type="text"
            onClick={handleRefresh}
          />
        </Tooltip>

        {/* Settings Dropdown */}
        <Dropdown
          menu={{
            items: [
              {
                key: 'profile',
                icon: <ProfileOutlined />,
                label: 'My Profile',
                onClick: () => setActiveTab('profile')
              },
              {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings',
                onClick: () => message.info('Settings coming soon')
              },
              {
                type: 'divider'
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                danger: true,
                onClick: handleLogout
              }
            ]
          }}
          placement="bottomRight"
        >
          <Button 
            icon={<MoreOutlined />} 
            shape="circle"
            type="text"
          />
        </Dropdown>
      </Space>
    </Header>
  );

  // ========== Render ==========
  
  // Show registration option if no lab
  if (!loading && !lab && error === "Lab not registered") {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        {renderHeader()}
        <Content style={{ margin: 24, padding: 48, background: '#fff', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2 style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 16 }}>
              Welcome to Lab Dashboard
            </h2>
            <p style={{ color: '#666', marginBottom: 24, fontSize: 16 }}>
              You haven't registered your lab yet. Please register to start managing your laboratory.
            </p>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate("/lab/register")}
              style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
            >
              Register Lab
            </Button>
          </div>
        </Content>
      </Layout>
    );
  }

  // Show loading state
  if (loading && !lab) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        {renderHeader()}
        <Content style={{ margin: 24, padding: 48, background: '#fff', borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="animate-spin" style={{ 
                width: 48, 
                height: 48, 
                border: `4px solid ${theme.bgLight}`,
                borderTopColor: theme.primary,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: 16
              }} />
              <p style={{ color: theme.primary }}>Loading dashboard...</p>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }

  // Show error state
  if (error && error !== "Lab not registered") {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        {renderHeader()}
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
          <div style={{ 
            backgroundColor: '#ffebee', 
            border: '1px solid #ffcdd2', 
            color: '#b71c1c', 
            padding: '16px 24px', 
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: 16 }}>{error}</p>
            <Button 
              type="primary" 
              onClick={fetchLabData}
              style={{ marginTop: 16, backgroundColor: theme.primary }}
            >
              Try Again
            </Button>
          </div>
        </Content>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <LabDashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lab={lab}
        stats={stats}
        theme={theme}
        onLogout={handleLogout}
      />
      
      <Layout>
        {renderHeader()}
        
        {/* <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
          <LabDashboardPages
            activeTab={activeTab}
            lab={lab}
            tests={tests}
            bookings={bookings}
            filteredBookings={filteredBookings}
            stats={stats}
            theme={theme}
            loading={loading}
            searchText={searchText}
            setSearchText={setSearchText}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            onAddTest={() => {
              setEditingTest(null);
              setIsTestModalVisible(true);
            }}
            onEditTest={handleEditTest}
            onDeleteTest={handleDeleteTest}
            onViewBooking={handleViewBooking}
            onEditProfile={() => setIsProfileModalVisible(true)}
            onUpdateStatus={updateBookingStatus}
          />
        </Content> */}
        {/* // In LabDashboard.jsx, make sure you're passing both bookings and filteredBookings: */}

<LabDashboardPages
  activeTab={activeTab}
  lab={lab}
  tests={tests}
  bookings={bookings} // ← Add this line
  filteredBookings={filteredBookings}
  stats={stats}
  theme={theme}
  loading={loading}
  searchText={searchText}
  setSearchText={setSearchText}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  timeRange={timeRange}
  setTimeRange={setTimeRange}
  onAddTest={() => {
    setEditingTest(null);
    setIsTestModalVisible(true);
  }}
  onEditTest={handleEditTest}
  onDeleteTest={handleDeleteTest}
  onViewBooking={handleViewBooking}
  onEditProfile={() => setIsProfileModalVisible(true)}
  onUpdateStatus={updateBookingStatus}
/>
      </Layout>

      <LabDashboardModals
        isTestModalVisible={isTestModalVisible}
        setIsTestModalVisible={setIsTestModalVisible}
        isProfileModalVisible={isProfileModalVisible}
        setIsProfileModalVisible={setIsProfileModalVisible}
        isBookingModalVisible={isBookingModalVisible}
        setIsBookingModalVisible={setIsBookingModalVisible}
        selectedBooking={selectedBooking}
        editingTest={editingTest}
        lab={lab}
        logoFile={logoFile}
        setLogoFile={setLogoFile}
        theme={theme}
        loading={loading}
        onTestSubmit={handleTestSubmit}
        onProfileSubmit={updateLabProfile}
        onUpdateStatus={updateBookingStatus}
        API_BASE_URL={API_BASE_URL}
      />
    </Layout>
  );
}