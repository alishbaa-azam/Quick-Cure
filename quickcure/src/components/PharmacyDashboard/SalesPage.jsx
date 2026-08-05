import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, TrendingUp, DollarSign, Users, 
  Package, Calendar, RefreshCw, ArrowUpRight, ArrowDownRight,
  AlertCircle, Award, Clock, User, Eye
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const SalesPage = () => {
  const { id: pharmacyId } = useParams();
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('line');
  const [loading, setLoading] = useState(false);
  
  // MOCK DATA
  const [salesData, setSalesData] = useState({
    totalSales: 245000,
    totalOrders: 156,
    averageOrderValue: 1570,
    newCustomers: 45,
    growth: 12.5,
    dailySales: [
      { day: 'Mon', revenue: 12000, orders: 8 },
      { day: 'Tue', revenue: 18000, orders: 12 },
      { day: 'Wed', revenue: 15000, orders: 10 },
      { day: 'Thu', revenue: 22000, orders: 15 },
      { day: 'Fri', revenue: 28000, orders: 18 },
      { day: 'Sat', revenue: 35000, orders: 22 },
      { day: 'Sun', revenue: 20000, orders: 14 }
    ],
    weeklySales: [
      { week: 'Week 1', revenue: 45000, orders: 30 },
      { week: 'Week 2', revenue: 52000, orders: 35 },
      { week: 'Week 3', revenue: 48000, orders: 32 },
      { week: 'Week 4', revenue: 60000, orders: 40 }
    ],
    monthlyTrend: [
      { month: 'Jan', revenue: 85000, orders: 55 },
      { month: 'Feb', revenue: 92000, orders: 60 },
      { month: 'Mar', revenue: 78000, orders: 50 },
      { month: 'Apr', revenue: 105000, orders: 68 },
      { month: 'May', revenue: 112000, orders: 72 },
      { month: 'Jun', revenue: 98000, orders: 63 },
      { month: 'Jul', revenue: 120000, orders: 78 },
      { month: 'Aug', revenue: 135000, orders: 85 },
      { month: 'Sep', revenue: 110000, orders: 70 },
      { month: 'Oct', revenue: 145000, orders: 90 },
      { month: 'Nov', revenue: 130000, orders: 82 },
      { month: 'Dec', revenue: 160000, orders: 95 }
    ],
    categoryDistribution: [
      { name: 'General', value: 45, percentage: 30 },
      { name: 'Allergy', value: 30, percentage: 20 },
      { name: 'Pain Relief', value: 25, percentage: 17 },
      { name: 'Antibiotics', value: 20, percentage: 13 },
      { name: 'Vitamins', value: 15, percentage: 10 },
      { name: 'Other', value: 15, percentage: 10 }
    ],
    topProducts: [
      { 
        id: 1,
        name: 'Paracetamol 500mg', 
        sales: 45000, 
        quantity: 150, 
        growth: 15,
        category: 'Pain Relief',
        price: 150,
        image: null
      },
      { 
        id: 2,
        name: 'Ibuprofen 400mg', 
        sales: 35000, 
        quantity: 120, 
        growth: 10,
        category: 'Pain Relief',
        price: 200,
        image: null
      },
      { 
        id: 3,
        name: 'Cetirizine 10mg', 
        sales: 28000, 
        quantity: 95, 
        growth: 8,
        category: 'Allergy',
        price: 120,
        image: null
      },
      { 
        id: 4,
        name: 'Amoxicillin 500mg', 
        sales: 22000, 
        quantity: 75, 
        growth: -5,
        category: 'Antibiotics',
        price: 250,
        image: null
      },
      { 
        id: 5,
        name: 'Vitamin C 1000mg', 
        sales: 18000, 
        quantity: 60, 
        growth: 20,
        category: 'Vitamins',
        price: 300,
        image: null
      }
    ],
    recentTransactions: [
      { 
        id: 'ORD-001', 
        customer: 'Ahmed Khan', 
        amount: 2500, 
        date: '2024-01-15', 
        status: 'Completed',
        items: 3,
        paymentMethod: 'Card'
      },
      { 
        id: 'ORD-002', 
        customer: 'Sara Ali', 
        amount: 1800, 
        date: '2024-01-15', 
        status: 'Processing',
        items: 2,
        paymentMethod: 'Cash'
      },
      { 
        id: 'ORD-003', 
        customer: 'Usman Malik', 
        amount: 3500, 
        date: '2024-01-14', 
        status: 'Completed',
        items: 4,
        paymentMethod: 'Card'
      },
      { 
        id: 'ORD-004', 
        customer: 'Fatima Noor', 
        amount: 1200, 
        date: '2024-01-14', 
        status: 'Completed',
        items: 1,
        paymentMethod: 'Cash'
      },
      { 
        id: 'ORD-005', 
        customer: 'Ali Hassan', 
        amount: 4200, 
        date: '2024-01-13', 
        status: 'Cancelled',
        items: 5,
        paymentMethod: 'Card'
      },
      { 
        id: 'ORD-006', 
        customer: 'Zara Malik', 
        amount: 800, 
        date: '2024-01-13', 
        status: 'Completed',
        items: 1,
        paymentMethod: 'Cash'
      },
      { 
        id: 'ORD-007', 
        customer: 'Hamza Ali', 
        amount: 1500, 
        date: '2024-01-12', 
        status: 'Processing',
        items: 2,
        paymentMethod: 'Card'
      },
      { 
        id: 'ORD-008', 
        customer: 'Ayesha Khan', 
        amount: 2800, 
        date: '2024-01-12', 
        status: 'Completed',
        items: 3,
        paymentMethod: 'Cash'
      }
    ]
  });

  const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047', '#1e5f6b', '#f59e0b', '#10b981', '#ef4444'];

  const getCurrentData = () => {
    switch(timeRange) {
      case 'week': return salesData.dailySales;
      case 'month': return salesData.weeklySales;
      case 'year': return salesData.monthlyTrend;
      default: return salesData.dailySales;
    }
  };

  const getDataKey = () => {
    switch(timeRange) {
      case 'week': return 'day';
      case 'month': return 'week';
      case 'year': return 'month';
      default: return 'day';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rs 0';
    return `Rs ${Number(amount).toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Shipped': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' || entry.name === 'Sales' 
                ? formatCurrency(entry.value) 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sales data...</p>
        </div>
      </div>
    );
  }

  const currentData = getCurrentData();
  const dataKey = getDataKey();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Sales Analytics</h1>
          <p className="text-gray-600">Monitor your pharmacy sales performance</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium text-sm"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(salesData.totalSales)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="text-green-500" size={16} />
                <span className="text-sm text-green-600">{salesData.growth}%</span>
                <span className="text-xs text-gray-500 ml-1">overall</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <DollarSign className="text-blue-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{salesData.totalOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <ShoppingCart className="text-purple-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(salesData.averageOrderValue)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <TrendingUp className="text-green-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customers</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{salesData.newCustomers}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50">
              <Users className="text-amber-600" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sales Trend</h2>
              <p className="text-sm text-gray-600">Revenue over time</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-md transition-colors ${chartType === 'line' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                >
                  <TrendingUp size={18} />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-md transition-colors ${chartType === 'bar' ? 'bg-white shadow-sm text-[#2c6774]' : 'text-gray-600'}`}
                >
                  <BarChart size={18} />
                </button>
              </div>

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
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey={dataKey} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#2c6774" strokeWidth={3} />
                  <Line type="monotone" dataKey="orders" name="Orders" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              ) : (
                <BarChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey={dataKey} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#2c6774" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="orders" name="Orders" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Category Distribution</h2>
              <p className="text-sm text-gray-600">Products by category</p>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {salesData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            {salesData.categoryDistribution.slice(0, 6).map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-xs text-gray-600 truncate">{category.name}</span>
                <span className="text-xs font-medium ml-auto">{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products - FIXED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-[#2c6774]/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="text-[#2c6774]" size={20} />
                  Top Selling Products
                </h2>
                <p className="text-sm text-gray-600 mt-1">Highest revenue generating products</p>
              </div>
              <span className="text-xs bg-[#2c6774] text-white px-3 py-1 rounded-full">
                {salesData.topProducts.length} Products
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
            {salesData.topProducts.length > 0 ? (
              salesData.topProducts.map((product, index) => (
                <div key={product.id || index} className="p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        index === 2 ? 'bg-amber-100 text-amber-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate" title={product.name}>
                          {product.name}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                          <span>{product.quantity || 0} units</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-[#2c6774] font-medium">{formatCurrency(product.sales || 0)}</span>
                          {product.category && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{product.category}</span>
                            </>
                          )}
                        </div>
                      </div>
                      {product.growth !== undefined && product.growth !== 0 && (
                        <div className="flex items-center gap-1 text-xs flex-shrink-0">
                          {product.growth > 0 ? (
                            <ArrowUpRight className="text-green-500" size={14} />
                          ) : (
                            <ArrowDownRight className="text-red-500" size={14} />
                          )}
                          <span className={product.growth > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                            {Math.abs(product.growth)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {salesData.topProducts.length > 0 && salesData.topProducts[0]?.sales > 0 && (
                    <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#2c6774] to-[#5c878f] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max((product.sales / salesData.topProducts[0].sales) * 100, 3)}%` }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Package className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium">No products found</p>
                <p className="text-xs text-gray-400 mt-1">Add products to see sales data</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders - FIXED */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50/50 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="text-purple-600" size={20} />
                  Recent Orders
                </h2>
                <p className="text-sm text-gray-600 mt-1">Latest orders placed by customers</p>
              </div>
              <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                {salesData.recentTransactions.length} Orders
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
            {salesData.recentTransactions.length > 0 ? (
              salesData.recentTransactions.map((transaction, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 text-sm">{transaction.id}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <User size={12} className="text-gray-400" />
                        <p className="text-sm text-gray-600 truncate">{transaction.customer}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{transaction.date}</span>
                        </div>
                        {transaction.items && (
                          <span className="text-xs text-gray-400">
                            {transaction.items} {transaction.items === 1 ? 'item' : 'items'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-gray-900 text-sm">{formatCurrency(transaction.amount)}</p>
                      {transaction.paymentMethod && (
                        <p className="text-xs text-gray-400">{transaction.paymentMethod}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium">No orders yet</p>
                <p className="text-xs text-gray-400 mt-1">Orders will appear here once placed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;