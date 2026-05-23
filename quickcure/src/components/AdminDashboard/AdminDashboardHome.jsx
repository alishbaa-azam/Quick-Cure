import React, { useState, useEffect } from 'react';
import {
  Users, Stethoscope, Microscope, Pill, Calendar,
  ShoppingCart, DollarSign, TrendingUp, Activity,
  UserPlus, AlertCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { getAdminStats } from './adminApi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const COLORS = ['#2c6774', '#5c878f', '#9fbfc5', '#c0d3dc', '#174047', '#f59e0b'];

export default function AdminDashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getAdminStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError('Failed to load stats');
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => `Rs ${(amount || 0).toLocaleString()}`;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'completed': case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const userStats = stats?.users || {};
  const apptStats = stats?.appointments || {};
  const orderStats = stats?.orders || {};
  const entityStats = stats?.entities || {};
  const revenueStats = stats?.revenue || {};

  const totalRevenue = (revenueStats.monthlyAppointment || 0) + (revenueStats.monthlyOrder || 0);
  const totalYearlyRevenue = (revenueStats.yearlyAppointment || 0) + (revenueStats.yearlyOrder || 0);

  // Prepare revenue breakdown chart data
  const monthlyData = (revenueStats.monthlyBreakdown || []).reverse().map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    revenue: item.revenue,
    orders: item.orders
  }));

  // Role distribution for pie chart
  const roleData = [
    { name: 'Users', value: Math.max(0, (userStats.total || 0) - (userStats.doctors || 0) - (userStats.labs || 0) - (userStats.pharmacies || 0) - (userStats.admins || 0)) },
    { name: 'Doctors', value: userStats.doctors || 0 },
    { name: 'Labs', value: userStats.labs || 0 },
    { name: 'Pharmacies', value: userStats.pharmacies || 0 },
    { name: 'Admins', value: userStats.admins || 0 },
  ].filter(d => d.value > 0);

  // Entity comparison data
  const entityData = [
    { name: 'Doctors', count: entityStats.doctors || 0, fill: '#2c6774' },
    { name: 'Labs', count: entityStats.labs || 0, fill: '#5c878f' },
    { name: 'Pharmacies', count: entityStats.pharmacies || 0, fill: '#9fbfc5' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Complete overview of QuickCure Healthcare system</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchStats} 
            className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2"
          >
            <Activity size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards Row 1 - User Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value={userStats.total || 0}
          subtitle={`${userStats.recent?.length || 0} new this month`}
          icon={<Users size={24} />}
          color="bg-blue-500"
          trend="up"
        />
        <StatCard 
          title="Doctors" 
          value={userStats.doctors || 0}
          subtitle="Registered professionals"
          icon={<Stethoscope size={24} />}
          color="bg-emerald-500"
        />
        <StatCard 
          title="Laboratories" 
          value={userStats.labs || 0}
          subtitle="Active labs"
          icon={<Microscope size={24} />}
          color="bg-purple-500"
        />
        <StatCard 
          title="Pharmacies" 
          value={userStats.pharmacies || 0}
          subtitle="Registered pharmacies"
          icon={<Pill size={24} />}
          color="bg-amber-500"
        />
      </div>

      {/* Stats Cards Row 2 - Operations */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Appointments" 
          value={apptStats.total || 0}
          subtitle={`${apptStats.pending || 0} pending`}
          icon={<Calendar size={24} />}
          color="bg-rose-500"
        />
        <StatCard 
          title="Medicine Orders" 
          value={orderStats.total || 0}
          subtitle={`${orderStats.pending || 0} pending`}
          icon={<ShoppingCart size={24} />}
          color="bg-indigo-500"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={formatCurrency(totalRevenue)}
          subtitle="This month"
          icon={<DollarSign size={24} />}
          color="bg-green-600"
          trend="up"
        />
        <StatCard 
          title="Yearly Revenue" 
          value={formatCurrency(totalYearlyRevenue)}
          subtitle="This year"
          icon={<TrendingUp size={24} />}
          color="bg-cyan-600"
          trend="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Revenue Overview</h3>
            <div className="flex gap-2">
              {['monthly', 'yearly'].map(period => (
                <button
                  key={period}
                  onClick={() => setTimeRange(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
                    timeRange === period 
                      ? 'bg-[#2c6774] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {timeRange === 'monthly' ? (
                <AreaChart data={monthlyData.length > 0 ? monthlyData : getDefaultMonthlyData()}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2c6774" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2c6774" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#2c6774" fill="url(#colorRevenue)" strokeWidth={2} name="Revenue" />
                </AreaChart>
              ) : (
                <BarChart data={[
                  { name: 'Appointments', revenue: revenueStats.yearlyAppointment || 0 },
                  { name: 'Orders', revenue: revenueStats.yearlyOrder || 0 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#2c6774" radius={[4, 4, 0, 0]} name="Revenue" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Role Distribution - Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">User Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData.length > 0 ? roleData : [{ name: 'No Data', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  paddingAngle={2}
                >
                  {(roleData.length > 0 ? roleData : [{ name: 'No Data', value: 1 }]).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Entity Stats & Appointments Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entity Comparison */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Registered Entities</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Count">
                  {entityData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Status */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Appointment Status</h3>
          <div className="space-y-4">
            <StatusBar 
              label="Total" 
              value={apptStats.total || 0} 
              total={apptStats.total || 1} 
              color="#2c6774" 
            />
            <StatusBar 
              label="Pending" 
              value={apptStats.pending || 0} 
              total={apptStats.total || 1} 
              color="#f59e0b" 
            />
            <StatusBar 
              label="Completed" 
              value={apptStats.completed || 0} 
              total={apptStats.total || 1} 
              color="#10b981" 
            />
            <StatusBar 
              label="Cancelled" 
              value={apptStats.cancelled || 0} 
              total={apptStats.total || 1} 
              color="#ef4444" 
            />

            {/* Quick Numbers */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-xs text-blue-600 font-medium">Lab Bookings</p>
                <p className="text-2xl font-bold text-blue-800">{entityStats.labBookings || 0}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl">
                <p className="text-xs text-emerald-600 font-medium">Delivered Orders</p>
                <p className="text-2xl font-bold text-emerald-800">{orderStats.delivered || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Signups</h3>
          <span className="text-xs text-gray-500">Last 10 users</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(userStats.recent || []).map((user, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-sm font-medium">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'doctor' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'lab' ? 'bg-emerald-100 text-emerald-700' :
                      user.role === 'pharmacy' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!userStats.recent || userStats.recent.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No users registered yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== SUB-COMPONENTS ====================
const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium truncate">{title}</p>
        <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 shrink-0 ml-3`}>
        <div className={`${color.replace('bg-', 'text-')}`}>
          {icon}
        </div>
      </div>
    </div>
    {trend && (
      <div className="mt-3 flex items-center gap-1 text-xs">
        {trend === 'up' ? (
          <ArrowUpRight size={14} className="text-green-500" />
        ) : (
          <ArrowDownRight size={14} className="text-red-500" />
        )}
        <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
          {trend === 'up' ? 'Increasing' : 'Decreasing'}
        </span>
      </div>
    )}
  </div>
);

const StatusBar = ({ label, value, total, color }) => {
  const percentage = total > 0 ? ((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const getDefaultMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    revenue: 0,
    orders: 0
  }));
};