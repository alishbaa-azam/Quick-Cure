import React from 'react';
import { Bell, LogOut, Menu, X, Search, User } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, onLogout, doctorData }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const doctorName = doctorData?.name || doctorData?.fullName || user?.name || 'Doctor';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-[#174047]">QuickCure</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Doctor Name & Role */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-[#2c6774]" />
              <div className="text-sm">
                <p className="font-medium text-[#174047]">{doctorName}</p>
                <p className="text-xs text-gray-500">Doctor</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
              />
            </div>
            
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Search className="w-4 h-4" />
            </button>
            
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
