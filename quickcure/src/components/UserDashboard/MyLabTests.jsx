import React, { useState, useEffect } from 'react';
import { FaFlask, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner, FaDownload, FaPrint } from 'react-icons/fa';
import { getUserLabTests, cancelLabBooking } from '../../api/userApi';

const MyLabTests = ({ refreshTrigger }) => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchLabTests();
  }, [refreshTrigger]);

  const fetchLabTests = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getUserLabTests();
    
    if (result.success) {
      setLabTests(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this test booking?')) {
      const result = await cancelLabBooking(bookingId);
      if (result.success) {
        await fetchLabTests();
      } else {
        setError(result.error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-PK', options);
  };

  const formatTime = (dateString) => {
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
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--secondary-color)' }}>
          My Lab Tests
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--accent-color)' }}>
          View your lab test bookings
        </p>
      </div>

      {/* Error Message */}
      {error && (
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

      {/* Lab Tests List */}
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
                key={booking._id || booking.bookingId}
                className="border rounded-xl p-5 hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--bg-light)' }}
              >
                {/* Header with Status */}
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      {booking.lab?.logo ? (
                        <img 
                          src={booking.lab.logo} 
                          alt={booking.lab.name}
                          className="w-full h-full object-contain"
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

                {/* Test Details */}
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

                {/* Date and Patient Info */}
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

                {/* Price */}
                <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'var(--bg-light)' }}>
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
                      Rs {booking.totalAmount || 0}
                    </p>
                  </div>
                  <button 
                    className="px-4 py-2 text-sm rounded-lg border transition"
                    style={{ 
                      borderColor: 'var(--primary-color)', 
                      color: 'var(--primary-color)',
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => handleViewDetails(booking)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                Lab Test Booking Details
              </h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Lab Info */}
              {selectedBooking.lab && (
                <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                  <img 
                    src={selectedBooking.lab.logo || 'https://via.placeholder.com/60'} 
                    alt={selectedBooking.lab.name}
                    className="w-16 h-16 object-contain rounded"
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

              {/* Patient Details */}
              <div>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Patient Information</h4>
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaUser className="mr-1" /> Name
                    </p>
                    <p className="font-medium">{selectedBooking.patientDetails?.name || selectedBooking.patientName}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaPhone className="mr-1" /> Mobile
                    </p>
                    <p className="font-medium">{selectedBooking.patientDetails?.mobile || selectedBooking.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaEnvelope className="mr-1" /> Email
                    </p>
                    <p className="font-medium">{selectedBooking.patientDetails?.email || selectedBooking.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" /> Address
                    </p>
                    <p className="font-medium">{selectedBooking.patientDetails?.address || selectedBooking.address}</p>
                  </div>
                </div>
              </div>

              {/* Tests List */}
              <div>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Tests Booked</h4>
                <div className="space-y-2">
                  {(selectedBooking.tests || []).map((test, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">
                        {typeof test === 'object' ? test.name : test}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--primary-color)' }}>
                        Rs {typeof test === 'object' ? test.price : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Details */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-light)' }}>
                <h4 className="font-medium mb-3" style={{ color: 'var(--secondary-color)' }}>Appointment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Preferred Date</p>
                    <p className="font-medium">
                      {formatDate(selectedBooking.appointmentDetails?.preferredDate || selectedBooking.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium">
                      {formatTime(selectedBooking.appointmentDetails?.preferredDate || selectedBooking.date)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Collection Address</p>
                    <p className="font-medium">
                      {selectedBooking.appointmentDetails?.addressForCollection || 
                       selectedBooking.patientDetails?.address || 
                       selectedBooking.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
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
                    <span className="text-lg" style={{ color: 'var(--primary-color)' }}>
                      Rs {selectedBooking.totalAmount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button 
                  className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium transition flex items-center justify-center"
                  style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                  onClick={() => window.print()}
                >
                  <FaPrint className="mr-2" />
                  Print
                </button>
                {selectedBooking.bookingStatus !== 'cancelled' && selectedBooking.bookingStatus !== 'completed' && (
                  <button 
                    className="flex-1 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                    onClick={() => handleCancelBooking(selectedBooking._id)}
                  >
                    Cancel Booking
                  </button>
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