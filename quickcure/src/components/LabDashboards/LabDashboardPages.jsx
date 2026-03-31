// import React, { useState, useEffect } from 'react';
// import dayjs from 'dayjs';
// import axios from 'axios';
// import { 
//   FiCalendar, FiCheckCircle, FiClock, FiDollarSign, FiDownload, 
//   FiEdit2, FiEye, FiMail, FiPhone, FiPlus, FiRefreshCw, 
//   FiSearch, FiTrash2, FiUser, FiMapPin, FiHome, FiPercent,
//   FiCreditCard, FiActivity, FiTrendingUp, FiPieChart,
//   FiAward, FiUsers, FiSettings, FiUpload, FiFileText,
//   FiBarChart2, FiX, FiArrowLeft, FiArrowRight, FiLoader
// } from 'react-icons/fi';
// import { 
//   FaFlask, FaHospital, FaMicroscope, FaShieldAlt,
//   FaCheckCircle, FaTimesCircle, FaClock as FaClockIcon,
//   FaArrowLeft, FaArrowRight, FaFilePdf,
//   FaMapMarkerAlt, FaPhoneAlt, FaUserCircle,
//   FaRegCalendarAlt, FaRegClock,
//   FaHistory, FaNotesMedical, FaCloudUploadAlt,
//   FaFileMedical, FaChartLine, FaChartPie,
//   FaChartBar, FaUsers as FaUsersIcon, FaTruck
// } from 'react-icons/fa';
// import { 
//   MdOutlineGroup, MdOutlinePerson, MdOutlinePayment,
//   MdOutlineLocationOn, MdOutlineEmail,
//   MdOutlineScience, MdOutlineBiotech,
//   MdOutlineHealthAndSafety, MdOutlineMedicalServices
// } from 'react-icons/md';
// import {
//   LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   Cell
// } from 'recharts';

// const API_BASE_URL = 'http://localhost:5000/api';
// axios.defaults.baseURL = API_BASE_URL;

// // Custom color scheme
// const customColors = {
//   primary: '#2c6774',
//   secondary: '#174047',
//   accent: '#5c878f',
//   hover: '#1e4e56',
//   bgLight: '#9fbfc5',
//   textLight: '#c0d3dc',
//   white: '#ffffff',
//   success: '#10b981',
//   warning: '#f59e0b',
//   error: '#ef4444',
//   info: '#5c878f',
//   purple: '#8b5cf6'
// };

// export default function LabDashboardPages({
//   activeTab, 
//   setActiveTab, // Added missing prop
//   lab, 
//   tests = [], 
//   bookings = [],
//   filteredBookings = [],
//   patients = [],
//   collections = [],
//   reports = [],
//   stats = {}, 
//   theme = customColors,
//   loading,
//   searchText, 
//   setSearchText, 
//   statusFilter, 
//   setStatusFilter, 
//   timeRange, 
//   setTimeRange,
//   onAddTest, 
//   onEditTest, 
//   onDeleteTest, 
//   onViewBooking, 
//   onEditProfile, 
//   onUpdateStatus,
//   onScheduleCollection,
//   onAssignCollector,
//   onUpdateCollectionStatus,
//   onEditCollection,
//   onDeleteCollection,
//   onUploadReport,
//   onVerifyReport,
//   onRefresh
// }) {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [chartType, setChartType] = useState('line');
//   const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
//   const [reportModalVisible, setReportModalVisible] = useState(false);
//   const [scheduleForm, setScheduleForm] = useState({
//     bookingId: '',
//     scheduledDate: '',
//     scheduledTimeSlot: 'morning',
//     specialInstructions: '',
//     patientCondition: '',
//     fastingRequired: false,
//     fastingHours: 8
//   });
//   const [reportForm, setReportForm] = useState({
//     bookingId: '',
//     testId: '',
//     reportFile: null,
//     reportData: ''
//   });
//   const [submitting, setSubmitting] = useState(false);

//   // Safe data access
//   const safeStats = {
//     totalBookings: stats?.totalBookings || bookings?.length || 0,
//     pendingBookings: stats?.pendingBookings || bookings?.filter(b => b.bookingStatus === 'pending').length || 0,
//     confirmedBookings: stats?.confirmedBookings || bookings?.filter(b => b.bookingStatus === 'confirmed').length || 0,
//     completedBookings: stats?.completedBookings || bookings?.filter(b => b.bookingStatus === 'completed').length || 0,
//     cancelledBookings: stats?.cancelledBookings || bookings?.filter(b => b.bookingStatus === 'cancelled').length || 0,
//     totalRevenue: stats?.totalRevenue || bookings?.filter(b => b.bookingStatus === 'completed').reduce((sum, b) => sum + (b.totalAmount || 0), 0) || 0,
//     monthlyRevenue: stats?.monthlyRevenue || 0,
//     totalTests: stats?.totalTests || tests?.length || 0,
//     totalDiscount: stats?.totalDiscount || 0,
//     totalSaved: stats?.totalSaved || 0,
//     groupBookings: stats?.groupBookings || bookings?.filter(b => b.groupBooking === true).length || 0,
//     averageBookingValue: (stats?.totalBookings || bookings?.length) ? 
//       Math.round((stats?.totalRevenue || bookings?.filter(b => b.bookingStatus === 'completed').reduce((sum, b) => sum + (b.totalAmount || 0), 0)) / (stats?.totalBookings || bookings?.length || 1)) : 0
//   };

//   const completionRate = safeStats.totalBookings 
//     ? Math.round((safeStats.completedBookings / safeStats.totalBookings) * 100) 
//     : 0;

//   // Generate chart data
//   const generateChartData = () => {
//     const data = [];
//     for (let i = 29; i >= 0; i--) {
//       const date = dayjs().subtract(i, 'days');
//       const dayBookings = bookings?.filter(b => 
//         dayjs(b.createdAt).isSame(date, 'day')
//       ) || [];
      
//       data.push({
//         date: date.format('MMM DD'),
//         bookings: dayBookings.length,
//         groupBookings: dayBookings.filter(b => b.groupBooking === true).length,
//         revenue: dayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
//         completed: dayBookings.filter(b => b.bookingStatus === 'completed').length,
//         pending: dayBookings.filter(b => b.bookingStatus === 'pending').length
//       });
//     }
//     return data;
//   };

//   const chartData = generateChartData();

//   const statusDistribution = [
//     { status: 'Pending', count: safeStats.pendingBookings, color: customColors.warning },
//     { status: 'Confirmed', count: safeStats.confirmedBookings, color: customColors.info },
//     { status: 'Completed', count: safeStats.completedBookings, color: customColors.success },
//     { status: 'Cancelled', count: safeStats.cancelledBookings, color: customColors.error }
//   ].filter(item => item.count > 0);

//   // Status badge component
//   const StatusBadge = ({ status, type = 'booking' }) => {
//     const statusConfig = {
//       pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FiClock, label: 'Pending' },
//       confirmed: { bg: 'bg-teal-100', text: 'text-teal-800', icon: FaCheckCircle, label: 'Confirmed' },
//       completed: { bg: 'bg-green-100', text: 'text-green-800', icon: FaShieldAlt, label: 'Completed' },
//       cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: FaTimesCircle, label: 'Cancelled' },
//       scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: FaTruck, label: 'Scheduled' },
//       'in_progress': { bg: 'bg-purple-100', text: 'text-purple-800', icon: FiActivity, label: 'In Progress' },
//       collected: { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheckCircle, label: 'Collected' },
//       delivered: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: FaShieldAlt, label: 'Delivered' },
//       ready: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: FaFilePdf, label: 'Ready' }
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     const Icon = config.icon;

//     return (
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
//         <Icon size={12} />
//         {type === 'payment' ? config.label : status?.toUpperCase()?.replace('_', ' ') || 'UNKNOWN'}
//       </span>
//     );
//   };

//   // Handle Schedule Collection
//   const handleScheduleCollection = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const booking = bookings?.find(b => b._id === scheduleForm.bookingId);
//       if (onScheduleCollection) {
//         await onScheduleCollection({
//           bookingId: scheduleForm.bookingId,
//           patientId: booking?.patientDetails?.email,
//           scheduledDate: scheduleForm.scheduledDate,
//           scheduledTimeSlot: scheduleForm.scheduledTimeSlot,
//           specialInstructions: scheduleForm.specialInstructions,
//           patientCondition: scheduleForm.patientCondition,
//           fastingRequired: scheduleForm.fastingRequired,
//           fastingHours: scheduleForm.fastingHours
//         });
//       }
//       setScheduleModalVisible(false);
//       setScheduleForm({
//         bookingId: '',
//         scheduledDate: '',
//         scheduledTimeSlot: 'morning',
//         specialInstructions: '',
//         patientCondition: '',
//         fastingRequired: false,
//         fastingHours: 8
//       });
//       if (onRefresh) onRefresh();
//     } catch (error) {
//       console.error('Schedule error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle Upload Report
//   const handleUploadReport = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       if (onUploadReport) {
//         const formData = new FormData();
//         formData.append('bookingId', reportForm.bookingId);
//         formData.append('testId', reportForm.testId);
//         if (reportForm.reportFile) formData.append('reportFile', reportForm.reportFile);
//         if (reportForm.reportData) formData.append('reportData', reportForm.reportData);
        
//         await onUploadReport(formData);
//       }
//       setReportModalVisible(false);
//       setReportForm({
//         bookingId: '',
//         testId: '',
//         reportFile: null,
//         reportData: ''
//       });
//       if (onRefresh) onRefresh();
//     } catch (error) {
//       console.error('Upload error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle Update Status
//   const handleUpdateStatus = async (bookingId, status) => {
//     if (onUpdateStatus) {
//       await onUpdateStatus(bookingId, status);
//       setDetailsModalVisible(false);
//       if (onRefresh) onRefresh();
//     }
//   };

//   // Booking Details Modal
//   const BookingDetailsModal = () => {
//     if (!selectedBooking) return null;
    
//     return (
//       <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${detailsModalVisible ? '' : 'hidden'}`}>
//         <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderBottomColor: `${customColors.primary}20` }}>
//             <div className="flex items-center gap-3 flex-wrap">
//               <FiCalendar className="text-2xl" style={{ color: customColors.primary }} />
//               <h2 className="text-xl font-semibold">Booking Details</h2>
//               <StatusBadge status={selectedBooking.bookingStatus} />
//               {selectedBooking.groupBooking && (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
//                   <FaUsersIcon size={12} />
//                   Group ({selectedBooking.patientIndex}/{selectedBooking.totalPatients})
//                 </span>
//               )}
//             </div>
//             <button onClick={() => setDetailsModalVisible(false)} className="p-2 hover:bg-gray-100 rounded-full">
//               <FiX size={20} />
//             </button>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Group Progress */}
//             {selectedBooking.groupBooking && selectedBooking.totalPatients > 1 && (
//               <div className="p-4 rounded-lg border" style={{ backgroundColor: `${customColors.purple}10`, borderColor: `${customColors.purple}30` }}>
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <FaUsersIcon className="text-purple-600" />
//                     <h4 className="font-semibold text-purple-900">Group Booking Progress</h4>
//                   </div>
//                   <span className="text-sm font-medium text-purple-700">
//                     Patient {selectedBooking.patientIndex} of {selectedBooking.totalPatients}
//                   </span>
//                 </div>
//                 <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
//                   <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(selectedBooking.patientIndex / selectedBooking.totalPatients) * 100}%`, backgroundColor: customColors.primary }} />
//                 </div>
//               </div>
//             )}

//             {/* Status Timeline */}
//             <div className="flex justify-between items-center">
//               {['pending', 'confirmed', 'completed'].map((step, index) => {
//                 const isActive = 
//                   (selectedBooking.bookingStatus === 'pending' && index === 0) ||
//                   (selectedBooking.bookingStatus === 'confirmed' && index <= 1) ||
//                   (selectedBooking.bookingStatus === 'completed' && index <= 2);
                
//                 const Icon = index === 0 ? FiClock : index === 1 ? FaCheckCircle : FaShieldAlt;
                
//                 return (
//                   <div key={step} className="flex-1 text-center">
//                     <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all ${isActive ? 'text-white' : 'bg-gray-200 text-gray-500'}`} style={{ backgroundColor: isActive ? customColors.primary : undefined }}>
//                       <Icon size={18} />
//                     </div>
//                     <p className="mt-2 text-sm font-medium capitalize">{step}</p>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Info Grid */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="p-4 rounded-lg" style={{ backgroundColor: `${customColors.bgLight}20` }}>
//                 <h3 className="font-semibold mb-3">Booking Information</h3>
//                 <div className="space-y-2 text-sm">
//                   <p><span className="text-gray-500">Reference:</span> {selectedBooking.bookingReference}</p>
//                   <p><span className="text-gray-500">Booking Date:</span> {dayjs(selectedBooking.createdAt).format('DD MMM YYYY, hh:mm A')}</p>
//                   <p><span className="text-gray-500">Appointment:</span> {selectedBooking.appointmentDetails?.preferredDate ? dayjs(selectedBooking.appointmentDetails.preferredDate).format('DD MMM YYYY, hh:mm A') : 'Not scheduled'}</p>
//                   <p><span className="text-gray-500">Type:</span> {selectedBooking.groupBooking ? `Group (${selectedBooking.patientIndex}/${selectedBooking.totalPatients})` : 'Individual'}</p>
//                 </div>
//               </div>

//               <div className="p-4 rounded-lg" style={{ backgroundColor: `${customColors.bgLight}20` }}>
//                 <h3 className="font-semibold mb-3">Patient Information</h3>
//                 <div className="space-y-2 text-sm">
//                   <p><span className="text-gray-500">Name:</span> {selectedBooking.patientDetails?.name}</p>
//                   <p><span className="text-gray-500">Age/Gender:</span> {selectedBooking.patientDetails?.age} / {selectedBooking.patientDetails?.gender}</p>
//                   <p><span className="text-gray-500">Mobile:</span> {selectedBooking.patientDetails?.mobile}</p>
//                   <p><span className="text-gray-500">Email:</span> {selectedBooking.patientDetails?.email}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Tests */}
//             <div className="border rounded-lg overflow-hidden">
//               <div className="px-4 py-3 border-b flex justify-between items-center" style={{ backgroundColor: `${customColors.bgLight}20` }}>
//                 <h3 className="font-semibold">Tests Ordered</h3>
//                 <p className="font-bold" style={{ color: customColors.primary }}>Total: Rs.{selectedBooking.totalAmount?.toLocaleString()}</p>
//               </div>
//               <div className="divide-y">
//                 {(selectedBooking.tests || []).map((test, index) => (
//                   <div key={index} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}>
//                         <FaMicroscope size={16} />
//                       </div>
//                       <div>
//                         <p className="font-medium">{test.name}</p>
//                       </div>
//                     </div>
//                     <p className="font-semibold">Rs.{test.price?.toLocaleString()}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payment Summary */}
//             <div className="p-4 rounded-lg" style={{ backgroundColor: `${customColors.bgLight}20` }}>
//               <h3 className="font-semibold mb-3">Payment Summary</h3>
//               <div className="grid grid-cols-3 gap-4 mb-4">
//                 <div className="bg-white p-3 rounded-lg">
//                   <p className="text-xs text-gray-500">Original</p>
//                   <p className="text-lg font-semibold">Rs.{selectedBooking.originalAmount || 0}</p>
//                 </div>
//                 <div className="bg-white p-3 rounded-lg">
//                   <p className="text-xs text-gray-500">Discount</p>
//                   <p className="text-lg font-semibold text-green-600">- Rs.{selectedBooking.discountApplied || 0}</p>
//                 </div>
//                 <div className="bg-white p-3 rounded-lg">
//                   <p className="text-xs text-gray-500">Saved</p>
//                   <p className="text-lg font-semibold text-yellow-600">Rs.{selectedBooking.amountSaved || 0}</p>
//                 </div>
//               </div>
//               <div className="border-t pt-4 text-right">
//                 <p className="text-3xl font-bold" style={{ color: customColors.primary }}>Rs.{selectedBooking.totalAmount?.toLocaleString()}</p>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3 flex-wrap">
//             <button onClick={() => setDetailsModalVisible(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Close</button>
//             {selectedBooking?.bookingStatus === 'pending' && (
//               <button onClick={() => handleUpdateStatus(selectedBooking._id, 'confirmed')} className="px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: customColors.success }}>
//                 <FaCheckCircle size={16} className="inline mr-2" />Confirm Booking
//               </button>
//             )}
//             {selectedBooking?.bookingStatus === 'confirmed' && (
//               <button onClick={() => handleUpdateStatus(selectedBooking._id, 'completed')} className="px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: customColors.success }}>
//                 <FaShieldAlt size={16} className="inline mr-2" />Mark Completed
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Schedule Collection Modal
//   const ScheduleModal = () => {
//     const pendingBookings = bookings?.filter(b => b.bookingStatus === 'confirmed') || [];
    
//     return (
//       <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${scheduleModalVisible ? '' : 'hidden'}`}>
//         <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Schedule Sample Collection</h3>
//               <button onClick={() => setScheduleModalVisible(false)} className="p-1 hover:bg-gray-100 rounded-full">
//                 <FiX size={20} />
//               </button>
//             </div>
            
//             <form onSubmit={handleScheduleCollection} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Select Booking</label>
//                 <select
//                   value={scheduleForm.bookingId}
//                   onChange={(e) => setScheduleForm({ ...scheduleForm, bookingId: e.target.value })}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                   required
//                 >
//                   <option value="">Select a booking</option>
//                   {pendingBookings.map(booking => (
//                     <option key={booking._id} value={booking._id}>
//                       {booking.bookingReference} - {booking.patientDetails?.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Collection Date</label>
//                 <input
//                   type="date"
//                   value={scheduleForm.scheduledDate}
//                   onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                   required
//                   min={dayjs().format('YYYY-MM-DD')}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Time Slot</label>
//                 <select
//                   value={scheduleForm.scheduledTimeSlot}
//                   onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledTimeSlot: e.target.value })}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                 >
//                   <option value="morning">Morning (9 AM - 12 PM)</option>
//                   <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
//                   <option value="evening">Evening (3 PM - 6 PM)</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={scheduleForm.fastingRequired}
//                     onChange={(e) => setScheduleForm({ ...scheduleForm, fastingRequired: e.target.checked })}
//                   />
//                   <span className="text-sm">Fasting Required</span>
//                 </label>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Special Instructions</label>
//                 <textarea
//                   value={scheduleForm.specialInstructions}
//                   onChange={(e) => setScheduleForm({ ...scheduleForm, specialInstructions: e.target.value })}
//                   rows={3}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                   placeholder="Any special instructions..."
//                 />
//               </div>
              
//               <div className="flex gap-3 pt-4">
//                 <button type="button" onClick={() => setScheduleModalVisible(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: customColors.primary }}>
//                   {submitting ? <FiLoader className="animate-spin inline mr-2" /> : null}
//                   Schedule
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Upload Report Modal
//   const ReportModal = () => {
//     return (
//       <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ${reportModalVisible ? '' : 'hidden'}`}>
//         <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Upload Report</h3>
//               <button onClick={() => setReportModalVisible(false)} className="p-1 hover:bg-gray-100 rounded-full">
//                 <FiX size={20} />
//               </button>
//             </div>
            
//             <form onSubmit={handleUploadReport} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Select Booking</label>
//                 <select
//                   value={reportForm.bookingId}
//                   onChange={(e) => setReportForm({ ...reportForm, bookingId: e.target.value })}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                   required
//                 >
//                   <option value="">Select a booking</option>
//                   {bookings?.filter(b => b.bookingStatus === 'confirmed' || b.bookingStatus === 'completed').map(booking => (
//                     <option key={booking._id} value={booking._id}>
//                       {booking.bookingReference} - {booking.patientDetails?.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Select Test</label>
//                 <select
//                   value={reportForm.testId}
//                   onChange={(e) => setReportForm({ ...reportForm, testId: e.target.value })}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                   required
//                 >
//                   <option value="">Select a test</option>
//                   {tests?.map(test => (
//                     <option key={test._id} value={test._id}>{test.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Report File (PDF/Image)</label>
//                 <input
//                   type="file"
//                   onChange={(e) => setReportForm({ ...reportForm, reportFile: e.target.files[0] })}
//                   accept=".pdf,.jpg,.png,.jpeg"
//                   className="w-full p-2 border rounded-lg"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">Report Summary</label>
//                 <textarea
//                   value={reportForm.reportData}
//                   onChange={(e) => setReportForm({ ...reportForm, reportData: e.target.value })}
//                   rows={3}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{ outlineColor: customColors.primary }}
//                   placeholder="Enter report summary..."
//                 />
//               </div>
              
//               <div className="flex gap-3 pt-4">
//                 <button type="button" onClick={() => setReportModalVisible(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: customColors.primary }}>
//                   {submitting ? <FiLoader className="animate-spin inline mr-2" /> : null}
//                   Upload
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Dashboard Tab
//   if (activeTab === 'dashboard') {
//     return (
//       <div className="space-y-6">
//         {/* Welcome Card */}
//         <div className="rounded-xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})` }}>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
//                 <FaHospital size={32} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">Welcome back, {lab?.name || 'Lab'}!</h2>
//                 <p className="text-white/80">{dayjs().format('dddd, MMMM D, YYYY')}</p>
//               </div>
//             </div>
//             <button onClick={onRefresh} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors">
//               <FiRefreshCw size={16} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard title="Total Bookings" value={safeStats.totalBookings} color={customColors.primary} icon={FiCalendar} progress={completionRate} />
//           <StatCard title="Group Bookings" value={safeStats.groupBookings} color={customColors.purple} icon={FaUsersIcon} progress={safeStats.totalBookings ? (safeStats.groupBookings / safeStats.totalBookings) * 100 : 0} />
//           <StatCard title="Completed" value={safeStats.completedBookings} color={customColors.success} icon={FaCheckCircle} progress={(safeStats.completedBookings / safeStats.totalBookings) * 100 || 0} />
//           <StatCard title="Total Revenue" value={`Rs.${safeStats.totalRevenue.toLocaleString()}`} color={customColors.accent} icon={FiDollarSign} progress={75} />
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
//               <h3 className="font-semibold flex items-center gap-2">
//                 <FaChartLine style={{ color: customColors.primary }} />
//                 Booking Trends
//               </h3>
//               <div className="flex bg-gray-100 rounded-lg p-1">
//                 <ChartTypeButton type="line" current={chartType} onClick={setChartType} icon={FaChartLine} />
//                 <ChartTypeButton type="bar" current={chartType} onClick={setChartType} icon={FaChartBar} />
//                 <ChartTypeButton type="area" current={chartType} onClick={setChartType} icon={FaChartLine} />
//               </div>
//             </div>
            
//             {bookings?.length > 0 ? (
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   {chartType === 'line' && (
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                       <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                       <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
//                       <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Legend />
//                       <Line yAxisId="left" type="monotone" dataKey="bookings" stroke={customColors.primary} name="Bookings" strokeWidth={2} dot={false} />
//                       <Line yAxisId="left" type="monotone" dataKey="groupBookings" stroke={customColors.purple} name="Group Bookings" strokeWidth={2} dot={false} />
//                       <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={customColors.success} name="Revenue" strokeWidth={2} dot={false} />
//                     </LineChart>
//                   )}
//                   {chartType === 'bar' && (
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                       <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="bookings" fill={customColors.primary} name="Bookings" radius={[4, 4, 0, 0]} />
//                       <Bar dataKey="groupBookings" fill={customColors.purple} name="Group Bookings" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   )}
//                   {chartType === 'area' && (
//                     <AreaChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                       <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Legend />
//                       <Area type="monotone" dataKey="bookings" stackId="1" stroke={customColors.primary} fill={customColors.primary} fillOpacity={0.2} name="Bookings" />
//                       <Area type="monotone" dataKey="groupBookings" stackId="1" stroke={customColors.purple} fill={customColors.purple} fillOpacity={0.2} name="Group Bookings" />
//                     </AreaChart>
//                   )}
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="h-80 flex items-center justify-center text-gray-500">
//                 <FiActivity size={32} className="mr-2" />
//                 No booking data available
//               </div>
//             )}
//           </div>

//           <div className="bg-white rounded-xl p-4 shadow-sm">
//             <h3 className="font-semibold mb-4 flex items-center gap-2">
//               <FaChartPie style={{ color: customColors.primary }} />
//               Status Distribution
//             </h3>
//             {safeStats.totalBookings > 0 ? (
//               <div className="space-y-4">
//                 <div className="h-48">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="count">
//                         {statusDistribution.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//                 {statusDistribution.map((item) => (
//                   <div key={item.status}>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>{item.status}</span>
//                       <span className="font-semibold">{item.count}</span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(item.count / safeStats.totalBookings) * 100}%`, backgroundColor: item.color }} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="h-48 flex items-center justify-center text-gray-500">No data available</div>
//             )}
//           </div>
//         </div>

//         {/* Recent Bookings */}
//         <div className="bg-white rounded-xl p-4 shadow-sm">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <FiCalendar style={{ color: customColors.primary }} />
//               Recent Bookings
//             </h3>
//             <button onClick={() => setActiveTab('bookings')} className="text-sm flex items-center gap-1 hover:underline" style={{ color: customColors.primary }}>
//               View All <FiArrowRight size={14} />
//             </button>
//           </div>
          
//           {filteredBookings?.length > 0 ? (
//             <div className="divide-y">
//               {filteredBookings.slice(0, 5).map((booking) => (
//                 <div key={booking._id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${booking.groupBooking ? 'bg-purple-500' : booking.bookingStatus === 'pending' ? 'bg-yellow-500' : booking.bookingStatus === 'confirmed' ? 'bg-teal-500' : 'bg-green-500'}`}>
//                       {booking.groupBooking ? <FaUsersIcon size={18} /> : <FiUser size={18} />}
//                     </div>
//                     <div>
//                       <p className="font-medium">{booking.patientDetails?.name}</p>
//                       <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
//                         <span className="flex items-center gap-1"><FaFlask size={12} /> {booking.tests?.length} tests</span>
//                         <span className="flex items-center gap-1"><FiDollarSign size={12} /> Rs.{booking.totalAmount}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button onClick={() => { setSelectedBooking(booking); setDetailsModalVisible(true); }} className="px-3 py-1 border rounded-lg hover:bg-gray-50 flex items-center gap-1 transition-colors">
//                     <FiEye size={14} /> View
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="py-12 text-center text-gray-500">No recent bookings</div>
//           )}
//         </div>

//         <BookingDetailsModal />
//       </div>
//     );
//   }

//   // Tests Tab
//   if (activeTab === 'tests') {
//     const filteredTests = tests?.filter(t => !searchText || t?.name?.toLowerCase().includes(searchText.toLowerCase())) || [];

//     const calculateDiscountedPrice = (originalPrice) => {
//       if (!originalPrice) return 0;
//       const labDiscount = lab?.discount || 0;
//       return originalPrice - (originalPrice * labDiscount / 100);
//     };

//     return (
//       <div className="bg-white rounded-xl shadow-sm">
//         <div className="p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderBottomColor: `${customColors.primary}20` }}>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}>
//               <FaFlask size={20} />
//             </div>
//             <h2 className="text-xl font-semibold">Test Management</h2>
//             <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}>{tests?.length || 0} Tests</span>
//           </div>
//           <div className="flex gap-3">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input type="text" placeholder="Search tests..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2" style={{ outlineColor: customColors.primary }} />
//             </div>
//             <button onClick={onAddTest} className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: customColors.primary }}>
//               <FiPlus size={16} /> Add Test
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead style={{ backgroundColor: `${customColors.bgLight}30` }}>
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Test Details</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Discounted</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {filteredTests.map((test) => {
//                 const discountedPrice = calculateDiscountedPrice(test.price);
//                 return (
//                   <tr key={test._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}><FaMicroscope size={16} /></div>
//                         <div><p className="font-medium">{test.name}</p>{test.description && <p className="text-sm text-gray-500">{test.description}</p>}</div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">Rs.{test.price?.toLocaleString() || 0}</td>
//                     <td className="px-4 py-3"><p className="font-semibold" style={{ color: customColors.primary }}>Rs.{discountedPrice.toLocaleString()}</p></td>
//                     <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => onEditTest(test)} className="p-2 border rounded-lg hover:bg-gray-50"><FiEdit2 size={16} /></button><button onClick={() => { if (window.confirm('Delete this test?')) onDeleteTest(test._id); }} className="p-2 border rounded-lg hover:bg-red-50 text-red-600"><FiTrash2 size={16} /></button></div></td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {filteredTests.length === 0 && (<div className="py-12 text-center"><FaFlask size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No tests found</p></div>)}
//       </div>
//     );
//   }

//   // Bookings Tab
//   if (activeTab === 'bookings') {
//     return (
//       <>
//         <div className="bg-white rounded-xl shadow-sm">
//           <div className="p-4 border-b" style={{ borderBottomColor: `${customColors.primary}20` }}>
//             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}><FiCalendar size={20} /></div>
//                 <h2 className="text-xl font-semibold">Booking Management</h2>
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex bg-gray-100 rounded-lg p-1">
//                   {['7', '30', 'all'].map((days) => (
//                     <button key={days} onClick={() => setTimeRange(days)} className={`px-3 py-1 rounded-md text-sm ${timeRange === days ? 'bg-white shadow' : 'hover:bg-gray-200'}`}>
//                       {days === 'all' ? 'All Time' : `${days} Days`}
//                     </button>
//                   ))}
//                 </div>
                
//                 <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1 border rounded-lg text-sm">
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
                
//                 <div className="relative">
//                   <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
//                   <input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="pl-9 pr-4 py-1 border rounded-lg text-sm w-48" />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               <SummaryCard title="Total Revenue" value={`Rs.${safeStats.totalRevenue.toLocaleString()}`} color={customColors.primary} icon={FiDollarSign} />
//               <SummaryCard title="Average Value" value={`Rs.${safeStats.averageBookingValue.toLocaleString()}`} color={customColors.success} icon={FiTrendingUp} />
//               <SummaryCard title="Group Bookings" value={safeStats.groupBookings} color={customColors.purple} icon={FaUsersIcon} />
//               <SummaryCard title="Completed" value={safeStats.completedBookings} color={customColors.success} icon={FaCheckCircle} />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead style={{ backgroundColor: `${customColors.bgLight}30` }}>
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Reference</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Patient</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tests</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {(filteredBookings || []).map((booking) => (
//                   <tr key={booking._id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3"><span className="font-mono text-sm">{booking.bookingReference}</span></td>
//                     <td className="px-4 py-3"><div><p className="font-medium">{booking.patientDetails?.name}</p><p className="text-xs text-gray-500">{booking.patientDetails?.mobile}</p></div></td>
//                     <td className="px-4 py-3">{booking.tests?.length || 0} tests</td>
//                     <td className="px-4 py-3"><p className="font-semibold" style={{ color: customColors.primary }}>Rs.{booking.totalAmount?.toLocaleString()}</p></td>
//                     <td className="px-4 py-3">{dayjs(booking.appointmentDetails?.preferredDate).format('DD MMM YYYY')}</td>
//                     <td className="px-4 py-3"><StatusBadge status={booking.bookingStatus} /></td>
//                     <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => { setSelectedBooking(booking); setDetailsModalVisible(true); }} className="p-2 border rounded-lg hover:bg-gray-50"><FiEye size={16} /></button></div></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredBookings?.length === 0 && (<div className="py-12 text-center"><FiCalendar size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No bookings found</p></div>)}
//         </div>
//         <BookingDetailsModal />
//       </>
//     );
//   }

//   // Patients Tab
//   if (activeTab === 'patients') {
//     const filteredPatients = patients?.filter(p => !searchText || p?.name?.toLowerCase().includes(searchText.toLowerCase()) || p?.email?.toLowerCase().includes(searchText.toLowerCase())) || [];

//     return (
//       <div className="bg-white rounded-xl shadow-sm">
//         <div className="p-4 border-b" style={{ borderBottomColor: `${customColors.primary}20` }}>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}><FiUser size={20} /></div>
//               <h2 className="text-xl font-semibold">Patient Registry</h2>
//               <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}>{patients?.length || 0} Patients</span>
//             </div>
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input type="text" placeholder="Search patients..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-64 pl-10 pr-4 py-2 border rounded-lg" />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//           {filteredPatients.map((patient) => (
//             <div key={patient._id || patient.email} className="border rounded-lg p-4 hover:shadow-md transition">
//               <div className="flex items-start gap-3">
//                 <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"><FaUserCircle size={24} className="text-gray-500" /></div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold">{patient.name}</h3>
//                   <p className="text-sm text-gray-500">{patient.email}</p>
//                   <p className="text-sm text-gray-500">{patient.mobile}</p>
//                   <p className="text-xs text-gray-400 mt-1">{patient.age} yrs, {patient.gender}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredPatients.length === 0 && (<div className="py-12 text-center"><FiUser size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No patients found</p></div>)}
//       </div>
//     );
//   }

//   // Collections Tab
//   if (activeTab === 'collections') {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}><FaTruck size={20} /></div>
//             <h2 className="text-xl font-semibold">Sample Collections</h2>
//           </div>
//           <button onClick={() => setScheduleModalVisible(true)} className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: customColors.primary }}>
//             <FiPlus size={16} /> Schedule Collection
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {collections?.map((collection) => {
//             const patient = collection.bookingId?.patientDetails || collection.patientId;
//             const booking = collection.bookingId;
            
//             return (
//               <div key={collection._id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
//                 <div>
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <p className="text-[10px] text-gray-400 uppercase font-bold">Tracking ID</p>
//                       <p className="font-mono text-sm font-semibold text-gray-700">{collection.trackingId}</p>
//                     </div>
//                     <div className="flex flex-col items-end gap-2">
//                       <StatusBadge status={collection.status} />
//                       <div className="flex gap-1">
//                         <button onClick={() => onEditCollection?.(collection)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-50" title="Edit Schedule">
//                           <FiEdit2 size={14} />
//                         </button>
//                         <button onClick={() => onDeleteCollection?.(collection._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-gray-50" title="Delete Schedule">
//                           <FiTrash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex gap-2">
//                       <FiUser className="text-gray-400 mt-1 shrink-0" size={14} />
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase font-bold">Patient & Booking</p>
//                         <p className="text-sm font-bold text-gray-800">{patient?.name || "N/A"}</p>
//                         <p className="text-xs text-gray-500 font-mono text-indigo-600">{booking?.bookingReference || 'No Ref'}</p>
//                         <p className="text-xs text-gray-500">{patient?.mobile}</p>
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       <FiMapPin className="text-gray-400 mt-1 shrink-0" size={14} />
//                       <p className="text-xs text-gray-600 line-clamp-2">{collection.collectionAddress || "No Address"}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-gray-500">
//                   <div className="flex items-center gap-1 text-xs">
//                     <FiCalendar size={12} />
//                     {dayjs(collection.scheduledDate).format('DD MMM YYYY')}
//                   </div>
//                   <div className="flex items-center gap-1 text-xs capitalize">
//                     <FiClock size={12} />
//                     {collection.scheduledTimeSlot}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {collections?.length === 0 && (<div className="text-center py-12 bg-white rounded-xl"><FaTruck size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No collections scheduled</p></div>)}

//         <ScheduleModal />
//       </div>
//     );
//   }

//   // Reports Tab
//   if (activeTab === 'reports') {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}><FaFilePdf size={20} /></div>
//             <h2 className="text-xl font-semibold">Lab Reports</h2>
//           </div>
//           <button onClick={() => setReportModalVisible(true)} className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: customColors.primary }}>
//             <FiUpload size={16} /> Upload Report
//           </button>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <table className="w-full">
//             <thead style={{ backgroundColor: `${customColors.bgLight}30` }}>
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm">Report #</th>
//                 <th className="px-4 py-3 text-left text-sm">Patient</th>
//                 <th className="px-4 py-3 text-left text-sm">Test</th>
//                 <th className="px-4 py-3 text-left text-sm">Date</th>
//                 <th className="px-4 py-3 text-left text-sm">Status</th>
//                 <th className="px-4 py-3 text-left text-sm">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {reports?.map((report) => (
//                 <tr key={report._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm font-mono">{report.reportNumber}</td>
//                   <td className="px-4 py-3">{report.patientId?.name || 'N/A'}</td>
//                   <td className="px-4 py-3">{report.testId?.name || 'N/A'}</td>
//                   <td className="px-4 py-3">{dayjs(report.reportDate).format('DD MMM YYYY')}</td>
//                   <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
//                   <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800"><FiDownload size={16} /></button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {reports?.length === 0 && (<div className="text-center py-12 bg-white rounded-xl"><FaFilePdf size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No reports found</p></div>)}

//         <ReportModal />
//       </div>
//     );
//   }

//   // Profile Tab
//   if (activeTab === 'profile') {
//     return (
//       <div className="bg-white rounded-xl shadow-sm">
//         <div className="p-4 border-b flex justify-between items-center" style={{ borderBottomColor: `${customColors.primary}20` }}>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${customColors.primary}20`, color: customColors.primary }}><FiUser size={20} /></div>
//             <h2 className="text-xl font-semibold">Lab Profile</h2>
//           </div>
//           <button onClick={onEditProfile} className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: customColors.primary }}>
//             <FiEdit2 size={16} /> Edit Profile
//           </button>
//         </div>

//         {lab ? (
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="md:w-1/3">
//                 {lab.logo ? (
//                   <img src={`${API_BASE_URL}/uploads/${lab.logo}`} alt={lab.name} className="w-full max-w-xs mx-auto rounded-xl shadow-lg" />
//                 ) : (
//                   <div className="w-48 h-48 mx-auto rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})` }}>
//                     <FaHospital size={64} className="text-white" />
//                   </div>
//                 )}
//               </div>
//               <div className="md:w-2/3">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <ProfileField label="Laboratory Name" value={lab.name} icon={FaHospital} />
//                   <ProfileField label="Discount" value={`${lab.discount || 0}% OFF`} icon={FiPercent} />
//                   <div className="sm:col-span-2"><ProfileField label="Branch Locations" value={lab.branches || 'No branches specified'} icon={FaMapMarkerAlt} /></div>
//                   <ProfileField label="Total Tests" value={safeStats.totalTests} icon={FaFlask} />
//                   <ProfileField label="Total Revenue" value={`Rs.${safeStats.totalRevenue.toLocaleString()}`} icon={FiDollarSign} highlight />
//                   <div className="sm:col-span-2">
//                     <p className="text-sm text-gray-500 mb-2">Performance</p>
//                     <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//                       <div className="h-full rounded-full transition-all" style={{ width: `${completionRate}%`, background: `linear-gradient(90deg, ${customColors.success}, ${customColors.primary})` }} />
//                     </div>
//                     <p className="text-sm mt-2">{safeStats.completedBookings} of {safeStats.totalBookings} bookings completed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="py-12 text-center"><FaHospital size={48} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-500">No lab data available</p></div>
//         )}
//       </div>
//     );
//   }

//   return null;
// }

// // Helper Components
// const StatCard = ({ title, value, color, icon: Icon, progress }) => (
//   <div className="bg-white rounded-xl p-4 shadow-sm">
//     <div className="flex items-center justify-between mb-2">
//       <p className="text-sm text-gray-500">{title}</p>
//       <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}><Icon size={16} style={{ color }} /></div>
//     </div>
//     <p className="text-2xl font-bold mb-2" style={{ color }}>{value}</p>
//     <div className="h-1 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: color }} /></div>
//   </div>
// );

// const SummaryCard = ({ title, value, color, icon: Icon }) => (
//   <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}10` }}>
//     <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Icon size={12} style={{ color }} /> {title}</p>
//     <p className="text-lg font-semibold" style={{ color }}>{value}</p>
//   </div>
// );

// const ProfileField = ({ label, value, icon: Icon, highlight }) => (
//   <div>
//     <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Icon size={14} /> {label}</p>
//     <div className={`text-base font-medium ${highlight ? 'text-xl' : ''}`} style={highlight ? { color: customColors.primary } : {}}>{value}</div>
//   </div>
// );

// const ChartTypeButton = ({ type, current, onClick, icon: Icon }) => (
//   <button onClick={() => onClick(type)} className={`p-2 rounded-md transition-colors ${current === type ? 'bg-white shadow' : 'hover:bg-gray-200'}`}>
//     <Icon size={14} />
//   </button>
// );