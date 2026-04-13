// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import { FiCalendar, FiDollarSign, FiUser, FiArrowRight, FiActivity, FiRefreshCw } from 'react-icons/fi';
// import { FaCheckCircle, FaUsers, FaChartLine, FaChartPie, FaChartBar, FaHospital, FaFlask } from 'react-icons/fa';
// import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// export default function DashboardTab({ bookings, filteredBookings, stats, theme, loading, onRefresh, setActiveTab, onViewBooking }) {
//   const [chartType, setChartType] = useState('line');

//   const isActualGroupBooking = (b) => 
//     b?.groupBooking && (b.members?.length >= 2 || b.patients?.length >= 2);

//   const safeStats = {
//     totalBookings: stats?.totalBookings || bookings?.length || 0,
//     pendingBookings: stats?.pendingBookings || bookings?.filter(b => b.bookingStatus === 'pending').length || 0,
//     confirmedBookings: stats?.confirmedBookings || bookings?.filter(b => b.bookingStatus === 'confirmed').length || 0,
//     completedBookings: stats?.completedBookings || bookings?.filter(b => b.bookingStatus === 'completed').length || 0,
//     cancelledBookings: stats?.cancelledBookings || bookings?.filter(b => b.bookingStatus === 'cancelled').length || 0,
//     totalRevenue: stats?.totalRevenue || bookings?.filter(b => b.bookingStatus === 'completed').reduce((sum, b) => sum + (b.totalAmount || 0), 0) || 0,
//     groupBookings: stats?.groupBookings || (bookings || []).filter(isActualGroupBooking).length || 0,
//   };

//   const completionRate = safeStats.totalBookings ? Math.round((safeStats.completedBookings / safeStats.totalBookings) * 100) : 0;

//   const generateChartData = () => {
//     const data = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = dayjs().subtract(i, 'days');
//       const dayBookings = bookings?.filter(b => dayjs(b.createdAt).isSame(date, 'day')) || [];
//       data.push({
//         date: date.format('MMM DD'),
//         bookings: dayBookings.length,
//         groupBookings: dayBookings.filter(isActualGroupBooking).length,
//         revenue: dayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
//       });
//     }
//     return data;
//   };

//   const chartData = generateChartData();

//   const statusDistribution = [
//     { status: 'Pending', count: safeStats.pendingBookings, color: theme.warning },
//     { status: 'Confirmed', count: safeStats.confirmedBookings, color: theme.accent },
//     { status: 'Completed', count: safeStats.completedBookings, color: theme.success },
//     { status: 'Cancelled', count: safeStats.cancelledBookings, color: theme.error }
//   ].filter(item => item.count > 0);

//   const StatCard = ({ title, value, color, icon: Icon, progress }) => (
//     <div className="bg-white rounded-xl p-4 shadow-sm">
//       <div className="flex items-center justify-between mb-2">
//         <p className="text-sm text-gray-500">{title}</p>
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
//           <Icon size={16} style={{ color }} />
//         </div>
//       </div>
//       <p className="text-2xl font-bold mb-2" style={{ color }}>{value}</p>
//       <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//         <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: color }} />
//       </div>
//     </div>
//   );

//   const ChartTypeButton = ({ type, current, onClick, icon: Icon }) => (
//     <button onClick={() => onClick(type)} className={`p-2 rounded-md transition-colors ${current === type ? 'bg-white shadow' : 'hover:bg-gray-200'}`}>
//       <Icon size={14} />
//     </button>
//   );

//   return (
//     <div className="space-y-6">
//       {/* Welcome Card */}
//       <div className="rounded-xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
//               <FaHospital size={32} />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">Welcome back!</h2>
//               <p className="text-white/80">{dayjs().format('dddd, MMMM D, YYYY')}</p>
//             </div>
//           </div>
//           <button onClick={onRefresh} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2">
//             <FiRefreshCw size={16} /> Refresh
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard title="Total Bookings" value={safeStats.totalBookings} color={theme.primary} icon={FiCalendar} progress={completionRate} />
//         <StatCard title="Group Bookings" value={safeStats.groupBookings} color={theme.purple} icon={FaUsers} progress={safeStats.totalBookings ? (safeStats.groupBookings / safeStats.totalBookings) * 100 : 0} />
//         <StatCard title="Completed" value={safeStats.completedBookings} color={theme.success} icon={FaCheckCircle} progress={(safeStats.completedBookings / safeStats.totalBookings) * 100 || 0} />
//         <StatCard title="Total Revenue" value={`Rs.${safeStats.totalRevenue.toLocaleString()}`} color={theme.accent} icon={FiDollarSign} progress={75} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
//             <h3 className="font-semibold flex items-center gap-2"><FaChartLine style={{ color: theme.primary }} /> Booking Trends</h3>
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <ChartTypeButton type="line" current={chartType} onClick={setChartType} icon={FaChartLine} />
//               <ChartTypeButton type="bar" current={chartType} onClick={setChartType} icon={FaChartBar} />
//               <ChartTypeButton type="area" current={chartType} onClick={setChartType} icon={FaChartLine} />
//             </div>
//           </div>
          
//           {bookings?.length > 0 ? (
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 {chartType === 'line' && (
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                     <YAxis yAxisId="left" />
//                     <YAxis yAxisId="right" orientation="right" />
//                     <Tooltip />
//                     <Legend />
//                     <Line yAxisId="left" type="monotone" dataKey="bookings" stroke={theme.primary} name="Bookings" strokeWidth={2} />
//                     <Line yAxisId="left" type="monotone" dataKey="groupBookings" stroke={theme.purple} name="Group" strokeWidth={2} />
//                     <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={theme.success} name="Revenue" strokeWidth={2} />
//                   </LineChart>
//                 )}
//                 {chartType === 'bar' && (
//                   <BarChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="bookings" fill={theme.primary} name="Bookings" radius={[4, 4, 0, 0]} />
//                     <Bar dataKey="groupBookings" fill={theme.purple} name="Group" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 )}
//                 {chartType === 'area' && (
//                   <AreaChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Area type="monotone" dataKey="bookings" stackId="1" stroke={theme.primary} fill={theme.primary} fillOpacity={0.2} />
//                     <Area type="monotone" dataKey="groupBookings" stackId="1" stroke={theme.purple} fill={theme.purple} fillOpacity={0.2} />
//                   </AreaChart>
//                 )}
//               </ResponsiveContainer>
//             </div>
//           ) : (
//             <div className="h-80 flex items-center justify-center text-gray-500">No booking data available</div>
//           )}
//         </div>

//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <h3 className="font-semibold mb-4 flex items-center gap-2"><FaChartPie style={{ color: theme.primary }} /> Status Distribution</h3>
//           {safeStats.totalBookings > 0 ? (
//             <div className="space-y-4">
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="count">
//                       {statusDistribution.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               {statusDistribution.map((item) => (
//                 <div key={item.status}>
//                   <div className="flex justify-between text-sm mb-1"><span>{item.status}</span><span className="font-semibold">{item.count}</span></div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full rounded-full" style={{ width: `${(item.count / safeStats.totalBookings) * 100}%`, backgroundColor: item.color }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="h-48 flex items-center justify-center text-gray-500">No data</div>
//           )}
//         </div>
//       </div>

//       {/* Recent Bookings */}
//       <div className="bg-white rounded-xl p-4 shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-semibold flex items-center gap-2"><FiCalendar style={{ color: theme.primary }} /> Recent Bookings</h3>
//           <button onClick={() => setActiveTab('bookings')} className="text-sm flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>View All <FiArrowRight size={14} /></button>
//         </div>
        
//         {filteredBookings?.length > 0 ? (
//           <div className="divide-y">
//             {filteredBookings.slice(0, 5).map((booking) => (
//               <div key={booking._id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${isActualGroupBooking(booking) ? 'bg-purple-500' : 'bg-teal-500'}`}>
//                     {isActualGroupBooking(booking) ? <FaUsers size={18} /> : <FiUser size={18} />}
//                   </div>
//                   <div>
//                     <p className="font-medium">{booking.patientDetails?.name}</p>
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1"><FaFlask size={12} /> {booking.tests?.length} tests</span>
//                       <span className="flex items-center gap-1">
//                         <FiDollarSign size={12} /> 
//                         Rs.{booking.totalAmount}
//                         {booking.discountAmount > 0 && (
//                           <span className="text-[10px] text-green-600 font-bold ml-1">
//                             (Saved ₨{booking.discountAmount})
//                           </span>
//                         )}
//                       </span>
//                       <span className="flex items-center gap-1"><FiCalendar size={12} /> {dayjs(booking.appointmentDetails?.preferredDate || booking.createdAt).format('DD MMM')}</span>
//                       {isActualGroupBooking(booking) && (
//                         <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold uppercase tracking-tighter">
//                           {booking.groupName || 'Group'}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <button onClick={() => onViewBooking(booking)} className="px-3 py-1 border rounded-lg hover:bg-gray-50 flex items-center gap-1">
//                   <FiActivity size={14} /> View
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="py-12 text-center text-gray-500">No recent bookings</div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { FiCalendar, FiDollarSign, FiUser, FiArrowRight, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { FaCheckCircle, FaUsers, FaChartLine, FaChartPie, FaChartBar, FaHospital, FaFlask } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardTab({ bookings, filteredBookings, stats, theme, loading, onRefresh, setActiveTab, onViewBooking }) {
  const [chartType, setChartType] = useState('line');

  // ✅ Group booking sirf tabhi jab totalPatients > 1 ho
  const isActualGroupBooking = (b) => {
    if (!b) return false;
    return b.totalPatients && b.totalPatients > 1;
  };

  // ✅ Stats calculate karo with correct group count
  const safeStats = useMemo(() => {
    // Total bookings se group bookings count karo (jisme totalPatients > 1)
    const allBookings = bookings || [];
    const groupBookingsCount = allBookings.filter(b => b.totalPatients && b.totalPatients > 1).length;
    const individualBookingsCount = allBookings.filter(b => !b.totalPatients || b.totalPatients === 1).length;
    
    console.log('📊 Stats Calculation:', {
      total: allBookings.length,
      group: groupBookingsCount,
      individual: individualBookingsCount,
      sample: allBookings.slice(0, 2).map(b => ({ totalPatients: b.totalPatients, isGroup: b.totalPatients > 1 }))
    });
    
    return {
      totalBookings: stats?.totalBookings || allBookings.length,
      pendingBookings: stats?.pendingBookings || allBookings.filter(b => b.bookingStatus === 'pending').length,
      confirmedBookings: stats?.confirmedBookings || allBookings.filter(b => b.bookingStatus === 'confirmed').length,
      completedBookings: stats?.completedBookings || allBookings.filter(b => b.bookingStatus === 'completed').length,
      cancelledBookings: stats?.cancelledBookings || allBookings.filter(b => b.bookingStatus === 'cancelled').length,
      totalRevenue: stats?.totalRevenue || allBookings.filter(b => b.bookingStatus === 'completed').reduce((sum, b) => sum + (b.totalAmount || 0), 0),
      groupBookings: groupBookingsCount,  // ✅ Sirf wahi bookings jisme totalPatients > 1
    };
  }, [bookings, stats]);

  const completionRate = safeStats.totalBookings ? Math.round((safeStats.completedBookings / safeStats.totalBookings) * 100) : 0;

  // ✅ Chart data bhi same logic se generate karo
  const chartData = useMemo(() => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = dayjs().subtract(i, 'days');
      const dayBookings = bookings?.filter(b => dayjs(b.createdAt).isSame(date, 'day')) || [];
      data.push({
        date: date.format('MMM DD'),
        bookings: dayBookings.length,
        groupBookings: dayBookings.filter(b => b.totalPatients && b.totalPatients > 1).length,
        revenue: dayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
      });
    }
    return data;
  }, [bookings]);

  const statusDistribution = [
    { status: 'Pending', count: safeStats.pendingBookings, color: theme?.warning || '#f59e0b' },
    { status: 'Confirmed', count: safeStats.confirmedBookings, color: theme?.accent || '#3b82f6' },
    { status: 'Completed', count: safeStats.completedBookings, color: theme?.success || '#10b981' },
    { status: 'Cancelled', count: safeStats.cancelledBookings, color: theme?.error || '#ef4444' }
  ].filter(item => item.count > 0);

  const StatCard = ({ title, value, color, icon: Icon, progress }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold mb-2" style={{ color }}>{value}</p>
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: color }} />
      </div>
    </div>
  );

  const ChartTypeButton = ({ type, current, onClick, icon: Icon }) => (
    <button onClick={() => onClick(type)} className={`p-2 rounded-md transition-colors ${current === type ? 'bg-white shadow' : 'hover:bg-gray-200'}`}>
      <Icon size={14} />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="rounded-xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${theme?.primary || '#6366f1'}, ${theme?.secondary || '#8b5cf6'})` }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <FaHospital size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome back!</h2>
              <p className="text-white/80">{dayjs().format('dddd, MMMM D, YYYY')}</p>
            </div>
          </div>
          <button onClick={onRefresh} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2">
            <FiRefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Bookings" 
          value={safeStats.totalBookings} 
          color={theme?.primary || '#6366f1'} 
          icon={FiCalendar} 
          progress={completionRate} 
        />
        <StatCard 
          title="Group Bookings" 
          value={safeStats.groupBookings}  // ✅ Sirf wahi bookings jisme 1 se zyada patients hain
          color={theme?.purple || '#8b5cf6'} 
          icon={FaUsers} 
          progress={safeStats.totalBookings ? (safeStats.groupBookings / safeStats.totalBookings) * 100 : 0} 
        />
        <StatCard 
          title="Completed" 
          value={safeStats.completedBookings} 
          color={theme?.success || '#10b981'} 
          icon={FaCheckCircle} 
          progress={(safeStats.completedBookings / safeStats.totalBookings) * 100 || 0} 
        />
        <StatCard 
          title="Total Revenue" 
          value={`Rs.${safeStats.totalRevenue.toLocaleString()}`} 
          color={theme?.accent || '#3b82f6'} 
          icon={FiDollarSign} 
          progress={75} 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FaChartLine style={{ color: theme?.primary || '#6366f1' }} /> Booking Trends
            </h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <ChartTypeButton type="line" current={chartType} onClick={setChartType} icon={FaChartLine} />
              <ChartTypeButton type="bar" current={chartType} onClick={setChartType} icon={FaChartBar} />
              <ChartTypeButton type="area" current={chartType} onClick={setChartType} icon={FaChartLine} />
            </div>
          </div>
          
          {bookings?.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' && (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="bookings" stroke={theme?.primary || '#6366f1'} name="Bookings" strokeWidth={2} />
                    <Line yAxisId="left" type="monotone" dataKey="groupBookings" stroke={theme?.purple || '#8b5cf6'} name="Group" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={theme?.success || '#10b981'} name="Revenue" strokeWidth={2} />
                  </LineChart>
                )}
                {chartType === 'bar' && (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bookings" fill={theme?.primary || '#6366f1'} name="Bookings" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="groupBookings" fill={theme?.purple || '#8b5cf6'} name="Group" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
                {chartType === 'area' && (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="bookings" stackId="1" stroke={theme?.primary || '#6366f1'} fill={theme?.primary || '#6366f1'} fillOpacity={0.2} />
                    <Area type="monotone" dataKey="groupBookings" stackId="1" stroke={theme?.purple || '#8b5cf6'} fill={theme?.purple || '#8b5cf6'} fillOpacity={0.2} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">No booking data available</div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FaChartPie style={{ color: theme?.primary || '#6366f1' }} /> Status Distribution
          </h3>
          {safeStats.totalBookings > 0 ? (
            <div className="space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="count" label>
                      {statusDistribution.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {statusDistribution.map((item) => (
                <div key={item.status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.status}</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(item.count / safeStats.totalBookings) * 100}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-500">No data</div>
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FiCalendar style={{ color: theme?.primary || '#6366f1' }} /> Recent Bookings
          </h3>
          <button onClick={() => setActiveTab('bookings')} className="text-sm flex items-center gap-1 hover:underline" style={{ color: theme?.primary || '#6366f1' }}>
            View All <FiArrowRight size={14} />
          </button>
        </div>
        
        {filteredBookings?.length > 0 ? (
          <div className="divide-y">
            {filteredBookings.slice(0, 5).map((booking) => {
              const isGroup = booking.totalPatients && booking.totalPatients > 1;
              const personsCount = booking.totalPatients || 1;
              
              return (
                <div key={booking._id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${isGroup ? 'bg-purple-500' : 'bg-teal-500'}`}>
                      {isGroup ? <FaUsers size={18} /> : <FiUser size={18} />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {booking.patientDetails?.name}
                        {isGroup && personsCount > 1 && (
                          <span className="ml-1 text-xs text-purple-600">
                            (+{personsCount - 1} more)
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaFlask size={12} /> {booking.tests?.length || 0} tests
                        </span>
                        <span className="flex items-center gap-1">
                          <FiDollarSign size={12} /> 
                          Rs.{booking.totalAmount || 0}
                          {booking.discountAmount > 0 && (
                            <span className="text-[10px] text-green-600 font-bold ml-1">
                              (Saved ₨{booking.discountAmount})
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} /> {dayjs(booking.appointmentDetails?.preferredDate || booking.createdAt).format('DD MMM')}
                        </span>
                        {isGroup && (
                          <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold uppercase tracking-tighter">
                            {booking.groupName || `Group (${personsCount})`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onViewBooking(booking)} className="px-3 py-1 border rounded-lg hover:bg-gray-50 flex items-center gap-1">
                    <FiActivity size={14} /> View
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">No recent bookings</div>
        )}
      </div>
    </div>
  );
}