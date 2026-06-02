import React from 'react';
import { 
  ClipboardList, 
  Calendar, 
  Users, 
  FilePlus, 
  MessageSquare,
  Settings
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ClipboardList },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare }, 
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuItemClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  return (
    <aside
      className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        fixed
        top-16
        left-0
        h-[calc(100vh-64px)]
        w-64
        lg:w-72
        z-20
        bg-[#174047]
        text-white
        transform
        transition-transform
        duration-200
        ease-in-out
      `}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* QuickCure Logo Section - Fixed at top */}
        <div className="p-4 md:p-5 border-b border-[#2c6774] flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">QuickCure</h1>
          <p className="text-xs text-[#c0d3dc] mt-0.5">Doctor Portal</p>
        </div>
        
        {/* Menu Items - Sirf yeh scroll hoga agar zaroorat ho */}
        <nav className="flex-1 px-2 md:px-4 py-3 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`flex items-center gap-3 w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg mb-1 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#2c6774] text-white' 
                    : 'text-[#c0d3dc] hover:bg-[#1e4e56] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                <span className="text-sm md:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Footer - Fixed at bottom */}
        <div className="p-4 md:p-5 border-t border-[#2c6774] flex-shrink-0">
          <div className="text-xs text-[#c0d3dc]">
            <p>QuickCure v1.0</p>
            <p className="mt-1">© 2026 All rights reserved</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;