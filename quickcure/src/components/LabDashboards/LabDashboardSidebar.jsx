// // src/components/LabDashboard/LabDashboardSidebar.jsx
// import React from 'react';

// export default function LabDashboardSidebar({ activeTab, setActiveTab, lab, stats, theme, onLogout }) {
//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//     { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
//     { id: 'patients', label: 'Patients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
//     { id: 'tests', label: 'Tests', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 13.88a2 2 0 00-1.022.547 2 2 0 00-.548 1.022l-.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 01.517 3.86l-.477 2.387a2 2 0 00.548 1.022 2 2 0 001.022.548l2.387.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387.477a2 2 0 001.022-.548 2 2 0 00.548-1.022l.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01.517-3.86l.477-2.387a2 2 0 00-.548-1.022z M9 12h.01M12 12h.01M15 12h.01M9 15h.01M12 15h.01M15 15h.01' },
//     { id: 'collections', label: 'Collections', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
//     { id: 'reports', label: 'Reports', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
//   ];

//   return (
//     <div className="w-64 min-h-screen flex flex-col shadow-lg" style={{ backgroundColor: theme.secondary }}>
//       {/* Logo Section */}
//       <div className="p-6 border-b" style={{ borderColor: theme.primary }}>
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
//             {lab?.logo ? (
//               <img src={`http://localhost:5000/uploads/${lab.logo}`} alt={lab.name} className="w-full h-full object-cover" />
//             ) : (
//               <span className="text-white font-bold text-xl">{lab?.name?.[0] || 'L'}</span>
//             )}
//           </div>
//           <div>
//             <h1 className="text-white font-bold text-lg">LabPro</h1>
//             <p className="text-xs text-white/70">Lab Management</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 py-6">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setActiveTab(item.id)}
//             className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
//               activeTab === item.id
//                 ? 'bg-white/10 text-white'
//                 : 'text-white/70 hover:bg-white/5 hover:text-white'
//             }`}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//             </svg>
//             <span className="text-sm font-medium">{item.label}</span>
//             {item.id === 'bookings' && stats.pendingBookings > 0 && (
//               <span className="ml-auto bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
//                 {stats.pendingBookings}
//               </span>
//             )}
//             {item.id === 'collections' && stats.pendingCollections > 0 && (
//               <span className="ml-auto bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
//                 {stats.pendingCollections}
//               </span>
//             )}
//           </button>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-6 border-t" style={{ borderColor: theme.primary }}>
//         <button
//           onClick={onLogout}
//           className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//           </svg>
//           <span className="text-sm">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';

export default function LabDashboardSidebar({ activeTab, setActiveTab, lab, stats, theme, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'patients', label: 'Patients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'tests', label: 'Tests', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 13.88a2 2 0 00-1.022.547 2 2 0 00-.548 1.022l-.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 01.517 3.86l-.477 2.387a2 2 0 00.548 1.022 2 2 0 001.022.548l2.387.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387.477a2 2 0 001.022-.548 2 2 0 00.548-1.022l.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01.517-3.86l.477-2.387a2 2 0 00-.548-1.022z' },
    { id: 'collections', label: 'Collections', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'reports', label: 'Reports', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="w-64 min-h-screen flex flex-col shadow-lg" style={{ backgroundColor: theme.secondary }}>
      <div className="p-6 border-b" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            {lab?.logo ? (
              <img src={`http://localhost:5000/uploads/${lab.logo}`} alt={lab.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-white font-bold text-xl">{lab?.name?.[0] || 'L'}</span>
            )}
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">LabPro</h1>
            <p className="text-xs text-white/70">Lab Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="text-sm font-medium">{item.label}</span>
            {item.id === 'bookings' && stats.pendingBookings > 0 && (
              <span className="ml-auto bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
                {stats.pendingBookings}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t" style={{ borderColor: theme.primary }}>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}