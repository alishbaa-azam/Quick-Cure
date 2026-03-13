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
// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaUserMd,
//   FaGraduationCap,
//   FaBriefcase,
//   FaFileUpload,
//   FaEye,
//   FaEdit
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
    
//     // Educational Certificates
//     mbbsCertificate: null,
//     houseJobCertificate: null,
//     specializationCertificate: null,
//     fcpsCertificate: null,
    
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
//   const [apiError, setApiError] = useState("");
  
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
//       if (file && !file.type.startsWith('image/') && name !== 'certificates') {
//         setErrors({ ...errors, [name]: "Only image files are allowed" });
//         return;
//       }
      
//       setFormData({
//         ...formData,
//         [name]: file
//       });
      
//       // Clear error for this field
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: null });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
      
//       // Clear error for this field
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: null });
//       }
//     }

//     if (name === "password") evaluatePasswordStrength(value);
//   };

//   const evaluatePasswordStrength = (password) => {
//     if (password.length < 8) setPasswordStrength("Weak");
//     else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
//       setPasswordStrength("Strong");
//     else setPasswordStrength("Medium");
//   };

//   // Format license number (PM&DC format)
//   const handleLicenseChange = (e) => {
//     let value = e.target.value.toUpperCase().replace(/\s/g, '');
    
//     // Remove any non-alphanumeric characters
//     value = value.replace(/[^0-9A-Z-]/g, '');
    
//     // Format as numbers then optional suffix
//     const match = value.match(/^(\d{1,6})-?([A-Z]?)$/);
//     if (match) {
//       const numbers = match[1];
//       const suffix = match[2];
//       if (suffix) {
//         value = `${numbers}-${suffix}`;
//       } else {
//         value = numbers;
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
//       else if (!/^\d{4,6}(-[A-Z])?$/.test(formData.licenseNumber))
//         newErrors.licenseNumber = "License must be 4-6 digits with optional suffix (e.g., 75188 or 81910-P)";
//     } else if (step === 4) {
//       if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
//       if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
//       if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license image required";
//       if (!formData.mbbsCertificate) newErrors.mbbsCertificate = "MBBS degree certificate required";
//     } else if (step === 5) {
//       if (!formData.password.trim()) newErrors.password = "Password required";
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
//     setApiError("");
    
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
//       if (formData.mbbsCertificate) formDataToSend.append('mbbsCertificate', formData.mbbsCertificate);
//       if (formData.houseJobCertificate) formDataToSend.append('houseJobCertificate', formData.houseJobCertificate);
//       if (formData.specializationCertificate) formDataToSend.append('specializationCertificate', formData.specializationCertificate);
//       if (formData.fcpsCertificate) formDataToSend.append('fcpsCertificate', formData.fcpsCertificate);
      
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
//           mbbsCertificate: null,
//           houseJobCertificate: null,
//           specializationCertificate: null,
//           fcpsCertificate: null,
//           password: "",
//           confirmPassword: "",
//         });
//         setStep(1);
        
//         if (data.data && data.data.token) {
//           localStorage.setItem('doctorToken', data.data.token);
//         }
//       } else {
//         setSubmitError(data.message || 'Registration failed');
//         setApiError(data.message || 'Registration failed');
//         showNotificationModal(`❌ ${data.message || 'Registration failed'}`, "error");
        
//         if (data.errors) {
//           console.error('Validation errors:', data.errors);
//         }
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setSubmitError('Network error. Please check your connection.');
//       setApiError('Network error. Please check your connection.');
//       showNotificationModal('❌ Network error. Please check your connection.', "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Review Section Component
//   const ReviewSection = () => (
//     <div className="space-y-6">
//       {/* API Error Message */}
//       {apiError && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center text-red-800">
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//             <span className="font-medium">Error</span>
//           </div>
//           <p className="mt-1 text-sm text-red-700">{apiError}</p>
//         </div>
//       )}

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Personal Information</h3>
//           <button 
//             onClick={() => handleEditStep(1)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
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
//           <ReviewItem label="Profile Picture" value={formData.file?.name || "Not uploaded"} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Education Information</h3>
//           <button 
//             onClick={() => handleEditStep(2)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Qualification" value={formData.qualification === "Other" ? formData.otherQualification : formData.qualification} />
//           <ReviewItem label="Specialization" value={formData.specialization === "Other" ? formData.otherSpecialization : formData.specialization} />
//           <ReviewItem label="Institute" value={formData.institute} />
//           <ReviewItem label="Passing Year" value={formData.passingYear} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Professional Information</h3>
//           <button 
//             onClick={() => handleEditStep(3)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Experience" value={formData.experienceYears} />
//           <ReviewItem label="Current Hospital" value={formData.currentHospital} />
//           <ReviewItem label="Designation" value={formData.designation} />
//           <ReviewItem label="License Number" value={formData.licenseNumber} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Documents Uploaded</h3>
//           <button 
//             onClick={() => handleEditStep(4)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <DocumentStatus label="ID Card Front" file={formData.idCardFront} />
//             <DocumentStatus label="ID Card Back" file={formData.idCardBack} />
//             <DocumentStatus label="Doctor License" file={formData.doctorLicense} />
//             <DocumentStatus label="MBBS Degree" file={formData.mbbsCertificate} />
//             <DocumentStatus label="House Job Certificate" file={formData.houseJobCertificate} />
//             <DocumentStatus label="Specialization Certificate" file={formData.specializationCertificate} />
//             <DocumentStatus label="FCPS Certificate" file={formData.fcpsCertificate} />
//           </div>
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

//       <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//         <button 
//           type="button" 
//           className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
//           onClick={handlePrevious}
//         >
//           ← Previous
//         </button>
//         <button
//           type="button"
//           className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
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

//   const DocumentStatus = ({ label, file }) => (
//     <div className={`px-3 py-1 rounded text-xs font-medium ${file ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//       {label}: {file ? file.name : "✗ Required"}
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
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
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

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2"
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
//                 <label className="font-medium text-[#174047] mb-1">License Number (PM&DC) *</label>
//                 <input
//                   type="text"
//                   name="licenseNumber"
//                   placeholder="e.g., 75188 or 81910-P"
//                   value={formData.licenseNumber}
//                   onChange={handleLicenseChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="7"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: 4-6 digits (optional: -P, -S, -D for type)</p>
//                 {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2"
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
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Identity Documents */}
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Front *</label>
//                 <input 
//                   type="file" 
//                   name="idCardFront" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Front side of your ID card (Image)</p>
//                 {errors.idCardFront && <span className="text-red-500 text-sm mt-1">{errors.idCardFront}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Back *</label>
//                 <input 
//                   type="file" 
//                   name="idCardBack" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Back side of your ID card (Image)</p>
//                 {errors.idCardBack && <span className="text-red-500 text-sm mt-1">{errors.idCardBack}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Doctor License *</label>
//                 <input 
//                   type="file" 
//                   name="doctorLicense" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PM&DC License (Image or PDF)</p>
//                 {errors.doctorLicense && <span className="text-red-500 text-sm mt-1">{errors.doctorLicense}</span>}
//               </div>

//               {/* Educational Certificates */}
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">MBBS Degree *</label>
//                 <input 
//                   type="file" 
//                   name="mbbsCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">MBBS degree certificate (Image or PDF)</p>
//                 {errors.mbbsCertificate && <span className="text-red-500 text-sm mt-1">{errors.mbbsCertificate}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">House Job Certificate</label>
//                 <input 
//                   type="file" 
//                   name="houseJobCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">House job completion certificate (Optional)</p>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Specialization Certificate</label>
//                 <input 
//                   type="file" 
//                   name="specializationCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Specialization/Fellowship certificate (Optional)</p>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">FCPS Certificate</label>
//                 <input 
//                   type="file" 
//                   name="fcpsCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">FCPS certificate if applicable (Optional)</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-1 sm:order-2"
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

//         {/* Progress Stepper - Fixed connector lines */}
//         <div className="flex justify-between items-start relative mb-8 px-2 md:px-4">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center relative z-10 flex-1">
//               <div
//                 className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 text-base md:text-lg ${
//                   step >= index + 1 
//                     ? "bg-[#2c6774] text-white scale-110 shadow-md" 
//                     : "bg-[#c0d3dc] text-[#174047]"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-[10px] md:text-xs lg:text-sm font-medium text-[#174047] mt-2 text-center px-1">
//                 {s.label}
//               </p>
              
//               {/* Connector line - Fixed positioning */}
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute hidden sm:block h-0.5 md:h-1 transition-colors duration-300 ${
//                     step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
//                   }`}
//                   style={{
//                     top: '20px',
//                     left: 'calc(50% + 20px)',
//                     width: 'calc(100% - 40px)',
//                   }}
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

















//------------------institute and hospitals added-------------
// import React, { useState, useEffect } from "react";
// import {
//   FaUserMd,
//   FaGraduationCap,
//   FaBriefcase,
//   FaFileUpload,
//   FaEye,
//   FaEdit,
//   FaCheckCircle,
//   FaTimesCircle
// } from "react-icons/fa";
// import Select from "react-select";
// import axios from "axios";

// const DoctorRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Personal Information
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: "",
//     dob: "",
//     cnic: "",
//     address: "",
//     city: "",
//     country: "Pakistan",
//     profilePicture: null,

//     // Education Information
//     qualification: "",
//     specialization: "",
//     institute: null,
//     passingYear: "",
//     otherQualification: "",
//     otherSpecialization: "",

//     // Professional Information
//     experienceYears: "",
//     currentHospital: null,
//     designation: "",
//     licenseNumber: "",
    
//     // Documents
//     idCardFront: null,
//     idCardBack: null,
//     doctorLicense: null,
//     mbbsCertificate: null,
//     houseJobCertificate: null,
//     specializationCertificate: null,
//     fcpsCertificate: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("success");
//   const [registrationNumber, setRegistrationNumber] = useState("");

//   // Complete Institutes List
//   const instituteOptions = [
//     { value: "Aga Khan University (Karachi)", label: "Aga Khan University (Karachi)" },
//     { value: "Al-Nafees Medical College (Islamabad)", label: "Al-Nafees Medical College (Islamabad)" },
//     { value: "Allama Iqbal Medical College (Lahore)", label: "Allama Iqbal Medical College (Lahore)" },
//     { value: "Avicenna Medical College (Lahore)", label: "Avicenna Medical College (Lahore)" },
//     { value: "Ayub Medical College (Abbottabad)", label: "Ayub Medical College (Abbottabad)" },
//     { value: "Aziz Fatimah Medical & Dental College (Faisalabad)", label: "Aziz Fatimah Medical & Dental College (Faisalabad)" },
//     { value: "Bahria University Medical & Dental College (Karachi)", label: "Bahria University Medical & Dental College (Karachi)" },
//     { value: "Bakhtawar Amin Medical College (Multan)", label: "Bakhtawar Amin Medical College (Multan)" },
//     { value: "Bolan Medical College (Quetta)", label: "Bolan Medical College (Quetta)" },
//     { value: "Boston University School of Medicine (USA)", label: "Boston University School of Medicine (USA)" },
//     { value: "Central Park Medical College (Lahore)", label: "Central Park Medical College (Lahore)" },
//     { value: "CMH Lahore Medical College (Lahore)", label: "CMH Lahore Medical College (Lahore)" },
//     { value: "CMH Multan Institute of Medical Sciences (Multan)", label: "CMH Multan Institute of Medical Sciences (Multan)" },
//     { value: "Columbia University Vagelos College of Physicians and Surgeons (USA)", label: "Columbia University Vagelos College of Physicians and Surgeons (USA)" },
//     { value: "Continental Medical College (Lahore)", label: "Continental Medical College (Lahore)" },
//     { value: "D.G. Khan Medical College (Dera Ghazi Khan)", label: "D.G. Khan Medical College (Dera Ghazi Khan)" },
//     { value: "Dental College HITEC-IMS (Taxila)", label: "Dental College HITEC-IMS (Taxila)" },
//     { value: "Dow International Medical College (Karachi)", label: "Dow International Medical College (Karachi)" },
//     { value: "Dow Medical College (Karachi)", label: "Dow Medical College (Karachi)" },
//     { value: "Duke University School of Medicine (USA)", label: "Duke University School of Medicine (USA)" },
//     { value: "Faisalabad Medical University (Faisalabad)", label: "Faisalabad Medical University (Faisalabad)" },
//     { value: "Fatima Jinnah Medical University (Lahore)", label: "Fatima Jinnah Medical University (Lahore)" },
//     { value: "Foundation University Medical College (Islamabad)", label: "Foundation University Medical College (Islamabad)" },
//     { value: "Ghulam Muhammad Mahar Medical College (Sukkur)", label: "Ghulam Muhammad Mahar Medical College (Sukkur)" },
//     { value: "Gujranwala Medical College (Gujranwala)", label: "Gujranwala Medical College (Gujranwala)" },
//     { value: "Hamdard College of Medicine & Dentistry (Karachi)", label: "Hamdard College of Medicine & Dentistry (Karachi)" },
//     { value: "Harvard Medical School (USA)", label: "Harvard Medical School (USA)" },
//     { value: "Imperial College London Faculty of Medicine (UK)", label: "Imperial College London Faculty of Medicine (UK)" },
//     { value: "Independent Medical College (Faisalabad)", label: "Independent Medical College (Faisalabad)" },
//     { value: "Islamic International Medical College (Rawalpindi)", label: "Islamic International Medical College (Rawalpindi)" },
//     { value: "Islamabad Medical & Dental College (Islamabad)", label: "Islamabad Medical & Dental College (Islamabad)" },
//     { value: "Jinnah Medical & Dental College (Karachi)", label: "Jinnah Medical & Dental College (Karachi)" },
//     { value: "Jinnah Medical College (Peshawar)", label: "Jinnah Medical College (Peshawar)" },
//     { value: "Jinnah Sindh Medical University (Karachi)", label: "Jinnah Sindh Medical University (Karachi)" },
//     { value: "Johns Hopkins University School of Medicine (USA)", label: "Johns Hopkins University School of Medicine (USA)" },
//     { value: "Kabir Medical College (Peshawar)", label: "Kabir Medical College (Peshawar)" },
//     { value: "Karolinska Institute (Sweden)", label: "Karolinska Institute (Sweden)" },
//     { value: "Khyber Girls Medical College (Peshawar)", label: "Khyber Girls Medical College (Peshawar)" },
//     { value: "Khyber Medical College (Peshawar)", label: "Khyber Medical College (Peshawar)" },
//     { value: "King Edward Medical University (Lahore)", label: "King Edward Medical University (Lahore)" },
//     { value: "King's College London GKT School of Medical Education (UK)", label: "King's College London GKT School of Medical Education (UK)" },
//     { value: "Lahore Medical & Dental College (Lahore)", label: "Lahore Medical & Dental College (Lahore)" },
//     { value: "Liaquat College of Medicine & Dentistry (Karachi)", label: "Liaquat College of Medicine & Dentistry (Karachi)" },
//     { value: "Liaquat University of Medical & Health Sciences (Jamshoro)", label: "Liaquat University of Medical & Health Sciences (Jamshoro)" },
//     { value: "McGill University Faculty of Medicine (Canada)", label: "McGill University Faculty of Medicine (Canada)" },
//     { value: "Monash University Faculty of Medicine (Australia)", label: "Monash University Faculty of Medicine (Australia)" },
//     { value: "Multan Medical & Dental College (Multan)", label: "Multan Medical & Dental College (Multan)" },
//     { value: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)", label: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)" },
//     { value: "New York University Grossman School of Medicine (USA)", label: "New York University Grossman School of Medicine (USA)" },
//     { value: "Nishtar Medical University (Multan)", label: "Nishtar Medical University (Multan)" },
//     { value: "Northwest School of Medicine (Peshawar)", label: "Northwest School of Medicine (Peshawar)" },
//     { value: "Northwestern University Feinberg School of Medicine (USA)", label: "Northwestern University Feinberg School of Medicine (USA)" },
//     { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
//     { value: "Peshawar Medical College (Peshawar)", label: "Peshawar Medical College (Peshawar)" },
//     { value: "Quaid-e-Azam Medical College (Bahawalpur)", label: "Quaid-e-Azam Medical College (Bahawalpur)" },
//     { value: "Rawal Institute of Health Sciences (Islamabad)", label: "Rawal Institute of Health Sciences (Islamabad)" },
//     { value: "Rawalpindi Medical University (Rawalpindi)", label: "Rawalpindi Medical University (Rawalpindi)" },
//     { value: "Rehman Medical College (Peshawar)", label: "Rehman Medical College (Peshawar)" },
//     { value: "Saidu Medical College (Swat)", label: "Saidu Medical College (Swat)" },
//     { value: "Sargodha Medical College (Sargodha)", label: "Sargodha Medical College (Sargodha)" },
//     { value: "Sharif Medical & Dental College (Lahore)", label: "Sharif Medical & Dental College (Lahore)" },
//     { value: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)", label: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)" },
//     { value: "Sheikh Zayed Medical College (Rahim Yar Khan)", label: "Sheikh Zayed Medical College (Rahim Yar Khan)" },
//     { value: "Shifa College of Medicine (Islamabad)", label: "Shifa College of Medicine (Islamabad)" },
//     { value: "Sindh Medical College (Karachi)", label: "Sindh Medical College (Karachi)" },
//     { value: "Stanford University School of Medicine (USA)", label: "Stanford University School of Medicine (USA)" },
//     { value: "Trinity College Dublin School of Medicine (Ireland)", label: "Trinity College Dublin School of Medicine (Ireland)" },
//     { value: "University College London Medical School (UK)", label: "University College London Medical School (UK)" },
//     { value: "University Medical & Dental College Faisalabad (Faisalabad)", label: "University Medical & Dental College Faisalabad (Faisalabad)" },
//     { value: "University of Balochistan (Quetta)", label: "University of Balochistan (Quetta)" },
//     { value: "University of California, San Francisco School of Medicine (USA)", label: "University of California, San Francisco School of Medicine (USA)" },
//     { value: "University of Cambridge School of Clinical Medicine (UK)", label: "University of Cambridge School of Clinical Medicine (UK)" },
//     { value: "University of Edinburgh Medical School (UK)", label: "University of Edinburgh Medical School (UK)" },
//     { value: "University of Health Sciences (Lahore)", label: "University of Health Sciences (Lahore)" },
//     { value: "University of Melbourne Medical School (Australia)", label: "University of Melbourne Medical School (Australia)" },
//     { value: "University of Michigan Medical School (USA)", label: "University of Michigan Medical School (USA)" },
//     { value: "University of Oxford Medical Sciences Division (UK)", label: "University of Oxford Medical Sciences Division (UK)" },
//     { value: "University of Pennsylvania Perelman School of Medicine (USA)", label: "University of Pennsylvania Perelman School of Medicine (USA)" },
//     { value: "University of Sydney School of Medicine (Australia)", label: "University of Sydney School of Medicine (Australia)" },
//     { value: "University of Toronto Temerty Faculty of Medicine (Canada)", label: "University of Toronto Temerty Faculty of Medicine (Canada)" },
//     { value: "University of Washington School of Medicine (USA)", label: "University of Washington School of Medicine (USA)" },
//     { value: "Wah Medical College (Wah Cantt)", label: "Wah Medical College (Wah Cantt)" },
//     { value: "Washington University in St. Louis School of Medicine (USA)", label: "Washington University in St. Louis School of Medicine (USA)" },
//     { value: "Women Medical College (Abbottabad)", label: "Women Medical College (Abbottabad)" },
//     { value: "Yale School of Medicine (USA)", label: "Yale School of Medicine (USA)" },
//     { value: "Ziauddin Medical College (Karachi)", label: "Ziauddin Medical College (Karachi)" }
//   ];

//   // Complete Hospitals List
//   const hospitalOptions = [
//     // Government Hospitals
//     { value: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)", label: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)" },
//     { value: "Abbasi Shaheed Hospital (ASH) (Karachi)", label: "Abbasi Shaheed Hospital (ASH) (Karachi)" },
//     { value: "Allied Hospital (AH) (Faisalabad)", label: "Allied Hospital (AH) (Faisalabad)" },
//     { value: "Ayub Teaching Hospital (ATH) (Abbottabad)", label: "Ayub Teaching Hospital (ATH) (Abbottabad)" },
//     { value: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)", label: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)" },
//     { value: "Bahawal Victoria Hospital (BVH) (Bahawalpur)", label: "Bahawal Victoria Hospital (BVH) (Bahawalpur)" },
//     { value: "Benazir Bhutto Hospital (BBH) (Rawalpindi)", label: "Benazir Bhutto Hospital (BBH) (Rawalpindi)" },
//     { value: "Bolan Medical Complex Hospital (BMCH) (Quetta)", label: "Bolan Medical Complex Hospital (BMCH) (Quetta)" },
//     { value: "Civil Hospital Karachi (CHK) (Karachi)", label: "Civil Hospital Karachi (CHK) (Karachi)" },
//     { value: "Civil Hospital, Larkana (CHL) (Larkana)", label: "Civil Hospital, Larkana (CHL) (Larkana)" },
//     { value: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)", label: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)" },
//     { value: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)", label: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)" },
//     { value: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)", label: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)" },
//     { value: "DHQ Hospital Gilgit (DHQ) (Gilgit)", label: "DHQ Hospital Gilgit (DHQ) (Gilgit)" },
//     { value: "District Headquarter Hospital Battagram (DHQ) (Battagram)", label: "District Headquarter Hospital Battagram (DHQ) (Battagram)" },
//     { value: "Gambat Institute of Medical Sciences (GIMS) (Gambat)", label: "Gambat Institute of Medical Sciences (GIMS) (Gambat)" },
//     { value: "Hayatabad Medical Complex (HMC) (Peshawar)", label: "Hayatabad Medical Complex (HMC) (Peshawar)" },
//     { value: "Holy Family Hospital (HFH) (Rawalpindi)", label: "Holy Family Hospital (HFH) (Rawalpindi)" },
//     { value: "Institute of Infection Diseases (IID) (Karachi)", label: "Institute of Infection Diseases (IID) (Karachi)" },
//     { value: "Jinnah Hospital Lahore (JHL) (Lahore)", label: "Jinnah Hospital Lahore (JHL) (Lahore)" },
//     { value: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)", label: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)" },
//     { value: "Khyber Teaching Hospital (KTH) (Peshawar)", label: "Khyber Teaching Hospital (KTH) (Peshawar)" },
//     { value: "Lady Reading Hospital (LRH) (Peshawar)", label: "Lady Reading Hospital (LRH) (Peshawar)" },
//     { value: "Lahore General Hospital (LGH) (Lahore)", label: "Lahore General Hospital (LGH) (Lahore)" },
//     { value: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)", label: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)" },
//     { value: "Mayo Hospital (MH) (Lahore)", label: "Mayo Hospital (MH) (Lahore)" },
//     { value: "Mian Muhammad Trust Hospital (MMT) (Lahore)", label: "Mian Muhammad Trust Hospital (MMT) (Lahore)" },
//     { value: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)", label: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)" },
//     { value: "Multan Institute of Cardiology (MIC) (Multan)", label: "Multan Institute of Cardiology (MIC) (Multan)" },
//     { value: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)", label: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)" },
//     { value: "National Institute of Child Health (NICH) (Karachi)", label: "National Institute of Child Health (NICH) (Karachi)" },
//     { value: "National Police Hospital (NPH) (Islamabad)", label: "National Police Hospital (NPH) (Islamabad)" },
//     { value: "Nishtar Hospital (NH) (Multan)", label: "Nishtar Hospital (NH) (Multan)" },
//     { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
//     { value: "Punjab Institute of Cardiology (PIC) (Lahore)", label: "Punjab Institute of Cardiology (PIC) (Lahore)" },
//     { value: "Punjab Social Security Hospital (PSSH) (Lahore)", label: "Punjab Social Security Hospital (PSSH) (Lahore)" },
//     { value: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)", label: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)" },
//     { value: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)", label: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)" },
//     { value: "Saidu Teaching Hospital (STH) (Saidu Sharif)", label: "Saidu Teaching Hospital (STH) (Saidu Sharif)" },
//     { value: "Services Hospital (SHL) (Lahore)", label: "Services Hospital (SHL) (Lahore)" },
//     { value: "Shaikh Zayed Hospital (SZH) (Lahore)", label: "Shaikh Zayed Hospital (SZH) (Lahore)" },
//     { value: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)", label: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)" },
//     { value: "Social Security Hospital (SSH) (Lahore)", label: "Social Security Hospital (SSH) (Lahore)" },
//     { value: "The Children's Hospital Lahore (CHL) (Lahore)", label: "The Children's Hospital Lahore (CHL) (Lahore)" },
    
//     // Private Hospitals
//     { value: "Aga Khan University Hospital (AKUH) (Karachi)", label: "Aga Khan University Hospital (AKUH) (Karachi)" },
//     { value: "Al Falah International Hospital (AFIH) (Abbottabad)", label: "Al Falah International Hospital (AFIH) (Abbottabad)" },
//     { value: "Al Khidmat Hospital (AKH) (Peshawar)", label: "Al Khidmat Hospital (AKH) (Peshawar)" },
//     { value: "Chiniot General Hospital (CGH) (Karachi)", label: "Chiniot General Hospital (CGH) (Karachi)" },
//     { value: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)", label: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)" },
//     { value: "Doctors Hospital (DHL) (Lahore)", label: "Doctors Hospital (DHL) (Lahore)" },
//     { value: "Farooq Hospital (FH) (Lahore)", label: "Farooq Hospital (FH) (Lahore)" },
//     { value: "Fatima Memorial Hospital (FMH) (Lahore)", label: "Fatima Memorial Hospital (FMH) (Lahore)" },
//     { value: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)", label: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)" },
//     { value: "Hameed Latif Hospital (HLH) (Lahore)", label: "Hameed Latif Hospital (HLH) (Lahore)" },
//     { value: "Indus Hospital (TIH) (Karachi)", label: "Indus Hospital (TIH) (Karachi)" },
//     { value: "Irfan General Hospital (IGH) (Peshawar)", label: "Irfan General Hospital (IGH) (Peshawar)" },
//     { value: "Ittefaq Hospital (IH) (Lahore)", label: "Ittefaq Hospital (IH) (Lahore)" },
//     { value: "Jinnah Teaching Hospital (JTH) (Peshawar)", label: "Jinnah Teaching Hospital (JTH) (Peshawar)" },
//     { value: "Kuwait Teaching Hospital (KTH) (Peshawar)", label: "Kuwait Teaching Hospital (KTH) (Peshawar)" },
//     { value: "Liaquat National Hospital (LNH) (Karachi)", label: "Liaquat National Hospital (LNH) (Karachi)" },
//     { value: "Mid City Hospital (MCH) (Lahore)", label: "Mid City Hospital (MCH) (Lahore)" },
//     { value: "National Hospital & Medical Center (NHMC) (Lahore)", label: "National Hospital & Medical Center (NHMC) (Lahore)" },
//     { value: "National Medical Center (NMC) (Karachi)", label: "National Medical Center (NMC) (Karachi)" },
//     { value: "Northwest General Hospital (NWGH) (Peshawar)", label: "Northwest General Hospital (NWGH) (Peshawar)" },
//     { value: "Omar Hospital (OH) (Lahore)", label: "Omar Hospital (OH) (Lahore)" },
//     { value: "PIMS Hospital (PIMSH) (Peshawar)", label: "PIMS Hospital (PIMSH) (Peshawar)" },
//     { value: "Prime Care Hospital (PCH) (Lahore)", label: "Prime Care Hospital (PCH) (Lahore)" },
//     { value: "Prime Teaching Hospital (PTH) (Peshawar)", label: "Prime Teaching Hospital (PTH) (Peshawar)" },
//     { value: "Quaid-e-Azam International Hospital (QIH) (Islamabad)", label: "Quaid-e-Azam International Hospital (QIH) (Islamabad)" },
//     { value: "Rehman Medical Institute (RMI) (Peshawar)", label: "Rehman Medical Institute (RMI) (Peshawar)" },
//     { value: "Saifee Hospital (SHK) (Karachi)", label: "Saifee Hospital (SHK) (Karachi)" },
//     { value: "Shafa International Hospital (SIH) (Islamabad)", label: "Shafa International Hospital (SIH) (Islamabad)" },
//     { value: "Shalamar Hospital (SHL) (Lahore)", label: "Shalamar Hospital (SHL) (Lahore)" },
//     { value: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)", label: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)" },
//     { value: "Shifa International Hospital (SIH) (Islamabad)", label: "Shifa International Hospital (SIH) (Islamabad)" },
//     { value: "South City Hospital (SCH) (Karachi)", label: "South City Hospital (SCH) (Karachi)" },
//     { value: "Surgimed Hospital (SHL) (Lahore)", label: "Surgimed Hospital (SHL) (Lahore)" },
//     { value: "United Christian Hospital (UCH) (Lahore)", label: "United Christian Hospital (UCH) (Lahore)" },
    
//     // International Hospitals
//     { value: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)", label: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)" },
//     { value: "Massachusetts General Hospital (USA)", label: "Massachusetts General Hospital (USA)" },
//     { value: "Singapore General Hospital (Singapore)", label: "Singapore General Hospital (Singapore)" }
//   ];

//   // Qualification Options
//   const qualificationOptions = [
//     { value: "MBBS", label: "MBBS" },
//     { value: "MD", label: "MD" },
//     { value: "FCPS", label: "FCPS" },
//     { value: "FRCS", label: "FRCS" },
//     { value: "MRCP", label: "MRCP" },
//     { value: "PhD", label: "PhD" },
//     { value: "Other", label: "Other" }
//   ];

//   // Specialization Options
//   const specializationOptions = [
//     { value: "Cardiologist", label: "Cardiologist" },
//     { value: "Dermatologist", label: "Dermatologist" },
//     { value: "Neurologist", label: "Neurologist" },
//     { value: "Pediatrician", label: "Pediatrician" },
//     { value: "Psychiatrist", label: "Psychiatrist" },
//     { value: "General Physician", label: "General Physician" },
//     { value: "Gynecologist", label: "Gynecologist" },
//     { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
//     { value: "Ophthalmologist", label: "Ophthalmologist" },
//     { value: "ENT Specialist", label: "ENT Specialist" },
//     { value: "Other", label: "Other" }
//   ];

//   const steps = [
//     { icon: <FaUserMd />, label: "Personal" },
//     { icon: <FaGraduationCap />, label: "Education" },
//     { icon: <FaBriefcase />, label: "Professional" },
//     { icon: <FaFileUpload />, label: "Documents" },
//     { icon: <FaEye />, label: "Review" },
//   ];

//   // Strong Email Validation Function
//   const validateEmail = (email) => {
//     // Common email domains list
//     const commonDomains = [
//       'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
//       'aol.com', 'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com',
//       'gmx.com', 'zoho.com', 'rediffmail.com', 'ymail.com', 'rocketmail.com',
//       'msn.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de', 'outlook.fr',
//       'outlook.de', 'outlook.co.uk', 'live.co.uk', 'live.fr', 'live.de',
//       'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'yahoo.in', 'yahoo.com.au',
//       // Educational domains
//       'edu.pk', 'edu', 'ac.uk', 'edu.au', 'ac.za', 'edu.sg', 'edu.my',
//       'edu.hk', 'ac.jp', 'edu.cn', 'ac.in', 'edu.sa', 'edu.ae', 'ac.ke',
//       // Professional domains
//       'med.pk', 'dr.com', 'healthcare.com', 'medical.org', 'hospital.com',
//       'clinic.com', 'doctor.com', 'physician.com', 'health.org',
//       // International
//       'alumni.edu', 'student.edu', 'faculty.edu', 'research.org',
//       'university.org', 'college.edu', 'institute.edu', 'academy.edu'
//     ];

//     // Regular expression for basic email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
//     if (!emailRegex.test(email)) {
//       return false;
//     }

//     // Extract domain
//     const domain = email.split('@')[1].toLowerCase();
    
//     // Check if domain is in common domains list
//     const isValidDomain = commonDomains.some(commonDomain => 
//       domain === commonDomain || domain.endsWith('.' + commonDomain)
//     );

//     // Allow any valid domain structure (for custom domains)
//     if (!isValidDomain) {
//       // Check if domain has valid structure (at least one dot and valid TLD)
//       const domainParts = domain.split('.');
//       if (domainParts.length < 2) return false;
      
//       // Check if TLD is at least 2 characters
//       const tld = domainParts[domainParts.length - 1];
//       if (tld.length < 2) return false;
      
//       // Check if domain name part exists
//       const domainName = domainParts[domainParts.length - 2];
//       if (!domainName || domainName.length < 1) return false;
//     }

//     return true;
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [step]);

//   const handleChange = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file") {
//       const file = files[0];
//       if (file && !file.type.startsWith('image/') && name !== 'doctorLicense' && name !== 'mbbsCertificate') {
//         setErrors({ ...errors, [name]: "Only image files are allowed" });
//         return;
//       }
      
//       setFormData({
//         ...formData,
//         [name]: file
//       });
      
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: null });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
      
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: null });
//       }
//     }
//   };

//   const handleSelectChange = (selectedOption, fieldName) => {
//     setFormData({
//       ...formData,
//       [fieldName]: selectedOption
//     });
    
//     if (errors[fieldName]) {
//       setErrors({ ...errors, [fieldName]: null });
//     }
//   };

//   // Format license number
//   const handleLicenseChange = (e) => {
//     let value = e.target.value.toUpperCase().replace(/\s/g, '');
//     value = value.replace(/[^0-9A-Z-]/g, '');
    
//     const match = value.match(/^(\d{1,6})-?([A-Z]?)$/);
//     if (match) {
//       const numbers = match[1];
//       const suffix = match[2];
//       if (suffix) {
//         value = `${numbers}-${suffix}`;
//       } else {
//         value = numbers;
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
//       if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
//       if (!formData.email?.trim()) {
//         newErrors.email = "Email is required";
//       } else if (!validateEmail(formData.email)) {
//         newErrors.email = "Please enter a valid email address";
//       }
//       if (!formData.phone?.trim()) newErrors.phone = "Phone number required";
//       else if (!/^[0-9]{11}$/.test(formData.phone))
//         newErrors.phone = "Phone number must be 11 digits";
//       if (!formData.gender) newErrors.gender = "Gender required";
//       if (!formData.dob) newErrors.dob = "Date of birth required";
//       if (!formData.cnic?.trim()) newErrors.cnic = "CNIC required";
//       else if (!/^[0-9]{13}$/.test(formData.cnic))
//         newErrors.cnic = "CNIC must be 13 digits";
//       if (!formData.address?.trim()) newErrors.address = "Address required";
//       if (!formData.city?.trim()) newErrors.city = "City required";
//       if (!formData.country?.trim()) newErrors.country = "Country required";
//       if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required";
//     } 
//     else if (step === 2) {
//       if (!formData.qualification) newErrors.qualification = "Qualification required";
//       if (formData.qualification?.value === "Other" && !formData.otherQualification?.trim()) {
//         newErrors.otherQualification = "Please specify your qualification";
//       }
//       if (!formData.specialization) newErrors.specialization = "Specialization required";
//       if (formData.specialization?.value === "Other" && !formData.otherSpecialization?.trim()) {
//         newErrors.otherSpecialization = "Please specify your specialization";
//       }
//       if (!formData.institute) newErrors.institute = "Institute required";
//       if (!formData.passingYear) newErrors.passingYear = "Passing year required";
//     } 
//     else if (step === 3) {
//       if (!formData.experienceYears?.trim())
//         newErrors.experienceYears = "Experience required";
//       if (!formData.currentHospital)
//         newErrors.currentHospital = "Current hospital required";
//       if (!formData.designation?.trim())
//         newErrors.designation = "Designation required";
//       if (!formData.licenseNumber?.trim())
//         newErrors.licenseNumber = "License number required";
//     } 
//     else if (step === 4) {
//       if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
//       if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
//       if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license required";
//       if (!formData.mbbsCertificate) newErrors.mbbsCertificate = "MBBS certificate required";
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

//   const showNotificationModal = (message, type = "success") => {
//     setModalMessage(message);
//     setModalType(type);
//     setShowModal(true);
    
//     setTimeout(() => {
//       setShowModal(false);
//     }, 3000);
//   };

//   const handleSubmit = async () => {
//     if (!validateStep()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");

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
//       formDataToSend.append('qualification', formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.value);
//       formDataToSend.append('specialization', formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.value);
//       formDataToSend.append('institute', formData.institute?.value || formData.institute);
//       formDataToSend.append('passingYear', formData.passingYear);
      
//       // Professional Information
//       formDataToSend.append('experienceYears', formData.experienceYears);
//       formDataToSend.append('currentHospital', formData.currentHospital?.value || formData.currentHospital);
//       formDataToSend.append('designation', formData.designation);
//       formDataToSend.append('licenseNumber', formData.licenseNumber);
      
//       // Documents
//       if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
//       if (formData.idCardFront) formDataToSend.append('idCardFront', formData.idCardFront);
//       if (formData.idCardBack) formDataToSend.append('idCardBack', formData.idCardBack);
//       if (formData.doctorLicense) formDataToSend.append('doctorLicense', formData.doctorLicense);
//       if (formData.mbbsCertificate) formDataToSend.append('mbbsCertificate', formData.mbbsCertificate);
//       if (formData.houseJobCertificate) formDataToSend.append('houseJobCertificate', formData.houseJobCertificate);
//       if (formData.specializationCertificate) formDataToSend.append('specializationCertificate', formData.specializationCertificate);
//       if (formData.fcpsCertificate) formDataToSend.append('fcpsCertificate', formData.fcpsCertificate);

//       const response = await axios.post('http://localhost:5000/api/doctor-registration/register', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.data.success) {
//         setSubmitSuccess(true);
//         setRegistrationNumber(response.data.data.registrationNumber);
//         showNotificationModal(`✅ ${response.data.message}`, "success");
        
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
//           country: "Pakistan",
//           profilePicture: null,
//           qualification: "",
//           specialization: "",
//           institute: null,
//           passingYear: "",
//           otherQualification: "",
//           otherSpecialization: "",
//           experienceYears: "",
//           currentHospital: null,
//           designation: "",
//           licenseNumber: "",
//           idCardFront: null,
//           idCardBack: null,
//           doctorLicense: null,
//           mbbsCertificate: null,
//           houseJobCertificate: null,
//           specializationCertificate: null,
//           fcpsCertificate: null,
//         });
//         setStep(1);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
//       setSubmitError(errorMessage);
//       showNotificationModal(`❌ ${errorMessage}`, "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Review Section Component
//   const ReviewSection = () => (
//     <div className="space-y-6">
//       {submitSuccess && (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
//           <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
//           <h3 className="text-xl font-bold text-green-700 mb-2">Registration Successful!</h3>
//           <p className="text-gray-600 mb-3">Your registration number is:</p>
//           <p className="text-2xl font-mono font-bold text-[#2c6774] bg-white p-3 rounded-lg border border-green-200">
//             {registrationNumber}
//           </p>
//           <p className="text-sm text-gray-500 mt-3">Please save this number for future reference</p>
//         </div>
//       )}

//       {submitError && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center text-red-800">
//             <FaTimesCircle className="text-red-500 mr-2" />
//             <span className="font-medium">Error: {submitError}</span>
//           </div>
//         </div>
//       )}

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Personal Information</h3>
//           <button 
//             onClick={() => handleEditStep(1)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
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
//           <ReviewItem label="Profile Picture" value={formData.profilePicture?.name || "Uploaded"} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Education Information</h3>
//           <button 
//             onClick={() => handleEditStep(2)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Qualification" value={formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.label} />
//           <ReviewItem label="Specialization" value={formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.label} />
//           <ReviewItem label="Institute" value={formData.institute?.label || formData.institute} />
//           <ReviewItem label="Passing Year" value={formData.passingYear} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Professional Information</h3>
//           <button 
//             onClick={() => handleEditStep(3)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Experience" value={formData.experienceYears} />
//           <ReviewItem label="Current Hospital" value={formData.currentHospital?.label || formData.currentHospital} />
//           <ReviewItem label="Designation" value={formData.designation} />
//           <ReviewItem label="License Number" value={formData.licenseNumber} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Documents Uploaded</h3>
//           <button 
//             onClick={() => handleEditStep(4)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <DocumentStatus label="ID Card Front" file={formData.idCardFront} />
//             <DocumentStatus label="ID Card Back" file={formData.idCardBack} />
//             <DocumentStatus label="Doctor License" file={formData.doctorLicense} />
//             <DocumentStatus label="MBBS Degree" file={formData.mbbsCertificate} />
//             <DocumentStatus label="House Job" file={formData.houseJobCertificate} />
//             <DocumentStatus label="Specialization" file={formData.specializationCertificate} />
//             <DocumentStatus label="FCPS" file={formData.fcpsCertificate} />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//         <button 
//           type="button" 
//           className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
//           onClick={handlePrevious}
//         >
//           ← Previous
//         </button>
//         <button
//           type="button"
//           className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
//           onClick={handleSubmit}
//           disabled={isSubmitting || submitSuccess}
//         >
//           {isSubmitting ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
//               Submitting...
//             </>
//           ) : submitSuccess ? (
//             'Already Submitted'
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

//   const DocumentStatus = ({ label, file }) => (
//     <div className={`px-3 py-1 rounded text-xs font-medium ${file ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//       {label}: {file ? "✓ Uploaded" : "—"}
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                   placeholder="Enter your email (e.g., name@gmail.com, name@hotmail.com)"
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
//                   placeholder="03001234567"
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
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
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
//                 <label className="font-medium text-[#174047] mb-1">CNIC Number *</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="1234512345678"
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
//                   placeholder="Street address, area"
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
//                   name="profilePicture" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG (max 5MB)</p>
//                 {errors.profilePicture && <span className="text-red-500 text-sm mt-1">{errors.profilePicture}</span>}
//               </div>
//             </div>

//             <div className="flex justify-end mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Qualification *</label>
//                 <Select
//                   options={qualificationOptions}
//                   value={formData.qualification}
//                   onChange={(option) => handleSelectChange(option, 'qualification')}
//                   placeholder="Select qualification..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                 />
//                 {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
//               </div>

//               {formData.qualification?.value === "Other" && (
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
//                 <Select
//                   options={specializationOptions}
//                   value={formData.specialization}
//                   onChange={(option) => handleSelectChange(option, 'specialization')}
//                   placeholder="Select specialization..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                 />
//                 {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
//               </div>

//               {formData.specialization?.value === "Other" && (
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

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Institute/University *</label>
//                 <Select
//                   options={instituteOptions}
//                   value={formData.institute}
//                   onChange={(option) => handleSelectChange(option, 'institute')}
//                   placeholder="Search institute..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                   styles={{
//                     menu: (provided) => ({ ...provided, maxHeight: 300, overflowY: 'auto' })
//                   }}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Type to search from {instituteOptions.length}+ institutes</p>
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

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Current Hospital *</label>
//                 <Select
//                   options={hospitalOptions}
//                   value={formData.currentHospital}
//                   onChange={(option) => handleSelectChange(option, 'currentHospital')}
//                   placeholder="Search hospital..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                   styles={{
//                     menu: (provided) => ({ ...provided, maxHeight: 300, overflowY: 'auto' })
//                   }}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Type to search from {hospitalOptions.length}+ hospitals</p>
//                 {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Designation *</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   placeholder="e.g., Senior Registrar"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Number (PM&DC) *</label>
//                 <input
//                   type="text"
//                   name="licenseNumber"
//                   placeholder="e.g., 75188 or 81910-P"
//                   value={formData.licenseNumber}
//                   onChange={handleLicenseChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="7"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: 4-6 digits (optional: -P, -S)</p>
//                 {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
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
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Front *</label>
//                 <input 
//                   type="file" 
//                   name="idCardFront" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Front side of your CNIC</p>
//                 {errors.idCardFront && <span className="text-red-500 text-sm mt-1">{errors.idCardFront}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Back *</label>
//                 <input 
//                   type="file" 
//                   name="idCardBack" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Back side of your CNIC</p>
//                 {errors.idCardBack && <span className="text-red-500 text-sm mt-1">{errors.idCardBack}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Doctor License *</label>
//                 <input 
//                   type="file" 
//                   name="doctorLicense" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PM&DC License (Image or PDF)</p>
//                 {errors.doctorLicense && <span className="text-red-500 text-sm mt-1">{errors.doctorLicense}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">MBBS Degree *</label>
//                 <input 
//                   type="file" 
//                   name="mbbsCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">MBBS degree certificate</p>
//                 {errors.mbbsCertificate && <span className="text-red-500 text-sm mt-1">{errors.mbbsCertificate}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">House Job Certificate</label>
//                 <input 
//                   type="file" 
//                   name="houseJobCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Optional</p>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Specialization Certificate</label>
//                 <input 
//                   type="file" 
//                   name="specializationCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Optional</p>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">FCPS Certificate</label>
//                 <input 
//                   type="file" 
//                   name="fcpsCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Optional</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
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
//     <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 md:p-6 lg:p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Doctor Registration</h1>
//           <p className="text-sm md:text-base text-[#174047]">Complete all steps to register</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="flex justify-between items-center mb-8 px-2">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center flex-1">
//               <div
//                 className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   step >= index + 1 
//                     ? "bg-[#2c6774] text-white" 
//                     : "bg-[#c0d3dc] text-[#174047]"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-xs md:text-sm font-medium text-[#174047] mt-2">
//                 {s.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
//           <h2 className="text-lg md:text-xl font-semibold text-[#2c6774] text-center mb-4">
//             {steps[step - 1].label} Information
//           </h2>
//           {renderStepContent()}
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
//           <div className={`bg-white rounded-lg p-6 max-w-sm w-full z-10 shadow-xl ${
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

//       {/* Add CSS for react-select */}
//       <style jsx>{`
//         .react-select-container {
//           width: 100%;
//         }
//         .react-select__control {
//           border-color: #c0d3dc !important;
//           background-color: #f8f9fa !important;
//           min-height: 42px;
//         }
//         .react-select__control:hover {
//           border-color: #2c6774 !important;
//         }
//         .react-select__control--is-focused {
//           border-color: #2c6774 !important;
//           box-shadow: 0 0 0 1px #2c6774 !important;
//         }
//         .react-select__menu {
//           z-index: 30 !important;
//           max-height: 300px !important;
//           overflow-y: auto !important;
//         }
//         .react-select__option--is-focused {
//           background-color: #e6f0f3 !important;
//         }
//         .react-select__option--is-selected {
//           background-color: #2c6774 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DoctorRegistration;

















































//---------------Updated UI
// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaUserMd,
//   FaGraduationCap,
//   FaBriefcase,
//   FaFileUpload,
//   FaEye,
//   FaEdit,
//   FaCheckCircle,
//   FaTimesCircle
// } from "react-icons/fa";
// import Select from "react-select";
// import axios from "axios";

// const DoctorRegistration = () => {
//   // Ref for the main container to scroll to top
//   const containerRef = useRef(null);
  
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Personal Information
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: "",
//     dob: "",
//     cnic: "",
//     address: "",
//     city: "",
//     country: "Pakistan",
//     profilePicture: null,

//     // Education Information
//     qualification: "",
//     specialization: "",
//     institute: null,
//     passingYear: "",
//     otherQualification: "",
//     otherSpecialization: "",

//     // Professional Information
//     experienceYears: "",
//     currentHospital: null,
//     designation: "",
//     licenseNumber: "",
    
//     // Documents
//     idCardFront: null,
//     idCardBack: null,
//     doctorLicense: null,
//     mbbsCertificate: null,
//     houseJobCertificate: null,
//     specializationCertificate: null,
//     fcpsCertificate: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("success");
//   const [registrationNumber, setRegistrationNumber] = useState("");

//   // Hardcoded Institutes Data with your provided list
//   const instituteOptions = [
//     { value: "Aga Khan University (Karachi)", label: "Aga Khan University (Karachi)" },
//     { value: "Al-Nafees Medical College (Islamabad)", label: "Al-Nafees Medical College (Islamabad)" },
//     { value: "Allama Iqbal Medical College (Lahore)", label: "Allama Iqbal Medical College (Lahore)" },
//     { value: "Avicenna Medical College (Lahore)", label: "Avicenna Medical College (Lahore)" },
//     { value: "Ayub Medical College (Abbottabad)", label: "Ayub Medical College (Abbottabad)" },
//     { value: "Aziz Fatimah Medical & Dental College (Faisalabad)", label: "Aziz Fatimah Medical & Dental College (Faisalabad)" },
//     { value: "Bahria University Medical & Dental College (Karachi)", label: "Bahria University Medical & Dental College (Karachi)" },
//     { value: "Bakhtawar Amin Medical College (Multan)", label: "Bakhtawar Amin Medical College (Multan)" },
//     { value: "Bolan Medical College (Quetta)", label: "Bolan Medical College (Quetta)" },
//     { value: "Central Park Medical College (Lahore)", label: "Central Park Medical College (Lahore)" },
//     { value: "CMH Lahore Medical College (Lahore)", label: "CMH Lahore Medical College (Lahore)" },
//     { value: "CMH Multan Institute of Medical Sciences (Multan)", label: "CMH Multan Institute of Medical Sciences (Multan)" },
//     { value: "Continental Medical College (Lahore)", label: "Continental Medical College (Lahore)" },
//     { value: "D.G. Khan Medical College (Dera Ghazi Khan)", label: "D.G. Khan Medical College (Dera Ghazi Khan)" },
//     { value: "Dental College HITEC-IMS (Taxila)", label: "Dental College HITEC-IMS (Taxila)" },
//     { value: "Dow International Medical College (Karachi)", label: "Dow International Medical College (Karachi)" },
//     { value: "Dow Medical College (Karachi)", label: "Dow Medical College (Karachi)" },
//     { value: "Faisalabad Medical University (Faisalabad)", label: "Faisalabad Medical University (Faisalabad)" },
//     { value: "Fatima Jinnah Medical University (Lahore)", label: "Fatima Jinnah Medical University (Lahore)" },
//     { value: "Foundation University Medical College (Islamabad)", label: "Foundation University Medical College (Islamabad)" },
//     { value: "Ghulam Muhammad Mahar Medical College (Sukkur)", label: "Ghulam Muhammad Mahar Medical College (Sukkur)" },
//     { value: "Gujranwala Medical College (Gujranwala)", label: "Gujranwala Medical College (Gujranwala)" },
//     { value: "Hamdard College of Medicine & Dentistry (Karachi)", label: "Hamdard College of Medicine & Dentistry (Karachi)" },
//     { value: "Independent Medical College (Faisalabad)", label: "Independent Medical College (Faisalabad)" },
//     { value: "Islamic International Medical College (Rawalpindi)", label: "Islamic International Medical College (Rawalpindi)" },
//     { value: "Islamabad Medical & Dental College (Islamabad)", label: "Islamabad Medical & Dental College (Islamabad)" },
//     { value: "Jinnah Medical & Dental College (Karachi)", label: "Jinnah Medical & Dental College (Karachi)" },
//     { value: "Jinnah Medical College (Peshawar)", label: "Jinnah Medical College (Peshawar)" },
//     { value: "Jinnah Sindh Medical University (Karachi)", label: "Jinnah Sindh Medical University (Karachi)" },
//     { value: "Kabir Medical College (Peshawar)", label: "Kabir Medical College (Peshawar)" },
//     { value: "Khyber Girls Medical College (Peshawar)", label: "Khyber Girls Medical College (Peshawar)" },
//     { value: "Khyber Medical College (Peshawar)", label: "Khyber Medical College (Peshawar)" },
//     { value: "King Edward Medical University (Lahore)", label: "King Edward Medical University (Lahore)" },
//     { value: "Lahore Medical & Dental College (Lahore)", label: "Lahore Medical & Dental College (Lahore)" },
//     { value: "Liaquat College of Medicine & Dentistry (Karachi)", label: "Liaquat College of Medicine & Dentistry (Karachi)" },
//     { value: "Liaquat University of Medical & Health Sciences (Jamshoro)", label: "Liaquat University of Medical & Health Sciences (Jamshoro)" },
//     { value: "Multan Medical & Dental College (Multan)", label: "Multan Medical & Dental College (Multan)" },
//     { value: "Nishtar Medical University (Multan)", label: "Nishtar Medical University (Multan)" },
//     { value: "Northwest School of Medicine (Peshawar)", label: "Northwest School of Medicine (Peshawar)" },
//     { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
//     { value: "Peshawar Medical College (Peshawar)", label: "Peshawar Medical College (Peshawar)" },
//     { value: "Quaid-e-Azam Medical College (Bahawalpur)", label: "Quaid-e-Azam Medical College (Bahawalpur)" },
//     { value: "Rawal Institute of Health Sciences (Islamabad)", label: "Rawal Institute of Health Sciences (Islamabad)" },
//     { value: "Rawalpindi Medical University (Rawalpindi)", label: "Rawalpindi Medical University (Rawalpindi)" },
//     { value: "Rehman Medical College (Peshawar)", label: "Rehman Medical College (Peshawar)" },
//     { value: "Saidu Medical College (Swat)", label: "Saidu Medical College (Swat)" },
//     { value: "Sargodha Medical College (Sargodha)", label: "Sargodha Medical College (Sargodha)" },
//     { value: "Sharif Medical & Dental College (Lahore)", label: "Sharif Medical & Dental College (Lahore)" },
//     { value: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)", label: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)" },
//     { value: "Sheikh Zayed Medical College (Rahim Yar Khan)", label: "Sheikh Zayed Medical College (Rahim Yar Khan)" },
//     { value: "Shifa College of Medicine (Islamabad)", label: "Shifa College of Medicine (Islamabad)" },
//     { value: "Sindh Medical College (Karachi)", label: "Sindh Medical College (Karachi)" },
//     { value: "University Medical & Dental College Faisalabad (Faisalabad)", label: "University Medical & Dental College Faisalabad (Faisalabad)" },
//     { value: "University of Balochistan (Quetta)", label: "University of Balochistan (Quetta)" },
//     { value: "University of Health Sciences (Lahore)", label: "University of Health Sciences (Lahore)" },
//     { value: "Wah Medical College (Wah Cantt)", label: "Wah Medical College (Wah Cantt)" },
//     { value: "Women Medical College (Abbottabad)", label: "Women Medical College (Abbottabad)" },
//     { value: "Ziauddin Medical College (Karachi)", label: "Ziauddin Medical College (Karachi)" },
//     { value: "Boston University School of Medicine (USA)", label: "Boston University School of Medicine (USA)" },
//     { value: "Columbia University Vagelos College of Physicians and Surgeons (USA)", label: "Columbia University Vagelos College of Physicians and Surgeons (USA)" },
//     { value: "Duke University School of Medicine (USA)", label: "Duke University School of Medicine (USA)" },
//     { value: "Harvard Medical School (USA)", label: "Harvard Medical School (USA)" },
//     { value: "Imperial College London Faculty of Medicine (UK)", label: "Imperial College London Faculty of Medicine (UK)" },
//     { value: "Johns Hopkins University School of Medicine (USA)", label: "Johns Hopkins University School of Medicine (USA)" },
//     { value: "Karolinska Institute (Sweden)", label: "Karolinska Institute (Sweden)" },
//     { value: "King's College London GKT School of Medical Education (UK)", label: "King's College London GKT School of Medical Education (UK)" },
//     { value: "McGill University Faculty of Medicine (Canada)", label: "McGill University Faculty of Medicine (Canada)" },
//     { value: "Monash University Faculty of Medicine (Australia)", label: "Monash University Faculty of Medicine (Australia)" },
//     { value: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)", label: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)" },
//     { value: "New York University Grossman School of Medicine (USA)", label: "New York University Grossman School of Medicine (USA)" },
//     { value: "Northwestern University Feinberg School of Medicine (USA)", label: "Northwestern University Feinberg School of Medicine (USA)" },
//     { value: "Stanford University School of Medicine (USA)", label: "Stanford University School of Medicine (USA)" },
//     { value: "Trinity College Dublin School of Medicine (Ireland)", label: "Trinity College Dublin School of Medicine (Ireland)" },
//     { value: "University College London Medical School (UK)", label: "University College London Medical School (UK)" },
//     { value: "University of California, San Francisco School of Medicine (USA)", label: "University of California, San Francisco School of Medicine (USA)" },
//     { value: "University of Cambridge School of Clinical Medicine (UK)", label: "University of Cambridge School of Clinical Medicine (UK)" },
//     { value: "University of Edinburgh Medical School (UK)", label: "University of Edinburgh Medical School (UK)" },
//     { value: "University of Melbourne Medical School (Australia)", label: "University of Melbourne Medical School (Australia)" },
//     { value: "University of Michigan Medical School (USA)", label: "University of Michigan Medical School (USA)" },
//     { value: "University of Oxford Medical Sciences Division (UK)", label: "University of Oxford Medical Sciences Division (UK)" },
//     { value: "University of Pennsylvania Perelman School of Medicine (USA)", label: "University of Pennsylvania Perelman School of Medicine (USA)" },
//     { value: "University of Sydney School of Medicine (Australia)", label: "University of Sydney School of Medicine (Australia)" },
//     { value: "University of Toronto Temerty Faculty of Medicine (Canada)", label: "University of Toronto Temerty Faculty of Medicine (Canada)" },
//     { value: "University of Washington School of Medicine (USA)", label: "University of Washington School of Medicine (USA)" },
//     { value: "Washington University in St. Louis School of Medicine (USA)", label: "Washington University in St. Louis School of Medicine (USA)" },
//     { value: "Yale School of Medicine (USA)", label: "Yale School of Medicine (USA)" }
//   ];

//   // Hardcoded Hospitals Data with your provided list
//   const hospitalOptions = [
//     // Government Hospitals
//     { value: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)", label: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)" },
//     { value: "Abbasi Shaheed Hospital (ASH) (Karachi)", label: "Abbasi Shaheed Hospital (ASH) (Karachi)" },
//     { value: "Allied Hospital (AH) (Faisalabad)", label: "Allied Hospital (AH) (Faisalabad)" },
//     { value: "Ayub Teaching Hospital (ATH) (Abbottabad)", label: "Ayub Teaching Hospital (ATH) (Abbottabad)" },
//     { value: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)", label: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)" },
//     { value: "Bahawal Victoria Hospital (BVH) (Bahawalpur)", label: "Bahawal Victoria Hospital (BVH) (Bahawalpur)" },
//     { value: "Benazir Bhutto Hospital (BBH) (Rawalpindi)", label: "Benazir Bhutto Hospital (BBH) (Rawalpindi)" },
//     { value: "Bolan Medical Complex Hospital (BMCH) (Quetta)", label: "Bolan Medical Complex Hospital (BMCH) (Quetta)" },
//     { value: "Civil Hospital Karachi (CHK) (Karachi)", label: "Civil Hospital Karachi (CHK) (Karachi)" },
//     { value: "Civil Hospital, Larkana (CHL) (Larkana)", label: "Civil Hospital, Larkana (CHL) (Larkana)" },
//     { value: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)", label: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)" },
//     { value: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)", label: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)" },
//     { value: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)", label: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)" },
//     { value: "DHQ Hospital Gilgit (DHQ) (Gilgit)", label: "DHQ Hospital Gilgit (DHQ) (Gilgit)" },
//     { value: "District Headquarter Hospital Battagram (DHQ) (Battagram)", label: "District Headquarter Hospital Battagram (DHQ) (Battagram)" },
//     { value: "Gambat Institute of Medical Sciences (GIMS) (Gambat)", label: "Gambat Institute of Medical Sciences (GIMS) (Gambat)" },
//     { value: "Hayatabad Medical Complex (HMC) (Peshawar)", label: "Hayatabad Medical Complex (HMC) (Peshawar)" },
//     { value: "Holy Family Hospital (HFH) (Rawalpindi)", label: "Holy Family Hospital (HFH) (Rawalpindi)" },
//     { value: "Institute of Infection Diseases (IID) (Karachi)", label: "Institute of Infection Diseases (IID) (Karachi)" },
//     { value: "Jinnah Hospital Lahore (JHL) (Lahore)", label: "Jinnah Hospital Lahore (JHL) (Lahore)" },
//     { value: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)", label: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)" },
//     { value: "Khyber Teaching Hospital (KTH) (Peshawar)", label: "Khyber Teaching Hospital (KTH) (Peshawar)" },
//     { value: "Lady Reading Hospital (LRH) (Peshawar)", label: "Lady Reading Hospital (LRH) (Peshawar)" },
//     { value: "Lahore General Hospital (LGH) (Lahore)", label: "Lahore General Hospital (LGH) (Lahore)" },
//     { value: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)", label: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)" },
//     { value: "Mayo Hospital (MH) (Lahore)", label: "Mayo Hospital (MH) (Lahore)" },
//     { value: "Mian Muhammad Trust Hospital (MMT) (Lahore)", label: "Mian Muhammad Trust Hospital (MMT) (Lahore)" },
//     { value: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)", label: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)" },
//     { value: "Multan Institute of Cardiology (MIC) (Multan)", label: "Multan Institute of Cardiology (MIC) (Multan)" },
//     { value: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)", label: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)" },
//     { value: "National Institute of Child Health (NICH) (Karachi)", label: "National Institute of Child Health (NICH) (Karachi)" },
//     { value: "National Police Hospital (NPH) (Islamabad)", label: "National Police Hospital (NPH) (Islamabad)" },
//     { value: "Nishtar Hospital (NH) (Multan)", label: "Nishtar Hospital (NH) (Multan)" },
//     { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
//     { value: "Punjab Institute of Cardiology (PIC) (Lahore)", label: "Punjab Institute of Cardiology (PIC) (Lahore)" },
//     { value: "Punjab Social Security Hospital (PSSH) (Lahore)", label: "Punjab Social Security Hospital (PSSH) (Lahore)" },
//     { value: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)", label: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)" },
//     { value: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)", label: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)" },
//     { value: "Saidu Teaching Hospital (STH) (Saidu Sharif)", label: "Saidu Teaching Hospital (STH) (Saidu Sharif)" },
//     { value: "Services Hospital (SHL) (Lahore)", label: "Services Hospital (SHL) (Lahore)" },
//     { value: "Shaikh Zayed Hospital (SZH) (Lahore)", label: "Shaikh Zayed Hospital (SZH) (Lahore)" },
//     { value: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)", label: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)" },
//     { value: "Social Security Hospital (SSH) (Lahore)", label: "Social Security Hospital (SSH) (Lahore)" },
//     { value: "The Children's Hospital Lahore (CHL) (Lahore)", label: "The Children's Hospital Lahore (CHL) (Lahore)" },
    
//     // Private Hospitals
//     { value: "Aga Khan University Hospital (AKUH) (Karachi)", label: "Aga Khan University Hospital (AKUH) (Karachi)" },
//     { value: "Al Falah International Hospital (AFIH) (Abbottabad)", label: "Al Falah International Hospital (AFIH) (Abbottabad)" },
//     { value: "Al Khidmat Hospital (AKH) (Peshawar)", label: "Al Khidmat Hospital (AKH) (Peshawar)" },
//     { value: "Chiniot General Hospital (CGH) (Karachi)", label: "Chiniot General Hospital (CGH) (Karachi)" },
//     { value: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)", label: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)" },
//     { value: "Doctors Hospital (DHL) (Lahore)", label: "Doctors Hospital (DHL) (Lahore)" },
//     { value: "Farooq Hospital (FH) (Lahore)", label: "Farooq Hospital (FH) (Lahore)" },
//     { value: "Fatima Memorial Hospital (FMH) (Lahore)", label: "Fatima Memorial Hospital (FMH) (Lahore)" },
//     { value: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)", label: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)" },
//     { value: "Hameed Latif Hospital (HLH) (Lahore)", label: "Hameed Latif Hospital (HLH) (Lahore)" },
//     { value: "Indus Hospital (TIH) (Karachi)", label: "Indus Hospital (TIH) (Karachi)" },
//     { value: "Irfan General Hospital (IGH) (Peshawar)", label: "Irfan General Hospital (IGH) (Peshawar)" },
//     { value: "Ittefaq Hospital (IH) (Lahore)", label: "Ittefaq Hospital (IH) (Lahore)" },
//     { value: "Jinnah Teaching Hospital (JTH) (Peshawar)", label: "Jinnah Teaching Hospital (JTH) (Peshawar)" },
//     { value: "Kuwait Teaching Hospital (KTH) (Peshawar)", label: "Kuwait Teaching Hospital (KTH) (Peshawar)" },
//     { value: "Liaquat National Hospital (LNH) (Karachi)", label: "Liaquat National Hospital (LNH) (Karachi)" },
//     { value: "Mid City Hospital (MCH) (Lahore)", label: "Mid City Hospital (MCH) (Lahore)" },
//     { value: "National Hospital & Medical Center (NHMC) (Lahore)", label: "National Hospital & Medical Center (NHMC) (Lahore)" },
//     { value: "National Medical Center (NMC) (Karachi)", label: "National Medical Center (NMC) (Karachi)" },
//     { value: "Northwest General Hospital (NWGH) (Peshawar)", label: "Northwest General Hospital (NWGH) (Peshawar)" },
//     { value: "Omar Hospital (OH) (Lahore)", label: "Omar Hospital (OH) (Lahore)" },
//     { value: "PIMS Hospital (PIMSH) (Peshawar)", label: "PIMS Hospital (PIMSH) (Peshawar)" },
//     { value: "Prime Care Hospital (PCH) (Lahore)", label: "Prime Care Hospital (PCH) (Lahore)" },
//     { value: "Prime Teaching Hospital (PTH) (Peshawar)", label: "Prime Teaching Hospital (PTH) (Peshawar)" },
//     { value: "Quaid-e-Azam International Hospital (QIH) (Islamabad)", label: "Quaid-e-Azam International Hospital (QIH) (Islamabad)" },
//     { value: "Rehman Medical Institute (RMI) (Peshawar)", label: "Rehman Medical Institute (RMI) (Peshawar)" },
//     { value: "Saifee Hospital (SHK) (Karachi)", label: "Saifee Hospital (SHK) (Karachi)" },
//     { value: "Shafa International Hospital (SIH) (Islamabad)", label: "Shafa International Hospital (SIH) (Islamabad)" },
//     { value: "Shalamar Hospital (SHL) (Lahore)", label: "Shalamar Hospital (SHL) (Lahore)" },
//     { value: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)", label: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)" },
//     { value: "Shifa International Hospital (SIH) (Islamabad)", label: "Shifa International Hospital (SIH) (Islamabad)" },
//     { value: "South City Hospital (SCH) (Karachi)", label: "South City Hospital (SCH) (Karachi)" },
//     { value: "Surgimed Hospital (SHL) (Lahore)", label: "Surgimed Hospital (SHL) (Lahore)" },
//     { value: "United Christian Hospital (UCH) (Lahore)", label: "United Christian Hospital (UCH) (Lahore)" },
    
//     // International Hospitals
//     { value: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)", label: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)" },
//     { value: "Massachusetts General Hospital (USA)", label: "Massachusetts General Hospital (USA)" },
//     { value: "Singapore General Hospital (Singapore)", label: "Singapore General Hospital (Singapore)" }
//   ];

//   // Qualification Options
//   const qualificationOptions = [
//     { value: "MBBS", label: "MBBS" },
//     { value: "MD", label: "MD" },
//     { value: "FCPS", label: "FCPS" },
//     { value: "FRCS", label: "FRCS" },
//     { value: "MRCP", label: "MRCP" },
//     { value: "PhD", label: "PhD" },
//     { value: "Other", label: "Other" }
//   ];

//   // Specialization Options
//   const specializationOptions = [
//     { value: "Cardiologist", label: "Cardiologist" },
//     { value: "Dermatologist", label: "Dermatologist" },
//     { value: "Neurologist", label: "Neurologist" },
//     { value: "Pediatrician", label: "Pediatrician" },
//     { value: "Psychiatrist", label: "Psychiatrist" },
//     { value: "General Physician", label: "General Physician" },
//     { value: "Gynecologist", label: "Gynecologist" },
//     { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
//     { value: "Ophthalmologist", label: "Ophthalmologist" },
//     { value: "ENT Specialist", label: "ENT Specialist" },
//     { value: "Other", label: "Other" }
//   ];

//   const steps = [
//     { icon: <FaUserMd />, label: "Personal" },
//     { icon: <FaGraduationCap />, label: "Education" },
//     { icon: <FaBriefcase />, label: "Professional" },
//     { icon: <FaFileUpload />, label: "Documents" },
//     { icon: <FaEye />, label: "Review" },
//   ];

//   // Scroll to top on step change
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
    
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0;
//     }
//   }, [step]);

//   const handleChange = (e) => {
//     const { name, value, files, type } = e.target;

//     if (type === "file") {
//       const file = files[0];
//       if (file && !file.type.startsWith('image/') && name !== 'doctorLicense' && name !== 'mbbsCertificate') {
//         setErrors({ ...errors, [name]: "Only image files are allowed" });
//         return;
//       }
      
//       setFormData({
//         ...formData,
//         [name]: file
//       });
      
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: null });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
      
//       if (errors[name]) {
//         setErrors({ ...errors, [name]: null });
//       }
//     }
//   };

//   const handleSelectChange = (selectedOption, fieldName) => {
//     setFormData({
//       ...formData,
//       [fieldName]: selectedOption
//     });
    
//     if (errors[fieldName]) {
//       setErrors({ ...errors, [fieldName]: null });
//     }
//   };

//   // Format license number
//   const handleLicenseChange = (e) => {
//     let value = e.target.value.toUpperCase().replace(/\s/g, '');
//     value = value.replace(/[^0-9A-Z-]/g, '');
    
//     const match = value.match(/^(\d{1,6})-?([A-Z]?)$/);
//     if (match) {
//       const numbers = match[1];
//       const suffix = match[2];
//       if (suffix) {
//         value = `${numbers}-${suffix}`;
//       } else {
//         value = numbers;
//       }
//     }
    
//     setFormData({
//       ...formData,
//       licenseNumber: value
//     });
//   };

//   // Strong email validation function
//   const validateEmail = (email) => {
//     // Comprehensive email regex that covers most common domains and formats
//     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    
//     // List of common valid domains (for additional validation if needed)
//     const validDomains = [
//       'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
//       'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com',
//       'protonmail.com', 'proton.me', 'zoho.com', 'yandex.com', 'mail.com',
//       'gmx.com', 'tutanota.com', 'fastmail.com', 'hushmail.com',
//       // Educational institutions
//       'edu.pk', 'edu', 'ac.uk', 'edu.au', 'edu.sg', 'edu.my',
//       // Professional emails
//       'doctor.com', 'healthcare.com', 'medical.com', 'hospital.com',
//       'clinic.com', 'pmdc.pk', 'pmc.gov.pk', 'cpsp.edu.pk',
//       // Country specific
//       'com.pk', 'org.pk', 'net.pk', 'gov.pk',
//       // International
//       'co.uk', 'org.uk', 'gov.uk', 'ac.uk', 'nhs.uk',
//       'co.in', 'ac.in', 'edu.in',
//       'edu.sa', 'edu.ae', 'edu.om', 'edu.qa', 'edu.kw',
//       'edu.tr', 'edu.eg', 'edu.jo', 'edu.lb',
//       'edu.cn', 'edu.hk', 'edu.jp', 'edu.kr', 'edu.sg',
//       'edu.au', 'edu.nz', 'edu.ca', 'edu.za'
//     ];
    
//     // First check basic regex pattern
//     if (!emailRegex.test(email)) {
//       return false;
//     }
    
//     // Extract domain
//     const domain = email.split('@')[1].toLowerCase();
    
//     // Check if domain has at least one dot and valid TLD
//     const domainParts = domain.split('.');
//     if (domainParts.length < 2) {
//       return false;
//     }
    
//     // Check TLD length (should be at least 2 characters)
//     const tld = domainParts[domainParts.length - 1];
//     if (tld.length < 2 || tld.length > 6) {
//       return false;
//     }
    
//     // Additional check: domain should not have consecutive dots
//     if (domain.includes('..')) {
//       return false;
//     }
    
//     return true;
//   };

//   const validateStep = () => {
//     let newErrors = {};

//     if (step === 1) {
//       if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
      
//       // Strong email validation
//       if (!formData.email?.trim()) {
//         newErrors.email = "Email is required";
//       } else if (!validateEmail(formData.email)) {
//         newErrors.email = "Please enter a valid email address (e.g., name@domain.com)";
//       }
      
//       if (!formData.phone?.trim()) newErrors.phone = "Phone number required";
//       else if (!/^[0-9]{11}$/.test(formData.phone))
//         newErrors.phone = "Phone number must be 11 digits";
//       if (!formData.gender) newErrors.gender = "Gender required";
//       if (!formData.dob) newErrors.dob = "Date of birth required";
//       if (!formData.cnic?.trim()) newErrors.cnic = "CNIC required";
//       else if (!/^[0-9]{13}$/.test(formData.cnic))
//         newErrors.cnic = "CNIC must be 13 digits";
//       if (!formData.address?.trim()) newErrors.address = "Address required";
//       if (!formData.city?.trim()) newErrors.city = "City required";
//       if (!formData.country?.trim()) newErrors.country = "Country required";
//       if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required";
//     } 
//     else if (step === 2) {
//       if (!formData.qualification) newErrors.qualification = "Qualification required";
//       if (formData.qualification?.value === "Other" && !formData.otherQualification?.trim()) {
//         newErrors.otherQualification = "Please specify your qualification";
//       }
//       if (!formData.specialization) newErrors.specialization = "Specialization required";
//       if (formData.specialization?.value === "Other" && !formData.otherSpecialization?.trim()) {
//         newErrors.otherSpecialization = "Please specify your specialization";
//       }
//       if (!formData.institute) newErrors.institute = "Institute required";
//       if (!formData.passingYear) newErrors.passingYear = "Passing year required";
//     } 
//     else if (step === 3) {
//       if (!formData.experienceYears?.trim())
//         newErrors.experienceYears = "Experience required";
//       if (!formData.currentHospital)
//         newErrors.currentHospital = "Current hospital required";
//       if (!formData.designation?.trim())
//         newErrors.designation = "Designation required";
//       if (!formData.licenseNumber?.trim())
//         newErrors.licenseNumber = "License number required";
//     } 
//     else if (step === 4) {
//       if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
//       if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
//       if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license required";
//       if (!formData.mbbsCertificate) newErrors.mbbsCertificate = "MBBS certificate required";
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

//   const showNotificationModal = (message, type = "success") => {
//     setModalMessage(message);
//     setModalType(type);
//     setShowModal(true);
    
//     setTimeout(() => {
//       setShowModal(false);
//     }, 3000);
//   };

//   const handleSubmit = async () => {
//     if (!validateStep()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");

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
//       formDataToSend.append('qualification', formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.value);
//       formDataToSend.append('specialization', formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.value);
//       formDataToSend.append('institute', formData.institute?.value || formData.institute);
//       formDataToSend.append('passingYear', formData.passingYear);
      
//       // Professional Information
//       formDataToSend.append('experienceYears', formData.experienceYears);
//       formDataToSend.append('currentHospital', formData.currentHospital?.value || formData.currentHospital);
//       formDataToSend.append('designation', formData.designation);
//       formDataToSend.append('licenseNumber', formData.licenseNumber);
      
//       // Documents
//       if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
//       if (formData.idCardFront) formDataToSend.append('idCardFront', formData.idCardFront);
//       if (formData.idCardBack) formDataToSend.append('idCardBack', formData.idCardBack);
//       if (formData.doctorLicense) formDataToSend.append('doctorLicense', formData.doctorLicense);
//       if (formData.mbbsCertificate) formDataToSend.append('mbbsCertificate', formData.mbbsCertificate);
//       if (formData.houseJobCertificate) formDataToSend.append('houseJobCertificate', formData.houseJobCertificate);
//       if (formData.specializationCertificate) formDataToSend.append('specializationCertificate', formData.specializationCertificate);
//       if (formData.fcpsCertificate) formDataToSend.append('fcpsCertificate', formData.fcpsCertificate);

//       const response = await axios.post('http://localhost:5000/api/doctor-registration/register', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.data.success) {
//         setSubmitSuccess(true);
//         setRegistrationNumber(response.data.data.registrationNumber);
//         showNotificationModal(`✅ ${response.data.message}`, "success");
        
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
//           country: "Pakistan",
//           profilePicture: null,
//           qualification: "",
//           specialization: "",
//           institute: null,
//           passingYear: "",
//           otherQualification: "",
//           otherSpecialization: "",
//           experienceYears: "",
//           currentHospital: null,
//           designation: "",
//           licenseNumber: "",
//           idCardFront: null,
//           idCardBack: null,
//           doctorLicense: null,
//           mbbsCertificate: null,
//           houseJobCertificate: null,
//           specializationCertificate: null,
//           fcpsCertificate: null,
//         });
//         setStep(1);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
//       setSubmitError(errorMessage);
//       showNotificationModal(`❌ ${errorMessage}`, "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Review Section Component (same as before)
//   const ReviewSection = () => (
//     <div className="space-y-6">
//       {submitSuccess && (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
//           <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
//           <h3 className="text-xl font-bold text-green-700 mb-2">Registration Successful!</h3>
//           <p className="text-gray-600 mb-3">Your registration number is:</p>
//           <p className="text-2xl font-mono font-bold text-[#2c6774] bg-white p-3 rounded-lg border border-green-200">
//             {registrationNumber}
//           </p>
//           <p className="text-sm text-gray-500 mt-3">Please save this number for future reference</p>
//         </div>
//       )}

//       {submitError && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <div className="flex items-center text-red-800">
//             <FaTimesCircle className="text-red-500 mr-2" />
//             <span className="font-medium">Error: {submitError}</span>
//           </div>
//         </div>
//       )}

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Personal Information</h3>
//           <button 
//             onClick={() => handleEditStep(1)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
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
//           <ReviewItem label="Profile Picture" value={formData.profilePicture?.name || "Uploaded"} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Education Information</h3>
//           <button 
//             onClick={() => handleEditStep(2)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Qualification" value={formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.label} />
//           <ReviewItem label="Specialization" value={formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.label} />
//           <ReviewItem label="Institute" value={formData.institute?.label || formData.institute} />
//           <ReviewItem label="Passing Year" value={formData.passingYear} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Professional Information</h3>
//           <button 
//             onClick={() => handleEditStep(3)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <ReviewItem label="Experience" value={formData.experienceYears} />
//           <ReviewItem label="Current Hospital" value={formData.currentHospital?.label || formData.currentHospital} />
//           <ReviewItem label="Designation" value={formData.designation} />
//           <ReviewItem label="License Number" value={formData.licenseNumber} />
//         </div>
//       </div>

//       <div className="border border-[#c0d3dc] rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-[#174047] text-lg">Documents Uploaded</h3>
//           <button 
//             onClick={() => handleEditStep(4)}
//             className="flex items-center text-sm text-[#2c6774] hover:text-[#1e4e56]"
//           >
//             <FaEdit className="mr-1 h-3 w-3" /> Edit
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <DocumentStatus label="ID Card Front" file={formData.idCardFront} />
//             <DocumentStatus label="ID Card Back" file={formData.idCardBack} />
//             <DocumentStatus label="Doctor License" file={formData.doctorLicense} />
//             <DocumentStatus label="MBBS Degree" file={formData.mbbsCertificate} />
//             <DocumentStatus label="House Job" file={formData.houseJobCertificate} />
//             <DocumentStatus label="Specialization" file={formData.specializationCertificate} />
//             <DocumentStatus label="FCPS" file={formData.fcpsCertificate} />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//         <button 
//           type="button" 
//           className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto order-2 sm:order-1"
//           onClick={handlePrevious}
//         >
//           ← Previous
//         </button>
//         <button
//           type="button"
//           className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
//           onClick={handleSubmit}
//           disabled={isSubmitting || submitSuccess}
//         >
//           {isSubmitting ? (
//             <>
//               <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
//               Submitting...
//             </>
//           ) : submitSuccess ? (
//             'Already Submitted'
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

//   const DocumentStatus = ({ label, file }) => (
//     <div className={`px-3 py-1 rounded text-xs font-medium ${file ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//       {label}: {file ? "✓ Uploaded" : "—"}
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//                   placeholder="Enter your email"
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
//                   placeholder="03001234567"
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
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
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
//                 <label className="font-medium text-[#174047] mb-1">CNIC Number *</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="1234512345678"
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
//                   placeholder="Street address, area"
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
//                   name="profilePicture" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG (max 5MB)</p>
//                 {errors.profilePicture && <span className="text-red-500 text-sm mt-1">{errors.profilePicture}</span>}
//               </div>
//             </div>

//             <div className="flex justify-end mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Qualification *</label>
//                 <Select
//                   options={qualificationOptions}
//                   value={formData.qualification}
//                   onChange={(option) => handleSelectChange(option, 'qualification')}
//                   placeholder="Select qualification..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                 />
//                 {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
//               </div>

//               {formData.qualification?.value === "Other" && (
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
//                 <Select
//                   options={specializationOptions}
//                   value={formData.specialization}
//                   onChange={(option) => handleSelectChange(option, 'specialization')}
//                   placeholder="Select specialization..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                 />
//                 {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
//               </div>

//               {formData.specialization?.value === "Other" && (
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

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Institute/University *</label>
//                 <Select
//                   options={instituteOptions}
//                   value={formData.institute}
//                   onChange={(option) => handleSelectChange(option, 'institute')}
//                   placeholder="Search institute..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                   styles={{
//                     menu: (provided) => ({
//                       ...provided,
//                       maxHeight: '300px',
//                       overflowY: 'auto'
//                     })
//                   }}
//                 />
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

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handleNext}
//               >
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Current Hospital *</label>
//                 <Select
//                   options={hospitalOptions}
//                   value={formData.currentHospital}
//                   onChange={(option) => handleSelectChange(option, 'currentHospital')}
//                   placeholder="Search hospital..."
//                   isSearchable={true}
//                   className="react-select-container"
//                   classNamePrefix="react-select"
//                   styles={{
//                     menu: (provided) => ({
//                       ...provided,
//                       maxHeight: '300px',
//                       overflowY: 'auto'
//                     })
//                   }}
//                 />
//                 {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Designation *</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   placeholder="e.g., Senior Registrar"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                 />
//                 {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">License Number (PM&DC) *</label>
//                 <input
//                   type="text"
//                   name="licenseNumber"
//                   placeholder="e.g., 75188 or 81910-P"
//                   value={formData.licenseNumber}
//                   onChange={handleLicenseChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   maxLength="7"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: 4-6 digits (optional: -P, -S)</p>
//                 {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
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
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Front *</label>
//                 <input 
//                   type="file" 
//                   name="idCardFront" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Front side of your CNIC</p>
//                 {errors.idCardFront && <span className="text-red-500 text-sm mt-1">{errors.idCardFront}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">ID Card Back *</label>
//                 <input 
//                   type="file" 
//                   name="idCardBack" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Back side of your CNIC</p>
//                 {errors.idCardBack && <span className="text-red-500 text-sm mt-1">{errors.idCardBack}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Doctor License *</label>
//                 <input 
//                   type="file" 
//                   name="doctorLicense" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">PM&DC License (Image or PDF)</p>
//                 {errors.doctorLicense && <span className="text-red-500 text-sm mt-1">{errors.doctorLicense}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">MBBS Degree *</label>
//                 <input 
//                   type="file" 
//                   name="mbbsCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">MBBS degree certificate</p>
//                 {errors.mbbsCertificate && <span className="text-red-500 text-sm mt-1">{errors.mbbsCertificate}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">House Job Certificate</label>
//                 <input 
//                   type="file" 
//                   name="houseJobCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Optional</p>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">Specialization Certificate</label>
//                 <input 
//                   type="file" 
//                   name="specializationCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Optional</p>
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-[#174047] mb-1">FCPS Certificate</label>
//                 <input 
//                   type="file" 
//                   name="fcpsCertificate" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//                   accept="image/*,.pdf"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Optional</p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
//               <button 
//                 type="button" 
//                 className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
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
//     <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 md:p-6 lg:p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Doctor Registration</h1>
//           <p className="text-sm md:text-base text-[#174047]">Complete all steps to register</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="flex justify-between items-start relative mb-8 px-2">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center relative z-10 flex-1">
//               <div
//                 className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   step >= index + 1 
//                     ? "bg-[#2c6774] text-white scale-110" 
//                     : "bg-[#c0d3dc] text-[#174047]"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-xs md:text-sm font-medium text-[#174047] mt-2 text-center">
//                 {s.label}
//               </p>
              
//               {/* Connector line */}
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-1 transition-colors duration-300 ${
//                     step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
//                   }`}
//                   style={{ top: '20px' }}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
//           <h2 className="text-lg md:text-xl font-semibold text-[#2c6774] text-center mb-4">
//             {steps[step - 1].label} Information
//           </h2>
//           {renderStepContent()}
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
//           <div className={`bg-white rounded-lg p-6 max-w-sm w-full z-10 shadow-xl ${
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

//       {/* Add CSS for react-select */}
//       <style jsx>{`
//         .react-select-container {
//           width: 100%;
//         }
//         .react-select__control {
//           border-color: #c0d3dc !important;
//           background-color: #f8f9fa !important;
//           min-height: 42px;
//         }
//         .react-select__control:hover {
//           border-color: #2c6774 !important;
//         }
//         .react-select__control--is-focused {
//           border-color: #2c6774 !important;
//           box-shadow: 0 0 0 1px #2c6774 !important;
//         }
//         .react-select__menu {
//           z-index: 30 !important;
//           max-height: 300px !important;
//           overflow-y: auto !important;
//         }
//         .react-select__option--is-focused {
//           background-color: #e6f0f3 !important;
//         }
//         .react-select__option--is-selected {
//           background-color: #2c6774 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DoctorRegistration;


























//.......................modal update
import React, { useState, useEffect, useRef } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaBriefcase,
  FaFileUpload,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import Select from "react-select";
import axios from "axios";

const DoctorRegistration = () => {
  // Ref for the main container to scroll to top
  const containerRef = useRef(null);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    cnic: "",
    address: "",
    city: "",
    country: "Pakistan",
    profilePicture: null,

    // Education Information
    qualification: "",
    specialization: "",
    institute: null,
    passingYear: "",
    otherQualification: "",
    otherSpecialization: "",

    // Professional Information
    experienceYears: "",
    currentHospital: null,
    designation: "",
    licenseNumber: "",
    
    // Documents
    idCardFront: null,
    idCardBack: null,
    doctorLicense: null,
    mbbsCertificate: null,
    houseJobCertificate: null,
    specializationCertificate: null,
    fcpsCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [registrationNumber, setRegistrationNumber] = useState("");

  // Hardcoded Institutes Data with your provided list
  const instituteOptions = [
    { value: "Aga Khan University (Karachi)", label: "Aga Khan University (Karachi)" },
    { value: "Al-Nafees Medical College (Islamabad)", label: "Al-Nafees Medical College (Islamabad)" },
    { value: "Allama Iqbal Medical College (Lahore)", label: "Allama Iqbal Medical College (Lahore)" },
    { value: "Avicenna Medical College (Lahore)", label: "Avicenna Medical College (Lahore)" },
    { value: "Ayub Medical College (Abbottabad)", label: "Ayub Medical College (Abbottabad)" },
    { value: "Aziz Fatimah Medical & Dental College (Faisalabad)", label: "Aziz Fatimah Medical & Dental College (Faisalabad)" },
    { value: "Bahria University Medical & Dental College (Karachi)", label: "Bahria University Medical & Dental College (Karachi)" },
    { value: "Bakhtawar Amin Medical College (Multan)", label: "Bakhtawar Amin Medical College (Multan)" },
    { value: "Bolan Medical College (Quetta)", label: "Bolan Medical College (Quetta)" },
    { value: "Central Park Medical College (Lahore)", label: "Central Park Medical College (Lahore)" },
    { value: "CMH Lahore Medical College (Lahore)", label: "CMH Lahore Medical College (Lahore)" },
    { value: "CMH Multan Institute of Medical Sciences (Multan)", label: "CMH Multan Institute of Medical Sciences (Multan)" },
    { value: "Continental Medical College (Lahore)", label: "Continental Medical College (Lahore)" },
    { value: "D.G. Khan Medical College (Dera Ghazi Khan)", label: "D.G. Khan Medical College (Dera Ghazi Khan)" },
    { value: "Dental College HITEC-IMS (Taxila)", label: "Dental College HITEC-IMS (Taxila)" },
    { value: "Dow International Medical College (Karachi)", label: "Dow International Medical College (Karachi)" },
    { value: "Dow Medical College (Karachi)", label: "Dow Medical College (Karachi)" },
    { value: "Faisalabad Medical University (Faisalabad)", label: "Faisalabad Medical University (Faisalabad)" },
    { value: "Fatima Jinnah Medical University (Lahore)", label: "Fatima Jinnah Medical University (Lahore)" },
    { value: "Foundation University Medical College (Islamabad)", label: "Foundation University Medical College (Islamabad)" },
    { value: "Ghulam Muhammad Mahar Medical College (Sukkur)", label: "Ghulam Muhammad Mahar Medical College (Sukkur)" },
    { value: "Gujranwala Medical College (Gujranwala)", label: "Gujranwala Medical College (Gujranwala)" },
    { value: "Hamdard College of Medicine & Dentistry (Karachi)", label: "Hamdard College of Medicine & Dentistry (Karachi)" },
    { value: "Independent Medical College (Faisalabad)", label: "Independent Medical College (Faisalabad)" },
    { value: "Islamic International Medical College (Rawalpindi)", label: "Islamic International Medical College (Rawalpindi)" },
    { value: "Islamabad Medical & Dental College (Islamabad)", label: "Islamabad Medical & Dental College (Islamabad)" },
    { value: "Jinnah Medical & Dental College (Karachi)", label: "Jinnah Medical & Dental College (Karachi)" },
    { value: "Jinnah Medical College (Peshawar)", label: "Jinnah Medical College (Peshawar)" },
    { value: "Jinnah Sindh Medical University (Karachi)", label: "Jinnah Sindh Medical University (Karachi)" },
    { value: "Kabir Medical College (Peshawar)", label: "Kabir Medical College (Peshawar)" },
    { value: "Khyber Girls Medical College (Peshawar)", label: "Khyber Girls Medical College (Peshawar)" },
    { value: "Khyber Medical College (Peshawar)", label: "Khyber Medical College (Peshawar)" },
    { value: "King Edward Medical University (Lahore)", label: "King Edward Medical University (Lahore)" },
    { value: "Lahore Medical & Dental College (Lahore)", label: "Lahore Medical & Dental College (Lahore)" },
    { value: "Liaquat College of Medicine & Dentistry (Karachi)", label: "Liaquat College of Medicine & Dentistry (Karachi)" },
    { value: "Liaquat University of Medical & Health Sciences (Jamshoro)", label: "Liaquat University of Medical & Health Sciences (Jamshoro)" },
    { value: "Multan Medical & Dental College (Multan)", label: "Multan Medical & Dental College (Multan)" },
    { value: "Nishtar Medical University (Multan)", label: "Nishtar Medical University (Multan)" },
    { value: "Northwest School of Medicine (Peshawar)", label: "Northwest School of Medicine (Peshawar)" },
    { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
    { value: "Peshawar Medical College (Peshawar)", label: "Peshawar Medical College (Peshawar)" },
    { value: "Quaid-e-Azam Medical College (Bahawalpur)", label: "Quaid-e-Azam Medical College (Bahawalpur)" },
    { value: "Rawal Institute of Health Sciences (Islamabad)", label: "Rawal Institute of Health Sciences (Islamabad)" },
    { value: "Rawalpindi Medical University (Rawalpindi)", label: "Rawalpindi Medical University (Rawalpindi)" },
    { value: "Rehman Medical College (Peshawar)", label: "Rehman Medical College (Peshawar)" },
    { value: "Saidu Medical College (Swat)", label: "Saidu Medical College (Swat)" },
    { value: "Sargodha Medical College (Sargodha)", label: "Sargodha Medical College (Sargodha)" },
    { value: "Sharif Medical & Dental College (Lahore)", label: "Sharif Medical & Dental College (Lahore)" },
    { value: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)", label: "Sheikh Khalifa Bin Zayed Al-Nahyan Medical College (Lahore)" },
    { value: "Sheikh Zayed Medical College (Rahim Yar Khan)", label: "Sheikh Zayed Medical College (Rahim Yar Khan)" },
    { value: "Shifa College of Medicine (Islamabad)", label: "Shifa College of Medicine (Islamabad)" },
    { value: "Sindh Medical College (Karachi)", label: "Sindh Medical College (Karachi)" },
    { value: "University Medical & Dental College Faisalabad (Faisalabad)", label: "University Medical & Dental College Faisalabad (Faisalabad)" },
    { value: "University of Balochistan (Quetta)", label: "University of Balochistan (Quetta)" },
    { value: "University of Health Sciences (Lahore)", label: "University of Health Sciences (Lahore)" },
    { value: "Wah Medical College (Wah Cantt)", label: "Wah Medical College (Wah Cantt)" },
    { value: "Women Medical College (Abbottabad)", label: "Women Medical College (Abbottabad)" },
    { value: "Ziauddin Medical College (Karachi)", label: "Ziauddin Medical College (Karachi)" },
    { value: "Boston University School of Medicine (USA)", label: "Boston University School of Medicine (USA)" },
    { value: "Columbia University Vagelos College of Physicians and Surgeons (USA)", label: "Columbia University Vagelos College of Physicians and Surgeons (USA)" },
    { value: "Duke University School of Medicine (USA)", label: "Duke University School of Medicine (USA)" },
    { value: "Harvard Medical School (USA)", label: "Harvard Medical School (USA)" },
    { value: "Imperial College London Faculty of Medicine (UK)", label: "Imperial College London Faculty of Medicine (UK)" },
    { value: "Johns Hopkins University School of Medicine (USA)", label: "Johns Hopkins University School of Medicine (USA)" },
    { value: "Karolinska Institute (Sweden)", label: "Karolinska Institute (Sweden)" },
    { value: "King's College London GKT School of Medical Education (UK)", label: "King's College London GKT School of Medical Education (UK)" },
    { value: "McGill University Faculty of Medicine (Canada)", label: "McGill University Faculty of Medicine (Canada)" },
    { value: "Monash University Faculty of Medicine (Australia)", label: "Monash University Faculty of Medicine (Australia)" },
    { value: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)", label: "National University of Singapore Yong Loo Lin School of Medicine (Singapore)" },
    { value: "New York University Grossman School of Medicine (USA)", label: "New York University Grossman School of Medicine (USA)" },
    { value: "Northwestern University Feinberg School of Medicine (USA)", label: "Northwestern University Feinberg School of Medicine (USA)" },
    { value: "Stanford University School of Medicine (USA)", label: "Stanford University School of Medicine (USA)" },
    { value: "Trinity College Dublin School of Medicine (Ireland)", label: "Trinity College Dublin School of Medicine (Ireland)" },
    { value: "University College London Medical School (UK)", label: "University College London Medical School (UK)" },
    { value: "University of California, San Francisco School of Medicine (USA)", label: "University of California, San Francisco School of Medicine (USA)" },
    { value: "University of Cambridge School of Clinical Medicine (UK)", label: "University of Cambridge School of Clinical Medicine (UK)" },
    { value: "University of Edinburgh Medical School (UK)", label: "University of Edinburgh Medical School (UK)" },
    { value: "University of Melbourne Medical School (Australia)", label: "University of Melbourne Medical School (Australia)" },
    { value: "University of Michigan Medical School (USA)", label: "University of Michigan Medical School (USA)" },
    { value: "University of Oxford Medical Sciences Division (UK)", label: "University of Oxford Medical Sciences Division (UK)" },
    { value: "University of Pennsylvania Perelman School of Medicine (USA)", label: "University of Pennsylvania Perelman School of Medicine (USA)" },
    { value: "University of Sydney School of Medicine (Australia)", label: "University of Sydney School of Medicine (Australia)" },
    { value: "University of Toronto Temerty Faculty of Medicine (Canada)", label: "University of Toronto Temerty Faculty of Medicine (Canada)" },
    { value: "University of Washington School of Medicine (USA)", label: "University of Washington School of Medicine (USA)" },
    { value: "Washington University in St. Louis School of Medicine (USA)", label: "Washington University in St. Louis School of Medicine (USA)" },
    { value: "Yale School of Medicine (USA)", label: "Yale School of Medicine (USA)" }
  ];

  // Hardcoded Hospitals Data with your provided list
  const hospitalOptions = [
    // Government Hospitals
    { value: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)", label: "Abbas Institute of Medical Sciences (AIMS) (Muzaffarabad)" },
    { value: "Abbasi Shaheed Hospital (ASH) (Karachi)", label: "Abbasi Shaheed Hospital (ASH) (Karachi)" },
    { value: "Allied Hospital (AH) (Faisalabad)", label: "Allied Hospital (AH) (Faisalabad)" },
    { value: "Ayub Teaching Hospital (ATH) (Abbottabad)", label: "Ayub Teaching Hospital (ATH) (Abbottabad)" },
    { value: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)", label: "Aziz Bhatti Shaheed Hospital (ABSH) (Gujrat)" },
    { value: "Bahawal Victoria Hospital (BVH) (Bahawalpur)", label: "Bahawal Victoria Hospital (BVH) (Bahawalpur)" },
    { value: "Benazir Bhutto Hospital (BBH) (Rawalpindi)", label: "Benazir Bhutto Hospital (BBH) (Rawalpindi)" },
    { value: "Bolan Medical Complex Hospital (BMCH) (Quetta)", label: "Bolan Medical Complex Hospital (BMCH) (Quetta)" },
    { value: "Civil Hospital Karachi (CHK) (Karachi)", label: "Civil Hospital Karachi (CHK) (Karachi)" },
    { value: "Civil Hospital, Larkana (CHL) (Larkana)", label: "Civil Hospital, Larkana (CHL) (Larkana)" },
    { value: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)", label: "Combined Military Hospital Lahore (CMH Lahore) (Lahore)" },
    { value: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)", label: "Combined Military Hospital Rawalpindi (CMH Rawalpindi) (Rawalpindi)" },
    { value: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)", label: "DHQ Hospital Faisalabad (DHQ) (Faisalabad)" },
    { value: "DHQ Hospital Gilgit (DHQ) (Gilgit)", label: "DHQ Hospital Gilgit (DHQ) (Gilgit)" },
    { value: "District Headquarter Hospital Battagram (DHQ) (Battagram)", label: "District Headquarter Hospital Battagram (DHQ) (Battagram)" },
    { value: "Gambat Institute of Medical Sciences (GIMS) (Gambat)", label: "Gambat Institute of Medical Sciences (GIMS) (Gambat)" },
    { value: "Hayatabad Medical Complex (HMC) (Peshawar)", label: "Hayatabad Medical Complex (HMC) (Peshawar)" },
    { value: "Holy Family Hospital (HFH) (Rawalpindi)", label: "Holy Family Hospital (HFH) (Rawalpindi)" },
    { value: "Institute of Infection Diseases (IID) (Karachi)", label: "Institute of Infection Diseases (IID) (Karachi)" },
    { value: "Jinnah Hospital Lahore (JHL) (Lahore)", label: "Jinnah Hospital Lahore (JHL) (Lahore)" },
    { value: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)", label: "Jinnah Post Graduate Medical Centre (JPMC) (Karachi)" },
    { value: "Khyber Teaching Hospital (KTH) (Peshawar)", label: "Khyber Teaching Hospital (KTH) (Peshawar)" },
    { value: "Lady Reading Hospital (LRH) (Peshawar)", label: "Lady Reading Hospital (LRH) (Peshawar)" },
    { value: "Lahore General Hospital (LGH) (Lahore)", label: "Lahore General Hospital (LGH) (Lahore)" },
    { value: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)", label: "Liaquat University Hospital (LUH) (Hyderabad/Jamshoro)" },
    { value: "Mayo Hospital (MH) (Lahore)", label: "Mayo Hospital (MH) (Lahore)" },
    { value: "Mian Muhammad Trust Hospital (MMT) (Lahore)", label: "Mian Muhammad Trust Hospital (MMT) (Lahore)" },
    { value: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)", label: "Military Hospital Rawalpindi (MH Rawalpindi) (Rawalpindi)" },
    { value: "Multan Institute of Cardiology (MIC) (Multan)", label: "Multan Institute of Cardiology (MIC) (Multan)" },
    { value: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)", label: "National Institute of Cardiovascular Diseases (NICVD) (Karachi)" },
    { value: "National Institute of Child Health (NICH) (Karachi)", label: "National Institute of Child Health (NICH) (Karachi)" },
    { value: "National Police Hospital (NPH) (Islamabad)", label: "National Police Hospital (NPH) (Islamabad)" },
    { value: "Nishtar Hospital (NH) (Multan)", label: "Nishtar Hospital (NH) (Multan)" },
    { value: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)", label: "Pakistan Institute of Medical Sciences (PIMS) (Islamabad)" },
    { value: "Punjab Institute of Cardiology (PIC) (Lahore)", label: "Punjab Institute of Cardiology (PIC) (Lahore)" },
    { value: "Punjab Social Security Hospital (PSSH) (Lahore)", label: "Punjab Social Security Hospital (PSSH) (Lahore)" },
    { value: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)", label: "Rawalpindi Institute of Cardiology (RIC) (Rawalpindi)" },
    { value: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)", label: "Recep Tayyip Erdoğan Hospital (RTEH) (Muzaffargarh)" },
    { value: "Saidu Teaching Hospital (STH) (Saidu Sharif)", label: "Saidu Teaching Hospital (STH) (Saidu Sharif)" },
    { value: "Services Hospital (SHL) (Lahore)", label: "Services Hospital (SHL) (Lahore)" },
    { value: "Shaikh Zayed Hospital (SZH) (Lahore)", label: "Shaikh Zayed Hospital (SZH) (Lahore)" },
    { value: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)", label: "Sindh Institute of Urology & Transplantation (SIUT) (Karachi)" },
    { value: "Social Security Hospital (SSH) (Lahore)", label: "Social Security Hospital (SSH) (Lahore)" },
    { value: "The Children's Hospital Lahore (CHL) (Lahore)", label: "The Children's Hospital Lahore (CHL) (Lahore)" },
    
    // Private Hospitals
    { value: "Aga Khan University Hospital (AKUH) (Karachi)", label: "Aga Khan University Hospital (AKUH) (Karachi)" },
    { value: "Al Falah International Hospital (AFIH) (Abbottabad)", label: "Al Falah International Hospital (AFIH) (Abbottabad)" },
    { value: "Al Khidmat Hospital (AKH) (Peshawar)", label: "Al Khidmat Hospital (AKH) (Peshawar)" },
    { value: "Chiniot General Hospital (CGH) (Karachi)", label: "Chiniot General Hospital (CGH) (Karachi)" },
    { value: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)", label: "Dar Ul Sehat Medical Complex (DSMC) (Malakand)" },
    { value: "Doctors Hospital (DHL) (Lahore)", label: "Doctors Hospital (DHL) (Lahore)" },
    { value: "Farooq Hospital (FH) (Lahore)", label: "Farooq Hospital (FH) (Lahore)" },
    { value: "Fatima Memorial Hospital (FMH) (Lahore)", label: "Fatima Memorial Hospital (FMH) (Lahore)" },
    { value: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)", label: "Ghurki Trust & Teaching Hospital (GTTH) (Lahore)" },
    { value: "Hameed Latif Hospital (HLH) (Lahore)", label: "Hameed Latif Hospital (HLH) (Lahore)" },
    { value: "Indus Hospital (TIH) (Karachi)", label: "Indus Hospital (TIH) (Karachi)" },
    { value: "Irfan General Hospital (IGH) (Peshawar)", label: "Irfan General Hospital (IGH) (Peshawar)" },
    { value: "Ittefaq Hospital (IH) (Lahore)", label: "Ittefaq Hospital (IH) (Lahore)" },
    { value: "Jinnah Teaching Hospital (JTH) (Peshawar)", label: "Jinnah Teaching Hospital (JTH) (Peshawar)" },
    { value: "Kuwait Teaching Hospital (KTH) (Peshawar)", label: "Kuwait Teaching Hospital (KTH) (Peshawar)" },
    { value: "Liaquat National Hospital (LNH) (Karachi)", label: "Liaquat National Hospital (LNH) (Karachi)" },
    { value: "Mid City Hospital (MCH) (Lahore)", label: "Mid City Hospital (MCH) (Lahore)" },
    { value: "National Hospital & Medical Center (NHMC) (Lahore)", label: "National Hospital & Medical Center (NHMC) (Lahore)" },
    { value: "National Medical Center (NMC) (Karachi)", label: "National Medical Center (NMC) (Karachi)" },
    { value: "Northwest General Hospital (NWGH) (Peshawar)", label: "Northwest General Hospital (NWGH) (Peshawar)" },
    { value: "Omar Hospital (OH) (Lahore)", label: "Omar Hospital (OH) (Lahore)" },
    { value: "PIMS Hospital (PIMSH) (Peshawar)", label: "PIMS Hospital (PIMSH) (Peshawar)" },
    { value: "Prime Care Hospital (PCH) (Lahore)", label: "Prime Care Hospital (PCH) (Lahore)" },
    { value: "Prime Teaching Hospital (PTH) (Peshawar)", label: "Prime Teaching Hospital (PTH) (Peshawar)" },
    { value: "Quaid-e-Azam International Hospital (QIH) (Islamabad)", label: "Quaid-e-Azam International Hospital (QIH) (Islamabad)" },
    { value: "Rehman Medical Institute (RMI) (Peshawar)", label: "Rehman Medical Institute (RMI) (Peshawar)" },
    { value: "Saifee Hospital (SHK) (Karachi)", label: "Saifee Hospital (SHK) (Karachi)" },
    { value: "Shafa International Hospital (SIH) (Islamabad)", label: "Shafa International Hospital (SIH) (Islamabad)" },
    { value: "Shalamar Hospital (SHL) (Lahore)", label: "Shalamar Hospital (SHL) (Lahore)" },
    { value: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)", label: "Shaukat Khanum Memorial Cancer Hospital (SKMCH) (Lahore)" },
    { value: "Shifa International Hospital (SIH) (Islamabad)", label: "Shifa International Hospital (SIH) (Islamabad)" },
    { value: "South City Hospital (SCH) (Karachi)", label: "South City Hospital (SCH) (Karachi)" },
    { value: "Surgimed Hospital (SHL) (Lahore)", label: "Surgimed Hospital (SHL) (Lahore)" },
    { value: "United Christian Hospital (UCH) (Lahore)", label: "United Christian Hospital (UCH) (Lahore)" },
    
    // International Hospitals
    { value: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)", label: "King Faisal Specialist Hospital & Research Center (Saudi Arabia)" },
    { value: "Massachusetts General Hospital (USA)", label: "Massachusetts General Hospital (USA)" },
    { value: "Singapore General Hospital (Singapore)", label: "Singapore General Hospital (Singapore)" }
  ];

  // Qualification Options
  const qualificationOptions = [
    { value: "MBBS", label: "MBBS" },
    { value: "MD", label: "MD" },
    { value: "FCPS", label: "FCPS" },
    { value: "FRCS", label: "FRCS" },
    { value: "MRCP", label: "MRCP" },
    { value: "PhD", label: "PhD" },
    { value: "Other", label: "Other" }
  ];

  // Specialization Options
  const specializationOptions = [
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    { value: "Neurologist", label: "Neurologist" },
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Psychiatrist", label: "Psychiatrist" },
    { value: "General Physician", label: "General Physician" },
    { value: "Gynecologist", label: "Gynecologist" },
    { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
    { value: "Ophthalmologist", label: "Ophthalmologist" },
    { value: "ENT Specialist", label: "ENT Specialist" },
    { value: "Other", label: "Other" }
  ];

  const steps = [
    { icon: <FaUserMd />, label: "Personal" },
    { icon: <FaGraduationCap />, label: "Education" },
    { icon: <FaBriefcase />, label: "Professional" },
    { icon: <FaFileUpload />, label: "Documents" },
    { icon: <FaEye />, label: "Review" },
  ];

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && !file.type.startsWith('image/') && name !== 'doctorLicense' && name !== 'mbbsCertificate') {
        setErrors({ ...errors, [name]: "Only image files are allowed" });
        return;
      }
      
      setFormData({
        ...formData,
        [name]: file
      });
      
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    }
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption
    });
    
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: null });
    }
  };

  // Format license number - exactly 5 digits with suffix
  const handleLicenseChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/\s/g, '');
    
    // Allow only digits, hyphen, and letters
    value = value.replace(/[^0-9A-Z-]/g, '');
    
    // Split into parts
    const parts = value.split('-');
    const numbers = parts[0] ? parts[0].replace(/[^0-9]/g, '') : '';
    const suffix = parts[1] ? parts[1].replace(/[^A-Z]/g, '') : '';
    
    // Limit numbers to 5 digits
    const limitedNumbers = numbers.slice(0, 5);
    
    // Only allow P, S, D as valid suffix
    const validSuffix = suffix.split('').filter(char => ['P', 'S', 'D'].includes(char)).join('').slice(0, 1);
    
    let formattedValue = limitedNumbers;
    if (validSuffix) {
      formattedValue = `${limitedNumbers}-${validSuffix}`;
    }
    
    setFormData({
      ...formData,
      licenseNumber: formattedValue
    });
  };

  // Strong email validation function
  const validateEmail = (email) => {
    // Comprehensive email regex that covers most common domains and formats
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    
    // First check basic regex pattern
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // Extract domain
    const domain = email.split('@')[1].toLowerCase();
    
    // Check if domain has at least one dot and valid TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return false;
    }
    
    // Check TLD length (should be at least 2 characters)
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2 || tld.length > 6) {
      return false;
    }
    
    // Additional check: domain should not have consecutive dots
    if (domain.includes('..')) {
      return false;
    }
    
    return true;
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required";
      
      // Strong email validation
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address (e.g., name@domain.com)";
      }
      
      if (!formData.phone?.trim()) newErrors.phone = "Phone number required";
      else if (!/^[0-9]{11}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 11 digits";
      if (!formData.gender) newErrors.gender = "Gender required";
      if (!formData.dob) newErrors.dob = "Date of birth required";
      if (!formData.cnic?.trim()) newErrors.cnic = "CNIC required";
      else if (!/^[0-9]{13}$/.test(formData.cnic))
        newErrors.cnic = "CNIC must be 13 digits";
      if (!formData.address?.trim()) newErrors.address = "Address required";
      if (!formData.city?.trim()) newErrors.city = "City required";
      if (!formData.country?.trim()) newErrors.country = "Country required";
      if (!formData.profilePicture) newErrors.profilePicture = "Profile picture is required";
    } 
    else if (step === 2) {
      if (!formData.qualification) newErrors.qualification = "Qualification required";
      if (formData.qualification?.value === "Other" && !formData.otherQualification?.trim()) {
        newErrors.otherQualification = "Please specify your qualification";
      }
      if (!formData.specialization) newErrors.specialization = "Specialization required";
      if (formData.specialization?.value === "Other" && !formData.otherSpecialization?.trim()) {
        newErrors.otherSpecialization = "Please specify your specialization";
      }
      if (!formData.institute) newErrors.institute = "Institute required";
      if (!formData.passingYear) newErrors.passingYear = "Passing year required";
    } 
    else if (step === 3) {
      if (!formData.experienceYears?.trim())
        newErrors.experienceYears = "Experience required";
      if (!formData.currentHospital)
        newErrors.currentHospital = "Current hospital required";
      if (!formData.designation?.trim())
        newErrors.designation = "Designation required";
      
      // License number validation - must be 5 digits with P, S, or D suffix
      if (!formData.licenseNumber?.trim()) {
        newErrors.licenseNumber = "License number required";
      } else {
        const parts = formData.licenseNumber.split('-');
        if (parts.length !== 2) {
          newErrors.licenseNumber = "License must be in format: 12345-P";
        } else {
          const numbers = parts[0];
          const suffix = parts[1];
          
          if (numbers.length !== 5) {
            newErrors.licenseNumber = "License number must be exactly 5 digits";
          } else if (!/^\d+$/.test(numbers)) {
            newErrors.licenseNumber = "First part must contain only digits";
          } else if (!['P', 'S', 'D'].includes(suffix)) {
            newErrors.licenseNumber = "Suffix must be P, S, or D only";
          }
        }
      }
    } 
    else if (step === 4) {
      if (!formData.idCardFront) newErrors.idCardFront = "ID card front image required";
      if (!formData.idCardBack) newErrors.idCardBack = "ID card back image required";
      if (!formData.doctorLicense) newErrors.doctorLicense = "Doctor license required";
      if (!formData.mbbsCertificate) newErrors.mbbsCertificate = "MBBS certificate required";
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

  const showNotificationModal = (message, type = "success") => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

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
      formDataToSend.append('qualification', formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.value);
      formDataToSend.append('specialization', formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.value);
      formDataToSend.append('institute', formData.institute?.value || formData.institute);
      formDataToSend.append('passingYear', formData.passingYear);
      
      // Professional Information
      formDataToSend.append('experienceYears', formData.experienceYears);
      formDataToSend.append('currentHospital', formData.currentHospital?.value || formData.currentHospital);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('licenseNumber', formData.licenseNumber);
      
      // Documents
      if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);
      if (formData.idCardFront) formDataToSend.append('idCardFront', formData.idCardFront);
      if (formData.idCardBack) formDataToSend.append('idCardBack', formData.idCardBack);
      if (formData.doctorLicense) formDataToSend.append('doctorLicense', formData.doctorLicense);
      if (formData.mbbsCertificate) formDataToSend.append('mbbsCertificate', formData.mbbsCertificate);
      if (formData.houseJobCertificate) formDataToSend.append('houseJobCertificate', formData.houseJobCertificate);
      if (formData.specializationCertificate) formDataToSend.append('specializationCertificate', formData.specializationCertificate);
      if (formData.fcpsCertificate) formDataToSend.append('fcpsCertificate', formData.fcpsCertificate);

      const response = await axios.post('http://localhost:5000/api/doctor-registration/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        setRegistrationNumber(response.data.data.registrationNumber);
        showNotificationModal(`✅ ${response.data.message}`, "success");
        
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
          country: "Pakistan",
          profilePicture: null,
          qualification: "",
          specialization: "",
          institute: null,
          passingYear: "",
          otherQualification: "",
          otherSpecialization: "",
          experienceYears: "",
          currentHospital: null,
          designation: "",
          licenseNumber: "",
          idCardFront: null,
          idCardBack: null,
          doctorLicense: null,
          mbbsCertificate: null,
          houseJobCertificate: null,
          specializationCertificate: null,
          fcpsCertificate: null,
        });
        setStep(1);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setSubmitError(errorMessage);
      showNotificationModal(`❌ ${errorMessage}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Review Section Component
  const ReviewSection = () => (
    <div className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-700 mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-3">Your registration number is:</p>
          <p className="text-2xl font-mono font-bold text-[#2c6774] bg-white p-3 rounded-lg border border-green-200">
            {registrationNumber}
          </p>
          <p className="text-sm text-gray-500 mt-3">Please save this number for future reference</p>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800">
            <FaTimesCircle className="text-red-500 mr-2" />
            <span className="font-medium">Error: {submitError}</span>
          </div>
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
          <ReviewItem label="Profile Picture" value={formData.profilePicture?.name || "Uploaded"} />
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
          <ReviewItem label="Qualification" value={formData.qualification?.value === "Other" ? formData.otherQualification : formData.qualification?.label} />
          <ReviewItem label="Specialization" value={formData.specialization?.value === "Other" ? formData.otherSpecialization : formData.specialization?.label} />
          <ReviewItem label="Institute" value={formData.institute?.label || formData.institute} />
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
          <ReviewItem label="Current Hospital" value={formData.currentHospital?.label || formData.currentHospital} />
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
            <DocumentStatus label="House Job" file={formData.houseJobCertificate} />
            <DocumentStatus label="Specialization" file={formData.specializationCertificate} />
            <DocumentStatus label="FCPS" file={formData.fcpsCertificate} />
          </div>
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
          disabled={isSubmitting || submitSuccess}
        >
          {isSubmitting ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Submitting...
            </>
          ) : submitSuccess ? (
            'Already Submitted'
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
    <div className={`px-3 py-1 rounded text-xs font-medium ${file ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
      {label}: {file ? "✓ Uploaded" : "—"}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Enter your email"
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
                  placeholder="03001234567"
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                <label className="font-medium text-[#174047] mb-1">CNIC Number *</label>
                <input
                  type="text"
                  name="cnic"
                  placeholder="1234512345678"
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
                  placeholder="Street address, area"
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
                  name="profilePicture" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG (max 5MB)</p>
                {errors.profilePicture && <span className="text-red-500 text-sm mt-1">{errors.profilePicture}</span>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Qualification *</label>
                <Select
                  options={qualificationOptions}
                  value={formData.qualification}
                  onChange={(option) => handleSelectChange(option, 'qualification')}
                  placeholder="Select qualification..."
                  isSearchable={true}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
              </div>

              {formData.qualification?.value === "Other" && (
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
                <Select
                  options={specializationOptions}
                  value={formData.specialization}
                  onChange={(option) => handleSelectChange(option, 'specialization')}
                  placeholder="Select specialization..."
                  isSearchable={true}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
              </div>

              {formData.specialization?.value === "Other" && (
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

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Institute/University *</label>
                <Select
                  options={instituteOptions}
                  value={formData.institute}
                  onChange={(option) => handleSelectChange(option, 'institute')}
                  placeholder="Search institute..."
                  isSearchable={true}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: '300px',
                      overflowY: 'auto'
                    })
                  }}
                />
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
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Current Hospital *</label>
                <Select
                  options={hospitalOptions}
                  value={formData.currentHospital}
                  onChange={(option) => handleSelectChange(option, 'currentHospital')}
                  placeholder="Search hospital..."
                  isSearchable={true}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: '300px',
                      overflowY: 'auto'
                    })
                  }}
                />
                {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Designation *</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g., Senior Registrar"
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
                  placeholder="e.g., 12345-P"
                  value={formData.licenseNumber}
                  onChange={handleLicenseChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  maxLength="7"
                />
                <p className="text-xs text-gray-500 mt-1">Format: 5 digits with suffix (P, S, or D) - e.g., 12345-P</p>
                {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
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
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">ID Card Front *</label>
                <input 
                  type="file" 
                  name="idCardFront" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Front side of your CNIC</p>
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
                <p className="text-xs text-gray-500 mt-1">Back side of your CNIC</p>
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

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">MBBS Degree *</label>
                <input 
                  type="file" 
                  name="mbbsCertificate" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*,.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">MBBS degree certificate</p>
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
                <p className="text-xs text-gray-500 mt-1">Optional</p>
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
                <p className="text-xs text-gray-500 mt-1">Optional</p>
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
                <p className="text-xs text-gray-500 mt-1">Optional</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
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
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 md:p-6 lg:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Doctor Registration</h1>
          <p className="text-sm md:text-base text-[#174047]">Complete all steps to register</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-start relative mb-8 px-2">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= index + 1 
                    ? "bg-[#2c6774] text-white scale-110" 
                    : "bg-[#c0d3dc] text-[#174047]"
                }`}
              >
                {s.icon}
              </div>
              <p className="text-xs md:text-sm font-medium text-[#174047] mt-2 text-center">
                {s.label}
              </p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-1 transition-colors duration-300 ${
                    step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
                  }`}
                  style={{ top: '20px' }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#2c6774] text-center mb-4">
            {steps[step - 1].label} Information
          </h2>
          {renderStepContent()}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Blurred background overlay */}
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          {/* Modal content with theme colors */}
          <div className="bg-white rounded-lg p-6 max-w-sm w-full z-10 shadow-xl border-t-4" 
               style={{ borderTopColor: modalType === "success" ? "#2c6774" : "#dc2626" }}>
            <div className="text-center">
              <div className="text-5xl mb-4" style={{ color: modalType === "success" ? "#2c6774" : "#dc2626" }}>
                
              </div>
              <p className="text-gray-700 text-lg font-medium mb-4">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg text-white transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: modalType === "success" ? "#2c6774" : "#dc2626" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for react-select */}
      <style jsx>{`
        .react-select-container {
          width: 100%;
        }
        .react-select__control {
          border-color: #c0d3dc !important;
          background-color: #f8f9fa !important;
          min-height: 42px;
        }
        .react-select__control:hover {
          border-color: #2c6774 !important;
        }
        .react-select__control--is-focused {
          border-color: #2c6774 !important;
          box-shadow: 0 0 0 1px #2c6774 !important;
        }
        .react-select__menu {
          z-index: 30 !important;
          max-height: 300px !important;
          overflow-y: auto !important;
        }
        .react-select__option--is-focused {
          background-color: #e6f0f3 !important;
        }
        .react-select__option--is-selected {
          background-color: #2c6774 !important;
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
};
export default DoctorRegistration;