import React from 'react';
import { LayoutDashboard, Calendar, Users, FileText, Star, Settings, History } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & stats' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, description: 'Manage bookings' },
    { id: 'patients', label: 'Patients', icon: Users, description: 'Patient records' },
    { id: 'patient-history', label: 'Patient History', icon: History, description: 'Medical history' },
    { id: 'reviews', label: 'Reviews', icon: Star, description: 'Patient feedback' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Profile settings' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Mobile sidebar drawer
  if (sidebarOpen) {
    return (
      <>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Sidebar panel */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-[#0f2c33] to-[#174047] shadow-2xl z-50 flex flex-col lg:hidden animate-slide-in">
          {/* Logo */}
          <div className="p-5 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                <span className="text-white font-bold text-xs">QC</span>
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white text-sm truncate block">QuickCure</span>
                <p className="text-[10px] text-white/50 truncate">Doctor Dashboard</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                    isActive 
                      ? 'bg-white/15 text-white' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {isActive && <div className="w-1 h-5 rounded-full bg-[#2c6774] ml-auto flex-shrink-0"></div>}
                </button>
              );
            })}
          </nav>

          {/* Version */}
          <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
            <p className="text-[10px] text-white/30">QuickCure v1.0</p>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar - always visible, static in flex layout (no fixed positioning)
  return (
    <aside className="hidden lg:flex w-64 flex-shrink-0 min-h-screen flex-col bg-gradient-to-br from-[#0f2c33] to-[#174047] shadow-2xl shadow-black/20">
      {/* Logo Area */}
      <div className="p-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-xs">QC</span>
          </div>
          <div className="min-w-0">
            <span className="font-bold text-white text-sm truncate block">QuickCure</span>
            <p className="text-[10px] text-white/50 font-medium truncate">Doctor Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        <p className="px-3 text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left group ${
                isActive 
                  ? 'bg-white/15 text-white shadow-lg shadow-black/10 border border-white/10' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white/90'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                isActive ? 'bg-[#2c6774] shadow-sm' : 'group-hover:bg-white/5'
              }`}>
                <Icon size={16} className={`${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{item.label}</p>
                <p className="text-[9px] text-white/40 truncate">{item.description}</p>
              </div>
              {isActive && (
                <div className="w-1 h-6 rounded-full bg-[#2c6774] shadow-sm flex-shrink-0"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Version info */}
      <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-white/30">QuickCure v1.0</p>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;