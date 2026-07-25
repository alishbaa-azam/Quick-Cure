import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt, FaClock, FaPhone, FaSpinner, FaEdit, FaTrash, FaTimes
} from 'react-icons/fa';
import { getUserAppointments, cancelAppointment } from '../../api/userApi';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const STATUS_CFG = {
  pending:     { color: 'bg-amber-100  text-amber-800',  label: 'Pending'     },
  confirmed:   { color: 'bg-green-100  text-green-800',  label: 'Confirmed'   },
  cancelled:   { color: 'bg-red-100    text-red-800',    label: 'Cancelled'   },
  completed:   { color: 'bg-blue-100   text-blue-800',   label: 'Completed'   },
  rescheduled: { color: 'bg-violet-100 text-violet-800', label: 'Rescheduled' },
  'no-show':   { color: 'bg-gray-100   text-gray-800',   label: 'No Show'     },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[(status || '').toLowerCase()] || STATUS_CFG.pending;
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>;
};

/* ─── helpers ────────────────────────────────────────────────────── */
const formatDate = d => {
  if (!d) return 'N/A';
  return new Date(d).toLocaleDateString('en-PK', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });
};

const getDoctorImage = appt => {
  if (appt.doctor?.image) {
    return appt.doctor.image.startsWith('http')
      ? appt.doctor.image
      : `${API_BASE}${appt.doctor.image}`;
  }
  return 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
};

const notifyDoctorDashboard = () => {
  const ts = Date.now().toString();
  try {
    const bc = new BroadcastChannel('appointment_updates');
    bc.postMessage({ type: 'APPOINTMENT_UPDATED', ts });
    bc.close();
  } catch (_) { /* BroadcastChannel not available */ }

  window.dispatchEvent(new CustomEvent('appointmentUpdated', { detail: { ts } }));

  localStorage.setItem('doctor_dashboard_last_update', ts);
  localStorage.setItem('patient_appointments_last_update', ts);
};

const MyAppointments = ({ refreshTrigger, onStatsUpdate }) => {
  const [appointments,    setAppointments]    = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [successMsg,      setSuccessMsg]      = useState(null);
  const [cancellingId,    setCancellingId]    = useState(null);
  const [editingId,       setEditingId]       = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal,   setShowEditModal]   = useState(false);
  const [selectedAppt,    setSelectedAppt]    = useState(null);
  const [cancelReason,    setCancelReason]    = useState('');
  const [currentUser,     setCurrentUser]     = useState(null);

  // Edit form
  const [editForm,       setEditForm]       = useState({ patientName: '', phoneNo: '', email: '', date: '', time: '' });
  const [doctor,         setDoctor]         = useState(null);
  const [slots,          setSlots]          = useState([]);
  const [loadingSlots,   setLoadingSlots]   = useState(false);
  const [loadingDoctor,  setLoadingDoctor]  = useState(false);

  useEffect(() => {
    try { setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}')); } catch {}
    fetchAppointments();
  }, [refreshTrigger]);

  /* ── Fetch ── */
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUserAppointments();
      if (result.success && result.data?.length) {
        setAppointments(result.data);
        syncMeetLinksToLocal(result.data);
        onStatsUpdate?.(result.data.length);
      } else {
        const local = getLocalAppointments();
        setAppointments(local);
        onStatsUpdate?.(local.length);
      }
    } catch {
      const local = getLocalAppointments();
      setAppointments(local);
      onStatsUpdate?.(local.length);
    }
    setLoading(false);
  };

  const getLocalAppointments = () => {
    try {
      const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const key  = user?.id || user?._id || 'guest';
      let apps = JSON.parse(localStorage.getItem(`appointments_${key}`) || '[]');
      if (!apps.length && (user.phone || user.mobile)) {
        apps = JSON.parse(
          localStorage.getItem(`appointments_phone_${user.phone || user.mobile}`) || '[]'
        );
      }
      return apps;
    } catch { return []; }
  };

  const syncMeetLinksToLocal = apiApps => {
    try {
      const user  = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const key   = `appointments_${user?.id || user?._id || 'guest'}`;
      const local = JSON.parse(localStorage.getItem(key) || '[]');
      const updated = local.map(la => {
        const match = apiApps.find(a => (a._id || a.id) === (la._id || la.id));
        return match?.meetLink && match.meetLink !== la.meetLink
          ? { ...la, meetLink: match.meetLink }
          : la;
      });
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {}
  };

  /* ── Reschedule (Edit) ── */
  const fetchDoctorDetails = async doctorId => {
    if (!doctorId) return null;
    setLoadingDoctor(true);
    try {
      return (await axios.get(`${API_BASE}/api/doctors/${doctorId}`)).data;
    } catch { return null; }
    finally { setLoadingDoctor(false); }
  };

  const fetchSlots = async (doctorId, date) => {
    if (!date || !doctorId) return;
    setLoadingSlots(true);
    try {
      const res = await axios.get(`${API_BASE}/api/appointments/slots`, {
        params: { doctorId, date },
      });
      setSlots(
        res.data.success
          ? res.data.availableSlots.map(s => `${s.startTime12} - ${s.endTime12}`)
          : []
      );
    } catch { setSlots([]); }
    finally { setLoadingSlots(false); }
  };

  const handleEditClick = async appt => {
    setSelectedAppt(appt);
    setEditForm({
      patientName: appt.patientName || '',
      phoneNo:     appt.phoneNo     || '',
      email:       appt.email       || '',
      date:        appt.date        || '',
      time:        appt.time        || '',
    });
    const doctorId   = appt.doctor?.id || appt.doctorId || appt.doctor?._id;
    const doctorData = doctorId ? await fetchDoctorDetails(doctorId) : null;
    setDoctor(doctorData || {
      name:      appt.doctor?.name      || 'Doctor',
      speciality: appt.doctor?.speciality || 'General Physician',
    });
    if (doctorId && appt.date) await fetchSlots(doctorId, appt.date);
    setShowEditModal(true);
  };

  const handleDateChange = async e => {
    const date = e.target.value;
    if (new Date(date) < new Date(new Date().toDateString())) {
      setError('Cannot select past dates');
      return;
    }
    setEditForm(prev => ({ ...prev, date, time: '' }));
    const doctorId = selectedAppt?.doctor?.id || selectedAppt?.doctorId;
    if (doctorId) await fetchSlots(doctorId, date);
  };

  /* ── Save reschedule ── */
  const handleEditSubmit = async () => {
    if (!selectedAppt) return;

    // Validation
    if (!editForm.patientName.trim())
      return setError('Enter patient name');
    if (!/^03\d{9}$/.test(editForm.phoneNo))
      return setError('Enter valid Pakistani phone (03XXXXXXXXX)');
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email))
      return setError('Enter valid email');
    if (!editForm.date || !editForm.time)
      return setError('Select both date and time');

    const apptId = selectedAppt._id || selectedAppt.id;
    setEditingId(apptId);

    const updateData = {
      date:           editForm.date,
      time:           editForm.time,
      patientName:    editForm.patientName,
      phoneNo:        editForm.phoneNo,
      email:          editForm.email,
      // ── KEY FIX: always set status to 'rescheduled' ──
      status:         'rescheduled',
      originalDate:   selectedAppt.date,
      originalTime:   selectedAppt.time,
      rescheduledAt:  new Date().toISOString(),
    };

    try {
      // 1. Optimistically update the patient's local state right away
      setAppointments(prev =>
        prev.map(a =>
          (a._id || a.id) === apptId ? { ...a, ...updateData } : a
        )
      );

      // 2. Persist to localStorage for the patient
      updateLocal(apptId, updateData);

      // 3. Sync with backend — PATCH the EXISTING appointment (never POST a new one)
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.patch(
          `${API_BASE}/api/appointments/${apptId}`,
          updateData,
          {
            headers: {
              Authorization:  `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.data.success) {
          // Roll back the optimistic update if the server rejected it
          await fetchAppointments();
          setError('Server rejected the reschedule. Please try again.');
          setEditingId(null);
          return;
        }
      }

      // 4. Notify doctor dashboard (same tab AND other tabs)
      notifyDoctorDashboard();

      // 5. Refresh from server to get the canonical state
      await fetchAppointments();

      closeEditModal();
      setError(null);
      setSuccessMsg('✅ Appointment rescheduled successfully! The doctor has been notified.');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Reschedule error:', err);
      // Roll back on network error
      await fetchAppointments();
      setError('Failed to reschedule appointment. Please try again.');
    }

    setEditingId(null);
  };

  /* ── Cancel ── */
  const handleCancelClick   = appt => { setSelectedAppt(appt); setShowCancelModal(true); };

  const handleCancelConfirm = async () => {
    if (!selectedAppt) return;
    const id = selectedAppt._id || selectedAppt.id;
    setCancellingId(id);
    setShowCancelModal(false);

    try {
      await cancelAppointment(id, cancelReason);
      removeLocal(id);

      const updated = appointments.filter(a => (a._id || a.id) !== id);
      setAppointments(updated);
      onStatsUpdate?.(updated.length);

      notifyDoctorDashboard();

      setSuccessMsg('✅ Appointment cancelled successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setError('Failed to cancel appointment');
    }

    setCancellingId(null);
    setCancelReason('');
    setSelectedAppt(null);
  };

  /* ── localStorage helpers ── */
  const updateLocal = (apptId, data) => {
    try {
      const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const key  = `appointments_${user?.id || user?._id || 'guest'}`;
      const apps = JSON.parse(localStorage.getItem(key) || '[]').map(a =>
        (a.id === apptId || a._id === apptId) ? { ...a, ...data } : a
      );
      localStorage.setItem(key, JSON.stringify(apps));
      if (user.phone || user.mobile) {
        localStorage.setItem(
          `appointments_phone_${user.phone || user.mobile}`,
          JSON.stringify(apps)
        );
      }
    } catch (err) {
      console.error('Error updating local storage:', err);
    }
  };

  const removeLocal = apptId => {
    try {
      const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');
      const key  = `appointments_${user?.id || user?._id || 'guest'}`;
      const apps = JSON.parse(localStorage.getItem(key) || '[]')
        .filter(a => a.id !== apptId && a._id !== apptId);
      localStorage.setItem(key, JSON.stringify(apps));
      if (user.phone || user.mobile) {
        localStorage.setItem(
          `appointments_phone_${user.phone || user.mobile}`,
          JSON.stringify(apps)
        );
      }
    } catch {}
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAppt(null);
    setDoctor(null);
    setSlots([]);
    setError(null);
  };

  /* ── Render ── */
  if (loading) return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary-color)' }}>
        My Appointments
      </h2>
      <div className="flex justify-center py-12">
        <FaSpinner className="animate-spin text-3xl" style={{ color: 'var(--primary-color)' }} />
      </div>
    </div>
  );

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

      {/* Messages */}
      {successMsg && (
        <div className="mx-6 mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-sm text-green-700">{successMsg}</p>
        </div>
      )}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-xs font-semibold text-red-700 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* List */}
      <div className="p-6">
        {!appointments.length ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FaCalendarAlt className="text-3xl" style={{ color: 'var(--accent-color)' }} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't booked any appointments yet</p>
            <button
              className="px-6 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => (window.location.href = '/doctors')}
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map(appt => {
              const id           = appt._id || appt.id;
              const cancelling   = cancellingId === id;
              const isRescheduled = (appt.status || '').toLowerCase() === 'rescheduled';

              return (
                <div
                  key={id}
                  className={`border rounded-2xl p-5 hover:shadow-md transition-all relative ${
                    cancelling ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  style={{ borderColor: 'var(--bg-light)' }}
                >
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <StatusBadge status={appt.status} />
                  </div>

                  {/* Doctor info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      <img
                        src={getDoctorImage(appt)}
                        alt={appt.doctor?.name || 'Doctor'}
                        className="w-full h-full object-contain"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: 'var(--secondary-color)' }}>
                        {appt.doctor?.name || 'Doctor'}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--accent-color)' }}>
                        {appt.doctor?.speciality || 'General Physician'}
                      </p>
                      {isRescheduled && (
                        <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                          <span>↻</span> Rescheduled
                          {appt.originalDate && appt.originalDate !== appt.date && (
                            <span className="text-[10px] text-violet-600 font-normal">
                              (was {formatDate(appt.originalDate)})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-sm flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Date</p>
                        <p className={`text-sm font-medium ${isRescheduled ? 'text-violet-700' : ''}`}>
                          {formatDate(appt.date)}
                          {isRescheduled && appt.originalDate && appt.originalDate !== appt.date && (
                            <span className="text-xs text-gray-400 font-normal ml-1 line-through">
                              (was {formatDate(appt.originalDate)})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaClock className="text-sm flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Time</p>
                        <p className={`text-sm font-medium ${isRescheduled ? 'text-violet-700' : ''}`}>
                          {appt.time}
                          {isRescheduled && appt.originalTime && appt.originalTime !== appt.time && (
                            <span className="text-xs text-gray-400 font-normal ml-1 line-through">
                              (was {appt.originalTime})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-sm flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Contact</p>
                        <p className="text-sm font-medium">{appt.phoneNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Meet link */}
                  {appt.meetLink && (
                    <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
                      <a
                        href={appt.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        🎥 Join Google Meet Video Call
                      </a>
                      <p className="text-[11px] text-green-600 mt-1 ml-7">
                        Click the link at your appointment time to join
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {!['completed', 'cancelled'].includes((appt.status || '').toLowerCase()) && (
                    <div
                      className="flex justify-end space-x-3 pt-3 border-t"
                      style={{ borderColor: 'var(--bg-light)' }}
                    >
                      <button
                        className="px-4 py-2 text-sm rounded-xl border transition flex items-center gap-2 font-medium"
                        style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                        onClick={() => handleEditClick(appt)}
                        disabled={cancelling || editingId === id}
                      >
                        {editingId === id
                          ? <FaSpinner className="animate-spin" />
                          : <><FaEdit /> Reschedule</>
                        }
                      </button>
                      <button
                        className="px-4 py-2 text-sm rounded-xl text-white hover:opacity-90 flex items-center gap-2 font-medium"
                        style={{ backgroundColor: '#174047' }}
                        onClick={() => handleCancelClick(appt)}
                        disabled={cancelling}
                      >
                        {cancelling
                          ? <FaSpinner className="animate-spin" />
                          : <><FaTrash /> Cancel</>
                        }
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Cancel Modal ── */}
      {showCancelModal && selectedAppt && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                  Cancel Appointment
                </h3>
                <button onClick={() => setShowCancelModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <FaTimes />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Cancel appointment with <strong>{selectedAppt.doctor?.name}</strong> on{' '}
                {formatDate(selectedAppt.date)} at {selectedAppt.time}?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason (optional)</label>
                <textarea
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: 'var(--bg-light)' }}
                  placeholder="Tell us why you're cancelling…"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border rounded-xl text-sm font-medium"
                  style={{ borderColor: 'var(--bg-light)', color: 'var(--accent-color)' }}
                >
                  Keep Appointment
                </button>
                <button
                  onClick={handleCancelConfirm}
                  className="flex-1 px-4 py-2 text-white rounded-xl text-sm font-semibold hover:opacity-90"
                  style={{ backgroundColor: 'var(--secondary-color)' }}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Reschedule Modal ── */}
      {showEditModal && selectedAppt && (
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden bg-white">
              <div
                className="p-6 text-white flex justify-between items-center"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <div>
                  <h2 className="text-xl font-bold">Reschedule Appointment</h2>
                  <p className="text-sm opacity-80">
                    Update your appointment details — the doctor will see the new time
                  </p>
                </div>
                <button onClick={closeEditModal} className="text-white text-2xl hover:opacity-80">×</button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                {/* Doctor */}
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-light)' }}>
                  {loadingDoctor ? (
                    <div className="flex justify-center">
                      <FaSpinner className="animate-spin" style={{ color: 'var(--primary-color)' }} />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold">
                        {doctor?.name || selectedAppt.doctor?.name || 'Doctor'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {doctor?.speciality || selectedAppt.doctor?.speciality || 'General Physician'}
                      </p>
                    </>
                  )}
                </div>

                {/* Info notice */}
                <div className="p-3 bg-violet-50 border border-violet-200 rounded-xl text-xs text-violet-700 font-medium">
                  ↻ This appointment will be marked as <strong>Rescheduled</strong> — the doctor's
                  dashboard will update automatically.
                </div>

                {/* Fields */}
                <input
                  className="w-full p-3 rounded-xl border text-sm"
                  placeholder="Patient Name"
                  value={editForm.patientName}
                  onChange={e => setEditForm(p => ({ ...p, patientName: e.target.value }))}
                  style={{ borderColor: 'var(--bg-light)' }}
                />
                <input
                  className="w-full p-3 rounded-xl border text-sm"
                  placeholder="03XXXXXXXXX"
                  value={editForm.phoneNo}
                  maxLength={11}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, '');
                    if (v.length <= 11) setEditForm(p => ({ ...p, phoneNo: v }));
                  }}
                  style={{ borderColor: 'var(--bg-light)' }}
                />
                <input
                  className="w-full p-3 rounded-xl border text-sm"
                  type="email"
                  placeholder="Email (optional)"
                  value={editForm.email}
                  onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                  style={{ borderColor: 'var(--bg-light)' }}
                />
                <input
                  type="date"
                  className="w-full p-3 rounded-xl border text-sm"
                  value={editForm.date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ borderColor: 'var(--bg-light)' }}
                />

                {/* Slots */}
                {loadingSlots ? (
                  <div className="flex justify-center py-4">
                    <FaSpinner className="animate-spin text-xl" style={{ color: 'var(--primary-color)' }} />
                  </div>
                ) : slots.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => setEditForm(p => ({ ...p, time: slot }))}
                        className="px-4 py-2 rounded-full text-sm border transition font-medium"
                        style={{
                          backgroundColor: editForm.time === slot ? 'var(--primary-color)' : 'var(--white)',
                          color:           editForm.time === slot ? 'var(--white)' : 'var(--secondary-color)',
                          borderColor:     'var(--bg-light)',
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : editForm.date ? (
                  <>
                    <p className="text-center text-gray-500 text-sm py-3 bg-gray-50 rounded-xl">
                      No slots available — enter time manually:
                    </p>
                    <input
                      type="text"
                      className="w-full p-3 rounded-xl border text-sm"
                      placeholder="e.g., 09:00 AM - 09:15 AM"
                      value={editForm.time}
                      onChange={e => setEditForm(p => ({ ...p, time: e.target.value }))}
                      style={{ borderColor: 'var(--bg-light)' }}
                    />
                  </>
                ) : (
                  <p className="text-center text-gray-400 text-sm py-3 bg-gray-50 rounded-xl">
                    Select a date to see available slots
                  </p>
                )}

                {/* Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={closeEditModal}
                    className="flex-1 py-3 rounded-xl border text-sm font-medium transition"
                    style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    disabled={!!editingId}
                    className="flex-1 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    {editingId
                      ? <FaSpinner className="animate-spin mx-auto" />
                      : 'Save & Reschedule'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppointments;


