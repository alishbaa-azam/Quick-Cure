// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { 
//   FaHospital, 
//   FaUser, 
//   FaMapMarkerAlt, 
//   FaFileUpload, 
//   FaCheck,
//   FaBuilding,
//   FaFileAlt,
//   FaCity,
//   FaMapPin,
//   FaCalendarAlt,
//   FaEdit,
//   FaEnvelope,
//   FaUserTie,
//   FaRegAddressCard,
//   FaPhone,
//   FaIdCard,
//   FaFilePdf,
//   FaSpinner
// } from 'react-icons/fa';

// // API Base URL
// const API_BASE_URL = 'http://localhost:5000/api/labreg';

// // Pakistan provinces and cities data (fallback if API fails)
// const PAKISTAN_DATA = {
//   provinces: [
//     { id: 'punjab', name: 'Punjab' },
//     { id: 'sindh', name: 'Sindh' },
//     { id: 'kpk', name: 'Khyber Pakhtunkhwa' },
//     { id: 'balochistan', name: 'Balochistan' },
//     { id: 'islamabad', name: 'Islamabad Capital Territory' },
//     { id: 'gilgit', name: 'Gilgit-Baltistan' },
//     { id: 'ajk', name: 'Azad Jammu & Kashmir' }
//   ],
//   cities: {
//     punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Jhang', 'Sheikhupura'],
//     sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Jacobabad', 'Shikarpur', 'Dadu', 'Tando Allahyar'],
//     kpk: ['Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Kohat', 'Bannu', 'Dera Ismail Khan', 'Charsadda', 'Nowshera', 'Mingora'],
//     balochistan: ['Quetta', 'Turbat', 'Khuzdar', 'Gwadar', 'Sibi', 'Zhob', 'Loralai', 'Dera Bugti', 'Chaman', 'Hub'],
//     islamabad: ['Islamabad'],
//     gilgit: ['Gilgit', 'Skardu', 'Hunza', 'Ghizer', 'Nagar', 'Ghanche', 'Astore', 'Diamer'],
//     ajk: ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber', 'Bagh', 'Hattian', 'Haveli']
//   }
// };

// // Step 1 Component - Basic Info
// const Step1BasicInfo = ({ register, errors, labTypes, isChecking, setError, clearErrors, formValues }) => {
//   const [regNumber, setRegNumber] = useState(formValues?.registrationNumber || '');
//   const [regNumberError, setRegNumberError] = useState('');
//   const [typingTimeout, setTypingTimeout] = useState(null);

//   // Update local state when formValues change
//   useEffect(() => {
//     if (formValues?.registrationNumber) {
//       setRegNumber(formValues.registrationNumber);
//     }
//   }, [formValues?.registrationNumber]);

//   const getFieldErrorStyle = (fieldName) => {
//     return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
//   };

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

//   const checkRegistrationNumberExists = async (value) => {
//     if (!value || value.length < 5) return;
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/check-registration?registrationNumber=${encodeURIComponent(value)}`);
//       const data = await response.json();
      
//       if (data.exists) {
//         setRegNumberError('This registration number already exists');
//         setError('registrationNumber', {
//           type: 'manual',
//           message: 'Registration number already exists'
//         });
//       } else {
//         setRegNumberError('');
//         clearErrors('registrationNumber');
//       }
//     } catch (error) {
//       console.error('Error checking registration number:', error);
//     }
//   };

//   const handleRegNumberChange = (e) => {
//     const value = e.target.value;
//     setRegNumber(value);
    
//     if (typingTimeout) {
//       clearTimeout(typingTimeout);
//     }
    
//     setRegNumberError('');
//     clearErrors('registrationNumber');
    
//     if (value && value.length >= 5) {
//       const timeout = setTimeout(() => {
//         checkRegistrationNumberExists(value);
//       }, 500);
//       setTypingTimeout(timeout);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Laboratory Name <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               {...register('labName', {
//                 required: 'Lab name is required',
//                 minLength: { value: 3, message: 'Lab name must be at least 3 characters' },
//                 maxLength: { value: 100, message: 'Lab name cannot exceed 100 characters' },
//                 pattern: { 
//                   value: /^[a-zA-Z0-9\s\-&.]+$/, 
//                   message: 'Only letters, numbers, spaces, hyphens, ampersands, and periods allowed' 
//                 }
//               })}
//               type="text"
//               defaultValue={formValues?.labName || ''}
//               className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('labName')}`}
//               placeholder="Enter lab name"
//             />
//             <div className="absolute left-3 top-3 text-gray-400">
//               <FaBuilding />
//             </div>
//           </div>
//           {errors.labName && (
//             <span className="text-red-500 text-sm mt-1">{errors.labName.message}</span>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Registration Number <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               {...register('registrationNumber', {
//                 required: 'Registration number is required',
//                 pattern: {
//                   value: /^[A-Z]{2,5}-?\d{4,8}$/,
//                   message: 'Format: PBHL-12345 or similar (2-5 letters, optional hyphen, 4-8 digits)'
//                 },
//                 maxLength: { value: 20, message: 'Registration number too long' },
//                 onChange: handleRegNumberChange
//               })}
//               type="text"
//               defaultValue={formValues?.registrationNumber || ''}
//               className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('registrationNumber')}`}
//               placeholder="PBHL-12345"
//             />
//             <div className="absolute left-3 top-3 text-gray-400">
//               <FaFileAlt />
//             </div>
//             {isChecking && (
//               <div className="absolute right-3 top-3">
//                 <FaSpinner className="animate-spin text-[#2c6774]" />
//               </div>
//             )}
//           </div>
//           {errors.registrationNumber && (
//             <span className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</span>
//           )}
//           {regNumberError && !errors.registrationNumber && (
//             <span className="text-red-500 text-sm mt-1">{regNumberError}</span>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Lab Type <span className="text-red-500">*</span>
//           </label>
//           <select
//             {...register('labType', { 
//               required: 'Please select lab type'
//             })}
//             defaultValue={formValues?.labType || ''}
//             className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('labType')}`}
//           >
//             <option value="">Select lab type</option>
//             {labTypes.map(type => (
//               <option key={type.id} value={type.id}>{type.name}</option>
//             ))}
//           </select>
//           {errors.labType && (
//             <span className="text-red-500 text-sm mt-1">{errors.labType.message}</span>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Year Established <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               {...register('establishmentYear', { 
//                 required: 'Year is required',
//                 validate: value => {
//                   const year = parseInt(value);
//                   return (year >= 1900 && year <= currentYear) || `Year must be between 1900 and ${currentYear}`;
//                 }
//               })}
//               defaultValue={formValues?.establishmentYear || ''}
//               className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('establishmentYear')}`}
//             >
//               <option value="">Select year</option>
//               {years.map(year => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//             </select>
//             <div className="absolute left-3 top-3 text-gray-400">
//               <FaCalendarAlt />
//             </div>
//           </div>
//           {errors.establishmentYear && (
//             <span className="text-red-500 text-sm mt-1">{errors.establishmentYear.message}</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Step 2 Component - Contact Details
// const Step2ContactDetails = ({ register, errors, isCheckingEmail, setError, clearErrors, formValues }) => {
//   const [emailError, setEmailError] = useState('');
//   const [typingTimeout, setTypingTimeout] = useState(null);

//   const getFieldErrorStyle = (fieldName) => {
//     return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
//   };

//   const checkEmailExists = async (value) => {
//     if (!value || !value.includes('@')) return;
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(value)}`);
//       const data = await response.json();
      
//       if (data.exists) {
//         setEmailError('Email already registered');
//         setError('email', {
//           type: 'manual',
//           message: 'Email already registered'
//         });
//       } else {
//         setEmailError('');
//         clearErrors('email');
//       }
//     } catch (error) {
//       console.error('Error checking email:', error);
//     }
//   };

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
    
//     if (typingTimeout) {
//       clearTimeout(typingTimeout);
//     }
    
//     setEmailError('');
//     clearErrors('email');
    
//     if (value && value.includes('@')) {
//       const timeout = setTimeout(() => {
//         checkEmailExists(value);
//       }, 500);
//       setTypingTimeout(timeout);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Contact Person <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               {...register('contactPerson', {
//                 required: 'Contact person is required',
//                 minLength: { value: 2, message: 'Name must be at least 2 characters' },
//                 maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
//                 pattern: { 
//                   value: /^[a-zA-Z\s]+$/, 
//                   message: 'Only letters and spaces allowed' 
//                 }
//               })}
//               type="text"
//               defaultValue={formValues?.contactPerson || ''}
//               className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('contactPerson')}`}
//               placeholder="Full name"
//             />
//             <div className="absolute left-3 top-3 text-gray-400">
//               <FaUserTie />
//             </div>
//           </div>
//           {errors.contactPerson && (
//             <span className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</span>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Designation <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <select
//               {...register('designation', { 
//                 required: 'Designation is required'
//               })}
//               defaultValue={formValues?.designation || ''}
//               className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('designation')}`}
//             >
//               <option value="">Select designation</option>
//               <option value="Lab Director">Lab Director</option>
//               <option value="Owner">Owner</option>
//               <option value="Manager">Manager</option>
//               <option value="Lab Technician">Lab Technician</option>
//               <option value="Pathologist">Pathologist</option>
//               <option value="Administrator">Administrator</option>
//             </select>
//             <div className="absolute left-3 top-3 text-gray-400">
//               <FaUser />
//             </div>
//           </div>
//           {errors.designation && (
//             <span className="text-red-500 text-sm mt-1">{errors.designation.message}</span>
//           )}
//         </div>
//       </div>

//       <div className="flex flex-col">
//         <label className="font-medium text-[#174047] mb-1">
//           Email Address <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <input
//             {...register('email', {
//               required: 'Email is required',
//               pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: 'Please enter a valid email address'
//               },
//               maxLength: { value: 100, message: 'Email too long' },
//               onChange: handleEmailChange
//             })}
//             type="email"
//             defaultValue={formValues?.email || ''}
//             className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('email')}`}
//             placeholder="lab@example.com"
//           />
//           <div className="absolute left-3 top-3 text-gray-400">
//             <FaEnvelope />
//           </div>
//           {isCheckingEmail && (
//             <div className="absolute right-3 top-3">
//               <FaSpinner className="animate-spin text-[#2c6774]" />
//             </div>
//           )}
//         </div>
//         {errors.email && (
//           <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
//         )}
//         {emailError && !errors.email && (
//           <span className="text-red-500 text-sm mt-1">{emailError}</span>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <label className="font-medium text-[#174047] mb-1">
//           Mobile Number <span className="text-red-500">*</span>
//         </label>
//         <div className="flex">
//           <span className="inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-[#c0d3dc] bg-[#c0d3dc] text-[#174047] font-medium">
//             +92
//           </span>
//           <input
//             {...register('mobileNumber', {
//               required: 'Mobile number is required',
//               pattern: {
//                 value: /^3[0-9]{9}$/,
//                 message: 'Enter a valid Pakistani mobile number (3XXXXXXXXX)'
//               },
//               minLength: { value: 10, message: 'Mobile number must be 10 digits' },
//               maxLength: { value: 10, message: 'Mobile number must be 10 digits' }
//             })}
//             type="tel"
//             defaultValue={formValues?.mobileNumber || ''}
//             className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] no-spinner ${getFieldErrorStyle('mobileNumber')}`}
//             placeholder="3XXXXXXXXX"
//             maxLength="10"
//           />
//         </div>
//         {errors.mobileNumber && (
//           <span className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</span>
//         )}
//         <p className="text-xs text-gray-500 mt-1">
//           Enter 10-digit mobile number starting with 3 (e.g., 3001234567)
//         </p>
//       </div>
//     </div>
//   );
// };

// // Step 3 Component - Location
// const Step3Location = ({ register, errors, formValues, setValue }) => {
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     if (formValues.province) {
//       setCities(PAKISTAN_DATA.cities[formValues.province] || []);
//     }
//   }, [formValues.province]);

//   // Set city value when province changes
//   useEffect(() => {
//     if (formValues.province && formValues.city) {
//       setValue('city', formValues.city);
//     }
//   }, [formValues.province, formValues.city, setValue]);

//   const getFieldErrorStyle = (fieldName) => {
//     return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col">
//         <label className="font-medium text-[#174047] mb-1">
//           Province <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <select
//             {...register('province', { 
//               required: 'Province is required'
//             })}
//             defaultValue={formValues?.province || ''}
//             className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('province')}`}
//           >
//             <option value="">Select Province</option>
//             {PAKISTAN_DATA.provinces.map(province => (
//               <option key={province.id} value={province.id}>
//                 {province.name}
//               </option>
//             ))}
//           </select>
//           <div className="absolute left-3 top-3 text-gray-400">
//             <FaMapMarkerAlt />
//           </div>
//         </div>
//         {errors.province && (
//           <span className="text-red-500 text-sm mt-1">{errors.province.message}</span>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <label className="font-medium text-[#174047] mb-1">
//           City <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <select
//             {...register('city', { 
//               required: 'City is required',
//               disabled: !formValues.province,
//               validate: value => {
//                 if (!formValues.province) return true;
//                 return value !== '' || 'Please select a city';
//               }
//             })}
//             defaultValue={formValues?.city || ''}
//             className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('city')} ${!formValues.province ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <option value="">
//               {formValues.province ? 'Select City' : 'First select province'}
//             </option>
//             {cities.map(city => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//           <div className="absolute left-3 top-3 text-gray-400">
//             <FaCity />
//           </div>
//         </div>
//         {errors.city && (
//           <span className="text-red-500 text-sm mt-1">{errors.city.message}</span>
//         )}
//       </div>

//       <div className="flex flex-col">
//         <label className="font-medium text-[#174047] mb-1">
//           Complete Address <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <textarea
//             {...register('completeAddress', {
//               required: 'Address is required',
//               minLength: { value: 10, message: 'Address must be at least 10 characters' },
//               maxLength: { value: 200, message: 'Address cannot exceed 200 characters' },
//               pattern: { 
//                 value: /^[a-zA-Z0-9\s,./#-]+$/, 
//                 message: 'Please enter a valid address' 
//               }
//             })}
//             rows="3"
//             defaultValue={formValues?.completeAddress || ''}
//             className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('completeAddress')}`}
//             placeholder="House/Shop number, Street, Area, Landmark"
//           />
//           <div className="absolute left-3 top-3 text-gray-400">
//             <FaMapPin />
//           </div>
//         </div>
//         {errors.completeAddress && (
//           <span className="text-red-500 text-sm mt-1">{errors.completeAddress.message}</span>
//         )}
//       </div>
//     </div>
//   );
// };

// // Step 4 Component - Documents
// const Step4Documents = ({ register, errors, setValue: setFormValue, clearErrors, formValues }) => {
//   const [fileNames, setFileNames] = useState({
//     registrationCertificate: formValues?.registrationCertificate?.name || '',
//     cnicFront: formValues?.cnicFront?.name || '',
//     cnicBack: formValues?.cnicBack?.name || ''
//   });

//   const getFieldErrorStyle = (fieldName) => {
//     return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
//   };

//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
    
//     if (clearErrors) {
//       clearErrors(fieldName);
//     }
    
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB');
//         e.target.value = '';
//         return;
//       }
      
//       const validTypes = fieldName === 'registrationCertificate'
//         ? ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
//         : ['image/jpeg', 'image/jpg', 'image/png'];
      
//       if (!validTypes.includes(file.type)) {
//         alert(fieldName === 'registrationCertificate' 
//           ? 'Please upload PDF, JPG, or PNG files only'
//           : 'Please upload JPG or PNG files only');
//         e.target.value = '';
//         return;
//       }
      
//       setFileNames(prev => ({ ...prev, [fieldName]: file.name }));
//       setFormValue(fieldName, file, { 
//         shouldValidate: true,
//         shouldDirty: true,
//         shouldTouch: true 
//       });
//     }
//   };

//   const validateFile = (value, fieldName) => {
//     if (fieldName === 'cnicBack' && !value) {
//       return true;
//     }
    
//     if (!value) {
//       return fieldName === 'registrationCertificate' 
//         ? 'Registration certificate is required'
//         : 'CNIC front is required';
//     }
    
//     if (!(value instanceof File)) {
//       return 'Invalid file';
//     }

//     if (value.size > 5 * 1024 * 1024) {
//       return 'File size must be less than 5MB';
//     }

//     const validTypes = fieldName === 'registrationCertificate'
//       ? ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
//       : ['image/jpeg', 'image/jpg', 'image/png'];
    
//     if (!validTypes.includes(value.type)) {
//       return fieldName === 'registrationCertificate'
//         ? 'Only PDF, JPG, or PNG files are allowed'
//         : 'Only JPG or PNG files are allowed';
//     }

//     return true;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col">
//         <label className="font-medium text-[#174047] mb-1">
//           Registration Certificate <span className="text-red-500">*</span>
//         </label>
//         <div className="relative">
//           <input
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             onChange={(e) => handleFileChange(e, 'registrationCertificate')}
//             className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('registrationCertificate')}`}
//           />
//           <input
//             type="hidden"
//             {...register('registrationCertificate', {
//               validate: (value) => validateFile(value, 'registrationCertificate')
//             })}
//           />
//         </div>
//         {errors.registrationCertificate && (
//           <span className="text-red-500 text-sm mt-1">{errors.registrationCertificate.message}</span>
//         )}
//         {fileNames.registrationCertificate && (
//           <p className="mt-1 text-sm text-[#2c6774] flex items-center">
//             <FaCheck className="mr-1" /> Selected: {fileNames.registrationCertificate}
//           </p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             Owner CNIC (Front) <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png"
//               onChange={(e) => handleFileChange(e, 'cnicFront')}
//               className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('cnicFront')}`}
//             />
//             <input
//               type="hidden"
//               {...register('cnicFront', {
//                 validate: (value) => validateFile(value, 'cnicFront')
//               })}
//             />
//           </div>
//           {errors.cnicFront && (
//             <span className="text-red-500 text-sm mt-1">{errors.cnicFront.message}</span>
//           )}
//           {fileNames.cnicFront && (
//             <p className="mt-1 text-sm text-[#2c6774] flex items-center">
//               <FaCheck className="mr-1" /> Selected: {fileNames.cnicFront}
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="font-medium text-[#174047] mb-1">
//             CNIC (Back)
//           </label>
//           <div className="relative">
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png"
//               onChange={(e) => handleFileChange(e, 'cnicBack')}
//               className="w-full px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
//             />
//             <input
//               type="hidden"
//               {...register('cnicBack', {
//                 validate: (value) => validateFile(value, 'cnicBack')
//               })}
//             />
//           </div>
//           {errors.cnicBack && (
//             <span className="text-red-500 text-sm mt-1">{errors.cnicBack.message}</span>
//           )}
//           {fileNames.cnicBack && (
//             <p className="mt-1 text-sm text-[#2c6774] flex items-center">
//               <FaCheck className="mr-1" /> Selected: {fileNames.cnicBack}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="p-4 bg-[#9fbfc5] bg-opacity-20 border border-[#2c6774] border-opacity-30 rounded-lg">
//         <p className="text-sm text-[#174047]">
//           <strong className="text-[#2c6774]">Document Requirements:</strong> Upload PDF, JPG, or PNG files (max 5MB each). All documents must be clear and readable.
//         </p>
//       </div>
//     </div>
//   );
// };

// // Step 5 Component - Review
// const Step5Review = ({ register, errors, formValues, labTypes, setCurrentStep, isSubmitting }) => {
//   const getFileName = (fileField) => {
//     if (!fileField) return 'Not uploaded';
//     if (typeof fileField === 'string') return fileField;
//     if (fileField instanceof File) return fileField.name;
//     if (fileField && fileField.name) return fileField.name;
//     return 'Uploaded';
//   };

//   const getProvinceName = (provinceId) => {
//     if (!provinceId) return 'Not selected';
//     const province = PAKISTAN_DATA.provinces.find(p => p.id === provinceId);
//     return province ? province.name : provinceId;
//   };

//   const getLabTypeName = (labTypeId) => {
//     if (!labTypeId) return 'Not selected';
//     const labType = labTypes.find(t => t.id === labTypeId);
//     return labType ? labType.name : labTypeId;
//   };

//   const sections = [
//     {
//       title: 'Basic Information',
//       step: 1,
//       fields: [
//         { label: 'Lab Name', value: formValues?.labName || 'Not provided' },
//         { label: 'Registration Number', value: formValues?.registrationNumber || 'Not provided' },
//         { label: 'Lab Type', value: getLabTypeName(formValues?.labType) },
//         { label: 'Year Established', value: formValues?.establishmentYear || 'Not provided' }
//       ]
//     },
//     {
//       title: 'Contact Details',
//       step: 2,
//       fields: [
//         { label: 'Contact Person', value: formValues?.contactPerson || 'Not provided' },
//         { label: 'Designation', value: formValues?.designation || 'Not provided' },
//         { label: 'Email', value: formValues?.email || 'Not provided' },
//         { label: 'Mobile', value: formValues?.mobileNumber ? `+92 ${formValues.mobileNumber}` : 'Not provided' }
//       ]
//     },
//     {
//       title: 'Location',
//       step: 3,
//       fields: [
//         { label: 'Province', value: getProvinceName(formValues?.province) },
//         { label: 'City', value: formValues?.city || 'Not selected' },
//         { label: 'Complete Address', value: formValues?.completeAddress || 'Not provided' }
//       ]
//     },
//     {
//       title: 'Documents',
//       step: 4,
//       fields: [
//         { label: 'Registration Certificate', value: getFileName(formValues?.registrationCertificate) },
//         { label: 'CNIC Front', value: getFileName(formValues?.cnicFront) },
//         { label: 'CNIC Back', value: getFileName(formValues?.cnicBack) }
//       ]
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {sections.map((section) => (
//         <div key={section.step} className="border border-gray-200 rounded-lg overflow-hidden">
//           <div className="bg-[#9fbfc5] bg-opacity-20 px-4 py-3 flex justify-between items-center">
//             <h3 className="font-semibold text-[#174047]">{section.title}</h3>
//             <button
//               type="button"
//               onClick={() => setCurrentStep(section.step)}
//               className="flex items-center text-sm text-[#2c6774] hover:text-[#174047] transition-colors"
//               disabled={isSubmitting}
//             >
//               <FaEdit className="mr-1" /> Edit
//             </button>
//           </div>
//           <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {section.fields.map((field, index) => (
//               <div key={index}>
//                 <p className="text-xs text-gray-500">{field.label}</p>
//                 <p className="text-sm font-medium text-gray-900">{field.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="space-y-4 mt-6">
//         <div className="flex items-start space-x-3">
//           <input
//             type="checkbox"
//             {...register('termsAccepted', {
//               required: 'You must accept the terms to continue'
//             })}
//             className="mt-0.5 w-5 h-4.5 text-[#2c6774]  rounded focus:ring-[#2c6774]"
//             disabled={isSubmitting}
//           />
//           <div className="text-sm">
//             <p className="font-medium text-gray-700">
//               I confirm that all information provided is correct and complete
//             </p>
//             {errors?.termsAccepted && (
//               <span className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-start space-x-3">
//           <input
//             type="checkbox"
//             {...register('commissionAgreed', {
//               required: 'You must agree to the terms and conditions'
//             })}
//             className="mt-0.5 w-5 h-4.5 text-[#2c6774] rounded focus:ring-[#2c6774]"
//             disabled={isSubmitting}
//           />
//           <div className="text-sm">
//             <p className="font-medium text-gray-700">
//               I agree to the platform's terms and conditions
//             </p>
//             {errors?.commissionAgreed && (
//               <span className="text-red-500 text-sm mt-1">{errors.commissionAgreed.message}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Component
// const LabRegistrationForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false);
//   const [isCheckingReg, setIsCheckingReg] = useState(false);

//   const steps = [
//     { id: 1, title: 'Basic Info', icon: <FaHospital /> },
//     { id: 2, title: 'Contact', icon: <FaUser /> },
//     { id: 3, title: 'Location', icon: <FaMapMarkerAlt /> },
//     { id: 4, title: 'Documents', icon: <FaFileUpload /> },
//     { id: 5, title: 'Review', icon: <FaCheck /> }
//   ];

//   const labTypes = [
//     { id: 'diagnostic', name: 'Diagnostic Center' },
//     { id: 'hospital', name: 'Hospital Laboratory' },
//     { id: 'independent', name: 'Independent Lab' },
//     { id: 'specialized', name: 'Specialized Test Lab' }
//   ];

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isValid },
//     trigger,
//     setValue,
//     reset,
//     getValues,
//     setError: setFormError,
//     clearErrors
//   } = useForm({
//     mode: 'onChange',
//     defaultValues: {} // Initialize with empty object
//   });

//   const formValues = watch();

//   const stepRequirements = {
//     1: ['labName', 'registrationNumber', 'labType', 'establishmentYear'],
//     2: ['email', 'contactPerson', 'designation', 'mobileNumber'],
//     3: ['province', 'city', 'completeAddress'],
//     4: ['registrationCertificate', 'cnicFront'],
//     5: ['termsAccepted', 'commissionAgreed']
//   };

//   const checkEmail = async (email) => {
//     setIsCheckingEmail(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`);
//       const data = await response.json();
//       return data.exists;
//     } catch (error) {
//       console.error('Error checking email:', error);
//       return false;
//     } finally {
//       setIsCheckingEmail(false);
//     }
//   };

//   const checkRegistration = async (registrationNumber) => {
//     setIsCheckingReg(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/check-registration?registrationNumber=${encodeURIComponent(registrationNumber)}`);
//       const data = await response.json();
//       return data.exists;
//     } catch (error) {
//       console.error('Error checking registration number:', error);
//       return false;
//     } finally {
//       setIsCheckingReg(false);
//     }
//   };

//   const validateStep = async (step) => {
//     const fields = stepRequirements[step];
//     if (!fields) return true;
//     const result = await trigger(fields);
//     return result;
//   };

//   // Check if current step is valid
//   const isCurrentStepValid = () => {
//     const fields = stepRequirements[currentStep];
//     if (!fields) return true;
    
//     // Check if all required fields have values and no errors
//     for (const field of fields) {
//       if (!formValues[field] || errors[field]) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const nextStep = async () => {
//     const isValid = await validateStep(currentStep);
//     if (isValid) {
//       if (!completedSteps.includes(currentStep)) {
//         setCompletedSteps([...completedSteps, currentStep]);
//       }
//       setCurrentStep(currentStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Edit button - sirf usi step ko edit karega jahan se aaye hain
//   const goToStep = (stepNumber) => {
//     // Sirf completed steps ya current step se peechay wali steps par ja sakte hain
//     if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
//       setCurrentStep(stepNumber);
//       window.scrollTo(0, 0);
//     }
//   };

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setError('');
    
//     try {
//       const formData = new FormData();
      
//       formData.append('labName', data.labName);
//       formData.append('registrationNumber', data.registrationNumber);
//       formData.append('labType', data.labType);
//       formData.append('establishmentYear', data.establishmentYear);
//       formData.append('contactPerson', data.contactPerson);
//       formData.append('designation', data.designation);
//       formData.append('email', data.email);
//       formData.append('mobileNumber', data.mobileNumber);
//       formData.append('province', data.province);
//       formData.append('city', data.city);
//       formData.append('completeAddress', data.completeAddress);
//       formData.append('termsAccepted', data.termsAccepted);
//       formData.append('commissionAgreed', data.commissionAgreed);
      
//       if (data.registrationCertificate) {
//         formData.append('registrationCertificate', data.registrationCertificate);
//       }
//       if (data.cnicFront) {
//         formData.append('cnicFront', data.cnicFront);
//       }
//       if (data.cnicBack) {
//         formData.append('cnicBack', data.cnicBack);
//       }

//       const response = await fetch(`${API_BASE_URL}/submit`, {
//         method: 'POST',
//         body: formData
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setShowSuccess(true);
//         setTimeout(() => {
//           setShowSuccess(false);
//           reset();
//           setCurrentStep(1);
//           setCompletedSteps([]);
//         }, 5000);
//       } else {
//         setError(result.message || 'Registration failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       setError('Network error. Please check your connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getStepColor = (step) => {
//     if (currentStep === step) return 'bg-[#2c6774] text-white scale-110';
//     if (completedSteps.includes(step)) return 'bg-[#2c6774] text-white';
//     return 'bg-[#c0d3dc] text-[#174047]';
//   };

//   const canGoToStep = (step) => {
//     // Step 1 is always accessible
//     if (step === 1) return true;
//     // Can go to any step less than or equal to current step
//     if (step <= currentStep) return true;
//     // Can go to step if previous step is completed
//     return completedSteps.includes(step - 1);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">
//             Lab Registration
//           </h1>
//           <p className="text-[#174047]">
//             Register your diagnostic laboratory with our network
//           </p>
//         </div>

//         {showSuccess && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
//             <p className="text-green-700 font-medium">Registration submitted successfully!</p>
//             <p className="text-sm text-green-600">Admin will review your application within 24-48 hours.</p>
//           </div>
//         )} 


//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
//             <p className="text-red-700 font-medium">Error</p>
//             <p className="text-sm text-red-600">{error}</p>
//           </div>
//         )}

//         {/* Progress Stepper */}
//         <div className="flex justify-between items-start relative mb-8">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex flex-col items-center relative  flex-1">
//               <button
//                 type="button"
//                 onClick={() => goToStep(step.id)}
//                 className={`w-12 h-12 rounded-full z-4 flex items-center justify-center transition-all duration-300 ${getStepColor(step.id)} ${
//                   !canGoToStep(step.id) ? 'opacity-100 cursor-not-allowed' : 'cursor-pointer'
//                 }`}
//                 disabled={!canGoToStep(step.id) || isSubmitting}
//                 title={!canGoToStep(step.id) ? 'Complete previous steps first' : ''}
//               >
//                 {step.icon}
//               </button>
//               <p className={`text-sm font-medium text-[#174047] mt-2 text-center ${currentStep === step.id ? 'text-[#2c6774]' : ''}`}>
//                 {step.title}
//               </p>
              
//               {/* Connector line */}
//               {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-6 left-5/8 w-5/6 h-1 z-0 transition-colors duration-300 ${
//                     completedSteps.includes(step.id) ? 'bg-[#2c6774]' : 'bg-[#c0d3dc]'
//                   }`}
//                   style={{ top: '33%', transform: 'translateY(-50%)' }}
//                 ></div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
//             {steps[currentStep - 1]?.title} Information
//           </h2>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             {currentStep === 1 && (
//               <Step1BasicInfo
//                 register={register}
//                 errors={errors}
//                 labTypes={labTypes}
//                 isChecking={isCheckingReg}
//                 setError={setFormError}
//                 clearErrors={clearErrors}
//                 formValues={formValues}
//               />
//             )}

//             {currentStep === 2 && (
//               <Step2ContactDetails
//                 register={register}
//                 errors={errors}
//                 isCheckingEmail={isCheckingEmail}
//                 setError={setFormError}
//                 clearErrors={clearErrors}
//                 formValues={formValues}
//               />
//             )}

//             {currentStep === 3 && (
//               <Step3Location
//                 register={register}
//                 errors={errors}
//                 formValues={formValues}
//                 setValue={setValue}
//               />
//             )}

//             {currentStep === 4 && (
//               <Step4Documents
//                 register={register}
//                 errors={errors}
//                 setValue={setValue}
//                 clearErrors={clearErrors}
//                 formValues={formValues}
//               />
//             )}

//             {currentStep === 5 && (
//               <Step5Review
//                 register={register}
//                 errors={errors}
//                 formValues={formValues}
//                 labTypes={labTypes}
//                 setCurrentStep={setCurrentStep}
//                 isSubmitting={isSubmitting}
//               />
//             )}

//             {currentStep < 5 ? (
//               <div className="flex justify-between mt-8">
//                 {/* Previous button - hidden on step 1 */}
//                 {currentStep > 1 ? (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={isSubmitting}
//                   >
//                     ← Previous
//                   </button>
//                 ) : (
//                   <div></div> // Empty div for spacing
//                 )}

//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className={`${
//                     isCurrentStepValid() 
//                       ? 'bg-[#2c6774] hover:bg-[#1e4e56]' 
//                       : 'bg-gray-400 cursor-not-allowed'
//                   } text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed`}
//                   disabled={!isCurrentStepValid() || isSubmitting}
//                   title={!isCurrentStepValid() ? 'Please fill all required fields correctly' : ''}
//                 >
//                   Save & Continue →
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-8">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
//                       Submitting...
//                     </>
//                   ) : (
//                     'Submit Registration'
//                   )}
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Progress bar */}
//         <div className="mt-4">
//           <div className="text-xs text-gray-500 text-center mb-2">
//             Step {currentStep} of {steps.length}
//           </div>
//           <div className="w-full bg-[#c0d3dc] rounded-full h-2">
//             <div 
//               className="bg-[#2c6774] h-2 rounded-full transition-all duration-300"
//               style={{ width: `${(currentStep / steps.length) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Help text */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           <p>
//             Need help? Call <span className="text-[#2c6774] font-medium">+92 300 1234567</span> or email{' '}
//             <a href="mailto:quickcure@gmail.com" className="text-[#2c6774] hover:text-[#174047]">
//               quickcure@gmail.com
//             </a>
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-spin {
//           animation: spin 1s linear infinite;
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-in;
//         }
        
//         .no-spinner::-webkit-inner-spin-button,
//         .no-spinner::-webkit-outer-spin-button {
//           -webkit-appearance: none;
//           margin: 0;
//         }
        
//         .no-spinner {
//           -moz-appearance: textfield;
//         }
//       `}
      
//       </style>
//     </div>
//   );
// };

// export default LabRegistrationForm;


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FaHospital, 
  FaUser, 
  FaMapMarkerAlt, 
  FaFileUpload, 
  FaCheck,
  FaBuilding,
  FaFileAlt,
  FaCity,
  FaMapPin,
  FaCalendarAlt,
  FaEdit,
  FaEnvelope,
  FaUserTie,
  FaRegAddressCard,
  FaPhone,
  FaIdCard,
  FaFilePdf,
  FaSpinner,
  FaTimes,
  FaInfoCircle
} from 'react-icons/fa';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api/labreg';

// Pakistan provinces and cities data (fallback if API fails)
const PAKISTAN_DATA = {
  provinces: [
    { id: 'punjab', name: 'Punjab' },
    { id: 'sindh', name: 'Sindh' },
    { id: 'kpk', name: 'Khyber Pakhtunkhwa' },
    { id: 'balochistan', name: 'Balochistan' },
    { id: 'islamabad', name: 'Islamabad Capital Territory' },
    { id: 'gilgit', name: 'Gilgit-Baltistan' },
    { id: 'ajk', name: 'Azad Jammu & Kashmir' }
  ],
  cities: {
    punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Jhang', 'Sheikhupura'],
    sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Jacobabad', 'Shikarpur', 'Dadu', 'Tando Allahyar'],
    kpk: ['Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Kohat', 'Bannu', 'Dera Ismail Khan', 'Charsadda', 'Nowshera', 'Mingora'],
    balochistan: ['Quetta', 'Turbat', 'Khuzdar', 'Gwadar', 'Sibi', 'Zhob', 'Loralai', 'Dera Bugti', 'Chaman', 'Hub'],
    islamabad: ['Islamabad'],
    gilgit: ['Gilgit', 'Skardu', 'Hunza', 'Ghizer', 'Nagar', 'Ghanche', 'Astore', 'Diamer'],
    ajk: ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber', 'Bagh', 'Hattian', 'Haveli']
  }
};

// Popup Message Component
const PopupMessage = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    if (type === 'success') {
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [type]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-600 text-2xl" />;
      case 'error':
        return <FaTimes className="text-red-600 text-2xl" />;
      default:
        return <FaInfoCircle className="text-blue-600 text-2xl" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-500',
          text: 'text-green-800',
          button: 'hover:bg-green-100 text-green-600'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-500',
          text: 'text-red-800',
          button: 'hover:bg-red-100 text-red-600'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          text: 'text-blue-800',
          button: 'hover:bg-blue-100 text-blue-600'
        };
    }
  };

  const colors = getColors();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" onClick={handleClose}></div>
      <div className={`relative ${colors.bg} border-l-4 ${colors.border} rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all animate-slide-up`}>
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 ${colors.button} rounded-full p-1 transition-colors`}
        >
          <FaTimes className="text-lg" />
        </button>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${colors.text} mb-2`}>
              {type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Information'}
            </h3>
            <p className={`${colors.text} text-sm leading-relaxed`}>
              {message}
            </p>
          </div>
        </div>
        {type !== 'success' && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className={`px-4 py-2 ${colors.button} rounded-lg transition-colors text-sm font-medium`}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 1 Component - Basic Info
const Step1BasicInfo = ({ register, errors, labTypes, isChecking, setError, clearErrors, formValues }) => {
  const [regNumber, setRegNumber] = useState(formValues?.registrationNumber || '');
  const [regNumberError, setRegNumberError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Update local state when formValues change
  useEffect(() => {
    if (formValues?.registrationNumber) {
      setRegNumber(formValues.registrationNumber);
    }
  }, [formValues?.registrationNumber]);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const checkRegistrationNumberExists = async (value) => {
    if (!value || value.length < 5) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/check-registration?registrationNumber=${encodeURIComponent(value)}`);
      const data = await response.json();
      
      if (data.exists) {
        setRegNumberError('This registration number already exists');
        setError('registrationNumber', {
          type: 'manual',
          message: 'Registration number already exists'
        });
      } else {
        setRegNumberError('');
        clearErrors('registrationNumber');
      }
    } catch (error) {
      console.error('Error checking registration number:', error);
    }
  };

  const handleRegNumberChange = (e) => {
    const value = e.target.value;
    setRegNumber(value);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    setRegNumberError('');
    clearErrors('registrationNumber');
    
    if (value && value.length >= 5) {
      const timeout = setTimeout(() => {
        checkRegistrationNumberExists(value);
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Laboratory Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('labName', {
                required: 'Lab name is required',
                minLength: { value: 3, message: 'Lab name must be at least 3 characters' },
                maxLength: { value: 100, message: 'Lab name cannot exceed 100 characters' },
                pattern: { 
                  value: /^[a-zA-Z0-9\s\-&.]+$/, 
                  message: 'Only letters, numbers, spaces, hyphens, ampersands, and periods allowed' 
                }
              })}
              type="text"
              defaultValue={formValues?.labName || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('labName')}`}
              placeholder="Enter lab name"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaBuilding />
            </div>
          </div>
          {errors.labName && (
            <span className="text-red-500 text-sm mt-1">{errors.labName.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Registration Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('registrationNumber', {
                required: 'Registration number is required',
                pattern: {
                  value: /^[A-Z]{2,5}-?\d{4,8}$/,
                  message: 'Format: PBHL-12345 or similar (2-5 letters, optional hyphen, 4-8 digits)'
                },
                maxLength: { value: 20, message: 'Registration number too long' },
                onChange: handleRegNumberChange
              })}
              type="text"
              defaultValue={formValues?.registrationNumber || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('registrationNumber')}`}
              placeholder="PBHL-12345"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaFileAlt />
            </div>
            {isChecking && (
              <div className="absolute right-3 top-3">
                <FaSpinner className="animate-spin text-[#2c6774]" />
              </div>
            )}
          </div>
          {errors.registrationNumber && (
            <span className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</span>
          )}
          {regNumberError && !errors.registrationNumber && (
            <span className="text-red-500 text-sm mt-1">{regNumberError}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Lab Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('labType', { 
              required: 'Please select lab type'
            })}
            defaultValue={formValues?.labType || ''}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('labType')}`}
          >
            <option value="">Select lab type</option>
            {labTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          {errors.labType && (
            <span className="text-red-500 text-sm mt-1">{errors.labType.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Year Established <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register('establishmentYear', { 
                required: 'Year is required',
                validate: value => {
                  const year = parseInt(value);
                  return (year >= 1900 && year <= currentYear) || `Year must be between 1900 and ${currentYear}`;
                }
              })}
              defaultValue={formValues?.establishmentYear || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('establishmentYear')}`}
            >
              <option value="">Select year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaCalendarAlt />
            </div>
          </div>
          {errors.establishmentYear && (
            <span className="text-red-500 text-sm mt-1">{errors.establishmentYear.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 2 Component - Contact Details
const Step2ContactDetails = ({ register, errors, isCheckingEmail, setError, clearErrors, formValues }) => {
  const [emailError, setEmailError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const checkEmailExists = async (value) => {
    if (!value || !value.includes('@')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(value)}`);
      const data = await response.json();
      
      if (data.exists) {
        setEmailError('Email already registered');
        setError('email', {
          type: 'manual',
          message: 'Email already registered'
        });
      } else {
        setEmailError('');
        clearErrors('email');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    setEmailError('');
    clearErrors('email');
    
    if (value && value.includes('@')) {
      const timeout = setTimeout(() => {
        checkEmailExists(value);
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Contact Person <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('contactPerson', {
                required: 'Contact person is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
                pattern: { 
                  value: /^[a-zA-Z\s]+$/, 
                  message: 'Only letters and spaces allowed' 
                }
              })}
              type="text"
              defaultValue={formValues?.contactPerson || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('contactPerson')}`}
              placeholder="Full name"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaUserTie />
            </div>
          </div>
          {errors.contactPerson && (
            <span className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Designation <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register('designation', { 
                required: 'Designation is required'
              })}
              defaultValue={formValues?.designation || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('designation')}`}
            >
              <option value="">Select designation</option>
              <option value="Lab Director">Lab Director</option>
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
              <option value="Lab Technician">Lab Technician</option>
              <option value="Pathologist">Pathologist</option>
              <option value="Administrator">Administrator</option>
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaUser />
            </div>
          </div>
          {errors.designation && (
            <span className="text-red-500 text-sm mt-1">{errors.designation.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address'
              },
              maxLength: { value: 100, message: 'Email too long' },
              onChange: handleEmailChange
            })}
            type="email"
            defaultValue={formValues?.email || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('email')}`}
            placeholder="lab@example.com"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaEnvelope />
          </div>
          {isCheckingEmail && (
            <div className="absolute right-3 top-3">
              <FaSpinner className="animate-spin text-[#2c6774]" />
            </div>
          )}
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
        )}
        {emailError && !errors.email && (
          <span className="text-red-500 text-sm mt-1">{emailError}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-[#c0d3dc] bg-[#c0d3dc] text-[#174047] font-medium">
            +92
          </span>
          <input
            {...register('mobileNumber', {
              required: 'Mobile number is required',
              pattern: {
                value: /^3[0-9]{9}$/,
                message: 'Enter a valid Pakistani mobile number (3XXXXXXXXX)'
              },
              minLength: { value: 10, message: 'Mobile number must be 10 digits' },
              maxLength: { value: 10, message: 'Mobile number must be 10 digits' }
            })}
            type="tel"
            defaultValue={formValues?.mobileNumber || ''}
            className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] no-spinner ${getFieldErrorStyle('mobileNumber')}`}
            placeholder="3XXXXXXXXX"
            maxLength="10"
          />
        </div>
        {errors.mobileNumber && (
          <span className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</span>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Enter 10-digit mobile number starting with 3 (e.g., 3001234567)
        </p>
      </div>
    </div>
  );
};

// Step 3 Component - Location
const Step3Location = ({ register, errors, formValues, setValue }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (formValues.province) {
      setCities(PAKISTAN_DATA.cities[formValues.province] || []);
    }
  }, [formValues.province]);

  // Set city value when province changes
  useEffect(() => {
    if (formValues.province && formValues.city) {
      setValue('city', formValues.city);
    }
  }, [formValues.province, formValues.city, setValue]);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Province <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            {...register('province', { 
              required: 'Province is required'
            })}
            defaultValue={formValues?.province || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('province')}`}
          >
            <option value="">Select Province</option>
            {PAKISTAN_DATA.provinces.map(province => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <div className="absolute left-3 top-3 text-gray-400">
            <FaMapMarkerAlt />
          </div>
        </div>
        {errors.province && (
          <span className="text-red-500 text-sm mt-1">{errors.province.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            {...register('city', { 
              required: 'City is required',
              disabled: !formValues.province,
              validate: value => {
                if (!formValues.province) return true;
                return value !== '' || 'Please select a city';
              }
            })}
            defaultValue={formValues?.city || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('city')} ${!formValues.province ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <option value="">
              {formValues.province ? 'Select City' : 'First select province'}
            </option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div className="absolute left-3 top-3 text-gray-400">
            <FaCity />
          </div>
        </div>
        {errors.city && (
          <span className="text-red-500 text-sm mt-1">{errors.city.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Complete Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            {...register('completeAddress', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Address must be at least 10 characters' },
              maxLength: { value: 200, message: 'Address cannot exceed 200 characters' },
              pattern: { 
                value: /^[a-zA-Z0-9\s,./#-]+$/, 
                message: 'Please enter a valid address' 
              }
            })}
            rows="3"
            defaultValue={formValues?.completeAddress || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('completeAddress')}`}
            placeholder="House/Shop number, Street, Area, Landmark"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaMapPin />
          </div>
        </div>
        {errors.completeAddress && (
          <span className="text-red-500 text-sm mt-1">{errors.completeAddress.message}</span>
        )}
      </div>
    </div>
  );
};

// Step 4 Component - Documents
const Step4Documents = ({ register, errors, setValue: setFormValue, clearErrors, formValues }) => {
  const [fileNames, setFileNames] = useState({
    registrationCertificate: formValues?.registrationCertificate?.name || '',
    cnicFront: formValues?.cnicFront?.name || '',
    cnicBack: formValues?.cnicBack?.name || ''
  });

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    
    if (clearErrors) {
      clearErrors(fieldName);
    }
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      const validTypes = fieldName === 'registrationCertificate'
        ? ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
        : ['image/jpeg', 'image/jpg', 'image/png'];
      
      if (!validTypes.includes(file.type)) {
        alert(fieldName === 'registrationCertificate' 
          ? 'Please upload PDF, JPG, or PNG files only'
          : 'Please upload JPG or PNG files only');
        e.target.value = '';
        return;
      }
      
      setFileNames(prev => ({ ...prev, [fieldName]: file.name }));
      setFormValue(fieldName, file, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true 
      });
    }
  };

  const validateFile = (value, fieldName) => {
    if (fieldName === 'cnicBack' && !value) {
      return true;
    }
    
    if (!value) {
      return fieldName === 'registrationCertificate' 
        ? 'Registration certificate is required'
        : 'CNIC front is required';
    }
    
    if (!(value instanceof File)) {
      return 'Invalid file';
    }

    if (value.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB';
    }

    const validTypes = fieldName === 'registrationCertificate'
      ? ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      : ['image/jpeg', 'image/jpg', 'image/png'];
    
    if (!validTypes.includes(value.type)) {
      return fieldName === 'registrationCertificate'
        ? 'Only PDF, JPG, or PNG files are allowed'
        : 'Only JPG or PNG files are allowed';
    }

    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Registration Certificate <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'registrationCertificate')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('registrationCertificate')}`}
          />
          <input
            type="hidden"
            {...register('registrationCertificate', {
              validate: (value) => validateFile(value, 'registrationCertificate')
            })}
          />
        </div>
        {errors.registrationCertificate && (
          <span className="text-red-500 text-sm mt-1">{errors.registrationCertificate.message}</span>
        )}
        {fileNames.registrationCertificate && (
          <p className="mt-1 text-sm text-[#2c6774] flex items-center">
            <FaCheck className="mr-1" /> Selected: {fileNames.registrationCertificate}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Owner CNIC (Front) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'cnicFront')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('cnicFront')}`}
            />
            <input
              type="hidden"
              {...register('cnicFront', {
                validate: (value) => validateFile(value, 'cnicFront')
              })}
            />
          </div>
          {errors.cnicFront && (
            <span className="text-red-500 text-sm mt-1">{errors.cnicFront.message}</span>
          )}
          {fileNames.cnicFront && (
            <p className="mt-1 text-sm text-[#2c6774] flex items-center">
              <FaCheck className="mr-1" /> Selected: {fileNames.cnicFront}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            CNIC (Back)
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'cnicBack')}
              className="w-full px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
            />
            <input
              type="hidden"
              {...register('cnicBack', {
                validate: (value) => validateFile(value, 'cnicBack')
              })}
            />
          </div>
          {errors.cnicBack && (
            <span className="text-red-500 text-sm mt-1">{errors.cnicBack.message}</span>
          )}
          {fileNames.cnicBack && (
            <p className="mt-1 text-sm text-[#2c6774] flex items-center">
              <FaCheck className="mr-1" /> Selected: {fileNames.cnicBack}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-[#9fbfc5] bg-opacity-20 border border-[#2c6774] border-opacity-30 rounded-lg">
        <p className="text-sm text-[#174047]">
          <strong className="text-[#2c6774]">Document Requirements:</strong> Upload PDF, JPG, or PNG files (max 5MB each). All documents must be clear and readable.
        </p>
      </div>
    </div>
  );
};

// Step 5 Component - Review
const Step5Review = ({ register, errors, formValues, labTypes, setCurrentStep, isSubmitting }) => {
  const getFileName = (fileField) => {
    if (!fileField) return 'Not uploaded';
    if (typeof fileField === 'string') return fileField;
    if (fileField instanceof File) return fileField.name;
    if (fileField && fileField.name) return fileField.name;
    return 'Uploaded';
  };

  const getProvinceName = (provinceId) => {
    if (!provinceId) return 'Not selected';
    const province = PAKISTAN_DATA.provinces.find(p => p.id === provinceId);
    return province ? province.name : provinceId;
  };

  const getLabTypeName = (labTypeId) => {
    if (!labTypeId) return 'Not selected';
    const labType = labTypes.find(t => t.id === labTypeId);
    return labType ? labType.name : labTypeId;
  };

  const sections = [
    {
      title: 'Basic Information',
      step: 1,
      fields: [
        { label: 'Lab Name', value: formValues?.labName || 'Not provided' },
        { label: 'Registration Number', value: formValues?.registrationNumber || 'Not provided' },
        { label: 'Lab Type', value: getLabTypeName(formValues?.labType) },
        { label: 'Year Established', value: formValues?.establishmentYear || 'Not provided' }
      ]
    },
    {
      title: 'Contact Details',
      step: 2,
      fields: [
        { label: 'Contact Person', value: formValues?.contactPerson || 'Not provided' },
        { label: 'Designation', value: formValues?.designation || 'Not provided' },
        { label: 'Email', value: formValues?.email || 'Not provided' },
        { label: 'Mobile', value: formValues?.mobileNumber ? `+92 ${formValues.mobileNumber}` : 'Not provided' }
      ]
    },
    {
      title: 'Location',
      step: 3,
      fields: [
        { label: 'Province', value: getProvinceName(formValues?.province) },
        { label: 'City', value: formValues?.city || 'Not selected' },
        { label: 'Complete Address', value: formValues?.completeAddress || 'Not provided' }
      ]
    },
    {
      title: 'Documents',
      step: 4,
      fields: [
        { label: 'Registration Certificate', value: getFileName(formValues?.registrationCertificate) },
        { label: 'CNIC Front', value: getFileName(formValues?.cnicFront) },
        { label: 'CNIC Back', value: getFileName(formValues?.cnicBack) }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.step} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-[#9fbfc5] bg-opacity-20 px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold text-[#174047]">{section.title}</h3>
            <button
              type="button"
              onClick={() => setCurrentStep(section.step)}
              className="flex items-center text-sm text-[#2c6774] hover:text-[#174047] transition-colors"
              disabled={isSubmitting}
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field, index) => (
              <div key={index}>
                <p className="text-xs text-gray-500">{field.label}</p>
                <p className="text-sm font-medium text-gray-900">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-4 mt-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('termsAccepted', {
              required: 'You must accept the terms to continue'
            })}
            className="mt-0.5 w-5 h-4.5 text-[#2c6774]  rounded focus:ring-[#2c6774]"
            disabled={isSubmitting}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              I confirm that all information provided is correct and complete
            </p>
            {errors?.termsAccepted && (
              <span className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</span>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('commissionAgreed', {
              required: 'You must agree to the terms and conditions'
            })}
            className="mt-0.5 w-5 h-4.5 text-[#2c6774] rounded focus:ring-[#2c6774]"
            disabled={isSubmitting}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              I agree to the platform's terms and conditions
            </p>
            {errors?.commissionAgreed && (
              <span className="text-red-500 text-sm mt-1">{errors.commissionAgreed.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const LabRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingReg, setIsCheckingReg] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Info', icon: <FaHospital /> },
    { id: 2, title: 'Contact', icon: <FaUser /> },
    { id: 3, title: 'Location', icon: <FaMapMarkerAlt /> },
    { id: 4, title: 'Documents', icon: <FaFileUpload /> },
    { id: 5, title: 'Review', icon: <FaCheck /> }
  ];

  const labTypes = [
    { id: 'diagnostic', name: 'Diagnostic Center' },
    { id: 'hospital', name: 'Hospital Laboratory' },
    { id: 'independent', name: 'Independent Lab' },
    { id: 'specialized', name: 'Specialized Test Lab' }
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
    setValue,
    reset,
    getValues,
    setError: setFormError,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {} // Initialize with empty object
  });

  const formValues = watch();

  const stepRequirements = {
    1: ['labName', 'registrationNumber', 'labType', 'establishmentYear'],
    2: ['email', 'contactPerson', 'designation', 'mobileNumber'],
    3: ['province', 'city', 'completeAddress'],
    4: ['registrationCertificate', 'cnicFront'],
    5: ['termsAccepted', 'commissionAgreed']
  };

  const checkEmail = async (email) => {
    setIsCheckingEmail(true);
    try {
      const response = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const checkRegistration = async (registrationNumber) => {
    setIsCheckingReg(true);
    try {
      const response = await fetch(`${API_BASE_URL}/check-registration?registrationNumber=${encodeURIComponent(registrationNumber)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking registration number:', error);
      return false;
    } finally {
      setIsCheckingReg(false);
    }
  };

  const validateStep = async (step) => {
    const fields = stepRequirements[step];
    if (!fields) return true;
    const result = await trigger(fields);
    return result;
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const fields = stepRequirements[currentStep];
    if (!fields) return true;
    
    // Check if all required fields have values and no errors
    for (const field of fields) {
      if (!formValues[field] || errors[field]) {
        return false;
      }
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Edit button - sirf usi step ko edit karega jahan se aaye hain
  const goToStep = (stepNumber) => {
    // Sirf completed steps ya current step se peechay wali steps par ja sakte hain
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
      setCurrentStep(stepNumber);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      formData.append('labName', data.labName);
      formData.append('registrationNumber', data.registrationNumber);
      formData.append('labType', data.labType);
      formData.append('establishmentYear', data.establishmentYear);
      formData.append('contactPerson', data.contactPerson);
      formData.append('designation', data.designation);
      formData.append('email', data.email);
      formData.append('mobileNumber', data.mobileNumber);
      formData.append('province', data.province);
      formData.append('city', data.city);
      formData.append('completeAddress', data.completeAddress);
      formData.append('termsAccepted', data.termsAccepted);
      formData.append('commissionAgreed', data.commissionAgreed);
      
      if (data.registrationCertificate) {
        formData.append('registrationCertificate', data.registrationCertificate);
      }
      if (data.cnicFront) {
        formData.append('cnicFront', data.cnicFront);
      }
      if (data.cnicBack) {
        formData.append('cnicBack', data.cnicBack);
      }

      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPopupMessage({
          type: 'success',
          message: 'Registration submitted successfully! Admin will review your application within 24-48 hours.'
        });
        setTimeout(() => {
          reset();
          setCurrentStep(1);
          setCompletedSteps([]);
        }, 3000);
      } else {
        setPopupMessage({
          type: 'error',
          message: result.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setPopupMessage({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepColor = (step) => {
    if (currentStep === step) return 'bg-[#2c6774] text-white scale-110';
    if (completedSteps.includes(step)) return 'bg-[#2c6774] text-white';
    return 'bg-[#c0d3dc] text-[#174047]';
  };

  const canGoToStep = (step) => {
    // Step 1 is always accessible
    if (step === 1) return true;
    // Can go to any step less than or equal to current step
    if (step <= currentStep) return true;
    // Can go to step if previous step is completed
    return completedSteps.includes(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      {popupMessage && (
        <PopupMessage
          type={popupMessage.type}
          message={popupMessage.message}
          onClose={() => setPopupMessage(null)}
        />
      )}

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">
            Lab Registration
          </h1>
          <p className="text-[#174047]">
            Register your diagnostic laboratory with our network
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-start relative mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative  flex-1">
              <button
                type="button"
                onClick={() => goToStep(step.id)}
                className={`w-12 h-12 rounded-full z-4 flex items-center justify-center transition-all duration-300 ${getStepColor(step.id)} ${
                  !canGoToStep(step.id) ? 'opacity-100 cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={!canGoToStep(step.id) || isSubmitting}
                title={!canGoToStep(step.id) ? 'Complete previous steps first' : ''}
              >
                {step.icon}
              </button>
              <p className={`text-sm font-medium text-[#174047] mt-2 text-center ${currentStep === step.id ? 'text-[#2c6774]' : ''}`}>
                {step.title}
              </p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-5/8 w-5/6 h-1 z-0 transition-colors duration-300 ${
                    completedSteps.includes(step.id) ? 'bg-[#2c6774]' : 'bg-[#c0d3dc]'
                  }`}
                  style={{ top: '33%', transform: 'translateY(-50%)' }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
            {steps[currentStep - 1]?.title} Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <Step1BasicInfo
                register={register}
                errors={errors}
                labTypes={labTypes}
                isChecking={isCheckingReg}
                setError={setFormError}
                clearErrors={clearErrors}
                formValues={formValues}
              />
            )}

            {currentStep === 2 && (
              <Step2ContactDetails
                register={register}
                errors={errors}
                isCheckingEmail={isCheckingEmail}
                setError={setFormError}
                clearErrors={clearErrors}
                formValues={formValues}
              />
            )}

            {currentStep === 3 && (
              <Step3Location
                register={register}
                errors={errors}
                formValues={formValues}
                setValue={setValue}
              />
            )}

            {currentStep === 4 && (
              <Step4Documents
                register={register}
                errors={errors}
                setValue={setValue}
                clearErrors={clearErrors}
                formValues={formValues}
              />
            )}

            {currentStep === 5 && (
              <Step5Review
                register={register}
                errors={errors}
                formValues={formValues}
                labTypes={labTypes}
                setCurrentStep={setCurrentStep}
                isSubmitting={isSubmitting}
              />
            )}

            {currentStep < 5 ? (
              <div className="flex justify-between mt-8">
                {/* Previous button - hidden on step 1 */}
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    ← Previous
                  </button>
                ) : (
                  <div></div> // Empty div for spacing
                )}

                <button
                  type="button"
                  onClick={nextStep}
                  className={`${
                    isCurrentStepValid() 
                      ? 'bg-[#2c6774] hover:bg-[#1e4e56]' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={!isCurrentStepValid() || isSubmitting}
                  title={!isCurrentStepValid() ? 'Please fill all required fields correctly' : ''}
                >
                  Save & Continue →
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
            )}
          </form>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="text-xs text-gray-500 text-center mb-2">
            Step {currentStep} of {steps.length}
          </div>
          <div className="w-full bg-[#c0d3dc] rounded-full h-2">
            <div 
              className="bg-[#2c6774] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help? Call <span className="text-[#2c6774] font-medium">+92 300 1234567</span> or email{' '}
            <a href="mailto:quickcure@gmail.com" className="text-[#2c6774] hover:text-[#174047]">
              quickcure@gmail.com
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}
      
      </style>
    </div>
  );
};

export default LabRegistrationForm;