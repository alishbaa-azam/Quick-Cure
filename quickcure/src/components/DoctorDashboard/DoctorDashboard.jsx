import React, { useState, useEffect } from 'react';
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

const DoctorDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      setError('');

      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');

      if (!token || !user) {
        navigate('/login');
        return;
      }

      // Check if the user has doctor role
      if (user.role !== 'doctor') {
        setError('Access denied. You do not have doctor privileges.');
        setLoading(false);
        return;
      }

      // Verify that the URL doctor ID matches the user's ID
      const userId = user.id || user._id;
      if (id !== userId) {
        // Redirect to their own doctor dashboard
        navigate(`/DoctorDashboard/dashboard/${userId}`);
        return;
      }

      // Fetch doctor profile - this will also resolve the actual doctor doc ID
      const result = await getDoctorProfile(id);
      if (result.success) {
        // Use the resolved doctor document ID for API calls if available
        const resolvedId = result.data._resolvedDoctorId || id;
        setDoctorData({ ...result.data, doctorDocId: resolvedId });
      } else {
        setError(result.error || 'Failed to load doctor profile');
      }
      setLoading(false);
    };

    fetchDoctorData();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-[#2c6774] text-white rounded-md hover:bg-[#1e4e56]"
          >
            Go to Login
          </button>
        </div>
      );
    }

    switch(activeTab) {
      case 'dashboard': 
        return <Dashboard doctorId={id} doctorData={doctorData} />;
      case 'appointments': 
        return (
          <Appointments 
            doctorId={id}
            setActiveTab={setActiveTab}
            setSelectedPatient={setSelectedPatient}
          />
        );
      case 'patients': 
        return (
          <Patients 
            doctorId={id}
            setActiveTab={setActiveTab} 
            setSelectedPatient={setSelectedPatient} 
          />
        );
      case 'patient-history': 
        return (
          <PatientHistory 
            selectedPatient={selectedPatient} 
            setActiveTab={setActiveTab}
            doctorId={id}  // ← FIXED: doctorId is now passed correctly
          />
        );
      case 'reviews': 
        return <Reviews doctorId={id} />;
      case 'settings': 
        return <Settings doctorId={id} doctorData={doctorData} />;
      default: 
        return <Dashboard doctorId={id} doctorData={doctorData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header - Sticky */}
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        onLogout={handleLogout}
        doctorData={doctorData}
      />

      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Static/Fixed */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content - with proper margins for fixed sidebar and header */}
      <main className="lg:ml-72 pt-16">
        <div className="p-3 md:p-4 lg:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;