// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import {
// //   FaCalendarAlt,
// //   FaHome,
// //   FaHospital,
// //   FaCheckCircle,
// //   FaExclamationTriangle,
// //   FaUser,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaTag,
// //   FaArrowLeft
// // } from 'react-icons/fa';

// // export default function BookingPage() {
// //   const { id: labId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { selectedTests } = location.state || {};

// //   const isSubmitting = useRef(false);
// //   const [error, setError] = useState(null);
// //   const [formErrors, setFormErrors] = useState({});

// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [bookingSuccess, setBookingSuccess] = useState(false);
// //   const [bookingDetails, setBookingDetails] = useState(null);

// //   // Form state
// //   const [patientDetails, setPatientDetails] = useState({
// //     name: '',
// //     age: '',
// //     gender: '',
// //     mobile: '',
// //     email: '',
// //     address: ''
// //   });

// //   const [appointmentDetails, setAppointmentDetails] = useState({
// //     preferredDate: '',
// //     sampleCollectionType: 'home',
// //     addressForCollection: ''
// //   });

// //   const [termsAccepted, setTermsAccepted] = useState(false);

// //   useEffect(() => {
// //     if (selectedTests?.length) {
// //       fetchLabAndTests();
// //     } else {
// //       navigate(`/labs/${labId}`);
// //     }

// //     // Set tomorrow's date as default
// //     const tomorrow = new Date();
// //     tomorrow.setDate(tomorrow.getDate() + 1);
// //     const formattedDate = tomorrow.toISOString().split('T')[0];
// //     setAppointmentDetails(prev => ({
// //       ...prev,
// //       preferredDate: formattedDate
// //     }));
// //   }, []);

// //   const fetchLabAndTests = async () => {
// //     try {
// //       const [labRes, testsRes] = await Promise.all([
// //         axios.get(`http://localhost:5000/api/labs/${labId}`),
// //         axios.get(`http://localhost:5000/api/tests/lab/${labId}`)
// //       ]);

// //       setLab(labRes.data);
// //       const allTests = testsRes.data || [];
// //       const selectedTestDetails = allTests.filter(test =>
// //         selectedTests.includes(test._id)
// //       );
// //       setTests(selectedTestDetails);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       setError('Failed to load lab details. Please try again.');
// //     }
// //   };

// //   const calculateTotal = () => {
// //     if (!lab || !tests.length) return { original: 0, final: 0, discount: 0 };

// //     const original = tests.reduce((sum, test) => sum + Number(test.price), 0);
// //     const discount = lab.discount || 0;
// //     const final = Math.round(original - (original * discount / 100));

// //     return { original: Math.round(original), final, discount };
// //   };

// //   const validateField = (field, value) => {
// //     const errors = { ...formErrors };

// //     switch (field) {
// //       case 'name':
// //         if (!value.trim()) {
// //           errors.name = 'Name is required';
// //         } else if (value.trim().length < 2) {
// //           errors.name = 'Name must be at least 2 characters';
// //         } else {
// //           delete errors.name;
// //         }
// //         break;

// //       case 'age':
// //         if (!value) {
// //           errors.age = 'Age is required';
// //         } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
// //           errors.age = 'Please enter a valid age (1-120)';
// //         } else {
// //           delete errors.age;
// //         }
// //         break;

// //       case 'mobile':
// //         const mobileRegex = /^[0-9]{10}$/;
// //         if (!value) {
// //           errors.mobile = 'Mobile number is required';
// //         } else if (!mobileRegex.test(value)) {
// //           errors.mobile = 'Please enter a valid 10-digit mobile number';
// //         } else {
// //           delete errors.mobile;
// //         }
// //         break;

// //       case 'email':
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         if (!value) {
// //           errors.email = 'Email is required';
// //         } else if (!emailRegex.test(value)) {
// //           errors.email = 'Please enter a valid email address';
// //         } else {
// //           delete errors.email;
// //         }
// //         break;

// //       case 'address':
// //         if (!value.trim()) {
// //           errors.address = 'Address is required';
// //         } else if (value.trim().length < 10) {
// //           errors.address = 'Please enter a complete address';
// //         } else {
// //           delete errors.address;
// //         }
// //         break;

// //       case 'preferredDate':
// //         if (!value) {
// //           errors.preferredDate = 'Please select a date';
// //         } else {
// //           const selectedDate = new Date(value);
// //           const today = new Date();
// //           today.setHours(0, 0, 0, 0);

// //           if (selectedDate < today) {
// //             errors.preferredDate = 'Date cannot be in the past';
// //           } else {
// //             delete errors.preferredDate;
// //           }
// //         }
// //         break;
// //     }

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleInputChange = (field, value) => {
// //     setPatientDetails(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));

// //     if (formErrors[field]) {
// //       validateField(field, value);
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Validate patient details
// //     Object.keys(patientDetails).forEach(field => {
// //       validateField(field, patientDetails[field]);
// //     });

// //     // Validate appointment date
// //     validateField('preferredDate', appointmentDetails.preferredDate);

// //     // Check if all required fields are filled
// //     const requiredFields = ['name', 'age', 'gender', 'mobile', 'email', 'address'];
// //     const missingFields = requiredFields.filter(field => !patientDetails[field]);

// //     if (missingFields.length > 0) {
// //       setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
// //       return false;
// //     }

// //     if (!appointmentDetails.preferredDate) {
// //       setError('Please select a preferred date');
// //       return false;
// //     }

// //     if (!termsAccepted) {
// //       setError('Please accept the terms and conditions');
// //       return false;
// //     }

// //     return Object.keys(formErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (isSubmitting.current) return;

// //     if (!selectedTests?.length) {
// //       setError('Please select tests first');
// //       setTimeout(() => navigate(`/labs/${labId}`), 2000);
// //       return;
// //     }

// //     if (!validateForm()) {
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     isSubmitting.current = true;

// //     try {
// //       const total = calculateTotal();

// //       // IMPORTANT: Format the data exactly as backend expects
// //       const bookingData = {
// //         labId,
// //         testIds: selectedTests,
// //         patientDetails: {
// //           name: patientDetails.name.trim(),
// //           age: Number(patientDetails.age),
// //           gender: patientDetails.gender,
// //           mobile: patientDetails.mobile,
// //           email: patientDetails.email.trim(),
// //           address: patientDetails.address.trim()
// //         },
// //         appointmentDetails: {
// //           preferredDate: new Date(appointmentDetails.preferredDate).toISOString(),
// //           sampleCollectionType: appointmentDetails.sampleCollectionType,
// //           addressForCollection: appointmentDetails.addressForCollection?.trim() || patientDetails.address.trim()
// //         }
// //       };

// //       console.log('Sending booking data:', bookingData);

// //       const response = await axios.post(
// //         'http://localhost:5000/api/bookings',
// //         bookingData,
// //         {
// //           timeout: 10000,
// //           headers: {
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       console.log('Booking response:', response.data);

// //       setBookingSuccess(true);
// //       setBookingDetails(response.data.booking);

// //       // Clear localStorage
// //       localStorage.removeItem(`selectedTests_lab_${labId}`);

// //     } catch (error) {
// //       console.error('Booking error details:', error);

// //       let errorMessage = 'Booking failed. Please try again.';

// //       if (error.response) {
// //         const { data } = error.response;
// //         console.log('Error response data:', data);

// //         if (data.error) {
// //           errorMessage = data.error;
// //           if (data.details) {
// //             if (Array.isArray(data.details)) {
// //               errorMessage += `: ${data.details.join(', ')}`;
// //             } else if (typeof data.details === 'object') {
// //               errorMessage += `: ${JSON.stringify(data.details)}`;
// //             } else {
// //               errorMessage += `: ${data.details}`;
// //             }
// //           }
// //         } else if (data.message) {
// //           errorMessage = data.message;
// //         }
// //       } else if (error.request) {
// //         errorMessage = 'No response from server. Please check your connection.';
// //       } else {
// //         errorMessage = error.message;
// //       }

// //       setError(errorMessage);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     } finally {
// //       setLoading(false);
// //       isSubmitting.current = false;
// //     }
// //   };

// //   const total = calculateTotal();

// //   if (bookingSuccess && bookingDetails) {
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-12" style={{ animation: 'fadeIn 0.5s ease-out' }}>
// //         <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 text-center shadow-xl">
// //           <div className="flex justify-center mb-6">
// //             <div className="bg-green-100 p-4 rounded-full">
// //               <FaCheckCircle className="text-6xl text-green-500" />
// //             </div>
// //           </div>

// //           <h1 className="text-3xl font-bold text-gray-900 mb-3">
// //             Booking Confirmed! 🎉
// //           </h1>
// //           <p className="text-gray-600 text-lg mb-8">
// //             Your appointment has been scheduled successfully
// //           </p>

// //           <div className="bg-white rounded-2xl p-6 mb-8 shadow-md">
// //             <div className="grid md:grid-cols-2 gap-6 mb-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-gray-500 text-sm">Booking Reference</p>
// //                   <p className="font-bold text-xl text-blue-600 tracking-wide">
// //                     {bookingDetails.bookingReference}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-gray-500 text-sm">Patient Name</p>
// //                   <p className="font-semibold text-lg">{bookingDetails.patientDetails?.name}</p>
// //                 </div>

// //                 <div>
// //                   <p className="text-gray-500 text-sm">Contact Number</p>
// //                   <p className="font-semibold">{bookingDetails.patientDetails?.mobile}</p>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-gray-500 text-sm">Appointment Date</p>
// //                   <p className="font-semibold">
// //                     {bookingDetails.appointmentDetails?.preferredDate
// //                       ? new Date(bookingDetails.appointmentDetails.preferredDate).toLocaleDateString('en-IN', {
// //                           weekday: 'long',
// //                           year: 'numeric',
// //                           month: 'long',
// //                           day: 'numeric'
// //                         })
// //                       : 'Not specified'}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-gray-500 text-sm">Collection Type</p>
// //                   <p className="font-semibold capitalize">
// //                     {bookingDetails.appointmentDetails?.sampleCollectionType === 'home'
// //                       ? 'Home Collection'
// //                       : 'Lab Visit'}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-gray-500 text-sm">Total Tests</p>
// //                   <p className="font-semibold">{bookingDetails.tests?.length || 0} Tests</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="border-t pt-6">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-600">Total Amount</span>
// //                 <div className="text-right">
// //                   <p className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
// //                     Rs {total.final}
// //                   </p>
// //                   <p className="text-sm text-gray-500">
// //                     <s>Rs {total.original}</s> • Saved Rs {total.original - total.final}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-blue-50 rounded-xl p-4 mb-8">
// //             <p className="text-sm text-gray-700">
// //               <span className="font-semibold">Next Steps:</span> You will receive a confirmation call from the lab within 30 minutes.
// //               Please keep your booking reference handy for any queries.
// //             </p>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <button
// //               onClick={() => window.print()}
// //               className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
// //             >
// //               Print Receipt
// //             </button>
// //             <button
// //               onClick={() => navigate('/')}
// //               className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
// //             >
// //               Back to Home
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Error Alert */}
// //       {error && (
// //         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl" style={{ animation: 'slideDown 0.3s ease-out' }}>
// //           <div className="flex items-start gap-3">
// //             <FaExclamationTriangle className="text-red-500 mt-0.5" />
// //             <div className="flex-1">
// //               <p className="font-medium text-red-700">{error}</p>
// //               <button
// //                 onClick={() => setError(null)}
// //                 className="text-sm text-red-600 hover:text-red-800 mt-1"
// //               >
// //                 Dismiss
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <button
// //         onClick={() => navigate(`/labs/${labId}`)}
// //         className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 group"
// //       >
// //         <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //         Back to Lab
// //       </button>

// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
// //           <p className="text-gray-600 mt-2">Fill in your details to schedule the tests</p>
// //         </div>

// //         {lab && (
// //           <div className="flex items-center gap-3 mt-4 lg:mt-0">
// //             <img
// //               src={`http://localhost:5000/uploads/${lab.logo}`}
// //               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border shadow-sm"
// //               alt={lab.name}
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/48?text=Lab';
// //               }}
// //             />
// //             <div>
// //               <h3 className="font-semibold">{lab.name}</h3>
// //               <p className="text-sm text-gray-500">{lab.branches}</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className="grid lg:grid-cols-3 gap-8">
// //         {/* Left Column: Booking Form */}
// //         <div className="lg:col-span-2">
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Patient Details Card */}
// //             <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="bg-blue-100 p-2 rounded-lg">
// //                   <FaUser className="text-blue-600" />
// //                 </div>
// //                 <h2 className="text-xl font-semibold text-gray-900">
// //                   Patient Information
// //                 </h2>
// //               </div>

// //               <div className="grid md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Full Name *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={patientDetails.name}
// //                     onChange={(e) => handleInputChange('name', e.target.value)}
// //                     onBlur={() => validateField('name', patientDetails.name)}
// //                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.name ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
// //                     }`}
// //                     placeholder="Enter patient's full name"
// //                   />
// //                   {formErrors.name && (
// //                     <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Age *
// //                   </label>
// //                   <input
// //                     type="number"
// //                     min="1"
// //                     max="120"
// //                     value={patientDetails.age}
// //                     onChange={(e) => handleInputChange('age', e.target.value)}
// //                     onBlur={() => validateField('age', patientDetails.age)}
// //                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.age ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
// //                     }`}
// //                     placeholder="Age in years"
// //                   />
// //                   {formErrors.age && (
// //                     <p className="mt-1 text-sm text-red-600">{formErrors.age}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Gender *
// //                   </label>
// //                   <select
// //                     value={patientDetails.gender}
// //                     onChange={(e) => handleInputChange('gender', e.target.value)}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition"
// //                   >
// //                     <option value="">Select Gender</option>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //                     <option value="other">Other</option>
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Mobile Number *
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaPhone className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type="tel"
// //                       value={patientDetails.mobile}
// //                       onChange={(e) => handleInputChange('mobile', e.target.value)}
// //                       onBlur={() => validateField('mobile', patientDetails.mobile)}
// //                       className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                         formErrors.mobile ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
// //                       }`}
// //                       placeholder="9876543210"
// //                       maxLength="10"
// //                     />
// //                   </div>
// //                   {formErrors.mobile && (
// //                     <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
// //                   )}
// //                 </div>

// //                 <div className="md:col-span-2">
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Email Address *
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaEnvelope className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type="email"
// //                       value={patientDetails.email}
// //                       onChange={(e) => handleInputChange('email', e.target.value)}
// //                       onBlur={() => validateField('email', patientDetails.email)}
// //                       className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                         formErrors.email ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
// //                       }`}
// //                       placeholder="patient@example.com"
// //                     />
// //                   </div>
// //                   {formErrors.email && (
// //                     <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
// //                   )}
// //                 </div>

// //                 <div className="md:col-span-2">
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Complete Address *
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute top-3 left-3">
// //                       <FaMapMarkerAlt className="text-gray-400" />
// //                     </div>
// //                     <textarea
// //                       value={patientDetails.address}
// //                       onChange={(e) => handleInputChange('address', e.target.value)}
// //                       onBlur={() => validateField('address', patientDetails.address)}
// //                       rows="3"
// //                       className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                         formErrors.address ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
// //                       }`}
// //                       placeholder="House no., Street, Landmark, City, State - Pincode"
// //                     />
// //                   </div>
// //                   {formErrors.address && (
// //                     <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Appointment Details Card */}
// //             <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="bg-purple-100 p-2 rounded-lg">
// //                   <FaCalendarAlt className="text-purple-600" />
// //                 </div>
// //                 <h2 className="text-xl font-semibold text-gray-900">
// //                   Appointment Details
// //                 </h2>
// //               </div>

// //               <div className="space-y-6">
// //                 {/* Date Selection */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Preferred Date for Sample Collection *
// //                   </label>
// //                   <div className="relative max-w-md">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaCalendarAlt className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       type="date"
// //                       value={appointmentDetails.preferredDate}
// //                       onChange={(e) => {
// //                         setAppointmentDetails(prev => ({
// //                           ...prev,
// //                           preferredDate: e.target.value
// //                         }));
// //                         validateField('preferredDate', e.target.value);
// //                       }}
// //                       min={new Date().toISOString().split('T')[0]}
// //                       className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                         formErrors.preferredDate ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
// //                       }`}
// //                     />
// //                   </div>
// //                   {formErrors.preferredDate && (
// //                     <p className="mt-1 text-sm text-red-600">{formErrors.preferredDate}</p>
// //                   )}
// //                 </div>

// //                 {/* Sample Collection Type */}
// //                 {/* <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-3">
// //                     How would you like to give the sample? *
// //                   </label>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <button
// //                       type="button"
// //                       onClick={() => setAppointmentDetails({
// //                         ...appointmentDetails,
// //                         sampleCollectionType: 'home'
// //                       })}
// //                       className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${
// //                         appointmentDetails.sampleCollectionType === 'home'
// //                           ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
// //                           : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
// //                       }`}
// //                     >
// //                       <div className={`p-3 rounded-full ${
// //                         appointmentDetails.sampleCollectionType === 'home'
// //                           ? 'bg-blue-100'
// //                           : 'bg-gray-100'
// //                       }`}>
// //                         <FaHome className={`text-2xl ${
// //                           appointmentDetails.sampleCollectionType === 'home'
// //                             ? 'text-blue-600'
// //                             : 'text-gray-400'
// //                         }`} />
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="font-semibold text-lg">Home Collection</div>
// //                         <div className="text-sm text-gray-500 mt-2">
// //                           Our technician will visit your location for sample collection
// //                         </div>
// //                       </div>
// //                     </button>

// //                     <button
// //                       type="button"
// //                       onClick={() => setAppointmentDetails({
// //                         ...appointmentDetails,
// //                         sampleCollectionType: 'lab'
// //                       })}
// //                       className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${
// //                         appointmentDetails.sampleCollectionType === 'lab'
// //                           ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
// //                           : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
// //                       }`}
// //                     >
// //                       <div className={`p-3 rounded-full ${
// //                         appointmentDetails.sampleCollectionType === 'lab'
// //                           ? 'bg-blue-100'
// //                           : 'bg-gray-100'
// //                       }`}>
// //                         <FaHospital className={`text-2xl ${
// //                           appointmentDetails.sampleCollectionType === 'lab'
// //                             ? 'text-blue-600'
// //                             : 'text-gray-400'
// //                         }`} />
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="font-semibold text-lg">Visit Lab</div>
// //                         <div className="text-sm text-gray-500 mt-2">
// //                           Visit our nearest lab center for sample collection
// //                         </div>
// //                       </div>
// //                     </button>
// //                   </div>
// //                 </div> */}

// //                 {/* Address for Collection (if home collection) */}
// //                 {appointmentDetails.sampleCollectionType === 'home' && (
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Collection Address (Optional)
// //                       <span className="text-gray-500 font-normal ml-1">
// //                         - Leave blank if same as patient address
// //                       </span>
// //                     </label>
// //                     <textarea
// //                       value={appointmentDetails.addressForCollection}
// //                       onChange={(e) => setAppointmentDetails({
// //                         ...appointmentDetails,
// //                         addressForCollection: e.target.value
// //                       })}
// //                       rows="2"
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition"
// //                       placeholder="Enter different collection address (optional)"
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Terms & Conditions */}
// //             <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition">
// //               <div className="flex items-start gap-3">
// //                 <input
// //                   type="checkbox"
// //                   id="terms"
// //                   checked={termsAccepted}
// //                   onChange={(e) => setTermsAccepted(e.target.checked)}
// //                   className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                 />
// //                 <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
// //                   <span className="font-semibold">Terms & Conditions:</span> I agree that the information provided is accurate. I understand that
// //                   the lab technician will contact me to confirm the appointment. Any cancellation should be done
// //                   at least 6 hours before the scheduled time. I agree to pay the amount at the time of sample collection.
// //                 </label>
// //               </div>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Right Column: Order Summary */}
// //         <div className="lg:col-span-1">
// //           <div className="sticky top-8">
// //             <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
// //               {/* Lab Info Header */}
// //               <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
// //                 <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
// //                 {lab && (
// //                   <div className="flex items-center gap-3 mb-4">
// //                     <img
// //                       src={`http://localhost:5000/uploads/${lab.logo}`}
// //                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border shadow-sm"
// //                       alt={lab.name}
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/56?text=Lab';
// //                       }}
// //                     />
// //                     <div>
// //                       <h3 className="font-bold">{lab.name}</h3>
// //                       <p className="text-sm text-gray-500">
// //                         {selectedTests?.length || 0} {selectedTests?.length === 1 ? 'test' : 'tests'} selected
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="flex items-center justify-between">
// //                   <span className="text-gray-600">Collection Type:</span>
// //                   <span className="font-semibold capitalize px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
// //                     {appointmentDetails.sampleCollectionType === 'home'
// //                       ? 'Home Collection'
// //                       : 'Lab Visit'}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Selected Tests List */}
// //               <div className="p-6 border-b max-h-80 overflow-y-auto">
// //                 <h3 className="font-semibold text-lg mb-4">Selected Tests</h3>
// //                 <div className="space-y-4">
// //                   {tests.map((test) => {
// //                     const discountedPrice = Math.round(
// //                       test.price - (test.price * (lab?.discount || 0) / 100)
// //                     );

// //                     return (
// //                       <div key={test._id} className="pb-4 border-b last:border-0 hover:bg-gray-50 -mx-3 px-3 py-2 rounded-lg transition">
// //                         <p className="font-semibold text-gray-800 text-sm mb-1">{test.name}</p>
// //                         <p className="text-xs text-gray-500 line-clamp-2 mb-2">
// //                           {test.description}
// //                         </p>
// //                         <div className="flex justify-between items-center">
// //                           <div className="flex items-center gap-2">
// //                             <span className="font-bold text-base" style={{ color: 'var(--primary-color)' }}>
// //                               Rs {discountedPrice}
// //                             </span>
// //                             <span className="text-xs text-gray-400 line-through">
// //                               Rs {test.price}
// //                             </span>
// //                           </div>
// //                           <span className="text-xs px-2 py-1 rounded-full" style={{
// //                             backgroundColor: 'var(--primary-soft)',
// //                             color: 'var(--primary-color)'
// //                           }}>
// //                             -{lab?.discount || 0}%
// //                           </span>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="p-6 border-b">
// //                 <h3 className="font-semibold text-lg mb-4">Price Details</h3>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Tests Price</span>
// //                     <span className="font-medium">Rs {total.original}</span>
// //                   </div>

// //                   {lab?.discount > 0 && (
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-gray-600">Discount</span>
// //                       <span className="flex items-center gap-2">
// //                         <FaTag className="text-green-500" />
// //                         <span className="font-semibold text-green-600">
// //                           -{lab.discount}% (Rs {total.original - total.final})
// //                         </span>
// //                       </span>
// //                     </div>
// //                   )}

// //                   <div className="pt-3 border-t">
// //                     <div className="flex justify-between items-center">
// //                       <span className="font-bold text-lg">Total Amount</span>
// //                       <div className="text-right">
// //                         <div className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
// //                           Rs {total.final}
// //                         </div>
// //                         {lab?.discount > 0 && (
// //                           <div className="text-sm text-gray-500 line-through">
// //                             Rs {total.original}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {lab?.discount > 0 && (
// //                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
// //                     <p className="text-sm font-medium text-green-700 flex items-center gap-2">
// //                       <span className="text-lg">🎉</span>
// //                       You save Rs {total.original - total.final} with {lab.discount}% discount!
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Confirm Booking Button */}
// //               <div className="p-6">
// //                 <button
// //                   onClick={handleSubmit}
// //                   disabled={loading || !selectedTests?.length}
// //                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
// //                     loading ? 'cursor-wait' : ''
// //                   }`}
// //                   style={{
// //                     background: 'var(--primary-color)',
// //                     boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)'
// //                   }}
// //                 >
// //                   {loading ? (
// //                     <span className="flex items-center justify-center gap-2">
// //                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
// //                       Processing Booking...
// //                     </span>
// //                   ) : (
// //                     'Confirm Free Booking'
// //                   )}
// //                 </button>

// //                 <div className="mt-4 text-center space-y-2">
// //                   <p className="text-xs text-gray-500">
// //                     No payment required now. Pay after sample collection.
// //                   </p>
// //                   <p className="text-xs text-gray-400">
// //                     By confirming, you agree to our terms
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Help Box */}
// //             <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
// //               <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
// //               <p className="text-sm text-blue-600">
// //                 Call us: <span className="font-semibold">1800-123-4567</span>
// //               </p>
// //               <p className="text-sm text-blue-600 mt-1">
// //                 Email: <span className="font-semibold">support@labtest.com</span>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import {
// //   FaCalendarAlt,
// //   FaHome,
// //   FaHospital,
// //   FaCheckCircle,
// //   FaExclamationTriangle,
// //   FaUser,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaTag,
// //   FaArrowLeft,
// //   FaShieldAlt,
// //   FaCreditCard,
// //   FaClock,
// //   FaHeadset
// // } from 'react-icons/fa';

// // export default function BookingPage() {
// //   const { id: labId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { selectedTests } = location.state || {};

// //   const isSubmitting = useRef(false);
// //   const [error, setError] = useState(null);
// //   const [formErrors, setFormErrors] = useState({});

// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [bookingSuccess, setBookingSuccess] = useState(false);
// //   const [bookingDetails, setBookingDetails] = useState(null);

// //   // Form state
// //   const [patientDetails, setPatientDetails] = useState({
// //     name: '',
// //     age: '',
// //     gender: '',
// //     mobile: '',
// //     email: '',
// //     address: ''
// //   });

// //   const [appointmentDetails, setAppointmentDetails] = useState({
// //     preferredDate: '',
// //     sampleCollectionType: 'home',
// //     addressForCollection: ''
// //   });

// //   const [termsAccepted, setTermsAccepted] = useState(false);

// //   useEffect(() => {
// //     if (selectedTests?.length) {
// //       fetchLabAndTests();
// //     } else {
// //       navigate(`/labs/${labId}`);
// //     }

// //     // Set tomorrow's date as default
// //     const tomorrow = new Date();
// //     tomorrow.setDate(tomorrow.getDate() + 1);
// //     const formattedDate = tomorrow.toISOString().split('T')[0];
// //     setAppointmentDetails(prev => ({
// //       ...prev,
// //       preferredDate: formattedDate
// //     }));
// //   }, []);

// //   const fetchLabAndTests = async () => {
// //     try {
// //       const [labRes, testsRes] = await Promise.all([
// //         axios.get(`http://localhost:5000/api/labs/${labId}`),
// //         axios.get(`http://localhost:5000/api/tests/lab/${labId}`)
// //       ]);

// //       setLab(labRes.data);
// //       const allTests = testsRes.data || [];
// //       const selectedTestDetails = allTests.filter(test =>
// //         selectedTests.includes(test._id)
// //       );
// //       setTests(selectedTestDetails);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       setError('Failed to load lab details. Please try again.');
// //     }
// //   };

// //   const calculateTotal = () => {
// //     if (!lab || !tests.length) return { original: 0, final: 0, discount: 0 };

// //     const original = tests.reduce((sum, test) => sum + Number(test.price), 0);
// //     const discount = lab.discount || 0;
// //     const final = Math.round(original - (original * discount / 100));

// //     return { original: Math.round(original), final, discount };
// //   };

// //   const validateField = (field, value) => {
// //     const errors = { ...formErrors };

// //     switch (field) {
// //       case 'name':
// //         if (!value.trim()) {
// //           errors.name = 'Name is required';
// //         } else if (value.trim().length < 2) {
// //           errors.name = 'Name must be at least 2 characters';
// //         } else {
// //           delete errors.name;
// //         }
// //         break;

// //       case 'age':
// //         if (!value) {
// //           errors.age = 'Age is required';
// //         } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
// //           errors.age = 'Please enter a valid age (1-120)';
// //         } else {
// //           delete errors.age;
// //         }
// //         break;

// //       case 'mobile':
// //         const mobileRegex = /^[0-9]{10}$/;
// //         if (!value) {
// //           errors.mobile = 'Mobile number is required';
// //         } else if (!mobileRegex.test(value)) {
// //           errors.mobile = 'Please enter a valid 10-digit mobile number';
// //         } else {
// //           delete errors.mobile;
// //         }
// //         break;

// //       case 'email':
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         if (!value) {
// //           errors.email = 'Email is required';
// //         } else if (!emailRegex.test(value)) {
// //           errors.email = 'Please enter a valid email address';
// //         } else {
// //           delete errors.email;
// //         }
// //         break;

// //       case 'address':
// //         if (!value.trim()) {
// //           errors.address = 'Address is required';
// //         } else if (value.trim().length < 10) {
// //           errors.address = 'Please enter a complete address';
// //         } else {
// //           delete errors.address;
// //         }
// //         break;

// //       case 'preferredDate':
// //         if (!value) {
// //           errors.preferredDate = 'Please select a date';
// //         } else {
// //           const selectedDate = new Date(value);
// //           const today = new Date();
// //           today.setHours(0, 0, 0, 0);

// //           if (selectedDate < today) {
// //             errors.preferredDate = 'Date cannot be in the past';
// //           } else {
// //             delete errors.preferredDate;
// //           }
// //         }
// //         break;
// //     }

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleInputChange = (field, value) => {
// //     setPatientDetails(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));

// //     if (formErrors[field]) {
// //       validateField(field, value);
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Validate patient details
// //     Object.keys(patientDetails).forEach(field => {
// //       validateField(field, patientDetails[field]);
// //     });

// //     // Validate appointment date
// //     validateField('preferredDate', appointmentDetails.preferredDate);

// //     // Check if all required fields are filled
// //     const requiredFields = ['name', 'age', 'gender', 'mobile', 'email', 'address'];
// //     const missingFields = requiredFields.filter(field => !patientDetails[field]);

// //     if (missingFields.length > 0) {
// //       setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
// //       return false;
// //     }

// //     if (!appointmentDetails.preferredDate) {
// //       setError('Please select a preferred date');
// //       return false;
// //     }

// //     if (!termsAccepted) {
// //       setError('Please accept the terms and conditions');
// //       return false;
// //     }

// //     return Object.keys(formErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (isSubmitting.current) return;

// //     if (!selectedTests?.length) {
// //       setError('Please select tests first');
// //       setTimeout(() => navigate(`/labs/${labId}`), 2000);
// //       return;
// //     }

// //     if (!validateForm()) {
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     isSubmitting.current = true;

// //     try {
// //       const total = calculateTotal();

// //       const bookingData = {
// //         labId,
// //         testIds: selectedTests,
// //         patientDetails: {
// //           name: patientDetails.name.trim(),
// //           age: Number(patientDetails.age),
// //           gender: patientDetails.gender,
// //           mobile: patientDetails.mobile,
// //           email: patientDetails.email.trim(),
// //           address: patientDetails.address.trim()
// //         },
// //         appointmentDetails: {
// //           preferredDate: new Date(appointmentDetails.preferredDate).toISOString(),
// //           sampleCollectionType: appointmentDetails.sampleCollectionType,
// //           addressForCollection: appointmentDetails.addressForCollection?.trim() || patientDetails.address.trim()
// //         }
// //       };

// //       console.log('Sending booking data:', bookingData);

// //       const response = await axios.post(
// //         'http://localhost:5000/api/bookings',
// //         bookingData,
// //         {
// //           timeout: 10000,
// //           headers: {
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       console.log('Booking response:', response.data);

// //       setBookingSuccess(true);
// //       setBookingDetails(response.data.booking);

// //       localStorage.removeItem(`selectedTests_lab_${labId}`);

// //     } catch (error) {
// //       console.error('Booking error details:', error);

// //       let errorMessage = 'Booking failed. Please try again.';

// //       if (error.response) {
// //         const { data } = error.response;
// //         console.log('Error response data:', data);

// //         if (data.error) {
// //           errorMessage = data.error;
// //           if (data.details) {
// //             if (Array.isArray(data.details)) {
// //               errorMessage += `: ${data.details.join(', ')}`;
// //             } else if (typeof data.details === 'object') {
// //               errorMessage += `: ${JSON.stringify(data.details)}`;
// //             } else {
// //               errorMessage += `: ${data.details}`;
// //             }
// //           }
// //         } else if (data.message) {
// //           errorMessage = data.message;
// //         }
// //       } else if (error.request) {
// //         errorMessage = 'No response from server. Please check your connection.';
// //       } else {
// //         errorMessage = error.message;
// //       }

// //       setError(errorMessage);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     } finally {
// //       setLoading(false);
// //       isSubmitting.current = false;
// //     }
// //   };

// //   const total = calculateTotal();

// //   if (bookingSuccess && bookingDetails) {
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
// //         <div className="bg-gradient-to-br from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f] rounded-3xl p-8 text-center shadow-xl">
// //           <div className="flex justify-center mb-6">
// //             <div className="bg-[#2c6774] p-4 rounded-full">
// //               <FaCheckCircle className="text-6xl text-white" />
// //             </div>
// //           </div>

// //           <h1 className="text-3xl font-bold text-[#174047] mb-3">
// //             Booking Confirmed! 🎉
// //           </h1>
// //           <p className="text-[#5c878f] text-lg mb-8">
// //             Your appointment has been scheduled successfully
// //           </p>

// //           <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-[#c0d3dc]">
// //             <div className="grid md:grid-cols-2 gap-6 mb-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Booking Reference</p>
// //                   <p className="font-bold text-xl text-[#2c6774] tracking-wide">
// //                     {bookingDetails.bookingReference}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Patient Name</p>
// //                   <p className="font-semibold text-lg text-[#174047]">{bookingDetails.patientDetails?.name}</p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Contact Number</p>
// //                   <p className="font-semibold text-[#174047]">{bookingDetails.patientDetails?.mobile}</p>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Appointment Date</p>
// //                   <p className="font-semibold text-[#174047]">
// //                     {bookingDetails.appointmentDetails?.preferredDate
// //                       ? new Date(bookingDetails.appointmentDetails.preferredDate).toLocaleDateString('en-IN', {
// //                           weekday: 'long',
// //                           year: 'numeric',
// //                           month: 'long',
// //                           day: 'numeric'
// //                         })
// //                       : 'Not specified'}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Collection Type</p>
// //                   <p className="font-semibold capitalize text-[#174047]">
// //                     {bookingDetails.appointmentDetails?.sampleCollectionType === 'home'
// //                       ? 'Home Collection'
// //                       : 'Lab Visit'}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Total Tests</p>
// //                   <p className="font-semibold text-[#174047]">{bookingDetails.tests?.length || 0} Tests</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="border-t border-[#c0d3dc] pt-6">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-[#5c878f]">Total Amount</span>
// //                 <div className="text-right">
// //                   <p className="text-2xl font-bold text-[#2c6774]">
// //                     Rs {total.final}
// //                   </p>
// //                   <p className="text-sm text-[#5c878f]">
// //                     <s>Rs {total.original}</s> • Saved Rs {total.original - total.final}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-[#9fbfc5]/30 rounded-xl p-4 mb-8 border border-[#5c878f]/30">
// //             <p className="text-sm text-[#174047]">
// //               <span className="font-semibold">Next Steps:</span> You will receive a confirmation call from the lab within 30 minutes.
// //               Please keep your booking reference handy for any queries.
// //             </p>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <button
// //               onClick={() => window.print()}
// //               className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl font-semibold hover:bg-[#9fbfc5]/20 transition flex items-center justify-center gap-2"
// //             >
// //               Print Receipt
// //             </button>
// //             <button
// //               onClick={() => navigate('/')}
// //               className="px-6 py-3 bg-[#2c6774] text-white rounded-xl font-semibold hover:bg-[#1e4e56] transition flex items-center justify-center gap-2"
// //             >
// //               Back to Home
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Error Alert */}
// //       {error && (
// //         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
// //           <div className="flex items-start gap-3">
// //             <FaExclamationTriangle className="text-red-500 mt-0.5" />
// //             <div className="flex-1">
// //               <p className="font-medium text-red-700">{error}</p>
// //               <button
// //                 onClick={() => setError(null)}
// //                 className="text-sm text-red-600 hover:text-red-800 mt-1"
// //               >
// //                 Dismiss
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
// //         <div>
// //           <button
// //             onClick={() => navigate(`/labs/${labId}`)}
// //             className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
// //           >
// //             <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Lab
// //           </button>
// //           <h1 className="text-3xl font-bold text-[#174047]">Complete Your Booking</h1>
// //           <p className="text-[#5c878f] mt-2">Fill in your details to schedule the tests</p>
// //         </div>

// //         {lab && (
// //           <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
// //             <img
// //               src={`http://localhost:5000/uploads/${lab.logo}`}
// //               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
// //               alt={lab.name}
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/48?text=Lab';
// //               }}
// //             />
// //             <div>
// //               <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
// //               <p className="text-sm text-[#5c878f]">{lab.branches}</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className="grid lg:grid-cols-3 gap-8">
// //         {/* Left Column: Booking Form */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Patient Details Card */}
// //           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
// //                 <FaUser className="text-white text-lg" />
// //               </div>
// //               <div>
// //                 <h2 className="text-xl font-bold text-[#174047]">
// //                   Patient Information
// //                 </h2>
// //                 <p className="text-sm text-[#5c878f]">Fill in your personal details</p>
// //               </div>
// //             </div>

// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Full Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={patientDetails.name}
// //                   onChange={(e) => handleInputChange('name', e.target.value)}
// //                   onBlur={() => validateField('name', patientDetails.name)}
// //                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                     formErrors.name ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                   }`}
// //                   placeholder="Enter patient's full name"
// //                 />
// //                 {formErrors.name && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Age *
// //                 </label>
// //                 <input
// //                   type="number"
// //                   min="1"
// //                   max="120"
// //                   value={patientDetails.age}
// //                   onChange={(e) => handleInputChange('age', e.target.value)}
// //                   onBlur={() => validateField('age', patientDetails.age)}
// //                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                     formErrors.age ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                   }`}
// //                   placeholder="Age in years"
// //                 />
// //                 {formErrors.age && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.age}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Gender *
// //                 </label>
// //                 <select
// //                   value={patientDetails.gender}
// //                   onChange={(e) => handleInputChange('gender', e.target.value)}
// //                   className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="male">Male</option>
// //                   <option value="female">Female</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Mobile Number *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaPhone className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="tel"
// //                     value={patientDetails.mobile}
// //                     onChange={(e) => handleInputChange('mobile', e.target.value)}
// //                     onBlur={() => validateField('mobile', patientDetails.mobile)}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.mobile ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="9876543210"
// //                     maxLength="10"
// //                   />
// //                 </div>
// //                 {formErrors.mobile && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
// //                 )}
// //               </div>

// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Email Address *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaEnvelope className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="email"
// //                     value={patientDetails.email}
// //                     onChange={(e) => handleInputChange('email', e.target.value)}
// //                     onBlur={() => validateField('email', patientDetails.email)}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.email ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="patient@example.com"
// //                   />
// //                 </div>
// //                 {formErrors.email && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
// //                 )}
// //               </div>

// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Complete Address *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute top-3 left-3">
// //                     <FaMapMarkerAlt className="text-[#5c878f]" />
// //                   </div>
// //                   <textarea
// //                     value={patientDetails.address}
// //                     onChange={(e) => handleInputChange('address', e.target.value)}
// //                     onBlur={() => validateField('address', patientDetails.address)}
// //                     rows="3"
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.address ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="House no., Street, Landmark, City, State - Pincode"
// //                   />
// //                 </div>
// //                 {formErrors.address && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Appointment Details Card */}
// //           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
// //                 <FaCalendarAlt className="text-white text-lg" />
// //               </div>
// //               <div>
// //                 <h2 className="text-xl font-bold text-[#174047]">
// //                   Appointment Details
// //                 </h2>
// //                 <p className="text-sm text-[#5c878f]">Schedule your test collection</p>
// //               </div>
// //             </div>

// //             <div className="space-y-6">
// //               {/* Date Selection */}
// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Preferred Date for Sample Collection *
// //                 </label>
// //                 <div className="relative max-w-md">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaCalendarAlt className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="date"
// //                     value={appointmentDetails.preferredDate}
// //                     onChange={(e) => {
// //                       setAppointmentDetails(prev => ({
// //                         ...prev,
// //                         preferredDate: e.target.value
// //                       }));
// //                       validateField('preferredDate', e.target.value);
// //                     }}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.preferredDate ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                   />
// //                 </div>
// //                 {formErrors.preferredDate && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.preferredDate}</p>
// //                 )}
// //               </div>

// //               {/* Collection Type Selection */}
// //               {/* <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-3">
// //                   How would you like to give the sample? *
// //                 </label>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <button
// //                     type="button"
// //                     onClick={() => setAppointmentDetails({
// //                       ...appointmentDetails,
// //                       sampleCollectionType: 'home'
// //                     })}
// //                     className={`p-5 border rounded-xl flex flex-col items-center gap-4 transition-all ${
// //                       appointmentDetails.sampleCollectionType === 'home'
// //                         ? 'border-[#2c6774] bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 shadow-lg scale-[1.02]'
// //                         : 'border-[#9fbfc5] hover:border-[#5c878f] hover:shadow-md bg-white'
// //                     }`}
// //                   >
// //                     <div className={`p-3 rounded-full ${
// //                       appointmentDetails.sampleCollectionType === 'home'
// //                         ? 'bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white'
// //                         : 'bg-[#9fbfc5] text-[#174047]'
// //                     }`}>
// //                       <FaHome className="text-xl" />
// //                     </div>
// //                     <div className="text-center">
// //                       <div className={`font-semibold text-lg ${
// //                         appointmentDetails.sampleCollectionType === 'home'
// //                           ? 'text-[#174047]'
// //                           : 'text-[#5c878f]'
// //                       }`}>Home Collection</div>
// //                       <div className="text-sm text-[#5c878f] mt-2">
// //                         Our technician will visit your location
// //                       </div>
// //                     </div>
// //                   </button>

// //                   <button
// //                     type="button"
// //                     onClick={() => setAppointmentDetails({
// //                       ...appointmentDetails,
// //                       sampleCollectionType: 'lab'
// //                     })}
// //                     className={`p-5 border rounded-xl flex flex-col items-center gap-4 transition-all ${
// //                       appointmentDetails.sampleCollectionType === 'lab'
// //                         ? 'border-[#2c6774] bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 shadow-lg scale-[1.02]'
// //                         : 'border-[#9fbfc5] hover:border-[#5c878f] hover:shadow-md bg-white'
// //                     }`}
// //                   >
// //                     <div className={`p-3 rounded-full ${
// //                       appointmentDetails.sampleCollectionType === 'lab'
// //                         ? 'bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white'
// //                         : 'bg-[#9fbfc5] text-[#174047]'
// //                     }`}>
// //                       <FaHospital className="text-xl" />
// //                     </div>
// //                     <div className="text-center">
// //                       <div className={`font-semibold text-lg ${
// //                         appointmentDetails.sampleCollectionType === 'lab'
// //                           ? 'text-[#174047]'
// //                           : 'text-[#5c878f]'
// //                       }`}>Visit Lab</div>
// //                       <div className="text-sm text-[#5c878f] mt-2">
// //                         Visit our nearest lab center
// //                       </div>
// //                     </div>
// //                   </button>
// //                 </div>
// //               </div> */}

// //               {/* Address for Collection */}
// //               {appointmentDetails.sampleCollectionType === 'home' && (
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#174047] mb-2">
// //                     Collection Address (Optional)
// //                     <span className="text-[#5c878f] font-normal ml-1">
// //                       - Leave blank if same as patient address
// //                     </span>
// //                   </label>
// //                   <textarea
// //                     value={appointmentDetails.addressForCollection}
// //                     onChange={(e) => setAppointmentDetails({
// //                       ...appointmentDetails,
// //                       addressForCollection: e.target.value
// //                     })}
// //                     rows="2"
// //                     className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition"
// //                     placeholder="Enter different collection address (optional)"
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Terms & Conditions */}
// //           <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
// //             <div className="flex items-start gap-3">
// //               <input
// //                 type="checkbox"
// //                 id="terms"
// //                 checked={termsAccepted}
// //                 onChange={(e) => setTermsAccepted(e.target.checked)}
// //                 className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
// //               />
// //               <label htmlFor="terms" className="text-sm text-[#174047] leading-relaxed">
// //                 <span className="font-semibold">Terms & Conditions:</span> I agree that the information provided is accurate. I understand that
// //                 the lab technician will contact me to confirm the appointment. Any cancellation should be done
// //                 at least 6 hours before the scheduled time. I agree to pay the amount at the time of sample collection.
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column: Order Summary */}
// //         <div className="lg:col-span-1">
// //           <div className="sticky top-8 space-y-6">
// //             {/* Order Summary Card */}
// //             <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
// //               {/* Header */}
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
// //                 <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
// //                 <p className="text-[#c0d3dc]">Review your selected tests</p>
// //               </div>

// //               {/* Lab Info */}
// //               {lab && (
// //                 <div className="p-6 border-b border-[#c0d3dc]">
// //                   <div className="flex items-center gap-3 mb-4">
// //                     <img
// //                       src={`http://localhost:5000/uploads/${lab.logo}`}
// //                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
// //                       alt={lab.name}
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/56?text=Lab';
// //                       }}
// //                     />
// //                     <div>
// //                       <h3 className="font-bold text-[#174047]">{lab.name}</h3>
// //                       <p className="text-sm text-[#5c878f]">
// //                         {selectedTests?.length || 0} {selectedTests?.length === 1 ? 'test' : 'tests'} selected
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center justify-between bg-[#9fbfc5]/10 p-3 rounded-lg">
// //                     <span className="text-[#174047] font-medium">Collection Type:</span>
// //                     <span className="font-semibold capitalize px-3 py-1 rounded-full bg-[#2c6774] text-white text-sm">
// //                       {appointmentDetails.sampleCollectionType === 'home'
// //                         ? 'Home Collection'
// //                         : 'Lab Visit'}
// //                     </span>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Selected Tests List */}
// //               <div className="p-6 border-b border-[#c0d3dc] max-h-80 overflow-y-auto">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h3 className="font-bold text-lg text-[#174047]">Selected Tests</h3>
// //                   <span className="text-sm text-[#5c878f]">{tests.length} items</span>
// //                 </div>
// //                 <div className="space-y-4">
// //                   {tests.map((test) => {
// //                     const discountedPrice = Math.round(
// //                       test.price - (test.price * (lab?.discount || 0) / 100)
// //                     );

// //                     return (
// //                       <div key={test._id} className="pb-4 border-b border-[#c0d3dc] last:border-0 hover:bg-[#9fbfc5]/5 -mx-3 px-3 py-2 rounded-lg transition">
// //                         <p className="font-semibold text-[#174047] text-sm mb-1">{test.name}</p>
// //                         <p className="text-xs text-[#5c878f] line-clamp-2 mb-2">
// //                           {test.description}
// //                         </p>
// //                         <div className="flex justify-between items-center">
// //                           <div className="flex items-center gap-2">
// //                             <span className="font-bold text-base text-[#2c6774]">
// //                               Rs {discountedPrice}
// //                             </span>
// //                             <span className="text-xs text-[#9fbfc5] line-through">
// //                               Rs {test.price}
// //                             </span>
// //                           </div>
// //                           <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 text-[#2c6774]">
// //                             -{lab?.discount || 0}%
// //                           </span>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="p-6 border-b border-[#c0d3dc]">
// //                 <h3 className="font-bold text-lg text-[#174047] mb-4">Price Details</h3>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between">
// //                     <span className="text-[#5c878f]">Tests Price</span>
// //                     <span className="font-medium text-[#174047]">Rs {total.original}</span>
// //                   </div>

// //                   {lab?.discount > 0 && (
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-[#5c878f]">Discount</span>
// //                       <span className="flex items-center gap-2">
// //                         <FaTag className="text-[#2c6774]" />
// //                         <span className="font-semibold text-[#2c6774]">
// //                           -{lab.discount}% (Rs {total.original - total.final})
// //                         </span>
// //                       </span>
// //                     </div>
// //                   )}

// //                   <div className="pt-3 border-t border-[#c0d3dc]">
// //                     <div className="flex justify-between items-center">
// //                       <span className="font-bold text-lg text-[#174047]">Total Amount</span>
// //                       <div className="text-right">
// //                         <div className="text-2xl font-bold text-[#2c6774]">
// //                           Rs {total.final}
// //                         </div>
// //                         {lab?.discount > 0 && (
// //                           <div className="text-sm text-[#5c878f] line-through">
// //                             Rs {total.original}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {lab?.discount > 0 && (
// //                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
// //                     <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
// //                       {/* <span className="text-lg">🎉</span> */}
// //                       You save Rs {total.original - total.final} with {lab.discount}% discount!
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Confirm Booking Button */}
// //               <div className="p-6">
// //                 <button
// //                   onClick={handleSubmit}
// //                   disabled={loading || !selectedTests?.length}
// //                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
// //                     loading ? 'cursor-wait' : ''
// //                   }`}
// //                   style={{
// //                     background: 'linear-gradient(to right, #2c6774, #1e4e56)',
// //                     boxShadow: '0 4px 14px 0 rgba(44, 103, 116, 0.39)'
// //                   }}
// //                 >
// //                   {loading ? (
// //                     <span className="flex items-center justify-center gap-2">
// //                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
// //                       Processing Booking...
// //                     </span>
// //                   ) : (
// //                     'Confirm Free Booking'
// //                   )}
// //                 </button>

// //                 <div className="mt-4 text-center space-y-2">
// //                   <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
// //                     <FaShieldAlt />
// //                     <span>Secure & Safe Booking</span>
// //                   </div>
// //                   {/* <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
// //                     <FaCreditCard />
// //                     <span>No payment required now</span>
// //                   </div> */}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Benefits Card */}
// //             <div className="bg-gradient-to-br from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5] p-5">
// //               <h4 className="font-bold text-lg text-[#174047] mb-4 flex items-center gap-2">
// //                 <FaShieldAlt className="text-[#2c6774]" />
// //                 Why Book With Us?
// //               </h4>
// //               <div className="space-y-3">
// //                 <div className="flex items-start gap-3">
// //                   <div className="bg-white p-2 rounded-lg border border-[#5c878f]/20">
// //                     <FaClock className="text-[#2c6774]" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-sm text-[#174047]">Same Day Results</p>
// //                     <p className="text-xs text-[#5c878f]">Fast & accurate reports</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <div className="bg-white p-2 rounded-lg border border-[#5c878f]/20">
// //                     <FaShieldAlt className="text-[#2c6774]" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-sm text-[#174047]">Certified Labs</p>
// //                     <p className="text-xs text-[#5c878f]">NABL accredited facilities</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <div className="bg-white p-2 rounded-lg border border-[#5c878f]/20">
// //                     <FaHeadset className="text-[#2c6774]" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-sm text-[#174047]">24/7 Support</p>
// //                     <p className="text-xs text-[#5c878f]">Always here to help you</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Help Box */}
// //             <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
// //               <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
// //                 <FaHeadset className="text-[#2c6774]" />
// //                 Need Help?
// //               </h4>
// //               <div className="space-y-2">
// //                 <p className="text-sm text-[#174047]">
// //                   Call us: <span className="font-semibold text-[#2c6774]">1800-123-4567</span>
// //                 </p>
// //                 <p className="text-sm text-[#174047]">
// //                   Email: <span className="font-semibold text-[#2c6774]">support@quickcure.com</span>
// //                 </p>
// //                 <p className="text-xs text-[#5c878f] mt-3">
// //                   Our support team is available 24/7 to assist you
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // In BookingPage.jsx - Update the component to handle multiple patients

// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import {
// //   FaCalendarAlt,
// //   FaHome,
// //   FaHospital,
// //   FaCheckCircle,
// //   FaExclamationTriangle,
// //   FaUser,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaTag,
// //   FaArrowLeft,
// //   FaShieldAlt,
// //   FaCreditCard,
// //   FaClock,
// //   FaHeadset,
// //   FaUserPlus,
// //   FaTrash,
// //   FaEdit
// // } from 'react-icons/fa';

// // export default function BookingPage() {
// //   const { id: labId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { patients: initialPatients, labId: stateLabId } = location.state || {};

// //   const isSubmitting = useRef(false);
// //   const [error, setError] = useState(null);
// //   const [formErrors, setFormErrors] = useState({});

// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [bookingSuccess, setBookingSuccess] = useState(false);
// //   const [bookingDetails, setBookingDetails] = useState(null);

// //   // Multi-patient state
// //   const [patients, setPatients] = useState([]);
// //   const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

// //   // Form state for current patient
// //   const [patientDetails, setPatientDetails] = useState({
// //     name: '',
// //     age: '',
// //     gender: '',
// //     mobile: '',
// //     email: '',
// //     address: ''
// //   });

// //   const [appointmentDetails, setAppointmentDetails] = useState({
// //     preferredDate: '',
// //     sampleCollectionType: 'home',
// //     addressForCollection: ''
// //   });

// //   const [termsAccepted, setTermsAccepted] = useState(false);

// //   // Initialize patients from state
// //   useEffect(() => {
// //     if (initialPatients && initialPatients.length > 0) {
// //       // Create patient forms for each patient with tests
// //       const patientForms = initialPatients.map((patient, index) => ({
// //         id: Date.now() + index,
// //         patientIndex: index + 1,
// //         selectedTests: patient.selectedTests,
// //         details: {
// //           name: '',
// //           age: '',
// //           gender: '',
// //           mobile: '',
// //           email: '',
// //           address: ''
// //         }
// //       }));
// //       setPatients(patientForms);

// //       // Load tests for all selected tests
// //       const allTestIds = initialPatients.flatMap(p => p.selectedTests);
// //       if (allTestIds.length > 0) {
// //         fetchLabAndTests(allTestIds);
// //       }
// //     } else {
// //       navigate(`/labs/${labId}`);
// //     }

// //     // Set tomorrow's date as default
// //     const tomorrow = new Date();
// //     tomorrow.setDate(tomorrow.getDate() + 1);
// //     const formattedDate = tomorrow.toISOString().split('T')[0];
// //     setAppointmentDetails(prev => ({
// //       ...prev,
// //       preferredDate: formattedDate
// //     }));
// //   }, []);

// //   const fetchLabAndTests = async (testIds) => {
// //     try {
// //       const [labRes, testsRes] = await Promise.all([
// //         axios.get(`http://localhost:5000/api/labs/${labId}`),
// //         axios.get(`http://localhost:5000/api/tests/lab/${labId}`)
// //       ]);

// //       setLab(labRes.data);
// //       const allTests = testsRes.data || [];
// //       const selectedTestDetails = allTests.filter(test =>
// //         testIds.includes(test._id)
// //       );
// //       setTests(selectedTestDetails);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       setError('Failed to load lab details. Please try again.');
// //     }
// //   };

// //   // Switch between patients
// //   const switchPatient = (index) => {
// //     // Save current patient's details
// //     const updatedPatients = [...patients];
// //     updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //     setPatients(updatedPatients);

// //     // Load new patient's details
// //     setCurrentPatientIndex(index);
// //     setPatientDetails(updatedPatients[index].details);
// //   };

// //   // Add a new patient manually
// //   const addNewPatient = () => {
// //     const newPatient = {
// //       id: Date.now(),
// //       patientIndex: patients.length + 1,
// //       selectedTests: [],
// //       details: {
// //         name: '',
// //         age: '',
// //         gender: '',
// //         mobile: '',
// //         email: '',
// //         address: ''
// //       }
// //     };
// //     setPatients([...patients, newPatient]);
// //     setCurrentPatientIndex(patients.length);

// //     // Clear form for new patient
// //     setPatientDetails({
// //       name: '',
// //       age: '',
// //       gender: '',
// //       mobile: '',
// //       email: '',
// //       address: ''
// //     });
// //   };

// //   // Remove a patient
// //   const removePatient = (index) => {
// //     if (patients.length <= 1) {
// //       setError("Cannot remove the last patient. At least one patient is required.");
// //       return;
// //     }

// //     const updatedPatients = patients.filter((_, i) => i !== index);
// //     setPatients(updatedPatients);

// //     // Adjust current index if needed
// //     if (currentPatientIndex >= updatedPatients.length) {
// //       setCurrentPatientIndex(updatedPatients.length - 1);
// //       setPatientDetails(updatedPatients[updatedPatients.length - 1].details);
// //     } else if (currentPatientIndex === index) {
// //       setCurrentPatientIndex(Math.max(0, index - 1));
// //       setPatientDetails(updatedPatients[Math.max(0, index - 1)].details);
// //     }
// //   };

// //   // Edit tests for a patient (redirect to lab detail)
// //   const editPatientTests = (patientIndex) => {
// //     // Save current patient's details
// //     const updatedPatients = [...patients];
// //     updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //     setPatients(updatedPatients);

// //     // Navigate back to lab detail with patient context
// //     navigate(`/labs/${labId}`, {
// //       state: {
// //         editPatientIndex: patientIndex,
// //         patients: updatedPatients
// //       }
// //     });
// //   };

// //   const calculateTotal = () => {
// //     if (!lab || !patients.length) return { original: 0, final: 0, discount: 0 };

// //     // Calculate total for all patients
// //     let original = 0;
// //     patients.forEach(patient => {
// //       patient.selectedTests.forEach(testId => {
// //         const test = tests.find(t => t._id === testId);
// //         if (test) {
// //           original += Number(test.price);
// //         }
// //       });
// //     });

// //     const discount = lab.discount || 0;
// //     const final = Math.round(original - (original * discount / 100));

// //     return { original: Math.round(original), final, discount };
// //   };

// //   const validateField = (field, value) => {
// //     const errors = { ...formErrors };

// //     switch (field) {
// //       case 'name':
// //         if (!value.trim()) {
// //           errors.name = 'Name is required';
// //         } else if (value.trim().length < 2) {
// //           errors.name = 'Name must be at least 2 characters';
// //         } else {
// //           delete errors.name;
// //         }
// //         break;

// //       case 'age':
// //         if (!value) {
// //           errors.age = 'Age is required';
// //         } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
// //           errors.age = 'Please enter a valid age (1-120)';
// //         } else {
// //           delete errors.age;
// //         }
// //         break;

// //       case 'mobile':
// //         const mobileRegex = /^[0-9]{10}$/;
// //         if (!value) {
// //           errors.mobile = 'Mobile number is required';
// //         } else if (!mobileRegex.test(value)) {
// //           errors.mobile = 'Please enter a valid 10-digit mobile number';
// //         } else {
// //           delete errors.mobile;
// //         }
// //         break;

// //       case 'email':
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         if (!value) {
// //           errors.email = 'Email is required';
// //         } else if (!emailRegex.test(value)) {
// //           errors.email = 'Please enter a valid email address';
// //         } else {
// //           delete errors.email;
// //         }
// //         break;

// //       case 'address':
// //         if (!value.trim()) {
// //           errors.address = 'Address is required';
// //         } else if (value.trim().length < 10) {
// //           errors.address = 'Please enter a complete address';
// //         } else {
// //           delete errors.address;
// //         }
// //         break;

// //       case 'preferredDate':
// //         if (!value) {
// //           errors.preferredDate = 'Please select a date';
// //         } else {
// //           const selectedDate = new Date(value);
// //           const today = new Date();
// //           today.setHours(0, 0, 0, 0);

// //           if (selectedDate < today) {
// //             errors.preferredDate = 'Date cannot be in the past';
// //           } else {
// //             delete errors.preferredDate;
// //           }
// //         }
// //         break;
// //     }

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleInputChange = (field, value) => {
// //     setPatientDetails(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));

// //     if (formErrors[field]) {
// //       validateField(field, value);
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Validate all patients' details
// //     for (let i = 0; i < patients.length; i++) {
// //       const patient = patients[i];
// //       const details = i === currentPatientIndex ? patientDetails : patient.details;

// //       if (!details.name?.trim()) {
// //         setError(`Please fill in name for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.age) {
// //         setError(`Please fill in age for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.gender) {
// //         setError(`Please select gender for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.mobile || !/^[0-9]{10}$/.test(details.mobile)) {
// //         setError(`Please enter valid mobile number for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
// //         setError(`Please enter valid email for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.address?.trim()) {
// //         setError(`Please fill in address for Patient ${i + 1}`);
// //         return false;
// //       }
// //     }

// //     if (!appointmentDetails.preferredDate) {
// //       setError('Please select a preferred date');
// //       return false;
// //     }

// //     if (!termsAccepted) {
// //       setError('Please accept the terms and conditions');
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (isSubmitting.current) return;

// //     if (!patients.length) {
// //       setError('Please add at least one patient');
// //       return;
// //     }

// //     // Save current patient's details
// //     const updatedPatients = [...patients];
// //     updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //     setPatients(updatedPatients);

// //     if (!validateForm()) {
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     isSubmitting.current = true;

// //     try {
// //       const total = calculateTotal();

// //       // Prepare booking data for multiple patients
// //       const bookingData = {
// //         labId,
// //         patients: updatedPatients.map(patient => ({
// //           testIds: patient.selectedTests,
// //           patientDetails: {
// //             name: patient.details.name.trim(),
// //             age: Number(patient.details.age),
// //             gender: patient.details.gender,
// //             mobile: patient.details.mobile,
// //             email: patient.details.email.trim(),
// //             address: patient.details.address.trim()
// //           }
// //         })),
// //         appointmentDetails: {
// //           preferredDate: new Date(appointmentDetails.preferredDate).toISOString(),
// //           sampleCollectionType: appointmentDetails.sampleCollectionType,
// //           addressForCollection: appointmentDetails.addressForCollection?.trim() || patientDetails.address.trim()
// //         }
// //       };

// //       console.log('Sending booking data:', bookingData);

// //       const response = await axios.post(
// //         'http://localhost:5000/api/bookings/multiple',
// //         bookingData,
// //         {
// //           timeout: 10000,
// //           headers: {
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       console.log('Booking response:', response.data);

// //       setBookingSuccess(true);
// //       setBookingDetails(response.data.booking);

// //       // Clear selected tests for all patients
// //       patients.forEach((_, index) => {
// //         localStorage.removeItem(`selectedTests_lab_${labId}_patient_${index}`);
// //       });

// //     } catch (error) {
// //       console.error('Booking error details:', error);

// //       let errorMessage = 'Booking failed. Please try again.';

// //       if (error.response) {
// //         const { data } = error.response;
// //         if (data.error) {
// //           errorMessage = data.error;
// //           if (data.details) {
// //             if (Array.isArray(data.details)) {
// //               errorMessage += `: ${data.details.join(', ')}`;
// //             } else if (typeof data.details === 'object') {
// //               errorMessage += `: ${JSON.stringify(data.details)}`;
// //             } else {
// //               errorMessage += `: ${data.details}`;
// //             }
// //           }
// //         } else if (data.message) {
// //           errorMessage = data.message;
// //         }
// //       } else if (error.request) {
// //         errorMessage = 'No response from server. Please check your connection.';
// //       } else {
// //         errorMessage = error.message;
// //       }

// //       setError(errorMessage);
// //       window.scrollTo({ top: 0, behavior: 'smooth' });
// //     } finally {
// //       setLoading(false);
// //       isSubmitting.current = false;
// //     }
// //   };

// //   const total = calculateTotal();

// //   if (bookingSuccess && bookingDetails) {
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
// //         <div className="bg-gradient-to-br from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f] rounded-3xl p-8 text-center shadow-xl">
// //           <div className="flex justify-center mb-6">
// //             <div className="bg-[#2c6774] p-4 rounded-full">
// //               <FaCheckCircle className="text-6xl text-white" />
// //             </div>
// //           </div>

// //           <h1 className="text-3xl font-bold text-[#174047] mb-3">
// //             Booking Confirmed! 🎉
// //           </h1>
// //           <p className="text-[#5c878f] text-lg mb-8">
// //             Your appointments have been scheduled successfully for {patients.length} {patients.length === 1 ? 'patient' : 'patients'}
// //           </p>

// //           <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-[#c0d3dc]">
// //             <div className="grid md:grid-cols-2 gap-6 mb-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Booking Reference</p>
// //                   <p className="font-bold text-xl text-[#2c6774] tracking-wide">
// //                     {bookingDetails.bookingReference}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Number of Patients</p>
// //                   <p className="font-semibold text-lg text-[#174047]">{patients.length}</p>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Appointment Date</p>
// //                   <p className="font-semibold text-[#174047]">
// //                     {appointmentDetails.preferredDate
// //                       ? new Date(appointmentDetails.preferredDate).toLocaleDateString('en-IN', {
// //                           weekday: 'long',
// //                           year: 'numeric',
// //                           month: 'long',
// //                           day: 'numeric'
// //                         })
// //                       : 'Not specified'}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Collection Type</p>
// //                   <p className="font-semibold capitalize text-[#174047]">
// //                     {appointmentDetails.sampleCollectionType === 'home'
// //                       ? 'Home Collection'
// //                       : 'Lab Visit'}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="border-t border-[#c0d3dc] pt-6">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-[#5c878f]">Total Amount</span>
// //                 <div className="text-right">
// //                   <p className="text-2xl font-bold text-[#2c6774]">
// //                     Rs {total.final}
// //                   </p>
// //                   <p className="text-sm text-[#5c878f]">
// //                     <s>Rs {total.original}</s> • Saved Rs {total.original - total.final}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-[#9fbfc5]/30 rounded-xl p-4 mb-8 border border-[#5c878f]/30">
// //             <p className="text-sm text-[#174047]">
// //               <span className="font-semibold">Next Steps:</span> You will receive a confirmation call from the lab within 30 minutes.
// //               Please keep your booking reference handy for any queries.
// //             </p>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <button
// //               onClick={() => window.print()}
// //               className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl font-semibold hover:bg-[#9fbfc5]/20 transition flex items-center justify-center gap-2"
// //             >
// //               Print Receipt
// //             </button>
// //             <button
// //               onClick={() => navigate('/')}
// //               className="px-6 py-3 bg-[#2c6774] text-white rounded-xl font-semibold hover:bg-[#1e4e56] transition flex items-center justify-center gap-2"
// //             >
// //               Back to Home
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Error Alert */}
// //       {error && (
// //         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
// //           <div className="flex items-start gap-3">
// //             <FaExclamationTriangle className="text-red-500 mt-0.5" />
// //             <div className="flex-1">
// //               <p className="font-medium text-red-700">{error}</p>
// //               <button
// //                 onClick={() => setError(null)}
// //                 className="text-sm text-red-600 hover:text-red-800 mt-1"
// //               >
// //                 Dismiss
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
// //         <div>
// //           <button
// //             onClick={() => navigate(`/labs/${labId}`)}
// //             className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
// //           >
// //             <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Lab
// //           </button>
// //           <h1 className="text-3xl font-bold text-[#174047]">Complete Your Booking</h1>
// //           <p className="text-[#5c878f] mt-2">Fill in details for all patients</p>
// //         </div>

// //         {lab && (
// //           <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
// //             <img
// //               src={`http://localhost:5000/uploads/${lab.logo}`}
// //               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
// //               alt={lab.name}
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/48?text=Lab';
// //               }}
// //             />
// //             <div>
// //               <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
// //               <p className="text-sm text-[#5c878f]">{lab.branches}</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Patient Selector */}
// //       <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc]">
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
// //           <button
// //             onClick={addNewPatient}
// //             className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition"
// //           >
// //             <FaUserPlus />
// //             Add Another Person
// //           </button>
// //         </div>

// //         <div className="flex flex-wrap gap-3">
// //           {patients.map((patient, index) => (
// //             <div
// //               key={patient.id}
// //               className={`flex items-center gap-2 p-2 rounded-lg border transition ${
// //                 currentPatientIndex === index
// //                   ? 'border-[#2c6774] bg-[#2c6774]/10'
// //                   : 'border-gray-200 hover:border-[#5c878f]'
// //               }`}
// //             >
// //               <button
// //                 onClick={() => switchPatient(index)}
// //                 className="flex items-center gap-2 px-3 py-1"
// //               >
// //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //                   currentPatientIndex === index
// //                     ? 'bg-[#2c6774] text-white'
// //                     : 'bg-gray-200 text-gray-600'
// //                 }`}>
// //                   {patient.patientIndex}
// //                 </div>
// //                 <span className="font-medium">
// //                   {patient.details.name || `Patient ${patient.patientIndex}`}
// //                 </span>
// //                 <span className="text-sm text-gray-500">
// //                   ({patient.selectedTests.length} tests)
// //                 </span>
// //               </button>

// //               <button
// //                 onClick={() => editPatientTests(index)}
// //                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
// //                 title="Edit tests"
// //               >
// //                 <FaEdit />
// //               </button>

// //               {patients.length > 1 && (
// //                 <button
// //                   onClick={() => removePatient(index)}
// //                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
// //                   title="Remove patient"
// //                 >
// //                   <FaTrash />
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="grid lg:grid-cols-3 gap-8">
// //         {/* Left Column: Booking Form */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Patient Details Card */}
// //           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
// //                 <FaUser className="text-white text-lg" />
// //               </div>
// //               <div>
// //                 <h2 className="text-xl font-bold text-[#174047]">
// //                   Patient {currentPatientIndex + 1} Information
// //                 </h2>
// //                 <p className="text-sm text-[#5c878f]">Fill in personal details</p>
// //               </div>
// //             </div>

// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Full Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={patientDetails.name}
// //                   onChange={(e) => handleInputChange('name', e.target.value)}
// //                   onBlur={() => validateField('name', patientDetails.name)}
// //                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                     formErrors.name ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                   }`}
// //                   placeholder="Enter patient's full name"
// //                 />
// //                 {formErrors.name && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Age *
// //                 </label>
// //                 <input
// //                   type="number"
// //                   min="1"
// //                   max="120"
// //                   value={patientDetails.age}
// //                   onChange={(e) => handleInputChange('age', e.target.value)}
// //                   onBlur={() => validateField('age', patientDetails.age)}
// //                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                     formErrors.age ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                   }`}
// //                   placeholder="Age in years"
// //                 />
// //                 {formErrors.age && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.age}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Gender *
// //                 </label>
// //                 <select
// //                   value={patientDetails.gender}
// //                   onChange={(e) => handleInputChange('gender', e.target.value)}
// //                   className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="male">Male</option>
// //                   <option value="female">Female</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Mobile Number *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaPhone className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="tel"
// //                     value={patientDetails.mobile}
// //                     onChange={(e) => handleInputChange('mobile', e.target.value)}
// //                     onBlur={() => validateField('mobile', patientDetails.mobile)}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.mobile ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="9876543210"
// //                     maxLength="10"
// //                   />
// //                 </div>
// //                 {formErrors.mobile && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
// //                 )}
// //               </div>

// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Email Address *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaEnvelope className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="email"
// //                     value={patientDetails.email}
// //                     onChange={(e) => handleInputChange('email', e.target.value)}
// //                     onBlur={() => validateField('email', patientDetails.email)}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.email ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="patient@example.com"
// //                   />
// //                 </div>
// //                 {formErrors.email && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
// //                 )}
// //               </div>

// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Complete Address *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute top-3 left-3">
// //                     <FaMapMarkerAlt className="text-[#5c878f]" />
// //                   </div>
// //                   <textarea
// //                     value={patientDetails.address}
// //                     onChange={(e) => handleInputChange('address', e.target.value)}
// //                     onBlur={() => validateField('address', patientDetails.address)}
// //                     rows="3"
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.address ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="House no., Street, Landmark, City, State - Pincode"
// //                   />
// //                 </div>
// //                 {formErrors.address && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Appointment Details Card */}
// //           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
// //                 <FaCalendarAlt className="text-white text-lg" />
// //               </div>
// //               <div>
// //                 <h2 className="text-xl font-bold text-[#174047]">
// //                   Appointment Details
// //                 </h2>
// //                 <p className="text-sm text-[#5c878f]">Schedule your test collection</p>
// //               </div>
// //             </div>

// //             <div className="space-y-6">
// //               {/* Date Selection */}
// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Preferred Date for Sample Collection *
// //                 </label>
// //                 <div className="relative max-w-md">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaCalendarAlt className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="date"
// //                     value={appointmentDetails.preferredDate}
// //                     onChange={(e) => {
// //                       setAppointmentDetails(prev => ({
// //                         ...prev,
// //                         preferredDate: e.target.value
// //                       }));
// //                       validateField('preferredDate', e.target.value);
// //                     }}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors.preferredDate ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                   />
// //                 </div>
// //                 {formErrors.preferredDate && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors.preferredDate}</p>
// //                 )}
// //               </div>

// //               {/* Address for Collection */}
// //               {appointmentDetails.sampleCollectionType === 'home' && (
// //                 <div>
// //                   <label className="block text-sm font-medium text-[#174047] mb-2">
// //                     Collection Address (Optional)
// //                     <span className="text-[#5c878f] font-normal ml-1">
// //                       - Leave blank if same as patient address
// //                     </span>
// //                   </label>
// //                   <textarea
// //                     value={appointmentDetails.addressForCollection}
// //                     onChange={(e) => setAppointmentDetails({
// //                       ...appointmentDetails,
// //                       addressForCollection: e.target.value
// //                     })}
// //                     rows="2"
// //                     className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition"
// //                     placeholder="Enter different collection address (optional)"
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Terms & Conditions */}
// //           <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
// //             <div className="flex items-start gap-3">
// //               <input
// //                 type="checkbox"
// //                 id="terms"
// //                 checked={termsAccepted}
// //                 onChange={(e) => setTermsAccepted(e.target.checked)}
// //                 className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
// //               />
// //               <label htmlFor="terms" className="text-sm text-[#174047] leading-relaxed">
// //                 <span className="font-semibold">Terms & Conditions:</span> I agree that the information provided is accurate. I understand that
// //                 the lab technician will contact me to confirm the appointment. Any cancellation should be done
// //                 at least 6 hours before the scheduled time. I agree to pay the amount at the time of sample collection.
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column: Order Summary */}
// //         <div className="lg:col-span-1">
// //           <div className="sticky top-8 space-y-6">
// //             {/* Order Summary Card */}
// //             <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
// //               {/* Header */}
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
// //                 <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
// //                 <p className="text-[#c0d3dc]">Review all patients</p>
// //               </div>

// //               {/* Lab Info */}
// //               {lab && (
// //                 <div className="p-6 border-b border-[#c0d3dc]">
// //                   <div className="flex items-center gap-3 mb-4">
// //                     <img
// //                       src={`http://localhost:5000/uploads/${lab.logo}`}
// //                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
// //                       alt={lab.name}
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/56?text=Lab';
// //                       }}
// //                     />
// //                     <div>
// //                       <h3 className="font-bold text-[#174047]">{lab.name}</h3>
// //                       <p className="text-sm text-[#5c878f]">
// //                         {patients.length} {patients.length === 1 ? 'patient' : 'patients'} • {tests.length} total tests
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center justify-between bg-[#9fbfc5]/10 p-3 rounded-lg">
// //                     <span className="text-[#174047] font-medium">Collection Type:</span>
// //                     <span className="font-semibold capitalize px-3 py-1 rounded-full bg-[#2c6774] text-white text-sm">
// //                       {appointmentDetails.sampleCollectionType === 'home'
// //                         ? 'Home Collection'
// //                         : 'Lab Visit'}
// //                     </span>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Patients Summary */}
// //               <div className="p-6 border-b border-[#c0d3dc] max-h-96 overflow-y-auto">
// //                 <h3 className="font-bold text-lg text-[#174047] mb-4">Patients & Tests</h3>
// //                 <div className="space-y-6">
// //                   {patients.map((patient, index) => (
// //                     <div key={patient.id} className="border-b border-[#c0d3dc] last:border-0 pb-4 last:pb-0">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <div className="flex items-center gap-2">
// //                           <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
// //                             {index + 1}
// //                           </div>
// //                           <span className="font-semibold text-[#174047]">
// //                             {patient.details.name || `Patient ${index + 1}`}
// //                           </span>
// //                         </div>
// //                         <span className="text-sm text-[#5c878f]">
// //                           {patient.selectedTests.length} tests
// //                         </span>
// //                       </div>

// //                       <div className="ml-8 space-y-2">
// //                         {patient.selectedTests.map(testId => {
// //                           const test = tests.find(t => t._id === testId);
// //                           if (!test) return null;

// //                           const discountedPrice = Math.round(
// //                             test.price - (test.price * (lab?.discount || 0) / 100)
// //                           );

// //                           return (
// //                             <div key={testId} className="flex justify-between items-center text-sm">
// //                               <span className="text-[#5c878f]">{test.name}</span>
// //                               <span className="font-medium text-[#2c6774]">Rs {discountedPrice}</span>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="p-6 border-b border-[#c0d3dc]">
// //                 <h3 className="font-bold text-lg text-[#174047] mb-4">Price Details</h3>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between">
// //                     <span className="text-[#5c878f]">Total Tests Price</span>
// //                     <span className="font-medium text-[#174047]">Rs {total.original}</span>
// //                   </div>

// //                   {lab?.discount > 0 && (
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-[#5c878f]">Discount</span>
// //                       <span className="flex items-center gap-2">
// //                         <FaTag className="text-[#2c6774]" />
// //                         <span className="font-semibold text-[#2c6774]">
// //                           -{lab.discount}% (Rs {total.original - total.final})
// //                         </span>
// //                       </span>
// //                     </div>
// //                   )}

// //                   <div className="pt-3 border-t border-[#c0d3dc]">
// //                     <div className="flex justify-between items-center">
// //                       <span className="font-bold text-lg text-[#174047]">Total Amount</span>
// //                       <div className="text-right">
// //                         <div className="text-2xl font-bold text-[#2c6774]">
// //                           Rs {total.final}
// //                         </div>
// //                         {lab?.discount > 0 && (
// //                           <div className="text-sm text-[#5c878f] line-through">
// //                             Rs {total.original}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {lab?.discount > 0 && (
// //                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
// //                     <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
// //                       You save Rs {total.original - total.final} with {lab.discount}% discount!
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Confirm Booking Button */}
// //               <div className="p-6">
// //                 <button
// //                   onClick={handleSubmit}
// //                   disabled={loading || !patients.length}
// //                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
// //                     loading ? 'cursor-wait' : ''
// //                   }`}
// //                   style={{
// //                     background: 'linear-gradient(to right, #2c6774, #1e4e56)',
// //                     boxShadow: '0 4px 14px 0 rgba(44, 103, 116, 0.39)'
// //                   }}
// //                 >
// //                   {loading ? (
// //                     <span className="flex items-center justify-center gap-2">
// //                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
// //                       Processing Booking...
// //                     </span>
// //                   ) : (
// //                     `Confirm Booking for ${patients.length} ${patients.length === 1 ? 'Patient' : 'Patients'}`
// //                   )}
// //                 </button>

// //                 <div className="mt-4 text-center space-y-2">
// //                   <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
// //                     <FaShieldAlt />
// //                     <span>Secure & Safe Booking</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Benefits Card */}
// //             <div className="bg-gradient-to-br from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5] p-5">
// //               <h4 className="font-bold text-lg text-[#174047] mb-4 flex items-center gap-2">
// //                 <FaShieldAlt className="text-[#2c6774]" />
// //                 Why Book With Us?
// //               </h4>
// //               <div className="space-y-3">
// //                 <div className="flex items-start gap-3">
// //                   <div className="bg-white p-2 rounded-lg border border-[#5c878f]/20">
// //                     <FaClock className="text-[#2c6774]" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-sm text-[#174047]">Same Day Results</p>
// //                     <p className="text-xs text-[#5c878f]">Fast & accurate reports</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <div className="bg-white p-2 rounded-lg border border-[#5c878f]/20">
// //                     <FaShieldAlt className="text-[#2c6774]" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-sm text-[#174047]">Certified Labs</p>
// //                     <p className="text-xs text-[#5c878f]">NABL accredited facilities</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <div className="bg-white p-2 rounded-lg border border-[#5c878f]/20">
// //                     <FaHeadset className="text-[#2c6774]" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-sm text-[#174047]">24/7 Support</p>
// //                     <p className="text-xs text-[#5c878f]">Always here to help you</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Help Box */}
// //             <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
// //               <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
// //                 <FaHeadset className="text-[#2c6774]" />
// //                 Need Help?
// //               </h4>
// //               <div className="space-y-2">
// //                 <p className="text-sm text-[#174047]">
// //                   Call us: <span className="font-semibold text-[#2c6774]">1800-123-4567</span>
// //                 </p>
// //                 <p className="text-sm text-[#174047]">
// //                   Email: <span className="font-semibold text-[#2c6774]">support@quickcure.com</span>
// //                 </p>
// //                 <p className="text-xs text-[#5c878f] mt-3">
// //                   Our support team is available 24/7 to assist you
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import {
// //   FaCalendarAlt,
// //   FaHome,
// //   FaHospital,
// //   FaCheckCircle,
// //   FaExclamationTriangle,
// //   FaUser,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaTag,
// //   FaArrowLeft,
// //   FaShieldAlt,
// //   FaHeadset,
// //   FaUserPlus,
// //   FaTrash,
// //   FaEdit
// // } from 'react-icons/fa';

// // export default function BookingPage() {
// //   const { id: labId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { patients: initialPatients } = location.state || {};

// //   const isSubmitting = useRef(false);
// //   const [error, setError] = useState(null);
// //   const [formErrors, setFormErrors] = useState({});

// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [bookingSuccess, setBookingSuccess] = useState(false);
// //   const [bookingDetails, setBookingDetails] = useState(null);

// //   // Multi-patient state
// //   const [patients, setPatients] = useState([]);
// //   const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

// //   // Form state for current patient (includes appointment date)
// //   const [patientDetails, setPatientDetails] = useState({
// //     name: '',
// //     age: '',
// //     gender: '',
// //     mobile: '',
// //     email: '',
// //     address: '',
// //     appointmentDate: ''  // Added appointment date to patient info
// //   });

// //   // "Same as Previous" checkboxes
// //   const [sameAddressAsPrevious, setSameAddressAsPrevious] = useState(false);
// //   const [sameDateAsPrevious, setSameDateAsPrevious] = useState(false);

// //   const [termsAccepted, setTermsAccepted] = useState(false);

// //   // Initialize patients from state
// //   useEffect(() => {
// //     if (initialPatients && initialPatients.length > 0) {
// //       // Create patient forms for each patient with tests
// //       const patientForms = initialPatients.map((patient, index) => ({
// //         id: Date.now() + index,
// //         patientIndex: index + 1,
// //         selectedTests: patient.selectedTests,
// //         details: {
// //           name: '',
// //           age: '',
// //           gender: '',
// //           mobile: '',
// //           email: '',
// //           address: '',
// //           appointmentDate: ''  // Initialize appointment date
// //         }
// //       }));
// //       setPatients(patientForms);

// //       // Load tests for all selected tests
// //       const allTestIds = initialPatients.flatMap(p => p.selectedTests);
// //       if (allTestIds.length > 0) {
// //         fetchLabAndTests(allTestIds);
// //       }
// //     } else {
// //       navigate(`/labs/${labId}`);
// //     }
// //   }, []);

// //   const fetchLabAndTests = async (testIds) => {
// //     try {
// //       const [labRes, testsRes] = await Promise.all([
// //         axios.get(`http://localhost:5000/api/labs/${labId}`),
// //         axios.get(`http://localhost:5000/api/tests/lab/${labId}`)
// //       ]);

// //       setLab(labRes.data);
// //       const allTests = testsRes.data || [];
// //       const selectedTestDetails = allTests.filter(test =>
// //         testIds.includes(test._id)
// //       );
// //       setTests(selectedTestDetails);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       setError('Failed to load lab details. Please try again.');
// //     }
// //   };

// //   // Handle "Same as Previous" checkboxes
// //   useEffect(() => {
// //     if (currentPatientIndex > 0) {
// //       const previousPatient = patients[currentPatientIndex - 1];

// //       if (sameAddressAsPrevious) {
// //         setPatientDetails(prev => ({
// //           ...prev,
// //           address: previousPatient.details.address
// //         }));
// //       }

// //       if (sameDateAsPrevious) {
// //         setPatientDetails(prev => ({
// //           ...prev,
// //           appointmentDate: previousPatient.details.appointmentDate
// //         }));
// //       }
// //     }
// //   }, [sameAddressAsPrevious, sameDateAsPrevious, currentPatientIndex, patients]);

// //   // Switch between patients
// //   const switchPatient = (index) => {
// //     // Save current patient's details
// //     const updatedPatients = [...patients];
// //     updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //     setPatients(updatedPatients);

// //     // Load new patient's details
// //     setCurrentPatientIndex(index);
// //     setPatientDetails(updatedPatients[index].details);

// //     // Reset "Same as Previous" checkboxes
// //     setSameAddressAsPrevious(false);
// //     setSameDateAsPrevious(false);
// //   };

// //   // Add a new patient manually
// //   const addNewPatient = () => {
// //     const newPatient = {
// //       id: Date.now(),
// //       patientIndex: patients.length + 1,
// //       selectedTests: [],
// //       details: {
// //         name: '',
// //         age: '',
// //         gender: '',
// //         mobile: '',
// //         email: '',
// //         address: '',
// //         appointmentDate: ''
// //       }
// //     };
// //     setPatients([...patients, newPatient]);
// //     setCurrentPatientIndex(patients.length);

// //     // Clear form for new patient
// //     setPatientDetails({
// //       name: '',
// //       age: '',
// //       gender: '',
// //       mobile: '',
// //       email: '',
// //       address: '',
// //       appointmentDate: ''
// //     });

// //     // Reset "Same as Previous" checkboxes
// //     setSameAddressAsPrevious(false);
// //     setSameDateAsPrevious(false);
// //   };

// //   // Remove a patient
// //   const removePatient = (index) => {
// //     if (patients.length <= 1) {
// //       setError("Cannot remove the last patient. At least one patient is required.");
// //       return;
// //     }

// //     const updatedPatients = patients.filter((_, i) => i !== index);
// //     setPatients(updatedPatients);

// //     // Adjust current index if needed
// //     if (currentPatientIndex >= updatedPatients.length) {
// //       setCurrentPatientIndex(updatedPatients.length - 1);
// //       setPatientDetails(updatedPatients[updatedPatients.length - 1].details);
// //     } else if (currentPatientIndex === index) {
// //       setCurrentPatientIndex(Math.max(0, index - 1));
// //       setPatientDetails(updatedPatients[Math.max(0, index - 1)].details);
// //     }

// //     // Reset "Same as Previous" checkboxes
// //     setSameAddressAsPrevious(false);
// //     setSameDateAsPrevious(false);
// //   };

// //   // Edit tests for a patient (redirect to lab detail)
// //   const editPatientTests = (patientIndex) => {
// //     // Save current patient's details
// //     const updatedPatients = [...patients];
// //     updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //     setPatients(updatedPatients);

// //     // Navigate back to lab detail with patient context
// //     navigate(`/labs/${labId}`, {
// //       state: {
// //         editPatientIndex: patientIndex,
// //         patients: updatedPatients
// //       }
// //     });
// //   };

// //   const calculateTotal = () => {
// //     if (!lab || !patients.length) return { original: 0, final: 0, discount: 0 };

// //     // Calculate total for all patients
// //     let original = 0;
// //     patients.forEach(patient => {
// //       patient.selectedTests.forEach(testId => {
// //         const test = tests.find(t => t._id === testId);
// //         if (test) {
// //           original += Number(test.price);
// //         }
// //       });
// //     });

// //     const discount = lab.discount || 0;
// //     const final = Math.round(original - (original * discount / 100));

// //     return { original: Math.round(original), final, discount };
// //   };

// //   const validateField = (field, value) => {
// //     const errors = { ...formErrors };
// //     const errorKey = `${currentPatientIndex}_${field}`;

// //     switch (field) {
// //       case 'name':
// //         if (!value.trim()) {
// //           errors[errorKey] = 'Name is required';
// //         } else if (value.trim().length < 2) {
// //           errors[errorKey] = 'Name must be at least 2 characters';
// //         } else {
// //           delete errors[errorKey];
// //         }
// //         break;

// //       case 'age':
// //         if (!value) {
// //           errors[errorKey] = 'Age is required';
// //         } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
// //           errors[errorKey] = 'Please enter a valid age (1-120)';
// //         } else {
// //           delete errors[errorKey];
// //         }
// //         break;

// //       case 'mobile':
// //         const mobileRegex = /^[0-9]{10}$/;
// //         if (!value) {
// //           errors[errorKey] = 'Mobile number is required';
// //         } else if (!mobileRegex.test(value)) {
// //           errors[errorKey] = 'Please enter a valid 10-digit mobile number';
// //         } else {
// //           delete errors[errorKey];
// //         }
// //         break;

// //       case 'email':
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         if (!value) {
// //           errors[errorKey] = 'Email is required';
// //         } else if (!emailRegex.test(value)) {
// //           errors[errorKey] = 'Please enter a valid email address';
// //         } else {
// //           delete errors[errorKey];
// //         }
// //         break;

// //       case 'address':
// //         if (!value.trim()) {
// //           errors[errorKey] = 'Address is required';
// //         } else if (value.trim().length < 10) {
// //           errors[errorKey] = 'Please enter a complete address';
// //         } else {
// //           delete errors[errorKey];
// //         }
// //         break;

// //       case 'appointmentDate':
// //         if (!value) {
// //           errors[errorKey] = 'Please select an appointment date';
// //         } else {
// //           const selectedDate = new Date(value);
// //           const today = new Date();
// //           today.setHours(0, 0, 0, 0);

// //           if (selectedDate < today) {
// //             errors[errorKey] = 'Date cannot be in the past';
// //           } else {
// //             delete errors[errorKey];
// //           }
// //         }
// //         break;
// //     }

// //     setFormErrors(errors);
// //     return !errors[errorKey];
// //   };

// //   const handleInputChange = (field, value) => {
// //     setPatientDetails(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));

// //     const errorKey = `${currentPatientIndex}_${field}`;
// //     if (formErrors[errorKey]) {
// //       validateField(field, value);
// //     }
// //   };

// //   const validateForm = () => {
// //     // Validate all patients' details
// //     for (let i = 0; i < patients.length; i++) {
// //       const patient = patients[i];
// //       const details = i === currentPatientIndex ? patientDetails : patient.details;

// //       if (!details.name?.trim()) {
// //         setError(`Please fill in name for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.age) {
// //         setError(`Please fill in age for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.gender) {
// //         setError(`Please select gender for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.mobile || !/^[0-9]{10}$/.test(details.mobile)) {
// //         setError(`Please enter valid mobile number for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
// //         setError(`Please enter valid email for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.address?.trim()) {
// //         setError(`Please fill in address for Patient ${i + 1}`);
// //         return false;
// //       }
// //       if (!details.appointmentDate) {
// //         setError(`Please select appointment date for Patient ${i + 1}`);
// //         return false;
// //       }
// //     }

// //     if (!termsAccepted) {
// //       setError('Please accept the terms and conditions');
// //       return false;
// //     }

// //     return true;
// //   };

// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();

// //   //   if (isSubmitting.current) return;

// //   //   if (!patients.length) {
// //   //     setError('Please add at least one patient');
// //   //     return;
// //   //   }

// //   //   // Save current patient's details
// //   //   const updatedPatients = [...patients];
// //   //   updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //   //   setPatients(updatedPatients);

// //   //   if (!validateForm()) {
// //   //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   //     return;
// //   //   }

// //   //   setLoading(true);
// //   //   setError(null);
// //   //   isSubmitting.current = true;

// //   //   try {
// //   //     const total = calculateTotal();

// //   //     // Prepare booking data for multiple patients
// //   //     const bookingData = {
// //   //       labId,
// //   //       patients: updatedPatients.map(patient => ({
// //   //         testIds: patient.selectedTests,
// //   //         patientDetails: {
// //   //           name: patient.details.name.trim(),
// //   //           age: Number(patient.details.age),
// //   //           gender: patient.details.gender,
// //   //           mobile: patient.details.mobile,
// //   //           email: patient.details.email.trim(),
// //   //           address: patient.details.address.trim(),
// //   //           appointmentDate: new Date(patient.details.appointmentDate).toISOString()
// //   //         }
// //   //       }))
// //   //     };

// //   //     console.log('Sending booking data:', bookingData);

// //   //     const response = await axios.post(
// //   //       'http://localhost:5000/api/bookings/multiple',
// //   //       bookingData,
// //   //       {
// //   //         timeout: 10000,
// //   //         headers: {
// //   //           'Content-Type': 'application/json'
// //   //         }
// //   //       }
// //   //     );

// //   //     console.log('Booking response:', response.data);

// //   //     setBookingSuccess(true);
// //   //     setBookingDetails(response.data.booking);

// //   //   } catch (error) {
// //   //     console.error('Booking error details:', error);

// //   //     let errorMessage = 'Booking failed. Please try again.';

// //   //     if (error.response) {
// //   //       const { data } = error.response;
// //   //       if (data.error) {
// //   //         errorMessage = data.error;
// //   //         if (data.details) {
// //   //           if (Array.isArray(data.details)) {
// //   //             errorMessage += `: ${data.details.join(', ')}`;
// //   //           } else if (typeof data.details === 'object') {
// //   //             errorMessage += `: ${JSON.stringify(data.details)}`;
// //   //           } else {
// //   //             errorMessage += `: ${data.details}`;
// //   //           }
// //   //         }
// //   //       } else if (data.message) {
// //   //         errorMessage = data.message;
// //   //       }
// //   //     } else if (error.request) {
// //   //       errorMessage = 'No response from server. Please check your connection.';
// //   //     } else {
// //   //       errorMessage = error.message;
// //   //     }

// //   //     setError(errorMessage);
// //   //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   //   } finally {
// //   //     setLoading(false);
// //   //     isSubmitting.current = false;
// //   //   }
// //   // };
// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (isSubmitting.current) return;

// //   if (!patients.length) {
// //     setError('Please add at least one patient');
// //     return;
// //   }

// //   // Save current patient's details
// //   const updatedPatients = [...patients];
// //   updatedPatients[currentPatientIndex].details = { ...patientDetails };
// //   setPatients(updatedPatients);

// //   if (!validateForm()) {
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //     return;
// //   }

// //   setLoading(true);
// //   setError(null);
// //   isSubmitting.current = true;

// //   try {
// //     // Use the FIRST patient's appointment date for the global appointment
// //     const firstPatientDate = updatedPatients[0]?.details.appointmentDate;

// //     const bookingData = {
// //       labId,
// //       patients: updatedPatients.map(patient => ({
// //         testIds: patient.selectedTests,
// //         patientDetails: {
// //           name: patient.details.name.trim(),
// //           age: Number(patient.details.age),
// //           gender: patient.details.gender,
// //           mobile: patient.details.mobile,
// //           email: patient.details.email.trim(),
// //           address: patient.details.address.trim()
// //           // appointmentDate is removed from here
// //         }
// //       })),
// //       appointmentDetails: {
// //         preferredDate: firstPatientDate ? new Date(firstPatientDate).toISOString() : new Date().toISOString(),
// //         sampleCollectionType: 'home' // Default value
// //       }
// //     };

// //     console.log('Sending booking data:', bookingData);

// //     const response = await axios.post(
// //       'http://localhost:5000/api/bookings/multiple',
// //       bookingData,
// //       {
// //         timeout: 10000,
// //         headers: {
// //           'Content-Type': 'application/json'
// //         }
// //       }
// //     );

// //     console.log('Booking response:', response.data);
// //     setBookingSuccess(true);
// //     setBookingDetails(response.data.booking);

// //   } catch (error) {
// //     console.error('Booking error details:', error);

// //     let errorMessage = 'Booking failed. Please try again.';

// //     if (error.response) {
// //       console.log('Error response data:', error.response.data);
// //       errorMessage = error.response.data?.error || errorMessage;
// //     }

// //     setError(errorMessage);
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   } finally {
// //     setLoading(false);
// //     isSubmitting.current = false;
// //   }
// // };
// //   const total = calculateTotal();

// //   if (bookingSuccess && bookingDetails) {
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
// //         <div className="bg-gradient-to-br from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f] rounded-3xl p-8 text-center shadow-xl">
// //           <div className="flex justify-center mb-6">
// //             <div className="bg-[#2c6774] p-4 rounded-full">
// //               <FaCheckCircle className="text-6xl text-white" />
// //             </div>
// //           </div>

// //           <h1 className="text-3xl font-bold text-[#174047] mb-3">
// //             Booking Confirmed! 🎉
// //           </h1>
// //           <p className="text-[#5c878f] text-lg mb-8">
// //             Your appointments have been scheduled successfully for {patients.length} {patients.length === 1 ? 'patient' : 'patients'}
// //           </p>

// //           <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-[#c0d3dc]">
// //             <div className="grid md:grid-cols-2 gap-6 mb-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Booking Reference</p>
// //                   <p className="font-bold text-xl text-[#2c6774] tracking-wide">
// //                     {bookingDetails.bookingReference}
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="text-[#5c878f] text-sm">Number of Patients</p>
// //                   <p className="font-semibold text-lg text-[#174047]">{patients.length}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="border-t border-[#c0d3dc] pt-6">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-[#5c878f]">Total Amount</span>
// //                 <div className="text-right">
// //                   <p className="text-2xl font-bold text-[#2c6774]">
// //                     Rs {total.final}
// //                   </p>
// //                   <p className="text-sm text-[#5c878f]">
// //                     <s>Rs {total.original}</s> • Saved Rs {total.original - total.final}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-[#9fbfc5]/30 rounded-xl p-4 mb-8 border border-[#5c878f]/30">
// //             <p className="text-sm text-[#174047]">
// //               <span className="font-semibold">Next Steps:</span> You will receive a confirmation call from the lab within 30 minutes.
// //               Please keep your booking reference handy for any queries.
// //             </p>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <button
// //               onClick={() => window.print()}
// //               className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl font-semibold hover:bg-[#9fbfc5]/20 transition flex items-center justify-center gap-2"
// //             >
// //               Print Receipt
// //             </button>
// //             <button
// //               onClick={() => navigate('/')}
// //               className="px-6 py-3 bg-[#2c6774] text-white rounded-xl font-semibold hover:bg-[#1e4e56] transition flex items-center justify-center gap-2"
// //             >
// //               Back to Home
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Error Alert */}
// //       {error && (
// //         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
// //           <div className="flex items-start gap-3">
// //             <FaExclamationTriangle className="text-red-500 mt-0.5" />
// //             <div className="flex-1">
// //               <p className="font-medium text-red-700">{error}</p>
// //               <button
// //                 onClick={() => setError(null)}
// //                 className="text-sm text-red-600 hover:text-red-800 mt-1"
// //               >
// //                 Dismiss
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Header */}
// //       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
// //         <div>
// //           <button
// //             onClick={() => navigate(`/labs/${labId}`)}
// //             className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
// //           >
// //             <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
// //             Back to Lab
// //           </button>
// //           <h1 className="text-3xl font-bold text-[#174047]">Complete Your Booking</h1>
// //           <p className="text-[#5c878f] mt-2">Fill in details for all patients</p>
// //         </div>

// //         {lab && (
// //           <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
// //             <img
// //               src={`http://localhost:5000/uploads/${lab.logo}`}
// //               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
// //               alt={lab.name}
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/48?text=Lab';
// //               }}
// //             />
// //             <div>
// //               <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
// //               <p className="text-sm text-[#5c878f]">{lab.branches}</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Patient Selector */}
// //       <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc]">
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
// //           <button
// //             onClick={addNewPatient}
// //             className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition"
// //           >
// //             <FaUserPlus />
// //             Add Another Person
// //           </button>
// //         </div>

// //         <div className="flex flex-wrap gap-3">
// //           {patients.map((patient, index) => (
// //             <div
// //               key={patient.id}
// //               className={`flex items-center gap-2 p-2 rounded-lg border transition ${
// //                 currentPatientIndex === index
// //                   ? 'border-[#2c6774] bg-[#2c6774]/10'
// //                   : 'border-gray-200 hover:border-[#5c878f]'
// //               }`}
// //             >
// //               <button
// //                 onClick={() => switchPatient(index)}
// //                 className="flex items-center gap-2 px-3 py-1"
// //               >
// //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //                   currentPatientIndex === index
// //                     ? 'bg-[#2c6774] text-white'
// //                     : 'bg-gray-200 text-gray-600'
// //                 }`}>
// //                   {patient.patientIndex}
// //                 </div>
// //                 <span className="font-medium">
// //                   {patient.details.name || `Patient ${patient.patientIndex}`}
// //                 </span>
// //                 <span className="text-sm text-gray-500">
// //                   ({patient.selectedTests.length} tests)
// //                 </span>
// //               </button>

// //               <button
// //                 onClick={() => editPatientTests(index)}
// //                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
// //                 title="Edit tests"
// //               >
// //                 <FaEdit />
// //               </button>

// //               {patients.length > 1 && (
// //                 <button
// //                   onClick={() => removePatient(index)}
// //                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
// //                   title="Remove patient"
// //                 >
// //                   <FaTrash />
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="grid lg:grid-cols-3 gap-8">
// //         {/* Left Column: Booking Form */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Patient Details Card (Includes Appointment Date) */}
// //           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
// //                 <FaUser className="text-white text-lg" />
// //               </div>
// //               <div>
// //                 <h2 className="text-xl font-bold text-[#174047]">
// //                   Patient {currentPatientIndex + 1} Information
// //                 </h2>
// //                 <p className="text-sm text-[#5c878f]">Fill in personal details and appointment date</p>
// //               </div>
// //             </div>

// //             <div className="grid md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Full Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={patientDetails.name}
// //                   onChange={(e) => handleInputChange('name', e.target.value)}
// //                   onBlur={() => validateField('name', patientDetails.name)}
// //                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                     formErrors[`${currentPatientIndex}_name`] ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                   }`}
// //                   placeholder="Enter patient's full name"
// //                 />
// //                 {formErrors[`${currentPatientIndex}_name`] && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors[`${currentPatientIndex}_name`]}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Age *
// //                 </label>
// //                 <input
// //                   type="number"
// //                   min="1"
// //                   max="120"
// //                   value={patientDetails.age}
// //                   onChange={(e) => handleInputChange('age', e.target.value)}
// //                   onBlur={() => validateField('age', patientDetails.age)}
// //                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                     formErrors[`${currentPatientIndex}_age`] ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                   }`}
// //                   placeholder="Age in years"
// //                 />
// //                 {formErrors[`${currentPatientIndex}_age`] && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors[`${currentPatientIndex}_age`]}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Gender *
// //                 </label>
// //                 <select
// //                   value={patientDetails.gender}
// //                   onChange={(e) => handleInputChange('gender', e.target.value)}
// //                   className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
// //                 >
// //                   <option value="">Select Gender</option>
// //                   <option value="male">Male</option>
// //                   <option value="female">Female</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Mobile Number *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaPhone className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="tel"
// //                     value={patientDetails.mobile}
// //                     onChange={(e) => handleInputChange('mobile', e.target.value)}
// //                     onBlur={() => validateField('mobile', patientDetails.mobile)}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors[`${currentPatientIndex}_mobile`] ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="9876543210"
// //                     maxLength="10"
// //                   />
// //                 </div>
// //                 {formErrors[`${currentPatientIndex}_mobile`] && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors[`${currentPatientIndex}_mobile`]}</p>
// //                 )}
// //               </div>

// //               <div className="md:col-span-2">
// //                 <label className="block text-sm font-medium text-[#174047] mb-2">
// //                   Email Address *
// //                 </label>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaEnvelope className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="email"
// //                     value={patientDetails.email}
// //                     onChange={(e) => handleInputChange('email', e.target.value)}
// //                     onBlur={() => validateField('email', patientDetails.email)}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors[`${currentPatientIndex}_email`] ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="patient@example.com"
// //                   />
// //                 </div>
// //                 {formErrors[`${currentPatientIndex}_email`] && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors[`${currentPatientIndex}_email`]}</p>
// //                 )}
// //               </div>

// //               <div className="md:col-span-2">
// //                 <div className="flex items-center justify-between mb-2">
// //                   <label className="block text-sm font-medium text-[#174047]">
// //                     Complete Address *
// //                   </label>
// //                   {/* Same as Previous Address Checkbox */}
// //                   {currentPatientIndex > 0 && (
// //                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={sameAddressAsPrevious}
// //                         onChange={(e) => setSameAddressAsPrevious(e.target.checked)}
// //                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
// //                       />
// //                       <span>Same as previous patient's address</span>
// //                     </label>
// //                   )}
// //                 </div>
// //                 <div className="relative">
// //                   <div className="absolute top-3 left-3">
// //                     <FaMapMarkerAlt className="text-[#5c878f]" />
// //                   </div>
// //                   <textarea
// //                     value={patientDetails.address}
// //                     onChange={(e) => handleInputChange('address', e.target.value)}
// //                     onBlur={() => validateField('address', patientDetails.address)}
// //                     rows="3"
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors[`${currentPatientIndex}_address`] ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                     placeholder="House no., Street, Landmark, City, State - Pincode"
// //                   />
// //                 </div>
// //                 {formErrors[`${currentPatientIndex}_address`] && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors[`${currentPatientIndex}_address`]}</p>
// //                 )}
// //               </div>

// //               {/* Appointment Date Field */}
// //               <div className="md:col-span-2">
// //                 <div className="flex items-center justify-between mb-2">
// //                   <label className="block text-sm font-medium text-[#174047]">
// //                     Appointment Date *
// //                   </label>
// //                   {/* Same as Previous Date Checkbox */}
// //                   {currentPatientIndex > 0 && (
// //                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={sameDateAsPrevious}
// //                         onChange={(e) => setSameDateAsPrevious(e.target.checked)}
// //                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
// //                       />
// //                       <span>Same as previous patient's date</span>
// //                     </label>
// //                   )}
// //                 </div>
// //                 <div className="relative">
// //                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                     <FaCalendarAlt className="text-[#5c878f]" />
// //                   </div>
// //                   <input
// //                     type="date"
// //                     value={patientDetails.appointmentDate}
// //                     onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
// //                     onBlur={() => validateField('appointmentDate', patientDetails.appointmentDate)}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
// //                       formErrors[`${currentPatientIndex}_appointmentDate`] ? 'border-red-500 ring-red-200' : 'border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20'
// //                     }`}
// //                   />
// //                 </div>
// //                 {formErrors[`${currentPatientIndex}_appointmentDate`] && (
// //                   <p className="mt-1 text-sm text-red-600">{formErrors[`${currentPatientIndex}_appointmentDate`]}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Terms & Conditions */}
// //           <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
// //             <div className="flex items-start gap-3">
// //               <input
// //                 type="checkbox"
// //                 id="terms"
// //                 checked={termsAccepted}
// //                 onChange={(e) => setTermsAccepted(e.target.checked)}
// //                 className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
// //               />
// //               <label htmlFor="terms" className="text-sm text-[#174047] leading-relaxed">
// //                 <span className="font-semibold">Terms & Conditions:</span> I agree that the information provided is accurate. I understand that
// //                 the lab technician will contact me to confirm the appointment. Any cancellation should be done
// //                 at least 6 hours before the scheduled time. I agree to pay the amount at the time of sample collection.
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column: Order Summary */}
// //         <div className="lg:col-span-1">
// //           <div className="sticky top-8 space-y-6">
// //             {/* Order Summary Card */}
// //             <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
// //               {/* Header */}
// //               <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
// //                 <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
// //                 <p className="text-[#c0d3dc]">Review all patients</p>
// //               </div>

// //               {/* Lab Info */}
// //               {lab && (
// //                 <div className="p-6 border-b border-[#c0d3dc]">
// //                   <div className="flex items-center gap-3 mb-4">
// //                     <img
// //                       src={`http://localhost:5000/uploads/${lab.logo}`}
// //                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
// //                       alt={lab.name}
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/56?text=Lab';
// //                       }}
// //                     />
// //                     <div>
// //                       <h3 className="font-bold text-[#174047]">{lab.name}</h3>
// //                       <p className="text-sm text-[#5c878f]">
// //                         {patients.length} {patients.length === 1 ? 'patient' : 'patients'} • {tests.length} total tests
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Patients Summary */}
// //               <div className="p-6 border-b border-[#c0d3dc] max-h-96 overflow-y-auto">
// //                 <h3 className="font-bold text-lg text-[#174047] mb-4">Patients & Tests</h3>
// //                 <div className="space-y-6">
// //                   {patients.map((patient, index) => (
// //                     <div key={patient.id} className="border-b border-[#c0d3dc] last:border-0 pb-4 last:pb-0">
// //                       <div className="flex items-center justify-between mb-2">
// //                         <div className="flex items-center gap-2">
// //                           <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
// //                             {index + 1}
// //                           </div>
// //                           <span className="font-semibold text-[#174047]">
// //                             {patient.details.name || `Patient ${index + 1}`}
// //                           </span>
// //                         </div>
// //                         <span className="text-sm text-[#5c878f]">
// //                           {patient.selectedTests.length} tests
// //                         </span>
// //                       </div>

// //                       <div className="ml-8 space-y-2">
// //                         {patient.selectedTests.map(testId => {
// //                           const test = tests.find(t => t._id === testId);
// //                           if (!test) return null;

// //                           const discountedPrice = Math.round(
// //                             test.price - (test.price * (lab?.discount || 0) / 100)
// //                           );

// //                           return (
// //                             <div key={testId} className="flex justify-between items-center text-sm">
// //                               <span className="text-[#5c878f]">{test.name}</span>
// //                               <span className="font-medium text-[#2c6774]">Rs {discountedPrice}</span>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>

// //                       {/* Show appointment date */}
// //                       {patient.details.appointmentDate && (
// //                         <div className="mt-2 ml-8 text-xs text-[#5c878f] flex items-center gap-1">
// //                           <FaCalendarAlt className="text-[#2c6774]" />
// //                           Date: {new Date(patient.details.appointmentDate).toLocaleDateString()}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="p-6 border-b border-[#c0d3dc]">
// //                 <h3 className="font-bold text-lg text-[#174047] mb-4">Price Details</h3>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between">
// //                     <span className="text-[#5c878f]">Total Tests Price</span>
// //                     <span className="font-medium text-[#174047]">Rs {total.original}</span>
// //                   </div>

// //                   {lab?.discount > 0 && (
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-[#5c878f]">Discount</span>
// //                       <span className="flex items-center gap-2">
// //                         <FaTag className="text-[#2c6774]" />
// //                         <span className="font-semibold text-[#2c6774]">
// //                           -{lab.discount}% (Rs {total.original - total.final})
// //                         </span>
// //                       </span>
// //                     </div>
// //                   )}

// //                   <div className="pt-3 border-t border-[#c0d3dc]">
// //                     <div className="flex justify-between items-center">
// //                       <span className="font-bold text-lg text-[#174047]">Total Amount</span>
// //                       <div className="text-right">
// //                         <div className="text-2xl font-bold text-[#2c6774]">
// //                           Rs {total.final}
// //                         </div>
// //                         {lab?.discount > 0 && (
// //                           <div className="text-sm text-[#5c878f] line-through">
// //                             Rs {total.original}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {lab?.discount > 0 && (
// //                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
// //                     <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
// //                       You save Rs {total.original - total.final} with {lab.discount}% discount!
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Confirm Booking Button */}
// //               <div className="p-6">
// //                 <button
// //                   onClick={handleSubmit}
// //                   disabled={loading || !patients.length}
// //                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
// //                     loading ? 'cursor-wait' : ''
// //                   }`}
// //                   style={{
// //                     background: 'linear-gradient(to right, #2c6774, #1e4e56)',
// //                     boxShadow: '0 4px 14px 0 rgba(44, 103, 116, 0.39)'
// //                   }}
// //                 >
// //                   {loading ? (
// //                     <span className="flex items-center justify-center gap-2">
// //                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
// //                       Processing Booking...
// //                     </span>
// //                   ) : (
// //                     `Confirm Booking for ${patients.length} ${patients.length === 1 ? 'Patient' : 'Patients'}`
// //                   )}
// //                 </button>

// //                 <div className="mt-4 text-center space-y-2">
// //                   <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
// //                     <FaShieldAlt />
// //                     <span>Secure & Safe Booking</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Help Box */}
// //             <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
// //               <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
// //                 <FaHeadset className="text-[#2c6774]" />
// //                 Need Help?
// //               </h4>
// //               <div className="space-y-2">
// //                 <p className="text-sm text-[#174047]">
// //                   Call us: <span className="font-semibold text-[#2c6774]">1800-123-4567</span>
// //                 </p>
// //                 <p className="text-sm text-[#174047]">
// //                   Email: <span className="font-semibold text-[#2c6774]">support@quickcure.com</span>
// //                 </p>
// //                 <p className="text-xs text-[#5c878f] mt-3">
// //                   Our support team is available 24/7 to assist you
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaCalendarAlt,
//   FaHome,
//   FaHospital,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaTag,
//   FaArrowLeft,
//   FaShieldAlt,
//   FaHeadset,
//   FaUserPlus,
//   FaTrash,
//   FaEdit,
// } from "react-icons/fa";

// export default function BookingPage() {
//   const { id: labId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { patients: initialPatients } = location.state || {};

//   const isSubmitting = useRef(false);
//   const [error, setError] = useState(null);
//   const [formErrors, setFormErrors] = useState({});

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState(null);

//   // Multi-patient state
//   const [patients, setPatients] = useState([]);
//   const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
// // Add this state with your other useState declarations
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   // Form state for current patient
//   const [patientDetails, setPatientDetails] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     mobile: "",
//     email: "",
//     address: "",
//     appointmentDate: "",
//   });

//   // "Same as Previous" checkboxes
//   const [sameAddressAsPrevious, setSameAddressAsPrevious] = useState(false);
//   const [sameDateAsPrevious, setSameDateAsPrevious] = useState(false);

//   const [termsAccepted, setTermsAccepted] = useState(false);

//   // Initialize patients from state
//   useEffect(() => {
//     if (initialPatients && initialPatients.length > 0) {
//       // Create patient forms for each patient with tests
//       const patientForms = initialPatients.map((patient, index) => ({
//         id: Date.now() + index,
//         patientIndex: index + 1,
//         selectedTests: patient.selectedTests,
//         details: {
//           name: "",
//           age: "",
//           gender: "",
//           mobile: "",
//           email: "",
//           address: "",
//           appointmentDate: "",
//         },
//       }));
//       setPatients(patientForms);

//       // Load tests for all selected tests
//       const allTestIds = initialPatients.flatMap((p) => p.selectedTests);
//       if (allTestIds.length > 0) {
//         fetchLabAndTests(allTestIds);
//       }
//     } else {
//       navigate(`/labs/${labId}`);
//     }
//   }, []);

//   const fetchLabAndTests = async (testIds) => {
//     try {
//       const [labRes, testsRes] = await Promise.all([
//         axios.get(`http://localhost:5000/api/labs/${labId}`),
//         axios.get(`http://localhost:5000/api/tests/lab/${labId}`),
//       ]);

//       setLab(labRes.data);
//       const allTests = testsRes.data || [];
//       const selectedTestDetails = allTests.filter((test) =>
//         testIds.includes(test._id),
//       );
//       setTests(selectedTestDetails);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load lab details. Please try again.");
//     }
//   };

//   // Handle "Same as Previous" checkboxes
//   useEffect(() => {
//     if (currentPatientIndex > 0) {
//       const previousPatient = patients[currentPatientIndex - 1];

//       if (sameAddressAsPrevious) {
//         setPatientDetails((prev) => ({
//           ...prev,
//           address: previousPatient.details.address,
//         }));
//       }

//       if (sameDateAsPrevious) {
//         setPatientDetails((prev) => ({
//           ...prev,
//           appointmentDate: previousPatient.details.appointmentDate,
//         }));
//       }
//     }
//   }, [
//     sameAddressAsPrevious,
//     sameDateAsPrevious,
//     currentPatientIndex,
//     patients,
//   ]);

//   // Switch between patients
//   const switchPatient = (index) => {
//     // Save current patient's details
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].details = { ...patientDetails };
//     setPatients(updatedPatients);

//     // Load new patient's details
//     setCurrentPatientIndex(index);
//     setPatientDetails(updatedPatients[index].details);

//     // Reset "Same as Previous" checkboxes
//     setSameAddressAsPrevious(false);
//     setSameDateAsPrevious(false);
//   };

//   // Add a new patient manually
//   const addNewPatient = () => {
//     const newPatient = {
//       id: Date.now(),
//       patientIndex: patients.length + 1,
//       selectedTests: [],
//       details: {
//         name: "",
//         age: "",
//         gender: "",
//         mobile: "",
//         email: "",
//         address: "",
//         appointmentDate: "",
//       },
//     };
//     setPatients([...patients, newPatient]);
//     setCurrentPatientIndex(patients.length);

//     // Clear form for new patient
//     setPatientDetails({
//       name: "",
//       age: "",
//       gender: "",
//       mobile: "",
//       email: "",
//       address: "",
//       appointmentDate: "",
//     });

//     // Reset "Same as Previous" checkboxes
//     setSameAddressAsPrevious(false);
//     setSameDateAsPrevious(false);
//   };

//   // Remove a patient
//   const removePatient = (index) => {
//     if (patients.length <= 1) {
//       setError(
//         "Cannot remove the last patient. At least one patient is required.",
//       );
//       return;
//     }

//     const updatedPatients = patients.filter((_, i) => i !== index);
//     setPatients(updatedPatients);

//     // Adjust current index if needed
//     if (currentPatientIndex >= updatedPatients.length) {
//       setCurrentPatientIndex(updatedPatients.length - 1);
//       setPatientDetails(updatedPatients[updatedPatients.length - 1].details);
//     } else if (currentPatientIndex === index) {
//       setCurrentPatientIndex(Math.max(0, index - 1));
//       setPatientDetails(updatedPatients[Math.max(0, index - 1)].details);
//     }

//     // Reset "Same as Previous" checkboxes
//     setSameAddressAsPrevious(false);
//     setSameDateAsPrevious(false);
//   };

//   // Edit tests for a patient (redirect to lab detail)
//   const editPatientTests = (patientIndex) => {
//     // Save current patient's details
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].details = { ...patientDetails };
//     setPatients(updatedPatients);

//     // Navigate back to lab detail with patient context
//     navigate(`/labs/${labId}`, {
//       state: {
//         editPatientIndex: patientIndex,
//         patients: updatedPatients,
//       },
//     });
//   };

//   const calculateTotal = () => {
//     if (!lab || !patients.length) return { original: 0, final: 0, discount: 0 };

//     // Calculate total for all patients
//     let original = 0;
//     patients.forEach((patient) => {
//       patient.selectedTests.forEach((testId) => {
//         const test = tests.find((t) => t._id === testId);
//         if (test) {
//           original += Number(test.price);
//         }
//       });
//     });

//     const discount = lab.discount || 0;
//     const final = Math.round(original - (original * discount) / 100);

//     return { original: Math.round(original), final, discount };
//   };

//   // Update the validateField function with strict domain validation
//   const validateField = (field, value) => {
//     const errors = { ...formErrors };
//     const errorKey = `${currentPatientIndex}_${field}`;

//     // List of allowed email domains
//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "live.com",
//       "icloud.com",
//       "aol.com",
//       "protonmail.com",
//       "zoho.com",
//     ];

//     switch (field) {
//       case "name":
//         if (!value.trim()) {
//           errors[errorKey] = "Name is required";
//         } else if (value.trim().length < 2) {
//           errors[errorKey] = "Name must be at least 2 characters";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "age":
//         if (!value) {
//           errors[errorKey] = "Age is required";
//         } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
//           errors[errorKey] = "Please enter a valid age (1-120)";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "mobile":
//         // Pakistan mobile number validation - must start with 03 and be 11 digits total
//         const pakMobileRegex = /^03[0-9]{9}$/;
//         if (!value) {
//           errors[errorKey] = "Mobile number is required";
//         } else if (!pakMobileRegex.test(value)) {
//           errors[errorKey] =
//             "Please enter a valid Pakistan mobile number starting with 03 (11 digits)";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "email":
//         // Basic email format validation
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//         if (!value) {
//           errors[errorKey] = "Email is required";
//         } else if (!emailRegex.test(value)) {
//           errors[errorKey] =
//             "Please enter a valid email address (e.g., name@domain.com)";
//         } else {
//           // Extract domain from email
//           const [localPart, domain] = value.split("@");

//           // Convert domain to lowercase for comparison
//           const domainLower = domain.toLowerCase();

//           // Check if domain is in allowed list
//           if (!allowedDomains.includes(domainLower)) {
//             errors[errorKey] = "Please enter a valid domain name";
//           } else {
//             delete errors[errorKey];
//           }
//         }
//         break;

//       case "address":
//         if (!value.trim()) {
//           errors[errorKey] = "Address is required";
//         } else if (value.trim().length < 10) {
//           errors[errorKey] = "Please enter a complete address";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "appointmentDate":
//         if (!value) {
//           errors[errorKey] = "Please select an appointment date";
//         } else {
//           const selectedDate = new Date(value);
//           const today = new Date();
//           today.setHours(0, 0, 0, 0);

//           if (selectedDate < today) {
//             errors[errorKey] = "Date cannot be in the past";
//           } else {
//             delete errors[errorKey];
//           }
//         }
//         break;
//     }

//     setFormErrors(errors);
//     return !errors[errorKey];
//   };

//   const validateForm = () => {
//     // List of allowed email domains
//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "live.com",
//       "icloud.com",
//       "aol.com",
//       "protonmail.com",
//       "zoho.com",
//     ];

//     // Validate all patients' details
//     for (let i = 0; i < patients.length; i++) {
//       const patient = patients[i];
//       const details =
//         i === currentPatientIndex ? patientDetails : patient.details;

//       if (!details.name?.trim()) {
//         setError(`Please fill in name for Patient ${i + 1}`);
//         return false;
//       }
//       if (!details.age) {
//         setError(`Please fill in age for Patient ${i + 1}`);
//         return false;
//       }
//       if (!details.gender) {
//         setError(`Please select gender for Patient ${i + 1}`);
//         return false;
//       }

//       // Mobile validation for Pakistan format
//       const pakMobileRegex = /^03[0-9]{9}$/;
//       if (!details.mobile || !pakMobileRegex.test(details.mobile)) {
//         setError(
//           `Please enter a valid Pakistan mobile number (03XXXXXXXXX) for Patient ${i + 1}`,
//         );
//         return false;
//       }

//       // Enhanced email validation with allowed domains
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!details.email || !emailRegex.test(details.email)) {
//         setError(`Please enter a valid email address for Patient ${i + 1}`);
//         return false;
//       }

//       // Check if domain is allowed
//       const domain = details.email.split("@")[1].toLowerCase();
//       if (!allowedDomains.includes(domain)) {
//         setError(
//           `Email domain for Patient ${i + 1} must be one of: ${allowedDomains.join(", ")}`,
//         );
//         return false;
//       }

//       if (!details.address?.trim()) {
//         setError(`Please fill in address for Patient ${i + 1}`);
//         return false;
//       }
//       if (!details.appointmentDate) {
//         setError(`Please select appointment date for Patient ${i + 1}`);
//         return false;
//       }
//     }

//     if (!termsAccepted) {
//       setError("Please accept the terms and conditions");
//       return false;
//     }

//     return true;
//   };

//   // Add this helper function to check allowed domains
//   const isEmailDomainAllowed = (email) => {
//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "live.com",
//       "icloud.com",
//       "aol.com",
//       "protonmail.com",
//       "zoho.com",
//     ];

//     if (!email || !email.includes("@")) return false;

//     const domain = email.split("@")[1].toLowerCase();
//     return allowedDomains.includes(domain);
//   };

//   // Add a helper function to format mobile number as user types
//   const formatMobileNumber = (value) => {
//     // Remove any non-digit characters
//     const digits = value.replace(/\D/g, "");

//     // Ensure it starts with 03
//     if (digits.length === 0) return "";
//     if (digits.length === 1) return "0";
//     if (digits.length === 2) return digits;

//     // Limit to 11 digits
//     const limitedDigits = digits.slice(0, 11);

//     return limitedDigits;
//   };

//   // Update handleInputChange to include mobile formatting
//   const handleInputChange = (field, value) => {
//     let formattedValue = value;

//     // Format mobile number as user types
//     if (field === "mobile") {
//       formattedValue = formatMobileNumber(value);

//       // Auto-add leading 03 if user starts typing
//       if (formattedValue.length === 1 && value !== "0") {
//         formattedValue = "0" + formattedValue;
//       }
//     }

//     setPatientDetails((prev) => ({
//       ...prev,
//       [field]: formattedValue,
//     }));

//     const errorKey = `${currentPatientIndex}_${field}`;
//     if (formErrors[errorKey]) {
//       validateField(field, formattedValue);
//     }
//   };

 
// // 
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (isSubmitting.current) return;

//   //   if (!patients.length) {
//   //     setError("Please add at least one patient");
//   //     return;
//   //   }

//   //   // Save current patient's details
//   //   const updatedPatients = [...patients];
//   //   updatedPatients[currentPatientIndex].details = { ...patientDetails };
//   //   setPatients(updatedPatients);

//   //   if (!validateForm()) {
//   //     window.scrollTo({ top: 0, behavior: "smooth" });
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   setError(null);
//   //   isSubmitting.current = true;

//   //   try {
//   //     // Prepare booking data according to backend structure
//   //     const bookingData = {
//   //       labId,
//   //       patients: updatedPatients.map((patient) => ({
//   //         testIds: patient.selectedTests,
//   //         patientDetails: {
//   //           name: patient.details.name.trim(),
//   //           age: Number(patient.details.age),
//   //           gender: patient.details.gender,
//   //           mobile: patient.details.mobile,
//   //           email: patient.details.email.trim(),
//   //           address: patient.details.address.trim(),
//   //           appointmentDate: new Date(
//   //             patient.details.appointmentDate,
//   //           ).toISOString(),
//   //         },
//   //       })),
//   //     };

//   //     console.log(
//   //       "Sending booking data:",
//   //       JSON.stringify(bookingData, null, 2),
//   //     );

//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/bookings/multiple",
//   //       bookingData,
//   //       {
//   //         timeout: 10000,
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       },
//   //     );

//   //     console.log("Booking response:", response.data);

//   //     // ✅ ADD THIS: Set flag before showing success page
//   //     // This will trigger a refresh when returning to lab detail page
//   //     sessionStorage.setItem("bookingConfirmed", "true");

//   //     setBookingSuccess(true);
//   //     setBookingDetails(response.data.booking);
//   //   } catch (error) {
//   //     console.error("Booking error details:", error);

//   //     let errorMessage = "Booking failed. Please try again.";

//   //     if (error.response) {
//   //       console.log("Error response data:", error.response.data);
//   //       errorMessage =
//   //         error.response.data?.error ||
//   //         error.response.data?.message ||
//   //         errorMessage;
//   //       if (error.response.data?.details) {
//   //         if (typeof error.response.data.details === "object") {
//   //           errorMessage += `: ${JSON.stringify(error.response.data.details)}`;
//   //         } else {
//   //           errorMessage += `: ${error.response.data.details}`;
//   //         }
//   //       }
//   //     } else if (error.request) {
//   //       errorMessage = "No response from server. Please check your connection.";
//   //     } else {
//   //       errorMessage = error.message;
//   //     }

//   //     setError(errorMessage);
//   //     window.scrollTo({ top: 0, behavior: "smooth" });
//   //   } finally {
//   //     setLoading(false);
//   //     isSubmitting.current = false;
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (isSubmitting.current) return;

//   if (!patients.length) {
//     setError("Please add at least one patient");
//     return;
//   }

//   // Save current patient's details
//   const updatedPatients = [...patients];
//   updatedPatients[currentPatientIndex].details = { ...patientDetails };
//   setPatients(updatedPatients);

//   if (!validateForm()) {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     return;
//   }

//   setLoading(true);
//   setError(null);
//   isSubmitting.current = true;

//   try {
//     // Prepare booking data according to backend structure
//     const bookingData = {
//       labId,
//       patients: updatedPatients.map((patient) => ({
//         testIds: patient.selectedTests,
//         patientDetails: {
//           name: patient.details.name.trim(),
//           age: Number(patient.details.age),
//           gender: patient.details.gender,
//           mobile: patient.details.mobile,
//           email: patient.details.email.trim(),
//           address: patient.details.address.trim(),
//           appointmentDate: new Date(
//             patient.details.appointmentDate,
//           ).toISOString(),
//         },
//       })),
//     };

//     console.log(
//       "Sending booking data:",
//       JSON.stringify(bookingData, null, 2),
//     );

//     const response = await axios.post(
//       "http://localhost:5000/api/bookings/multiple",
//       bookingData,
//       {
//         timeout: 10000,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     console.log("Booking response:", response.data);

//     // Set flag for lab detail page refresh
//     sessionStorage.setItem("bookingConfirmed", "true");

//     // ✅ YAHAN CHANGE KARO: Set booking details and show popup
//     setBookingDetails(response.data.booking);
//     setShowSuccessPopup(true);
    
//   } catch (error) {
//     console.error("Booking error details:", error);

//     let errorMessage = "Booking failed. Please try again.";

//     if (error.response) {
//       console.log("Error response data:", error.response.data);
//       errorMessage =
//         error.response.data?.error ||
//         error.response.data?.message ||
//         errorMessage;
//       if (error.response.data?.details) {
//         if (typeof error.response.data.details === "object") {
//           errorMessage += `: ${JSON.stringify(error.response.data.details)}`;
//         } else {
//           errorMessage += `: ${error.response.data.details}`;
//         }
//       }
//     } else if (error.request) {
//       errorMessage = "No response from server. Please check your connection.";
//     } else {
//       errorMessage = error.message;
//     }

//     setError(errorMessage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   } finally {
//     setLoading(false);
//     isSubmitting.current = false;
//   }
// };
//   const total = calculateTotal();


//   // In BookingPage.js - Update the booking success section

//   // if (bookingSuccess && bookingDetails) {
//   //   const handleBackToHome = () => {
//   //     // Navigate to home with a state that indicates booking was completed
//   //     navigate("/", { state: { bookingCompleted: true } });
//   //   };

//   //   const handleBackToLab = () => {
//   //     // Navigate back to lab detail - it will refresh due to sessionStorage flag
//   //     navigate(`/labs/${labId}`);
//   //   };

//   //   return (
//   //     <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
//   //       <div className="bg-gradient-to-br from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f] rounded-3xl p-8 text-center shadow-xl">
//   //         <div className="flex justify-center mb-6">
//   //           <div className="bg-[#2c6774] p-4 rounded-full">
//   //             <FaCheckCircle className="text-6xl text-white" />
//   //           </div>
//   //         </div>

//   //         <h1 className="text-3xl font-bold text-[#174047] mb-3">
//   //           Booking Confirmed!
//   //         </h1>
//   //         <p className="text-[#5c878f] text-lg mb-8">
//   //           Your appointments have been scheduled successfully for{" "}
//   //           {patients.length} {patients.length === 1 ? "patient" : "patients"}
//   //         </p>

//   //         <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-[#c0d3dc]">
//   //           <div className="grid md:grid-cols-2 gap-6 mb-6">
//   //             <div className="space-y-4">
//   //               <div>
//   //                 <p className="text-[#5c878f] text-sm">Booking Reference</p>
//   //                 <p className="font-bold text-xl text-[#2c6774] tracking-wide">
//   //                   {bookingDetails.bookingReference}
//   //                 </p>
//   //               </div>

//   //               <div>
//   //                 <p className="text-[#5c878f] text-sm">Number of Patients</p>
//   //                 <p className="font-semibold text-lg text-[#174047]">
//   //                   {patients.length}
//   //                 </p>
//   //               </div>
//   //             </div>
//   //           </div>

//   //           <div className="border-t border-[#c0d3dc] pt-6">
//   //             <div className="flex justify-between items-center">
//   //               <span className="text-[#5c878f]">Total Amount</span>
//   //               <div className="text-right">
//   //                 <p className="text-2xl font-bold text-[#2c6774]">
//   //                   Rs {total.final}
//   //                 </p>
//   //                 <p className="text-sm text-[#5c878f]">
//   //                   <s>Rs {total.original}</s> • Saved Rs{" "}
//   //                   {total.original - total.final}
//   //                 </p>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>

//   //         <div className="bg-[#9fbfc5]/30 rounded-xl p-4 mb-8 border border-[#5c878f]/30">
//   //           <p className="text-sm text-[#174047]">
//   //             <span className="font-semibold">Next Steps:</span> You will
//   //             receive a confirmation call from the lab within 30 minutes. Please
//   //             keep your booking reference handy for any queries.
//   //           </p>
//   //         </div>

//   //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//   //           <button
//   //             onClick={() => window.print()}
//   //             className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl font-semibold hover:bg-[#9fbfc5]/20 transition flex items-center justify-center gap-2"
//   //           >
//   //             Print Receipt
//   //           </button>
//   //           <button
//   //             onClick={handleBackToLab}
//   //             className="px-6 py-3 bg-[#2c6774] text-white rounded-xl font-semibold hover:bg-[#1e4e56] transition flex items-center justify-center gap-2"
//   //           >
//   //             Book More Tests
//   //           </button>
//   //           <button
//   //             onClick={handleBackToHome}
//   //             className="px-6 py-3 bg-[#174047] text-white rounded-xl font-semibold hover:bg-[#0f2e33] transition flex items-center justify-center gap-2"
//   //           >
//   //             Back to Home
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // Success Popup Component

//   if (bookingSuccess && bookingDetails) {
//   const handleBackToHome = () => {
//     navigate("/", { state: { bookingCompleted: true } });
//   };
//   const handleBackToLab = () => {
//     navigate(`/labs/${labId}`);
//   };
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
//         {/* <div className="max-w-7xl mx-auto px-4 py-8"> */}
//       {/* Error Alert */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
//           <div className="flex items-start gap-3">
//             <FaExclamationTriangle className="text-red-500 mt-0.5" />
//             <div className="flex-1">
//               <p className="font-medium text-red-700">{error}</p>
//               <button
//                 onClick={() => setError(null)}
//                 className="text-sm text-red-600 hover:text-red-800 mt-1"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
//         <div>
//           <button
//             onClick={() => navigate(`/labs/${labId}`)}
//             className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
//           >
//             <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Lab
//           </button>
//           <h1 className="text-3xl font-bold text-[#174047]">
//             Complete Your Booking
//           </h1>
//           <p className="text-[#5c878f] mt-2">
//             Fill in details for all patients
//           </p>
//         </div>

//         {lab && (
//           <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
//             <img
//               src={`http://localhost:5000/uploads/${lab.logo}`}
//               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
//               alt={lab.name}
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/48?text=Lab";
//               }}
//             />
//             <div>
//               <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
//               <p className="text-sm text-[#5c878f]">{lab.branches}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Patient Selector */}
//       <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc]">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
//           <button
//             onClick={addNewPatient}
//             className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition"
//           >
//             <FaUserPlus />
//             Add Another Person
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           {patients.map((patient, index) => (
//             <div
//               key={patient.id}
//               className={`flex items-center gap-2 p-2 rounded-lg border transition ${
//                 currentPatientIndex === index
//                   ? "border-[#2c6774] bg-[#2c6774]/10"
//                   : "border-gray-200 hover:border-[#5c878f]"
//               }`}
//             >
//               <button
//                 onClick={() => switchPatient(index)}
//                 className="flex items-center gap-2 px-3 py-1"
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     currentPatientIndex === index
//                       ? "bg-[#2c6774] text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {patient.patientIndex}
//                 </div>
//                 <span className="font-medium">
//                   {patient.details.name || `Patient ${patient.patientIndex}`}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   ({patient.selectedTests.length} tests)
//                 </span>
//               </button>

//               <button
//                 onClick={() => editPatientTests(index)}
//                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                 title="Edit tests"
//               >
//                 <FaEdit />
//               </button>

//               {patients.length > 1 && (
//                 <button
//                   onClick={() => removePatient(index)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                   title="Remove patient"
//                 >
//                   <FaTrash />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Left Column: Booking Form */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Patient Details Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
//                 <FaUser className="text-white text-lg" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-[#174047]">
//                   Patient {currentPatientIndex + 1} Information
//                 </h2>
//                 <p className="text-sm text-[#5c878f]">
//                   Fill in personal details and appointment date
//                 </p>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={patientDetails.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   onBlur={() => validateField("name", patientDetails.name)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                     formErrors[`${currentPatientIndex}_name`]
//                       ? "border-red-500 ring-red-200"
//                       : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                   }`}
//                   placeholder="Enter patient's full name"
//                 />
//                 {formErrors[`${currentPatientIndex}_name`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_name`]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Age *
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="120"
//                   value={patientDetails.age}
//                   onChange={(e) => handleInputChange("age", e.target.value)}
//                   onBlur={() => validateField("age", patientDetails.age)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                     formErrors[`${currentPatientIndex}_age`]
//                       ? "border-red-500 ring-red-200"
//                       : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                   }`}
//                   placeholder="Age in years"
//                 />
//                 {formErrors[`${currentPatientIndex}_age`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_age`]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Gender *
//                 </label>
//                 <select
//                   value={patientDetails.gender}
//                   onChange={(e) => handleInputChange("gender", e.target.value)}
//                   className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Mobile Number *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaPhone className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="tel"
//                     value={patientDetails.mobile}
//                     onChange={(e) =>
//                       handleInputChange("mobile", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField("mobile", patientDetails.mobile)
//                     }
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_mobile`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="03123456789"
//                     maxLength="11"
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_mobile`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_mobile`]}
//                   </p>
//                 )}
//                 {!formErrors[`${currentPatientIndex}_mobile`] &&
//                   patientDetails.mobile &&
//                   patientDetails.mobile.length === 11 && (
//                     <p className="mt-1 text-sm text-green-600"></p>
//                   )}
//               </div>

//               {/* Email Field with Allowed Domains */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaEnvelope className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="email"
//                     value={patientDetails.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     onBlur={() => validateField("email", patientDetails.email)}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_email`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="patient@gmail.com"
//                   />
//                 </div>

              
//                 {/* Show domain validation status */}
//                 {patientDetails.email && patientDetails.email.includes("@") && (
//                   <div className="mt-1">
//                     {isEmailDomainAllowed(patientDetails.email) ? (
//                       <p className="text-sm text-green-600 flex items-center gap-1">
//                         {/* <FaCheckCircle className="text-xs" />
//           ✓ Valid domain: {patientDetails.email.split('@')[1]} */}
//                       </p>
//                     ) : (
//                       <p className="text-sm text-red-600 flex items-center gap-1">
//                         <FaExclamationTriangle className="text-xs" />
//                         Please enter a valid domain name.
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {formErrors[`${currentPatientIndex}_email`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_email`]}
//                   </p>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-[#174047]">
//                     Complete Address *
//                   </label>
//                   {currentPatientIndex > 0 && (
//                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={sameAddressAsPrevious}
//                         onChange={(e) =>
//                           setSameAddressAsPrevious(e.target.checked)
//                         }
//                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <span>Same as previous patient's address</span>
//                     </label>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <div className="absolute top-3 left-3">
//                     <FaMapMarkerAlt className="text-[#5c878f]" />
//                   </div>
//                   <textarea
//                     value={patientDetails.address}
//                     onChange={(e) =>
//                       handleInputChange("address", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField("address", patientDetails.address)
//                     }
//                     rows="3"
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_address`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="House no., Street, Landmark, City, State - Pincode"
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_address`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_address`]}
//                   </p>
//                 )}
//               </div>

//               {/* Appointment Date Field */}
//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-[#174047]">
//                     Appointment Date *
//                   </label>
//                   {currentPatientIndex > 0 && (
//                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={sameDateAsPrevious}
//                         onChange={(e) =>
//                           setSameDateAsPrevious(e.target.checked)
//                         }
//                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <span>Same as previous patient's date</span>
//                     </label>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaCalendarAlt className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="date"
//                     value={patientDetails.appointmentDate}
//                     onChange={(e) =>
//                       handleInputChange("appointmentDate", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField(
//                         "appointmentDate",
//                         patientDetails.appointmentDate,
//                       )
//                     }
//                     min={new Date().toISOString().split("T")[0]}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_appointmentDate`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_appointmentDate`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_appointmentDate`]}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Terms & Conditions */}
//           <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
//             <div className="flex items-start gap-3">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                 className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//               />
//               <label
//                 htmlFor="terms"
//                 className="text-sm text-[#174047] leading-relaxed"
//               >
//                 <span className="font-semibold">Terms & Conditions:</span> I
//                 agree that the information provided is accurate. I understand
//                 that the lab technician will contact me to confirm the
//                 appointment. Any cancellation should be done at least 6 hours
//                 before the scheduled time. I agree to pay the amount at the time
//                 of sample collection.
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-8 space-y-6">
//             {/* Order Summary Card */}
//             <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                 <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
//                 <p className="text-[#c0d3dc]">Review all patients</p>
//               </div>

//               {/* Lab Info */}
//               {lab && (
//                 <div className="p-6 border-b border-[#c0d3dc]">
//                   <div className="flex items-center gap-3 mb-4">
//                     <img
//                       src={`http://localhost:5000/uploads/${lab.logo}`}
//                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
//                       alt={lab.name}
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/56?text=Lab";
//                       }}
//                     />
//                     <div>
//                       <h3 className="font-bold text-[#174047]">{lab.name}</h3>
//                       <p className="text-sm text-[#5c878f]">
//                         {patients.length}{" "}
//                         {patients.length === 1 ? "patient" : "patients"} •{" "}
//                         {tests.length} total tests
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Patients Summary */}
//               <div className="p-6 border-b border-[#c0d3dc] max-h-96 overflow-y-auto">
//                 <h3 className="font-bold text-lg text-[#174047] mb-4">
//                   Patients & Tests
//                 </h3>
//                 <div className="space-y-6">
//                   {patients.map((patient, index) => (
//                     <div
//                       key={patient.id}
//                       className="border-b border-[#c0d3dc] last:border-0 pb-4 last:pb-0"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
//                             {index + 1}
//                           </div>
//                           <span className="font-semibold text-[#174047]">
//                             {patient.details.name || `Patient ${index + 1}`}
//                           </span>
//                         </div>
//                         <span className="text-sm text-[#5c878f]">
//                           {patient.selectedTests.length} tests
//                         </span>
//                       </div>

//                       <div className="ml-8 space-y-2">
//                         {patient.selectedTests.map((testId) => {
//                           const test = tests.find((t) => t._id === testId);
//                           if (!test) return null;

//                           const discountedPrice = Math.round(
//                             test.price -
//                               (test.price * (lab?.discount || 0)) / 100,
//                           );

//                           return (
//                             <div
//                               key={testId}
//                               className="flex justify-between items-center text-sm"
//                             >
//                               <span className="text-[#5c878f]">
//                                 {test.name}
//                               </span>
//                               <span className="font-medium text-[#2c6774]">
//                                 Rs {discountedPrice}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>

//                       {/* Show appointment date */}
//                       {patient.details.appointmentDate && (
//                         <div className="mt-2 ml-8 text-xs text-[#5c878f] flex items-center gap-1">
//                           <FaCalendarAlt className="text-[#2c6774]" />
//                           Date:{" "}
//                           {new Date(
//                             patient.details.appointmentDate,
//                           ).toLocaleDateString()}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Breakdown */}
//               <div className="p-6 border-b border-[#c0d3dc]">
//                 <h3 className="font-bold text-lg text-[#174047] mb-4">
//                   Price Details
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-[#5c878f]">Total Tests Price</span>
//                     <span className="font-medium text-[#174047]">
//                       Rs {total.original}
//                     </span>
//                   </div>

//                   {lab?.discount > 0 && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-[#5c878f]">Discount</span>
//                       <span className="flex items-center gap-2">
//                         <FaTag className="text-[#2c6774]" />
//                         <span className="font-semibold text-[#2c6774]">
//                           -{lab.discount}% (Rs {total.original - total.final})
//                         </span>
//                       </span>
//                     </div>
//                   )}

//                   <div className="pt-3 border-t border-[#c0d3dc]">
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-lg text-[#174047]">
//                         Total Amount
//                       </span>
//                       <div className="text-right">
//                         <div className="text-2xl font-bold text-[#2c6774]">
//                           Rs {total.final}
//                         </div>
//                         {lab?.discount > 0 && (
//                           <div className="text-sm text-[#5c878f] line-through">
//                             Rs {total.original}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {lab?.discount > 0 && (
//                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
//                     <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
//                       You save Rs {total.original - total.final} with{" "}
//                       {lab.discount}% discount!
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Booking Button */}
//               <div className="p-6">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading || !patients.length}
//                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
//                     loading ? "cursor-wait" : ""
//                   }`}
//                   style={{
//                     background: "linear-gradient(to right, #2c6774, #1e4e56)",
//                     boxShadow: "0 4px 14px 0 rgba(44, 103, 116, 0.39)",
//                   }}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
//                       Processing Booking...
//                     </span>
//                   ) : (
//                     `Confirm Booking for ${patients.length} ${patients.length === 1 ? "Patient" : "Patients"}`
//                   )}
//                 </button>

//                 <div className="mt-4 text-center space-y-2">
//                   <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
//                     <FaShieldAlt />
//                     <span>Secure & Safe Booking</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Help Box */}
//             <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
//               <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
//                 <FaHeadset className="text-[#2c6774]" />
//                 Need Help?
//               </h4>
//               <div className="space-y-2">
//                 <p className="text-sm text-[#174047]">
//                   Call us:{" "}
//                   <span className="font-semibold text-[#2c6774]">
//                     1800-123-4567
//                   </span>
//                 </p>
//                 <p className="text-sm text-[#174047]">
//                   Email:{" "}
//                   <span className="font-semibold text-[#2c6774]">
//                     support@quickcure.com
//                   </span>
//                 </p>
//                 <p className="text-xs text-[#5c878f] mt-3">
//                   Our support team is available 24/7 to assist you
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ... poora success page content ... */}
//     </div>
//   );
// }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Error Alert */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
//           <div className="flex items-start gap-3">
//             <FaExclamationTriangle className="text-red-500 mt-0.5" />
//             <div className="flex-1">
//               <p className="font-medium text-red-700">{error}</p>
//               <button
//                 onClick={() => setError(null)}
//                 className="text-sm text-red-600 hover:text-red-800 mt-1"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
//         <div>
//           <button
//             onClick={() => navigate(`/labs/${labId}`)}
//             className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
//           >
//             <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Lab
//           </button>
//           <h1 className="text-3xl font-bold text-[#174047]">
//             Complete Your Booking
//           </h1>
//           <p className="text-[#5c878f] mt-2">
//             Fill in details for all patients
//           </p>
//         </div>

//         {lab && (
//           <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
//             <img
//               src={`http://localhost:5000/uploads/${lab.logo}`}
//               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
//               alt={lab.name}
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/48?text=Lab";
//               }}
//             />
//             <div>
//               <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
//               <p className="text-sm text-[#5c878f]">{lab.branches}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Patient Selector */}
//       <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc]">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
//           <button
//             onClick={addNewPatient}
//             className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition"
//           >
//             <FaUserPlus />
//             Add Another Person
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           {patients.map((patient, index) => (
//             <div
//               key={patient.id}
//               className={`flex items-center gap-2 p-2 rounded-lg border transition ${
//                 currentPatientIndex === index
//                   ? "border-[#2c6774] bg-[#2c6774]/10"
//                   : "border-gray-200 hover:border-[#5c878f]"
//               }`}
//             >
//               <button
//                 onClick={() => switchPatient(index)}
//                 className="flex items-center gap-2 px-3 py-1"
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     currentPatientIndex === index
//                       ? "bg-[#2c6774] text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {patient.patientIndex}
//                 </div>
//                 <span className="font-medium">
//                   {patient.details.name || `Patient ${patient.patientIndex}`}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   ({patient.selectedTests.length} tests)
//                 </span>
//               </button>

//               <button
//                 onClick={() => editPatientTests(index)}
//                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                 title="Edit tests"
//               >
//                 <FaEdit />
//               </button>

//               {patients.length > 1 && (
//                 <button
//                   onClick={() => removePatient(index)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                   title="Remove patient"
//                 >
//                   <FaTrash />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Left Column: Booking Form */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Patient Details Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
//                 <FaUser className="text-white text-lg" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-[#174047]">
//                   Patient {currentPatientIndex + 1} Information
//                 </h2>
//                 <p className="text-sm text-[#5c878f]">
//                   Fill in personal details and appointment date
//                 </p>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={patientDetails.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   onBlur={() => validateField("name", patientDetails.name)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                     formErrors[`${currentPatientIndex}_name`]
//                       ? "border-red-500 ring-red-200"
//                       : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                   }`}
//                   placeholder="Enter patient's full name"
//                 />
//                 {formErrors[`${currentPatientIndex}_name`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_name`]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Age *
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="120"
//                   value={patientDetails.age}
//                   onChange={(e) => handleInputChange("age", e.target.value)}
//                   onBlur={() => validateField("age", patientDetails.age)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                     formErrors[`${currentPatientIndex}_age`]
//                       ? "border-red-500 ring-red-200"
//                       : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                   }`}
//                   placeholder="Age in years"
//                 />
//                 {formErrors[`${currentPatientIndex}_age`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_age`]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Gender *
//                 </label>
//                 <select
//                   value={patientDetails.gender}
//                   onChange={(e) => handleInputChange("gender", e.target.value)}
//                   className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Mobile Number *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaPhone className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="tel"
//                     value={patientDetails.mobile}
//                     onChange={(e) =>
//                       handleInputChange("mobile", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField("mobile", patientDetails.mobile)
//                     }
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_mobile`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="03123456789"
//                     maxLength="11"
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_mobile`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_mobile`]}
//                   </p>
//                 )}
//                 {!formErrors[`${currentPatientIndex}_mobile`] &&
//                   patientDetails.mobile &&
//                   patientDetails.mobile.length === 11 && (
//                     <p className="mt-1 text-sm text-green-600"></p>
//                   )}
//               </div>

//               {/* Email Field with Allowed Domains */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaEnvelope className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="email"
//                     value={patientDetails.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     onBlur={() => validateField("email", patientDetails.email)}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_email`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="patient@gmail.com"
//                   />
//                 </div>

              
//                 {/* Show domain validation status */}
//                 {patientDetails.email && patientDetails.email.includes("@") && (
//                   <div className="mt-1">
//                     {isEmailDomainAllowed(patientDetails.email) ? (
//                       <p className="text-sm text-green-600 flex items-center gap-1">
//                         {/* <FaCheckCircle className="text-xs" />
//           ✓ Valid domain: {patientDetails.email.split('@')[1]} */}
//                       </p>
//                     ) : (
//                       <p className="text-sm text-red-600 flex items-center gap-1">
//                         <FaExclamationTriangle className="text-xs" />
//                         Please enter a valid domain name.
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {formErrors[`${currentPatientIndex}_email`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_email`]}
//                   </p>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-[#174047]">
//                     Complete Address *
//                   </label>
//                   {currentPatientIndex > 0 && (
//                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={sameAddressAsPrevious}
//                         onChange={(e) =>
//                           setSameAddressAsPrevious(e.target.checked)
//                         }
//                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <span>Same as previous patient's address</span>
//                     </label>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <div className="absolute top-3 left-3">
//                     <FaMapMarkerAlt className="text-[#5c878f]" />
//                   </div>
//                   <textarea
//                     value={patientDetails.address}
//                     onChange={(e) =>
//                       handleInputChange("address", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField("address", patientDetails.address)
//                     }
//                     rows="3"
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_address`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="House no., Street, Landmark, City, State - Pincode"
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_address`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_address`]}
//                   </p>
//                 )}
//               </div>

//               {/* Appointment Date Field */}
//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-[#174047]">
//                     Appointment Date *
//                   </label>
//                   {currentPatientIndex > 0 && (
//                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={sameDateAsPrevious}
//                         onChange={(e) =>
//                           setSameDateAsPrevious(e.target.checked)
//                         }
//                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <span>Same as previous patient's date</span>
//                     </label>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaCalendarAlt className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="date"
//                     value={patientDetails.appointmentDate}
//                     onChange={(e) =>
//                       handleInputChange("appointmentDate", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField(
//                         "appointmentDate",
//                         patientDetails.appointmentDate,
//                       )
//                     }
//                     min={new Date().toISOString().split("T")[0]}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_appointmentDate`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_appointmentDate`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_appointmentDate`]}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Terms & Conditions */}
//           <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
//             <div className="flex items-start gap-3">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                 className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//               />
//               <label
//                 htmlFor="terms"
//                 className="text-sm text-[#174047] leading-relaxed"
//               >
//                 <span className="font-semibold">Terms & Conditions:</span> I
//                 agree that the information provided is accurate. I understand
//                 that the lab technician will contact me to confirm the
//                 appointment. Any cancellation should be done at least 6 hours
//                 before the scheduled time. I agree to pay the amount at the time
//                 of sample collection.
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-8 space-y-6">
//             {/* Order Summary Card */}
//             <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                 <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
//                 <p className="text-[#c0d3dc]">Review all patients</p>
//               </div>

//               {/* Lab Info */}
//               {lab && (
//                 <div className="p-6 border-b border-[#c0d3dc]">
//                   <div className="flex items-center gap-3 mb-4">
//                     <img
//                       src={`http://localhost:5000/uploads/${lab.logo}`}
//                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
//                       alt={lab.name}
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/56?text=Lab";
//                       }}
//                     />
//                     <div>
//                       <h3 className="font-bold text-[#174047]">{lab.name}</h3>
//                       <p className="text-sm text-[#5c878f]">
//                         {patients.length}{" "}
//                         {patients.length === 1 ? "patient" : "patients"} •{" "}
//                         {tests.length} total tests
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Patients Summary */}
//               <div className="p-6 border-b border-[#c0d3dc] max-h-96 overflow-y-auto">
//                 <h3 className="font-bold text-lg text-[#174047] mb-4">
//                   Patients & Tests
//                 </h3>
//                 <div className="space-y-6">
//                   {patients.map((patient, index) => (
//                     <div
//                       key={patient.id}
//                       className="border-b border-[#c0d3dc] last:border-0 pb-4 last:pb-0"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
//                             {index + 1}
//                           </div>
//                           <span className="font-semibold text-[#174047]">
//                             {patient.details.name || `Patient ${index + 1}`}
//                           </span>
//                         </div>
//                         <span className="text-sm text-[#5c878f]">
//                           {patient.selectedTests.length} tests
//                         </span>
//                       </div>

//                       <div className="ml-8 space-y-2">
//                         {patient.selectedTests.map((testId) => {
//                           const test = tests.find((t) => t._id === testId);
//                           if (!test) return null;

//                           const discountedPrice = Math.round(
//                             test.price -
//                               (test.price * (lab?.discount || 0)) / 100,
//                           );

//                           return (
//                             <div
//                               key={testId}
//                               className="flex justify-between items-center text-sm"
//                             >
//                               <span className="text-[#5c878f]">
//                                 {test.name}
//                               </span>
//                               <span className="font-medium text-[#2c6774]">
//                                 Rs {discountedPrice}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>

//                       {/* Show appointment date */}
//                       {patient.details.appointmentDate && (
//                         <div className="mt-2 ml-8 text-xs text-[#5c878f] flex items-center gap-1">
//                           <FaCalendarAlt className="text-[#2c6774]" />
//                           Date:{" "}
//                           {new Date(
//                             patient.details.appointmentDate,
//                           ).toLocaleDateString()}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Breakdown */}
//               <div className="p-6 border-b border-[#c0d3dc]">
//                 <h3 className="font-bold text-lg text-[#174047] mb-4">
//                   Price Details
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-[#5c878f]">Total Tests Price</span>
//                     <span className="font-medium text-[#174047]">
//                       Rs {total.original}
//                     </span>
//                   </div>

//                   {lab?.discount > 0 && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-[#5c878f]">Discount</span>
//                       <span className="flex items-center gap-2">
//                         <FaTag className="text-[#2c6774]" />
//                         <span className="font-semibold text-[#2c6774]">
//                           -{lab.discount}% (Rs {total.original - total.final})
//                         </span>
//                       </span>
//                     </div>
//                   )}

//                   <div className="pt-3 border-t border-[#c0d3dc]">
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-lg text-[#174047]">
//                         Total Amount
//                       </span>
//                       <div className="text-right">
//                         <div className="text-2xl font-bold text-[#2c6774]">
//                           Rs {total.final}
//                         </div>
//                         {lab?.discount > 0 && (
//                           <div className="text-sm text-[#5c878f] line-through">
//                             Rs {total.original}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {lab?.discount > 0 && (
//                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
//                     <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
//                       You save Rs {total.original - total.final} with{" "}
//                       {lab.discount}% discount!
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Booking Button */}
//               <div className="p-6">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading || !patients.length}
//                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
//                     loading ? "cursor-wait" : ""
//                   }`}
//                   style={{
//                     background: "linear-gradient(to right, #2c6774, #1e4e56)",
//                     boxShadow: "0 4px 14px 0 rgba(44, 103, 116, 0.39)",
//                   }}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
//                       Processing Booking...
//                     </span>
//                   ) : (
//                     `Confirm Booking for ${patients.length} ${patients.length === 1 ? "Patient" : "Patients"}`
//                   )}
//                 </button>

//                 <div className="mt-4 text-center space-y-2">
//                   <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
//                     <FaShieldAlt />
//                     <span>Secure & Safe Booking</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Help Box */}
//             <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
//               <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
//                 <FaHeadset className="text-[#2c6774]" />
//                 Need Help?
//               </h4>
//               <div className="space-y-2">
//                 <p className="text-sm text-[#174047]">
//                   Call us:{" "}
//                   <span className="font-semibold text-[#2c6774]">
//                     1800-123-4567
//                   </span>
//                 </p>
//                 <p className="text-sm text-[#174047]">
//                   Email:{" "}
//                   <span className="font-semibold text-[#2c6774]">
//                     support@quickcure.com
//                   </span>
//                 </p>
//                 <p className="text-xs text-[#5c878f] mt-3">
//                   Our support team is available 24/7 to assist you
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// i want create a popup of booking confirmed not a receipt. with complete booking details
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaCalendarAlt,
//   FaHome,
//   FaHospital,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaTag,
//   FaArrowLeft,
//   FaShieldAlt,
//   FaHeadset,
//   FaUserPlus,
//   FaTrash,
//   FaEdit,
// } from "react-icons/fa";

// export default function BookingPage() {
//   const { id: labId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { patients: initialPatients } = location.state || {};

//   const isSubmitting = useRef(false);
//   const [error, setError] = useState(null);
//   const [formErrors, setFormErrors] = useState({});

//   const [lab, setLab] = useState(null);
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState(null);

//   // Multi-patient state
//   const [patients, setPatients] = useState([]);
//   const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

//   // Form state for current patient
//   const [patientDetails, setPatientDetails] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     mobile: "",
//     email: "",
//     address: "",
//     appointmentDate: "",
//   });

//   // "Same as Previous" checkboxes
//   const [sameAddressAsPrevious, setSameAddressAsPrevious] = useState(false);
//   const [sameDateAsPrevious, setSameDateAsPrevious] = useState(false);

//   const [termsAccepted, setTermsAccepted] = useState(false);

//   // Initialize patients from state
//   useEffect(() => {
//     if (initialPatients && initialPatients.length > 0) {
//       // Create patient forms for each patient with tests
//       const patientForms = initialPatients.map((patient, index) => ({
//         id: Date.now() + index,
//         patientIndex: index + 1,
//         selectedTests: patient.selectedTests,
//         details: {
//           name: "",
//           age: "",
//           gender: "",
//           mobile: "",
//           email: "",
//           address: "",
//           appointmentDate: "",
//         },
//       }));
//       setPatients(patientForms);

//       // Load tests for all selected tests
//       const allTestIds = initialPatients.flatMap((p) => p.selectedTests);
//       if (allTestIds.length > 0) {
//         fetchLabAndTests(allTestIds);
//       }
//     } else {
//       navigate(`/labs/${labId}`);
//     }
//   }, []);

//   const fetchLabAndTests = async (testIds) => {
//     try {
//       const [labRes, testsRes] = await Promise.all([
//         axios.get(`http://localhost:5000/api/labs/${labId}`),
//         axios.get(`http://localhost:5000/api/tests/lab/${labId}`),
//       ]);

//       setLab(labRes.data);
//       const allTests = testsRes.data || [];
//       const selectedTestDetails = allTests.filter((test) =>
//         testIds.includes(test._id),
//       );
//       setTests(selectedTestDetails);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load lab details. Please try again.");
//     }
//   };

//   // Handle "Same as Previous" checkboxes
//   useEffect(() => {
//     if (currentPatientIndex > 0) {
//       const previousPatient = patients[currentPatientIndex - 1];

//       if (sameAddressAsPrevious) {
//         setPatientDetails((prev) => ({
//           ...prev,
//           address: previousPatient.details.address,
//         }));
//       }

//       if (sameDateAsPrevious) {
//         setPatientDetails((prev) => ({
//           ...prev,
//           appointmentDate: previousPatient.details.appointmentDate,
//         }));
//       }
//     }
//   }, [
//     sameAddressAsPrevious,
//     sameDateAsPrevious,
//     currentPatientIndex,
//     patients,
//   ]);

//   // Switch between patients
//   const switchPatient = (index) => {
//     // Save current patient's details
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].details = { ...patientDetails };
//     setPatients(updatedPatients);

//     // Load new patient's details
//     setCurrentPatientIndex(index);
//     setPatientDetails(updatedPatients[index].details);

//     // Reset "Same as Previous" checkboxes
//     setSameAddressAsPrevious(false);
//     setSameDateAsPrevious(false);
//   };

//   // Add a new patient manually
//   const addNewPatient = () => {
//     const newPatient = {
//       id: Date.now(),
//       patientIndex: patients.length + 1,
//       selectedTests: [],
//       details: {
//         name: "",
//         age: "",
//         gender: "",
//         mobile: "",
//         email: "",
//         address: "",
//         appointmentDate: "",
//       },
//     };
//     setPatients([...patients, newPatient]);
//     setCurrentPatientIndex(patients.length);

//     // Clear form for new patient
//     setPatientDetails({
//       name: "",
//       age: "",
//       gender: "",
//       mobile: "",
//       email: "",
//       address: "",
//       appointmentDate: "",
//     });

//     // Reset "Same as Previous" checkboxes
//     setSameAddressAsPrevious(false);
//     setSameDateAsPrevious(false);
//   };

//   // Remove a patient
//   const removePatient = (index) => {
//     if (patients.length <= 1) {
//       setError(
//         "Cannot remove the last patient. At least one patient is required.",
//       );
//       return;
//     }

//     const updatedPatients = patients.filter((_, i) => i !== index);
//     setPatients(updatedPatients);

//     // Adjust current index if needed
//     if (currentPatientIndex >= updatedPatients.length) {
//       setCurrentPatientIndex(updatedPatients.length - 1);
//       setPatientDetails(updatedPatients[updatedPatients.length - 1].details);
//     } else if (currentPatientIndex === index) {
//       setCurrentPatientIndex(Math.max(0, index - 1));
//       setPatientDetails(updatedPatients[Math.max(0, index - 1)].details);
//     }

//     // Reset "Same as Previous" checkboxes
//     setSameAddressAsPrevious(false);
//     setSameDateAsPrevious(false);
//   };

//   // Edit tests for a patient (redirect to lab detail)
//   const editPatientTests = (patientIndex) => {
//     // Save current patient's details
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].details = { ...patientDetails };
//     setPatients(updatedPatients);

//     // Navigate back to lab detail with patient context
//     navigate(`/labs/${labId}`, {
//       state: {
//         editPatientIndex: patientIndex,
//         patients: updatedPatients,
//       },
//     });
//   };

//   const calculateTotal = () => {
//     if (!lab || !patients.length) return { original: 0, final: 0, discount: 0 };

//     // Calculate total for all patients
//     let original = 0;
//     patients.forEach((patient) => {
//       patient.selectedTests.forEach((testId) => {
//         const test = tests.find((t) => t._id === testId);
//         if (test) {
//           original += Number(test.price);
//         }
//       });
//     });

//     const discount = lab.discount || 0;
//     const final = Math.round(original - (original * discount) / 100);

//     return { original: Math.round(original), final, discount };
//   };

//   // Update the validateField function with strict domain validation
//   const validateField = (field, value) => {
//     const errors = { ...formErrors };
//     const errorKey = `${currentPatientIndex}_${field}`;

//     // List of allowed email domains
//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "live.com",
//       "icloud.com",
//       "aol.com",
//       "protonmail.com",
//       "zoho.com",
//     ];

//     switch (field) {
//       case "name":
//         if (!value.trim()) {
//           errors[errorKey] = "Name is required";
//         } else if (value.trim().length < 2) {
//           errors[errorKey] = "Name must be at least 2 characters";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "age":
//         if (!value) {
//           errors[errorKey] = "Age is required";
//         } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
//           errors[errorKey] = "Please enter a valid age (1-120)";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "mobile":
//         // Pakistan mobile number validation - must start with 03 and be 11 digits total
//         const pakMobileRegex = /^03[0-9]{9}$/;
//         if (!value) {
//           errors[errorKey] = "Mobile number is required";
//         } else if (!pakMobileRegex.test(value)) {
//           errors[errorKey] =
//             "Please enter a valid Pakistan mobile number starting with 03 (11 digits)";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "email":
//         // Basic email format validation
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//         if (!value) {
//           errors[errorKey] = "Email is required";
//         } else if (!emailRegex.test(value)) {
//           errors[errorKey] =
//             "Please enter a valid email address (e.g., name@domain.com)";
//         } else {
//           // Extract domain from email
//           const [localPart, domain] = value.split("@");

//           // Convert domain to lowercase for comparison
//           const domainLower = domain.toLowerCase();

//           // Check if domain is in allowed list
//           if (!allowedDomains.includes(domainLower)) {
//             errors[errorKey] = "Please enter a valid domain name";
//           } else {
//             delete errors[errorKey];
//           }
//         }
//         break;

//       case "address":
//         if (!value.trim()) {
//           errors[errorKey] = "Address is required";
//         } else if (value.trim().length < 10) {
//           errors[errorKey] = "Please enter a complete address";
//         } else {
//           delete errors[errorKey];
//         }
//         break;

//       case "appointmentDate":
//         if (!value) {
//           errors[errorKey] = "Please select an appointment date";
//         } else {
//           const selectedDate = new Date(value);
//           const today = new Date();
//           today.setHours(0, 0, 0, 0);

//           if (selectedDate < today) {
//             errors[errorKey] = "Date cannot be in the past";
//           } else {
//             delete errors[errorKey];
//           }
//         }
//         break;
//     }

//     setFormErrors(errors);
//     return !errors[errorKey];
//   };

//   const validateForm = () => {
//     // List of allowed email domains
//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "live.com",
//       "icloud.com",
//       "aol.com",
//       "protonmail.com",
//       "zoho.com",
//     ];

//     // Validate all patients' details
//     for (let i = 0; i < patients.length; i++) {
//       const patient = patients[i];
//       const details =
//         i === currentPatientIndex ? patientDetails : patient.details;

//       if (!details.name?.trim()) {
//         setError(`Please fill in name for Patient ${i + 1}`);
//         return false;
//       }
//       if (!details.age) {
//         setError(`Please fill in age for Patient ${i + 1}`);
//         return false;
//       }
//       if (!details.gender) {
//         setError(`Please select gender for Patient ${i + 1}`);
//         return false;
//       }

//       // Mobile validation for Pakistan format
//       const pakMobileRegex = /^03[0-9]{9}$/;
//       if (!details.mobile || !pakMobileRegex.test(details.mobile)) {
//         setError(
//           `Please enter a valid Pakistan mobile number (03XXXXXXXXX) for Patient ${i + 1}`,
//         );
//         return false;
//       }

//       // Enhanced email validation with allowed domains
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!details.email || !emailRegex.test(details.email)) {
//         setError(`Please enter a valid email address for Patient ${i + 1}`);
//         return false;
//       }

//       // Check if domain is allowed
//       const domain = details.email.split("@")[1].toLowerCase();
//       if (!allowedDomains.includes(domain)) {
//         setError(
//           `Email domain for Patient ${i + 1} must be one of: ${allowedDomains.join(", ")}`,
//         );
//         return false;
//       }

//       if (!details.address?.trim()) {
//         setError(`Please fill in address for Patient ${i + 1}`);
//         return false;
//       }
//       if (!details.appointmentDate) {
//         setError(`Please select appointment date for Patient ${i + 1}`);
//         return false;
//       }
//     }

//     if (!termsAccepted) {
//       setError("Please accept the terms and conditions");
//       return false;
//     }

//     return true;
//   };

//   // Add this helper function to check allowed domains
//   const isEmailDomainAllowed = (email) => {
//     const allowedDomains = [
//       "gmail.com",
//       "yahoo.com",
//       "outlook.com",
//       "hotmail.com",
//       "live.com",
//       "icloud.com",
//       "aol.com",
//       "protonmail.com",
//       "zoho.com",
//     ];

//     if (!email || !email.includes("@")) return false;

//     const domain = email.split("@")[1].toLowerCase();
//     return allowedDomains.includes(domain);
//   };

//   // Add a helper function to format mobile number as user types
//   const formatMobileNumber = (value) => {
//     // Remove any non-digit characters
//     const digits = value.replace(/\D/g, "");

//     // Ensure it starts with 03
//     if (digits.length === 0) return "";
//     if (digits.length === 1) return "0";
//     if (digits.length === 2) return digits;

//     // Limit to 11 digits
//     const limitedDigits = digits.slice(0, 11);

//     return limitedDigits;
//   };

//   // Update handleInputChange to include mobile formatting
//   const handleInputChange = (field, value) => {
//     let formattedValue = value;

//     // Format mobile number as user types
//     if (field === "mobile") {
//       formattedValue = formatMobileNumber(value);

//       // Auto-add leading 03 if user starts typing
//       if (formattedValue.length === 1 && value !== "0") {
//         formattedValue = "0" + formattedValue;
//       }
//     }

//     setPatientDetails((prev) => ({
//       ...prev,
//       [field]: formattedValue,
//     }));

//     const errorKey = `${currentPatientIndex}_${field}`;
//     if (formErrors[errorKey]) {
//       validateField(field, formattedValue);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSubmitting.current) return;

//     if (!patients.length) {
//       setError("Please add at least one patient");
//       return;
//     }

//     // Save current patient's details
//     const updatedPatients = [...patients];
//     updatedPatients[currentPatientIndex].details = { ...patientDetails };
//     setPatients(updatedPatients);

//     if (!validateForm()) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     isSubmitting.current = true;

//     try {
//       // Prepare booking data according to backend structure
//       const bookingData = {
//         labId,
//         patients: updatedPatients.map((patient) => ({
//           testIds: patient.selectedTests,
//           patientDetails: {
//             name: patient.details.name.trim(),
//             age: Number(patient.details.age),
//             gender: patient.details.gender,
//             mobile: patient.details.mobile,
//             email: patient.details.email.trim(),
//             address: patient.details.address.trim(),
//             appointmentDate: new Date(
//               patient.details.appointmentDate,
//             ).toISOString(),
//           },
//         })),
//       };

//       console.log(
//         "Sending booking data:",
//         JSON.stringify(bookingData, null, 2),
//       );

//       const response = await axios.post(
//         "http://localhost:5000/api/bookings/multiple",
//         bookingData,
//         {
//           timeout: 10000,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("Booking response:", response.data);

//       // ✅ ADD THIS: Set flag before showing success page
//       // This will trigger a refresh when returning to lab detail page
//       sessionStorage.setItem("bookingConfirmed", "true");

//       setBookingSuccess(true);
//       setBookingDetails(response.data.booking);
//     } catch (error) {
//       console.error("Booking error details:", error);

//       let errorMessage = "Booking failed. Please try again.";

//       if (error.response) {
//         console.log("Error response data:", error.response.data);
//         errorMessage =
//           error.response.data?.error ||
//           error.response.data?.message ||
//           errorMessage;
//         if (error.response.data?.details) {
//           if (typeof error.response.data.details === "object") {
//             errorMessage += `: ${JSON.stringify(error.response.data.details)}`;
//           } else {
//             errorMessage += `: ${error.response.data.details}`;
//           }
//         }
//       } else if (error.request) {
//         errorMessage = "No response from server. Please check your connection.";
//       } else {
//         errorMessage = error.message;
//       }

//       setError(errorMessage);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } finally {
//       setLoading(false);
//       isSubmitting.current = false;
//     }
//   };
//   const total = calculateTotal();


//   // In BookingPage.js - Update the booking success section

//   if (bookingSuccess && bookingDetails) {
//     const handleBackToHome = () => {
//       // Navigate to home with a state that indicates booking was completed
//       navigate("/", { state: { bookingCompleted: true } });
//     };

//     const handleBackToLab = () => {
//       // Navigate back to lab detail - it will refresh due to sessionStorage flag
//       navigate(`/labs/${labId}`);
//     };

//     return (
//       <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
//         <div className="bg-gradient-to-br from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f] rounded-3xl p-8 text-center shadow-xl">
//           <div className="flex justify-center mb-6">
//             <div className="bg-[#2c6774] p-4 rounded-full">
//               <FaCheckCircle className="text-6xl text-white" />
//             </div>
//           </div>

//           <h1 className="text-3xl font-bold text-[#174047] mb-3">
//             Booking Confirmed!
//           </h1>
//           <p className="text-[#5c878f] text-lg mb-8">
//             Your appointments have been scheduled successfully for{" "}
//             {patients.length} {patients.length === 1 ? "patient" : "patients"}
//           </p>

//           <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-[#c0d3dc]">
//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-[#5c878f] text-sm">Booking Reference</p>
//                   <p className="font-bold text-xl text-[#2c6774] tracking-wide">
//                     {bookingDetails.bookingReference}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-[#5c878f] text-sm">Number of Patients</p>
//                   <p className="font-semibold text-lg text-[#174047]">
//                     {patients.length}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-[#c0d3dc] pt-6">
//               <div className="flex justify-between items-center">
//                 <span className="text-[#5c878f]">Total Amount</span>
//                 <div className="text-right">
//                   <p className="text-2xl font-bold text-[#2c6774]">
//                     Rs {total.final}
//                   </p>
//                   <p className="text-sm text-[#5c878f]">
//                     <s>Rs {total.original}</s> • Saved Rs{" "}
//                     {total.original - total.final}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#9fbfc5]/30 rounded-xl p-4 mb-8 border border-[#5c878f]/30">
//             <p className="text-sm text-[#174047]">
//               <span className="font-semibold">Next Steps:</span> You will
//               receive a confirmation call from the lab within 30 minutes. Please
//               keep your booking reference handy for any queries.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => window.print()}
//               className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl font-semibold hover:bg-[#9fbfc5]/20 transition flex items-center justify-center gap-2"
//             >
//               Print Receipt
//             </button>
//             <button
//               onClick={handleBackToLab}
//               className="px-6 py-3 bg-[#2c6774] text-white rounded-xl font-semibold hover:bg-[#1e4e56] transition flex items-center justify-center gap-2"
//             >
//               Book More Tests
//             </button>
//             <button
//               onClick={handleBackToHome}
//               className="px-6 py-3 bg-[#174047] text-white rounded-xl font-semibold hover:bg-[#0f2e33] transition flex items-center justify-center gap-2"
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Error Alert */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
//           <div className="flex items-start gap-3">
//             <FaExclamationTriangle className="text-red-500 mt-0.5" />
//             <div className="flex-1">
//               <p className="font-medium text-red-700">{error}</p>
//               <button
//                 onClick={() => setError(null)}
//                 className="text-sm text-red-600 hover:text-red-800 mt-1"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
//         <div>
//           <button
//             onClick={() => navigate(`/labs/${labId}`)}
//             className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
//           >
//             <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//             Back to Lab
//           </button>
//           <h1 className="text-3xl font-bold text-[#174047]">
//             Complete Your Booking
//           </h1>
//           <p className="text-[#5c878f] mt-2">
//             Fill in details for all patients
//           </p>
//         </div>

//         {lab && (
//           <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
//             <img
//               src={`http://localhost:5000/uploads/${lab.logo}`}
//               className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
//               alt={lab.name}
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/48?text=Lab";
//               }}
//             />
//             <div>
//               <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
//               <p className="text-sm text-[#5c878f]">{lab.branches}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Patient Selector */}
//       <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc]">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
//           <button
//             onClick={addNewPatient}
//             className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition"
//           >
//             <FaUserPlus />
//             Add Another Person
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           {patients.map((patient, index) => (
//             <div
//               key={patient.id}
//               className={`flex items-center gap-2 p-2 rounded-lg border transition ${
//                 currentPatientIndex === index
//                   ? "border-[#2c6774] bg-[#2c6774]/10"
//                   : "border-gray-200 hover:border-[#5c878f]"
//               }`}
//             >
//               <button
//                 onClick={() => switchPatient(index)}
//                 className="flex items-center gap-2 px-3 py-1"
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     currentPatientIndex === index
//                       ? "bg-[#2c6774] text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {patient.patientIndex}
//                 </div>
//                 <span className="font-medium">
//                   {patient.details.name || `Patient ${patient.patientIndex}`}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   ({patient.selectedTests.length} tests)
//                 </span>
//               </button>

//               <button
//                 onClick={() => editPatientTests(index)}
//                 className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                 title="Edit tests"
//               >
//                 <FaEdit />
//               </button>

//               {patients.length > 1 && (
//                 <button
//                   onClick={() => removePatient(index)}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                   title="Remove patient"
//                 >
//                   <FaTrash />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Left Column: Booking Form */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Patient Details Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
//                 <FaUser className="text-white text-lg" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-[#174047]">
//                   Patient {currentPatientIndex + 1} Information
//                 </h2>
//                 <p className="text-sm text-[#5c878f]">
//                   Fill in personal details and appointment date
//                 </p>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={patientDetails.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   onBlur={() => validateField("name", patientDetails.name)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                     formErrors[`${currentPatientIndex}_name`]
//                       ? "border-red-500 ring-red-200"
//                       : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                   }`}
//                   placeholder="Enter patient's full name"
//                 />
//                 {formErrors[`${currentPatientIndex}_name`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_name`]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Age *
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="120"
//                   value={patientDetails.age}
//                   onChange={(e) => handleInputChange("age", e.target.value)}
//                   onBlur={() => validateField("age", patientDetails.age)}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                     formErrors[`${currentPatientIndex}_age`]
//                       ? "border-red-500 ring-red-200"
//                       : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                   }`}
//                   placeholder="Age in years"
//                 />
//                 {formErrors[`${currentPatientIndex}_age`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_age`]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Gender *
//                 </label>
//                 <select
//                   value={patientDetails.gender}
//                   onChange={(e) => handleInputChange("gender", e.target.value)}
//                   className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Mobile Number *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaPhone className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="tel"
//                     value={patientDetails.mobile}
//                     onChange={(e) =>
//                       handleInputChange("mobile", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField("mobile", patientDetails.mobile)
//                     }
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_mobile`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="03123456789"
//                     maxLength="11"
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_mobile`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_mobile`]}
//                   </p>
//                 )}
//                 {!formErrors[`${currentPatientIndex}_mobile`] &&
//                   patientDetails.mobile &&
//                   patientDetails.mobile.length === 11 && (
//                     <p className="mt-1 text-sm text-green-600"></p>
//                   )}
//               </div>

//               {/* Email Field with Allowed Domains */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-[#174047] mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaEnvelope className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="email"
//                     value={patientDetails.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     onBlur={() => validateField("email", patientDetails.email)}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_email`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="patient@gmail.com"
//                   />
//                 </div>

              
//                 {/* Show domain validation status */}
//                 {patientDetails.email && patientDetails.email.includes("@") && (
//                   <div className="mt-1">
//                     {isEmailDomainAllowed(patientDetails.email) ? (
//                       <p className="text-sm text-green-600 flex items-center gap-1">
//                         {/* <FaCheckCircle className="text-xs" />
//           ✓ Valid domain: {patientDetails.email.split('@')[1]} */}
//                       </p>
//                     ) : (
//                       <p className="text-sm text-red-600 flex items-center gap-1">
//                         <FaExclamationTriangle className="text-xs" />
//                         Please enter a valid domain name.
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {formErrors[`${currentPatientIndex}_email`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_email`]}
//                   </p>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-[#174047]">
//                     Complete Address *
//                   </label>
//                   {currentPatientIndex > 0 && (
//                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={sameAddressAsPrevious}
//                         onChange={(e) =>
//                           setSameAddressAsPrevious(e.target.checked)
//                         }
//                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <span>Same as previous patient's address</span>
//                     </label>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <div className="absolute top-3 left-3">
//                     <FaMapMarkerAlt className="text-[#5c878f]" />
//                   </div>
//                   <textarea
//                     value={patientDetails.address}
//                     onChange={(e) =>
//                       handleInputChange("address", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField("address", patientDetails.address)
//                     }
//                     rows="3"
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_address`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                     placeholder="House no., Street, Landmark, City, State - Pincode"
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_address`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_address`]}
//                   </p>
//                 )}
//               </div>

//               {/* Appointment Date Field */}
//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-medium text-[#174047]">
//                     Appointment Date *
//                   </label>
//                   {currentPatientIndex > 0 && (
//                     <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={sameDateAsPrevious}
//                         onChange={(e) =>
//                           setSameDateAsPrevious(e.target.checked)
//                         }
//                         className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <span>Same as previous patient's date</span>
//                     </label>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaCalendarAlt className="text-[#5c878f]" />
//                   </div>
//                   <input
//                     type="date"
//                     value={patientDetails.appointmentDate}
//                     onChange={(e) =>
//                       handleInputChange("appointmentDate", e.target.value)
//                     }
//                     onBlur={() =>
//                       validateField(
//                         "appointmentDate",
//                         patientDetails.appointmentDate,
//                       )
//                     }
//                     min={new Date().toISOString().split("T")[0]}
//                     className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
//                       formErrors[`${currentPatientIndex}_appointmentDate`]
//                         ? "border-red-500 ring-red-200"
//                         : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
//                     }`}
//                   />
//                 </div>
//                 {formErrors[`${currentPatientIndex}_appointmentDate`] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {formErrors[`${currentPatientIndex}_appointmentDate`]}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Terms & Conditions */}
//           <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
//             <div className="flex items-start gap-3">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                 className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
//               />
//               <label
//                 htmlFor="terms"
//                 className="text-sm text-[#174047] leading-relaxed"
//               >
//                 <span className="font-semibold">Terms & Conditions:</span> I
//                 agree that the information provided is accurate. I understand
//                 that the lab technician will contact me to confirm the
//                 appointment. Any cancellation should be done at least 6 hours
//                 before the scheduled time. I agree to pay the amount at the time
//                 of sample collection.
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-8 space-y-6">
//             {/* Order Summary Card */}
//             <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                 <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
//                 <p className="text-[#c0d3dc]">Review all patients</p>
//               </div>

//               {/* Lab Info */}
//               {lab && (
//                 <div className="p-6 border-b border-[#c0d3dc]">
//                   <div className="flex items-center gap-3 mb-4">
//                     <img
//                       src={`http://localhost:5000/uploads/${lab.logo}`}
//                       className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
//                       alt={lab.name}
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/56?text=Lab";
//                       }}
//                     />
//                     <div>
//                       <h3 className="font-bold text-[#174047]">{lab.name}</h3>
//                       <p className="text-sm text-[#5c878f]">
//                         {patients.length}{" "}
//                         {patients.length === 1 ? "patient" : "patients"} •{" "}
//                         {tests.length} total tests
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Patients Summary */}
//               <div className="p-6 border-b border-[#c0d3dc] max-h-96 overflow-y-auto">
//                 <h3 className="font-bold text-lg text-[#174047] mb-4">
//                   Patients & Tests
//                 </h3>
//                 <div className="space-y-6">
//                   {patients.map((patient, index) => (
//                     <div
//                       key={patient.id}
//                       className="border-b border-[#c0d3dc] last:border-0 pb-4 last:pb-0"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
//                             {index + 1}
//                           </div>
//                           <span className="font-semibold text-[#174047]">
//                             {patient.details.name || `Patient ${index + 1}`}
//                           </span>
//                         </div>
//                         <span className="text-sm text-[#5c878f]">
//                           {patient.selectedTests.length} tests
//                         </span>
//                       </div>

//                       <div className="ml-8 space-y-2">
//                         {patient.selectedTests.map((testId) => {
//                           const test = tests.find((t) => t._id === testId);
//                           if (!test) return null;

//                           const discountedPrice = Math.round(
//                             test.price -
//                               (test.price * (lab?.discount || 0)) / 100,
//                           );

//                           return (
//                             <div
//                               key={testId}
//                               className="flex justify-between items-center text-sm"
//                             >
//                               <span className="text-[#5c878f]">
//                                 {test.name}
//                               </span>
//                               <span className="font-medium text-[#2c6774]">
//                                 Rs {discountedPrice}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>

//                       {/* Show appointment date */}
//                       {patient.details.appointmentDate && (
//                         <div className="mt-2 ml-8 text-xs text-[#5c878f] flex items-center gap-1">
//                           <FaCalendarAlt className="text-[#2c6774]" />
//                           Date:{" "}
//                           {new Date(
//                             patient.details.appointmentDate,
//                           ).toLocaleDateString()}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Breakdown */}
//               <div className="p-6 border-b border-[#c0d3dc]">
//                 <h3 className="font-bold text-lg text-[#174047] mb-4">
//                   Price Details
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-[#5c878f]">Total Tests Price</span>
//                     <span className="font-medium text-[#174047]">
//                       Rs {total.original}
//                     </span>
//                   </div>

//                   {lab?.discount > 0 && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-[#5c878f]">Discount</span>
//                       <span className="flex items-center gap-2">
//                         <FaTag className="text-[#2c6774]" />
//                         <span className="font-semibold text-[#2c6774]">
//                           -{lab.discount}% (Rs {total.original - total.final})
//                         </span>
//                       </span>
//                     </div>
//                   )}

//                   <div className="pt-3 border-t border-[#c0d3dc]">
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-lg text-[#174047]">
//                         Total Amount
//                       </span>
//                       <div className="text-right">
//                         <div className="text-2xl font-bold text-[#2c6774]">
//                           Rs {total.final}
//                         </div>
//                         {lab?.discount > 0 && (
//                           <div className="text-sm text-[#5c878f] line-through">
//                             Rs {total.original}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {lab?.discount > 0 && (
//                   <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
//                     <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
//                       You save Rs {total.original - total.final} with{" "}
//                       {lab.discount}% discount!
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Booking Button */}
//               <div className="p-6">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading || !patients.length}
//                   className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
//                     loading ? "cursor-wait" : ""
//                   }`}
//                   style={{
//                     background: "linear-gradient(to right, #2c6774, #1e4e56)",
//                     boxShadow: "0 4px 14px 0 rgba(44, 103, 116, 0.39)",
//                   }}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
//                       Processing Booking...
//                     </span>
//                   ) : (
//                     `Confirm Booking for ${patients.length} ${patients.length === 1 ? "Patient" : "Patients"}`
//                   )}
//                 </button>

//                 <div className="mt-4 text-center space-y-2">
//                   <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
//                     <FaShieldAlt />
//                     <span>Secure & Safe Booking</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Help Box */}
//             <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
//               <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
//                 <FaHeadset className="text-[#2c6774]" />
//                 Need Help?
//               </h4>
//               <div className="space-y-2">
//                 <p className="text-sm text-[#174047]">
//                   Call us:{" "}
//                   <span className="font-semibold text-[#2c6774]">
//                     1800-123-4567
//                   </span>
//                 </p>
//                 <p className="text-sm text-[#174047]">
//                   Email:{" "}
//                   <span className="font-semibold text-[#2c6774]">
//                     support@quickcure.com
//                   </span>
//                 </p>
//                 <p className="text-xs text-[#5c878f] mt-3">
//                   Our support team is available 24/7 to assist you
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaHome,
  FaHospital,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTag,
  FaArrowLeft,
  FaShieldAlt,
  FaHeadset,
  FaUserPlus,
  FaTrash,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

export default function BookingPage() {
  const { id: labId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { patients: initialPatients } = location.state || {};

  const isSubmitting = useRef(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Multi-patient state
  const [patients, setPatients] = useState([]);
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

  // Form state for current patient
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    appointmentDate: "",
  });

  // "Same as Previous" checkboxes
  const [sameAddressAsPrevious, setSameAddressAsPrevious] = useState(false);
  const [sameDateAsPrevious, setSameDateAsPrevious] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);

  // Initialize patients from state
  useEffect(() => {
    if (initialPatients && initialPatients.length > 0) {
      // Create patient forms for each patient with tests
      const patientForms = initialPatients.map((patient, index) => ({
        id: Date.now() + index,
        patientIndex: index + 1,
        selectedTests: patient.selectedTests,
        details: {
          name: "",
          age: "",
          gender: "",
          mobile: "",
          email: "",
          address: "",
          appointmentDate: "",
        },
      }));
      setPatients(patientForms);

      // Load tests for all selected tests
      const allTestIds = initialPatients.flatMap((p) => p.selectedTests);
      if (allTestIds.length > 0) {
        fetchLabAndTests(allTestIds);
      }
    } else {
      navigate(`/labs/${labId}`);
    }
  }, []);

  const fetchLabAndTests = async (testIds) => {
    try {
      const [labRes, testsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/labs/${labId}`),
        axios.get(`http://localhost:5000/api/tests/lab/${labId}`),
      ]);

      setLab(labRes.data);
      const allTests = testsRes.data || [];
      const selectedTestDetails = allTests.filter((test) =>
        testIds.includes(test._id),
      );
      setTests(selectedTestDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
      showError("Failed to load lab details. Please try again.");
    }
  };

  // Handle "Same as Previous" checkboxes
  useEffect(() => {
    if (currentPatientIndex > 0) {
      const previousPatient = patients[currentPatientIndex - 1];

      if (sameAddressAsPrevious) {
        setPatientDetails((prev) => ({
          ...prev,
          address: previousPatient.details.address,
        }));
      }

      if (sameDateAsPrevious) {
        setPatientDetails((prev) => ({
          ...prev,
          appointmentDate: previousPatient.details.appointmentDate,
        }));
      }
    }
  }, [
    sameAddressAsPrevious,
    sameDateAsPrevious,
    currentPatientIndex,
    patients,
  ]);

  // Switch between patients
  const switchPatient = (index) => {
    // Save current patient's details
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].details = { ...patientDetails };
    setPatients(updatedPatients);

    // Load new patient's details
    setCurrentPatientIndex(index);
    setPatientDetails(updatedPatients[index].details);

    // Reset "Same as Previous" checkboxes
    setSameAddressAsPrevious(false);
    setSameDateAsPrevious(false);
  };

  // Add a new patient manually
  const addNewPatient = () => {
    const newPatient = {
      id: Date.now(),
      patientIndex: patients.length + 1,
      selectedTests: [],
      details: {
        name: "",
        age: "",
        gender: "",
        mobile: "",
        email: "",
        address: "",
        appointmentDate: "",
      },
    };
    setPatients([...patients, newPatient]);
    setCurrentPatientIndex(patients.length);

    // Clear form for new patient
    setPatientDetails({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      address: "",
      appointmentDate: "",
    });

    // Reset "Same as Previous" checkboxes
    setSameAddressAsPrevious(false);
    setSameDateAsPrevious(false);
  };

  // Remove a patient
  const removePatient = (index) => {
    if (patients.length <= 1) {
      showError("Cannot remove the last patient. At least one patient is required.");
      return;
    }

    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);

    // Adjust current index if needed
    if (currentPatientIndex >= updatedPatients.length) {
      setCurrentPatientIndex(updatedPatients.length - 1);
      setPatientDetails(updatedPatients[updatedPatients.length - 1].details);
    } else if (currentPatientIndex === index) {
      setCurrentPatientIndex(Math.max(0, index - 1));
      setPatientDetails(updatedPatients[Math.max(0, index - 1)].details);
    }

    // Reset "Same as Previous" checkboxes
    setSameAddressAsPrevious(false);
    setSameDateAsPrevious(false);
  };

  // Edit tests for a patient (redirect to lab detail)
  const editPatientTests = (patientIndex) => {
    // Save current patient's details
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].details = { ...patientDetails };
    setPatients(updatedPatients);

    // Navigate back to lab detail with patient context
    navigate(`/labs/${labId}`, {
      state: {
        editPatientIndex: patientIndex,
        patients: updatedPatients,
      },
    });
  };

  const calculateTotal = () => {
    if (!lab || !patients.length) return { original: 0, final: 0, discount: 0 };

    // Calculate total for all patients
    let original = 0;
    patients.forEach((patient) => {
      patient.selectedTests.forEach((testId) => {
        const test = tests.find((t) => t._id === testId);
        if (test) {
          original += Number(test.price);
        }
      });
    });

    const discount = lab.discount || 0;
    const final = Math.round(original - (original * discount) / 100);

    return { original: Math.round(original), final, discount };
  };

  // Show error popup
  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorPopup(true);
  };

  // Update the validateField function with strict domain validation
  const validateField = (field, value) => {
    const errors = { ...formErrors };
    const errorKey = `${currentPatientIndex}_${field}`;

    // List of allowed email domains
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "live.com",
      "icloud.com",
      "aol.com",
      "protonmail.com",
      "zoho.com",
    ];

    switch (field) {
      case "name":
        if (!value.trim()) {
          errors[errorKey] = "Name is required";
        } else if (value.trim().length < 2) {
          errors[errorKey] = "Name must be at least 2 characters";
        } else {
          delete errors[errorKey];
        }
        break;

      case "age":
        if (!value) {
          errors[errorKey] = "Age is required";
        } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
          errors[errorKey] = "Please enter a valid age (1-120)";
        } else {
          delete errors[errorKey];
        }
        break;

      case "mobile":
        // Pakistan mobile number validation - must start with 03 and be 11 digits total
        const pakMobileRegex = /^03[0-9]{9}$/;
        if (!value) {
          errors[errorKey] = "Mobile number is required";
        } else if (!pakMobileRegex.test(value)) {
          errors[errorKey] =
            "Please enter a valid Pakistan mobile number starting with 03 (11 digits)";
        } else {
          delete errors[errorKey];
        }
        break;

      case "email":
        // Basic email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!value) {
          errors[errorKey] = "Email is required";
        } else if (!emailRegex.test(value)) {
          errors[errorKey] =
            "Please enter a valid email address (e.g., name@domain.com)";
        } else {
          // Extract domain from email
          const [localPart, domain] = value.split("@");

          // Convert domain to lowercase for comparison
          const domainLower = domain.toLowerCase();

          // Check if domain is in allowed list
          if (!allowedDomains.includes(domainLower)) {
            errors[errorKey] = "Please enter a valid domain name";
          } else {
            delete errors[errorKey];
          }
        }
        break;

      case "address":
        if (!value.trim()) {
          errors[errorKey] = "Address is required";
        } else if (value.trim().length < 10) {
          errors[errorKey] = "Please enter a complete address";
        } else {
          delete errors[errorKey];
        }
        break;

      case "appointmentDate":
        if (!value) {
          errors[errorKey] = "Please select an appointment date";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            errors[errorKey] = "Date cannot be in the past";
          } else {
            delete errors[errorKey];
          }
        }
        break;
    }

    setFormErrors(errors);
    return !errors[errorKey];
  };

  const validateForm = () => {
    // List of allowed email domains
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "live.com",
      "icloud.com",
      "aol.com",
      "protonmail.com",
      "zoho.com",
    ];

    // Validate all patients' details
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      const details =
        i === currentPatientIndex ? patientDetails : patient.details;

      if (!details.name?.trim()) {
        showError(`Please fill in name for Patient ${i + 1}`);
        return false;
      }
      if (!details.age) {
        showError(`Please fill in age for Patient ${i + 1}`);
        return false;
      }
      if (!details.gender) {
        showError(`Please select gender for Patient ${i + 1}`);
        return false;
      }

      // Mobile validation for Pakistan format
      const pakMobileRegex = /^03[0-9]{9}$/;
      if (!details.mobile || !pakMobileRegex.test(details.mobile)) {
        showError(
          `Please enter a valid Pakistan mobile number (03XXXXXXXXX) for Patient ${i + 1}`,
        );
        return false;
      }

      // Enhanced email validation with allowed domains
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!details.email || !emailRegex.test(details.email)) {
        showError(`Please enter a valid email address for Patient ${i + 1}`);
        return false;
      }

      // Check if domain is allowed
      const domain = details.email.split("@")[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
        showError(
          `Email domain for Patient ${i + 1} must be one of: ${allowedDomains.join(", ")}`,
        );
        return false;
      }

      if (!details.address?.trim()) {
        showError(`Please fill in address for Patient ${i + 1}`);
        return false;
      }
      if (!details.appointmentDate) {
        showError(`Please select appointment date for Patient ${i + 1}`);
        return false;
      }
    }

    if (!termsAccepted) {
      showError("Please accept the terms and conditions");
      return false;
    }

    return true;
  };

  // Add this helper function to check allowed domains
  const isEmailDomainAllowed = (email) => {
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "live.com",
      "icloud.com",
      "aol.com",
      "protonmail.com",
      "zoho.com",
    ];

    if (!email || !email.includes("@")) return false;

    const domain = email.split("@")[1].toLowerCase();
    return allowedDomains.includes(domain);
  };

  // Add a helper function to format mobile number as user types
  const formatMobileNumber = (value) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, "");

    // Ensure it starts with 03
    if (digits.length === 0) return "";
    if (digits.length === 1) return "0";
    if (digits.length === 2) return digits;

    // Limit to 11 digits
    const limitedDigits = digits.slice(0, 11);

    return limitedDigits;
  };

  // Update handleInputChange to include mobile formatting
  const handleInputChange = (field, value) => {
    let formattedValue = value;

    // Format mobile number as user types
    if (field === "mobile") {
      formattedValue = formatMobileNumber(value);

      // Auto-add leading 03 if user starts typing
      if (formattedValue.length === 1 && value !== "0") {
        formattedValue = "0" + formattedValue;
      }
    }

    setPatientDetails((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    const errorKey = `${currentPatientIndex}_${field}`;
    if (formErrors[errorKey]) {
      validateField(field, formattedValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting.current) return;

    if (!patients.length) {
      showError("Please add at least one patient");
      return;
    }

    // Save current patient's details
    const updatedPatients = [...patients];
    updatedPatients[currentPatientIndex].details = { ...patientDetails };
    setPatients(updatedPatients);

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setError(null);
    isSubmitting.current = true;

    try {
      // Prepare booking data according to backend structure
      const bookingData = {
        labId,
        patients: updatedPatients.map((patient) => ({
          testIds: patient.selectedTests,
          patientDetails: {
            name: patient.details.name.trim(),
            age: Number(patient.details.age),
            gender: patient.details.gender,
            mobile: patient.details.mobile,
            email: patient.details.email.trim(),
            address: patient.details.address.trim(),
            appointmentDate: new Date(
              patient.details.appointmentDate,
            ).toISOString(),
          },
        })),
      };

      console.log(
        "Sending booking data:",
        JSON.stringify(bookingData, null, 2),
      );

      const response = await axios.post(
        "http://localhost:5000/api/bookings/multiple",
        bookingData,
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Booking response:", response.data);

      // Set flag for lab detail page refresh
      sessionStorage.setItem("bookingConfirmed", "true");

      // Set booking details and show success popup
      setBookingDetails(response.data.booking);
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error("Booking error details:", error);

      let errorMessage = "Booking failed. Please try again.";

      if (error.response) {
        console.log("Error response data:", error.response.data);
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          errorMessage;
        if (error.response.data?.details) {
          if (typeof error.response.data.details === "object") {
            errorMessage += `: ${JSON.stringify(error.response.data.details)}`;
          } else {
            errorMessage += `: ${error.response.data.details}`;
          }
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message;
      }

      showError(errorMessage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };
  
  const total = calculateTotal();

  // ==================== POPUP COMPONENTS ====================

  // Error Popup Component
  const ErrorPopup = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop with blur */}
        <div 
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Popup Content */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Error Header */}
            <div className="bg-red-500 p-6 text-center rounded-t-2xl">
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaExclamationTriangle className="text-1xl text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Error!</h2>
            </div>

            {/* Error Message */}
            <div className="p-6">
              <p className="text-gray-700 text-center mb-6">{message}</p>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition transform hover:scale-[1.02]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Success Popup Component
  const SuccessPopup = ({ isOpen, onClose, bookingDetails, patients, lab, tests, total, labId }) => {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    const handleBackToHome = () => {
      onClose();
      navigate("/", { state: { bookingCompleted: true } });
    };

    const handleBackToLab = () => {
      onClose();
      navigate(`/labs/${labId}`);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop with blur */}
        <div 
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Popup Content */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-8 text-center relative sticky top-0">
              {/* <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition"
                >
                  <FaTimes size={20} />
                </button>
              </div> */}
              
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <FaCheckCircle className="text-2xl text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-[#c0d3dc]">
                Your appointment has been scheduled successfully
              </p>
            </div>

            {/* Booking Details */}
            <div className="p-8 space-y-6">
              {/* Booking Reference */}
              <div className="bg-[#9fbfc5]/10 rounded-xl p-4 border border-[#9fbfc5]">
                <div className="flex items-center justify-between">
                  <span className="text-[#5c878f]">Booking Reference</span>
                  <span className="font-mono font-bold text-xl text-[#2c6774]">
                    {bookingDetails?.bookingReference}
                  </span>
                </div>
              </div>

              {/* Lab Info */}
              {lab && (
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#c0d3dc]">
                  <img
                    src={`http://localhost:5000/uploads/${lab.logo}`}
                    className="w-16 h-16 rounded-xl object-contain bg-white p-2 border border-[#5c878f]"
                    alt={lab.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/64?text=Lab";
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-[#174047]">{lab.name}</h3>
                    <p className="text-sm text-[#5c878f]">{lab.branches}</p>
                  </div>
                </div>
              )}

              {/* Patients Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-[#174047] flex items-center gap-2">
                  <FaUser className="text-[#2c6774]" />
                  Patient Details
                </h3>
                
                {patients.map((patient, index) => (
                  <div key={index} className="bg-[#9fbfc5]/5 rounded-xl p-4 border border-[#c0d3dc]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-[#174047]">
                        {patient.details.name}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-[#5c878f]">Age/Gender:</span>
                        <span className="ml-2 text-[#174047]">
                          {patient.details.age} yrs, {patient.details.gender}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5c878f]">Mobile:</span>
                        <span className="ml-2 text-[#174047]">{patient.details.mobile}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#5c878f]">Email:</span>
                        <span className="ml-2 text-[#174047]">{patient.details.email}</span>
                      </div>
                    </div>

                    {/* Selected Tests for this patient */}
                    <div className="mt-2">
                      <p className="text-sm font-medium text-[#174047] mb-2">Selected Tests:</p>
                      <div className="space-y-1">
                        {patient.selectedTests.map((testId) => {
                          const test = tests.find(t => t._id === testId);
                          if (!test) return null;
                          const discountedPrice = Math.round(
                            test.price - (test.price * (lab?.discount || 0)) / 100
                          );
                          return (
                            <div key={testId} className="flex justify-between items-center text-sm">
                              <span className="text-[#5c878f]">{test.name}</span>
                              <span className="font-medium text-[#2c6774]">Rs {discountedPrice}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Appointment Date */}
                    <div className="mt-3 pt-3 border-t border-[#c0d3dc]">
                      <div className="flex items-center gap-2 text-sm">
                        <FaCalendarAlt className="text-[#2c6774]" />
                        <span className="text-[#174047] font-medium">
                          Appointment: {formatDate(patient.details.appointmentDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#174047]/10 rounded-xl p-4 border border-[#5c878f]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#174047]">Total Amount:</span>
                  <span className="text-xl font-bold text-[#2c6774]">Rs {total.final}</span>
                </div>
                {lab?.discount > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#5c878f]">Original Price:</span>
                    <span className="text-[#5c878f] line-through">Rs {total.original}</span>
                  </div>
                )}
                {lab?.discount > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span>You Saved:</span>
                    <span>Rs {total.original - total.final} ({lab.discount}% off)</span>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Next Steps:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Lab will contact you within 30 minutes to confirm</li>
                  <li>• Keep your booking reference handy</li>
                  <li>• Sample collection will be done at your address</li>
                  <li>• Payment at the time of sample collection</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleBackToLab}
                  className="flex-1 px-4 py-3 bg-[#2c6774] text-white rounded-xl font-semibold hover:bg-[#1e4e56] transition flex items-center justify-center gap-2"
                >
                  Book More Tests
                </button>
                <button
                  onClick={handleBackToHome}
                  className="flex-1 px-4 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl font-semibold hover:bg-[#9fbfc5]/20 transition flex items-center justify-center gap-2"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== MAIN RENDER ====================

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <button
            onClick={() => navigate(`/labs/${labId}`)}
            className="mb-4 flex items-center gap-2 text-[#2c6774] hover:text-[#174047] group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Lab
          </button>
          <h1 className="text-3xl font-bold text-[#174047]">
            Complete Your Booking
          </h1>
          <p className="text-[#5c878f] mt-2">
            Fill in details for all patients
          </p>
        </div>

        {lab && (
          <div className="flex items-center gap-3 mt-4 lg:mt-0 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#9fbfc5]">
            <img
              src={`http://localhost:5000/uploads/${lab.logo}`}
              className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-[#5c878f] shadow-sm"
              alt={lab.name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/48?text=Lab";
              }}
            />
            <div>
              <h3 className="font-semibold text-[#174047]">{lab.name}</h3>
              <p className="text-sm text-[#5c878f]">{lab.branches}</p>
            </div>
          </div>
        )}
      </div>

      {/* Patient Selector */}
      <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#174047]">Patients</h2>
          <button
            onClick={addNewPatient}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition"
          >
            <FaUserPlus />
            Add Another Person
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {patients.map((patient, index) => (
            <div
              key={patient.id}
              className={`flex items-center gap-2 p-2 rounded-lg border transition ${
                currentPatientIndex === index
                  ? "border-[#2c6774] bg-[#2c6774]/10"
                  : "border-gray-200 hover:border-[#5c878f]"
              }`}
            >
              <button
                onClick={() => switchPatient(index)}
                className="flex items-center gap-2 px-3 py-1"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPatientIndex === index
                      ? "bg-[#2c6774] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {patient.patientIndex}
                </div>
                <span className="font-medium">
                  {patient.details.name || `Patient ${patient.patientIndex}`}
                </span>
                <span className="text-sm text-gray-500">
                  ({patient.selectedTests.length} tests)
                </span>
              </button>

              <button
                onClick={() => editPatientTests(index)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Edit tests"
              >
                <FaEdit />
              </button>

              {patients.length > 1 && (
                <button
                  onClick={() => removePatient(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Remove patient"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-[#2c6774] to-[#1e4e56] p-3 rounded-lg">
                <FaUser className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#174047]">
                  Patient {currentPatientIndex + 1} Information
                </h2>
                <p className="text-sm text-[#5c878f]">
                  Fill in personal details and appointment date
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#174047] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={patientDetails.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onBlur={() => validateField("name", patientDetails.name)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                    formErrors[`${currentPatientIndex}_name`]
                      ? "border-red-500 ring-red-200"
                      : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
                  }`}
                  placeholder="Enter patient's full name"
                />
                {formErrors[`${currentPatientIndex}_name`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors[`${currentPatientIndex}_name`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#174047] mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={patientDetails.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  onBlur={() => validateField("age", patientDetails.age)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                    formErrors[`${currentPatientIndex}_age`]
                      ? "border-red-500 ring-red-200"
                      : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
                  }`}
                  placeholder="Age in years"
                />
                {formErrors[`${currentPatientIndex}_age`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors[`${currentPatientIndex}_age`]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#174047] mb-2">
                  Gender *
                </label>
                <select
                  value={patientDetails.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-[#9fbfc5] rounded-xl focus:ring-2 focus:ring-[#2c6774]/20 focus:outline-none hover:border-[#5c878f] transition bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#174047] mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-[#5c878f]" />
                  </div>
                  <input
                    type="tel"
                    value={patientDetails.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    onBlur={() =>
                      validateField("mobile", patientDetails.mobile)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                      formErrors[`${currentPatientIndex}_mobile`]
                        ? "border-red-500 ring-red-200"
                        : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
                    }`}
                    placeholder="03123456789"
                    maxLength="11"
                  />
                </div>
                {formErrors[`${currentPatientIndex}_mobile`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors[`${currentPatientIndex}_mobile`]}
                  </p>
                )}
              </div>

              {/* Email Field with Allowed Domains */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#174047] mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-[#5c878f]" />
                  </div>
                  <input
                    type="email"
                    value={patientDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => validateField("email", patientDetails.email)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                      formErrors[`${currentPatientIndex}_email`]
                        ? "border-red-500 ring-red-200"
                        : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
                    }`}
                    placeholder="patient@gmail.com"
                  />
                </div>

                {/* Show domain validation status */}
                {patientDetails.email && patientDetails.email.includes("@") && (
                  <div className="mt-1">
                    {isEmailDomainAllowed(patientDetails.email) ? (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        {/* <FaCheckCircle className="text-xs" /> */}
                        {/* Valid domain: {patientDetails.email.split('@')[1]} */}
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        Please enter a valid domain name (gmail.com, yahoo.com, etc.)
                      </p>
                    )}
                  </div>
                )}

                {formErrors[`${currentPatientIndex}_email`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors[`${currentPatientIndex}_email`]}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#174047]">
                    Complete Address *
                  </label>
                  {currentPatientIndex > 0 && (
                    <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAddressAsPrevious}
                        onChange={(e) =>
                          setSameAddressAsPrevious(e.target.checked)
                        }
                        className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
                      />
                      <span>Same as previous patient's address</span>
                    </label>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FaMapMarkerAlt className="text-[#5c878f]" />
                  </div>
                  <textarea
                    value={patientDetails.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    onBlur={() =>
                      validateField("address", patientDetails.address)
                    }
                    rows="3"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                      formErrors[`${currentPatientIndex}_address`]
                        ? "border-red-500 ring-red-200"
                        : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
                    }`}
                    placeholder="House no., Street, Landmark, City, State - Pincode"
                  />
                </div>
                {formErrors[`${currentPatientIndex}_address`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors[`${currentPatientIndex}_address`]}
                  </p>
                )}
              </div>

              {/* Appointment Date Field */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#174047]">
                    Appointment Date *
                  </label>
                  {currentPatientIndex > 0 && (
                    <label className="flex items-center gap-2 text-sm text-[#2c6774] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameDateAsPrevious}
                        onChange={(e) =>
                          setSameDateAsPrevious(e.target.checked)
                        }
                        className="w-4 h-4 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
                      />
                      <span>Same as previous patient's date</span>
                    </label>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-[#5c878f]" />
                  </div>
                  <input
                    type="date"
                    value={patientDetails.appointmentDate}
                    onChange={(e) =>
                      handleInputChange("appointmentDate", e.target.value)
                    }
                    onBlur={() =>
                      validateField(
                        "appointmentDate",
                        patientDetails.appointmentDate,
                      )
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                      formErrors[`${currentPatientIndex}_appointmentDate`]
                        ? "border-red-500 ring-red-200"
                        : "border-[#9fbfc5] hover:border-[#5c878f] focus:border-[#2c6774] focus:ring-[#2c6774]/20"
                    }`}
                  />
                </div>
                {formErrors[`${currentPatientIndex}_appointmentDate`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors[`${currentPatientIndex}_appointmentDate`]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#9fbfc5] hover:bg-[#9fbfc5]/20 transition">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-[#5c878f] text-[#2c6774] focus:ring-[#2c6774]"
              />
              <label
                htmlFor="terms"
                className="text-sm text-[#174047] leading-relaxed"
              >
                <span className="font-semibold">Terms & Conditions:</span> I
                agree that the information provided is accurate. I understand
                that the lab technician will contact me to confirm the
                appointment. Any cancellation should be done at least 6 hours
                before the scheduled time. I agree to pay the amount at the time
                of sample collection.
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#c0d3dc] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
                <p className="text-[#c0d3dc]">Review all patients</p>
              </div>

              {/* Lab Info */}
              {lab && (
                <div className="p-6 border-b border-[#c0d3dc]">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`http://localhost:5000/uploads/${lab.logo}`}
                      className="w-14 h-14 rounded-xl object-contain bg-white p-2 border border-[#5c878f] shadow-sm"
                      alt={lab.name}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/56?text=Lab";
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-[#174047]">{lab.name}</h3>
                      <p className="text-sm text-[#5c878f]">
                        {patients.length}{" "}
                        {patients.length === 1 ? "patient" : "patients"} •{" "}
                        {tests.length} total tests
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Patients Summary */}
              <div className="p-6 border-b border-[#c0d3dc] max-h-96 overflow-y-auto">
                <h3 className="font-bold text-lg text-[#174047] mb-4">
                  Patients & Tests
                </h3>
                <div className="space-y-6">
                  {patients.map((patient, index) => (
                    <div
                      key={patient.id}
                      className="border-b border-[#c0d3dc] last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#2c6774] text-white flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-[#174047]">
                            {patient.details.name || `Patient ${index + 1}`}
                          </span>
                        </div>
                        <span className="text-sm text-[#5c878f]">
                          {patient.selectedTests.length} tests
                        </span>
                      </div>

                      <div className="ml-8 space-y-2">
                        {patient.selectedTests.map((testId) => {
                          const test = tests.find((t) => t._id === testId);
                          if (!test) return null;

                          const discountedPrice = Math.round(
                            test.price -
                              (test.price * (lab?.discount || 0)) / 100,
                          );

                          return (
                            <div
                              key={testId}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-[#5c878f]">
                                {test.name}
                              </span>
                              <span className="font-medium text-[#2c6774]">
                                Rs {discountedPrice}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Show appointment date */}
                      {patient.details.appointmentDate && (
                        <div className="mt-2 ml-8 text-xs text-[#5c878f] flex items-center gap-1">
                          <FaCalendarAlt className="text-[#2c6774]" />
                          Date:{" "}
                          {new Date(
                            patient.details.appointmentDate,
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 border-b border-[#c0d3dc]">
                <h3 className="font-bold text-lg text-[#174047] mb-4">
                  Price Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#5c878f]">Total Tests Price</span>
                    <span className="font-medium text-[#174047]">
                      Rs {total.original}
                    </span>
                  </div>

                  {lab?.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#5c878f]">Discount</span>
                      <span className="flex items-center gap-2">
                        <FaTag className="text-[#2c6774]" />
                        <span className="font-semibold text-[#2c6774]">
                          -{lab.discount}% (Rs {total.original - total.final})
                        </span>
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#c0d3dc]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-[#174047]">
                        Total Amount
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#2c6774]">
                          Rs {total.final}
                        </div>
                        {lab?.discount > 0 && (
                          <div className="text-sm text-[#5c878f] line-through">
                            Rs {total.original}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {lab?.discount > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 border border-[#5c878f]/30">
                    <p className="text-sm font-medium text-[#174047] flex items-center gap-2">
                      You save Rs {total.original - total.final} with{" "}
                      {lab.discount}% discount!
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Booking Button */}
              <div className="p-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !patients.length}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    loading ? "cursor-wait" : ""
                  }`}
                  style={{
                    background: "linear-gradient(to right, #2c6774, #1e4e56)",
                    boxShadow: "0 4px 14px 0 rgba(44, 103, 116, 0.39)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                      Processing Booking...
                    </span>
                  ) : (
                    `Confirm Booking for ${patients.length} ${patients.length === 1 ? "Patient" : "Patients"}`
                  )}
                </button>

                <div className="mt-4 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-[#5c878f]">
                    <FaShieldAlt />
                    <span>Secure & Safe Booking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Box */}
            <div className="bg-gradient-to-r from-[#2c6774]/10 to-[#5c878f]/10 rounded-xl border border-[#5c878f]/30 p-5">
              <h4 className="font-bold text-lg text-[#174047] mb-3 flex items-center gap-2">
                <FaHeadset className="text-[#2c6774]" />
                Need Help?
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-[#174047]">
                  Call us:{" "}
                  <span className="font-semibold text-[#2c6774]">
                    1800-123-4567
                  </span>
                </p>
                <p className="text-sm text-[#174047]">
                  Email:{" "}
                  <span className="font-semibold text-[#2c6774]">
                    support@quickcure.com
                  </span>
                </p>
                <p className="text-xs text-[#5c878f] mt-3">
                  Our support team is available 24/7 to assist you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      <ErrorPopup
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        message={errorMessage}
      />

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        bookingDetails={bookingDetails}
        patients={patients}
        lab={lab}
        tests={tests}
        total={total}
        labId={labId}
      />
      <style>{`
        @keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}`}</style>
    </div>
  );
 
}