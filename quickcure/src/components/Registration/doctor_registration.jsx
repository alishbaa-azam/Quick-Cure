// The below code has API integration and connected with backend
// import React, { useState } from "react";
// import {
//   FaUserMd,
//   FaGraduationCap,
//   FaBriefcase,
//   FaComments,
//   FaLock,
// } from "react-icons/fa";

// const DoctorRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: "",
//     dob: "",
//     cnic: "",
//     address: "",
//     city: "",
//     country: "",
//     file: null,

//     qualification: "",
//     specialization: "",
//     institute: "",
//     passingYear: "",

//     experienceYears: "",
//     currentHospital: "",
//     designation: "",
//     licenseNumber: "",

//     onlineFee: 1500,
//     consultationHours: "",
//     availableDays: [],

//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const steps = [
//     { icon: <FaUserMd />, label: "Personal" },
//     { icon: <FaGraduationCap />, label: "Education" },
//     { icon: <FaBriefcase />, label: "Professional" },
//     { icon: <FaComments />, label: "Consultation" },
//     { icon: <FaLock />, label: "Security" },
//   ];

//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData((prev) => {
//         const newDays = checked
//           ? [...prev.availableDays, value]
//           : prev.availableDays.filter((day) => day !== value);
//         return { ...prev, availableDays: newDays };
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: files ? files[0] : value,
//       });
//     }

//     if (name === "password") evaluatePasswordStrength(value);
//   };

//   const evaluatePasswordStrength = (password) => {
//     if (password.length < 6) setPasswordStrength("Weak");
//     else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
//       setPasswordStrength("Strong");
//     else setPasswordStrength("Medium");
//   };

//   // ✅ Validation per step
//   const validateStep = () => {
//     let newErrors = {};

//     if (step === 1) {
//       if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//       if (!formData.email.trim()) newErrors.email = "Email is required";
//       else if (!/\S+@\S+\.\S+/.test(formData.email))
//         newErrors.email = "Enter a valid email";
//       if (!formData.phone.trim()) newErrors.phone = "Phone number required";
//       else if (!/^[0-9]{11}$/.test(formData.phone))
//         newErrors.phone = "Invalid phone number or number must be 11 digits";
//       if (!formData.gender) newErrors.gender = "Gender required";
//       if (!formData.dob) newErrors.dob = "Date of birth required";
//       if (!formData.cnic.trim()) newErrors.cnic = "CNIC required";
//       else if (!/^[0-9]{13}$/.test(formData.cnic))
//         newErrors.cnic = "CNIC must be 13 digits";
//       if (!formData.address.trim()) newErrors.address = "Address required";
//       if (!formData.city.trim()) newErrors.city = "City required";
//       if (!formData.country.trim()) newErrors.country = "Country required";
//     } else if (step === 2) {
//       if (!formData.qualification) newErrors.qualification = "Qualification required";
//       if (!formData.specialization) newErrors.specialization = "Specialization required";
//       if (!formData.institute.trim()) newErrors.institute = "Institute required";
//       if (!formData.passingYear) newErrors.passingYear = "Passing year required";
//     } else if (step === 3) {
//      if (!formData.experienceYears.trim())
//   newErrors.experienceYears = "Experience duration required";
//       if (!formData.currentHospital.trim())
//         newErrors.currentHospital = "Current hospital required";
//       if (!formData.designation.trim())
//         newErrors.designation = "Designation required";
//       if (!formData.licenseNumber.trim())
//         newErrors.licenseNumber = "License number required";
//     } else if (step === 4) {
//       if (!formData.onlineFee) newErrors.onlineFee = "Fee required";
//       if (!formData.consultationHours.trim())
//         newErrors.consultationHours = "Consultation hours required";
//       if (formData.availableDays.length === 0)
//         newErrors.availableDays = "Select at least one available day";
//     } else if (step === 5) {
//       if (!formData.password.trim()) newErrors.password = "Password required";
//       else if (formData.password.length < 6)
//         newErrors.password = "Password must be at least 6 characters";
//       if (formData.confirmPassword !== formData.password)
//         newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) setStep((prev) => Math.min(prev + 1, steps.length));
//   };
//   const handlePrevious = () => {
//     setStep((prev) => Math.max(prev - 1, 1));
//   };

//   // ✅ API Integration - Submit Form
// const handleSubmit = async () => {
//   // Clear previous messages
//   setSubmitSuccess(false);
//   setSubmitError("");
  
//   // Validate final step
//   if (!validateStep()) {
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     // Create FormData for file upload
//     const formDataToSend = new FormData();
    
//     // Append all form fields to match backend model
//     // Personal Information
//     formDataToSend.append('fullName', formData.fullName);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('phone', formData.phone);
//     formDataToSend.append('gender', formData.gender);
//     formDataToSend.append('dob', formData.dob);
//     formDataToSend.append('cnic', formData.cnic);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('city', formData.city);
//     formDataToSend.append('country', formData.country);
    
//     // Education Information
//     formDataToSend.append('qualification', formData.qualification);
//     formDataToSend.append('specialization', formData.specialization);
//     formDataToSend.append('institute', formData.institute);
//     formDataToSend.append('passingYear', formData.passingYear);
    
//     // Professional Information
//     formDataToSend.append('experienceYears', formData.experienceYears);
//     formDataToSend.append('currentHospital', formData.currentHospital);
//     formDataToSend.append('designation', formData.designation);
//     formDataToSend.append('licenseNumber', formData.licenseNumber);
    
//     // Consultation Information
//     formDataToSend.append('onlineFee', formData.onlineFee.toString());
//     formDataToSend.append('consultationHours', formData.consultationHours);
    
//     // ✅ FIX: Append each day separately
//     formData.availableDays.forEach(day => {
//       formDataToSend.append('availableDays[]', day);
//     });
    
//     // Security Information
//     formDataToSend.append('password', formData.password);
    
//     // Append profile picture file if exists
//     if (formData.file) {
//       formDataToSend.append('profilePicture', formData.file);
//     }

//     console.log('Sending registration request...');
//     console.log('Available days:', formData.availableDays);
    
//     // Debug: Show what's in FormData
//     console.log('FormData contents:');
//     for (let pair of formDataToSend.entries()) {
//       console.log(pair[0] + ': ', pair[1]);
//     }
    
//     // Send to backend API
//     const response = await fetch('http://localhost:5000/api/doctor-registration/register', {
//       method: 'POST',
//       body: formDataToSend,
//     });

//     const data = await response.json();
//     console.log('Response:', data)

//     if (response.ok) {
//       setSubmitSuccess(true);
//       // Reset form after successful submission
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         gender: "",
//         dob: "",
//         cnic: "",
//         address: "",
//         city: "",
//         country: "",
//         file: null,
//         qualification: "",
//         specialization: "",
//         institute: "",
//         passingYear: "",
//         experienceYears: "",
//         currentHospital: "",
//         designation: "",
//         licenseNumber: "",
//         onlineFee: 1500,
//         consultationHours: "",
//         availableDays: [],
//         password: "",
//         confirmPassword: "",
//       });
//       setStep(1);
      
//       // Show success message
//       alert(`✅ ${data.message}`);
      
//       // If you want to store token for auto-login
//       if (data.data && data.data.token) {
//         localStorage.setItem('doctorToken', data.data.token);
//         console.log('Token saved for future use');
//       }
//     } else {
//       setSubmitError(data.message || 'Registration failed');
      
//       // Show validation errors if any
//       if (data.errors) {
//         console.error('Validation errors:', data.errors);
//         let errorMessages = data.errors.map(err => {
//           if (err.path === 'availableDays') {
//             return 'Please select at least one available day';
//           }
//           return err.msg;
//         }).join(', ');
//         alert(`❌ ${errorMessages}`);
//       } else {
//         alert(`❌ ${data.message || 'Registration failed. Please try again.'}`);
//       }
//     }
//   } catch (error) {
//     console.error('Registration error:', error);
//     setSubmitError('Network error. Please check your connection.');
//     alert('❌ Network error. Please check your connection and try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   // ✅ Step Content
//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <form autoComplete="off">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="0xxxxxxxxxx"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] no-spinner"
//                   maxLength="11"
//                   pattern="[0-9]{11}"
//                   inputMode="numeric"
//                 />
//                 {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Gender</label>
//                 <select 
//                   name="gender" 
//                   value={formData.gender} 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 >
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//                 {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Date of Birth</label>
//                 <input 
//                   type="date" 
//                   name="dob" 
//                   value={formData.dob} 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   max={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">CNIC / ID Number</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="XXXXXXXXXXXXX"
//                   value={formData.cnic}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, '').slice(0, 13);
//                     setFormData({
//                       ...formData,
//                       cnic: value
//                     });
//                   }}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="13"
//                 />
//                 {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Street #, Area, City"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Enter your city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   placeholder="Enter your country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Profile Picture</label>
//                 <input 
//                   type="file" 
//                   name="file" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG or JPEG (max 5MB)</p>
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
//               <label className="font-medium text-[#174047] mb-1">Qualification</label>
//               <select
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               >
//                 <option value="">Select Qualification</option>
//                 <option>MBBS</option>
//                 <option>MD</option>
//                 <option>FCPS</option>
//                 <option>PhD</option>
//                 <option>Other</option>
//               </select>
//               {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Specialization</label>
//               <select
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               >
//                 <option value="">Select Specialization</option>
//                 <option>Cardiologist</option>
//                 <option>Dermatologist</option>
//                 <option>Neurologist</option>
//                 <option>Pediatrician</option>
//                 <option>Psychiatrist</option>
//                 <option>General Physician</option>
//               </select>
//               {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Institute</label>
//               <input
//                 type="text"
//                 name="institute"
//                 placeholder="e.g. King Edward Medical University"
//                 value={formData.institute}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Year of Passing</label>
//               <input
//                 type="date"
//                 name="passingYear"
//                 value={formData.passingYear}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 max={new Date().toISOString().split('T')[0]}
//               />
//               {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
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
//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Years of Experience</label>
//               <input
//                 type="text"
//                 name="experienceYears"
//                 placeholder="e.g., 5 years"
//                 value={formData.experienceYears}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Current Hospital</label>
//               <input
//                 type="text"
//                 name="currentHospital"
//                 placeholder="e.g. Mayo Hospital"
//                 value={formData.currentHospital}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Designation</label>
//               <input
//                 type="text"
//                 name="designation"
//                 placeholder="e.g. Consultant"
//                 value={formData.designation}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">License Number</label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 placeholder="PMC-XXXXXX"
//                 value={formData.licenseNumber}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
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
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Online Consultation Fee (PKR)</label>
//               <input
//                 type="number"
//                 name="onlineFee"
//                 value={formData.onlineFee}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 min="0"
//               />
//               {errors.onlineFee && <span className="text-red-500 text-sm mt-1">{errors.onlineFee}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Online Consultation Hours</label>
//               <input
//                 type="text"
//                 name="consultationHours"
//                 placeholder="e.g. 9AM - 5PM"
//                 value={formData.consultationHours}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//               />
//               {errors.consultationHours && (
//                 <span className="text-red-500 text-sm mt-1">{errors.consultationHours}</span>
//               )}
//             </div>

//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium text-[#174047] mb-1">Available Days</label>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                   <label key={day} className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="availableDays"
//                       value={day}
//                       checked={formData.availableDays.includes(day)}
//                       onChange={handleChange}
//                       className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
//                     />
//                     {day}
//                   </label>
//                 ))}
//               </div>
//               {errors.availableDays && <span className="text-red-500 text-sm mt-1">{errors.availableDays}</span>}
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

//       case 5:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//             <div className="flex flex-col">
//               <label className="font-medium text-[#174047] mb-1">Password</label>
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
//               <label className="font-medium text-[#174047] mb-1">Confirm Password</label>
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

//             {/* Status Messages */}
//             {submitSuccess && (
//               <div className="md:col-span-2 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-green-700 font-medium">✅ Registration successful! Please check your email for verification.</p>
//               </div>
//             )}
            
//             {submitError && (
//               <div className="md:col-span-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-700 font-medium">❌ {submitError}</p>
//               </div>
//             )}

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
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
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

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Join Our Medical Team</h1>
//           <p className="text-[#174047]">Start your journey with us in just a few steps</p>
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
//             {steps[step - 1].label} Information
//           </h2>
//           {renderStepContent()}
//         </div>

//         {/* Debug info (remove in production) */}
//         <div className="mt-4 text-xs text-gray-500">
//           <p>Backend URL: http://localhost:5000/api/doctor-registration/register</p>
//           <p>Step: {step} of {steps.length}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorRegistration;


















// updated and security removed
// The below code has API integration and connected with backend
// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaUserMd,
//   FaGraduationCap,
//   FaBriefcase,
//   FaFileUpload,
//   FaEye,
// } from "react-icons/fa";

// const DoctorRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: "",
//     dob: "",
//     cnic: "",
//     address: "",
//     city: "",
//     country: "",
//     file: null,

//     qualification: "",
//     specialization: "",
//     institute: "",
//     passingYear: "",
//     otherQualification: "",
//     otherSpecialization: "",

//     experienceYears: "",
//     currentHospital: "",
//     designation: "",
//     licenseNumber: "",
    
//     // Documents
//     idCardFront: null,
//     idCardBack: null,
//     doctorLicense: null,
//     certificates: [],

//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("success");
  
//   // Search states
//   const [instituteSearch, setInstituteSearch] = useState("");
//   const [instituteResults, setInstituteResults] = useState([]);
//   const [showInstituteDropdown, setShowInstituteDropdown] = useState(false);
//   const [hospitalSearch, setHospitalSearch] = useState("");
//   const [hospitalResults, setHospitalResults] = useState([]);
//   const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);
//   const [isLoadingInstitutes, setIsLoadingInstitutes] = useState(false);
//   const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);

//   const instituteRef = useRef(null);
//   const hospitalRef = useRef(null);

//   const steps = [
//     { icon: <FaUserMd />, label: "Personal" },
//     { icon: <FaGraduationCap />, label: "Education" },
//     { icon: <FaBriefcase />, label: "Professional" },
//     { icon: <FaFileUpload />, label: "Documents" },
//     { icon: <FaEye />, label: "Review" },
//   ];

//   // Scroll to top on step change
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [step]);

//   // Click outside handlers for dropdowns
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (instituteRef.current && !instituteRef.current.contains(event.target)) {
//         setShowInstituteDropdown(false);
//       }
//       if (hospitalRef.current && !hospitalRef.current.contains(event.target)) {
//         setShowHospitalDropdown(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Search institutes
//   useEffect(() => {
//     const searchInstitutes = async () => {
//       if (instituteSearch.length < 2) {
//         setInstituteResults([]);
//         return;
//       }

//       setIsLoadingInstitutes(true);
//       try {
//         const response = await fetch(`http://localhost:5000/api/institutes/search?q=${instituteSearch}`);
//         const data = await response.json();
//         setInstituteResults(data.data || []);
//       } catch (error) {
//         console.error("Error searching institutes:", error);
//         setInstituteResults([]);
//       } finally {
//         setIsLoadingInstitutes(false);
//       }
//     };

//     const debounce = setTimeout(searchInstitutes, 500);
//     return () => clearTimeout(debounce);
//   }, [instituteSearch]);

//   // Search hospitals
//   useEffect(() => {
//     const searchHospitals = async () => {
//       if (hospitalSearch.length < 2) {
//         setHospitalResults([]);
//         return;
//       }

//       setIsLoadingHospitals(true);
//       try {
//         const response = await fetch(`http://localhost:5000/api/hospitals/search?q=${hospitalSearch}`);
//         const data = await response.json();
//         setHospitalResults(data.data || []);
//       } catch (error) {
//         console.error("Error searching hospitals:", error);
//         setHospitalResults([]);
//       } finally {
//         setIsLoadingHospitals(false);
//       }
//     };

//     const debounce = setTimeout(searchHospitals, 500);
//     return () => clearTimeout(debounce);
//   }, [hospitalSearch]);

//   const handleChange = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file") {
//       // Validate file type
//       const file = files[0];
//       if (file && !file.type.startsWith('image/')) {
//         setErrors({ ...errors, [name]: "Only image files are allowed" });
//         return;
//       }
      
//       // Handle multiple files for certificates
//       if (name === "certificates") {
//         setFormData({
//           ...formData,
//           certificates: Array.from(files)
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: file
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: null });
//     }

//     if (name === "password") evaluatePasswordStrength(value);
//   };

//   const evaluatePasswordStrength = (password) => {
//     if (password.length < 6) setPasswordStrength("Weak");
//     else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
//       setPasswordStrength("Strong");
//     else setPasswordStrength("Medium");
//   };

//   // Format license number
//   const handleLicenseChange = (e) => {
//     let value = e.target.value.toUpperCase();
//     // Remove any non-alphanumeric characters except hyphen
//     value = value.replace(/[^PMC0-9-]/g, '');
    
//     // Auto-format as PMC-XXXXXX
//     if (value.startsWith('PMC')) {
//       if (value.length > 3 && !value.includes('-')) {
//         value = 'PMC-' + value.substring(3);
//       }
//       // Limit to PMC- + 6 digits
//       const parts = value.split('-');
//       if (parts[1] && parts[1].length > 6) {
//         value = 'PMC-' + parts[1].substring(0, 6);
//       }
//     }
    
//     setFormData({
//       ...formData,
//       licenseNumber: value
//     });
//   };

//   const validateStep = () => {
//     let newErrors = {};

//     if (step === 1) {
//       if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//       if (!formData.email.trim()) newErrors.email = "Email is required";
//       else if (!/\S+@\S+\.\S+/.test(formData.email))
//         newErrors.email = "Enter a valid email";
//       if (!formData.phone.trim()) newErrors.phone = "Phone number required";
//       else if (!/^[0-9]{11}$/.test(formData.phone))
//         newErrors.phone = "Invalid phone number or number must be 11 digits";
//       if (!formData.gender) newErrors.gender = "Gender required";
//       if (!formData.dob) newErrors.dob = "Date of birth required";
//       if (!formData.cnic.trim()) newErrors.cnic = "CNIC required";
//       else if (!/^[0-9]{13}$/.test(formData.cnic))
//         newErrors.cnic = "CNIC must be 13 digits";
//       if (!formData.address.trim()) newErrors.address = "Address required";
//       if (!formData.city.trim()) newErrors.city = "City required";
//       if (!formData.country.trim()) newErrors.country = "Country required";
//       if (!formData.file) newErrors.file = "Profile picture is required";
//     } else if (step === 2) {
//       if (!formData.qualification) newErrors.qualification = "Qualification required";
//       if (formData.qualification === "Other" && !formData.otherQualification?.trim()) {
//         newErrors.otherQualification = "Please specify your qualification";
//       }
//       if (!formData.specialization) newErrors.specialization = "Specialization required";
//       if (formData.specialization === "Other" && !formData.otherSpecialization?.trim()) {
//         newErrors.otherSpecialization = "Please specify your specialization";
//       }
//       if (!formData.institute.trim()) newErrors.institute = "Institute required";
//       if (!formData.passingYear) newErrors.passingYear = "Passing year required";
//     } else if (step === 3) {
//       if (!formData.experienceYears.trim())
//         newErrors.experienceYears = "Experience duration required";
//       if (!formData.currentHospital.trim())
//         newErrors.currentHospital = "Current hospital required";
//       if (!formData.designation.trim())
//         newErrors.designation = "Designation required";
//       if (!formData.licenseNumber.trim())
//         newErrors.licenseNumber = "License number required";
//       else if (!/^PMC-\d{6}$/.test(formData.licenseNumber))
//         newErrors.licenseNumber = "License must be in format PMC-XXXXXX";
//     } else if (step === 4) {
//       if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
//       if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
//       if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license image required";
//       // Certificates are optional
//     } else if (step === 5) {
//       if (!formData.password.trim()) newErrors.password = "Password required";
//       else if (formData.password.length < 6)
//         newErrors.password = "Password must be at least 6 characters";
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

//   const handleEdit = (stepNumber) => {
//     setStep(stepNumber);
//   };

//   // Show modal instead of alert
//   const showNotificationModal = (message, type = "success") => {
//     setModalMessage(message);
//     setModalType(type);
//     setShowModal(true);
    
//     // Auto-hide after 3 seconds
//     setTimeout(() => {
//       setShowModal(false);
//     }, 3000);
//   };

//   const handleSubmit = async () => {
//     setSubmitSuccess(false);
//     setSubmitError("");
    
//     if (!validateStep()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
      
//       // Personal Information
//       formDataToSend.append('fullName', formData.fullName);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone', formData.phone);
//       formDataToSend.append('gender', formData.gender);
//       formDataToSend.append('dob', formData.dob);
//       formDataToSend.append('cnic', formData.cnic);
//       formDataToSend.append('address', formData.address);
//       formDataToSend.append('city', formData.city);
//       formDataToSend.append('country', formData.country);
      
//       // Education Information
//       formDataToSend.append('qualification', formData.qualification === "Other" ? formData.otherQualification : formData.qualification);
//       formDataToSend.append('specialization', formData.specialization === "Other" ? formData.otherSpecialization : formData.specialization);
//       formDataToSend.append('institute', formData.institute);
//       formDataToSend.append('passingYear', formData.passingYear);
      
//       // Professional Information
//       formDataToSend.append('experienceYears', formData.experienceYears);
//       formDataToSend.append('currentHospital', formData.currentHospital);
//       formDataToSend.append('designation', formData.designation);
//       formDataToSend.append('licenseNumber', formData.licenseNumber);
      
//       // Documents
//       if (formData.file) formDataToSend.append('profilePicture', formData.file);
//       if (formData.idCardFront) formDataToSend.append('idCardFront', formData.idCardFront);
//       if (formData.idCardBack) formDataToSend.append('idCardBack', formData.idCardBack);
//       if (formData.doctorLicense) formDataToSend.append('doctorLicense', formData.doctorLicense);
      
//       // Certificates (multiple)
//       formData.certificates.forEach((cert, index) => {
//         formDataToSend.append('certificates', cert);
//       });
      
//       // Security
//       formDataToSend.append('password', formData.password);

//       const response = await fetch('http://localhost:5000/api/doctor-registration/register', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSubmitSuccess(true);
//         showNotificationModal(`✅ ${data.message}`, "success");
        
//         // Reset form
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           gender: "",
//           dob: "",
//           cnic: "",
//           address: "",
//           city: "",
//           country: "",
//           file: null,
//           qualification: "",
//           specialization: "",
//           institute: "",
//           passingYear: "",
//           otherQualification: "",
//           otherSpecialization: "",
//           experienceYears: "",
//           currentHospital: "",
//           designation: "",
//           licenseNumber: "",
//           idCardFront: null,
//           idCardBack: null,
//           doctorLicense: null,
//           certificates: [],
//           password: "",
//           confirmPassword: "",
//         });
//         setStep(1);
        
//         if (data.data && data.data.token) {
//           localStorage.setItem('doctorToken', data.data.token);
//         }
//       } else {
//         setSubmitError(data.message || 'Registration failed');
//         showNotificationModal(`❌ ${data.message || 'Registration failed'}`, "error");
        
//         if (data.errors) {
//           console.error('Validation errors:', data.errors);
//         }
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setSubmitError('Network error. Please check your connection.');
//       showNotificationModal('❌ Network error. Please check your connection.', "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Review Section Component
//   const ReviewSection = () => (
//     <div className="space-y-6">
//       <div className="bg-gray-50 p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Personal Information</h3>
//           <button 
//             onClick={() => handleEdit(1)}
//             className="text-[#2c6774] hover:text-[#1e4e56] text-sm font-medium"
//           >
//             Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Full Name" value={formData.fullName} />
//           <ReviewItem label="Email" value={formData.email} />
//           <ReviewItem label="Phone" value={formData.phone} />
//           <ReviewItem label="Gender" value={formData.gender} />
//           <ReviewItem label="Date of Birth" value={formData.dob} />
//           <ReviewItem label="CNIC" value={formData.cnic} />
//           <ReviewItem label="Address" value={formData.address} />
//           <ReviewItem label="City" value={formData.city} />
//           <ReviewItem label="Country" value={formData.country} />
//         </div>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Education Information</h3>
//           <button 
//             onClick={() => handleEdit(2)}
//             className="text-[#2c6774] hover:text-[#1e4e56] text-sm font-medium"
//           >
//             Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Qualification" value={formData.qualification === "Other" ? formData.otherQualification : formData.qualification} />
//           <ReviewItem label="Specialization" value={formData.specialization === "Other" ? formData.otherSpecialization : formData.specialization} />
//           <ReviewItem label="Institute" value={formData.institute} />
//           <ReviewItem label="Passing Year" value={formData.passingYear} />
//         </div>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Professional Information</h3>
//           <button 
//             onClick={() => handleEdit(3)}
//             className="text-[#2c6774] hover:text-[#1e4e56] text-sm font-medium"
//           >
//             Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Experience" value={formData.experienceYears} />
//           <ReviewItem label="Current Hospital" value={formData.currentHospital} />
//           <ReviewItem label="Designation" value={formData.designation} />
//           <ReviewItem label="License Number" value={formData.licenseNumber} />
//         </div>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Documents Uploaded</h3>
//           <button 
//             onClick={() => handleEdit(4)}
//             className="text-[#2c6774] hover:text-[#1e4e56] text-sm font-medium"
//           >
//             Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Profile Picture" value={formData.file?.name || "Not uploaded"} />
//           <ReviewItem label="ID Card Front" value={formData.idCardFront?.name || "Not uploaded"} />
//           <ReviewItem label="ID Card Back" value={formData.idCardBack?.name || "Not uploaded"} />
//           <ReviewItem label="Doctor License" value={formData.doctorLicense?.name || "Not uploaded"} />
//           <ReviewItem label="Certificates" value={`${formData.certificates.length} file(s) uploaded`} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter strong password"
//             value={formData.password}
//             onChange={handleChange}
//             className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//           />
//           {passwordStrength && (
//             <span className={`text-sm mt-1 ${
//               passwordStrength === "Weak" ? "text-red-500" :
//               passwordStrength === "Medium" ? "text-yellow-500" :
//               "text-green-500"
//             }`}>
//               Strength: {passwordStrength}
//             </span>
//           )}
//           {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
//         </div>

//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Re-enter your password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//           />
//           {errors.confirmPassword && (
//             <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-between mt-8">
//         <button 
//           type="button" 
//           className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//           onClick={handlePrevious}
//         >
//           ← Previous
//         </button>
//         <button
//           type="button"
//           className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
//               Submitting...
//             </>
//           ) : (
//             'Submit Registration'
//           )}
//         </button>
//       </div>
//     </div>
//   );

//   const ReviewItem = ({ label, value }) => (
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-sm font-medium text-[#174047] break-words">{value || "—"}</p>
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4 md:space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Email Address *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Phone Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="0xxxxxxxxxx"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="11"
//                 />
//                 {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Gender *</label>
//                 <select 
//                   name="gender" 
//                   value={formData.gender} 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 >
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//                 {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Date of Birth *</label>
//                 <input 
//                   type="date" 
//                   name="dob" 
//                   value={formData.dob} 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   max={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">CNIC / ID Number *</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="XXXXXXXXXXXXX"
//                   value={formData.cnic}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, '').slice(0, 13);
//                     setFormData({ ...formData, cnic: value });
//                   }}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="13"
//                 />
//                 {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
//               </div>

//               <div className="flex flex-col md:col-span-2">
//                 <label className="font-medium text-[#174047] mb-1">Address *</label>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Street #, Area, City"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">City *</label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Enter your city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Country *</label>
//                 <input
//                   type="text"
//                   name="country"
//                   placeholder="Enter your country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
//               </div>

//               <div className="flex flex-col md:col-span-2">
//                 <label className="font-medium text-[#174047] mb-1">Profile Picture *</label>
//                 <input 
//                   type="file" 
//                   name="file" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG or JPEG (max 5MB)</p>
//                 {errors.file && <span className="text-red-500 text-sm mt-1">{errors.file}</span>}
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
//           <div className="space-y-4 md:space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Qualification *</label>
//                 <select
//                   name="qualification"
//                   value={formData.qualification}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 >
//                   <option value="">Select Qualification</option>
//                   <option>MBBS</option>
//                   <option>MD</option>
//                   <option>FCPS</option>
//                   <option>PhD</option>
//                   <option>Other</option>
//                 </select>
//                 {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
//               </div>

//               {formData.qualification === "Other" && (
//                 <div className="flex flex-col">
//                   <label className="font-medium text-[#174047] mb-1">Specify Qualification *</label>
//                   <input
//                     type="text"
//                     name="otherQualification"
//                     placeholder="Enter your qualification"
//                     value={formData.otherQualification}
//                     onChange={handleChange}
//                     className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   />
//                   {errors.otherQualification && <span className="text-red-500 text-sm mt-1">{errors.otherQualification}</span>}
//                 </div>
//               )}

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Specialization *</label>
//                 <select
//                   name="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 >
//                   <option value="">Select Specialization</option>
//                   <option>Cardiologist</option>
//                   <option>Dermatologist</option>
//                   <option>Neurologist</option>
//                   <option>Pediatrician</option>
//                   <option>Psychiatrist</option>
//                   <option>General Physician</option>
//                   <option>Other</option>
//                 </select>
//                 {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
//               </div>

//               {formData.specialization === "Other" && (
//                 <div className="flex flex-col">
//                   <label className="font-medium text-[#174047] mb-1">Specify Specialization *</label>
//                   <input
//                     type="text"
//                     name="otherSpecialization"
//                     placeholder="Enter your specialization"
//                     value={formData.otherSpecialization}
//                     onChange={handleChange}
//                     className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   />
//                   {errors.otherSpecialization && <span className="text-red-500 text-sm mt-1">{errors.otherSpecialization}</span>}
//                 </div>
//               )}

//               <div className="flex flex-col relative" ref={instituteRef}>
//                 <label className="font-medium text-[#174047] mb-1">Institute *</label>
//                 <input
//                   type="text"
//                   name="institute"
//                   placeholder="Search for institute..."
//                   value={formData.institute}
//                   onChange={(e) => {
//                     setFormData({ ...formData, institute: e.target.value });
//                     setInstituteSearch(e.target.value);
//                     setShowInstituteDropdown(true);
//                   }}
//                   onFocus={() => setShowInstituteDropdown(true)}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {showInstituteDropdown && (instituteResults.length > 0 || isLoadingInstitutes) && (
//                   <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#c0d3dc] rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {isLoadingInstitutes ? (
//                       <div className="p-3 text-center text-gray-500">Searching...</div>
//                     ) : (
//                       instituteResults.map((institute, index) => (
//                         <div
//                           key={index}
//                           className="p-3 hover:bg-[#f8f9fa] cursor-pointer border-b last:border-b-0"
//                           onClick={() => {
//                             setFormData({ ...formData, institute: institute.name });
//                             setInstituteSearch(institute.name);
//                             setShowInstituteDropdown(false);
//                           }}
//                         >
//                           <p className="font-medium text-[#174047]">{institute.name}</p>
//                           <p className="text-xs text-gray-500">{institute.city}, {institute.country}</p>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//                 {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Year of Passing *</label>
//                 <input
//                   type="date"
//                   name="passingYear"
//                   value={formData.passingYear}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   max={new Date().toISOString().split('T')[0]}
//                 />
//                 {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
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
//           <div className="space-y-4 md:space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Years of Experience *</label>
//                 <input
//                   type="text"
//                   name="experienceYears"
//                   placeholder="e.g., 5 years"
//                   value={formData.experienceYears}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
//               </div>

//               <div className="flex flex-col relative" ref={hospitalRef}>
//                 <label className="font-medium text-[#174047] mb-1">Current Hospital *</label>
//                 <input
//                   type="text"
//                   name="currentHospital"
//                   placeholder="Search for hospital..."
//                   value={formData.currentHospital}
//                   onChange={(e) => {
//                     setFormData({ ...formData, currentHospital: e.target.value });
//                     setHospitalSearch(e.target.value);
//                     setShowHospitalDropdown(true);
//                   }}
//                   onFocus={() => setShowHospitalDropdown(true)}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {showHospitalDropdown && (hospitalResults.length > 0 || isLoadingHospitals) && (
//                   <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#c0d3dc] rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {isLoadingHospitals ? (
//                       <div className="p-3 text-center text-gray-500">Searching...</div>
//                     ) : (
//                       hospitalResults.map((hospital, index) => (
//                         <div
//                           key={index}
//                           className="p-3 hover:bg-[#f8f9fa] cursor-pointer border-b last:border-b-0"
//                           onClick={() => {
//                             setFormData({ ...formData, currentHospital: hospital.name });
//                             setHospitalSearch(hospital.name);
//                             setShowHospitalDropdown(false);
//                           }}
//                         >
//                           <p className="font-medium text-[#174047]">{hospital.name}</p>
//                           <p className="text-xs text-gray-500">{hospital.city}, {hospital.country}</p>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//                 {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Designation *</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   placeholder="e.g. Consultant"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Number *</label>
//                 <input
//                   type="text"
//                   name="licenseNumber"
//                   placeholder="PMC-XXXXXX"
//                   value={formData.licenseNumber}
//                   onChange={handleLicenseChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="10"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: PMC-XXXXXX (6 digits)</p>
//                 {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
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
//           <div className="space-y-4 md:space-y-5">
//             <div className="grid grid-cols-1 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Front Image *</label>
//                 <input 
//                   type="file" 
//                   name="idCardFront" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload front side of your ID card</p>
//                 {errors.idCardFront && <span className="text-red-500 text-sm mt-1">{errors.idCardFront}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Back Image *</label>
//                 <input 
//                   type="file" 
//                   name="idCardBack" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload back side of your ID card</p>
//                 {errors.idCardBack && <span className="text-red-500 text-sm mt-1">{errors.idCardBack}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Doctor License *</label>
//                 <input 
//                   type="file" 
//                   name="doctorLicense" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload your medical license</p>
//                 {errors.doctorLicense && <span className="text-red-500 text-sm mt-1">{errors.doctorLicense}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Educational Certificates</label>
//                 <input 
//                   type="file" 
//                   name="certificates" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                   multiple
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload your degrees and certificates (you can select multiple files)</p>
//                 {formData.certificates.length > 0 && (
//                   <p className="text-xs text-green-600 mt-1">{formData.certificates.length} file(s) selected</p>
//                 )}
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
//                 Review Information →
//               </button>
//             </div>
//           </div>
//         );

//       case 5:
//         return <ReviewSection />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 md:p-6 lg:p-8 animate-fade-in">
//         <div className="text-center mb-6 md:mb-8">
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2c6774] mb-2">Join Our Medical Team</h1>
//           <p className="text-sm md:text-base text-[#174047]">Start your journey with us in just a few steps</p>
//         </div>

//         {/* Progress Stepper - Responsive */}
//         <div className="flex justify-between items-start relative mb-6 md:mb-8 px-2 md:px-0">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center relative z-10 flex-1">
//               <div
//                 className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 text-sm md:text-base ${
//                   step >= index + 1 
//                     ? "bg-[#2c6774] text-white scale-110" 
//                     : "bg-[#c0d3dc] text-[#174047]"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-[10px] md:text-xs lg:text-sm font-medium text-[#174047] mt-1 md:mt-2 text-center px-1">
//                 {s.label}
//               </p>
              
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-4 md:top-5 left-1/2 w-full h-0.5 md:h-1 transition-colors duration-300 hidden sm:block ${
//                     step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
//                   }`}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
//           <h2 className="text-lg md:text-xl font-semibold text-[#2c6774] text-center mb-4 md:mb-6">
//             {steps[step - 1].label} Information
//           </h2>
//           {renderStepContent()}
//         </div>
//       </div>

//       {/* Modal for notifications */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
//           <div className={`bg-white rounded-lg p-6 max-w-sm w-full z-10 shadow-xl transform transition-all ${
//             modalType === "success" ? "border-t-4 border-green-500" : "border-t-4 border-red-500"
//           }`}>
//             <div className="text-center">
//               <div className={`text-4xl mb-3 ${modalType === "success" ? "text-green-500" : "text-red-500"}`}>
//                 {modalType === "success" ? "✅" : "❌"}
//               </div>
//               <p className="text-gray-700">{modalMessage}</p>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className={`mt-4 px-4 py-2 rounded-lg text-white ${
//                   modalType === "success" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
//                 }`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorRegistration;























//-----------------------style-----------------------//
import React, { useState, useEffect, useRef } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaBriefcase,
  FaFileUpload,
  FaEye,
  FaEdit
} from "react-icons/fa";

const DoctorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    cnic: "",
    address: "",
    city: "",
    country: "",
    file: null,

    qualification: "",
    specialization: "",
    institute: "",
    passingYear: "",
    otherQualification: "",
    otherSpecialization: "",

    experienceYears: "",
    currentHospital: "",
    designation: "",
    licenseNumber: "",
    
    // Documents
    idCardFront: null,
    idCardBack: null,
    doctorLicense: null,
    
    // Educational Certificates
    mbbsCertificate: null,
    houseJobCertificate: null,
    specializationCertificate: null,
    fcpsCertificate: null,
    
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [apiError, setApiError] = useState("");
  
  // Search states
  const [instituteSearch, setInstituteSearch] = useState("");
  const [instituteResults, setInstituteResults] = useState([]);
  const [showInstituteDropdown, setShowInstituteDropdown] = useState(false);
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [hospitalResults, setHospitalResults] = useState([]);
  const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);
  const [isLoadingInstitutes, setIsLoadingInstitutes] = useState(false);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);

  const instituteRef = useRef(null);
  const hospitalRef = useRef(null);

  const steps = [
    { icon: <FaUserMd />, label: "Personal" },
    { icon: <FaGraduationCap />, label: "Education" },
    { icon: <FaBriefcase />, label: "Professional" },
    { icon: <FaFileUpload />, label: "Documents" },
    { icon: <FaEye />, label: "Review" },
  ];

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Click outside handlers for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (instituteRef.current && !instituteRef.current.contains(event.target)) {
        setShowInstituteDropdown(false);
      }
      if (hospitalRef.current && !hospitalRef.current.contains(event.target)) {
        setShowHospitalDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search institutes
  useEffect(() => {
    const searchInstitutes = async () => {
      if (instituteSearch.length < 2) {
        setInstituteResults([]);
        return;
      }

      setIsLoadingInstitutes(true);
      try {
        const response = await fetch(`http://localhost:5000/api/institutes/search?q=${instituteSearch}`);
        const data = await response.json();
        setInstituteResults(data.data || []);
      } catch (error) {
        console.error("Error searching institutes:", error);
        setInstituteResults([]);
      } finally {
        setIsLoadingInstitutes(false);
      }
    };

    const debounce = setTimeout(searchInstitutes, 500);
    return () => clearTimeout(debounce);
  }, [instituteSearch]);

  // Search hospitals
  useEffect(() => {
    const searchHospitals = async () => {
      if (hospitalSearch.length < 2) {
        setHospitalResults([]);
        return;
      }

      setIsLoadingHospitals(true);
      try {
        const response = await fetch(`http://localhost:5000/api/hospitals/search?q=${hospitalSearch}`);
        const data = await response.json();
        setHospitalResults(data.data || []);
      } catch (error) {
        console.error("Error searching hospitals:", error);
        setHospitalResults([]);
      } finally {
        setIsLoadingHospitals(false);
      }
    };

    const debounce = setTimeout(searchHospitals, 500);
    return () => clearTimeout(debounce);
  }, [hospitalSearch]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      // Validate file type
      const file = files[0];
      if (file && !file.type.startsWith('image/') && name !== 'certificates') {
        setErrors({ ...errors, [name]: "Only image files are allowed" });
        return;
      }
      
      setFormData({
        ...formData,
        [name]: file
      });
      
      // Clear error for this field
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Clear error for this field
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    }

    if (name === "password") evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 8) setPasswordStrength("Weak");
    else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
      setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  };

  // Format license number (PM&DC format)
  const handleLicenseChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/\s/g, '');
    
    // Remove any non-alphanumeric characters
    value = value.replace(/[^0-9A-Z-]/g, '');
    
    // Format as numbers then optional suffix
    const match = value.match(/^(\d{1,6})-?([A-Z]?)$/);
    if (match) {
      const numbers = match[1];
      const suffix = match[2];
      if (suffix) {
        value = `${numbers}-${suffix}`;
      } else {
        value = numbers;
      }
    }
    
    setFormData({
      ...formData,
      licenseNumber: value
    });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Enter a valid email";
      if (!formData.phone.trim()) newErrors.phone = "Phone number required";
      else if (!/^[0-9]{11}$/.test(formData.phone))
        newErrors.phone = "Invalid phone number or number must be 11 digits";
      if (!formData.gender) newErrors.gender = "Gender required";
      if (!formData.dob) newErrors.dob = "Date of birth required";
      if (!formData.cnic.trim()) newErrors.cnic = "CNIC required";
      else if (!/^[0-9]{13}$/.test(formData.cnic))
        newErrors.cnic = "CNIC must be 13 digits";
      if (!formData.address.trim()) newErrors.address = "Address required";
      if (!formData.city.trim()) newErrors.city = "City required";
      if (!formData.country.trim()) newErrors.country = "Country required";
      if (!formData.file) newErrors.file = "Profile picture is required";
    } else if (step === 2) {
      if (!formData.qualification) newErrors.qualification = "Qualification required";
      if (formData.qualification === "Other" && !formData.otherQualification?.trim()) {
        newErrors.otherQualification = "Please specify your qualification";
      }
      if (!formData.specialization) newErrors.specialization = "Specialization required";
      if (formData.specialization === "Other" && !formData.otherSpecialization?.trim()) {
        newErrors.otherSpecialization = "Please specify your specialization";
      }
      if (!formData.institute.trim()) newErrors.institute = "Institute required";
      if (!formData.passingYear) newErrors.passingYear = "Passing year required";
    } else if (step === 3) {
      if (!formData.experienceYears.trim())
        newErrors.experienceYears = "Experience duration required";
      if (!formData.currentHospital.trim())
        newErrors.currentHospital = "Current hospital required";
      if (!formData.designation.trim())
        newErrors.designation = "Designation required";
      if (!formData.licenseNumber.trim())
        newErrors.licenseNumber = "License number required";
      else if (!/^\d{4,6}(-[A-Z])?$/.test(formData.licenseNumber))
        newErrors.licenseNumber = "License must be 4-6 digits with optional suffix (e.g., 75188 or 81910-P)";
    } else if (step === 4) {
      if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
      if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
      if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license image required";
      if (!formData.mbbsCertificate) newErrors.mbbsCertificate = "MBBS degree certificate required";
    } else if (step === 5) {
      if (!formData.password.trim()) newErrors.password = "Password required";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
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

  // Show modal instead of alert
  const showNotificationModal = (message, type = "success") => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    setSubmitSuccess(false);
    setSubmitError("");
    setApiError("");
    
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Personal Information
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('cnic', formData.cnic);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('country', formData.country);
      
      // Education Information
      formDataToSend.append('qualification', formData.qualification === "Other" ? formData.otherQualification : formData.qualification);
      formDataToSend.append('specialization', formData.specialization === "Other" ? formData.otherSpecialization : formData.specialization);
      formDataToSend.append('institute', formData.institute);
      formDataToSend.append('passingYear', formData.passingYear);
      
      // Professional Information
      formDataToSend.append('experienceYears', formData.experienceYears);
      formDataToSend.append('currentHospital', formData.currentHospital);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('licenseNumber', formData.licenseNumber);
      
      // Documents
      if (formData.file) formDataToSend.append('profilePicture', formData.file);
      if (formData.idCardFront) formDataToSend.append('idCardFront', formData.idCardFront);
      if (formData.idCardBack) formDataToSend.append('idCardBack', formData.idCardBack);
      if (formData.doctorLicense) formDataToSend.append('doctorLicense', formData.doctorLicense);
      if (formData.mbbsCertificate) formDataToSend.append('mbbsCertificate', formData.mbbsCertificate);
      if (formData.houseJobCertificate) formDataToSend.append('houseJobCertificate', formData.houseJobCertificate);
      if (formData.specializationCertificate) formDataToSend.append('specializationCertificate', formData.specializationCertificate);
      if (formData.fcpsCertificate) formDataToSend.append('fcpsCertificate', formData.fcpsCertificate);
      
      // Security
      formDataToSend.append('password', formData.password);

      const response = await fetch('http://localhost:5000/api/doctor-registration/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        showNotificationModal(`✅ ${data.message}`, "success");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          gender: "",
          dob: "",
          cnic: "",
          address: "",
          city: "",
          country: "",
          file: null,
          qualification: "",
          specialization: "",
          institute: "",
          passingYear: "",
          otherQualification: "",
          otherSpecialization: "",
          experienceYears: "",
          currentHospital: "",
          designation: "",
          licenseNumber: "",
          idCardFront: null,
          idCardBack: null,
          doctorLicense: null,
          mbbsCertificate: null,
          houseJobCertificate: null,
          specializationCertificate: null,
          fcpsCertificate: null,
          password: "",
          confirmPassword: "",
        });
        setStep(1);
        
        if (data.data && data.data.token) {
          localStorage.setItem('doctorToken', data.data.token);
        }
      } else {
        setSubmitError(data.message || 'Registration failed');
        setApiError(data.message || 'Registration failed');
        showNotificationModal(`❌ ${data.message || 'Registration failed'}`, "error");
        
        if (data.errors) {
          console.error('Validation errors:', data.errors);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('Network error. Please check your connection.');
      setApiError('Network error. Please check your connection.');
      showNotificationModal('❌ Network error. Please check your connection.', "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Review Section Component
  const ReviewSection = () => (
    <div className="space-y-6">
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

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Personal Information</h3>
          <button 
            onClick={() => handleEditStep(1)}
            className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
          >
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReviewItem label="Full Name" value={formData.fullName} />
          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="Phone" value={formData.phone} />
          <ReviewItem label="Gender" value={formData.gender} />
          <ReviewItem label="Date of Birth" value={formData.dob} />
          <ReviewItem label="CNIC" value={formData.cnic} />
          <ReviewItem label="Address" value={formData.address} />
          <ReviewItem label="City" value={formData.city} />
          <ReviewItem label="Country" value={formData.country} />
          <ReviewItem label="Profile Picture" value={formData.file?.name || "Not uploaded"} />
        </div>
      </div>

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Education Information</h3>
          <button 
            onClick={() => handleEditStep(2)}
            className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
          >
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReviewItem label="Qualification" value={formData.qualification === "Other" ? formData.otherQualification : formData.qualification} />
          <ReviewItem label="Specialization" value={formData.specialization === "Other" ? formData.otherSpecialization : formData.specialization} />
          <ReviewItem label="Institute" value={formData.institute} />
          <ReviewItem label="Passing Year" value={formData.passingYear} />
        </div>
      </div>

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Professional Information</h3>
          <button 
            onClick={() => handleEditStep(3)}
            className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
          >
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ReviewItem label="Experience" value={formData.experienceYears} />
          <ReviewItem label="Current Hospital" value={formData.currentHospital} />
          <ReviewItem label="Designation" value={formData.designation} />
          <ReviewItem label="License Number" value={formData.licenseNumber} />
        </div>
      </div>

      <div className="border border-[#c0d3dc] rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#174047] text-lg">Documents Uploaded</h3>
          <button 
            onClick={() => handleEditStep(4)}
            className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
          >
            <FaEdit className="mr-1 h-3 w-3" /> Edit
          </button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DocumentStatus label="ID Card Front" file={formData.idCardFront} />
            <DocumentStatus label="ID Card Back" file={formData.idCardBack} />
            <DocumentStatus label="Doctor License" file={formData.doctorLicense} />
            <DocumentStatus label="MBBS Degree" file={formData.mbbsCertificate} />
            <DocumentStatus label="House Job Certificate" file={formData.houseJobCertificate} />
            <DocumentStatus label="Specialization Certificate" file={formData.specializationCertificate} />
            <DocumentStatus label="FCPS Certificate" file={formData.fcpsCertificate} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter strong password"
            value={formData.password}
            onChange={handleChange}
            className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
          />
          {passwordStrength && (
            <span className={`text-sm mt-1 ${
              passwordStrength === "Weak" ? "text-red-500" :
              passwordStrength === "Medium" ? "text-yellow-500" :
              "text-green-500"
            }`}>
              Strength: {passwordStrength}
            </span>
          )}
          {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
        <button 
          type="button" 
          className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
          onClick={handlePrevious}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
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

  const ReviewItem = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-[#174047] break-words">{value || "—"}</p>
    </div>
  );

  const DocumentStatus = ({ label, file }) => (
    <div className={`px-3 py-1 rounded text-xs font-medium ${file ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {label}: {file ? file.name : "✗ Required"}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  maxLength="11"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Gender *</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Date of Birth *</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">CNIC / ID Number *</label>
                <input
                  type="text"
                  name="cnic"
                  placeholder="XXXXXXXXXXXXX"
                  value={formData.cnic}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 13);
                    setFormData({ ...formData, cnic: value });
                  }}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  maxLength="13"
                />
                {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-[#174047] mb-1">Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street #, Area, City"
                  value={formData.address}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Country *</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-[#174047] mb-1">Profile Picture *</label>
                <input 
                  type="file" 
                  name="file" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG or JPEG (max 5MB)</p>
                {errors.file && <span className="text-red-500 text-sm mt-1">{errors.file}</span>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Qualification *</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                >
                  <option value="">Select Qualification</option>
                  <option>MBBS</option>
                  <option>MD</option>
                  <option>FCPS</option>
                  <option>PhD</option>
                  <option>Other</option>
                </select>
                {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
              </div>

              {formData.qualification === "Other" && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">Specify Qualification *</label>
                  <input
                    type="text"
                    name="otherQualification"
                    placeholder="Enter your qualification"
                    value={formData.otherQualification}
                    onChange={handleChange}
                    className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  />
                  {errors.otherQualification && <span className="text-red-500 text-sm mt-1">{errors.otherQualification}</span>}
                </div>
              )}

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Specialization *</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                >
                  <option value="">Select Specialization</option>
                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                  <option>Neurologist</option>
                  <option>Pediatrician</option>
                  <option>Psychiatrist</option>
                  <option>General Physician</option>
                  <option>Other</option>
                </select>
                {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
              </div>

              {formData.specialization === "Other" && (
                <div className="flex flex-col">
                  <label className="font-medium text-[#174047] mb-1">Specify Specialization *</label>
                  <input
                    type="text"
                    name="otherSpecialization"
                    placeholder="Enter your specialization"
                    value={formData.otherSpecialization}
                    onChange={handleChange}
                    className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  />
                  {errors.otherSpecialization && <span className="text-red-500 text-sm mt-1">{errors.otherSpecialization}</span>}
                </div>
              )}

              <div className="flex flex-col relative" ref={instituteRef}>
                <label className="font-medium text-[#174047] mb-1">Institute *</label>
                <input
                  type="text"
                  name="institute"
                  placeholder="Search for institute..."
                  value={formData.institute}
                  onChange={(e) => {
                    setFormData({ ...formData, institute: e.target.value });
                    setInstituteSearch(e.target.value);
                    setShowInstituteDropdown(true);
                  }}
                  onFocus={() => setShowInstituteDropdown(true)}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {showInstituteDropdown && (instituteResults.length > 0 || isLoadingInstitutes) && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#c0d3dc] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isLoadingInstitutes ? (
                      <div className="p-3 text-center text-gray-500">Searching...</div>
                    ) : (
                      instituteResults.map((institute, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-[#f8f9fa] cursor-pointer border-b last:border-b-0"
                          onClick={() => {
                            setFormData({ ...formData, institute: institute.name });
                            setInstituteSearch(institute.name);
                            setShowInstituteDropdown(false);
                          }}
                        >
                          <p className="font-medium text-[#174047]">{institute.name}</p>
                          <p className="text-xs text-gray-500">{institute.city}, {institute.country}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Year of Passing *</label>
                <input
                  type="date"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Years of Experience *</label>
                <input
                  type="text"
                  name="experienceYears"
                  placeholder="e.g., 5 years"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
              </div>

              <div className="flex flex-col relative" ref={hospitalRef}>
                <label className="font-medium text-[#174047] mb-1">Current Hospital *</label>
                <input
                  type="text"
                  name="currentHospital"
                  placeholder="Search for hospital..."
                  value={formData.currentHospital}
                  onChange={(e) => {
                    setFormData({ ...formData, currentHospital: e.target.value });
                    setHospitalSearch(e.target.value);
                    setShowHospitalDropdown(true);
                  }}
                  onFocus={() => setShowHospitalDropdown(true)}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {showHospitalDropdown && (hospitalResults.length > 0 || isLoadingHospitals) && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#c0d3dc] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isLoadingHospitals ? (
                      <div className="p-3 text-center text-gray-500">Searching...</div>
                    ) : (
                      hospitalResults.map((hospital, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-[#f8f9fa] cursor-pointer border-b last:border-b-0"
                          onClick={() => {
                            setFormData({ ...formData, currentHospital: hospital.name });
                            setHospitalSearch(hospital.name);
                            setShowHospitalDropdown(false);
                          }}
                        >
                          <p className="font-medium text-[#174047]">{hospital.name}</p>
                          <p className="text-xs text-gray-500">{hospital.city}, {hospital.country}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Designation *</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Consultant"
                  value={formData.designation}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">License Number (PM&DC) *</label>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="e.g., 75188 or 81910-P"
                  value={formData.licenseNumber}
                  onChange={handleLicenseChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  maxLength="7"
                />
                <p className="text-xs text-gray-500 mt-1">Format: 4-6 digits (optional: -P, -S, -D for type)</p>
                {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Identity Documents */}
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">ID Card Front *</label>
                <input 
                  type="file" 
                  name="idCardFront" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Front side of your ID card (Image)</p>
                {errors.idCardFront && <span className="text-red-500 text-sm mt-1">{errors.idCardFront}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">ID Card Back *</label>
                <input 
                  type="file" 
                  name="idCardBack" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Back side of your ID card (Image)</p>
                {errors.idCardBack && <span className="text-red-500 text-sm mt-1">{errors.idCardBack}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Doctor License *</label>
                <input 
                  type="file" 
                  name="doctorLicense" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*,.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">PM&DC License (Image or PDF)</p>
                {errors.doctorLicense && <span className="text-red-500 text-sm mt-1">{errors.doctorLicense}</span>}
              </div>

              {/* Educational Certificates */}
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">MBBS Degree *</label>
                <input 
                  type="file" 
                  name="mbbsCertificate" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*,.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">MBBS degree certificate (Image or PDF)</p>
                {errors.mbbsCertificate && <span className="text-red-500 text-sm mt-1">{errors.mbbsCertificate}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">House Job Certificate</label>
                <input 
                  type="file" 
                  name="houseJobCertificate" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*,.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">House job completion certificate (Optional)</p>
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Specialization Certificate</label>
                <input 
                  type="file" 
                  name="specializationCertificate" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*,.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">Specialization/Fellowship certificate (Optional)</p>
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">FCPS Certificate</label>
                <input 
                  type="file" 
                  name="fcpsCertificate" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*,.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">FCPS certificate if applicable (Optional)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2"
                onClick={handleNext}
              >
                Review Information →
              </button>
            </div>
          </div>
        );

      case 5:
        return <ReviewSection />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 md:p-6 lg:p-8 animate-fade-in">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2c6774] mb-2">Join Our Medical Team</h1>
          <p className="text-sm md:text-base text-[#174047]">Start your journey with us in just a few steps</p>
        </div>

        {/* Progress Stepper - Fixed connector lines */}
        <div className="flex justify-between items-start relative mb-8 px-2 md:px-4">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 text-base md:text-lg ${
                  step >= index + 1 
                    ? "bg-[#2c6774] text-white scale-110 shadow-md" 
                    : "bg-[#c0d3dc] text-[#174047]"
                }`}
              >
                {s.icon}
              </div>
              <p className="text-[10px] md:text-xs lg:text-sm font-medium text-[#174047] mt-2 text-center px-1">
                {s.label}
              </p>
              
              {/* Connector line - Fixed positioning */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute hidden sm:block h-0.5 md:h-1 transition-colors duration-300 ${
                    step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
                  }`}
                  style={{
                    top: '20px',
                    left: 'calc(50% + 20px)',
                    width: 'calc(100% - 40px)',
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#2c6774] text-center mb-4 md:mb-6">
            {steps[step - 1].label} Information
          </h2>
          {renderStepContent()}
        </div>
      </div>

      {/* Modal for notifications */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
          <div className={`bg-white rounded-lg p-6 max-w-sm w-full z-10 shadow-xl transform transition-all ${
            modalType === "success" ? "border-t-4 border-green-500" : "border-t-4 border-red-500"
          }`}>
            <div className="text-center">
              <div className={`text-4xl mb-3 ${modalType === "success" ? "text-green-500" : "text-red-500"}`}>
                {modalType === "success" ? "✅" : "❌"}
              </div>
              <p className="text-gray-700">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className={`mt-4 px-4 py-2 rounded-lg text-white ${
                  modalType === "success" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorRegistration;