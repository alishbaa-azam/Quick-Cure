import React, { useState, useEffect } from 'react';
import { Check, X, Clock, Eye, Calendar as CalendarIcon, Phone, Mail, Search, Video, ExternalLink, Loader } from 'lucide-react';
import { getDoctorAppointments, updateAppointmentStatus, sendMeetLinkToPatient } from '../../api/doctorApi';

const Appointments = ({ doctorId, setActiveTab, setSelectedPatient }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [meetLink, setMeetLink] = useState('');
  const [meetSending, setMeetSending] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const fetchAppointments = async () => {
    setLoading(true);
    const result = await getDoctorAppointments(doctorId);
    if (result.success) {
      setAppointments(Array.isArray(result.data) ? result.data : []);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    setActionLoading(appointmentId);
    const result = await updateAppointmentStatus(appointmentId, newStatus);
    if (result.success) {
      fetchAppointments();
    }
    setActionLoading(null);
  };

  const handleViewHistory = (appt) => {
    const patientData = {
      id: appt._id || appt.id || appt.phoneNo || appt.patientEmail,
      name: appt.patientName || 'Unknown',
      contact: appt.phoneNo || appt.contact || '',
      email: appt.patientEmail || appt.email || '',
      age: appt.patientAge || appt.age || '',
      gender: appt.patientGender || appt.gender || '',
      lastVisit: appt.date || appt.appointmentDate || ''
    };
    setSelectedPatient(patientData);
    setActiveTab('patient-history');
  };

  const getStatusStyle = (status) => {
    const s = (status || '').toLowerCase();
    switch(s) {
      case 'approved':
      case 'confirmed':
        return { bg: 'bg-green-100 text-green-800 border-green-200', icon: '✓', label: 'Confirmed' };
      case 'pending':
      case 'booked':
        return { bg: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⏳', label: 'Pending' };
      case 'completed':
        return { bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: '✔', label: 'Completed' };
      case 'cancelled':
        return { bg: 'bg-red-100 text-red-800 border-red-200', icon: '✕', label: 'Cancelled' };
      default:
        return { bg: 'bg-gray-100 text-gray-800 border-gray-200', icon: '•', label: status || 'Unknown' };
    }
  };

  const filteredAndSearched = appointments.filter(a => {
    const matchesFilter = statusFilter === 'all' || (a.status || '').toLowerCase() === statusFilter;
    const matchesSearch = !searchTerm || 
      (a.patientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.phoneNo || a.contact || '').includes(searchTerm) ||
      (a.patientEmail || a.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const groupedByDate = filteredAndSearched.reduce((acc, appt) => {
    const date = appt.date || appt.appointmentDate || 'Unknown';
    if (!acc[date]) acc[date] = [];
    acc[date].push(appt);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return new Date(b) - new Date(a);
  });

  const handleOpenMeetModal = (appt) => {
    setSelectedAppointment(appt);
    setMeetLink(appt.meetLink || '');
    setShowMeetModal(true);
  };

  const handleSendMeetLink = async () => {
    if (!meetLink.trim()) {
      alert('Please enter a Google Meet link');
      return;
    }
    if (!meetLink.includes('meet.google.com')) {
      alert('Please enter a valid Google Meet link (e.g., https://meet.google.com/xxx-xxxx-xxx)');
      return;
    }
    setMeetSending(true);
    const result = await sendMeetLinkToPatient(selectedAppointment._id || selectedAppointment.id, meetLink);
    if (result.success) {
      alert('✅ Google Meet link sent successfully! Email has been sent to the patient.');
      setShowMeetModal(false);
      setSelectedAppointment(null);
      fetchAppointments();
    } else {
      alert(result.error || 'Failed to send meet link');
    }
    setMeetSending(false);
  };

  const formatTime = (time) => {
    if (!time) return '';
    if (time.includes('AM') || time.includes('PM')) return time;
    try {
      const [hours, minutes] = time.split(':');
      const h = parseInt(hours);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#174047]">Appointments</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredAndSearched.length} appointment{filteredAndSearched.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-auto">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-48 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredAndSearched.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-base mb-1">No appointments found</p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'Try adjusting your search or filter' : 'No appointments to display'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider">Patient</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Contact</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Date & Time</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAndSearched.map((appt, i) => {
                  const statusStyle = getStatusStyle(appt.status);
                  return (
                    <tr key={appt._id || appt.id || i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                            {(appt.patientName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{appt.patientName || 'Unknown'}</p>
                            {(appt.patientAge || appt.age) && (
                              <p className="text-xs text-gray-400">{appt.patientAge || appt.age}y{appt.patientGender ? ` • ${appt.patientGender}` : ''}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Phone size={13} className="text-gray-400 flex-shrink-0" />
                            <span>{appt.phoneNo || appt.contact || 'N/A'}</span>
                          </div>
                          {(appt.patientEmail || appt.email) && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                              <Mail size={13} className="text-gray-400 flex-shrink-0" />
                              <span className="truncate max-w-[180px]">{appt.patientEmail || appt.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon size={14} className="text-gray-400" />
                          <span>{appt.date || appt.appointmentDate || 'N/A'}</span>
                        </div>
                        {(appt.time || appt.appointmentTime) && (
                          <p className="text-xs text-gray-400 mt-0.5 ml-6">{formatTime(appt.time || appt.appointmentTime)}</p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusStyle.bg}`}>
                          <span>{statusStyle.icon}</span>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {appt.meetLink && (
                            <a href={appt.meetLink} target="_blank" rel="noopener noreferrer"
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Join Google Meet">
                              <ExternalLink size={14} />
                            </a>
                          )}
                          <button
                            onClick={() => handleOpenMeetModal(appt)}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Send Google Meet Link"
                          >
                            <Video size={14} />
                          </button>
                          <button
                            onClick={() => handleViewHistory(appt)}
                            className="px-3 py-1.5 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-1.5"
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                          {['pending', 'booked'].includes((appt.status || '').toLowerCase()) && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleStatusUpdate(appt._id || appt.id, 'completed')}
                                disabled={actionLoading === (appt._id || appt.id)}
                                className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 disabled:opacity-50 transition-colors border border-emerald-200"
                                title="Mark as Completed"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appt._id || appt.id, 'cancelled')}
                                disabled={actionLoading === (appt._id || appt.id)}
                                className="p-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors border border-red-200"
                                title="Cancel Appointment"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredAndSearched.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CalendarIcon className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No appointments</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          sortedDates.map(date => (
            <div key={date} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <CalendarIcon size={14} className="text-[#2c6774]" />
                <span className="text-sm font-semibold text-gray-700">{date}</span>
                <span className="text-xs text-gray-400">({groupedByDate[date].length})</span>
              </div>
              {groupedByDate[date].map((appt, i) => {
                const statusStyle = getStatusStyle(appt.status);
                return (
                  <div key={appt._id || appt.id || i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {(appt.patientName || '?').charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{appt.patientName || 'Unknown'}</p>
                          <p className="text-xs text-gray-500 truncate">{appt.phoneNo || appt.contact || 'No contact'}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${statusStyle.bg}`}>
                        <span>{statusStyle.icon}</span>
                        {statusStyle.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      {(appt.time || appt.appointmentTime) && (
                        <span className="flex items-center gap-1"><Clock size={12} />{formatTime(appt.time || appt.appointmentTime)}</span>
                      )}
                      {(appt.patientAge || appt.age) && <span>{appt.patientAge || appt.age}y</span>}
                      {appt.patientGender && <span>{appt.patientGender}</span>}
                    </div>

                    {appt.meetLink && (
                      <div className="mt-2">
                        <a href={appt.meetLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] text-green-600 hover:text-green-700 font-medium">
                          <ExternalLink size={12} /> Join Google Meet
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                      <button onClick={() => handleOpenMeetModal(appt)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200" title="Send Meet Link">
                        <Video size={16} />
                      </button>
                      <button onClick={() => handleViewHistory(appt)}
                        className="flex-1 px-3 py-2 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors text-center">
                        View History
                      </button>
                      {['pending', 'booked'].includes((appt.status || '').toLowerCase()) && (
                        <>
                          <button onClick={() => handleStatusUpdate(appt._id || appt.id, 'completed')}
                            disabled={actionLoading === (appt._id || appt.id)}
                            className="p-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 disabled:opacity-50 transition-colors border border-emerald-200">
                            <Check size={16} />
                          </button>
                          <button onClick={() => handleStatusUpdate(appt._id || appt.id, 'cancelled')}
                            disabled={actionLoading === (appt._id || appt.id)}
                            className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors border border-red-200">
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Google Meet Link Modal */}
      {showMeetModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-100">
                  <Video size={18} className="text-purple-600" />
                </div>
                <h3 className="text-base font-bold text-[#174047]">Send Google Meet Link</h3>
              </div>
              <button onClick={() => setShowMeetModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm text-gray-700 mb-1">
                  Patient: <strong>{selectedAppointment.patientName}</strong>
                </p>
                <p className="text-xs text-gray-500">
                  {selectedAppointment.date} at {formatTime(selectedAppointment.time || selectedAppointment.appointmentTime)}
                </p>
                {selectedAppointment.email && (
                  <p className="text-xs text-green-600 mt-1">📧 {selectedAppointment.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Google Meet Link *</label>
                <input type="url" value={meetLink} onChange={(e) => setMeetLink(e.target.value)}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                <p className="text-[10px] text-gray-400 mt-1">Paste a Google Meet link to share with the patient</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <p className="text-[11px] text-amber-700">
                  💡 The patient will receive this link via email and it will also appear on their dashboard.
                </p>
              </div>
              <button onClick={handleSendMeetLink} disabled={meetSending}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 text-sm font-medium disabled:opacity-50 transition-all">
                {meetSending ? <Loader className="animate-spin" size={16} /> : <Video size={16} />}
                {meetSending ? 'Sending...' : 'Send Meet Link to Patient'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;