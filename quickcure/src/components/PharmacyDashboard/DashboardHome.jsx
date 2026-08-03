import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, ShoppingCart, Clock, AlertCircle, DollarSign, 
  Package, Search, Plus, Edit, Trash2, Eye,
  BarChart, LineChart, PieChart, RefreshCw,
  ArrowUpRight, Image as ImageIcon, 
  Activity, Users, Calendar, ChevronRight,
  Award, BadgeCheck, Store, Settings, Bell,
  Menu, X, Filter, Download, Printer
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
  Sector,
  ComposedChart
} from 'recharts';

const COLORS = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

const GRADIENT_COLORS = ['#2c6774', '#3a7a89', '#4d8d9d', '#5fa0b1', '#72b3c5'];

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
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
  const [salesLoading, setSalesLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth < 1024);
    };
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

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return '⏳';
      case 'processing': return '🔄';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const getStockStatus = (stock, reorderLevel = 10) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700', dot: 'bg-red-500', icon: '🔴' };
    if (stock <= 5) return { label: 'Critical', color: 'bg-red-200 text-red-800', dot: 'bg-red-600', icon: '⚠️' };
    if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', icon: '🟡' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700', dot: 'bg-green-500', icon: '🟢' };
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
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100 backdrop-blur-sm">
          <p className="font-semibold text-gray-900 text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm mt-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-semibold" style={{ color: entry.color }}>
                {entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.value}
              </span>
            </div>
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
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-[#2c6774]/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
          <p className="text-sm text-gray-400">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (error === 'Pharmacy not registered') {
    return (
      <div className="min-h-[500px] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="relative inline-block">
            <Package className="w-20 h-20 text-[#2c6774] mx-auto mb-4" />
            <div className="absolute -top-2 -right-2">
              <BadgeCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Pharmacy Dashboard</h2>
          <p className="text-gray-600 mb-6">Get started by registering your pharmacy and start managing your business.</p>
          <Link to="/pharmacy/register" className="inline-flex items-center gap-2 px-8 py-3 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] transition-all shadow-lg hover:shadow-xl">
            Register Pharmacy
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[500px] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="p-4 bg-red-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchAllData} className="inline-flex items-center gap-2 px-6 py-3 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] transition-all">
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#2c6774]/10 rounded-xl">
                  <Store className="w-6 h-6 text-[#2c6774]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {pharmacy?.name || 'Pharmacy Dashboard'}
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Welcome back! Here's your overview</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={fetchAllData} disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-all shadow-sm">
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline text-sm font-medium">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders || 0}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+12.5%</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform">
                <ShoppingCart className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalRevenue || 0)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+8.3%</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 group-hover:scale-110 transition-transform">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingOrders || 0}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock size={14} className="text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium">Needs attention</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 group-hover:scale-110 transition-transform">
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.lowStockCount || 0}</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-xs text-red-600 font-medium">Reorder soon</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 group-hover:scale-110 transition-transform">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Sales Overview</h2>
                <p className="text-sm text-gray-500">Revenue trends over time</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button onClick={() => setChartType('line')}
                    className={`p-2 rounded-lg transition-all ${chartType === 'line' ? 'bg-white shadow-md text-[#2c6774]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <LineChart size={18} />
                  </button>
                  <button onClick={() => setChartType('bar')}
                    className={`p-2 rounded-lg transition-all ${chartType === 'bar' ? 'bg-white shadow-md text-[#2c6774]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <BarChart size={18} />
                  </button>
                  <button onClick={() => setChartType('area')}
                    className={`p-2 rounded-lg transition-all ${chartType === 'area' ? 'bg-white shadow-md text-[#2c6774]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <TrendingUp size={18} />
                  </button>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['week', 'month', 'year'].map((period) => (
                    <button key={period} onClick={() => setTimeRange(period)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        timeRange === period ? 'bg-[#2c6774] text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
                      }`}>
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              {salesLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-10 h-10 border-3 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <RechartsLineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2c6774" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2c6774" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `Rs ${value}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" strokeWidth={3} 
                        dot={{ fill: '#2c6774', r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="orders" name="Orders" stroke="#f59e0b" strokeWidth={3} 
                        dot={{ fill: '#f59e0b', r: 4 }} activeDot={{ r: 6 }} />
                    </RechartsLineChart>
                  ) : chartType === 'bar' ? (
                    <RechartsBarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `Rs ${value}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#2c6774" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="orders" name="Orders" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </RechartsBarChart>
                  ) : (
                    <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2c6774" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2c6774" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey={getDataKey()} axisLine={false} tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickFormatter={(value) => `Rs ${value}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" 
                        fill="url(#areaGradient)" strokeWidth={3} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Order Status Distribution Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Order Status</h2>
                <p className="text-sm text-gray-500">Distribution by status</p>
              </div>
              <div className="p-2 bg-[#2c6774]/10 rounded-xl">
                <PieChart className="text-[#2c6774]" size={20} />
              </div>
            </div>
            
            <div className="h-[240px] w-full">
              {orderStatusDistribution.length === 0 || orderStatusDistribution.every(d => d.value === 0) ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Package className="w-12 h-12 mb-2" />
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
                      innerRadius={isMobile ? 50 : 60}
                      outerRadius={isMobile ? 70 : 85}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      paddingAngle={3}
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
            <div className="mt-4 grid grid-cols-2 gap-2">
              {orderStatusDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[item.name.toLowerCase()] || COLORS.pending }} />
                  <span className="text-xs text-gray-600 flex-1">{item.name}</span>
                  <span className="text-xs font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Recent Orders</h3>
              <p className="text-sm text-gray-500">Latest transactions from your pharmacy</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <Link to={`/pharmacy/dashboard/${pharmacyId}/orders`} 
                className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-all text-sm font-medium">
                View All
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No orders yet</p>
              <p className="text-sm text-gray-400 mt-1">Orders will appear here once customers start purchasing</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#2c6774]">
                            {order.orderNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#2c6774]/20 to-[#2c6774]/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-[#2c6774]">
                              {order.customer?.name?.charAt(0) || 'C'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">
                            {order.customer?.name || 'Customer'}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {order.totalItems} items {order.totalTablets > 0 && `(${order.totalTablets} tablets)`}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          <span>{getStatusIcon(order.status)}</span>
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all">
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
              <div className="p-4 bg-amber-50 rounded-xl mb-6 border border-amber-200">
                <p className="text-sm text-amber-700 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Warning: You still have {selectedMedicine.stockQuantity || selectedMedicine.stock} units in stock.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteMedicine}
                className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
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