import React, { useState, useEffect, useCallback } from 'react';
import { Users, Calendar, Clock, FileText, TrendingUp, UserCheck, ArrowRight, Sparkles, Activity, ChevronRight, Stethoscope, DollarSign } from 'lucide-react';
import { getDoctorAppointments } from '../../api/doctorApi';

const Dashboard = ({ doctorId, doctorData }) => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) { setLoading(false); return; }
      const result = await getDoctorAppointments(doctorId);
      if (result.success) {
        const appts = Array.isArray(result.data) ? result.data : [];
        setAppointments(appts);
        
        const today = new Date().toISOString().split('T')[0];
        const uniquePatients = new Set();
        let revenue = 0;
        
        appts.forEach(a => {
          const pid = a.patientId || a.patientEmail || a.phoneNo || a.patientName;
          if (pid) uniquePatients.add(pid);
          const fee = parseFloat(a.fee || a.consultationFee || a.amount || 0);
          if (fee > 0 && (a.status || '').toLowerCase() === 'completed') {
            revenue += fee;
          }
        });
        
        setStats({
          totalPatients: uniquePatients.size,
          todayAppointments: appts.filter(a => {
            const d = a.date || a.appointmentDate || '';
            return d === today;
          }).length,
          pendingAppointments: appts.filter(a => ['pending', 'booked'].includes((a.status || '').toLowerCase())).length,
          completedAppointments: appts.filter(a => ['completed', 'approved', 'confirmed'].includes((a.status || '').toLowerCase())).length,
          cancelledAppointments: appts.filter(a => (a.status || '').toLowerCase() === 'cancelled').length,
          totalRevenue: revenue
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [doctorId]);

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    const config = {
      approved: { bg: 'bg-emerald-50', textColor: 'text-emerald-700', label: 'Confirmed', icon: '✓' },
      confirmed: { bg: 'bg-emerald-50', textColor: 'text-emerald-700', label: 'Confirmed', icon: '✓' },
      pending: { bg: 'bg-amber-50', textColor: 'text-amber-700', label: 'Pending', icon: '⏳' },
      booked: { bg: 'bg-amber-50', textColor: 'text-amber-700', label: 'Booked', icon: '⏳' },
      completed: { bg: 'bg-blue-50', textColor: 'text-blue-700', label: 'Completed', icon: '✔' },
      cancelled: { bg: 'bg-red-50', textColor: 'text-red-700', label: 'Cancelled', icon: '✕' },
    };
    const c = config[s] || { bg: 'bg-gray-50', textColor: 'text-gray-700', label: status || 'Unknown', icon: '•' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.textColor}`}>
        <span>{c.icon}</span>
        {c.label}
      </span>
    );
  };

  const StatCard = ({ icon: Icon, label, value, gradient, trend, format }) => (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-white/0 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-${gradient.split(' ')[1]}/20 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} />
              {trend}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {format ? format(value) : value.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
        </div>
        <p className="text-gray-500 text-sm font-medium">Loading dashboard...</p>
      </div>
    );
  }

  // Recent appointments for quick view - sorted by latest first
  const recentAppts = [...appointments]
    .sort((a, b) => {
      const dateA = new Date(a.date || a.appointmentDate || a.createdAt || 0);
      const dateB = new Date(b.date || b.appointmentDate || b.createdAt || 0);
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2c33] via-[#174047] to-[#2c6774] rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-xl">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/[0.03] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold backdrop-blur-sm border-2 border-white/20 shadow-lg">
                  {doctorData?.name?.charAt(0) || doctorData?.fullName?.charAt(0) || 'D'}
                </div>
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
            
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 bg-white/10 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm border border-white/10 w-full sm:w-auto justify-center sm:justify-start">
              <Calendar size={14} className="text-white/80 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
            <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xl sm:text-2xl font-bold">{stats.todayAppointments}</p>
              <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">Today</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xl sm:text-2xl font-bold">{stats.pendingAppointments}</p>
              <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">Pending</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xl sm:text-2xl font-bold">{stats.completedAppointments}</p>
              <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xl sm:text-2xl font-bold">{stats.totalPatients}</p>
              <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Users} 
          label="Total Patients" 
          value={stats.totalPatients} 
          gradient="from-violet-500 to-violet-600" 
          trend="Total" 
        />
        <StatCard 
          icon={Calendar} 
          label="Today's Appointments" 
          value={stats.todayAppointments} 
          gradient="from-blue-500 to-blue-600" 
          trend={stats.todayAppointments > 0 ? 'Active' : 'No shows'} 
        />
        <StatCard 
          icon={Clock} 
          label="Pending" 
          value={stats.pendingAppointments} 
          gradient="from-amber-500 to-amber-600" 
        />
        <StatCard 
          icon={UserCheck} 
          label="Completed" 
          value={stats.completedAppointments} 
          gradient="from-emerald-500 to-emerald-600" 
        />
      </div>

      {/* Secondary Stats */}
      {stats.totalRevenue > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard 
            icon={DollarSign} 
            label="Revenue (Completed)" 
            value={stats.totalRevenue} 
            gradient="from-green-500 to-emerald-600" 
            format={(v) => `PKR ${v.toLocaleString()}`}
          />
          <StatCard 
            icon={Activity} 
            label="Cancelled" 
            value={stats.cancelledAppointments} 
            gradient="from-red-500 to-rose-600" 
          />
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-base">
            <Sparkles size={18} className="text-[#2c6774]" />
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickActionButton icon={Calendar} label="Appointments" gradient="from-blue-500 to-blue-600" />
          <QuickActionButton icon={Users} label="Patients" gradient="from-violet-500 to-violet-600" />
          <QuickActionButton icon={FileText} label="Prescriptions" gradient="from-emerald-500 to-emerald-600" />
          <QuickActionButton icon={Stethoscope} label="Consultations" gradient="from-amber-500 to-amber-600" />
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 gap-2">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-base">
            <Calendar size={18} className="text-[#2c6774]" />
            Recent Appointments
            {appointments.length > 0 && (
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2">
                {appointments.length} total
              </span>
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
              <p className="text-gray-500 font-medium text-base">No appointments yet</p>
              <p className="text-sm text-gray-400 mt-1.5">New appointments will appear here once patients book</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAppts.map((appt, i) => (
                <div 
                  key={appt._id || appt.id || i} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all gap-3 border border-gray-100/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
                      {(appt.patientName || 'P').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{appt.patientName || 'Unknown Patient'}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <Clock size={11} />
                        <span className="truncate">
                          {appt.date || appt.appointmentDate || 'N/A'}
                          {(appt.time || appt.appointmentTime) && <span className="ml-1">• {appt.time || appt.appointmentTime}</span>}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-0">
                    {getStatusBadge(appt.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickActionButton = ({ icon: Icon, label, gradient }) => (
  <button className="group flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors truncate">{label}</span>
  </button>
);

export default Dashboard;