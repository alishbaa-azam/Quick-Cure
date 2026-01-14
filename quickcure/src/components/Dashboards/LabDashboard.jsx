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
//   Select, 
//   Tag, 
//   Statistic,
//   Row, 
//   Col,
//   Space,
//   message,
//   Tabs,
//   DatePicker,
//   Descriptions
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
//   BarChartOutlined
// } from '@ant-design/icons';

// const { Header, Sider, Content } = Layout;
// const { TabPane } = Tabs;
// const { Option } = Select;
// const { TextArea } = Input;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [tests, setTests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isTestModalVisible, setIsTestModalVisible] = useState(false);
//   const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
//   const [modalType, setModalType] = useState('create');
//   const [form] = Form.useForm();
//   const [testForm] = Form.useForm();
//   const [bookingForm] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [logoFile, setLogoFile] = useState(null);
//   const [activeTab, setActiveTab] = useState('1');

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchLabs();
//     fetchBookings();
//   }, []);

//   const fetchLabs = async () => {
//     try {
//       const response = await axios.get('/api/labs');
//       setLabs(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       message.error('Failed to fetch labs');
//       setLabs([]);
//     }
//   };

//   const fetchTests = async (labId) => {
//     try {
//       const response = await axios.get(`/api/tests/lab/${labId}`);
//       setTests(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       message.error('Failed to fetch tests');
//       setTests([]);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('/api/bookings');
//       setBookings(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       message.error('Failed to fetch bookings');
//       setBookings([]);
//     }
//   };

//   // Lab CRUD Operations
//   const handleCreateLab = () => {
//     setModalType('create');
//     form.resetFields();
//     setIsModalVisible(true);
//   };

//   const handleEditLab = (lab) => {
//     setModalType('edit');
//     form.setFieldsValue(lab);
//     setSelectedLab(lab);
//     setIsModalVisible(true);
//   };

//   const handleDeleteLab = async (id) => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this lab?',
//       content: 'This action cannot be undone.',
//       onOk: async () => {
//         try {
//           await axios.delete(`/api/labs/${id}`);
//           message.success('Lab deleted successfully');
//           fetchLabs();
//         } catch (error) {
//           message.error('Failed to delete lab');
//         }
//       }
//     });
//   };

//   const handleLabSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       Object.keys(values).forEach(key => {
//         if (values[key] !== undefined && values[key] !== null) {
//           formData.append(key, values[key]);
//         }
//       });
      
//       if (logoFile) {
//         formData.append('logo', logoFile);
//       }

//       if (modalType === 'create') {
//         await axios.post('/api/labs', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         message.success('Lab created successfully');
//       } else {
//         await axios.put(`/api/labs/${selectedLab._id}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         message.success('Lab updated successfully');
//       }

//       setIsModalVisible(false);
//       form.resetFields();
//       setLogoFile(null);
//       fetchLabs();
//     } catch (error) {
//       message.error(error.response?.data?.message || 'Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Test CRUD Operations
//   const handleCreateTest = (labId) => {
//     const lab = Array.isArray(labs) ? labs.find(lab => lab._id === labId) : null;
//     setSelectedLab(lab);
//     testForm.resetFields();
//     testForm.setFieldValue('labId', labId);
//     setIsTestModalVisible(true);
//   };

//   const handleEditTest = (test) => {
//     testForm.setFieldsValue(test);
//     const lab = Array.isArray(labs) ? labs.find(lab => lab._id === test.labId) : null;
//     setSelectedLab(lab);
//     setIsTestModalVisible(true);
//   };

//   const handleDeleteTest = async (id) => {
//     Modal.confirm({
//       title: 'Delete Test',
//       content: 'Are you sure you want to delete this test?',
//       onOk: async () => {
//         try {
//           await axios.delete(`/api/tests/${id}`);
//           message.success('Test deleted successfully');
//           if (selectedLab) fetchTests(selectedLab._id);
//         } catch (error) {
//           message.error('Failed to delete test');
//         }
//       }
//     });
//   };

//   const handleTestSubmit = async (values) => {
//     setLoading(true);
//     try {
//       if (values._id) {
//         await axios.put(`/api/tests/${values._id}`, values);
//         message.success('Test updated successfully');
//       } else {
//         await axios.post('/api/tests', values);
//         message.success('Test created successfully');
//       }
//       setIsTestModalVisible(false);
//       testForm.resetFields();
//       if (selectedLab) fetchTests(selectedLab._id);
//     } catch (error) {
//       message.error('Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Booking Operations
//   const handleViewBooking = (booking) => {
//     const lab = Array.isArray(labs) ? labs.find(lab => lab._id === booking.lab) : null;
//     setSelectedLab(lab);
//     Modal.info({
//       title: `Booking Reference: ${booking.bookingReference}`,
//       width: 800,
//       content: (
//         <Descriptions bordered column={2}>
//           <Descriptions.Item label="Status">
//             <Tag color={
//               booking.bookingStatus === 'confirmed' ? 'green' :
//               booking.bookingStatus === 'pending' ? 'orange' :
//               booking.bookingStatus === 'completed' ? 'blue' : 'red'
//             }>
//               {booking.bookingStatus?.toUpperCase() || 'UNKNOWN'}
//             </Tag>
//           </Descriptions.Item>
//           <Descriptions.Item label="Booking Date">
//             {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Patient Name" span={2}>
//             {booking.patientDetails?.name || 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Contact">
//             {booking.patientDetails?.mobile || 'N/A'} / {booking.patientDetails?.email || 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Age & Gender">
//             {booking.patientDetails?.age || 'N/A'} / {booking.patientDetails?.gender || 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Collection Type" span={2}>
//             {booking.appointmentDetails?.sampleCollectionType?.toUpperCase() || 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Preferred Date">
//             {booking.appointmentDetails?.preferredDate ? 
//               new Date(booking.appointmentDetails.preferredDate).toLocaleDateString() : 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Address">
//             {booking.patientDetails?.address || 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Tests" span={2}>
//             {Array.isArray(booking.tests) ? 
//               booking.tests.map((test, index) => (
//                 <Tag key={index}>{test.name}</Tag>
//               )) : 'No tests'}
//           </Descriptions.Item>
//         </Descriptions>
//       )
//     });
//   };

//   const updateBookingStatus = async (bookingId, status) => {
//     if (status === 'cancelled') {
//       Modal.confirm({
//         title: 'Confirm Cancellation',
//         content: 'Are you sure you want to cancel this booking?',
//         onOk: async () => {
//           await performStatusUpdate(bookingId, status);
//         }
//       });
//     } else {
//       await performStatusUpdate(bookingId, status);
//     }
//   };

//   const performStatusUpdate = async (bookingId, status) => {
//     try {
//       await axios.put(`/api/bookings/${bookingId}`, { bookingStatus: status });
//       message.success(`Booking ${status}`);
//       fetchBookings();
//     } catch (error) {
//       message.error('Failed to update booking');
//     }
//   };

//   // Dashboard Statistics
//   const dashboardStats = {
//     totalLabs: Array.isArray(labs) ? labs.length : 0,
//     totalTests: Array.isArray(tests) ? tests.length : 0,
//     totalBookings: Array.isArray(bookings) ? bookings.length : 0,
//     pendingBookings: Array.isArray(bookings) ? bookings.filter(b => b.bookingStatus === 'pending').length : 0,
//     confirmedBookings: Array.isArray(bookings) ? bookings.filter(b => b.bookingStatus === 'confirmed').length : 0,
//     revenue: Array.isArray(bookings) ? 
//       bookings
//         .filter(b => b.bookingStatus === 'completed')
//         .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0) : 0
//   };

//   // Columns for tables
//   const labColumns = [
//     {
//       title: 'Logo',
//       dataIndex: 'logo',
//       key: 'logo',
//       render: (logo) => logo ? (
//         <img 
//           src={`/uploads/${logo}`} 
//           alt="lab" 
//           style={{ width: 50, height: 50, borderRadius: 4 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = '/default-lab-logo.png';
//           }}
//         />
//       ) : <MedicineBoxOutlined style={{ fontSize: 24 }} />
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       sorter: (a, b) => a.name?.localeCompare(b.name) || 0
//     },
//     {
//       title: 'Branches',
//       dataIndex: 'branches',
//       key: 'branches',
//       render: (branches) => branches || 'N/A'
//     },
//     {
//       title: 'Discount',
//       dataIndex: 'discount',
//       key: 'discount',
//       render: (discount) => discount ? `${discount}%` : '0%'
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button 
//             icon={<EyeOutlined />} 
//             onClick={() => {
//               setSelectedLab(record);
//               fetchTests(record._id);
//               setActiveTab('3');
//             }}
//           >
//             View Tests
//           </Button>
//           <Button 
//             icon={<EditOutlined />} 
//             onClick={() => handleEditLab(record)}
//           >
//             Edit
//           </Button>
//           <Button 
//             icon={<DeleteOutlined />} 
//             danger
//             onClick={() => handleDeleteLab(record._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       )
//     }
//   ];

//   const testColumns = [
//     {
//       title: 'Test Name',
//       dataIndex: 'name',
//       key: 'name'
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       ellipsis: true,
//       render: (description) => description || 'N/A'
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//       render: (price) => `₹${price || 0}`
//     },
//     {
//       title: 'Discount',
//       dataIndex: 'discount',
//       key: 'discount',
//       render: (discount) => discount ? `${discount}%` : '-'
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button 
//             icon={<EditOutlined />}
//             onClick={() => handleEditTest(record)}
//           >
//             Edit
//           </Button>
//           <Button 
//             icon={<DeleteOutlined />}
//             danger
//             onClick={() => handleDeleteTest(record._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       )
//     }
//   ];

//   const bookingColumns = [
//     {
//       title: 'Booking Ref',
//       dataIndex: 'bookingReference',
//       key: 'bookingReference',
//       render: (ref) => ref || 'N/A'
//     },
//     {
//       title: 'Patient',
//       key: 'patient',
//       render: (_, record) => record.patientDetails?.name || 'N/A'
//     },
//     {
//       title: 'Lab',
//       key: 'lab',
//       render: (_, record) => record.lab?.name || 'N/A'
//     },
//     {
//       title: 'Date',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'bookingStatus',
//       key: 'bookingStatus',
//       render: (status) => (
//         <Tag color={
//           status === 'confirmed' ? 'green' :
//           status === 'pending' ? 'orange' :
//           status === 'completed' ? 'blue' : 'red'
//         }>
//           {status?.toUpperCase() || 'UNKNOWN'}
//         </Tag>
//       )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button 
//             icon={<EyeOutlined />}
//             onClick={() => handleViewBooking(record)}
//           >
//             View
//           </Button>
//           {record.bookingStatus === 'pending' && (
//             <>
//               <Button 
//                 type="primary"
//                 onClick={() => updateBookingStatus(record._id, 'confirmed')}
//               >
//                 Confirm
//               </Button>
//               <Button 
//                 danger
//                 onClick={() => updateBookingStatus(record._id, 'cancelled')}
//               >
//                 Cancel
//               </Button>
//             </>
//           )}
//           {record.bookingStatus === 'confirmed' && (
//             <Button 
//               type="primary"
//               onClick={() => updateBookingStatus(record._id, 'completed')}
//             >
//               Mark Complete
//             </Button>
//           )}
//         </Space>
//       )
//     }
//   ];

//   // Prepare tab items for Ant Design v5+
//   const tabItems = [
//     {
//       key: '1',
//       label: 'Dashboard Overview',
//       children: (
//         <Row gutter={16}>
//           <Col span={12}>
//             <Card title="Recent Bookings" extra={<Button type="link">View All</Button>}>
//               <Table 
//                 dataSource={Array.isArray(bookings) ? bookings.slice(0, 5) : []} 
//                 columns={bookingColumns.slice(0, 5)}
//                 pagination={false}
//                 size="small"
//                 rowKey="_id"
//               />
//             </Card>
//           </Col>
//           <Col span={12}>
//             <Card title="Lab Performance">
//               <Table 
//                 dataSource={Array.isArray(labs) ? labs.slice(0, 5) : []}
//                 columns={[
//                   { title: 'Lab Name', dataIndex: 'name', key: 'name' },
//                   { 
//                     title: 'Bookings', 
//                     key: 'bookings',
//                     render: () => Math.floor(Math.random() * 50) 
//                   },
//                   { 
//                     title: 'Revenue', 
//                     key: 'revenue',
//                     render: () => `₹${Math.floor(Math.random() * 100000)}` 
//                   }
//                 ]}
//                 pagination={false}
//                 size="small"
//                 rowKey="_id"
//               />
//             </Card>
//           </Col>
//         </Row>
//       ),
//     },
//     {
//       key: '2',
//       label: 'Labs Management',
//       children: (
//         <Card 
//           title="Laboratories"
//           extra={
//             <Button 
//               type="primary" 
//               icon={<PlusOutlined />}
//               onClick={handleCreateLab}
//             >
//               Add New Lab
//             </Button>
//           }
//         >
//           <Table 
//             dataSource={Array.isArray(labs) ? labs : []} 
//             columns={labColumns}
//             rowKey="_id"
//           />
//         </Card>
//       ),
//     },
//   ];

//   // Add Tests tab only if a lab is selected
//   if (selectedLab) {
//     tabItems.push({
//       key: '3',
//       label: `Tests - ${selectedLab.name}`,
//       children: (
//         <Card 
//           title={`Tests for ${selectedLab.name}`}
//           extra={
//             <Button 
//               type="primary" 
//               icon={<PlusOutlined />}
//               onClick={() => handleCreateTest(selectedLab._id)}
//             >
//               Add New Test
//             </Button>
//           }
//         >
//           <Table 
//             dataSource={Array.isArray(tests) ? tests : []} 
//             columns={testColumns}
//             rowKey="_id"
//           />
//         </Card>
//       ),
//     });
//   }

//   // Add Bookings tab
//   tabItems.push({
//     key: '4',
//     label: 'Bookings Management',
//     children: (
//       <Card title="All Bookings">
//         <Table 
//           dataSource={Array.isArray(bookings) ? bookings : []} 
//           columns={bookingColumns}
//           rowKey="_id"
//         />
//       </Card>
//     ),
//   });

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider width={250}>
//         <div style={{ padding: 20, color: 'white', textAlign: 'center' }}>
//           <h2>🏥 Lab Management</h2>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['dashboard']}
//           items={[
//             {
//               key: 'dashboard',
//               icon: <DashboardOutlined />,
//               label: 'Dashboard',
//             },
//             {
//               key: 'labs',
//               icon: <MedicineBoxOutlined />,
//               label: 'Labs',
//             },
//             {
//               key: 'bookings',
//               icon: <CalendarOutlined />,
//               label: 'Bookings',
//             },
//             {
//               key: 'reports',
//               icon: <BarChartOutlined />,
//               label: 'Reports',
//             },
//           ]}
//         />
//       </Sider>

//       <Layout>
//         <Header style={{ background: '#fff', padding: '0 20px' }}>
//           <h2>Laboratory Management System</h2>
//         </Header>

//         <Content style={{ margin: '20px' }}>
//           {/* Stats Cards */}
//           <Row gutter={16} style={{ marginBottom: 20 }}>
//             <Col span={6}>
//               <Card>
//                 <Statistic
//                   title="Total Labs"
//                   value={dashboardStats.totalLabs}
//                   prefix={<MedicineBoxOutlined />}
//                 />
//               </Card>
//             </Col>
//             <Col span={6}>
//               <Card>
//                 <Statistic
//                   title="Total Tests"
//                   value={dashboardStats.totalTests}
//                   prefix={<ExperimentOutlined />}
//                 />
//               </Card>
//             </Col>
//             <Col span={6}>
//               <Card>
//                 <Statistic
//                   title="Total Bookings"
//                   value={dashboardStats.totalBookings}
//                   prefix={<CalendarOutlined />}
//                 />
//               </Card>
//             </Col>
//             <Col span={6}>
//               <Card>
//                 <Statistic
//                   title="Total Revenue"
//                   value={dashboardStats.revenue}
//                   prefix="₹"
//                   precision={2}
//                 />
//               </Card>
//             </Col>
//           </Row>

//           <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
//         </Content>
//       </Layout>

//       {/* Lab Modal */}
//       <Modal
//         title={`${modalType === 'create' ? 'Create' : 'Edit'} Laboratory`}
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         onOk={() => form.submit()}
//         confirmLoading={loading}
//         width={600}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical" onFinish={handleLabSubmit}>
//           <Form.Item
//             name="name"
//             label="Lab Name"
//             rules={[{ required: true, message: 'Please enter lab name' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="branches"
//             label="Branches"
//           >
//             <TextArea rows={2} />
//           </Form.Item>

//           <Form.Item
//             name="discount"
//             label="Discount (%)"
//           >
//             <InputNumber min={0} max={100} style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item
//             name="logo"
//             label="Logo"
//           >
//             <Upload
//               beforeUpload={(file) => {
//                 setLogoFile(file);
//                 return false;
//               }}
//               onRemove={() => setLogoFile(null)}
//               maxCount={1}
//               accept="image/*"
//             >
//               <Button icon={<UploadOutlined />}>Upload Logo</Button>
//             </Upload>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Test Modal */}
//       <Modal
//         title={testForm.getFieldValue('_id') ? 'Edit Test' : 'Create Test'}
//         open={isTestModalVisible}
//         onCancel={() => setIsTestModalVisible(false)}
//         onOk={() => testForm.submit()}
//         confirmLoading={loading}
//         width={600}
//         destroyOnClose
//       >
//         <Form form={testForm} layout="vertical" onFinish={handleTestSubmit}>
//           <Form.Item name="_id" hidden>
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="labId"
//             label="Lab"
//             hidden
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="name"
//             label="Test Name"
//             rules={[{ required: true, message: 'Please enter test name' }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Description"
//           >
//             <TextArea rows={3} />
//           </Form.Item>

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="price"
//                 label="Price (₹)"
//                 rules={[{ required: true, message: 'Please enter price' }]}
//               >
//                 <InputNumber style={{ width: '100%' }} min={0} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="discount"
//                 label="Discount (%)"
//               >
//                 <InputNumber style={{ width: '100%' }} min={0} max={100} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default LabDashboard;


// components/dashboard/LabDashboard.jsx
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
  Statistic as AntStatistic,
  Collapse,
  Timeline,
  Rate,
  Image,
  Popconfirm
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
  AppstoreOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

const LabDashboard = () => {
  // State management
  const [labs, setLabs] = useState([]);
  const [tests, setTests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchText, setSearchText] = useState('');
  
  // Modal states
  const [isLabModalVisible, setIsLabModalVisible] = useState(false);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [isViewBookingModalVisible, setIsViewBookingModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  
  // Form instances
  const [labForm] = Form.useForm();
  const [testForm] = Form.useForm();
  const [bookingForm] = Form.useForm();

  // Color theme based on your variables
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
    }
  };

  // ==================== API FUNCTIONS ====================

  // Fetch all labs
  const fetchLabs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/labs');
      setLabs(response.data);
      if (response.data.length > 0 && !selectedLab) {
        setSelectedLab(response.data[0]);
        fetchTests(response.data[0]._id);
      }
    } catch (error) {
      message.error('Failed to fetch labs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tests by lab
  const fetchTests = async (labId) => {
    try {
      const response = await axios.get(`/tests/lab/${labId}`);
      setTests(response.data);
    } catch (error) {
      message.error('Failed to fetch tests');
    }
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      message.error('Failed to fetch bookings');
    }
  };

  // Create lab
  const createLab = async (values) => {
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
      const response = await axios.post('/labs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Lab created successfully');
      fetchLabs();
      return response.data;
    } catch (error) {
      message.error('Failed to create lab');
      throw error;
    }
  };

  // Update lab
  const updateLab = async (id, values) => {
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
      const response = await axios.put(`/labs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Lab updated successfully');
      fetchLabs();
      return response.data;
    } catch (error) {
      message.error('Failed to update lab');
      throw error;
    }
  };

  // Delete lab
  const deleteLab = async (id) => {
    try {
      await axios.delete(`/labs/${id}`);
      message.success('Lab deleted successfully');
      fetchLabs();
    } catch (error) {
      message.error('Failed to delete lab');
    }
  };

  // Create test
  const createTest = async (values) => {
    try {
      const response = await axios.post('/tests', values);
      message.success('Test created successfully');
      if (selectedLab) fetchTests(selectedLab._id);
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
      if (selectedLab) fetchTests(selectedLab._id);
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
      if (selectedLab) fetchTests(selectedLab._id);
    } catch (error) {
      message.error('Failed to delete test');
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, status) => {
    try {
      // Since your API doesn't have this endpoint yet, we'll simulate it
      message.success(`Booking status updated to ${status}`);
      // TODO: Implement actual API call when endpoint is available
      // await axios.put(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (error) {
      message.error('Failed to update booking status');
    }
  };

  // Initialize data
  useEffect(() => {
    fetchLabs();
    fetchBookings();
  }, []);

  // Calculate statistics
  const stats = {
    totalLabs: labs.length,
    totalTests: tests.length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
    confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
    cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
    revenue: bookings
      .filter(b => b.bookingStatus === 'completed')
      .reduce((sum, b) => sum + (b.totals?.discounted || 0), 0)
  };

  // ==================== HANDLER FUNCTIONS ====================

  const handleCreateLab = () => {
    labForm.resetFields();
    setIsLabModalVisible(true);
    setLogoFile(null);
  };

  const handleEditLab = (lab) => {
    labForm.setFieldsValue(lab);
    setSelectedLab(lab);
    setIsLabModalVisible(true);
    setLogoFile(null);
  };

  const handleDeleteLab = (id) => {
    Modal.confirm({
      title: 'Delete Laboratory',
      content: 'Are you sure you want to delete this laboratory? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => deleteLab(id)
    });
  };

  const handleLabSubmit = async (values) => {
    setLoading(true);
    try {
      if (values._id) {
        await updateLab(values._id, values);
      } else {
        await createLab(values);
      }
      setIsLabModalVisible(false);
      labForm.resetFields();
      setLogoFile(null);
    } catch (error) {
      console.error('Lab operation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = () => {
    if (!selectedLab) {
      message.warning('Please select a laboratory first');
      return;
    }
    testForm.resetFields();
    testForm.setFieldsValue({ labId: selectedLab._id });
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

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewBookingModalVisible(true);
  };

  // ==================== TABLE COLUMNS ====================

  const labColumns = [
    {
      title: 'Laboratory',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar 
            size={48}
            src={record.logo ? `${API_BASE_URL}/uploads/${record.logo}` : null}
            icon={!record.logo && <MedicineBoxOutlined />}
            style={{ 
              backgroundColor: record.logo ? 'transparent' : theme.accent,
              border: `2px solid ${theme.bgLight}`
            }}
          />
          <div>
            <Text strong style={{ color: theme.secondary, fontSize: 14 }}>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.branches ? `${record.branches.split(',').length} branches` : 'No branches'}
            </Text>
          </div>
        </div>
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
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Select Lab">
            <Button 
              type={selectedLab?._id === record._id ? 'primary' : 'default'}
              size="small"
              style={selectedLab?._id === record._id ? styles.primaryButton : {}}
              onClick={() => {
                setSelectedLab(record);
                fetchTests(record._id);
                setActiveTab('tests');
              }}
            >
              <ExperimentOutlined /> Tests
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditLab(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete laboratory?"
            description="This will delete all associated tests and data."
            onConfirm={() => handleDeleteLab(record._id)}
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
      title: 'Laboratory',
      key: 'lab',
      width: 150,
      render: (_, record) => (
        <div>
          <Text>{record.lab?.name || 'N/A'}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.tests?.length || 0} tests
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
      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card style={styles.statCard}>
            <Statistic
              title="Total Laboratories"
              value={stats.totalLabs}
              prefix={<MedicineBoxOutlined style={{ color: theme.primary }} />}
              valueStyle={{ color: theme.primary }}
            />
            <Progress 
              percent={100} 
              size="small" 
              showInfo={false}
              strokeColor={theme.primary}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...styles.statCard, borderLeftColor: theme.accent }}>
            <Statistic
              title="Total Tests"
              value={stats.totalTests}
              prefix={<ExperimentOutlined style={{ color: theme.accent }} />}
              valueStyle={{ color: theme.accent }}
            />
            <Progress 
              percent={100} 
              size="small" 
              showInfo={false}
              strokeColor={theme.accent}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...styles.statCard, borderLeftColor: theme.success }}>
            <Statistic
              title="Total Bookings"
              value={stats.totalBookings}
              prefix={<CalendarOutlined style={{ color: theme.success }} />}
              valueStyle={{ color: theme.success }}
            />
            <Progress 
              percent={100} 
              size="small" 
              showInfo={false}
              strokeColor={theme.success}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...styles.statCard, borderLeftColor: theme.warning }}>
            <Statistic
              title="Total Revenue"
              value={stats.revenue}
              prefix="₹"
              valueStyle={{ color: theme.warning }}
            />
            <Progress 
              percent={100} 
              size="small" 
              showInfo={false}
              strokeColor={theme.warning}
            />
          </Card>
        </Col>
      </Row>

      {/* Booking Status Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={16}>
          <Card 
            title="Recent Bookings" 
            style={styles.card}
            extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}
          >
            <Table 
              dataSource={bookings.slice(0, 5)} 
              columns={bookingColumns}
              pagination={false}
              size="small"
              rowKey="_id"
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Booking Status Overview" style={styles.card}>
            <div style={{ padding: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Pending</span>
                  <Badge count={stats.pendingBookings} style={{ backgroundColor: theme.warning }} />
                </div>
                <Progress 
                  percent={Math.round((stats.pendingBookings / stats.totalBookings) * 100) || 0}
                  strokeColor={theme.warning}
                  showInfo={false}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Confirmed</span>
                  <Badge count={stats.confirmedBookings} style={{ backgroundColor: theme.success }} />
                </div>
                <Progress 
                  percent={Math.round((stats.confirmedBookings / stats.totalBookings) * 100) || 0}
                  strokeColor={theme.success}
                  showInfo={false}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Completed</span>
                  <Badge count={stats.completedBookings} style={{ backgroundColor: theme.info }} />
                </div>
                <Progress 
                  percent={Math.round((stats.completedBookings / stats.totalBookings) * 100) || 0}
                  strokeColor={theme.info}
                  showInfo={false}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Cancelled</span>
                  <Badge count={stats.cancelledBookings} style={{ backgroundColor: theme.error }} />
                </div>
                <Progress 
                  percent={Math.round((stats.cancelledBookings / stats.totalBookings) * 100) || 0}
                  strokeColor={theme.error}
                  showInfo={false}
                />
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Laboratory Performance */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Laboratory Performance" style={styles.card}>
            <List
              dataSource={labs.slice(0, 3)}
              renderItem={(lab, index) => (
                <List.Item
                  actions={[
                    <Button key="view" size="small" onClick={() => {
                      setSelectedLab(lab);
                      setActiveTab('tests');
                    }}>View Tests</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        size={40}
                        src={lab.logo ? `${API_BASE_URL}/uploads/${lab.logo}` : null}
                        icon={!lab.logo && <MedicineBoxOutlined />}
                      />
                    }
                    title={<Text strong>{lab.name}</Text>}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">{lab.branches || 'No branches specified'}</Text>
                        <Rate disabled defaultValue={4} style={{ fontSize: 14 }} />
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
                  onClick={handleCreateLab}
                >
                  Add Laboratory
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  type="primary" 
                  icon={<PlusOutlined />}
                  style={styles.accentButton}
                  onClick={handleCreateTest}
                  disabled={!selectedLab}
                >
                  Add Test
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  icon={<DownloadOutlined />}
                  onClick={() => message.info('Export feature coming soon')}
                >
                  Export Data
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  block 
                  icon={<FileTextOutlined />}
                  onClick={() => message.info('Report generation coming soon')}
                >
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderLabs = () => (
    <Card 
      title="Laboratory Management"
      style={styles.card}
      extra={
        <Space>
          <AntInput 
            placeholder="Search laboratories..." 
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            style={styles.primaryButton}
            onClick={handleCreateLab}
          >
            Add Laboratory
          </Button>
        </Space>
      }
    >
      <Table 
        dataSource={labs.filter(lab => 
          !searchText || 
          lab.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (lab.branches && lab.branches.toLowerCase().includes(searchText.toLowerCase()))
        )} 
        columns={labColumns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
        loading={loading}
      />
    </Card>
  );

  const renderTests = () => (
    <Card 
      title={
        selectedLab ? `Test Management - ${selectedLab.name}` : 'Test Management'
      }
      style={styles.card}
      extra={
        <Space>
          {selectedLab && (
            <Button 
              onClick={() => {
                setSelectedLab(null);
                setActiveTab('labs');
              }}
              icon={<MedicineBoxOutlined />}
            >
              Select Lab
            </Button>
          )}
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            style={styles.primaryButton}
            onClick={handleCreateTest}
            disabled={!selectedLab}
          >
            Add Test
          </Button>
        </Space>
      }
    >
      {!selectedLab ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <MedicineBoxOutlined style={{ fontSize: 64, color: theme.bgLight, marginBottom: 16 }} />
          <Title level={4} style={{ color: theme.secondary, marginBottom: 8 }}>
            No Laboratory Selected
          </Title>
          <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
            Please select a laboratory to view and manage tests
          </Text>
          <Button 
            type="primary"
            style={styles.primaryButton}
            onClick={() => setActiveTab('labs')}
          >
            Select Laboratory
          </Button>
        </div>
      ) : (
        <Table 
          dataSource={tests} 
          columns={testColumns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      )}
    </Card>
  );

  const renderBookings = () => (
    <Card 
      title="Booking Management"
      style={styles.card}
      extra={
        <Space>
          <RangePicker 
            onChange={(dates) => {
              // Implement date filtering
              console.log('Date range:', dates);
            }}
          />
          <AntInput 
            placeholder="Search bookings..." 
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            allowClear
          />
          <Button icon={<FilterOutlined />}>Filter</Button>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Space>
      }
    >
      <Table 
        dataSource={bookings} 
        columns={bookingColumns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
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
            size={72}
            style={{ 
              backgroundColor: theme.primary,
              marginBottom: 12,
              border: `4px solid ${theme.white}`
            }}
            icon={<MedicineBoxOutlined />}
          />
          <Title level={4} style={{ color: theme.white, margin: 0 }}>
            LabPro Admin
          </Title>
          <Text style={{ color: theme.textLight, fontSize: 12 }}>
            Laboratory Management System
          </Text>
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
              key: 'labs',
              icon: <MedicineBoxOutlined />,
              label: 'Laboratories',
              style: { 
                margin: '4px 0',
                borderRadius: 8,
                color: activeTab === 'labs' ? theme.white : theme.textLight,
                backgroundColor: activeTab === 'labs' ? theme.primary : 'transparent'
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
                <span>
                  Bookings
                  {stats.pendingBookings > 0 && (
                    <Badge 
                      count={stats.pendingBookings} 
                      style={{ 
                        marginLeft: 8,
                        backgroundColor: theme.warning
                      }}
                    />
                  )}
                </span>
              ),
              style: { 
                margin: '4px 0',
                borderRadius: 8,
                color: activeTab === 'bookings' ? theme.white : theme.textLight,
                backgroundColor: activeTab === 'bookings' ? theme.primary : 'transparent'
              }
            },
          ]}
        />

        {/* Current Lab Info */}
        {selectedLab && (
          <div style={{ 
            margin: 16,
            padding: 16,
            background: `${theme.hover}40`,
            borderRadius: 8,
            border: `1px solid ${theme.hover}`
          }}>
            <Text strong style={{ color: theme.white, display: 'block', marginBottom: 8 }}>
              Current Laboratory
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar 
                size="small"
                src={selectedLab.logo ? `${API_BASE_URL}/uploads/${selectedLab.logo}` : null}
                icon={!selectedLab.logo && <MedicineBoxOutlined />}
              />
              <Text style={{ color: theme.textLight, fontSize: 12 }} ellipsis>
                {selectedLab.name}
              </Text>
            </div>
          </div>
        )}

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
              size={36}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=LabAdmin"
              style={{ marginRight: 8 }}
            />
            <div>
              <Text style={{ color: theme.white, fontSize: 12 }}>Lab Administrator</Text>
              <br />
              <Text style={{ color: theme.textLight, fontSize: 10 }}>admin@labpro.com</Text>
            </div>
          </div>
          <Button 
            icon={<LogoutOutlined />}
            block
            type="text"
            style={{ color: theme.textLight }}
            onClick={() => message.info('Logout functionality coming soon')}
          >
            Logout
          </Button>
        </div>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ 
          background: theme.white, 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          height: 64
        }}>
          <div>
            <Title level={4} style={{ margin: 0, color: theme.secondary }}>
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'labs' && 'Laboratory Management'}
              {activeTab === 'tests' && 'Test Management'}
              {activeTab === 'bookings' && 'Booking Management'}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {dayjs().format('dddd, MMMM D, YYYY')}
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
                  onClick={() => message.info('Notifications coming soon')}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Settings">
              <Button 
                icon={<SettingOutlined />}
                type="text"
                shape="circle"
                style={{ color: theme.secondary }}
                onClick={() => message.info('Settings coming soon')}
              />
            </Tooltip>
            <Tooltip title="Refresh Data">
              <Button 
                icon={<HistoryOutlined />}
                type="text"
                shape="circle"
                style={{ color: theme.secondary }}
                onClick={() => {
                  fetchLabs();
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
          {activeTab === 'labs' && renderLabs()}
          {activeTab === 'tests' && renderTests()}
          {activeTab === 'bookings' && renderBookings()}
        </Content>
      </Layout>

      {/* Laboratory Modal */}
      <Modal
        title={labForm.getFieldValue('_id') ? 'Edit Laboratory' : 'Add New Laboratory'}
        open={isLabModalVisible}
        onCancel={() => setIsLabModalVisible(false)}
        onOk={() => labForm.submit()}
        confirmLoading={loading}
        width={600}
        okText={labForm.getFieldValue('_id') ? 'Update' : 'Create'}
        okButtonProps={{ style: styles.primaryButton }}
      >
        <Form form={labForm} layout="vertical" onFinish={handleLabSubmit}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

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
            label="Laboratory Logo"
            extra="Upload a logo for your laboratory (optional)"
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

          <Form.Item name="labId" hidden>
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
              <Button 
                type="text" 
                icon={<InfoCircleOutlined />}
                onClick={() => message.info('More test details coming soon')}
              >
                Add More Details
              </Button>
            </Col>
          </Row>
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
              <Descriptions.Item label="Laboratory">
                {selectedBooking.lab?.name || 'N/A'}
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
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size="small" icon={<ExperimentOutlined />} />}
                    title={<Text strong>{test.name}</Text>}
                    description={
                      <Space>
                        <Text>₹{test.price}</Text>
                        {test.discount > 0 && (
                          <Text type="secondary">-{test.discount}%</Text>
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

export default LabDashboard;