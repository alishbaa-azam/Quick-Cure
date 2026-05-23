// PharmacyDashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'; // ✅ Add useParams
import { 
  LayoutDashboard, Package, ShoppingCart, 
  Settings, TrendingUp, LogOut, Menu, Bell, Search, User, X, Pill
} from 'lucide-react';
import { message } from 'antd';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import logo from "../../images/logo.png";

const PharmacyDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { id: pharmacyId } = useParams(); // ✅ Get pharmacyId from URL (route param is :id)

  // ✅ DYNAMIC navigation paths with pharmacyId
  const navigation = [
    { name: 'Dashboard', href: `/pharmacy/dashboard/${pharmacyId}`, icon: LayoutDashboard },
    { name: 'Products', href: `/pharmacy/dashboard/${pharmacyId}/products`, icon: Package },
    { name: 'Orders', href: `/pharmacy/dashboard/${pharmacyId}/orders`, icon: ShoppingCart },
    { name: 'Sales', href: `/pharmacy/dashboard/${pharmacyId}/sales`, icon: TrendingUp },
    { name: 'Settings', href: `/pharmacy/dashboard/${pharmacyId}/settings`, icon: Settings }
  ];

  // Check if current path matches the navigation item
  const isActivePath = (href) => {
    const currentPath = location.pathname;
    
    // For dashboard home
    if (href === `/pharmacy/dashboard/${pharmacyId}`) {
      return currentPath === href;
    }
    // For nested routes (products, orders, etc.)
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  // Get user ID from localStorage
  const getUserId = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user?.id || user?._id;
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
    return null;
  };

  // ✅ Fetch pharmacy profile using userId from backend
  const fetchPharmacyProfile = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        console.log('No user ID found');
        message.error('Please login again');
        navigate('/login');
        return null;
      }
      
      console.log('Fetching pharmacy for user ID:', userId);
      console.log('URL pharmacyId:', pharmacyId);
      
      const response = await pharmacyAPI.getMyPharmacy();
      
      console.log('API Response:', response);
      
      if (response.success) {
        const pharmacyData = response.data;
        
        // ✅ Verify that the pharmacyId in URL matches the logged-in pharmacy
        if (pharmacyData._id !== pharmacyId) {
          console.warn('Pharmacy ID mismatch. Redirecting...');
          message.warning('Accessing wrong pharmacy dashboard');
          navigate(`/pharmacy/dashboard/${pharmacyData._id}`);
          return null;
        }
        
        setPharmacy(pharmacyData);
        localStorage.setItem('pharmacyId', pharmacyData._id);
        console.log('✅ Pharmacy found:', pharmacyData.name, 'ID:', pharmacyData._id);
        return pharmacyData;
      } else {
        message.error('Pharmacy not registered. Please register your pharmacy.');
        navigate('/reg');
        return null;
      }
    } catch (error) {
      console.error('Error fetching pharmacy profile:', error);
      
      if (error.response?.status === 404) {
        message.error('Pharmacy not registered. Please register your pharmacy.');
        navigate('/reg');
      } else if (error.response?.status === 401) {
        message.error('Session expired. Please login again.');
        localStorage.clear();
        navigate('/login');
      } else {
        message.error('Error connecting to server. Please try again.');
      }
      return null;
    }
  };

  // Check authentication
  const checkAuth = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please login first');
        navigate('/login');
        return;
      }

      const userId = getUserId();
      if (!userId) {
        message.error('Unable to identify user. Please login again.');
        localStorage.clear();
        navigate('/login');
        return;
      }

      // ✅ Check if pharmacyId exists in URL
      if (!pharmacyId) {
        console.error('No pharmacyId in URL');
        message.error('Invalid dashboard URL');
        navigate('/login');
        return;
      }

      await fetchPharmacyProfile();

    } catch (error) {
      console.error('Auth check error:', error);
      message.error('Session expired. Please login again.');
      localStorage.clear();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pharmacyId]); // ✅ Re-run when pharmacyId changes

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!pharmacy) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a3a3a] text-white transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:relative border-r border-[#2c6774] flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-[#2c6774] shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg flex items-center justify-center">
              <img 
                src={logo} 
                alt="logo" 
                className="w-6 h-6 object-contain" 
              />
            </div>
            <h1 className="font-bold text-xl tracking-tight">QuickCure</h1>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Pharmacy Info */}
        <div className="p-4 border-b border-[#2c6774] shrink-0">
          <p className="text-sm font-semibold text-white truncate">{pharmacy.name}</p>
          <p className="text-xs text-gray-400 mt-1 truncate">ID: {pharmacy._id}</p>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  active 
                    ? 'bg-[#2c6774] text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-[#2c6774]/20 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div className="p-6 border-t border-[#2c6774] shrink-0 bg-[#1a3a3a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-gray-400 hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} className="text-[#1a3a3a]" />
            </button>
            <div className="hidden md:flex flex-col">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                {pharmacy.city || 'Main Branch'}
              </h2>
              <p className="text-xl font-black text-[#1a3a3a] leading-tight truncate max-w-[200px]">
                {pharmacy.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#2c6774] focus:ring-4 focus:ring-[#2c6774]/5 w-48 lg:w-80 transition-all outline-none"
              />
            </div>
            
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 ml-2">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-black text-gray-800">
                  {pharmacy.ownerName || 'Admin User'}
                </p>
                <p className="text-[10px] text-green-600 font-bold uppercase">Online</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2c6774] to-[#1a3a3a] flex items-center justify-center text-white shadow-lg shadow-teal-900/20 shrink-0">
                <User size={22} />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <Outlet context={{ pharmacy, pharmacyId: pharmacy._id }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PharmacyDashboardLayout;