import React from 'react';
import { FiUser, FiEdit2, FiDollarSign } from 'react-icons/fi';
import { FaHospital, FaFlask, FaMapMarkerAlt } from 'react-icons/fa';

export default function ProfileTab({ lab, stats, theme, onEditProfile }) {
  const safeStats = {
    totalTests: stats?.totalTests || 0,
    totalRevenue: stats?.totalRevenue || 0,
    completedBookings: stats?.completedBookings || 0,
    totalBookings: stats?.totalBookings || 0,
  };

  const completionRate = safeStats.totalBookings ? Math.round((safeStats.completedBookings / safeStats.totalBookings) * 100) : 0;

  const ProfileField = ({ label, value, icon: Icon, highlight }) => (
    <div>
      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Icon size={14} /> {label}</p>
      <div className={`text-base font-medium ${highlight ? 'text-xl' : ''}`} style={highlight ? { color: theme.primary } : {}}>{value}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b flex justify-between items-center" style={{ borderBottomColor: `${theme.primary}20` }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
            <FiUser size={20} />
          </div>
          <h2 className="text-xl font-semibold">Lab Profile</h2>
        </div>
        <button onClick={onEditProfile} className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: theme.primary }}>
          <FiEdit2 size={16} /> Edit Profile
        </button>
      </div>

      {lab ? (
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              {lab.logo ? (
                <img src={`http://localhost:5000/uploads/${lab.logo}`} alt={lab.name} className="w-full max-w-xs mx-auto rounded-xl shadow-lg" />
              ) : (
                <div className="w-48 h-48 mx-auto rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                  <FaHospital size={64} className="text-white" />
                </div>
              )}
            </div>
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProfileField label="Laboratory Name" value={lab.name} icon={FaHospital} />
                <ProfileField label="Discount" value={`${lab.discount || 0}% OFF`} icon={FiDollarSign} />
                <div className="sm:col-span-2"><ProfileField label="Branch Locations" value={lab.branches || 'No branches specified'} icon={FaMapMarkerAlt} /></div>
                <ProfileField label="Total Tests" value={safeStats.totalTests} icon={FaFlask} />
                <ProfileField label="Total Revenue" value={`Rs.${safeStats.totalRevenue.toLocaleString()}`} icon={FiDollarSign} highlight />
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500 mb-2">Performance</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${completionRate}%`, background: `linear-gradient(90deg, ${theme.success}, ${theme.primary})` }} />
                  </div>
                  <p className="text-sm mt-2">{safeStats.completedBookings} of {safeStats.totalBookings} bookings completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center"><FaHospital size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No lab data available</p></div>
      )}
    </div>
  );
}