import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import MyAppointments from './MyAppointments';
import MyOrders from './MyOrders';
import MyLabTests from './MyLabTests';
import { FaCalendarCheck, FaPills, FaFlask } from 'react-icons/fa';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('appointments');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({
    appointments: 0,
    orders: 0,
    labTests: 0
  });

  useEffect(() => {
    // Check if user is logged in
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

    // Load initial stats
    loadStats();

    // Listen for user changes
    const handleUserChange = () => {
      const updatedUserStr = localStorage.getItem('user');
      if (updatedUserStr) {
        setUser(JSON.parse(updatedUserStr));
        loadStats();
      } else {
        navigate('/login');
      }
    };

    // Listen for storage changes (when appointments are booked in other tabs)
    const handleStorageChange = (e) => {
      if (e.key?.startsWith('appointments_')) {
        loadStats();
      }
    };

    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for when appointments are updated
    window.addEventListener('appointmentsUpdated', loadStats);

    return () => {
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentsUpdated', loadStats);
    };
  }, [navigate]);

  // Function to load all stats
  const loadStats = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?.id || user?._id || 'guest';
      
      // Get appointments count
      const appointmentsKey = `appointments_${userKey}`;
      const appointments = JSON.parse(localStorage.getItem(appointmentsKey) || '[]');
      
      // Get orders count
      const ordersKey = `medicineOrders_${userKey}`;
      const orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      
      // Get lab tests count
      const labTestsKey = `labTests_${userKey}`;
      const labTests = JSON.parse(localStorage.getItem(labTestsKey) || '[]');
      
      // Also check phone-based storage for appointments
      let totalAppointments = appointments.length;
      if (totalAppointments === 0 && (user.phone || user.mobile)) {
        const phone = user.phone || user.mobile;
        const phoneAppointments = JSON.parse(localStorage.getItem(`appointments_phone_${phone}`) || '[]');
        totalAppointments = phoneAppointments.length;
      }

      setStats({
        appointments: totalAppointments,
        orders: orders.length,
        labTests: labTests.length
      });

      console.log('Stats updated:', { 
        appointments: totalAppointments, 
        orders: orders.length, 
        labTests: labTests.length 
      });

    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Function to update stats from child components
  const updateStats = (section, count) => {
    setStats(prev => ({
      ...prev,
      [section]: count
    }));
    
    // Also update localStorage for persistence
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user?.id || user?._id || 'guest';
      
      if (section === 'appointments') {
        const appointmentsKey = `appointments_${userKey}`;
        const appointments = JSON.parse(localStorage.getItem(appointmentsKey) || '[]');
        // Don't overwrite, just ensure count matches
        if (appointments.length !== count) {
          console.log('Appointment count mismatch, refreshing from localStorage');
          loadStats();
        }
      }
    } catch (error) {
      console.error('Error updating stats in localStorage:', error);
    }
  };

  // Function to manually refresh stats
  const refreshStats = () => {
    loadStats();
    setRefreshTrigger(prev => prev + 1);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-light)' }}>
      {/* Header */}
      <DashboardHeader user={user} onStatsRefresh={refreshStats} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--secondary-color)' }}>
            Hello, {user.name || user.email?.split('@')[0] || 'User'}!
          </h2>
          <p className="mt-1" style={{ color: 'var(--accent-color)' }}>
            Manage your healthcare activities from one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Appointments</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>
                  {stats.appointments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)' }}>
                <FaCalendarCheck className="text-2xl" style={{ color: 'var(--primary-color)' }} />
              </div>
            </div>
            {/* {stats.appointments > 0 && (
              <div className="mt-2 text-xs text-green-600">
                ✓ {stats.appointments} active appointment{stats.appointments !== 1 ? 's' : ''}
              </div>
            )} */}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Medicine Orders</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--secondary-color)' }}>
                  {stats.orders}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(23, 64, 71, 0.1)' }}>
                <FaPills className="text-2xl" style={{ color: 'var(--secondary-color)' }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Lab Tests</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--accent-color)' }}>
                  {stats.labTests}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(92, 135, 143, 0.1)' }}>
                <FaFlask className="text-2xl" style={{ color: 'var(--accent-color)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${isActive ? 'border-current' : 'border-transparent hover:border-gray-300'}
                  `}
                  style={{
                    color: isActive ? tab.color : '#6b7280',
                    borderColor: isActive ? tab.color : 'transparent'
                  }}
                >
                  <Icon className="text-lg" />
                  <span>{tab.label}</span>
                  {tab.id === 'appointments' && stats.appointments > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                      {stats.appointments}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'appointments' && (
            <MyAppointments 
              refreshTrigger={refreshTrigger} 
              onStatsUpdate={(count) => {
                updateStats('appointments', count);
                // Force a reload of stats from localStorage to ensure accuracy
                setTimeout(loadStats, 100);
              }}
            />
          )}
          
          {activeTab === 'orders' && (
            <MyOrders 
              refreshTrigger={refreshTrigger}
              onStatsUpdate={(count) => updateStats('orders', count)}
            />
          )}
          
          {activeTab === 'labtests' && (
            <MyLabTests 
              refreshTrigger={refreshTrigger}
              onStatsUpdate={(count) => updateStats('labTests', count)}
            />
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center space-x-3"
            onClick={() => navigate('/doctors')}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(44, 103, 116, 0.1)' }}>
              <FaCalendarCheck style={{ color: 'var(--primary-color)' }} />
            </div>
            <div className="text-left">
              <p className="font-medium" style={{ color: 'var(--secondary-color)' }}>Book Appointment</p>
              <p className="text-xs text-gray-500">Schedule a visit with a doctor</p>
            </div>
          </button>

          <button 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center space-x-3"
            onClick={() => navigate('/pharmacies')}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(23, 64, 71, 0.1)' }}>
              <FaPills style={{ color: 'var(--secondary-color)' }} />
            </div>
            <div className="text-left">
              <p className="font-medium" style={{ color: 'var(--secondary-color)' }}>Order Medicines</p>
              <p className="text-xs text-gray-500">Get medicines delivered</p>
            </div>
          </button>

          <button 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition flex items-center space-x-3"
            onClick={() => navigate('/labs')}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(92, 135, 143, 0.1)' }}>
              <FaFlask style={{ color: 'var(--accent-color)' }} />
            </div>
            <div className="text-left">
              <p className="font-medium" style={{ color: 'var(--secondary-color)' }}>Book Lab Test</p>
              <p className="text-xs text-gray-500">Schedule diagnostic tests</p>
            </div>
          </button>
        </div>
      </main>

      {/* Custom Styles */}
      <style>{`
        :root {
          --primary-color: #2c6774;
          --secondary-color: #174047;
          --accent-color: #5c878f;
          --hover-color: #1e4e56;
          --bg-light: #9fbfc5;
          --text-light: #c0d3dc;
          --white: #ffffff;
        }
      `}</style>
    </div>
  );
};

// Tabs configuration
const tabs = [
  { id: 'appointments', label: 'Appointments', icon: FaCalendarCheck, color: '#2c6774' },
  { id: 'orders', label: 'Medicine Orders', icon: FaPills, color: '#174047' },
  { id: 'labtests', label: 'Lab Tests', icon: FaFlask, color: '#5c878f' }
];

export default UserDashboard;