import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import MyAppointments from './MyAppointments';
import MyOrders from './MyOrders';
import MyLabTests from './MyLabTests';
import MyPrescriptions from './MyPrescriptions';
import { getPatientPrescriptions } from '../../api/prescriptionApi';
import { 
  FaCalendarCheck, 
  FaPills, 
  FaFlask, 
  FaFilePrescription,
  FaHome,
  FaStethoscope,
  FaAmbulance,
  FaNotesMedical,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaSignOutAlt,
  FaChartLine
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [stats, setStats] = useState({
    appointments: 0,
    orders: 0,
    labTests: 0,
    prescriptions: 0
  });
  
  const [monthlyData, setMonthlyData] = useState([]);
  
  const loadingRef = useRef({
    appointments: false,
    orders: false,
    labTests: false,
    prescriptions: false
  });
  const initialLoadRef = useRef(false);
  const statsRef = useRef(stats);

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }

    loadAllStats();

    const handleDataUpdate = () => {
      loadAllStats();
    };

    const handleStorageChange = (e) => {
      if (e.key?.startsWith('appointments_') || 
          e.key?.startsWith('medicineOrders_') || 
          e.key?.startsWith('labTests_')) {
        loadAllStats();
      }
    };

    window.addEventListener('userChanged', handleDataUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentsUpdated', handleDataUpdate);
    window.addEventListener('labTestsUpdated', handleDataUpdate);
    window.addEventListener('ordersUpdated', handleDataUpdate);

    return () => {
      window.removeEventListener('userChanged', handleDataUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentsUpdated', handleDataUpdate);
      window.removeEventListener('labTestsUpdated', handleDataUpdate);
      window.removeEventListener('ordersUpdated', handleDataUpdate);
    };
  }, [navigate]);

  const loadAllStats = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadAppointmentStats(),
        loadOrderStats(),
        loadLabTestStats(),
        loadPrescriptionStats()
      ]);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
      initialLoadRef.current = true;
    }
  }, []);

  const loadAppointmentStats = useCallback(async () => {
    if (loadingRef.current.appointments) return;
    loadingRef.current.appointments = true;

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?._id || user?.id || 'guest';
      
      const appointmentsKey = `appointments_${userKey}`;
      const appointments = JSON.parse(localStorage.getItem(appointmentsKey) || '[]');
      
      let totalAppointments = appointments.length;
      if (totalAppointments === 0 && (user.phone || user.mobile)) {
        const phone = user.phone || user.mobile;
        const phoneAppointments = JSON.parse(localStorage.getItem(`appointments_phone_${phone}`) || '[]');
        totalAppointments = phoneAppointments.length;
      }

      setStats(prev => ({
        ...prev,
        appointments: totalAppointments
      }));

      // Get monthly data for appointments
      const monthlyAppointments = getMonthlyData(appointments, 'appointments');
      updateChartData(monthlyAppointments, 'appointments');
    } catch (error) {
      console.error('Error loading appointment stats:', error);
    } finally {
      loadingRef.current.appointments = false;
    }
  }, []);

  const loadOrderStats = useCallback(async () => {
    if (loadingRef.current.orders) return;
    loadingRef.current.orders = true;

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?._id || user?.id || 'guest';
      
      const ordersKey = `medicineOrders_${userKey}`;
      const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      const orderCount = orders.length;

      setStats(prev => ({
        ...prev,
        orders: orderCount
      }));

      // Get monthly data for orders
      const monthlyOrders = getMonthlyData(orders, 'orders');
      updateChartData(monthlyOrders, 'orders');
    } catch (error) {
      console.error('Error loading order stats:', error);
    } finally {
      loadingRef.current.orders = false;
    }
  }, []);

  const loadLabTestStats = useCallback(async () => {
    if (loadingRef.current.labTests) return;
    loadingRef.current.labTests = true;

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?._id || user?.id || 'guest';
      
      const labTestsKey = `labTests_${userKey}`;
      const labTests = JSON.parse(localStorage.getItem(labTestsKey) || '[]');
      const labTestCount = labTests.length;

      setStats(prev => ({
        ...prev,
        labTests: labTestCount
      }));

      // Get monthly data for lab tests
      const monthlyLabTests = getMonthlyData(labTests, 'labTests');
      updateChartData(monthlyLabTests, 'labTests');
    } catch (error) {
      console.error('Error loading lab test stats:', error);
    } finally {
      loadingRef.current.labTests = false;
    }
  }, []);

  const loadPrescriptionStats = useCallback(async () => {
    if (loadingRef.current.prescriptions) return;
    loadingRef.current.prescriptions = true;

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      let prescriptionCount = 0;
      let prescriptionsData = [];
      
      if (user.email) {
        try {
          const result = await getPatientPrescriptions(user.email);
          if (result.success) {
            prescriptionsData = Array.isArray(result.data) ? result.data : [];
            prescriptionCount = prescriptionsData.length;
          }
        } catch (err) {
          console.error('Error fetching prescription count:', err);
        }
      }

      setStats(prev => ({
        ...prev,
        prescriptions: prescriptionCount
      }));

      // Get monthly data for prescriptions
      const monthlyPrescriptions = getMonthlyData(prescriptionsData, 'prescriptions');
      updateChartData(monthlyPrescriptions, 'prescriptions');
    } catch (error) {
      console.error('Error loading prescription stats:', error);
    } finally {
      loadingRef.current.prescriptions = false;
    }
  }, []);

  // Helper function to get monthly data from items
  const getMonthlyData = (items, type) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = {};
    
    // Initialize all months with 0
    months.forEach(month => {
      monthlyCounts[month] = 0;
    });

    // Count items by month
    items.forEach(item => {
      let date = null;
      
      // Extract date based on item type
      if (type === 'appointments') {
        date = item.date;
      } else if (type === 'orders') {
        date = item.createdAt || item.orderDate;
      } else if (type === 'labTests') {
        date = item.appointmentDetails?.preferredDate || item.date || item.createdAt;
      } else if (type === 'prescriptions') {
        date = item.createdAt || item.issueDate;
      }
      
      if (date) {
        try {
          const d = new Date(date);
          if (!isNaN(d.getTime())) {
            const monthIndex = d.getMonth();
            const monthName = months[monthIndex];
            if (monthlyCounts[monthName] !== undefined) {
              monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + 1;
            }
          }
        } catch (e) {
          // Ignore invalid dates
        }
      }
    });

    // Return array of months with counts
    return months.map(month => ({
      month,
      count: monthlyCounts[month] || 0
    }));
  };

  const updateChartData = useCallback((monthlyDataForType, type) => {
    if (!monthlyDataForType || monthlyDataForType.length === 0) return;

    setMonthlyData(prevData => {
      // Create a new array with proper structure
      const newData = [...prevData];
      
      // Ensure we have data for all 12 months
      if (newData.length === 0) {
        // Initialize with 12 months of data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months.forEach(month => {
          newData.push({
            month: month,
            appointments: 0,
            orders: 0,
            labTests: 0,
            prescriptions: 0
          });
        });
      }

      // Update the data for the specific type
      monthlyDataForType.forEach((item, index) => {
        if (newData[index]) {
          // Create a new object with updated values
          const updatedItem = { ...newData[index] };
          
          // Update the specific type
          if (type === 'appointments') {
            updatedItem.appointments = item.count;
          } else if (type === 'orders') {
            updatedItem.orders = item.count;
          } else if (type === 'labTests') {
            updatedItem.labTests = item.count;
          } else if (type === 'prescriptions') {
            updatedItem.prescriptions = item.count;
          }
          
          // Ensure month is set
          if (!updatedItem.month) {
            updatedItem.month = item.month;
          }
          
          newData[index] = updatedItem;
        }
      });
      
      // Filter to show only last 6 months
      const currentMonth = new Date().getMonth();
      const last6Months = [];
      for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        if (newData[monthIndex]) {
          last6Months.push(newData[monthIndex]);
        }
      }
      
      return last6Months;
    });
  }, []);

  const updateAppointmentStats = useCallback((count) => {
    setStats(prev => ({ ...prev, appointments: count }));
    // Reload all stats to update charts
    loadAllStats();
  }, [loadAllStats]);

  const updateOrderStats = useCallback((count) => {
    setStats(prev => ({ ...prev, orders: count }));
    loadAllStats();
  }, [loadAllStats]);

  const updateLabTestStats = useCallback((count) => {
    setStats(prev => ({ ...prev, labTests: count }));
    loadAllStats();
  }, [loadAllStats]);

  const refreshStats = useCallback(() => {
    loadingRef.current = {
      appointments: false,
      orders: false,
      labTests: false,
      prescriptions: false
    };
    loadAllStats();
    setRefreshTrigger(prev => prev + 1);
  }, [loadAllStats]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'appointments', label: 'Appointments', icon: FaCalendarCheck, badge: stats.appointments },
    { id: 'orders', label: 'Orders', icon: FaPills, badge: stats.orders },
    { id: 'labtests', label: 'Lab Tests', icon: FaFlask, badge: stats.labTests },
    { id: 'prescriptions', label: 'Prescriptions', icon: FaFilePrescription, badge: stats.prescriptions },
  ];

  const quickActions = [
    { id: 'book-appointment', label: 'Book Appointment', icon: FaStethoscope, path: '/doctors', color: 'var(--primary-color)' },
    { id: 'order-medicines', label: 'Order Medicines', icon: FaAmbulance, path: '/pharmacies', color: 'var(--secondary-color)' },
    { id: 'book-labtest', label: 'Book Lab Test', icon: FaNotesMedical, path: '/labs', color: 'var(--accent-color)' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-800 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#f8f9fa]">
      
      {/* Desktop Sidebar - Full height */}
      <aside 
        className={`
          hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-72' : 'w-20'}
        `} 
        style={{ backgroundColor: 'var(--secondary-color)' }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10 flex-shrink-0">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}>
              <span className="text-white font-bold text-lg">QC</span>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="text-white font-bold text-lg leading-tight whitespace-nowrap">QuickCure</h1>
                <p className="text-white/60 text-xs whitespace-nowrap">Patient Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/60 hover:text-white transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <FaBars size={18} />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                    isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <Icon className={`text-lg ${isActive ? 'text-white' : 'text-white/70'}`} />
                  </div>
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left font-medium text-sm truncate">{item.label}</span>
                      {item.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 text-white flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom section */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.dispatchEvent(new CustomEvent('userChanged'));
                navigate('/login');
              }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 flex-shrink-0">
                <FaSignOutAlt className="text-lg" />
              </div>
              {sidebarOpen && <span className="font-medium text-sm truncate">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Right Side - flex-1 with full height */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={`lg:hidden fixed left-0 top-0 h-full z-50 w-72 transition-transform duration-300 shadow-2xl ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} style={{ backgroundColor: 'var(--secondary-color)' }}>
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}>
                <span className="text-white font-bold text-lg">QC</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-tight">QuickCure</h1>
                <p className="text-white/60 text-xs">Patient Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-white/5'
                    }`}>
                      <Icon className="text-lg" />
                    </div>
                    <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  window.dispatchEvent(new CustomEvent('userChanged'));
                  navigate('/login');
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 flex-shrink-0">
                  <FaSignOutAlt className="text-lg" />
                </div>
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Header - Sticky */}
        <div className="flex-shrink-0 sticky top-0 z-30">
          <DashboardHeader 
            user={user} 
            onStatsRefresh={refreshStats}
            onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {activeTab === 'dashboard' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white/5"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 translate-y-1/2 -translate-x-1/4 rounded-full bg-white/5"></div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-white/70 text-sm font-medium">Welcome back,</p>
                      <h1 className="text-2xl md:text-3xl font-bold mt-1">
                        {user.name || user.email?.split('@')[0] || 'User'} 👋
                      </h1>
                      <p className="text-white/80 text-sm mt-2 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-4 py-2 bg-white/20 rounded-xl text-sm font-medium backdrop-blur-sm">
                        <FaChartLine className="inline mr-2" />
                        {stats.appointments + stats.orders + stats.labTests + stats.prescriptions} Total Activities
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 truncate">Appointments</p>
                      <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>
                        {stats.appointments}
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)' }}>
                      <FaCalendarCheck className="text-lg md:text-xl" style={{ color: 'var(--primary-color)' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 truncate">Orders</p>
                      <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--secondary-color)' }}>
                        {stats.orders}
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(23, 64, 71, 0.1)' }}>
                      <FaPills className="text-lg md:text-xl" style={{ color: 'var(--secondary-color)' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 truncate">Lab Tests</p>
                      <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--accent-color)' }}>
                        {stats.labTests}
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(92, 135, 143, 0.1)' }}>
                      <FaFlask className="text-lg md:text-xl" style={{ color: 'var(--accent-color)' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 truncate">Prescriptions</p>
                      <p className="text-2xl md:text-3xl font-bold" style={{ color: '#2c6774' }}>
                        {stats.prescriptions}
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)' }}>
                      <FaFilePrescription className="text-lg md:text-xl" style={{ color: '#2c6774' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">Activity Overview</h3>
                      <p className="text-xs text-gray-400">Last 6 months</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></span>
                        Appt
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary-color)' }}></span>
                        Orders
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }}></span>
                        Lab
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2c6774' }}></span>
                        Presc
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-56 md:h-64">
                    {monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '12px', 
                              border: 'none', 
                              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                              padding: '12px',
                              fontSize: '12px'
                            }}
                          />
                          <Bar dataKey="appointments" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="orders" fill="var(--secondary-color)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="labTests" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="prescriptions" fill="#2c6774" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">Service Distribution</h3>
                    <p className="text-xs text-gray-400">Overall usage</p>
                  </div>
                  <div className="w-full h-56 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Appointments', value: Math.max(stats.appointments, 1) },
                            { name: 'Orders', value: Math.max(stats.orders, 1) },
                            { name: 'Lab Tests', value: Math.max(stats.labTests, 1) },
                            { name: 'Prescriptions', value: Math.max(stats.prescriptions, 1) },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill="var(--primary-color)" />
                          <Cell fill="var(--secondary-color)" />
                          <Cell fill="var(--accent-color)" />
                          <Cell fill="#2c6774" />
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '12px', 
                            border: 'none', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            padding: '12px',
                            fontSize: '12px'
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          iconType="circle"
                          iconSize={8}
                          formatter={(value) => <span className="text-[10px] md:text-xs text-gray-600">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => navigate(action.path)}
                        className="group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 flex-shrink-0" style={{ backgroundColor: `${action.color}15` }}>
                            <Icon className="text-lg md:text-xl" style={{ color: action.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 text-sm md:text-base truncate">{action.label}</p>
                            <p className="text-[10px] md:text-xs text-gray-400 mt-0.5 truncate">Click to get started</p>
                          </div>
                          <FaChevronRight className="text-gray-300 text-xs md:text-sm group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {activeTab === 'appointments' && (
                <MyAppointments 
                  refreshTrigger={refreshTrigger} 
                  onStatsUpdate={updateAppointmentStats}
                />
              )}
              {activeTab === 'orders' && (
                <MyOrders 
                  refreshTrigger={refreshTrigger}
                  onStatsUpdate={updateOrderStats}
                />
              )}
              {activeTab === 'labtests' && (
                <MyLabTests 
                  refreshTrigger={refreshTrigger}
                  onStatsUpdate={updateLabTestStats}
                />
              )}
              {activeTab === 'prescriptions' && (
                <MyPrescriptions 
                  refreshTrigger={refreshTrigger}
                />
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        :root {
          --primary-color: #2c6774;
          --secondary-color: #174047;
          --accent-color: #5c878f;
          --hover-color: #1e4e56;
          --bg-light: #ffffff;
          --text-light: #c0d3dc;
          --white: #ffffff;
        }

        .min-w-0 {
          min-width: 0;
        }

        /* Smooth transitions */
        .sidebar-transition {
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: var(--primary-color);
          border-radius: 10px;
          opacity: 0.5;
        }
        ::-webkit-scrollbar-thumb:hover {
          opacity: 1;
        }

        * {
          transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }

        /* Mobile fixes */
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;