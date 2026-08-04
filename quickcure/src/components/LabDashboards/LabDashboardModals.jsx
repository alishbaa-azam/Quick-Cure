import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function LabDashboardModals({
  isTestModalVisible,
  setIsTestModalVisible,
  isProfileModalVisible,
  setIsProfileModalVisible,
  isBookingModalVisible,
  setIsBookingModalVisible,
  isCollectionModalVisible,
  setIsCollectionModalVisible,
  isReportModalVisible,
  setIsReportModalVisible,
  isPatientModalVisible,
  setIsPatientModalVisible,
  selectedBooking,
  editingCollection,
  editingTest,
  editingPatient,
  lab,
  tests,
  bookings,
  reports,
  logoFile,
  setLogoFile,
  theme,
  loading,
  onTestSubmit,
  onPatientSubmit,
  onProfileSubmit,
  onUpdateStatus,
  onScheduleCollection,
  onReportSubmit,
  isPatientEdit = false
}) {
  const primary = theme?.primary || "#0d9488";
  const success = theme?.success || "#16a34a";

  const [testForm, setTestForm] = useState({
    _id: '',
    name: '',
    description: '',
    price: '',
    email: '',
    mobile: '',
    age: '',
    gender: 'Male'
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    branches: '',
    discount: 0,
    serviceCities: [],
    serviceCitiesInput: ''
  });

  const [scheduleForm, setScheduleForm] = useState({
    bookingId: '',
    scheduledDate: '',
    scheduledTimeSlot: 'morning',
    specialInstructions: '',
    patientCondition: '',
    fastingRequired: false,
    fastingHours: 8
  });

  const [reportForm, setReportForm] = useState({
    bookingId: '',
    testId: '',
    reportFile: null,
    reportData: ''
  });

  useEffect(() => {
    if (isTestModalVisible || isPatientModalVisible) {
      const activeItem = editingPatient || editingTest;
      if (activeItem) {
        setTestForm({
          _id: activeItem._id || '',
          name: activeItem.name || '',
          description: activeItem.description || '',
          price: activeItem.price || '',
          email: activeItem.email || '',
          mobile: activeItem.mobile || '',
          age: activeItem.age || '',
          gender: activeItem.gender || 'Male'
        });
      } else {
        setTestForm({ _id: '', name: '', description: '', price: '', email: '', mobile: '', age: '', gender: 'Male' });
      }
    }
  }, [isTestModalVisible, isPatientModalVisible, editingTest, editingPatient]);

  useEffect(() => {
    if (isProfileModalVisible && lab) {
      setProfileForm({
        name: lab.name || '',
        branches: lab.branches || '',
        discount: lab.discount || 0,
        serviceCities: lab.serviceCities || [],
        serviceCitiesInput: (lab.serviceCities || []).join(', ')
      });
    }
  }, [isProfileModalVisible, lab]);

  useEffect(() => {
    if (isCollectionModalVisible) {
      if (editingCollection) {
        setScheduleForm({
          _id: editingCollection._id,
          bookingId: editingCollection.bookingId?._id || editingCollection.bookingId,
          scheduledDate: dayjs(editingCollection.scheduledDate).format('YYYY-MM-DD'),
          scheduledTimeSlot: editingCollection.scheduledTimeSlot || 'morning',
          specialInstructions: editingCollection.specialInstructions || '',
          patientCondition: editingCollection.patientCondition || '',
          fastingRequired: editingCollection.fastingRequired || false,
          fastingHours: editingCollection.fastingHours || 8
        });
      } else {
        const firstConfirmed = bookings?.find(b => b.bookingStatus?.toLowerCase() === 'confirmed');
        setScheduleForm({
          bookingId: firstConfirmed?._id || '',
          scheduledDate: firstConfirmed?.appointmentDetails?.preferredDate 
            ? dayjs(firstConfirmed.appointmentDetails.preferredDate).format('YYYY-MM-DD') 
            : dayjs().format('YYYY-MM-DD'),
          scheduledTimeSlot: 'morning',
          specialInstructions: '',
          patientCondition: '',
          fastingRequired: false,
          fastingHours: 8
        });
      }
    }
  }, [isCollectionModalVisible, editingCollection, bookings]);

  useEffect(() => {
    if (isCollectionModalVisible && scheduleForm.bookingId && !editingCollection) {
      const selected = bookings?.find(b => b._id === scheduleForm.bookingId);
      if (selected?.appointmentDetails?.preferredDate) {
        setScheduleForm(prev => ({
          ...prev,
          scheduledDate: dayjs(selected.appointmentDetails.preferredDate).format('YYYY-MM-DD')
        }));
      }
    }
  }, [scheduleForm.bookingId, bookings, isCollectionModalVisible, editingCollection]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  const isPatientEditMode = isPatientEdit || isPatientModalVisible;
  const activeTestModal = isTestModalVisible || isPatientModalVisible;

  return (
    <>
      {activeTestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isPatientEditMode ? 'Edit Patient Details' : editingTest ? 'Edit Test' : 'Add New Test'}
            </h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              const submitHandler = isPatientEditMode ? onPatientSubmit : onTestSubmit;
              submitHandler?.(isPatientEditMode ? testForm : { ...testForm, price: Number(testForm.price) });
            }}>
              
              <input
                type="text"
                placeholder={isPatientEditMode ? "Patient Name" : "Test Name"}
                value={testForm.name}
                onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
                required
              />

              {isPatientEditMode ? (
                <>
                  <input type="email" placeholder="Email" value={testForm.email} onChange={(e) => setTestForm({ ...testForm, email: e.target.value })} className="w-full mb-3 px-3 py-2 border rounded-lg" required />
                  <input type="text" placeholder="Mobile Number" value={testForm.mobile} onChange={(e) => setTestForm({ ...testForm, mobile: e.target.value })} className="w-full mb-3 px-3 py-2 border rounded-lg" required />
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <input type="number" placeholder="Age" value={testForm.age} onChange={(e) => setTestForm({ ...testForm, age: e.target.value })} className="px-3 py-2 border rounded-lg" required />
                    <select value={testForm.gender} onChange={(e) => setTestForm({ ...testForm, gender: e.target.value })} className="px-3 py-2 border rounded-lg">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <textarea placeholder="Description" value={testForm.description} onChange={(e) => setTestForm({ ...testForm, description: e.target.value })} className="w-full mb-3 px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Price (₨)" value={testForm.price} onChange={(e) => setTestForm({ ...testForm, price: e.target.value })} className="w-full mb-4 px-3 py-2 border rounded-lg" required />
                </>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => { setIsTestModalVisible(false); setIsPatientModalVisible?.(false); }} className="flex-1 border py-2 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 text-white py-2 rounded-lg" style={{ backgroundColor: primary }}>{isPatientEditMode ? 'Save Changes' : editingTest ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isProfileModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Lab Profile</h3>
            <form onSubmit={(e) => { e.preventDefault(); onProfileSubmit({ ...profileForm, discount: Number(profileForm.discount) }); setIsProfileModalVisible(false); }}>
              <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full mb-3 px-3 py-2 border rounded-lg" />
              <input type="text" value={profileForm.branches} onChange={(e) => setProfileForm({ ...profileForm, branches: e.target.value })} className="w-full mb-3 px-3 py-2 border rounded-lg" />
              <input type="number" value={profileForm.discount} onChange={(e) => setProfileForm({ ...profileForm, discount: e.target.value })} className="w-full mb-3 px-3 py-2 border rounded-lg" />
              
              {/* Service Cities - Manual comma-separated input */}
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Service Cities</label>
                <input
                  type="text"
                  value={profileForm.serviceCitiesInput}
                  onChange={(e) => {
                    const input = e.target.value;
                    const cities = input.split(',').map(c => c.trim()).filter(c => c);
                    setProfileForm({ 
                      ...profileForm, 
                      serviceCitiesInput: input,
                      serviceCities: cities 
                    });
                  }}
                  placeholder="e.g. Karachi, Lahore, Islamabad"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <p className="text-xs text-gray-400 mt-1">Enter city names separated by commas</p>
                {profileForm.serviceCities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profileForm.serviceCities.map((city, i) => (
                      <span key={i} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-xs border border-teal-200">
                        {city}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <input type="file" onChange={(e) => setLogoFile(e.target.files[0])} className="w-full mb-4" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsProfileModalVisible(false)} className="flex-1 border py-2 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 text-white py-2 rounded-lg" style={{ backgroundColor: primary }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isBookingModalVisible && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Complete Booking Details</h3>
              <button onClick={() => setIsBookingModalVisible(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                {/* Booking Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Booking Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Reference</span>
                      <span className="font-mono font-medium">{selectedBooking.bookingReference || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[selectedBooking.bookingStatus] || 'bg-gray-100'}`}>{selectedBooking.bookingStatus?.toUpperCase() || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Payment</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${selectedBooking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : selectedBooking.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{selectedBooking.paymentStatus?.toUpperCase() || "PENDING"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Created At</span>
                      <span>{selectedBooking.createdAt ? dayjs(selectedBooking.createdAt).format('DD MMM YYYY, hh:mm A') : "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Appointment Date</span>
                      <span>{selectedBooking.appointmentDetails?.preferredDate ? dayjs(selectedBooking.appointmentDetails.preferredDate).format('DD MMM YYYY') : "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">City</span>
                      {selectedBooking.serviceCity ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-700 rounded text-xs font-medium">{selectedBooking.serviceCity}</span>
                      ) : <span className="text-gray-400">-</span>}
                    </div>
                    {selectedBooking.groupBooking && selectedBooking.totalPatients > 1 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Group</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-medium">Patient {selectedBooking.patientIndex} of {selectedBooking.totalPatients}</span>
                      </div>
                    )}
                    {selectedBooking.groupId && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Group ID</span>
                        <span className="font-mono text-xs">{selectedBooking.groupId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Patient Details */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Patient Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium">{selectedBooking.patientDetails?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Mobile</span>
                      <span>{selectedBooking.patientDetails?.mobile || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Email</span>
                      <span className="text-blue-600">{selectedBooking.patientDetails?.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Age / Gender</span>
                      <span>{selectedBooking.patientDetails?.age || "N/A"} / {selectedBooking.patientDetails?.gender || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Address</span>
                      <span className="text-right max-w-[200px]">{selectedBooking.patientDetails?.address || "N/A"}</span>
                    </div>
                    {selectedBooking.appointmentDetails?.addressForCollection && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Collection Address</span>
                        <span className="text-right max-w-[200px]">{selectedBooking.appointmentDetails.addressForCollection}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technician Info */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Technician Assignment</h4>
                  {selectedBooking.assignedTechnician ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Technician ID</span>
                        <span className="font-mono text-xs">{typeof selectedBooking.assignedTechnician === 'object' ? selectedBooking.assignedTechnician.name : selectedBooking.assignedTechnician.toString().slice(-8)}</span>
                      </div>
                      {selectedBooking.assignedAt && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Assigned At</span>
                          <span>{dayjs(selectedBooking.assignedAt).format('DD MMM YYYY, hh:mm A')}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No technician assigned yet</p>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                {/* Tests & Payment */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tests</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto mb-3 pr-1">
                    {(() => {
                      const tests = Array.isArray(selectedBooking.tests) ? selectedBooking.tests : selectedBooking.testDetails ? selectedBooking.testDetails : [];
                      if (tests.length === 0) return <p className="text-gray-400 text-sm italic">No tests found</p>;
                      return tests.map((t, i) => {
                        const name = t?.name || t?.test?.name || t?.testId?.name || "Unnamed Test";
                        const price = t?.price || t?.test?.price || t?.testId?.price || 0;
                        return (
                          <div key={i} className="flex justify-between items-center text-sm py-2 px-3 bg-white rounded-lg border border-gray-100">
                            <span className="text-gray-700">{i + 1}. {name}</span>
                            <span className="font-medium">₨{price.toLocaleString()}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Original Amount</span>
                      <span>₨{(selectedBooking.originalAmount || 0).toLocaleString()}</span>
                    </div>
                    {selectedBooking.discountApplied > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Discount Applied</span>
                          <span className="text-green-600">-₨{(selectedBooking.discountApplied || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">You Saved</span>
                          <span className="text-green-600 font-medium">₨{(selectedBooking.amountSaved || 0).toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                      <span className="text-sm font-bold text-gray-600">Total Amount</span>
                      <span className="text-lg font-bold" style={{ color: primary }}>₨{(selectedBooking.totalAmount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Status Timeline</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Booking Created', time: selectedBooking.createdAt, icon: '📋' },
                      { label: 'Confirmed', time: selectedBooking.bookingStatus === 'confirmed' || selectedBooking.bookingStatus === 'assigned' || selectedBooking.bookingStatus === 'sample_collected' || selectedBooking.bookingStatus === 'in_lab' || selectedBooking.bookingStatus === 'report_ready' || selectedBooking.bookingStatus === 'delivered' || selectedBooking.bookingStatus === 'completed' ? selectedBooking.updatedAt : null, icon: '✅' },
                      { label: 'Technician Assigned', time: selectedBooking.assignedAt, icon: '👨‍🔬' },
                      { label: 'Sample Collected', time: selectedBooking.sampleCollectedAt, icon: '🧪' },
                      { label: 'Received In Lab', time: selectedBooking.receivedInLabAt, icon: '🔬' },
                      { label: 'Report Ready', time: selectedBooking.reportReadyAt, icon: '📄' },
                      { label: 'Delivered', time: selectedBooking.deliveredAt, icon: '📨' },
                      { label: 'Completed', time: selectedBooking.bookingStatus === 'completed' ? selectedBooking.updatedAt : null, icon: '🎉' },
                      { label: 'Cancelled', time: selectedBooking.bookingStatus === 'cancelled' ? selectedBooking.updatedAt : null, icon: '❌' },
                    ].filter(step => step.time || step.label === 'Booking Created' || (step.label === 'Cancelled' && selectedBooking.bookingStatus === 'cancelled') || (step.label === 'Completed' && selectedBooking.bookingStatus === 'completed')).map((step, i) => {
                      const isActive = !!step.time;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${isActive ? 'bg-green-100 shadow-sm' : 'bg-gray-200'}`}>
                            {step.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>
                            {isActive && step.time && (
                              <p className="text-xs text-gray-500">{dayjs(step.time).format('DD MMM YYYY, hh:mm A')}</p>
                            )}
                            {!isActive && (
                              <p className="text-xs text-gray-400 italic">Pending</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            {(() => {
              const currentStatus = (selectedBooking.bookingStatus || selectedBooking.status || "").toLowerCase();
              const isActionable = ['pending', 'confirmed'].includes(currentStatus);
              return (
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                  <button type="button" disabled={loading} onClick={() => setIsBookingModalVisible(false)} className="flex-1 border py-2 rounded-lg hover:bg-gray-50 font-medium">Close</button>
                  {currentStatus === 'pending' && <button type="button" disabled={loading} onClick={() => !loading && onUpdateStatus?.(selectedBooking._id, 'confirmed')} className="flex-1 text-white py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700">Confirm</button>}
                  {isActionable && <button type="button" disabled={loading} onClick={() => !loading && onUpdateStatus?.(selectedBooking._id, 'completed')} className="flex-1 text-white py-2 rounded-lg font-medium" style={{ backgroundColor: success }}>Complete</button>}
                  {isActionable && <button type="button" disabled={loading} onClick={() => !loading && onUpdateStatus?.(selectedBooking._id, 'cancelled')} className="flex-1 text-white py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700">{loading ? '...' : 'Cancel'}</button>}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {isCollectionModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">{editingCollection ? 'Edit Collection Schedule' : 'Schedule Sample Collection'}</h3>
              <button onClick={() => setIsCollectionModalVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); onScheduleCollection?.(scheduleForm); }} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Booking Reference</label>
                  <select value={scheduleForm.bookingId} onChange={(e) => setScheduleForm({ ...scheduleForm, bookingId: e.target.value })} className="w-full p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" required disabled={!!editingCollection}>
                    <option value="">Choose a confirmed booking...</option>
                    {bookings?.filter(b => b.bookingStatus?.toLowerCase() === 'confirmed' || b._id === scheduleForm.bookingId).map(booking => (
                      <option key={booking._id} value={booking._id}>{booking.bookingReference} — {booking.patientDetails?.name}</option>
                    ))}
                  </select>
                </div>
                {scheduleForm.bookingId && (() => {
                  const b = bookings?.find(x => x._id === scheduleForm.bookingId);
                  return b ? (<div className="bg-teal-50 p-4 rounded-xl border border-teal-100 flex items-start gap-3"><div className="p-2 bg-white rounded-lg shadow-sm text-teal-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div><div className="text-sm"><p className="font-bold text-teal-900">{b?.patientDetails?.name}</p><p className="text-teal-700">{b?.patientDetails?.mobile}</p></div></div>) : null;
                })()}
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Collection Date</label><input type="date" value={scheduleForm.scheduledDate} onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" required /></div>
                  <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Slot</label><select value={scheduleForm.scheduledTimeSlot} onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledTimeSlot: e.target.value })} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"><option value="morning">Morning (9-12)</option><option value="afternoon">Afternoon (12-3)</option><option value="evening">Evening (3-6)</option></select></div>
                </div>
                <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Special Instructions</label><textarea value={scheduleForm.specialInstructions} onChange={(e) => setScheduleForm({ ...scheduleForm, specialInstructions: e.target.value })} rows={3} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" placeholder="E.g. Fasting required, house entrance details..." /></div>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={() => setIsCollectionModalVisible(false)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={loading || !scheduleForm.bookingId} className="flex-1 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-700/20 disabled:opacity-50 transition-transform active:scale-95" style={{ backgroundColor: primary }}>{loading ? 'Processing...' : editingCollection ? 'Update Schedule' : 'Schedule Now'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= REPORT UPLOAD MODAL (Only completed bookings) ================= */}
      {isReportModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Upload Lab Report</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append('bookingId', reportForm.bookingId);
              formData.append('testId', reportForm.testId);
              formData.append('reportFile', reportForm.reportFile);
              formData.append('reportData', reportForm.reportData);
              if (lab?._id) formData.append('labId', lab._id);
              onReportSubmit?.(formData);
            }} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Completed Booking</label>
                <select
                  value={reportForm.bookingId}
                  onChange={(e) => setReportForm({ ...reportForm, bookingId: e.target.value, testId: '' })}
                  className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                >
                  <option value="">Choose completed booking...</option>
                  {bookings?.filter(b => b.bookingStatus === 'completed').map(b => (
                    <option key={b._id} value={b._id}>{b.bookingReference} - {b.patientDetails?.name}</option>
                  ))}
                </select>
                {bookings?.filter(b => b.bookingStatus === 'completed').length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">No completed bookings available. Complete a booking first.</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Test</label>
                <select
                  value={reportForm.testId}
                  onChange={(e) => setReportForm({ ...reportForm, testId: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                >
                  <option value="">Choose test...</option>
                  {tests?.map(t => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Report File (PDF/Image)</label>
                <input
                  type="file"
                  onChange={(e) => setReportForm({ ...reportForm, reportFile: e.target.files[0] })}
                  className="w-full p-2 border rounded-xl text-sm"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsReportModalVisible(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 text-white py-3 rounded-xl font-bold" style={{ backgroundColor: primary }}>{loading ? 'Uploading...' : 'Upload Now'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}