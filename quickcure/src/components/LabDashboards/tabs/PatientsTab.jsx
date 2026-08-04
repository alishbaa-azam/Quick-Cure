import React, { useMemo, useState } from 'react';
import { FiUser, FiSearch, FiEdit2, FiTrash2, FiFileText, FiCalendar, FiPhone, FiMail, FiMapPin, FiActivity, FiEye, FiX, FiClock as FiClockIcon, FiDollarSign, FiPackage } from 'react-icons/fi';
import { FaCheckCircle, FaClock, FaVenusMars, FaWeight, FaRuler, FaTint, FaHeartbeat, FaSyringe, FaFlask } from 'react-icons/fa';

export default function PatientsTab({ patients, reports, bookings, searchText, setSearchText, theme, onViewBooking }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Safe check - ensure patients is an array
  const patientsArray = Array.isArray(patients) ? patients : [];

  // Helper to get patient details from different possible structures
  const getPatientName = (p) => p?.name || p?.patientDetails?.name || p?.patientName || 'N/A';
  const getPatientMobile = (p) => p?.mobile || p?.patientDetails?.mobile || p?.phone || 'N/A';
  const getPatientAge = (p) => p?.age || p?.patientDetails?.age ;
  const getPatientGender = (p) => p?.gender;
  const getPatientAddress = (p) => p?.address || p?.patientDetails?.address || '';
  const getPatientBloodGroup = (p) => p?.bloodGroup || p?.patientDetails?.bloodGroup || '';
  const getPatientWeight = (p) => p?.weight || p?.patientDetails?.weight || '';
  const getPatientHeight = (p) => p?.height || p?.patientDetails?.height || '';
  const getPatientMedicalHistory = (p) => p?.medicalHistory || p?.patientDetails?.medicalHistory || '';
  const getAllergies = (p) => p?.allergies || p?.patientDetails?.allergies || '';
  const getEmergencyContact = (p) => p?.emergencyContact || p?.patientDetails?.emergencyContact || '';
  
  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Get booking details for a patient
  const getPatientBookings = (patient) => {
    if (!bookings || !Array.isArray(bookings)) return [];
    return bookings.filter(b => 
      b?.patientId?._id === patient._id || 
      b?.patientId?.email === patient.email || 
      b?.patientId === patient._id ||
      b?.patientEmail === patient.email ||
      b?.patient?.email === patient.email
    ).sort((a, b) => new Date(b.bookingDate || b.createdAt) - new Date(a.bookingDate || a.createdAt));
  };

  // Helper to get all reports for a patient
  const getPatientReports = (patient) => {
    if (!reports || !Array.isArray(reports)) return [];
    return reports.filter(r => 
      r?.patientId?._id === patient._id || 
      r?.patientId?.email === patient.email || 
      r?.patientId === patient._id ||
      r?.patientEmail === patient.email
    ).sort((a, b) => new Date(b.reportDate || b.createdAt) - new Date(a.reportDate || a.createdAt));
  };

  // Get latest report
  const getLatestReport = (patient) => {
    const patientReports = getPatientReports(patient);
    return patientReports[0];
  };

  // Handle view booking details
  const handleViewDetails = (patient) => {
    const patientBookings = getPatientBookings(patient);
    if (patientBookings.length > 0) {
      // ✅ Directly show the most recent booking details like in the Bookings Tab
      onViewBooking?.(patientBookings[0]);
    } else {
      // Fallback to patient summary if no bookings found
      setSelectedPatient(patient);
      setShowBookingModal(true);
    }
  };

  // Handle view all patient history
  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setShowBookingModal(true);
  };

  const filteredPatients = useMemo(() => {
    const search = searchText?.toLowerCase() || "";
    return patientsArray.filter(p => {
      const name = getPatientName(p).toLowerCase();
      const email = (p?.email || "").toLowerCase();
      const mobile = getPatientMobile(p).toLowerCase();
      const address = (getPatientAddress(p) || "").toLowerCase();
      const medicalHistory = (getPatientMedicalHistory(p) || "").toLowerCase();
      return !search || name.includes(search) || email.includes(search) || 
             mobile.includes(search) || address.includes(search) || 
             medicalHistory.includes(search);
    });
  }, [patientsArray, searchText]);

  // Booking Details Modal Component
  const BookingDetailsModal = ({ patient, onClose }) => {
    const patientBookings = getPatientBookings(patient);
    const patientReports = getPatientReports(patient);
    
    const getStatusColor = (status) => {
      switch(status?.toLowerCase()) {
        case 'confirmed': return 'bg-green-100 text-green-700';
        case 'pending': return 'bg-yellow-100 text-yellow-700';
        case 'cancelled': return 'bg-red-100 text-red-700';
        case 'completed': return 'bg-blue-100 text-blue-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    const getPaymentStatusColor = (status) => {
      switch(status?.toLowerCase()) {
        case 'paid': return 'bg-green-100 text-green-700';
        case 'pending': return 'bg-yellow-100 text-yellow-700';
        case 'refunded': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center" style={{ borderBottomColor: `${theme.primary}20` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                <FiUser size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <p className="text-sm text-gray-500">{getPatientName(patient)}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FiX size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Patient Information Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiUser size={18} />
                Patient Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="font-medium">{getPatientAge(patient)} yrs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="font-medium">{getPatientGender(patient)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Blood Group</p>
                  <p className="font-medium">{getPatientBloodGroup(patient) || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="font-medium">{getPatientMobile(patient)}</p>
                </div>
              </div>
            </div>

            {/* Bookings History */}
            {patientBookings.length > 0 ? (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FiCalendar size={18} />
                  Booking History ({patientBookings.length})
                </h3>
                <div className="space-y-3">
                  {patientBookings.map((booking, idx) => (
                    <div key={booking._id || idx} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">
                            Booking #{booking.bookingId || booking._id?.slice(-6) || idx + 1}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <FiCalendar size={12} />
                            {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status || 'Pending'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus || 'Pending'}
                          </span>
                          {/* Detail View Button for each booking in history */}
                          <button
                            onClick={() => {
                              onClose(); // History modal band karein
                              onViewBooking?.(booking); // Dashboard ka main detail modal kholein
                            }}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition border border-blue-100 bg-white"
                            title="View Full Booking Details"
                          >
                            <FiEye size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Tests */}
                      {booking.tests && booking.tests.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <FaFlask size={12} />
                            Tests & Packages
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {booking.tests.map((test, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-lg">
                                {test.name || test}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Booking Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {booking.slotTime && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiClockIcon size={14} />
                            <span className="text-xs">Slot: {booking.slotTime}</span>
                          </div>
                        )}
                        {booking.slotDate && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiCalendar size={14} />
                            <span className="text-xs">Date: {new Date(booking.slotDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {booking.totalAmount && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiDollarSign size={14} />
                            <span className="text-xs">Amount: ₹{booking.totalAmount}</span>
                          </div>
                        )}
                        {booking.paymentMethod && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiPackage size={14} />
                            <span className="text-xs">Payment: {booking.paymentMethod}</span>
                          </div>
                        )}
                      </div>

                      {/* Sample Collection Details */}
                      {booking.sampleCollection && (
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <FaSyringe size={12} />
                            Sample Collection
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div>Date: {new Date(booking.sampleCollection.date).toLocaleDateString()}</div>
                            <div>Time: {booking.sampleCollection.time}</div>
                            <div>Status: {booking.sampleCollection.status}</div>
                            {booking.sampleCollection.collector && <div>Collector: {booking.sampleCollection.collector}</div>}
                          </div>
                        </div>
                      )}

                      {/* Reports for this booking */}
                      {patientReports.filter(r => r.bookingId === booking._id).length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                            <FiFileText size={12} />
                            Reports Available
                          </p>
                          <div className="space-y-1">
                            {patientReports.filter(r => r.bookingId === booking._id).map((report, i) => (
                              <a key={i} href={report.reportFile?.url} target="_blank" rel="noopener noreferrer" 
                                 className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                <FiFileText size={10} />
                                {report.testName || 'Report'} - {new Date(report.reportDate || report.createdAt).toLocaleDateString()}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FiCalendar size={48} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No booking history found</p>
              </div>
            )}

            {/* Medical History Summary */}
            {(getPatientMedicalHistory(patient) || getAllergies(patient)) && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FiActivity size={18} />
                  Medical Summary
                </h3>
                {getPatientMedicalHistory(patient) && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Medical History</p>
                    <p className="text-sm text-gray-600">{getPatientMedicalHistory(patient)}</p>
                  </div>
                )}
                {getAllergies(patient) && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-700 mb-1">Allergies</p>
                    <p className="text-sm text-red-600">{getAllergies(patient)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b" style={{ borderBottomColor: `${theme.primary}20` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                <FiUser size={20} />
              </div>
              <h2 className="text-xl font-semibold">Patient Registry</h2>
              <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                {patientsArray.length} Patients
              </span>
            </div>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, email, phone, address, medical history..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                className="w-80 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {filteredPatients.map((patient) => {
            const latestReport = getLatestReport(patient);
            const allReports = getPatientReports(patient);
            const patientBookings = getPatientBookings(patient);
            
            return (
              <div key={patient._id || patient.email} className="border rounded-xl hover:shadow-lg transition-all bg-white">
                {/* Header with name and view button - like booking tab */}
                <div className="p-4 border-b relative group" style={{ borderBottomColor: `${theme.primary}20`, backgroundColor: `${theme.primary}05` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{getPatientName(patient)}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiCalendar size={12} /> {getPatientAge(patient)} yrs
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FaVenusMars size={12} /> {getPatientGender(patient)}
                        </span>
                        {getPatientBloodGroup(patient) && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <FaTint size={12} /> {getPatientBloodGroup(patient)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    
                  </div>
                </div>

                {/* Patient Details */}
                <div className="p-4 space-y-3">
                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMail className="shrink-0" size={14} />
                      <span className="text-xs truncate">{patient.email || 'No Email'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiPhone className="shrink-0" size={14} />
                      <span className="text-xs">{getPatientMobile(patient)}</span>
                    </div>
                  </div>

                  {/* Address */}
                  {getPatientAddress(patient) && (
                    <div className="flex items-start gap-2 text-gray-600">
                      <FiMapPin className="shrink-0 mt-0.5" size={14} />
                      <span className="text-xs">{getPatientAddress(patient)}</span>
                    </div>
                  )}

                  {/* Booking Summary Badge */}
                  {patientBookings.length > 0 && (
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                          <FiCalendar size={12} />
                          Total Bookings: {patientBookings.length}
                        </span>
                        <button 
                          onClick={() => handleViewHistory(patient)}
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          View All <FiEye size={10} />
                        </button>
                      </div>
                      {patientBookings[0] && (
                        <p className="text-xs text-gray-600 mt-1">
                          Last booking: {new Date(patientBookings[0].bookingDate || patientBookings[0].createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Physical Details */}
                  {(getPatientWeight(patient) || getPatientHeight(patient)) && (
                    <div className="flex items-center gap-3 pt-1">
                      {getPatientWeight(patient) && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaWeight size={12} />
                          <span>{getPatientWeight(patient)} kg</span>
                        </div>
                      )}
                      {getPatientHeight(patient) && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <FaRuler size={12} />
                          <span>{getPatientHeight(patient)} cm</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Emergency Contact */}
                  {getEmergencyContact(patient) && (
                    <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                      <FaHeartbeat size={14} />
                      <span className="font-medium">Emergency: {getEmergencyContact(patient)}</span>
                    </div>
                  )}

                  {/* Medical History Preview */}
                  {getPatientMedicalHistory(patient) && (
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FiActivity size={12} className="text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">Medical History</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{getPatientMedicalHistory(patient)}</p>
                    </div>
                  )}

                  {/* Allergies */}
                  {getAllergies(patient) && (
                    <div className="bg-red-50 p-2 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FiActivity size={12} className="text-red-500" />
                        <span className="text-xs font-semibold text-red-700">Allergies</span>
                      </div>
                      <p className="text-xs text-red-600">{getAllergies(patient)}</p>
                    </div>
                  )}

                  {/* Sample Collection Status */}
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${(['completed', 'collected'].includes(patient.bookingStatus || patient.status)) ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {(['completed', 'collected'].includes(patient.bookingStatus || patient.status)) ? <FaCheckCircle size={10} /> : <FaClock size={10} />}
                    {(['completed', 'collected'].includes(patient.bookingStatus || patient.status)) ? 'Sample Collected' : 'Collection Pending'}
                  </div>

                  {/* Reports Section */}
                  {allReports.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                          <FiFileText size={12} />
                          Reports ({allReports.length})
                        </span>
                        {allReports.length > 1 && (
                          <button className="text-xs text-blue-600 hover:underline">
                            View All
                          </button>
                        )}
                      </div>
                      
                      {/* Latest Report */}
                      {latestReport && (
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold text-blue-700">Latest Report</span>
                            <span className="text-[10px] text-gray-500">
                              {new Date(latestReport.reportDate || latestReport.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {latestReport.testName && (
                            <p className="text-xs text-gray-700 mb-1">{latestReport.testName}</p>
                          )}
                          {latestReport.reportFile?.url && (
                            <a 
                              href={latestReport.reportFile.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline"
                            >
                              <FiFileText size={10} />
                              Download Report
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPatients.length === 0 && (
          <div className="py-12 text-center">
            <FiUser size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No patients found</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showBookingModal && selectedPatient && (
        <BookingDetailsModal 
          patient={selectedPatient} 
          onClose={() => {
            setShowBookingModal(false);
            setSelectedPatient(null);
          }} 
        />
      )}
    </>
  );
}
