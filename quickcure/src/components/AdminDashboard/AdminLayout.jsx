import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminSearch } from '../../contexts/AdminSearchContext';
import {
  LayoutDashboard, Users, Stethoscope, Microscope,
  Pill, ShoppingCart, DollarSign, BarChart3,
  LogOut, Menu, Bell, Search, User, X, Settings, Shield,
  FileText, Activity, FlaskConical
} from 'lucide-react';
import { message } from 'antd';
import logo from "../../images/logo.png";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const { searchTerm, setSearchTerm } = useAdminSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Registrations', href: '/admin/registrations', icon: FileText },
    { name: 'Doctors', href: '/admin/doctors', icon: Stethoscope },
    { name: 'Labs', href: '/admin/labs', icon: Microscope },
    { name: 'Technicians', href: '/admin/technicians', icon: FlaskConical },
    { name: 'Pharmacies', href: '/admin/pharmacies', icon: Pill },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Payments', href: '/admin/payments', icon: DollarSign },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[250px] transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:relative flex flex-col`} style={{ backgroundColor: 'var(--secondary-color)' }}>
        
        {/* Logo */}
        <div className="px-5 py-4 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <img src={logo} alt="" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h1 className="font-bold text-base" style={{ color: 'var(--white)' }}>QuickCure</h1>
                <p className="text-[10px] font-medium tracking-wider" style={{ color: 'var(--text-light)' }}>Admin Portal</p>
              </div>
            </div>
            <button className="lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mx-3 mt-3 p-2.5 rounded-lg shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}>
              <Shield size={16} style={{ color: 'var(--white)' }} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--white)' }}>{admin.name || 'Admin'}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-light)' }}>Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav Label */}
        <div className="px-5 pt-4 pb-1 shrink-0">
          <p className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-light)', opacity: 0.5 }}>Menu</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2.5 space-y-0.5 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: active ? 'var(--primary-color)' : 'transparent',
                  color: active ? 'var(--white)' : 'var(--text-light)'
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={17} className="shrink-0" />
                <span>{item.name}</span>
                {active && <div className="ml-auto w-1 h-3 rounded-full bg-white"></div>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{ color: 'var(--text-light)' }}
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="bg-white shrink-0 shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-1.5 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} className="text-gray-600" />
              </button>
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)' }}>
                <Activity size={13} style={{ color: 'var(--white)' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--secondary-color)' }}>Admin Dashboard</span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Working Search Bar */}
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={15} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-md text-sm w-48 lg:w-56 focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    border: '1px solid var(--bg-light)',
                    focusBorderColor: 'var(--primary-color)',
                    color: 'var(--secondary-color)'
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
                <Bell size={18} />
              </button>

              <div className="flex items-center gap-2 pl-2.5 border-l border-gray-200">
                <div className="hidden lg:block text-right text-xs">
                  <p className="font-medium" style={{ color: 'var(--secondary-color)' }}>{admin.name || 'Admin'}</p>
                  <p style={{ color: 'var(--primary-color)' }}>Admin</p>
                </div>
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white)' }}>
                  <User size={14} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;