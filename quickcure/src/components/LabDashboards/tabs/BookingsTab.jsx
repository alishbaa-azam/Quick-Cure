import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { FiCalendar, FiSearch, FiEye, FiTrash2, FiUserPlus, FiCheckCircle, FiClock } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

const STATUS_CONFIG = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FiClock, label: 'Pending' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: FiCheckCircle, label: 'Confirmed' },
  assigned: { bg: 'bg-purple-100', text: 'text-purple-800', icon: FiUserPlus, label: 'Assigned' },
  sample_collected: { bg: 'bg-teal-100', text: 'text-teal-800', icon: FiCheckCircle, label: 'Sample Collected' },
  in_lab: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: FiCheckCircle, label: 'In Lab' },
  report_ready: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: FiCheckCircle, label: 'Report Ready' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800', icon: FiCheckCircle, label: 'Delivered' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: FiClock, label: 'Cancelled' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', icon: FiCheckCircle, label: 'Completed' }
};

export default function BookingsTab({
  bookings,
  filteredBookings,
  stats,
  theme,
  statusFilter,
  setStatusFilter,
  searchText,
  setSearchText,
  timeRange,
  setTimeRange,
  onViewBooking,
  onDeleteBooking,
  technicians = [],
  onAssignTechnician
}) {
  const primary = theme?.primary || "#2c6774";
  const [groupFilter, setGroupFilter] = useState('all');

  // Helper functions
  const getTestsArray = (booking) => {
    if (!booking) return [];
    if (Array.isArray(booking.tests)) return booking.tests;
    if (Array.isArray(booking.testDetails)) return booking.testDetails;
    if (booking.tests && typeof booking.tests === "object") return Object.values(booking.tests);
    return [];
  };

  const getTestName = (t) => t?.name || t?.test?.name || t?.testId?.name || "Unnamed Test";

  const finalFilteredBookings = useMemo(() => {
    let result = [...(filteredBookings || [])];
    if (groupFilter === 'group') {
      result = result.filter(booking => booking.totalPatients && booking.totalPatients > 1);
    } else if (groupFilter === 'individual') {
      result = result.filter(booking => !booking.totalPatients || booking.totalPatients === 1);
    }
    return result;
  }, [filteredBookings, groupFilter]);

  const DAILY_LIMIT = 6;

  // Get today's active assignment count for a technician
  const getTechTodayCount = (techId) => {
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

  // Get technicians available for a booking's city (max 6 samples per day per tech)
  const getAvailableTechs = (booking) => {
    const city = booking.serviceCity;
    if (!city) return [];
    
    return technicians.filter(t => {
      if (t.city !== city) return false;
      const todayCount = getTechTodayCount(t._id);
      return todayCount < DAILY_LIMIT;
    });
  };

  const safeStats = {
    totalRevenue: stats?.totalRevenue || 0,
    completedBookings: stats?.completedBookings || 0,
  };

  const actualGroupBookingsCount = useMemo(() => {
    return (filteredBookings || []).filter(booking => booking.totalPatients && booking.totalPatients > 1).length;
  }, [filteredBookings]);

  const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border">
      {/* HEADER */}
      <div className="p-5 border-b flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${primary}20`, color: primary }}>
            <FiCalendar size={20} />
          </div>
          <h2 className="text-xl font-semibold">Booking Management</h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
            style={{ backgroundColor: groupFilter !== 'all' ? `${primary}10` : '', borderColor: groupFilter !== 'all' ? primary : '#e5e7eb' }}>
            <option value="all">All Bookings ({filteredBookings?.length || 0})</option>
            <option value="group">Group Bookings ({actualGroupBookingsCount})</option>
            <option value="individual">Individual</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input type="text" placeholder="Search by name, ref, mobile..." value={searchText}
              onChange={(e) => setSearchText(e.target.value)} className="pl-9 pr-3 py-2 border rounded-lg text-sm w-64" />
          </div>
        </div>
      </div>

      {/* STATS CARDS - Enhanced */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 p-4 bg-gray-50">
        <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-xs text-gray-500">Revenue</p><p className="font-bold text-lg">₨{safeStats.totalRevenue.toLocaleString()}</p></div>
        <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-xs text-gray-500">Pending</p><p className="font-bold text-lg text-yellow-600">{stats?.pendingBookings || 0}</p></div>
        <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-xs text-gray-500">Assigned</p><p className="font-bold text-lg text-purple-600">{stats?.assignedBookings || 0}</p></div>
        <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-xs text-gray-500">Collected</p><p className="font-bold text-lg text-teal-600">{stats?.sampleCollected || 0}</p></div>
        <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-xs text-gray-500">In Lab</p><p className="font-bold text-lg text-indigo-600">{stats?.inLab || 0}</p></div>
        <div className="bg-white p-3 rounded-lg shadow-sm"><p className="text-xs text-gray-500">Completed</p><p className="font-bold text-lg text-green-600">{stats?.completedBookings || 0}</p></div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Ref / Type</th>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-left">Tests</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Technician</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalFilteredBookings.map((booking) => {
              const tests = getTestsArray(booking);
              const isGroup = booking.totalPatients && booking.totalPatients > 1;
              const personsCount = booking.totalPatients || 1;
              const availableTechs = getAvailableTechs(booking);

              return (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs font-medium">{booking.bookingReference || "N/A"}</span>
                      {isGroup ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium w-fit">
                          <FaUsers size={10} /> Group ({personsCount})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium w-fit">👤 Individual</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{booking.patientDetails?.name || "No Name"}</p>
                    <p className="text-xs text-gray-500">{booking.patientDetails?.mobile || ""}</p>
                  </td>
                  <td className="px-4 py-3">
                    {booking.serviceCity ? (
                      <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-xs font-medium">{booking.serviceCity}</span>
                    ) : <span className="text-gray-400 text-xs">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {tests.slice(0, 2).map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">{getTestName(t)}</span>
                      ))}
                      {tests.length > 2 && <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">+{tests.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold" style={{ color: primary }}>₨{(booking.totalAmount || 0).toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {booking.appointmentDetails?.preferredDate
                      ? dayjs(booking.appointmentDetails.preferredDate).format('DD MMM')
                      : dayjs(booking.createdAt).format('DD MMM')}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={booking.bookingStatus} /></td>
                  <td className="px-4 py-3">
                    {booking.assignedTechnician ? (
                      <span className="text-xs font-medium text-purple-700">
                        {technicians.find(t => t._id === booking.assignedTechnician)?.name || 'Assigned'}
                      </span>
                    ) : booking.bookingStatus === 'confirmed' ? (
                      <select
                        onChange={async (e) => {
                          if (e.target.value) await onAssignTechnician(booking._id, e.target.value);
                        }}
                        className="text-xs border rounded px-2 py-1"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign tech...</option>
                        {availableTechs.map(t => (
                          <option key={t._id} value={t._id}>{t.name} ({t.city})</option>
                        ))}
                        {availableTechs.length === 0 && <option disabled>No techs available</option>}
                      </select>
                    ) : <span className="text-xs text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => onViewBooking(booking)} className="p-2 border rounded-lg hover:bg-gray-100" title="View">
                        <FiEye size={16} />
                      </button>
                      <button onClick={() => { if (window.confirm(`Delete booking?`)) onDeleteBooking?.(booking._id); }}
                        className="p-2 border rounded-lg hover:bg-red-50 text-red-600" title="Delete">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {finalFilteredBookings.length === 0 && (
        <div className="p-10 text-center text-gray-500">No bookings found</div>
      )}
    </div>
  );
}