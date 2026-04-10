import React from 'react';
import { FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ user, onLogout }) => {
  const navigate = useNavigate();

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            {/* <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <span className="text-white font-bold text-xl">QC</span>
            </div> */}
            <div>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--secondary-color)' }}>
                User Dashboard
              </h1>
              <p className="text-xs" style={{ color: 'var(--accent-color)' }}>
                Welcome back!
              </p>
            </div>
          </div>

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button 
              className="p-2 rounded-full hover:bg-gray-100 relative transition-colors"
              aria-label="Notifications"
            >
              <FaBell className="text-lg" style={{ color: 'var(--accent-color)' }} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium" style={{ color: 'var(--secondary-color)' }}>
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs" style={{ color: 'var(--accent-color)' }}>
                  {user?.email || ''}
                </p>
              </div>
              
              {/* Profile Avatar with Initials */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user?.name || user?.email || 'User')
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
                aria-label="Logout"
              >
                <FaSignOutAlt 
                  className="text-lg group-hover:text-red-600 transition-colors"
                  style={{ color: 'var(--accent-color)' }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;