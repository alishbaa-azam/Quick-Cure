// // LabDashboardPages.jsx
// import React from 'react';
// import {
//   Card, Row, Col, Statistic, Table, Button, Space, Tag, Progress,
//   Input, Select, Segmented, Badge, Avatar, List, Typography, Divider,
//   Tooltip, Popconfirm, Dropdown, message
// } from 'antd';
// import {
//   DashboardOutlined, ExperimentOutlined, CalendarOutlined, ProfileOutlined,
//   PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined,
//   SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, SafetyCertificateOutlined,
//   UserOutlined, MedicineBoxOutlined, DollarOutlined
// } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import { Line, Pie } from '@ant-design/charts';

// const { Text } = Typography;
// const { Option } = Select;

// export default function LabDashboardPages({
//   activeTab, lab, tests, filteredBookings, stats, theme, loading,
//   searchText, setSearchText, statusFilter, setStatusFilter, timeRange, setTimeRange,
//   onAddTest, onEditTest, onDeleteTest, onViewBooking, onEditProfile, onUpdateStatus
// }) {

//   // Chart Data
//   const generateBookingTrend = () => {
//     const data = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = dayjs().subtract(i, 'days').format('MMM DD');
//       data.push({ date, bookings: Math.floor(Math.random() * 10) });
//     }
//     return data;
//   };

//   const generateStatusDistribution = () => [
//     { status: 'Pending', count: stats.pendingBookings },
//     { status: 'Confirmed', count: stats.confirmedBookings },
//     { status: 'Completed', count: stats.completedBookings },
//     { status: 'Cancelled', count: stats.cancelledBookings }
//   ];

//   // Table Columns
//   const testColumns = [
//     { title: 'Test Name', dataIndex: 'name', key: 'name', width: 200 },
//     { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
//     { 
//       title: 'Price', dataIndex: 'price', key: 'price', width: 100,
//       render: (price) => <Text strong>Rs.{price || 0}</Text>
//     },
//     { 
//       title: 'Discount', dataIndex: 'discount', key: 'discount', width: 100,
//       render: (discount) => <Tag color={discount > 0 ? 'success' : 'default'}>{discount || 0}%</Tag>
//     },
//     {
//       title: 'Actions', key: 'actions', width: 120,
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="Edit">
//             <Button size="small" icon={<EditOutlined />} onClick={() => onEditTest(record)} />
//           </Tooltip>
//           <Popconfirm title="Delete test?" onConfirm={() => onDeleteTest(record._id)}>
//             <Button size="small" danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   const bookingColumns = [
//     { 
//       title: 'Booking ID', dataIndex: 'bookingReference', key: 'reference', width: 140,
//       render: (text) => <Text copyable>{text}</Text>
//     },
//     {
//       title: 'Patient', key: 'patient', width: 180,
//       render: (_, r) => (
//         <div>
//           <div>{r.patientDetails?.name || 'N/A'}</div>
//           <Text type="secondary" style={{ fontSize: 12 }}>{r.patientDetails?.mobile}</Text>
//         </div>
//       )
//     },
//     { 
//       title: 'Date', dataIndex: 'createdAt', key: 'date', width: 120,
//       render: (date) => dayjs(date).format('DD/MM/YY')
//     },
//     {
//       title: 'Amount', key: 'amount', width: 100,
//       render: (_, r) => <Text strong>Rs.{r.totals?.discounted || 0}</Text>
//     },
//     {
//       title: 'Status', dataIndex: 'bookingStatus', key: 'status', width: 120,
//       render: (status) => {
//         const config = {
//           pending: { color: theme.warning, icon: <ClockCircleOutlined />, label: 'Pending' },
//           confirmed: { color: theme.success, icon: <CheckCircleOutlined />, label: 'Confirmed' },
//           completed: { color: theme.info, icon: <SafetyCertificateOutlined />, label: 'Completed' },
//           cancelled: { color: theme.error, icon: <DeleteOutlined />, label: 'Cancelled' }
//         };
//         const c = config[status] || { color: 'default', label: status };
//         return <Tag color={c.color} icon={c.icon}>{c.label}</Tag>;
//       }
//     },
//     {
//       title: 'Actions', key: 'actions', width: 150,
//       render: (_, r) => (
//         <Space>
//           <Button size="small" icon={<EyeOutlined />} onClick={() => onViewBooking(r)} />
//           {r.bookingStatus === 'pending' && (
//             <>
//               <Button size="small" type="primary" onClick={() => onUpdateStatus(r._id, 'confirmed')}>
//                 Confirm
//               </Button>
//               <Button size="small" danger onClick={() => onUpdateStatus(r._id, 'cancelled')}>
//                 Cancel
//               </Button>
//             </>
//           )}
//           {r.bookingStatus === 'confirmed' && (
//             <Button size="small" type="primary" onClick={() => onUpdateStatus(r._id, 'completed')}>
//               Complete
//             </Button>
//           )}
//         </Space>
//       )
//     }
//   ];

//   // Render Dashboard
//   if (activeTab === 'dashboard') {
//     return (
//       <>
//         {/* Welcome Card */}
//         <Card style={{ marginBottom: 24, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
//           <Row align="middle" justify="space-between">
//             <Col>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//                 <Avatar size={64} icon={<MedicineBoxOutlined />} style={{ background: theme.white, color: theme.primary }} />
//                 <div>
//                   <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
//                     Welcome back, {lab?.name || 'Lab'}!
//                   </Text>
//                   <br />
//                   <Text style={{ color: theme.textLight }}>Here's what's happening today</Text>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Card>

//         {/* Stats Cards */}
//         <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic title="Total Bookings" value={stats.totalBookings} prefix={<CalendarOutlined />} />
//               <Progress percent={75} size="small" showInfo={false} strokeColor={theme.primary} />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic title="Completed" value={stats.completedBookings} prefix={<CheckCircleOutlined />} valueStyle={{ color: theme.success }} />
//               <Progress percent={stats.totalBookings ? (stats.completedBookings/stats.totalBookings)*100 : 0} size="small" strokeColor={theme.success} />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic title="Monthly Revenue" value={stats.monthlyRevenue} prefix="Rs." valueStyle={{ color: theme.accent }} />
//               <Progress percent={65} size="small" strokeColor={theme.accent} />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic title="Total Tests" value={stats.totalTests} prefix={<ExperimentOutlined />} valueStyle={{ color: theme.purple }} />
//               <Progress percent={100} size="small" strokeColor={theme.purple} />
//             </Card>
//           </Col>
//         </Row>

//         {/* Charts */}
//         <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//           <Col xs={24} lg={16}>
//             <Card title="Booking Trends (Last 30 Days)">
//               <Line data={generateBookingTrend()} xField="date" yField="bookings" height={300} color={theme.primary} />
//             </Card>
//           </Col>
//           <Col xs={24} lg={8}>
//             <Card title="Booking Status">
//               <Pie data={generateStatusDistribution()} angleField="count" colorField="status" height={300} />
//             </Card>
//           </Col>
//         </Row>

//         {/* Recent Bookings */}
//         <Card title="Recent Bookings" extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}>
//           <List
//             dataSource={filteredBookings.slice(0, 5)}
//             renderItem={(item) => (
//               <List.Item actions={[<Button icon={<EyeOutlined />} onClick={() => onViewBooking(item)}>View</Button>]}>
//                 <List.Item.Meta
//                   avatar={<Avatar icon={<UserOutlined />} style={{ background: item.bookingStatus === 'pending' ? theme.warning : theme.success }} />}
//                   title={item.patientDetails?.name}
//                   description={`${item.tests?.length || 0} tests • Rs.${item.totals?.discounted || 0}`}
//                 />
//                 <div>{dayjs(item.createdAt).format('DD MMM')}</div>
//               </List.Item>
//             )}
//           />
//         </Card>
//       </>
//     );
//   }

//   // Render Tests
//   if (activeTab === 'tests') {
//     return (
//       <Card
//         title={<Space><ExperimentOutlined /> Test Management <Tag color={theme.primary}>{tests.length} Tests</Tag></Space>}
//         extra={
//           <Space>
//             <Input placeholder="Search tests..." prefix={<SearchOutlined />} style={{ width: 200 }}
//               onChange={(e) => setSearchText(e.target.value)} allowClear />
//             <Button type="primary" icon={<PlusOutlined />} onClick={onAddTest}>Add Test</Button>
//           </Space>
//         }
//       >
//         <Table 
//           dataSource={tests.filter(t => !searchText || t.name.toLowerCase().includes(searchText.toLowerCase()))}
//           columns={testColumns} rowKey="_id" loading={loading}
//         />
//       </Card>
//     );
//   }

//   // Render Bookings
//   if (activeTab === 'bookings') {
//     return (
//       <Card
//         title={<Space><CalendarOutlined /> Booking Management <Badge count={stats.pendingBookings} style={{ background: theme.warning }} /></Space>}
//         extra={
//           <Space wrap>
//             <Segmented options={['All', 'Today', '7 Days', '30 Days']} value={timeRange} onChange={setTimeRange} />
//             <Select placeholder="Status" style={{ width: 150 }} allowClear onChange={setStatusFilter} value={statusFilter}>
//               <Option value="all">All</Option>
//               <Option value="pending">Pending</Option>
//               <Option value="confirmed">Confirmed</Option>
//               <Option value="completed">Completed</Option>
//             </Select>
//             <Input placeholder="Search..." prefix={<SearchOutlined />} style={{ width: 200 }}
//               onChange={(e) => setSearchText(e.target.value)} allowClear value={searchText} />
//             <Dropdown menu={{ items: [{ key: 'export', label: 'Export', icon: <DownloadOutlined /> }] }}>
//               <Button icon={<DownloadOutlined />}>Export</Button>
//             </Dropdown>
//           </Space>
//         }
//       >
//         <Table 
//           dataSource={filteredBookings} 
//           columns={bookingColumns} 
//           rowKey="_id" 
//           loading={loading}
//           summary={() => (
//             <Table.Summary.Row>
//               <Table.Summary.Cell index={0} colSpan={4}>
//                 <Text strong>Showing {filteredBookings.length} of {bookings.length} bookings</Text>
//               </Table.Summary.Cell>
//               <Table.Summary.Cell index={4}>
//                 <Text strong>Revenue: Rs.{filteredBookings.filter(b => b.bookingStatus === 'completed')
//                   .reduce((s, b) => s + (b.totals?.discounted || 0), 0)}</Text>
//               </Table.Summary.Cell>
//             </Table.Summary.Row>
//           )}
//         />
//       </Card>
//     );
//   }

//   // Render Profile
//   if (activeTab === 'profile') {
//     return (
//       <Card
//         title={<Space><ProfileOutlined /> Lab Profile</Space>}
//         extra={<Button type="primary" icon={<EditOutlined />} onClick={onEditProfile}>Edit Profile</Button>}
//       >
//         {lab && (
//           <div style={{ display: 'flex', gap: 32 }}>
//             <div>
//               {lab.logo ? (
//                 <img src={`http://localhost:5000/uploads/${lab.logo}`} alt="logo" style={{ width: 150, borderRadius: 8 }} />
//               ) : (
//                 <Avatar size={150} icon={<MedicineBoxOutlined />} style={{ background: theme.primary }} />
//               )}
//             </div>
//             <div style={{ flex: 1 }}>
//               <Row gutter={[16, 16]}>
//                 <Col span={12}><Text type="secondary">Lab Name:</Text><br /><Text strong>{lab.name}</Text></Col>
//                 <Col span={12}><Text type="secondary">Discount:</Text><br /><Tag color="success">{lab.discount || 0}%</Tag></Col>
//                 <Col span={24}><Text type="secondary">Branches:</Text><br />
//                   {lab.branches?.split(',').map((b, i) => <Tag key={i}>{b.trim()}</Tag>)}
//                 </Col>
//                 <Col span={12}><Text type="secondary">Total Tests:</Text><br /><Badge count={stats.totalTests} style={{ background: theme.primary }} /></Col>
//                 <Col span={12}><Text type="secondary">Total Revenue:</Text><br /><Text strong>Rs.{stats.totalRevenue}</Text></Col>
//                 <Col span={24}>
//                   <Progress percent={stats.totalBookings ? (stats.completedBookings/stats.totalBookings)*100 : 0} 
//                     format={() => `${stats.completedBookings}/${stats.totalBookings} completed`} />
//                 </Col>
//               </Row>
//             </div>
//           </div>
//         )}
//       </Card>
//     );
//   }

//   return null;
// }

// LabDashboardPages.jsx
// import React from 'react';
// import {
//   Card, Row, Col, Statistic, Table, Button, Space, Tag, Progress,
//   Input, Select, Segmented, Badge, Avatar, List, Typography, Divider,
//   Tooltip, Popconfirm, Dropdown, message, Empty
// } from 'antd';
// import {
//   DashboardOutlined, ExperimentOutlined, CalendarOutlined, ProfileOutlined,
//   PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined,
//   SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, SafetyCertificateOutlined,
//   UserOutlined, MedicineBoxOutlined, DollarOutlined, ReloadOutlined
// } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import { Line, Pie } from '@ant-design/charts';

// const { Text } = Typography;
// const { Option } = Select;

// export default function LabDashboardPages({
//   activeTab, 
//   lab, 
//   tests = [], 
//   bookings = [], // Add bookings array with default value
//   filteredBookings = [], // Add filteredBookings with default value
//   stats = {}, // Add stats with default value
//   theme, 
//   loading,
//   searchText, 
//   setSearchText, 
//   statusFilter, 
//   setStatusFilter, 
//   timeRange, 
//   setTimeRange,
//   onAddTest, 
//   onEditTest, 
//   onDeleteTest, 
//   onViewBooking, 
//   onEditProfile, 
//   onUpdateStatus
// }) {

//   // Safe data access with default values
//   const safeStats = {
//     totalBookings: stats?.totalBookings || 0,
//     pendingBookings: stats?.pendingBookings || 0,
//     confirmedBookings: stats?.confirmedBookings || 0,
//     completedBookings: stats?.completedBookings || 0,
//     cancelledBookings: stats?.cancelledBookings || 0,
//     totalRevenue: stats?.totalRevenue || 0,
//     monthlyRevenue: stats?.monthlyRevenue || 0,
//     totalTests: stats?.totalTests || 0
//   };

//   // Chart Data with safe values
//   const generateBookingTrend = () => {
//     const data = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = dayjs().subtract(i, 'days').format('MMM DD');
//       // Get actual booking count for that day
//       const dayBookings = bookings?.filter(b => 
//         dayjs(b.createdAt).isSame(dayjs().subtract(i, 'days'), 'day')
//       ) || [];
//       data.push({ date, bookings: dayBookings.length });
//     }
//     return data;
//   };

//   const generateStatusDistribution = () => [
//     { status: 'Pending', count: safeStats.pendingBookings },
//     { status: 'Confirmed', count: safeStats.confirmedBookings },
//     { status: 'Completed', count: safeStats.completedBookings },
//     { status: 'Cancelled', count: safeStats.cancelledBookings }
//   ].filter(item => item.count > 0); // Only show statuses with counts

//   // Table Columns
//   const testColumns = [
//     { title: 'Test Name', dataIndex: 'name', key: 'name', width: 200 },
//     { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
//     { 
//       title: 'Price', dataIndex: 'price', key: 'price', width: 100,
//       render: (price) => <Text strong>Rs.{price || 0}</Text>
//     },
//     { 
//       title: 'Discount', dataIndex: 'discount', key: 'discount', width: 100,
//       render: (discount) => <Tag color={discount > 0 ? 'success' : 'default'}>{discount || 0}%</Tag>
//     },
//     {
//       title: 'Actions', key: 'actions', width: 120,
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="Edit">
//             <Button size="small" icon={<EditOutlined />} onClick={() => onEditTest(record)} />
//           </Tooltip>
//           <Popconfirm title="Delete test?" onConfirm={() => onDeleteTest(record._id)}>
//             <Button size="small" danger icon={<DeleteOutlined />} />
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   const bookingColumns = [
//     { 
//       title: 'Booking ID', dataIndex: 'bookingReference', key: 'reference', width: 140,
//       render: (text) => text ? <Text copyable>{text}</Text> : 'N/A'
//     },
//     {
//       title: 'Patient', key: 'patient', width: 180,
//       render: (_, r) => (
//         <div>
//           <div>{r.patientDetails?.name || 'N/A'}</div>
//           <Text type="secondary" style={{ fontSize: 12 }}>{r.patientDetails?.mobile || 'No contact'}</Text>
//         </div>
//       )
//     },
//     { 
//       title: 'Date', dataIndex: 'createdAt', key: 'date', width: 120,
//       render: (date) => date ? dayjs(date).format('DD/MM/YY') : 'N/A'
//     },
//     {
//       title: 'Amount', key: 'amount', width: 100,
//       render: (_, r) => <Text strong>Rs.{r.totals?.discounted || 0}</Text>
//     },
//     {
//       title: 'Status', dataIndex: 'bookingStatus', key: 'status', width: 120,
//       render: (status) => {
//         const config = {
//           pending: { color: theme?.warning || '#faad14', icon: <ClockCircleOutlined />, label: 'Pending' },
//           confirmed: { color: theme?.success || '#52c41a', icon: <CheckCircleOutlined />, label: 'Confirmed' },
//           completed: { color: theme?.info || '#1890ff', icon: <SafetyCertificateOutlined />, label: 'Completed' },
//           cancelled: { color: theme?.error || '#ff4d4f', icon: <DeleteOutlined />, label: 'Cancelled' }
//         };
//         const c = config[status] || { color: 'default', label: status || 'Unknown' };
//         return (
//           <Tag color={c.color} icon={c.icon} style={{ padding: '4px 8px' }}>
//             {c.label}
//           </Tag>
//         );
//       }
//     },
//     {
//       title: 'Actions', key: 'actions', width: 200,
//       render: (_, r) => (
//         <Space size="small">
//           <Tooltip title="View Details">
//             <Button size="small" icon={<EyeOutlined />} onClick={() => onViewBooking(r)} />
//           </Tooltip>
//           {r.bookingStatus === 'pending' && (
//             <>
//               <Tooltip title="Confirm Booking">
//                 <Button 
//                   size="small" 
//                   type="primary" 
//                   icon={<CheckCircleOutlined />}
//                   onClick={() => onUpdateStatus(r._id, 'confirmed')}
//                 >
//                   Confirm
//                 </Button>
//               </Tooltip>
//               <Tooltip title="Cancel Booking">
//                 <Button 
//                   size="small" 
//                   danger 
//                   icon={<DeleteOutlined />}
//                   onClick={() => onUpdateStatus(r._id, 'cancelled')}
//                 >
//                   Cancel
//                 </Button>
//               </Tooltip>
//             </>
//           )}
//           {r.bookingStatus === 'confirmed' && (
//             <Tooltip title="Mark as Completed">
//               <Button 
//                 size="small" 
//                 type="primary" 
//                 icon={<SafetyCertificateOutlined />}
//                 onClick={() => onUpdateStatus(r._id, 'completed')}
//               >
//                 Complete
//               </Button>
//             </Tooltip>
//           )}
//         </Space>
//       )
//     }
//   ];

//   // Render Dashboard
//   if (activeTab === 'dashboard') {
//     return (
//       <>
//         {/* Welcome Card */}
//         <Card style={{ 
//           marginBottom: 24, 
//           background: `linear-gradient(135deg, ${theme?.primary || '#2c6774'}, ${theme?.secondary || '#174047'})`,
//           borderRadius: 12
//         }}>
//           <Row align="middle" justify="space-between">
//             <Col>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//                 <Avatar 
//                   size={64} 
//                   icon={<MedicineBoxOutlined />} 
//                   style={{ 
//                     background: theme?.white || '#ffffff', 
//                     color: theme?.primary || '#2c6774' 
//                   }} 
//                 />
//                 <div>
//                   <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
//                     Welcome back, {lab?.name || 'Lab'}!
//                   </Text>
//                   <br />
//                   <Text style={{ color: theme?.textLight || '#c0d3dc' }}>
//                     Here's what's happening today
//                   </Text>
//                 </div>
//               </div>
//             </Col>
//             <Col>
//               <Button 
//                 icon={<ReloadOutlined />} 
//                 style={{ color: 'white', borderColor: 'white' }}
//                 type="text"
//                 onClick={() => window.location.reload()}
//               >
//                 Refresh
//               </Button>
//             </Col>
//           </Row>
//         </Card>

//         {/* Stats Cards */}
//         <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic 
//                 title="Total Bookings" 
//                 value={safeStats.totalBookings} 
//                 prefix={<CalendarOutlined />} 
//               />
//               <Progress 
//                 percent={safeStats.totalBookings ? Math.min(100, (safeStats.completedBookings / safeStats.totalBookings) * 100) : 0} 
//                 size="small" 
//                 showInfo={false} 
//                 strokeColor={theme?.primary || '#2c6774'} 
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic 
//                 title="Completed" 
//                 value={safeStats.completedBookings} 
//                 prefix={<CheckCircleOutlined />} 
//                 valueStyle={{ color: theme?.success || '#52c41a' }} 
//               />
//               <Progress 
//                 percent={safeStats.totalBookings ? (safeStats.completedBookings/safeStats.totalBookings)*100 : 0} 
//                 size="small" 
//                 strokeColor={theme?.success || '#52c41a'} 
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic 
//                 title="Monthly Revenue" 
//                 value={safeStats.monthlyRevenue} 
//                 prefix="Rs." 
//                 valueStyle={{ color: theme?.accent || '#5c878f' }} 
//               />
//               <Progress 
//                 percent={safeStats.monthlyRevenue ? Math.min(100, (safeStats.monthlyRevenue / 100000) * 100) : 0} 
//                 size="small" 
//                 strokeColor={theme?.accent || '#5c878f'} 
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card>
//               <Statistic 
//                 title="Total Tests" 
//                 value={safeStats.totalTests} 
//                 prefix={<ExperimentOutlined />} 
//                 valueStyle={{ color: theme?.purple || '#722ed1' }} 
//               />
//               <Progress percent={100} size="small" strokeColor={theme?.purple || '#722ed1'} />
//             </Card>
//           </Col>
//         </Row>

//         {/* Charts */}
//         <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//           <Col xs={24} lg={16}>
//             <Card title="Booking Trends (Last 30 Days)">
//               {bookings?.length > 0 ? (
//                 <Line 
//                   data={generateBookingTrend()} 
//                   xField="date" 
//                   yField="bookings" 
//                   height={300} 
//                   color={theme?.primary || '#2c6774'}
//                   point={{ size: 4 }}
//                   smooth
//                 />
//               ) : (
//                 <Empty description="No booking data available" />
//               )}
//             </Card>
//           </Col>
//           <Col xs={24} lg={8}>
//             <Card title="Booking Status Distribution">
//               {safeStats.totalBookings > 0 ? (
//                 <Pie 
//                   data={generateStatusDistribution()} 
//                   angleField="count" 
//                   colorField="status" 
//                   height={300}
//                   radius={0.8}
//                   label={{
//                     type: 'inner',
//                     offset: '-30%',
//                     content: '{percentage}',
//                     style: { fontSize: 14 }
//                   }}
//                   color={[theme?.warning || '#faad14', theme?.success || '#52c41a', theme?.info || '#1890ff', theme?.error || '#ff4d4f']}
//                 />
//               ) : (
//                 <Empty description="No status data available" />
//               )}
//             </Card>
//           </Col>
//         </Row>

//         {/* Recent Bookings */}
//         <Card 
//           title="Recent Bookings" 
//           extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}
//         >
//           {filteredBookings?.length > 0 ? (
//             <List
//               dataSource={filteredBookings.slice(0, 5)}
//               renderItem={(item) => (
//                 <List.Item 
//                   key={item._id}
//                   actions={[
//                     <Button 
//                       icon={<EyeOutlined />} 
//                       onClick={() => onViewBooking(item)}
//                     >
//                       View
//                     </Button>
//                   ]}
//                 >
//                   <List.Item.Meta
//                     avatar={
//                       <Avatar 
//                         icon={<UserOutlined />} 
//                         style={{ 
//                           background: item.bookingStatus === 'pending' 
//                             ? theme?.warning || '#faad14' 
//                             : theme?.success || '#52c41a' 
//                         }} 
//                       />
//                     }
//                     title={item.patientDetails?.name || 'Unknown Patient'}
//                     description={`${item.tests?.length || 0} tests • Rs.${item.totals?.discounted || 0}`}
//                   />
//                   <div>{dayjs(item.createdAt).format('DD MMM YYYY')}</div>
//                 </List.Item>
//               )}
//             />
//           ) : (
//             <Empty description="No recent bookings" />
//           )}
//         </Card>
//       </>
//     );
//   }

//   // Render Tests
//   if (activeTab === 'tests') {
//     return (
//       <Card
//         title={
//           <Space>
//             <ExperimentOutlined /> 
//             Test Management 
//             <Tag color={theme?.primary || '#2c6774'}>{tests?.length || 0} Tests</Tag>
//           </Space>
//         }
//         extra={
//           <Space>
//             <Input 
//               placeholder="Search tests..." 
//               prefix={<SearchOutlined />} 
//               style={{ width: 200 }}
//               onChange={(e) => setSearchText(e.target.value)} 
//               allowClear 
//               value={searchText}
//             />
//             <Button 
//               type="primary" 
//               icon={<PlusOutlined />} 
//               onClick={onAddTest}
//               style={{ background: theme?.primary, borderColor: theme?.primary }}
//             >
//               Add Test
//             </Button>
//           </Space>
//         }
//       >
//         <Table 
//           dataSource={tests?.filter(t => 
//             !searchText || 
//             t?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//             t?.description?.toLowerCase().includes(searchText.toLowerCase())
//           ) || []} 
//           columns={testColumns} 
//           rowKey="_id" 
//           loading={loading}
//           locale={{ emptyText: <Empty description="No tests found" /> }}
//         />
//       </Card>
//     );
//   }

//   // Render Bookings
//   if (activeTab === 'bookings') {
//     return (
//       <Card
//         title={
//           <Space>
//             <CalendarOutlined /> 
//             Booking Management 
//             {safeStats.pendingBookings > 0 && (
//               <Badge 
//                 count={safeStats.pendingBookings} 
//                 style={{ background: theme?.warning || '#faad14' }} 
//               />
//             )}
//           </Space>
//         }
//         extra={
//           <Space wrap size="middle">
//             <Segmented
//               options={[
//                 { label: 'All', value: 'all' },
//                 { label: 'Today', value: '1' },
//                 { label: '7 Days', value: '7' },
//                 { label: '30 Days', value: '30' }
//               ]}
//               value={timeRange}
//               onChange={setTimeRange}
//             />
            
//             <Select 
//               placeholder="Filter by Status" 
//               style={{ width: 150 }} 
//               allowClear 
//               onChange={setStatusFilter} 
//               value={statusFilter}
//             >
//               <Option value="all">All Status</Option>
//               <Option value="pending">Pending</Option>
//               <Option value="confirmed">Confirmed</Option>
//               <Option value="completed">Completed</Option>
//               <Option value="cancelled">Cancelled</Option>
//             </Select>
            
//             <Input 
//               placeholder="Search by ID, Patient..." 
//               prefix={<SearchOutlined />} 
//               style={{ width: 220 }}
//               onChange={(e) => setSearchText(e.target.value)} 
//               allowClear 
//               value={searchText}
//             />
            
//             <Dropdown 
//               menu={{ 
//                 items: [
//                   { 
//                     key: 'export', 
//                     label: 'Export to CSV', 
//                     icon: <DownloadOutlined />,
//                     onClick: () => message.success('Export feature coming soon!')
//                   }
//                 ] 
//               }}
//             >
//               <Button icon={<DownloadOutlined />}>Export</Button>
//             </Dropdown>
//           </Space>
//         }
//       >
//         <Table 
//           dataSource={filteredBookings || []} 
//           columns={bookingColumns} 
//           rowKey="_id" 
//           loading={loading}
//           scroll={{ x: 1000 }}
//           pagination={{ 
//             pageSize: 10,
//             showTotal: (total) => `Total ${total} bookings`
//           }}
//           locale={{ 
//             emptyText: (
//               <Empty 
//                 description={
//                   <span>
//                     No bookings found<br />
//                     <small style={{ color: '#999' }}>
//                       {statusFilter !== 'all' ? 'Try changing the status filter' : 'Bookings will appear here'}
//                     </small>
//                   </span>
//                 }
//               />
//             )
//           }}
//           summary={(pageData) => {
//             const totalRevenue = pageData
//               .filter(b => b?.bookingStatus === 'completed')
//               .reduce((sum, b) => sum + (b?.totals?.discounted || 0), 0);
            
//             return (
//               <Table.Summary fixed>
//                 <Table.Summary.Row>
//                   <Table.Summary.Cell index={0} colSpan={4}>
//                     <Text strong>
//                       Showing {filteredBookings?.length || 0} of {bookings?.length || 0} bookings
//                     </Text>
//                   </Table.Summary.Cell>
//                   <Table.Summary.Cell index={4} colSpan={2}>
//                     <Text strong style={{ color: theme?.success }}>
//                       Total Revenue: Rs.{totalRevenue.toLocaleString()}
//                     </Text>
//                   </Table.Summary.Cell>
//                 </Table.Summary.Row>
//               </Table.Summary>
//             );
//           }}
//         />
//       </Card>
//     );
//   }

//   // Render Profile
//   if (activeTab === 'profile') {
//     return (
//       <Card
//         title={
//           <Space>
//             <ProfileOutlined /> 
//             Lab Profile
//           </Space>
//         }
//         extra={
//           <Button 
//             type="primary" 
//             icon={<EditOutlined />} 
//             onClick={onEditProfile}
//             style={{ background: theme?.primary, borderColor: theme?.primary }}
//           >
//             Edit Profile
//           </Button>
//         }
//       >
//         {lab ? (
//           <Row gutter={[32, 32]}>
//             <Col xs={24} md={8} style={{ textAlign: 'center' }}>
//               {lab.logo ? (
//                 <img 
//                   src={`http://localhost:5000/uploads/${lab.logo}`} 
//                   alt="Lab Logo" 
//                   style={{ 
//                     width: '100%', 
//                     maxWidth: 200, 
//                     borderRadius: 12,
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//                   }} 
//                 />
//               ) : (
//                 <Avatar 
//                   size={200} 
//                   icon={<MedicineBoxOutlined />} 
//                   style={{ background: theme?.primary || '#2c6774' }} 
//                 />
//               )}
//             </Col>
            
//             <Col xs={24} md={16}>
//               <Row gutter={[24, 24]}>
//                 <Col span={12}>
//                   <Text type="secondary">Laboratory Name</Text>
//                   <div><Text strong style={{ fontSize: 18 }}>{lab.name}</Text></div>
//                 </Col>
                
//                 <Col span={12}>
//                   <Text type="secondary">Discount Offered</Text>
//                   <div>
//                     <Tag color="success" style={{ fontSize: 16, padding: '4px 12px' }}>
//                       {lab.discount || 0}% OFF
//                     </Tag>
//                   </div>
//                 </Col>
                
//                 <Col span={24}>
//                   <Text type="secondary">Branch Locations</Text>
//                   <div style={{ marginTop: 8 }}>
//                     {lab.branches?.split(',').map((branch, i) => (
//                       <Tag key={i} style={{ marginBottom: 4, padding: '4px 12px' }}>
//                         {branch.trim()}
//                       </Tag>
//                     )) || 'No branches specified'}
//                   </div>
//                 </Col>
                
//                 <Col span={12}>
//                   <Text type="secondary">Total Tests</Text>
//                   <div>
//                     <Badge 
//                       count={safeStats.totalTests} 
//                       style={{ background: theme?.primary, fontSize: 16, padding: '0 12px' }} 
//                     />
//                   </div>
//                 </Col>
                
//                 <Col span={12}>
//                   <Text type="secondary">Total Revenue</Text>
//                   <div><Text strong style={{ fontSize: 18, color: theme?.success }}>
//                     Rs.{safeStats.totalRevenue.toLocaleString()}
//                   </Text></div>
//                 </Col>
                
//                 <Col span={24}>
//                   <Text type="secondary">Overall Performance</Text>
//                   <Progress 
//                     percent={safeStats.totalBookings ? (safeStats.completedBookings/safeStats.totalBookings)*100 : 0} 
//                     status="active"
//                     strokeColor={theme?.success}
//                     format={() => `${safeStats.completedBookings}/${safeStats.totalBookings} bookings completed`}
//                     style={{ marginTop: 8 }}
//                   />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         ) : (
//           <Empty description="No lab data available" />
//         )}
//       </Card>
//     );
//   }

//   return null;
// }

// LabDashboardPages.jsx
import React, { useState } from 'react';
import {
  Card, Row, Col, Statistic, Table, Button, Space, Tag, Progress,
  Input, Select, Segmented, Badge, Avatar, List, Typography, Divider,
  Tooltip, Popconfirm, Dropdown, message, Empty, Modal, Descriptions,
  Steps, Timeline, Alert
} from 'antd';
import {
  DashboardOutlined, ExperimentOutlined, CalendarOutlined, ProfileOutlined,
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined,
  SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, SafetyCertificateOutlined,
  UserOutlined, MedicineBoxOutlined, DollarOutlined, ReloadOutlined,
  EnvironmentOutlined, MailOutlined, PhoneOutlined, IdcardOutlined,
  TeamOutlined, PercentageOutlined, BankOutlined, FieldTimeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Line, Pie } from '@ant-design/charts';
import CountUp from 'react-countup';

const { Text, Title } = Typography;
const { Option } = Select;
const { Step } = Steps;

export default function LabDashboardPages({
  activeTab, 
  lab, 
  tests = [], 
  bookings = [],
  filteredBookings = [],
  stats = {}, 
  theme = {
    primary: '#2c6774',
    secondary: '#174047',
    accent: '#5c878f',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    purple: '#722ed1',
    white: '#ffffff',
    textLight: '#c0d3dc'
  }, 
  loading,
  searchText, 
  setSearchText, 
  statusFilter, 
  setStatusFilter, 
  timeRange, 
  setTimeRange,
  onAddTest, 
  onEditTest, 
  onDeleteTest, 
  onViewBooking, 
  onEditProfile, 
  onUpdateStatus
}) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // Safe data access with proper model fields
  const safeStats = {
    totalBookings: stats?.totalBookings || 0,
    pendingBookings: stats?.pendingBookings || 0,
    confirmedBookings: stats?.confirmedBookings || 0,
    completedBookings: stats?.completedBookings || 0,
    cancelledBookings: stats?.cancelledBookings || 0,
    totalRevenue: stats?.totalRevenue || 0,
    monthlyRevenue: stats?.monthlyRevenue || 0,
    totalTests: stats?.totalTests || 0,
    totalDiscount: stats?.totalDiscount || 0,
    totalSaved: stats?.totalSaved || 0,
    averageBookingValue: stats?.totalBookings ? 
      Math.round(stats.totalRevenue / stats.totalBookings) : 0
  };

  // Calculate completion rate
  const completionRate = safeStats.totalBookings 
    ? Math.round((safeStats.completedBookings / safeStats.totalBookings) * 100) 
    : 0;

  // Chart Data with proper booking data
  const generateBookingTrend = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = dayjs().subtract(i, 'days');
      const dayBookings = bookings?.filter(b => 
        dayjs(b.createdAt).isSame(date, 'day')
      ) || [];
      
      data.push({
        date: date.format('MMM DD'),
        bookings: dayBookings.length,
        revenue: dayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
        completed: dayBookings.filter(b => b.bookingStatus === 'completed').length
      });
    }
    return data;
  };

  const generateStatusDistribution = () => [
    { status: 'Pending', count: safeStats.pendingBookings, color: theme.warning },
    { status: 'Confirmed', count: safeStats.confirmedBookings, color: theme.info },
    { status: 'Completed', count: safeStats.completedBookings, color: theme.success },
    { status: 'Cancelled', count: safeStats.cancelledBookings, color: theme.error }
  ].filter(item => item.count > 0);

  // Test Columns according to Test Model
  const testColumns = [
    {
      title: 'Test Details',
      key: 'details',
      width: 300,
      render: (_, record) => (
        <Space align="start">
          <Avatar 
            icon={<ExperimentOutlined />} 
            style={{ background: theme.primary }}
            size="large"
          />
          <div>
            <Text strong style={{ fontSize: 16 }}>{record.name}</Text>
            {record.description && (
              <><br /><Text type="secondary" style={{ fontSize: 12 }}>
                          {record.description.substring(0, 50)}{record.description.length > 50 ? '...' : ''}
                      </Text></>
            )}
          </div>
        </Space>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price) => (
        <Text strong style={{ color: theme.primary, fontSize: 16 }}>
          Rs.{price?.toLocaleString() || 0}
        </Text>
      )
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
      render: (discount) => (
        discount > 0 ? (
          <Tag color="success" style={{ borderRadius: 20 }}>
            <PercentageOutlined /> {discount}% OFF
          </Tag>
        ) : (
          <Tag color="default">No Discount</Tag>
        )
      )
    },
    // {
    //   title: 'Final Price',
    //   key: 'finalPrice',
    //   width: 120,
    //   render: (_, record) => {
    //     const finalPrice = record.price * (1 - (record.discount || 0) / 100);
    //     return (
    //       <Text strong style={{ color: theme.success }}>
    //         Rs.{finalPrice.toLocaleString()}
    //       </Text>
    //     );
    //   }
    // },
    // {
    //   title: 'Lab',
    //   dataIndex: 'labId',
    //   key: 'lab',
    //   width: 150,
    //   render: (labId) => (
    //     <Tag color={theme.accent}>{lab?.name || 'Your Lab'}</Tag>
    //   )
    // },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Test">
            <Button 
              shape="circle"
              icon={<EditOutlined />} 
              onClick={() => onEditTest(record)}
              style={{ borderColor: theme.primary, color: theme.primary }}
            />
          </Tooltip>
          <Tooltip title="Delete Test">
            <Popconfirm 
              title="Delete test?" 
              description="This action cannot be undone"
              onConfirm={() => onDeleteTest(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button 
                shape="circle"
                danger 
                icon={<DeleteOutlined />} 
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  // Booking Columns according to Booking Model
  const bookingColumns = [
    {
      title: 'Booking Reference',
      dataIndex: 'bookingReference',
      key: 'reference',
      width: 160,
      render: (text) => (
        <Space>
          <IdcardOutlined style={{ color: theme.primary }} />
          <Text copyable strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Patient Details',
      key: 'patient',
      width: 220,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.patientDetails?.name}</Text>
          <Space size={4}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Age: {record.patientDetails?.age} • {record.patientDetails?.gender}
            </Text>
          </Space>
          <Space size={4}>
            <PhoneOutlined style={{ fontSize: 12, color: theme.accent }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.patientDetails?.mobile}
            </Text>
          </Space>
        </Space>
      )
    },
    {
      title: 'Tests',
      key: 'tests',
      width: 150,
      render: (_, record) => (
        <Tooltip 
          title={
            <div>
              {record.tests?.map((test, index) => (
                <div key={index}>• {test.name}</div>
              ))}
            </div>
          }
        >
          <Badge 
            count={record.tests?.length || 0} 
            style={{ background: theme.primary }}
          />
          <Text style={{ marginLeft: 8 }}>Tests</Text>
        </Tooltip>
      )
    },
    {
      title: 'Appointment',
      key: 'appointment',
      width: 180,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space>
            <CalendarOutlined style={{ color: theme.warning }} />
            <Text>{dayjs(record.appointmentDetails?.preferredDate).format('DD MMM YYYY')}</Text>
          </Space>
          {record.appointmentDetails?.addressForCollection && (
            <Tooltip title={record.appointmentDetails.addressForCollection}>
              <Space>
                <EnvironmentOutlined style={{ color: theme.accent }} />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {record.appointmentDetails.addressForCollection.substring(0, 20)}...
                </Text>
              </Space>
            </Tooltip>
          )}
        </Space>
      )
    },
    {
      title: 'Amount Details',
      key: 'amount',
      width: 200,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: theme.primary, fontSize: 16 }}>
            Rs.{record.totalAmount?.toLocaleString()}
          </Text>
          {record.discountApplied > 0 && (
            <Space size={4}>
              <Text delete type="secondary" style={{ fontSize: 12 }}>
                Rs.{record.originalAmount}
              </Text>
              <Tag color="success" style={{ fontSize: 10 }}>
                Save Rs.{record.amountSaved}
              </Tag>
            </Space>
          )}
        </Space>
      )
    },
    {
      title: 'Status',
      key: 'status',
      width: 150,
      render: (_, record) => {
        const statusConfig = {
          pending: { color: theme.warning, icon: <ClockCircleOutlined />, label: 'Pending', step: 1 },
          confirmed: { color: theme.info, icon: <CheckCircleOutlined />, label: 'Confirmed', step: 2 },
          completed: { color: theme.success, icon: <SafetyCertificateOutlined />, label: 'Completed', step: 3 },
          cancelled: { color: theme.error, icon: <DeleteOutlined />, label: 'Cancelled', step: 0 }
        };
        const config = statusConfig[record.bookingStatus] || statusConfig.pending;
        
        return (
          <Space direction="vertical" size={4}>
            <Tag 
              color={config.color}
              icon={config.icon}
              style={{ padding: '4px 12px', borderRadius: 20 }}
            >
              {config.label}
            </Tag>
            <Tag color={record.paymentStatus === 'paid' ? 'success' : 'warning'}>
              Payment: {record.paymentStatus}
            </Tag>
          </Space>
        );
      }
    },
    {
      title: 'Group Booking',
      key: 'group',
      width: 120,
      render: (_, record) => (
        record.groupBooking ? (
          <Tooltip title={`Group of ${record.totalPatients} patients`}>
            <Tag color={theme.purple} icon={<TeamOutlined />}>
              Group • {record.patientIndex}/{record.totalPatients}
            </Tag>
          </Tooltip>
        ) : (
          <Tag color="default">Individual</Tag>
        )
      )
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => (
        <Tooltip title={dayjs(date).format('DD MMM YYYY, hh:mm A')}>
          <Space>
            <FieldTimeOutlined style={{ color: theme.accent }} />
            <Text>{dayjs(date).format('DD/MM/YY')}</Text>
          </Space>
        </Tooltip>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small" wrap>
          <Tooltip title="View Details">
            <Button 
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedBooking(record);
                setDetailsModalVisible(true);
              }}
            />
          </Tooltip>
          
          {record.bookingStatus === 'pending' && (
            <>
              <Tooltip title="Confirm Booking">
                <Button 
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => onUpdateStatus(record._id, 'confirmed')}
                  style={{ background: theme.success, borderColor: theme.success }}
                >
                  Confirm
                </Button>
              </Tooltip>
              <Tooltip title="Cancel Booking">
                <Button 
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => onUpdateStatus(record._id, 'cancelled')}
                >
                  Cancel
                </Button>
              </Tooltip>
            </>
          )}
          
          {record.bookingStatus === 'confirmed' && (
            <Tooltip title="Mark as Completed">
              <Button 
                type="primary"
                icon={<SafetyCertificateOutlined />}
                onClick={() => onUpdateStatus(record._id, 'completed')}
                style={{ background: theme.success, borderColor: theme.success }}
              >
                Complete
              </Button>
            </Tooltip>
          )}
          
          {record.paymentStatus === 'pending' && (
            <Tooltip title="Mark as Paid">
              <Button 
                icon={<BankOutlined />}
                onClick={() => message.info('Payment processing...')}
              >
                Pay
              </Button>
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  // Render Booking Details Modal
  const renderBookingDetailsModal = () => (
    <Modal
      title={
        <Space>
          <CalendarOutlined style={{ color: theme.primary }} />
          <span>Booking Details</span>
          {selectedBooking && (
            <>
              <Tag 
                color={
                  selectedBooking.bookingStatus === 'pending' ? theme.warning :
                  selectedBooking.bookingStatus === 'confirmed' ? theme.info :
                  selectedBooking.bookingStatus === 'completed' ? theme.success :
                  theme.error
                }
              >
                {selectedBooking.bookingStatus?.toUpperCase()}
              </Tag>
              <Tag color={selectedBooking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                Payment: {selectedBooking.paymentStatus}
              </Tag>
            </>
          )}
        </Space>
      }
      open={detailsModalVisible}
      onCancel={() => setDetailsModalVisible(false)}
      width={900}
      footer={[
        <Button key="close" onClick={() => setDetailsModalVisible(false)}>
          Close
        </Button>,
        selectedBooking?.bookingStatus === 'pending' && (
          <Button 
            key="confirm" 
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => {
              onUpdateStatus(selectedBooking._id, 'confirmed');
              setDetailsModalVisible(false);
            }}
            style={{ background: theme.success }}
          >
            Confirm Booking
          </Button>
        ),
        selectedBooking?.bookingStatus === 'confirmed' && (
          <Button 
            key="complete" 
            type="primary"
            icon={<SafetyCertificateOutlined />}
            onClick={() => {
              onUpdateStatus(selectedBooking._id, 'completed');
              setDetailsModalVisible(false);
            }}
            style={{ background: theme.success }}
          >
            Mark Completed
          </Button>
        ),
        <Button key="print" icon={<DownloadOutlined />}>
          Download
        </Button>
      ].filter(Boolean)}
    >
      {selectedBooking && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Booking Status Steps */}
          <Steps
            current={
              selectedBooking.bookingStatus === 'pending' ? 0 :
              selectedBooking.bookingStatus === 'confirmed' ? 1 :
              selectedBooking.bookingStatus === 'completed' ? 2 : 0
            }
            items={[
              { 
                title: 'Pending', 
                description: 'Booking received',
                icon: <ClockCircleOutlined />
              },
              { 
                title: 'Confirmed', 
                description: 'Lab confirmed',
                icon: <CheckCircleOutlined />
              },
              { 
                title: 'Completed', 
                description: 'Tests done',
                icon: <SafetyCertificateOutlined />
              }
            ]}
          />

          {/* Booking Information */}
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card size="small" title="Booking Information" style={{ borderRadius: 12 }}>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Reference No.">
                    <Text copyable strong>{selectedBooking.bookingReference}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Booking Date">
                    {dayjs(selectedBooking.createdAt).format('DD MMM YYYY, hh:mm A')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Appointment Date">
                    {dayjs(selectedBooking.appointmentDetails?.preferredDate).format('DD MMM YYYY, hh:mm A')}
                  </Descriptions.Item>
                  {selectedBooking.appointmentDetails?.addressForCollection && (
                    <Descriptions.Item label="Collection Address">
                      {selectedBooking.appointmentDetails.addressForCollection}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label="Group Booking">
                    {selectedBooking.groupBooking ? (
                      <Tag color={theme.purple}>
                        Group of {selectedBooking.totalPatients} (Patient {selectedBooking.patientIndex})
                      </Tag>
                    ) : (
                      <Tag color="default">Individual</Tag>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            <Col span={12}>
              <Card size="small" title="Patient Information" style={{ borderRadius: 12 }}>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Name">
                    <UserOutlined /> {selectedBooking.patientDetails?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Age/Gender">
                    {selectedBooking.patientDetails?.age} years / {selectedBooking.patientDetails?.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact">
                    <Space direction="vertical" size={0}>
                      <Space><PhoneOutlined /> {selectedBooking.patientDetails?.mobile}</Space>
                      <Space><MailOutlined /> {selectedBooking.patientDetails?.email}</Space>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    <EnvironmentOutlined /> {selectedBooking.patientDetails?.address}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>

          {/* Tests Ordered */}
          <Card 
            size="small" 
            title="Tests Ordered" 
            style={{ borderRadius: 12 }}
            extra={<Text strong>Total: Rs.{selectedBooking.totalAmount?.toLocaleString()}</Text>}
          >
            <List
              dataSource={selectedBooking.tests || []}
              renderItem={(test) => (
                <List.Item
                  extra={
                    <Space direction="vertical" align="end">
                      <Text strong>Rs.{test.price?.toLocaleString()}</Text>
                    </Space>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<ExperimentOutlined />} style={{ background: theme.primary }} />}
                    title={test.name}
                    description={test.description}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Payment Summary */}
          <Card size="small" title="Payment Summary" style={{ borderRadius: 12 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic 
                  title="Original Amount" 
                  value={selectedBooking.originalAmount || 0}
                  prefix="Rs."
                  valueStyle={{ color: theme.textLight }}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="Discount Applied" 
                  value={selectedBooking.discountApplied || 0}
                  prefix="Rs."
                  valueStyle={{ color: theme.success }}
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="Amount Saved" 
                  value={selectedBooking.amountSaved || 0}
                  prefix="Rs."
                  valueStyle={{ color: theme.warning }}
                />
              </Col>
            </Row>
            <Divider />
            <Row justify="end">
              <Col>
                <Title level={3} style={{ color: theme.primary, margin: 0 }}>
                  Total: Rs.{selectedBooking.totalAmount?.toLocaleString()}
                </Title>
                <Tag color={selectedBooking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                  Payment {selectedBooking.paymentStatus}
                </Tag>
              </Col>
            </Row>
          </Card>
        </Space>
      )}
    </Modal>
  );

  // Render Dashboard
  if (activeTab === 'dashboard') {
    return (
      <>
        {/* Welcome Card */}
        <Card style={{ 
          marginBottom: 24, 
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          borderRadius: 12
        }}>
          <Row align="middle" justify="space-between">
            <Col>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar 
                  size={64} 
                  icon={<MedicineBoxOutlined />} 
                  style={{ background: theme.white, color: theme.primary }} 
                />
                <div>
                  <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                    Welcome back, {lab?.name || 'Lab'}!
                  </Text>
                  <br />
                  <Text style={{ color: theme.textLight }}>
                    Here's what's happening today
                  </Text>
                </div>
              </div>
            </Col>
            <Col>
              <Button 
                icon={<ReloadOutlined />} 
                style={{ color: 'white', borderColor: 'white' }}
                type="text"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderRadius: 12 }}>
              <Statistic 
                title="Total Bookings" 
                value={safeStats.totalBookings} 
                prefix={<CalendarOutlined />} 
                valueStyle={{ color: theme.primary }}
              />
              <Progress 
                percent={completionRate} 
                size="small" 
                strokeColor={theme.primary} 
                showInfo={false}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderRadius: 12 }}>
              <Statistic 
                title="Completed" 
                value={safeStats.completedBookings} 
                prefix={<CheckCircleOutlined />} 
                valueStyle={{ color: theme.success }}
              />
              <Progress 
                percent={completionRate} 
                size="small" 
                strokeColor={theme.success} 
                showInfo={false}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderRadius: 12 }}>
              <Statistic 
                title="Total Revenue" 
                value={safeStats.totalRevenue} 
                prefix="Rs." 
                valueStyle={{ color: theme.accent }}
              />
              <Progress 
                percent={65} 
                size="small" 
                strokeColor={theme.accent} 
                showInfo={false}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderRadius: 12 }}>
              <Statistic 
                title="Total Tests" 
                value={safeStats.totalTests} 
                prefix={<ExperimentOutlined />} 
                valueStyle={{ color: theme.purple }}
              />
              <Progress percent={100} size="small" strokeColor={theme.purple} showInfo={false} />
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={16}>
            <Card title="Booking Trends (Last 30 Days)">
              {bookings?.length > 0 ? (
                <Line 
                  data={generateBookingTrend()} 
                  xField="date" 
                  yField="bookings" 
                  height={300} 
                  color={theme.primary}
                  point={{ size: 4 }}
                  smooth
                />
              ) : (
                <Empty description="No booking data available" />
              )}
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Booking Status Distribution">
              {safeStats.totalBookings > 0 ? (
                <Pie 
                  data={generateStatusDistribution()} 
                  angleField="count" 
                  colorField="status" 
                  color={({ status }) => {
                    const colors = {
                      'Pending': theme.warning,
                      'Confirmed': theme.info,
                      'Completed': theme.success,
                      'Cancelled': theme.error
                    };
                    return colors[status];
                  }}
                  height={300}
                  radius={0.8}
                  label={{
                    type: 'inner',
                    offset: '-30%',
                    content: '{percentage}',
                    style: { fontSize: 14 }
                  }}
                />
              ) : (
                <Empty description="No status data available" />
              )}
            </Card>
          </Col>
        </Row>

        {/* Recent Bookings */}
        <Card 
          title="Recent Bookings" 
          extra={<Button type="link" onClick={() => setActiveTab('bookings')}>View All</Button>}
        >
          {filteredBookings?.length > 0 ? (
            <List
              dataSource={filteredBookings.slice(0, 5)}
              renderItem={(item) => (
                <List.Item 
                  key={item._id}
                  actions={[
                    <Button 
                      icon={<EyeOutlined />} 
                      onClick={() => {
                        setSelectedBooking(item);
                        setDetailsModalVisible(true);
                      }}
                    >
                      View
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={<UserOutlined />} 
                        style={{ 
                          background: 
                            item.bookingStatus === 'pending' ? theme.warning :
                            item.bookingStatus === 'confirmed' ? theme.info :
                            item.bookingStatus === 'completed' ? theme.success :
                            theme.error
                        }} 
                      />
                    }
                    title={
                      <Space>
                        <Text strong>{item.patientDetails?.name}</Text>
                        <Text type="secondary">({item.bookingReference})</Text>
                      </Space>
                    }
                    description={
                      <Space split={<Divider type="vertical" />}>
                        <span>{item.tests?.length} tests</span>
                        <span>Rs.{item.totalAmount}</span>
                        <span>{dayjs(item.createdAt).format('DD MMM')}</span>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No recent bookings" />
          )}
        </Card>
      </>
    );
  }

  // Render Tests
  if (activeTab === 'tests') {
    return (
      <Card
        title={
          <Space>
            <ExperimentOutlined style={{ color: theme.primary, fontSize: 24 }} />
            <span style={{ fontSize: 20, fontWeight: 600 }}>Test Management</span>
            <Tag color={theme.primary}>{tests?.length || 0} Tests</Tag>
          </Space>
        }
        extra={
          <Space wrap>
            <Input 
              placeholder="Search tests..." 
              prefix={<SearchOutlined />} 
              style={{ width: 250, borderRadius: 20 }}
              onChange={(e) => setSearchText(e.target.value)} 
              allowClear 
              value={searchText}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={onAddTest}
              style={{ background: theme.primary, borderColor: theme.primary, borderRadius: 20 }}
            >
              Add Test
            </Button>
          </Space>
        }
        style={{ borderRadius: 20 }}
      >
        <Table 
          dataSource={tests?.filter(t => 
            !searchText || 
            t?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            t?.description?.toLowerCase().includes(searchText.toLowerCase())
          ) || []} 
          columns={testColumns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showTotal: (total) => `Total ${total} tests`
          }}
          scroll={{ x: 1000 }}
          locale={{ emptyText: <Empty description="No tests found" /> }}
        />
      </Card>
    );
  }

  // Render Bookings
  if (activeTab === 'bookings') {
    return (
      <>
        <Card
          title={
            <Space>
              <CalendarOutlined style={{ color: theme.primary, fontSize: 24 }} />
              <span style={{ fontSize: 20, fontWeight: 600 }}>Booking Management</span>
              {safeStats.pendingBookings > 0 && (
                <Badge 
                  count={safeStats.pendingBookings} 
                  style={{ background: theme.warning }}
                  title="Pending Bookings"
                />
              )}
            </Space>
          }
          extra={
            <Space wrap size="middle">
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
                placeholder="Filter Status" 
                style={{ width: 150 }} 
                allowClear 
                onChange={setStatusFilter} 
                value={statusFilter}
              >
                <Option value="all">All Status</Option>
                <Option value="pending">Pending</Option>
                <Option value="confirmed">Confirmed</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
              
              <Input 
                placeholder="Search by ID, Patient..." 
                prefix={<SearchOutlined />} 
                style={{ width: 220, borderRadius: 20 }}
                onChange={(e) => setSearchText(e.target.value)} 
                allowClear 
                value={searchText}
              />
              
              <Dropdown 
                menu={{ 
                  items: [
                    { key: 'csv', label: 'Export to CSV', icon: <DownloadOutlined /> },
                    { key: 'pdf', label: 'Export to PDF', icon: <FilePdfOutlined /> }
                  ]
                }}
                trigger={['click']}
              >
                <Button icon={<DownloadOutlined />} style={{ borderRadius: 20 }}>
                  Export
                </Button>
              </Dropdown>
            </Space>
          }
          style={{ borderRadius: 20 }}
        >
          {/* Summary Cards */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card size="small" style={{ borderRadius: 12, background: '#f8f9fa' }}>
                <Statistic 
                  title="Total Revenue" 
                  value={safeStats.totalRevenue}
                  prefix="Rs."
                  valueStyle={{ color: theme.primary }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ borderRadius: 12, background: '#f8f9fa' }}>
                <Statistic 
                  title="Average Value" 
                  value={safeStats.averageBookingValue}
                  prefix="Rs."
                  valueStyle={{ color: theme.success }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ borderRadius: 12, background: '#f8f9fa' }}>
                <Statistic 
                  title="Discount Given" 
                  value={safeStats.totalDiscount}
                  prefix="Rs."
                  valueStyle={{ color: theme.warning }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ borderRadius: 12, background: '#f8f9fa' }}>
                <Statistic 
                  title="Amount Saved" 
                  value={safeStats.totalSaved}
                  prefix="Rs."
                  valueStyle={{ color: theme.success }}
                />
              </Card>
            </Col>
          </Row>

          <Table 
            dataSource={filteredBookings || []} 
            columns={bookingColumns} 
            rowKey="_id" 
            loading={loading}
            scroll={{ x: 1800 }}
            pagination={{ 
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} bookings`,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50']
            }}
            locale={{ 
              emptyText: (
                <Empty 
                  description={
                    <span>
                      No bookings found<br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {statusFilter !== 'all' ? 'Try changing the status filter' : 'Bookings will appear here'}
                      </Text>
                    </span>
                  }
                />
              )
            }}
          />
        </Card>

        {/* Booking Details Modal */}
        {renderBookingDetailsModal()}
      </>
    );
  }

  // Render Profile
  if (activeTab === 'profile') {
    return (
      <Card
        title={
          <Space>
            <ProfileOutlined style={{ color: theme.primary, fontSize: 24 }} />
            <span style={{ fontSize: 20, fontWeight: 600 }}>Lab Profile</span>
          </Space>
        }
        extra={
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={onEditProfile}
            style={{ background: theme.primary, borderColor: theme.primary, borderRadius: 20 }}
          >
            Edit Profile
          </Button>
        }
        style={{ borderRadius: 20 }}
      >
        {lab ? (
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              {lab.logo ? (
                <img 
                  src={`http://localhost:5000/uploads/${lab.logo}`} 
                  alt="Lab Logo" 
                  style={{ 
                    width: '100%', 
                    maxWidth: 200, 
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
              ) : (
                <Avatar 
                  size={200} 
                  icon={<MedicineBoxOutlined />} 
                  style={{ background: theme.primary }} 
                />
              )}
            </Col>
            
            <Col xs={24} md={16}>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Text type="secondary">Laboratory Name</Text>
                  <div><Text strong style={{ fontSize: 18 }}>{lab.name}</Text></div>
                </Col>
                
                <Col span={12}>
                  <Text type="secondary">Discount Offered</Text>
                  <div>
                    <Tag color="success" style={{ fontSize: 16, padding: '4px 12px' }}>
                      {lab.discount || 0}% OFF
                    </Tag>
                  </div>
                </Col>
                
                <Col span={24}>
                  <Text type="secondary">Branch Locations</Text>
                  <div style={{ marginTop: 8 }}>
                    {lab.branches?.split(',').map((branch, i) => (
                      <Tag key={i} style={{ marginBottom: 4, padding: '4px 12px' }}>
                        {branch.trim()}
                      </Tag>
                    )) || 'No branches specified'}
                  </div>
                </Col>
                
                <Col span={12}>
                  <Text type="secondary">Total Tests</Text>
                  <div>
                    <Badge 
                      count={safeStats.totalTests} 
                      style={{ background: theme.primary, fontSize: 16, padding: '0 12px' }} 
                    />
                  </div>
                </Col>
                
                <Col span={12}>
                  <Text type="secondary">Total Revenue</Text>
                  <div><Text strong style={{ fontSize: 18, color: theme.success }}>
                    Rs.{safeStats.totalRevenue.toLocaleString()}
                  </Text></div>
                </Col>
                
                <Col span={24}>
                  <Text type="secondary">Overall Performance</Text>
                  <Progress 
                    percent={completionRate} 
                    status="active"
                    strokeColor={theme.success}
                    format={() => `${safeStats.completedBookings}/${safeStats.totalBookings} bookings completed`}
                    style={{ marginTop: 8 }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Empty description="No lab data available" />
        )}
      </Card>
    );
  }

  return null;
}