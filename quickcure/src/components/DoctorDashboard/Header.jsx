import React from 'react';
import { Bell, LogOut, Menu, X, Search, User, MoreVertical } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, onLogout, doctorData }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const doctorName = doctorData?.name || doctorData?.fullName || user?.name || 'Doctor';

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-gray-100">
      <div className="px-3 sm:px-5 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2c6774]/50"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Mobile Logo */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#174047] to-[#2c6774] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">QC</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800 text-sm">QuickCure</span>
                <p className="text-[10px] text-gray-500 -mt-0.5">Doctor Portal</p>
              </div>
            </div>

            {/* Desktop Logo */}
            {/* <div className="hidden lg:flex items-center gap-2"> */}
              {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#174047] to-[#2c6774] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">QC</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800 text-sm">QuickCure</span>
                <p className="text-[10px] text-gray-500 -mt-0.5">Doctor Portal</p>
              </div>
            </div> */}
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Doctor Name & Role */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center">
                <span className="text-white font-bold text-xs">{doctorName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-xs">
                <p className="font-medium text-[#174047] truncate max-w-[120px]">{doctorName}</p>
                <p className="text-[10px] text-gray-500">Doctor</p>
              </div>
            </div>

            {/* Quick Doctor Avatar (mobile) */}
            <div className="sm:hidden w-8 h-8 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center">
              <span className="text-white font-bold text-xs">{doctorName.charAt(0).toUpperCase()}</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 w-48 xl:w-56 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent text-sm bg-gray-50/50"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            
            {/* Logout */}
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors border border-transparent hover:border-red-100"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;