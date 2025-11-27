// import React, { useState } from "react";
// import "./doctor_registration.css";

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
//       else if (!/^[0-9]{10,15}$/.test(formData.phone))
//         newErrors.phone = "Invalid phone number";
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

//   // ✅ Step Content
//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <form autoComplete="off">
//             <div className="form-grid">
//               <div className="input-group">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                 />
//                 {errors.fullName && <span className="error">{errors.fullName}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <span className="error">{errors.email}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="0xxxxxxxxxx"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 {errors.phone && <span className="error">{errors.phone}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Gender</label>
//                 <select name="gender" value={formData.gender} onChange={handleChange}>
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
                  
//                 </select>
//                 {errors.gender && <span className="error">{errors.gender}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Date of Birth</label>
//                 <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//                 {errors.dob && <span className="error">{errors.dob}</span>}
//               </div>

//               <div className="input-group">
//                 <label>CNIC / ID Number</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="XXXXXXXXXXXXX"
//                   value={formData.cnic}
//                   onChange={handleChange}
//                 />
//                 {errors.cnic && <span className="error">{errors.cnic}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Street #, Area, City"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//                 {errors.address && <span className="error">{errors.address}</span>}
//               </div>

//               <div className="input-group">
//                 <label>City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Enter your city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//                 {errors.city && <span className="error">{errors.city}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   placeholder="Enter your country"
//                   value={formData.country}
//                   onChange={handleChange}
//                 />
//                 {errors.country && <span className="error">{errors.country}</span>}
//               </div>

//               <div className="input-group">
//                 <label>Profile Picture</label>
//                 <input type="file" name="file" onChange={handleChange} />
//               </div>
//             </div>

//             <div className="form-actions">
//               <button type="button" className="next-btn" onClick={handleNext}>
//                 Save & Continue →
//               </button>
//             </div>
//           </form>
//         );

//       case 2:
//         return (
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Qualification</label>
//               <select
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Qualification</option>
//                 <option>MBBS</option>
//                 <option>MD</option>
//                 <option>FCPS</option>
//                 <option>PhD</option>
//                 <option>Other</option>
//               </select>
//               {errors.qualification && <span className="error">{errors.qualification}</span>}
//             </div>

//             <div className="input-group">
//               <label>Specialization</label>
//               <select
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Specialization</option>
//                 <option>Cardiologist</option>
//                 <option>Dermatologist</option>
//                 <option>Neurologist</option>
//                 <option>Pediatrician</option>
//                 <option>Psychiatrist</option>
//                 <option>General Physician</option>
//               </select>
//               {errors.specialization && <span className="error">{errors.specialization}</span>}
//             </div>

//             <div className="input-group">
//               <label>Institute</label>
//               <input
//                 type="text"
//                 name="institute"
//                 placeholder="e.g. King Edward Medical University"
//                 value={formData.institute}
//                 onChange={handleChange}
//               />
//               {errors.institute && <span className="error">{errors.institute}</span>}
//             </div>

//             <div className="input-group">
//               <label>Year of Passing</label>
//               <input
//                 type="date"
//                 name="passingYear"
//                 value={formData.passingYear}
//                 onChange={handleChange}
//               />
//               {errors.passingYear && <span className="error">{errors.passingYear}</span>}
//             </div>

//             <div className="form-actions">
//               <button type="button" className="prev-btn" onClick={handlePrevious}>
//                 ← Previous
//               </button>
//               <button type="button" className="next-btn" onClick={handleNext}>
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Years of Experience</label>
//               <input
//                 type="text"
//                 name="experienceYears"
//                 placeholder="Enter you years of experience"
//                 value={formData.experienceYears}
//                 onChange={handleChange}
//               />

//               {errors.experienceYears && <span className="error">{errors.experienceYears}</span>}
//             </div>

//             <div className="input-group">
//               <label>Current Hospital</label>
//               <input
//                 type="text"
//                 name="currentHospital"
//                 placeholder="e.g. Mayo Hospital"
//                 value={formData.currentHospital}
//                 onChange={handleChange}
//               />
//               {errors.currentHospital && <span className="error">{errors.currentHospital}</span>}
//             </div>

//             <div className="input-group">
//               <label>Designation</label>
//               <input
//                 type="text"
//                 name="designation"
//                 placeholder="e.g. Consultant"
//                 value={formData.designation}
//                 onChange={handleChange}
//               />
//               {errors.designation && <span className="error">{errors.designation}</span>}
//             </div>

//             <div className="input-group">
//               <label>License Number</label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 placeholder="PMC-XXXXXX"
//                 value={formData.licenseNumber}
//                 onChange={handleChange}
//               />
//               {errors.licenseNumber && <span className="error">{errors.licenseNumber}</span>}
//             </div>

//             <div className="form-actions">
//               <button type="button" className="prev-btn" onClick={handlePrevious}>
//                 ← Previous
//               </button>
//               <button type="button" className="next-btn" onClick={handleNext}>
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Online Consultation Fee (PKR)</label>
//               <input
//                 type="number"
//                 name="onlineFee"
//                 value={formData.onlineFee}
//                 onChange={handleChange}
//               />
//               {errors.onlineFee && <span className="error">{errors.onlineFee}</span>}
//             </div>

//             <div className="input-group">
//               <label>Consultation Hours</label>
//               <input
//                 type="text"
//                 name="consultationHours"
//                 placeholder="e.g. 9AM - 5PM"
//                 value={formData.consultationHours}
//                 onChange={handleChange}
//               />
//               {errors.consultationHours && (
//                 <span className="error">{errors.consultationHours}</span>
//               )}
//             </div>

//             <div className="input-group">
//               <label>Available Days</label>
//               <div className="checkbox-group">
//                 {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                   <label key={day}>
//                     <input
//                       type="checkbox"
//                       name="availableDays"
//                       value={day}
//                       checked={formData.availableDays.includes(day)}
//                       onChange={handleChange}
//                     />{" "}
//                     {day}
//                   </label>
//                 ))}
//               </div>
//               {errors.availableDays && <span className="error">{errors.availableDays}</span>}
//             </div>

//             <div className="form-actions space-top">
//               <button type="button" className="prev-btn" onClick={handlePrevious}>
//                 ← Previous
//               </button>
//               <button type="button" className="next-btn" onClick={handleNext}>
//                 Save & Continue →
//               </button>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="form-grid">
//             <div className="input-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               {passwordStrength && (
//                 <span className={`strength ${passwordStrength.toLowerCase()}`}>
//                   {passwordStrength}
//                 </span>
//               )}
//               {errors.password && <span className="error">{errors.password}</span>}
//             </div>

//             <div className="input-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Re-enter your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//               {errors.confirmPassword && (
//                 <span className="error">{errors.confirmPassword}</span>
//               )}
//             </div>

//             <div className="form-actions space-top">
//               <button type="button" className="prev-btn" onClick={handlePrevious}>
//                 ← Previous
//               </button>
//               <button
//                 type="button"
//                 className="next-btn"
//                 onClick={() => alert("Form submitted successfully!")}
//               >
//                 Submit ✅
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="doctor-registration-page">
//       <div className="doctor-registration-container">
//         <div className="header-section1">
//           <h1>Join Our Medical Team</h1>
//           <p>Start your journey with us in just a few steps</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="stepper">
//           {steps.map((s, index) => (
//             <div key={index} className="step-item">
//               <div
//                 className={`step-circle ${step >= index + 1 ? "active" : ""}`}
//               >
//                 {s.icon}
//               </div>
//               <p className="step-label">{s.label}</p>
//               {index < steps.length - 1 && (
//                 <div
//                   className={`step-line ${step > index + 1 ? "active" : ""}`}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="form-card">
//           <h2>{steps[step - 1].label} Information</h2>
//           {renderStepContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorRegistration;


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
//       else if (!/^[0-9]{10,15}$/.test(formData.phone))
//         newErrors.phone = "Invalid phone number";
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

//   // ✅ Step Content
//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <form autoComplete="off">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="0xxxxxxxxxx"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Gender</label>
//                 <select 
//                   name="gender" 
//                   value={formData.gender} 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 >
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//                 {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Date of Birth</label>
//                 <input 
//                   type="date" 
//                   name="dob" 
//                   value={formData.dob} 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">CNIC / ID Number</label>
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="XXXXXXXXXXXXX"
//                   value={formData.cnic}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Street #, Area, City"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Enter your city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   placeholder="Enter your country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//                 {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
//               </div>

//               <div className="flex flex-col">
//                 <label className="font-medium text-gray-700 mb-1">Profile Picture</label>
//                 <input 
//                   type="file" 
//                   name="file" 
//                   onChange={handleChange}
//                   className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end mt-8">
//               <button 
//                 type="button" 
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
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
//               <label className="font-medium text-gray-700 mb-1">Qualification</label>
//               <select
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
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
//               <label className="font-medium text-gray-700 mb-1">Specialization</label>
//               <select
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
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
//               <label className="font-medium text-gray-700 mb-1">Institute</label>
//               <input
//                 type="text"
//                 name="institute"
//                 placeholder="e.g. King Edward Medical University"
//                 value={formData.institute}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-gray-700 mb-1">Year of Passing</label>
//               <input
//                 type="date"
//                 name="passingYear"
//                 value={formData.passingYear}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
//             </div>

//             <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
//               <button 
//                 type="button" 
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
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
//               <label className="font-medium text-gray-700 mb-1">Years of Experience</label>
//               <input
//                 type="text"
//                 name="experienceYears"
//                 placeholder="Enter you years of experience"
//                 value={formData.experienceYears}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-gray-700 mb-1">Current Hospital</label>
//               <input
//                 type="text"
//                 name="currentHospital"
//                 placeholder="e.g. Mayo Hospital"
//                 value={formData.currentHospital}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-gray-700 mb-1">Designation</label>
//               <input
//                 type="text"
//                 name="designation"
//                 placeholder="e.g. Consultant"
//                 value={formData.designation}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-gray-700 mb-1">License Number</label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 placeholder="PMC-XXXXXX"
//                 value={formData.licenseNumber}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
//             </div>

//             <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
//               <button 
//                 type="button" 
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
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
//               <label className="font-medium text-gray-700 mb-1">Online Consultation Fee (PKR)</label>
//               <input
//                 type="number"
//                 name="onlineFee"
//                 value={formData.onlineFee}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.onlineFee && <span className="text-red-500 text-sm mt-1">{errors.onlineFee}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-gray-700 mb-1">Consultation Hours</label>
//               <input
//                 type="text"
//                 name="consultationHours"
//                 placeholder="e.g. 9AM - 5PM"
//                 value={formData.consultationHours}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.consultationHours && (
//                 <span className="text-red-500 text-sm mt-1">{errors.consultationHours}</span>
//               )}
//             </div>

//             <div className="flex flex-col md:col-span-2">
//               <label className="font-medium text-gray-700 mb-1">Available Days</label>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                   <label key={day} className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="availableDays"
//                       value={day}
//                       checked={formData.availableDays.includes(day)}
//                       onChange={handleChange}
//                       className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
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
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button 
//                 type="button" 
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
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
//               <label className="font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {passwordStrength && (
//                 <span className={`text-sm mt-1 ${
//                   passwordStrength === "Weak" ? "text-red-500" :
//                   passwordStrength === "Medium" ? "text-yellow-500" :
//                   "text-green-500"
//                 }`}>
//                   {passwordStrength}
//                 </span>
//               )}
//               {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-gray-700 mb-1">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Re-enter your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
//               />
//               {errors.confirmPassword && (
//                 <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
//               )}
//             </div>

//             <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
//               <button 
//                 type="button" 
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={handlePrevious}
//               >
//                 ← Previous
//               </button>
//               <button
//                 type="button"
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
//                 onClick={() => alert("Form submitted successfully!")}
//               >
//                 Submit ✅
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-teal-50 p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-teal-700 mb-2">Join Our Medical Team</h1>
//           <p className="text-gray-600">Start your journey with us in just a few steps</p>
//         </div>

//         {/* Progress Stepper */}
//         <div className="flex justify-between items-center relative mb-8">
//           {steps.map((s, index) => (
//             <div key={index} className="flex flex-col items-center relative z-10 flex-1">
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   step >= index + 1 
//                     ? "bg-teal-600 text-white scale-110" 
//                     : "bg-teal-100 text-teal-700"
//                 }`}
//               >
//                 {s.icon}
//               </div>
//               <p className="text-sm font-medium text-gray-700 mt-2">{s.label}</p>
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-6 left-1/2 w-full h-1 transition-colors duration-300 ${
//                     step > index + 1 ? "bg-teal-600" : "bg-gray-300"
//                   }`}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-teal-700 text-center mb-6">
//             {steps[step - 1].label} Information
//           </h2>
//           {renderStepContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorRegistration;


import React, { useState } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaBriefcase,
  FaComments,
  FaLock,
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

    experienceYears: "",
    currentHospital: "",
    designation: "",
    licenseNumber: "",

    onlineFee: 1500,
    consultationHours: "",
    availableDays: [],

    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const steps = [
    { icon: <FaUserMd />, label: "Personal" },
    { icon: <FaGraduationCap />, label: "Education" },
    { icon: <FaBriefcase />, label: "Professional" },
    { icon: <FaComments />, label: "Consultation" },
    { icon: <FaLock />, label: "Security" },
  ];

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newDays = checked
          ? [...prev.availableDays, value]
          : prev.availableDays.filter((day) => day !== value);
        return { ...prev, availableDays: newDays };
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }

    if (name === "password") evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) setPasswordStrength("Weak");
    else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
      setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  };

  // ✅ Validation per step
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Enter a valid email";
      if (!formData.phone.trim()) newErrors.phone = "Phone number required";
      else if (!/^[0-9]{10,15}$/.test(formData.phone))
        newErrors.phone = "Invalid phone number";
      if (!formData.gender) newErrors.gender = "Gender required";
      if (!formData.dob) newErrors.dob = "Date of birth required";
      if (!formData.cnic.trim()) newErrors.cnic = "CNIC required";
      else if (!/^[0-9]{13}$/.test(formData.cnic))
        newErrors.cnic = "CNIC must be 13 digits";
      if (!formData.address.trim()) newErrors.address = "Address required";
      if (!formData.city.trim()) newErrors.city = "City required";
      if (!formData.country.trim()) newErrors.country = "Country required";
    } else if (step === 2) {
      if (!formData.qualification) newErrors.qualification = "Qualification required";
      if (!formData.specialization) newErrors.specialization = "Specialization required";
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
    } else if (step === 4) {
      if (!formData.onlineFee) newErrors.onlineFee = "Fee required";
      if (!formData.consultationHours.trim())
        newErrors.consultationHours = "Consultation hours required";
      if (formData.availableDays.length === 0)
        newErrors.availableDays = "Select at least one available day";
    } else if (step === 5) {
      if (!formData.password.trim()) newErrors.password = "Password required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, steps.length));
  };
  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ✅ Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Full Name</label>
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
                <label className="font-medium text-[#174047] mb-1">Email Address</label>
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
                <label className="font-medium text-[#174047] mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="0xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Gender</label>
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
                <label className="font-medium text-[#174047] mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">CNIC / ID Number</label>
                <input
                  type="text"
                  name="cnic"
                  placeholder="XXXXXXXXXXXXX"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Address</label>
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
                <label className="font-medium text-[#174047] mb-1">City</label>
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
                <label className="font-medium text-[#174047] mb-1">Country</label>
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

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Profile Picture</label>
                <input 
                  type="file" 
                  name="file" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </form>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Qualification</label>
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

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Specialization</label>
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
              </select>
              {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Institute</label>
              <input
                type="text"
                name="institute"
                placeholder="e.g. King Edward Medical University"
                value={formData.institute}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Year of Passing</label>
              <input
                type="date"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
            </div>

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Years of Experience</label>
              <input
                type="text"
                name="experienceYears"
                placeholder="Enter you years of experience"
                value={formData.experienceYears}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Current Hospital</label>
              <input
                type="text"
                name="currentHospital"
                placeholder="e.g. Mayo Hospital"
                value={formData.currentHospital}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Designation</label>
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
              <label className="font-medium text-[#174047] mb-1">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="PMC-XXXXXX"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
            </div>

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Online Consultation Fee (PKR)</label>
              <input
                type="number"
                name="onlineFee"
                value={formData.onlineFee}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.onlineFee && <span className="text-red-500 text-sm mt-1">{errors.onlineFee}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Consultation Hours</label>
              <input
                type="text"
                name="consultationHours"
                placeholder="e.g. 9AM - 5PM"
                value={formData.consultationHours}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.consultationHours && (
                <span className="text-red-500 text-sm mt-1">{errors.consultationHours}</span>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-medium text-[#174047] mb-1">Available Days</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <label key={day} className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
                    />
                    {day}
                  </label>
                ))}
              </div>
              {errors.availableDays && <span className="text-red-500 text-sm mt-1">{errors.availableDays}</span>}
            </div>

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
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

      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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
                  {passwordStrength}
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

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
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
                onClick={() => alert("Form submitted successfully!")}
              >
                Submit 
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Join Our Medical Team</h1>
          <p className="text-[#174047]">Start your journey with us in just a few steps</p>
        </div>

        {/* Progress Stepper - Fixed line position */}
        <div className="flex justify-between items-start relative mb-8 ">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= index + 1 
                    ? "bg-[#2c6774] text-white scale-110 z-11" 
                    : "bg-[#c0d3dc] text-[#174047] z-11"
                }`}
              >
                {s.icon}
              </div>
              <p className="text-sm font-medium text-[#174047] mt-2 text-center">{s.label}</p>
              
              {/* Connector line - placed below the icons and labels */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-5/8 w-5/6 h-1 transition-colors duration-300  ${
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
            {steps[step - 1].label} Information
          </h2>
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;