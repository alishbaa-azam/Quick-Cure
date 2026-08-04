import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBell, FaSignOutAlt, FaBars, FaChevronDown, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ user, onLogout, onStatsRefresh, onMenuToggle }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('userChanged'));
    if (onLogout) onLogout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getNotificationIcon = (iconType) => {
    switch(iconType) {
      case 'calendar': return <FaCog className="text-[var(--primary-color)]" />;
      case 'order': return <FaCog className="text-[var(--secondary-color)]" />;
      case 'lab': return <FaCog className="text-[var(--accent-color)]" />;
      case 'prescription': return <FaCog className="text-[#2c6774]" />;
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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Section - Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <FaBars className="text-gray-600" size={20} />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Notifications"
              >
                <FaBell className="text-gray-600 text-lg" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 text-[0.625rem] font-bold text-white rounded-full flex items-center justify-center px-1 animate-pulse" style={{ backgroundColor: '#ef4444' }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
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
                        className="text-xs text-[var(--primary-color)] hover:text-[var(--hover-color)] font-medium"
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
                                <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: 'var(--primary-color)' }}></span>
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

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 md:gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                aria-label="User menu"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm flex-shrink-0" style={{ backgroundColor: 'var(--primary-color)' }}>
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitials(user?.name || user?.email || 'User')
                  )}
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight truncate max-w-[100px] md:max-w-[150px]">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 leading-tight truncate max-w-[100px] md:max-w-[150px]">{user?.email || ''}</p>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform flex-shrink-0 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <FaSignOutAlt className="text-red-400" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;