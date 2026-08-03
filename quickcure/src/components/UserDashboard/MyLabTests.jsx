import React, { useState, useEffect } from 'react';
import { FaFlask, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner, FaDownload, FaPrint, FaEdit, FaSave, FaTimes, FaFilePdf, FaFileImage } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const MyLabTests = ({ refreshTrigger, onStatsUpdate }) => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reports, setReports] = useState({});
  const [loadingReports, setLoadingReports] = useState({});
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    preferredDate: '',
    addressForCollection: '',
    notes: ''
  });
  const [updating, setUpdating] = useState(false);

  // Helper functions
  const getAuthToken = () => localStorage.getItem('token');
  
  const getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.email || localStorage.getItem('userEmail') || user?.user?.email;
  };

  const getUserKey = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || user?._id || user?.user?.id || getUserEmail() || 'guest';
  };

  useEffect(() => {
    fetchLabTests();
  }, [refreshTrigger]);

  // Function to save to localStorage
  const saveToLocalStorage = (bookings) => {
    const userKey = getUserKey();
    if (bookings && bookings.length > 0) {
      localStorage.setItem(`labTests_${userKey}`, JSON.stringify(bookings));
      console.log(`Saved ${bookings.length} bookings to localStorage with key: labTests_${userKey}`);
    }
  };

  // Function to load from localStorage
  const loadFromLocalStorage = () => {
    const userKey = getUserKey();
    const stored = localStorage.getItem(`labTests_${userKey}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          console.log(`Loaded ${parsed.length} bookings from localStorage`);
          setLabTests(parsed);
          if (onStatsUpdate) onStatsUpdate(parsed.length);
          return true;
        }
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    }
    return false;
  };

  const fetchLabTests = async () => {
    setLoading(true);
    setError(null);
    
    const token = getAuthToken();
    const email = getUserEmail();
    const userKey = getUserKey();
    
    console.log('=== MyLabTests Debug ===');
    console.log('Token exists:', !!token);
    console.log('Email:', email);
    console.log('UserKey:', userKey);
    
    if (!token) {
      setError('Authentication required. Please log in again.');
      setLoading(false);
      return;
    }

    // First try to load from localStorage
    const hasLocalData = loadFromLocalStorage();
    
    if (!email) {
      if (!hasLocalData) {
        setError('User email not found. Please log in again.');
      }
      setLoading(false);
      return;
    }

    // Try to fetch from API
    try {
      console.log('Fetching from API:', `${API_BASE_URL}/bookings/patient/${encodeURIComponent(email)}`);
      
      const response = await axios.get(
        `${API_BASE_URL}/bookings/patient/${encodeURIComponent(email)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('API Response:', response.data);

      if (response.data.success) {
        let bookings = response.data.allBookings || response.data.bookings || [];
        console.log('Bookings from API:', bookings.length);
        
        if (bookings.length === 0) {
          // Try alternative endpoint
          try {
            console.log('Trying alternative endpoint: /bookings/my-bookings');
            const altResponse = await axios.get(
              `${API_BASE_URL}/bookings/my-bookings`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            if (altResponse.data.success) {
              bookings = altResponse.data.allBookings || altResponse.data.bookings || [];
              console.log('Bookings from alternative API:', bookings.length);
            }
          } catch (altErr) {
            console.log('Alternative endpoint failed:', altErr.message);
          }
        }
        
        if (bookings.length > 0) {
          const transformedBookings = bookings.map(booking => ({
            _id: booking._id,
            bookingId: booking._id,
            bookingReference: booking.bookingReference,
            bookingStatus: booking.bookingStatus,
            lab: booking.lab,
            tests: booking.tests,
            patientDetails: booking.patientDetails,
            patientName: booking.patientDetails?.name,
            email: booking.patientDetails?.email,
            phone: booking.patientDetails?.mobile,
            address: booking.patientDetails?.address,
            appointmentDetails: booking.appointmentDetails,
            date: booking.appointmentDetails?.preferredDate,
            totalAmount: booking.totalAmount,
            originalAmount: booking.originalAmount,
            discountApplied: booking.discountApplied,
            amountSaved: booking.amountSaved,
            paymentStatus: booking.paymentStatus,
            notes: booking.notes,
            groupBooking: booking.groupBooking,
            groupId: booking.groupId,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
          }));
          
          setLabTests(transformedBookings);
          saveToLocalStorage(transformedBookings);
          
          if (onStatsUpdate) {
            onStatsUpdate(transformedBookings.length);
          }
        } else if (!hasLocalData) {
          setError('No lab test bookings found.');
        }
      } else if (!hasLocalData) {
        setError(response.data.error || 'Failed to fetch lab tests');
      }
    } catch (err) {
      console.error('Error fetching lab tests:', err);
      console.error('Error details:', err.response?.data);
      
      if (!hasLocalData) {
        if (err.response?.status === 404) {
          setError('No bookings found. Book your first lab test!');
        } else if (err.response?.status === 401) {
          setError('Session expired. Please login again.');
        } else {
          setError(err.response?.data?.error || 'Network error. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Add a test booking for debugging (remove in production)
  const addTestBooking = () => {
    const testBooking = {
      _id: 'test_' + Date.now(),
      bookingReference: 'TEST' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      bookingStatus: 'pending',
      lab: {
        name: 'Test Lab',
        logo: null,
        branches: 'Main Branch',
        address: 'Test Address, Karachi'
      },
      tests: [{ name: 'Complete Blood Count', price: 1000 }, { name: 'Blood Sugar', price: 500 }],
      patientDetails: {
        name: 'Test Patient',
        email: getUserEmail(),
        mobile: '03001234567',
        address: 'Test Address'
      },
      appointmentDetails: {
        preferredDate: new Date().toISOString(),
        addressForCollection: 'Test Collection Address'
      },
      totalAmount: 1500,
      originalAmount: 1500,
      discountApplied: 0,
      amountSaved: 0,
      paymentStatus: 'pending',
      notes: 'Test booking for debugging'
    };
    
    const userKey = getUserKey();
    const existing = JSON.parse(localStorage.getItem(`labTests_${userKey}`) || '[]');
    existing.push(testBooking);
    localStorage.setItem(`labTests_${userKey}`, JSON.stringify(existing));
    
    setLabTests(existing);
    if (onStatsUpdate) onStatsUpdate(existing.length);
    alert('Test booking added for debugging!');
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setEditFormData({
      name: booking.patientDetails?.name || booking.patientName || '',
      email: booking.patientDetails?.email || booking.email || '',
      mobile: booking.patientDetails?.mobile || booking.phone || '',
      address: booking.patientDetails?.address || booking.address || '',
      preferredDate: booking.appointmentDetails?.preferredDate ? 
        new Date(booking.appointmentDetails.preferredDate).toISOString().split('T')[0] : 
        (booking.date ? new Date(booking.date).toISOString().split('T')[0] : ''),
      addressForCollection: booking.appointmentDetails?.addressForCollection || 
                           booking.patientDetails?.address || 
                           booking.address || '',
      notes: booking.notes || ''
    });
    setIsEditing(false);
    setShowDetailsModal(true);
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditFormData({
      name: selectedBooking.patientDetails?.name || selectedBooking.patientName || '',
      email: selectedBooking.patientDetails?.email || selectedBooking.email || '',
      mobile: selectedBooking.patientDetails?.mobile || selectedBooking.phone || '',
      address: selectedBooking.patientDetails?.address || selectedBooking.address || '',
      preferredDate: selectedBooking.appointmentDetails?.preferredDate ? 
        new Date(selectedBooking.appointmentDetails.preferredDate).toISOString().split('T')[0] : 
        (selectedBooking.date ? new Date(selectedBooking.date).toISOString().split('T')[0] : ''),
      addressForCollection: selectedBooking.appointmentDetails?.addressForCollection || 
                           selectedBooking.patientDetails?.address || 
                           selectedBooking.address || '',
      notes: selectedBooking.notes || ''
    });
    setIsEditing(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    setUpdating(true);
    setError(null);
    
    const token = getAuthToken();
    const bookingId = selectedBooking.bookingReference || selectedBooking._id;
    
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/bookings/${bookingId}/update`,
        {
          patientDetails: {
            name: editFormData.name,
            email: editFormData.email,
            mobile: editFormData.mobile,
            address: editFormData.address
          },
          appointmentDetails: {
            preferredDate: editFormData.preferredDate,
            addressForCollection: editFormData.addressForCollection
          },
          notes: editFormData.notes
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const updatedBooking = {
          ...selectedBooking,
          patientDetails: {
            ...selectedBooking.patientDetails,
            name: editFormData.name,
            email: editFormData.email,
            mobile: editFormData.mobile,
            address: editFormData.address
          },
          appointmentDetails: {
            ...selectedBooking.appointmentDetails,
            preferredDate: editFormData.preferredDate,
            addressForCollection: editFormData.addressForCollection
          },
          patientName: editFormData.name,
          email: editFormData.email,
          phone: editFormData.mobile,
          address: editFormData.address,
          date: editFormData.preferredDate,
          notes: editFormData.notes
        };
        
        setSelectedBooking(updatedBooking);
        const updatedTests = labTests.map(test => 
          (test._id === selectedBooking._id || test.bookingReference === selectedBooking.bookingReference) 
            ? updatedBooking 
            : test
        );
        setLabTests(updatedTests);
        saveToLocalStorage(updatedTests);
        
        setIsEditing(false);
        alert('Booking updated successfully!');
      } else {
        setError(response.data.error || 'Failed to update booking');
      }
    } catch (err) {
      console.error('Error updating booking:', err);
      setError(err.response?.data?.error || 'Failed to update booking');
    } finally {
      setUpdating(false);
    }
  };

  const fetchBookingReports = async (bookingId) => {
    if (!bookingId || reports[bookingId]) return;
    setLoadingReports(prev => ({ ...prev, [bookingId]: true }));
    const token = getAuthToken();
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/booking/${bookingId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setReports(prev => ({ ...prev, [bookingId]: response.data.reports }));
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoadingReports(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleDownloadReport = (report) => {
    if (report.reportFile?.url) {
      const url = report.reportFile.url.startsWith('http') ? report.reportFile.url : `http://localhost:5000${report.reportFile.url}`;
      window.open(url, '_blank');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this test booking?')) return;
    
    const token = getAuthToken();
    
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        await fetchLabTests();
        setShowDetailsModal(false);
        alert('Booking cancelled successfully!');
      } else {
        setError(response.data.error || 'Failed to cancel booking');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err.response?.data?.error || 'Failed to cancel booking');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-PK', options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-PK', options);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary-color)' }}>
          My Lab Tests
        </h2>
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-3xl" style={{ color: 'var(--primary-color)' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--secondary-color)' }}>
            My Lab Tests
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--accent-color)' }}>
            View and manage your lab test bookings
          </p>
        </div>
        <div className="flex gap-2">
          {/* Debug button - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={addTestBooking}
              className="px-3 py-1 text-xs rounded-lg border bg-yellow-50"
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Add Test Booking
            </button>
          )}
          <button
            onClick={fetchLabTests}
            className="px-3 py-1 text-sm rounded-lg border flex items-center gap-2"
            style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
          >
            <FaSpinner className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error && labTests.length === 0 && (
        <div className="mx-6 mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
          <button 
            onClick={fetchLabTests}
            className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="p-6">
        {labTests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FaFlask className="text-3xl" style={{ color: 'var(--accent-color)' }} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Lab Tests</h3>
            <p className="text-sm text-gray-500 mb-4">You haven't booked any lab tests yet</p>
            <button 
              className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition"
              style={{ backgroundColor: 'var(--primary-color)' }}
              onClick={() => window.location.href = '/labs'}
            >
              Book Lab Test
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {labTests.map((booking) => (
              <div 
                key={booking._id || booking.bookingReference}
                className="border rounded-xl p-5 hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--bg-light)' }}
              >
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      {booking.lab?.logo ? (
                        <img 
                          src={booking.lab.logo.startsWith('http') ? booking.lab.logo : `http://localhost:5000/uploads/${booking.lab.logo}`} 
                          alt={booking.lab.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/48?text=Lab";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaFlask className="text-xl" style={{ color: 'var(--accent-color)' }} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--secondary-color)' }}>
                        {booking.lab?.name || 'Lab Test'}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--accent-color)' }}>
                        Ref: {booking.bookingReference || booking._id?.slice(-8)}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(booking.bookingStatus)}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Tests booked:</p>
                  <div className="flex flex-wrap gap-2">
                    {(booking.tests || []).map((test, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: 'var(--bg-light)', color: 'var(--secondary-color)' }}
                      >
                        {typeof test === 'object' ? test.name : test}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-xs" style={{ color: 'var(--accent-color)' }} />
                    <div>
                      <p className="text-xs text-gray-500">Appointment</p>
                      <p className="text-sm font-medium">
                        {formatDate(booking.appointmentDetails?.preferredDate || booking.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-xs" style={{ color: 'var(--accent-color)' }} />
                    <div>
                      <p className="text-xs text-gray-500">Patient</p>
                      <p className="text-sm font-medium">{booking.patientDetails?.name || booking.patientName}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'var(--bg-light)' }}>
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
                      Rs {booking.totalAmount || 0}
                    </p>
                  </div>
                  <button 
                    className="px-4 py-2 text-sm rounded-lg border transition flex items-center gap-2"
                    style={{ 
                      borderColor: 'var(--primary-color)', 
                      color: 'var(--primary-color)',
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => handleViewDetails(booking)}
                  >
                    <FaEdit className="text-sm" />
                    View & Edit Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Keep as is */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                {isEditing ? 'Edit Lab Test Booking' : 'Lab Test Booking Details'}
              </h3>
              <div className="flex gap-2">
                {!isEditing && (selectedBooking.bookingStatus === 'pending' || selectedBooking.bookingStatus === 'confirmed') && (
                  <button 
                    onClick={handleEditToggle}
                    className="p-2 hover:bg-gray-100 rounded-full text-blue-600"
                  >
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Lab Info */}
              {selectedBooking.lab && (
                <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                  <img 
                    src={selectedBooking.lab.logo ? (selectedBooking.lab.logo.startsWith('http') ? selectedBooking.lab.logo : `http://localhost:5000/uploads/${selectedBooking.lab.logo}`) : 'https://via.placeholder.com/60?text=Lab'} 
                    alt={selectedBooking.lab.name} 
                    className="w-16 h-16 object-contain rounded" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/60?text=Lab";
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{selectedBooking.lab.name}</h4>
                    <p className="text-sm text-gray-600">{selectedBooking.lab.branches}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedBooking.lab.address}</p>
                  </div>
                </div>
              )}

              {/* Booking Reference */}
              <div className="text-center p-3 rounded-lg border" style={{ borderColor: 'var(--primary-color)' }}>
                <p className="text-xs text-gray-500">Booking Reference</p>
                <p className="text-lg font-mono font-bold" style={{ color: 'var(--primary-color)' }}>
                  {selectedBooking.bookingReference || selectedBooking._id}
                </p>
              </div>

              {/* Rest of the modal remains same */}
              <div>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Patient Information</h4>
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 flex items-center"><FaUser className="mr-1" /> Name</p>
                    {isEditing ? (
                      <input type="text" name="name" value={editFormData.name} onChange={handleEditInputChange} className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{selectedBooking.patientDetails?.name || selectedBooking.patientName}</p>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 flex items-center"><FaPhone className="mr-1" /> Mobile</p>
                    {isEditing ? (
                      <input type="tel" name="mobile" value={editFormData.mobile} onChange={handleEditInputChange} className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{selectedBooking.patientDetails?.mobile || selectedBooking.phone}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 flex items-center"><FaEnvelope className="mr-1" /> Email</p>
                    {isEditing ? (
                      <input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{selectedBooking.patientDetails?.email || selectedBooking.email}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 flex items-center"><FaMapMarkerAlt className="mr-1" /> Address</p>
                    {isEditing ? (
                      <textarea name="address" value={editFormData.address} onChange={handleEditInputChange} rows="2" className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{selectedBooking.patientDetails?.address || selectedBooking.address}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Tests Booked</h4>
                <div className="space-y-2">
                  {(selectedBooking.tests || []).map((test, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">{typeof test === 'object' ? test.name : test}</span>
                      <span className="text-sm" style={{ color: 'var(--primary-color)' }}>Rs {typeof test === 'object' ? test.price : 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reports Section - Only for completed bookings */}
              {selectedBooking.bookingStatus === 'completed' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium" style={{ color: 'var(--secondary-color)' }}>Lab Reports</h4>
                    <button
                      onClick={() => fetchBookingReports(selectedBooking._id)}
                      className="text-xs px-3 py-1 rounded-lg border flex items-center gap-1"
                      style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                    >
                      {loadingReports[selectedBooking._id] ? <FaSpinner className="animate-spin" /> : <FaDownload size={10} />}
                      {loadingReports[selectedBooking._id] ? 'Loading...' : 'Load Reports'}
                    </button>
                  </div>
                  {loadingReports[selectedBooking._id] ? (
                    <div className="flex justify-center py-4">
                      <FaSpinner className="animate-spin text-lg" style={{ color: 'var(--primary-color)' }} />
                    </div>
                  ) : reports[selectedBooking._id] && reports[selectedBooking._id].length > 0 ? (
                    <div className="space-y-2">
                      {reports[selectedBooking._id].map((report, idx) => (
                        <div key={report._id || idx} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                          <div className="flex items-center gap-2">
                            {report.reportFile?.mimeType?.includes('pdf') ? (
                              <FaFilePdf className="text-red-500" />
                            ) : (
                              <FaFileImage className="text-blue-500" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{report.testId?.name || report.reportFile?.originalName || `Report ${idx + 1}`}</p>
                              <p className="text-xs text-gray-500">{report.reportDate ? formatDate(report.reportDate) : ''}</p>
                            </div>
                          </div>
                          {report.reportFile?.url && (
                            <button
                              onClick={() => handleDownloadReport(report)}
                              className="px-3 py-1.5 text-xs rounded-lg text-white flex items-center gap-1"
                              style={{ backgroundColor: 'var(--primary-color)' }}
                            >
                              <FaDownload size={10} />
                              Download
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : reports[selectedBooking._id] ? (
                    <p className="text-sm text-gray-400 text-center py-3">No reports uploaded yet</p>
                  ) : null}
                </div>
              )}

              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Appointment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Preferred Date</p>
                    {isEditing ? (
                      <input type="date" name="preferredDate" value={editFormData.preferredDate} onChange={handleEditInputChange} min={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{formatDate(selectedBooking.appointmentDetails?.preferredDate || selectedBooking.date)}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium">{formatTime(selectedBooking.appointmentDetails?.preferredDate || selectedBooking.date)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Collection Address</p>
                    {isEditing ? (
                      <textarea name="addressForCollection" value={editFormData.addressForCollection} onChange={handleEditInputChange} rows="2" className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{selectedBooking.appointmentDetails?.addressForCollection || selectedBooking.patientDetails?.address || selectedBooking.address}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Additional Notes</p>
                    {isEditing ? (
                      <textarea name="notes" value={editFormData.notes} onChange={handleEditInputChange} rows="2" placeholder="Any special instructions or notes..." className="w-full mt-1 p-2 border rounded-lg" disabled={updating} />
                    ) : (
                      <p className="font-medium">{selectedBooking.notes || 'No notes provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Original Amount</span>
                    <span>Rs {selectedBooking.originalAmount || selectedBooking.totalAmount}</span>
                  </div>
                  {selectedBooking.discountApplied > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({selectedBooking.discountApplied}%)</span>
                      <span>-Rs {selectedBooking.amountSaved || 0}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total Amount</span>
                    <span className="text-lg" style={{ color: 'var(--primary-color)' }}>Rs {selectedBooking.totalAmount || 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {isEditing ? (
                  <>
                    <button className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition flex items-center justify-center gap-2" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} onClick={handleCancelEdit} disabled={updating}>
                      <FaTimes /> Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg text-white text-sm font-medium transition flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--primary-color)' }} onClick={handleSaveEdit} disabled={updating}>
                      {updating ? <><FaSpinner className="animate-spin" /> Saving...</> : <><FaSave /> Save Changes</>}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition flex items-center justify-center gap-2" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }} onClick={() => window.print()}>
                      <FaPrint /> Print
                    </button>
                    {selectedBooking.bookingStatus !== 'cancelled' && selectedBooking.bookingStatus !== 'completed' && (
                      <button className="flex-1 px-4 py-2 rounded-lg text-white text-sm font-medium transition" style={{ backgroundColor: 'var(--accent-color)' }} onClick={() => handleCancelBooking(selectedBooking.bookingReference || selectedBooking._id)}>
                        Cancel Booking
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLabTests;