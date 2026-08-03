import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FiTool, FiPlus, FiEdit2, FiTrash2, FiUser, FiPhone, FiMapPin, FiCheckCircle, FiXCircle, FiCalendar, FiClock, FiEye, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const DAILY_LIMIT = 6;

export default function TechniciansTab({ lab, theme, technicians, bookings, onRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '' });
  const [expandedTech, setExpandedTech] = useState(null);
  const [viewDate, setViewDate] = useState(dayjs().format('YYYY-MM-DD'));

  const primary = theme?.primary || '#2c6774';

  // Calculate today's active assignments for a technician
  const getTodayCount = (techId) => {
    const todayStart = dayjs().startOf('day');
    const todayEnd = dayjs().endOf('day');
    return (bookings || []).filter(b => {
      if (b.assignedTechnician?.toString() !== techId?.toString()) return false;
      const assignedAt = dayjs(b.assignedAt);
      const isToday = assignedAt.isAfter(todayStart) && assignedAt.isBefore(todayEnd);
      const isActive = ['assigned', 'sample_collected', 'in_lab', 'report_ready'].includes(b.bookingStatus);
      return isToday && isActive;
    }).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, labId: lab._id };
      if (editingTech) {
        await axios.put(`/technicians/${editingTech._id}`, payload);
      } else {
        await axios.post('/technicians', payload);
      }
      onRefresh();
      setShowModal(false);
      setEditingTech(null);
      setForm({ name: '', phone: '', email: '', city: '' });
    } catch (error) {
      alert('Error saving technician');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this technician?')) {
      await axios.delete(`/technicians/${id}`);
      onRefresh();
    }
  };

  const handleEdit = (tech) => {
    setEditingTech(tech);
    setForm({ name: tech.name, phone: tech.phone, email: tech.email || '', city: tech.city });
    setShowModal(true);
  };

  // Get all bookings assigned to a specific technician
  const getTechSchedule = (techId) => {
    return (bookings || []).filter(b => 
      b.assignedTechnician === techId || 
      b.assignedTechnician?._id === techId
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // Filter schedule by date
  const getScheduleByDate = (techId) => {
    const schedule = getTechSchedule(techId);
    return {
      all: schedule,
      today: schedule.filter(b => dayjs(b.appointmentDetails?.preferredDate || b.createdAt).isSame(dayjs(), 'day')),
      byDate: schedule.filter(b => b.appointmentDetails?.preferredDate ? 
        dayjs(b.appointmentDetails.preferredDate).isSame(dayjs(viewDate), 'day') : false)
    };
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      confirmed: 'text-blue-600 bg-blue-50 border-blue-200',
      assigned: 'text-purple-600 bg-purple-50 border-purple-200',
      sample_collected: 'text-teal-600 bg-teal-50 border-teal-200',
      in_lab: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      report_ready: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      delivered: 'text-green-600 bg-green-50 border-green-200',
      cancelled: 'text-red-600 bg-red-50 border-red-200',
      completed: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primary}20`, color: primary }}>
            <FiTool size={20} />
          </div>
          <h2 className="text-xl font-semibold">Technician Management</h2>
        </div>
        <button onClick={() => { setEditingTech(null); setForm({ name: '', phone: '', email: '', city: '' }); setShowModal(true); }}
          className="px-4 py-2 text-white rounded-lg flex items-center gap-2" style={{ backgroundColor: primary }}>
          <FiPlus size={16} /> Add Technician
        </button>
      </div>

      {/* Technician Cards with Schedule */}
      <div className="grid grid-cols-1 gap-6">
        {technicians?.map((tech) => {
          const schedule = getTechSchedule(tech._id);
          const todaySchedule = schedule.filter(b => 
            dayjs(b.appointmentDetails?.preferredDate || b.createdAt).isSame(dayjs(), 'day')
          );
          const isExpanded = expandedTech === tech._id;

          return (
            <div key={tech._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition">
              {/* Technician Header */}
              <div className="p-5 flex items-start justify-between cursor-pointer" onClick={() => setExpandedTech(isExpanded ? null : tech._id)}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: tech.availability === 'available' ? '#10b981' : tech.availability === 'busy' ? '#f59e0b' : '#6b7280' }}>
                    {tech.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tech.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><FiPhone size={12} /> {tech.phone}</span>
                      <span className="flex items-center gap-1"><FiMapPin size={12} /> {tech.city}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">{schedule.length} total bookings</span>
                    </div>
                    {/* Daily Usage Progress Bar */}
                    {(() => {
                      const used = getTodayCount(tech._id);
                      const remaining = DAILY_LIMIT - used;
                      const percent = Math.min((used / DAILY_LIMIT) * 100, 100);
                      const isFull = used >= DAILY_LIMIT;
                      return (
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 max-w-[200px]">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">Today's Usage</span>
                              <span className={isFull ? 'text-red-600 font-bold' : used >= 4 ? 'text-amber-600 font-medium' : 'text-green-600 font-medium'}>
                                {used}/{DAILY_LIMIT}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-300 ${
                                isFull ? 'bg-red-500' : used >= 4 ? 'bg-amber-500' : 'bg-green-500'
                              }`} style={{ width: `${percent}%` }}></div>
                            </div>
                          </div>
                          {isFull ? (
                            <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                              Full
                            </span>
                          ) : (
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                              {remaining} slot{remaining > 1 ? 's' : ''} left
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(tech); }} 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FiEdit2 size={14} /></button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(tech._id); }} 
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 size={14} /></button>
                  {isExpanded ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                </div>
              </div>

              {/* Expanded Schedule View */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {/* Date Filter */}
                  <div className="px-5 py-3 bg-gray-50 flex items-center gap-3 border-b">
                    <FiCalendar className="text-gray-500" size={16} />
                    <input type="date" value={viewDate} onChange={(e) => setViewDate(e.target.value)}
                      className="px-3 py-1.5 border rounded-lg text-sm" />
                    <span className="text-sm text-gray-500">
                      Showing {viewDate === dayjs().format('YYYY-MM-DD') ? "today's" : dayjs(viewDate).format('DD MMM YYYY')} schedule
                    </span>
                  </div>

                  {/* Schedule List */}
                  <div className="p-5">
                    {schedule.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <FiCalendar size={36} className="mx-auto mb-2" />
                        <p>No bookings assigned yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {schedule.map((booking) => {
                          const bookingDate = dayjs(booking.appointmentDetails?.preferredDate || booking.createdAt);
                          const isToday = bookingDate.isSame(dayjs(), 'day');
                          const isSelectedDate = bookingDate.isSame(dayjs(viewDate), 'day');

                          return (
                            <div key={booking._id} className={`border rounded-lg p-4 transition ${isSelectedDate ? 'ring-2 ring-teal-200 bg-teal-50/30' : 'hover:bg-gray-50'}`}
                              style={isSelectedDate ? { borderColor: primary } : {}}>
                              <div className="flex items-start justify-between gap-4">
                                {/* Left: Booking Info */}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-mono text-xs font-bold text-gray-700">{booking.bookingReference}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                                      {booking.bookingStatus?.replace(/_/g, ' ').toUpperCase()}
                                    </span>
                                  </div>
                                  <p className="font-medium text-sm">{booking.patientDetails?.name}</p>
                                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1"><FiMapPin size={10} /> {booking.serviceCity || 'N/A'}</span>
                                    <span className="flex items-center gap-1"><FiCalendar size={10} /> {bookingDate.format('DD MMM YYYY')}</span>
                                    <span className="font-semibold" style={{ color: primary }}>₨{(booking.totalAmount || 0).toLocaleString()}</span>
                                  </div>
                                </div>
                                {/* Right: Tests Summary */}
                                <div className="text-right shrink-0">
                                  <div className="text-xs text-gray-500">
                                    {(booking.tests?.length || 0)} tests
                                  </div>
                                  {isToday && (
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-semibold">
                                      Today
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {technicians?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <FiTool size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No technicians added yet</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">{editingTech ? 'Edit' : 'Add'} Technician</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" required />
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" required />
              <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" />
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Select City</option>
                {(lab?.serviceCities || []).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border py-2 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 text-white py-2 rounded-lg" style={{ backgroundColor: primary }}>
                  {editingTech ? 'Update' : 'Add'} Technician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}