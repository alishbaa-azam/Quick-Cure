// // src/components/LabDashboard/LabDashboardModals.jsx
// import React, { useState } from 'react';
// import dayjs from 'dayjs';

// export default function LabDashboardModals({
//   isTestModalVisible,
//   setIsTestModalVisible,
//   isProfileModalVisible,
//   setIsProfileModalVisible,
//   isBookingModalVisible,
//   setIsBookingModalVisible,
//   isCollectionModalVisible,
//   setIsCollectionModalVisible,
//   isReportModalVisible,
//   setIsReportModalVisible,
//   selectedBooking,
//   selectedCollection,
//   selectedReport,
//   editingTest,
//   lab,
//   tests,
//   logoFile,
//   setLogoFile,
//   theme,
//   loading,
//   onTestSubmit,
//   onProfileSubmit,
//   onUpdateStatus,
//   onScheduleCollection,
//   onAssignCollector,
//   onUpdateCollectionStatus,
//   onMarkSampleCollected,
//   onUploadReport,
//   onVerifyReport,
//   API_BASE_URL
// }) {
//   const [testForm, setTestForm] = useState({
//     _id: editingTest?._id || '',
//     name: editingTest?.name || '',
//     description: editingTest?.description || '',
//     price: editingTest?.price || ''
//   });

//   const [profileForm, setProfileForm] = useState({
//     name: lab?.name || '',
//     branches: lab?.branches || '',
//     discount: lab?.discount || 0
//   });

//   const [assignData, setAssignData] = useState({
//     collectorName: '',
//     collectorContact: '',
//     collectorEmployeeId: ''
//   });

//   const [reportForm, setReportForm] = useState({
//     bookingId: '',
//     testId: '',
//     patientId: '',
//     reportFile: null,
//     reportData: '',
//     remarks: ''
//   });

//   const statusColors = {
//     pending: 'bg-yellow-100 text-yellow-800',
//     confirmed: 'bg-blue-100 text-blue-800',
//     completed: 'bg-green-100 text-green-800',
//     cancelled: 'bg-red-100 text-red-800'
//   };

//   // Test Modal
//   if (isTestModalVisible) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-md">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">{editingTest ? 'Edit Test' : 'Add New Test'}</h3>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               onTestSubmit(testForm);
//             }}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
//                 <input
//                   type="text"
//                   value={testForm.name}
//                   onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={testForm.description}
//                   onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                 <input
//                   type="number"
//                   value={testForm.price}
//                   onChange={(e) => setTestForm({ ...testForm, price: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button type="button" onClick={() => setIsTestModalVisible(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
//                 <button type="submit" className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.primary }}>{editingTest ? 'Update' : 'Create'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Profile Modal
//   if (isProfileModalVisible) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-md">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Edit Lab Profile</h3>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               onProfileSubmit(profileForm);
//               setIsProfileModalVisible(false);
//             }}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
//                 <input
//                   type="text"
//                   value={profileForm.name}
//                   onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
//                 <input
//                   type="text"
//                   value={profileForm.branches}
//                   onChange={(e) => setProfileForm({ ...profileForm, branches: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
//                 <input
//                   type="number"
//                   value={profileForm.discount}
//                   onChange={(e) => setProfileForm({ ...profileForm, discount: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
//                 <input
//                   type="file"
//                   onChange={(e) => setLogoFile(e.target.files[0])}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button type="button" onClick={() => setIsProfileModalVisible(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
//                 <button type="submit" className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.primary }}>Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Booking Modal
//   if (isBookingModalVisible && selectedBooking) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-lg font-semibold">Booking Details</h3>
//               <button onClick={() => setIsBookingModalVisible(false)} className="text-gray-400 hover:text-gray-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-500">Booking Reference</p>
//                   <p className="font-mono font-medium">{selectedBooking.bookingReference}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <span className={`px-2 py-1 text-xs rounded-full inline-block ${statusColors[selectedBooking.bookingStatus] || 'bg-gray-100'}`}>
//                     {selectedBooking.bookingStatus}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Booking Date</p>
//                   <p className="text-sm">{dayjs(selectedBooking.createdAt).format('DD MMM YYYY, hh:mm A')}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Appointment Date</p>
//                   <p className="text-sm">{dayjs(selectedBooking.appointmentDetails?.preferredDate).format('DD MMM YYYY')}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Patient Details</h4>
//               <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-xs text-gray-500">Name</p>
//                   <p className="text-sm font-medium">{selectedBooking.patientDetails?.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Age / Gender</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.age} yrs / {selectedBooking.patientDetails?.gender}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Mobile</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.mobile}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Email</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.email}</p>
//                 </div>
//                 <div className="col-span-2">
//                   <p className="text-xs text-gray-500">Address</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.address}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Tests</h4>
//               <div className="space-y-2">
//                 {selectedBooking.tests?.map((test, idx) => (
//                   <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium">{test.name}</p>
//                       <p className="text-xs text-gray-500">{test.description}</p>
//                     </div>
//                     <p className="font-semibold">₹{test.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold">Total Amount</span>
//                 <span className="text-xl font-bold" style={{ color: theme.primary }}>₹{selectedBooking.totalAmount}</span>
//               </div>
//               {selectedBooking.discountApplied > 0 && (
//                 <div className="flex justify-between text-sm text-gray-500 mt-1">
//                   <span>Original: ₹{selectedBooking.originalAmount}</span>
//                   <span>Discount: {selectedBooking.discountApplied}% (Saved ₹{selectedBooking.amountSaved})</span>
//                 </div>
//               )}
//             </div>

//             <div className="flex gap-3">
//               <button onClick={() => setIsBookingModalVisible(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
//               {selectedBooking.bookingStatus === 'pending' && (
//                 <button onClick={() => onUpdateStatus(selectedBooking._id, 'confirmed')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.success }}>Confirm Booking</button>
//               )}
//               {selectedBooking.bookingStatus === 'confirmed' && (
//                 <button onClick={() => onUpdateStatus(selectedBooking._id, 'completed')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.primary }}>Mark Completed</button>
//               )}
//               {selectedBooking.bookingStatus !== 'cancelled' && selectedBooking.bookingStatus !== 'completed' && (
//                 <button onClick={() => onUpdateStatus(selectedBooking._id, 'cancelled')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.error }}>Cancel Booking</button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Collection Modal
//   if (isCollectionModalVisible && selectedCollection) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-lg font-semibold">Collection Details</h3>
//               <button onClick={() => setIsCollectionModalVisible(false)} className="text-gray-400 hover:text-gray-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-500">Tracking ID</p>
//                   <p className="font-mono font-medium">{selectedCollection.trackingId}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <span className={`px-2 py-1 text-xs rounded-full inline-block ${statusColors[selectedCollection.status] || 'bg-gray-100'}`}>
//                     {selectedCollection.status?.replace('_', ' ')}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Scheduled Date</p>
//                   <p className="text-sm">{dayjs(selectedCollection.scheduledDate).format('DD MMM YYYY')}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Time Slot</p>
//                   <p className="text-sm">{selectedCollection.scheduledTimeSlot}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Patient Information</h4>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="font-medium">{selectedCollection.patientId?.name}</p>
//                 <p className="text-sm text-gray-600">{selectedCollection.patientId?.mobile}</p>
//                 <p className="text-sm text-gray-600 mt-1">{selectedCollection.collectionAddress}</p>
//               </div>
//             </div>

//             {selectedCollection.assignedCollector?.name && (
//               <div className="mb-4">
//                 <h4 className="font-semibold text-gray-800 mb-2">Assigned Collector</h4>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <p className="font-medium">{selectedCollection.assignedCollector.name}</p>
//                   <p className="text-sm text-gray-600">{selectedCollection.assignedCollector.contact}</p>
//                   <p className="text-sm text-gray-600">ID: {selectedCollection.assignedCollector.employeeId}</p>
//                 </div>
//               </div>
//             )}

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Samples</h4>
//               <div className="space-y-2">
//                 {selectedCollection.samples?.map((sample, idx) => (
//                   <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium">Sample {idx + 1}</p>
//                       <p className="text-xs text-gray-500">Type: {sample.sampleType || 'Not specified'}</p>
//                     </div>
//                     <span className={`px-2 py-1 text-xs rounded-full ${sample.isCollected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                       {sample.isCollected ? 'Collected' : 'Pending'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {selectedCollection.status === 'scheduled' && (
//               <div className="mb-4">
//                 <h4 className="font-semibold text-gray-800 mb-2">Assign Collector</h4>
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     placeholder="Collector Name"
//                     value={assignData.collectorName}
//                     onChange={(e) => setAssignData({ ...assignData, collectorName: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Contact Number"
//                     value={assignData.collectorContact}
//                     onChange={(e) => setAssignData({ ...assignData, collectorContact: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Employee ID"
//                     value={assignData.collectorEmployeeId}
//                     onChange={(e) => setAssignData({ ...assignData, collectorEmployeeId: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <button
//                     onClick={async () => {
//                       await onAssignCollector(selectedCollection._id, assignData);
//                       setAssignData({ collectorName: '', collectorContact: '', collectorEmployeeId: '' });
//                     }}
//                     className="w-full px-4 py-2 text-white rounded-lg hover:opacity-90"
//                     style={{ backgroundColor: theme.primary }}
//                   >
//                     Assign Collector
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="flex gap-3">
//               <button onClick={() => setIsCollectionModalVisible(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
//               {selectedCollection.status === 'assigned' && (
//                 <button onClick={() => onUpdateCollectionStatus(selectedCollection._id, 'start')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.info }}>Start Collection</button>
//               )}
//               {selectedCollection.status === 'collected' && (
//                 <button onClick={() => onUpdateCollectionStatus(selectedCollection._id, 'deliver')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.success }}>Mark Delivered</button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Report Modal
//   if (isReportModalVisible && selectedReport) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-lg font-semibold">Report Details</h3>
//               <button onClick={() => setIsReportModalVisible(false)} className="text-gray-400 hover:text-gray-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-500">Report Number</p>
//                   <p className="font-mono font-medium">{selectedReport.reportNumber}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <span className={`px-2 py-1 text-xs rounded-full inline-block ${statusColors[selectedReport.status] || 'bg-gray-100'}`}>
//                     {selectedReport.status}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Report Date</p>
//                   <p className="text-sm">{dayjs(selectedReport.reportDate).format('DD MMM YYYY')}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Test Date</p>
//                   <p className="text-sm">{dayjs(selectedReport.testDate).format('DD MMM YYYY')}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Test Information</h4>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="font-medium">{selectedReport.testId?.name}</p>
//                 <p className="text-sm text-gray-600">{selectedReport.testId?.description}</p>
//               </div>
//             </div>

//             {selectedReport.reportFile?.url && (
//               <div className="mb-4">
//                 <h4 className="font-semibold text-gray-800 mb-2">Report File</h4>
//                 <a href={selectedReport.reportFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">View Report</a>
//               </div>
//             )}

//             {selectedReport.reportData?.parameters && selectedReport.reportData.parameters.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="font-semibold text-gray-800 mb-2">Test Parameters</h4>
//                 <div className="space-y-2">
//                   {selectedReport.reportData.parameters.map((param, idx) => (
//                     <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <p className="font-medium">{param.name}</p>
//                         <p className="text-xs text-gray-500">Reference: {param.referenceRange}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className={`font-semibold ${param.isAbnormal ? 'text-red-600' : 'text-green-600'}`}>
//                           {param.value} {param.unit}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedReport.status === 'pending' && (
//               <div className="flex gap-3 mt-4">
//                 <button onClick={() => onVerifyReport(selectedReport._id, 'approved', '')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.success }}>Approve Report</button>
//                 <button onClick={() => onVerifyReport(selectedReport._id, 'rejected', '')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.error }}>Reject Report</button>
//               </div>
//             )}

//             <div className="flex gap-3 mt-4">
//               <button onClick={() => setIsReportModalVisible(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }


// import React, { useState } from 'react';
// import dayjs from 'dayjs';

// export default function LabDashboardModals({
//   isTestModalVisible,
//   setIsTestModalVisible,
//   isProfileModalVisible,
//   setIsProfileModalVisible,
//   isBookingModalVisible,
//   setIsBookingModalVisible,
//   selectedBooking,
//   editingTest,
//   lab,
//   logoFile,
//   setLogoFile,
//   theme,
//   loading,
//   onTestSubmit,
//   onProfileSubmit,
//   onUpdateStatus,
//   API_BASE_URL
// }) {
//   const [testForm, setTestForm] = useState({
//     _id: editingTest?._id || '',
//     name: editingTest?.name || '',
//     description: editingTest?.description || '',
//     price: editingTest?.price || ''
//   });

//   const [profileForm, setProfileForm] = useState({
//     name: lab?.name || '',
//     branches: lab?.branches || '',
//     discount: lab?.discount || 0
//   });

//   const statusColors = {
//     pending: 'bg-yellow-100 text-yellow-800',
//     confirmed: 'bg-blue-100 text-blue-800',
//     completed: 'bg-green-100 text-green-800',
//     cancelled: 'bg-red-100 text-red-800'
//   };

//   // Test Modal
//   if (isTestModalVisible) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-md">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">{editingTest ? 'Edit Test' : 'Add New Test'}</h3>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               onTestSubmit(testForm);
//             }}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
//                 <input
//                   type="text"
//                   value={testForm.name}
//                   onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: theme.primary }}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   value={testForm.description}
//                   onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
//                   rows={3}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: theme.primary }}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
//                 <input
//                   type="number"
//                   value={testForm.price}
//                   onChange={(e) => setTestForm({ ...testForm, price: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: theme.primary }}
//                   required
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button type="button" onClick={() => setIsTestModalVisible(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
//                 <button type="submit" disabled={loading} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.primary }}>
//                   {editingTest ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Profile Modal
//   if (isProfileModalVisible) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-md">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Edit Lab Profile</h3>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               onProfileSubmit(profileForm);
//             }}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
//                 <input
//                   type="text"
//                   value={profileForm.name}
//                   onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: theme.primary }}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
//                 <input
//                   type="text"
//                   value={profileForm.branches}
//                   onChange={(e) => setProfileForm({ ...profileForm, branches: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: theme.primary }}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
//                 <input
//                   type="number"
//                   value={profileForm.discount}
//                   onChange={(e) => setProfileForm({ ...profileForm, discount: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: theme.primary }}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
//                 <input
//                   type="file"
//                   onChange={(e) => setLogoFile(e.target.files[0])}
//                   accept="image/*"
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button type="button" onClick={() => setIsProfileModalVisible(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
//                 <button type="submit" className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.primary }}>Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Booking Modal
//   if (isBookingModalVisible && selectedBooking) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-lg font-semibold">Booking Details</h3>
//               <button onClick={() => setIsBookingModalVisible(false)} className="text-gray-400 hover:text-gray-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-gray-500">Booking Reference</p>
//                   <p className="font-mono font-medium">{selectedBooking.bookingReference}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Status</p>
//                   <span className={`px-2 py-1 text-xs rounded-full inline-block ${statusColors[selectedBooking.bookingStatus] || 'bg-gray-100'}`}>
//                     {selectedBooking.bookingStatus}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Booking Date</p>
//                   <p className="text-sm">{dayjs(selectedBooking.createdAt).format('DD MMM YYYY, hh:mm A')}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Appointment Date</p>
//                   <p className="text-sm">{dayjs(selectedBooking.appointmentDetails?.preferredDate).format('DD MMM YYYY')}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Patient Details</h4>
//               <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="text-xs text-gray-500">Name</p>
//                   <p className="text-sm font-medium">{selectedBooking.patientDetails?.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Age / Gender</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.age} yrs / {selectedBooking.patientDetails?.gender}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Mobile</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.mobile}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Email</p>
//                   <p className="text-sm">{selectedBooking.patientDetails?.email}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Tests</h4>
//               <div className="space-y-2">
//                 {selectedBooking.tests?.map((test, idx) => (
//                   <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="font-medium">{test.name}</p>
//                     </div>
//                     <p className="font-semibold">₹{test.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold">Total Amount</span>
//                 <span className="text-xl font-bold" style={{ color: theme.primary }}>₹{selectedBooking.totalAmount}</span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button onClick={() => setIsBookingModalVisible(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Close</button>
//               {selectedBooking.bookingStatus === 'pending' && (
//                 <button onClick={() => onUpdateStatus(selectedBooking._id, 'confirmed')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.success }}>Confirm Booking</button>
//               )}
//               {selectedBooking.bookingStatus === 'confirmed' && (
//                 <button onClick={() => onUpdateStatus(selectedBooking._id, 'completed')} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: theme.primary }}>Mark Completed</button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }


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
  isPatientModalVisible,
  setIsPatientModalVisible,
  selectedBooking,
  editingCollection,
  editingTest,
  editingPatient,
  lab,
  bookings,
  logoFile,
  setLogoFile,
  theme,
  loading,
  onTestSubmit,
  onPatientSubmit,
  onProfileSubmit,
  onUpdateStatus,
  onScheduleCollection,
  isPatientEdit = false
}) {
  // ✅ Safe theme
  const primary = theme?.primary || "#0d9488";
  const success = theme?.success || "#16a34a";

  // ✅ STATE
  const [testForm, setTestForm] = useState({
    _id: '',
    name: '',
    description: '',
    price: ''
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    branches: '',
    discount: 0
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

  // ✅ SYNC form with editingTest or Reset on Open
  useEffect(() => {
    if (isTestModalVisible || isPatientModalVisible) {
      const activeItem = editingPatient || editingTest;
      if (activeItem) {
        setTestForm({
          _id: activeItem._id || '',
          name: activeItem.name || '',
          description: activeItem.description || activeItem.email || '',
          price: activeItem.price || ''
        });
      } else {
        setTestForm({ _id: '', name: '', description: '', price: '' });
      }
    }
  }, [isTestModalVisible, isPatientModalVisible, editingTest, editingPatient]);

  // ✅ SYNC lab profile form
  useEffect(() => {
    if (isProfileModalVisible && lab) {
      setProfileForm({
        name: lab.name || '',
        branches: lab.branches || '',
        discount: lab.discount || 0
      });
    }
  }, [isProfileModalVisible, lab]);

  // ✅ SYNC Schedule Form on Open
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

  // ✅ Auto-fill date when booking selection changes
  useEffect(() => {
    if (isCollectionModalVisible && scheduleForm.bookingId) {
      const selected = bookings?.find(b => b._id === scheduleForm.bookingId);
      if (selected?.appointmentDetails?.preferredDate) {
        setScheduleForm(prev => ({
          ...prev,
          scheduledDate: dayjs(selected.appointmentDetails.preferredDate).format('YYYY-MM-DD')
        }));
      }
    }
  }, [scheduleForm.bookingId, bookings, isCollectionModalVisible]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  const isPatientEditMode = isPatientEdit || isPatientModalVisible;
  const currentTestForm = isPatientEditMode ? editingPatient : editingTest;
  const activeTestModal = isTestModalVisible || isPatientModalVisible;

  return (
    <>
      {/* ================= TEST MODAL ================= */}
      {activeTestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isPatientEditMode ? 'Edit Patient Details' : editingTest ? 'Edit Test' : 'Add New Test'}
            </h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              const submitHandler = isPatientEditMode ? onPatientSubmit : onTestSubmit;
              submitHandler?.({ ...testForm, price: Number(testForm.price) });
            }}>
              
              <input
                type="text"
                placeholder={isPatientEdit ? "Patient Name" : "Test Name"}
                value={testForm.name}
                onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
                required
              />

              {isPatientEdit ? (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={testForm.description}
                    onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                    className="w-full mb-3 px-3 py-2 border rounded-lg"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <input
                      type="number"
                      placeholder="Age"
                      className="px-3 py-2 border rounded-lg"
                    />
                    <select className="px-3 py-2 border rounded-lg">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
              <textarea
                placeholder="Description"
                value={testForm.description}
                onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Price (₨)"
                value={testForm.price}
                onChange={(e) => setTestForm({ ...testForm, price: e.target.value })}
                className="w-full mb-4 px-3 py-2 border rounded-lg"
                required
              />
                </>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => { setIsTestModalVisible(false); setIsPatientModalVisible?.(false); }} className="flex-1 border py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 text-white py-2 rounded-lg" style={{ backgroundColor: primary }}>
                  {isPatientEditMode ? 'Save Changes' : editingTest ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= PROFILE MODAL ================= */}
      {isProfileModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Lab Profile</h3>

            <form onSubmit={(e) => {
              e.preventDefault();

              onProfileSubmit({
                ...profileForm,
                discount: Number(profileForm.discount)
              });

              setIsProfileModalVisible(false);
            }}>
              
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />

              <input
                type="text"
                value={profileForm.branches}
                onChange={(e) => setProfileForm({ ...profileForm, branches: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />

              <input
                type="number"
                value={profileForm.discount}
                onChange={(e) => setProfileForm({ ...profileForm, discount: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />

              <input
                type="file"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="w-full mb-4"
              />

              <div className="flex gap-3">
                <button type="button" onClick={() => setIsProfileModalVisible(false)} className="flex-1 border py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 text-white py-2 rounded-lg" style={{ backgroundColor: primary }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BOOKING MODAL ================= */}
      {/* {isBookingModalVisible && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">

            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>

            <p><strong>Ref:</strong> {selectedBooking.bookingReference}</p>
            <p><strong>Status:</strong> {selectedBooking.bookingStatus}</p>
            <p><strong>Date:</strong> {dayjs(selectedBooking.createdAt).format('DD MMM YYYY')}</p>

            <div className="mt-4">
              {selectedBooking.tests?.map((t, i) => (
                <div key={i} className="flex justify-between">
                  <span>{t.name}</span>
                  <span>₨{t.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 font-bold">
              Total: ₨{selectedBooking.totalAmount}
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={() => setIsBookingModalVisible(false)} className="flex-1 border py-2 rounded-lg">
                Close
              </button>

              {selectedBooking.bookingStatus === 'pending' && (
                <button
                  onClick={() => onUpdateStatus(selectedBooking._id, 'confirmed')}
                  className="flex-1 text-white py-2 rounded-lg"
                  style={{ backgroundColor: success }}
                >
                  Confirm
                </button>
              )}
            </div>

          </div>
        </div>
      )} */}

      {isBookingModalVisible && selectedBooking && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Booking Details</h3>
        <button onClick={() => setIsBookingModalVisible(false)} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left: General & Patient Info */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Booking Info</h4>
            <div className="space-y-1">
              <p className="text-sm"><strong>Reference:</strong> <span className="font-mono">{selectedBooking.bookingReference || "N/A"}</span></p>
              <div className="flex items-center gap-2 text-sm">
                <strong>Status:</strong>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[selectedBooking.bookingStatus] || 'bg-gray-100'}`}>
                  {selectedBooking.bookingStatus?.toUpperCase() || "N/A"}
                </span>
              </div>
              <p className="text-sm">
                <strong>Date:</strong> {selectedBooking.createdAt ? dayjs(selectedBooking.createdAt).format('DD MMM YYYY, hh:mm A') : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Patient Details</h4>
            <div className="space-y-1">
              <p className="text-sm"><strong>Name:</strong> {selectedBooking.patientDetails?.name || "N/A"}</p>
              <p className="text-sm"><strong>Mobile:</strong> {selectedBooking.patientDetails?.mobile || "N/A"}</p>
              <p className="text-sm"><strong>Email:</strong> {selectedBooking.patientDetails?.email || "N/A"}</p>
              <p className="text-sm"><strong>Age/Gender:</strong> {selectedBooking.patientDetails?.age || "N/A"} / {selectedBooking.patientDetails?.gender || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Address:</strong> {selectedBooking.patientDetails?.address || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Tests & Payment */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tests & Payment</h4>
          
          <div className="flex-1 space-y-2 max-h-[200px] overflow-y-auto mb-4 pr-2">
            {(() => {
          const tests =
            Array.isArray(selectedBooking.tests)
              ? selectedBooking.tests
              : selectedBooking.testDetails
              ? selectedBooking.testDetails
              : selectedBooking.tests && typeof selectedBooking.tests === "object"
              ? Object.values(selectedBooking.tests)
              : [];

            if (tests.length === 0) return <p className="text-gray-400 text-sm italic">No tests found</p>;

          return tests.map((t, i) => {
            const name =
              t?.name ||
              t?.test?.name ||
              t?.testId?.name ||
              "Unnamed Test";

            const price =
              t?.price ||
              t?.test?.price ||
              t?.testId?.price ||
              0;

            return (
                <div key={i} className="flex justify-between items-center text-sm pb-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-700">{name}</span>
                  <span className="font-medium">₨{price.toLocaleString()}</span>
              </div>
            );
          });
        })()}
          </div>

          <div className="pt-2 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-600">Total Amount</span>
              <span className="text-lg font-bold" style={{ color: primary }}>
                ₨{(selectedBooking.totalAmount || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Case-insensitive status check */}
      {(() => {
        const currentStatus = (selectedBooking.bookingStatus || selectedBooking.status || "").toLowerCase();
        const isActionable = ['pending', 'confirmed'].includes(currentStatus);

        return (
          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              disabled={loading}
              onClick={() => setIsBookingModalVisible(false)}
              className="flex-1 border py-2 rounded-lg hover:bg-gray-50 font-medium"
            >
              Close
            </button>

            {currentStatus === 'pending' && (
              <button
                type="button"
                disabled={loading}
                onClick={() => !loading && onUpdateStatus?.(selectedBooking._id, 'confirmed')}
                className="flex-1 text-white py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700"
              >
                Confirm
              </button>
            )}

            {isActionable && (
              <button
                type="button"
                disabled={loading}
                onClick={() => !loading && onUpdateStatus?.(selectedBooking._id, 'completed')}
                className="flex-1 text-white py-2 rounded-lg font-medium"
                style={{ backgroundColor: success }}
              >
                Complete
              </button>
            )}

            {isActionable && (
              <button
                type="button"
                disabled={loading}
                onClick={() => !loading && onUpdateStatus?.(selectedBooking._id, 'cancelled')}
                className="flex-1 text-white py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700"
              >
                {loading ? '...' : 'Cancel'}
              </button>
            )}
          </div>
        );
      })()}

    </div>
  </div>
)}

      {/* ================= SCHEDULE COLLECTION MODAL ================= */}
      {isCollectionModalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Schedule Sample Collection</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              onScheduleCollection?.(scheduleForm);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Booking</label>
                <select
                  value={scheduleForm.bookingId}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, bookingId: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select a booking</option>
                  {bookings?.filter(b => 
                    b.bookingStatus?.toLowerCase() === 'confirmed'
                  ).map(booking => (
                    <option key={booking._id} value={booking._id}>
                      {booking.bookingReference} - {booking.patientDetails?.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {scheduleForm.bookingId && (
                <div className="bg-gray-50 p-3 rounded-lg text-xs border border-gray-100">
                  <p className="font-bold text-gray-400 uppercase tracking-wider mb-2">Patient Details</p>
                  {(() => {
                    const b = bookings?.find(x => x._id === scheduleForm.bookingId);
                    return (
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-800">{b?.patientDetails?.name} ({b?.patientDetails?.gender}, {b?.patientDetails?.age} yrs)</p>
                        <p className="text-gray-500">{b?.patientDetails?.mobile}</p>
                        <p className="text-gray-500 truncate">{b?.patientDetails?.address}</p>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Collection Date</label>
                <input
                  type="date"
                  value={scheduleForm.scheduledDate}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time Slot</label>
                <select
                  value={scheduleForm.scheduledTimeSlot}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledTimeSlot: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                  <option value="evening">Evening (3 PM - 6 PM)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Instructions</label>
                <textarea
                  value={scheduleForm.specialInstructions}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, specialInstructions: e.target.value })}
                  rows={3}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Any special instructions..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsCollectionModalVisible(false)} className="flex-1 border py-2 rounded-lg">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading || !scheduleForm.bookingId}
                  className="flex-1 text-white py-2 rounded-lg font-medium disabled:opacity-50" 
                  style={{ backgroundColor: primary }}
                >
                  {loading ? 'Processing...' : 'Schedule Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}