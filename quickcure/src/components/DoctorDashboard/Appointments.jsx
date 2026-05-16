import React, { useState, useEffect } from 'react';
import { Filter, Check, X, Clock, Video, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { getDoctorAppointments, updateAppointmentStatus } from '../../api/doctorApi';

const Appointments = ({ doctorId, setActiveTab, setSelectedPatient }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [meetLinkModal, setMeetLinkModal] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

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

  const handleViewHistory = (appt) => {
    const patientData = {
      id: appt._id || appt.id || appt.phoneNo,
      name: appt.patientName || 'Unknown',
      contact: appt.phoneNo || appt.contact || '',
      email: appt.patientEmail || appt.email || '',
      age: appt.patientAge || '',
      gender: appt.patientGender || '',
      lastVisit: appt.date || appt.appointmentDate || ''
    };
    setSelectedPatient(patientData);
    setActiveTab('patient-history');
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    setActionLoading(appointmentId);
    const result = await updateAppointmentStatus(appointmentId, newStatus);
    if (result.success) {
      fetchAppointments();
    }
    setActionLoading(null);
  };

  const getStatusColor = (status) => {
    switch((status || '').toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = statusFilter === 'all' 
    ? appointments 
    : appointments.filter(a => (a.status || '').toLowerCase() === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Appointments</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="mx-auto w-12 h-12 mb-3 text-gray-300" />
            <p>No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Patient Name</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Contact</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Appointment Date</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Time</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Status</th>
                    <th className="text-left py-3 px-3 md:py-4 md:px-6 text-gray-600 font-medium text-xs md:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appt) => (
                    <tr key={appt._id || appt.id || appt.phoneNo} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.patientName || 'Unknown'}</td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.phoneNo || appt.contact || 'N/A'}</td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.date || appt.appointmentDate || 'N/A'}</td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">{appt.time || appt.appointmentTime || 'N/A'}</td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                          {appt.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-sm">
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          <button 
                            onClick={() => handleViewHistory(appt)}
                            className="px-3 py-1 text-xs md:text-sm bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] whitespace-nowrap"
                          >
                            View History
                          </button>
                          {['pending', 'approved', 'confirmed'].includes((appt.status || '').toLowerCase()) && (
                            <button
                              title="Generate & Copy Google Meet Link"
                              onClick={() => {
                                const meetLink = `https://meet.google.com/new?hc=${Date.now()}&authuser=0`;
                                navigator.clipboard.writeText(meetLink).then(() => {
                                  setCopiedId(appt._id || appt.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                });
                              }}
                              className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 whitespace-nowrap flex items-center gap-1"
                            >
                              {copiedId === (appt._id || appt.id) ? (
                                <><CheckCircle size={14} /> Copied</>
                              ) : (
                                <><Video size={14} /> Meet</>
                              )}
                            </button>
                          )}
                          {(appt.status || '').toLowerCase() === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(appt._id || appt.id, 'approved')}
                                disabled={actionLoading === (appt._id || appt.id)}
                                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appt._id || appt.id, 'cancelled')}
                                disabled={actionLoading === (appt._id || appt.id)}
                                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
