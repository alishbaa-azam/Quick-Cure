// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// import { 
//   FaUser, 
//   FaMapMarkerAlt, 
//   FaCalendarAlt, 
//   FaClock, 
//   FaPhone, 
//   FaEnvelope, 
//   FaHome,
//   FaFileMedical,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaArrowLeft,
//   FaInfoCircle
// } from "react-icons/fa";
// import { 
//   IoIosCheckmarkCircle,
//   IoIosAlert
// } from "react-icons/io";
// import labs from "./LabData";
// import labTests from "./LabTestsData";

// export default function BookingPage() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const lab = labs.find(l => l.id === Number(id));
//   const tests = labTests[id] || [];

//   const selectedTests = location.state?.selectedTests || [];
//   const selectedTestDetails = tests.filter(t => selectedTests.includes(t.id));

//   // Form states
//   const [patientName, setPatientName] = useState("");
//   const [labCity, setLabCity] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [bookingDate, setBookingDate] = useState("");
//   const [bookingTime, setBookingTime] = useState("");
//   const [prescriptionFile, setPrescriptionFile] = useState(null);
//   const [testQty, setTestQty] = useState(1);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isLoadingSlots, setIsLoadingSlots] = useState(false);

//   // Cities data for dropdown
//   const cities = [
//     "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
//     "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala",
//     "Hyderabad", "Sukkur", "Abbottabad", "Bahawalpur", "Sargodha"
//   ];

//   // Lab-specific available time slots
//   const labTimeSlots = {
//     "Karachi": ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"],
//     "Lahore": ["08:30 AM", "10:00 AM", "11:30 AM", "02:30 PM", "04:00 PM"],
//     "Islamabad": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
//     "Rawalpindi": ["08:00 AM", "09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"],
//     "Faisalabad": ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM"],
//     "Multan": ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"],
//     "Peshawar": ["09:30 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"],
//     "Default": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
//   };

//   // Parse branches assuming comma separated
//   const branches = lab?.branches ? lab.branches.split(",").map(b => b.trim()) : [];

//   // Calculate total price
//   const totalPrice = selectedTestDetails.reduce((sum, test) => {
//     const discountPercent = typeof test.discount === "number" ? test.discount : parseInt(test.discount);
//     const discountAmount = (test.price * discountPercent) / 100;
//     return sum + (test.price - discountAmount);
//   }, 0) * testQty;

//   // Calculate discounted amount
//   const totalOriginalPrice = selectedTestDetails.reduce((sum, test) => sum + test.price, 0) * testQty;
//   const totalDiscount = totalOriginalPrice - totalPrice;

//   // Set minimum booking date to today
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     setBookingDate(today);
//   }, []);

//   // Fetch available slots when city or date changes
//   useEffect(() => {
//     if (labCity && bookingDate) {
//       fetchAvailableSlots();
//     } else {
//       setAvailableSlots([]);
//       setBookingTime("");
//     }
//   }, [labCity, bookingDate]);

//   const fetchAvailableSlots = async () => {
//     setIsLoadingSlots(true);
//     setBookingTime(""); // Reset time when fetching new slots
    
//     // Simulate API call to get available slots
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Get slots based on selected city or use default
//       const slots = labTimeSlots[labCity] || labTimeSlots["Default"];
//       setAvailableSlots(slots);
//     } catch (error) {
//       console.error("Error fetching slots:", error);
//       setAvailableSlots([]);
//     } finally {
//       setIsLoadingSlots(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size > 5 * 1024 * 1024) {
//       alert("File size should be less than 5MB");
//       return;
//     }
//     setPrescriptionFile(file);
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!patientName.trim()) errors.patientName = "Patient name is required";
//     if (!labCity.trim()) errors.labCity = "Please select a lab city";
//     if (!age.trim()) errors.age = "Age is required";
//     if (age && (age < 0 || age > 120)) errors.age = "Please enter a valid age";
//     if (!gender) errors.gender = "Please select gender";
//     if (!phone.trim()) errors.phone = "Phone number is required";
//     if (phone && !/^\d{10,15}$/.test(phone)) errors.phone = "Please enter a valid phone number";
//     if (!email.trim()) errors.email = "Email is required";
//     if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email";
//     if (!bookingDate) errors.bookingDate = "Booking date is required";
//     if (!bookingTime) errors.bookingTime = "Please select a time slot";
//     if (availableSlots.length === 0 && labCity && bookingDate) errors.bookingTime = "No slots available for selected city and date";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const bookingDetails = {
//         lab: lab.name,
//         tests: selectedTestDetails.map(t => t.name),
//         quantity: testQty,
//         patientDetails: {
//           name: patientName,
//           age,
//           gender,
//           phone,
//           email,
//           address
//         },
//         bookingDetails: {
//           city: labCity,
//           date: bookingDate,
//           time: bookingTime,
//           specialInstructions
//         },
//         prescription: prescriptionFile ? prescriptionFile.name : "Not provided",
//         payment: {
//           originalPrice: totalOriginalPrice,
//           discount: totalDiscount,
//           finalPrice: totalPrice
//         },
//         bookingId: `BK${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase()
//       };

//       const existingBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
//       existingBookings.push(bookingDetails);
//       localStorage.setItem('labBookings', JSON.stringify(existingBookings));

//       alert(`
//         🎉 Booking Confirmed!
        
//         Booking ID: ${bookingDetails.bookingId}
//         Lab: ${lab.name}
//         Test(s): ${selectedTestDetails.map(t => t.name).join(", ")}
//         Quantity: ${testQty}
//         Patient: ${patientName}
//         Date: ${new Date(bookingDate).toLocaleDateString()} at ${bookingTime}
//         City: ${labCity}
        
//         Total Amount: Rs. ${totalPrice.toFixed(0)}
        
//         Thank you for your booking!
//       `);

//       navigate("/booking-confirmation", { 
//         state: { bookingDetails } 
//       });

//     } catch (error) {
//       alert("Booking failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!lab) {
//     return (
//       <div className="min-h-screen bg-[#9fbfc5] flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-[#2c6774] text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-[#174047] mb-2">Lab Not Found</h2>
//           <p className="text-[#5c878f] mb-4">The lab you're looking for doesn't exist.</p>
//           <Link 
//             to="/labs" 
//             className="inline-block bg-[#2c6774] text-white px-6 py-3 rounded-lg hover:bg-[#174047] transition-colors"
//           >
//             Browse All Labs
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (selectedTestDetails.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#9fbfc5] flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-[#2c6774] text-6xl mb-4">🔍</div>
//           <h2 className="text-2xl font-bold text-[#174047] mb-2">No Tests Selected</h2>
//           <p className="text-[#5c878f] mb-4">Please select tests before booking.</p>
//           <Link 
//             to={`/labs/${lab.id}`} 
//             className="inline-block bg-[#2c6774] text-white px-6 py-3 rounded-lg hover:bg-[#174047] transition-colors"
//           >
//             Select Tests
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button 
//             onClick={() => navigate(-1)}
//             className="flex items-center text-[#2c6774] hover:text-[#174047] mb-4 transition-colors"
//           >
//             <FaArrowLeft className="mr-2" />
//             Back
//           </button>
          
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-[#174047]">Book Your Lab Test</h1>
//               <p className="text-[#5c878f] mt-2">Complete your booking by filling the details below</p>
//             </div>
//             <div className="text-right">
//               <div className="text-sm text-[#5c878f]">Need Help?</div>
//               <div className="font-semibold text-[#2c6774]">1-800-MARHAM</div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Booking Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <div className="flex items-center gap-4 mb-6">
//                 <img
//                   src={lab.logo}
//                   alt={lab.name}
//                   className="w-16 h-16 object-contain rounded-lg border-2 border-[#2c6774]"
//                 />
//                 <div>
//                   <h2 className="text-xl font-bold text-[#174047]">{lab.name}</h2>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span className="inline-block px-3 py-1 bg-[#2c6774] text-white rounded-full text-sm font-semibold">
//                       {lab.discount}% Discount
//                     </span>
//                     <span className="text-sm text-[#5c878f]">⭐ {lab.rating || "4.5"}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Selected Tests */}
//               <div className="border-t pt-6">
//                 <h3 className="text-lg font-semibold text-[#174047] mb-4 flex items-center">
//                   <FaCheckCircle className="text-[#2c6774] mr-2" />
//                   Selected Tests ({selectedTestDetails.length})
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedTestDetails.map(test => (
//                     <div key={test.id} className="flex items-center justify-between p-3 bg-[#9fbfc5] rounded-lg">
//                       <div className="flex-1">
//                         <h4 className="font-medium text-[#174047]">{test.name}</h4>
//                         <p className="text-sm text-[#5c878f]">{test.description || "Standard diagnostic test"}</p>
//                       </div>
//                       <div className="text-right">
//                         <div className="flex items-center gap-2">
//                           {test.discount > 0 && (
//                             <span className="text-sm text-[#5c878f] line-through">Rs. {test.price}</span>
//                           )}
//                           <span className="font-bold text-[#2c6774]">
//                             Rs. {test.price - (test.price * test.discount) / 100}
//                           </span>
//                         </div>
//                         {test.discount > 0 && (
//                           <span className="text-xs text-white bg-[#2c6774] px-2 py-1 rounded">
//                             {test.discount}% OFF
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Quantity Selector */}
//                 <div className="flex items-center justify-between mt-6 pt-6 border-t">
//                   <div className="flex items-center gap-4">
//                     <span className="font-semibold text-[#174047]">Quantity:</span>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setTestQty(q => Math.max(1, q - 1))}
//                         className="w-8 h-8 flex items-center justify-center border border-[#2c6774] rounded text-[#2c6774] hover:bg-[#2c6774] hover:text-white transition-colors"
//                         type="button"
//                         disabled={testQty <= 1}
//                       >
//                         -
//                       </button>
//                       <span className="w-12 text-center border border-[#2c6774] rounded py-1 text-[#174047]">{testQty}</span>
//                       <button
//                         onClick={() => setTestQty(q => q + 1)}
//                         className="w-8 h-8 flex items-center justify-center border border-[#2c6774] rounded text-[#2c6774] hover:bg-[#2c6774] hover:text-white transition-colors"
//                         type="button"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Form */}
//             <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center">
//                 <FaUser className="text-[#2c6774] mr-3" />
//                 Patient & Booking Details
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Patient Name */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="patientName" className="b mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaUser className="text-[#2c6774] mr-2" />
//                     Patient's Full Name *
//                   </label>
//                   <input
//                     id="patientName"
//                     type="text"
//                     value={patientName}
//                     onChange={(e) => setPatientName(e.target.value)}
//                     placeholder="Enter patient's full name"
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.patientName ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   />
//                   {formErrors.patientName && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.patientName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Age and Gender */}
//                 <div>
//                   <label htmlFor="age" className="block mb-2 font-semibold text-[#174047]">
//                     Age *
//                   </label>
//                   <input
//                     id="age"
//                     type="number"
//                     value={age}
//                     min="0"
//                     max="120"
//                     onChange={(e) => setAge(e.target.value)}
//                     placeholder="Enter age"
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.age ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   />
//                   {formErrors.age && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.age}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="gender" className=" mb-2 font-semibold text-[#174047]">
//                     Gender *
//                   </label>
//                   <select
//                     id="gender"
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.gender ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {formErrors.gender && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.gender}
//                     </p>
//                   )}
//                 </div>

//                 {/* Contact Information */}
//                 <div>
//                   <label htmlFor="phone" className="mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaPhone className="text-[#2c6774] mr-2" />
//                     Phone Number *
//                   </label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="Enter phone number"
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.phone ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   />
//                   {formErrors.phone && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.phone}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaEnvelope className="text-[#2c6774] mr-2" />
//                     Email Address *
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter email address"
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.email ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   />
//                   {formErrors.email && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Address */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="address" className=" mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaHome className="text-[#2c6774] mr-2" />
//                     Address
//                   </label>
//                   <textarea
//                     id="address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     placeholder="Enter your complete address"
//                     rows="3"
//                     className="w-full border border-[#5c878f] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                   />
//                 </div>

//                 {/* Lab City */}
//                 <div>
//                   <label htmlFor="labCity" className=" mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaMapMarkerAlt className="text-[#2c6774] mr-2" />
//                     Select Lab City *
//                   </label>
//                   <select
//                     id="labCity"
//                     value={labCity}
//                     onChange={(e) => setLabCity(e.target.value)}
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.labCity ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   >
//                     <option value="">Choose Lab City</option>
//                     {cities.map((city) => (
//                       <option key={city} value={city}>{city}</option>
//                     ))}
//                   </select>
//                   {formErrors.labCity && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.labCity}
//                     </p>
//                   )}
//                 </div>

//                 {/* Booking Date */}
//                 <div>
//                   <label htmlFor="bookingDate" className="mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaCalendarAlt className="text-[#2c6774] mr-2" />
//                     Preferred Date *
//                   </label>
//                   <input
//                     id="bookingDate"
//                     type="date"
//                     value={bookingDate}
//                     min={new Date().toISOString().split('T')[0]}
//                     onChange={(e) => setBookingDate(e.target.value)}
//                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
//                       formErrors.bookingDate ? 'border-red-500' : 'border-[#5c878f]'
//                     }`}
//                   />
//                   {formErrors.bookingDate && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.bookingDate}
//                     </p>
//                   )}
//                 </div>

//                 {/* Booking Time */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="bookingTime" className="mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaClock className="text-[#2c6774] mr-2" />
//                     Available Time Slots *
//                     {isLoadingSlots && (
//                       <span className="ml-2 text-sm text-[#5c878f]">Loading slots...</span>
//                     )}
//                   </label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                     {availableSlots.map(slot => (
//                       <button
//                         key={slot}
//                         type="button"
//                         onClick={() => setBookingTime(slot)}
//                         className={`p-3 border rounded-lg text-center transition-colors ${
//                           bookingTime === slot 
//                             ? 'bg-[#2c6774] text-white border-[#2c6774]' 
//                             : 'border-[#5c878f] text-[#174047] hover:bg-[#9fbfc5]'
//                         }`}
//                       >
//                         {slot}
//                       </button>
//                     ))}
//                     {availableSlots.length === 0 && !isLoadingSlots && labCity && bookingDate && (
//                       <div className="col-span-full text-center py-4 text-[#5c878f]">
//                         No slots available for selected date/city. Please try another date.
//                       </div>
//                     )}
//                     {!labCity || !bookingDate ? (
//                       <div className="col-span-full text-center py-4 text-[#5c878f]">
//                         Please select a city and date to see available slots
//                       </div>
//                     ) : null}
//                   </div>
//                   {formErrors.bookingTime && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <IoIosAlert className="mr-1" />
//                       {formErrors.bookingTime}
//                     </p>
//                   )}
//                 </div>

//                 {/* Special Instructions */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="specialInstructions" className="block mb-2 font-semibold text-[#174047]">
//                     Special Instructions (Optional)
//                   </label>
//                   <textarea
//                     id="specialInstructions"
//                     value={specialInstructions}
//                     onChange={(e) => setSpecialInstructions(e.target.value)}
//                     placeholder="Any special requirements or instructions..."
//                     rows="3"
//                     className="w-full border border-[#5c878f] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                   />
//                 </div>

//                 {/* Prescription Upload */}
//                 <div className="md:col-span-2">
//                   <label className="mb-2 font-semibold text-[#174047] flex items-center">
//                     <FaFileMedical className="text-[#2c6774] mr-2" />
//                     Attach Prescription (Optional)
//                   </label>
//                   <div className="border-2 border-dashed border-[#5c878f] rounded-lg p-6 text-center hover:border-[#2c6774] transition-colors">
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                       className="hidden"
//                       id="prescriptionFile"
//                     />
//                     <label htmlFor="prescriptionFile" className="cursor-pointer">
//                       <div className="text-[#2c6774] mb-2">
//                         <FaFileMedical className="w-12 h-12 mx-auto" />
//                       </div>
//                       <p className="text-[#174047] mb-1">Click to upload prescription</p>
//                       <p className="text-sm text-[#5c878f]">PDF, JPG, PNG, DOC (Max 5MB)</p>
//                     </label>
//                   </div>
//                   {prescriptionFile && (
//                     <div className="mt-3 flex items-center justify-between bg-[#2c6774] bg-opacity-10 border border-[#2c6774] rounded-lg p-3">
//                       <div className="flex items-center gap-3">
//                         <IoIosCheckmarkCircle className="text-[#2c6774] text-xl" />
//                         <span className="text-[#174047] font-medium">{prescriptionFile.name}</span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setPrescriptionFile(null)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-8 pt-6 border-t">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full bg-[#2c6774] hover:bg-[#174047] text-white font-bold py-4 rounded-lg transition-colors ${
//                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Processing Booking...
//                     </div>
//                   ) : (
//                     `Confirm Booking - Rs. ${totalPrice.toFixed(0)}`
//                   )}
//                 </button>
//                 <p className="text-center text-sm text-[#5c878f] mt-3">
//                   By confirming, you agree to our terms and conditions
//                 </p>
//               </div>
//             </form>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
//               <h3 className="text-lg font-bold text-[#174047] mb-4 flex items-center">
//                 <FaInfoCircle className="text-[#2c6774] mr-2" />
//                 Order Summary
//               </h3>
              
//               {/* Lab Info */}
//               <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#5c878f]">
//                 <img
//                   src={lab.logo}
//                   alt={lab.name}
//                   className="w-12 h-12 object-contain rounded border border-[#2c6774]"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-[#174047]">{lab.name}</h4>
//                   <p className="text-sm text-[#5c878f]">{labCity || "Select city"}</p>
//                 </div>
//               </div>

//               {/* Tests List */}
//               <div className="mb-4 pb-4 border-b border-[#5c878f]">
//                 <h4 className="font-semibold text-[#174047] mb-2">Tests ({selectedTestDetails.length})</h4>
//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {selectedTestDetails.map(test => (
//                     <div key={test.id} className="flex justify-between items-start text-sm">
//                       <span className="flex-1 pr-2 text-[#174047]">{test.name}</span>
//                       <span className="font-medium text-[#2c6774] whitespace-nowrap">
//                         Rs. {(test.price - (test.price * test.discount) / 100).toFixed(0)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-[#174047]">Subtotal</span>
//                   <span className="text-[#174047]">Rs. {totalOriginalPrice.toFixed(0)}</span>
//                 </div>
//                 {totalDiscount > 0 && (
//                   <div className="flex justify-between text-sm text-[#2c6774]">
//                     <span>Discount</span>
//                     <span>-Rs. {totalDiscount.toFixed(0)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-sm">
//                   <span className="text-[#174047]">Quantity</span>
//                   <span className="text-[#174047]">{testQty}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#5c878f]">
//                   <span className="text-[#174047]">Total Amount</span>
//                   <span className="text-[#2c6774]">Rs. {totalPrice.toFixed(0)}</span>
//                 </div>
//               </div>

//               {/* Additional Info */}
//               <div className=" bg-opacity-10 border border-[#2c6774] rounded-lg p-4">
//                 <h4 className="font-semibold text-[#2c6774] mb-2 flex items-center">
//                   <FaInfoCircle className="mr-2" />
//                   What to Bring
//                 </h4>
//                 <ul className="text-sm text-[#174047] space-y-1">
//                   <li className="flex items-center">
//                     <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
//                     Valid ID Proof
//                   </li>
//                   <li className="flex items-center">
//                     <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
//                     Previous reports (if any)
//                   </li>
//                   <li className="flex items-center">
//                     <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
//                     Doctor's prescription
//                   </li>
//                 </ul>
//               </div>

//               {/* Support Info */}
//               <div className="mt-4 text-center text-sm text-[#5c878f]">
//                 <p>Need help? Call us at</p>
//                 <p className="font-semibold text-[#2c6774]">0300-0000000</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaPhone, 
  FaEnvelope, 
  FaHome,
  FaFileMedical,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowLeft,
  FaInfoCircle
} from "react-icons/fa";
import { 
  IoIosCheckmarkCircle,
  IoIosAlert
} from "react-icons/io";

export default function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // API Base URL - same as your LabDetail component
  const API_BASE = "http://localhost:5000/api";

  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [cities, setCities] = useState([]);
  
  const selectedTests = location.state?.selectedTests || [];
  const selectedTestDetails = tests.filter(t => selectedTests.includes(t._id));

  // Form states
  const [patientName, setPatientName] = useState("");
  const [labCity, setLabCity] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [testQty, setTestQty] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [apiError, setApiError] = useState("");

  // Fetch lab and tests data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lab details
        const labRes = await axios.get(`${API_BASE}/labs/${id}`);
        setLab(labRes.data);
        
        // Fetch tests for this lab
        const testsRes = await axios.get(`${API_BASE}/tests/lab/${id}`);
        setTests(Array.isArray(testsRes.data) ? testsRes.data : []);
        
        // Fetch cities (you might need to create this API endpoint)
        try {
          const citiesRes = await axios.get(`${API_BASE}/cities`);
          if (Array.isArray(citiesRes.data)) {
            setCities(citiesRes.data);
          }
        } catch (citiesError) {
          // Fallback cities if API fails
          setCities([
            "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
            "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setApiError("Failed to load lab data. Please try again.");
      }
    };

    fetchData();
  }, [id]);

  // Set minimum booking date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setBookingDate(today);
  }, []);

  // Fetch available slots when city or date changes
  useEffect(() => {
    if (labCity && bookingDate && lab) {
      fetchAvailableSlots();
    } else {
      setAvailableSlots([]);
      setBookingTime("");
    }
  }, [labCity, bookingDate, lab]);

  const fetchAvailableSlots = async () => {
    if (!lab || !labCity || !bookingDate) return;
    
    setIsLoadingSlots(true);
    setBookingTime("");
    
    try {
      // Call API to get available slots
      const response = await axios.get(`${API_BASE}/slots/available`, {
        params: {
          labId: lab._id,
          city: labCity,
          date: bookingDate
        }
      });
      
      if (response.data.success && Array.isArray(response.data.slots)) {
        setAvailableSlots(response.data.slots);
      } else {
        // Fallback to default slots if API returns no data
        const defaultSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
        setAvailableSlots(defaultSlots);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      // Use fallback slots
      const fallbackSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
      setAvailableSlots(fallbackSlots);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  // Calculate total price
  const calculateDiscountedPrice = (price, discount) => {
    const p = Number(price) || 0;
    const d = Number(discount) || 0;
    if (d <= 0) return Math.round(p);
    return Math.round(p - (p * d) / 100);
  };

  const totalPrice = selectedTestDetails.reduce((sum, test) => {
    return sum + calculateDiscountedPrice(test.price, test.discount);
  }, 0) * testQty;

  const totalOriginalPrice = selectedTestDetails.reduce((sum, test) => {
    return sum + (Number(test.price) || 0);
  }, 0) * testQty;

  const totalDiscount = totalOriginalPrice - totalPrice;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    setPrescriptionFile(file);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!patientName.trim()) errors.patientName = "Patient name is required";
    if (!labCity.trim()) errors.labCity = "Please select a lab city";
    if (!age.trim()) errors.age = "Age is required";
    if (age && (age < 0 || age > 120)) errors.age = "Please enter a valid age";
    if (!gender) errors.gender = "Please select gender";
    if (!phone.trim()) errors.phone = "Phone number is required";
    if (phone && !/^\d{10,15}$/.test(phone)) errors.phone = "Please enter a valid phone number";
    if (!email.trim()) errors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email";
    if (!bookingDate) errors.bookingDate = "Booking date is required";
    if (!bookingTime) errors.bookingTime = "Please select a time slot";
    if (availableSlots.length === 0 && labCity && bookingDate) errors.bookingTime = "No slots available for selected city and date";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      // Prepare booking data
      const bookingData = {
        labId: lab._id,
        labName: lab.name,
        tests: selectedTestDetails.map(t => ({
          testId: t._id,
          name: t.name,
          price: t.price,
          discount: t.discount,
          discountedPrice: calculateDiscountedPrice(t.price, t.discount)
        })),
        quantity: testQty,
        patientDetails: {
          name: patientName,
          age,
          gender,
          phone,
          email,
          address
        },
        bookingDetails: {
          city: labCity,
          date: bookingDate,
          time: bookingTime,
          specialInstructions
        },
        payment: {
          originalPrice: totalOriginalPrice,
          discount: totalDiscount,
          finalPrice: totalPrice
        }
      };

      // If there's a prescription file, upload it first
      let prescriptionUrl = "";
      if (prescriptionFile) {
        const formData = new FormData();
        formData.append('prescription', prescriptionFile);
        formData.append('labId', lab._id);
        
        const uploadRes = await axios.post(`${API_BASE}/upload/prescription`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (uploadRes.data.url) {
          prescriptionUrl = uploadRes.data.url;
        }
      }

      // Add prescription URL to booking data
      if (prescriptionUrl) {
        bookingData.prescriptionUrl = prescriptionUrl;
      }

      // Submit booking to API
      const bookingRes = await axios.post(`${API_BASE}/bookings`, bookingData);
      
      if (bookingRes.data.success) {
        const bookingDetails = {
          ...bookingRes.data.booking,
          bookingId: bookingRes.data.bookingId || `BK${Date.now().toString().slice(-8)}`,
          lab: lab,
          selectedTests: selectedTestDetails
        };

        // Store in localStorage (optional)
        const existingBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
        existingBookings.push(bookingDetails);
        localStorage.setItem('labBookings', JSON.stringify(existingBookings));

        // Clear local storage selection for this lab
        localStorage.removeItem(`selectedTests_lab_${id}`);

        alert(`
          Booking Confirmed!
          
          Booking ID: ${bookingDetails.bookingId}
          Lab: ${lab.name}
          Test(s): ${selectedTestDetails.map(t => t.name).join(", ")}
          Quantity: ${testQty}
          Patient: ${patientName}
          Date: ${new Date(bookingDate).toLocaleDateString()} at ${bookingTime}
          City: ${labCity}
          
          Total Amount: Rs. ${totalPrice.toFixed(0)}
          
          Thank you for your booking!
        `);

        navigate("/booking-confirmation", { 
          state: { bookingDetails } 
        });

      } else {
        throw new Error(bookingRes.data.message || "Booking failed");
      }

    } catch (error) {
      console.error("Booking error:", error);
      setApiError(error.response?.data?.message || error.message || "Booking failed. Please try again.");
      
      // Show error alert
      alert(`Booking failed: ${error.response?.data?.message || error.message || "Please try again."}`);
      
    } finally {
      setIsLoading(false);
    }
  };

  if (!lab) {
    return (
      <div className="min-h-screen bg-[#9fbfc5] flex items-center justify-center">
        <div className="text-center">
          {/* <div className="text-[#2c6774] text-6xl mb-4"></div> */}
          <h2 className="text-2xl font-bold text-[#174047] mb-2">Loading...</h2>
          <p className="text-[#5c878f] mb-4">Please wait while we load lab details</p>
        </div>
      </div>
    );
  }

  if (selectedTestDetails.length === 0) {
    return (
      <div className="min-h-screen bg-[#9fbfc5] flex items-center justify-center">
        <div className="text-center">
          {/* <div className="text-[#2c6774] text-6xl mb-4"></div> */}
          <h2 className="text-2xl font-bold text-[#174047] mb-2">No Tests Selected</h2>
          <p className="text-[#5c878f] mb-4">Please select tests before booking.</p>
          <Link 
            to={`/labs/${lab._id}`} 
            className="inline-block bg-[#2c6774] text-white px-6 py-3 rounded-lg hover:bg-[#174047] transition-colors"
          >
            Select Tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[#2c6774] hover:text-[#174047] mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#174047]">Book Your Lab Test</h1>
              <p className="text-[#5c878f] mt-2">Complete your booking by filling the details below</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#5c878f]">Need Help?</div>
              <div className="font-semibold text-[#2c6774]">1-800-MARHAM</div>
            </div>
          </div>
        </div>

        {/* API Error Display */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <FaExclamationTriangle className="mr-3" />
            <span>{apiError}</span>
            <button 
              onClick={() => setApiError("")} 
              className="ml-auto text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={`http://localhost:5000/uploads/${lab.logo}`}
                  alt={lab.name}
                  className="w-16 h-16 object-contain rounded-lg border-2 border-[#2c6774]"
                />
                <div>
                  <h2 className="text-xl font-bold text-[#174047]">{lab.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block px-3 py-1 bg-[#2c6774] text-white rounded-full text-sm font-semibold">
                      {lab.discount || 0}% Discount
                    </span>
                    <span className="text-sm text-[#5c878f]">⭐ {lab.rating || "4.5"}</span>
                  </div>
                </div>
              </div>

              {/* Selected Tests */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-[#174047] mb-4 flex items-center">
                  <FaCheckCircle className="text-[#2c6774] mr-2" />
                  Selected Tests ({selectedTestDetails.length})
                </h3>
                <div className="space-y-3">
                  {selectedTestDetails.map(test => {
                    const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
                    return (
                      <div key={test._id} className="flex items-center justify-between p-3 bg-[#9fbfc5] rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#174047]">{test.name}</h4>
                          <p className="text-sm text-[#5c878f]">{test.description || "Standard diagnostic test"}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {test.discount > 0 && (
                              <span className="text-sm text-[#5c878f] line-through">Rs. {test.price}</span>
                            )}
                            <span className="font-bold text-[#2c6774]">
                              Rs. {discountedPrice}
                            </span>
                          </div>
                          {test.discount > 0 && (
                            <span className="text-xs text-white bg-[#2c6774] px-2 py-1 rounded">
                              {test.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-[#174047]">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTestQty(q => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center border border-[#2c6774] rounded text-[#2c6774] hover:bg-[#2c6774] hover:text-white transition-colors"
                        type="button"
                        disabled={testQty <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center border border-[#2c6774] rounded py-1 text-[#174047]">{testQty}</span>
                      <button
                        onClick={() => setTestQty(q => q + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[#2c6774] rounded text-[#2c6774] hover:bg-[#2c6774] hover:text-white transition-colors"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center">
                <FaUser className="text-[#2c6774] mr-3" />
                Patient & Booking Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div className="md:col-span-2">
                  <label htmlFor="patientName" className="b mb-2 font-semibold text-[#174047] flex items-center">
                    <FaUser className="text-[#2c6774] mr-2" />
                    Patient's Full Name *
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient's full name"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.patientName ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  />
                  {formErrors.patientName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.patientName}
                    </p>
                  )}
                </div>

                {/* Age and Gender */}
                <div>
                  <label htmlFor="age" className="block mb-2 font-semibold text-[#174047]">
                    Age *
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={age}
                    min="0"
                    max="120"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.age ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  />
                  {formErrors.age && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className=" mb-2 font-semibold text-[#174047]">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.gender ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.gender}
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div>
                  <label htmlFor="phone" className="mb-2 font-semibold text-[#174047] flex items-center">
                    <FaPhone className="text-[#2c6774] mr-2" />
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.phone ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 font-semibold text-[#174047] flex items-center">
                    <FaEnvelope className="text-[#2c6774] mr-2" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.email ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className=" mb-2 font-semibold text-[#174047] flex items-center">
                    <FaHome className="text-[#2c6774] mr-2" />
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows="3"
                    className="w-full border border-[#5c878f] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                  />
                </div>

                {/* Lab City */}
                <div>
                  <label htmlFor="labCity" className=" mb-2 font-semibold text-[#174047] flex items-center">
                    <FaMapMarkerAlt className="text-[#2c6774] mr-2" />
                    Select Lab City *
                  </label>
                  <select
                    id="labCity"
                    value={labCity}
                    onChange={(e) => setLabCity(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.labCity ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  >
                    <option value="">Choose Lab City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {formErrors.labCity && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.labCity}
                    </p>
                  )}
                </div>

                {/* Booking Date */}
                <div>
                  <label htmlFor="bookingDate" className="mb-2 font-semibold text-[#174047] flex items-center">
                    <FaCalendarAlt className="text-[#2c6774] mr-2" />
                    Preferred Date *
                  </label>
                  <input
                    id="bookingDate"
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      formErrors.bookingDate ? 'border-red-500' : 'border-[#5c878f]'
                    }`}
                  />
                  {formErrors.bookingDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.bookingDate}
                    </p>
                  )}
                </div>

                {/* Booking Time */}
                <div className="md:col-span-2">
                  <label htmlFor="bookingTime" className="mb-2 font-semibold text-[#174047] flex items-center">
                    <FaClock className="text-[#2c6774] mr-2" />
                    Available Time Slots *
                    {isLoadingSlots && (
                      <span className="ml-2 text-sm text-[#5c878f]">
                        <span className="inline-block w-3 h-3 border-2 border-[#2c6774] border-t-transparent rounded-full animate-spin mr-1"></span>
                        Loading slots...
                      </span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingTime(slot)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          bookingTime === slot 
                            ? 'bg-[#2c6774] text-white border-[#2c6774]' 
                            : 'border-[#5c878f] text-[#174047] hover:bg-[#9fbfc5]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                    {availableSlots.length === 0 && !isLoadingSlots && labCity && bookingDate && (
                      <div className="col-span-full text-center py-4 text-[#5c878f]">
                        No slots available for selected date/city. Please try another date.
                      </div>
                    )}
                    {!labCity || !bookingDate ? (
                      <div className="col-span-full text-center py-4 text-[#5c878f]">
                        Please select a city and date to see available slots
                      </div>
                    ) : null}
                  </div>
                  {formErrors.bookingTime && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <IoIosAlert className="mr-1" />
                      {formErrors.bookingTime}
                    </p>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="md:col-span-2">
                  <label htmlFor="specialInstructions" className="block mb-2 font-semibold text-[#174047]">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="specialInstructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requirements or instructions..."
                    rows="3"
                    className="w-full border border-[#5c878f] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                  />
                </div>

                {/* Prescription Upload */}
                <div className="md:col-span-2">
                  <label className="mb-2 font-semibold text-[#174047] flex items-center">
                    <FaFileMedical className="text-[#2c6774] mr-2" />
                    Attach Prescription (Optional)
                  </label>
                  <div className="border-2 border-dashed border-[#5c878f] rounded-lg p-6 text-center hover:border-[#2c6774] transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                      id="prescriptionFile"
                    />
                    <label htmlFor="prescriptionFile" className="cursor-pointer">
                      <div className="text-[#2c6774] mb-2">
                        <FaFileMedical className="w-12 h-12 mx-auto" />
                      </div>
                      <p className="text-[#174047] mb-1">Click to upload prescription</p>
                      <p className="text-sm text-[#5c878f]">PDF, JPG, PNG, DOC (Max 5MB)</p>
                    </label>
                  </div>
                  {prescriptionFile && (
                    <div className="mt-3 flex items-center justify-between bg-[#2c6774] bg-opacity-10 border border-[#2c6774] rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <IoIosCheckmarkCircle className="text-[#2c6774] text-xl" />
                        <span className="text-[#174047] font-medium">{prescriptionFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrescriptionFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t">
                <button
                  type="submit"
                  disabled={isLoading || isLoadingSlots}
                  className={`w-full bg-[#2c6774] hover:bg-[#174047] text-white font-bold py-4 rounded-lg transition-colors ${
                    isLoading || isLoadingSlots ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Booking...
                    </div>
                  ) : (
                    `Confirm Booking - Rs. ${totalPrice.toFixed(0)}`
                  )}
                </button>
                <p className="text-center text-sm text-[#5c878f] mt-3">
                  By confirming, you agree to our terms and conditions
                </p>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-[#174047] mb-4 flex items-center">
                <FaInfoCircle className="text-[#2c6774] mr-2" />
                Order Summary
              </h3>
              
              {/* Lab Info */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#5c878f]">
                <img
                  src={`http://localhost:5000/uploads/${lab.logo}`}
                  alt={lab.name}
                  className="w-12 h-12 object-contain rounded border border-[#2c6774]"
                />
                <div>
                  <h4 className="font-semibold text-[#174047]">{lab.name}</h4>
                  <p className="text-sm text-[#5c878f]">{labCity || "Select city"}</p>
                </div>
              </div>

              {/* Tests List */}
              <div className="mb-4 pb-4 border-b border-[#5c878f]">
                <h4 className="font-semibold text-[#174047] mb-2">Tests ({selectedTestDetails.length})</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedTestDetails.map(test => {
                    const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
                    return (
                      <div key={test._id} className="flex justify-between items-start text-sm">
                        <span className="flex-1 pr-2 text-[#174047]">{test.name}</span>
                        <span className="font-medium text-[#2c6774] whitespace-nowrap">
                          Rs. {discountedPrice}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#174047]">Subtotal</span>
                  <span className="text-[#174047]">Rs. {totalOriginalPrice.toFixed(0)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm text-[#2c6774]">
                    <span>Discount</span>
                    <span>-Rs. {totalDiscount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#174047]">Quantity</span>
                  <span className="text-[#174047]">{testQty}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#5c878f]">
                  <span className="text-[#174047]">Total Amount</span>
                  <span className="text-[#2c6774]">Rs. {totalPrice.toFixed(0)}</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className=" bg-opacity-10 border border-[#2c6774] rounded-lg p-4">
                <h4 className="font-semibold text-[#2c6774] mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  What to Bring
                </h4>
                <ul className="text-sm text-[#174047] space-y-1">
                  <li className="flex items-center">
                    <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
                    Valid ID Proof
                  </li>
                  <li className="flex items-center">
                    <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
                    Previous reports (if any)
                  </li>
                  <li className="flex items-center">
                    <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
                    Doctor's prescription
                  </li>
                </ul>
              </div>

              {/* Support Info */}
              <div className="mt-4 text-center text-sm text-[#5c878f]">
                <p>Need help? Call us at</p>
                <p className="font-semibold text-[#2c6774]">0300-0000000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}