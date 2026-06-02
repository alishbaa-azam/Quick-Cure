import React from 'react';
import { Bell, LogOut, Menu, X, Search, User } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, onLogout, doctorData }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const doctorName = doctorData?.name || doctorData?.fullName || user?.name || 'Doctor';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-3 md:px-4 py-2 md:py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* QuickCure removed from here - moved to Sidebar */}
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            {/* Doctor Name & Role */}
            <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg">
              <User className="w-3.5 h-3.5 text-[#2c6774]" />
              <div className="text-xs">
                <p className="font-medium text-[#174047]">{doctorName}</p>
                <p className="text-[10px] text-gray-500">Doctor</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 w-56 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
              />
            </div>
            
            {/* Mobile Search Button */}
            <button className="md:hidden p-1.5 rounded-full hover:bg-gray-100">
              <Search className="w-4 h-4" />
            </button>
            
            <button className="relative p-1.5 rounded-full hover:bg-gray-100">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs"
            >
              <LogOut size={13} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


