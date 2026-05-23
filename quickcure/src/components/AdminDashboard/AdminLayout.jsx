import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Stethoscope, Microscope, 
  Pill, ShoppingCart, DollarSign, BarChart3, 
  LogOut, Menu, Bell, Search, User, X, Settings, Shield,
  FileText, Activity, ChevronDown, CreditCard, TrendingUp
} from 'lucide-react';
import { message, Avatar, Dropdown, Badge } from 'antd';
import logo from "../../images/logo.png";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, desc: 'Overview & stats' },
    { name: 'Users', href: '/admin/users', icon: Users, desc: 'Manage users' },
    { name: 'Registrations', href: '/admin/registrations', icon: FileText, desc: 'Pending requests' },
    { name: 'Doctors', href: '/admin/doctors', icon: Stethoscope, desc: 'All doctors' },
    { name: 'Labs', href: '/admin/labs', icon: Microscope, desc: 'All labs' },
    { name: 'Pharmacies', href: '/admin/pharmacies', icon: Pill, desc: 'All pharmacies' },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, desc: 'Medicine orders' },
    { name: 'Payments', href: '/admin/payments', icon: DollarSign, desc: 'Revenue & payments' },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3, desc: 'Analytics' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, desc: 'Configuration' },
  ];

  const isActivePath = (href) => {
    if (href === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard' || location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
          message.error('Access denied. Admin only.');
          navigate('/login');
          return;
        }
        setAdmin(user);
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    } else {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logged out successfully');
    navigate('/login');
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-[#5c878f] border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <p className="mt-6 text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-gradient-to-b from-[#152b2e] to-[#0f1f21] text-white transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:relative flex flex-col shadow-2xl`}>
        
        {/* Logo Section */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight text-white">QuickCure</h1>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-widest">Admin Portal</span>
              </div>
            </div>
            <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="mx-4 mt-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <Shield size={20} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#152b2e]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{admin.name || 'Admin'}</p>
              <p className="text-[10px] text-amber-300/80 font-medium uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation Label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[0.2em]">Main Menu</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  active 
                    ? 'bg-gradient-to-r from-[#2c6774] to-[#3a7a88] text-white shadow-lg shadow-[#2c6774]/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                  active ? 'bg-white/15' : 'group-hover:bg-white/5'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium leading-tight truncate">{item.name}</span>
                  <span className={`text-[10px] ${active ? 'text-white/60' : 'text-white/30'} truncate`}>{item.desc}</span>
                </div>
                {active && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 bg-gradient-to-t from-[#0f1f21]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200/80 flex items-center justify-between px-4 lg:px-8 h-16 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} className="text-gray-700" />
            </button>
            
            {/* Breadcrumb-style indicator */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center">
                  <Activity size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">QuickCure Healthcare</p>
                  <p className="text-sm font-bold text-gray-800">Admin Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/10 w-48 lg:w-64 transition-all outline-none"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Admin User */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-gray-800">{admin.name || 'Admin'}</p>
                <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1 justify-end">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Online
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 lg:p-6 xl:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;