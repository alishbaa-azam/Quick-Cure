import React from 'react';
import { 
  ClipboardList, 
  Calendar, 
  Users, 
  FilePlus, 
  Clock,
  MessageSquare,
  Settings
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ClipboardList },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'prescriptions', label: 'Prescriptions', icon: FilePlus },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare }, 
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuItemClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  return (
    <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 lg:w-72 bg-[#174047] text-white transform transition-transform duration-200 ease-in-out`}>
      <div className="h-full flex flex-col">
        <div className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold">Doctor Portal</h2>
        </div>
        
        <nav className="flex-1 px-2 md:px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`flex items-center gap-3 w-full px-3 md:px-4 py-2 md:py-3 rounded-lg mb-1 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#2c6774] text-white' 
                    : 'text-[#c0d3dc] hover:bg-[#1e4e56] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 md:p-6 border-t border-[#2c6774]">
          <div className="text-xs md:text-sm text-[#c0d3dc]">
            <p>QuickCure v1.0</p>
            <p className="mt-1">© 2026 All rights reserved</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;