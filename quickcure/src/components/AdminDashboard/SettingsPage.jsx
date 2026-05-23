import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, RefreshCw, Save } from 'lucide-react';
import { message, Switch } from 'antd';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    userRegistration: true,
    automaticBackups: false,
    maintenanceMode: false,
    debugMode: false,
    twoFactorAuth: true,
  });

  const handleSave = () => {
    message.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage system configuration</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] text-sm flex items-center gap-2"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b flex items-center gap-3">
            <Shield size={20} className="text-[#2c6774]" />
            <h3 className="font-bold text-gray-800">General Settings</h3>
          </div>
          <div className="p-4 space-y-4">
            <SettingRow
              label="User Registration"
              description="Allow new users to register"
              checked={settings.userRegistration}
              onChange={(v) => setSettings({...settings, userRegistration: v})}
            />
            <SettingRow
              label="Maintenance Mode"
              description="Put the site in maintenance mode"
              checked={settings.maintenanceMode}
              onChange={(v) => setSettings({...settings, maintenanceMode: v})}
            />
            <SettingRow
              label="Debug Mode"
              description="Enable debug information"
              checked={settings.debugMode}
              onChange={(v) => setSettings({...settings, debugMode: v})}
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b flex items-center gap-3">
            <Bell size={20} className="text-[#2c6774]" />
            <h3 className="font-bold text-gray-800">Notification Settings</h3>
          </div>
          <div className="p-4 space-y-4">
            <SettingRow
              label="Email Notifications"
              description="Receive email notifications"
              checked={settings.emailNotifications}
              onChange={(v) => setSettings({...settings, emailNotifications: v})}
            />
            <SettingRow
              label="Two Factor Auth"
              description="Enable 2FA for admin accounts"
              checked={settings.twoFactorAuth}
              onChange={(v) => setSettings({...settings, twoFactorAuth: v})}
            />
            <SettingRow
              label="Automatic Backups"
              description="Auto backup database daily"
              checked={settings.automaticBackups}
              onChange={(v) => setSettings({...settings, automaticBackups: v})}
            />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b flex items-center gap-3">
            <Database size={20} className="text-[#2c6774]" />
            <h3 className="font-bold text-gray-800">System Information</h3>
          </div>
          <div className="p-4 space-y-3">
            <InfoRow label="Application" value="QuickCure Healthcare" />
            <InfoRow label="Version" value="1.0.0" />
            <InfoRow label="Backend" value="Node.js + Express" />
            <InfoRow label="Frontend" value="React + Vite" />
            <InfoRow label="Database" value="MongoDB" />
            <InfoRow label="API URL" value="http://localhost:5000/api" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b flex items-center gap-3">
            <RefreshCw size={20} className="text-[#2c6774]" />
            <h3 className="font-bold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-4 space-y-3">
            <ActionButton label="Clear System Cache" color="bg-amber-500" />
            <ActionButton label="Re-index Search Data" color="bg-blue-500" />
            <ActionButton label="Generate Backup" color="bg-emerald-500" />
            <ActionButton label="Run System Health Check" color="bg-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

const SettingRow = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    <Switch 
      checked={checked} 
      onChange={onChange}
      style={{ backgroundColor: checked ? '#2c6774' : undefined }}
    />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

const ActionButton = ({ label, color }) => (
  <button className={`w-full flex items-center justify-between p-3 ${color} bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors`}>
    <span className="text-sm font-medium" style={{ color: color.replace('bg-', '').replace('-500', '') === 'amber' ? '#d97706' : 
      color.replace('bg-', '').replace('-500', '') === 'blue' ? '#2563eb' :
      color.replace('bg-', '').replace('-500', '') === 'emerald' ? '#059669' : '#7c3aed' }}>
      {label}
    </span>
    <span className="text-xs text-gray-500">Run</span>
  </button>
);