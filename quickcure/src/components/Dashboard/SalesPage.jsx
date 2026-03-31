
// charts
// SalesPage.js - WITH PROPER CHARTS

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, TrendingUp, DollarSign, Users, 
  Package, Calendar, Filter, Download, Search,
  ChevronDown, MoreVertical, Eye, Printer,
  IndianRupee, BarChart, PieChart, LineChart,
  Plus, RefreshCw, ArrowUpRight, ArrowDownRight,
  X, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  Area,
  AreaChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Sector
} from 'recharts';

const SalesPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Mock sales data
  const [salesData, setSalesData] = useState({
    totalSales: 25480.50,
    totalOrders: 156,
    averageOrderValue: 163.34,
    newCustomers: 24,
    growth: 8.5,
    
    // Daily sales for line/bar chart
    dailySales: [
      { day: 'Mon', sales: 1250, orders: 8, revenue: 1250 },
      { day: 'Tue', sales: 1890, orders: 12, revenue: 1890 },
      { day: 'Wed', sales: 2150, orders: 14, revenue: 2150 },
      { day: 'Thu', sales: 1780, orders: 11, revenue: 1780 },
      { day: 'Fri', sales: 2540, orders: 16, revenue: 2540 },
      { day: 'Sat', sales: 3120, orders: 20, revenue: 3120 },
      { day: 'Sun', sales: 2850, orders: 18, revenue: 2850 }
    ],
    
    // Weekly data
    weeklySales: [
      { week: 'Week 1', sales: 12500, orders: 82, revenue: 12500 },
      { week: 'Week 2', sales: 14800, orders: 95, revenue: 14800 },
      { week: 'Week 3', sales: 11200, orders: 73, revenue: 11200 },
      { week: 'Week 4', sales: 18900, orders: 124, revenue: 18900 }
    ],
    
    // Monthly trend
    monthlyTrend: [
      { month: 'Jan', sales: 18500, orders: 120, revenue: 18500 },
      { month: 'Feb', sales: 21000, orders: 135, revenue: 21000 },
      { month: 'Mar', sales: 25480, orders: 156, revenue: 25480 },
      { month: 'Apr', sales: 19800, orders: 142, revenue: 19800 },
      { month: 'May', sales: 23400, orders: 168, revenue: 23400 },
      { month: 'Jun', sales: 28900, orders: 185, revenue: 28900 }
    ],
    
    // Category distribution for pie chart
    categoryDistribution: [
      { name: 'Pain Relief', value: 4520, percentage: 28 },
      { name: 'Antibiotics', value: 3820, percentage: 24 },
      { name: 'Vitamins', value: 2890, percentage: 18 },
      { name: 'Allergy', value: 2150, percentage: 13 },
      { name: 'Cardiac', value: 1890, percentage: 12 },
      { name: 'Others', value: 810, percentage: 5 }
    ],
    
    topProducts: [
      { name: 'Paracetamol', sales: 4520.25, quantity: 156, growth: 12 },
      { name: 'Amoxicillin', sales: 3820.50, quantity: 89, growth: 8 },
      { name: 'Vitamin C', sales: 2890.75, quantity: 124, growth: 15 },
      { name: 'Cetirizine', sales: 2150.25, quantity: 167, growth: 5 },
      { name: 'Metformin', sales: 1890.80, quantity: 67, growth: 10 }
    ],
    
    recentTransactions: [
      { id: 'ORD-001', customer: 'John Smith', amount: 125.50, date: '2024-03-28', status: 'Completed' },
      { id: 'ORD-002', customer: 'Sarah Johnson', amount: 89.99, date: '2024-03-28', status: 'Completed' },
      { id: 'ORD-003', customer: 'Mike Brown', amount: 215.25, date: '2024-03-27', status: 'Completed' },
      { id: 'ORD-004', customer: 'Emily Davis', amount: 156.75, date: '2024-03-27', status: 'Processing' },
      { id: 'ORD-005', customer: 'Robert Wilson', amount: 189.50, date: '2024-03-26', status: 'Completed' },
      { id: 'ORD-006', customer: 'Lisa Miller', amount: 78.25, date: '2024-03-26', status: 'Completed' },
      { id: 'ORD-007', customer: 'David Taylor', amount: 245.00, date: '2024-03-25', status: 'Completed' },
      { id: 'ORD-008', customer: 'Jessica Lee', amount: 112.80, date: '2024-03-25', status: 'Completed' }
    ]
  });

  // Colors for charts
  const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047', '#1e5f6b'];
  
  // Get current data based on timeRange
  const getCurrentData = () => {
    switch(timeRange) {
      case 'week':
        return salesData.dailySales;
      case 'month':
        return salesData.weeklySales;
      case 'year':
        return salesData.monthlyTrend;
      default:
        return salesData.dailySales;
    }
  };

  // Get data key based on timeRange
  const getDataKey = () => {
    switch(timeRange) {
      case 'week':
        return 'day';
      case 'month':
        return 'week';
      case 'year':
        return 'month';
      default:
        return 'day';
    }
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Sales' || entry.name === 'Revenue' 
                ? formatCurrency(entry.value) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Active shape for pie chart
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-sm font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-lg font-bold">
          {formatCurrency(value)}
        </text>
        <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#666" className="text-xs">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 15}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Sales Analytics</h1>
          <p className="text-gray-600">Monitor your pharmacy sales performance</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Link
            to="/PharmacyDashboard/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <Package size={18} />
            <span className="hidden sm:inline">Products</span>
          </Link>
          <Link
            to="/PharmacyDashboard/orders"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Orders</span>
          </Link>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(salesData.totalSales)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="text-green-500" size={16} />
                <span className="text-sm text-green-600">{salesData.growth}%</span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <DollarSign className="text-blue-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{salesData.totalOrders}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="text-green-500" size={16} />
                <span className="text-sm text-green-600">12.5%</span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <ShoppingCart className="text-purple-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(salesData.averageOrderValue)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="text-green-500" size={16} />
                <span className="text-sm text-green-600">4.2%</span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <TrendingUp className="text-green-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Customers</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{salesData.newCustomers}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="text-green-500" size={16} />
                <span className="text-sm text-green-600">18%</span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50">
              <Users className="text-amber-600" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Sales Chart - Takes 2/3 width on large screens */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sales Trend</h2>
              <p className="text-sm text-gray-600">Revenue over time</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Chart Type Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-md transition-colors ${chartType === 'line' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                  title="Line Chart"
                >
                  <LineChart size={18} />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-md transition-colors ${chartType === 'bar' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                  title="Bar Chart"
                >
                  <BarChart size={18} />
                </button>
                <button
                  onClick={() => setChartType('area')}
                  className={`p-2 rounded-md transition-colors ${chartType === 'area' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                  title="Area Chart"
                >
                  <TrendingUp size={18} />
                </button>
              </div>

              {/* Time Range Selector */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeRange(period)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      timeRange === period
                        ? 'bg-[#2c6774] text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Chart Container */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <RechartsLineChart
                  data={getCurrentData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    tickFormatter={(value) => `Rs.${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue" 
                    stroke="#2c6774" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#2c6774', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    name="Orders" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#f59e0b' }}
                  />
                </RechartsLineChart>
              ) : chartType === 'bar' ? (
                <RechartsBarChart
                  data={getCurrentData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    tickFormatter={(value) => `Rs.${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#2c6774" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="orders" name="Orders" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                </RechartsBarChart>
              ) : (
                <AreaChart
                  data={getCurrentData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2c6774" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2c6774" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                    tickFormatter={(value) => `Rs.${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue" 
                    stroke="#2c6774" 
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sales by Category</h2>
              <p className="text-sm text-gray-600">Revenue distribution</p>
            </div>
            <PieChart className="text-gray-400" size={20} />
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={salesData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {salesData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {salesData.categoryDistribution.slice(0, 4).map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-xs text-gray-600">{category.name}</span>
                <span className="text-xs font-medium ml-auto">{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
                <p className="text-sm text-gray-600">Best selling products by revenue</p>
              </div>
              <Link 
                to="/PharmacyDashboard/products"
                className="text-sm text-[#2c6774] hover:text-[#174047] font-medium flex items-center gap-1"
              >
                View All <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {salesData.topProducts.map((product, index) => (
              <div key={index} className="p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Package className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.quantity} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatCurrency(product.sales)}</div>
                    <div className="flex items-center gap-1 text-xs justify-end">
                      {product.growth > 0 ? (
                        <ArrowUpRight className="text-green-500" size={12} />
                      ) : (
                        <ArrowDownRight className="text-red-500" size={12} />
                      )}
                      <span className={product.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2c6774] rounded-full"
                    style={{ width: `${(product.sales / salesData.topProducts[0].sales) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                <p className="text-sm text-gray-600">Latest sales transactions</p>
              </div>
              <Link 
                to="/PharmacyDashboard/orders"
                className="text-sm text-[#2c6774] hover:text-[#174047] font-medium flex items-center gap-1"
              >
                View All <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {salesData.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-gray-900">{transaction.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{transaction.customer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{transaction.date}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-gray-900">{formatCurrency(transaction.amount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl flex items-center gap-3">
            <div className="w-6 h-6 border-3 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Refreshing data...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;