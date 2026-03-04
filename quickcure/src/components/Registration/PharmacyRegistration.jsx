// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaStore,
//   FaUser,
//   FaCertificate,
//   FaMapMarkerAlt,
//   FaLock,
//   FaTruck,
//   FaClock,
//   FaPhone,
//   FaEnvelope,
//   FaEye,
//   FaEdit
// } from "react-icons/fa";

// const PharmacyRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Step 1: Pharmacy Details
//     pharmacyName: "",
//     pharmacyType: "",
//     licenseNumber: "",
//     licenseExpiry: "",
//     yearEstablished: "",

//     // Step 2: Contact Information
//     ownerName: "",
//     email: "",
//     phone: "",

//     // Step 3: Location & Operation
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     deliveryRadius: "",
//     operationHours: "",
//     workingDays: [],

//     // Step 4: Services & Documents
//     services: [],
//     deliveryAvailable: false,
//     acceptsInsurance: false,
//     hasEmergencyDelivery: false,
//     licenseFile: null,
//     taxCertificate: null,
//     ownerIdProof: null,

//     // Step 5: Security
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [apiError, setApiError] = useState("");
  
//   // Ref for the main container to scroll to top
//   const containerRef = useRef(null);

//   const steps = [
//     { icon: <FaStore />, label: "Pharmacy Details" },
//     { icon: <FaUser />, label: "Contact Info" },
//     { icon: <FaMapMarkerAlt />, label: "Location" },
//     { icon: <FaCertificate />, label: "Documents" },
//     { icon: <FaLock />, label: "Security" },
//     { icon: <FaEye />, label: "Review" },
//   ];

//   // Scroll to top whenever step changes
//   useEffect(() => {
//     // Scroll window to top
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
    
//     // Also scroll the container to top if it exists
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0;
//     }
//   }, [step]);

//   const pharmacyTypes = [
//     "Retail Pharmacy",
//     "Hospital Pharmacy", 
//     "Chain Pharmacy",
//     "Independent Pharmacy",
//     "Compounding Pharmacy",
//     "Online Pharmacy"
//   ];

//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
//   const serviceOptions = [
//     "Medicine Delivery",
//     "Prescription Refill",
//     "OTC Products",
//     "Medical Equipment",
//     "Vaccination Services",
//     "Health Check-ups",
//     "24/7 Emergency",
//     "Online Consultation",
//     "Chronic Disease Management"
//   ];

//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === "checkbox") {
//       if (name === "services") {
//         setFormData((prev) => {
//           const newServices = checked
//             ? [...prev.services, value]
//             : prev.services.filter((service) => service !== value);
//           return { ...prev, services: newServices };
//         });
//       } else if (name === "workingDays") {
//         setFormData((prev) => {
//           const newDays = checked
//             ? [...prev.workingDays, value]
//             : prev.workingDays.filter((day) => day !== value);
//           return { ...prev, workingDays: newDays };
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: checked,
//         });
//       }
//     } else if (type === "file") {
//       setFormData({
//         ...formData,
//         [name]: files ? files[0] : null,
//       });
//     } else {
//       // Special handling for phone number input
//       if (name === "phone") {
//         // Remove non-digit characters
//         const digitsOnly = value.replace(/\D/g, '');
        
//         // Limit to 11 digits
//         const limitedDigits = digitsOnly.slice(0, 11);
        
//         // Add country code if starting with 0 (for Pakistan)
//         let formattedPhone = limitedDigits;
//         if (limitedDigits.length > 0 && limitedDigits[0] === '0') {
//           formattedPhone = `+92${limitedDigits.slice(1)}`;
//         }
        
//         setFormData({
//           ...formData,
//           [name]: limitedDigits, // Store only digits
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       }
//     }

//     if (name === "password") evaluatePasswordStrength(value);
//     // Clear API error when user starts typing
//     if (apiError) setApiError("");
//   };

//   const evaluatePasswordStrength = (password) => {
//     if (password.length < 8) setPasswordStrength("Weak");
//     else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
//       setPasswordStrength("Strong");
//     else setPasswordStrength("Medium");
//   };

//   const validateStep = () => {
//     let newErrors = {};

//     if (step === 1) {
//       if (!formData.pharmacyName.trim()) newErrors.pharmacyName = "Pharmacy name is required";
//       if (!formData.pharmacyType) newErrors.pharmacyType = "Pharmacy type is required";
//       if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
//       if (!formData.licenseExpiry) newErrors.licenseExpiry = "License expiry date is required";
//       if (!formData.yearEstablished) newErrors.yearEstablished = "Year established is required";

//     } else if (step === 2) {
//       if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
//       if (!formData.email.trim()) newErrors.email = "Email is required";
//       else if (!/\S+@\S+\.\S+/.test(formData.email))
//         newErrors.email = "Enter a valid email";
      
//       // Updated phone validation for exactly 11 digits
//       if (!formData.phone.trim()) {
//         newErrors.phone = "Phone number is required";
//       } else {
//         const phoneDigits = formData.phone.replace(/\D/g, '');
//         if (phoneDigits.length !== 11) {
//           newErrors.phone = "Phone number must be exactly 11 digits";
//         } else if (!/^03[0-9]{9}$/.test(phoneDigits)) {
//           newErrors.phone = "Phone number must start with 03 and be 11 digits total";
//         }
//       }

//     } else if (step === 3) {
//       if (!formData.address.trim()) newErrors.address = "Address is required";
//       if (!formData.city.trim()) newErrors.city = "City is required";
//       if (!formData.state.trim()) newErrors.state = "State is required";
//       if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
//       if (!formData.deliveryRadius) newErrors.deliveryRadius = "Delivery radius is required";
//       if (!formData.operationHours.trim()) newErrors.operationHours = "Operation hours are required";
//       if (formData.workingDays.length === 0)
//         newErrors.workingDays = "Select at least one working day";

//     } else if (step === 4) {
//       if (formData.services.length === 0)
//         newErrors.services = "Select at least one service";
//       if (!formData.licenseFile) newErrors.licenseFile = "License file is required";
//       if (!formData.taxCertificate) newErrors.taxCertificate = "Tax certificate is required";
//       if (!formData.ownerIdProof) newErrors.ownerIdProof = "Owner ID proof is required";

//     } else if (step === 5) {
//       if (!formData.password.trim()) newErrors.password = "Password is required";
//       else if (formData.password.length < 8)
//         newErrors.password = "Password must be at least 8 characters";
//       if (formData.confirmPassword !== formData.password)
//         newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setStep((prev) => Math.min(prev + 1, steps.length));
//     }
//   };

//   const handlePrevious = () => {
//     setStep((prev) => Math.max(prev - 1, 1));
//   };

//   const handleEditStep = (stepNumber) => {
//     setStep(stepNumber);
//   };

//   const formatPhoneForDisplay = (phoneDigits) => {
//     if (!phoneDigits) return "";
    
//     // Format as 03XX-XXXXXXX
//     if (phoneDigits.length === 11) {
//       return `${phoneDigits.slice(0, 4)}-${phoneDigits.slice(4)}`;
//     }
//     return phoneDigits;
//   };

//   const handleSubmit = async () => {
//     // Validate final step
//     if (!validateStep()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setApiError("");

//     try {
//       // Create FormData object for file uploads
//       const submitFormData = new FormData();
      
//       // Append all form data
//       Object.keys(formData).forEach(key => {
//         const value = formData[key];
        
//         if (typeof value === 'boolean') {
//           submitFormData.append(key, value.toString());
//         } else if (Array.isArray(value)) {
//           submitFormData.append(key, JSON.stringify(value));
//         } else if (value instanceof File) {
//           submitFormData.append(key, value);
//         } else if (value !== null && value !== undefined) {
//           submitFormData.append(key, value.toString());
//         }
//       });
      
//       // Debug: Log what's being sent
//     console.log('Submitting form data:', formData);
//     console.log('Files:', {
//       licenseFile: formData.licenseFile?.name,
//       taxCertificate: formData.taxCertificate?.name,
//       ownerIdProof: formData.ownerIdProof?.name
//     });

//       // Make API call - UPDATED ENDPOINT
//       const response = await fetch('http://localhost:5000/api/pharmacy-registration/register', {
//         method: 'POST',
//         body: submitFormData,
//       });
//       //Log response status
//       console.log('Response status:', response.status);

//       const data = await response.json();
//       console.log('Response data:', data);

//       if (data.success) {
//         setSubmitSuccess(true);
        
//         // Reset form after successful submission
//         setFormData({
//           pharmacyName: "",
//           pharmacyType: "",
//           licenseNumber: "",
//           licenseExpiry: "",
//           yearEstablished: "",
//           ownerName: "",
//           email: "",
//           phone: "",
//           address: "",
//           city: "",
//           state: "",
//           zipCode: "",
//           deliveryRadius: "",
//           operationHours: "",
//           workingDays: [],
//           services: [],
//           deliveryAvailable: false,
//           acceptsInsurance: false,
//           hasEmergencyDelivery: false,
//           licenseFile: null,
//           taxCertificate: null,
//           ownerIdProof: null,
//           password: "",
//           confirmPassword: "",
//         });
//         setStep(1);
//       } else {
//         // Handle validation errors from backend
//         if (data.errors && Array.isArray(data.errors)) {
//           const backendErrors = {};
//           data.errors.forEach(error => {
//             backendErrors[error.param || error.path] = error.msg;
//           });
//           setErrors(backendErrors);
//           // Go to first step with error
//           if (backendErrors.pharmacyName || backendErrors.pharmacyType || 
//               backendErrors.licenseNumber || backendErrors.licenseExpiry || 
//               backendErrors.yearEstablished) {
//             setStep(1);
//           } else if (backendErrors.ownerName || backendErrors.email || backendErrors.phone) {
//             setStep(2);
//           } else if (backendErrors.address || backendErrors.city || backendErrors.state || 
//                    backendErrors.zipCode || backendErrors.deliveryRadius || 
//                    backendErrors.operationHours || backendErrors.workingDays) {
//             setStep(3);
//           } else if (backendErrors.services || backendErrors.licenseFile || 
//                    backendErrors.taxCertificate || backendErrors.ownerIdProof) {
//             setStep(4);
//           } else if (backendErrors.password || backendErrors.confirmPassword) {
//             setStep(5);
//           }
//         } else {
//           setApiError(data.message || 'Registration failed');
//         }
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setApiError('Registration failed. Please check your internet connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <form autoComplete="off">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">
//                   <FaStore className="inline-block mr-2" />
//                   Pharmacy Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="pharmacyName"
//                   placeholder="Enter pharmacy name"
//                   value={formData.pharmacyName}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.pharmacyName && <span className="text-red-500 text-sm mt-1">{errors.pharmacyName}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Pharmacy Type *</label>
//                 <select
//                   name="pharmacyType"
//                   value={formData.pharmacyType}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 >
//                   <option value="">Select Type</option>
//                   {pharmacyTypes.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                   ))}
//                 </select>
//                 {errors.pharmacyType && <span className="text-red-500 text-sm mt-1">{errors.pharmacyType}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Number *</label>
//                 <input
//                   type="text"
//                   name="licenseNumber"
//                   placeholder="Enter license number"
//                   value={formData.licenseNumber}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Expiry Date *</label>
//                 <input
//                   type="date"
//                   name="licenseExpiry"
//                   value={formData.licenseExpiry}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.licenseExpiry && <span className="text-red-500 text-sm mt-1">{errors.licenseExpiry}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Year Established *</label>
//                 <input
//                   type="number"
//                   name="yearEstablished"
//                   placeholder="e.g., 2010"
//                   value={formData.yearEstablished}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   min="1900"
//                   max={new Date().getFullYear()}
//                 />
//                 {errors.yearEstablished && <span className="text-red-500 text-sm mt-1">{errors.yearEstablished}</span>}
//               </div>
//             </div>

//             <div className="flex justify-end mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </form>
//         );

//       case 2:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">
//                 <FaUser className="inline-block mr-2" />
//                 Owner Name *
//               </label>
//               <input
//                 type="text"
//                 name="ownerName"
//                 placeholder="Enter owner's full name"
//                 value={formData.ownerName}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.ownerName && <span className="text-red-500 text-sm mt-1">{errors.ownerName}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">
//                 <FaEnvelope className="inline-block mr-2" />
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter email address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">
//                 <FaPhone className="inline-block mr-2" />
//                 Phone Number *
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="e.g., 03001234567"
//                 value={formatPhoneForDisplay(formData.phone)}
//                 onChange={handleChange}
//                 maxLength={12} // 03XX-XXXXXXX format
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               <div className="flex justify-between items-center mt-1">
//                 {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
//               </div>
//             </div>

//             <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium text-[#174047] mb-1">
//                 <FaMapMarkerAlt className="inline-block mr-2" />
//                 Full Address *
//               </label>
//               <textarea
//                 name="address"
//                 placeholder="Street address, area, landmark"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows="2"
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">City *</label>
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="Enter city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">State *</label>
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="Enter state/province"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.state && <span className="text-red-500 text-sm mt-1">{errors.state}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">ZIP Code *</label>
//               <input
//                 type="text"
//                 name="zipCode"
//                 placeholder="Enter ZIP code"
//                 value={formData.zipCode}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.zipCode && <span className="text-red-500 text-sm mt-1">{errors.zipCode}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">
//                 <FaTruck className="inline-block mr-2" />
//                 Delivery Radius (km) *
//               </label>
//               <select
//                 name="deliveryRadius"
//                 value={formData.deliveryRadius}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               >
//                 <option value="">Select radius</option>
//                 <option value="3">3 km</option>
//                 <option value="5">5 km</option>
//                 <option value="10">10 km</option>
//                 <option value="15">15 km</option>
//                 <option value="20">20 km</option>
//               </select>
//               {errors.deliveryRadius && <span className="text-red-500 text-sm mt-1">{errors.deliveryRadius}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">
//                 <FaClock className="inline-block mr-2" />
//                 Operation Hours *
//               </label>
//               <input
//                 type="text"
//                 name="operationHours"
//                 placeholder="e.g., 9:00 AM - 11:00 PM"
//                 value={formData.operationHours}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.operationHours && <span className="text-red-500 text-sm mt-1">{errors.operationHours}</span>}
//             </div>

//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium text-[#174047] mb-1">Working Days *</label>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {daysOfWeek.map((day) => (
//                   <label key={day} className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="workingDays"
//                       value={day}
//                       checked={formData.workingDays.includes(day)}
//                       onChange={handleChange}
//                       className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
//                     />
//                     {day}
//                   </label>
//                 ))}
//               </div>
//               {errors.workingDays && <span className="text-red-500 text-sm mt-1">{errors.workingDays}</span>}
//             </div>

//             <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col md:col-span-2">
//                 <label className="font-medium text-[#174047] mb-1">Services Offered *</label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {serviceOptions.map((service) => (
//                     <label key={service} className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer p-2 border border-[#c0d3dc] rounded-lg hover:bg-[#f0f7fa]">
//                       <input
//                         type="checkbox"
//                         name="services"
//                         value={service}
//                         checked={formData.services.includes(service)}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
//                       />
//                       {service}
//                     </label>
//                   ))}
//                 </div>
//                 {errors.services && <span className="text-red-500 text-sm mt-1">{errors.services}</span>}
//               </div>

//               <div className="flex flex-col md:col-span-2 space-y-4">
//                 <label className="font-medium text-[#174047]">Additional Options</label>
//                 <div className="space-y-3">
//                   <label className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="deliveryAvailable"
//                       checked={formData.deliveryAvailable}
//                       onChange={handleChange}
//                       className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
//                     />
//                     Free Home Delivery Available
//                   </label>
                  
//                   <label className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="acceptsInsurance"
//                       checked={formData.acceptsInsurance}
//                       onChange={handleChange}
//                       className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
//                     />
//                     Accepts Insurance Claims
//                   </label>
                  
//                   <label className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="hasEmergencyDelivery"
//                       checked={formData.hasEmergencyDelivery}
//                       onChange={handleChange}
//                       className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
//                     />
//                     24/7 Emergency Delivery Service
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Pharmacy License *</label>
//                 <input
//                   type="file"
//                   name="licenseFile"
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
//                 {errors.licenseFile && <span className="text-red-500 text-sm mt-1">{errors.licenseFile}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Tax Certificate *</label>
//                 <input
//                   type="file"
//                   name="taxCertificate"
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
//                 {errors.taxCertificate && <span className="text-red-500 text-sm mt-1">{errors.taxCertificate}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Owner ID Proof *</label>
//                 <input
//                   type="file"
//                   name="ownerIdProof"
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">CNIC, Passport, etc. (max 5MB)</p>
//                 {errors.ownerIdProof && <span className="text-red-500 text-sm mt-1">{errors.ownerIdProof}</span>}
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Password *</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {passwordStrength && (
//                 <span className={`text-sm mt-1 ${
//                   passwordStrength === "Weak" ? "text-red-500" :
//                   passwordStrength === "Medium" ? "text-yellow-500" :
//                   "text-green-500"
//                 }`}>
//                   Strength: {passwordStrength}
//                 </span>
//               )}
//               {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Confirm Password *</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Re-enter your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.confirmPassword && (
//                 <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
//               )}
//             </div>

//             <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Review & Submit →
//               </button>
//             </div>
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
//               <h3 className="text-lg font-semibold text-[#174047] mb-2">
//                 <FaEye className="inline-block mr-2" />
//                 Review Your Information
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Please review all the information carefully before submitting. If you need to make any changes, click the edit button for that section.
//               </p>
//             </div>

//             {/* API Error Message */}
//             {apiError && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="flex items-center text-red-800">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="font-medium">Error</span>
//                 </div>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//               </div>
//             )}

//             {/* Review Sections */}
//             <div className="space-y-6">
//               {/* Pharmacy Details Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Pharmacy Details</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(1)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//                   <div><span className="text-gray-600">Pharmacy Name:</span> <span className="font-medium">{formData.pharmacyName || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Pharmacy Type:</span> <span className="font-medium">{formData.pharmacyType || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">License Number:</span> <span className="font-medium">{formData.licenseNumber || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">License Expiry:</span> <span className="font-medium">{formData.licenseExpiry || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Year Established:</span> <span className="font-medium">{formData.yearEstablished || "Not provided"}</span></div>
//                 </div>
//               </div>

//               {/* Contact Information Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Contact Information</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(2)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//                   <div><span className="text-gray-600">Owner Name:</span> <span className="font-medium">{formData.ownerName || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone ? `+92${formData.phone.slice(1)}` : "Not provided"}</span></div>
//                 </div>
//               </div>

//               {/* Location & Operation Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Location & Operation</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(3)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div><span className="text-gray-600">Address:</span> <span className="font-medium">{formData.address || "Not provided"}</span></div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                     <div><span className="text-gray-600">City:</span> <span className="font-medium">{formData.city || "Not provided"}</span></div>
//                     <div><span className="text-gray-600">State:</span> <span className="font-medium">{formData.state || "Not provided"}</span></div>
//                     <div><span className="text-gray-600">ZIP Code:</span> <span className="font-medium">{formData.zipCode || "Not provided"}</span></div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     <div><span className="text-gray-600">Delivery Radius:</span> <span className="font-medium">{formData.deliveryRadius ? `${formData.deliveryRadius} km` : "Not provided"}</span></div>
//                     <div><span className="text-gray-500">Operation Hours:</span> <span className="font-medium">{formData.operationHours || "Not provided"}</span></div>
//                   </div>
//                   <div><span className="text-gray-600">Working Days:</span> <span className="font-medium">{formData.workingDays.length > 0 ? formData.workingDays.join(", ") : "Not provided"}</span></div>
//                 </div>
//               </div>

//               {/* Services & Documents Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Services & Documents</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(4)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="space-y-3 text-sm">
//                   <div><span className="text-gray-600">Services Offered:</span> <span className="font-medium">{formData.services.length > 0 ? formData.services.join(", ") : "Not provided"}</span></div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                     <div><span className="text-gray-600">Free Delivery:</span> <span className="font-medium">{formData.deliveryAvailable ? "Yes" : "No"}</span></div>
//                     <div><span className="text-gray-600">Accepts Insurance:</span> <span className="font-medium">{formData.acceptsInsurance ? "Yes" : "No"}</span></div>
//                     <div><span className="text-gray-600">Emergency Delivery:</span> <span className="font-medium">{formData.hasEmergencyDelivery ? "Yes" : "No"}</span></div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
//                     <div className={`px-3 py-1 rounded text-xs font-medium ${formData.licenseFile ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       License: {formData.licenseFile ? formData.licenseFile.name : "✗ Required"}
//                     </div>
//                     <div className={`px-3 py-1 rounded text-xs font-medium ${formData.taxCertificate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       Tax Cert: {formData.taxCertificate ? formData.taxCertificate.name : "✗ Required"}
//                     </div>
//                     <div className={`px-3 py-1 rounded text-xs font-medium ${formData.ownerIdProof ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       ID Proof: {formData.ownerIdProof ? formData.ownerIdProof.name : "✗ Required"}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Security Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Security</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(5)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div><span className="text-gray-600">Password:</span> <span className="font-medium">••••••••</span></div>
//                   <div><span className="text-gray-600">Password Strength:</span> <span className={`font-medium ${
//                     passwordStrength === "Weak" ? "text-red-600" :
//                     passwordStrength === "Medium" ? "text-yellow-600" :
//                     "text-green-600"
//                   }`}>{passwordStrength || "Not set"}</span></div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button
//                 type="button"
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
//                     Submitting...
//                   </>
//                 ) : (
//                   'Submit Registration'
//                 )}
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (submitSuccess) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4">
//         <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
//           <div className="mb-6">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#174047] mb-2">Registration Submitted Successfully!</h2>
            
//             <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
//               <p className="text-sm text-gray-600">
//                 Our admin team will review your application and get back to you within 24 hours.
//               </p>
//             </div>

//             <div className="space-y-3">
//               <button
//                 onClick={() => {
//                   setSubmitSuccess(false);
//                   setStep(1);
//                 }}
//                 className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
//               >
//                 Register Another Pharmacy
//               </button>
//               {/* <button
//                 onClick={() => {
//                   setSubmitSuccess(false);
//                   // Here you can redirect to login page or home page
//                   window.location.href = '/login';
//                 }}
//                 className="w-full bg-transparent hover:bg-[#f8f9fa] text-[#2c6774] py-3 px-4 rounded-lg font-semibold border border-[#2c6774] transition-all duration-300"
//               >
//                 Go to Login
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Pharmacy Registration</h1>
//           <p className="text-[#174047]">Join our network to provide free home delivery of medicines</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="flex justify-between items-start relative mb-8">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center relative z-10 flex-1">
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   step >= index + 1 
//                     ? "bg-[#2c6774] text-white scale-110" 
//                     : "bg-[#c0d3dc] text-[#174047]"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-sm font-medium text-[#174047] mt-2 text-center">{s.label}</p>
              
//               {/* Connector line */}
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-6 left-5/8 w-5/6 h-1 transition-colors duration-300 ${
//                     step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
//                   }`}
//                   style={{ top: '33%', transform: 'translateY(-50%)' }}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
//             {steps[step - 1].label}
//           </h2>
          
//           {/* Show API error at top if exists */}
//           {apiError && step !== 6 && (
//             <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center text-red-800">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <span className="font-medium">Error</span>
//               </div>
//               <p className="mt-1 text-sm text-red-700">{apiError}</p>
//             </div>
//           )}
          
//           {renderStepContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyRegistration;





// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaStore,
//   FaUser,
//   FaCertificate,
//   FaMapMarkerAlt,
//   FaEye,
//   FaEdit,
//   FaPhone,
//   FaEnvelope
// } from "react-icons/fa";

// const PharmacyRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Step 1: Pharmacy Details
//     pharmacyName: "",
//     pharmacyType: "",
//     licenseNumber: "",
//     licenseExpiry: "",
//     yearEstablished: "",

//     // Step 2: Contact Information
//     ownerName: "",
//     email: "",
//     phone: "",

//     // Step 3: Location & Operation
//     address: "",
//     city: "",
//     state: "",

//     // Step 4: Documents
//     licenseFile: null,
//     taxCertificate: null,
//     ownerIdProof: null,

//     // Step 5: Review (no data needed)
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [apiError, setApiError] = useState("");
  
//   // Ref for the main container to scroll to top
//   const containerRef = useRef(null);

//   const steps = [
//     { icon: <FaStore />, label: "Pharmacy Details" },
//     { icon: <FaUser />, label: "Contact Info" },
//     { icon: <FaMapMarkerAlt />, label: "Location" },
//     { icon: <FaCertificate />, label: "Documents" },
//     { icon: <FaEye />, label: "Review" },
//   ];

//   // Scroll to top whenever step changes
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
    
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0;
//     }
//   }, [step]);

//   const pharmacyTypes = [
//     "Retail Pharmacy",
//     "Hospital Pharmacy", 
//     "Chain Pharmacy",
//     "Independent Pharmacy",
//     "Compounding Pharmacy",
//     "Online Pharmacy"
//   ];

//   const handleChange = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file") {
//       setFormData({
//         ...formData,
//         [name]: files ? files[0] : null,
//       });
//     } else {
//       // Special handling for phone number input
//       if (name === "phone") {
//         // Remove non-digit characters
//         const digitsOnly = value.replace(/\D/g, '');
        
//         // Limit to 11 digits
//         const limitedDigits = digitsOnly.slice(0, 11);
        
//         setFormData({
//           ...formData,
//           [name]: limitedDigits, // Store only digits
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       }
//     }

//     // Clear API error when user starts typing
//     if (apiError) setApiError("");
//   };

//   const validateStep = () => {
//     let newErrors = {};

//     if (step === 1) {
//       if (!formData.pharmacyName.trim()) newErrors.pharmacyName = "Pharmacy name is required";
//       if (!formData.pharmacyType) newErrors.pharmacyType = "Pharmacy type is required";
//       if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
//       if (!formData.licenseExpiry) newErrors.licenseExpiry = "License expiry date is required";
//       if (!formData.yearEstablished) newErrors.yearEstablished = "Year established is required";

//     } else if (step === 2) {
//       if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
//       if (!formData.email.trim()) newErrors.email = "Email is required";
//       else if (!/\S+@\S+\.\S+/.test(formData.email))
//         newErrors.email = "Enter a valid email";
      
//       if (!formData.phone.trim()) {
//         newErrors.phone = "Phone number is required";
//       } else {
//         const phoneDigits = formData.phone.replace(/\D/g, '');
//         if (phoneDigits.length !== 11) {
//           newErrors.phone = "Phone number must be exactly 11 digits";
//         } else if (!/^03[0-9]{9}$/.test(phoneDigits)) {
//           newErrors.phone = "Phone number must start with 03 and be 11 digits total";
//         }
//       }

//     } else if (step === 3) {
//       if (!formData.address.trim()) newErrors.address = "Address is required";
//       if (!formData.city.trim()) newErrors.city = "City is required";
//       if (!formData.state.trim()) newErrors.state = "State is required";

//     } else if (step === 4) {
//       if (!formData.licenseFile) newErrors.licenseFile = "License file is required";
//       if (!formData.taxCertificate) newErrors.taxCertificate = "Tax certificate is required";
//       if (!formData.ownerIdProof) newErrors.ownerIdProof = "Owner ID proof is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setStep((prev) => Math.min(prev + 1, steps.length));
//     }
//   };

//   const handlePrevious = () => {
//     setStep((prev) => Math.max(prev - 1, 1));
//   };

//   const handleEditStep = (stepNumber) => {
//     setStep(stepNumber);
//   };

//   const formatPhoneForDisplay = (phoneDigits) => {
//     if (!phoneDigits) return "";
    
//     // Format as 03XX-XXXXXXX
//     if (phoneDigits.length === 11) {
//       return `${phoneDigits.slice(0, 4)}-${phoneDigits.slice(4)}`;
//     }
//     return phoneDigits;
//   };

//   const handleSubmit = async () => {
//     // Validate final step
//     if (!validateStep()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setApiError("");

//     try {
//       // Simulate API call with localStorage
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Store in localStorage (simulating successful registration)
//       const registrationData = {
//         pharmacyName: formData.pharmacyName,
//         pharmacyType: formData.pharmacyType,
//         licenseNumber: formData.licenseNumber,
//         licenseExpiry: formData.licenseExpiry,
//         yearEstablished: formData.yearEstablished,
//         ownerName: formData.ownerName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         licenseFile: formData.licenseFile ? {
//           name: formData.licenseFile.name,
//           size: formData.licenseFile.size,
//           type: formData.licenseFile.type
//         } : null,
//         taxCertificate: formData.taxCertificate ? {
//           name: formData.taxCertificate.name,
//           size: formData.taxCertificate.size,
//           type: formData.taxCertificate.type
//         } : null,
//         ownerIdProof: formData.ownerIdProof ? {
//           name: formData.ownerIdProof.name,
//           size: formData.ownerIdProof.size,
//           type: formData.ownerIdProof.type
//         } : null,
//         registeredAt: new Date().toISOString()
//       };
      
//       localStorage.setItem('pharmacyRegistration', JSON.stringify(registrationData));
      
//       // Simulate successful response
//       setSubmitSuccess(true);
      
//       // Reset form after successful submission
//       setFormData({
//         pharmacyName: "",
//         pharmacyType: "",
//         licenseNumber: "",
//         licenseExpiry: "",
//         yearEstablished: "",
//         ownerName: "",
//         email: "",
//         phone: "",
//         address: "",
//         city: "",
//         state: "",
//         licenseFile: null,
//         taxCertificate: null,
//         ownerIdProof: null,
//       });
//       setStep(1);
//     } catch (error) {
//       console.error('Registration error:', error);
//       setApiError('Registration failed. Please check your internet connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">
//                   <FaStore className="inline-block mr-2" />
//                   Pharmacy Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="pharmacyName"
//                   placeholder="Enter pharmacy name"
//                   value={formData.pharmacyName}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.pharmacyName && <span className="text-red-500 text-sm mt-1">{errors.pharmacyName}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Pharmacy Type *</label>
//                 <select
//                   name="pharmacyType"
//                   value={formData.pharmacyType}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 >
//                   <option value="">Select Type</option>
//                   {pharmacyTypes.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                   ))}
//                 </select>
//                 {errors.pharmacyType && <span className="text-red-500 text-sm mt-1">{errors.pharmacyType}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Number *</label>
//                 <input
//                   type="text"
//                   name="licenseNumber"
//                   placeholder="e.g.,Su DA 1234 56789"
//                   value={formData.licenseNumber}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Expiry Date *</label>
//                 <input
//                   type="date"
//                   name="licenseExpiry"
//                   value={formData.licenseExpiry}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.licenseExpiry && <span className="text-red-500 text-sm mt-1">{errors.licenseExpiry}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Year Established *</label>
//                 <input
//                   type="number"
//                   name="yearEstablished"
//                   placeholder="e.g., 2010"
//                   value={formData.yearEstablished}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   min="1900"
//                   max={new Date().getFullYear()}
//                 />
//                 {errors.yearEstablished && <span className="text-red-500 text-sm mt-1">{errors.yearEstablished}</span>}
//               </div>
//             </div>

//             <div className="flex justify-end mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">
//                   <FaUser className="inline-block mr-2" />
//                   Owner Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="ownerName"
//                   placeholder="Enter owner's full name"
//                   value={formData.ownerName}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.ownerName && <span className="text-red-500 text-sm mt-1">{errors.ownerName}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">
//                   <FaEnvelope className="inline-block mr-2" />
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">
//                   <FaPhone className="inline-block mr-2" />
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="e.g., 03001234567"
//                   value={formatPhoneForDisplay(formData.phone)}
//                   onChange={handleChange}
//                   maxLength={12}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col md:col-span-2">
//                 <label className="font-medium text-[#174047] mb-1">
//                   <FaMapMarkerAlt className="inline-block mr-2" />
//                   Full Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   placeholder="Street address, area, landmark"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows="2"
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">City *</label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Enter city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">State *</label>
//                 <input
//                   type="text"
//                   name="state"
//                   placeholder="Enter state/province"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.state && <span className="text-red-500 text-sm mt-1">{errors.state}</span>}
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Pharmacy License *</label>
//                 <input
//                   type="file"
//                   name="licenseFile"
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
//                 {errors.licenseFile && <span className="text-red-500 text-sm mt-1">{errors.licenseFile}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Tax Certificate *</label>
//                 <input
//                   type="file"
//                   name="taxCertificate"
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
//                 {errors.taxCertificate && <span className="text-red-500 text-sm mt-1">{errors.taxCertificate}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Owner ID Proof *</label>
//                 <input
//                   type="file"
//                   name="ownerIdProof"
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">CNIC, Passport, etc. (max 5MB)</p>
//                 {errors.ownerIdProof && <span className="text-red-500 text-sm mt-1">{errors.ownerIdProof}</span>}
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handleNext}
//               >
//                 Review →
//               </button>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
//               <h3 className="text-lg font-semibold text-[#174047] mb-2">
//                 <FaEye className="inline-block mr-2" />
//                 Review Your Information
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Please review all the information carefully before submitting. If you need to make any changes, click the edit button for that section.
//               </p>
//             </div>

//             {/* API Error Message */}
//             {apiError && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="flex items-center text-red-800">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="font-medium">Error</span>
//                 </div>
//                 <p className="mt-1 text-sm text-red-700">{apiError}</p>
//               </div>
//             )}

//             {/* Review Sections */}
//             <div className="space-y-6">
//               {/* Pharmacy Details Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Pharmacy Details</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(1)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//                   <div><span className="text-gray-600">Pharmacy Name:</span> <span className="font-medium">{formData.pharmacyName || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Pharmacy Type:</span> <span className="font-medium">{formData.pharmacyType || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">License Number:</span> <span className="font-medium">{formData.licenseNumber || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">License Expiry:</span> <span className="font-medium">{formData.licenseExpiry || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Year Established:</span> <span className="font-medium">{formData.yearEstablished || "Not provided"}</span></div>
//                 </div>
//               </div>

//               {/* Contact Information Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Contact Information</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(2)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//                   <div><span className="text-gray-600">Owner Name:</span> <span className="font-medium">{formData.ownerName || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email || "Not provided"}</span></div>
//                   <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone ? `03${formData.phone.slice(1)}` : "Not provided"}</span></div>
//                 </div>
//               </div>

//               {/* Location Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Location</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(3)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div><span className="text-gray-600">Address:</span> <span className="font-medium">{formData.address || "Not provided"}</span></div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     <div><span className="text-gray-600">City:</span> <span className="font-medium">{formData.city || "Not provided"}</span></div>
//                     <div><span className="text-gray-600">State:</span> <span className="font-medium">{formData.state || "Not provided"}</span></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Documents Review */}
//               <div className="border border-[#c0d3dc] rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-semibold text-[#174047]">Documents</h4>
//                   <button
//                     type="button"
//                     onClick={() => handleEditStep(4)}
//                     className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//                   >
//                     <FaEdit className="mr-1 h-3 w-3" /> Edit
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
//                   <div className={`px-3 py-1 rounded text-xs font-medium ${formData.licenseFile ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     License: {formData.licenseFile ? "✓ Uploaded" : "✗ Required"}
//                   </div>
//                   <div className={`px-3 py-1 rounded text-xs font-medium ${formData.taxCertificate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     Tax Cert: {formData.taxCertificate ? "✓ Uploaded" : "✗ Required"}
//                   </div>
//                   <div className={`px-3 py-1 rounded text-xs font-medium ${formData.ownerIdProof ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     ID Proof: {formData.ownerIdProof ? "✓ Uploaded" : "✗ Required"}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button
//                 type="button"
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
//                     Submitting...
//                   </>
//                 ) : (
//                   'Submit Registration'
//                 )}
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (submitSuccess) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4">
//         <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
//           <div className="mb-6">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#174047] mb-2">Registration Submitted Successfully!</h2>
            
//             <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
//               <p className="text-sm text-gray-600">
//                 Our admin team will review your application and get back to you within 24 hours.
//               </p>
//             </div>

//             <div className="space-y-3">
//               <button
//                 onClick={() => {
//                   setSubmitSuccess(false);
//                   setStep(1);
//                 }}
//                 className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
//               >
//                 Register Another Pharmacy
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Pharmacy Registration</h1>
//           <p className="text-[#174047]">Join our network to provide free home delivery of medicines</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="flex justify-between items-start relative mb-8">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center relative z-10 flex-1">
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   step >= index + 1 
//                     ? "bg-[#2c6774] text-white scale-110" 
//                     : "bg-[#c0d3dc] text-[#174047]"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-sm font-medium text-[#174047] mt-2 text-center">{s.label}</p>
              
//               {/* Connector line */}
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-6 left-5/8 w-5/6 h-1 transition-colors duration-300 ${
//                     step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
//                   }`}
//                   style={{ top: '33%', transform: 'translateY(-50%)' }}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
//             {steps[step - 1].label}
//           </h2>
          
//           {/* Show API error at top if exists */}
//           {apiError && step !== 5 && (
//             <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center text-red-800">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <span className="font-medium">Error</span>
//               </div>
//               <p className="mt-1 text-sm text-red-700">{apiError}</p>
//             </div>
//           )}
          
//           {renderStepContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyRegistration;





import React, { useState, useEffect, useRef } from "react";
import {
  FaStore,
  FaUser,
  FaCertificate,
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";
import axios from "axios";

const PharmacyRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Pharmacy Details
    pharmacyName: "",
    pharmacyType: "",
    licenseNumber: "",
    licenseExpiry: "",
    yearEstablished: "",

    // Step 2: Contact Information
    ownerName: "",
    email: "",
    phone: "",

    // Step 3: Location & Operation
    address: "",
    city: "",
    state: "",

    // Step 4: Documents
    licenseFile: null,
    taxCertificate: null,
    ownerIdProof: null,

    // Step 5: Review (no data needed)
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  
  // Ref for the main container to scroll to top
  const containerRef = useRef(null);

  const steps = [
    { icon: <FaStore />, label: "Pharmacy Details" },
    { icon: <FaUser />, label: "Contact Info" },
    { icon: <FaMapMarkerAlt />, label: "Location" },
    { icon: <FaCertificate />, label: "Documents" },
    { icon: <FaEye />, label: "Review" },
  ];

  // Scroll to top whenever step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  const pharmacyTypes = [
    "Retail Pharmacy",
    "Hospital Pharmacy", 
    "Chain Pharmacy",
    "Independent Pharmacy",
    "Compounding Pharmacy",
    "Online Pharmacy"
  ];

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files ? files[0] : null,
      });
    } else {
      // Special handling for phone number input
      if (name === "phone") {
        // Remove non-digit characters
        const digitsOnly = value.replace(/\D/g, '');
        
        // Limit to 11 digits
        const limitedDigits = digitsOnly.slice(0, 11);
        
        setFormData({
          ...formData,
          [name]: limitedDigits, // Store only digits
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }

    // Clear API error when user starts typing
    if (apiError) setApiError("");
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.pharmacyName.trim()) newErrors.pharmacyName = "Pharmacy name is required";
      if (!formData.pharmacyType) newErrors.pharmacyType = "Pharmacy type is required";
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
      if (!formData.licenseExpiry) newErrors.licenseExpiry = "License expiry date is required";
      if (!formData.yearEstablished) newErrors.yearEstablished = "Year established is required";

    } else if (step === 2) {
      if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Enter a valid email";
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else {
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11) {
          newErrors.phone = "Phone number must be exactly 11 digits";
        } else if (!/^03[0-9]{9}$/.test(phoneDigits)) {
          newErrors.phone = "Phone number must start with 03 and be 11 digits total";
        }
      }

    } else if (step === 3) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";

    } else if (step === 4) {
      if (!formData.licenseFile) newErrors.licenseFile = "License file is required";
      if (!formData.taxCertificate) newErrors.taxCertificate = "Tax certificate is required";
      if (!formData.ownerIdProof) newErrors.ownerIdProof = "Owner ID proof is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEditStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const formatPhoneForDisplay = (phoneDigits) => {
    if (!phoneDigits) return "";
    
    // Format as 03XX-XXXXXXX
    if (phoneDigits.length === 11) {
      return `${phoneDigits.slice(0, 4)}-${phoneDigits.slice(4)}`;
    }
    return phoneDigits;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const data = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        if (
          key !== "licenseFile" &&
          key !== "taxCertificate" &&
          key !== "ownerIdProof"
        ) {
          data.append(key, formData[key]);
        }
      });

      // Append files
      data.append("licenseFile", formData.licenseFile);
      data.append("taxCertificate", formData.taxCertificate);
      data.append("ownerIdProof", formData.ownerIdProof);

      const response = await axios.post(
        "http://localhost:5000/api/pharmacy/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          pharmacyName: "",
          pharmacyType: "",
          licenseNumber: "",
          licenseExpiry: "",
          yearEstablished: "",
          ownerName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          licenseFile: null,
          taxCertificate: null,
          ownerIdProof: null,
        });
        setStep(1);
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">
                  <FaStore className="inline-block mr-2" />
                  Pharmacy Name *
                </label>
                <input
                  type="text"
                  name="pharmacyName"
                  placeholder="Enter pharmacy name"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.pharmacyName && <span className="text-red-500 text-sm mt-1">{errors.pharmacyName}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Pharmacy Type *</label>
                <select
                  name="pharmacyType"
                  value={formData.pharmacyType}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                >
                  <option value="">Select Type</option>
                  {pharmacyTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.pharmacyType && <span className="text-red-500 text-sm mt-1">{errors.pharmacyType}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">License Number *</label>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="e.g.,Su DA 1234 56789"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">License Expiry Date *</label>
                <input
                  type="date"
                  name="licenseExpiry"
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.licenseExpiry && <span className="text-red-500 text-sm mt-1">{errors.licenseExpiry}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Year Established *</label>
                <input
                  type="number"
                  name="yearEstablished"
                  placeholder="e.g., 2010"
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  min="1900"
                  max={new Date().getFullYear()}
                />
                {errors.yearEstablished && <span className="text-red-500 text-sm mt-1">{errors.yearEstablished}</span>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">
                  <FaUser className="inline-block mr-2" />
                  Owner Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Enter owner's full name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.ownerName && <span className="text-red-500 text-sm mt-1">{errors.ownerName}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">
                  <FaEnvelope className="inline-block mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">
                  <FaPhone className="inline-block mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g., 03001234567"
                  value={formatPhoneForDisplay(formData.phone)}
                  onChange={handleChange}
                  maxLength={12}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-[#174047] mb-1">
                  <FaMapMarkerAlt className="inline-block mr-2" />
                  Full Address *
                </label>
                <textarea
                  name="address"
                  placeholder="Street address, area, landmark"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter state/province"
                  value={formData.state}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.state && <span className="text-red-500 text-sm mt-1">{errors.state}</span>}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Pharmacy License *</label>
                <input
                  type="file"
                  name="licenseFile"
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
                {errors.licenseFile && <span className="text-red-500 text-sm mt-1">{errors.licenseFile}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Tax Certificate *</label>
                <input
                  type="file"
                  name="taxCertificate"
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
                {errors.taxCertificate && <span className="text-red-500 text-sm mt-1">{errors.taxCertificate}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Owner ID Proof *</label>
                <input
                  type="file"
                  name="ownerIdProof"
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-500 mt-1">CNIC, Passport, etc. (max 5MB)</p>
                {errors.ownerIdProof && <span className="text-red-500 text-sm mt-1">{errors.ownerIdProof}</span>}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Review →
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-[#174047] mb-2">
                <FaEye className="inline-block mr-2" />
                Review Your Information
              </h3>
              <p className="text-sm text-gray-600">
                Please review all the information carefully before submitting. If you need to make any changes, click the edit button for that section.
              </p>
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center text-red-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Error</span>
                </div>
                <p className="mt-1 text-sm text-red-700">{apiError}</p>
              </div>
            )}

            {/* Review Sections */}
            <div className="space-y-6">
              {/* Pharmacy Details Review */}
              <div className="border border-[#c0d3dc] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-[#174047]">Pharmacy Details</h4>
                  <button
                    type="button"
                    onClick={() => handleEditStep(1)}
                    className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
                  >
                    <FaEdit className="mr-1 h-3 w-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-600">Pharmacy Name:</span> <span className="font-medium">{formData.pharmacyName || "Not provided"}</span></div>
                  <div><span className="text-gray-600">Pharmacy Type:</span> <span className="font-medium">{formData.pharmacyType || "Not provided"}</span></div>
                  <div><span className="text-gray-600">License Number:</span> <span className="font-medium">{formData.licenseNumber || "Not provided"}</span></div>
                  <div><span className="text-gray-600">License Expiry:</span> <span className="font-medium">{formData.licenseExpiry || "Not provided"}</span></div>
                  <div><span className="text-gray-600">Year Established:</span> <span className="font-medium">{formData.yearEstablished || "Not provided"}</span></div>
                </div>
              </div>

              {/* Contact Information Review */}
              <div className="border border-[#c0d3dc] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-[#174047]">Contact Information</h4>
                  <button
                    type="button"
                    onClick={() => handleEditStep(2)}
                    className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
                  >
                    <FaEdit className="mr-1 h-3 w-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-600">Owner Name:</span> <span className="font-medium">{formData.ownerName || "Not provided"}</span></div>
                  <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email || "Not provided"}</span></div>
                  <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone ? `03${formData.phone.slice(1)}` : "Not provided"}</span></div>
                </div>
              </div>

              {/* Location Review */}
              <div className="border border-[#c0d3dc] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-[#174047]">Location</h4>
                  <button
                    type="button"
                    onClick={() => handleEditStep(3)}
                    className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
                  >
                    <FaEdit className="mr-1 h-3 w-3" /> Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-600">Address:</span> <span className="font-medium">{formData.address || "Not provided"}</span></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div><span className="text-gray-600">City:</span> <span className="font-medium">{formData.city || "Not provided"}</span></div>
                    <div><span className="text-gray-600">State:</span> <span className="font-medium">{formData.state || "Not provided"}</span></div>
                  </div>
                </div>
              </div>

              {/* Documents Review */}
              <div className="border border-[#c0d3dc] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-[#174047]">Documents</h4>
                  <button
                    type="button"
                    onClick={() => handleEditStep(4)}
                    className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
                  >
                    <FaEdit className="mr-1 h-3 w-3" /> Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <div className={`px-3 py-1 rounded text-xs font-medium ${formData.licenseFile ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    License: {formData.licenseFile ? "✓ Uploaded" : "✗ Required"}
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${formData.taxCertificate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Tax Cert: {formData.taxCertificate ? "✓ Uploaded" : "✗ Required"}
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${formData.ownerIdProof ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    ID Proof: {formData.ownerIdProof ? "✓ Uploaded" : "✗ Required"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button
                type="button"
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#174047] mb-2">Registration Submitted Successfully!</h2>
            
            <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Our admin team will review your application and get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setStep(1);
                }}
                className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
              >
                Register Another Pharmacy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Pharmacy Registration</h1>
          <p className="text-[#174047]">Join our network to provide free home delivery of medicines</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-start relative mb-8">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-12 h-12 rounded-full z-100 flex items-center justify-center transition-all duration-300 ${
                  step >= index + 1 
                    ? "bg-[#2c6774] text-white scale-110" 
                    : "bg-[#c0d3dc] text-[#174047]"
                }`}
              >
                {s.icon}
              </div>
              <p className="text-sm font-medium text-[#174047] mt-2 text-center">{s.label}</p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-5/8  w-5/6 h-1 transition-colors duration-300 ${
                    step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
                  }`}
                  style={{ top: '33%', transform: 'translateY(-50%)' }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
            {steps[step - 1].label}
          </h2>
          
          {/* Show API error at top if exists */}
          {apiError && step !== 5 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center text-red-800">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Error</span>
              </div>
              <p className="mt-1 text-sm text-red-700">{apiError}</p>
            </div>
          )}
          
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default PharmacyRegistration;