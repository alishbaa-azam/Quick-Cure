import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import Patients from './Patients';
import PatientHistory from './PatientHistory';
import Prescriptions from './Prescriptions';
import Schedule from './Schedule';
import Settings from './Settings';
import { patients } from '../data/dummyData';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'appointments': return (
        <Appointments 
          setActiveTab={setActiveTab}
          setSelectedPatient={setSelectedPatient}
        />
      );
      case 'patients': return (
        <Patients 
          setActiveTab={setActiveTab} 
          setSelectedPatient={setSelectedPatient} 
        />
      );
      case 'patient-history': return (
        <PatientHistory 
          selectedPatient={selectedPatient} 
          setActiveTab={setActiveTab} 
        />
      );
      case 'prescriptions': return <Prescriptions />;
      case 'schedule': return <Schedule />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        {/* Sidebar Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-4 lg:p-6 w-full min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;