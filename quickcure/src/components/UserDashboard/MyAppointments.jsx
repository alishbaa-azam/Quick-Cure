import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaPhone, FaMapMarkerAlt, FaTimes, FaSpinner, FaEdit, FaTrash } from 'react-icons/fa';
import { getUserAppointments, cancelAppointment } from '../../api/userApi';

const MyAppointments = ({ refreshTrigger, onStatsUpdate }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    patientName: '',
    phoneNo: '',
    email: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    // Get current user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
    
    fetchAppointments();
  }, [refreshTrigger]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to get from API first
      const result = await getUserAppointments();
      
      if (result.success && result.data && result.data.length > 0) {
        setAppointments(result.data);
        // Update stats in parent component
        if (onStatsUpdate) {
          onStatsUpdate(result.data.length);
        }
      } else {
        // If API fails or returns no data, try localStorage
        const localAppointments = getLocalAppointments();
        if (localAppointments && localAppointments.length > 0) {
          setAppointments(localAppointments);
          if (onStatsUpdate) {
            onStatsUpdate(localAppointments.length);
          }
        } else {
          setAppointments([]);
          if (onStatsUpdate) {
            onStatsUpdate(0);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      // Fallback to localStorage
      const localAppointments = getLocalAppointments();
      if (localAppointments && localAppointments.length > 0) {
        setAppointments(localAppointments);
        if (onStatsUpdate) {
          onStatsUpdate(localAppointments.length);
        }
      } else {
        setAppointments([]);
        if (onStatsUpdate) {
          onStatsUpdate(0);
        }
      }
    }
    
    setLoading(false);
  };

  // Get appointments from localStorage
  const getLocalAppointments = () => {
    try {
      const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?.id || user?._id || 'guest';
      
      // Try user-specific key first
      let appointments = JSON.parse(localStorage.getItem(`appointments_${userKey}`) || '[]');
      
      // If no user-specific appointments, try by phone
      if ((!appointments || appointments.length === 0) && (user.phone || user.mobile)) {
        const phone = user.phone || user.mobile;
        appointments = JSON.parse(localStorage.getItem(`appointments_phone_${phone}`) || '[]');
      }
      
      return appointments;
    } catch (error) {
      console.error('Error getting local appointments:', error);
      return [];
    }
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setEditForm({
      patientName: appointment.patientName || '',
      phoneNo: appointment.phoneNo || '',
      email: appointment.email || '',
      date: appointment.date || '',
      time: appointment.time || ''
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async () => {
    if (!selectedAppointment) return;
    
    setEditingId(selectedAppointment.id);
    setShowEditModal(false);
    
    try {
      // Update in localStorage
      const updated = updateAppointmentInLocal(selectedAppointment.id, editForm);
      
      if (updated) {
        // Refresh appointments
        await fetchAppointments();
      } else {
        setError('Failed to update appointment');
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Failed to update appointment');
    }
    
    setEditingId(null);
    setSelectedAppointment(null);
  };

  const handleCancelConfirm = async () => {
    if (!selectedAppointment) return;
    
    const appointmentId = selectedAppointment._id || selectedAppointment.id;
    setCancellingId(appointmentId);
    setShowCancelModal(false);
    
    try {
      // Try API cancel first
      const result = await cancelAppointment(appointmentId, cancelReason);
      
      if (result.success) {
        // Remove from localStorage
        removeAppointmentFromLocal(appointmentId);
        console.log('Appointment cancelled from API');
      } else {
        // If API fails, still remove from localStorage
        removeAppointmentFromLocal(appointmentId);
        console.log('Appointment cancelled locally');
      }
      
      // Immediately update UI by filtering out the cancelled appointment
      const updatedAppointments = appointments.filter(apt => (apt._id || apt.id) !== appointmentId);
      setAppointments(updatedAppointments);
      
      // Update stats in parent component
      if (onStatsUpdate) {
        onStatsUpdate(updatedAppointments.length);
      }
      
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      // Still remove from localStorage even if API fails
      removeAppointmentFromLocal(appointmentId);
      
      // Immediately update UI
      const updatedAppointments = appointments.filter(apt => (apt._id || apt.id) !== appointmentId);
      setAppointments(updatedAppointments);
      
      // Update stats in parent component
      if (onStatsUpdate) {
        onStatsUpdate(updatedAppointments.length);
      }
    }
    
    setCancellingId(null);
    setCancelReason('');
    setSelectedAppointment(null);
  };

  // Update appointment in localStorage
  const updateAppointmentInLocal = (appointmentId, updatedData) => {
    try {
      const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?.id || user?._id || 'guest';
      const storageKey = `appointments_${userKey}`;
      
      const appointments = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updatedAppointments = appointments.map(apt => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            patientName: updatedData.patientName,
            phoneNo: updatedData.phoneNo,
            email: updatedData.email,
            date: updatedData.date,
            time: updatedData.time
          };
        }
        return apt;
      });
      
      localStorage.setItem(storageKey, JSON.stringify(updatedAppointments));
      
      // Also update phone-based storage
      if (user.phone || user.mobile) {
        const phone = user.phone || user.mobile;
        const phoneKey = `appointments_phone_${phone}`;
        localStorage.setItem(phoneKey, JSON.stringify(updatedAppointments));
      }
      
      return true;
    } catch (error) {
      console.error('Error updating in localStorage:', error);
      return false;
    }
  };

  // Remove appointment from localStorage (CANCEL)
  const removeAppointmentFromLocal = (appointmentId) => {
    try {
      const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?.id || user?._id || 'guest';
      const storageKey = `appointments_${userKey}`;
      
      const appointments = JSON.parse(localStorage.getItem(storageKey) || '[]');
      // Filter out the appointment with matching id
      const updatedAppointments = appointments.filter(apt => 
        (apt.id !== appointmentId) && (apt._id !== appointmentId)
      );
      
      localStorage.setItem(storageKey, JSON.stringify(updatedAppointments));
      
      // Also update phone-based storage
      if (user.phone || user.mobile) {
        const phone = user.phone || user.mobile;
        const phoneKey = `appointments_phone_${phone}`;
        localStorage.setItem(phoneKey, JSON.stringify(updatedAppointments));
      }
      
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-PK', options);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
      'no-show': { color: 'bg-gray-100 text-gray-800', label: 'No Show' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getDoctorImage = (appointment) => {
    // Try to get doctor image from various sources
    if (appointment.doctor?.image) {
      return appointment.doctor.image;
    }
    // Default placeholder
    return 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary-color)' }}>
          My Appointments
        </h2>
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-3xl" style={{ color: 'var(--primary-color)' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--secondary-color)' }}>
          My Appointments
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--accent-color)' }}>
          View and manage your appointments
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Appointments List */}
      <div className="p-6">
        {!appointments || appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FaCalendarAlt className="text-3xl" style={{ color: 'var(--accent-color)' }} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't booked any appointments yet</p>
            <button 
              className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition"
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => window.location.href = '/doctors'}
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const appointmentId = appointment._id || appointment.id;
              const isCancelling = cancellingId === appointmentId;
              
              return (
                <div 
                  key={appointmentId}
                  className={`border rounded-xl p-5 hover:shadow-md transition-all relative ${
                    isCancelling ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  style={{ borderColor: 'var(--bg-light)' }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(appointment.status)}
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      <img 
                        src={getDoctorImage(appointment)} 
                        alt={appointment.doctor?.name || 'Doctor'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" style={{ color: 'var(--secondary-color)' }}>
                        {appointment.doctor?.name || 'Doctor'}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--accent-color)' }}>
                        {appointment.doctor?.speciality || 'General Physician'}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-sm" style={{ color: 'var(--accent-color)' }} />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-medium">{formatDate(appointment.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaClock className="text-sm" style={{ color: 'var(--accent-color)' }} />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-sm font-medium">{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-sm" style={{ color: 'var(--accent-color)' }} />
                      <div>
                        <p className="text-xs text-gray-500">Contact</p>
                        <p className="text-sm font-medium">{appointment.phoneNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Show for all appointments that are not completed */}
                  {appointment.status !== 'completed' && (
                    <div className="flex justify-end space-x-3 pt-3 border-t" style={{ borderColor: 'var(--bg-light)' }}>
                      <button 
                        className="px-4 py-2 text-sm rounded-lg border transition flex items-center gap-2"
                        style={{ 
                          borderColor: 'var(--primary-color)', 
                          color: 'var(--primary-color)',
                          backgroundColor: 'transparent'
                        }}
                        onClick={() => handleEditClick(appointment)}
                        disabled={isCancelling || editingId === appointmentId}
                      >
                        {editingId === appointmentId ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <>
                            <FaEdit /> Edit
                          </>
                        )}
                      </button>
                      <button 
                        className="px-4 py-2 text-sm rounded-lg text-white transition hover:opacity-90 flex items-center gap-2"
                        style={{ backgroundColor: '#174047' }}
                        onClick={() => handleCancelClick(appointment)}
                        disabled={isCancelling}
                      >
                        {isCancelling ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <>
                            <FaTrash /> Cancel
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal - WITH BLUR EFFECT */}
      {showCancelModal && selectedAppointment && (
        <>
          {/* Blur overlay */}
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                  Cancel Appointment
                </h3>
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to cancel your appointment with{' '}
                <span className="font-medium">{selectedAppointment.doctor?.name}</span> on{' '}
                {formatDate(selectedAppointment.date)} at {selectedAppointment.time}?
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for cancellation (optional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--bg-light)' }}
                  placeholder="Please tell us why you're cancelling this appointment..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition"
                  style={{ borderColor: 'var(--bg-light)', color: 'var(--accent-color)' }}
                >
                  Keep Appointment
                </button>
                <button 
                  onClick={handleCancelConfirm} 
                  className="flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium transition hover:opacity-90" 
                  style={{ backgroundColor: 'var(--secondary-color)' }}
                >
                  Yes, Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Appointment Modal - WITH BLUR EFFECT */}
      {showEditModal && selectedAppointment && (
        <>
          {/* Blur overlay */}
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                  Edit Appointment
                </h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={editForm.patientName}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--bg-light)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={editForm.phoneNo}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--bg-light)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--bg-light)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--bg-light)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={editForm.time}
                    onChange={handleEditChange}
                    placeholder="e.g., 09:00 AM - 09:15 AM"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--bg-light)' }}
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition"
                  style={{ borderColor: 'var(--bg-light)', color: 'var(--accent-color)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="flex-1 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppointments;