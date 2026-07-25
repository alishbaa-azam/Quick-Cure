import React, { useState, useEffect, useRef } from 'react';
import { Bell, LogOut, Menu, X } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, onLogout, doctorData }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const doctorName = doctorData?.name || doctorData?.fullName || user?.name || 'Doctor';

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  // ===== Real-time notifications (mirrors UserDashboard.jsx logic, doctor-side) =====
  useEffect(() => {
    loadRealNotifications();

    const handleAppointmentUpdate = () => loadRealNotifications();
    const handleUserChange = () => loadRealNotifications();

    window.addEventListener('appointmentsUpdated', handleAppointmentUpdate);
    window.addEventListener('doctorAppointmentsUpdated', handleAppointmentUpdate);
    window.addEventListener('userChanged', handleUserChange);

    const checkInterval = setInterval(() => {
      checkUpcomingAppointments();
    }, 300000);

    return () => {
      window.removeEventListener('appointmentsUpdated', handleAppointmentUpdate);
      window.removeEventListener('doctorAppointmentsUpdated', handleAppointmentUpdate);
      window.removeEventListener('userChanged', handleUserChange);
      clearInterval(checkInterval);
    };
  }, []);

  const getDoctorId = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    return doctorData?._id || doctorData?.id || currentUser?._id || currentUser?.id || 'guest';
  };

  const loadRealNotifications = () => {
    try {
      const doctorId = getDoctorId();
      const newNotifications = [];

      // Doctor appointments can be stored either under a doctor-scoped key
      // or inside a shared "appointments" list filtered by doctor id.
      const doctorKey = `doctorAppointments_${doctorId}`;
      let appointments = JSON.parse(localStorage.getItem(doctorKey) || '[]');

      if (appointments.length === 0) {
        const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = allAppointments.filter(
          apt => (apt.doctor?._id || apt.doctor?.id || apt.doctorId) === doctorId
        );
      }

      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointments.filter(apt => apt.date === today && apt.status !== 'cancelled');

      todayAppointments.forEach(apt => {
        newNotifications.push({
          id: `apt_${Date.now()}_${Math.random()}`,
          title: 'Appointment Today',
          message: `You have an appointment with ${apt.patient?.name || apt.patientName || 'a patient'} at ${apt.time}`,
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
          message: `You have an appointment with ${apt.patient?.name || apt.patientName || 'a patient'} at ${apt.time} tomorrow`,
          time: 'Tomorrow',
          read: false,
          icon: 'calendar',
          type: 'appointment'
        });
      });

      const newlyBooked = appointments.filter(apt => {
        if (!apt.createdAt) return false;
        return new Date(apt.createdAt).toISOString().split('T')[0] === today && apt.status !== 'cancelled';
      });

      newlyBooked.forEach(apt => {
        newNotifications.push({
          id: `apt_new_${Date.now()}_${Math.random()}`,
          title: 'New Appointment Booked',
          message: `${apt.patient?.name || apt.patientName || 'A patient'} booked an appointment on ${apt.date} at ${apt.time}`,
          time: 'Today',
          read: false,
          icon: 'calendar',
          type: 'appointment'
        });
      });

      const todayCancelled = appointments.filter(apt =>
        apt.status === 'cancelled' &&
        apt.cancelledAt &&
        new Date(apt.cancelledAt).toISOString().split('T')[0] === today
      );

      todayCancelled.forEach(apt => {
        newNotifications.push({
          id: `apt_cancel_${Date.now()}_${Math.random()}`,
          title: 'Appointment Cancelled',
          message: `${apt.patient?.name || apt.patientName || 'A patient'} cancelled their appointment on ${apt.date}`,
          time: 'Today',
          read: false,
          icon: 'calendar',
          type: 'reminder'
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
      const doctorId = getDoctorId();
      const doctorKey = `doctorAppointments_${doctorId}`;
      let appointments = JSON.parse(localStorage.getItem(doctorKey) || '[]');

      if (appointments.length === 0) {
        const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = allAppointments.filter(
          apt => (apt.doctor?._id || apt.doctor?.id || apt.doctorId) === doctorId
        );
      }

      const now = new Date();

      appointments.forEach(apt => {
        if (apt.status === 'cancelled' || apt.status === 'completed') return;

        const aptDate = new Date(apt.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (aptDate.toDateString() === today.toDateString()) {
          const timeMatch = apt.time?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
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
              const notifiedKey = `doctor_notified_apt_${apt._id || apt.id}`;
              const lastNotified = localStorage.getItem(notifiedKey);
              const lastNotifiedTime = lastNotified ? new Date(lastNotified) : null;

              if (!lastNotifiedTime || (now - lastNotifiedTime) > 3600000) {
                setNotifications(prev => {
                  const exists = prev.some(n => n.id === `reminder_${apt._id || apt.id}`);
                  if (exists) return prev;

                  const newNotif = {
                    id: `reminder_${apt._id || apt.id}`,
                    title: 'Appointment Reminder',
                    message: `Your appointment with ${apt.patient?.name || apt.patientName || 'a patient'} is in ${Math.round(minutesDiff)} minutes at ${apt.time}`,
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

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
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
  // ===== End notifications logic =====

  return (
    // sticky + z-40 ensures header stays fixed while content scrolls beneath
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="px-3 sm:px-5 py-3">
        <div className="flex items-center justify-between gap-3">

          {/* Left: hamburger + mobile logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2c6774]/40"
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile logo */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#174047] to-[#2c6774] flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-white font-bold text-xs">QC</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">QuickCure</p>
                <p className="text-[10px] text-gray-400 leading-tight">Doctor Portal</p>
              </div>
            </div>
          </div>

          {/* Right: avatar + notifications + logout */}
          <div className="flex items-center gap-2">

            {/* Doctor chip — desktop */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-white font-bold text-xs">{doctorName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-xs leading-tight">
                <p className="font-semibold text-[#174047] max-w-[110px] truncate">{doctorName}</p>
                <p className="text-gray-400">Doctor</p>
              </div>
            </div>

            {/* Doctor avatar — mobile only */}
            <div className="sm:hidden w-8 h-8 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white font-bold text-xs">{doctorName.charAt(0).toUpperCase()}</span>
            </div>

            {/* Notifications — with real-time dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-gray-600" />
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
                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
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
                            <Bell className="w-3.5 h-3.5 text-[#2c6774]" />
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

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors border border-transparent hover:border-red-100"
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