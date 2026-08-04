import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import LabDashboardSidebar from './LabDashboardSidebar';
import LabDashboardModals from './LabDashboardModals';
import DashboardTab from './tabs/DashboardTab';
import TestsTab from './tabs/TestsTab';
import BookingsTab from './tabs/BookingsTab';
import PatientsTab from './tabs/PatientsTab';
import CollectionsTab from './tabs/CollectionsTab';
import ReportsTab from './tabs/ReportsTab';
import ProfileTab from './tabs/ProfileTab';
import TechniciansTab from './tabs/TechniciansTab';
import CitiesTab from './tabs/CitiesTab';

const API_BASE_URL = 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;

const theme = {
  primary: '#2c6774',
  secondary: '#174047',
  accent: '#5c878f',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  purple: '#8b5cf6'
};

export default function LabDashboard() {
  const navigate = useNavigate();
  
  // States
  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [collections, setCollections] = useState([]);
  const [reports, setReports] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal States
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCollectionModalVisible, setIsCollectionModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  
  // Filter States
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [timeRange, setTimeRange] = useState('30');

  // Get current user
  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      return null;
    }
  };

  // Fetch all data
  const fetchLabData = async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      
      if (!currentUser || currentUser.role !== "lab") {
        setError("Access denied");
        setLoading(false);
        return;
      }

      const { data: labs } = await axios.get("/labs");
      const userLab = labs.find(lab => {
        const labUserId = lab.userId?._id || lab.userId;
        const currentUserId = currentUser._id || currentUser.id;
        return labUserId?.toString() === currentUserId?.toString();
      });

      if (!userLab) {
        setError("Lab not registered");
        setLoading(false);
        return;
      }

      setLab(userLab);
      await Promise.all([
        fetchTests(userLab._id),
        fetchBookings(userLab._id),
        fetchPatients(userLab._id),
        fetchCollections(userLab._id),
        fetchReports(userLab._id),
        fetchTechnicians(userLab._id),
      ]);
      
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const fetchTests = async (labId) => {
    try {
      const response = await axios.get(`/tests/lab/${labId}`);
      setTests(response.data);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    }
  };

  const fetchBookings = async (labId) => {
    try {
      const response = await axios.get(`/bookings/lab/${labId}`);
      const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sorted);
      setFilteredBookings(sorted);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  const fetchPatients = async (labId) => {
    try {
      const response = await axios.get(`/patients/lab/${labId}`);
      setPatients(response.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  const fetchCollections = async (labId) => {
    try {
      const response = await axios.get(`/sample-collection/lab/${labId}`);
      setCollections(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const fetchReports = async (labId) => {
    try {
      const response = await axios.get(`/reports/lab/${labId}`);
      setReports(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchTechnicians = async (labId) => {
    try {
      const response = await axios.get(`/technicians/lab/${labId}`);
      setTechnicians(response.data);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };

  // Test CRUD
  const createTest = async (values) => {
    try {
      await axios.post('/tests', { ...values, labId: lab._id });
      await fetchTests(lab._id);
      return true;
    } catch (error) {
      console.error('Failed to create test:', error);
      return false;
    }
  };

  const updateTest = async (id, values) => {
    try {
      await axios.put(`/tests/${id}`, values);
      await fetchTests(lab._id);
      return true;
    } catch (error) {
      console.error('Failed to update test:', error);
      return false;
    }
  };

  const deleteTest = async (id) => {
    try {
      await axios.delete(`/tests/${id}`);
      await fetchTests(lab._id);
    } catch (error) {
      console.error('Failed to delete test:', error);
    }
  };

  // Update lab profile
  const updateLabProfile = async (values) => {
    try {
      const formData = new FormData();
      if (values.name) formData.append('name', values.name);
      if (values.branches) formData.append('branches', values.branches);
      if (values.discount !== undefined) formData.append('discount', values.discount.toString());
      if (values.serviceCities) formData.append('serviceCities', JSON.stringify(values.serviceCities));
      if (logoFile) formData.append('logo', logoFile);

      await axios.put(`/labs/${lab._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await fetchLabData();
      setLogoFile(null);
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      return false;
    }
  };

  const handleScheduleCollection = async (data) => {
    if (!lab?._id) return alert("Lab information missing!");
    
    const booking = bookings.find(b => b._id === data.bookingId);
    if (!booking) return alert("Selected booking not found!");

    try {
      setLoading(true);
      
      const payload = { 
        ...data, 
        labId: lab._id,
        patientId: booking.patientDetails?._id,
        collectionAddress: booking.patientDetails?.address 
      };

      if (data._id) {
        await axios.put(`/sample-collection/${data._id}`, payload);
      } else {
        await axios.post('/sample-collection/schedule', payload);
      }

      await fetchCollections(lab._id);
      setIsCollectionModalVisible(false);
      alert("Sample collection scheduled successfully!");
      return true;
    } catch (error) {
      console.error('Schedule Error:', error.response?.data || error.message);
      alert(`Failed to schedule collection: ${error.response?.data?.message || "Internal Server Error"}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCollectionStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.patch(`/sample-collection/${id}/status`, { status });
      
      if (lab?._id) await fetchCollections(lab._id);
      alert(`Status updated to ${status}! ✅`);
    } catch (error) {
      console.error('Update Collection Status Error:', error);
      alert(`Failed to update status: ${error.response?.data?.message || "Internal error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        setLoading(true);
        await axios.delete(`/reports/${id}`);
        await fetchReports(lab._id);
        alert("Report deleted successfully!");
      } catch (error) {
        console.error('Delete Report Error:', error);
        alert(`Failed to delete report: ${error.response?.data?.message || "Internal error"}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUploadReport = async (formData) => {
    try {
      setLoading(true);
      await axios.post('/reports/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await fetchReports(lab._id);
      setIsReportModalVisible(false);
      alert("Report uploaded successfully! ✅");
      return true;
    } catch (error) {
      alert(`Failed to upload report: ${error.response?.data?.message || "Internal error"}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCollection = async (id) => {
    if (window.confirm("Are you sure you want to cancel this collection schedule?")) {
      try {
        await axios.delete(`/sample-collection/${id}`);
        if (lab?._id) await fetchCollections(lab._id);
        alert("Collection deleted successfully");
      } catch (error) {
        alert("Failed to delete collection schedule");
      }
    }
  };

  // Update booking status with enhanced statuses
  const updateBookingStatus = async (id, status) => {
    if (!id) return alert("Booking ID is missing!");
    
    try {
      setLoading(true);
      await axios.patch(`/bookings/${id}/status`, { 
        status: status, 
        bookingStatus: status 
      });

      if (lab?._id) await fetchBookings(lab._id);
      
      setIsBookingModalVisible(false);
    } catch (error) {
      console.error('Update Status Error:', error.response?.data || error.message);
      alert(`Failed to update status to ${status}. ${error.response?.data?.message || ""}`);
    } finally {
      setLoading(false);
    }
  };

  // Assign technician to booking
  const handleAssignTechnician = async (bookingId, technicianId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/technicians/${technicianId}/assign`, { bookingId });
      alert(` Technician assigned successfully! Email notification sent.`);
      await fetchBookings(lab._id);
      await fetchTechnicians(lab._id);
      setIsBookingModalVisible(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to assign technician. Please try again.';
      alert(` ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Update service cities from Cities tab
  const handleUpdateCities = async (cities) => {
    try {
      const formData = new FormData();
      formData.append('serviceCities', JSON.stringify(cities));
      await axios.put(`/labs/${lab._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchLabData();
    } catch (error) {
      alert('Failed to update cities');
    }
  };

  // Patient Handlers
  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setIsPatientModalVisible(true);
  };

  const handlePatientSubmit = async (values) => {
    alert("Patient details updated successfully (Mock)");
    setIsPatientModalVisible(false);
    setEditingPatient(null);
  };

  const handleDeletePatient = async (email) => {
    if (window.confirm("Are you sure you want to remove this patient and their history?")) {
      try {
        alert(`Patient ${email} removed from registry`);
        fetchLabData();
      } catch (error) {
        alert("Failed to delete patient");
      }
    }
  };

  // Filters
  useEffect(() => {
    let filtered = bookings;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.bookingStatus === statusFilter);
    }
    if (searchText) {
      filtered = filtered.filter(b => 
        b.bookingReference?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.patientDetails?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.patientDetails?.mobile?.includes(searchText)
      );
    }
    if (timeRange !== 'all') {
      const days = parseInt(timeRange);
      const cutoff = dayjs().subtract(days, 'days');
      filtered = filtered.filter(b => dayjs(b.createdAt).isAfter(cutoff));
    }
    
    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchText, timeRange]);

  // Stats - using totalPatients > 1 for proper group booking detection
  // Calculate today's active assignments per tech for accurate counts
  const todayStart = dayjs().startOf('day');
  const todayEnd = dayjs().endOf('day');

  const getTodayAssignedCount = (techId) => {
    return bookings.filter(b => {
      if (b.assignedTechnician?.toString() !== techId?.toString()) return false;
      const assignedAt = dayjs(b.assignedAt);
      const isToday = assignedAt.isAfter(todayStart) && assignedAt.isBefore(todayEnd);
      const isActive = ['assigned', 'sample_collected', 'in_lab', 'report_ready'].includes(b.bookingStatus);
      return isToday && isActive;
    }).length;
  };

  const totalSlotsToday = technicians.length * 6;
  const usedSlotsToday = technicians.reduce((sum, t) => sum + getTodayAssignedCount(t._id), 0);
  const availableSlotsToday = Math.max(0, totalSlotsToday - usedSlotsToday);

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.bookingStatus === 'pending').length,
    confirmedBookings: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    assignedBookings: bookings.filter(b => b.bookingStatus === 'assigned').length,
    sampleCollected: bookings.filter(b => b.bookingStatus === 'sample_collected').length,
    inLab: bookings.filter(b => b.bookingStatus === 'in_lab').length,
    reportReady: bookings.filter(b => b.bookingStatus === 'report_ready').length,
    delivered: bookings.filter(b => b.bookingStatus === 'delivered').length,
    completedBookings: bookings.filter(b => b.bookingStatus === 'completed').length,
    cancelledBookings: bookings.filter(b => b.bookingStatus === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.bookingStatus === 'completed').reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    totalTests: tests.length,
    groupBookings: bookings.filter(b => b.totalPatients && b.totalPatients > 1).length,
    activeTechnicians: technicians.filter(t => t.availability === 'available').length,
    totalTechnicians: technicians.length,
    techDailyUsed: usedSlotsToday,
    techDailyTotal: totalSlotsToday,
    techDailyAvailable: availableSlotsToday,
  };

  // Handlers
  const handleTestSubmit = async (values) => {
    setLoading(true);
    
    const { _id, ...data } = values;
    
    const success = _id 
      ? await updateTest(_id, data) 
      : await createTest(data);

    if (success) {
      setIsTestModalVisible(false);
      setEditingTest(null);
    }
    setLoading(false);
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
    setIsTestModalVisible(true);
  };

  const handleDeleteTest = (id) => {
    if (window.confirm('Delete this test?')) {
      deleteTest(id);
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsBookingModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleRefresh = () => {
    fetchLabData();
  };

  useEffect(() => {
    fetchLabData();
  }, []);

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      await fetchBookings(lab._id);
      alert("Deleted successfully");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardTab 
          bookings={bookings}
          filteredBookings={filteredBookings}
          stats={stats}
          theme={theme}
          loading={loading}
          onRefresh={handleRefresh}
          setActiveTab={setActiveTab}
          onViewBooking={handleViewBooking}
        />;
      case 'tests':
        return <TestsTab 
          tests={tests}
          searchText={searchText}
          setSearchText={setSearchText}
          lab={lab}
          theme={theme}
          onAddTest={() => { setEditingTest(null); setIsTestModalVisible(true); }}
          onEditTest={handleEditTest}
          onDeleteTest={handleDeleteTest}
        />;
      case 'bookings':
        return <BookingsTab 
          bookings={bookings}
          filteredBookings={filteredBookings}
          stats={stats}
          theme={theme}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchText={searchText}
          setSearchText={setSearchText}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          onViewBooking={handleViewBooking}
          onDeleteBooking={deleteBooking}
          technicians={technicians}
          onAssignTechnician={handleAssignTechnician}
        />;
      case 'technicians':
        return <TechniciansTab
          lab={lab}
          theme={theme}
          technicians={technicians}
          bookings={bookings}
          onRefresh={() => fetchTechnicians(lab._id)}
        />;
      case 'cities':
        return <CitiesTab
          lab={lab}
          theme={theme}
          bookings={bookings}
          technicians={technicians}
          onUpdateCities={handleUpdateCities}
        />;
      case 'patients':
        const patientsWithBookings = bookings.reduce((acc, b) => {
          if (b.patientDetails && b.patientDetails.email) {
            if (!acc.some(p => p.email === b.patientDetails.email)) {
              acc.push({ 
                ...b.patientDetails, 
                _id: b.patientDetails.email,
                bookingStatus: b.bookingStatus 
              });
            }
          }
          return acc;
        }, []);

        return <PatientsTab
          patients={patientsWithBookings}
          reports={reports}
          bookings={bookings}
          searchText={searchText}
          setSearchText={setSearchText}
          theme={theme}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeletePatient}
          onViewBooking={handleViewBooking}
        />;
      case 'collections':
        return <CollectionsTab 
          collections={collections}
          bookings={bookings}
          theme={theme}
          onAddCollection={() => { setEditingCollection(null); setIsCollectionModalVisible(true); }}
          onEditCollection={(col) => { setEditingCollection(col); setIsCollectionModalVisible(true); }}
          onDeleteCollection={handleDeleteCollection}
          onUpdateStatus={handleUpdateCollectionStatus}
          onViewBooking={handleViewBooking}
        />;
      case 'reports':
        return <ReportsTab 
          reports={reports}
          onAddReport={() => setIsReportModalVisible(true)}
          onDeleteReport={handleDeleteReport}
          theme={theme}
        />;
      case 'profile':
        return <ProfileTab 
          lab={lab}
          stats={stats}
          theme={theme}
          onEditProfile={() => setIsProfileModalVisible(true)}
        />;
      default:
        return null;
    }
  };

  if (loading && !lab) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[var(--bg-light)] border-t-[var(--primary-color)] rounded-full animate-spin mx-auto mb-4"></div>
            <p style={{ color: 'var(--primary-color)' }} className="font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error === "Lab not registered") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to Lab Dashboard</h2>
          <p className="text-gray-600 mb-6">You haven't registered your lab yet.</p>
          <button 
            onClick={() => navigate("/lab/register")}
            className="px-6 py-3 text-white rounded-lg"
            style={{ backgroundColor: theme.primary }}
          >
            Register Lab
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LabDashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lab={lab}
        stats={stats}
        theme={theme}
        onLogout={handleLogout}
      />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div>
            <h4 className="text-lg font-semibold" style={{ color: theme.secondary }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h4>
            <span className="text-xs text-gray-500">{dayjs().format('dddd, MMMM D, YYYY')}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Refresh Data"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            <button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
              Logout
            </button>
          </div>
        </header>
        
        <div className="m-6">
          {renderTabContent()}
        </div>
      </div>

      <LabDashboardModals
        isTestModalVisible={isTestModalVisible}
        setIsTestModalVisible={setIsTestModalVisible}
        isProfileModalVisible={isProfileModalVisible}
        setIsProfileModalVisible={setIsProfileModalVisible}
        isBookingModalVisible={isBookingModalVisible}
        setIsBookingModalVisible={setIsBookingModalVisible}
        isCollectionModalVisible={isCollectionModalVisible}
        setIsCollectionModalVisible={setIsCollectionModalVisible}
        isReportModalVisible={isReportModalVisible}
        setIsReportModalVisible={setIsReportModalVisible}
        isPatientModalVisible={isPatientModalVisible}
        setIsPatientModalVisible={setIsPatientModalVisible}
        editingPatient={editingPatient}
        editingCollection={editingCollection}
        selectedBooking={selectedBooking}
        editingTest={editingTest}
        lab={lab}
        tests={tests}
        bookings={bookings}
        technicians={technicians}
        logoFile={logoFile}
        setLogoFile={setLogoFile}
        theme={theme}
        loading={loading}
        onTestSubmit={handleTestSubmit}
        onPatientSubmit={handlePatientSubmit}
        onProfileSubmit={updateLabProfile}
        onUpdateStatus={updateBookingStatus}
        onScheduleCollection={handleScheduleCollection}
        onReportSubmit={handleUploadReport}
        onAssignTechnician={handleAssignTechnician}
        API_BASE_URL={API_BASE_URL}
      />
    </div>
  );
}