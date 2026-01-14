// components/Dashboard/SettingsPage.jsx
import React, { useState } from 'react';

const SettingsPage = () => {
  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: 'MediCare Pharmacy',
    address: '123 Health St, Medical City',
    phone: '(555) 123-4567',
    email: 'contact@medicarepharmacy.com',
    hours: '8:00 AM - 10:00 PM',
  });

  const handleSave = () => {
    alert('Settings saved!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pharmacy Settings</h1>
      
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pharmacy Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pharmacy Name</label>
            <input
              type="text"
              value={pharmacyInfo.name}
              onChange={(e) => setPharmacyInfo({...pharmacyInfo, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={pharmacyInfo.phone}
              onChange={(e) => setPharmacyInfo({...pharmacyInfo, phone: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={pharmacyInfo.address}
              onChange={(e) => setPharmacyInfo({...pharmacyInfo, address: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={pharmacyInfo.email}
              onChange={(e) => setPharmacyInfo({...pharmacyInfo, email: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
            <input
              type="text"
              value={pharmacyInfo.hours}
              onChange={(e) => setPharmacyInfo({...pharmacyInfo, hours: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;