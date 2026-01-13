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
//   const [phone, setPhone] = useState("");y
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




// // import React, { useState, useEffect } from "react";
// // import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// // import axios from "axios";
// // import { 
// //   FaUser, 
// //   FaMapMarkerAlt, 
// //   FaCalendarAlt, 
// //   FaClock, 
// //   FaPhone, 
// //   FaEnvelope, 
// //   FaHome,
// //   FaFileMedical,
// //   FaCheckCircle,
// //   FaExclamationTriangle,
// //   FaArrowLeft,
// //   FaInfoCircle
// // } from "react-icons/fa";
// // import { 
// //   IoIosCheckmarkCircle,
// //   IoIosAlert
// // } from "react-icons/io";

// // export default function BookingPage() {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const API_BASE = "http://localhost:5000/api";

// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [cities, setCities] = useState([]);
  
// //   const selectedTests = location.state?.selectedTests || [];
// //   const selectedTestDetails = tests.filter(t => selectedTests.includes(t._id));

// //   // Form states
// //   const [patientName, setPatientName] = useState("");
// //   const [labCity, setLabCity] = useState("");
// //   const [age, setAge] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [bookingDate, setBookingDate] = useState("");
// //   const [bookingTime, setBookingTime] = useState("");
// //   const [prescriptionFile, setPrescriptionFile] = useState(null);
// //   const [testQty, setTestQty] = useState(1);
// //   const [specialInstructions, setSpecialInstructions] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [formErrors, setFormErrors] = useState({});
// //   const [availableSlots, setAvailableSlots] = useState([]);
// //   const [isLoadingSlots, setIsLoadingSlots] = useState(false);
// //   const [apiError, setApiError] = useState("");

// //   // Fetch lab and tests data on component mount
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Fetch lab details
// //         const labRes = await axios.get(`${API_BASE}/labs/${id}`);
// //         setLab(labRes.data);
        
// //         // Fetch tests for this lab
// //         const testsRes = await axios.get(`${API_BASE}/tests/lab/${id}`);
// //         setTests(Array.isArray(testsRes.data) ? testsRes.data : []);
        
// //         // Fetch cities (you might need to create this API endpoint)
// //         try {
// //           const citiesRes = await axios.get(`${API_BASE}/cities`);
// //           if (Array.isArray(citiesRes.data)) {
// //             setCities(citiesRes.data);
// //           }
// //         } catch (citiesError) {
// //           // Fallback cities if API fails
// //           setCities([
// //             "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
// //             "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
// //           ]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setApiError("Failed to load lab data. Please try again.");
// //       }
// //     };

// //     fetchData();
// //   }, [id]);

// //   // Set minimum booking date to today
// //   useEffect(() => {
// //     const today = new Date().toISOString().split('T')[0];
// //     setBookingDate(today);
// //   }, []);

// //   // Fetch available slots when city or date changes
// //   useEffect(() => {
// //     if (labCity && bookingDate && lab) {
// //       fetchAvailableSlots();
// //     } else {
// //       setAvailableSlots([]);
// //       setBookingTime("");
// //     }
// //   }, [labCity, bookingDate, lab]);

// //   const fetchAvailableSlots = async () => {
// //     if (!lab || !labCity || !bookingDate) return;
    
// //     setIsLoadingSlots(true);
// //     setBookingTime("");
    
// //     try {
// //       // Call API to get available slots
// //       const response = await axios.get(`${API_BASE}/slots/available`, {
// //         params: {
// //           labId: lab._id,
// //           city: labCity,
// //           date: bookingDate
// //         }
// //       });
      
// //       if (response.data.success && Array.isArray(response.data.slots)) {
// //         setAvailableSlots(response.data.slots);
// //       } else {
// //         // Fallback to default slots if API returns no data
// //         const defaultSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
// //         setAvailableSlots(defaultSlots);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching slots:", error);
// //       // Use fallback slots
// //       const fallbackSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
// //       setAvailableSlots(fallbackSlots);
// //     } finally {
// //       setIsLoadingSlots(false);
// //     }
// //   };

// //   // Calculate total price
// //   const calculateDiscountedPrice = (price, discount) => {
// //     const p = Number(price) || 0;
// //     const d = Number(discount) || 0;
// //     if (d <= 0) return Math.round(p);
// //     return Math.round(p - (p * d) / 100);
// //   };

// //   const totalPrice = selectedTestDetails.reduce((sum, test) => {
// //     return sum + calculateDiscountedPrice(test.price, test.discount);
// //   }, 0) * testQty;

// //   const totalOriginalPrice = selectedTestDetails.reduce((sum, test) => {
// //     return sum + (Number(test.price) || 0);
// //   }, 0) * testQty;

// //   const totalDiscount = totalOriginalPrice - totalPrice;

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file && file.size > 5 * 1024 * 1024) {
// //       alert("File size should be less than 5MB");
// //       return;
// //     }
// //     setPrescriptionFile(file);
// //   };

// //   const validateForm = () => {
// //     const errors = {};
    
// //     if (!patientName.trim()) errors.patientName = "Patient name is required";
// //     if (!labCity.trim()) errors.labCity = "Please select a lab city";
// //     if (!age.trim()) errors.age = "Age is required";
// //     if (age && (age < 0 || age > 120)) errors.age = "Please enter a valid age";
// //     if (!gender) errors.gender = "Please select gender";
// //     if (!phone.trim()) errors.phone = "Phone number is required";
// //     if (phone && !/^\d{10,15}$/.test(phone)) errors.phone = "Please enter a valid phone number";
// //     if (!email.trim()) errors.email = "Email is required";
// //     if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email";
// //     if (!bookingDate) errors.bookingDate = "Booking date is required";
// //     if (!bookingTime) errors.bookingTime = "Please select a time slot";
// //     if (availableSlots.length === 0 && labCity && bookingDate) errors.bookingTime = "No slots available for selected city and date";

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       return;
// //     }

// //     setIsLoading(true);
// //     setApiError("");

// //     try {
// //       // Prepare booking data
// //       const bookingData = {
// //         labId: lab._id,
// //         labName: lab.name,
// //         tests: selectedTestDetails.map(t => ({
// //           testId: t._id,
// //           name: t.name,
// //           price: t.price,
// //           discount: t.discount,
// //           discountedPrice: calculateDiscountedPrice(t.price, t.discount)
// //         })),
// //         quantity: testQty,
// //         patientDetails: {
// //           name: patientName,
// //           age,
// //           gender,
// //           phone,
// //           email,
// //           address
// //         },
// //         bookingDetails: {
// //           city: labCity,
// //           date: bookingDate,
// //           time: bookingTime,
// //           specialInstructions
// //         },
// //         payment: {
// //           originalPrice: totalOriginalPrice,
// //           discount: totalDiscount,
// //           finalPrice: totalPrice
// //         }
// //       };

// //       // If there's a prescription file, upload it first
// //       let prescriptionUrl = "";
// //       if (prescriptionFile) {
// //         const formData = new FormData();
// //         formData.append('prescription', prescriptionFile);
// //         formData.append('labId', lab._id);
        
// //         const uploadRes = await axios.post(`${API_BASE}/upload/prescription`, formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data'
// //           }
// //         });
        
// //         if (uploadRes.data.url) {
// //           prescriptionUrl = uploadRes.data.url;
// //         }
// //       }

// //       // Add prescription URL to booking data
// //       if (prescriptionUrl) {
// //         bookingData.prescriptionUrl = prescriptionUrl;
// //       }

// //       // Submit booking to API
// //       const bookingRes = await axios.post(`${API_BASE}/bookings`, bookingData);
      
// //       if (bookingRes.data.success) {
// //         const bookingDetails = {
// //           ...bookingRes.data.booking,
// //           bookingId: bookingRes.data.bookingId || `BK${Date.now().toString().slice(-8)}`,
// //           lab: lab,
// //           selectedTests: selectedTestDetails
// //         };

// //         // Store in localStorage (optional)
// //         const existingBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
// //         existingBookings.push(bookingDetails);
// //         localStorage.setItem('labBookings', JSON.stringify(existingBookings));

// //         // Clear local storage selection for this lab
// //         localStorage.removeItem(`selectedTests_lab_${id}`);

// //         alert(`
// //           Booking Confirmed!
          
// //           Booking ID: ${bookingDetails.bookingId}
// //           Lab: ${lab.name}
// //           Test(s): ${selectedTestDetails.map(t => t.name).join(", ")}
// //           Quantity: ${testQty}
// //           Patient: ${patientName}
// //           Date: ${new Date(bookingDate).toLocaleDateString()} at ${bookingTime}
// //           City: ${labCity}
          
// //           Total Amount: Rs. ${totalPrice.toFixed(0)}
          
// //           Thank you for your booking!
// //         `);

// //         navigate("/booking-confirmation", { 
// //           state: { bookingDetails } 
// //         });

// //       } else {
// //         throw new Error(bookingRes.data.message || "Booking failed");
// //       }

// //     } catch (error) {
// //       console.error("Booking error:", error);
// //       setApiError(error.response?.data?.message || error.message || "Booking failed. Please try again.");
      
// //       // Show error alert
// //       alert(`Booking failed: ${error.response?.data?.message || error.message || "Please try again."}`);
      
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   if (!lab) {
// //     return (
// //       <div className="min-h-screen bg-[#9fbfc5] flex items-center justify-center">
// //         <div className="text-center">
// //           {/* <div className="text-[#2c6774] text-6xl mb-4"></div> */}
// //           <h2 className="text-2xl font-bold text-[#174047] mb-2">Loading...</h2>
// //           <p className="text-[#5c878f] mb-4">Please wait while we load lab details</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (selectedTestDetails.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-[#9fbfc5] flex items-center justify-center">
// //         <div className="text-center">
// //           {/* <div className="text-[#2c6774] text-6xl mb-4"></div> */}
// //           <h2 className="text-2xl font-bold text-[#174047] mb-2">No Tests Selected</h2>
// //           <p className="text-[#5c878f] mb-4">Please select tests before booking.</p>
// //           <Link 
// //             to={`/labs/${lab._id}`} 
// //             className="inline-block bg-[#2c6774] text-white px-6 py-3 rounded-lg hover:bg-[#174047] transition-colors"
// //           >
// //             Select Tests
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen py-8">
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <button 
// //             onClick={() => navigate(-1)}
// //             className="flex items-center text-[#2c6774] hover:text-[#174047] mb-4 transition-colors"
// //           >
// //             <FaArrowLeft className="mr-2" />
// //             Back
// //           </button>
          
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-3xl font-bold text-[#174047]">Book Your Lab Test</h1>
// //               <p className="text-[#5c878f] mt-2">Complete your booking by filling the details below</p>
// //             </div>
// //             <div className="text-right">
// //               <div className="text-sm text-[#5c878f]">Need Help?</div>
// //               <div className="font-semibold text-[#2c6774]">1-800-MARHAM</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* API Error Display */}
// //         {apiError && (
// //           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
// //             <FaExclamationTriangle className="mr-3" />
// //             <span>{apiError}</span>
// //             <button 
// //               onClick={() => setApiError("")} 
// //               className="ml-auto text-red-700 hover:text-red-900"
// //             >
// //               ×
// //             </button>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Column - Booking Form */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
// //               <div className="flex items-center gap-4 mb-6">
// //                 <img
// //                   src={`http://localhost:5000/uploads/${lab.logo}`}
// //                   alt={lab.name}
// //                   className="w-16 h-16 object-contain rounded-lg border-2 border-[#2c6774]"
// //                 />
// //                 <div>
// //                   <h2 className="text-xl font-bold text-[#174047]">{lab.name}</h2>
// //                   <div className="flex items-center gap-2 mt-1">
// //                     <span className="inline-block px-3 py-1 bg-[#2c6774] text-white rounded-full text-sm font-semibold">
// //                       {lab.discount || 0}% Discount
// //                     </span>
// //                     <span className="text-sm text-[#5c878f]">⭐ {lab.rating || "4.5"}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Selected Tests */}
// //               <div className="border-t pt-6">
// //                 <h3 className="text-lg font-semibold text-[#174047] mb-4 flex items-center">
// //                   <FaCheckCircle className="text-[#2c6774] mr-2" />
// //                   Selected Tests ({selectedTestDetails.length})
// //                 </h3>
// //                 <div className="space-y-3">
// //                   {selectedTestDetails.map(test => {
// //                     const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
// //                     return (
// //                       <div key={test._id} className="flex items-center justify-between p-3 bg-[#9fbfc5] rounded-lg">
// //                         <div className="flex-1">
// //                           <h4 className="font-medium text-[#174047]">{test.name}</h4>
// //                           <p className="text-sm text-[#5c878f]">{test.description || "Standard diagnostic test"}</p>
// //                         </div>
// //                         <div className="text-right">
// //                           <div className="flex items-center gap-2">
// //                             {test.discount > 0 && (
// //                               <span className="text-sm text-[#5c878f] line-through">Rs. {test.price}</span>
// //                             )}
// //                             <span className="font-bold text-[#2c6774]">
// //                               Rs. {discountedPrice}
// //                             </span>
// //                           </div>
// //                           {test.discount > 0 && (
// //                             <span className="text-xs text-white bg-[#2c6774] px-2 py-1 rounded">
// //                               {test.discount}% OFF
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>

// //                 {/* Quantity Selector */}
// //                 <div className="flex items-center justify-between mt-6 pt-6 border-t">
// //                   <div className="flex items-center gap-4">
// //                     <span className="font-semibold text-[#174047]">Quantity:</span>
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => setTestQty(q => Math.max(1, q - 1))}
// //                         className="w-8 h-8 flex items-center justify-center border border-[#2c6774] rounded text-[#2c6774] hover:bg-[#2c6774] hover:text-white transition-colors"
// //                         type="button"
// //                         disabled={testQty <= 1}
// //                       >
// //                         -
// //                       </button>
// //                       <span className="w-12 text-center border border-[#2c6774] rounded py-1 text-[#174047]">{testQty}</span>
// //                       <button
// //                         onClick={() => setTestQty(q => q + 1)}
// //                         className="w-8 h-8 flex items-center justify-center border border-[#2c6774] rounded text-[#2c6774] hover:bg-[#2c6774] hover:text-white transition-colors"
// //                         type="button"
// //                       >
// //                         +
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Booking Form */}
// //             <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
// //               <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center">
// //                 <FaUser className="text-[#2c6774] mr-3" />
// //                 Patient & Booking Details
// //               </h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {/* Patient Name */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="patientName" className="b mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaUser className="text-[#2c6774] mr-2" />
// //                     Patient's Full Name *
// //                   </label>
// //                   <input
// //                     id="patientName"
// //                     type="text"
// //                     value={patientName}
// //                     onChange={(e) => setPatientName(e.target.value)}
// //                     placeholder="Enter patient's full name"
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.patientName ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   />
// //                   {formErrors.patientName && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.patientName}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Age and Gender */}
// //                 <div>
// //                   <label htmlFor="age" className="block mb-2 font-semibold text-[#174047]">
// //                     Age *
// //                   </label>
// //                   <input
// //                     id="age"
// //                     type="number"
// //                     value={age}
// //                     min="0"
// //                     max="120"
// //                     onChange={(e) => setAge(e.target.value)}
// //                     placeholder="Enter age"
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.age ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   />
// //                   {formErrors.age && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.age}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label htmlFor="gender" className=" mb-2 font-semibold text-[#174047]">
// //                     Gender *
// //                   </label>
// //                   <select
// //                     id="gender"
// //                     value={gender}
// //                     onChange={(e) => setGender(e.target.value)}
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.gender ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   >
// //                     <option value="">Select Gender</option>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //                     <option value="other">Other</option>
// //                   </select>
// //                   {formErrors.gender && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.gender}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Contact Information */}
// //                 <div>
// //                   <label htmlFor="phone" className="mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaPhone className="text-[#2c6774] mr-2" />
// //                     Phone Number *
// //                   </label>
// //                   <input
// //                     id="phone"
// //                     type="tel"
// //                     value={phone}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                     placeholder="Enter phone number"
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.phone ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   />
// //                   {formErrors.phone && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.phone}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label htmlFor="email" className="mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaEnvelope className="text-[#2c6774] mr-2" />
// //                     Email Address *
// //                   </label>
// //                   <input
// //                     id="email"
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="Enter email address"
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.email ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   />
// //                   {formErrors.email && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.email}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Address */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="address" className=" mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaHome className="text-[#2c6774] mr-2" />
// //                     Address
// //                   </label>
// //                   <textarea
// //                     id="address"
// //                     value={address}
// //                     onChange={(e) => setAddress(e.target.value)}
// //                     placeholder="Enter your complete address"
// //                     rows="3"
// //                     className="w-full border border-[#5c878f] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
// //                   />
// //                 </div>

// //                 {/* Lab City */}
// //                 <div>
// //                   <label htmlFor="labCity" className=" mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaMapMarkerAlt className="text-[#2c6774] mr-2" />
// //                     Select Lab City *
// //                   </label>
// //                   <select
// //                     id="labCity"
// //                     value={labCity}
// //                     onChange={(e) => setLabCity(e.target.value)}
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.labCity ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   >
// //                     <option value="">Choose Lab City</option>
// //                     {cities.map((city) => (
// //                       <option key={city} value={city}>{city}</option>
// //                     ))}
// //                   </select>
// //                   {formErrors.labCity && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.labCity}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Booking Date */}
// //                 <div>
// //                   <label htmlFor="bookingDate" className="mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaCalendarAlt className="text-[#2c6774] mr-2" />
// //                     Preferred Date *
// //                   </label>
// //                   <input
// //                     id="bookingDate"
// //                     type="date"
// //                     value={bookingDate}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     onChange={(e) => setBookingDate(e.target.value)}
// //                     className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
// //                       formErrors.bookingDate ? 'border-red-500' : 'border-[#5c878f]'
// //                     }`}
// //                   />
// //                   {formErrors.bookingDate && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.bookingDate}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Booking Time */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="bookingTime" className="mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaClock className="text-[#2c6774] mr-2" />
// //                     Available Time Slots *
// //                     {isLoadingSlots && (
// //                       <span className="ml-2 text-sm text-[#5c878f]">
// //                         <span className="inline-block w-3 h-3 border-2 border-[#2c6774] border-t-transparent rounded-full animate-spin mr-1"></span>
// //                         Loading slots...
// //                       </span>
// //                     )}
// //                   </label>
// //                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                     {availableSlots.map(slot => (
// //                       <button
// //                         key={slot}
// //                         type="button"
// //                         onClick={() => setBookingTime(slot)}
// //                         className={`p-3 border rounded-lg text-center transition-colors ${
// //                           bookingTime === slot 
// //                             ? 'bg-[#2c6774] text-white border-[#2c6774]' 
// //                             : 'border-[#5c878f] text-[#174047] hover:bg-[#9fbfc5]'
// //                         }`}
// //                       >
// //                         {slot}
// //                       </button>
// //                     ))}
// //                     {availableSlots.length === 0 && !isLoadingSlots && labCity && bookingDate && (
// //                       <div className="col-span-full text-center py-4 text-[#5c878f]">
// //                         No slots available for selected date/city. Please try another date.
// //                       </div>
// //                     )}
// //                     {!labCity || !bookingDate ? (
// //                       <div className="col-span-full text-center py-4 text-[#5c878f]">
// //                         Please select a city and date to see available slots
// //                       </div>
// //                     ) : null}
// //                   </div>
// //                   {formErrors.bookingTime && (
// //                     <p className="text-red-500 text-sm mt-1 flex items-center">
// //                       <IoIosAlert className="mr-1" />
// //                       {formErrors.bookingTime}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Special Instructions */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="specialInstructions" className="block mb-2 font-semibold text-[#174047]">
// //                     Special Instructions (Optional)
// //                   </label>
// //                   <textarea
// //                     id="specialInstructions"
// //                     value={specialInstructions}
// //                     onChange={(e) => setSpecialInstructions(e.target.value)}
// //                     placeholder="Any special requirements or instructions..."
// //                     rows="3"
// //                     className="w-full border border-[#5c878f] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
// //                   />
// //                 </div>

// //                 {/* Prescription Upload */}
// //                 <div className="md:col-span-2">
// //                   <label className="mb-2 font-semibold text-[#174047] flex items-center">
// //                     <FaFileMedical className="text-[#2c6774] mr-2" />
// //                     Attach Prescription (Optional)
// //                   </label>
// //                   <div className="border-2 border-dashed border-[#5c878f] rounded-lg p-6 text-center hover:border-[#2c6774] transition-colors">
// //                     <input
// //                       type="file"
// //                       onChange={handleFileChange}
// //                       accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
// //                       className="hidden"
// //                       id="prescriptionFile"
// //                     />
// //                     <label htmlFor="prescriptionFile" className="cursor-pointer">
// //                       <div className="text-[#2c6774] mb-2">
// //                         <FaFileMedical className="w-12 h-12 mx-auto" />
// //                       </div>
// //                       <p className="text-[#174047] mb-1">Click to upload prescription</p>
// //                       <p className="text-sm text-[#5c878f]">PDF, JPG, PNG, DOC (Max 5MB)</p>
// //                     </label>
// //                   </div>
// //                   {prescriptionFile && (
// //                     <div className="mt-3 flex items-center justify-between bg-[#2c6774] bg-opacity-10 border border-[#2c6774] rounded-lg p-3">
// //                       <div className="flex items-center gap-3">
// //                         <IoIosCheckmarkCircle className="text-[#2c6774] text-xl" />
// //                         <span className="text-[#174047] font-medium">{prescriptionFile.name}</span>
// //                       </div>
// //                       <button
// //                         type="button"
// //                         onClick={() => setPrescriptionFile(null)}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         Remove
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Submit Button */}
// //               <div className="mt-8 pt-6 border-t">
// //                 <button
// //                   type="submit"
// //                   disabled={isLoading || isLoadingSlots}
// //                   className={`w-full bg-[#2c6774] hover:bg-[#174047] text-white font-bold py-4 rounded-lg transition-colors ${
// //                     isLoading || isLoadingSlots ? 'opacity-50 cursor-not-allowed' : ''
// //                   }`}
// //                 >
// //                   {isLoading ? (
// //                     <div className="flex items-center justify-center gap-2">
// //                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                       Processing Booking...
// //                     </div>
// //                   ) : (
// //                     `Confirm Booking - Rs. ${totalPrice.toFixed(0)}`
// //                   )}
// //                 </button>
// //                 <p className="text-center text-sm text-[#5c878f] mt-3">
// //                   By confirming, you agree to our terms and conditions
// //                 </p>
// //               </div>
// //             </form>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
// //               <h3 className="text-lg font-bold text-[#174047] mb-4 flex items-center">
// //                 <FaInfoCircle className="text-[#2c6774] mr-2" />
// //                 Order Summary
// //               </h3>
              
// //               {/* Lab Info */}
// //               <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#5c878f]">
// //                 <img
// //                   src={`http://localhost:5000/uploads/${lab.logo}`}
// //                   alt={lab.name}
// //                   className="w-12 h-12 object-contain rounded border border-[#2c6774]"
// //                 />
// //                 <div>
// //                   <h4 className="font-semibold text-[#174047]">{lab.name}</h4>
// //                   <p className="text-sm text-[#5c878f]">{labCity || "Select city"}</p>
// //                 </div>
// //               </div>

// //               {/* Tests List */}
// //               <div className="mb-4 pb-4 border-b border-[#5c878f]">
// //                 <h4 className="font-semibold text-[#174047] mb-2">Tests ({selectedTestDetails.length})</h4>
// //                 <div className="space-y-2 max-h-60 overflow-y-auto">
// //                   {selectedTestDetails.map(test => {
// //                     const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
// //                     return (
// //                       <div key={test._id} className="flex justify-between items-start text-sm">
// //                         <span className="flex-1 pr-2 text-[#174047]">{test.name}</span>
// //                         <span className="font-medium text-[#2c6774] whitespace-nowrap">
// //                           Rs. {discountedPrice}
// //                         </span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="space-y-2 mb-4">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-[#174047]">Subtotal</span>
// //                   <span className="text-[#174047]">Rs. {totalOriginalPrice.toFixed(0)}</span>
// //                 </div>
// //                 {totalDiscount > 0 && (
// //                   <div className="flex justify-between text-sm text-[#2c6774]">
// //                     <span>Discount</span>
// //                     <span>-Rs. {totalDiscount.toFixed(0)}</span>
// //                   </div>
// //                 )}
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-[#174047]">Quantity</span>
// //                   <span className="text-[#174047]">{testQty}</span>
// //                 </div>
// //                 <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#5c878f]">
// //                   <span className="text-[#174047]">Total Amount</span>
// //                   <span className="text-[#2c6774]">Rs. {totalPrice.toFixed(0)}</span>
// //                 </div>
// //               </div>

// //               {/* Additional Info */}
// //               <div className=" bg-opacity-10 border border-[#2c6774] rounded-lg p-4">
// //                 <h4 className="font-semibold text-[#2c6774] mb-2 flex items-center">
// //                   <FaInfoCircle className="mr-2" />
// //                   What to Bring
// //                 </h4>
// //                 <ul className="text-sm text-[#174047] space-y-1">
// //                   <li className="flex items-center">
// //                     <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
// //                     Valid ID Proof
// //                   </li>
// //                   <li className="flex items-center">
// //                     <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
// //                     Previous reports (if any)
// //                   </li>
// //                   <li className="flex items-center">
// //                     <IoIosCheckmarkCircle className="text-[#2c6774] mr-2" />
// //                     Doctor's prescription
// //                   </li>
// //                 </ul>
// //               </div>

// //               {/* Support Info */}
// //               <div className="mt-4 text-center text-sm text-[#5c878f]">
// //                 <p>Need help? Call us at</p>
// //                 <p className="font-semibold text-[#2c6774]">0300-0000000</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import React, { useState, useEffect } from "react";
// // import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
// // import axios from "axios";
// // import { 
// //   FaUser, 
// //   FaMapMarkerAlt, 
// //   FaCalendarAlt, 
// //   FaClock, 
// //   FaPhone, 
// //   FaEnvelope, 
// //   FaHome,
// //   FaFileMedical,
// //   FaCheckCircle,
// //   FaExclamationTriangle,
// //   FaInfoCircle
// // } from "react-icons/fa";
// // import { 
// //   IoIosCheckmarkCircle,
// //   IoIosAlert
// // } from "react-icons/io";

// // export default function BookingPage() {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const API_BASE = "http://localhost:5000/api";

// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [cities, setCities] = useState([]);
  
// //   // 从location.state获取选中的测试，并为每个测试添加数量
// //   const initialSelectedTests = location.state?.selectedTests || [];
// //   const [selectedTestDetails, setSelectedTestDetails] = useState([]);

// //   // Form states
// //   const [patientName, setPatientName] = useState("");
// //   const [labCity, setLabCity] = useState("");
// //   const [age, setAge] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [bookingDate, setBookingDate] = useState("");
// //   const [bookingTime, setBookingTime] = useState("");
// //   const [prescriptionFile, setPrescriptionFile] = useState(null);
// //   const [specialInstructions, setSpecialInstructions] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [formErrors, setFormErrors] = useState({});
// //   const [availableSlots, setAvailableSlots] = useState([]);
// //   const [isLoadingSlots, setIsLoadingSlots] = useState(false);
// //   const [apiError, setApiError] = useState("");

// //   // 生成时间槽：从早上8点到晚上9点，每小时一个槽
// //   const generateTimeSlots = () => {
// //     const slots = [];
// //     for (let hour = 8; hour <= 21; hour++) {
// //       const timeString = hour <= 12 
// //         ? `${hour}:00 AM`
// //         : `${hour - 12}:00 PM`;
// //       slots.push(timeString);
// //     }
// //     return slots;
// //   };

// //   // Fetch lab, tests, and cities data
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Fetch lab details
// //         const labRes = await axios.get(`${API_BASE}/labs/${id}`);
// //         setLab(labRes.data);
        
// //         // Fetch tests for this lab
// //         const testsRes = await axios.get(`${API_BASE}/tests/lab/${id}`);
// //         const allTests = Array.isArray(testsRes.data) ? testsRes.data : [];
// //         setTests(allTests);
        
// //         // 初始化选中的测试，每个测试数量为1
// //         const initialSelected = allTests
// //           .filter(t => initialSelectedTests.includes(t._id))
// //           .map(test => ({
// //             ...test,
// //             quantity: 1
// //           }));
// //         setSelectedTestDetails(initialSelected);
        
// //         // Fetch cities from backend - API endpoint should be created
// //         try {
// //           const citiesRes = await axios.get(`${API_BASE}/cities`);
// //           if (Array.isArray(citiesRes.data)) {
// //             setCities(citiesRes.data);
// //           } else if (Array.isArray(citiesRes.data?.cities)) {
// //             setCities(citiesRes.data.cities);
// //           }
// //         } catch (citiesError) {
// //           console.log("Using fallback cities");
// //           // Fallback cities if API fails
// //           setCities([
// //             { _id: "1", name: "Karachi" },
// //             { _id: "2", name: "Lahore" },
// //             { _id: "3", name: "Islamabad" },
// //             { _id: "4", name: "Rawalpindi" },
// //             { _id: "5", name: "Faisalabad" },
// //             { _id: "6", name: "Multan" },
// //             { _id: "7", name: "Peshawar" },
// //             { _id: "8", name: "Quetta" },
// //             { _id: "9", name: "Sialkot" },
// //             { _id: "10", name: "Gujranwala" }
// //           ]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setApiError("Failed to load lab data. Please try again.");
// //       }
// //     };

// //     fetchData();
// //   }, [id]);

// //   // Set minimum booking date to today
// //   useEffect(() => {
// //     const today = new Date().toISOString().split('T')[0];
// //     setBookingDate(today);
// //     // 设置默认时间槽
// //     setAvailableSlots(generateTimeSlots());
// //   }, []);

// //   // 更新特定测试的数量
// //   const updateTestQuantity = (testId, newQuantity) => {
// //     if (newQuantity < 1) return;
    
// //     setSelectedTestDetails(prevTests =>
// //       prevTests.map(test =>
// //         test._id === testId
// //           ? { ...test, quantity: newQuantity }
// //           : test
// //       )
// //     );
// //   };

// //   // 移除测试
// //   const removeTest = (testId) => {
// //     setSelectedTestDetails(prevTests =>
// //       prevTests.filter(test => test._id !== testId)
// //     );
// //   };

// //   // Calculate discounted price
// //   const calculateDiscountedPrice = (price, discount) => {
// //     const p = Number(price) || 0;
// //     const d = Number(discount) || 0;
// //     if (d <= 0) return Math.round(p);
// //     return Math.round(p - (p * d) / 100);
// //   };

// //   // Calculate totals based on individual test quantities
// //   const calculateTotals = () => {
// //     let totalPrice = 0;
// //     let totalOriginalPrice = 0;

// //     selectedTestDetails.forEach(test => {
// //       const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
// //       const originalPrice = Number(test.price) || 0;
      
// //       totalPrice += discountedPrice * test.quantity;
// //       totalOriginalPrice += originalPrice * test.quantity;
// //     });

// //     const totalDiscount = totalOriginalPrice - totalPrice;

// //     return {
// //       totalPrice,
// //       totalOriginalPrice,
// //       totalDiscount
// //     };
// //   };

// //   const { totalPrice, totalOriginalPrice, totalDiscount } = calculateTotals();

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file && file.size > 5 * 1024 * 1024) {
// //       alert("File size should be less than 5MB");
// //       return;
// //     }
// //     setPrescriptionFile(file);
// //   };

// //   const validateForm = () => {
// //     const errors = {};
    
// //     if (!patientName.trim()) errors.patientName = "Patient name is required";
// //     if (!labCity.trim()) errors.labCity = "Please select a lab city";
// //     if (!age.trim()) errors.age = "Age is required";
// //     if (age && (age < 0 || age > 120)) errors.age = "Please enter a valid age";
// //     if (!gender) errors.gender = "Please select gender";
// //     if (!phone.trim()) errors.phone = "Phone number is required";
// //     if (phone && !/^\d{10,15}$/.test(phone)) errors.phone = "Please enter a valid phone number";
// //     if (!email.trim()) errors.email = "Email is required";
// //     if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email";
// //     if (!bookingDate) errors.bookingDate = "Booking date is required";
// //     if (!bookingTime) errors.bookingTime = "Please select a time slot";
// //     if (selectedTestDetails.length === 0) errors.tests = "Please select at least one test";

// //     setFormErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       return;
// //     }

// //     setIsLoading(true);
// //     setApiError("");

// //     try {
// //       // Prepare booking data
// //       const bookingData = {
// //         labId: lab._id,
// //         labName: lab.name,
// //         tests: selectedTestDetails.map(t => ({
// //           testId: t._id,
// //           name: t.name,
// //           price: t.price,
// //           discount: t.discount,
// //           discountedPrice: calculateDiscountedPrice(t.price, t.discount),
// //           quantity: t.quantity
// //         })),
// //         patientDetails: {
// //           name: patientName,
// //           age,
// //           gender,
// //           phone,
// //           email,
// //           address
// //         },
// //         bookingDetails: {
// //           city: labCity,
// //           date: bookingDate,
// //           time: bookingTime,
// //           specialInstructions
// //         },
// //         payment: {
// //           originalPrice: totalOriginalPrice,
// //           discount: totalDiscount,
// //           finalPrice: totalPrice
// //         }
// //       };

// //       // If there's a prescription file, upload it first
// //       let prescriptionUrl = "";
// //       if (prescriptionFile) {
// //         const formData = new FormData();
// //         formData.append('prescription', prescriptionFile);
// //         formData.append('labId', lab._id);
        
// //         const uploadRes = await axios.post(`${API_BASE}/upload/prescription`, formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data'
// //           }
// //         });
        
// //         if (uploadRes.data.url) {
// //           prescriptionUrl = uploadRes.data.url;
// //         }
// //       }

// //       // Add prescription URL to booking data
// //       if (prescriptionUrl) {
// //         bookingData.prescriptionUrl = prescriptionUrl;
// //       }

// //       // Submit booking to API
// //       const bookingRes = await axios.post(`${API_BASE}/bookings`, bookingData);
      
// //       if (bookingRes.data.success) {
// //         const bookingDetails = {
// //           ...bookingRes.data.booking,
// //           bookingId: bookingRes.data.bookingId || `BK${Date.now().toString().slice(-8)}`,
// //           lab: lab,
// //           selectedTests: selectedTestDetails
// //         };

// //         // Store in localStorage (optional)
// //         const existingBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
// //         existingBookings.push(bookingDetails);
// //         localStorage.setItem('labBookings', JSON.stringify(existingBookings));

// //         // Clear local storage selection for this lab
// //         localStorage.removeItem(`selectedTests_lab_${id}`);

// //         alert(`
// //           Booking Confirmed!
          
// //           Booking ID: ${bookingDetails.bookingId}
// //           Lab: ${lab.name}
// //           Test(s): ${selectedTestDetails.map(t => `${t.name} (x${t.quantity})`).join(", ")}
// //           Patient: ${patientName}
// //           Date: ${new Date(bookingDate).toLocaleDateString()} at ${bookingTime}
// //           City: ${labCity}
          
// //           Total Amount: Rs. ${totalPrice.toFixed(0)}
          
// //           Thank you for your booking!
// //         `);

// //         navigate("/booking-confirmation", { 
// //           state: { bookingDetails } 
// //         });

// //       } else {
// //         throw new Error(bookingRes.data.message || "Booking failed");
// //       }

// //     } catch (error) {
// //       console.error("Booking error:", error);
// //       setApiError(error.response?.data?.message || error.message || "Booking failed. Please try again.");
      
// //       // Show error alert
// //       alert(`Booking failed: ${error.response?.data?.message || error.message || "Please try again."}`);
      
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   if (!lab) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-[#9fbfc5] to-[#7aa9b1] flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-[#2c6774] border-opacity-50 mb-4"></div>
// //           <h2 className="text-2xl font-bold text-[#174047] mb-2">Loading Lab Details...</h2>
// //           <p className="text-[#174047] opacity-80">Please wait while we load lab details</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (selectedTestDetails.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-[#9fbfc5] to-[#7aa9b1] flex items-center justify-center p-4">
// //         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-[1.02]">
// //           <div className="text-[#2c6774] text-5xl mb-4">🧪</div>
// //           <h2 className="text-2xl font-bold text-[#174047] mb-3">No Tests Selected</h2>
// //           <p className="text-[#5c878f] mb-6">Please select tests before booking.</p>
// //           <Link 
// //             to={`/labs/${lab._id}`} 
// //             className="inline-block bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
// //           >
// //             Select Tests
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#9fbfc5] to-[#7aa9b1] py-8">
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //             <div>
// //               <h1 className="text-3xl md:text-4xl font-bold text-[#174047] bg-clip-text bg-gradient-to-r from-[#174047] to-[#2c6774]">
// //                 Book Your Lab Test
// //               </h1>
// //               <p className="text-[#174047] opacity-90 mt-2">Complete your booking by filling the details below</p>
// //             </div>
// //             <div className="bg-white rounded-xl p-4 shadow-lg">
// //               <div className="text-sm text-[#5c878f]">Need Help?</div>
// //               <div className="font-bold text-lg text-[#2c6774]">1-800-MARHAM</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* API Error Display */}
// //         {apiError && (
// //           <div className="mb-6 p-4 bg-gradient-to-r from-red-100 to-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center shadow-lg transform transition-all duration-300">
// //             <FaExclamationTriangle className="mr-3 text-red-500" />
// //             <span className="flex-1">{apiError}</span>
// //             <button 
// //               onClick={() => setApiError("")} 
// //               className="ml-4 text-red-500 hover:text-red-700 text-xl font-bold"
// //             >
// //               ×
// //             </button>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Column - Booking Form */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Selected Tests Card */}
// //             <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
// //               <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#9fbfc5]">
// //                 <div className="relative">
// //                   <img
// //                     src={`http://localhost:5000/uploads/${lab.logo}`}
// //                     alt={lab.name}
// //                     className="w-20 h-20 object-contain rounded-xl border-4 border-white shadow-lg"
// //                   />
// //                   <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
// //                     {lab.discount || 0}% OFF
// //                   </div>
// //                 </div>
// //                 <div className="flex-1">
// //                   <h2 className="text-2xl font-bold text-[#174047]">{lab.name}</h2>
// //                   <div className="flex items-center gap-4 mt-2">
// //                     <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
// //                       ⭐ {lab.rating || "4.5"}
// //                     </span>
// //                     <span className="text-[#5c878f] text-sm">• Fast Results • Home Collection Available</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Selected Tests with Individual Quantities */}
// //               <div className="mb-6">
// //                 <h3 className="text-lg font-bold text-[#174047] mb-4 flex items-center">
// //                   <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-2 rounded-lg mr-3">
// //                     <FaCheckCircle className="text-white text-lg" />
// //                   </div>
// //                   Selected Tests ({selectedTestDetails.length})
// //                 </h3>
                
// //                 {formErrors.tests && (
// //                   <p className="text-red-500 text-sm mb-4 flex items-center">
// //                     <IoIosAlert className="mr-1" />
// //                     {formErrors.tests}
// //                   </p>
// //                 )}
                
// //                 <div className="space-y-4">
// //                   {selectedTestDetails.map(test => {
// //                     const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
// //                     const testTotal = discountedPrice * test.quantity;
                    
// //                     return (
// //                       <div 
// //                         key={test._id} 
// //                         className="bg-gradient-to-r from-[#f8fbfc] to-white border border-[#9fbfc5] rounded-xl p-4 hover:border-[#2c6774] transition-all duration-300"
// //                       >
// //                         <div className="flex items-start justify-between">
// //                           <div className="flex-1">
// //                             <div className="flex items-start gap-3">
// //                               <div className="mt-1">
// //                                 <div className="w-3 h-3 bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-full"></div>
// //                               </div>
// //                               <div>
// //                                 <h4 className="font-bold text-[#174047]">{test.name}</h4>
// //                                 <p className="text-sm text-[#5c878f] mt-1">
// //                                   {test.description || "Standard diagnostic test"}
// //                                 </p>
// //                                 <div className="flex items-center gap-4 mt-3">
// //                                   {/* Individual Quantity Controls */}
// //                                   <div className="flex items-center gap-2">
// //                                     <button
// //                                       onClick={() => updateTestQuantity(test._id, test.quantity - 1)}
// //                                       className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] text-white rounded-lg hover:from-[#7aa9b1] hover:to-[#5c878f] transition-all duration-300 shadow-md"
// //                                       type="button"
// //                                       disabled={test.quantity <= 1}
// //                                     >
// //                                       -
// //                                     </button>
// //                                     <span className="w-12 text-center font-bold text-[#174047] bg-[#f0f7f9] py-1 rounded-lg">
// //                                       {test.quantity}
// //                                     </span>
// //                                     <button
// //                                       onClick={() => updateTestQuantity(test._id, test.quantity + 1)}
// //                                       className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg hover:from-[#174047] hover:to-[#0d2c33] transition-all duration-300 shadow-md"
// //                                       type="button"
// //                                     >
// //                                       +
// //                                     </button>
// //                                   </div>
                                  
// //                                   <button
// //                                     onClick={() => removeTest(test._id)}
// //                                     className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
// //                                     type="button"
// //                                   >
// //                                     <span className="text-lg">×</span> Remove
// //                                   </button>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </div>
                          
// //                           <div className="text-right ml-4">
// //                             <div className="flex flex-col items-end gap-1">
// //                               {test.discount > 0 && (
// //                                 <span className="text-sm text-[#5c878f] line-through">
// //                                   Rs. {test.price} × {test.quantity}
// //                                 </span>
// //                               )}
// //                               <span className="font-bold text-lg bg-gradient-to-r from-[#2c6774] to-[#174047] bg-clip-text text-transparent">
// //                                 Rs. {testTotal}
// //                               </span>
// //                               {test.discount > 0 && (
// //                                 <span className="text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1 rounded-full">
// //                                   Save {test.discount}%
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <div className="text-xs text-[#5c878f] mt-2">
// //                               Rs. {discountedPrice} each
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
                
// //                 {selectedTestDetails.length > 0 && (
// //                   <div className="mt-6 pt-6 border-t border-[#9fbfc5]">
// //                     <div className="flex items-center justify-between">
// //                       <div className="text-sm text-[#5c878f]">
// //                         Total {selectedTestDetails.reduce((sum, test) => sum + test.quantity, 0)} items
// //                       </div>
// //                       <Link 
// //                         to={`/labs/${lab._id}`}
// //                         className="text-[#2c6774] hover:text-[#174047] font-medium flex items-center gap-2"
// //                       >
// //                         <span className="text-lg">+</span> Add More Tests
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Booking Form Card */}
// //             <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
// //               <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center">
// //                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-2 rounded-lg mr-3">
// //                   <FaUser className="text-white" />
// //                 </div>
// //                 Patient & Booking Details
// //               </h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {/* Patient Name */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="patientName" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaUser className="text-white" />
// //                     </div>
// //                     Patient's Full Name *
// //                   </label>
// //                   <input
// //                     id="patientName"
// //                     type="text"
// //                     value={patientName}
// //                     onChange={(e) => setPatientName(e.target.value)}
// //                     placeholder="Enter patient's full name"
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.patientName ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   />
// //                   {formErrors.patientName && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.patientName}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Age and Gender */}
// //                 <div>
// //                   <label htmlFor="age" className="block mb-3 font-semibold text-[#174047]">
// //                     Age *
// //                   </label>
// //                   <input
// //                     id="age"
// //                     type="number"
// //                     value={age}
// //                     min="0"
// //                     max="120"
// //                     onChange={(e) => setAge(e.target.value)}
// //                     placeholder="Enter age"
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.age ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   />
// //                   {formErrors.age && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.age}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label htmlFor="gender" className="block mb-3 font-semibold text-[#174047]">
// //                     Gender *
// //                   </label>
// //                   <select
// //                     id="gender"
// //                     value={gender}
// //                     onChange={(e) => setGender(e.target.value)}
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.gender ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   >
// //                     <option value="">Select Gender</option>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //                     <option value="other">Other</option>
// //                   </select>
// //                   {formErrors.gender && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.gender}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Contact Information */}
// //                 <div>
// //                   <label htmlFor="phone" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaPhone className="text-white" />
// //                     </div>
// //                     Phone Number *
// //                   </label>
// //                   <input
// //                     id="phone"
// //                     type="tel"
// //                     value={phone}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                     placeholder="Enter phone number"
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.phone ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   />
// //                   {formErrors.phone && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.phone}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label htmlFor="email" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaEnvelope className="text-white" />
// //                     </div>
// //                     Email Address *
// //                   </label>
// //                   <input
// //                     id="email"
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="Enter email address"
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.email ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   />
// //                   {formErrors.email && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.email}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Address */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="address" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaHome className="text-white" />
// //                     </div>
// //                     Address
// //                   </label>
// //                   <textarea
// //                     id="address"
// //                     value={address}
// //                     onChange={(e) => setAddress(e.target.value)}
// //                     placeholder="Enter your complete address"
// //                     rows="3"
// //                     className="w-full border-2 border-[#9fbfc5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300"
// //                   />
// //                 </div>

// //                 {/* Lab City */}
// //                 <div>
// //                   <label htmlFor="labCity" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaMapMarkerAlt className="text-white" />
// //                     </div>
// //                     Select Lab City *
// //                   </label>
// //                   <select
// //                     id="labCity"
// //                     value={labCity}
// //                     onChange={(e) => setLabCity(e.target.value)}
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.labCity ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   >
// //                     <option value="">Choose Lab City</option>
// //                     {cities.map((city) => (
// //                       <option key={city._id || city} value={city.name || city}>
// //                         {city.name || city}
// //                       </option>
// //                     ))}
// //                   </select>
// //                   {formErrors.labCity && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.labCity}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Booking Date */}
// //                 <div>
// //                   <label htmlFor="bookingDate" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaCalendarAlt className="text-white" />
// //                     </div>
// //                     Preferred Date *
// //                   </label>
// //                   <input
// //                     id="bookingDate"
// //                     type="date"
// //                     value={bookingDate}
// //                     min={new Date().toISOString().split('T')[0]}
// //                     onChange={(e) => setBookingDate(e.target.value)}
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.bookingDate ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   />
// //                   {formErrors.bookingDate && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.bookingDate}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Booking Time Dropdown */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="bookingTime" className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaClock className="text-white" />
// //                     </div>
// //                     Select Time Slot *
// //                   </label>
// //                   <select
// //                     id="bookingTime"
// //                     value={bookingTime}
// //                     onChange={(e) => setBookingTime(e.target.value)}
// //                     className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300 ${
// //                       formErrors.bookingTime ? 'border-red-500' : 'border-[#9fbfc5]'
// //                     }`}
// //                   >
// //                     <option value="">Choose a time slot</option>
// //                     {availableSlots.map(slot => (
// //                       <option key={slot} value={slot}>{slot}</option>
// //                     ))}
// //                   </select>
// //                   {formErrors.bookingTime && (
// //                     <p className="text-red-500 text-sm mt-2 flex items-center">
// //                       <IoIosAlert className="mr-2" />
// //                       {formErrors.bookingTime}
// //                     </p>
// //                   )}
// //                   <div className="text-sm text-[#5c878f] mt-2">
// //                     Available slots: 8:00 AM to 9:00 PM
// //                   </div>
// //                 </div>

// //                 {/* Special Instructions */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="specialInstructions" className="block mb-3 font-semibold text-[#174047]">
// //                     Special Instructions (Optional)
// //                   </label>
// //                   <textarea
// //                     id="specialInstructions"
// //                     value={specialInstructions}
// //                     onChange={(e) => setSpecialInstructions(e.target.value)}
// //                     placeholder="Any special requirements or instructions..."
// //                     rows="3"
// //                     className="w-full border-2 border-[#9fbfc5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 transition-all duration-300"
// //                   />
// //                 </div>

// //                 {/* Prescription Upload */}
// //                 <div className="md:col-span-2">
// //                   <label className="block mb-3 font-semibold text-[#174047] items-center">
// //                     <div className="bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] p-2 rounded-lg mr-3">
// //                       <FaFileMedical className="text-white" />
// //                     </div>
// //                     Attach Prescription (Optional)
// //                   </label>
// //                   <div className="border-2 border-dashed border-[#9fbfc5] rounded-xl p-8 text-center hover:border-[#2c6774] transition-all duration-300 bg-gradient-to-br from-[#f8fbfc] to-white">
// //                     <input
// //                       type="file"
// //                       onChange={handleFileChange}
// //                       accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
// //                       className="hidden"
// //                       id="prescriptionFile"
// //                     />
// //                     <label htmlFor="prescriptionFile" className="cursor-pointer block">
// //                       <div className="text-gradient bg-gradient-to-r from-[#2c6774] to-[#174047] bg-clip-text text-transparent mb-3">
// //                         <FaFileMedical className="w-16 h-16 mx-auto opacity-50" />
// //                       </div>
// //                       <p className="text-[#174047] font-medium mb-2">Click to upload prescription</p>
// //                       <p className="text-sm text-[#5c878f]">Supported: PDF, JPG, PNG, DOC (Max 5MB)</p>
// //                       <div className="mt-4 inline-block bg-gradient-to-r from-[#9fbfc5] to-[#7aa9b1] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
// //                         Browse Files
// //                       </div>
// //                     </label>
// //                   </div>
// //                   {prescriptionFile && (
// //                     <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 shadow-sm">
// //                       <div className="flex items-center gap-3">
// //                         <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
// //                           <IoIosCheckmarkCircle className="text-white text-xl" />
// //                         </div>
// //                         <div>
// //                           <span className="text-[#174047] font-medium">{prescriptionFile.name}</span>
// //                           <p className="text-xs text-[#5c878f]">
// //                             {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <button
// //                         type="button"
// //                         onClick={() => setPrescriptionFile(null)}
// //                         className="text-red-500 hover:text-red-700 font-medium"
// //                       >
// //                         Remove
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Submit Button */}
// //               <div className="mt-10 pt-8 border-t border-[#9fbfc5]">
// //                 <button
// //                   type="submit"
// //                   disabled={isLoading || isLoadingSlots || selectedTestDetails.length === 0}
// //                   className={`w-full bg-gradient-to-r from-[#2c6774] to-[#174047] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
// //                     isLoading || isLoadingSlots || selectedTestDetails.length === 0 
// //                       ? 'opacity-50 cursor-not-allowed' 
// //                       : ''
// //                   }`}
// //                 >
// //                   {isLoading ? (
// //                     <div className="flex items-center justify-center gap-3">
// //                       <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
// //                       Processing Booking...
// //                     </div>
// //                   ) : (
// //                     <div className="flex items-center justify-center gap-3">
// //                       <span>Confirm Booking</span>
// //                       <span className="bg-white text-[#174047] px-3 py-1 rounded-lg font-bold">
// //                         Rs. {totalPrice.toFixed(0)}
// //                       </span>
// //                     </div>
// //                   )}
// //                 </button>
// //                 <p className="text-center text-sm text-[#5c878f] mt-4">
// //                   By confirming, you agree to our terms and conditions
// //                 </p>
// //               </div>
// //             </form>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 transform transition-all duration-300 hover:shadow-2xl">
// //               <h3 className="text-lg font-bold text-[#174047] mb-6 flex items-center">
// //                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-2 rounded-lg mr-3">
// //                   <FaInfoCircle className="text-white" />
// //                 </div>
// //                 Order Summary
// //               </h3>
              
// //               {/* Lab Info */}
// //               <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#9fbfc5]">
// //                 <div className="relative">
// //                   <img
// //                     src={`http://localhost:5000/uploads/${lab.logo}`}
// //                     alt={lab.name}
// //                     className="w-16 h-16 object-contain rounded-xl border-4 border-white shadow-md"
// //                   />
// //                   <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white text-xs px-2 py-1 rounded-full">
// //                     ★ {lab.rating || "4.5"}
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <h4 className="font-bold text-[#174047]">{lab.name}</h4>
// //                   <p className="text-sm text-[#5c878f]">
// //                     {labCity || "Select city"}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Tests List */}
// //               <div className="mb-6 pb-6 border-b border-[#9fbfc5]">
// //                 <h4 className="font-semibold text-[#174047] mb-4">
// //                   Tests ({selectedTestDetails.length})
// //                 </h4>
// //                 <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
// //                   {selectedTestDetails.map(test => {
// //                     const discountedPrice = calculateDiscountedPrice(test.price, test.discount);
// //                     const testTotal = discountedPrice * test.quantity;
                    
// //                     return (
// //                       <div key={test._id} className="flex justify-between items-start text-sm">
// //                         <div className="flex-1 pr-4">
// //                           <div className="font-medium text-[#174047]">{test.name}</div>
// //                           <div className="text-xs text-[#5c878f] mt-1">
// //                             Qty: {test.quantity} × Rs. {discountedPrice}
// //                           </div>
// //                         </div>
// //                         <div className="text-right">
// //                           <div className="font-bold text-[#2c6774]">
// //                             Rs. {testTotal}
// //                           </div>
// //                           {test.discount > 0 && (
// //                             <div className="text-xs text-emerald-600 font-medium mt-1">
// //                               Save {test.discount}%
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="space-y-3 mb-6">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-[#174047]">Subtotal</span>
// //                   <span className="text-[#174047]">Rs. {totalOriginalPrice.toFixed(0)}</span>
// //                 </div>
                
// //                 {totalDiscount > 0 && (
// //                   <div className="flex justify-between text-sm">
// //                     <span className="text-emerald-600 font-medium">Discount</span>
// //                     <span className="text-emerald-600 font-medium">-Rs. {totalDiscount.toFixed(0)}</span>
// //                   </div>
// //                 )}
                
// //                 <div className="flex justify-between text-lg font-bold pt-4 border-t border-[#9fbfc5]">
// //                   <span className="text-[#174047]">Total Amount</span>
// //                   <span className="bg-gradient-to-r from-[#2c6774] to-[#174047] bg-clip-text text-transparent font-extrabold">
// //                     Rs. {totalPrice.toFixed(0)}
// //                   </span>
// //                 </div>
                
// //                 {totalDiscount > 0 && (
// //                   <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-3 text-center">
// //                     <div className="text-sm font-medium text-emerald-800">
// //                       You saved Rs. {totalDiscount.toFixed(0)}!
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Additional Info */}
// //               <div className="bg-gradient-to-br from-[#f0f7f9] to-white border border-[#9fbfc5] rounded-xl p-5 mb-6">
// //                 <h4 className="font-bold text-[#2c6774] mb-3 flex items-center">
// //                   <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-1 rounded-lg mr-3">
// //                     <FaInfoCircle className="text-white text-sm" />
// //                   </div>
// //                   What to Bring
// //                 </h4>
// //                 <ul className="space-y-2">
// //                   <li className="flex items-center text-sm text-[#174047]">
// //                     <div className="w-2 h-2 bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-full mr-3"></div>
// //                     Valid ID Proof
// //                   </li>
// //                   <li className="flex items-center text-sm text-[#174047]">
// //                     <div className="w-2 h-2 bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-full mr-3"></div>
// //                     Previous reports (if any)
// //                   </li>
// //                   <li className="flex items-center text-sm text-[#174047]">
// //                     <div className="w-2 h-2 bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-full mr-3"></div>
// //                     Doctor's prescription
// //                   </li>
// //                 </ul>
// //               </div>

// //               {/* Support Info */}
// //               <div className="text-center p-4 bg-gradient-to-r from-[#f0f7f9] to-white border border-[#9fbfc5] rounded-xl">
// //                 <div className="text-sm text-[#5c878f] mb-1">Need help? Call us at</div>
// //                 <div className="font-bold text-xl bg-gradient-to-r from-[#2c6774] to-[#174047] bg-clip-text text-transparent">
// //                   1-800-MARHAM
// //                 </div>
// //                 <div className="text-xs text-[#5c878f] mt-2">
// //                   24/7 Customer Support
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // import React, { useState, useEffect } from "react";
// // import { useParams, useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // export default function BookingPage() {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
  
// //   const [lab, setLab] = useState(null);
// //   const [tests, setTests] = useState([]);
// //   const [selectedTests, setSelectedTests] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [bookingDetails, setBookingDetails] = useState({
// //     patientName: "",
// //     age: "",
// //     gender: "male",
// //     phone: "",
// //     email: "",
// //     address: "",
// //     city: "",
// //     appointmentDate: "",
// //     appointmentTime: "",
// //     paymentMethod: "cash",
// //     specialInstructions: "",
// //   });

// //   // Get selected tests from navigation state
// //   useEffect(() => {
// //     if (location.state?.selectedTests) {
// //       setSelectedTests(location.state.selectedTests);
// //     } else {
// //       // If no tests selected, redirect back
// //       navigate(`/labs/${id}`);
// //     }
// //   }, [location, navigate, id]);

// //   // Fetch lab details and test details
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [labRes, testsRes] = await Promise.all([
// //           axios.get(`http://localhost:5000/api/labs/${id}`),
// //           axios.get(`http://localhost:5000/api/tests/lab/${id}`),
// //         ]);
        
// //         setLab(labRes.data);
// //         const allTests = Array.isArray(testsRes.data) ? testsRes.data : [];
// //         // Filter only selected tests
// //         const filteredTests = allTests.filter(test => 
// //           selectedTests.includes(test._id)
// //         );
// //         setTests(filteredTests);
// //       } catch (err) {
// //         console.error("Error loading data:", err);
// //         toast.error("Failed to load data. Please try again.");
// //       }
// //     };

// //     if (selectedTests.length > 0) {
// //       fetchData();
// //     }
// //   }, [id, selectedTests]);

// //   const calculateTotals = () => {
// //     let original = 0;
// //     let discount = 0;

// //     tests.forEach((test) => {
// //       const p = Number(test.price) || 0;
// //       const d = Number(test.discount) || 0;
// //       original += p;
// //       discount += (p * d) / 100;
// //     });

// //     const final = Math.round(original - discount);
// //     return {
// //       original: Math.round(original),
// //       discount: Math.round(discount),
// //       final,
// //       count: tests.length,
// //     };
// //   };

// //   const totals = calculateTotals();

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setBookingDetails(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const validateForm = () => {
// //     const requiredFields = [
// //       'patientName', 'age', 'phone', 'address', 'city', 
// //       'appointmentDate', 'appointmentTime'
// //     ];
    
// //     for (const field of requiredFields) {
// //       if (!bookingDetails[field].trim()) {
// //         toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
// //         return false;
// //       }
// //     }

// //     // Validate phone number
// //     const phoneRegex = /^[0-9]{10,11}$/;
// //     if (!phoneRegex.test(bookingDetails.phone.replace(/\D/g, ''))) {
// //       toast.error("Please enter a valid phone number");
// //       return false;
// //     }

// //     // Validate email if provided
// //     if (bookingDetails.email && !/\S+@\S+\.\S+/.test(bookingDetails.email)) {
// //       toast.error("Please enter a valid email address");
// //       return false;
// //     }

// //     // Validate appointment date (not in past)
// //     const selectedDate = new Date(bookingDetails.appointmentDate);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
    
// //     if (selectedDate < today) {
// //       toast.error("Appointment date cannot be in the past");
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) return;
    
// //     setLoading(true);
    
// //     try {
// //       const bookingData = {
// //         labId: id,
// //         labName: lab?.name,
// //         tests: tests.map(test => ({
// //           testId: test._id,
// //           name: test.name,
// //           price: test.price,
// //           discount: test.discount,
// //           finalPrice: calculateDiscountedPrice(test.price, test.discount)
// //         })),
// //         ...bookingDetails,
// //         totalAmount: totals.final,
// //         status: "pending",
// //         bookingDate: new Date().toISOString(),
// //       };

// //       const response = await axios.post(
// //         "http://localhost:5000/api/bookings",
// //         bookingData,
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           }
// //         }
// //       );

// //       if (response.data.success) {
// //         toast.success("Booking confirmed successfully!");
        
// //         // Clear localStorage for this lab
// //         localStorage.removeItem(`selectedTests_lab_${id}`);
        
// //         // Redirect to confirmation page or home after delay
// //         setTimeout(() => {
// //           navigate(`/booking-confirmation/${response.data.bookingId}`);
// //         }, 2000);
// //       }
// //     } catch (err) {
// //       console.error("Booking error:", err);
// //       toast.error(err.response?.data?.message || "Failed to book appointment. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const calculateDiscountedPrice = (price, discount) => {
// //     const p = Number(price) || 0;
// //     const d = Number(discount) || 0;
// //     if (d <= 0) return Math.round(p);
// //     return Math.round(p - (p * d) / 100);
// //   };

// //   const formatDate = (dateString) => {
// //     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// //     return new Date(dateString).toLocaleDateString('en-US', options);
// //   };

// //   // Generate time slots (9 AM to 6 PM)
// //   const timeSlots = Array.from({ length: 10 }, (_, i) => {
// //     const hour = 9 + i;
// //     return `${hour.toString().padStart(2, '0')}:00`;
// //   });

// //   if (!lab || tests.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="text-center">
// //           <div className="text-lg font-semibold" style={{ color: "var(--secondary-color)" }}>
// //             Loading booking details...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <ToastContainer position="top-right" autoClose={3000} />
      
// //       <div className="max-w-6xl mx-auto px-4">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold" style={{ color: "var(--primary-color)" }}>
// //             Book Your Tests
// //           </h1>
// //           <p className="text-gray-600 mt-2">Complete your booking in a few simple steps</p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Column - Patient Details Form */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
// //               <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--secondary-color)" }}>
// //                 Patient Details
// //               </h2>
              
// //               <form onSubmit={handleSubmit}>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1">Full Name *</label>
// //                     <input
// //                       type="text"
// //                       name="patientName"
// //                       value={bookingDetails.patientName}
// //                       onChange={handleInputChange}
// //                       className="w-full border rounded-lg p-3"
// //                       placeholder="Enter patient name"
// //                       required
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1">Age *</label>
// //                     <input
// //                       type="number"
// //                       name="age"
// //                       value={bookingDetails.age}
// //                       onChange={handleInputChange}
// //                       className="w-full border rounded-lg p-3"
// //                       placeholder="Age"
// //                       min="0"
// //                       max="120"
// //                       required
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1">Gender *</label>
// //                     <select
// //                       name="gender"
// //                       value={bookingDetails.gender}
// //                       onChange={handleInputChange}
// //                       className="w-full border rounded-lg p-3"
// //                     >
// //                       <option value="male">Male</option>
// //                       <option value="female">Female</option>
// //                       <option value="other">Other</option>
// //                     </select>
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1">Phone Number *</label>
// //                     <input
// //                       type="tel"
// //                       name="phone"
// //                       value={bookingDetails.phone}
// //                       onChange={handleInputChange}
// //                       className="w-full border rounded-lg p-3"
// //                       placeholder="03XX XXXXXXX"
// //                       required
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1">Email Address</label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={bookingDetails.email}
// //                       onChange={handleInputChange}
// //                       className="w-full border rounded-lg p-3"
// //                       placeholder="email@example.com"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium mb-1">City *</label>
// //                     <select
// //                       name="city"
// //                       value={bookingDetails.city}
// //                       onChange={handleInputChange}
// //                       className="w-full border rounded-lg p-3"
// //                       required
// //                     >
// //                       <option value="">Select City</option>
// //                       <option value="karachi">Karachi</option>
// //                       <option value="lahore">Lahore</option>
// //                       <option value="islamabad">Islamabad</option>
// //                       <option value="rawalpindi">Rawalpindi</option>
// //                       <option value="faisalabad">Faisalabad</option>
// //                       <option value="multan">Multan</option>
// //                       <option value="peshawar">Peshawar</option>
// //                       <option value="quetta">Quetta</option>
// //                     </select>
// //                   </div>
// //                 </div>
                
// //                 <div className="mt-4">
// //                   <label className="block text-sm font-medium mb-1">Complete Address *</label>
// //                   <textarea
// //                     name="address"
// //                     value={bookingDetails.address}
// //                     onChange={handleInputChange}
// //                     className="w-full border rounded-lg p-3"
// //                     rows="3"
// //                     placeholder="House #, Street, Area, Landmark"
// //                     required
// //                   />
// //                 </div>
                
// //                 {/* Appointment Section */}
// //                 <div className="mt-8">
// //                   <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--secondary-color)" }}>
// //                     Appointment Details
// //                   </h2>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-1">Appointment Date *</label>
// //                       <input
// //                         type="date"
// //                         name="appointmentDate"
// //                         value={bookingDetails.appointmentDate}
// //                         onChange={handleInputChange}
// //                         className="w-full border rounded-lg p-3"
// //                         min={new Date().toISOString().split('T')[0]}
// //                         required
// //                       />
// //                       {bookingDetails.appointmentDate && (
// //                         <p className="text-sm text-gray-500 mt-1">
// //                           {formatDate(bookingDetails.appointmentDate)}
// //                         </p>
// //                       )}
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium mb-1">Preferred Time *</label>
// //                       <select
// //                         name="appointmentTime"
// //                         value={bookingDetails.appointmentTime}
// //                         onChange={handleInputChange}
// //                         className="w-full border rounded-lg p-3"
// //                         required
// //                       >
// //                         <option value="">Select Time Slot</option>
// //                         {timeSlots.map((time) => (
// //                           <option key={time} value={time}>{time}</option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 {/* Payment Method */}
// //                 <div className="mt-8">
// //                   <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--secondary-color)" }}>
// //                     Payment Method
// //                   </h2>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                     <label className={`border rounded-lg p-4 cursor-pointer ${
// //                       bookingDetails.paymentMethod === 'cash' ? 'border-blue-500 border-2 bg-blue-50' : ''
// //                     }`}>
// //                       <input
// //                         type="radio"
// //                         name="paymentMethod"
// //                         value="cash"
// //                         checked={bookingDetails.paymentMethod === 'cash'}
// //                         onChange={handleInputChange}
// //                         className="mr-2"
// //                       />
// //                       Cash on Sample Collection
// //                     </label>
                    
// //                     <label className={`border rounded-lg p-4 cursor-pointer ${
// //                       bookingDetails.paymentMethod === 'card' ? 'border-blue-500 border-2 bg-blue-50' : ''
// //                     }`}>
// //                       <input
// //                         type="radio"
// //                         name="paymentMethod"
// //                         value="card"
// //                         checked={bookingDetails.paymentMethod === 'card'}
// //                         onChange={handleInputChange}
// //                         className="mr-2"
// //                       />
// //                       Credit/Debit Card
// //                     </label>
                    
// //                     <label className={`border rounded-lg p-4 cursor-pointer ${
// //                       bookingDetails.paymentMethod === 'easypaisa' ? 'border-blue-500 border-2 bg-blue-50' : ''
// //                     }`}>
// //                       <input
// //                         type="radio"
// //                         name="paymentMethod"
// //                         value="easypaisa"
// //                         checked={bookingDetails.paymentMethod === 'easypaisa'}
// //                         onChange={handleInputChange}
// //                         className="mr-2"
// //                       />
// //                       EasyPaisa
// //                     </label>
// //                   </div>
// //                 </div>
                
// //                 {/* Special Instructions */}
// //                 <div className="mt-8">
// //                   <label className="block text-sm font-medium mb-1">Special Instructions (Optional)</label>
// //                   <textarea
// //                     name="specialInstructions"
// //                     value={bookingDetails.specialInstructions}
// //                     onChange={handleInputChange}
// //                     className="w-full border rounded-lg p-3"
// //                     rows="3"
// //                     placeholder="Any special requirements or instructions..."
// //                   />
// //                 </div>
                
// //                 <div className="mt-8">
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="w-full py-4 rounded-lg text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
// //                     style={{ backgroundColor: "var(--primary-color)" }}
// //                   >
// //                     {loading ? "Processing..." : `Confirm Booking - Rs ${totals.final}`}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
          
// //           {/* Right Column - Order Summary */}
// //           <div className="lg:col-span-1">
// //             <div className="sticky top-8">
// //               {/* Lab Info */}
// //               <div className="bg-white rounded-xl shadow-md p-6 mb-6">
// //                 <div className="flex items-center mb-4">
// //                   <img
// //                     src={`http://localhost:5000/uploads/${lab.logo}`}
// //                     className="w-16 h-16 object-contain mr-4"
// //                     alt={lab.name}
// //                   />
// //                   <div>
// //                     <h3 className="font-semibold" style={{ color: "var(--secondary-color)" }}>
// //                       {lab.name}
// //                     </h3>
// //                     <p className="text-sm text-gray-600">{lab.branches}</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "var(--bg-light)" }}>
// //                   <p className="text-sm">
// //                     <span className="font-semibold">Discount Available:</span> {lab.discount}% off on all tests
// //                   </p>
// //                 </div>
// //               </div>
              
// //               {/* Order Summary */}
// //               <div className="bg-white rounded-xl shadow-md p-6">
// //                 <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--secondary-color)" }}>
// //                   Order Summary
// //                 </h3>
                
// //                 <div className="space-y-3 mb-6">
// //                   {tests.map((test) => (
// //                     <div key={test._id} className="flex justify-between items-center border-b pb-3">
// //                       <div>
// //                         <p className="font-medium">{test.name}</p>
// //                         <p className="text-sm text-gray-600">{test.description}</p>
// //                       </div>
// //                       <div className="text-right">
// //                         <p className="font-semibold">
// //                           Rs {calculateDiscountedPrice(test.price, test.discount)}
// //                         </p>
// //                         {test.discount > 0 && (
// //                           <p className="text-sm text-gray-500 line-through">Rs {test.price}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 {/* Price Breakdown */}
// //                 <div className="space-y-2 mb-6">
// //                   <div className="flex justify-between">
// //                     <span>Subtotal ({tests.length} tests)</span>
// //                     <span>Rs {totals.original}</span>
// //                   </div>
// //                   <div className="flex justify-between text-green-600">
// //                     <span>Discount</span>
// //                     <span>- Rs {totals.discount}</span>
// //                   </div>
// //                   <div className="flex justify-between font-semibold text-lg pt-2 border-t">
// //                     <span>Total Amount</span>
// //                     <span style={{ color: "var(--primary-color)" }}>Rs {totals.final}</span>
// //                   </div>
// //                 </div>
                
// //                 {/* Terms & Conditions */}
// //                 <div className="text-sm text-gray-600">
// //                   <p className="mb-2">
// //                     <span className="font-semibold">Note:</span> 
// //                   </p>
// //                   <ul className="list-disc pl-5 space-y-1">
// //                     <li>Fasting required for 8-12 hours for some tests</li>
// //                     <li>Carry original CNIC</li>
// //                     <li>Home sample collection available</li>
// //                     <li>Results delivered within 24-48 hours</li>
// //                   </ul>
// //                 </div>
// //               </div>
              
// //               {/* Need Help */}
// //               <div className="bg-white rounded-xl shadow-md p-6 mt-6">
// //                 <h3 className="font-semibold mb-2">Need Help?</h3>
// //                 <p className="text-sm text-gray-600 mb-3">Our customer support is available 24/7</p>
// //                 <div className="flex items-center">
// //                   <div className="w-8 h-8 flex items-center justify-center rounded-full mr-3" style={{ backgroundColor: "var(--primary-color)" }}>
// //                     <span className="text-white">📞</span>
// //                   </div>
// //                   <div>
// //                     <p className="font-semibold">Call Us</p>
// //                     <p className="text-sm" style={{ color: "var(--primary-color)" }}>021-12345678</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// BookingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  FaArrowLeft
} from 'react-icons/fa';

export default function BookingPage() {
  const { id: labId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTests } = location.state || {};
  
  const isSubmitting = useRef(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [lab, setLab] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Form state
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    mobile: '',
    email: '',
    address: ''
  });

  const [appointmentDetails, setAppointmentDetails] = useState({
    preferredDate: '',
    sampleCollectionType: 'home',
    addressForCollection: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (selectedTests?.length) {
      fetchLabAndTests();
    } else {
      navigate(`/labs/${labId}`);
    }
    
    // Set tomorrow's date as default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setAppointmentDetails(prev => ({
      ...prev,
      preferredDate: formattedDate
    }));
  }, []);

  const fetchLabAndTests = async () => {
    try {
      const [labRes, testsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/labs/${labId}`),
        axios.get(`http://localhost:5000/api/tests/lab/${labId}`)
      ]);
      
      setLab(labRes.data);
      const allTests = testsRes.data || [];
      const selectedTestDetails = allTests.filter(test => 
        selectedTests.includes(test._id)
      );
      setTests(selectedTestDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load lab details. Please try again.');
    }
  };

  const calculateTotal = () => {
    if (!lab || !tests.length) return { original: 0, final: 0, discount: 0 };
    
    const original = tests.reduce((sum, test) => sum + Number(test.price), 0);
    const discount = lab.discount || 0;
    const final = Math.round(original - (original * discount / 100));
    
    return { original: Math.round(original), final, discount };
  };

  const validateField = (field, value) => {
    const errors = { ...formErrors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
        
      case 'age':
        if (!value) {
          errors.age = 'Age is required';
        } else if (isNaN(value) || Number(value) < 1 || Number(value) > 120) {
          errors.age = 'Please enter a valid age (1-120)';
        } else {
          delete errors.age;
        }
        break;
        
      case 'mobile':
        const mobileRegex = /^[0-9]{10}$/;
        if (!value) {
          errors.mobile = 'Mobile number is required';
        } else if (!mobileRegex.test(value)) {
          errors.mobile = 'Please enter a valid 10-digit mobile number';
        } else {
          delete errors.mobile;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
        
      case 'address':
        if (!value.trim()) {
          errors.address = 'Address is required';
        } else if (value.trim().length < 10) {
          errors.address = 'Please enter a complete address';
        } else {
          delete errors.address;
        }
        break;
        
      case 'preferredDate':
        if (!value) {
          errors.preferredDate = 'Please select a date';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (selectedDate < today) {
            errors.preferredDate = 'Date cannot be in the past';
          } else {
            delete errors.preferredDate;
          }
        }
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setPatientDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (formErrors[field]) {
      validateField(field, value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate patient details
    Object.keys(patientDetails).forEach(field => {
      validateField(field, patientDetails[field]);
    });
    
    // Validate appointment date
    validateField('preferredDate', appointmentDetails.preferredDate);
    
    // Check if all required fields are filled
    const requiredFields = ['name', 'age', 'gender', 'mobile', 'email', 'address'];
    const missingFields = requiredFields.filter(field => !patientDetails[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    if (!appointmentDetails.preferredDate) {
      setError('Please select a preferred date');
      return false;
    }
    
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      return false;
    }
    
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting.current) return;
    
    if (!selectedTests?.length) {
      setError('Please select tests first');
      setTimeout(() => navigate(`/labs/${labId}`), 2000);
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setError(null);
    isSubmitting.current = true;

    try {
      const total = calculateTotal();

      // IMPORTANT: Format the data exactly as backend expects
      const bookingData = {
        labId,
        testIds: selectedTests,
        patientDetails: {
          name: patientDetails.name.trim(),
          age: Number(patientDetails.age),
          gender: patientDetails.gender,
          mobile: patientDetails.mobile,
          email: patientDetails.email.trim(),
          address: patientDetails.address.trim()
        },
        appointmentDetails: {
          preferredDate: new Date(appointmentDetails.preferredDate).toISOString(),
          sampleCollectionType: appointmentDetails.sampleCollectionType,
          addressForCollection: appointmentDetails.addressForCollection?.trim() || patientDetails.address.trim()
        }
      };

      console.log('Sending booking data:', bookingData);

      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        bookingData,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Booking response:', response.data);
      
      setBookingSuccess(true);
      setBookingDetails(response.data.booking);
      
      // Clear localStorage
      localStorage.removeItem(`selectedTests_lab_${labId}`);
      
    } catch (error) {
      console.error('Booking error details:', error);
      
      let errorMessage = 'Booking failed. Please try again.';
      
      if (error.response) {
        const { data } = error.response;
        console.log('Error response data:', data);
        
        if (data.error) {
          errorMessage = data.error;
          if (data.details) {
            if (Array.isArray(data.details)) {
              errorMessage += `: ${data.details.join(', ')}`;
            } else if (typeof data.details === 'object') {
              errorMessage += `: ${JSON.stringify(data.details)}`;
            } else {
              errorMessage += `: ${data.details}`;
            }
          }
        } else if (data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  const total = calculateTotal();

  if (bookingSuccess && bookingDetails) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12" style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 text-center shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-6xl text-green-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your appointment has been scheduled successfully
          </p>
          
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Booking Reference</p>
                  <p className="font-bold text-xl text-blue-600 tracking-wide">
                    {bookingDetails.bookingReference}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Patient Name</p>
                  <p className="font-semibold text-lg">{bookingDetails.patientDetails?.name}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Contact Number</p>
                  <p className="font-semibold">{bookingDetails.patientDetails?.mobile}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Appointment Date</p>
                  <p className="font-semibold">
                    {bookingDetails.appointmentDetails?.preferredDate 
                      ? new Date(bookingDetails.appointmentDetails.preferredDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Collection Type</p>
                  <p className="font-semibold capitalize">
                    {bookingDetails.appointmentDetails?.sampleCollectionType === 'home' 
                      ? 'Home Collection' 
                      : 'Lab Visit'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Total Tests</p>
                  <p className="font-semibold">{bookingDetails.tests?.length || 0} Tests</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                    Rs {total.final}
                  </p>
                  <p className="text-sm text-gray-500">
                    <s>Rs {total.original}</s> • Saved Rs {total.original - total.final}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Next Steps:</span> You will receive a confirmation call from the lab within 30 minutes. 
              Please keep your booking reference handy for any queries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              Print Receipt
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl" style={{ animation: 'slideDown 0.3s ease-out' }}>
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-red-700">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-sm text-red-600 hover:text-red-800 mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(`/labs/${labId}`)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Lab
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Fill in your details to schedule the tests</p>
        </div>
        
        {lab && (
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <img
              src={`http://localhost:5000/uploads/${lab.logo}`}
              className="w-12 h-12 rounded-xl object-contain bg-white p-1 border shadow-sm"
              alt={lab.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48?text=Lab';
              }}
            />
            <div>
              <h3 className="font-semibold">{lab.name}</h3>
              <p className="text-sm text-gray-500">{lab.branches}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Patient Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaUser className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Patient Information
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientDetails.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => validateField('name', patientDetails.name)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                    }`}
                    placeholder="Enter patient's full name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={patientDetails.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    onBlur={() => validateField('age', patientDetails.age)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                      formErrors.age ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                    }`}
                    placeholder="Age in years"
                  />
                  {formErrors.age && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.age}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={patientDetails.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={patientDetails.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      onBlur={() => validateField('mobile', patientDetails.mobile)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                        formErrors.mobile ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                      }`}
                      placeholder="9876543210"
                      maxLength="10"
                    />
                  </div>
                  {formErrors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={patientDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => validateField('email', patientDetails.email)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                      }`}
                      placeholder="patient@example.com"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <textarea
                      value={patientDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      onBlur={() => validateField('address', patientDetails.address)}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                        formErrors.address ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                      }`}
                      placeholder="House no., Street, Landmark, City, State - Pincode"
                    />
                  </div>
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Appointment Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaCalendarAlt className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Appointment Details
                </h2>
              </div>

              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date for Sample Collection *
                  </label>
                  <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={appointmentDetails.preferredDate}
                      onChange={(e) => {
                        setAppointmentDetails(prev => ({
                          ...prev,
                          preferredDate: e.target.value
                        }));
                        validateField('preferredDate', e.target.value);
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition ${
                        formErrors.preferredDate ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
                      }`}
                    />
                  </div>
                  {formErrors.preferredDate && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.preferredDate}</p>
                  )}
                </div>

                {/* Sample Collection Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you like to give the sample? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAppointmentDetails({
                        ...appointmentDetails,
                        sampleCollectionType: 'home'
                      })}
                      className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${
                        appointmentDetails.sampleCollectionType === 'home'
                          ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${
                        appointmentDetails.sampleCollectionType === 'home' 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                      }`}>
                        <FaHome className={`text-2xl ${
                          appointmentDetails.sampleCollectionType === 'home' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg">Home Collection</div>
                        <div className="text-sm text-gray-500 mt-2">
                          Our technician will visit your location for sample collection
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setAppointmentDetails({
                        ...appointmentDetails,
                        sampleCollectionType: 'lab'
                      })}
                      className={`p-6 border rounded-xl flex flex-col items-center gap-4 transition-all ${
                        appointmentDetails.sampleCollectionType === 'lab'
                          ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${
                        appointmentDetails.sampleCollectionType === 'lab' 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                      }`}>
                        <FaHospital className={`text-2xl ${
                          appointmentDetails.sampleCollectionType === 'lab' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg">Visit Lab</div>
                        <div className="text-sm text-gray-500 mt-2">
                          Visit our nearest lab center for sample collection
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Address for Collection (if home collection) */}
                {appointmentDetails.sampleCollectionType === 'home' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection Address (Optional)
                      <span className="text-gray-500 font-normal ml-1">
                        - Leave blank if same as patient address
                      </span>
                    </label>
                    <textarea
                      value={appointmentDetails.addressForCollection}
                      onChange={(e) => setAppointmentDetails({
                        ...appointmentDetails,
                        addressForCollection: e.target.value
                      })}
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition"
                      placeholder="Enter different collection address (optional)"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold">Terms & Conditions:</span> I agree that the information provided is accurate. I understand that 
                  the lab technician will contact me to confirm the appointment. Any cancellation should be done 
                  at least 2 hours before the scheduled time. I agree to pay the amount at the time of sample collection.
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
              {/* Lab Info Header */}
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
                {lab && (
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`http://localhost:5000/uploads/${lab.logo}`}
                      className="w-14 h-14 rounded-xl object-contain bg-white p-2 border shadow-sm"
                      alt={lab.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/56?text=Lab';
                      }}
                    />
                    <div>
                      <h3 className="font-bold">{lab.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedTests?.length || 0} {selectedTests?.length === 1 ? 'test' : 'tests'} selected
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Collection Type:</span>
                  <span className="font-semibold capitalize px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {appointmentDetails.sampleCollectionType === 'home' 
                      ? 'Home Collection' 
                      : 'Lab Visit'}
                  </span>
                </div>
              </div>

              {/* Selected Tests List */}
              <div className="p-6 border-b max-h-80 overflow-y-auto">
                <h3 className="font-semibold text-lg mb-4">Selected Tests</h3>
                <div className="space-y-4">
                  {tests.map((test) => {
                    const discountedPrice = Math.round(
                      test.price - (test.price * (lab?.discount || 0) / 100)
                    );
                    
                    return (
                      <div key={test._id} className="pb-4 border-b last:border-0 hover:bg-gray-50 -mx-3 px-3 py-2 rounded-lg transition">
                        <p className="font-semibold text-gray-800 text-sm mb-1">{test.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                          {test.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base" style={{ color: 'var(--primary-color)' }}>
                              Rs {discountedPrice}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              Rs {test.price}
                            </span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full" style={{
                            backgroundColor: 'var(--primary-soft)',
                            color: 'var(--primary-color)'
                          }}>
                            -{lab?.discount || 0}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 border-b">
                <h3 className="font-semibold text-lg mb-4">Price Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tests Price</span>
                    <span className="font-medium">Rs {total.original}</span>
                  </div>
                  
                  {lab?.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discount</span>
                      <span className="flex items-center gap-2">
                        <FaTag className="text-green-500" />
                        <span className="font-semibold text-green-600">
                          -{lab.discount}% (Rs {total.original - total.final})
                        </span>
                      </span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total Amount</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: 'var(--primary-color)' }}>
                          Rs {total.final}
                        </div>
                        {lab?.discount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            Rs {total.original}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {lab?.discount > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <p className="text-sm font-medium text-green-700 flex items-center gap-2">
                      <span className="text-lg">🎉</span>
                      You save Rs {total.original - total.final} with {lab.discount}% discount!
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Booking Button */}
              <div className="p-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading || !selectedTests?.length}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    loading ? 'cursor-wait' : ''
                  }`}
                  style={{
                    background: 'var(--primary-color)',
                    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)'
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                      Processing Booking...
                    </span>
                  ) : (
                    'Confirm Free Booking'
                  )}
                </button>
                
                <div className="mt-4 text-center space-y-2">
                  <p className="text-xs text-gray-500">
                    No payment required now. Pay after sample collection.
                  </p>
                  <p className="text-xs text-gray-400">
                    By confirming, you agree to our terms
                  </p>
                </div>
              </div>
            </div>

            {/* Help Box */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-600">
                Call us: <span className="font-semibold">1800-123-4567</span>
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Email: <span className="font-semibold">support@labtest.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}