// import React from 'react';
// import { Eye, CheckCircle, Clock, Truck } from 'lucide-react';

// const OrdersPage = () => {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-black text-[#1a3a3a]">Customer Orders</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-400 shadow-sm">
//           <p className="text-xs font-bold text-gray-400 uppercase">Pending</p>
//           <h3 className="text-xl font-black text-gray-800">08</h3>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
//           <p className="text-xs font-bold text-gray-400 uppercase">Processing</p>
//           <h3 className="text-xl font-black text-gray-800">12</h3>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-green-400 shadow-sm">
//           <p className="text-xs font-bold text-gray-400 uppercase">Delivered</p>
//           <h3 className="text-xl font-black text-gray-800">145</h3>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl border shadow-sm">
//         <div className="p-6 border-b"><h3 className="font-bold">Recent Orders</h3></div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {[
//                 { id: '#ORD-9921', user: 'Zainab Bibi', status: 'Pending', color: 'text-yellow-600 bg-yellow-100' },
//                 { id: '#ORD-9922', user: 'Umar Hayat', status: 'Shipped', color: 'text-green-600 bg-green-100' },
//               ].map((order, i) => (
//                 <tr key={i}>
//                   <td className="px-6 py-4 font-bold">{order.id}</td>
//                   <td className="px-6 py-4 text-gray-600">{order.user}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${order.color}`}>{order.status}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button className="flex items-center gap-2 text-sm font-bold text-[#2c6774] hover:underline"><Eye size={16} /> View Details</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;





















import React, { useState } from 'react';
import {
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Printer,
  History,
  Save,
  X,
  Download,
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  DollarSign,
  ShoppingCart,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

// --- Sample Data (based on image) ---
const initialOrders = [
  { id: '#ORD-7890', customer: 'John Doe', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Pending', amount: 12500, payment: 'Paid', items: 2 },
  { id: '#ORD-7891', customer: 'John Doe', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Pending', amount: 12500, payment: 'Paid', items: 3 },
  { id: '#ORD-7892', customer: 'Mark Ammer', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'In-Process', amount: 40000, payment: 'Paid', items: 5 },
  { id: '#ORD-7893', customer: 'Frazn Doe', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'In-Process', amount: 16000, payment: 'Cash on Delivery', items: 1 },
  { id: '#ORD-7894', customer: 'Mary Amith', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'In-Process', amount: 33000, payment: 'Cash on Delivery', items: 4 },
  { id: '#ORD-7895', customer: 'Mary Amith', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Delivered', amount: 66000, payment: 'Cash on Delivery', items: 6 },
  { id: '#ORD-7896', customer: 'Fran Doe', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Delivered', amount: 60000, payment: 'Cash on Delivery', items: 3 },
  { id: '#ORD-7897', customer: 'John Doe', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Cancelled', amount: 12500, payment: 'Paid', items: 2 },
  { id: '#ORD-7898', customer: 'Mary Amith', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Cancelled', amount: 12000, payment: 'Cash on Delivery', items: 2 },
  { id: '#ORD-7899', customer: 'John Doe', date: '15 Oct 2023 Sunday', address: '123 Main St, Lahore', status: 'Cancelled', amount: 12000, payment: 'Cash on Delivery', items: 1 },
];

// Line items for the detailed view (based on image)
const sampleLineItems = [
  { medicine: 'Panadol 500mg', generic: 'Paracetamol', brand: 'GSK', qty: 2, unitPrice: 50, subtotal: 100 },
  { medicine: 'Panadol 500mg', generic: 'Paracetamol', brand: 'GSK', qty: 2, unitPrice: 50, subtotal: 100 },
  { medicine: 'Panadol 500mg', generic: 'Mergrane', brand: 'Fostria', qty: 2, unitPrice: 40, subtotal: 80 },
  { medicine: 'Panadol 500mg', generic: 'Coroline', brand: 'Fostria', qty: 1, unitPrice: 50, subtotal: 50 },
];

const customerDetails = {
  phone: '+92 300 1234567',
  email: 'john.doe@example.pk',
  address: '123 Main St, Lahore',
};

// --- Helper Components ---
const StatusBadge = ({ status }) => {
  const config = {
    Pending: { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Clock },
    'In-Process': { color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Package },
    Delivered: { color: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle },
    Cancelled: { color: 'text-red-700 bg-red-50 border-red-200', icon: XCircle },
  };
  const { color, icon: Icon } = config[status] || config['Pending'];
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
      <Icon size={12} /> {status}
    </span>
  );
};

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

// --- Main Component ---
const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null); // for modal
  const [updateModal, setUpdateModal] = useState({ show: false, order: null, note: '', notify: false });
  const [detailsModal, setDetailsModal] = useState({ show: false, order: null });

  // Chart state
  const [timeRange, setTimeRange] = useState('week');
  const [salesChartType, setSalesChartType] = useState('line');
  const [activePieIndex, setActivePieIndex] = useState(0);

  // Stats calculation
  const totalOrders = orders.length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const inProcessCount = orders.filter(o => o.status === 'In-Process').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const cancelledCount = orders.filter(o => o.status === 'Cancelled').length;

  // Sales data for charts (simulated)
  const salesData = {
    day: [
      { time: '08:00', sales: 12500, orders: 8 },
      { time: '10:00', sales: 18900, orders: 12 },
      { time: '12:00', sales: 25400, orders: 18 },
      { time: '14:00', sales: 22100, orders: 15 },
      { time: '16:00', sales: 27800, orders: 22 },
      { time: '18:00', sales: 19500, orders: 14 },
    ],
    week: [
      { day: 'Mon', sales: 125000, orders: 82 },
      { day: 'Tue', sales: 148000, orders: 95 },
      { day: 'Wed', sales: 112000, orders: 73 },
      { day: 'Thu', sales: 189000, orders: 124 },
      { day: 'Fri', sales: 215000, orders: 142 },
      { day: 'Sat', sales: 254000, orders: 168 },
      { day: 'Sun', sales: 198000, orders: 130 },
    ],
    month: [
      { month: 'Week 1', sales: 854000, orders: 560 },
      { month: 'Week 2', sales: 923000, orders: 612 },
      { month: 'Week 3', sales: 788000, orders: 498 },
      { month: 'Week 4', sales: 1025000, orders: 689 },
    ],
  };

  // Category data for pie chart
  const categoryData = [
    { name: 'Pending', value: pendingCount, color: '#fbbf24' },
    { name: 'In-Process', value: inProcessCount, color: '#3b82f6' },
    { name: 'Delivered', value: deliveredCount, color: '#22c55e' },
    { name: 'Cancelled', value: cancelledCount, color: '#ef4444' },
  ].filter(d => d.value > 0);

  const COLORS = ['#fbbf24', '#3b82f6', '#22c55e', '#ef4444'];

  // Helper functions
  const formatCurrency = (amount) => `Rs ${amount.toLocaleString()}`;

  const getCurrentSalesData = () => salesData[timeRange];
  const getDataKey = () => {
    switch (timeRange) {
      case 'day': return 'time';
      case 'week': return 'day';
      case 'month': return 'month';
      default: return 'day';
    }
  };

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

  // Action Handlers
  const handleViewDetails = (order) => {
    setDetailsModal({ show: true, order });
  };

  const handleOpenUpdate = (order) => {
    setUpdateModal({ show: true, order, note: '', notify: false });
  };

  const handleUpdateStatus = () => {
    if (!updateModal.order) return;
    const updatedOrders = orders.map(o =>
      o.id === updateModal.order.id ? { ...o, status: updateModal.order.status } : o
    );
    setOrders(updatedOrders);
    setUpdateModal({ show: false, order: null, note: '', notify: false });
  };

  const handlePrintInvoice = () => {
    alert(`Printing invoice for ${detailsModal.order?.id}`);
  };

  const handleAuditLog = () => {
    alert(`Showing audit log for ${detailsModal.order?.id}`);
  };

  return (
    <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen font-sans animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1a3a3a]">Customer Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all pharmacy orders</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingCart className="text-blue-600" size={20} />}
          change="+12%"
          trend="up"
          subtitle="All time"
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          icon={<Clock className="text-amber-600" size={20} />}
          change="+5%"
          trend="up"
          subtitle="Awaiting action"
        />
        <StatCard
          title="In-Process"
          value={inProcessCount}
          icon={<Package className="text-blue-600" size={20} />}
          change="+8%"
          trend="up"
          subtitle="Being prepared"
        />
        <StatCard
          title="Delivered"
          value={deliveredCount}
          icon={<CheckCircle className="text-green-600" size={20} />}
          change="+15%"
          trend="up"
          subtitle="Completed"
        />
        <StatCard
          title="Cancelled"
          value={cancelledCount}
          icon={<XCircle className="text-red-600" size={20} />}
          change="-2%"
          trend="down"
          subtitle="Returned or cancelled"
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
                  <Activity size={16} />
                </button>
                <button
                  onClick={() => setSalesChartType('bar')}
                  className={`p-2 rounded-md transition-all ${
                    salesChartType === 'bar'
                      ? 'bg-white shadow-sm text-[#2c6774]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 size={16} />
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
                <LineChart data={getCurrentSalesData()} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
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
                    tickFormatter={(value) => `Rs${value / 1000}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
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
                </LineChart>
              ) : salesChartType === 'bar' ? (
                <BarChart data={getCurrentSalesData()} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
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
                    tickFormatter={(value) => `Rs${value / 1000}k`}
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
                </BarChart>
              ) : (
                <AreaChart data={getCurrentSalesData()} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2c6774" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2c6774" stopOpacity={0} />
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
                    tickFormatter={(value) => `Rs${value / 1000}k`}
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
              <p className="text-lg font-bold text-gray-900">Rs 2,458,000</p>
              <p className="text-xs text-green-600">+18.2%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-lg font-bold text-gray-900">1,452</p>
              <p className="text-xs text-green-600">+12.5%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Order Value</p>
              <p className="text-lg font-bold text-gray-900">Rs 1,693</p>
              <p className="text-xs text-green-600">+5.2%</p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-800">Orders by Status</h3>
              <p className="text-sm text-gray-500 mt-1">Current distribution</p>
            </div>
            <PieChartIcon className="text-gray-400" size={20} />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  paddingAngle={2}
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={activePieIndex === index ? '#fff' : 'none'}
                      strokeWidth={activePieIndex === index ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            {categoryData.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                  activePieIndex === index ? 'bg-gray-50' : ''
                }`}
                onMouseEnter={() => setActivePieIndex(index)}
                onMouseLeave={() => setActivePieIndex(0)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  <span className="text-xs text-gray-500">
                    {((item.value / totalOrders) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">All Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Complete list of customer orders</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Address</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell max-w-xs truncate">{order.address}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="p-2 text-gray-400 hover:text-[#2c6774] hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenUpdate(order)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Update Status"
                      >
                        <Package size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Update Order Status */}
      {updateModal.show && updateModal.order && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="font-black text-lg">Update Order Status: {updateModal.order.id}</h2>
              <button onClick={() => setUpdateModal({ show: false, order: null, note: '', notify: false })} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">Customer: <span className="font-bold">{updateModal.order.customer}</span></p>
              <p className="text-sm text-gray-600">Current Status: <StatusBadge status={updateModal.order.status} /></p>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Update To</label>
                <select
                  value={updateModal.order.status}
                  onChange={(e) => setUpdateModal({
                    ...updateModal,
                    order: { ...updateModal.order, status: e.target.value }
                  })}
                  className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="In-Process">In-Process</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Optional Note</label>
                <textarea
                  value={updateModal.note}
                  onChange={(e) => setUpdateModal({ ...updateModal, note: e.target.value })}
                  placeholder="Add notes here..."
                  className="w-full p-3 border rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notify"
                  checked={updateModal.notify}
                  onChange={(e) => setUpdateModal({ ...updateModal, notify: e.target.checked })}
                  className="rounded border-gray-300 text-[#2c6774] focus:ring-[#2c6774]"
                />
                <label htmlFor="notify" className="text-sm text-gray-700">Notify Customer</label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={handleUpdateStatus}
                className="flex-1 bg-[#1a3a3a] text-white font-bold py-3 rounded-xl hover:bg-[#2c6774] transition-colors flex items-center justify-center gap-2"
              >
                <Save size={18} /> Save Status
              </button>
              <button
                onClick={() => setUpdateModal({ show: false, order: null, note: '', notify: false })}
                className="flex-1 border border-gray-300 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Order Details (Improved) */}
      {detailsModal.show && detailsModal.order && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full my-8 shadow-xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="text-xl font-black text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500 mt-1">{detailsModal.order.id} • {detailsModal.order.customer}</p>
              </div>
              <button
                onClick={() => setDetailsModal({ show: false, order: null })}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Customer and Delivery Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Phone size={16} className="text-[#2c6774]" />
                    </div>
                    Customer Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm bg-white p-3 rounded-lg">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-600">{customerDetails.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-white p-3 rounded-lg">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-600">{customerDetails.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin size={16} className="text-[#2c6774]" />
                    </div>
                    Delivery Address
                  </h3>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 flex items-start gap-3">
                      <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{detailsModal.order.address}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Order Date</p>
                  <p className="font-bold text-gray-900 flex items-center gap-2">
                    <Calendar size={16} className="text-[#2c6774]" />
                    {detailsModal.order.date}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <StatusBadge status={detailsModal.order.status} />
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Total Items</p>
                  <p className="font-bold text-gray-900 text-lg">{detailsModal.order.items}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <p className="font-bold text-gray-900">{detailsModal.order.payment}</p>
                </div>
              </div>

              {/* Order Line Items */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800">Order Line Items</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Generic</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Unit Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sampleLineItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{item.medicine}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{item.generic}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{item.brand}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.qty}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">Rs {item.unitPrice}</td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-900">Rs {item.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Totals */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-xl border border-gray-200">
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex justify-between w-full max-w-sm">
                    <span className="text-sm text-gray-600">Order Subtotal:</span>
                    <span className="text-sm font-bold text-gray-900">Rs 11,200</span>
                  </div>
                  <div className="flex justify-between w-full max-w-sm">
                    <span className="text-sm text-gray-600">Shipping Fee:</span>
                    <span className="text-sm font-bold text-gray-900">Rs 300</span>
                  </div>
                  <div className="w-full max-w-sm h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between w-full max-w-sm">
                    <span className="text-base font-bold text-gray-900">Grand Total:</span>
                    <span className="text-xl font-black text-[#1a3a3a]">Rs 11,500</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={handlePrintInvoice}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Printer size={18} /> Print Order Invoice
                </button>
                <button
                  onClick={handleAuditLog}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <History size={18} /> Order Audit Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;