// import React from 'react';
// import dayjs from 'dayjs';
// import { FiCalendar, FiDollarSign, FiSearch, FiEye, FiTrendingUp } from 'react-icons/fi';
// import { FaCheckCircle, FaUsers } from 'react-icons/fa';

// export default function BookingsTab({ filteredBookings, stats, theme, statusFilter, setStatusFilter, searchText, setSearchText, timeRange, setTimeRange, onViewBooking }) {
//   const safeStats = {
//     totalRevenue: stats?.totalRevenue || 0,
//     completedBookings: stats?.completedBookings || 0,
//     groupBookings: stats?.groupBookings || 0,
//   };

//   const averageBookingValue = stats?.totalBookings ? Math.round(safeStats.totalRevenue / stats.totalBookings) : 0;

//   const StatusBadge = ({ status }) => {
//     const config = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       confirmed: 'bg-teal-100 text-teal-800',
//       completed: 'bg-green-100 text-green-800',
//       cancelled: 'bg-red-100 text-red-800'
//     };
//     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || config.pending}`}>{status?.toUpperCase()}</span>;
//   };

//   const SummaryCard = ({ title, value, color, icon: Icon }) => (
//     <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}10` }}>
//       <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Icon size={12} style={{ color }} /> {title}</p>
//       <p className="text-lg font-semibold" style={{ color }}>{value}</p>
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-sm">
//       <div className="p-4 border-b" style={{ borderBottomColor: `${theme.primary}20` }}>
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
//               <FiCalendar size={20} />
//             </div>
//             <h2 className="text-xl font-semibold">Booking Management</h2>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               {['7', '30', 'all'].map((days) => (
//                 <button key={days} onClick={() => setTimeRange(days)} className={`px-3 py-1 rounded-md text-sm ${timeRange === days ? 'bg-white shadow' : 'hover:bg-gray-200'}`}>
//                   {days === 'all' ? 'All Time' : `${days} Days`}
//                 </button>
//               ))}
//             </div>
            
//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1 border rounded-lg text-sm">
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
            
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
//               <input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="pl-9 pr-4 py-1 border rounded-lg text-sm w-48" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           <SummaryCard title="Total Revenue" value={`₹${safeStats.totalRevenue.toLocaleString()}`} color={theme.primary} icon={FiDollarSign} />
//           <SummaryCard title="Average Value" value={`₹${averageBookingValue.toLocaleString()}`} color={theme.success} icon={FiTrendingUp} />
//           <SummaryCard title="Group Bookings" value={safeStats.groupBookings} color={theme.purple} icon={FaUsers} />
//           <SummaryCard title="Completed" value={safeStats.completedBookings} color={theme.success} icon={FaCheckCircle} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead style={{ backgroundColor: `${theme.bgLight || '#9fbfc5'}30` }}>
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Reference</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Patient</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tests</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {(filteredBookings || []).map((booking) => (
//               <tr key={booking._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3"><span className="font-mono text-sm">{booking.bookingReference}</span></td>
//                 <td className="px-4 py-3"><div><p className="font-medium">{booking.patientDetails?.name}</p><p className="text-xs text-gray-500">{booking.patientDetails?.mobile}</p></div></td>
//                 <td className="px-4 py-3">{booking.tests?.length || 0} tests</td>
//                 <td className="px-4 py-3"><p className="font-semibold" style={{ color: theme.primary }}>₹{booking.totalAmount?.toLocaleString()}</p></td>
//                 <td className="px-4 py-3">{dayjs(booking.appointmentDetails?.preferredDate).format('DD MMM YYYY')}</td>
//                 <td className="px-4 py-3"><StatusBadge status={booking.bookingStatus} /></td>
//                 <td className="px-4 py-3">
//                   <button onClick={() => onViewBooking(booking)} className="p-2 border rounded-lg hover:bg-gray-50">
//                     <FiEye size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {filteredBookings?.length === 0 && (
//         <div className="py-12 text-center"><FiCalendar size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No bookings found</p></div>
//       )}
//     </div>
//   );
// }

// import React from 'react';
// import dayjs from 'dayjs';
// import { FiCalendar, FiDollarSign, FiSearch, FiEye, FiTrendingUp } from 'react-icons/fi';
// import { FaCheckCircle, FaUsers } from 'react-icons/fa';

// export default function BookingsTab({
//   filteredBookings,
//   stats,
//   theme,
//   statusFilter,
//   setStatusFilter,
//   searchText,
//   setSearchText,
//   timeRange,
//   setTimeRange,
//   onViewBooking
// }) {
//   const primary = theme?.primary || "#2c6774";

//   // ✅ SAFE HELPERS (CORE FIX)
//   const getTestsArray = (booking) => {
//     if (!booking) return [];

//     // possible structures handled
//     if (Array.isArray(booking.tests)) return booking.tests;
//     if (Array.isArray(booking.testDetails)) return booking.testDetails;
//     if (booking.tests && typeof booking.tests === "object") return Object.values(booking.tests);

//     return [];
//   };

//   const getTestName = (t) => {
//     return t?.name || t?.test?.name || t?.testId?.name || "Unnamed Test";
//   };

//   const getTestPrice = (t) => {
//     return t?.price || t?.test?.price || t?.testId?.price || 0;
//   };

//   const safeStats = {
//     totalRevenue: stats?.totalRevenue || 0,
//     completedBookings: stats?.completedBookings || 0,
//     groupBookings: stats?.groupBookings || 0,
//   };

//   const averageBookingValue = stats?.totalBookings
//     ? Math.round(safeStats.totalRevenue / stats.totalBookings)
//     : 0;

//   const StatusBadge = ({ status }) => {
//     const config = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       confirmed: 'bg-teal-100 text-teal-800',
//       completed: 'bg-green-100 text-green-800',
//       cancelled: 'bg-red-100 text-red-800'
//     };
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || config.pending}`}>
//         {status?.toUpperCase()}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm">
      
//       {/* HEADER */}
//       <div className="p-4 border-b" style={{ borderBottomColor: `${primary}20` }}>
        
//         <div className="flex flex-wrap gap-3 mb-4">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1 border rounded-lg text-sm">
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             className="px-3 py-1 border rounded-lg text-sm"
//           />
//         </div>

//         {/* SUMMARY */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           <div>Revenue: ₨{safeStats.totalRevenue.toLocaleString()}</div>
//           <div>Avg: ₨{averageBookingValue.toLocaleString()}</div>
//           <div>Group: {safeStats.groupBookings}</div>
//           <div>Completed: {safeStats.completedBookings}</div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th>Ref</th>
//               <th>Patient</th>
//               <th>Tests</th>
//               <th>Amount</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {(filteredBookings || []).map((booking) => {
//               const tests = getTestsArray(booking);

//               return (
//                 <tr key={booking._id}>
                  
//                   <td>{booking.bookingReference || "N/A"}</td>

//                   <td>
//                     {booking.patientDetails?.name || "No Name"}
//                   </td>

//                   {/* ✅ TEST COUNT + NAMES FIX */}
//                   <td>
//                     {tests.length} tests
//                     <br />
//                     <small>
//                       {tests.map(getTestName).join(', ')}
//                     </small>
//                   </td>

//                   {/* ✅ AMOUNT FIX */}
//                   <td>₨{(booking.totalAmount || 0).toLocaleString()}</td>

//                   {/* ✅ DATE FIX */}
//                   <td>
//                     {booking.appointmentDetails?.preferredDate
//                       ? dayjs(booking.appointmentDetails.preferredDate).format('DD MMM YYYY')
//                       : "N/A"}
//                   </td>

//                   <td><StatusBadge status={booking.bookingStatus} /></td>

//                   <td>
//                     <button onClick={() => onViewBooking(booking)}>
//                       <FiEye />
//                     </button>
//                   </td>

//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {filteredBookings?.length === 0 && (
//         <div className="p-6 text-center">No bookings found</div>
//       )}
//     </div>
//   );
// }


import React from 'react';
import dayjs from 'dayjs';
import { FiCalendar, FiSearch, FiEye, FiTrash2 } from 'react-icons/fi';
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
  onDeleteBooking // ✅ NEW PROP
}) {
  const primary = theme?.primary || "#2c6774";

  // ✅ HELPERS
  const getTestsArray = (booking) => {
    if (!booking) return [];
    if (Array.isArray(booking.tests)) return booking.tests;
    if (Array.isArray(booking.testDetails)) return booking.testDetails;
    if (booking.tests && typeof booking.tests === "object") return Object.values(booking.tests);
    return [];
  };

  const getTestName = (t) =>
    t?.name || t?.test?.name || t?.testId?.name || "Unnamed Test";

  const safeStats = {
    totalRevenue: stats?.totalRevenue || 0,
    completedBookings: stats?.completedBookings || 0,
    groupBookings: stats?.groupBookings || 0,
  };

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
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="font-bold text-lg">₨{safeStats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="font-bold text-lg">{safeStats.completedBookings}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-xs text-gray-500">Group</p>
          <p className="font-bold text-lg">{safeStats.groupBookings}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Ref</th>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">Tests</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(filteredBookings || []).map((booking) => {
              const tests = getTestsArray(booking);

              return (
                <tr key={booking._id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3 font-mono text-xs">
                    {booking.bookingReference || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium">{booking.patientDetails?.name || "No Name"}</p>
                    <p className="text-xs text-gray-500">{booking.patientDetails?.mobile}</p>
                  </td>

                  {/* ✅ BEAUTIFUL TEST DISPLAY */}
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {tests.length > 0 ? (
                        tests.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {getTestName(t)}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No tests</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold" style={{ color: primary }}>
                    ₨{(booking.totalAmount || 0).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    {booking.appointmentDetails?.preferredDate
                      ? dayjs(booking.appointmentDetails.preferredDate).format('DD MMM YYYY')
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={booking.bookingStatus} />
                  </td>

                  {/* ✅ ACTIONS */}
                  <td className="px-4 py-3 flex gap-2">

                    {/* VIEW */}
                    <button
                      onClick={() => onViewBooking(booking)}
                      className="p-2 border rounded-lg hover:bg-gray-100"
                      title="View"
                    >
                      <FiEye size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this booking?")) {
                          onDeleteBooking(booking._id);
                        }
                      }}
                      className="p-2 border rounded-lg text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>

                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredBookings?.length === 0 && (
        <div className="p-10 text-center text-gray-500">
          No bookings found
        </div>
      )}
    </div>
  );
}