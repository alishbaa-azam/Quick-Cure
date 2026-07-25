import React, { useState, useEffect, useCallback } from 'react';
import { Users, Calendar, Clock, TrendingUp, UserCheck, ChevronRight, Activity, DollarSign, BarChart2, LineChartIcon } from 'lucide-react';
import { getDoctorAppointments } from '../../api/doctorApi';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';

const API_URL = 'http://localhost:5000';

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: '#f59e0b', bg: 'bg-amber-50',   text: 'text-amber-700',   icon: '⏳' },
  booked:    { label: 'Booked',    color: '#f59e0b', bg: 'bg-amber-50',   text: 'text-amber-700',   icon: '⏳' },
  approved:  { label: 'Approved',  color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '✓'  },
  confirmed: { label: 'Confirmed', color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '✓'  },
  completed: { label: 'Completed', color: '#3b82f6', bg: 'bg-blue-50',    text: 'text-blue-700',    icon: '✔'  },
  cancelled: { label: 'Cancelled', color: '#ef4444', bg: 'bg-red-50',     text: 'text-red-700',     icon: '✕'  },
  rescheduled:{ label: 'Rescheduled', color: '#8b5cf6', bg: 'bg-violet-50', text: 'text-violet-700', icon: '↻' },
};

const getStatusCfg = (s = '') => STATUS_CONFIG[(s || '').toLowerCase()] || { label: s || 'Unknown', color: '#6b7280', bg: 'bg-gray-50', text: 'text-gray-700', icon: '•' };

const StatusBadge = ({ status }) => {
  const c = getStatusCfg(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span>{c.icon}</span>{c.label}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, gradient, trend, format }) => (
  <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <TrendingUp size={11} />{trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{format ? format(value) : value.toLocaleString()}</p>
      <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = ({ doctorId, doctorData }) => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ totalPatients: 0, todayAppointments: 0, pendingAppointments: 0, completedAppointments: 0, cancelledAppointments: 0, totalRevenue: 0, rescheduledAppointments: 0 });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) { setLoading(false); return; }
      const result = await getDoctorAppointments(doctorId);
      if (result.success) {
        const appts = Array.isArray(result.data) ? result.data : [];
        setAppointments(appts);
        const today = new Date().toISOString().split('T')[0];
        const unique = new Set();
        let revenue = 0;
        
        // Track rescheduled appointments count
        let rescheduledCount = 0;
        
        appts.forEach(a => {
          const pid = a.patientId || a.patientEmail || a.phoneNo || a.patientName;
          if (pid) unique.add(pid);
          const fee = parseFloat(a.fee || a.consultationFee || a.amount || 0);
          if (fee > 0 && ['completed', 'approved', 'confirmed'].includes((a.status || '').toLowerCase())) revenue += fee;
          
          // Count rescheduled appointments
          if ((a.status || '').toLowerCase() === 'rescheduled') {
            rescheduledCount++;
          }
        });
        
        const getStatus = a => (a.status || '').toLowerCase();
        setStats({
          totalPatients: unique.size,
          todayAppointments: appts.filter(a => (a.date || a.appointmentDate || '') === today).length,
          pendingAppointments: appts.filter(a => ['pending', 'booked'].includes(getStatus(a))).length,
          completedAppointments: appts.filter(a => ['completed', 'approved', 'confirmed'].includes(getStatus(a))).length,
          cancelledAppointments: appts.filter(a => getStatus(a) === 'cancelled').length,
          rescheduledAppointments: rescheduledCount, // Use the tracked count
          totalRevenue: revenue,
        });
      }
      setLoading(false);
    };
    fetchData();
    
    // Set up listener for updates from patient rescheduling
    const handleStorageChange = (e) => {
      if (e.key === 'doctor_dashboard_last_update') {
        fetchData();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [doctorId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
      </div>
      <p className="text-gray-500 text-sm font-medium">Loading dashboard...</p>
    </div>
  );

  // Chart data - includes rescheduled appointments
  const chartData = [
    { name: 'Pending',     value: stats.pendingAppointments,    fill: '#f59e0b' },
    { name: 'Approved',    value: stats.completedAppointments,  fill: '#10b981' },
    { name: 'Cancelled',   value: stats.cancelledAppointments,  fill: '#ef4444' },
    { name: 'Rescheduled', value: stats.rescheduledAppointments,fill: '#8b5cf6' },
  ];

  const lineData = chartData.map((d, i) => ({ ...d, index: i + 1 }));

  const recentAppts = [...appointments]
    .sort((a, b) => new Date(b.date || b.appointmentDate || b.createdAt || 0) - new Date(a.date || a.appointmentDate || a.createdAt || 0))
    .slice(0, 5);

  const totalForChart = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2c33] via-[#174047] to-[#2c6774] rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative flex-shrink-0">
                {doctorData?.image ? (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                    <img src={`${API_URL}${doctorData.image}`} alt={doctorData.name || 'Doctor'} className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = (doctorData?.name?.charAt(0) || 'D'); }} />
                  </div>
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold backdrop-blur-sm border-2 border-white/20 shadow-lg">
                    {doctorData?.name?.charAt(0) || 'D'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-400 rounded-full border-2 border-[#174047] shadow-lg"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white/80 text-xs sm:text-sm font-medium">{greeting}! 👋</p>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">Dr. {(doctorData?.name || doctorData?.fullName || 'Doctor').split(' ')[0]}</h1>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5">
                  <span className="px-2 sm:px-3 py-0.5 bg-white/20 rounded-lg text-[10px] sm:text-xs font-medium backdrop-blur-sm border border-white/10">
                    {doctorData?.speciality || doctorData?.specialization || 'General Practitioner'}
                  </span>
                  {doctorData?.fee && (
                    <span className="px-2 sm:px-3 py-0.5 bg-emerald-400/20 rounded-lg text-[10px] sm:text-xs font-medium backdrop-blur-sm">
                      PKR {parseInt(doctorData.fee).toLocaleString()} / visit
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 bg-white/10 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm border border-white/10 w-full sm:w-auto justify-center sm:justify-start">
              <Calendar size={14} className="text-white/80 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
            {[
              { v: stats.todayAppointments, l: 'Today' },
              { v: stats.pendingAppointments, l: 'Pending' },
              { v: stats.completedAppointments, l: 'Completed' },
              { v: stats.totalPatients, l: 'Patients' },
            ].map(({ v, l }) => (
              <div key={l} className="bg-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm border border-white/5">
                <p className="text-xl sm:text-2xl font-bold">{v}</p>
                <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}     label="Total Patients"       value={stats.totalPatients}         gradient="from-violet-500 to-violet-600" trend="Total" />
        <StatCard icon={Calendar}  label="Today's Appointments" value={stats.todayAppointments}     gradient="from-blue-500 to-blue-600"    trend={stats.todayAppointments > 0 ? 'Active' : 'None'} />
        <StatCard icon={Clock}     label="Pending"              value={stats.pendingAppointments}   gradient="from-amber-500 to-amber-600" />
        <StatCard icon={UserCheck} label="Completed"            value={stats.completedAppointments} gradient="from-emerald-500 to-emerald-600" />
      </div>

      {/* Revenue + Cancelled + Rescheduled */}
      {(stats.totalRevenue > 0 || stats.cancelledAppointments > 0 || stats.rescheduledAppointments > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.totalRevenue > 0 && (
            <StatCard icon={DollarSign} label="Revenue (Completed)" value={stats.totalRevenue} gradient="from-green-500 to-emerald-600" format={v => `PKR ${v.toLocaleString()}`} />
          )}
          <StatCard icon={Activity}    label="Cancelled"    value={stats.cancelledAppointments}   gradient="from-red-500 to-rose-600" />
          <StatCard icon={TrendingUp}  label="Rescheduled"  value={stats.rescheduledAppointments} gradient="from-violet-500 to-purple-600" />
        </div>
      )}

      {/* Appointment Status Chart */}
      {totalForChart > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 gap-3">
            <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2 text-base">
                <BarChart2 size={18} className="text-[#2c6774]" />
                Appointment Status Overview
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{totalForChart} total appointments across all statuses</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button
                onClick={() => setChartType('bar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${chartType === 'bar' ? 'bg-white text-[#174047] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <BarChart2 size={13} /> Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${chartType === 'line' ? 'bg-white text-[#174047] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LineChartIcon size={13} /> Line
              </button>
            </div>
          </div>

          {/* Legend Pills */}
          <div className="flex flex-wrap gap-2 px-5 pt-4">
            {chartData.map(d => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }}></span>
                {d.name}: <strong>{d.value}</strong>
              </span>
            ))}
          </div>

          <div className="p-5 pt-3" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb', radius: 8 }} />
                  <Bar dataKey="value" name="Appointments" radius={[6, 6, 0, 0]}>
                    {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" name="Appointments" stroke="#2c6774" strokeWidth={2.5} dot={{ r: 5, fill: '#2c6774', strokeWidth: 0 }} activeDot={{ r: 7 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 gap-2">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-base">
            <Calendar size={18} className="text-[#2c6774]" />
            Recent Appointments
            {appointments.length > 0 && (
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-1">{appointments.length} total</span>
            )}
          </h3>
          {appointments.length > 0 && (
            <button className="text-sm text-[#2c6774] hover:text-[#174047] font-medium flex items-center gap-1.5 group transition-colors">
              View All <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
        <div className="p-5">
          {recentAppts.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">No appointments yet</p>
              <p className="text-sm text-gray-400 mt-1.5">New appointments will appear here once patients book</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAppts.map((appt, i) => (
                <div key={appt._id || appt.id || i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50/60 hover:bg-gray-50 transition-all gap-3 border border-gray-100/70">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
                      {(appt.patientName || 'P').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{appt.patientName || 'Unknown Patient'}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <Clock size={11} />
                        <span className="truncate">
                          {appt.date || appt.appointmentDate || 'N/A'}
                          {(appt.time || appt.appointmentTime) && <span className="ml-1">• {appt.time || appt.appointmentTime}</span>}
                        </span>
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={appt.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;