import React from 'react';
import { 
  FiHome, 
  FiCalendar, 
  FiUsers, 
  FiPackage, 
  FiBarChart2, 
  FiUser, 
  FiLogOut,
  FiTool,
  FiMapPin
} from 'react-icons/fi';

import{
  FaFlask
} from 'react-icons/fa';

export default function LabDashboardSidebar({ activeTab, setActiveTab, lab, stats, theme, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'bookings', label: 'Bookings', icon: FiCalendar },
    { id: 'technicians', label: 'Technicians', icon: FiTool },
    { id: 'patients', label: 'Patients', icon: FiUsers },
    { id: 'tests', label: 'Tests', icon: FaFlask },
    { id: 'collections', label: 'Collections', icon: FiPackage },
    { id: 'reports', label: 'Reports', icon: FiBarChart2 },
    { id: 'cities', label: 'Cities', icon: FiMapPin },
    { id: 'profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <div className="w-64 flex-shrink-0 h-screen flex flex-col shadow-lg" style={{ backgroundColor: theme.secondary }}>
      <div className="p-6 border-b flex-shrink-0" style={{ borderColor: theme.primary }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            {lab?.logo ? (
              <img src={`http://localhost:5000/uploads/${lab.logo}`} alt={lab.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-white font-bold text-xl">{lab?.name?.[0] || 'L'}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-lg truncate" title={lab?.name}>
              {lab?.name || 'LabPro'}
            </h1>
            <p className="text-xs text-white/70">Lab Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.id === 'bookings' && stats.pendingBookings > 0 && (
                <span className="ml-auto bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5">
                  {stats.pendingBookings}

            
                </span>
              )}
              {/* {item.id === 'technicians' && stats.activeTechnicians > 0 && (
                <span className="ml-auto bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                  {stats.activeTechnicians}
                </span>
              )} */}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t" style={{ borderColor: theme.primary }}>
        <button 
          onClick={onLogout} 
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}