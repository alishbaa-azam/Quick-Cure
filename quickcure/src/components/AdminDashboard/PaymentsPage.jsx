import React, { useState, useEffect } from 'react';
import { DollarSign, Search, RefreshCw, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { message, Tooltip } from 'antd';
import { getAdminStats, getAllOrders, getAllAppointments, getAllLabBookings } from './adminApi';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047', '#f59e0b'];

export default function PaymentsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const statsRes = await getAdminStats();
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Error:', err);
      message.error('Failed to load payment data');
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
          <p className="mt-4 text-gray-600">Loading payment data...</p>
        </div>
      </div>
    );
  }

  const revenue = stats?.revenue || {};
  const appointments = stats?.appointments || {};
  const orders = stats?.orders || {};
  const monthlyData = (revenue.monthlyBreakdown || []).reverse().map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    revenue: item.revenue,
    orders: item.orders
  }));

  const totalMonthly = (revenue.monthlyAppointment || 0) + (revenue.monthlyOrder || 0);
  const totalYearly = (revenue.yearlyAppointment || 0) + (revenue.yearlyOrder || 0);

  // Revenue sources for pie
  const revenueSources = [
    { name: 'Appointments', value: revenue.yearlyAppointment || 0 },
    { name: 'Medicine Orders', value: revenue.yearlyOrder || 0 },
  ].filter(s => s.value > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payments & Revenue</h1>
          <p className="text-gray-600 mt-1">Financial overview of the healthcare platform</p>
        </div>
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalMonthly)}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={14} /> From appointments & orders
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Yearly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalYearly)}</p>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <Calendar size={14} /> Current year
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Appointment Fees</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(revenue.monthlyAppointment || 0)}</p>
              <p className="text-xs text-amber-600 mt-1">{appointments.completed || 0} completed bookings</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50">
              <Calendar size={24} className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Order Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(revenue.monthlyOrder || 0)}</p>
              <p className="text-xs text-purple-600 mt-1">{orders.delivered || 0} deliveries</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <ShoppingCartIcon size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Revenue Trend</h3>
            <div className="flex gap-2">
              {['monthly', 'yearly'].map(p => (
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
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData.length > 0 ? monthlyData : getDefaultMonths()}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2c6774" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2c6774" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#2c6774" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Revenue Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSources.length > 0 ? revenueSources : [{ name: 'No Data', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  paddingAngle={2}
                >
                  {(revenueSources.length > 0 ? revenueSources : [{ name: 'No Data', value: 1 }]).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Appointment Payments</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Bookings</span>
              <span className="font-semibold">{appointments.total || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed (Paid)</span>
              <span className="font-semibold text-green-600">{appointments.completed || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="font-semibold text-amber-600">{appointments.pending || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cancelled</span>
              <span className="font-semibold text-red-600">{appointments.cancelled || 0}</span>
            </div>
            <div className="pt-3 border-t flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">Total Revenue</span>
              <span className="font-bold text-[#2c6774]">{formatCurrency(revenue.yearlyAppointment || 0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Order Payments</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="font-semibold">{orders.total || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Delivered (Paid)</span>
              <span className="font-semibold text-green-600">{orders.delivered || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="font-semibold text-amber-600">{orders.pending || 0}</span>
            </div>
            <div className="pt-3 border-t flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">Total Revenue</span>
              <span className="font-bold text-[#2c6774]">{formatCurrency(revenue.yearlyOrder || 0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Quick Summary</h3>
          <div className="space-y-4">
            <div className="bg-[#2c6774]/5 p-4 rounded-xl">
              <p className="text-xs text-[#2c6774] font-medium uppercase tracking-wider">Monthly Total</p>
              <p className="text-2xl font-bold text-[#2c6774] mt-1">{formatCurrency(totalMonthly)}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl">
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Yearly Total</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totalYearly)}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-xs text-amber-600 font-medium uppercase tracking-wider">Platform Growth</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {stats?.users?.total || 0} Users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ShoppingCartIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const getDefaultMonths = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(m => ({ name: m, revenue: 0, orders: 0 }));
};