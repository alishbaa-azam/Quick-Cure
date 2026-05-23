import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, Search, RefreshCw, Calendar, DollarSign, 
  Star, Clock, Award, MapPin, Phone, Mail, Activity,
  ChevronDown, ChevronUp, FileText, User, Shield, CheckCircle, XCircle
} from 'lucide-react';
import { message, Modal, Tag, Progress } from 'antd';

const API_BASE = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');
const headers = { 'Authorization': `Bearer ${getToken()}` };

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const authHeaders = { 'Authorization': `Bearer ${token}` };

      const [docRes, apptRes, userRes] = await Promise.allSettled([
        fetch(`${API_BASE}/doctors`, { headers: authHeaders }),
        fetch(`${API_BASE}/appointments`, { headers: authHeaders }),
        fetch(`${API_BASE}/admin/users`, { headers: authHeaders }),
      ]);

      if (docRes.status === 'fulfilled') {
        const docData = await docRes.value.json();
        setDoctors(docData.doctors || docData.data || []);
      }
      if (apptRes.status === 'fulfilled') {
        const apptData = await apptRes.value.json();
        setAppointments(apptData.appointments || apptData.data || []);
      }
      if (userRes.status === 'fulfilled') {
        const userData = await userRes.value.json();
        setUsers(userData.users || []);
      }
    } catch (err) {
      console.error('Error:', err);
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getLinkedUser = (doctor) => {
    const userId = doctor.user?._id || doctor.user;
    return users.find(u => u._id === userId) || null;
  };

  const getDoctorAppointments = (doctorId) =>
    appointments.filter(a => a.doctor?._id === doctorId || a.doctor === doctorId);

  const getDoctorStats = (doctorId) => {
    const appts = getDoctorAppointments(doctorId);
    const completed = appts.filter(a => a.status === 'completed');
    return {
      total: appts.length,
      pending: appts.filter(a => a.status === 'pending').length,
      completed: completed.length,
      cancelled: appts.filter(a => a.status === 'cancelled').length,
      revenue: completed.reduce((sum, a) => sum + (a.fee || 0), 0),
      uniquePatients: [...new Set(completed.map(a => a.patientName))].length,
    };
  };

  // Extract unique specialities
  const specialities = [...new Set(doctors.map(d => d.speciality).filter(Boolean))];

  const filtered = doctors.filter(doc => {
    const nameMatch = doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const specialityMatch = doc.speciality?.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = specialityFilter === 'all' || doc.speciality === specialityFilter;
    return (nameMatch || specialityMatch) && filterMatch;
  });

  const formatServices = (services) => {
    if (!services || services.length === 0) return [];
    try {
      return typeof services === 'string' ? JSON.parse(services) : services;
    } catch { return []; }
  };

  const formatAvailability = (availability) => {
    if (!availability || availability.length === 0) return [];
    try {
      return typeof availability === 'string' ? JSON.parse(availability) : availability;
    } catch { return []; }
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    return `${API_BASE}/../uploads/${img}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Doctors Management</h1>
          <p className="text-gray-500 mt-1">
            <span className="font-semibold text-[#2c6774]">{doctors.length}</span> registered doctors · 
            <span className="font-semibold text-[#2c6774] ml-1">{appointments.length}</span> total appointments
          </p>
        </div>
        <button onClick={fetchAllData} 
          className="px-5 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] text-sm font-medium flex items-center gap-2 shadow-sm shadow-[#2c6774]/20 transition-all">
          <RefreshCw size={16} /> Refresh Data
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search doctors by name or speciality..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/10 outline-none transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setSpecialityFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${specialityFilter === 'all' ? 'bg-[#2c6774] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              All Specialities
            </button>
            {specialities.slice(0, 6).map(spec => (
              <button key={spec} onClick={() => setSpecialityFilter(spec)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${specialityFilter === spec ? 'bg-[#2c6774] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative w-14 h-14 mx-auto">
              <div className="absolute inset-0 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-[#5c878f] border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            </div>
            <p className="mt-5 text-gray-500 font-medium">Loading doctors data...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((doc) => {
            const stats = getDoctorStats(doc._id);
            const isExpanded = expandedCard === doc._id;
            const servicesList = formatServices(doc.services);
            const availList = formatAvailability(doc.availability);
            const docAppts = getDoctorAppointments(doc._id);

            return (
              <div key={doc._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Card Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {getImageUrl(doc.image) ? (
                        <img src={getImageUrl(doc.image)} alt={doc.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center text-white text-xl font-bold">
                          {doc.name?.charAt(0) || 'D'}
                        </div>
                      )}
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                        doc.isActive ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {doc.isActive ? <CheckCircle size={10} className="text-white" /> : <XCircle size={10} className="text-white" />}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 truncate">{doc.name}</h3>
                      <p className="text-sm font-medium text-[#2c6774]">{doc.speciality}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold text-gray-700">{doc.rating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500">{doc.totalReviews || 0} reviews</span>
                      </div>
                    </div>
                    
                    {/* Fee */}
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-gray-900">Rs {doc.fee?.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400">per visit</p>
                    </div>
                  </div>
                  {/* Linked User Info */}
                  {doc.user && (() => {
                    const linkedUser = getLinkedUser(doc);
                    return linkedUser ? (
                      <div className="mt-3 flex items-center gap-2 bg-blue-50/50 rounded-lg px-3 py-2 border border-blue-100/50">
                        <User size={13} className="text-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">Linked User Account</p>
                          <p className="text-xs font-semibold text-gray-800 truncate">{linkedUser.name}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">{linkedUser.role}</span>
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-2 bg-amber-50/50 rounded-lg px-3 py-2 border border-amber-100/50">
                        <User size={13} className="text-amber-500 shrink-0" />
                        <p className="text-xs text-amber-700 font-medium">User ID: {doc.user}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Quick Stats */}
                <div className="px-5 pb-3">
                  <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded-xl p-2.5">
                    <div className="text-center">
                      <p className="text-sm font-bold text-blue-600">{stats.total}</p>
                      <p className="text-[10px] text-gray-500">Appts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-green-600">{stats.completed}</p>
                      <p className="text-[10px] text-gray-500">Done</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-amber-600">{stats.pending}</p>
                      <p className="text-[10px] text-gray-500">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-purple-600">{doc.experience || '0'}</p>
                      <p className="text-[10px] text-gray-500">Exp</p>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="px-5 pb-2 space-y-1.5">
                  {doc.qualification && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Award size={13} className="text-gray-400" />
                      <span>{doc.qualification}</span>
                    </div>
                  )}
                  {servicesList.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Activity size={13} className="text-gray-400" />
                      <span className="truncate">{servicesList.slice(0, 3).join(', ')}{servicesList.length > 3 ? '...' : ''}</span>
                    </div>
                  )}
                  {availList.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock size={13} className="text-gray-400" />
                      <span>{availList.filter(a => a.isAvailable !== false).length} days available</span>
                    </div>
                  )}
                </div>

                {/* Expansion Toggle */}
                <button onClick={() => setExpandedCard(isExpanded ? null : doc._id)}
                  className="w-full flex items-center justify-center gap-1 py-2 text-xs text-gray-400 hover:text-[#2c6774] hover:bg-gray-50 transition-colors">
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {isExpanded ? 'Show Less' : 'View More'}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-gray-50 pt-3 space-y-3">
                    {/* Availability Schedule */}
                    {availList.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                          <Clock size={12} /> Availability Schedule
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {availList.filter(a => a.isAvailable !== false).slice(0, 7).map((slot, i) => (
                            <div key={i} className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium">
                              {slot.day}: {slot.startTime} - {slot.endTime}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Services */}
                    {servicesList.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2">Services Offered</p>
                        <div className="flex flex-wrap gap-1.5">
                          {servicesList.map((s, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Appointments */}
                    {docAppts.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2">Recent Appointments</p>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto">
                          {docAppts.slice(0, 5).map((a, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                              <div>
                                <p className="text-xs font-medium text-gray-800">{a.patientName}</p>
                                <p className="text-[10px] text-gray-400">{new Date(a.date).toLocaleDateString()} · {a.timeSlot?.startTime}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                  a.status === 'completed' ? 'bg-green-100 text-green-700' :
                                  a.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                  a.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                }`}>{a.status}</span>
                                <span className="text-xs font-semibold text-gray-700">Rs {a.fee?.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="px-5 pb-5">
                  <button onClick={() => { setSelectedDoctor(doc); setDetailModal(true); }}
                    className="w-full py-2.5 bg-gradient-to-r from-[#2c6774] to-[#3a7a88] text-white text-sm font-medium rounded-xl hover:from-[#1a3a3a] hover:to-[#2c6774] transition-all shadow-sm shadow-[#2c6774]/20">
                    View Complete Profile
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && !loading && (
            <div className="col-span-full text-center py-16">
              <Stethoscope className="w-16 h-16 mx-auto mb-4 text-gray-200" />
              <p className="text-lg font-medium text-gray-400">No doctors found</p>
              <p className="text-sm text-gray-400">{searchTerm ? 'Try a different search term' : 'No doctors registered yet'}</p>
            </div>
          )}
        </div>
      )}

      {/* Full Detail Modal */}
      <Modal title={null} open={detailModal} onCancel={() => { setDetailModal(false); setSelectedDoctor(null); }}
        footer={null} width={800} className="doctor-detail-modal">
        {selectedDoctor && (() => {
          const stats = getDoctorStats(selectedDoctor._id);
          const docAppts = getDoctorAppointments(selectedDoctor._id);
          const servicesList = formatServices(selectedDoctor.services);
          const availList = formatAvailability(selectedDoctor.availability);
          const completedCount = stats.completed;
          const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <div className="space-y-6">
              {/* Hero Section */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3a3a] via-[#2c6774] to-[#3a7a88] p-6 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                
                <div className="relative flex items-start gap-6">
                  <div className="shrink-0">
                    {getImageUrl(selectedDoctor.image) ? (
                      <img src={getImageUrl(selectedDoctor.image)} alt={selectedDoctor.name}
                        className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border border-white/20">
                        {selectedDoctor.name?.charAt(0) || 'D'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                        <p className="text-emerald-300 font-medium text-lg">{selectedDoctor.speciality}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-amber-400 fill-amber-400" />
                            <span className="font-semibold">{selectedDoctor.rating?.toFixed(1) || '0.0'}</span>
                            <span className="text-white/60 text-sm">({selectedDoctor.totalReviews || 0} reviews)</span>
                          </div>
                          <span className="text-white/30">|</span>
                          <span className="text-sm">{docAppts.length} total appointments</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${
                        selectedDoctor.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {selectedDoctor.isActive ? '● Active' : '● Inactive'}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                      {selectedDoctor.qualification && <span className="flex items-center gap-1"><Award size={14} /> {selectedDoctor.qualification}</span>}
                      {selectedDoctor.experience && <span className="flex items-center gap-1"><Calendar size={14} /> {selectedDoctor.experience} experience</span>}
                      <span className="flex items-center gap-1"><DollarSign size={14} /> Fee: Rs {selectedDoctor.fee?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Appointments</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-2xl font-bold text-purple-600">Rs {stats.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Revenue</p>
                </div>
              </div>

              {/* Completion Rate */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Appointment Completion Rate</span>
                  <span className="text-sm font-bold text-[#2c6774]">{completionRate}%</span>
                </div>
                <Progress percent={completionRate} strokeColor="#2c6774" trailColor="#e5e7eb" size="small" showInfo={false} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>{stats.uniquePatients} unique patients</span>
                  <span>{stats.cancelled} cancelled</span>
                </div>
              </div>

              {/* Services & Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Services */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity size={16} className="text-[#2c6774]" /> Services Offered
                  </h4>
                  {servicesList.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {servicesList.map((s, i) => (
                        <span key={i} className="text-xs bg-[#2c6774]/5 text-[#2c6774] px-3 py-1.5 rounded-lg font-medium">{s}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No services listed</p>
                  )}
                </div>

                {/* Availability */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-[#2c6774]" /> Availability Schedule
                  </h4>
                  {availList.length > 0 ? (
                    <div className="space-y-1.5">
                      {availList.filter(a => a.isAvailable !== false).map((slot, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="font-semibold text-gray-700">{slot.day}</span>
                          <span className="text-gray-500">{slot.startTime} - {slot.endTime}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No availability set</p>
                  )}
                </div>
              </div>

              {/* All Appointments */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-800">All Appointments ({docAppts.length})</h4>
                </div>
                {docAppts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">No appointments yet</div>
                ) : (
                  <div className="max-h-72 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 font-semibold">
                        <tr>
                          <th className="px-4 py-2.5 text-left">Patient</th>
                          <th className="px-4 py-2.5 text-left">Date</th>
                          <th className="px-4 py-2.5 text-left">Time</th>
                          <th className="px-4 py-2.5 text-left">Status</th>
                          <th className="px-4 py-2.5 text-right">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {docAppts.map((a, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-2.5 font-medium text-gray-800">{a.patientName}</td>
                            <td className="px-4 py-2.5 text-gray-500">{new Date(a.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2.5 text-gray-500">{a.timeSlot?.startTime || '-'}</td>
                            <td className="px-4 py-2.5">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                a.status === 'completed' ? 'bg-green-100 text-green-700' :
                                a.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                a.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                              }`}>{a.status}</span>
                            </td>
                            <td className="px-4 py-2.5 text-right font-semibold text-gray-700">Rs {a.fee?.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Linked User Account */}
              {selectedDoctor.user && (() => {
                const linkedUser = getLinkedUser(selectedDoctor);
                return (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <User size={16} className="text-blue-600" /> Linked User Account
                    </h4>
                    {linkedUser ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Name</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5">{linkedUser.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Email</p>
                          <p className="text-sm text-gray-700 mt-0.5">{linkedUser.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Role</p>
                          <p className="text-sm font-medium text-blue-700 capitalize mt-0.5">{linkedUser.role}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">User ID</p>
                          <p className="text-sm text-gray-500 mt-0.5 font-mono text-[11px]">{linkedUser._id}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Joined</p>
                          <p className="text-sm text-gray-700 mt-0.5">{new Date(linkedUser.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Verified</p>
                          <p className={`text-sm font-medium mt-0.5 ${linkedUser.isVerified ? 'text-green-600' : 'text-amber-600'}`}>
                            {linkedUser.isVerified ? '✓ Verified' : 'Unverified'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">User data not found (ID: {selectedDoctor.user})</p>
                    )}
                  </div>
                );
              })()}

              {/* Doctor Info Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Doctor ID</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedDoctor._id}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Member Since</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{new Date(selectedDoctor.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Last Updated</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{new Date(selectedDoctor.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Linked User</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedDoctor.user || 'N/A'}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}