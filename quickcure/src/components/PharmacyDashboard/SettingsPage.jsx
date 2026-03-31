import React from 'react';
import { User, Bell, Shield, MapPin } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-black text-[#1a3a3a]">Settings</h1>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center gap-4">
          <div className="w-16 h-16 bg-[#2c6774] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">M</div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Medicare Pharmacy</h3>
            <p className="text-sm text-gray-500">Lahore, Punjab Branch</p>
          </div>
          <button className="ml-auto text-sm font-bold text-[#2c6774] border border-[#2c6774] px-4 py-1.5 rounded-lg hover:bg-gray-50">Change Logo</button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Pharmacy Name</label>
              <input type="text" className="w-full p-2.5 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-[#2c6774]" defaultValue="Medicare Pharmacy" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Contact Number</label>
              <input type="text" className="w-full p-2.5 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-[#2c6774]" defaultValue="+92 300 1234567" />
            </div>
          </div>
          <button className="bg-[#1a3a3a] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2c6774] transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;