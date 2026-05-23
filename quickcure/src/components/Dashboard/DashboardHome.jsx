// src/components/Dashboard/DashboardHome.jsx
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
      fetchAllData();
    } catch (error) {
      message.error('Failed to delete medicine');
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <Link to={`/pharmacy/dashboard/${pharmacyId}/orders`} className="text-xs sm:text-sm text-[#2c6774] hover:underline flex items-center gap-1">
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

      {/* Delete Confirmation Modal */}
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