import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaChevronRight,
  FaSignOutAlt,
  FaChartLine,
  FaBell,
  FaChevronDown
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import logo from '../../images/logo.png';

// Always a full, calendar-indexed (Jan-Dec) 12-month baseline.
// This is the single source of truth for chart data — never store a
// sliced/rolling-window array back into state, or index math breaks
// when multiple async stat loaders write into it independently.
const getEmptyMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    appointments: 0,
    orders: 0,
    labTests: 0,
    prescriptions: 0
  }));
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  
  const [stats, setStats] = useState({
    appointments: 0,
    orders: 0,
    labTests: 0,
    prescriptions: 0
  });
  
  // Canonical, always-12-month, calendar-indexed dataset (Jan..Dec).
  // Each of the 4 stat loaders merges its counts into this by month
  // index. The chart itself derives a rolling "last 6 months" view
  // from this via useMemo below — that derived view is never written
  // back into state.
  const [fullMonthlyData, setFullMonthlyData] = useState(getEmptyMonthlyData);

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

  // Notification functions
  useEffect(() => {
    loadRealNotifications();

    const handleAppointmentUpdate = () => loadRealNotifications();
    const handleOrderUpdate = () => loadRealNotifications();
    const handleLabTestUpdate = () => loadRealNotifications();

    window.addEventListener('appointmentsUpdated', handleAppointmentUpdate);
    window.addEventListener('ordersUpdated', handleOrderUpdate);
    window.addEventListener('labTestsUpdated', handleLabTestUpdate);
    window.addEventListener('userChanged', handleAppointmentUpdate);

    const checkInterval = setInterval(() => {
      checkUpcomingAppointments();
    }, 300000);

    return () => {
      window.removeEventListener('appointmentsUpdated', handleAppointmentUpdate);
      window.removeEventListener('ordersUpdated', handleOrderUpdate);
      window.removeEventListener('labTestsUpdated', handleLabTestUpdate);
      window.removeEventListener('userChanged', handleAppointmentUpdate);
      clearInterval(checkInterval);
    };
  }, []);

  const loadRealNotifications = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?._id || user?.id || 'guest';
      const newNotifications = [];

      const appointmentsKey = `appointments_${userKey}`;
      const appointments = JSON.parse(localStorage.getItem(appointmentsKey) || '[]');
      
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointments.filter(apt => apt.date === today && apt.status !== 'cancelled');
      
      todayAppointments.forEach(apt => {
        newNotifications.push({
          id: `apt_${Date.now()}_${Math.random()}`,
          title: 'Appointment Today',
          message: `You have an appointment with ${apt.doctor?.name || 'Doctor'} at ${apt.time}`,
          time: 'Today',
          read: false,
          icon: 'calendar',
          type: 'appointment'
        });
      });

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      const tomorrowAppointments = appointments.filter(apt => apt.date === tomorrowStr && apt.status !== 'cancelled');
      
      tomorrowAppointments.forEach(apt => {
        newNotifications.push({
          id: `apt_upcoming_${Date.now()}_${Math.random()}`,
          title: 'Upcoming Appointment Tomorrow',
          message: `You have an appointment with ${apt.doctor?.name || 'Doctor'} at ${apt.time} tomorrow`,
          time: 'Tomorrow',
          read: false,
          icon: 'calendar',
          type: 'appointment'
        });
      });

      const ordersKey = `medicineOrders_${userKey}`;
      const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      
      const todayDelivered = orders.filter(order => 
        order.status === 'delivered' && 
        order.deliveredAt && 
        new Date(order.deliveredAt).toISOString().split('T')[0] === today
      );
      
      todayDelivered.forEach(order => {
        newNotifications.push({
          id: `order_${Date.now()}_${Math.random()}`,
          title: 'Order Delivered',
          message: `Your medicine order #${order.orderNumber || order._id?.slice(-8)} has been delivered`,
          time: 'Today',
          read: false,
          icon: 'order',
          type: 'order'
        });
      });

      const todayCancelled = orders.filter(order => 
        order.status === 'cancelled' && 
        order.cancelledAt && 
        new Date(order.cancelledAt).toISOString().split('T')[0] === today
      );
      
      todayCancelled.forEach(order => {
        newNotifications.push({
          id: `order_cancel_${Date.now()}_${Math.random()}`,
          title: 'Order Cancelled',
          message: `Your order #${order.orderNumber || order._id?.slice(-8)} has been cancelled`,
          time: 'Today',
          read: false,
          icon: 'order',
          type: 'order'
        });
      });

      const labTestsKey = `labTests_${userKey}`;
      const labTests = JSON.parse(localStorage.getItem(labTestsKey) || '[]');
      
      labTests.forEach(test => {
        const testDate = test.appointmentDetails?.preferredDate || test.date;
        if (testDate && testDate.split('T')[0] === tomorrowStr && test.bookingStatus !== 'cancelled') {
          newNotifications.push({
            id: `lab_${Date.now()}_${Math.random()}`,
            title: 'Lab Test Tomorrow',
            message: `You have a lab test at ${test.lab?.name || 'Lab'} tomorrow`,
            time: 'Tomorrow',
            read: false,
            icon: 'lab',
            type: 'labtest'
          });
        }
      });

      const todayCancelledTests = labTests.filter(test => 
        test.bookingStatus === 'cancelled' && 
        test.cancelledAt && 
        new Date(test.cancelledAt).toISOString().split('T')[0] === today
      );
      
      todayCancelledTests.forEach(test => {
        newNotifications.push({
          id: `lab_cancel_${Date.now()}_${Math.random()}`,
          title: 'Lab Test Cancelled',
          message: `Your lab test at ${test.lab?.name || 'Lab'} has been cancelled`,
          time: 'Today',
          read: false,
          icon: 'lab',
          type: 'labtest'
        });
      });

      newNotifications.sort((a, b) => {
        const timeOrder = { 'Just now': 0, 'Today': 1, 'Tomorrow': 2, 'Yesterday': 3 };
        return (timeOrder[a.time] || 99) - (timeOrder[b.time] || 99);
      });

      setNotifications(newNotifications.slice(0, 10));

    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const checkUpcomingAppointments = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?._id || user?.id || 'guest';
      const appointmentsKey = `appointments_${userKey}`;
      const appointments = JSON.parse(localStorage.getItem(appointmentsKey) || '[]');
      
      const now = new Date();
      
      appointments.forEach(apt => {
        if (apt.status === 'cancelled' || apt.status === 'completed') return;
        
        const aptDate = new Date(apt.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (aptDate.toDateString() === today.toDateString()) {
          const timeMatch = apt.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
          if (timeMatch) {
            let hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            const isPM = timeMatch[3].toUpperCase() === 'PM';
            
            if (isPM && hours !== 12) hours += 12;
            if (!isPM && hours === 12) hours = 0;
            
            const aptTime = new Date();
            aptTime.setHours(hours, minutes, 0, 0);
            
            const timeDiff = aptTime - now;
            const minutesDiff = timeDiff / (1000 * 60);
            
            if (minutesDiff > 0 && minutesDiff <= 60) {
              const notifiedKey = `notified_apt_${apt._id || apt.id}`;
              const lastNotified = localStorage.getItem(notifiedKey);
              const lastNotifiedTime = lastNotified ? new Date(lastNotified) : null;
              
              if (!lastNotifiedTime || (now - lastNotifiedTime) > 3600000) {
                setNotifications(prev => {
                  const exists = prev.some(n => n.id === `reminder_${apt._id || apt.id}`);
                  if (exists) return prev;
                  
                  const newNotif = {
                    id: `reminder_${apt._id || apt.id}`,
                    title: '⏰ Appointment Reminder',
                    message: `Your appointment with ${apt.doctor?.name || 'Doctor'} is in ${Math.round(minutesDiff)} minutes at ${apt.time}`,
                    time: 'Just now',
                    read: false,
                    icon: 'calendar',
                    type: 'reminder'
                  };
                  
                  localStorage.setItem(notifiedKey, now.toISOString());
                  return [newNotif, ...prev].slice(0, 10);
                });
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error checking appointments:', error);
    }
  };

  const getNotificationIcon = (iconType) => {
    switch(iconType) {
      case 'calendar': return <FaBell className="text-[#2c6774]" />;
      case 'order': return <FaBell className="text-[#174047]" />;
      case 'lab': return <FaBell className="text-[#5c878f]" />;
      case 'prescription': return <FaBell className="text-[#2c6774]" />;
      default: return <FaBell className="text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Rest of the stats functions
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
    // Reset the canonical chart dataset to a clean 12-month baseline
    // before re-fetching. Without this, switching users (or simply
    // re-running loadAllStats) would merge new counts on top of
    // whatever was left over from the previous load/user, since each
    // loader below only ever adds/overwrites — it never clears stale
    // months on its own.
    setFullMonthlyData(getEmptyMonthlyData());
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
      const userId = user?._id || user?.id;
      const userEmail = user?.email;
      
      if (!userId && !userEmail) {
        setStats(prev => ({ ...prev, orders: 0 }));
        loadingRef.current.orders = false;
        return;
      }

      // Try to get orders from localStorage first
      const userKey = userId || userEmail;
      const ordersKey = `medicineOrders_${userKey}`;
      let orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      
      // If no orders found with userId key, try with email key
      if (orders.length === 0 && userEmail) {
        const emailKey = `medicineOrders_${userEmail}`;
        orders = JSON.parse(localStorage.getItem(emailKey) || '[]');
      }

      // Also try to fetch from API to get latest orders
      try {
        const token = localStorage.getItem('token');
        if (token && userId) {
          const response = await fetch(`http://localhost:5000/api/medicine-orders?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            let apiOrders = data.orders || data.data || (Array.isArray(data) ? data : []);
            
            // Filter API orders to only include those belonging to the current user
            const userEmailLower = userEmail?.toLowerCase().trim();
            const filteredApiOrders = apiOrders.filter(order => {
              // Check if order belongs to current user
              const orderUserId = order.userId || order.user || order.user?._id || 
                                order.patient?.userId || order.patientInfo?.userId;
              const orderEmail = (order.patient?.email || order.patientInfo?.email || '').toLowerCase().trim();
              
              return (orderUserId && userId && String(orderUserId) === String(userId)) ||
                     (userEmailLower && orderEmail && orderEmail === userEmailLower);
            });
            
            if (filteredApiOrders.length > 0) {
              // Merge API orders with local orders
              const mergedMap = new Map();
              orders.forEach(order => {
                const key = order.orderNumber || order._id || order.orderId;
                if (key) mergedMap.set(key, order);
              });
              filteredApiOrders.forEach(order => {
                const key = order.orderNumber || order._id || order.orderId;
                if (key) {
                  const existing = mergedMap.get(key);
                  if (existing) {
                    mergedMap.set(key, { ...existing, ...order, 
                      cart: existing.cart || existing.items || order.cart || order.items || [] 
                    });
                  } else {
                    mergedMap.set(key, order);
                  }
                }
              });
              orders = Array.from(mergedMap.values());
              // Save merged orders back to localStorage with the correct key
              localStorage.setItem(ordersKey, JSON.stringify(orders));
            }
          }
        }
      } catch (apiErr) {
        console.log('API orders fetch failed, using localStorage:', apiErr.message);
      }

      // Count only orders that belong to the current user
      let orderCount = orders.length;

      // If orders array is empty but there might be orders in other storage keys
      if (orderCount === 0) {
        // Check if there are orders stored with different keys
        const allKeys = Object.keys(localStorage);
        const orderKeys = allKeys.filter(key => key.startsWith('medicineOrders_'));
        
        for (const key of orderKeys) {
          try {
            const storedOrders = JSON.parse(localStorage.getItem(key) || '[]');
            if (storedOrders.length > 0) {
              // Filter orders for current user
              const filteredOrders = storedOrders.filter(order => {
                const orderUserId = order.userId || order.user || order.user?._id || 
                                  order.patient?.userId || order.patientInfo?.userId;
                const orderEmail = (order.patient?.email || order.patientInfo?.email || '').toLowerCase().trim();
                
                return (orderUserId && userId && String(orderUserId) === String(userId)) ||
                       (userEmail?.toLowerCase().trim() && orderEmail && orderEmail === userEmail?.toLowerCase().trim());
              });
              
              if (filteredOrders.length > 0) {
                // Found orders for this user in another key, save them to the correct key
                localStorage.setItem(ordersKey, JSON.stringify(filteredOrders));
                orderCount = filteredOrders.length;
                break;
              }
            }
          } catch (e) {
            console.error('Error checking order key:', e);
          }
        }
      }

      // Update the stats with the correct order count
      setStats(prev => {
        const newStats = { ...prev, orders: orderCount };
        return newStats;
      });

      // Also update the monthly chart data
      const monthlyOrders = getMonthlyData(orders, 'orders');
      updateChartData(monthlyOrders, 'orders');

    } catch (error) {
      console.error('Error loading order stats:', error);
      setStats(prev => ({ ...prev, orders: 0 }));
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
      let labTests = JSON.parse(localStorage.getItem(labTestsKey) || '[]');

      // Sync with the backend
      try {
        const token = localStorage.getItem('token');
        const email = user?.email || localStorage.getItem('userEmail');

        if (token && email) {
          const response = await fetch(
            `http://localhost:5000/api/bookings/patient/${encodeURIComponent(email)}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              const apiBookings = data.allBookings || data.bookings || [];
              if (apiBookings.length > 0) {
                const mergedMap = new Map();
                labTests.forEach((t) => {
                  const key = t.bookingReference || t._id;
                  if (key) mergedMap.set(key, t);
                });
                apiBookings.forEach((b) => {
                  const key = b.bookingReference || b._id;
                  if (key) mergedMap.set(key, b);
                });
                labTests = Array.from(mergedMap.values());
                localStorage.setItem(labTestsKey, JSON.stringify(labTests));
              }
            }
          }
        }
      } catch (apiErr) {
        console.log('API lab tests fetch failed, using localStorage:', apiErr.message);
      }

      const labTestCount = labTests.length;

      setStats(prev => ({
        ...prev,
        labTests: labTestCount
      }));

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

      const monthlyPrescriptions = getMonthlyData(prescriptionsData, 'prescriptions');
      updateChartData(monthlyPrescriptions, 'prescriptions');
    } catch (error) {
      console.error('Error loading prescription stats:', error);
    } finally {
      loadingRef.current.prescriptions = false;
    }
  }, []);

  const getMonthlyData = (items, type) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = {};
    
    months.forEach(month => {
      monthlyCounts[month] = 0;
    });

    items.forEach(item => {
      let date = null;
      
      if (type === 'appointments') {
        date = item.date;
      } else if (type === 'orders') {
        date = item.createdAt || item.orderDate || item.date || item.timestamp;
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
        } catch (e) {}
      }
    });

    return months.map(month => ({
      month,
      count: monthlyCounts[month] || 0
    }));
  };

  // Merges one stat type's counts into the canonical 12-month,
  // calendar-indexed dataset (Jan..Dec). `monthlyDataForType` is
  // always a fresh 12-item array from getMonthlyData, so index-based
  // merging against `fullMonthlyData` (also always 12 items) is safe
  // — no more mismatched-length merges, no more dropped months.
  const updateChartData = useCallback((monthlyDataForType, type) => {
    if (!monthlyDataForType || monthlyDataForType.length === 0) return;

    setFullMonthlyData(prevData => {
      return prevData.map((entry, index) => {
        const item = monthlyDataForType[index];
        if (!item) return entry;
        return { ...entry, [type]: item.count };
      });
    });
  }, []);

  // Derived "last 6 months" rolling view used by the chart. This is
  // recomputed from the canonical fullMonthlyData on every change —
  // it is never itself written back into state, so it can never
  // desync or lose months across renders.
  const monthlyData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      if (fullMonthlyData[monthIndex]) {
        last6Months.push(fullMonthlyData[monthIndex]);
      }
    }
    return last6Months;
  }, [fullMonthlyData]);

  const updateAppointmentStats = useCallback((count) => {
    setStats(prev => ({ ...prev, appointments: count }));
    loadAllStats();
  }, [loadAllStats]);

  const updateOrderStats = useCallback((count) => {
    // Make sure we're updating the stats correctly
    setStats(prev => {
      // Only update if the count is different or to ensure it's set correctly
      if (prev.orders !== count) {
        return { ...prev, orders: count };
      }
      return prev;
    });
    // Also trigger a full stats reload to ensure everything is in sync
    setTimeout(() => {
      loadAllStats();
    }, 100);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('userChanged'));
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome, description: 'Overview & stats' },
    { id: 'appointments', label: 'Appointments', icon: FaCalendarCheck, description: 'Manage bookings', badge: stats.appointments },
    { id: 'orders', label: 'Orders', icon: FaPills, description: 'Medicine orders', badge: stats.orders },
    { id: 'labtests', label: 'Lab Tests', icon: FaFlask, description: 'Test records', badge: stats.labTests },
    { id: 'prescriptions', label: 'Prescriptions', icon: FaFilePrescription, description: 'Your prescriptions', badge: stats.prescriptions },
  ];

  const quickActions = [
    { id: 'book-appointment', label: 'Book Appointment', icon: FaStethoscope, path: '/doctors', color: '#2c6774' },
    { id: 'order-medicines', label: 'Order Medicines', icon: FaAmbulance, path: '/pharmacies', color: '#174047' },
    { id: 'book-labtest', label: 'Book Lab Test', icon: FaNotesMedical, path: '/labs', color: '#5c878f' },
  ];

  // Handle tab change - closes mobile sidebar on selection
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-800 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      {/* ===== DESKTOP SIDEBAR - MATCHES DOCTOR DASHBOARD ===== */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto flex-col bg-gradient-to-br from-[#0f2c33] to-[#174047] shadow-2xl shadow-black/20 scrollbar-hide">
        {/* Logo Area - Matches Doctor Dashboard */}
        <div className="p-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg flex-shrink-0 overflow-hidden">
              <img src={logo} alt="QuickCure" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-white text-sm truncate block">QuickCure</span>
              <p className="text-[10px] text-white/50 font-medium truncate">Patient Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation - Matches Doctor Dashboard */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          <p className="px-3 text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">Main Menu</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left group ${
                  isActive 
                    ? 'bg-white/15 text-white shadow-lg shadow-black/10 border border-white/10' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                  isActive ? 'bg-[#2c6774] shadow-sm' : 'group-hover:bg-white/5'
                }`}>
                  <Icon size={16} className={`${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{item.label}</p>
                  <p className="text-[9px] text-white/40 truncate">{item.description}</p>
                </div>
                {isActive && (
                  <div className="w-1 h-6 rounded-full bg-[#2c6774] shadow-sm flex-shrink-0"></div>
                )}
                {item.badge > 0 && !isActive && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/10 text-white/70 flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Version info - Matches Doctor Dashboard */}
        <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-white/30">QuickCure v1.0</p>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* ===== RIGHT COLUMN (Header + Content) ===== */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar - Matches Doctor Dashboard mobile drawer */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-[#0f2c33] to-[#174047] shadow-2xl z-50 flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Logo - Matches Doctor Dashboard mobile */}
          <div className="p-5 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 flex-shrink-0 overflow-hidden">
                <img src={logo} alt="QuickCure" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white text-sm truncate block">QuickCure</span>
                <p className="text-[10px] text-white/50 truncate">Patient Dashboard</p>
              </div>
            </div>
          </div>

          {/* Menu Items - Matches Doctor Dashboard mobile */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                    isActive 
                      ? 'bg-white/15 text-white' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/20 text-white ml-auto flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <div className="w-1 h-5 rounded-full bg-[#2c6774] ml-auto flex-shrink-0"></div>}
                </button>
              );
            })}
          </nav>

          {/* Version - Matches Doctor Dashboard mobile */}
          <div className="flex-shrink-0 px-5 py-3 border-t border-white/10">
            <p className="text-[10px] text-white/30">QuickCure v1.0</p>
          </div>
        </div>

        {/* ===== HEADER - MATCHES DOCTOR DASHBOARD WITH NOTIFICATIONS ===== */}
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-30 flex-shrink-0">
          <div className="px-3 sm:px-5 py-3">
            <div className="flex items-center justify-between gap-3">

              {/* Left: hamburger + mobile logo */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2c6774]/40"
                  aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileSidebarOpen ? <span className="text-lg">✕</span> : <span className="text-lg">☰</span>}
                </button>

                {/* Mobile logo */}
                <div className="flex items-center gap-2 lg:hidden">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#174047] to-[#2c6774] flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-white font-bold text-xs">QC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm leading-tight">QuickCure</p>
                    <p className="text-[10px] text-gray-400 leading-tight">Patient Portal</p>
                  </div>
                </div>
              </div>

              {/* Right: notifications + user + logout */}
              <div className="flex items-center gap-2">

                {/* User chip - desktop - Matches Doctor Dashboard */}
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="text-xs leading-tight">
                    <p className="font-semibold text-[#174047] max-w-[110px] truncate">
                      {user?.name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-gray-400">Patient</p>
                  </div>
                </div>

                {/* User avatar - mobile only - Matches Doctor Dashboard */}
                <div className="sm:hidden w-8 h-8 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-white font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>

                {/* Notifications - with dropdown */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    aria-label="Notifications"
                  >
                    <FaBell className="w-4 h-4 text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Notifications
                          {unreadCount > 0 && (
                            <span className="ml-2 text-xs font-medium text-gray-500">({unreadCount} unread)</span>
                          )}
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-[#2c6774] hover:text-[#174047] font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <FaBell className="text-3xl text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No notifications</p>
                            <p className="text-xs text-gray-400 mt-1">Updates appear here</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <button
                              key={notification.id}
                              onClick={() => markAsRead(notification.id)}
                              className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                                !notification.read ? 'bg-blue-50/50' : ''
                              }`}
                            >
                              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                                {getNotificationIcon(notification.icon)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5 bg-[#2c6774]"></span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Logout - Matches Doctor Dashboard */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors border border-transparent hover:border-red-100"
                >
                  <FaSignOutAlt size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ===== SCROLLABLE MAIN CONTENT ===== */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50/50">
          {activeTab === 'dashboard' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-white" style={{ backgroundColor: '#174047' }}>
                <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-white/5"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 translate-y-1/2 -translate-x-1/4 rounded-full bg-white/5"></div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-white/70 text-sm font-medium">Welcome back,</p>
                      <h1 className="text-2xl md:text-3xl font-bold mt-1">
                        {user?.name || user?.email?.split('@')[0] || 'User'} 👋
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
                {[
                  { label: 'Appointments', value: stats.appointments, icon: FaCalendarCheck, color: '#2c6774', bg: 'rgba(44, 103, 116, 0.1)' },
                  { label: 'Orders', value: stats.orders, icon: FaPills, color: '#174047', bg: 'rgba(23, 64, 71, 0.1)' },
                  { label: 'Lab Tests', value: stats.labTests, icon: FaFlask, color: '#5c878f', bg: 'rgba(92, 135, 143, 0.1)' },
                  { label: 'Prescriptions', value: stats.prescriptions, icon: FaFilePrescription, color: '#2c6774', bg: 'rgba(44, 103, 116, 0.1)' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="text-gray-500 text-xs md:text-sm font-medium mb-1 truncate">{label}</p>
                        <p className="text-2xl md:text-3xl font-bold" style={{ color }}>
                          {value}
                        </p>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                        <Icon className="text-lg md:text-xl" style={{ color }} />
                      </div>
                    </div>
                  </div>
                ))}
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
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2c6774' }}></span>Appt</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#174047' }}></span>Orders</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5c878f' }}></span>Lab</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2c6774' }}></span>Presc</span>
                    </div>
                  </div>
                  <div className="w-full h-56 md:h-64">
                    {monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px', fontSize: '12px' }} />
                          <Bar dataKey="appointments" fill="#2c6774" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="orders" fill="#174047" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="labTests" fill="#5c878f" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="prescriptions" fill="#2c6774" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
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
                          cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value"
                        >
                          <Cell fill="#2c6774" />
                          <Cell fill="#174047" />
                          <Cell fill="#5c878f" />
                          <Cell fill="#2c6774" />
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px', fontSize: '12px' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: '10px', color: '#6b7280' }}>{value}</span>} />
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
                <MyAppointments refreshTrigger={refreshTrigger} onStatsUpdate={updateAppointmentStats} />
              )}
              {activeTab === 'orders' && (
                <MyOrders refreshTrigger={refreshTrigger} onStatsUpdate={updateOrderStats} />
              )}
              {activeTab === 'labtests' && (
                <MyLabTests refreshTrigger={refreshTrigger} onStatsUpdate={updateLabTestStats} />
              )}
              {activeTab === 'prescriptions' && (
                <MyPrescriptions refreshTrigger={refreshTrigger} />
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .dashboard-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: #f8f9fa;
        }

        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;