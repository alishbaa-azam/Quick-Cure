import React, { useState, useEffect } from 'react';
import { BarChart3, Download, Calendar, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { message } from 'antd';
import { getAdminStats } from './adminApi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047', '#f59e0b', '#10b981', '#ef4444'];

export default function ReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('overview');
  const [timeRange, setTimeRange] = useState('year');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAdminStats();
      if (res.success) setStats(res.data);
    } catch (err) {
      console.error('Error:', err);
      message.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `Rs ${(amount || 0).toLocaleString()}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  const revenue = stats?.revenue || {};
  const users = stats?.users || {};
  const appointments = stats?.appointments || {};
  const orders = stats?.orders || {};
  const entities = stats?.entities || {};

  // Monthly breakdown for chart
  const monthlyData = (revenue.monthlyBreakdown || []).reverse().map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    revenue: item.revenue,
    orders: item.orders
  }));

  // Platform metrics
  const platformMetrics = [
    { metric: 'Total Users', value: users.total || 0, change: '+12%', trend: 'up' },
    { metric: 'Active Doctors', value: entities.doctors || 0, change: '+5%', trend: 'up' },
    { metric: 'Laboratories', value: entities.labs || 0, change: '0%', trend: 'neutral' },
    { metric: 'Pharmacies', value: entities.pharmacies || 0, change: '+8%', trend: 'up' },
    { metric: 'Appointments', value: appointments.total || 0, change: '+15%', trend: 'up' },
    { metric: 'Orders Delivered', value: orders.delivered || 0, change: '+10%', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed reports and insights about the platform</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchData} className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm inline-flex gap-2">
        {['overview', 'users', 'revenue', 'growth'].map(type => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              reportType === type ? 'bg-[#2c6774] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Time Period */}
      <div className="flex gap-2">
        {['week', 'month', 'quarter', 'year'].map(p => (
          <button
            key={p}
            onClick={() => setTimeRange(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
              timeRange === p ? 'bg-[#2c6774] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Platform Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {platformMetrics.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">{item.metric}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{item.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs ${
              item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {item.trend === 'up' ? <TrendingUp size={12} /> : item.trend === 'down' ? <TrendingDown size={12} /> : null}
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Revenue Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData.length > 0 ? monthlyData : getDefaultMonths()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#2c6774" radius={[4, 4, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Roles Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">User Distribution by Role</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Regular Users', value: Math.max(0, (users.total || 0) - (users.doctors||0) - (users.labs||0) - (users.pharmacies||0) - (users.admins||0)) },
                    { name: 'Doctors', value: users.doctors || 0 },
                    { name: 'Labs', value: users.labs || 0 },
                    { name: 'Pharmacies', value: users.pharmacies || 0 },
                    { name: 'Admins', value: users.admins || 0 },
                  ].filter(d => d.value > 0)}
                  cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Stats Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800">Appointment Summary</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[
                { label: 'Total Bookings', value: appointments.total || 0, color: '#2c6774' },
                { label: 'Completed', value: appointments.completed || 0, color: '#10b981' },
                { label: 'Pending', value: appointments.pending || 0, color: '#f59e0b' },
                { label: 'Cancelled', value: appointments.cancelled || 0, color: '#ef4444' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800">Revenue Breakdown</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800">Appointment Revenue</p>
                  <p className="text-xs text-blue-600">Yearly</p>
                </div>
                <span className="font-bold text-blue-800">{formatCurrency(revenue.yearlyAppointment || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-emerald-800">Order Revenue</p>
                  <p className="text-xs text-emerald-600">Yearly</p>
                </div>
                <span className="font-bold text-emerald-800">{formatCurrency(revenue.yearlyOrder || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-amber-800">Monthly Revenue</p>
                  <p className="text-xs text-amber-600">Current month</p>
                </div>
                <span className="font-bold text-amber-800">
                  {formatCurrency((revenue.monthlyAppointment || 0) + (revenue.monthlyOrder || 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getDefaultMonths = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(m => ({ name: m, revenue: 0, orders: 0 }));
};