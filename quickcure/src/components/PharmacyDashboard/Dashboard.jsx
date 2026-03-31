// import React, { useState } from 'react';
// import { 
//   LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
//   Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
// } from 'recharts';
// import { 
//   Search, Bell, ChevronDown, Package, ShoppingCart, 
//   TrendingUp, AlertTriangle, MoreVertical, Filter,
//   Download, RefreshCw, Eye, Edit, Trash2
// } from 'lucide-react';

// const Dashboard = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [timeRange, setTimeRange] = useState('Today');

//   // Stats Cards Data
//   const statsData = [
//     { 
//       title: 'Total Medicines', 
//       value: '1,452', 
//       icon: Package, 
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'bg-blue-50',
//       iconColor: 'text-blue-600',
//       change: '+12%',
//       changeType: 'increase'
//     },
//     { 
//       title: 'New Orders', 
//       value: '18', 
//       icon: ShoppingCart, 
//       color: 'from-green-500 to-green-600',
//       bgColor: 'bg-green-50',
//       iconColor: 'text-green-600',
//       change: '+5%',
//       changeType: 'increase'
//     },
//     { 
//       title: 'Total Sales', 
//       value: 'Rs 89,350', 
//       icon: TrendingUp, 
//       color: 'from-purple-500 to-purple-600',
//       bgColor: 'bg-purple-50',
//       iconColor: 'text-purple-600',
//       change: '+23%',
//       changeType: 'increase'
//     },
//     { 
//       title: 'Low Stock Alerts', 
//       value: '5', 
//       icon: AlertTriangle, 
//       color: 'from-red-500 to-red-600',
//       bgColor: 'bg-red-50',
//       iconColor: 'text-red-600',
//       change: '+2',
//       changeType: 'decrease'
//     },
//   ];

//   // Recent Orders Data
//   const recentOrders = [
//     { id: '#ORD-78901', customer: 'Ahmad Khan', medicine: 'Panadol CF x2', amount: 'Rs 150', address: '45-B Model Town, Lahore', status: 'Pending', date: '2024-01-15' },
//     { id: '#ORD-78902', customer: 'Sana Ali', medicine: 'Augmentin 625mg x1', amount: 'Rs 650', address: '12-A DHA Phase 5, Lahore', status: 'Processing', date: '2024-01-15' },
//     { id: '#ORD-78903', customer: 'Arma Khan', medicine: 'Augmentin 625mg x1', amount: 'Rs 650', address: '12-A DHA Phase 5, Lahore', status: 'Shipped', date: '2024-01-14' },
//     { id: '#ORD-78904', customer: 'Sana Ali', medicine: 'Augmentin 625mg x1', amount: 'Rs 650', address: '12-A DHA Phase 5, Lahore', status: 'Pending', date: '2024-01-14' },
//     { id: '#ORD-78905', customer: 'Usman Malik', medicine: 'Brufen 400mg x2', amount: 'Rs 220', address: '78-Gulberg, Lahore', status: 'Delivered', date: '2024-01-13' },
//   ];

//   // Inventory Data
//   const inventoryData = [
//     { name: 'Amoxicillin', brand: 'GSK', category: 'Antibiotics', stock: 100, price: 'Rs 450', expiry: '2025-12' },
//     { name: 'Paracetamol', brand: 'Sanofi', category: 'Antiseptics', stock: 100, price: 'Rs 120', expiry: '2024-08' },
//     { name: 'Azithromycin', brand: 'Pfizer', category: 'Antibiotics', stock: 100, price: 'Rs 680', expiry: '2025-06' },
//     { name: 'Cetirizine', brand: 'GSK', category: 'Antiseptics', stock: 20, price: 'Rs 90', expiry: '2024-03' },
//     { name: 'Omeprazole', brand: 'AstraZeneca', category: 'Antiseptics', stock: 20, price: 'Rs 250', expiry: '2024-05' },
//   ];

//   // Sales Data
//   const salesData = [
//     { time: '08:00', sales: 45, orders: 12 },
//     { time: '10:00', sales: 65, orders: 18 },
//     { time: '12:00', sales: 95, orders: 25 },
//     { time: '14:00', sales: 75, orders: 20 },
//     { time: '16:00', sales: 55, orders: 15 },
//     { time: '18:00', sales: 35, orders: 8 },
//   ];

//   // Categories Data
//   const categoryData = [
//     { name: 'Antibiotics', value: 45, color: '#3B82F6', sales: 'Rs 45,230' },
//     { name: 'Antiseptics', value: 30, color: '#10B981', sales: 'Rs 28,450' },
//     { name: 'Pain Relief', value: 15, color: '#F59E0B', sales: 'Rs 12,890' },
//     { name: 'Vitamins', value: 10, color: '#6366F1', sales: 'Rs 8,780' },
//   ];

//   // Weekly Data
//   const weeklyData = [
//     { day: 'Mon', sales: 8500 },
//     { day: 'Tue', sales: 9200 },
//     { day: 'Wed', sales: 10800 },
//     { day: 'Thu', sales: 9500 },
//     { day: 'Fri', sales: 11200 },
//     { day: 'Sat', sales: 14500 },
//     { day: 'Sun', sales: 7800 },
//   ];

//   const getStatusColor = (status) => {
//     switch(status.toLowerCase()) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const handleStatusChange = (orderId, newStatus) => {
//     alert(`Order ${orderId} status updated to ${newStatus}`);
//   };

//   return (
//     <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">
//       {/* Header */}
//       <div className="sticky top-0 bg-white border-b z-10 px-6 py-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Medicare Pharmacy</h1>
//             <p className="text-sm text-gray-500">Lahore Branch • Updated just now</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Time Range Selector */}
//             <select 
//               className="px-3 py-2 border rounded-lg text-sm bg-white"
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//             >
//               <option>Today</option>
//               <option>This Week</option>
//               <option>This Month</option>
//               <option>This Year</option>
//             </select>

//             {/* Notifications */}
//             <button className="p-2 hover:bg-gray-100 rounded-full relative">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* Refresh Button */}
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <RefreshCw className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Profile */}
//             <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100">
//               <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" />
//               <span className="text-sm font-medium hidden md:inline">Admin</span>
//               <ChevronDown className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {statsData.map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
//                   <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//                   <div className="flex items-center gap-1 mt-2">
//                     <span className={`text-xs ${
//                       stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {stat.change}
//                     </span>
//                     <span className="text-xs text-gray-400">vs last month</span>
//                   </div>
//                 </div>
//                 <div className={`${stat.bgColor} p-3 rounded-lg`}>
//                   <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* Sales Chart */}
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Sales Performance</h2>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">Hourly</button>
//                 <button className="px-3 py-1 text-sm hover:bg-gray-50 rounded-lg">Daily</button>
//                 <button className="px-3 py-1 text-sm hover:bg-gray-50 rounded-lg">Weekly</button>
//               </div>
//             </div>
//             <p className="text-sm text-gray-500 mb-4">Today's Sales Overview</p>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={salesData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="time" stroke="#888" />
//                   <YAxis stroke="#888" />
//                   <Tooltip />
//                   <Line 
//                     type="monotone" 
//                     dataKey="sales" 
//                     stroke="#3B82F6" 
//                     strokeWidth={3}
//                     dot={{ fill: '#3B82F6', strokeWidth: 2 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Categories Pie Chart */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h2>
//             <div className="h-48">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={70}
//                     paddingAngle={5}
//                     dataKey="value"
//                   >
//                     {categoryData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="space-y-2 mt-4">
//               {categoryData.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-sm text-gray-600">{item.name}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-sm font-medium">{item.value}%</span>
//                     <span className="text-xs text-gray-400">{item.sales}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
//           <div className="p-6 border-b">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
//                 <p className="text-sm text-gray-500">You have {recentOrders.length} orders today</p>
//               </div>
//               <div className="flex gap-2">
//                 <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
//                   <Filter size={16} />
//                   Filter
//                 </button>
//                 <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
//                   <Download size={16} />
//                   Export
//                 </button>
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
//                   + New Order
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Customer</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Medicine</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Amount</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Address</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentOrders.map((order, index) => (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="py-3 px-6 text-sm font-medium text-gray-900">{order.id}</td>
//                     <td className="py-3 px-6 text-sm text-gray-600">{order.customer}</td>
//                     <td className="py-3 px-6 text-sm text-gray-600">{order.medicine}</td>
//                     <td className="py-3 px-6 text-sm font-medium text-gray-900">{order.amount}</td>
//                     <td className="py-3 px-6 text-sm text-gray-600">{order.address}</td>
//                     <td className="py-3 px-6">
//                       <select 
//                         className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                       >
//                         <option>Pending</option>
//                         <option>Processing</option>
//                         <option>Shipped</option>
//                         <option>Delivered</option>
//                       </select>
//                     </td>
//                     <td className="py-3 px-6">
//                       <div className="flex items-center gap-2">
//                         <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
//                           <Eye size={16} />
//                         </button>
//                         <button className="p-1 hover:bg-gray-100 rounded text-green-600">
//                           <Edit size={16} />
//                         </button>
//                         <button className="p-1 hover:bg-gray-100 rounded text-red-600">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Inventory Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="p-6 border-b">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Medicines Inventory</h2>
//                 <p className="text-sm text-gray-500">Low stock items: 5</p>
//               </div>
//               <div className="flex gap-2">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search medicines..."
//                     className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
//                   + Add Medicine
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Medicine Name</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Brand</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Category</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Price</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Stock</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Expiry</th>
//                   <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {inventoryData.map((item, index) => (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="py-3 px-6 text-sm font-medium text-gray-900">{item.name}</td>
//                     <td className="py-3 px-6 text-sm text-gray-600">{item.brand}</td>
//                     <td className="py-3 px-6">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         item.category === 'Antibiotics' 
//                           ? 'bg-blue-100 text-blue-800' 
//                           : 'bg-green-100 text-green-800'
//                       }`}>
//                         {item.category}
//                       </span>
//                     </td>
//                     <td className="py-3 px-6 text-sm font-medium text-gray-900">{item.price}</td>
//                     <td className="py-3 px-6">
//                       <div className="flex items-center gap-2">
//                         <div className="w-20 bg-gray-200 rounded-full h-2">
//                           <div 
//                             className={`h-2 rounded-full ${item.stock > 50 ? 'bg-green-500' : 'bg-red-500'}`}
//                             style={{ width: `${item.stock}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm text-gray-600">{item.stock}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-6 text-sm text-gray-600">{item.expiry}</td>
//                     <td className="py-3 px-6">
//                       <div className="flex items-center gap-2">
//                         <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
//                           <Edit size={16} />
//                         </button>
//                         <button className="p-1 hover:bg-gray-100 rounded text-red-600">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

























// import React from 'react';
// import { Pill, ShoppingCart, TrendingUp, AlertTriangle, MoreVertical } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// const salesData = [
//   { time: '08:00', sales: 400 }, { time: '10:00', sales: 900 },
//   { time: '12:00', sales: 1500 }, { time: '14:00', sales: 1100 },
//   { time: '16:00', sales: 2200 }, { time: '18:00', sales: 1800 },
// ];

// const categoryData = [
//   { name: 'Analgesics', count: 55 }, { name: 'Antibiotics', count: 35 },
//   { name: 'Vitamins', count: 25 }, { name: 'Cardiac', count: 15 },
// ];

// const COLORS = ['#2c6774', '#1a3a3a', '#4facfe', '#ff4b2b'];

// const Dashboard = () => {
//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Medicines" value="1,452" icon={<Pill className="text-blue-500" />} change="+12%" />
//         <StatCard title="New Orders" value="18" icon={<ShoppingCart className="text-orange-500" />} change="Active" color="bg-orange-50/50" />
//         <StatCard title="Total Sales" value="Rs 89,350" icon={<TrendingUp className="text-green-500" />} change="+24%" />
//         <StatCard title="Low Stock Alerts" value="5" icon={<AlertTriangle className="text-red-500" />} change="Critical" color="bg-red-50/50" />
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Sales Chart */}
//         <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-gray-800">Sales Performance</h3>
//             <select className="text-xs border rounded-lg p-1 px-2 focus:ring-2 focus:ring-[#2c6774]">
//               <option>Today</option>
//               <option>Weekly</option>
//             </select>
//           </div>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//                 <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
//                 <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
//                 <Line type="monotone" dataKey="sales" stroke="#2c6774" strokeWidth={4} dot={{ r: 4, fill: '#2c6774', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Categories Chart */}
//         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//           <h3 className="font-bold text-gray-800 mb-6">Inventory by Category</h3>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={categoryData}>
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
//                 <YAxis hide />
//                 <Tooltip cursor={{fill: 'transparent'}} />
//                 <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={35}>
//                   {categoryData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value, icon, change, color="bg-white" }) => (
//   <div className={`${color} p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-all`}>
//     <div className="flex items-center justify-between">
//       <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-50">{icon}</div>
//       <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${change === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
//         {change}
//       </span>
//     </div>
//     <div>
//       <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
//       <h4 className="text-2xl font-black text-gray-800 mt-1">{value}</h4>
//     </div>
//   </div>
// );

// export default Dashboard;













































import React, { useState } from 'react';
import { 
  Pill, ShoppingCart, TrendingUp, AlertTriangle, MoreVertical,
  Clock, DollarSign, Package, AlertCircle, Eye,
  Search, Filter, Download, Plus,
  BarChart, LineChart, PieChart, Activity,
  ChevronDown, Grid, List
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Sector
} from 'recharts';

const Dashboard = () => {
  // State for interactive features
  const [timeRange, setTimeRange] = useState('week');
  const [salesChartType, setSalesChartType] = useState('line');
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Enhanced sales data with multiple time ranges
  const salesData = {
    day: [
      { time: '08:00', sales: 400, orders: 3 },
      { time: '10:00', sales: 900, orders: 6 },
      { time: '12:00', sales: 1500, orders: 12 },
      { time: '14:00', sales: 1100, orders: 8 },
      { time: '16:00', sales: 2200, orders: 15 },
      { time: '18:00', sales: 1800, orders: 10 },
    ],
    week: [
      { day: 'Mon', sales: 12500, orders: 82 },
      { day: 'Tue', sales: 14800, orders: 95 },
      { day: 'Wed', sales: 11200, orders: 73 },
      { day: 'Thu', sales: 18900, orders: 124 },
      { day: 'Fri', sales: 21500, orders: 142 },
      { day: 'Sat', sales: 25400, orders: 168 },
      { day: 'Sun', sales: 19800, orders: 130 },
    ],
    month: [
      { month: 'Week 1', sales: 85400, orders: 560 },
      { month: 'Week 2', sales: 92300, orders: 612 },
      { month: 'Week 3', sales: 78800, orders: 498 },
      { month: 'Week 4', sales: 102500, orders: 689 },
    ]
  };

  // Enhanced category data with more items
  const categoryData = [
    { name: 'Analgesics', count: 55, value: 45, growth: '+12%' },
    { name: 'Antibiotics', count: 35, value: 35, growth: '+8%' },
    { name: 'Vitamins', count: 25, value: 25, growth: '+15%' },
    { name: 'Cardiac', count: 15, value: 15, growth: '+5%' },
    { name: 'Diabetes', count: 12, value: 12, growth: '+10%' },
    { name: 'Others', count: 18, value: 18, growth: '+7%' },
  ];

  // Enhanced colors
  const COLORS = ['#2c6774', '#4a7c8a', '#6898a8', '#86b3c5', '#a4cee2', '#1e5f6b'];

  // Sample recent orders
  const recentOrders = [
    { id: '#ORD-78901', customer: 'Ahmad Khan', items: 'Panadol CF x2', amount: 150, status: 'Pending' },
    { id: '#ORD-78902', customer: 'Sana Ali', items: 'Augmentin 625mg x1', amount: 650, status: 'Processing' },
    { id: '#ORD-78903', customer: 'Arma Khan', items: 'Brufen 400mg x1', amount: 320, status: 'Shipped' },
    { id: '#ORD-78904', customer: 'Zain Malik', items: 'Vitamin C x2', amount: 450, status: 'Completed' },
    { id: '#ORD-78905', customer: 'Fatima Ahmed', items: 'Panadol Extra x3', amount: 450, status: 'Delivered' },
  ];

  // Sample inventory items
  const inventoryItems = [
    { name: 'Panadol Extra', brand: 'GSK', category: 'Analgesics', stock: 45, status: 'Low Stock', expiry: '2024-12' },
    { name: 'Augmentin 625mg', brand: 'Pfizer', category: 'Antibiotics', stock: 120, status: 'In Stock', expiry: '2025-06' },
    { name: 'Brufen 400mg', brand: 'Abbott', category: 'Analgesics', stock: 8, status: 'Critical', expiry: '2024-08' },
    { name: 'Vitamin C', brand: 'Nature\'s', category: 'Vitamins', stock: 200, status: 'In Stock', expiry: '2025-03' },
    { name: 'Metformin', brand: 'Sanofi', category: 'Diabetes', stock: 0, status: 'Out of Stock', expiry: '2024-10' },
    { name: 'Aspirin', brand: 'Bayer', category: 'Analgesics', stock: 75, status: 'In Stock', expiry: '2025-01' },
  ];

  // Helper functions
  const formatCurrency = (amount) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-amber-700 bg-amber-50 border-amber-200',
      'Processing': 'text-blue-700 bg-blue-50 border-blue-200',
      'Shipped': 'text-indigo-700 bg-indigo-50 border-indigo-200',
      'Completed': 'text-green-700 bg-green-50 border-green-200',
      'Delivered': 'text-emerald-700 bg-emerald-50 border-emerald-200',
      'Critical': 'text-red-700 bg-red-50 border-red-200',
      'Low Stock': 'text-orange-700 bg-orange-50 border-orange-200',
      'In Stock': 'text-green-700 bg-green-50 border-green-200',
      'Out of Stock': 'text-gray-700 bg-gray-100 border-gray-200',
    };
    return colors[status] || 'text-gray-700 bg-gray-50 border-gray-200';
  };

  // Get current sales data based on timeRange
  const getCurrentSalesData = () => salesData[timeRange];

  // Get data key based on timeRange
  const getDataKey = () => {
    switch(timeRange) {
      case 'day': return 'time';
      case 'week': return 'day';
      case 'month': return 'month';
      default: return 'day';
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-medium text-gray-900">
                {entry.name === 'sales' || entry.name === 'Revenue' 
                  ? formatCurrency(entry.value) 
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Filter inventory items
  const filteredInventory = inventoryItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(inventoryItems.map(item => item.category))];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your pharmacy today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-[#2c6774] text-white rounded-xl text-sm font-medium hover:bg-[#1e4f5a] transition-colors flex items-center gap-2">
            <Plus size={16} />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Medicines" 
          value="1,452" 
          icon={<Package className="text-blue-600" size={20} />}
          change="+12%" 
          trend="up"
          subtitle="342 categories"
        />
        <StatCard 
          title="New Orders" 
          value="18" 
          icon={<ShoppingCart className="text-orange-600" size={20} />}
          change="+24%" 
          trend="up"
          subtitle="5 pending"
        />
        <StatCard 
          title="Total Sales" 
          value="Rs 89,350" 
          icon={<DollarSign className="text-green-600" size={20} />}
          change="+18%" 
          trend="up"
          subtitle="Today: Rs 12,450"
        />
        <StatCard 
          title="Stock Alerts" 
          value="5" 
          icon={<AlertCircle className="text-red-600" size={20} />}
          change="Critical" 
          trend="down"
          subtitle="3 expiring soon"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="font-bold text-gray-800">Sales Performance</h3>
              <p className="text-sm text-gray-500 mt-1">Revenue and orders over time</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Chart Type Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setSalesChartType('line')}
                  className={`p-2 rounded-md transition-all ${
                    salesChartType === 'line' 
                      ? 'bg-white shadow-sm text-[#2c6774]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LineChart size={16} />
                </button>
                <button
                  onClick={() => setSalesChartType('bar')}
                  className={`p-2 rounded-md transition-all ${
                    salesChartType === 'bar' 
                      ? 'bg-white shadow-sm text-[#2c6774]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart size={16} />
                </button>
                <button
                  onClick={() => setSalesChartType('area')}
                  className={`p-2 rounded-md transition-all ${
                    salesChartType === 'area' 
                      ? 'bg-white shadow-sm text-[#2c6774]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Activity size={16} />
                </button>
              </div>

              {/* Time Range Selector */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {['day', 'week', 'month'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeRange(period)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                      timeRange === period
                        ? 'bg-[#2c6774] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {salesChartType === 'line' ? (
                <RechartsLineChart
                  data={getCurrentSalesData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey={getDataKey()} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `Rs${value/1000}k`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="sales" 
                    name="Revenue" 
                    stroke="#2c6774" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#2c6774', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="orders" 
                    name="Orders" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#f59e0b' }}
                  />
                </RechartsLineChart>
              ) : salesChartType === 'bar' ? (
                <RechartsBarChart
                  data={getCurrentSalesData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey={getDataKey()} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `Rs${value/1000}k`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    yAxisId="left" 
                    dataKey="sales" 
                    name="Revenue" 
                    fill="#2c6774" 
                    radius={[8, 8, 0, 0]} 
                    barSize={40}
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="orders" 
                    name="Orders" 
                    fill="#f59e0b" 
                    radius={[8, 8, 0, 0]} 
                    barSize={40}
                  />
                </RechartsBarChart>
              ) : (
                <AreaChart
                  data={getCurrentSalesData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2c6774" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2c6774" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey={getDataKey()} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `Rs${value/1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    name="Revenue" 
                    stroke="#2c6774" 
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Sales Summary */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-lg font-bold text-gray-900">Rs 245,800</p>
              <p className="text-xs text-green-600">+18.2%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-lg font-bold text-gray-900">1,452</p>
              <p className="text-xs text-green-600">+12.5%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Order Value</p>
              <p className="text-lg font-bold text-gray-900">Rs 169</p>
              <p className="text-xs text-green-600">+5.2%</p>
            </div>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-800">Inventory by Category</h3>
              <p className="text-sm text-gray-500 mt-1">Stock distribution</p>
            </div>
            <PieChart className="text-gray-400" size={20} />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="count"
                  paddingAngle={2}
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke={activePieIndex === index ? '#fff' : 'none'}
                      strokeWidth={activePieIndex === index ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend with details */}
          <div className="mt-6 space-y-3">
            {categoryData.slice(0, 5).map((category, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                  activePieIndex === index ? 'bg-gray-50' : ''
                }`}
                onMouseEnter={() => setActivePieIndex(index)}
                onMouseLeave={() => setActivePieIndex(0)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">{category.count}</span>
                  <span className="text-xs text-green-600">{category.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">Recent Orders</h3>
              <p className="text-sm text-gray-500 mt-1">Latest transactions from your pharmacy</p>
            </div>
            <button className="text-sm text-[#2c6774] font-medium hover:underline">
              View All Orders
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Section with Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Medicine Inventory</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your stock and monitor alerts</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-[#2c6774]' 
                    : 'text-gray-600'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-[#2c6774]' 
                    : 'text-gray-600'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search medicines by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inventory Grid/List View */}
        {viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInventory.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.brand}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium text-gray-700">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className="font-medium text-gray-700">{item.stock} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expiry</p>
                    <p className="font-medium text-gray-700">{item.expiry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.brand}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.expiry}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced StatCard component
const StatCard = ({ title, value, icon, change, trend, subtitle }) => {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const trendIcon = trend === 'up' ? '↑' : '↓';
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#2c6774] group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendColor} bg-opacity-10`}>
          {trendIcon} {change}
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{value}</h4>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Dashboard;