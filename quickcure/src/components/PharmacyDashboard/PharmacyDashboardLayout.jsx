// PharmacyDashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'; // ✅ Add useParams
import { 
  LayoutDashboard, Package, ShoppingCart, 
  Settings, TrendingUp, LogOut, Menu, Bell, User, X, Pill
} from 'lucide-react';
import { message } from 'antd';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { API_BASE_URL } from '../../apiConfig.js';
import { PharmacyProvider } from '../../contexts/PharmacyContext';
import logo from "../../images/logo.png";

const PharmacyDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null); // New state for dashboard-specific errors
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [lastOrderCheck, setLastOrderCheck] = useState(Date.now());
  const navigate = useNavigate();
  const location = useLocation();
  const { id: pharmacyId } = useParams(); // ✅ Get pharmacyId from URL (route param is :id)

  // Theme colors matching lab dashboard
  const theme = {
    primary: '#2c6774',
    secondary: '#174047',
    accent: '#5c878f',
  };

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
        return { id: user?.id || user?._id, role: user?.role };
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
    return { id: null, role: null }; // Return an object even if user not found
  };

  // Fetch pharmacy profile using userId from backend
  const fetchPharmacyProfile = async () => {
    try {
      const { id: userId, role: userRole } = getUserId(); // Destructure id and role
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
        
        // ✅ Redirect to correct URL if pharmacyId doesn't match pharmacy's actual ID
        if (pharmacyData._id !== pharmacyId) {
          console.log('Redirecting to correct pharmacy dashboard URL');
          navigate(`/pharmacy/dashboard/${pharmacyData._id}`, { replace: true });
          return "REDIRECTING"; // Signal that a redirect is in progress
        }
        
        setPharmacy(pharmacyData);
        localStorage.setItem('pharmacyId', pharmacyData._id);
        console.log('✅ Pharmacy found:', pharmacyData.name, 'ID:', pharmacyData._id);
        return pharmacyData;
      } 
      else {
        // Pharmacy not found for this user, but user is 'pharmacy' role.
        setDashboardError('Pharmacy profile not found or registered. Please register your pharmacy.');
        setPharmacy(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching pharmacy profile:', error);
      
      if (error.response?.status === 404) {
        message.error('Pharmacy not registered. Please register your pharmacy.');
        setDashboardError('Pharmacy profile not found or registered. Please register your pharmacy.');
        setPharmacy(null);
      } else if (error.response?.status === 401) {
        message.error('Session expired. Please login again.');
        localStorage.clear();
        setPharmacy(null); // Explicitly clear pharmacy state
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
      setDashboardError(null); // Clear any previous dashboard errors
      
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Please login first');
        navigate('/login');
        return;
      }

      const userId = getUserId();
      if (!userId.id) {
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

      const fetchedPharmacy = await fetchPharmacyProfile();

      if (fetchedPharmacy === "REDIRECTING") {
        return; // Stop here and keep loading=true while the URL changes
      }

      if (!fetchedPharmacy) {
        // If it was a 404/success:false, then the dashboardError state will be set.
        // No explicit action needed here, the render logic will pick up dashboardError.
      }

    } catch (error) {
      console.error('Auth check error:', error);
      message.error('Session expired. Please login again.');
      localStorage.clear();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  // Check for new orders periodically
  useEffect(() => {
    if (!pharmacyId || !pharmacy) return;

    const checkForNewOrders = async () => {
      try {
        const response = await pharmacyAPI.getRecentOrders(pharmacyId, 10);
        if (response.data?.success) {
          const recentOrders = response.data.data || [];
          const newOrders = recentOrders.filter(order => {
            const orderTime = new Date(order.createdAt).getTime();
            return orderTime > lastOrderCheck && order.status === 'pending';
          });
          
          if (newOrders.length > 0) {
            setNewOrdersCount(prev => prev + newOrders.length);
            message.info({
              content: `🔔 ${newOrders.length} new order${newOrders.length > 1 ? 's' : ''} received!`,
              duration: 5,
              style: {
                marginTop: '20px',
              }
            });
          }
          
          setLastOrderCheck(Date.now());
        }
      } catch (error) {
        console.error('Error checking for new orders:', error);
      }
    };

    // Check immediately
    checkForNewOrders();

    // Then check every 30 seconds
    const interval = setInterval(checkForNewOrders, 30000);

    return () => clearInterval(interval);
  }, [pharmacyId, pharmacy, lastOrderCheck]);

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

  // If there's a dashboard error and no pharmacy data, show a specific message/component
  if (dashboardError && !pharmacy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center p-4 max-w-md">
          <Pill size={64} className="text-[#2c6774] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h2>
          <p className="text-gray-600 mb-6">{dashboardError}</p>
          <button
            onClick={() => navigate('/reg')} // Explicitly navigate to registration
            className="px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors"
          >
            Register Your Pharmacy
          </button>
          <button
            onClick={checkAuth} // Retry fetching
            className="ml-4 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!pharmacy) { // Fallback for any other case where pharmacy is null (should be covered by loading or dashboardError)
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

      {/* Sidebar - Matching Lab Dashboard Style */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:relative`} style={{ backgroundColor: theme.secondary }}>
        {/* Logo Section */}
        <div className="p-6 border-b shrink-0" style={{ borderColor: theme.primary }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              {(() => {
                const logoUrl = pharmacy?.logo || pharmacy?.image;
                if (logoUrl) {
                  const fullUrl = logoUrl.startsWith('http') || logoUrl.startsWith('data:')
                    ? logoUrl
                    : `${API_BASE_URL}/${logoUrl.replace(/^[\\/]+/, '').replace(/\\/g, '/')}`;
                  return (
                    <img
                      src={fullUrl}
                      alt={pharmacy.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  );
                }
                return <span className="text-white font-bold text-xl">{pharmacy?.name?.[0] || 'P'}</span>;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-lg truncate" title={pharmacy?.name}>
                {pharmacy?.name || 'QuickCure'}
              </h1>
              <p className="text-xs text-white/70">Pharmacy Management</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 py-6 overflow-y-auto px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                  active
                    ? 'text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
                style={active ? { backgroundColor: theme.primary } : {}}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div className="p-6 border-t shrink-0" style={{ borderColor: theme.primary, backgroundColor: theme.secondary }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header - Matching Lab Dashboard Style */}
        <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} style={{ color: theme.secondary }} />
            </button>
            <div>
              <h4 className="text-lg font-semibold" style={{ color: theme.secondary }}>
                {pharmacy.name}
              </h4>
              <span className="text-xs text-gray-500">
                {pharmacy.city || 'Main Branch'} • Pharmacy Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button 
              onClick={() => {
                setNewOrdersCount(0);
                navigate(`/pharmacy/dashboard/${pharmacyId}/orders`);
              }}
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl relative transition-colors"
            >
              <Bell size={20} />
              {newOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                  {newOrdersCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-bold text-gray-800">
                  {pharmacy.ownerName || 'Admin User'}
                </p>
                <p className="text-[10px] text-green-600 font-bold uppercase">Online</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center text-white shadow-lg overflow-hidden">
                {(() => {
                  const logoUrl = pharmacy?.logo || pharmacy?.image;
                  if (logoUrl) {
                    const fullUrl = logoUrl.startsWith('http') || logoUrl.startsWith('data:')
                      ? logoUrl
                      : `${API_BASE_URL}/${logoUrl.replace(/^[\\/]+/, '').replace(/\\/g, '/')}`;
                    return (
                      <img
                        src={fullUrl}
                        alt="Pharmacy Logo"
                        className="w-full h-full object-cover"
                      />
                    );
                  }
                  return <User size={20} />;
                })()}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <div className="p-4 lg:p-6">
            <PharmacyProvider>
              <Outlet context={{ pharmacy, pharmacyId, refetchPharmacy: checkAuth }} />
            </PharmacyProvider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PharmacyDashboardLayout;
