import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Check, X, Clock, Eye, Calendar as CalendarIcon, Phone, Mail,
  Search, Video, ExternalLink, Loader, ChevronDown, RefreshCw,
} from 'lucide-react';
import { getDoctorAppointments, updateAppointmentStatus, sendMeetLinkToPatient } from '../../api/doctorApi';

const STATUS_MAP = {
  approved:    { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '✓',  label: 'Confirmed'   },
  confirmed:   { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '✓',  label: 'Confirmed'   },
  pending:     { bg: 'bg-amber-100  text-amber-800  border-amber-200',    icon: '⏳', label: 'Pending'     },
  booked:      { bg: 'bg-amber-100  text-amber-800  border-amber-200',    icon: '⏳', label: 'Booked'      },
  completed:   { bg: 'bg-blue-100   text-blue-800   border-blue-200',     icon: '✔',  label: 'Completed'   },
  cancelled:   { bg: 'bg-red-100    text-red-800    border-red-200',      icon: '✕',  label: 'Cancelled'   },
  rescheduled: { bg: 'bg-violet-100 text-violet-800 border-violet-200',   icon: '↻',  label: 'Rescheduled' },
};
const getStyle = s =>
  STATUS_MAP[(s || '').toLowerCase()] || {
    bg: 'bg-gray-100 text-gray-800 border-gray-200', icon: '•', label: s || 'Unknown',
  };

const StatusBadge = ({ status, border = true }) => {
  const c = getStyle(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        border ? `border ${c.bg}` : c.bg
      }`}
    >
      <span>{c.icon}</span>{c.label}
    </span>
  );
};

/* ─── date helpers ───────────────────────────────────────────────── */
const today     = () => new Date().toISOString().split('T')[0];
const addDays   = n => { const d = new Date(); d.setDate(d.getDate() + n);    return d.toISOString().split('T')[0]; };
const addMonths = n => { const d = new Date(); d.setMonth(d.getMonth() + n);  return d.toISOString().split('T')[0]; };

const DATE_FILTERS = [
  { id: 'all',        label: 'All Dates'    },
  { id: 'today',      label: 'Today'        },
  { id: 'next_week',  label: 'Next 7 Days'  },
  { id: 'next_month', label: 'Next 30 Days' },
];

const STATUS_FILTERS = [
  { id: 'all',         label: 'All Status'  },
  { id: 'pending',     label: 'Pending'     },
  { id: 'approved',    label: 'Approved'    },
  { id: 'confirmed',   label: 'Confirmed'   },
  { id: 'completed',   label: 'Completed'   },
  { id: 'cancelled',   label: 'Cancelled'   },
  { id: 'rescheduled', label: 'Rescheduled' },
];

const formatTime = t => {
  if (!t) return '';
  if (/AM|PM/i.test(t)) return t;
  try {
    const [h, m] = t.split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  } catch { return t; }
};

const Appointments = ({ doctorId, setActiveTab, setSelectedPatient }) => {
  const [appointments,  setAppointments]  = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [statusFilter,  setStatusFilter]  = useState('all');
  const [dateFilter,    setDateFilter]    = useState('all');
  const [searchTerm,    setSearchTerm]    = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [selAppt,       setSelAppt]       = useState(null);
  const [meetLink,      setMeetLink]      = useState('');
  const [meetSending,   setMeetSending]   = useState(false);

  const fetchRef = useRef(null);

  useEffect(() => {
    fetchAppointments();

    let bc;
    try {
      bc = new BroadcastChannel('appointment_updates');
      bc.onmessage = e => {
        if (e.data?.type === 'APPOINTMENT_UPDATED') fetchRef.current?.();
      };
    } catch (_) { /* BroadcastChannel not available */ }

    const onCustomEvent = () => fetchRef.current?.();
    window.addEventListener('appointmentUpdated', onCustomEvent);

    const onStorage = e => {
      if (
        e.key === 'doctor_dashboard_last_update' ||
        e.key === 'patient_appointments_last_update'
      ) {
        fetchRef.current?.();
      }
    };
    window.addEventListener('storage', onStorage);

    const onLegacyRefresh = () => fetchRef.current?.();
    window.addEventListener('refreshDoctorAppointments', onLegacyRefresh);

    const pollInterval = setInterval(() => fetchRef.current?.(), 15_000);

    return () => {
      bc?.close();
      window.removeEventListener('appointmentUpdated', onCustomEvent);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('refreshDoctorAppointments', onLegacyRefresh);
      clearInterval(pollInterval);
    };
  }, [doctorId]);

  const fetchAppointments = async () => {
    setLoading(true);
    const result = await getDoctorAppointments(doctorId);
    if (result.success) setAppointments(Array.isArray(result.data) ? result.data : []);
    setLoading(false);
  };

  fetchRef.current = fetchAppointments;

  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(id);
    await updateAppointmentStatus(id, newStatus);
    await fetchAppointments();
    setActionLoading(null);
  };

  const handleViewHistory = appt => {
    setSelectedPatient({
      id:       appt._id || appt.id || appt.phoneNo || appt.patientEmail,
      name:     appt.patientName  || 'Unknown',
      contact:  appt.phoneNo      || appt.contact      || '',
      email:    appt.patientEmail || appt.email         || '',
      age:      appt.patientAge   || appt.age           || '',
      gender:   appt.patientGender|| appt.gender        || '',
      lastVisit: appt.date        || appt.appointmentDate || '',
    });
    setActiveTab('patient-history');
  };

  const handleSendMeetLink = async () => {
    if (!meetLink.trim() || !meetLink.includes('meet.google.com')) {
      alert('Please enter a valid Google Meet link');
      return;
    }
    setMeetSending(true);
    const result = await sendMeetLinkToPatient(selAppt._id || selAppt.id, meetLink);
    if (result.success) {
      alert('✅ Google Meet link sent successfully!');
      setShowMeetModal(false);
      fetchAppointments();
    } else {
      alert(result.error || 'Failed to send meet link');
    }
    setMeetSending(false);
  };

  const filtered = useMemo(() => {
    const t         = today();
    const nextWeek  = addDays(7);
    const nextMonth = addMonths(1);

    return appointments
      .filter(a => {
        const s = (a.status || '').toLowerCase();
        const d = a.date || a.appointmentDate || '';
        const q = searchTerm.toLowerCase();

        if (dateFilter === 'today'      && d !== t)                         return false;
        if (dateFilter === 'next_week'  && (d < t || d > nextWeek))        return false;
        if (dateFilter === 'next_month' && (d < t || d > nextMonth))       return false;
        if (statusFilter !== 'all'      && s !== statusFilter)             return false;
        if (q && !(
          (a.patientName  || '').toLowerCase().includes(q) ||
          (a.phoneNo      || a.contact || '').includes(q)  ||
          (a.patientEmail || a.email   || '').toLowerCase().includes(q)
        )) return false;

        return true;
      })
      .sort((a, b) => {
        const da = new Date(
          (a.date || a.appointmentDate || '') + 'T' + (a.time || a.appointmentTime || '00:00')
        );
        const db = new Date(
          (b.date || b.appointmentDate || '') + 'T' + (b.time || b.appointmentTime || '00:00')
        );
        return da - db;
      });
  }, [appointments, statusFilter, dateFilter, searchTerm]);

  const countByStatus = useMemo(() => {
    const counts = {};
    appointments.forEach(a => {
      const s = (a.status || 'unknown').toLowerCase();
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, [appointments]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin" />
      </div>
    </div>
  );

  const groupedByDate = filtered.reduce((acc, a) => {
    const d = a.date || a.appointmentDate || 'Unknown';
    if (!acc[d]) acc[d] = [];
    acc[d].push(a);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return new Date(a) - new Date(b);
  });

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#174047]">Appointments</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} appointment{filtered.length !== 1 ? 's' : ''} found
            {statusFilter !== 'all' || dateFilter !== 'all' ? ' (filtered)' : ''}
          </p>
        </div>
        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white text-sm font-medium rounded-xl hover:bg-[#1e4e56] transition-colors shadow-sm"
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* ── Status Quick-Chips ── */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(countByStatus).map(([s, c]) => {
          const cfg = getStyle(s);
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                statusFilter === s
                  ? `${cfg.bg} ring-2 ring-offset-1 ring-current`
                  : `${cfg.bg} opacity-70 hover:opacity-100`
              }`}
            >
              {cfg.icon} {cfg.label} <span className="font-bold">{c}</span>
            </button>
          );
        })}
      </div>

      {/* ── Filters Bar ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient name, phone or email…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] bg-gray-50"
            />
          </div>

          {/* Date filter */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            {DATE_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setDateFilter(f.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                  dateFilter === f.id
                    ? 'bg-[#174047] text-white border-[#174047] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#2c6774] hover:text-[#2c6774]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Status dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] cursor-pointer"
            >
              {STATUS_FILTERS.map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/60 border-b border-gray-100">
                  {['Patient', 'Contact', 'Date & Time', 'Status', 'Actions'].map(h => (
                    <th
                      key={h}
                      className="text-left py-4 px-5 text-gray-500 font-semibold text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((appt, i) => {
                  const aid           = appt._id || appt.id;
                  const isRescheduled = (appt.status || '').toLowerCase() === 'rescheduled';

                  return (
                    <tr
                      key={aid || i}
                      className="hover:bg-blue-50/20 transition-colors"
                    >
                      {/* Patient */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                            {(appt.patientName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {appt.patientName || 'Unknown'}
                            </p>
                            {(appt.patientAge || appt.age) && (
                              <p className="text-xs text-gray-400">
                                {appt.patientAge || appt.age}y
                                {appt.patientGender ? ` · ${appt.patientGender}` : ''}
                              </p>
                            )}
                            {isRescheduled && (
                              <p className="text-[10px] text-violet-600 font-medium mt-0.5">
                                ↻ Rescheduled
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Phone size={12} className="text-gray-400" />
                            {appt.phoneNo || appt.contact || 'N/A'}
                          </div>
                          {(appt.patientEmail || appt.email) && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Mail size={12} />
                              <span className="truncate max-w-[160px]">
                                {appt.patientEmail || appt.email}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700 font-medium">
                          <CalendarIcon size={13} className="text-[#2c6774] flex-shrink-0" />
                          {appt.date || appt.appointmentDate || 'N/A'}
                        </div>
                        {(appt.time || appt.appointmentTime) && (
                          <p className="text-xs text-gray-400 mt-0.5 ml-5">
                            {formatTime(appt.time || appt.appointmentTime)}
                          </p>
                        )}
                        {isRescheduled && appt.originalDate && appt.originalDate !== appt.date && (
                          <p className="text-[10px] text-gray-400 mt-0.5 ml-5 line-through">
                            was {appt.originalDate}
                            {appt.originalTime ? ` at ${formatTime(appt.originalTime)}` : ''}
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <StatusBadge status={appt.status} />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center flex-nowrap gap-1.5">
                          <button
                            onClick={() => {
                              setSelAppt(appt);
                              setMeetLink(appt.meetLink || '');
                              setShowMeetModal(true);
                            }}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors shrink-0"
                            title="Send Meet Link"
                          >
                            <Video size={14} />
                          </button>
                          <button
                            onClick={() => handleViewHistory(appt)}
                            className="px-3 py-1.5 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-1 shrink-0"
                          >
                            <Eye size={12} /> View
                          </button>
                          {/* Allow marking rescheduled appointments as complete or cancelled too */}
                          {['pending', 'booked', 'rescheduled'].includes(
                            (appt.status || '').toLowerCase()
                          ) && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(aid, 'completed')}
                                disabled={actionLoading === aid}
                                className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 disabled:opacity-50 border border-emerald-200 transition-colors shrink-0"
                                title="Mark Complete"
                              >
                                {actionLoading === aid
                                  ? <Loader size={14} className="animate-spin" />
                                  : <Check size={14} />
                                }
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(aid, 'cancelled')}
                                disabled={actionLoading === aid}
                                className="p-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50 border border-red-200 transition-colors shrink-0"
                                title="Cancel"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          {appt.meetLink && (
                            <a
                              href={appt.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors shrink-0 ml-auto"
                              title="Join Meet"
                            >
                              <ExternalLink size={14} />
                            </a>
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

      {/* ── Mobile Card View ── */}
      <div className="md:hidden space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
            <CalendarIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No appointments found</p>
          </div>
        ) : (
          sortedDates.map(date => (
            <div key={date}>
              <div className="flex items-center gap-2 px-1 mb-2">
                <CalendarIcon size={13} className="text-[#2c6774]" />
                <span className="text-sm font-bold text-gray-700">{date}</span>
                <span className="text-xs text-gray-400">({groupedByDate[date].length})</span>
              </div>
              <div className="space-y-3">
                {groupedByDate[date].map((appt, i) => {
                  const aid           = appt._id || appt.id;
                  const isRescheduled = (appt.status || '').toLowerCase() === 'rescheduled';
                  return (
                    <div
                      key={aid || i}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {(appt.patientName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">
                              {appt.patientName || 'Unknown'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {appt.phoneNo || appt.contact || 'No contact'}
                            </p>
                            {isRescheduled && (
                              <p className="text-[10px] text-violet-600 font-medium mt-0.5">
                                ↻ Rescheduled
                              </p>
                            )}
                          </div>
                        </div>
                        <StatusBadge status={appt.status} />
                      </div>

                      {(appt.time || appt.appointmentTime) && (
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                          <Clock size={11} />
                          {formatTime(appt.time || appt.appointmentTime)}
                        </div>
                      )}

                      {isRescheduled && appt.originalDate && appt.originalDate !== appt.date && (
                        <div className="text-[10px] text-gray-400 mt-0.5 line-through">
                          was {appt.originalDate}
                          {appt.originalTime ? ` at ${formatTime(appt.originalTime)}` : ''}
                        </div>
                      )}

                      {appt.meetLink && (
                        <a
                          href={appt.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-green-600 mt-2 font-medium"
                        >
                          <ExternalLink size={11} /> Join Meet
                        </a>
                      )}

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                        <button
                          onClick={() => {
                            setSelAppt(appt);
                            setMeetLink(appt.meetLink || '');
                            setShowMeetModal(true);
                          }}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200"
                        >
                          <Video size={15} />
                        </button>
                        <button
                          onClick={() => handleViewHistory(appt)}
                          className="flex-1 px-3 py-2 text-xs bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-center"
                        >
                          View History
                        </button>
                        {['pending', 'booked', 'rescheduled'].includes(
                          (appt.status || '').toLowerCase()
                        ) && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(aid, 'completed')}
                              disabled={actionLoading === aid}
                              className="p-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 disabled:opacity-50"
                            >
                              <Check size={15} />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(aid, 'cancelled')}
                              disabled={actionLoading === aid}
                              className="p-2 bg-red-50 text-red-700 rounded-lg border border-red-200 disabled:opacity-50"
                            >
                              <X size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Google Meet Modal ── */}
      {showMeetModal && selAppt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-100">
                  <Video size={17} className="text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-[#174047]">Send Google Meet Link</h3>
              </div>
              <button onClick={() => setShowMeetModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={17} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm text-gray-700">
                  Patient: <strong>{selAppt.patientName}</strong>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selAppt.date} at {formatTime(selAppt.time || selAppt.appointmentTime)}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Google Meet Link *
                </label>
                <input
                  type="url"
                  value={meetLink}
                  onChange={e => setMeetLink(e.target.value)}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <p className="text-xs text-amber-700">
                  💡 Patient will receive this link via email and their dashboard.
                </p>
              </div>
              <button
                onClick={handleSendMeetLink}
                disabled={meetSending}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50 hover:from-purple-700 hover:to-purple-800 transition-all"
              >
                {meetSending ? <Loader className="animate-spin" size={15} /> : <Video size={15} />}
                {meetSending ? 'Sending…' : 'Send Meet Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ searchTerm }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <CalendarIcon className="w-8 h-8 text-gray-300" />
    </div>
    <p className="text-gray-500 font-medium mb-1">No appointments found</p>
    <p className="text-sm text-gray-400">
      {searchTerm ? 'Try adjusting your search or filters' : 'No appointments to display'}
    </p>
  </div>
);

export default Appointments;