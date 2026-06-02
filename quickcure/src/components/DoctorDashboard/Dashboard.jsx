import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, FileText, Video, ChevronRight, TrendingUp, UserCheck } from 'lucide-react';
import { getDoctorAppointments } from '../../api/doctorApi';

const Dashboard = ({ doctorId, doctorData }) => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) { setLoading(false); return; }
      const result = await getDoctorAppointments(doctorId);
      if (result.success) {
        const appts = Array.isArray(result.data) ? result.data : [];
        setAppointments(appts.slice(0, 5));
        const today = new Date().toISOString().split('T')[0];
        const uniquePatients = new Set();
        appts.forEach(a => { const pid = a.patientId || a.patientEmail || a.phoneNo; if (pid) uniquePatients.add(pid); });
        setStats({
          totalPatients: uniquePatients.size,
          todayAppointments: appts.filter(a => (a.date || a.appointmentDate || '') === today).length,
          pendingAppointments: appts.filter(a => (a.status || '').toLowerCase() === 'pending').length,
          completedAppointments: appts.filter(a => ['completed', 'approved'].includes((a.status || '').toLowerCase())).length
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [doctorId]);

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    switch(s) {
      case 'approved': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Confirmed</span>;
      case 'pending': return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Pending</span>;
      case 'completed': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Completed</span>;
      case 'cancelled': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Cancelled</span>;
      default: return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#174047] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 -mt-19">
      {/* Welcome + Doctor Profile */}
      <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
            {doctorData?.name?.charAt(0) || doctorData?.fullName?.charAt(0) || 'D'}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">
              Welcome, Dr. {doctorData?.name?.split(' ')[0] || doctorData?.fullName?.split(' ')[0] || 'Doctor'}
            </h1>
            <p className="text-white/80 text-sm mt-0.5">
              {doctorData?.speciality || doctorData?.specialization || 'General Practitioner'}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {doctorData?.qualification || ''}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <Calendar size={16} />
            <span className="text-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Patients" value={stats.totalPatients} color="bg-violet-500" trend="+12%" />
        <StatCard icon={Calendar} label="Today's Appointments" value={stats.todayAppointments} color="bg-blue-500" trend="+8%" />
        <StatCard icon={Clock} label="Pending" value={stats.pendingAppointments} color="bg-amber-500" />
        <StatCard icon={UserCheck} label="Completed" value={stats.completedAppointments} color="bg-emerald-500" trend="+5%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickActionButton icon={Calendar} label="Appointments" color="bg-blue-500" onClick={() => document.getElementById('sidebar-appointments')?.click()} />
        <QuickActionButton icon={Users} label="Patients" color="bg-violet-500" onClick={() => document.getElementById('sidebar-patients')?.click()} />
        <QuickActionButton icon={FileText} label="Prescriptions" color="bg-emerald-500" onClick={() => document.getElementById('sidebar-prescriptions')?.click()} />
        <QuickActionButton icon={Clock} label="Schedule" color="bg-amber-500" onClick={() => document.getElementById('sidebar-schedule')?.click()} />
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-5 border-b border-gray-50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Calendar size={18} className="text-[#2c6774]" />
            Recent Appointments
          </h3>
          {appointments.length > 0 && (
            <button 
              onClick={() => document.querySelector('[data-tab="appointments"]')?.click()}
              className="text-sm text-[#2c6774] hover:text-[#174047] font-medium flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          )}
        </div>
        <div className="p-5">
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto w-12 h-12 text-gray-200 mb-3" />
              <p className="text-gray-500 text-sm">No appointments yet</p>
              <p className="text-xs text-gray-400 mt-1">New appointments will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt, i) => (
                <div key={appt._id || appt.id || i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold">
                      {appt.patientName?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{appt.patientName || 'Unknown'}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <Clock size={11} />
                        {appt.date || appt.appointmentDate || 'N/A'} • {appt.time || appt.appointmentTime || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
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

const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all text-left"
  >
    <div className={`p-2.5 rounded-xl ${color}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

export default Dashboard;