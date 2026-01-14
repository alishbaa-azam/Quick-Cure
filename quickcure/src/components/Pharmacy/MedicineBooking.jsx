// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

//  const MedicineBooking = ({ cart, setCart }) => {
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     prescription: ''
//   });

//   const handleInputChange = (e) => {
//     setPatientInfo({
//       ...patientInfo,
//       [e.target.name]: e.target.value
//     });
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(cart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCart(cart.map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the booking information to your backend
//     alert('Booking confirmed! We will contact you soon.');
//     setCart([]);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <Link
//           to="/medicines"
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Browse Medicines
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Link
//         to="/pharmacies"
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         ← Go Back
//       </Link>

//       <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8">Book Your Medicines</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">Selected Medicines</h2>
//           <div className="space-y-4">
//             {cart.map(item => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-gray-600">${item.price} each</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <div className="text-right mt-2">
//                   <span className="font-semibold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-center text-xl font-bold">
//               <span>Total:</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={patientInfo.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={patientInfo.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   placeholder="0xxxxxxxxxx"
//                   value={patientInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 maxLength="11"
//                   pattern="[0-9]{11}"
//                   inputMode="numeric"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   required
//                   value={patientInfo.address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Prescription Details (Optional)
//                 </label>
//                 <textarea
//                   name="prescription"
//                   value={patientInfo.prescription}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Any additional prescription details..."
//                 />
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors mt-6 font-semibold"
//             >
//               Confirm Booking - ${totalPrice.toFixed(2)}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;















//Below code is perfect with redirection on multiple/previous locations.

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MedicineBooking = ({ cart, setCart }) => {
//   const navigate = useNavigate();
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     prescription: ''
//   });

//   const handleInputChange = (e) => {
//     setPatientInfo({
//       ...patientInfo,
//       [e.target.name]: e.target.value
//     });
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(cart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCart(cart.map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the booking information to your backend
//     alert('Booking confirmed! We will contact you soon.');
//     setCart([]);
//   };

//   const handleBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button - Changed from Link to button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8">Book Your Medicines</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">Selected Medicines</h2>
//           <div className="space-y-4">
//             {cart.map(item => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-gray-600">${item.price} each</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-600 hover:text-red-800 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <div className="text-right mt-2">
//                   <span className="font-semibold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-center text-xl font-bold">
//               <span>Total:</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={patientInfo.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Enter your full name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={patientInfo.email}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="example@email.com"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   placeholder="03XXXXXXXXX"
//                   value={patientInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   maxLength="11"
//                   pattern="[0-9]{11}"
//                   inputMode="numeric"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: 03XXXXXXXXX (11 digits)</p>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   required
//                   value={patientInfo.address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="House #, Street, Area, City"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Prescription Details (Optional)
//                 </label>
//                 <textarea
//                   name="prescription"
//                   value={patientInfo.prescription}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Any additional prescription details, doctor's notes, or special instructions..."
//                 />
//               </div>
//             </div>
            
//             <div className="flex gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
//               >
//                 Confirm Booking - ${totalPrice.toFixed(2)}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;










// the below code is with form restrictions
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const MedicineBooking = ({ cart, setCart }) => {
//   const navigate = useNavigate();
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     prescription: '',
//     prescriptionFile: null
//   });
//   const [emailError, setEmailError] = useState('');
//   const formRef = useRef(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     // Also ensure the form container is scrolled to top
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, []);

//   // Email validation function
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Please enter a valid email address (e.g., user@example.com)";
//     }
    
//     // Additional domain validation
//     const domain = email.split('@')[1];
//     const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    
//     // Check if it's a valid domain format
//     if (!domain.includes('.')) {
//       return "Email domain is incomplete";
//     }
    
//     // Optional: Check for specific domain restrictions
//     const restrictedDomains = ['test.com', 'example.com', 'temp.com'];
//     if (restrictedDomains.includes(domain.toLowerCase())) {
//       return "Please use a valid email domain";
//     }
    
//     return '';
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'email') {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
      
//       // Validate email on change
//       if (value.trim()) {
//         const error = validateEmail(value);
//         setEmailError(error);
//       } else {
//         setEmailError('');
//       }
//     } else {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//       if (!validTypes.includes(file.type)) {
//         alert('Please upload a valid file (JPEG, PNG, or PDF only)');
//         e.target.value = ''; // Clear the input
//         return;
//       }
      
//       // Validate file size (max 5MB)
//       const maxSize = 5 * 1024 * 1024; // 5MB in bytes
//       if (file.size > maxSize) {
//         alert('File size should be less than 5MB');
//         e.target.value = ''; // Clear the input
//         return;
//       }
      
//       setPatientInfo({
//         ...patientInfo,
//         prescriptionFile: file
//       });
//     }
//   };

//   const removeFile = () => {
//     setPatientInfo({
//       ...patientInfo,
//       prescriptionFile: null
//     });
//     // Clear the file input
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) fileInput.value = '';
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(cart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCart(cart.map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate email before submission
//     if (patientInfo.email.trim()) {
//       const error = validateEmail(patientInfo.email);
//       if (error) {
//         setEmailError(error);
//         return;
//       }
//     }
    
//     // Here you would typically send the booking information to your backend
//     // Including prescription file upload
//     const formData = new FormData();
//     Object.keys(patientInfo).forEach(key => {
//       if (key === 'prescriptionFile' && patientInfo[key]) {
//         formData.append('prescription', patientInfo[key]);
//       } else {
//         formData.append(key, patientInfo[key]);
//       }
//     });
    
//     // Add cart items to form data
//     formData.append('cart', JSON.stringify(cart));
    
//     // For demonstration, just show alert
//     let message = 'Booking confirmed! We will contact you soon.';
//     if (patientInfo.prescriptionFile) {
//       message += `\nPrescription file uploaded: ${patientInfo.prescriptionFile.name}`;
//     }
    
//     alert(message);
//     setCart([]);
    
//     // Reset form
//     setPatientInfo({
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       prescription: '',
//       prescriptionFile: null
//     });
//     setEmailError('');
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8">Book Your Medicines</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">Selected Medicines</h2>
//           <div className="space-y-4">
//             {cart.map(item => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-gray-600">${item.price} each</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-600 hover:text-red-800 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <div className="text-right mt-2">
//                   <span className="font-semibold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex justify-between items-center text-xl font-bold">
//               <span>Total:</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={patientInfo.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Enter your full name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={patientInfo.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                     emailError ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="example@gmail.com"
//                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   title="Please enter a valid email address (e.g., user@example.com)"
//                 />
//                 {emailError && (
//                   <p className="text-red-500 text-xs mt-1">{emailError}</p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">
//                   Format: name@domain.com (e.g., user@gmail.com)
//                 </p>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   placeholder="03XXXXXXXXX"
//                   value={patientInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   maxLength="11"
//                   pattern="[0-9]{11}"
//                   inputMode="numeric"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: 03XXXXXXXXX (11 digits)</p>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   required
//                   value={patientInfo.address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="House #, Street, Area, City"
//                 />
//               </div>
              
//               {/* Prescription Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Upload Prescription (Optional)
//                 </label>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="file"
//                       id="prescriptionFile"
//                       onChange={handleFileUpload}
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     />
//                   </div>
//                   {patientInfo.prescriptionFile && (
//                     <div className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-200">
//                       <div className="flex items-center space-x-2">
//                         <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                         <span className="text-sm text-gray-700">
//                           {patientInfo.prescriptionFile.name}
//                           <span className="text-xs text-gray-500 ml-2">
//                             ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   )}
//                   <p className="text-xs text-gray-500">
//                     Supported formats: JPG, PNG, PDF (Max 5MB)
//                   </p>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Notes (Optional)
//                 </label>
//                 <textarea
//                   name="prescription"
//                   value={patientInfo.prescription}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   placeholder="Any additional prescription details, doctor's notes, or special instructions..."
//                 />
//               </div>
//             </div>
            
//             <div className="flex gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={!!emailError}
//                 className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
//                   emailError 
//                     ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Confirm Booking - ${totalPrice.toFixed(2)}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;












//The below code is with backend Integration
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const MedicineBooking = ({ cart, setCart }) => {
//   const navigate = useNavigate();
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     prescriptionNotes: '',
//     prescriptionFile: null
//   });
//   const [selectedPharmacy, setSelectedPharmacy] = useState('');
//   const [pharmacies, setPharmacies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [requiresPrescription, setRequiresPrescription] = useState(false);
//   const [availableMedicines, setAvailableMedicines] = useState([]);
//   const [unavailableMedicines, setUnavailableMedicines] = useState([]);
//   const [selectedPayment, setSelectedPayment] = useState('cod');
//   const [orderNotes, setOrderNotes] = useState('');
//   const [deliveryInstructions, setDeliveryInstructions] = useState('');
//   const formRef = useRef(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }

//     fetchPharmacies();
//   }, []);

//   // Check prescription requirement when cart changes
//   useEffect(() => {
//     const hasPrescriptionRequired = cart.some(item => item.prescriptionRequired);
//     setRequiresPrescription(hasPrescriptionRequired);
    
//     // Check availability if pharmacy is selected
//     if (selectedPharmacy) {
//       checkMedicineAvailability(selectedPharmacy);
//     }
//   }, [cart, selectedPharmacy]);

//   const fetchPharmacies = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       const data = await response.json();
//       if (data.success && data.data.length > 0) {
//         setPharmacies(data.data);
//         const firstPharmacyId = data.data[0]._id;
//         setSelectedPharmacy(firstPharmacyId);
//         checkMedicineAvailability(firstPharmacyId);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setError('Failed to load pharmacies. Please refresh the page.');
//     }
//   };

//   const checkMedicineAvailability = async (pharmacyId) => {
//     try {
//       // Fetch medicines available at this pharmacy
//       const response = await fetch(`http://localhost:5000/api/medicines?pharmacyId=${pharmacyId}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const availableMedicineIds = data.data.map(medicine => medicine._id);
        
//         // Separate available and unavailable medicines
//         const available = [];
//         const unavailable = [];
        
//         cart.forEach(item => {
//           if (availableMedicineIds.includes(item._id)) {
//             available.push(item);
//           } else {
//             unavailable.push({
//               ...item,
//               reason: 'Not available at selected pharmacy'
//             });
//           }
//         });
        
//         setAvailableMedicines(available);
//         setUnavailableMedicines(unavailable);
//       }
//     } catch (err) {
//       console.error('Error checking medicine availability:', err);
//     }
//   };

//   const handlePharmacyChange = async (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     await checkMedicineAvailability(pharmacyId);
//   };

//   // Email validation
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Please enter a valid email address";
//     }
//     return '';
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'email') {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
      
//       if (value.trim()) {
//         const error = validateEmail(value);
//         setEmailError(error);
//       } else {
//         setEmailError('');
//       }
//     } else {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//       if (!validTypes.includes(file.type)) {
//         alert('Please upload a valid file (JPEG, PNG, or PDF only)');
//         e.target.value = '';
//         return;
//       }
      
//       const maxSize = 5 * 1024 * 1024;
//       if (file.size > maxSize) {
//         alert('File size should be less than 5MB');
//         e.target.value = '';
//         return;
//       }
      
//       setPatientInfo({
//         ...patientInfo,
//         prescriptionFile: file
//       });
//     }
//   };

//   const removeFile = () => {
//     setPatientInfo({
//       ...patientInfo,
//       prescriptionFile: null
//     });
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) fileInput.value = '';
//   };

//   const removeFromCart = (medicineId) => {
//     const updatedCart = cart.filter(item => item._id !== medicineId);
//     setCart(updatedCart);
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cart.map(item =>
//       item._id === medicineId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart);
//   };

//   const removeUnavailableItems = () => {
//     const updatedCart = cart.filter(item => 
//       availableMedicines.some(available => available._id === item._id)
//     );
//     setCart(updatedCart);
//     setUnavailableMedicines([]);
//   };

//   // Calculate totals based on AVAILABLE medicines only
//   const totalPrice = availableMedicines.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const deliveryCharge = 50;
//   const tax = totalPrice * 0.05;
//   const finalTotal = totalPrice + deliveryCharge + tax;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate email
//     if (patientInfo.email.trim()) {
//       const error = validateEmail(patientInfo.email);
//       if (error) {
//         setEmailError(error);
//         return;
//       }
//     }

//     // Validate required fields
//     if (!patientInfo.name || !patientInfo.email || !patientInfo.phone || !patientInfo.address) {
//       setError('Please fill all required fields (name, email, phone, address)');
//       return;
//     }

//     // Validate cart has available medicines
//     if (availableMedicines.length === 0) {
//       setError('No medicines available at selected pharmacy. Please select a different pharmacy.');
//       return;
//     }

//     // Validate pharmacy selection
//     if (!selectedPharmacy) {
//       setError('Please select a pharmacy');
//       return;
//     }

//     // Check prescription requirement
//     if (requiresPrescription && !patientInfo.prescriptionFile) {
//       const confirm = window.confirm(
//         '⚠️ Prescription Required\n\nOne or more medicines in your order require a prescription. Without it, your order may be delayed or cancelled.\n\nDo you want to proceed without uploading a prescription?'
//       );
//       if (!confirm) {
//         return;
//       }
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Create FormData for multipart/form-data upload
//       const formData = new FormData();
      
//       // Add patient information
//       formData.append('patient', JSON.stringify({
//         name: patientInfo.name,
//         email: patientInfo.email,
//         phone: patientInfo.phone,
//         address: patientInfo.address
//       }));
      
//       // Add medicines (only available ones)
//       formData.append('medicines', JSON.stringify(
//         availableMedicines.map(item => ({
//           medicineId: item._id,
//           pharmacyId: selectedPharmacy,
//           quantity: item.quantity
//         }))
//       ));
      
//       // Add prescription details
//       const prescriptionDetails = {
//         notes: patientInfo.prescriptionNotes || ''
//       };
      
//       // Add prescription file if exists
//       if (patientInfo.prescriptionFile) {
//         prescriptionDetails.fileName = patientInfo.prescriptionFile.name;
//         prescriptionDetails.fileType = patientInfo.prescriptionFile.type;
//       }
      
//       formData.append('prescriptionDetails', JSON.stringify(prescriptionDetails));
      
//       // Add delivery info
//       formData.append('deliveryInfo', JSON.stringify({
//         address: patientInfo.address,
//         instructions: deliveryInstructions || ''
//       }));
      
//       // Add payment info
//       formData.append('payment', JSON.stringify({
//         method: selectedPayment,
//         amount: finalTotal
//       }));
      
//       // Add notes
//       formData.append('notes', orderNotes || '');
//       formData.append('pharmacyNotes', patientInfo.prescriptionNotes || '');
      
//       // Add prescription file (if uploaded)
//       if (patientInfo.prescriptionFile) {
//         formData.append('prescription', patientInfo.prescriptionFile);
//       }

//       console.log('Submitting order with FormData...');
      
//       // Send order to backend WITH FormData (for file upload)
//       const response = await fetch('http://localhost:5000/api/medicine-orders', {
//         method: 'POST',
//         // NOTE: Do NOT set Content-Type header for FormData - browser sets it automatically with boundary
//         body: formData
//       });

//       const data = await response.json();
//       console.log('Order response:', data);

//       if (data.success) {
//         const orderId = data.data._id || data.data.orderId;
//         setSuccess(`✅ Order placed successfully! Order ID: ${orderId}`);
        
//         // Clear cart
//         setCart([]);
        
//         // Reset form
//         setPatientInfo({
//           name: '',
//           email: '',
//           phone: '',
//           address: '',
//           prescriptionNotes: '',
//           prescriptionFile: null
//         });
//         setOrderNotes('');
//         setDeliveryInstructions('');
//         setSelectedPayment('cod');
//         setEmailError('');
//         setAvailableMedicines([]);
//         setUnavailableMedicines([]);
        
//         // Redirect to success page after 3 seconds
//         setTimeout(() => {
//           navigate('/order-success', { 
//             state: { 
//               orderId: orderId,
//               orderDetails: data.data
//             } 
//           });
//         }, 3000);
        
//       } else {
//         // Handle specific errors
//         if (data.requiresPrescription) {
//           setError(`⚠️ ${data.message} Please upload a prescription.`);
//         } else if (data.errors && Array.isArray(data.errors)) {
//           setError(`Validation Error: ${data.errors.join(', ')}`);
//         } else {
//           setError(data.message || '❌ Failed to place order. Please try again.');
//         }
//       }
//     } catch (err) {
//       console.error('Error placing order:', err);
//       setError('❌ Network error. Please check your connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <p className="text-gray-600 mb-6">Add medicines from pharmacies to proceed with booking.</p>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Header */}
//       <div className="mb-8">
//         <button
//           onClick={handleBack}
//           className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[var(--primary-color)]">Book Your Medicines</h1>
//         <p className="text-gray-600 mt-2">Complete the form below to place your order</p>
//       </div>

//       {/* Messages */}
//       {success && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-green-800 font-medium">{success}</span>
//           </div>
//         </div>
//       )}
      
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-red-800">{error}</span>
//           </div>
//         </div>
//       )}

//       {/* Unavailable Medicines Warning */}
//       {unavailableMedicines.length > 0 && (
//         <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex justify-between items-start mb-3">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.856-.833-2.586 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//               <span className="font-medium text-yellow-800">
//                 {unavailableMedicines.length} item{unavailableMedicines.length > 1 ? 's' : ''} not available
//               </span>
//             </div>
//             <button
//               onClick={removeUnavailableItems}
//               className="text-sm text-yellow-700 hover:text-yellow-900 font-medium"
//             >
//               Remove All
//             </button>
//           </div>
//           <ul className="text-sm text-yellow-700 space-y-2">
//             {unavailableMedicines.map(item => (
//               <li key={item._id} className="flex justify-between items-center">
//                 <div>
//                   <span className="font-medium">{item.name}</span>
//                   <span className="text-yellow-600 ml-2">(Qty: {item.quantity})</span>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-yellow-700 hover:text-yellow-900 text-sm"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <p className="text-sm text-yellow-600 mt-3">
//             These items are not available at the selected pharmacy and will not be included in your order.
//           </p>
//         </div>
//       )}

//       {/* Prescription Requirement Alert */}
//       {requiresPrescription && (
//         <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <div>
//               <p className="font-medium text-blue-800">Prescription Required</p>
//               <p className="text-sm text-blue-600 mt-1">
//                 One or more medicines in your order require a prescription. Please upload a clear image or PDF of your prescription below.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Column: Order Summary */}
//         <div>
//           {/* Pharmacy Selection */}
//           <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Select Pharmacy</h2>
//             <div className="space-y-3">
//               <label className="block text-sm font-medium text-gray-700">
//                 Delivery Pharmacy *
//               </label>
//               <select
//                 value={selectedPharmacy}
//                 onChange={(e) => handlePharmacyChange(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 disabled={loading}
//               >
//                 {pharmacies.map(pharmacy => (
//                   <option key={pharmacy._id} value={pharmacy._id}>
//                     {pharmacy.name} • {pharmacy.city} • {pharmacy.distance} • Delivery: {pharmacy.deliveryTime}
//                   </option>
//                 ))}
//               </select>
//               <p className="text-sm text-gray-500">
//                 Selected pharmacy will deliver your order in {pharmacies.find(p => p._id === selectedPharmacy)?.deliveryTime || '15-20 mins'}
//               </p>
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
//               <span className="text-sm text-gray-500">
//                 {availableMedicines.length} available of {cart.length} total
//               </span>
//             </div>
            
//             {availableMedicines.length > 0 ? (
//               <div className="space-y-4">
//                 {availableMedicines.map(item => (
//                   <div key={item._id} className="flex items-center p-4 bg-gray-50 rounded-lg">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-lg mr-4"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <h3 className="font-medium text-gray-800">{item.name}</h3>
//                         <span className="font-bold text-gray-900">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between mt-2">
//                         <div className="flex items-center space-x-3">
//                           <div className="flex items-center border border-gray-300 rounded">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                               className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
//                               disabled={loading}
//                             >
//                               -
//                             </button>
//                             <span className="w-8 text-center font-medium">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                               className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
//                               disabled={loading}
//                             >
//                               +
//                             </button>
//                           </div>
//                           <span className="text-gray-600">${item.price.toFixed(2)} each</span>
//                         </div>
//                         <button
//                           onClick={() => removeFromCart(item._id)}
//                           className="text-red-600 hover:text-red-800 text-sm font-medium"
//                           disabled={loading}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                       {item.prescriptionRequired && (
//                         <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
//                           Prescription Required
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p className="text-gray-600">No medicines available at selected pharmacy</p>
//                 <p className="text-gray-500 text-sm mt-1">Please select a different pharmacy</p>
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           {availableMedicines.length > 0 && (
//             <div className="bg-white rounded-xl shadow-sm border p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal ({availableMedicines.length} items)</span>
//                   <span className="font-medium">${totalPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Delivery Fee</span>
//                   <span className="font-medium">${deliveryCharge.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax (5%)</span>
//                   <span className="font-medium">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-3 mt-3">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total Amount</span>
//                     <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Column: Booking Form */}
//         <div>
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Patient & Delivery Information</h2>
            
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 {/* Personal Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         required
//                         value={patientInfo.name}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="John Doe"
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         required
//                         value={patientInfo.email}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                           emailError ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="john@example.com"
//                         disabled={loading}
//                       />
//                       {emailError && (
//                         <p className="text-red-500 text-sm mt-1">{emailError}</p>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number *
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         required
//                         value={patientInfo.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="03XX-XXXXXXX"
//                         pattern="[0-9]{11}"
//                         maxLength="11"
//                         disabled={loading}
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Payment Method *
//                       </label>
//                       <select
//                         value={selectedPayment}
//                         onChange={(e) => setSelectedPayment(e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         disabled={loading}
//                       >
//                         <option value="cod">Cash on Delivery</option>
//                         <option value="card">Credit/Debit Card</option>
//                         <option value="online">Online Payment</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Address</h3>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Complete Address *
//                     </label>
//                     <textarea
//                       name="address"
//                       required
//                       value={patientInfo.address}
//                       onChange={handleInputChange}
//                       rows="3"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="House #, Street, Sector, City"
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Delivery Instructions (Optional)
//                     </label>
//                     <textarea
//                       value={deliveryInstructions}
//                       onChange={(e) => setDeliveryInstructions(e.target.value)}
//                       rows="2"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="e.g., Call before delivery, Leave at gate, etc."
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Prescription Upload */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">
//                     Prescription {requiresPrescription ? '(Required)' : '(Optional)'}
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Upload Prescription File
//                       </label>
//                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//                         <input
//                           type="file"
//                           id="prescriptionFile"
//                           onChange={handleFileUpload}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                           className="hidden"
//                           disabled={loading}
//                         />
//                         <label htmlFor="prescriptionFile" className="cursor-pointer">
//                           <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                           </svg>
//                           <p className="text-gray-600">
//                             <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
//                           </p>
//                           <p className="text-gray-500 text-sm mt-1">
//                             JPG, PNG, or PDF (Max 5MB)
//                           </p>
//                         </label>
//                       </div>
                      
//                       {patientInfo.prescriptionFile && (
//                         <div className="mt-4 p-4 bg-blue-50 rounded-lg">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                               <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                               </svg>
//                               <div>
//                                 <p className="font-medium text-gray-800">{patientInfo.prescriptionFile.name}</p>
//                                 <p className="text-sm text-gray-500">
//                                   {(patientInfo.prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={removeFile}
//                               className="text-red-500 hover:text-red-700"
//                               disabled={loading}
//                             >
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Prescription Notes (Optional)
//                       </label>
//                       <textarea
//                         name="prescriptionNotes"
//                         value={patientInfo.prescriptionNotes}
//                         onChange={handleInputChange}
//                         rows="3"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Any special instructions or notes about the prescription..."
//                         disabled={loading}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Notes */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Information</h3>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Order Notes (Optional)
//                     </label>
//                     <textarea
//                       value={orderNotes}
//                       onChange={(e) => setOrderNotes(e.target.value)}
//                       rows="3"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Any additional information or special requests..."
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-4">
//                   <button
//                     type="submit"
//                     disabled={loading || availableMedicines.length === 0 || !!emailError}
//                     className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-colors ${
//                       loading || availableMedicines.length === 0 || emailError
//                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                         : 'bg-blue-600 text-white hover:bg-blue-700'
//                     }`}
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Processing Your Order...
//                       </span>
//                     ) : (
//                       `Place Order - $${finalTotal.toFixed(2)}`
//                     )}
//                   </button>
                  
//                   <p className="text-sm text-gray-500 text-center mt-4">
//                     By placing your order, you agree to our Terms of Service and Privacy Policy.
//                     Delivery time: {pharmacies.find(p => p._id === selectedPharmacy)?.deliveryTime || '15-20 mins'}
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;





//Medicine booking with phaarmacy validation
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const MedicineBooking = ({ cart, setCart }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     prescriptionNotes: '',
//     prescriptionFile: null
//   });
//   const [selectedPharmacy, setSelectedPharmacy] = useState('');
//   const [pharmacies, setPharmacies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [requiresPrescription, setRequiresPrescription] = useState(false);
//   const [availableMedicines, setAvailableMedicines] = useState([]);
//   const [unavailableMedicines, setUnavailableMedicines] = useState([]);
//   const formRef = useRef(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }

//     // Fetch pharmacies for selection
//     fetchPharmacies();
    
//     // Check if any medicine requires prescription
//     const hasPrescriptionRequired = cart.some(item => item.prescriptionRequired);
//     setRequiresPrescription(hasPrescriptionRequired);
//   }, [cart]);

//   // Fetch pharmacies and check medicine availability
//   const fetchPharmacies = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       const data = await response.json();
//       if (data.success && data.data.length > 0) {
//         setPharmacies(data.data);
//         const firstPharmacyId = data.data[0]._id;
//         setSelectedPharmacy(firstPharmacyId);
        
//         // Check medicine availability for the selected pharmacy
//         checkMedicineAvailability(firstPharmacyId);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//     }
//   };

//   // Check which medicines in cart are available at the selected pharmacy
//   const checkMedicineAvailability = async (pharmacyId) => {
//     try {
//       // Fetch medicines available at this pharmacy
//       const response = await fetch(`http://localhost:5000/api/medicines?pharmacyId=${pharmacyId}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const availableMedicineIds = data.data.map(medicine => medicine._id);
        
//         // Separate available and unavailable medicines
//         const available = [];
//         const unavailable = [];
        
//         cart.forEach(item => {
//           if (availableMedicineIds.includes(item._id)) {
//             available.push(item);
//           } else {
//             unavailable.push({
//               ...item,
//               reason: `Not available at selected pharmacy`
//             });
//           }
//         });
        
//         setAvailableMedicines(available);
//         setUnavailableMedicines(unavailable);
        
//         // Check prescription requirement from available medicines only
//         const hasPrescriptionRequired = available.some(item => item.prescriptionRequired);
//         setRequiresPrescription(hasPrescriptionRequired);
//       }
//     } catch (err) {
//       console.error('Error checking medicine availability:', err);
//     }
//   };

//   // Handle pharmacy change
//   const handlePharmacyChange = async (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     await checkMedicineAvailability(pharmacyId);
//   };

//   // Email validation
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Please enter a valid email address";
//     }
//     return '';
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'email') {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
      
//       if (value.trim()) {
//         const error = validateEmail(value);
//         setEmailError(error);
//       } else {
//         setEmailError('');
//       }
//     } else {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//       if (!validTypes.includes(file.type)) {
//         alert('Please upload a valid file (JPEG, PNG, or PDF only)');
//         e.target.value = '';
//         return;
//       }
      
//       const maxSize = 5 * 1024 * 1024;
//       if (file.size > maxSize) {
//         alert('File size should be less than 5MB');
//         e.target.value = '';
//         return;
//       }
      
//       setPatientInfo({
//         ...patientInfo,
//         prescriptionFile: file
//       });
//     }
//   };

//   const removeFile = () => {
//     setPatientInfo({
//       ...patientInfo,
//       prescriptionFile: null
//     });
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) fileInput.value = '';
//   };

//   const removeFromCart = (medicineId) => {
//     const updatedCart = cart.filter(item => item._id !== medicineId);
//     setCart(updatedCart);
//     checkMedicineAvailability(selectedPharmacy);
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cart.map(item =>
//       item._id === medicineId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(updatedCart);
//     checkMedicineAvailability(selectedPharmacy);
//   };

//   // Calculate totals based on AVAILABLE medicines only
//   const totalPrice = availableMedicines.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const deliveryCharge = 50;
//   const tax = totalPrice * 0.05;
//   const finalTotal = totalPrice + deliveryCharge + tax;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate email
//     if (patientInfo.email.trim()) {
//       const error = validateEmail(patientInfo.email);
//       if (error) {
//         setEmailError(error);
//         return;
//       }
//     }

//     // Validate required fields
//     if (!patientInfo.name || !patientInfo.email || !patientInfo.phone || !patientInfo.address) {
//       setError('Please fill all required fields');
//       return;
//     }

//     // Validate that we have available medicines
//     if (availableMedicines.length === 0) {
//       setError('No medicines available at selected pharmacy. Please select a different pharmacy or remove unavailable items.');
//       return;
//     }

//     // Validate pharmacy selection
//     if (!selectedPharmacy) {
//       setError('Please select a pharmacy');
//       return;
//     }

//     // Check prescription requirement
//     if (requiresPrescription && !patientInfo.prescriptionFile) {
//       const confirm = window.confirm(
//         'One or more medicines in your order require a prescription. Do you want to proceed without uploading a prescription?'
//       );
//       if (!confirm) {
//         return;
//       }
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Prepare order data using ONLY available medicines
//       const orderData = {
//         patient: JSON.stringify({
//           name: patientInfo.name,
//           email: patientInfo.email,
//           phone: patientInfo.phone,
//           address: patientInfo.address
//         }),
//         medicines: JSON.stringify(availableMedicines.map(item => ({
//           medicineId: item._id,
//           pharmacyId: selectedPharmacy,
//           quantity: item.quantity
//         }))),
//         prescriptionDetails: JSON.stringify({
//           notes: patientInfo.prescriptionNotes
//         }),
//         deliveryInfo: JSON.stringify({
//           address: patientInfo.address
//         }),
//         payment: JSON.stringify({
//           method: 'cod'
//         }),
//         pharmacyNotes: patientInfo.prescriptionNotes,
//         notes: patientInfo.prescriptionNotes
//       };

//       // Create FormData for file upload
//       const formData = new FormData();
      
//       // Add all order data as form fields
//       Object.keys(orderData).forEach(key => {
//         formData.append(key, orderData[key]);
//       });
      
//       // Add prescription file if exists
//       if (patientInfo.prescriptionFile) {
//         formData.append('prescription', patientInfo.prescriptionFile);
//       }

//       // Send order to backend with FormData (for file upload support)
//       const response = await fetch('http://localhost:5000/api/medicine-orders', {
//         method: 'POST',
//         body: formData
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccess(`Order placed successfully! Order ID: ${data.data._id}`);
        
//         // Clear cart and reset form
//         setCart([]);
//         setPatientInfo({
//           name: '',
//           email: '',
//           phone: '',
//           address: '',
//           prescriptionNotes: '',
//           prescriptionFile: null
//         });
//         setEmailError('');
//         setAvailableMedicines([]);
//         setUnavailableMedicines([]);
        
//         // Show success message for 5 seconds, then navigate
//         setTimeout(() => {
//           navigate('/orders-success', { state: { orderId: data.data._id } });
//         }, 5000);
//       } else {
//         // Handle prescription requirement error
//         if (data.requiresPrescription) {
//           setError(`${data.message}. Please upload a prescription.`);
//         } else {
//           setError(data.message || 'Failed to place order');
//         }
//       }
//     } catch (err) {
//       console.error('Error placing order:', err);
//       setError('Error placing order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   // Remove unavailable items from cart
//   const removeUnavailableItems = () => {
//     const updatedCart = cart.filter(item => 
//       availableMedicines.some(available => available._id === item._id)
//     );
//     setCart(updatedCart);
//     setUnavailableMedicines([]);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8">Book Your Medicines</h1>

//       {/* Unavailable Medicines Warning */}
//       {unavailableMedicines.length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex justify-between items-start mb-2">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="font-medium text-red-800">
//                 {unavailableMedicines.length} medicine{unavailableMedicines.length > 1 ? 's' : ''} not available at selected pharmacy
//               </span>
//             </div>
//             <button
//               onClick={removeUnavailableItems}
//               className="text-sm text-red-700 hover:text-red-900 underline"
//             >
//               Remove All
//             </button>
//           </div>
//           <ul className="text-sm text-red-600 space-y-1">
//             {unavailableMedicines.map(item => (
//               <li key={item._id} className="flex justify-between">
//                 <span>{item.name} (Qty: {item.quantity})</span>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-red-500 hover:text-red-700 ml-2"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <p className="text-sm text-red-600 mt-2">
//             These items will not be included in your order. Please select a different pharmacy or remove them.
//           </p>
//         </div>
//       )}

//       {/* Prescription Requirement Alert */}
//       {requiresPrescription && (
//         <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.856-.833-2.586 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//             <span className="font-medium text-yellow-800">
//               Note: Some medicines in your order require a prescription. Please upload it below.
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Success/Error Messages */}
//       {success && (
//         <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {success}
//           </div>
//         </div>
//       )}
      
//       {error && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {error}
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             Available Medicines at Selected Pharmacy
//             {availableMedicines.length > 0 && (
//               <span className="text-sm font-normal text-gray-500 ml-2">
//                 ({availableMedicines.length} of {cart.length} available)
//               </span>
//             )}
//           </h2>
          
//           {/* Pharmacy Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Pharmacy for Delivery *
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {pharmacies.map(pharmacy => (
//                 <option key={pharmacy._id} value={pharmacy._id}>
//                   {pharmacy.name} - {pharmacy.city} ({pharmacy.distance})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Available Medicines */}
//           {availableMedicines.length > 0 ? (
//             <div className="space-y-4 mb-6">
//               {availableMedicines.map(item => (
//                 <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                       <p className="text-gray-600">${item.price.toFixed(2)} each</p>
//                       {item.prescriptionRequired && (
//                         <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
//                           Prescription Required
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                         className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
//                         disabled={loading}
//                       >
//                         -
//                       </button>
//                       <span className="w-8 text-center font-medium">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                         className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
//                         disabled={loading}
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item._id)}
//                       className="text-red-600 hover:text-red-800"
//                       disabled={loading}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <div className="text-right mt-2">
//                     <span className="font-semibold">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
//               <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-gray-600">No medicines available at selected pharmacy.</p>
//               <p className="text-gray-500 text-sm mt-1">Please select a different pharmacy or remove unavailable items.</p>
//             </div>
//           )}
          
//           {/* Order Summary - Only for available medicines */}
//           {availableMedicines.length > 0 && (
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({availableMedicines.length} items):</span>
//                   <span>${totalPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery Charge:</span>
//                   <span>${deliveryCharge.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax (5%):</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-2 mt-2">
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Total:</span>
//                     <span>${finalTotal.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Booking Form - REST OF THE FORM STAYS THE SAME */}
//         {/* ... Your existing form code goes here ... */}
//         {/* Just make sure the submit button is disabled when no available medicines */}
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;














//Latest updated code with backend and frontend enhanced
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const MedicineBooking = ({ cart, setCart }) => {
//   const navigate = useNavigate();
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     prescription: '',
//     prescriptionFile: null
//   });
//   const [pharmacies, setPharmacies] = useState([]);
//   const [selectedPharmacy, setSelectedPharmacy] = useState('all');
//   const [filteredCart, setFilteredCart] = useState([]);
//   const [emailError, setEmailError] = useState('');
//   const formRef = useRef(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
    
//     // Fetch pharmacies
//     fetchPharmacies();
    
//     // Initialize filtered cart with all items
//     setFilteredCart(cart);
//   }, []);

//   // Update filtered cart when cart changes
//   useEffect(() => {
//     filterCartByPharmacy(selectedPharmacy);
//   }, [cart, selectedPharmacy]);

//   // Fetch pharmacies from backend
//   const fetchPharmacies = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       const data = await response.json();
      
//       if (data.success) {
//         setPharmacies(data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//     }
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     if (pharmacyId === 'all') {
//       setFilteredCart(cart);
//       return;
//     }
    
//     const filtered = cart.filter(item => {
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === pharmacyId) ||
//                  (pharmacy && pharmacy._id === pharmacyId);
//         });
//       }
      
//       return false;
//     });
    
//     setFilteredCart(filtered);
//   };

//   // Email validation function
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Please enter a valid email address (e.g., user@example.com)";
//     }
    
//     return '';
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'email') {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
      
//       // Validate email on change
//       if (value.trim()) {
//         const error = validateEmail(value);
//         setEmailError(error);
//       } else {
//         setEmailError('');
//       }
//     } else {
//       setPatientInfo({
//         ...patientInfo,
//         [name]: value
//       });
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
//       if (!validTypes.includes(file.type)) {
//         alert('Please upload a valid file (JPEG, PNG, or PDF only)');
//         e.target.value = ''; // Clear the input
//         return;
//       }
      
//       // Validate file size (max 5MB)
//       const maxSize = 5 * 1024 * 1024; // 5MB in bytes
//       if (file.size > maxSize) {
//         alert('File size should be less than 5MB');
//         e.target.value = ''; // Clear the input
//         return;
//       }
      
//       setPatientInfo({
//         ...patientInfo,
//         prescriptionFile: file
//       });
//     }
//   };

//   const removeFile = () => {
//     setPatientInfo({
//       ...patientInfo,
//       prescriptionFile: null
//     });
//     // Clear the file input
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) fileInput.value = '';
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(cart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCart(cart.map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   // Calculate total for filtered cart
//   const totalPrice = filteredCart.reduce((total, item) => total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
//   const deliveryCharge = 0; // Free delivery
//   const finalTotal = totalPrice + deliveryCharge;

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate email before submission
//     if (patientInfo.email.trim()) {
//       const error = validateEmail(patientInfo.email);
//       if (error) {
//         setEmailError(error);
//         return;
//       }
//     }
    
//     // Check if there are items in cart
//     if (cart.length === 0) {
//       alert('Your cart is empty. Please add medicines before booking.');
//       return;
//     }
    
//     // Prepare order data
//     const orderData = {
//       patientInfo,
//       cart: cart.map(item => ({
//         id: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price || item.discountedPrice || 0,
//         pharmacyIds: item.pharmacyIds || []
//       })),
//       total: finalTotal,
//       selectedPharmacy,
//       timestamp: new Date().toISOString()
//     };
    
//     // For demonstration, just show alert
//     let message = 'Booking confirmed! We will contact you soon.\n\n';
//     message += `Order Details:\n`;
//     message += `Name: ${patientInfo.name}\n`;
//     message += `Phone: ${patientInfo.phone}\n`;
//     message += `Address: ${patientInfo.address}\n`;
//     message += `Total: Rs. ${finalTotal.toFixed(2)}\n`;
//     message += `Items: ${cart.length}\n`;
    
//     if (patientInfo.prescriptionFile) {
//       message += `\nPrescription file uploaded: ${patientInfo.prescriptionFile.name}`;
//     }
    
//     alert(message);
    
//     // Clear cart and reset form
//     setCart([]);
//     setPatientInfo({
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       prescription: '',
//       prescriptionFile: null
//     });
//     setEmailError('');
//     setSelectedPharmacy('all');
    
//     // Navigate back to pharmacies page
//     navigate('/pharmacies');
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handlePharmacyChange = (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     filterCartByPharmacy(pharmacyId);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//         </svg>
//         Go Back
//       </button>

//       <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8">Book Your Medicines</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Medicines ({filteredCart.length})</h2>
          
//           {/* Pharmacy Filter Dropdown */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Filter by Pharmacy
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//             >
//               <option value="all">All Pharmacies ({cart.length} items)</option>
//               {pharmacies.map(pharmacy => {
//                 const pharmacyItems = cart.filter(item => 
//                   item.pharmacyIds && item.pharmacyIds.includes(pharmacy._id)
//                 ).length;
                
//                 if (pharmacyItems > 0) {
//                   return (
//                     <option key={pharmacy._id} value={pharmacy._id}>
//                       {pharmacy.name} ({pharmacyItems} items)
//                     </option>
//                   );
//                 }
//                 return null;
//               }).filter(Boolean)}
//             </select>
//             <p className="text-sm text-gray-500 mt-1">
//               Showing {filteredCart.length} of {cart.length} items
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             {filteredCart.map(item => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                     }}
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                     <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
//                     {item.pharmacyIds && item.pharmacyIds.length > 0 && (
//                       <p className="text-xs text-gray-500">
//                         From {pharmacies.find(p => p._id === item.pharmacyIds[0])?.name || 'pharmacy'}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-600 hover:text-red-800 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <div className="text-right mt-2">
//                   <span className="font-semibold">
//                     Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span>Subtotal ({filteredCart.length} items):</span>
//                 <span>Rs. {totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Delivery Charge:</span>
//                 <span className="text-green-600">Free</span>
//               </div>
//               <div className="border-t pt-2 mt-2">
//                 <div className="flex justify-between items-center text-xl font-bold">
//                   <span>Total:</span>
//                   <span>Rs. {finalTotal.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={patientInfo.name}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//                   placeholder="Enter your full name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={patientInfo.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors ${
//                     emailError ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="example@gmail.com"
//                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   title="Please enter a valid email address (e.g., user@example.com)"
//                 />
//                 {emailError && (
//                   <p className="text-red-500 text-xs mt-1">{emailError}</p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1">
//                   Format: name@domain.com (e.g., user@gmail.com)
//                 </p>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   placeholder="03XXXXXXXXX"
//                   value={patientInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//                   maxLength="11"
//                   pattern="[0-9]{11}"
//                   inputMode="numeric"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Format: 03XXXXXXXXX (11 digits)</p>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   required
//                   value={patientInfo.address}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//                   placeholder="House #, Street, Area, City"
//                 />
//               </div>
              
//               {/* Prescription Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Upload Prescription (Optional)
//                 </label>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="file"
//                       id="prescriptionFile"
//                       onChange={handleFileUpload}
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//                     />
//                   </div>
//                   {patientInfo.prescriptionFile && (
//                     <div className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-200">
//                       <div className="flex items-center space-x-2">
//                         <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                         <span className="text-sm text-gray-700">
//                           {patientInfo.prescriptionFile.name}
//                           <span className="text-xs text-gray-500 ml-2">
//                             ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   )}
//                   <p className="text-xs text-gray-500">
//                     Supported formats: JPG, PNG, PDF (Max 5MB)
//                   </p>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Notes (Optional)
//                 </label>
//                 <textarea
//                   name="prescription"
//                   value={patientInfo.prescription}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//                   placeholder="Any additional prescription details, doctor's notes, or special instructions..."
//                 />
//               </div>
//             </div>
            
//             <div className="flex gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={!!emailError || filteredCart.length === 0}
//                 className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
//                   emailError || filteredCart.length === 0
//                     ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Confirm Order - Rs. {finalTotal.toFixed(2)}
//               </button>
//             </div>
            
//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Note: Your order will be processed and delivered from the respective pharmacies based on item availability.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;

























//---------------------New logic------------------
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MedicineBooking = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    prescription: '',
    prescriptionFile: null
  });
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState('all');
  const [filteredCart, setFilteredCart] = useState([]);
  const [emailError, setEmailError] = useState('');
  const formRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fetch pharmacies
    fetchPharmacies();
    
    // Initialize filtered cart with all items
    setFilteredCart(cart);
  }, []);

  // Update filtered cart when cart changes
  useEffect(() => {
    filterCartByPharmacy(selectedPharmacy);
  }, [cart, selectedPharmacy]);

  // Fetch pharmacies from backend
  const fetchPharmacies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pharmacies');
      const data = await response.json();
      
      if (data.success) {
        setPharmacies(data.data);
      }
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
    }
  };

  // Get unique pharmacies from cart items
  const getUniquePharmaciesFromCart = () => {
    const pharmacyMap = new Map();
    
    cart.forEach(item => {
      // Check for pharmacyIds array
      if (item.pharmacyIds && item.pharmacyIds.length > 0) {
        item.pharmacyIds.forEach(pharmacyId => {
          if (!pharmacyMap.has(pharmacyId)) {
            const pharmacy = pharmacies.find(p => p._id === pharmacyId);
            if (pharmacy) {
              pharmacyMap.set(pharmacyId, pharmacy);
            }
          }
        });
      }
      
      // Check for pharmacy object directly on item
      if (item.pharmacy && item.pharmacy._id) {
        if (!pharmacyMap.has(item.pharmacy._id)) {
          pharmacyMap.set(item.pharmacy._id, item.pharmacy);
        }
      }
      
      // Check for pharmacyId directly on item
      if (item.pharmacyId) {
        if (!pharmacyMap.has(item.pharmacyId)) {
          const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
          if (pharmacy) {
            pharmacyMap.set(item.pharmacyId, pharmacy);
          }
        }
      }
    });
    
    return Array.from(pharmacyMap.values());
  };

  // Filter cart items by selected pharmacy
  const filterCartByPharmacy = (pharmacyId) => {
    if (pharmacyId === 'all') {
      setFilteredCart(cart);
      return;
    }
    
    const filtered = cart.filter(item => {
      // Check pharmacyIds array
      if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
        return true;
      }
      
      // Check pharmacy object
      if (item.pharmacy && item.pharmacy._id === pharmacyId) {
        return true;
      }
      
      // Check pharmacyId directly
      if (item.pharmacyId === pharmacyId) {
        return true;
      }
      
      // Check availableAtPharmacies array
      if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
        return item.availableAtPharmacies.some(pharmacy => {
          return (typeof pharmacy === 'string' && pharmacy === pharmacyId) ||
                 (pharmacy && pharmacy._id === pharmacyId);
        });
      }
      
      return false;
    });
    
    setFilteredCart(filtered);
  };

  // Get pharmacy name for an item
  const getPharmacyNameForItem = (item) => {
    // Check pharmacy object directly
    if (item.pharmacy && item.pharmacy.name) {
      return item.pharmacy.name;
    }
    
    // Check pharmacyId and find in pharmacies list
    if (item.pharmacyId) {
      const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
      return pharmacy ? pharmacy.name : 'Pharmacy';
    }
    
    // Check pharmacyIds array
    if (item.pharmacyIds && item.pharmacyIds.length > 0) {
      const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
      return pharmacy ? pharmacy.name : 'Pharmacy';
    }
    
    return 'Pharmacy';
  };

  // Get pharmacy ID for an item
  const getPharmacyIdForItem = (item) => {
    if (item.pharmacy && item.pharmacy._id) {
      return item.pharmacy._id;
    }
    if (item.pharmacyId) {
      return item.pharmacyId;
    }
    if (item.pharmacyIds && item.pharmacyIds.length > 0) {
      return item.pharmacyIds[0];
    }
    return null;
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., user@example.com)";
    }
    
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setPatientInfo({
        ...patientInfo,
        [name]: value
      });
      
      // Validate email on change
      if (value.trim()) {
        const error = validateEmail(value);
        setEmailError(error);
      } else {
        setEmailError('');
      }
    } else {
      setPatientInfo({
        ...patientInfo,
        [name]: value
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid file (JPEG, PNG, or PDF only)');
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('File size should be less than 5MB');
        e.target.value = ''; // Clear the input
        return;
      }
      
      setPatientInfo({
        ...patientInfo,
        prescriptionFile: file
      });
    }
  };

  const removeFile = () => {
    setPatientInfo({
      ...patientInfo,
      prescriptionFile: null
    });
    // Clear the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === medicineId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate total for filtered cart
  const totalPrice = filteredCart.reduce((total, item) => total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
  const deliveryCharge = 0; // Free delivery
  const finalTotal = totalPrice + deliveryCharge;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email before submission
    if (patientInfo.email.trim()) {
      const error = validateEmail(patientInfo.email);
      if (error) {
        setEmailError(error);
        return;
      }
    }
    
    // Check if there are items in cart
    if (cart.length === 0) {
      alert('Your cart is empty. Please add medicines before booking.');
      return;
    }
    
    // Prepare order data
    const orderData = {
      patientInfo,
      cart: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price || item.discountedPrice || 0,
        pharmacyIds: item.pharmacyIds || [],
        pharmacy: item.pharmacy || null,
        pharmacyId: item.pharmacyId || null
      })),
      total: finalTotal,
      selectedPharmacy,
      timestamp: new Date().toISOString()
    };
    
    // For demonstration, just show alert
    let message = 'Booking confirmed! We will contact you soon.\n\n';
    message += `Order Details:\n`;
    message += `Name: ${patientInfo.name}\n`;
    message += `Phone: ${patientInfo.phone}\n`;
    message += `Address: ${patientInfo.address}\n`;
    message += `Total: Rs. ${finalTotal.toFixed(2)}\n`;
    message += `Items: ${cart.length}\n`;
    
    // Show pharmacy breakdown
    const uniquePharmacies = getUniquePharmaciesFromCart();
    if (uniquePharmacies.length > 0) {
      message += `\nPharmacies in your order:\n`;
      uniquePharmacies.forEach(pharmacy => {
        const pharmacyItems = cart.filter(item => {
          const itemPharmacyId = getPharmacyIdForItem(item);
          return itemPharmacyId === pharmacy._id;
        }).length;
        message += `- ${pharmacy.name}: ${pharmacyItems} items\n`;
      });
    }
    
    if (patientInfo.prescriptionFile) {
      message += `\nPrescription file uploaded: ${patientInfo.prescriptionFile.name}`;
    }
    
    alert(message);
    
    // Clear cart and reset form
    setCart([]);
    setPatientInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      prescription: '',
      prescriptionFile: null
    });
    setEmailError('');
    setSelectedPharmacy('all');
    
    // Navigate back to pharmacies page
    navigate('/pharmacies');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePharmacyChange = (pharmacyId) => {
    setSelectedPharmacy(pharmacyId);
    filterCartByPharmacy(pharmacyId);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/pharmacies')}
          className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Pharmacies
        </button>
      </div>
    );
  }

  // Get unique pharmacies from cart
  const cartPharmacies = getUniquePharmaciesFromCart();

  return (
    <div ref={formRef} className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go Back
      </button>

      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-8">Book Your Medicines</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Selected Medicines */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Medicines ({filteredCart.length})</h2>
          
          {/* Pharmacy Filter Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Pharmacy to Order From
            </label>
            <select
              value={selectedPharmacy}
              onChange={(e) => handlePharmacyChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
            >
              <option value="all">All Pharmacies ({cart.length} items)</option>
              {cartPharmacies.map(pharmacy => {
                // Count items for this pharmacy
                const pharmacyItems = cart.filter(item => {
                  const itemPharmacyId = getPharmacyIdForItem(item);
                  return itemPharmacyId === pharmacy._id;
                }).length;
                
                return (
                  <option key={pharmacy._id} value={pharmacy._id}>
                    {pharmacy.name} ({pharmacyItems} items)
                  </option>
                );
              })}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              {selectedPharmacy === 'all' 
                ? `Showing all ${cart.length} items from ${cartPharmacies.length} pharmacies`
                : `Showing ${filteredCart.length} items from ${pharmacies.find(p => p._id === selectedPharmacy)?.name || 'selected pharmacy'}`
              }
            </p>
          </div>
          
          <div className="space-y-4">
            {filteredCart.map(item => {
              const pharmacyName = getPharmacyNameForItem(item);
              
              return (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
                        {/* Pharmacy Tag */}
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {pharmacyName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right mt-2">
                    <span className="font-semibold">
                      Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Pharmacy Summary */}
          {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Order Summary by Pharmacy:</h3>
              <div className="space-y-2">
                {cartPharmacies.map(pharmacy => {
                  const pharmacyItems = cart.filter(item => {
                    const itemPharmacyId = getPharmacyIdForItem(item);
                    return itemPharmacyId === pharmacy._id;
                  });
                  
                  const pharmacyTotal = pharmacyItems.reduce((total, item) => 
                    total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
                  
                  return (
                    <div key={pharmacy._id} className="flex justify-between items-center text-sm">
                      <span>{pharmacy.name}:</span>
                      <span>{pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Subtotal ({filteredCart.length} items):</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charge:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>Rs. {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Information</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={patientInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={patientInfo.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@gmail.com"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address (e.g., user@example.com)"
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Format: name@domain.com (e.g., user@gmail.com)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="03XXXXXXXXX"
                  value={patientInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
                  maxLength="11"
                  pattern="[0-9]{11}"
                  inputMode="numeric"
                />
                <p className="text-xs text-gray-500 mt-1">Format: 03XXXXXXXXX (11 digits)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  required
                  value={patientInfo.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
                  placeholder="House #, Street, Area, City"
                />
              </div>
              
              {/* Prescription Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Prescription (Optional)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="prescriptionFile"
                      onChange={handleFileUpload}
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
                    />
                  </div>
                  {patientInfo.prescriptionFile && (
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">
                          {patientInfo.prescriptionFile.name}
                          <span className="text-xs text-gray-500 ml-2">
                            ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
                          </span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="prescription"
                  value={patientInfo.prescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
                  placeholder="Any additional prescription details, doctor's notes, or special instructions..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!!emailError || filteredCart.length === 0}
                className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
                  emailError || filteredCart.length === 0
                    ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                    : 'bg-[var(--primary-color)] text-white hover:bg-blue-700'
                }`}
              >
                Confirm Order - Rs. {finalTotal.toFixed(2)}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              Note: Your order will be processed and delivered from the respective pharmacies based on item availability.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicineBooking;