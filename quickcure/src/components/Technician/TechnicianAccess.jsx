import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const API_BASE_URL = 'http://localhost:5000/api';

export default function TechnicianAccess() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [token]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/technicians/magic-link/${token}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired link');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCollected = async () => {
    try {
      setUpdating(true);
      const response = await axios.patch(`${API_BASE_URL}/technicians/update-status/${token}`, {
        status: 'sample_collected'
      });
      setSuccess('Sample marked as collected successfully! ✅');
      // Refresh data
      await fetchBookingDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkInLab = async () => {
    try {
      setUpdating(true);
      const response = await axios.patch(`${API_BASE_URL}/technicians/update-status/${token}`, {
        status: 'in_lab'
      });
      setSuccess('Sample marked as received in lab! ✅');
      await fetchBookingDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkDelivered = async () => {
    try {
      setUpdating(true);
      const response = await axios.patch(`${API_BASE_URL}/technicians/update-status/${token}`, {
        status: 'delivered'
      });
      setSuccess('Report delivered to patient! ✅');
      await fetchBookingDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid or Expired Link</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const booking = data?.booking;
  const technician = data?.technician;
  const collection = data?.collection;
  const currentStatus = booking?.bookingStatus;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">👨‍🔬</div>
            <div>
              <h1 className="text-xl font-bold">Technician Access Portal</h1>
              <p className="text-teal-100 text-sm">{technician?.name} — {technician?.city}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && data && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
            <span className="text-2xl">❌</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Booking Card */}
        <div className="bg-white rounded-2xl shadow-md border overflow-hidden mb-6">
          <div className="p-6 border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Sample Collection Task</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentStatus === 'sample_collected' ? 'bg-teal-100 text-teal-800' :
                currentStatus === 'in_lab' ? 'bg-indigo-100 text-indigo-800' :
                currentStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                currentStatus === 'assigned' ? 'bg-purple-100 text-purple-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {currentStatus?.toUpperCase() || 'ASSIGNED'}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Patient Info */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Patient Details</h3>
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-semibold text-gray-800">{booking?.patientDetails?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="font-semibold text-gray-800">{booking?.patientDetails?.mobile || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-semibold text-gray-800">{booking?.patientDetails?.address || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">City</p>
                    <p className="font-semibold text-gray-800">{booking?.serviceCity || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Reference */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Booking Reference</p>
                <p className="font-mono font-bold text-gray-800">{booking?.bookingReference || 'N/A'}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Appointment Date</p>
                <p className="font-semibold text-gray-800">
                  {booking?.appointmentDetails?.preferredDate
                    ? dayjs(booking.appointmentDetails.preferredDate).format('DD MMM YYYY')
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Tests */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tests to Collect</h3>
              <div className="space-y-2">
                {(booking?.tests || []).map((test, i) => {
                  const name = test?.name || test?.test?.name || test?.testId?.name || `Test ${i + 1}`;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">
                        {i + 1}
                      </div>
                      <span className="font-medium text-gray-700">{name}</span>
                    </div>
                  );
                })}
                {(!booking?.tests || booking.tests.length === 0) && (
                  <p className="text-gray-400 text-sm italic">No tests assigned</p>
                )}
              </div>
            </div>

            {/* Collection Info */}
            {collection && (
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Collection Details</h3>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Scheduled Date</p>
                      <p className="font-semibold">{collection.scheduledDate ? dayjs(collection.scheduledDate).format('DD MMM YYYY') : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time Slot</p>
                      <p className="font-semibold capitalize">{collection.scheduledTimeSlot || 'Morning'}</p>
                    </div>
                    {collection.specialInstructions && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Instructions</p>
                        <p className="font-semibold">{collection.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Update Status</h3>
              <div className="flex flex-wrap gap-3">
                {currentStatus === 'assigned' && (
                  <button
                    onClick={handleMarkCollected}
                    disabled={updating}
                    className="flex-1 min-w-[200px] px-6 py-4 bg-teal-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-600/30 hover:bg-teal-700 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>🧪</span> Mark as Collected
                      </>
                    )}
                  </button>
                )}

                {currentStatus === 'sample_collected' && (
                  <button
                    onClick={handleMarkInLab}
                    disabled={updating}
                    className="flex-1 min-w-[200px] px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>🔬</span> Received in Lab
                      </>
                    )}
                  </button>
                )}

                {currentStatus === 'in_lab' && (
                  <button
                    onClick={handleMarkDelivered}
                    disabled={updating}
                    className="flex-1 min-w-[200px] px-6 py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/30 hover:bg-green-700 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>📨</span> Mark as Delivered
                      </>
                    )}
                  </button>
                )}

                {(currentStatus === 'delivered' || currentStatus === 'completed') && (
                  <div className="w-full p-6 bg-green-50 rounded-xl text-center">
                    <span className="text-4xl">🎉</span>
                    <p className="text-green-800 font-bold text-lg mt-2">Task Completed!</p>
                    <p className="text-green-600 text-sm">This booking has been fully processed.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400">
          <p>QuickCure Healthcare System — Technician Portal</p>
          <p className="mt-1">This link will expire in 48 hours from assignment.</p>
        </div>
      </div>
    </div>
  );
}