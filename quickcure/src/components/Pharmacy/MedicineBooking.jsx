//---------------------Working perfect friday 23 1 2026------------------
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

//   // Get unique pharmacies from cart items
//   const getUniquePharmaciesFromCart = () => {
//     const pharmacyMap = new Map();
    
//     cart.forEach(item => {
//       // Check for pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//         item.pharmacyIds.forEach(pharmacyId => {
//           if (!pharmacyMap.has(pharmacyId)) {
//             const pharmacy = pharmacies.find(p => p._id === pharmacyId);
//             if (pharmacy) {
//               pharmacyMap.set(pharmacyId, pharmacy);
//             }
//           }
//         });
//       }
      
//       // Check for pharmacy object directly on item
//       if (item.pharmacy && item.pharmacy._id) {
//         if (!pharmacyMap.has(item.pharmacy._id)) {
//           pharmacyMap.set(item.pharmacy._id, item.pharmacy);
//         }
//       }
      
//       // Check for pharmacyId directly on item
//       if (item.pharmacyId) {
//         if (!pharmacyMap.has(item.pharmacyId)) {
//           const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//           if (pharmacy) {
//             pharmacyMap.set(item.pharmacyId, pharmacy);
//           }
//         }
//       }
//     });
    
//     return Array.from(pharmacyMap.values());
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     if (pharmacyId === 'all') {
//       setFilteredCart(cart);
//       return;
//     }
    
//     const filtered = cart.filter(item => {
//       // Check pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       // Check pharmacy object
//       if (item.pharmacy && item.pharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       // Check pharmacyId directly
//       if (item.pharmacyId === pharmacyId) {
//         return true;
//       }
      
//       // Check availableAtPharmacies array
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

//   // Get pharmacy name for an item
//   const getPharmacyNameForItem = (item) => {
//     // Check pharmacy object directly
//     if (item.pharmacy && item.pharmacy.name) {
//       return item.pharmacy.name;
//     }
    
//     // Check pharmacyId and find in pharmacies list
//     if (item.pharmacyId) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     // Check pharmacyIds array
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     return 'Pharmacy';
//   };

//   // Get pharmacy ID for an item
//   const getPharmacyIdForItem = (item) => {
//     if (item.pharmacy && item.pharmacy._id) {
//       return item.pharmacy._id;
//     }
//     if (item.pharmacyId) {
//       return item.pharmacyId;
//     }
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       return item.pharmacyIds[0];
//     }
//     return null;
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
//         pharmacyIds: item.pharmacyIds || [],
//         pharmacy: item.pharmacy || null,
//         pharmacyId: item.pharmacyId || null
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
    
//     // Show pharmacy breakdown
//     const uniquePharmacies = getUniquePharmaciesFromCart();
//     if (uniquePharmacies.length > 0) {
//       message += `\nPharmacies in your order:\n`;
//       uniquePharmacies.forEach(pharmacy => {
//         const pharmacyItems = cart.filter(item => {
//           const itemPharmacyId = getPharmacyIdForItem(item);
//           return itemPharmacyId === pharmacy._id;
//         }).length;
//         message += `- ${pharmacy.name}: ${pharmacyItems} items\n`;
//       });
//     }
    
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
//           className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   // Get unique pharmacies from cart
//   const cartPharmacies = getUniquePharmaciesFromCart();

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
//               Select Pharmacy to Order From
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//             >
//               <option value="all">All Pharmacies ({cart.length} items)</option>
//               {cartPharmacies.map(pharmacy => {
//                 // Count items for this pharmacy
//                 const pharmacyItems = cart.filter(item => {
//                   const itemPharmacyId = getPharmacyIdForItem(item);
//                   return itemPharmacyId === pharmacy._id;
//                 }).length;
                
//                 return (
//                   <option key={pharmacy._id} value={pharmacy._id}>
//                     {pharmacy.name} ({pharmacyItems} items)
//                   </option>
//                 );
//               })}
//             </select>
//             <p className="text-sm text-gray-500 mt-1">
//               {selectedPharmacy === 'all' 
//                 ? `Showing all ${cart.length} items from ${cartPharmacies.length} pharmacies`
//                 : `Showing ${filteredCart.length} items from ${pharmacies.find(p => p._id === selectedPharmacy)?.name || 'selected pharmacy'}`
//               }
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             {filteredCart.map(item => {
//               const pharmacyName = getPharmacyNameForItem(item);
              
//               return (
//                 <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                       }}
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                       <div className="flex items-center gap-2">
//                         <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
//                         {/* Pharmacy Tag */}
//                         <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                           {pharmacyName}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                       >
//                         -
//                       </button>
//                       <span className="w-8 text-center font-medium">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-600 hover:text-red-800 transition-colors"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <div className="text-right mt-2">
//                     <span className="font-semibold">
//                       Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Pharmacy Summary */}
//           {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
//             <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//               <h3 className="font-medium text-gray-700 mb-2">Order Summary by Pharmacy:</h3>
//               <div className="space-y-2">
//                 {cartPharmacies.map(pharmacy => {
//                   const pharmacyItems = cart.filter(item => {
//                     const itemPharmacyId = getPharmacyIdForItem(item);
//                     return itemPharmacyId === pharmacy._id;
//                   });
                  
//                   const pharmacyTotal = pharmacyItems.reduce((total, item) => 
//                     total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
                  
//                   return (
//                     <div key={pharmacy._id} className="flex justify-between items-center text-sm">
//                       <span>{pharmacy.name}:</span>
//                       <span>{pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
          
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
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
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


















// -------------------New logic-------
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaTrash, FaFileUpload, FaFilePdf, FaTimes, FaPlus, FaMinus, FaCheckCircle, FaReceipt, FaHistory } from 'react-icons/fa';

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
//   const [orders, setOrders] = useState([]);
//   const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loadingPharmacies, setLoadingPharmacies] = useState(false);
//   const [pharmacyError, setPharmacyError] = useState(null);
//   const formRef = useRef(null);

//   // Load orders from localStorage on component mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
    
//     // Initialize filtered cart with all items
//     setFilteredCart(cart);
    
//     // Load saved orders from localStorage
//     const savedOrders = localStorage.getItem('medicineOrders');
//     if (savedOrders) {
//       try {
//         setOrders(JSON.parse(savedOrders));
//       } catch (error) {
//         console.error('Error parsing saved orders:', error);
//       }
//     }
    
//     // Fetch pharmacies
//     fetchPharmacies();
//   }, []);

//   // Save orders to localStorage whenever orders change
//   useEffect(() => {
//     localStorage.setItem('medicineOrders', JSON.stringify(orders));
//   }, [orders]);

//   // Update filtered cart when cart changes
//   useEffect(() => {
//     filterCartByPharmacy(selectedPharmacy);
//   }, [cart, selectedPharmacy]);

//   // Generate unique order number
//   const generateOrderNumber = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 1000);
//     return `ORD-${timestamp}-${random}`;
//   };

//   // Fetch pharmacies from backend - WITH ERROR HANDLING
//   const fetchPharmacies = async () => {
//     setLoadingPharmacies(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       if (data.success) {
//         setPharmacies(data.data);
//         setPharmacyError(null);
//       } else {
//         setPharmacyError('Failed to load pharmacies. Using default data.');
//         // Use fallback pharmacies if API fails
//         setPharmacies([
//           { _id: 'pharma1', name: 'City Pharmacy' },
//           { _id: 'pharma2', name: 'Medicare Center' },
//           { _id: 'pharma3', name: 'Health Plus' }
//         ]);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setPharmacyError('Cannot connect to server. Using offline mode.');
//       // Use fallback pharmacies for offline mode
//       setPharmacies([
//         { _id: 'pharma1', name: 'City Pharmacy' },
//         { _id: 'pharma2', name: 'Medicare Center' },
//         { _id: 'pharma3', name: 'Health Plus' }
//       ]);
//     } finally {
//       setLoadingPharmacies(false);
//     }
//   };

//   // Get unique pharmacies from cart items - FIXED VERSION
//   const getUniquePharmaciesFromCart = () => {
//     const pharmacyMap = new Map();
    
//     cart.forEach(item => {
//       // Check for pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//         item.pharmacyIds.forEach(pharmacyId => {
//           if (!pharmacyMap.has(pharmacyId)) {
//             const pharmacy = pharmacies.find(p => p._id === pharmacyId);
//             if (pharmacy) {
//               pharmacyMap.set(pharmacyId, pharmacy);
//             } else {
//               // Create a dummy pharmacy if not found
//               pharmacyMap.set(pharmacyId, { 
//                 _id: pharmacyId, 
//                 name: 'Local Pharmacy' 
//               });
//             }
//           }
//         });
//       }
      
//       // Check for pharmacy object directly on item
//       if (item.pharmacy && item.pharmacy._id) {
//         if (!pharmacyMap.has(item.pharmacy._id)) {
//           pharmacyMap.set(item.pharmacy._id, item.pharmacy);
//         }
//       }
      
//       // Check for pharmacyId directly on item - FIXED: Changed pharmacyId to item.pharmacyId
//       if (item.pharmacyId) {
//         if (!pharmacyMap.has(item.pharmacyId)) {
//           const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//           if (pharmacy) {
//             pharmacyMap.set(item.pharmacyId, pharmacy);
//           } else {
//             // Create a dummy pharmacy if not found
//             pharmacyMap.set(item.pharmacyId, { 
//               _id: item.pharmacyId, 
//               name: 'Local Pharmacy' 
//             });
//           }
//         }
//       }
//     });
    
//     return Array.from(pharmacyMap.values());
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     if (pharmacyId === 'all') {
//       setFilteredCart(cart);
//       return;
//     }
    
//     const filtered = cart.filter(item => {
//       // Check pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       // Check pharmacy object
//       if (item.pharmacy && item.pharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       // Check pharmacyId directly
//       if (item.pharmacyId === pharmacyId) {
//         return true;
//       }
      
//       // Check availableAtPharmacies array
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

//   // Get pharmacy name for an item
//   const getPharmacyNameForItem = (item) => {
//     // Check pharmacy object directly
//     if (item.pharmacy && item.pharmacy.name) {
//       return item.pharmacy.name;
//     }
    
//     // Check pharmacyId and find in pharmacies list
//     if (item.pharmacyId) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     // Check pharmacyIds array
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     return 'Pharmacy';
//   };

//   // Get pharmacy ID for an item
//   const getPharmacyIdForItem = (item) => {
//     if (item.pharmacy && item.pharmacy._id) {
//       return item.pharmacy._id;
//     }
//     if (item.pharmacyId) {
//       return item.pharmacyId;
//     }
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       return item.pharmacyIds[0];
//     }
//     return null;
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
    
//     // Generate order number
//     const orderNumber = generateOrderNumber();
    
//     // Prepare order data
//     const orderData = {
//       orderNumber,
//       patientInfo: { ...patientInfo },
//       cart: cart.map(item => ({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         quantity: item.quantity,
//         price: item.price || item.discountedPrice || 0,
//         pharmacyIds: item.pharmacyIds || [],
//         pharmacy: item.pharmacy || null,
//         pharmacyId: item.pharmacyId || null
//       })),
//       total: finalTotal,
//       selectedPharmacy,
//       status: 'Processing',
//       date: new Date().toLocaleString(),
//       timestamp: new Date().toISOString()
//     };
    
//     // Save order to state and localStorage
//     setOrders(prevOrders => [orderData, ...prevOrders]);
    
//     // Set current order for confirmation modal
//     setCurrentOrder(orderData);
    
//     // Show order confirmation
//     setShowOrderConfirmation(true);
    
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
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handlePharmacyChange = (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     filterCartByPharmacy(pharmacyId);
//   };

//   const closeOrderConfirmation = () => {
//     setShowOrderConfirmation(false);
//     setCurrentOrder(null);
//     navigate('/pharmacies');
//   };

//   const viewOrderHistory = () => {
//     navigate('/orders');
//   };

//   // Fallback for cart if it's undefined
//   const safeCart = cart || [];

//   if (safeCart.length === 0 && !showOrderConfirmation) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   // Get unique pharmacies from cart
//   const cartPharmacies = getUniquePharmaciesFromCart();

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {/* Order Confirmation Modal */}
//       {showOrderConfirmation && currentOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaCheckCircle className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
//                 <p className="text-gray-600">Your order has been placed successfully</p>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                 <div className="text-center mb-4">
//                   <p className="text-sm text-gray-500">Order Number</p>
//                   <p className="text-xl font-bold text-[var(--primary-color)]">{currentOrder.orderNumber}</p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Patient Name:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Phone:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.phone}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Amount:</span>
//                     <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className="font-medium text-green-600">{currentOrder.status}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Date:</span>
//                     <span className="font-medium">{currentOrder.date}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 <button
//                   onClick={closeOrderConfirmation}
//                   className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold"
//                 >
//                   Continue Shopping
//                 </button>
//                 <button
//                   onClick={viewOrderHistory}
//                   className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2"
//                 >
//                   <FaHistory /> View Order History
//                 </button>
//                 <p className="text-sm text-gray-500 text-center mt-4">
//                   You can view your order details anytime in the Order History section
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6"
//       >
//         <FaArrowLeft className="w-5 h-5 mr-2" />
//         Go Back
//       </button>

//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//         <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4 lg:mb-0">Book Your Medicines</h1>
//         {orders.length > 0 && (
//           <button
//             onClick={viewOrderHistory}
//             className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800"
//           >
//             <FaReceipt className="w-5 h-5 mr-2" />
//             View Order History ({orders.length})
//           </button>
//         )}
//       </div>

//       {/* Pharmacy Loading/Error Messages */}
//       {loadingPharmacies && (
//         <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
//           Loading pharmacy information...
//         </div>
//       )}
      
//       {pharmacyError && (
//         <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg">
//           {pharmacyError} You can still place your order.
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Medicines ({filteredCart.length})</h2>
          
//           {/* Pharmacy Filter Dropdown */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Pharmacy to Order From
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors"
//             >
//               <option value="all">All Pharmacies ({safeCart.length} items)</option>
//               {cartPharmacies.map(pharmacy => {
//                 // Count items for this pharmacy
//                 const pharmacyItems = safeCart.filter(item => {
//                   const itemPharmacyId = getPharmacyIdForItem(item);
//                   return itemPharmacyId === pharmacy._id;
//                 }).length;
                
//                 return (
//                   <option key={pharmacy._id} value={pharmacy._id}>
//                     {pharmacy.name} ({pharmacyItems} items)
//                   </option>
//                 );
//               })}
//             </select>
//             <p className="text-sm text-gray-500 mt-1">
//               {selectedPharmacy === 'all' 
//                 ? `Showing all ${safeCart.length} items from ${cartPharmacies.length} pharmacies`
//                 : `Showing ${filteredCart.length} items from ${pharmacies.find(p => p._id === selectedPharmacy)?.name || 'selected pharmacy'}`
//               }
//             </p>
//           </div>
          
//           {filteredCart.length === 0 ? (
//             <div className="text-center py-8 bg-gray-50 rounded-lg">
//               <p className="text-gray-600">No items found for the selected pharmacy.</p>
//               <button
//                 onClick={() => handlePharmacyChange('all')}
//                 className="mt-2 text-[var(--primary-color)] hover:text-blue-800"
//               >
//                 Show all items
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {filteredCart.map(item => {
//                   const pharmacyName = getPharmacyNameForItem(item);
                  
//                   return (
//                     <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
//                             <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
//                             {/* Pharmacy Tag */}
//                             <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full self-start">
//                               {pharmacyName}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaMinus className="w-3 h-3" />
//                             </button>
//                             <span className="w-8 text-center font-medium">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaPlus className="w-3 h-3" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-600 hover:text-red-800 transition-colors ml-4 sm:ml-0"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                       <div className="text-right mt-2">
//                         <span className="font-semibold">
//                           Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Pharmacy Summary */}
//               {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
//                 <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                   <h3 className="font-medium text-gray-700 mb-2">Order Summary by Pharmacy:</h3>
//                   <div className="space-y-2">
//                     {cartPharmacies.map(pharmacy => {
//                       const pharmacyItems = safeCart.filter(item => {
//                         const itemPharmacyId = getPharmacyIdForItem(item);
//                         return itemPharmacyId === pharmacy._id;
//                       });
                      
//                       const pharmacyTotal = pharmacyItems.reduce((total, item) => 
//                         total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
                      
//                       return (
//                         <div key={pharmacy._id} className="flex justify-between items-center text-sm">
//                           <span className="truncate mr-2">{pharmacy.name}:</span>
//                           <span className="whitespace-nowrap">{pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Subtotal ({filteredCart.length} items):</span>
//                     <span>Rs. {totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Delivery Charge:</span>
//                     <span className="text-green-600">Free</span>
//                   </div>
//                   <div className="border-t pt-2 mt-2">
//                     <div className="flex justify-between items-center text-xl font-bold">
//                       <span>Total:</span>
//                       <span>Rs. {finalTotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
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
//                       <div className="flex items-center space-x-2 min-w-0">
//                         {patientInfo.prescriptionFile.type === 'application/pdf' ? (
//                           <FaFilePdf className="w-5 h-5 text-red-500 flex-shrink-0" />
//                         ) : (
//                           <FaFileUpload className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                         )}
//                         <span className="text-sm text-gray-700 truncate">
//                           {patientInfo.prescriptionFile.name}
//                           <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
//                             ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
//                       >
//                         <FaTimes className="w-5 h-5" />
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
            
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
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
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                 }`}
//               >
//                 Confirm Order - Rs. {finalTotal.toFixed(2)}
//               </button>
//             </div>
            
//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Note: Your order will be processed and delivered from the respective pharmacies based on item availability.
//               You'll receive a unique order number to track your order.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;















//    cart persisitance fix
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaTrash, FaFileUpload, FaFilePdf, FaTimes, FaPlus, FaMinus, FaCheckCircle, FaReceipt, FaHistory } from 'react-icons/fa';

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
//   const [orders, setOrders] = useState([]);
//   const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loadingPharmacies, setLoadingPharmacies] = useState(false);
//   const [pharmacyError, setPharmacyError] = useState(null);
//   const formRef = useRef(null);

//   // Load cart and orders from localStorage on component mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
    
//     // Load saved cart from localStorage
//     const savedCart = localStorage.getItem('medicineCart');
//     if (savedCart && (!cart || cart.length === 0)) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         setCart(parsedCart);
//       } catch (error) {
//         console.error('Error parsing saved cart:', error);
//       }
//     }
    
//     // Load saved orders from localStorage
//     const savedOrders = localStorage.getItem('medicineOrders');
//     if (savedOrders) {
//       try {
//         setOrders(JSON.parse(savedOrders));
//       } catch (error) {
//         console.error('Error parsing saved orders:', error);
//       }
//     }
    
//     // Fetch pharmacies
//     fetchPharmacies();
//   }, []);

//   // Save cart to localStorage whenever cart changes
//   useEffect(() => {
//     if (cart && cart.length > 0) {
//       localStorage.setItem('medicineCart', JSON.stringify(cart));
//     } else {
//       localStorage.removeItem('medicineCart');
//     }
//   }, [cart]);

//   // Save orders to localStorage whenever orders change
//   useEffect(() => {
//     localStorage.setItem('medicineOrders', JSON.stringify(orders));
//   }, [orders]);

//   // Initialize filtered cart when cart changes
//   useEffect(() => {
//     const safeCart = cart || [];
//     setFilteredCart(safeCart);
//     filterCartByPharmacy(selectedPharmacy);
//   }, [cart, selectedPharmacy]);

//   // Generate unique order number
//   const generateOrderNumber = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 1000);
//     return `ORD-${timestamp}-${random}`;
//   };

//   // Fetch pharmacies from backend - WITH ERROR HANDLING
//   const fetchPharmacies = async () => {
//     setLoadingPharmacies(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       if (data.success) {
//         setPharmacies(data.data);
//         setPharmacyError(null);
//       } else {
//         setPharmacyError('Failed to load pharmacies. Using default data.');
//         // Use fallback pharmacies if API fails
//         setPharmacies([
//           { _id: 'pharma1', name: 'City Pharmacy' },
//           { _id: 'pharma2', name: 'Medicare Center' },
//           { _id: 'pharma3', name: 'Health Plus' }
//         ]);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setPharmacyError('Cannot connect to server. Using offline mode.');
//       // Use fallback pharmacies for offline mode
//       setPharmacies([
//         { _id: 'pharma1', name: 'City Pharmacy' },
//         { _id: 'pharma2', name: 'Medicare Center' },
//         { _id: 'pharma3', name: 'Health Plus' }
//       ]);
//     } finally {
//       setLoadingPharmacies(false);
//     }
//   };

//   // Get unique pharmacies from cart items
//   const getUniquePharmaciesFromCart = () => {
//     const pharmacyMap = new Map();
//     const safeCart = cart || [];
    
//     safeCart.forEach(item => {
//       // Check for pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//         item.pharmacyIds.forEach(pharmacyId => {
//           if (!pharmacyMap.has(pharmacyId)) {
//             const pharmacy = pharmacies.find(p => p._id === pharmacyId);
//             if (pharmacy) {
//               pharmacyMap.set(pharmacyId, pharmacy);
//             } else {
//               // Create a dummy pharmacy if not found
//               pharmacyMap.set(pharmacyId, { 
//                 _id: pharmacyId, 
//                 name: 'Local Pharmacy' 
//               });
//             }
//           }
//         });
//       }
      
//       // Check for pharmacy object directly on item
//       if (item.pharmacy && item.pharmacy._id) {
//         if (!pharmacyMap.has(item.pharmacy._id)) {
//           pharmacyMap.set(item.pharmacy._id, item.pharmacy);
//         }
//       }
      
//       // Check for pharmacyId directly on item
//       if (item.pharmacyId) {
//         if (!pharmacyMap.has(item.pharmacyId)) {
//           const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//           if (pharmacy) {
//             pharmacyMap.set(item.pharmacyId, pharmacy);
//           } else {
//             // Create a dummy pharmacy if not found
//             pharmacyMap.set(item.pharmacyId, { 
//               _id: item.pharmacyId, 
//               name: 'Local Pharmacy' 
//             });
//           }
//         }
//       }
//     });
    
//     return Array.from(pharmacyMap.values());
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     const safeCart = cart || [];
    
//     if (pharmacyId === 'all') {
//       setFilteredCart(safeCart);
//       return;
//     }
    
//     const filtered = safeCart.filter(item => {
//       // Check pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       // Check pharmacy object
//       if (item.pharmacy && item.pharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       // Check pharmacyId directly
//       if (item.pharmacyId === pharmacyId) {
//         return true;
//       }
      
//       // Check availableAtPharmacies array
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

//   // Get pharmacy name for an item
//   const getPharmacyNameForItem = (item) => {
//     // Check pharmacy object directly
//     if (item.pharmacy && item.pharmacy.name) {
//       return item.pharmacy.name;
//     }
    
//     // Check pharmacyId and find in pharmacies list
//     if (item.pharmacyId) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     // Check pharmacyIds array
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     return 'Pharmacy';
//   };

//   // Get pharmacy ID for an item
//   const getPharmacyIdForItem = (item) => {
//     if (item.pharmacy && item.pharmacy._id) {
//       return item.pharmacy._id;
//     }
//     if (item.pharmacyId) {
//       return item.pharmacyId;
//     }
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       return item.pharmacyIds[0];
//     }
//     return null;
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
//     const newCart = (cart || []).filter(item => item.id !== medicineId);
//     setCart(newCart);
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const newCart = (cart || []).map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(newCart);
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
//     if (!cart || cart.length === 0) {
//       alert('Your cart is empty. Please add medicines before booking.');
//       return;
//     }
    
//     // Generate order number
//     const orderNumber = generateOrderNumber();
    
//     // Prepare order data
//     const orderData = {
//       orderNumber,
//       patientInfo: { ...patientInfo },
//       cart: cart.map(item => ({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         quantity: item.quantity,
//         price: item.price || item.discountedPrice || 0,
//         pharmacyIds: item.pharmacyIds || [],
//         pharmacy: item.pharmacy || null,
//         pharmacyId: item.pharmacyId || null
//       })),
//       total: finalTotal,
//       selectedPharmacy,
//       status: 'Processing',
//       date: new Date().toLocaleString(),
//       timestamp: new Date().toISOString()
//     };
    
//     // Save order to state and localStorage
//     setOrders(prevOrders => [orderData, ...prevOrders]);
    
//     // Set current order for confirmation modal
//     setCurrentOrder(orderData);
    
//     // Show order confirmation
//     setShowOrderConfirmation(true);
    
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
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handlePharmacyChange = (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     filterCartByPharmacy(pharmacyId);
//   };

//   const closeOrderConfirmation = () => {
//     setShowOrderConfirmation(false);
//     setCurrentOrder(null);
//     navigate('/pharmacies');
//   };

//   const viewOrderHistory = () => {
//     navigate('/orders');
//   };

//   // Fallback for cart if it's undefined
//   const safeCart = cart || [];

//   if (safeCart.length === 0 && !showOrderConfirmation) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   // Get unique pharmacies from cart
//   const cartPharmacies = getUniquePharmaciesFromCart();

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {/* Order Confirmation Modal */}
//       {showOrderConfirmation && currentOrder && (
//         <div className="fixed inset-0 bg-[var(--text-light)] bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaCheckCircle className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
//                 <p className="text-gray-600">Your order has been placed successfully</p>
//               </div>
              
//               <div className="bg-[var(--bg-light, #f8fafc)] p-4 rounded-lg mb-6 border border-[var(--text-light, #e2e8f0)]">
//                 <div className="text-center mb-4">
//                   <p className="text-sm text-gray-500">Order Number</p>
//                   <p className="text-xl font-bold text-[var(--primary-color)]">{currentOrder.orderNumber}</p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Patient Name:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Phone:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.phone}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Amount:</span>
//                     <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className="font-medium text-green-600">{currentOrder.status}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Date:</span>
//                     <span className="font-medium">{currentOrder.date}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 <button
//                   onClick={closeOrderConfirmation}
//                   className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold shadow-sm"
//                 >
//                   Continue Shopping
//                 </button>
//                 <button
//                   onClick={viewOrderHistory}
//                   className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold flex items-center justify-center gap-2"
//                 >
//                   <FaHistory /> View Order History
//                 </button>
//                 <p className="text-sm text-gray-500 text-center mt-4">
//                   You can view your order details anytime in the Order History section
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6"
//       >
//         <FaArrowLeft className="w-5 h-5 mr-2" />
//         Go Back
//       </button>

//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//         <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4 lg:mb-0">Book Your Medicines</h1>
//         {orders.length > 0 && (
//           <button
//             onClick={viewOrderHistory}
//             className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800"
//           >
//             <FaReceipt className="w-5 h-5 mr-2" />
//             View Order History ({orders.length})
//           </button>
//         )}
//       </div>

//       {/* Pharmacy Loading/Error Messages */}
//       {loadingPharmacies && (
//         <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
//           Loading pharmacy information...
//         </div>
//       )}
      
//       {pharmacyError && (
//         <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg">
//           {pharmacyError} You can still place your order.
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Medicines ({filteredCart.length})</h2>
          
//           {/* Pharmacy Filter Dropdown */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Pharmacy to Order From
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//             >
//               <option value="all">All Pharmacies ({safeCart.length} items)</option>
//               {cartPharmacies.map(pharmacy => {
//                 // Count items for this pharmacy
//                 const pharmacyItems = safeCart.filter(item => {
//                   const itemPharmacyId = getPharmacyIdForItem(item);
//                   return itemPharmacyId === pharmacy._id;
//                 }).length;
                
//                 return (
//                   <option key={pharmacy._id} value={pharmacy._id}>
//                     {pharmacy.name} ({pharmacyItems} items)
//                   </option>
//                 );
//               })}
//             </select>
//             <p className="text-sm text-gray-500 mt-1">
//               {selectedPharmacy === 'all' 
//                 ? `Showing all ${safeCart.length} items from ${cartPharmacies.length} pharmacies`
//                 : `Showing ${filteredCart.length} items from ${pharmacies.find(p => p._id === selectedPharmacy)?.name || 'selected pharmacy'}`
//               }
//             </p>
//           </div>
          
//           {filteredCart.length === 0 ? (
//             <div className="text-center py-8 bg-[var(--bg-light, #f8fafc)] rounded-lg border border-[var(--text-light, #e2e8f0)]">
//               <p className="text-gray-600">No items found for the selected pharmacy.</p>
//               <button
//                 onClick={() => handlePharmacyChange('all')}
//                 className="mt-2 text-[var(--primary-color)] hover:text-blue-800"
//               >
//                 Show all items
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {filteredCart.map(item => {
//                   const pharmacyName = getPharmacyNameForItem(item);
                  
//                   return (
//                     <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded border border-gray-300"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
//                             <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
//                             {/* Pharmacy Tag */}
//                             <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full self-start">
//                               {pharmacyName}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaMinus className="w-3 h-3" />
//                             </button>
//                             <span className="w-8 text-center font-medium">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaPlus className="w-3 h-3" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-600 hover:text-red-800 transition-colors ml-4 sm:ml-0"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </div>
//                       <div className="text-right mt-2">
//                         <span className="font-semibold">
//                           Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Pharmacy Summary */}
//               {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
//                 <div className="mt-6 p-4 bg-[var(--bg-light, #9fbfc5)] rounded-lg border border-[var(--text-light, #c0d3dc)]">
//                   <h3 className="font-medium text-gray-700 mb-2">Order Summary by Pharmacy:</h3>
//                   <div className="space-y-2">
//                     {cartPharmacies.map(pharmacy => {
//                       const pharmacyItems = safeCart.filter(item => {
//                         const itemPharmacyId = getPharmacyIdForItem(item);
//                         return itemPharmacyId === pharmacy._id;
//                       });
                      
//                       const pharmacyTotal = pharmacyItems.reduce((total, item) => 
//                         total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
                      
//                       return (
//                         <div key={pharmacy._id} className="flex justify-between items-center text-sm">
//                           <span className="truncate mr-2">{pharmacy.name}:</span>
//                           <span className="whitespace-nowrap">{pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6 p-4 bg-[var(--bg-light, #f8fafc)] rounded-lg border border-[var(--text-light, #e2e8f0)]">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Subtotal ({filteredCart.length} items):</span>
//                     <span>Rs. {totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Delivery Charge:</span>
//                     <span className="text-green-600">Free</span>
//                   </div>
//                   <div className="border-t pt-2 mt-2 border-[var(--text-light, #e2e8f0)]">
//                     <div className="flex justify-between items-center text-xl font-bold">
//                       <span>Total:</span>
//                       <span>Rs. {finalTotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Booking Form */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Patient Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white ${
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//                     />
//                   </div>
//                   {patientInfo.prescriptionFile && (
//                     <div className="flex items-center justify-between bg-[var(--bg-light, #f8fafc)] p-3 rounded border border-[var(--text-light, #e2e8f0)]">
//                       <div className="flex items-center space-x-2 min-w-0">
//                         {patientInfo.prescriptionFile.type === 'application/pdf' ? (
//                           <FaFilePdf className="w-5 h-5 text-red-500 flex-shrink-0" />
//                         ) : (
//                           <FaFileUpload className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                         )}
//                         <span className="text-sm text-gray-700 truncate">
//                           {patientInfo.prescriptionFile.name}
//                           <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
//                             ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
//                       >
//                         <FaTimes className="w-5 h-5" />
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//                   placeholder="Any additional prescription details, doctor's notes, or special instructions..."
//                 />
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={!!emailError || filteredCart.length === 0}
//                 className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
//                   emailError || filteredCart.length === 0
//                     ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 Confirm Order - Rs. {finalTotal.toFixed(2)}
//               </button>
//             </div>
            
//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Note: Your order will be processed and delivered from the respective pharmacies based on item availability.
//               You'll receive a unique order number to track your order.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;



















//-------------Form restriction updated Perfect----------------
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaTrash, FaFileUpload, FaFilePdf, FaTimes, FaPlus, FaMinus, FaCheckCircle, FaReceipt, FaHistory, FaExclamationCircle } from 'react-icons/fa';

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
//   const [orders, setOrders] = useState([]);
//   const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loadingPharmacies, setLoadingPharmacies] = useState(false);
//   const [pharmacyError, setPharmacyError] = useState(null);
//   const [prescriptionError, setPrescriptionError] = useState('');
//   const formRef = useRef(null);

//   // Load cart and orders from localStorage on component mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
    
//     // Load saved cart from localStorage
//     const savedCart = localStorage.getItem('medicineCart');
//     if (savedCart && (!cart || cart.length === 0)) {
//       try {
//         const parsedCart = JSON.parse(savedCart);
//         setCart(parsedCart);
//       } catch (error) {
//         console.error('Error parsing saved cart:', error);
//       }
//     }
    
//     // Load saved orders from localStorage
//     const savedOrders = localStorage.getItem('medicineOrders');
//     if (savedOrders) {
//       try {
//         setOrders(JSON.parse(savedOrders));
//       } catch (error) {
//         console.error('Error parsing saved orders:', error);
//       }
//     }
    
//     // Fetch pharmacies
//     fetchPharmacies();
//   }, []);

//   // Save cart to localStorage whenever cart changes
//   useEffect(() => {
//     if (cart && cart.length > 0) {
//       localStorage.setItem('medicineCart', JSON.stringify(cart));
//     } else {
//       localStorage.removeItem('medicineCart');
//     }
//   }, [cart]);

//   // Save orders to localStorage whenever orders change
//   useEffect(() => {
//     localStorage.setItem('medicineOrders', JSON.stringify(orders));
//   }, [orders]);

//   // Initialize filtered cart when cart changes
//   useEffect(() => {
//     const safeCart = cart || [];
//     setFilteredCart(safeCart);
//     filterCartByPharmacy(selectedPharmacy);
//   }, [cart, selectedPharmacy]);

//   // Generate unique order number
//   const generateOrderNumber = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 1000);
//     return `ORD-${timestamp}-${random}`;
//   };

//   // Check if any medicine in filtered cart requires prescription
//   const checkIfPrescriptionRequiredForFilteredCart = () => {
//     // Use filteredCart instead of the entire cart
//     const currentCart = filteredCart.length > 0 ? filteredCart : (cart || []);
//     // Check if any item has prescriptionRequired flag or Rx in name
//     return currentCart.some(item => 
//       item.prescriptionRequired === true || 
//       (item.name && item.name.toLowerCase().includes('rx')) ||
//       (item.category && item.category.toLowerCase().includes('prescription')) ||
//       (item.tags && item.tags.some(tag => 
//         typeof tag === 'string' && tag.toLowerCase().includes('prescription')
//       ))
//     );
//   };

//   // Fetch pharmacies from backend - WITH ERROR HANDLING
//   const fetchPharmacies = async () => {
//     setLoadingPharmacies(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       if (data.success) {
//         setPharmacies(data.data);
//         setPharmacyError(null);
//       } else {
//         setPharmacyError('Failed to load pharmacies. Using default data.');
//         // Use fallback pharmacies if API fails
//         setPharmacies([
//           { _id: 'pharma1', name: 'City Pharmacy' },
//           { _id: 'pharma2', name: 'Medicare Center' },
//           { _id: 'pharma3', name: 'Health Plus' }
//         ]);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setPharmacyError('Cannot connect to server. Using offline mode.');
//       // Use fallback pharmacies for offline mode
//       setPharmacies([
//         { _id: 'pharma1', name: 'City Pharmacy' },
//         { _id: 'pharma2', name: 'Medicare Center' },
//         { _id: 'pharma3', name: 'Health Plus' }
//       ]);
//     } finally {
//       setLoadingPharmacies(false);
//     }
//   };

//   // Get unique pharmacies from cart items
//   const getUniquePharmaciesFromCart = () => {
//     const pharmacyMap = new Map();
//     const safeCart = cart || [];
    
//     safeCart.forEach(item => {
//       // Check for pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//         item.pharmacyIds.forEach(pharmacyId => {
//           if (!pharmacyMap.has(pharmacyId)) {
//             const pharmacy = pharmacies.find(p => p._id === pharmacyId);
//             if (pharmacy) {
//               pharmacyMap.set(pharmacyId, pharmacy);
//             } else {
//               // Create a dummy pharmacy if not found
//               pharmacyMap.set(pharmacyId, { 
//                 _id: pharmacyId, 
//                 name: 'Local Pharmacy' 
//               });
//             }
//           }
//         });
//       }
      
//       // Check for pharmacy object directly on item
//       if (item.pharmacy && item.pharmacy._id) {
//         if (!pharmacyMap.has(item.pharmacy._id)) {
//           pharmacyMap.set(item.pharmacy._id, item.pharmacy);
//         }
//       }
      
//       // Check for pharmacyId directly on item
//       if (item.pharmacyId) {
//         if (!pharmacyMap.has(item.pharmacyId)) {
//           const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//           if (pharmacy) {
//             pharmacyMap.set(item.pharmacyId, pharmacy);
//           } else {
//             // Create a dummy pharmacy if not found
//             pharmacyMap.set(item.pharmacyId, { 
//               _id: item.pharmacyId, 
//               name: 'Local Pharmacy' 
//             });
//           }
//         }
//       }
//     });
    
//     return Array.from(pharmacyMap.values());
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     const safeCart = cart || [];
    
//     if (pharmacyId === 'all') {
//       setFilteredCart(safeCart);
//       return;
//     }
    
//     const filtered = safeCart.filter(item => {
//       // Check pharmacyIds array
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       // Check pharmacy object
//       if (item.pharmacy && item.pharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       // Check pharmacyId directly
//       if (item.pharmacyId === pharmacyId) {
//         return true;
//       }
      
//       // Check availableAtPharmacies array
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

//   // Get pharmacy name for an item
//   const getPharmacyNameForItem = (item) => {
//     // Check pharmacy object directly
//     if (item.pharmacy && item.pharmacy.name) {
//       return item.pharmacy.name;
//     }
    
//     // Check pharmacyId and find in pharmacies list
//     if (item.pharmacyId) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     // Check pharmacyIds array
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     return 'Pharmacy';
//   };

//   // Get pharmacy ID for an item
//   const getPharmacyIdForItem = (item) => {
//     if (item.pharmacy && item.pharmacy._id) {
//       return item.pharmacy._id;
//     }
//     if (item.pharmacyId) {
//       return item.pharmacyId;
//     }
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       return item.pharmacyIds[0];
//     }
//     return null;
//   };

//   // Check if item requires prescription
//   const itemRequiresPrescription = (item) => {
//     return item.prescriptionRequired === true || 
//            (item.name && item.name.toLowerCase().includes('rx')) ||
//            (item.category && item.category.toLowerCase().includes('prescription')) ||
//            (item.tags && item.tags.some(tag => 
//              typeof tag === 'string' && tag.toLowerCase().includes('prescription')
//            ));
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
//       // Clear any prescription error when file is uploaded
//       setPrescriptionError('');
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
//     // Set prescription error if prescription is required
//     if (checkIfPrescriptionRequiredForFilteredCart()) {
//       setPrescriptionError('Prescription is required for your order');
//     }
//   };

//   const removeFromCart = (medicineId) => {
//     const newCart = (cart || []).filter(item => item.id !== medicineId);
//     setCart(newCart);
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const newCart = (cart || []).map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(newCart);
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
//     if (!cart || cart.length === 0) {
//       alert('Your cart is empty. Please add medicines before booking.');
//       return;
//     }
    
//     // Check if prescription is required and uploaded - based on filtered cart
//     const prescriptionRequired = checkIfPrescriptionRequiredForFilteredCart();
//     if (prescriptionRequired && !patientInfo.prescriptionFile) {
//       setPrescriptionError('Prescription is required for your order. Please upload a prescription file.');
//       // Scroll to prescription field
//       const prescriptionField = document.querySelector('input[type="file"]');
//       if (prescriptionField) {
//         prescriptionField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         prescriptionField.focus();
//       }
//       return;
//     } else {
//       setPrescriptionError('');
//     }
    
//     // Generate order number
//     const orderNumber = generateOrderNumber();
    
//     // Prepare order data - only include filtered items for the order
//     const orderItems = selectedPharmacy === 'all' ? cart : filteredCart;
    
//     const orderData = {
//       orderNumber,
//       patientInfo: { ...patientInfo },
//       cart: orderItems.map(item => ({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         quantity: item.quantity,
//         price: item.price || item.discountedPrice || 0,
//         pharmacyIds: item.pharmacyIds || [],
//         pharmacy: item.pharmacy || null,
//         pharmacyId: item.pharmacyId || null,
//         prescriptionRequired: itemRequiresPrescription(item)
//       })),
//       total: finalTotal,
//       selectedPharmacy,
//       status: 'Processing',
//       date: new Date().toLocaleString(),
//       timestamp: new Date().toISOString()
//     };
    
//     // Save order to state and localStorage
//     setOrders(prevOrders => [orderData, ...prevOrders]);
    
//     // Set current order for confirmation modal
//     setCurrentOrder(orderData);
    
//     // Show order confirmation
//     setShowOrderConfirmation(true);
    
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
//     setPrescriptionError('');
//     setSelectedPharmacy('all');
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handlePharmacyChange = (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     filterCartByPharmacy(pharmacyId);
//   };

//   const closeOrderConfirmation = () => {
//     setShowOrderConfirmation(false);
//     setCurrentOrder(null);
//     navigate('/pharmacies');
//   };

//   const viewOrderHistory = () => {
//     navigate('/orders');
//   };

//   // Fallback for cart if it's undefined
//   const safeCart = cart || [];
  
//   // Check if prescription is required for current filtered cart
//   const isPrescriptionRequired = checkIfPrescriptionRequiredForFilteredCart();

//   if (safeCart.length === 0 && !showOrderConfirmation) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   // Get unique pharmacies from cart
//   const cartPharmacies = getUniquePharmaciesFromCart();

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {/* Order Confirmation Modal */}
//       {showOrderConfirmation && currentOrder && (
//         <div className="fixed inset-0 bg-[var(--text-light)] bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaCheckCircle className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
//                 <p className="text-gray-600">Your order has been placed successfully</p>
//               </div>
              
//               <div className="bg-[var(--bg-light, #f8fafc)] p-4 rounded-lg mb-6 border border-[var(--text-light, #e2e8f0)]">
//                 <div className="text-center mb-4">
//                   <p className="text-sm text-gray-500">Order Number</p>
//                   <p className="text-xl font-bold text-[var(--primary-color)]">{currentOrder.orderNumber}</p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Patient Name:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Phone:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.phone}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Amount:</span>
//                     <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className="font-medium text-green-600">{currentOrder.status}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Date:</span>
//                     <span className="font-medium">{currentOrder.date}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 <button
//                   onClick={closeOrderConfirmation}
//                   className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold shadow-sm"
//                 >
//                   Continue Shopping
//                 </button>
//                 <button
//                   onClick={viewOrderHistory}
//                   className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold flex items-center justify-center gap-2"
//                 >
//                   <FaHistory /> View Order History
//                 </button>
//                 <p className="text-sm text-gray-500 text-center mt-4">
//                   You can view your order details anytime in the Order History section
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6"
//       >
//         <FaArrowLeft className="w-5 h-5 mr-2" />
//         Go Back
//       </button>

//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//         <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4 lg:mb-0">Book Your Medicines</h1>
//         {orders.length > 0 && (
//           <button
//             onClick={viewOrderHistory}
//             className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800"
//           >
//             <FaReceipt className="w-5 h-5 mr-2" />
//             View Order History ({orders.length})
//           </button>
//         )}
//       </div>

//       {/* Prescription Required Warning - only show if prescription is required for filtered cart */}
//       {isPrescriptionRequired && (
//         <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center gap-3">
//             <FaExclamationCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
//             <div>
//               <p className="font-medium text-yellow-800">Prescription Required</p>
//               <p className="text-sm text-yellow-700 mt-1">
//                 {selectedPharmacy === 'all' 
//                   ? 'Some medicines in your cart require a prescription. You must upload a valid prescription to proceed with the order.'
//                   : 'Your selected medicines require a prescription. You must upload a valid prescription to proceed with the order.'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Pharmacy Loading/Error Messages */}
//       {loadingPharmacies && (
//         <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
//           Loading pharmacy information...
//         </div>
//       )}
      
//       {pharmacyError && (
//         <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg">
//           {pharmacyError} You can still place your order.
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Selected Medicines */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Medicines ({filteredCart.length})</h2>
          
//           {/* Prescription Required Summary - only show if prescription is required for filtered cart */}
//           {isPrescriptionRequired && (
//             <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-700">
//                 <span className="font-medium">Note:</span> {selectedPharmacy === 'all' 
//                   ? 'Some medicines in your cart require a prescription. Please upload a valid prescription to confirm your order.'
//                   : 'Your selected medicines require a prescription. Please upload a valid prescription to confirm your order.'
//                 }
//               </p>
//             </div>
//           )}
          
//           {/* Pharmacy Filter Dropdown */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Pharmacy to Order From
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//             >
//               <option value="all">All Pharmacies ({safeCart.length} items)</option>
//               {cartPharmacies.map(pharmacy => {
//                 // Count items for this pharmacy
//                 const pharmacyItems = safeCart.filter(item => {
//                   const itemPharmacyId = getPharmacyIdForItem(item);
//                   return itemPharmacyId === pharmacy._id;
//                 }).length;
                
//                 return (
//                   <option key={pharmacy._id} value={pharmacy._id}>
//                     {pharmacy.name} ({pharmacyItems} items)
//                   </option>
//                 );
//               })}
//             </select>
//             <p className="text-sm text-gray-500 mt-1">
//               {selectedPharmacy === 'all' 
//                 ? `Showing all ${safeCart.length} items from ${cartPharmacies.length} pharmacies`
//                 : `Showing ${filteredCart.length} items from ${pharmacies.find(p => p._id === selectedPharmacy)?.name || 'selected pharmacy'}`
//               }
//             </p>
//           </div>
          
//           {filteredCart.length === 0 ? (
//             <div className="text-center py-8 bg-[var(--bg-light, #f8fafc)] rounded-lg border border-[var(--text-light, #e2e8f0)]">
//               <p className="text-gray-600">No items found for the selected pharmacy.</p>
//               <button
//                 onClick={() => handlePharmacyChange('all')}
//                 className="mt-2 text-[var(--primary-color)] hover:text-blue-800"
//               >
//                 Show all items
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {filteredCart.map(item => {
//                   const pharmacyName = getPharmacyNameForItem(item);
//                   const requiresPrescription = itemRequiresPrescription(item);
                  
//                   return (
//                     <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded border border-gray-300"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2">
//                             <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
//                             {requiresPrescription && (
//                               <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//                                 Rx
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
//                             <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
//                             {/* Pharmacy Tag */}
//                             <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full self-start">
//                               {pharmacyName}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaMinus className="w-3 h-3" />
//                             </button>
//                             <span className="w-8 text-center font-medium">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaPlus className="w-3 h-3" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-600 hover:text-red-800 transition-colors ml-4 sm:ml-0"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                       <div className="text-right mt-2">
//                         <span className="font-semibold">
//                           Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Pharmacy Summary */}
//               {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
//                 <div className="mt-6 p-4 bg-[var(--bg-light, #9fbfc5)] rounded-lg border border-[var(--text-light, #c0d3dc)]">
//                   <h3 className="font-medium text-gray-700 mb-2">Order Summary by Pharmacy:</h3>
//                   <div className="space-y-2">
//                     {cartPharmacies.map(pharmacy => {
//                       const pharmacyItems = safeCart.filter(item => {
//                         const itemPharmacyId = getPharmacyIdForItem(item);
//                         return itemPharmacyId === pharmacy._id;
//                       });
                      
//                       const pharmacyTotal = pharmacyItems.reduce((total, item) => 
//                         total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
                      
//                       return (
//                         <div key={pharmacy._id} className="flex justify-between items-center text-sm">
//                           <span className="truncate mr-2">{pharmacy.name}:</span>
//                           <span className="whitespace-nowrap">{pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6 p-4 bg-[var(--bg-light, #f8fafc)] rounded-lg border border-[var(--text-light, #e2e8f0)]">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Subtotal ({filteredCart.length} items):</span>
//                     <span>Rs. {totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Delivery Charge:</span>
//                     <span className="text-green-600">Free</span>
//                   </div>
//                   <div className="border-t pt-2 mt-2 border-[var(--text-light, #e2e8f0)]">
//                     <div className="flex justify-between items-center text-xl font-bold">
//                       <span>Total:</span>
//                       <span>Rs. {finalTotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Booking Form */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white ${
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//                   placeholder="House #, Street, Area, City"
//                 />
//               </div>
              
//               {/* Prescription Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Upload Prescription {isPrescriptionRequired ? '*' : '(Optional)'}
//                 </label>
//                 <div className="space-y-2">
//                   {isPrescriptionRequired && (
//                     <p className="text-sm text-red-600 mb-2">
//                       <FaExclamationCircle className="inline w-4 h-4 mr-1" />
//                       Required for prescription medicines in your cart
//                     </p>
//                   )}
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="file"
//                       id="prescriptionFile"
//                       onChange={handleFileUpload}
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white ${
//                         prescriptionError ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required={isPrescriptionRequired}
//                     />
//                   </div>
//                   {prescriptionError && (
//                     <p className="text-red-500 text-xs mt-1">{prescriptionError}</p>
//                   )}
//                   {patientInfo.prescriptionFile && (
//                     <div className="flex items-center justify-between bg-[var(--bg-light, #f8fafc)] p-3 rounded border border-[var(--text-light, #e2e8f0)]">
//                       <div className="flex items-center space-x-2 min-w-0">
//                         {patientInfo.prescriptionFile.type === 'application/pdf' ? (
//                           <FaFilePdf className="w-5 h-5 text-red-500 flex-shrink-0" />
//                         ) : (
//                           <FaFileUpload className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                         )}
//                         <span className="text-sm text-gray-700 truncate">
//                           {patientInfo.prescriptionFile.name}
//                           <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
//                             ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
//                       >
//                         <FaTimes className="w-5 h-5" />
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//                   placeholder="Any additional prescription details, doctor's notes, or special instructions..."
//                 />
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={!!emailError || filteredCart.length === 0 || (isPrescriptionRequired && !patientInfo.prescriptionFile)}
//                 className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
//                   emailError || filteredCart.length === 0 || (isPrescriptionRequired && !patientInfo.prescriptionFile)
//                     ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 Confirm Order - Rs. {finalTotal.toFixed(2)}
//               </button>
//             </div>
            
//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Note: Your order will be processed and delivered from the respective pharmacies based on item availability.
//               You'll receive a unique order number to track your order.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;














//--------------Working well/ correctly----------------
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaTrash, FaFileUpload, FaFilePdf, FaTimes, FaPlus, FaMinus, FaCheckCircle, FaReceipt, FaHistory, FaExclamationCircle } from 'react-icons/fa';

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
//   const [orders, setOrders] = useState([]);
//   const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loadingPharmacies, setLoadingPharmacies] = useState(false);
//   const [pharmacyError, setPharmacyError] = useState(null);
//   const [prescriptionError, setPrescriptionError] = useState('');
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const formRef = useRef(null);

//   // ================================
//   // AUTH EVENT HANDLERS (ADD THESE)
//   // ================================
//   const handleLoginSuccess = (userData) => {
//     // User data save karein localStorage mein
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', userData.token);
    
//     // Event trigger karein taaki sab components update ho jaayein
//     window.dispatchEvent(new CustomEvent('userChanged'));
    
//     // Redirect karein
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
    
//     // Event trigger karein
//     window.dispatchEvent(new CustomEvent('userChanged'));
    
//     navigate('/login');
//   };
//   // ================================

//   // Get user-specific cart key
//   const getUserCartKey = (userId) => {
//     return userId ? `medicineCart_${userId}` : 'medicineCart_guest';
//   };

//   // Get user-specific orders key
//   const getUserOrdersKey = (userId) => {
//     return userId ? `medicineOrders_${userId}` : 'medicineOrders_guest';
//   };

//   // Get current user from localStorage
//   const getCurrentUser = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         return user;
//       }
//     } catch (error) {
//       console.error('Error getting user:', error);
//     }
//     return null;
//   };

//   // Load user-specific data
//   const loadUserData = () => {
//     const user = getCurrentUser();
//     setCurrentUser(user);
    
//     if (user) {
//       // Load cart for logged-in user
//       const cartKey = getUserCartKey(user._id || user.id);
//       const savedCart = localStorage.getItem(cartKey);
      
//       if (savedCart) {
//         try {
//           const parsedCart = JSON.parse(savedCart);
//           setCart(parsedCart);
//         } catch (error) {
//           console.error('Error parsing saved cart:', error);
//           setCart([]);
//         }
//       } else {
//         setCart([]);
//       }
      
//       // Load orders for logged-in user
//       const ordersKey = getUserOrdersKey(user._id || user.id);
//       const savedOrders = localStorage.getItem(ordersKey);
//       if (savedOrders) {
//         try {
//           setOrders(JSON.parse(savedOrders));
//         } catch (error) {
//           console.error('Error parsing saved orders:', error);
//           setOrders([]);
//         }
//       } else {
//         setOrders([]);
//       }
//     } else {
//       // Not logged in, clear everything
//       setCart([]);
//       setOrders([]);
//     }
    
//     setIsInitialized(true);
//   };

//   // Save cart to user-specific localStorage
//   const saveUserCart = (user, cartData) => {
//     if (!user) return;
    
//     const cartKey = getUserCartKey(user._id || user.id);
    
//     if (cartData && cartData.length > 0) {
//       localStorage.setItem(cartKey, JSON.stringify(cartData));
//     } else {
//       localStorage.removeItem(cartKey);
//     }
//   };

//   // Save orders to user-specific localStorage
//   const saveUserOrders = (user, ordersData) => {
//     if (!user) return;
    
//     const ordersKey = getUserOrdersKey(user._id || user.id);
//     localStorage.setItem(ordersKey, JSON.stringify(ordersData));
//   };

//   // Load cart and orders on component mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
    
//     loadUserData();
//     fetchPharmacies();
    
//     // Listen for login/logout events
//     const handleAuthChange = () => {
//       loadUserData();
//     };
    
//     window.addEventListener('userChanged', handleAuthChange);
    
//     return () => {
//       window.removeEventListener('userChanged', handleAuthChange);
//     };
//   }, []);

//   // Save cart when it changes
//   useEffect(() => {
//     if (!isInitialized || !currentUser) return;
    
//     saveUserCart(currentUser, cart);
//   }, [cart, currentUser, isInitialized]);

//   // Save orders when they change
//   useEffect(() => {
//     if (!isInitialized || !currentUser) return;
    
//     saveUserOrders(currentUser, orders);
//   }, [orders, currentUser, isInitialized]);

//   // Initialize filtered cart when cart changes
//   useEffect(() => {
//     const safeCart = cart || [];
//     filterCartByPharmacy(selectedPharmacy);
//   }, [cart, selectedPharmacy]);

//   // Generate unique order number
//   const generateOrderNumber = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 1000);
//     return `ORD-${timestamp}-${random}`;
//   };

//   // Check if any medicine in filtered cart requires prescription
//   const checkIfPrescriptionRequiredForFilteredCart = () => {
//     const currentCart = filteredCart.length > 0 ? filteredCart : (cart || []);
//     return currentCart.some(item => 
//       item.prescriptionRequired === true || 
//       (item.name && item.name.toLowerCase().includes('rx')) ||
//       (item.category && item.category.toLowerCase().includes('prescription')) ||
//       (item.tags && item.tags.some(tag => 
//         typeof tag === 'string' && tag.toLowerCase().includes('prescription')
//       ))
//     );
//   };

//   // Fetch pharmacies from backend - WITH ERROR HANDLING
//   const fetchPharmacies = async () => {
//     setLoadingPharmacies(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       if (data.success) {
//         setPharmacies(data.data);
//         setPharmacyError(null);
//       } else {
//         setPharmacyError('Failed to load pharmacies. Using default data.');
//         setPharmacies([
//           { _id: 'pharma1', name: 'City Pharmacy' },
//           { _id: 'pharma2', name: 'Medicare Center' },
//           { _id: 'pharma3', name: 'Health Plus' }
//         ]);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setPharmacyError('Cannot connect to server. Using offline mode.');
//       setPharmacies([
//         { _id: 'pharma1', name: 'City Pharmacy' },
//         { _id: 'pharma2', name: 'Medicare Center' },
//         { _id: 'pharma3', name: 'Health Plus' }
//       ]);
//     } finally {
//       setLoadingPharmacies(false);
//     }
//   };

//   // Get unique pharmacies from cart items
//   const getUniquePharmaciesFromCart = () => {
//     const pharmacyMap = new Map();
//     const safeCart = cart || [];
    
//     safeCart.forEach(item => {
//       if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//         item.pharmacyIds.forEach(pharmacyId => {
//           if (!pharmacyMap.has(pharmacyId)) {
//             const pharmacy = pharmacies.find(p => p._id === pharmacyId);
//             if (pharmacy) {
//               pharmacyMap.set(pharmacyId, pharmacy);
//             } else {
//               pharmacyMap.set(pharmacyId, { 
//                 _id: pharmacyId, 
//                 name: 'Local Pharmacy' 
//               });
//             }
//           }
//         });
//       }
      
//       if (item.pharmacy && item.pharmacy._id) {
//         if (!pharmacyMap.has(item.pharmacy._id)) {
//           pharmacyMap.set(item.pharmacy._id, item.pharmacy);
//         }
//       }
      
//       if (item.pharmacyId) {
//         if (!pharmacyMap.has(item.pharmacyId)) {
//           const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//           if (pharmacy) {
//             pharmacyMap.set(item.pharmacyId, pharmacy);
//           } else {
//             pharmacyMap.set(item.pharmacyId, { 
//               _id: item.pharmacyId, 
//               name: 'Local Pharmacy' 
//             });
//           }
//         }
//       }
//     });
    
//     return Array.from(pharmacyMap.values());
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     const safeCart = cart || [];
    
//     if (pharmacyId === 'all') {
//       setFilteredCart(safeCart);
//       return;
//     }
    
//     const filtered = safeCart.filter(item => {
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       if (item.pharmacy && item.pharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       if (item.pharmacyId === pharmacyId) {
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

//   // Get pharmacy name for an item
//   const getPharmacyNameForItem = (item) => {
//     if (item.pharmacy && item.pharmacy.name) {
//       return item.pharmacy.name;
//     }
    
//     if (item.pharmacyId) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     return 'Pharmacy';
//   };

//   // Get pharmacy ID for an item
//   const getPharmacyIdForItem = (item) => {
//     if (item.pharmacy && item.pharmacy._id) {
//       return item.pharmacy._id;
//     }
//     if (item.pharmacyId) {
//       return item.pharmacyId;
//     }
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       return item.pharmacyIds[0];
//     }
//     return null;
//   };

//   // Check if item requires prescription
//   const itemRequiresPrescription = (item) => {
//     return item.prescriptionRequired === true || 
//            (item.name && item.name.toLowerCase().includes('rx')) ||
//            (item.category && item.category.toLowerCase().includes('prescription')) ||
//            (item.tags && item.tags.some(tag => 
//              typeof tag === 'string' && tag.toLowerCase().includes('prescription')
//            ));
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
//       setPrescriptionError('');
//     }
//   };

//   const removeFile = () => {
//     setPatientInfo({
//       ...patientInfo,
//       prescriptionFile: null
//     });
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) fileInput.value = '';
    
//     if (checkIfPrescriptionRequiredForFilteredCart()) {
//       setPrescriptionError('Prescription is required for your order');
//     }
//   };

//   const removeFromCart = (medicineId) => {
//     const newCart = (cart || []).filter(item => item.id !== medicineId);
//     setCart(newCart);
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
//     const newCart = (cart || []).map(item =>
//       item.id === medicineId ? { ...item, quantity: newQuantity } : item
//     );
//     setCart(newCart);
//   };

//   // Calculate total for filtered cart
//   const totalPrice = filteredCart.reduce((total, item) => total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
//   const deliveryCharge = 0;
//   const finalTotal = totalPrice + deliveryCharge;

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!currentUser) {
//       alert('Please login to place an order');
//       navigate('/login', {
//         state: {
//           redirectTo: '/booking',
//           message: 'Please login to place an order'
//         }
//       });
//       return;
//     }
    
//     if (patientInfo.email.trim()) {
//       const error = validateEmail(patientInfo.email);
//       if (error) {
//         setEmailError(error);
//         return;
//       }
//     }
    
//     if (!cart || cart.length === 0) {
//       alert('Your cart is empty. Please add medicines before booking.');
//       return;
//     }
    
//     const prescriptionRequired = checkIfPrescriptionRequiredForFilteredCart();
//     if (prescriptionRequired && !patientInfo.prescriptionFile) {
//       setPrescriptionError('Prescription is required for your order. Please upload a prescription file.');
//       const prescriptionField = document.querySelector('input[type="file"]');
//       if (prescriptionField) {
//         prescriptionField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         prescriptionField.focus();
//       }
//       return;
//     } else {
//       setPrescriptionError('');
//     }
    
//     const orderNumber = generateOrderNumber();
//     const orderItems = selectedPharmacy === 'all' ? cart : filteredCart;
    
//     const orderData = {
//       orderNumber,
//       patientInfo: { ...patientInfo },
//       cart: orderItems.map(item => ({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         quantity: item.quantity,
//         price: item.price || item.discountedPrice || 0,
//         pharmacyIds: item.pharmacyIds || [],
//         pharmacy: item.pharmacy || null,
//         pharmacyId: item.pharmacyId || null,
//         prescriptionRequired: itemRequiresPrescription(item)
//       })),
//       total: finalTotal,
//       selectedPharmacy,
//       status: 'Processing',
//       date: new Date().toLocaleString(),
//       timestamp: new Date().toISOString(),
//       userId: currentUser._id || currentUser.id
//     };
    
//     setOrders(prevOrders => [orderData, ...prevOrders]);
//     setCurrentOrder(orderData);
//     setShowOrderConfirmation(true);
    
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
//     setPrescriptionError('');
//     setSelectedPharmacy('all');
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handlePharmacyChange = (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     filterCartByPharmacy(pharmacyId);
//   };

//   const closeOrderConfirmation = () => {
//     setShowOrderConfirmation(false);
//     setCurrentOrder(null);
//     navigate('/pharmacies');
//   };

//   const viewOrderHistory = () => {
//     navigate('/orders');
//   };

//   const safeCart = cart || [];
//   const isPrescriptionRequired = checkIfPrescriptionRequiredForFilteredCart();
//   const isLoggedIn = !!currentUser;

//   if (!isInitialized) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (!isLoggedIn) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
//           <FaExclamationCircle className="text-yellow-500 text-3xl mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
//           <p className="text-gray-600 mb-6">Please login to view your cart and place orders.</p>
//           <button
//             onClick={() => navigate('/login', { state: { redirectTo: '/booking' } })}
//             className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
//           >
//             Login to Continue
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (safeCart.length === 0 && !showOrderConfirmation) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//         <p className="text-gray-600 mb-6">Hello, {currentUser.name || currentUser.email}! Start adding medicines to your cart.</p>
//         <button
//           onClick={() => navigate('/pharmacies')}
//           className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
//         >
//           Browse Pharmacies
//         </button>
//       </div>
//     );
//   }

//   const cartPharmacies = getUniquePharmaciesFromCart();

//   return (
//     <div ref={formRef} className="container mx-auto px-4 py-8">
//       {showOrderConfirmation && currentOrder && (
//         <div className="fixed inset-0 bg-[var(--text-light)] bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaCheckCircle className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
//                 <p className="text-gray-600">Your order has been placed successfully</p>
//               </div>
              
//               <div className="bg-[var(--bg-light, #f8fafc)] p-4 rounded-lg mb-6 border border-[var(--text-light, #e2e8f0)]">
//                 <div className="text-center mb-4">
//                   <p className="text-sm text-gray-500">Order Number</p>
//                   <p className="text-xl font-bold text-[var(--primary-color)]">{currentOrder.orderNumber}</p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Patient Name:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Phone:</span>
//                     <span className="font-medium">{currentOrder.patientInfo.phone}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Total Amount:</span>
//                     <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className="font-medium text-green-600">{currentOrder.status}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Date:</span>
//                     <span className="font-medium">{currentOrder.date}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-3">
//                 <button
//                   onClick={closeOrderConfirmation}
//                   className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold shadow-sm"
//                 >
//                   Continue Shopping
//                 </button>
//                 <button
//                   onClick={viewOrderHistory}
//                   className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold flex items-center justify-center gap-2"
//                 >
//                   <FaHistory /> View Order History
//                 </button>
//                 <p className="text-sm text-gray-500 text-center mt-4">
//                   You can view your order details anytime in the Order History section
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleBack}
//         className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mb-6"
//       >
//         <FaArrowLeft className="w-5 h-5 mr-2" />
//         Go Back
//       </button>

//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-2">Book Your Medicines</h1>
//           <p className="text-gray-600">
//             Welcome, <span className="font-medium">{currentUser?.name || currentUser?.email}</span>
//           </p>
//         </div>
//         {orders.length > 0 && (
//           <button
//             onClick={viewOrderHistory}
//             className="inline-flex items-center text-[var(--primary-color)] hover:text-blue-800 mt-4 lg:mt-0"
//           >
//             <FaReceipt className="w-5 h-5 mr-2" />
//             View Order History ({orders.length})
//           </button>
//         )}
//       </div>

//       {isPrescriptionRequired && (
//         <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <div className="flex items-center gap-3">
//             <FaExclamationCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
//             <div>
//               <p className="font-medium text-yellow-800">Prescription Required</p>
//               <p className="text-sm text-yellow-700 mt-1">
//                 {selectedPharmacy === 'all' 
//                   ? 'Some medicines in your cart require a prescription. You must upload a valid prescription to proceed with the order.'
//                   : 'Your selected medicines require a prescription. You must upload a valid prescription to proceed with the order.'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {loadingPharmacies && (
//         <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
//           Loading pharmacy information...
//         </div>
//       )}
      
//       {pharmacyError && (
//         <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg">
//           {pharmacyError} You can still place your order.
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selected Medicines ({filteredCart.length})</h2>
          
//           {isPrescriptionRequired && (
//             <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-700">
//                 <span className="font-medium">Note:</span> {selectedPharmacy === 'all' 
//                   ? 'Some medicines in your cart require a prescription. Please upload a valid prescription to confirm your order.'
//                   : 'Your selected medicines require a prescription. Please upload a valid prescription to confirm your order.'
//                 }
//               </p>
//             </div>
//           )}
          
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Pharmacy to Order From
//             </label>
//             <select
//               value={selectedPharmacy}
//               onChange={(e) => handlePharmacyChange(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//             >
//               <option value="all">All Pharmacies ({safeCart.length} items)</option>
//               {cartPharmacies.map(pharmacy => {
//                 const pharmacyItems = safeCart.filter(item => {
//                   const itemPharmacyId = getPharmacyIdForItem(item);
//                   return itemPharmacyId === pharmacy._id;
//                 }).length;
                
//                 return (
//                   <option key={pharmacy._id} value={pharmacy._id}>
//                     {pharmacy.name} ({pharmacyItems} items)
//                   </option>
//                 );
//               })}
//             </select>
//             <p className="text-sm text-gray-500 mt-1">
//               {selectedPharmacy === 'all' 
//                 ? `Showing all ${safeCart.length} items from ${cartPharmacies.length} pharmacies`
//                 : `Showing ${filteredCart.length} items from ${pharmacies.find(p => p._id === selectedPharmacy)?.name || 'selected pharmacy'}`
//               }
//             </p>
//           </div>
          
//           {filteredCart.length === 0 ? (
//             <div className="text-center py-8 bg-[var(--bg-light, #f8fafc)] rounded-lg border border-[var(--text-light, #e2e8f0)]">
//               <p className="text-gray-600">No items found for the selected pharmacy.</p>
//               <button
//                 onClick={() => handlePharmacyChange('all')}
//                 className="mt-2 text-[var(--primary-color)] hover:text-blue-800"
//               >
//                 Show all items
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {filteredCart.map(item => {
//                   const pharmacyName = getPharmacyNameForItem(item);
//                   const requiresPrescription = itemRequiresPrescription(item);
                  
//                   return (
//                     <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded border border-gray-300"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2">
//                             <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
//                             {requiresPrescription && (
//                               <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//                                 Rx
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
//                             <p className="text-gray-600">Rs. {item.discountedPrice || item.price || 0} each</p>
//                             <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full self-start">
//                               {pharmacyName}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaMinus className="w-3 h-3" />
//                             </button>
//                             <span className="w-8 text-center font-medium">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
//                             >
//                               <FaPlus className="w-3 h-3" />
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-600 hover:text-red-800 transition-colors ml-4 sm:ml-0"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                       <div className="text-right mt-2">
//                         <span className="font-semibold">
//                           Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
//                 <div className="mt-6 p-4 bg-[var(--bg-light, #9fbfc5)] rounded-lg border border-[var(--text-light, #c0d3dc)]">
//                   <h3 className="font-medium text-gray-700 mb-2">Order Summary by Pharmacy:</h3>
//                   <div className="space-y-2">
//                     {cartPharmacies.map(pharmacy => {
//                       const pharmacyItems = safeCart.filter(item => {
//                         const itemPharmacyId = getPharmacyIdForItem(item);
//                         return itemPharmacyId === pharmacy._id;
//                       });
                      
//                       const pharmacyTotal = pharmacyItems.reduce((total, item) => 
//                         total + ((item.discountedPrice || item.price || 0) * item.quantity), 0);
                      
//                       return (
//                         <div key={pharmacy._id} className="flex justify-between items-center text-sm">
//                           <span className="truncate mr-2">{pharmacy.name}:</span>
//                           <span className="whitespace-nowrap">{pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6 p-4 bg-[var(--bg-light, #f8fafc)] rounded-lg border border-[var(--text-light, #e2e8f0)]">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Subtotal ({filteredCart.length} items):</span>
//                     <span>Rs. {totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Delivery Charge:</span>
//                     <span className="text-green-600">Free</span>
//                   </div>
//                   <div className="border-t pt-2 mt-2 border-[var(--text-light, #e2e8f0)]">
//                     <div className="flex justify-between items-center text-xl font-bold">
//                       <span>Total:</span>
//                       <span>Rs. {finalTotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white ${
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//                   placeholder="House #, Street, Area, City"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Upload Prescription {isPrescriptionRequired ? '*' : '(Optional)'}
//                 </label>
//                 <div className="space-y-2">
//                   {isPrescriptionRequired && (
//                     <p className="text-sm text-red-600 mb-2">
//                       <FaExclamationCircle className="inline w-4 h-4 mr-1" />
//                       Required for prescription medicines in your cart
//                     </p>
//                   )}
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="file"
//                       id="prescriptionFile"
//                       onChange={handleFileUpload}
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white ${
//                         prescriptionError ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required={isPrescriptionRequired}
//                     />
//                   </div>
//                   {prescriptionError && (
//                     <p className="text-red-500 text-xs mt-1">{prescriptionError}</p>
//                   )}
//                   {patientInfo.prescriptionFile && (
//                     <div className="flex items-center justify-between bg-[var(--bg-light, #f8fafc)] p-3 rounded border border-[var(--text-light, #e2e8f0)]">
//                       <div className="flex items-center space-x-2 min-w-0">
//                         {patientInfo.prescriptionFile.type === 'application/pdf' ? (
//                           <FaFilePdf className="w-5 h-5 text-red-500 flex-shrink-0" />
//                         ) : (
//                           <FaFileUpload className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                         )}
//                         <span className="text-sm text-gray-700 truncate">
//                           {patientInfo.prescriptionFile.name}
//                           <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
//                             ({(patientInfo.prescriptionFile.size / 1024).toFixed(1)} KB)
//                           </span>
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={removeFile}
//                         className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
//                       >
//                         <FaTimes className="w-5 h-5" />
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
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white"
//                   placeholder="Any additional prescription details, doctor's notes, or special instructions..."
//                 />
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={!!emailError || filteredCart.length === 0 || (isPrescriptionRequired && !patientInfo.prescriptionFile)}
//                 className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold ${
//                   emailError || filteredCart.length === 0 || (isPrescriptionRequired && !patientInfo.prescriptionFile)
//                     ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 Confirm Order - Rs. {finalTotal.toFixed(2)}
//               </button>
//             </div>
            
//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Note: Your order will be processed and delivered from the respective pharmacies based on item availability.
//               You'll receive a unique order number to track your order.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;




















// prescription removed
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FaArrowLeft, FaTrash, FaFileUpload, FaTimes, FaPlus, 
//   FaMinus, FaCheckCircle, FaReceipt, FaHistory, FaExclamationCircle,
//   FaBox, FaBoxes, FaFlask
// } from 'react-icons/fa';

// const MedicineBooking = ({ cart, setCart }) => {
//   const navigate = useNavigate();
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     notes: ''
//   });
//   const [pharmacies, setPharmacies] = useState([]);
//   const [selectedPharmacy, setSelectedPharmacy] = useState('all');
//   const [filteredCart, setFilteredCart] = useState([]);
//   const [emailError, setEmailError] = useState('');
//   const [orders, setOrders] = useState([]);
//   const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [loadingPharmacies, setLoadingPharmacies] = useState(false);
//   const [pharmacyError, setPharmacyError] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const formRef = useRef(null);

//   // Helper function to detect medicine form type
//   const isTabletForm = (form) => {
//     if (!form) return false;
//     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
//     return tabletForms.some(t => form.toLowerCase().includes(t));
//   };

//   const isLiquidForm = (form) => {
//     if (!form) return false;
//     const liquidForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
//     return liquidForms.some(l => form.toLowerCase().includes(l));
//   };

//   // Get form icon
//   const getFormIcon = (item) => {
//     if (isTabletForm(item.form)) return <FaBoxes className="text-blue-500" />;
//     if (isLiquidForm(item.form)) return <FaFlask className="text-green-500" />;
//     return <FaBox className="text-gray-500" />;
//   };

//   // Get display quantity text
//   const getQuantityDisplay = (item) => {
//     if (isTabletForm(item.form) && item.tabletQuantity) {
//       return `${item.tabletQuantity} tablet${item.tabletQuantity > 1 ? 's' : ''} (${item.quantity} unit${item.quantity > 1 ? 's' : ''})`;
//     }
//     if (isLiquidForm(item.form)) {
//       return `${item.quantity} bottle${item.quantity > 1 ? 's' : ''}`;
//     }
//     return `${item.quantity} unit${item.quantity > 1 ? 's' : ''}`;
//   };

//   // ================================
//   // AUTH EVENT HANDLERS
//   // ================================
//   const handleLoginSuccess = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', userData.token);
//     window.dispatchEvent(new CustomEvent('userChanged'));
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     window.dispatchEvent(new CustomEvent('userChanged'));
//     navigate('/login');
//   };
//   // ================================

//   // Get user-specific cart key
//   const getUserCartKey = (userId) => {
//     return userId ? `medicineCart_${userId}` : 'medicineCart_guest';
//   };

//   // Get user-specific orders key
//   const getUserOrdersKey = (userId) => {
//     return userId ? `medicineOrders_${userId}` : 'medicineOrders_guest';
//   };

//   // Get current user from localStorage
//   const getCurrentUser = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         return user;
//       }
//     } catch (error) {
//       console.error('Error getting user:', error);
//     }
//     return null;
//   };

//   // Load user-specific data
//   const loadUserData = () => {
//     const user = getCurrentUser();
//     setCurrentUser(user);
    
//     if (user) {
//       const cartKey = getUserCartKey(user._id || user.id);
//       const savedCart = localStorage.getItem(cartKey);
      
//       if (savedCart) {
//         try {
//           const parsedCart = JSON.parse(savedCart);
//           setCart(parsedCart);
//         } catch (error) {
//           console.error('Error parsing saved cart:', error);
//           setCart([]);
//         }
//       } else {
//         setCart([]);
//       }
      
//       const ordersKey = getUserOrdersKey(user._id || user.id);
//       const savedOrders = localStorage.getItem(ordersKey);
//       if (savedOrders) {
//         try {
//           setOrders(JSON.parse(savedOrders));
//         } catch (error) {
//           console.error('Error parsing saved orders:', error);
//           setOrders([]);
//         }
//       } else {
//         setOrders([]);
//       }
//     } else {
//       setCart([]);
//       setOrders([]);
//     }
    
//     setIsInitialized(true);
//   };

//   // Save cart to user-specific localStorage
//   const saveUserCart = (user, cartData) => {
//     if (!user) return;
    
//     const cartKey = getUserCartKey(user._id || user.id);
    
//     if (cartData && cartData.length > 0) {
//       localStorage.setItem(cartKey, JSON.stringify(cartData));
//     } else {
//       localStorage.removeItem(cartKey);
//     }
//   };

//   // Save orders to user-specific localStorage
//   const saveUserOrders = (user, ordersData) => {
//     if (!user) return;
    
//     const ordersKey = getUserOrdersKey(user._id || user.id);
//     localStorage.setItem(ordersKey, JSON.stringify(ordersData));
//   };

//   // Load cart and orders on component mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     if (formRef.current) {
//       formRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
    
//     loadUserData();
//     fetchPharmacies();
    
//     const handleAuthChange = () => {
//       loadUserData();
//     };
    
//     window.addEventListener('userChanged', handleAuthChange);
    
//     return () => {
//       window.removeEventListener('userChanged', handleAuthChange);
//     };
//   }, []);

//   // Save cart when it changes
//   useEffect(() => {
//     if (!isInitialized || !currentUser) return;
    
//     saveUserCart(currentUser, cart);
//   }, [cart, currentUser, isInitialized]);

//   // Save orders when they change
//   useEffect(() => {
//     if (!isInitialized || !currentUser) return;
    
//     saveUserOrders(currentUser, orders);
//   }, [orders, currentUser, isInitialized]);

//   // Initialize filtered cart when cart changes
//   useEffect(() => {
//     const safeCart = cart || [];
//     filterCartByPharmacy(selectedPharmacy);
//   }, [cart, selectedPharmacy]);

//   // Generate unique order number
//   const generateOrderNumber = () => {
//     const timestamp = Date.now();
//     const random = Math.floor(Math.random() * 1000);
//     return `ORD-${timestamp}-${random}`;
//   };

//   // Fetch pharmacies from backend
//   const fetchPharmacies = async () => {
//     setLoadingPharmacies(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/pharmacies');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       if (data.success) {
//         setPharmacies(data.data);
//         setPharmacyError(null);
//       } else {
//         setPharmacyError('Failed to load pharmacies. Using default data.');
//         setPharmacies([
//           { _id: 'pharma1', name: 'City Pharmacy' },
//           { _id: 'pharma2', name: 'Medicare Center' },
//           { _id: 'pharma3', name: 'Health Plus' }
//         ]);
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setPharmacyError('Cannot connect to server. Using offline mode.');
//       setPharmacies([
//         { _id: 'pharma1', name: 'City Pharmacy' },
//         { _id: 'pharma2', name: 'Medicare Center' },
//         { _id: 'pharma3', name: 'Health Plus' }
//       ]);
//     } finally {
//       setLoadingPharmacies(false);
//     }
//   };

//   // Get unique pharmacies from cart items
//   const getUniquePharmaciesFromCart = () => {
//     const pharmacyMap = new Map();
//     const safeCart = cart || [];
    
//     safeCart.forEach(item => {
//       if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//         item.pharmacyIds.forEach(pharmacyId => {
//           if (!pharmacyMap.has(pharmacyId)) {
//             const pharmacy = pharmacies.find(p => p._id === pharmacyId);
//             if (pharmacy) {
//               pharmacyMap.set(pharmacyId, pharmacy);
//             } else {
//               pharmacyMap.set(pharmacyId, { 
//                 _id: pharmacyId, 
//                 name: 'Local Pharmacy' 
//               });
//             }
//           }
//         });
//       }
      
//       if (item.selectedPharmacy && item.selectedPharmacy._id) {
//         if (!pharmacyMap.has(item.selectedPharmacy._id)) {
//           pharmacyMap.set(item.selectedPharmacy._id, item.selectedPharmacy);
//         }
//       }
      
//       if (item.pharmacyId) {
//         if (!pharmacyMap.has(item.pharmacyId)) {
//           const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//           if (pharmacy) {
//             pharmacyMap.set(item.pharmacyId, pharmacy);
//           } else {
//             pharmacyMap.set(item.pharmacyId, { 
//               _id: item.pharmacyId, 
//               name: 'Local Pharmacy' 
//             });
//           }
//         }
//       }
//     });
    
//     return Array.from(pharmacyMap.values());
//   };

//   // Filter cart items by selected pharmacy
//   const filterCartByPharmacy = (pharmacyId) => {
//     const safeCart = cart || [];
    
//     if (pharmacyId === 'all') {
//       setFilteredCart(safeCart);
//       return;
//     }
    
//     const filtered = safeCart.filter(item => {
//       if (item.selectedPharmacy && item.selectedPharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
//         return true;
//       }
      
//       if (item.pharmacy && item.pharmacy._id === pharmacyId) {
//         return true;
//       }
      
//       if (item.pharmacyId === pharmacyId) {
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

//   // Get pharmacy name for an item
//   const getPharmacyNameForItem = (item) => {
//     if (item.selectedPharmacy && item.selectedPharmacy.name) {
//       return item.selectedPharmacy.name;
//     }
    
//     if (item.pharmacy && item.pharmacy.name) {
//       return item.pharmacy.name;
//     }
    
//     if (item.pharmacyTag) {
//       return item.pharmacyTag;
//     }
    
//     if (item.pharmacyId) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
//       return pharmacy ? pharmacy.name : 'Pharmacy';
//     }
    
//     return 'Pharmacy';
//   };

//   // Get pharmacy ID for an item
//   const getPharmacyIdForItem = (item) => {
//     if (item.selectedPharmacy && item.selectedPharmacy._id) {
//       return item.selectedPharmacy._id;
//     }
//     if (item.pharmacy && item.pharmacy._id) {
//       return item.pharmacy._id;
//     }
//     if (item.pharmacyId) {
//       return item.pharmacyId;
//     }
//     if (item.pharmacyIds && item.pharmacyIds.length > 0) {
//       return item.pharmacyIds[0];
//     }
//     return null;
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

//   const removeFromCart = (medicineId) => {
//     const newCart = (cart || []).filter(item => item.id !== medicineId);
//     setCart(newCart);
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     const newCart = (cart || []).map(item => {
//       if (item.id === medicineId) {
//         // If it's a tablet/capsule item with tabletQuantity, update accordingly
//         if (isTabletForm(item.form) && item.tabletQuantity) {
//           const tabletsPerUnit = item.tabletsPerUnit || 10;
//           return { 
//             ...item, 
//             quantity: newQuantity,
//             tabletQuantity: newQuantity * tabletsPerUnit,
//             totalTablets: newQuantity * tabletsPerUnit
//           };
//         }
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });
    
//     setCart(newCart);
//   };

//   // Calculate total for filtered cart
//   const totalPrice = filteredCart.reduce((total, item) => {
//     // If it's a tablet item with tabletQuantity, calculate based on tablet price
//     if (isTabletForm(item.form) && item.tabletQuantity) {
//       const perTabletPrice = (item.discountedPrice || item.price || 0) / (item.tabletsPerUnit || 10);
//       return total + (perTabletPrice * item.tabletQuantity);
//     }
//     return total + ((item.discountedPrice || item.price || 0) * item.quantity);
//   }, 0);
  
//   const deliveryCharge = 0;
//   const finalTotal = totalPrice + deliveryCharge;

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!currentUser) {
//       alert('Please login to place an order');
//       navigate('/login', {
//         state: {
//           redirectTo: '/booking',
//           message: 'Please login to place an order'
//         }
//       });
//       return;
//     }
    
//     if (patientInfo.email.trim()) {
//       const error = validateEmail(patientInfo.email);
//       if (error) {
//         setEmailError(error);
//         return;
//       }
//     }
    
//     if (!cart || cart.length === 0) {
//       alert('Your cart is empty. Please add medicines before booking.');
//       return;
//     }
    
//     const orderNumber = generateOrderNumber();
//     const orderItems = selectedPharmacy === 'all' ? cart : filteredCart;
    
//     const orderData = {
//       orderNumber,
//       patientInfo: { ...patientInfo },
//       cart: orderItems.map(item => ({
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         quantity: item.quantity,
//         tabletQuantity: item.tabletQuantity || null,
//         tabletsPerUnit: item.tabletsPerUnit || 10,
//         form: item.form,
//         price: item.price || item.discountedPrice || 0,
//         pharmacyIds: item.pharmacyIds || [],
//         selectedPharmacy: item.selectedPharmacy || null,
//         pharmacyTag: item.pharmacyTag || null
//       })),
//       total: finalTotal,
//       selectedPharmacy,
//       status: 'Processing',
//       date: new Date().toLocaleString(),
//       timestamp: new Date().toISOString(),
//       userId: currentUser._id || currentUser.id
//     };
    
//     setOrders(prevOrders => [orderData, ...prevOrders]);
//     setCurrentOrder(orderData);
//     setShowOrderConfirmation(true);
    
//     setCart([]);
//     setPatientInfo({
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       notes: ''
//     });
//     setEmailError('');
//     setSelectedPharmacy('all');
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handlePharmacyChange = (pharmacyId) => {
//     setSelectedPharmacy(pharmacyId);
//     filterCartByPharmacy(pharmacyId);
//   };

//   const closeOrderConfirmation = () => {
//     setShowOrderConfirmation(false);
//     setCurrentOrder(null);
//     navigate('/pharmacies');
//   };

//   const viewOrderHistory = () => {
//     navigate('/orders');
//   };

//   const safeCart = cart || [];
//   const isLoggedIn = !!currentUser;

//   if (!isInitialized) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your cart...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
//             <FaExclamationCircle className="w-10 h-10 text-yellow-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Login Required</h2>
//           <p className="text-gray-600 text-center mb-6">Please login to view your cart and place orders.</p>
//           <button
//             onClick={() => navigate('/login', { state: { redirectTo: '/booking' } })}
//             className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//           >
//             Login to Continue
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (safeCart.length === 0 && !showOrderConfirmation) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
//             <FaBox className="w-10 h-10 text-blue-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
//           <p className="text-gray-600 mb-6">
//             Hello, {currentUser?.name || currentUser?.email?.split('@')[0] || 'there'}! Start adding medicines to your cart.
//           </p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//           >
//             Browse Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const cartPharmacies = getUniquePharmaciesFromCart();

//   return (
//     <div ref={formRef} className="min-h-screen bg-gray-50 py-4 sm:py-8">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Order Confirmation Modal */}
//         {showOrderConfirmation && currentOrder && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6">
//                 <div className="text-center mb-6">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FaCheckCircle className="w-10 h-10 text-green-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
//                   <p className="text-gray-600">Your order has been placed successfully</p>
//                 </div>
                
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
//                   <div className="text-center mb-4">
//                     <p className="text-sm text-gray-500">Order Number</p>
//                     <p className="text-xl font-bold text-[var(--primary-color)] break-all">{currentOrder.orderNumber}</p>
//                   </div>
                  
//                   <div className="space-y-3">
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <span className="text-gray-600">Patient Name:</span>
//                       <span className="font-medium">{currentOrder.patientInfo.name || 'Not provided'}</span>
//                     </div>
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <span className="text-gray-600">Phone:</span>
//                       <span className="font-medium">{currentOrder.patientInfo.phone || 'Not provided'}</span>
//                     </div>
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <span className="text-gray-600">Total Amount:</span>
//                       <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
//                     </div>
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <span className="text-gray-600">Status:</span>
//                       <span className="font-medium text-green-600">{currentOrder.status}</span>
//                     </div>
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <span className="text-gray-600">Date:</span>
//                       <span className="font-medium">{currentOrder.date}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-3">
//                   <button
//                     onClick={closeOrderConfirmation}
//                     className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold"
//                   >
//                     Continue Shopping
//                   </button>
//                   <button
//                     onClick={viewOrderHistory}
//                     className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
//                   >
//                     <FaHistory /> View Order History
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
//               aria-label="Go back"
//             >
//               <FaArrowLeft className="w-5 h-5 text-[var(--primary-color)]" />
//             </button>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">Book Your Medicines</h1>
//               <p className="text-sm sm:text-base text-gray-600 mt-1">
//                 Welcome, <span className="font-medium">{currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}</span>
//               </p>
//             </div>
//           </div>
          
//           {orders.length > 0 && (
//             <button
//               onClick={viewOrderHistory}
//               className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors text-sm sm:text-base"
//             >
//               <FaReceipt className="mr-2" />
//               Order History ({orders.length})
//             </button>
//           )}
//         </div>

//         {/* Pharmacy loading/error messages */}
//         {loadingPharmacies && (
//           <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
//             Loading pharmacy information...
//           </div>
//         )}
        
//         {pharmacyError && (
//           <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
//             {pharmacyError}
//           </div>
//         )}

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {/* Left Column - Cart Items */}
//           <div className="space-y-4">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
//               Selected Medicines <span className="text-sm font-normal text-gray-500 ml-2">({filteredCart.length} items)</span>
//             </h2>
            
//             {/* Pharmacy Filter */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Filter by Pharmacy
//               </label>
//               <select
//                 value={selectedPharmacy}
//                 onChange={(e) => handlePharmacyChange(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
//               >
//                 <option value="all">All Pharmacies ({safeCart.length} items)</option>
//                 {cartPharmacies.map(pharmacy => {
//                   const pharmacyItems = safeCart.filter(item => {
//                     const itemPharmacyId = getPharmacyIdForItem(item);
//                     return itemPharmacyId === pharmacy._id;
//                   }).length;
                  
//                   return (
//                     <option key={pharmacy._id} value={pharmacy._id}>
//                       {pharmacy.name} ({pharmacyItems} items)
//                     </option>
//                   );
//                 })}
//               </select>
//               <p className="text-xs sm:text-sm text-gray-500 mt-2">
//                 {selectedPharmacy === 'all' 
//                   ? `Showing all ${safeCart.length} items from ${cartPharmacies.length} pharmacies`
//                   : `Showing ${filteredCart.length} items from selected pharmacy`
//                 }
//               </p>
//             </div>
            
//             {/* Cart Items List */}
//             {filteredCart.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
//                 <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600 mb-4">No items found for the selected pharmacy.</p>
//                 <button
//                   onClick={() => handlePharmacyChange('all')}
//                   className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium"
//                 >
//                   Show all items
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="space-y-4">
//                   {filteredCart.map(item => {
//                     const pharmacyName = getPharmacyNameForItem(item);
//                     const itemFormIcon = getFormIcon(item);
//                     const quantityDisplay = getQuantityDisplay(item);
                    
//                     return (
//                       <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                         <div className="flex flex-col sm:flex-row items-start gap-4">
//                           {/* Item Image */}
//                           <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="max-h-16 max-w-16 object-contain"
//                               onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                               }}
//                             />
//                           </div>
                          
//                           {/* Item Details */}
//                           <div className="flex-1 min-w-0 w-full">
//                             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 flex-wrap">
//                                   <h3 className="font-semibold text-gray-800 text-base sm:text-lg truncate max-w-[200px] sm:max-w-none">
//                                     {item.name}
//                                   </h3>
//                                   <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
//                                     {itemFormIcon}
//                                     <span className="ml-1">{item.form || 'Medicine'}</span>
//                                   </span>
//                                 </div>
                                
//                                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
//                                   <p className="text-gray-600 text-sm sm:text-base">
//                                     Rs. {(item.discountedPrice || item.price || 0).toFixed(2)} per unit
//                                   </p>
//                                   <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full whitespace-nowrap">
//                                     {pharmacyName}
//                                   </span>
//                                 </div>
                                
//                                 {isTabletForm(item.form) && item.tabletQuantity && (
//                                   <p className="text-xs text-gray-500 mt-1">
//                                     {item.tabletsPerUnit || 10} tablets per unit • {item.tabletQuantity} tablets total
//                                   </p>
//                                 )}
//                               </div>
                              
//                               {/* Quantity Controls */}
//                               <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-3 sm:mt-0">
//                                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                                   <button
//                                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                     className="w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
//                                     aria-label="Decrease quantity"
//                                   >
//                                     <FaMinus className="w-3 h-3" />
//                                   </button>
//                                   <span className="w-12 text-center font-medium text-sm sm:text-base">
//                                     {item.quantity}
//                                   </span>
//                                   <button
//                                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                     className="w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
//                                     aria-label="Increase quantity"
//                                   >
//                                     <FaPlus className="w-3 h-3" />
//                                   </button>
//                                 </div>
//                                 <button
//                                   onClick={() => removeFromCart(item.id)}
//                                   className="ml-3 text-red-500 hover:text-red-700 transition-colors p-2"
//                                   aria-label="Remove item"
//                                 >
//                                   <FaTrash className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </div>
                            
//                             {/* Item Total */}
//                             <div className="mt-3 text-right border-t pt-3 border-gray-100">
//                               <span className="text-sm text-gray-600">Item Total: </span>
//                               <span className="font-bold text-[var(--secondary-color)]">
//                                 Rs. {((item.discountedPrice || item.price || 0) * item.quantity).toFixed(2)}
//                               </span>
//                               {isTabletForm(item.form) && item.tabletQuantity && (
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   ({quantityDisplay})
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Pharmacy Summary for multiple pharmacies */}
//                 {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
//                   <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                     <h3 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">
//                       Order Summary by Pharmacy:
//                     </h3>
//                     <div className="space-y-2">
//                       {cartPharmacies.map(pharmacy => {
//                         const pharmacyItems = safeCart.filter(item => {
//                           const itemPharmacyId = getPharmacyIdForItem(item);
//                           return itemPharmacyId === pharmacy._id;
//                         });
                        
//                         const pharmacyTotal = pharmacyItems.reduce((total, item) => {
//                           if (isTabletForm(item.form) && item.tabletQuantity) {
//                             const perTabletPrice = (item.discountedPrice || item.price || 0) / (item.tabletsPerUnit || 10);
//                             return total + (perTabletPrice * item.tabletQuantity);
//                           }
//                           return total + ((item.discountedPrice || item.price || 0) * item.quantity);
//                         }, 0);
                        
//                         return (
//                           <div key={pharmacy._id} className="flex flex-col sm:flex-row sm:justify-between text-sm">
//                             <span className="font-medium truncate">{pharmacy.name}:</span>
//                             <span className="text-gray-700">
//                               {pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Order Total */}
//                 <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm sm:text-base">
//                       <span className="text-gray-600">Subtotal ({filteredCart.length} items):</span>
//                       <span className="font-medium">Rs. {totalPrice.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm sm:text-base">
//                       <span className="text-gray-600">Delivery Charge:</span>
//                       <span className="text-green-600 font-medium">Free</span>
//                     </div>
//                     <div className="border-t pt-3 mt-3 border-gray-200">
//                       <div className="flex justify-between text-lg sm:text-xl font-bold">
//                         <span>Total:</span>
//                         <span className="text-[var(--secondary-color)]">Rs. {finalTotal.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Right Column - Customer Information Form */}
//           <div>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
//             <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
//               <div className="space-y-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={patientInfo.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
                
//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={patientInfo.email}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base ${
//                       emailError ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="example@gmail.com"
//                   />
//                   {emailError && (
//                     <p className="text-red-500 text-xs mt-1">{emailError}</p>
//                   )}
//                   <p className="text-xs text-gray-500 mt-1">
//                     Format: name@domain.com
//                   </p>
//                 </div>
                
//                 {/* Phone Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     placeholder="03XXXXXXXXX"
//                     value={patientInfo.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
//                     maxLength="11"
//                     pattern="[0-9]{11}"
//                     inputMode="numeric"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">11 digits (e.g., 03123456789)</p>
//                 </div>
                
//                 {/* Address Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Delivery Address <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="address"
//                     required
//                     value={patientInfo.address}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
//                     placeholder="House #, Street, Area, City"
//                   />
//                 </div>
                
//                 {/* Additional Notes - replaces prescription field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Additional Notes (Optional)
//                   </label>
//                   <textarea
//                     name="notes"
//                     value={patientInfo.notes}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
//                     placeholder="Any special instructions or delivery notes..."
//                   />
//                 </div>
//               </div>
              
//               {/* Form Actions */}
//               <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={handleBack}
//                   className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={!!emailError || filteredCart.length === 0}
//                   className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold text-sm sm:text-base order-1 sm:order-2 ${
//                     emailError || filteredCart.length === 0
//                       ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
//                       : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                   }`}
//                 >
//                   Place Order - Rs. {finalTotal.toFixed(2)}
//                 </button>
//               </div>
              
//               <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center">
//                 Your order will be processed and delivered from the respective pharmacies. 
//                 You'll receive a unique order number to track your order.
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineBooking;























/////////////////////////////////////////////////////////////
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaTrash, FaTimes, FaPlus, 
  FaMinus, FaCheckCircle, FaReceipt, FaHistory, FaExclamationCircle,
  FaBox, FaBoxes, FaFlask, FaPills
} from 'react-icons/fa';

const MedicineBooking = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState('all');
  const [filteredCart, setFilteredCart] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [orders, setOrders] = useState([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);
  const [pharmacyError, setPharmacyError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // For tablet quantity editing
  const [tempTabletQuantity, setTempTabletQuantity] = useState(1);
  const formRef = useRef(null);

  // Helper function to detect medicine form type
  const isTabletForm = (form) => {
    if (!form) return false;
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return tabletForms.some(t => form.toLowerCase().includes(t));
  };

  const isLiquidForm = (form) => {
    if (!form) return false;
    const liquidForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
    return liquidForms.some(l => form.toLowerCase().includes(l));
  };

  // Get form icon
  const getFormIcon = (item) => {
    if (isTabletForm(item.form)) return <FaBoxes className="text-blue-500" />;
    if (isLiquidForm(item.form)) return <FaFlask className="text-green-500" />;
    return <FaBox className="text-gray-500" />;
  };

  // Get display quantity text
  const getQuantityDisplay = (item) => {
    if (isTabletForm(item.form) && item.tabletQuantity) {
      return `${item.tabletQuantity} tablet${item.tabletQuantity > 1 ? 's' : ''}`;
    }
    if (isLiquidForm(item.form)) {
      return `${item.quantity} bottle${item.quantity > 1 ? 's' : ''}`;
    }
    return `${item.quantity} unit${item.quantity > 1 ? 's' : ''}`;
  };

  // Get price per tablet
  const getPricePerTablet = (item) => {
    const unitPrice = item.discountedPrice || item.price || 0;
    const tabletsPerUnit = item.tabletsPerUnit || 10;
    return unitPrice / tabletsPerUnit;
  };

  // ================================
  // AUTH EVENT HANDLERS
  // ================================
  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    window.dispatchEvent(new CustomEvent('userChanged'));
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('userChanged'));
    navigate('/login');
  };
  // ================================

  // Get user-specific cart key
  const getUserCartKey = (userId) => {
    return userId ? `medicineCart_${userId}` : 'medicineCart_guest';
  };

  // Get user-specific orders key
  const getUserOrdersKey = (userId) => {
    return userId ? `medicineOrders_${userId}` : 'medicineOrders_guest';
  };

  // Get current user from localStorage
  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user;
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
    return null;
  };

  // Load user-specific data
  const loadUserData = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      const cartKey = getUserCartKey(user._id || user.id);
      const savedCart = localStorage.getItem(cartKey);
      
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error('Error parsing saved cart:', error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
      
      const ordersKey = getUserOrdersKey(user._id || user.id);
      const savedOrders = localStorage.getItem(ordersKey);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error('Error parsing saved orders:', error);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } else {
      setCart([]);
      setOrders([]);
    }
    
    setIsInitialized(true);
  };

  // Save cart to user-specific localStorage
  const saveUserCart = (user, cartData) => {
    if (!user) return;
    
    const cartKey = getUserCartKey(user._id || user.id);
    
    if (cartData && cartData.length > 0) {
      localStorage.setItem(cartKey, JSON.stringify(cartData));
    } else {
      localStorage.removeItem(cartKey);
    }
  };

  // Save orders to user-specific localStorage
  const saveUserOrders = (user, ordersData) => {
    if (!user) return;
    
    const ordersKey = getUserOrdersKey(user._id || user.id);
    localStorage.setItem(ordersKey, JSON.stringify(ordersData));
  };

  // Load cart and orders on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    loadUserData();
    fetchPharmacies();
    
    const handleAuthChange = () => {
      loadUserData();
    };
    
    window.addEventListener('userChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('userChanged', handleAuthChange);
    };
  }, []);

  // Save cart when it changes
  useEffect(() => {
    if (!isInitialized || !currentUser) return;
    
    saveUserCart(currentUser, cart);
  }, [cart, currentUser, isInitialized]);

  // Save orders when they change
  useEffect(() => {
    if (!isInitialized || !currentUser) return;
    
    saveUserOrders(currentUser, orders);
  }, [orders, currentUser, isInitialized]);

  // Initialize filtered cart when cart changes
  useEffect(() => {
    const safeCart = cart || [];
    filterCartByPharmacy(selectedPharmacy);
  }, [cart, selectedPharmacy]);

  // Generate unique order number
  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  // Fetch pharmacies from backend
  const fetchPharmacies = async () => {
    setLoadingPharmacies(true);
    try {
      const response = await fetch('http://localhost:5000/api/pharmacies');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setPharmacies(data.data);
        setPharmacyError(null);
      } else {
        setPharmacyError('Failed to load pharmacies. Using default data.');
        setPharmacies([
          { _id: 'pharma1', name: 'City Pharmacy' },
          { _id: 'pharma2', name: 'Medicare Center' },
          { _id: 'pharma3', name: 'Health Plus' }
        ]);
      }
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      setPharmacyError('Cannot connect to server. Using offline mode.');
      setPharmacies([
        { _id: 'pharma1', name: 'City Pharmacy' },
        { _id: 'pharma2', name: 'Medicare Center' },
        { _id: 'pharma3', name: 'Health Plus' }
      ]);
    } finally {
      setLoadingPharmacies(false);
    }
  };

  // Get unique pharmacies from cart items
  const getUniquePharmaciesFromCart = () => {
    const pharmacyMap = new Map();
    const safeCart = cart || [];
    
    safeCart.forEach(item => {
      if (item.pharmacyIds && item.pharmacyIds.length > 0) {
        item.pharmacyIds.forEach(pharmacyId => {
          if (!pharmacyMap.has(pharmacyId)) {
            const pharmacy = pharmacies.find(p => p._id === pharmacyId);
            if (pharmacy) {
              pharmacyMap.set(pharmacyId, pharmacy);
            } else {
              pharmacyMap.set(pharmacyId, { 
                _id: pharmacyId, 
                name: 'Local Pharmacy' 
              });
            }
          }
        });
      }
      
      if (item.selectedPharmacy && item.selectedPharmacy._id) {
        if (!pharmacyMap.has(item.selectedPharmacy._id)) {
          pharmacyMap.set(item.selectedPharmacy._id, item.selectedPharmacy);
        }
      }
      
      if (item.pharmacyId) {
        if (!pharmacyMap.has(item.pharmacyId)) {
          const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
          if (pharmacy) {
            pharmacyMap.set(item.pharmacyId, pharmacy);
          } else {
            pharmacyMap.set(item.pharmacyId, { 
              _id: item.pharmacyId, 
              name: 'Local Pharmacy' 
            });
          }
        }
      }
    });
    
    return Array.from(pharmacyMap.values());
  };

  // Filter cart items by selected pharmacy
  const filterCartByPharmacy = (pharmacyId) => {
    const safeCart = cart || [];
    
    if (pharmacyId === 'all') {
      setFilteredCart(safeCart);
      return;
    }
    
    const filtered = safeCart.filter(item => {
      if (item.selectedPharmacy && item.selectedPharmacy._id === pharmacyId) {
        return true;
      }
      
      if (item.pharmacyIds && item.pharmacyIds.includes(pharmacyId)) {
        return true;
      }
      
      if (item.pharmacy && item.pharmacy._id === pharmacyId) {
        return true;
      }
      
      if (item.pharmacyId === pharmacyId) {
        return true;
      }
      
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
    if (item.selectedPharmacy && item.selectedPharmacy.name) {
      return item.selectedPharmacy.name;
    }
    
    if (item.pharmacy && item.pharmacy.name) {
      return item.pharmacy.name;
    }
    
    if (item.pharmacyTag) {
      return item.pharmacyTag;
    }
    
    if (item.pharmacyId) {
      const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
      return pharmacy ? pharmacy.name : 'Pharmacy';
    }
    
    if (item.pharmacyIds && item.pharmacyIds.length > 0) {
      const pharmacy = pharmacies.find(p => p._id === item.pharmacyIds[0]);
      return pharmacy ? pharmacy.name : 'Pharmacy';
    }
    
    return 'Pharmacy';
  };

  // Get pharmacy ID for an item
  const getPharmacyIdForItem = (item) => {
    if (item.selectedPharmacy && item.selectedPharmacy._id) {
      return item.selectedPharmacy._id;
    }
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

  const removeFromCart = (medicineId) => {
    const newCart = (cart || []).filter(item => item.id !== medicineId);
    setCart(newCart);
  };

  // Update unit quantity
  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newCart = (cart || []).map(item => {
      if (item.id === medicineId) {
        // If it's a tablet/capsule item with tabletQuantity, update accordingly
        if (isTabletForm(item.form) && item.tabletQuantity) {
          const tabletsPerUnit = item.tabletsPerUnit || 10;
          return { 
            ...item, 
            quantity: newQuantity,
            tabletQuantity: newQuantity * tabletsPerUnit,
            totalTablets: newQuantity * tabletsPerUnit
          };
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCart(newCart);
    setEditingItem(null);
  };

  // Update tablet quantity directly
  const updateTabletQuantity = (medicineId, newTabletQuantity) => {
    if (newTabletQuantity < 1) return;
    
    const newCart = (cart || []).map(item => {
      if (item.id === medicineId && isTabletForm(item.form)) {
        const tabletsPerUnit = item.tabletsPerUnit || 10;
        const newUnits = Math.ceil(newTabletQuantity / tabletsPerUnit);
        
        return { 
          ...item, 
          quantity: newUnits,
          tabletQuantity: newTabletQuantity,
          totalTablets: newTabletQuantity
        };
      }
      return item;
    });
    
    setCart(newCart);
    setEditingItem(null);
  };

  // Open tablet editor
  const openTabletEditor = (item) => {
    setEditingItem(item.id);
    setTempTabletQuantity(item.tabletQuantity || (item.quantity * (item.tabletsPerUnit || 10)));
  };

  // Calculate item total price
  const calculateItemTotal = (item) => {
    if (isTabletForm(item.form) && item.tabletQuantity) {
      const perTabletPrice = getPricePerTablet(item);
      return perTabletPrice * item.tabletQuantity;
    }
    return (item.discountedPrice || item.price || 0) * item.quantity;
  };

  // Calculate total for filtered cart
  const totalPrice = filteredCart.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);
  
  const deliveryCharge = 0;
  const finalTotal = totalPrice + deliveryCharge;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please login to place an order');
      navigate('/login', {
        state: {
          redirectTo: '/booking',
          message: 'Please login to place an order'
        }
      });
      return;
    }
    
    if (patientInfo.email.trim()) {
      const error = validateEmail(patientInfo.email);
      if (error) {
        setEmailError(error);
        return;
      }
    }
    
    if (!cart || cart.length === 0) {
      alert('Your cart is empty. Please add medicines before booking.');
      return;
    }
    
    const orderNumber = generateOrderNumber();
    const orderItems = selectedPharmacy === 'all' ? cart : filteredCart;
    
    const orderData = {
      orderNumber,
      patientInfo: { ...patientInfo },
      cart: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        tabletQuantity: item.tabletQuantity || null,
        tabletsPerUnit: item.tabletsPerUnit || 10,
        form: item.form,
        price: item.price || item.discountedPrice || 0,
        discountedPrice: item.discountedPrice,
        perTabletPrice: isTabletForm(item.form) ? getPricePerTablet(item) : null,
        pharmacyIds: item.pharmacyIds || [],
        selectedPharmacy: item.selectedPharmacy || null,
        pharmacyTag: item.pharmacyTag || null
      })),
      total: finalTotal,
      selectedPharmacy,
      status: 'Processing',
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString(),
      userId: currentUser._id || currentUser.id
    };
    
    setOrders(prevOrders => [orderData, ...prevOrders]);
    setCurrentOrder(orderData);
    setShowOrderConfirmation(true);
    
    setCart([]);
    setPatientInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
    setEmailError('');
    setSelectedPharmacy('all');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePharmacyChange = (pharmacyId) => {
    setSelectedPharmacy(pharmacyId);
    filterCartByPharmacy(pharmacyId);
  };

  const closeOrderConfirmation = () => {
    setShowOrderConfirmation(false);
    setCurrentOrder(null);
    navigate('/pharmacies');
  };

  const viewOrderHistory = () => {
    navigate('/orders');
  };

  const safeCart = cart || [];
  const isLoggedIn = !!currentUser;

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <FaExclamationCircle className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Login Required</h2>
          <p className="text-gray-600 text-center mb-6">Please login to view your cart and place orders.</p>
          <button
            onClick={() => navigate('/login', { state: { redirectTo: '/booking' } })}
            className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (safeCart.length === 0 && !showOrderConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <FaBox className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Hello, {currentUser?.name || currentUser?.email?.split('@')[0] || 'there'}! Start adding medicines to your cart.
          </p>
          <button
            onClick={() => navigate('/pharmacies')}
            className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Browse Pharmacies
          </button>
        </div>
      </div>
    );
  }

  const cartPharmacies = getUniquePharmaciesFromCart();

  return (
    <div ref={formRef} className="container mx-auto px-4 py-8">
      {showOrderConfirmation && currentOrder && (
        <div className="fixed inset-0 bg-[var(--text-light)] bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
                <p className="text-gray-600">Your order has been placed successfully</p>
              </div>
              
              <div className="bg-[var(--bg-light, #f8fafc)] p-4 rounded-lg mb-6 border border-[var(--text-light, #e2e8f0)]">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="text-xl font-bold text-[var(--primary-color)]">{currentOrder.orderNumber}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient Name:</span>
                    <span className="font-medium">{currentOrder.patientInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{currentOrder.patientInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">{currentOrder.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{currentOrder.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={closeOrderConfirmation}
                  className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold shadow-sm"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={viewOrderHistory}
                  className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-[var(--bg-light, #f8fafc)] transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <FaHistory /> View Order History
                </button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  You can view your order details anytime in the Order History section
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Go back"
            >
              <FaArrowLeft className="w-5 h-5 text-[var(--primary-color)]" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">Book Your Medicines</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Welcome, <span className="font-medium">{currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}</span>
              </p>
            </div>
          </div>
          
          {orders.length > 0 && (
            <button
              onClick={viewOrderHistory}
              className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors text-sm sm:text-base"
            >
              <FaReceipt className="mr-2" />
              Order History ({orders.length})
            </button>
          )}
        </div>

        {/* Pharmacy loading/error messages */}
        {loadingPharmacies && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
            Loading pharmacy information...
          </div>
        )}
        
        {pharmacyError && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
            {pharmacyError}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Cart Items */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Selected Medicines <span className="text-sm font-normal text-gray-500 ml-2">({filteredCart.length} items)</span>
            </h2>
            
            {/* Pharmacy Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Pharmacy
              </label>
              <select
                value={selectedPharmacy}
                onChange={(e) => handlePharmacyChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
              >
                <option value="all">All Pharmacies ({safeCart.length} items)</option>
                {cartPharmacies.map(pharmacy => {
                  const pharmacyItems = safeCart.filter(item => {
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
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                {selectedPharmacy === 'all' 
                  ? `Showing all ${safeCart.length} items from ${cartPharmacies.length} pharmacies`
                  : `Showing ${filteredCart.length} items from selected pharmacy`
                }
              </p>
            </div>
            
            {/* Cart Items List */}
            {filteredCart.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No items found for the selected pharmacy.</p>
                <button
                  onClick={() => handlePharmacyChange('all')}
                  className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium"
                >
                  Show all items
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {filteredCart.map(item => {
                    const pharmacyName = getPharmacyNameForItem(item);
                    const itemFormIcon = getFormIcon(item);
                    const quantityDisplay = getQuantityDisplay(item);
                    const perTabletPrice = isTabletForm(item.form) ? getPricePerTablet(item) : null;
                    const isEditing = editingItem === item.id;
                    
                    return (
                      <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          {/* Item Image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-16 max-w-16 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                              }}
                            />
                          </div>
                          
                          {/* Item Details */}
                          <div className="flex-1 min-w-0 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg truncate max-w-[200px] sm:max-w-none">
                                    {item.name}
                                  </h3>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    {itemFormIcon}
                                    <span className="ml-1">{item.form || 'Medicine'}</span>
                                  </span>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                  <p className="text-gray-600 text-sm sm:text-base">
                                    Rs. {(item.discountedPrice || item.price || 0).toFixed(2)} per unit
                                  </p>
                                  {perTabletPrice && (
                                    <p className="text-xs text-gray-500">
                                      (Rs. {perTabletPrice.toFixed(2)} per tablet)
                                    </p>
                                  )}
                                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full whitespace-nowrap">
                                    {pharmacyName}
                                  </span>
                                </div>
                                
                                {isTabletForm(item.form) && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.tabletsPerUnit || 10} tablets per unit
                                  </p>
                                )}
                              </div>
                              
                              {/* Quantity Controls - Different for tablets vs units */}
                              <div className="w-full sm:w-auto mt-3 sm:mt-0">
                                {isTabletForm(item.form) ? (
                                  // Tablet view with direct tablet quantity
                                  <div className="flex flex-col items-end gap-2">
                                    {isEditing ? (
                                      // Tablet editor mode
                                      <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden bg-blue-50">
                                        <button
                                          onClick={() => setTempTabletQuantity(prev => Math.max(1, prev - 1))}
                                          className="w-10 h-10 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
                                        >
                                          <FaMinus className="w-3 h-3" />
                                        </button>
                                        <span className="w-14 text-center font-medium text-sm">
                                          {tempTabletQuantity}
                                        </span>
                                        <button
                                          onClick={() => setTempTabletQuantity(prev => prev + 1)}
                                          className="w-10 h-10 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
                                        >
                                          <FaPlus className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ) : (
                                      // Display tablet quantity
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
                                          {item.tabletQuantity || (item.quantity * (item.tabletsPerUnit || 10))} tablets
                                        </span>
                                        <button
                                          onClick={() => openTabletEditor(item)}
                                          className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1"
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    )}
                                    
                                    {isEditing && (
                                      <div className="flex gap-2 mt-2">
                                        <button
                                          onClick={() => updateTabletQuantity(item.id, tempTabletQuantity)}
                                          className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => setEditingItem(null)}
                                          className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    )}
                                    
                                    {/* Show unit equivalent */}
                                    {!isEditing && (
                                      <p className="text-xs text-gray-500">
                                        ({item.quantity} unit{item.quantity > 1 ? 's' : ''})
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  // Unit quantity controls for non-tablet items
                                  <div className="flex items-center justify-end">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                      >
                                        <FaMinus className="w-3 h-3" />
                                      </button>
                                      <span className="w-12 text-center font-medium text-sm sm:text-base">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                      >
                                        <FaPlus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-3 text-red-500 hover:text-red-700 transition-colors p-2"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Item Total */}
                            <div className="mt-3 text-right border-t pt-3 border-gray-100">
                              <span className="text-sm text-gray-600">Item Total: </span>
                              <span className="font-bold text-[var(--secondary-color)]">
                                Rs. {calculateItemTotal(item).toFixed(2)}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">
                                {quantityDisplay}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pharmacy Summary for multiple pharmacies */}
                {cartPharmacies.length > 1 && selectedPharmacy === 'all' && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">
                      Order Summary by Pharmacy:
                    </h3>
                    <div className="space-y-2">
                      {cartPharmacies.map(pharmacy => {
                        const pharmacyItems = safeCart.filter(item => {
                          const itemPharmacyId = getPharmacyIdForItem(item);
                          return itemPharmacyId === pharmacy._id;
                        });
                        
                        const pharmacyTotal = pharmacyItems.reduce((total, item) => {
                          return total + calculateItemTotal(item);
                        }, 0);
                        
                        return (
                          <div key={pharmacy._id} className="flex flex-col sm:flex-row sm:justify-between text-sm">
                            <span className="font-medium truncate">{pharmacy.name}:</span>
                            <span className="text-gray-700">
                              {pharmacyItems.length} items - Rs. {pharmacyTotal.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Order Total */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Subtotal ({filteredCart.length} items):</span>
                      <span className="font-medium">Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Delivery Charge:</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="border-t pt-3 mt-3 border-gray-200">
                      <div className="flex justify-between text-lg sm:text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-[var(--secondary-color)]">Rs. {finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Customer Information Form */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={patientInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={patientInfo.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@gmail.com"
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Format: name@domain.com
                  </p>
                </div>
                
                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="03XXXXXXXXX"
                    value={patientInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                    maxLength="11"
                    pattern="[0-9]{11}"
                    inputMode="numeric"
                  />
                  <p className="text-xs text-gray-500 mt-1">11 digits (e.g., 03123456789)</p>
                </div>
                
                {/* Address Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    value={patientInfo.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                    placeholder="House #, Street, Area, City"
                  />
                </div>
                
                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={patientInfo.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                    placeholder="Any special instructions or delivery notes..."
                  />
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!!emailError || filteredCart.length === 0}
                  className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold text-sm sm:text-base order-1 sm:order-2 ${
                    emailError || filteredCart.length === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
                  }`}
                >
                  Place Order - Rs. {finalTotal.toFixed(2)}
                </button>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-500 mt-6 text-center">
                Your order will be processed and delivered from the respective pharmacies. 
                You'll receive a unique order number to track your order.
              </p>
            </form>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default MedicineBooking;