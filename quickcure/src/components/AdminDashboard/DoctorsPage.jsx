import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, Search, RefreshCw, Calendar, DollarSign, 
  Star, Clock, Award, MapPin, Phone, Mail, Activity,
  ChevronDown, ChevronUp, FileText, User, Shield, CheckCircle, XCircle,
  TrendingUp, MessageSquare, Users, Briefcase, Trash2, Plus, X
} from 'lucide-react';
import { message, Modal, Tag, Progress, Tabs, Table, Spin } from 'antd';

const API_BASE = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDoctorReviews, setSelectedDoctorReviews] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [addSpecialtyModal, setAddSpecialtyModal] = useState(false);
  const [specialtyForm, setSpecialtyForm] = useState({ name: '', desc: '', doctors: '' });

  useEffect(() => {
    fetchAllData();
    fetchSpecialties();
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
        const docList = Array.isArray(docData) ? docData : (docData.doctors || docData.data || []);
        setDoctors(docList);
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

  const fetchSpecialties = async () => {
    try {
      const res = await fetch(`${API_BASE}/specialties`);
      if (res.ok) {
        const data = await res.json();
        setSpecialties(Array.isArray(data) ? data : (data.data || data.specialties || []));
      }
    } catch (err) {
      console.error('Error fetching specialties:', err);
    }
  };

  const fetchDoctorReviews = async (doctorId) => {
    try {
      const res = await fetch(`${API_BASE}/reviews/${doctorId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedDoctorReviews(Array.isArray(data) ? data : []);
      } else {
        setSelectedDoctorReviews([]);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setSelectedDoctorReviews([]);
    }
  };

  const handleDeleteDoctor = (doc) => {
    Modal.confirm({
      title: 'Delete Doctor',
      content: `Are you sure you want to delete "${doc.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = getToken();
          const res = await fetch(`${API_BASE}/doctors/${doc._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            message.success(`Doctor "${doc.name}" deleted successfully`);
            setDetailModal(false);
            setSelectedDoctor(null);
            fetchAllData();
          } else {
            const data = await res.json();
            message.error(data.message || 'Failed to delete doctor');
          }
        } catch (err) {
          message.error('Failed to delete doctor');
        }
      }
    });
  };

  const handleAddSpecialty = async () => {
    if (!specialtyForm.name || !specialtyForm.desc) {
      message.error('Name and description are required');
      return;
    }
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/specialties/add`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: specialtyForm.name,
          desc: specialtyForm.desc,
          doctors: specialtyForm.doctors || '0'
        })
      });
      if (res.ok) {
        message.success(`Specialty "${specialtyForm.name}" added successfully`);
        setAddSpecialtyModal(false);
        setSpecialtyForm({ name: '', desc: '', doctors: '' });
        fetchSpecialties();
      } else {
        const data = await res.json();
        message.error(data.message || 'Failed to add specialty');
      }
    } catch (err) {
      message.error('Failed to add specialty');
    }
  };

  const handleViewDetails = (doc) => {
    setSelectedDoctor(doc);
    setDetailModal(true);
    setActiveTab('overview');
    setSelectedDoctorReviews([]);
    setDetailLoading(true);
    fetchDoctorReviews(doc._id).finally(() => setDetailLoading(false));
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
    const pending = appts.filter(a => a.status === 'pending');
    const cancelled = appts.filter(a => a.status === 'cancelled');
    return {
      total: appts.length,
      pending: pending.length,
      completed: completed.length,
      cancelled: cancelled.length,
      revenue: completed.reduce((sum, a) => sum + (a.fee || 0), 0),
      pendingRevenue: pending.reduce((sum, a) => sum + (a.fee || 0), 0),
      uniquePatients: [...new Set(completed.map(a => a.patientName))].length,
    };
  };

  const getMonthlyRevenue = (docAppts) => {
    const monthlyData = {};
    docAppts.forEach(a => {
      if (a.status === 'completed') {
        const date = new Date(a.date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        const fee = a.fee || 0;
        if (!monthlyData[monthYear]) monthlyData[monthYear] = { revenue: 0, count: 0 };
        monthlyData[monthYear].revenue += fee;
        monthlyData[monthYear].count += 1;
      }
    });
    return Object.entries(monthlyData).map(([month, data]) => ({
      month, revenue: data.revenue, appointments: data.count
    })).reverse();
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    // Files are served from root level (not under /api/)
    const SERVER_URL = 'http://localhost:5000';
    if (img.startsWith('/uploads')) return `${SERVER_URL}${img}`;
    if (img.startsWith('/')) return `${SERVER_URL}${img}`;
    return `${SERVER_URL}/uploads/${img}`;
  };

  const formatServices = (services) => {
    if (!services || services.length === 0) return [];
    try { return typeof services === 'string' ? JSON.parse(services) : services; }
    catch { return []; }
  };

  const formatAvailability = (availability) => {
    if (!availability || availability.length === 0) return [];
    try { return typeof availability === 'string' ? JSON.parse(availability) : availability; }
    catch { return []; }
  };

  const allSpecialities = [...new Set(doctors.map(d => d.speciality).filter(Boolean))];
  const specNames = specialties.map(s => s.name);

  const filtered = doctors.filter(doc => {
    const nameMatch = doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const specialityMatch = doc.speciality?.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = specialityFilter === 'all' || doc.speciality === specialityFilter;
    return (nameMatch || specialityMatch) && filterMatch;
  });

  const appointmentColumns = [
    { title: 'Patient', dataIndex: 'patientName', key: 'patient', render: (n) => n || 'N/A' },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (d) => d ? new Date(d).toLocaleDateString() : 'N/A' },
    { title: 'Time', dataIndex: 'timeSlot', key: 'time', render: (ts) => ts?.startTime || '-' },
    { title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => {
        const color = s === 'completed' ? 'green' : s === 'pending' ? 'orange' : 'red';
        return <Tag color={color}>{s?.toUpperCase() || 'N/A'}</Tag>;
      }
    },
    { title: 'Fee', dataIndex: 'fee', key: 'fee', render: (fee) => `Rs ${(fee || 0).toLocaleString()}` },
  ];

  const reviewColumns = [
    { title: 'Patient', dataIndex: 'patientName', key: 'patient', render: (n) => n || 'Anonymous' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating',
      render: (r) => <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {r || 0}/5</span>
    },
    { title: 'Comment', dataIndex: 'comment', key: 'comment',
      render: (c) => <span className="line-clamp-2 max-w-[300px]">{c || 'N/A'}</span>
    },
    { title: 'Date', dataIndex: 'createdAt', key: 'date', render: (d) => d ? new Date(d).toLocaleDateString() : 'N/A' },
  ];

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
        <div className="flex gap-2">
          <button onClick={() => setAddSpecialtyModal(true)}
            className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-sm font-medium flex items-center gap-2 transition-all">
            <Plus size={16} /> Add Specialty
          </button>
          <button onClick={fetchAllData} 
            className="px-5 py-2.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1a3a3a] text-sm font-medium flex items-center gap-2 shadow-sm shadow-[#2c6774]/20 transition-all">
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>
      </div>

      {/* Filters with Dropdown */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search doctors by name or speciality..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/10 outline-none transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <select
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#2c6774] outline-none bg-white min-w-[180px]"
            >
              <option value="all">All Specialities</option>
              {specialties.length > 0 && specialties.map(s => (
                <option key={s._id} value={s.name}>{s.name}</option>
              ))}
              {allSpecialities.filter(s => !specNames.includes(s)).map(s => (
                <option key={s} value={s}>{s} (from doctors)</option>
              ))}
            </select>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {filtered.map((doc) => {
            const stats = getDoctorStats(doc._id);
            const docAppts = getDoctorAppointments(doc._id);
            const servicesList = formatServices(doc.services);
            const availList = formatAvailability(doc.availability);
            const linkedUser = getLinkedUser(doc);

            return (
              <div key={doc._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-5 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      {getImageUrl(doc.image) ? (
                        <img src={getImageUrl(doc.image)} alt={doc.name}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100"
                          onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.className = 'w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center text-white text-2xl font-bold shrink-0'; }} />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center text-white text-2xl font-bold">
                          {doc.name?.charAt(0) || 'D'}
                        </div>
                      )}
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                        doc.isActive !== false ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {doc.isActive !== false ? <CheckCircle size={10} className="text-white" /> : <XCircle size={10} className="text-white" />}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{doc.name}</h3>
                      <p className="text-sm font-medium text-[#2c6774]">{doc.speciality}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold text-gray-700">{doc.rating?.toFixed(1) || '0.0'}</span>
                          <span className="text-xs text-gray-500">({doc.totalReviews || 0} reviews)</span>
                        </div>
                        <span className="text-xs text-gray-500">| Fee: Rs {doc.fee?.toLocaleString()}</span>
                      </div>
                      {/* Linked user info */}
                      {linkedUser && (
                        <div className="mt-1 text-xs text-blue-600 flex items-center gap-1">
                          <User size={11} /> {linkedUser.email}
                        </div>
                      )}
                    </div>
                  </div>
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
                      <p className="text-sm font-bold text-purple-600">Rs {stats.revenue.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-500">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-amber-600">{stats.uniquePatients}</p>
                      <p className="text-[10px] text-gray-500">Patients</p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-2 space-y-1">
                  {doc.qualification && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Award size={13} className="text-gray-400" />
                      <span>{doc.qualification}</span>
                    </div>
                  )}
                  {doc.experience && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Briefcase size={13} className="text-gray-400" />
                      <span>{doc.experience}</span>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5 flex gap-2">
                  <button onClick={() => handleViewDetails(doc)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#3a7a88] text-white text-sm font-medium rounded-xl hover:from-[#1a3a3a] hover:to-[#2c6774] transition-all shadow-sm shadow-[#2c6774]/20">
                    View Complete Profile
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteDoctor(doc); }}
                    className="px-3 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-all flex items-center gap-1">
                    <Trash2 size={16} />
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

      {/* Full Detail Modal with Tabs */}
      <Modal title={null} open={detailModal} onCancel={() => { setDetailModal(false); setSelectedDoctor(null); }}
        footer={null} width={950} style={{ top: 20 }}>
        {selectedDoctor && (() => {
          const stats = getDoctorStats(selectedDoctor._id);
          const docAppts = getDoctorAppointments(selectedDoctor._id);
          const servicesList = formatServices(selectedDoctor.services);
          const availList = formatAvailability(selectedDoctor.availability);
          const linkedUser = getLinkedUser(selectedDoctor);
          const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          const monthlyRevenue = getMonthlyRevenue(docAppts);
          const avgRating = selectedDoctorReviews.length > 0 
            ? selectedDoctorReviews.reduce((s, r) => s + r.rating, 0) / selectedDoctorReviews.length 
            : selectedDoctor.rating || 0;

          const tabItems = [
            {
              key: 'overview',
              label: <span className="flex items-center gap-2"><Activity size={16} /> Overview</span>,
              children: (
                <div className="space-y-6">
                  {/* Hero Section */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3a3a] via-[#2c6774] to-[#3a7a88] p-6 text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                    
                    <div className="relative flex items-start gap-6">
                      <div className="shrink-0">
                        {getImageUrl(selectedDoctor.image) ? (
                          <img src={getImageUrl(selectedDoctor.image)} alt={selectedDoctor.name}
                            className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<div class="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border border-white/20">' + (selectedDoctor.name?.charAt(0) || 'D') + '</div>'; }} />
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
                                <span className="font-semibold">{avgRating.toFixed(1)}</span>
                                <span className="text-white/60 text-sm">({selectedDoctorReviews.length} reviews)</span>
                              </div>
                              <span className="text-white/30">|</span>
                              <span className="text-sm">{docAppts.length} total appointments</span>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${
                            selectedDoctor.isActive !== false ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {selectedDoctor.isActive !== false ? '● Active' : '● Inactive'}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-white/70 flex-wrap">
                          {selectedDoctor.qualification && <span className="flex items-center gap-1"><Award size={14} /> {selectedDoctor.qualification}</span>}
                          {selectedDoctor.experience && <span className="flex items-center gap-1"><Calendar size={14} /> {selectedDoctor.experience}</span>}
                          <span className="flex items-center gap-1"><DollarSign size={14} /> Fee: Rs {selectedDoctor.fee?.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><User size={14} /> ID: {selectedDoctor._id?.slice(-8)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
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

                  {/* Completion Rate & Additional Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">Pending Revenue</span>
                        <span className="text-sm font-bold text-amber-600">Rs {stats.pendingRevenue.toLocaleString()}</span>
                      </div>
                      <Progress percent={stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0} strokeColor="#faad14" trailColor="#e5e7eb" size="small" showInfo={false} />
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>{stats.pending} pending appointments</span>
                        <span>Avg Rs {stats.pending > 0 ? Math.round(stats.pendingRevenue / stats.pending).toLocaleString() : 0}/appt</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Revenue */}
                  {monthlyRevenue.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#2c6774]" /> Monthly Revenue
                      </h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Appts</th><th className="px-4 py-2 text-right">Avg</th></tr>
                        </thead>
                        <tbody>
                          {monthlyRevenue.map((m, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{m.month}</td>
                              <td className="px-4 py-2 text-right font-semibold">Rs {m.revenue.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{m.appointments}</td>
                              <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.appointments).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Services & Availability */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      ) : <p className="text-sm text-gray-400">No services listed</p>}
                    </div>
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
                      ) : <p className="text-sm text-gray-400">No availability set</p>}
                    </div>
                  </div>

                  {/* Linked User */}
                  {selectedDoctor.user && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <User size={16} className="text-blue-600" /> Linked User Account
                      </h4>
                      {linkedUser ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">Name</p><p className="text-sm font-semibold text-gray-800 mt-0.5">{linkedUser.name}</p></div>
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">Email</p><p className="text-sm text-gray-700 mt-0.5">{linkedUser.email}</p></div>
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">Role</p><p className="text-sm font-medium text-blue-700 capitalize mt-0.5">{linkedUser.role}</p></div>
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">Verified</p><p className={`text-sm font-medium mt-0.5 ${linkedUser.isVerified ? 'text-green-600' : 'text-amber-600'}`}>{linkedUser.isVerified ? '✓ Verified' : 'Unverified'}</p></div>
                        </div>
                      ) : <p className="text-sm text-gray-500">User data not found - Doctor's user field: {JSON.stringify(selectedDoctor.user)}</p>}
                    </div>
                  )}

                  {/* Doctor Info Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Doctor ID</p>
                      <p className="text-sm font-medium break-all text-gray-800 mt-0.5 font-mono text-xs">{selectedDoctor._id}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Member Since</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedDoctor.createdAt ? new Date(selectedDoctor.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Reviews</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{selectedDoctorReviews.length} total</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Rating</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5 flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {avgRating.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: 'appointments',
              label: <span className="flex items-center gap-2"><Calendar size={16} /> Appointments ({docAppts.length})</span>,
              children: (
                <div>
                  <div className="mb-3 flex gap-2 flex-wrap">
                    <Tag color="green">Completed: {stats.completed}</Tag>
                    <Tag color="orange">Pending: {stats.pending}</Tag>
                    <Tag color="red">Cancelled: {stats.cancelled}</Tag>
                    <Tag color="blue">Total: {stats.total}</Tag>
                  </div>
                  {docAppts.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">No appointments found for this doctor</p>
                  ) : (
                    <Table columns={appointmentColumns} dataSource={docAppts} rowKey="_id" pagination={{ pageSize: 10 }} />
                  )}
                </div>
              ),
            },
            {
              key: 'reviews',
              label: <span className="flex items-center gap-2"><MessageSquare size={16} /> Reviews ({selectedDoctorReviews.length})</span>,
              children: (
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Tag color="blue">{selectedDoctorReviews.length} Reviews</Tag>
                    <span className="flex items-center gap-1 text-sm">
                      <Star size={16} className="text-amber-400 fill-amber-400" /> 
                      <span className="font-semibold">{avgRating.toFixed(1)}</span> average rating
                    </span>
                  </div>
                  {detailLoading ? (
                    <div className="flex justify-center py-8"><Spin /></div>
                  ) : selectedDoctorReviews.length === 0 ? (
                    <p className="text-center py-8 text-gray-400">No reviews yet for this doctor</p>
                  ) : (
                    <Table columns={reviewColumns} dataSource={selectedDoctorReviews} rowKey="_id" pagination={{ pageSize: 10 }} />
                  )}
                </div>
              ),
            },
            {
              key: 'revenue',
              label: <span className="flex items-center gap-2"><DollarSign size={16} /> Revenue</span>,
              children: (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                      <p className="text-2xl font-bold text-green-600">Rs {stats.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Revenue</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                      <p className="text-2xl font-bold text-blue-600">Rs {stats.completed > 0 ? Math.round(stats.revenue / stats.completed).toLocaleString() : 0}</p>
                      <p className="text-xs text-gray-500">Avg Per Appointment</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
                      <p className="text-2xl font-bold text-amber-600">Rs {stats.pendingRevenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Pending Revenue</p>
                    </div>
                  </div>

                  {monthlyRevenue.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                      <h4 className="text-sm font-bold text-gray-800 mb-3">Monthly Revenue Breakdown</h4>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">Revenue</th><th className="px-4 py-2 text-right">Appts</th><th className="px-4 py-2 text-right">Avg</th><th className="px-4 py-2 text-right">%</th></tr>
                        </thead>
                        <tbody>
                          {monthlyRevenue.map((m, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{m.month}</td>
                              <td className="px-4 py-2 text-right font-semibold text-green-600">Rs {m.revenue.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{m.appointments}</td>
                              <td className="px-4 py-2 text-right">Rs {Math.round(m.revenue / m.appointments).toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">{stats.revenue > 0 ? ((m.revenue / stats.revenue) * 100).toFixed(1) : 0}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Insights</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Total revenue: Rs {stats.revenue.toLocaleString()} from {stats.completed} completed appointments</li>
                      <li>• Average per appointment: Rs {stats.completed > 0 ? Math.round(stats.revenue / stats.completed).toLocaleString() : 0}</li>
                      <li>• Pending revenue: Rs {stats.pendingRevenue.toLocaleString()} from {stats.pending} pending appointments</li>
                      <li>• {stats.uniquePatients} unique patients served</li>
                    </ul>
                  </div>
                </div>
              ),
            },
          ];

          return (
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" type="card" />
          );
        })()}
      </Modal>

      {/* Add Specialty Modal */}
      <Modal
        title="Add New Specialty"
        open={addSpecialtyModal}
        onCancel={() => { setAddSpecialtyModal(false); setSpecialtyForm({ name: '', desc: '', doctors: '' }); }}
        footer={null}
        width={500}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty Name *</label>
            <input
              type="text"
              placeholder="e.g. Cardiologist"
              value={specialtyForm.name}
              onChange={(e) => setSpecialtyForm({...specialtyForm, name: e.target.value})}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              placeholder="Describe the specialty..."
              value={specialtyForm.desc}
              onChange={(e) => setSpecialtyForm({...specialtyForm, desc: e.target.value})}
              rows={3}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Doctors Count</label>
            <input
              type="number"
              placeholder="0"
              value={specialtyForm.doctors}
              onChange={(e) => setSpecialtyForm({...specialtyForm, doctors: e.target.value})}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2c6774]"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => { setAddSpecialtyModal(false); setSpecialtyForm({ name: '', desc: '', doctors: '' }); }}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSpecialty}
              className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Add Specialty
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}