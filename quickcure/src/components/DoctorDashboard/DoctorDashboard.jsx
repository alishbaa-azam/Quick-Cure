import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import Patients from './Patients';
import PatientHistory from './PatientHistory';
import Reviews from './Reviews';
import Settings from './Settings';
import { getDoctorProfile } from '../../api/doctorApi';
import { AlertCircle, RefreshCw } from 'lucide-react';

const DoctorDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDoctorData = useCallback(async () => {
    setLoading(true);
    setError('');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'doctor') {
      setError('Access denied. You do not have doctor privileges.');
      setLoading(false);
      return;
    }

    const userId = user.id || user._id;
    if (id !== userId) {
      navigate(`/DoctorDashboard/dashboard/${userId}`);
      return;
    }

    const result = await getDoctorProfile(id);
    if (result.success) {
      const resolvedId = result.data._resolvedDoctorId || id;
      setDoctorData({ ...result.data, doctorDocId: resolvedId });
    } else {
      setError(result.error || 'Failed to load doctor profile');
    }
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    fetchDoctorData();
  }, [fetchDoctorData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 font-medium text-sm">Loading your dashboard...</p>
            <p className="text-gray-400 text-xs mt-1">Please wait while we fetch your data</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-96 gap-4 px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-center">
            <p className="text-red-600 font-medium text-lg">{error}</p>
            <p className="text-gray-500 text-sm mt-1">Please try logging in again</p>
          </div>
          <div className="flex gap-3 mt-2">
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm font-medium transition-colors shadow-sm"
            >
              Go to Login
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        </div>
      );
    }

    // Use the resolved doctor document ID for API calls (MongoDB ObjectID)
    const doctorDocId = doctorData?.doctorDocId || doctorData?._resolvedDoctorId || id;

    switch(activeTab) {
      case 'dashboard': 
        return <Dashboard doctorId={doctorDocId} doctorData={doctorData} />;
      case 'appointments': 
        return (
          <Appointments 
            doctorId={doctorDocId}
            setActiveTab={setActiveTab}
            setSelectedPatient={setSelectedPatient}
          />
        );
      case 'patients': 
        return (
          <Patients 
            doctorId={doctorDocId}
            setActiveTab={setActiveTab} 
            setSelectedPatient={setSelectedPatient} 
          />
        );
      case 'patient-history': 
        return (
          <PatientHistory 
            selectedPatient={selectedPatient} 
            setActiveTab={setActiveTab}
            doctorId={doctorDocId}
          />
        );
      case 'reviews': 
        return <Reviews doctorId={doctorDocId} />;
      case 'settings': 
        return (
          <Settings 
            doctorId={doctorDocId} 
            doctorData={doctorData} 
            onProfileUpdate={fetchDoctorData}
          />
        );
      default: 
        return <Dashboard doctorId={doctorDocId} doctorData={doctorData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          onLogout={handleLogout}
          doctorData={doctorData}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;