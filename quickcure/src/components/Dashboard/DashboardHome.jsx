
//Working perfectly, just need to add some loading states and error handling for better UX. Also, can optimize data fetching by parallel requests and proper null checks to avoid crashes when API returns unexpected data.
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   TrendingUp, ShoppingCart, Clock, AlertCircle, DollarSign, 
//   Package, Search, Filter, Plus, Edit, Trash2, Eye,
//   BarChart, LineChart, PieChart, Activity
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';
// import {
//   LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar,
//   PieChart as RechartsPieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
// } from 'recharts';

// export default function DashboardHome() {
//   const [pharmacy, setPharmacy] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [salesData, setSalesData] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState('week');
//   const [chartType, setChartType] = useState('line');
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047'];

//   // ==================== FETCH ALL DATA ====================
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Step 1: Lab dashboard jaisa - pehle pharmacy find karo user se
//       const pharmacyRes = await pharmacyAPI.getMyPharmacy();
      
//       if (!pharmacyRes.success) {
//         setError(pharmacyRes.message);
//         return;
//       }

//       const pharmacyData = pharmacyRes.data;
//       setPharmacy(pharmacyData);
      
//       // Save pharmacy ID for other components
//       localStorage.setItem('pharmacyId', pharmacyData._id);

//       // Step 2: Parallel data fetching
//       const [statsRes, ordersRes, inventoryRes, categoriesRes, salesRes] = await Promise.allSettled([
//         pharmacyAPI.getStats(pharmacyData._id),
//         pharmacyAPI.getRecentOrders(pharmacyData._id),
//         pharmacyAPI.getInventory(pharmacyData._id),
//         pharmacyAPI.getCategories(pharmacyData._id),
//         pharmacyAPI.getSalesData(pharmacyData._id, timeRange)
//       ]);

//       // ✅ FIXED: Handle each response with proper null checks
//       if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
//         setStats(statsRes.value.data.data || {});
//       }

//       if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success) {
//         setRecentOrders(ordersRes.value.data.data || []);
//       }

//       if (inventoryRes.status === 'fulfilled' && inventoryRes.value?.data?.success) {
//         setInventory(inventoryRes.value.data.data || []);
//       }

//       if (categoriesRes.status === 'fulfilled' && categoriesRes.value?.data?.success) {
//         setCategories(categoriesRes.value.data.data || []);
//       }

//       if (salesRes.status === 'fulfilled' && salesRes.value?.data?.success) {
//         setSalesData(salesRes.value.data.data || []);
//       }

//     } catch (err) {
//       console.error('Dashboard error:', err);
//       setError(err.message || 'Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // Refetch sales when timeRange changes
//   useEffect(() => {
//     if (pharmacy?._id) {
//       pharmacyAPI.getSalesData(pharmacy._id, timeRange)
//         .then(res => {
//           if (res.data?.success) setSalesData(res.data.data || []);
//         })
//         .catch(console.error);
//     }
//   }, [timeRange, pharmacy]);

//   // ==================== HELPER FUNCTIONS ====================
//   const formatCurrency = (amount) => `Rs ${amount?.toLocaleString() || '0'}`;

//   const getStatusColor = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'pending': return 'bg-amber-100 text-amber-700';
//       case 'processing': return 'bg-blue-100 text-blue-700';
//       case 'shipped': return 'bg-indigo-100 text-indigo-700';
//       case 'delivered': return 'bg-green-100 text-green-700';
//       case 'cancelled': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getStockStatus = (stock, reorderLevel = 10) => {
//     if (stock <= 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
//     if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700' };
//     return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
//   };

//   const filteredInventory = (inventory || []).filter(item =>
//     item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ==================== LOADING STATES ====================
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   // ==================== NOT REGISTERED STATE ====================
//   if (error === 'Pharmacy not registered') {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <Package className="w-16 h-16 text-[#2c6774] mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Welcome to Pharmacy Dashboard
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You haven't registered your pharmacy yet. Please register to continue.
//           </p>
//           <Link
//             to="/pharmacy/register"
//             className="inline-block px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
//           >
//             Register Pharmacy
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//           {pharmacy?.name || 'Pharmacy Dashboard'}
//         </h1>
//         <p className="text-gray-600 mt-1">Welcome back! Here's your pharmacy overview</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <StatCard
//           title="Total Medicines"
//           value={stats?.totalMedicines || 0}
//           icon={<Package className="text-blue-600" size={24} />}
//           color="blue"
//         />
//         <StatCard
//           title="Pending Orders"
//           value={stats?.pendingOrders || 0}
//           icon={<Clock className="text-amber-600" size={24} />}
//           color="amber"
//         />
//         <StatCard
//           title="Today's Revenue"
//           value={formatCurrency(stats?.todayRevenue || 0)}
//           icon={<DollarSign className="text-green-600" size={24} />}
//           color="green"
//         />
//         <StatCard
//           title="Low Stock"
//           value={stats?.lowStockCount || 0}
//           icon={<AlertCircle className="text-red-600" size={24} />}
//           color="red"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* Sales Chart */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
//           <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//             <h3 className="font-bold text-gray-800">Sales Performance</h3>
//             <div className="flex gap-2">
//               <ChartTypeToggle chartType={chartType} setChartType={setChartType} />
//               <TimeRangeToggle timeRange={timeRange} setTimeRange={setTimeRange} />
//             </div>
//           </div>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               {chartType === 'line' ? (
//                 <RechartsLineChart data={salesData.length ? salesData : getDefaultData(timeRange)}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
//                   <YAxis yAxisId="left" />
//                   <YAxis yAxisId="right" orientation="right" />
//                   <Tooltip formatter={(value) => formatCurrency(value)} />
//                   <Legend />
//                   <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#2c6774" strokeWidth={2} />
//                   <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} />
//                 </RechartsLineChart>
//               ) : chartType === 'bar' ? (
//                 <RechartsBarChart data={salesData.length ? salesData : getDefaultData(timeRange)}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
//                   <YAxis />
//                   <Tooltip formatter={(value) => formatCurrency(value)} />
//                   <Legend />
//                   <Bar dataKey="sales" fill="#2c6774" />
//                   <Bar dataKey="orders" fill="#f59e0b" />
//                 </RechartsBarChart>
//               ) : (
//                 <AreaChart data={salesData.length ? salesData : getDefaultData(timeRange)}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
//                   <YAxis />
//                   <Tooltip formatter={(value) => formatCurrency(value)} />
//                   <Area type="monotone" dataKey="sales" stroke="#2c6774" fill="#2c6774" fillOpacity={0.3} />
//                 </AreaChart>
//               )}
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Categories Pie Chart */}
//         <div className="bg-white p-6 rounded-xl border border-gray-200">
//           <h3 className="font-bold text-gray-800 mb-4">Inventory by Category</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <RechartsPieChart>
//                 <Pie
//                   data={categories.length ? categories : [{ name: 'No Data', count: 1 }]}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={80}
//                   dataKey="count"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {categories.map((entry, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-xl border border-gray-200 mb-8">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h3 className="font-bold text-gray-800">Recent Orders</h3>
//           <Link to="/pharmacy/orders" className="text-sm text-[#2c6774] hover:underline">
//             View All
//           </Link>
//         </div>
        
//         {/* Desktop */}
//         <div className="hidden md:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Customer</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Items</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {(recentOrders || []).map((order, i) => (
//                 <tr key={i} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
//                   <td className="px-4 py-3 text-sm">{order.customerName}</td>
//                   <td className="px-4 py-3 text-sm">{order.medicineNames}</td>
//                   <td className="px-4 py-3 text-sm font-medium">{formatCurrency(order.amount)}</td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile */}
//         <div className="md:hidden divide-y">
//           {(recentOrders || []).map((order, i) => (
//             <div key={i} className="p-4">
//               <div className="flex justify-between mb-2">
//                 <span className="font-medium">{order.id}</span>
//                 <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                   {order.status}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">{order.customerName}</p>
//               <p className="text-sm text-gray-500 mt-1">{order.medicineNames}</p>
//               <p className="text-sm font-medium mt-2">{formatCurrency(order.amount)}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Inventory */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="p-4 border-b">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <h3 className="font-bold text-gray-800">Medicine Inventory</h3>
//             {/* ✅ FIXED: Properly closed Link tag */}
//             <Link
//               to="/pharmacy/products/add"
//               className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm"
//             >
//               <Plus size={16} />
//               Add Medicine
//             </Link>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-3 mt-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
//               />
//             </div>
//             <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
//               <Filter size={16} />
//               Filter
//             </button>
//           </div>
//         </div>

//         {/* Desktop */}
//         <div className="hidden md:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Medicine</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Stock</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Price</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {filteredInventory.map((item, i) => {
//                 const status = getStockStatus(item.stock);
//                 return (
//                   <tr key={i} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-xs text-gray-500">{item.genericName}</p>
//                     </td>
//                     <td className="px-4 py-3 text-sm">{item.category}</td>
//                     <td className="px-4 py-3 text-sm">{item.stock}</td>
//                     <td className="px-4 py-3 text-sm font-medium">{formatCurrency(item.price)}</td>
//                     <td className="px-4 py-3">
//                       <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
//                         {status.label}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
//                           <Eye size={16} />
//                         </button>
//                         <button className="p-1 text-green-600 hover:bg-green-50 rounded">
//                           <Edit size={16} />
//                         </button>
//                         <button className="p-1 text-red-600 hover:bg-red-50 rounded">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile */}
//         <div className="md:hidden divide-y">
//           {filteredInventory.map((item, i) => {
//             const status = getStockStatus(item.stock);
//             return (
//               <div key={i} className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-xs text-gray-500">{item.genericName}</p>
//                   </div>
//                   <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
//                     {status.label}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600">{item.category} • Stock: {item.stock}</p>
//                 <p className="text-sm font-medium mt-1">{formatCurrency(item.price)}</p>
//                 <div className="flex gap-2 mt-3">
//                   <button className="flex-1 py-2 text-blue-600 border rounded-lg hover:bg-blue-50 text-sm">View</button>
//                   <button className="flex-1 py-2 text-green-600 border rounded-lg hover:bg-green-50 text-sm">Edit</button>
//                   <button className="flex-1 py-2 text-red-600 border rounded-lg hover:bg-red-50 text-sm">Delete</button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ==================== SUB-COMPONENTS ====================
// const StatCard = ({ title, value, icon, color }) => (
//   <div className="bg-white rounded-xl border border-gray-200 p-4">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-sm text-gray-600">{title}</p>
//         <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//       </div>
//       <div className={`p-3 rounded-xl bg-${color}-50`}>{icon}</div>
//     </div>
//   </div>
// );

// const ChartTypeToggle = ({ chartType, setChartType }) => (
//   <div className="flex bg-gray-100 p-1 rounded-lg">
//     {['line', 'bar', 'area'].map(type => (
//       <button
//         key={type}
//         onClick={() => setChartType(type)}
//         className={`p-2 rounded-md ${chartType === type ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
//       >
//         {type === 'line' && <LineChart size={16} />}
//         {type === 'bar' && <BarChart size={16} />}
//         {type === 'area' && <Activity size={16} />}
//       </button>
//     ))}
//   </div>
// );

// const TimeRangeToggle = ({ timeRange, setTimeRange }) => (
//   <div className="flex bg-gray-100 p-1 rounded-lg">
//     {['week', 'month'].map(period => (
//       <button
//         key={period}
//         onClick={() => setTimeRange(period)}
//         className={`px-3 py-1.5 rounded-md text-xs capitalize ${
//           timeRange === period ? 'bg-[#2c6774] text-white' : 'text-gray-700'
//         }`}
//       >
//         {period}
//       </button>
//     ))}
//   </div>
// );

// const getDefaultData = (timeRange) => {
//   if (timeRange === 'week') {
//     return [
//       { day: 'Mon', sales: 0, orders: 0 },
//       { day: 'Tue', sales: 0, orders: 0 },
//       { day: 'Wed', sales: 0, orders: 0 },
//       { day: 'Thu', sales: 0, orders: 0 },
//       { day: 'Fri', sales: 0, orders: 0 },
//       { day: 'Sat', sales: 0, orders: 0 },
//       { day: 'Sun', sales: 0, orders: 0 },
//     ];
//   }
//   return [
//     { month: 'Jan', sales: 0, orders: 0 },
//     { month: 'Feb', sales: 0, orders: 0 },
//     { month: 'Mar', sales: 0, orders: 0 },
//     { month: 'Apr', sales: 0, orders: 0 },
//   ];
// };

























// Just updating the Graph with days and time
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   TrendingUp, ShoppingCart, Clock, AlertCircle, DollarSign, 
//   Package, Search, Filter, Plus, Edit, Trash2, Eye,
//   BarChart, LineChart, PieChart, Activity
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';
// import {
//   LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar,
//   PieChart as RechartsPieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
// } from 'recharts';

// export default function DashboardHome() {
//   const [pharmacy, setPharmacy] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [salesData, setSalesData] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState('week');
//   const [chartType, setChartType] = useState('line');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
//   const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047'];

//   // Check screen size for responsive design
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // ==================== FETCH ALL DATA ====================
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const pharmacyRes = await pharmacyAPI.getMyPharmacy();
      
//       if (!pharmacyRes.success) {
//         setError(pharmacyRes.message);
//         return;
//       }

//       const pharmacyData = pharmacyRes.data;
//       setPharmacy(pharmacyData);
//       localStorage.setItem('pharmacyId', pharmacyData._id);

//       // Parallel data fetching with error handling
//       const [statsRes, ordersRes, inventoryRes, categoriesRes, salesRes] = await Promise.allSettled([
//         pharmacyAPI.getStats(pharmacyData._id),
//         pharmacyAPI.getRecentOrders(pharmacyData._id),
//         pharmacyAPI.getInventory(pharmacyData._id),
//         pharmacyAPI.getCategories(pharmacyData._id),
//         pharmacyAPI.getSalesData(pharmacyData._id, timeRange)
//       ]);

//       // Handle stats
//       if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
//         setStats(statsRes.value.data.data || {});
//       } else {
//         setStats({ totalMedicines: 0, pendingOrders: 0, todayRevenue: 0, lowStockCount: 0 });
//       }

//       // Handle orders
//       if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success) {
//         setRecentOrders(ordersRes.value.data.data || []);
//       } else {
//         setRecentOrders([]);
//       }

//       // Handle inventory
//       if (inventoryRes.status === 'fulfilled' && inventoryRes.value?.data?.success) {
//         setInventory(inventoryRes.value.data.data || []);
//       } else {
//         setInventory([]);
//       }

//       // Handle categories
//       if (categoriesRes.status === 'fulfilled' && categoriesRes.value?.data?.success) {
//         setCategories(categoriesRes.value.data.data || []);
//       } else {
//         setCategories([]);
//       }

//       // Handle sales
//       if (salesRes.status === 'fulfilled' && salesRes.value?.data?.success) {
//         setSalesData(salesRes.value.data.data || []);
//       } else {
//         setSalesData([]);
//       }

//     } catch (err) {
//       console.error('Dashboard error:', err);
//       setError(err.message || 'Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // Refetch sales when timeRange changes
//   useEffect(() => {
//     if (pharmacy?._id) {
//       pharmacyAPI.getSalesData(pharmacy._id, timeRange)
//         .then(res => {
//           if (res.data?.success) setSalesData(res.data.data || []);
//         })
//         .catch(console.error);
//     }
//   }, [timeRange, pharmacy]);

//   // ==================== HELPER FUNCTIONS ====================
//   const formatCurrency = (amount) => `Rs ${amount?.toLocaleString() || '0'}`;

//   const getStatusColor = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'pending': return 'bg-amber-100 text-amber-700';
//       case 'processing': return 'bg-blue-100 text-blue-700';
//       case 'shipped': return 'bg-indigo-100 text-indigo-700';
//       case 'delivered': return 'bg-green-100 text-green-700';
//       case 'cancelled': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getStockStatus = (stock, reorderLevel = 10) => {
//     if (stock <= 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
//     if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700' };
//     return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
//   };

//   const filteredInventory = (inventory || []).filter(item =>
//     item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get chart data with fallback
//   const getChartData = () => {
//     if (salesData && salesData.length > 0) {
//       return salesData;
//     }
//     return getDefaultData(timeRange);
//   };

//   // ==================== LOADING STATES ====================
//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error === 'Pharmacy not registered') {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <Package className="w-16 h-16 text-[#2c6774] mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Welcome to Pharmacy Dashboard
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You haven't registered your pharmacy yet. Please register to continue.
//           </p>
//           <Link
//             to="/pharmacy/register"
//             className="inline-block px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
//           >
//             Register Pharmacy
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//           {pharmacy?.name || 'Pharmacy Dashboard'}
//         </h1>
//         <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's your pharmacy overview</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//         <StatCard
//           title="Total Medicines"
//           value={stats?.totalMedicines || 0}
//           icon={<Package className="text-blue-600" size={20} />}
//           color="blue"
//         />
//         <StatCard
//           title="Pending Orders"
//           value={stats?.pendingOrders || 0}
//           icon={<Clock className="text-amber-600" size={20} />}
//           color="amber"
//         />
//         <StatCard
//           title="Today's Revenue"
//           value={formatCurrency(stats?.todayRevenue || 0)}
//           icon={<DollarSign className="text-green-600" size={20} />}
//           color="green"
//         />
//         <StatCard
//           title="Low Stock"
//           value={stats?.lowStockCount || 0}
//           icon={<AlertCircle className="text-red-600" size={20} />}
//           color="red"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//         {/* Sales Chart */}
//         <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
//             <h3 className="font-bold text-gray-800 text-sm sm:text-base">Sales Performance</h3>
//             <div className="flex gap-2">
//               <ChartTypeToggle chartType={chartType} setChartType={setChartType} isMobile={isMobile} />
//               <TimeRangeToggle timeRange={timeRange} setTimeRange={setTimeRange} />
//             </div>
//           </div>
          
//           {/* Responsive Chart Container with Scroll on Small Screens */}
//           <div className="w-full overflow-x-auto">
//             <div className="min-w-[280px] sm:min-w-[300px] w-full h-[220px] sm:h-[260px] md:h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 {chartType === 'line' ? (
//                   <RechartsLineChart data={getChartData()} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis 
//                       dataKey={timeRange === 'week' ? 'day' : 'month'} 
//                       tick={{ fontSize: isMobile ? 9 : 11 }}
//                       interval="preserveStartEnd"
//                       angle={isMobile ? -25 : 0}
//                       textAnchor={isMobile ? "end" : "middle"}
//                       height={isMobile ? 40 : 30}
//                     />
//                     <YAxis 
//                       yAxisId="left" 
//                       tick={{ fontSize: isMobile ? 9 : 11 }}
//                       width={isMobile ? 25 : 35}
//                     />
//                     {!isMobile && (
//                       <YAxis 
//                         yAxisId="right" 
//                         orientation="right" 
//                         tick={{ fontSize: 11 }}
//                         width={35}
//                       />
//                     )}
//                     <Tooltip 
//                       formatter={(value) => formatCurrency(value)}
//                       contentStyle={{ fontSize: isMobile ? '10px' : '12px' }}
//                     />
//                     {!isMobile && <Legend wrapperStyle={{ fontSize: '12px' }} />}
//                     <Line 
//                       yAxisId="left"
//                       type="monotone" 
//                       dataKey="sales" 
//                       stroke="#2c6774" 
//                       strokeWidth={2} 
//                       dot={!isMobile}
//                       activeDot={{ r: 4 }}
//                     />
//                     {!isMobile && (
//                       <Line 
//                         yAxisId="right"
//                         type="monotone" 
//                         dataKey="orders" 
//                         stroke="#f59e0b" 
//                         strokeWidth={2} 
//                         dot={false}
//                         activeDot={{ r: 4 }}
//                       />
//                     )}
//                   </RechartsLineChart>
//                 ) : chartType === 'bar' ? (
//                   <RechartsBarChart data={getChartData()} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis 
//                       dataKey={timeRange === 'week' ? 'day' : 'month'} 
//                       tick={{ fontSize: isMobile ? 9 : 11 }}
//                       interval="preserveStartEnd"
//                       angle={isMobile ? -25 : 0}
//                       textAnchor={isMobile ? "end" : "middle"}
//                       height={isMobile ? 40 : 30}
//                     />
//                     <YAxis 
//                       tick={{ fontSize: isMobile ? 9 : 11 }}
//                       width={isMobile ? 25 : 35}
//                     />
//                     <Tooltip 
//                       formatter={(value) => formatCurrency(value)}
//                       contentStyle={{ fontSize: isMobile ? '10px' : '12px' }}
//                     />
//                     {!isMobile && <Legend wrapperStyle={{ fontSize: '12px' }} />}
//                     <Bar dataKey="sales" fill="#2c6774" radius={[4, 4, 0, 0]} />
//                     {!isMobile && <Bar dataKey="orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />}
//                   </RechartsBarChart>
//                 ) : (
//                   <AreaChart data={getChartData()} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis 
//                       dataKey={timeRange === 'week' ? 'day' : 'month'} 
//                       tick={{ fontSize: isMobile ? 9 : 11 }}
//                       interval="preserveStartEnd"
//                       angle={isMobile ? -25 : 0}
//                       textAnchor={isMobile ? "end" : "middle"}
//                       height={isMobile ? 40 : 30}
//                     />
//                     <YAxis 
//                       tick={{ fontSize: isMobile ? 9 : 11 }}
//                       width={isMobile ? 25 : 35}
//                     />
//                     <Tooltip 
//                       formatter={(value) => formatCurrency(value)}
//                       contentStyle={{ fontSize: isMobile ? '10px' : '12px' }}
//                     />
//                     {!isMobile && <Legend wrapperStyle={{ fontSize: '12px' }} />}
//                     <Area 
//                       type="monotone" 
//                       dataKey="sales" 
//                       stroke="#2c6774" 
//                       fill="#2c6774" 
//                       fillOpacity={0.3} 
//                     />
//                   </AreaChart>
//                 )}
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Categories Pie Chart */}
//         <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
//           <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Inventory by Category</h3>
//           <div className="w-full h-[220px] sm:h-[260px] md:h-[280px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <RechartsPieChart>
//                 <Pie
//                   data={categories.length > 0 ? categories : [{ name: 'No Data', count: 1 }]}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={isMobile ? 40 : 60}
//                   outerRadius={isMobile ? 60 : 80}
//                   dataKey="count"
//                   label={({ name, percent }) => {
//                     if (categories.length === 0) return 'No Data';
//                     if (isMobile && percent < 0.1) return '';
//                     return isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`;
//                   }}
//                   labelLine={!isMobile}
//                   paddingAngle={2}
//                 >
//                   {(categories.length > 0 ? categories : [{ name: 'No Data', count: 1 }]).map((entry, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   contentStyle={{ fontSize: isMobile ? '10px' : '12px' }}
//                   formatter={(value, name) => [value, name]}
//                 />
//                 {!isMobile && <Legend wrapperStyle={{ fontSize: '11px' }} />}
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders Section */}
//       <div className="bg-white rounded-xl border border-gray-200 mb-6 sm:mb-8">
//         <div className="p-3 sm:p-4 border-b flex justify-between items-center">
//           <h3 className="font-bold text-gray-800 text-sm sm:text-base">Recent Orders</h3>
//           <Link to="/PharmacyDashboard/orders" className="text-xs sm:text-sm text-[#2c6774] hover:underline">
//             View All
//           </Link>
//         </div>
        
//         {recentOrders.length === 0 ? (
//           <div className="p-6 sm:p-8 text-center text-gray-500">
//             <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
//             <p className="text-sm sm:text-base">No orders yet</p>
//           </div>
//         ) : (
//           <>
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Customer</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Items</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Amount</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {recentOrders.slice(0, 5).map((order, i) => (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{order.id}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{order.customerName}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{order.medicineNames}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{formatCurrency(order.amount)}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="md:hidden divide-y">
//               {recentOrders.slice(0, 5).map((order, i) => (
//                 <div key={i} className="p-3 sm:p-4">
//                   <div className="flex justify-between mb-2">
//                     <span className="font-medium text-xs sm:text-sm">{order.id}</span>
//                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-600">{order.customerName}</p>
//                   <p className="text-xs text-gray-500 mt-1">{order.medicineNames}</p>
//                   <p className="text-xs sm:text-sm font-medium mt-2">{formatCurrency(order.amount)}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Inventory Section */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="p-3 sm:p-4 border-b">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <h3 className="font-bold text-gray-800 text-sm sm:text-base">Medicine Inventory</h3>
//             <Link
//               to="/PharmacyDashboard/products/add"
//               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-xs sm:text-sm"
//             >
//               <Plus size={14} />
//               Add Medicine
//             </Link>
//           </div>
          
//           <div className="mt-3 sm:mt-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-9 pr-3 py-1.5 sm:py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//               />
//             </div>
//           </div>
//         </div>

//         {filteredInventory.length === 0 ? (
//           <div className="p-6 sm:p-8 text-center text-gray-500">
//             <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
//             <p className="text-sm sm:text-base">No medicines found</p>
//           </div>
//         ) : (
//           <>
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Medicine</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Category</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Stock</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Price</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {filteredInventory.slice(0, 5).map((item, i) => {
//                     const status = getStockStatus(item.stock);
//                     return (
//                       <tr key={i} className="hover:bg-gray-50">
//                         <td className="px-3 sm:px-4 py-2 sm:py-3">
//                           <p className="font-medium text-xs sm:text-sm">{item.name}</p>
//                           <p className="text-xs text-gray-500">{item.genericName}</p>
//                         </td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.category}</td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.stock}</td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{formatCurrency(item.price)}</td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3">
//                           <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
//                             {status.label}
//                           </span>
//                         </td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3">
//                           <div className="flex gap-1 sm:gap-2">
//                             <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
//                               <Eye size={14} />
//                             </button>
//                             <button className="p-1 text-green-600 hover:bg-green-50 rounded">
//                               <Edit size={14} />
//                             </button>
//                             <button className="p-1 text-red-600 hover:bg-red-50 rounded">
//                               <Trash2 size={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="md:hidden divide-y">
//               {filteredInventory.slice(0, 5).map((item, i) => {
//                 const status = getStockStatus(item.stock);
//                 return (
//                   <div key={i} className="p-3 sm:p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex-1">
//                         <p className="font-medium text-sm">{item.name}</p>
//                         <p className="text-xs text-gray-500">{item.genericName}</p>
//                       </div>
//                       <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
//                         {status.label}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-600">{item.category} • Stock: {item.stock}</p>
//                     <p className="text-xs font-medium mt-1">{formatCurrency(item.price)}</p>
//                     <div className="flex gap-2 mt-3">
//                       <button className="flex-1 py-1.5 text-blue-600 border rounded-lg hover:bg-blue-50 text-xs">View</button>
//                       <button className="flex-1 py-1.5 text-green-600 border rounded-lg hover:bg-green-50 text-xs">Edit</button>
//                       <button className="flex-1 py-1.5 text-red-600 border rounded-lg hover:bg-red-50 text-xs">Delete</button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // ==================== SUB-COMPONENTS ====================
// const StatCard = ({ title, value, icon, color }) => {
//   const bgColorClass = `bg-${color}-50`;
//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-2 sm:p-3 md:p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[10px] sm:text-xs text-gray-600">{title}</p>
//           <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{value}</p>
//         </div>
//         <div className={`p-1.5 sm:p-2 md:p-3 rounded-xl ${bgColorClass}`}>{icon}</div>
//       </div>
//     </div>
//   );
// };

// const ChartTypeToggle = ({ chartType, setChartType, isMobile }) => (
//   <div className="flex bg-gray-100 p-0.5 sm:p-1 rounded-lg">
//     {['line', 'bar', 'area'].map(type => (
//       <button
//         key={type}
//         onClick={() => setChartType(type)}
//         className={`p-1 sm:p-1.5 md:p-2 rounded-md transition-all ${
//           chartType === type ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600 hover:bg-gray-200'
//         }`}
//       >
//         {type === 'line' && <LineChart size={isMobile ? 12 : 14} />}
//         {type === 'bar' && <BarChart size={isMobile ? 12 : 14} />}
//         {type === 'area' && <Activity size={isMobile ? 12 : 14} />}
//       </button>
//     ))}
//   </div>
// );

// const TimeRangeToggle = ({ timeRange, setTimeRange }) => (
//   <div className="flex bg-gray-100 p-0.5 sm:p-1 rounded-lg">
//     {['week', 'month'].map(period => (
//       <button
//         key={period}
//         onClick={() => setTimeRange(period)}
//         className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs capitalize transition-all ${
//           timeRange === period ? 'bg-[#2c6774] text-white' : 'text-gray-700 hover:bg-gray-200'
//         }`}
//       >
//         {period}
//       </button>
//     ))}
//   </div>
// );

// const getDefaultData = (timeRange) => {
//   if (timeRange === 'week') {
//     return [
//       { day: 'Mon', sales: 0, orders: 0 },
//       { day: 'Tue', sales: 0, orders: 0 },
//       { day: 'Wed', sales: 0, orders: 0 },
//       { day: 'Thu', sales: 0, orders: 0 },
//       { day: 'Fri', sales: 0, orders: 0 },
//       { day: 'Sat', sales: 0, orders: 0 },
//       { day: 'Sun', sales: 0, orders: 0 },
//     ];
//   }
//   return [
//     { month: 'Jan', sales: 0, orders: 0 },
//     { month: 'Feb', sales: 0, orders: 0 },
//     { month: 'Mar', sales: 0, orders: 0 },
//     { month: 'Apr', sales: 0, orders: 0 },
//     { month: 'May', sales: 0, orders: 0 },
//     { month: 'Jun', sales: 0, orders: 0 },
//     { month: 'Jul', sales: 0, orders: 0 },
//     { month: 'Aug', sales: 0, orders: 0 },
//     { month: 'Sep', sales: 0, orders: 0 },
//     { month: 'Oct', sales: 0, orders: 0 },
//     { month: 'Nov', sales: 0, orders: 0 },
//     { month: 'Dec', sales: 0, orders: 0 },
//   ];
// };









































// working but not working but still working
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   TrendingUp, ShoppingCart, Clock, AlertCircle, DollarSign, 
//   Package, Search, Filter, Plus, Edit, Trash2, Eye,
//   BarChart, LineChart, PieChart, Activity, RefreshCw,
//   ArrowUpRight, ArrowDownRight, Users, Calendar
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   BarChart as RechartsBarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   Sector
// } from 'recharts';

// export default function DashboardHome() {
//   const [pharmacy, setPharmacy] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [salesData, setSalesData] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState('week');
//   const [chartType, setChartType] = useState('line');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
//   const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047', '#1e5f6b'];

//   // Check screen size for responsive design
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // ==================== FETCH ALL DATA ====================
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const pharmacyRes = await pharmacyAPI.getMyPharmacy();
      
//       if (!pharmacyRes.success) {
//         setError(pharmacyRes.message);
//         return;
//       }

//       const pharmacyData = pharmacyRes.data;
//       setPharmacy(pharmacyData);
//       localStorage.setItem('pharmacyId', pharmacyData._id);

//       // Parallel data fetching with error handling
//       const [statsRes, ordersRes, inventoryRes, categoriesRes, salesRes] = await Promise.allSettled([
//         pharmacyAPI.getStats(pharmacyData._id),
//         pharmacyAPI.getRecentOrders(pharmacyData._id),
//         pharmacyAPI.getInventory(pharmacyData._id),
//         pharmacyAPI.getCategories(pharmacyData._id),
//         pharmacyAPI.getSalesData(pharmacyData._id, timeRange)
//       ]);

//       // Handle stats
//       if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) {
//         setStats(statsRes.value.data.data || {});
//       } else {
//         setStats({ totalMedicines: 0, pendingOrders: 0, todayRevenue: 0, lowStockCount: 0 });
//       }

//       // Handle orders
//       if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success) {
//         setRecentOrders(ordersRes.value.data.data || []);
//       } else {
//         setRecentOrders([]);
//       }

//       // Handle inventory
//       if (inventoryRes.status === 'fulfilled' && inventoryRes.value?.data?.success) {
//         setInventory(inventoryRes.value.data.data || []);
//       } else {
//         setInventory([]);
//       }

//       // Handle categories
//       if (categoriesRes.status === 'fulfilled' && categoriesRes.value?.data?.success) {
//         setCategories(categoriesRes.value.data.data || []);
//       } else {
//         setCategories([]);
//       }

//       // Handle sales
//       if (salesRes.status === 'fulfilled' && salesRes.value?.data?.success) {
//         setSalesData(salesRes.value.data.data || []);
//       } else {
//         setSalesData([]);
//       }

//     } catch (err) {
//       console.error('Dashboard error:', err);
//       setError(err.message || 'Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // Refetch sales when timeRange changes
//   useEffect(() => {
//     if (pharmacy?._id) {
//       pharmacyAPI.getSalesData(pharmacy._id, timeRange)
//         .then(res => {
//           if (res.data?.success) setSalesData(res.data.data || []);
//         })
//         .catch(console.error);
//     }
//   }, [timeRange, pharmacy]);

//   // ==================== HELPER FUNCTIONS ====================
//   const formatCurrency = (amount) => {
//     if (!amount && amount !== 0) return 'Rs 0';
//     return `Rs ${amount.toLocaleString()}`;
//   };

//   const getStatusColor = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'pending': return 'bg-amber-100 text-amber-700';
//       case 'processing': return 'bg-blue-100 text-blue-700';
//       case 'shipped': return 'bg-indigo-100 text-indigo-700';
//       case 'delivered': return 'bg-green-100 text-green-700';
//       case 'cancelled': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getStockStatus = (stock, reorderLevel = 10) => {
//     if (stock <= 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
//     if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700' };
//     return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
//   };

//   const filteredInventory = (inventory || []).filter(item =>
//     item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get chart data with fallback
//   const getChartData = () => {
//     if (salesData && salesData.length > 0) {
//       return salesData;
//     }
//     return getDefaultData(timeRange);
//   };

//   // Get data key based on timeRange
//   const getDataKey = () => {
//     switch(timeRange) {
//       case 'week':
//         return 'day';
//       case 'month':
//         return 'week';
//       case 'year':
//         return 'month';
//       default:
//         return 'day';
//     }
//   };

//   // Custom tooltip for charts (like SalesPage)
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-gray-200">
//           <p className="font-semibold text-gray-900 text-xs sm:text-sm">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="text-xs sm:text-sm mt-1" style={{ color: entry.color }}>
//               {entry.name}: {entry.name === 'Revenue' || entry.name === 'Sales' 
//                 ? formatCurrency(entry.value) 
//                 : entry.value}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   // Active shape for pie chart (like SalesPage)
//   const renderActiveShape = (props) => {
//     const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
//     return (
//       <g>
//         <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-xs sm:text-sm font-medium">
//           {payload.name}
//         </text>
//         <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-sm sm:text-lg font-bold">
//           {formatCurrency(value)}
//         </text>
//         <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#666" className="text-[10px] sm:text-xs">
//           {`${(percent * 100).toFixed(1)}%`}
//         </text>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius + 10}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           innerRadius={outerRadius + 12}
//           outerRadius={outerRadius + 15}
//           fill={fill}
//         />
//       </g>
//     );
//   };

//   // Calculate total from sales data
//   const calculateTotalSales = () => {
//     const data = getChartData();
//     if (!data.length) return 0;
//     return data.reduce((sum, item) => sum + (item.revenue || item.sales || 0), 0);
//   };

//   // Calculate total orders from sales data
//   const calculateTotalOrders = () => {
//     const data = getChartData();
//     if (!data.length) return 0;
//     return data.reduce((sum, item) => sum + (item.orders || 0), 0);
//   };

//   // ==================== LOADING STATES ====================
//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error === 'Pharmacy not registered') {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <Package className="w-16 h-16 text-[#2c6774] mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Welcome to Pharmacy Dashboard
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You haven't registered your pharmacy yet. Please register to continue.
//           </p>
//           <Link
//             to="/pharmacy/register"
//             className="inline-block px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
//           >
//             Register Pharmacy
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//             {pharmacy?.name || 'Pharmacy Dashboard'}
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's your pharmacy overview</p>
//         </div>
//         <div className="flex gap-2 mt-3 sm:mt-0">
//           <button
//             onClick={fetchDashboardData}
//             disabled={loading}
//             className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//           >
//             <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
//             <span className="hidden sm:inline">Refresh</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards - Professional Design */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-600">Total Medicines</p>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">
//                 {stats?.totalMedicines || 0}
//               </p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-blue-50">
//               <Package className="text-blue-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-600">Pending Orders</p>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">
//                 {stats?.pendingOrders || 0}
//               </p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-amber-50">
//               <Clock className="text-amber-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-600">Today's Revenue</p>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">
//                 {formatCurrency(stats?.todayRevenue || 0)}
//               </p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-green-50">
//               <DollarSign className="text-green-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-600">Low Stock</p>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1">
//                 {stats?.lowStockCount || 0}
//               </p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-red-50">
//               <AlertCircle className="text-red-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section - Like SalesPage Design */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
//         {/* Main Sales Chart - Professional Design */}
//         <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
//             <div>
//               <h2 className="text-base sm:text-lg font-bold text-gray-900">Sales Trend</h2>
//               <p className="text-xs sm:text-sm text-gray-600">Revenue over time</p>
//             </div>
            
//             <div className="flex flex-wrap gap-2">
//               {/* Chart Type Toggle */}
//               <div className="flex bg-gray-100 p-1 rounded-lg">
//                 <button
//                   onClick={() => setChartType('line')}
//                   className={`p-1.5 sm:p-2 rounded-md transition-colors ${chartType === 'line' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
//                   title="Line Chart"
//                 >
//                   <LineChart size={isMobile ? 14 : 18} />
//                 </button>
//                 <button
//                   onClick={() => setChartType('bar')}
//                   className={`p-1.5 sm:p-2 rounded-md transition-colors ${chartType === 'bar' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
//                   title="Bar Chart"
//                 >
//                   <BarChart size={isMobile ? 14 : 18} />
//                 </button>
//                 <button
//                   onClick={() => setChartType('area')}
//                   className={`p-1.5 sm:p-2 rounded-md transition-colors ${chartType === 'area' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
//                   title="Area Chart"
//                 >
//                   <TrendingUp size={isMobile ? 14 : 18} />
//                 </button>
//               </div>

//               {/* Time Range Selector */}
//               <div className="flex bg-gray-100 p-1 rounded-lg">
//                 {['week', 'month', 'year'].map((period) => (
//                   <button
//                     key={period}
//                     onClick={() => setTimeRange(period)}
//                     className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-colors ${
//                       timeRange === period
//                         ? 'bg-[#2c6774] text-white'
//                         : 'text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {period.charAt(0).toUpperCase() + period.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Chart Container */}
//           <div className="h-[220px] sm:h-[260px] md:h-[280px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               {chartType === 'line' ? (
//                 <RechartsLineChart
//                   data={getChartData()}
//                   margin={{ top: 10, right: isMobile ? 10 : 30, left: isMobile ? 0 : 10, bottom: 10 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis 
//                     dataKey={getDataKey()} 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
//                     interval="preserveStartEnd"
//                     angle={isMobile ? -25 : 0}
//                     textAnchor={isMobile ? "end" : "middle"}
//                     height={isMobile ? 40 : 30}
//                   />
//                   <YAxis 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
//                     tickFormatter={(value) => isMobile ? `Rs${value}` : `Rs.${value}`}
//                     width={isMobile ? 35 : 45}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
//                   <Line 
//                     type="monotone" 
//                     dataKey="revenue" 
//                     name="Revenue" 
//                     stroke="#2c6774" 
//                     strokeWidth={2}
//                     dot={!isMobile}
//                     activeDot={{ r: 6 }}
//                   />
//                   {!isMobile && (
//                     <Line 
//                       type="monotone" 
//                       dataKey="orders" 
//                       name="Orders" 
//                       stroke="#f59e0b" 
//                       strokeWidth={2}
//                       dot={false}
//                       activeDot={{ r: 6 }}
//                     />
//                   )}
//                 </RechartsLineChart>
//               ) : chartType === 'bar' ? (
//                 <RechartsBarChart
//                   data={getChartData()}
//                   margin={{ top: 10, right: isMobile ? 10 : 30, left: isMobile ? 0 : 10, bottom: 10 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis 
//                     dataKey={getDataKey()} 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
//                     interval="preserveStartEnd"
//                     angle={isMobile ? -25 : 0}
//                     textAnchor={isMobile ? "end" : "middle"}
//                     height={isMobile ? 40 : 30}
//                   />
//                   <YAxis 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
//                     tickFormatter={(value) => isMobile ? `Rs${value}` : `Rs.${value}`}
//                     width={isMobile ? 35 : 45}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
//                   <Bar dataKey="revenue" name="Revenue" fill="#2c6774" radius={[4, 4, 0, 0]} barSize={isMobile ? 20 : 30} />
//                   {!isMobile && <Bar dataKey="orders" name="Orders" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />}
//                 </RechartsBarChart>
//               ) : (
//                 <AreaChart
//                   data={getChartData()}
//                   margin={{ top: 10, right: isMobile ? 10 : 30, left: isMobile ? 0 : 10, bottom: 10 }}
//                 >
//                   <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#2c6774" stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor="#2c6774" stopOpacity={0.1}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis 
//                     dataKey={getDataKey()} 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
//                     interval="preserveStartEnd"
//                     angle={isMobile ? -25 : 0}
//                     textAnchor={isMobile ? "end" : "middle"}
//                     height={isMobile ? 40 : 30}
//                   />
//                   <YAxis 
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
//                     tickFormatter={(value) => isMobile ? `Rs${value}` : `Rs.${value}`}
//                     width={isMobile ? 35 : 45}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area 
//                     type="monotone" 
//                     dataKey="revenue" 
//                     name="Revenue" 
//                     stroke="#2c6774" 
//                     fillOpacity={1}
//                     fill="url(#colorRevenue)"
//                   />
//                 </AreaChart>
//               )}
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Category Distribution Pie Chart - Like SalesPage */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <div>
//               <h2 className="text-base sm:text-lg font-bold text-gray-900">Sales by Category</h2>
//               <p className="text-xs sm:text-sm text-gray-600">Revenue distribution</p>
//             </div>
//             <PieChart className="text-gray-400" size={isMobile ? 16 : 20} />
//           </div>
          
//           <div className="h-[200px] sm:h-[220px] md:h-[240px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <RechartsPieChart>
//                 <Pie
//                   activeIndex={activeIndex}
//                   activeShape={renderActiveShape}
//                   data={categories.length > 0 ? categories.map(cat => ({ name: cat.name, value: cat.count || 0 })) : [{ name: 'No Data', value: 1 }]}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={isMobile ? 40 : 50}
//                   outerRadius={isMobile ? 60 : 70}
//                   dataKey="value"
//                   onMouseEnter={(_, index) => setActiveIndex(index)}
//                   paddingAngle={2}
//                 >
//                   {(categories.length > 0 ? categories : [{ name: 'No Data', count: 1 }]).map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </div>
          
//           {/* Legend */}
//           <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1 sm:gap-2">
//             {categories.slice(0, 4).map((category, index) => (
//               <div key={index} className="flex items-center gap-1 sm:gap-2">
//                 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
//                 <span className="text-[10px] sm:text-xs text-gray-600 truncate">{category.name}</span>
//                 <span className="text-[10px] sm:text-xs font-medium ml-auto">{category.count}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders Section */}
//       <div className="bg-white rounded-xl border border-gray-200 mb-6">
//         <div className="p-3 sm:p-4 border-b flex justify-between items-center">
//           <h3 className="font-bold text-gray-800 text-sm sm:text-base">Recent Orders</h3>
//           <Link to="/pharmacy/dashboard/orders" className="text-xs sm:text-sm text-[#2c6774] hover:underline flex items-center gap-1">
//             View All <ArrowUpRight size={12} />
//           </Link>
//         </div>
        
//         {recentOrders.length === 0 ? (
//           <div className="p-6 sm:p-8 text-center text-gray-500">
//             <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
//             <p className="text-sm sm:text-base">No orders yet</p>
//           </div>
//         ) : (
//           <>
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Customer</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Items</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Amount</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {recentOrders.slice(0, 5).map((order, i) => (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{order.id}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{order.customerName}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{order.medicineNames}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{formatCurrency(order.amount)}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="md:hidden divide-y">
//               {recentOrders.slice(0, 5).map((order, i) => (
//                 <div key={i} className="p-3 sm:p-4">
//                   <div className="flex justify-between mb-2">
//                     <span className="font-medium text-xs sm:text-sm">{order.id}</span>
//                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-600">{order.customerName}</p>
//                   <p className="text-xs text-gray-500 mt-1">{order.medicineNames}</p>
//                   <p className="text-xs sm:text-sm font-medium mt-2">{formatCurrency(order.amount)}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Inventory Section */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="p-3 sm:p-4 border-b">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <h3 className="font-bold text-gray-800 text-sm sm:text-base">Medicine Inventory</h3>
//             <Link
//               to="/pharmacy/dashboard/products/add"
//               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-xs sm:text-sm"
//             >
//               <Plus size={14} />
//               Add Medicine
//             </Link>
//           </div>
          
//           <div className="mt-3 sm:mt-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search medicines..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-9 pr-3 py-1.5 sm:py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//               />
//             </div>
//           </div>
//         </div>

//         {filteredInventory.length === 0 ? (
//           <div className="p-6 sm:p-8 text-center text-gray-500">
//             <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
//             <p className="text-sm sm:text-base">No medicines found</p>
//           </div>
//         ) : (
//           <>
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Medicine</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Category</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Stock</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Price</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                     <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {filteredInventory.slice(0, 5).map((item, i) => {
//                     const status = getStockStatus(item.stock);
//                     return (
//                       <tr key={i} className="hover:bg-gray-50">
//                         <td className="px-3 sm:px-4 py-2 sm:py-3">
//                           <p className="font-medium text-xs sm:text-sm">{item.name}</p>
//                           <p className="text-xs text-gray-500">{item.genericName}</p>
//                         </td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.category}</td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.stock}</td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{formatCurrency(item.price)}</td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3">
//                           <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
//                             {status.label}
//                           </span>
//                         </td>
//                         <td className="px-3 sm:px-4 py-2 sm:py-3">
//                           <div className="flex gap-1 sm:gap-2">
//                             <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
//                               <Eye size={14} />
//                             </button>
//                             <button className="p-1 text-green-600 hover:bg-green-50 rounded">
//                               <Edit size={14} />
//                             </button>
//                             <button className="p-1 text-red-600 hover:bg-red-50 rounded">
//                               <Trash2 size={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//             <div className="md:hidden divide-y">
//               {filteredInventory.slice(0, 5).map((item, i) => {
//                 const status = getStockStatus(item.stock);
//                 return (
//                   <div key={i} className="p-3 sm:p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex-1">
//                         <p className="font-medium text-sm">{item.name}</p>
//                         <p className="text-xs text-gray-500">{item.genericName}</p>
//                       </div>
//                       <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
//                         {status.label}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-600">{item.category} • Stock: {item.stock}</p>
//                     <p className="text-xs font-medium mt-1">{formatCurrency(item.price)}</p>
//                     <div className="flex gap-2 mt-3">
//                       <button className="flex-1 py-1.5 text-blue-600 border rounded-lg hover:bg-blue-50 text-xs">View</button>
//                       <button className="flex-1 py-1.5 text-green-600 border rounded-lg hover:bg-green-50 text-xs">Edit</button>
//                       <button className="flex-1 py-1.5 text-red-600 border rounded-lg hover:bg-red-50 text-xs">Delete</button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // ==================== SUB-COMPONENTS ====================
// const getDefaultData = (timeRange) => {
//   if (timeRange === 'week') {
//     return [
//       { day: 'Mon', revenue: 0, orders: 0, sales: 0 },
//       { day: 'Tue', revenue: 0, orders: 0, sales: 0 },
//       { day: 'Wed', revenue: 0, orders: 0, sales: 0 },
//       { day: 'Thu', revenue: 0, orders: 0, sales: 0 },
//       { day: 'Fri', revenue: 0, orders: 0, sales: 0 },
//       { day: 'Sat', revenue: 0, orders: 0, sales: 0 },
//       { day: 'Sun', revenue: 0, orders: 0, sales: 0 },
//     ];
//   } else if (timeRange === 'month') {
//     return [
//       { week: 'Week 1', revenue: 0, orders: 0, sales: 0 },
//       { week: 'Week 2', revenue: 0, orders: 0, sales: 0 },
//       { week: 'Week 3', revenue: 0, orders: 0, sales: 0 },
//       { week: 'Week 4', revenue: 0, orders: 0, sales: 0 },
//     ];
//   }
//   return [
//     { month: 'Jan', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Feb', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Mar', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Apr', revenue: 0, orders: 0, sales: 0 },
//     { month: 'May', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Jun', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Jul', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Aug', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Sep', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Oct', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Nov', revenue: 0, orders: 0, sales: 0 },
//     { month: 'Dec', revenue: 0, orders: 0, sales: 0 },
//   ];
// };






























/// ----------------------- Uper waly pr switch kr skty hain
// src/components/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, ShoppingCart, Clock, AlertCircle, DollarSign, 
  Package, Search, Plus, Edit, Trash2, Eye,
  BarChart, LineChart, PieChart, RefreshCw,
  ArrowUpRight
} from 'lucide-react';
import { usePharmacy } from '../../contexts/PharmacyContext';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Sector
} from 'recharts';

const COLORS = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

export default function DashboardHome() {
  const { 
    pharmacy, 
    stats, 
    orders, 
    inventory, 
    orderStatusDistribution,
    loading, 
    error,
    fetchAllData,
    fetchSalesData,
    pharmacyId
  } = usePharmacy();
  const navigate = useNavigate();
  
  const [salesData, setSalesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [salesLoading, setSalesLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const openDeleteModal = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  const handleDeleteMedicine = async () => {
    if (!selectedMedicine || !pharmacyId) return;
    try {
      await pharmacyAPI.deleteMedicine(pharmacyId, selectedMedicine._id || selectedMedicine.id);
      message.success('Medicine deleted successfully');
      setShowDeleteModal(false);
      fetchAllData(); // Refresh context data
    } catch (error) {
      message.error('Failed to delete medicine');
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch sales data when timeRange changes
  useEffect(() => {
    const loadSalesData = async () => {
      if (!pharmacyId) return;
      setSalesLoading(true);
      try {
        const data = await fetchSalesData(timeRange);
        setSalesData(data.length > 0 ? data : getDefaultData(timeRange));
      } catch (err) {
        console.error('Error loading sales:', err);
        setSalesData(getDefaultData(timeRange));
      } finally {
        setSalesLoading(false);
      }
    };
    
    loadSalesData();
  }, [timeRange, pharmacyId, fetchSalesData]);

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rs 0';
    const num = Number(amount);
    return isNaN(num) ? 'Rs 0' : `Rs ${num.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStockStatus = (stock, reorderLevel = 10) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' };
    if (stock <= 5) return { label: 'Critical', color: 'bg-red-200 text-red-800', dot: 'bg-red-600' };
    if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
  };

  const filteredInventory = (inventory || []).filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDataKey = () => {
    switch(timeRange) {
      case 'week': return 'day';
      case 'month': return 'week';
      case 'year': return 'month';
      default: return 'day';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm mt-1" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    const statusColors = {
      'Pending': COLORS.pending,
      'Processing': COLORS.processing,
      'Delivered': COLORS.delivered,
      'Cancelled': COLORS.cancelled
    };
  
    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-sm font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-lg font-bold">
          {value} orders
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#666" className="text-xs">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <Sector
          cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10}
          startAngle={startAngle} endAngle={endAngle} fill={statusColors[payload.name] || fill}
        />
        <Sector
          cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle}
          innerRadius={outerRadius + 12} outerRadius={outerRadius + 15}
          fill={statusColors[payload.name] || fill}
        />
      </g>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error === 'Pharmacy not registered') {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Package className="w-16 h-16 text-[#2c6774] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Pharmacy Dashboard</h2>
          <p className="text-gray-600 mb-6">You haven't registered your pharmacy yet.</p>
          <Link to="/pharmacy/register" className="inline-block px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]">
            Register Pharmacy
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchAllData} className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {pharmacy?.name || 'Pharmacy Dashboard'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's your pharmacy overview</p>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button onClick={fetchAllData} disabled={loading}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Orders</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stats.totalOrders || 0}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-blue-50">
              <ShoppingCart className="text-blue-600" size={isMobile ? 18 : 22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Revenue</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalRevenue || 0)}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-green-50">
              <DollarSign className="text-green-600" size={isMobile ? 18 : 22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Pending Orders</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stats.pendingOrders || 0}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-amber-50">
              <Clock className="text-amber-600" size={isMobile ? 18 : 22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Low Stock Items</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stats.lowStockCount || 0}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-red-50">
              <AlertCircle className="text-red-600" size={isMobile ? 18 : 22} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Sales Overview</h2>
              <p className="text-xs sm:text-sm text-gray-600">Revenue trends over time</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setChartType('line')}
                  className={`p-1.5 sm:p-2 rounded-md ${chartType === 'line' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
                  <LineChart size={isMobile ? 14 : 18} />
                </button>
                <button onClick={() => setChartType('bar')}
                  className={`p-1.5 sm:p-2 rounded-md ${chartType === 'bar' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
                  <BarChart size={isMobile ? 14 : 18} />
                </button>
                <button onClick={() => setChartType('area')}
                  className={`p-1.5 sm:p-2 rounded-md ${chartType === 'area' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
                  <TrendingUp size={isMobile ? 14 : 18} />
                </button>
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg">
                {['week', 'month', 'year'].map((period) => (
                  <button key={period} onClick={() => setTimeRange(period)}
                    className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${
                      timeRange === period ? 'bg-[#2c6774] text-white' : 'text-gray-700 hover:bg-gray-200'
                    }`}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="h-[220px] sm:h-[260px] md:h-[280px] w-full">
            {salesLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <RechartsLineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }}
                      tickFormatter={(value) => `Rs ${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" strokeWidth={2} dot={true} />
                    <Line type="monotone" dataKey="orders" name="Orders" stroke="#f59e0b" strokeWidth={2} dot={true} />
                  </RechartsLineChart>
                ) : chartType === 'bar' ? (
                  <RechartsBarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }}
                      tickFormatter={(value) => `Rs ${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#2c6774" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="orders" name="Orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                ) : (
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2c6774" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2c6774" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }}
                      tickFormatter={(value) => `Rs ${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" fill="url(#colorRevenue)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Order Status Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Order Status</h2>
              <p className="text-xs sm:text-sm text-gray-600">Distribution by status</p>
            </div>
            <PieChart className="text-gray-400" size={isMobile ? 16 : 20} />
          </div>
          
          <div className="h-[200px] sm:h-[220px] md:h-[240px] w-full">
            {orderStatusDistribution.length === 0 || orderStatusDistribution.every(d => d.value === 0) ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>No order data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={orderStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 40 : 50}
                    outerRadius={isMobile ? 60 : 70}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    paddingAngle={2}
                  >
                    {orderStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || COLORS.pending} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* Legend */}
          <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1 sm:gap-2">
            {orderStatusDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[item.name.toLowerCase()] || COLORS.pending }} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm sm:text-base">Recent Orders</h3>
          <Link to="/pharmacy/dashboard/orders" className="text-xs sm:text-sm text-[#2c6774] hover:underline flex items-center gap-1">
            View All <ArrowUpRight size={12} />
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-gray-500">
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
            <p className="text-sm sm:text-base">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Customer</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Items</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[#2c6774]">
                      {order.orderNumber}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {order.customer?.name || 'Customer'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                      {order.totalItems} items {order.totalTablets > 0 && `(${order.totalTablets} tablets)`}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inventory */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-3 sm:p-4 border-b">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Medicine Inventory</h3>
            <button 
              onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/add`)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-xs sm:text-sm">
              <Plus size={14} /> Add Medicine
            </button>
          </div>
          
          <div className="mt-3 sm:mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input type="text" placeholder="Search medicines..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 sm:py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]" />
            </div>
          </div>
        </div>

        {filteredInventory.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-gray-500">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
            <p className="text-sm sm:text-base">No medicines found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Medicine</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Stock</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Price</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInventory.slice(0, 5).map((item) => {
                  const itemStock = item.stockQuantity || item.stock || 0;
                  const status = getStockStatus(itemStock, item.reorderLevel || 10);
                  return (
                    <tr key={item._id || item.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <p className="font-medium text-xs sm:text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.genericName}</p>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.category}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {item.stockQuantity || item.stock} {item.displayUnit || 'units'}
                        {item.isTablet && item.totalTablets > 0 && (
                          <span className="text-gray-500 ml-1">({item.totalTablets} tabs)</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                        {item.discountedPrice && item.discountedPrice < item.price ? (
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 line-through">{formatCurrency(item.price)}</span>
                            <span className="font-bold text-green-600">{formatCurrency(item.discountedPrice)}</span>
                          </div>
                        ) : (
                          <span className="font-medium text-gray-900">{formatCurrency(item.price)}</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${status.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">
                        <div className="flex gap-1 sm:gap-2">
                          <button 
                            onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/view/${item._id || item.id}`, { state: { medicine: item } })}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/edit/${item._id || item.id}`, { state: { medicine: item } })}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button onClick={() => openDeleteModal(item)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Added: Delete Confirmation Modal */}
      {showDeleteModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-100">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Medicine</h2>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedMedicine.name}</span>? 
              This action will remove it from your inventory permanently.
            </p>

            {(selectedMedicine.stockQuantity > 0 || selectedMedicine.stock > 0) && (
              <div className="p-3 bg-amber-50 rounded-lg mb-6 border border-amber-100">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Warning: You still have {selectedMedicine.stockQuantity || selectedMedicine.stock} units in stock.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteMedicine}
                className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SUB-COMPONENTS ====================
const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: 'bg-blue-50',
    amber: 'bg-amber-50',
    green: 'bg-green-50',
    red: 'bg-red-50'
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] sm:text-xs text-gray-600">{title}</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

const ChartTypeToggle = ({ chartType, setChartType, isMobile }) => (
  <div className="flex bg-gray-100 p-1 rounded-lg">
    {['line', 'bar', 'area'].map(type => (
      <button
        key={type}
        onClick={() => setChartType(type)}
        className={`p-1.5 rounded-md transition-all ${chartType === type ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
      >
        {type === 'line' && <LineChart size={isMobile ? 14 : 16} />}
        {type === 'bar' && <BarChart size={isMobile ? 14 : 16} />}
        {type === 'area' && <Activity size={isMobile ? 14 : 16} />}
      </button>
    ))}
  </div>
);

const TimeRangeToggle = ({ timeRange, setTimeRange }) => (
  <div className="flex bg-gray-100 p-1 rounded-lg">
    {['week', 'month', 'year'].map(period => (
      <button
        key={period}
        onClick={() => setTimeRange(period)}
        className={`px-2.5 py-1 rounded-md text-[10px] sm:text-xs capitalize transition-all ${timeRange === period ? 'bg-[#2c6774] text-white' : 'text-gray-700'}`}
      >
        {period}
      </button>
    ))}
  </div>
);

// Default data for empty states
const getDefaultData = (timeRange) => {
  if (timeRange === 'week') {
    return [
      { day: 'Mon', revenue: 0, orders: 0 },
      { day: 'Tue', revenue: 0, orders: 0 },
      { day: 'Wed', revenue: 0, orders: 0 },
      { day: 'Thu', revenue: 0, orders: 0 },
      { day: 'Fri', revenue: 0, orders: 0 },
      { day: 'Sat', revenue: 0, orders: 0 },
      { day: 'Sun', revenue: 0, orders: 0 },
    ];
  } else if (timeRange === 'month') {
    return [
      { week: 'Week 1', revenue: 0, orders: 0 },
      { week: 'Week 2', revenue: 0, orders: 0 },
      { week: 'Week 3', revenue: 0, orders: 0 },
      { week: 'Week 4', revenue: 0, orders: 0 },
    ];
  }
  return [
    { month: 'Jan', revenue: 0, orders: 0 },
    { month: 'Feb', revenue: 0, orders: 0 },
    { month: 'Mar', revenue: 0, orders: 0 },
    { month: 'Apr', revenue: 0, orders: 0 },
    { month: 'May', revenue: 0, orders: 0 },
    { month: 'Jun', revenue: 0, orders: 0 },
    { month: 'Jul', revenue: 0, orders: 0 },
    { month: 'Aug', revenue: 0, orders: 0 },
    { month: 'Sep', revenue: 0, orders: 0 },
    { month: 'Oct', revenue: 0, orders: 0 },
    { month: 'Nov', revenue: 0, orders: 0 },
    { month: 'Dec', revenue: 0, orders: 0 },
  ];
};
























// below working just need context api
// src/components/DashboardHome.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   TrendingUp, ShoppingCart, Clock, AlertCircle, DollarSign, 
//   Package, Search, Plus, Edit, Trash2, Eye,
//   BarChart, LineChart, PieChart, RefreshCw,
//   ArrowUpRight, Activity
// } from 'lucide-react';
// import { usePharmacy } from '../../contexts/PharmacyContext';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   BarChart as RechartsBarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   Sector
// } from 'recharts';

// const COLORS = {
//   pending: '#f59e0b',
//   processing: '#3b82f6',
//   delivered: '#10b981',
//   cancelled: '#ef4444'
// };

// export default function DashboardHome() {
//   const { 
//     pharmacy, 
//     stats, 
//     orders, 
//     inventory, 
//     orderStatusDistribution,
//     loading, 
//     error,
//     fetchAllData,
//     fetchSalesData,
//     pharmacyId
//   } = usePharmacy();
//   const navigate = useNavigate();
  
//   const [salesData, setSalesData] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [timeRange, setTimeRange] = useState('week');
//   const [chartType, setChartType] = useState('line');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
//   const [salesLoading, setSalesLoading] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);

//   const openDeleteModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteMedicine = async () => {
//     if (!selectedMedicine || !pharmacyId) return;
//     try {
//       await pharmacyAPI.deleteMedicine(pharmacyId, selectedMedicine._id || selectedMedicine.id);
//       message.success('Medicine deleted successfully');
//       setShowDeleteModal(false);
//       fetchAllData();
//     } catch (error) {
//       message.error('Failed to delete medicine');
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 640);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const loadSalesData = async () => {
//       if (!pharmacyId) return;
//       setSalesLoading(true);
//       try {
//         const data = await fetchSalesData(timeRange);
//         setSalesData(data.length > 0 ? data : getDefaultData(timeRange));
//       } catch (err) {
//         console.error('Error loading sales:', err);
//         setSalesData(getDefaultData(timeRange));
//       } finally {
//         setSalesLoading(false);
//       }
//     };
    
//     loadSalesData();
//   }, [timeRange, pharmacyId, fetchSalesData]);

//   const formatCurrency = (amount) => {
//     if (!amount && amount !== 0) return 'Rs 0';
//     const num = Number(amount);
//     return isNaN(num) ? 'Rs 0' : `Rs ${num.toLocaleString()}`;
//   };

//   const getStatusColor = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'pending': return 'bg-amber-100 text-amber-700';
//       case 'processing': return 'bg-blue-100 text-blue-700';
//       case 'delivered': return 'bg-green-100 text-green-700';
//       case 'cancelled': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getStockStatus = (stock, reorderLevel = 10) => {
//     if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' };
//     if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' };
//     return { label: 'In Stock', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
//   };

//   const filteredInventory = (inventory || []).filter(item =>
//     item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.category?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Filter orders to show only new, pending, and processing on dashboard
//   const dashboardOrders = (orders || []).filter(order => 
//     order.status === 'pending' || order.status === 'processing'
//   ).slice(0, 5);

//   const getDataKey = () => {
//     switch(timeRange) {
//       case 'week': return 'day';
//       case 'month': return 'week';
//       case 'year': return 'month';
//       default: return 'day';
//     }
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
//           <p className="font-semibold text-gray-900 text-sm">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="text-sm mt-1" style={{ color: entry.color }}>
//               {entry.name}: {entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.value}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderActiveShape = (props) => {
//     const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
//     const statusColors = {
//       'Pending': COLORS.pending,
//       'Processing': COLORS.processing,
//       'Delivered': COLORS.delivered,
//       'Cancelled': COLORS.cancelled
//     };
  
//     return (
//       <g>
//         <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-sm font-medium">
//           {payload.name}
//         </text>
//         <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-lg font-bold">
//           {value} orders
//         </text>
//         <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#666" className="text-xs">
//           {`${(percent * 100).toFixed(1)}%`}
//         </text>
//         <Sector
//           cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10}
//           startAngle={startAngle} endAngle={endAngle} fill={statusColors[payload.name] || fill}
//         />
//         <Sector
//           cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle}
//           innerRadius={outerRadius + 12} outerRadius={outerRadius + 15}
//           fill={statusColors[payload.name] || fill}
//         />
//       </g>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error === 'Pharmacy not registered') {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <Package className="w-16 h-16 text-[#2c6774] mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Pharmacy Dashboard</h2>
//           <p className="text-gray-600 mb-6">You haven't registered your pharmacy yet.</p>
//           <Link to="/pharmacy/register" className="inline-block px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]">
//             Register Pharmacy
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button onClick={fetchAllData} className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//             {pharmacy?.name || 'Pharmacy Dashboard'}
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's your pharmacy overview</p>
//         </div>
//         <div className="flex gap-2 mt-3 sm:mt-0">
//           <button onClick={fetchAllData} disabled={loading}
//             className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
//             <span className="hidden sm:inline">Refresh</span>
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-600">Total Orders</p>
//               <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stats.totalOrders || 0}</p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-blue-50">
//               <ShoppingCart className="text-blue-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-600">Total Revenue</p>
//               <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalRevenue || 0)}</p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-green-50">
//               <DollarSign className="text-green-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-600">Pending Orders</p>
//               <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stats.pendingOrders || 0}</p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-amber-50">
//               <Clock className="text-amber-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs text-gray-600">Low Stock Items</p>
//               <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stats.lowStockCount || 0}</p>
//             </div>
//             <div className="p-2 sm:p-3 rounded-xl bg-red-50">
//               <AlertCircle className="text-red-600" size={isMobile ? 18 : 22} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
//         {/* Sales Chart */}
//         <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//             <div>
//               <h2 className="text-base sm:text-lg font-bold text-gray-900">Sales Overview</h2>
//               <p className="text-xs sm:text-sm text-gray-600">Revenue trends over time</p>
//             </div>
            
//             <div className="flex flex-wrap gap-2">
//               <div className="flex bg-gray-100 p-1 rounded-lg">
//                 <button onClick={() => setChartType('line')}
//                   className={`p-1.5 sm:p-2 rounded-md ${chartType === 'line' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
//                   <LineChart size={isMobile ? 14 : 18} />
//                 </button>
//                 <button onClick={() => setChartType('bar')}
//                   className={`p-1.5 sm:p-2 rounded-md ${chartType === 'bar' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
//                   <BarChart size={isMobile ? 14 : 18} />
//                 </button>
//                 <button onClick={() => setChartType('area')}
//                   className={`p-1.5 sm:p-2 rounded-md ${chartType === 'area' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}>
//                   <TrendingUp size={isMobile ? 14 : 18} />
//                 </button>
//               </div>

//               <div className="flex bg-gray-100 p-1 rounded-lg">
//                 {['week', 'month', 'year'].map((period) => (
//                   <button key={period} onClick={() => setTimeRange(period)}
//                     className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${
//                       timeRange === period ? 'bg-[#2c6774] text-white' : 'text-gray-700 hover:bg-gray-200'
//                     }`}>
//                     {period.charAt(0).toUpperCase() + period.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="h-[220px] sm:h-[260px] md:h-[280px] w-full">
//             {salesLoading ? (
//               <div className="h-full flex items-center justify-center">
//                 <div className="w-8 h-8 border-2 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 {chartType === 'line' ? (
//                   <RechartsLineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
//                       tick={{ fill: '#6b7280', fontSize: 11 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }}
//                       tickFormatter={(value) => `Rs ${value}`} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" strokeWidth={2} dot={true} />
//                     <Line type="monotone" dataKey="orders" name="Orders" stroke="#f59e0b" strokeWidth={2} dot={true} />
//                   </RechartsLineChart>
//                 ) : chartType === 'bar' ? (
//                   <RechartsBarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
//                       tick={{ fill: '#6b7280', fontSize: 11 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }}
//                       tickFormatter={(value) => `Rs ${value}`} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Bar dataKey="revenue" name="Revenue" fill="#2c6774" radius={[4, 4, 0, 0]} />
//                     <Bar dataKey="orders" name="Orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
//                   </RechartsBarChart>
//                 ) : (
//                   <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
//                     <defs>
//                       <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#2c6774" stopOpacity={0.8}/>
//                         <stop offset="95%" stopColor="#2c6774" stopOpacity={0.1}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
//                       tick={{ fill: '#6b7280', fontSize: 11 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }}
//                       tickFormatter={(value) => `Rs ${value}`} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" fill="url(#colorRevenue)" />
//                   </AreaChart>
//                 )}
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//         {/* Order Status Distribution Pie Chart */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
//           <div className="flex items-center justify-between mb-3 sm:mb-4">
//             <div>
//               <h2 className="text-base sm:text-lg font-bold text-gray-900">Order Status</h2>
//               <p className="text-xs sm:text-sm text-gray-600">Distribution by status</p>
//             </div>
//             <PieChart className="text-gray-400" size={isMobile ? 16 : 20} />
//           </div>
          
//           <div className="h-[200px] sm:h-[220px] md:h-[240px] w-full">
//             {orderStatusDistribution.length === 0 || orderStatusDistribution.every(d => d.value === 0) ? (
//               <div className="h-full flex items-center justify-center text-gray-400">
//                 <p>No order data available</p>
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height="100%">
//                 <RechartsPieChart>
//                   <Pie
//                     activeIndex={activeIndex}
//                     activeShape={renderActiveShape}
//                     data={orderStatusDistribution}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={isMobile ? 40 : 50}
//                     outerRadius={isMobile ? 60 : 70}
//                     dataKey="value"
//                     onMouseEnter={(_, index) => setActiveIndex(index)}
//                     paddingAngle={2}
//                   >
//                     {orderStatusDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || COLORS.pending} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </RechartsPieChart>
//               </ResponsiveContainer>
//             )}
//           </div>
          
//           {/* Legend */}
//           <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1 sm:gap-2">
//             {orderStatusDistribution.map((item, index) => (
//               <div key={index} className="flex items-center gap-1 sm:gap-2">
//                 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
//                   style={{ backgroundColor: COLORS[item.name.toLowerCase()] || COLORS.pending }} />
//                 <span className="text-xs text-gray-600">{item.name}</span>
//                 <span className="text-xs font-medium ml-auto">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders - Only Pending & Processing */}
//       <div className="bg-white rounded-xl border border-gray-200 mb-6">
//         <div className="p-3 sm:p-4 border-b flex justify-between items-center">
//           <h3 className="font-bold text-gray-800 text-sm sm:text-base">Recent Orders (Pending & Processing)</h3>
//           <Link to="/pharmacy/dashboard/orders" className="text-xs sm:text-sm text-[#2c6774] hover:underline flex items-center gap-1">
//             View All Orders <ArrowUpRight size={12} />
//           </Link>
//         </div>
        
//         {dashboardOrders.length === 0 ? (
//           <div className="p-6 sm:p-8 text-center text-gray-500">
//             <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
//             <p className="text-sm sm:text-base">No pending or processing orders</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Customer</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Items</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Amount</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {dashboardOrders.map((order) => (
//                   <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/pharmacy/dashboard/orders')}>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[#2c6774]">
//                       {order.orderNumber}
//                     </td>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
//                       {order.customer?.name || 'Customer'}
//                     </td>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
//                       {order.totalItems} items {order.totalTablets > 0 && `(${order.totalTablets} tablets)`}
//                     </td>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">
//                       {formatCurrency(order.total)}
//                     </td>
//                     <td className="px-3 sm:px-4 py-2 sm:py-3">
//                       <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Inventory */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="p-3 sm:p-4 border-b">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <h3 className="font-bold text-gray-800 text-sm sm:text-base">Medicine Inventory</h3>
//             <button 
//               onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/add`)}
//               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-xs sm:text-sm">
//               <Plus size={14} /> Add Medicine
//             </button>
//           </div>
          
//           <div className="mt-3 sm:mt-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//               <input type="text" placeholder="Search medicines..." value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-9 pr-3 py-1.5 sm:py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]" />
//             </div>
//           </div>
//         </div>

//         {filteredInventory.length === 0 ? (
//           <div className="p-6 sm:p-8 text-center text-gray-500">
//             <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" />
//             <p className="text-sm sm:text-base">No medicines found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Medicine</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Category</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Stock</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Price</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                   <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {filteredInventory.slice(0, 5).map((item) => {
//                   const itemStock = item.stockQuantity || item.stock || 0;
//                   const status = getStockStatus(itemStock, item.reorderLevel || 10);
//                   return (
//                     <tr key={item._id || item.id} className="hover:bg-gray-50">
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <p className="font-medium text-xs sm:text-sm">{item.name}</p>
//                         <p className="text-xs text-gray-500">{item.genericName}</p>
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{item.category}</td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
//                         {itemStock} units
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
//                         {item.discountedPrice && item.discountedPrice < item.price ? (
//                           <div className="flex flex-col">
//                             <span className="text-[10px] text-gray-400 line-through">{formatCurrency(item.price)}</span>
//                             <span className="font-bold text-green-600">{formatCurrency(item.discountedPrice)}</span>
//                           </div>
//                         ) : (
//                           <span className="font-medium text-gray-900">{formatCurrency(item.price)}</span>
//                         )}
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${status.color}`}>
//                           <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
//                           {status.label}
//                         </span>
//                       </td>
//                       <td className="px-3 sm:px-4 py-2 sm:py-3">
//                         <div className="flex gap-1 sm:gap-2">
//                           <button 
//                             onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/view/${item._id || item.id}`, { state: { medicine: item } })}
//                             className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                             title="View"
//                           >
//                             <Eye size={14} />
//                           </button>
//                           <button 
//                             onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/edit/${item._id || item.id}`, { state: { medicine: item } })}
//                             className="p-1 text-green-600 hover:bg-green-50 rounded"
//                             title="Edit"
//                           >
//                             <Edit size={14} />
//                           </button>
//                           <button onClick={() => openDeleteModal(item)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Delete">
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedMedicine && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
//           <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-3 rounded-full bg-red-100">
//                 <AlertCircle className="text-red-600" size={24} />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900">Delete Medicine</h2>
//             </div>

//             <p className="text-gray-600 mb-4">
//               Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedMedicine.name}</span>? 
//               This action will remove it from your inventory permanently.
//             </p>

//             {(selectedMedicine.stockQuantity > 0 || selectedMedicine.stock > 0) && (
//               <div className="p-3 bg-amber-50 rounded-lg mb-6 border border-amber-100">
//                 <p className="text-sm text-amber-700 flex items-center gap-2">
//                   <AlertCircle size={16} />
//                   Warning: You still have {selectedMedicine.stockQuantity || selectedMedicine.stock} units in stock.
//                 </p>
//               </div>
//             )}

//             <div className="flex justify-end gap-3">
//               <button 
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleDeleteMedicine}
//                 className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const getDefaultData = (timeRange) => {
//   if (timeRange === 'week') {
//     return [
//       { day: 'Mon', revenue: 0, orders: 0 },
//       { day: 'Tue', revenue: 0, orders: 0 },
//       { day: 'Wed', revenue: 0, orders: 0 },
//       { day: 'Thu', revenue: 0, orders: 0 },
//       { day: 'Fri', revenue: 0, orders: 0 },
//       { day: 'Sat', revenue: 0, orders: 0 },
//       { day: 'Sun', revenue: 0, orders: 0 },
//     ];
//   } else if (timeRange === 'month') {
//     return [
//       { week: 'Week 1', revenue: 0, orders: 0 },
//       { week: 'Week 2', revenue: 0, orders: 0 },
//       { week: 'Week 3', revenue: 0, orders: 0 },
//       { week: 'Week 4', revenue: 0, orders: 0 },
//     ];
//   }
//   return [
//     { month: 'Jan', revenue: 0, orders: 0 },
//     { month: 'Feb', revenue: 0, orders: 0 },
//     { month: 'Mar', revenue: 0, orders: 0 },
//     { month: 'Apr', revenue: 0, orders: 0 },
//     { month: 'May', revenue: 0, orders: 0 },
//     { month: 'Jun', revenue: 0, orders: 0 },
//     { month: 'Jul', revenue: 0, orders: 0 },
//     { month: 'Aug', revenue: 0, orders: 0 },
//     { month: 'Sep', revenue: 0, orders: 0 },
//     { month: 'Oct', revenue: 0, orders: 0 },
//     { month: 'Nov', revenue: 0, orders: 0 },
//     { month: 'Dec', revenue: 0, orders: 0 },
//   ];
// };