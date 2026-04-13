import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { FiCalendar, FiSearch, FiEye } from 'react-icons/fi';
import { FaCheckCircle, FaUsers } from 'react-icons/fa';

export default function BookingsTab({
  filteredBookings,
  stats,
  theme,
  statusFilter,
  setStatusFilter,
  searchText,
  setSearchText,
  onViewBooking,
}) {
  const primary = theme?.primary || "#2c6774";

  // State for group filter
  const [groupFilter, setGroupFilter] = useState('all'); // 'all', 'group', 'individual'

  // ✅ SIMPLE FIX: Group booking = totalPatients > 1, Individual = totalPatients = 1
  const isGroupBooking = (booking) => {
    if (!booking) return false;
    
    // Agar totalPatients > 1 hai to group booking
    if (booking.totalPatients && booking.totalPatients > 1) {
      return true;
    }
    
    // Agar totalPatients = 1 ya undefined hai to individual
    return false;
  };

  // ✅ Get persons count - simple and direct
  const getPersonsCount = (booking) => {
    if (!booking) return 1;
    
    // Directly return totalPatients if it exists and > 0
    if (booking.totalPatients && booking.totalPatients > 0) {
      return booking.totalPatients;
    }
    
    // Default to 1 for individual bookings
    return 1;
  };

  // Helper to get tests array
  const getTestsArray = (booking) => {
    if (!booking) return [];
    if (Array.isArray(booking.tests)) return booking.tests;
    if (Array.isArray(booking.testDetails)) return booking.testDetails;
    if (booking.tests && typeof booking.tests === "object") return Object.values(booking.tests);
    return [];
  };

  const getTestName = (t) =>
    t?.name || t?.test?.name || t?.testId?.name || "Unnamed Test";

  // ✅ Apply all filters (status, search, AND group filter)
  const finalFilteredBookings = useMemo(() => {
    let result = [...(filteredBookings || [])];
    
    // Apply group filter based on totalPatients
    if (groupFilter === 'group') {
      result = result.filter(booking => booking.totalPatients && booking.totalPatients > 1);
    } else if (groupFilter === 'individual') {
      result = result.filter(booking => !booking.totalPatients || booking.totalPatients === 1);
    }
    
    // Debug log to check counts
    console.log('📊 Filter Stats:', {
      totalBookings: filteredBookings?.length,
      selectedFilter: groupFilter,
      groupBookings: result.filter(b => b.totalPatients && b.totalPatients > 1).length,
      individualBookings: result.filter(b => !b.totalPatients || b.totalPatients === 1).length,
      sampleData: filteredBookings?.slice(0, 3).map(b => ({
        id: b._id?.slice(-4),
        totalPatients: b.totalPatients,
        isGroup: b.totalPatients > 1
      }))
    });
    
    return result;
  }, [filteredBookings, groupFilter]);

  const safeStats = {
    totalRevenue: stats?.totalRevenue || 0,
    completedBookings: stats?.completedBookings || 0,
  };

  // ✅ Calculate group bookings count from totalPatients
  const actualGroupBookingsCount = useMemo(() => {
    return (filteredBookings || []).filter(booking => booking.totalPatients && booking.totalPatients > 1).length;
  }, [filteredBookings]);

  // ✅ Calculate individual bookings count
  const actualIndividualBookingsCount = useMemo(() => {
    return (filteredBookings || []).filter(booking => !booking.totalPatients || booking.totalPatients === 1).length;
  }, [filteredBookings]);

  // ✅ Calculate group revenue
  const groupRevenue = useMemo(() => {
    return (filteredBookings || [])
      .filter(b => b.totalPatients && b.totalPatients > 1)
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  }, [filteredBookings]);

  const StatusBadge = ({ status }) => {
    const config = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-teal-100 text-teal-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config[status] || config.pending}`}>
        {status?.toUpperCase()}
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
          {/* Group Filter Dropdown */}
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
            style={{ 
              backgroundColor: groupFilter !== 'all' ? `${primary}10` : '',
              borderColor: groupFilter !== 'all' ? primary : '#e5e7eb'
            }}
          >
            <option value="all">📋 All Bookings ({filteredBookings?.length || 0})</option>
            <option value="group">👥 Group Bookings ({actualGroupBookingsCount})</option>
            <option value="individual">👤 Individual Bookings ({actualIndividualBookingsCount})</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by name, ref, mobile..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="font-bold text-lg">₨{safeStats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="font-bold text-lg">{safeStats.completedBookings}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Group Bookings</p>
          <p className="font-bold text-lg" style={{ color: primary }}>
            {actualGroupBookingsCount}
          </p>
          <p className="text-xs text-gray-400">(totalPatients {'>'} 1)</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Group Revenue</p>
          <p className="font-bold text-lg" style={{ color: primary }}>
            ₨{groupRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Ref / Type</th>
              <th className="px-4 py-3 text-left">Patient Details</th>
              <th className="px-4 py-3 text-left">Tests</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {finalFilteredBookings.map((booking) => {
              const tests = getTestsArray(booking);
              const isGroup = booking.totalPatients && booking.totalPatients > 1;
              const personsCount = booking.totalPatients || 1;

              return (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs font-medium">
                        {booking.bookingReference || "N/A"}
                      </span>
                      {isGroup ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium w-fit">
                          <FaUsers size={10} />
                          Group ({personsCount} members)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium w-fit">
                          👤 Individual
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium">
                      {booking.patientDetails?.name || "No Name"}
                      {isGroup && personsCount > 1 && (
                        <span className="ml-1 text-xs text-purple-600">
                          (+{personsCount - 1} more)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{booking.patientDetails?.mobile || "No mobile"}</p>
                    {isGroup && booking.groupId && (
                      <p className="text-xs text-purple-500 mt-1">
                        Group ID: {booking.groupId.slice(-6)}
                      </p>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {tests.length > 0 ? (
                        tests.slice(0, 3).map((t, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {getTestName(t)}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No tests</span>
                      )}
                      {tests.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                          +{tests.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div>
                      <span className="font-semibold" style={{ color: primary }}>
                        ₨{(booking.totalAmount || 0).toLocaleString()}
                      </span>
                      {isGroup && personsCount > 1 && (
                        <p className="text-xs text-gray-400">
                          ₨{Math.round((booking.totalAmount || 0) / personsCount).toLocaleString()}/person
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {booking.appointmentDetails?.preferredDate
                      ? dayjs(booking.appointmentDetails.preferredDate).format('DD MMM YYYY')
                      : dayjs(booking.createdAt).format('DD MMM YYYY')}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={booking.bookingStatus} />
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewBooking(booking)}
                      className="p-2 border rounded-lg hover:bg-gray-100 transition-colors"
                      title="View Details"
                    >
                      <FiEye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {finalFilteredBookings.length === 0 && (
        <div className="p-10 text-center text-gray-500">
          {groupFilter === 'group' ? (
            <div>
              <FaUsers className="mx-auto text-gray-300 mb-2" size={40} />
              <p className="font-medium">No group bookings found</p>
              <p className="text-xs mt-1">Group bookings are those with totalPatients &gt; 1</p>
            </div>
          ) : groupFilter === 'individual' ? (
            <div>
              <p className="font-medium">No individual bookings found</p>
              <p className="text-xs mt-1">Individual bookings are those with totalPatients = 1</p>
            </div>
          ) : (
            <p>No bookings found</p>
          )}
        </div>
      )}
    </div>
  );
}