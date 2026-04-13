
//-------------working perfect---------//
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// // Simple icon imports
// import { FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
// import { MdLocalPharmacy } from 'react-icons/md';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [showMobileCart, setShowMobileCart] = useState(false);

//   // Get pharmacy cart items
//   const pharmacyCartItems = cart.filter(item => item.pharmacyId === id);
  
//   const cartTotal = pharmacyCartItems.reduce((sum, item) => {
//     const price = item.discountedPrice || item.price || 0;
//     return sum + (price * item.quantity);
//   }, 0);

//   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + item.quantity, 0);

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error:', err);
//         setError('Error loading pharmacy');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) fetchPharmacyDetails();
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formatted = data.data.map(med => ({
//             ...med,
//             _id: `${id}_${med._id}`,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
//           setPharmacyMedicines(formatted);
//         }
//       } catch (err) {
//         console.error('Error:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) fetchMedicines();
//   }, [id, pharmacy]);

//   // Filter medicines based on search
//   const filteredMedicines = pharmacyMedicines.filter(medicine => 
//     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const addToCart = (medicine) => {
//     const existingItem = cart.find(item => item._id === medicine._id);
    
//     if (existingItem) {
//       setCart(cart.map(item =>
//         item._id === medicine._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setCart([...cart, { ...medicine, quantity: 1 }]);
//     }
//   };

//   const updateCartQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       setCart(cart.filter(item => item._id !== medicineId));
//     } else {
//       setCart(cart.map(item =>
//         item._id === medicineId ? { ...item, quantity: newQuantity } : item
//       ));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
//           <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-600 mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Browse Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Simple Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-14">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="flex items-center text-gray-600 hover:text-gray-900"
//             >
//               <FiArrowLeft className="w-5 h-5 mr-1" />
//               <span>Back</span>
//             </button>
            
//             <button
//               onClick={() => setShowMobileCart(!showMobileCart)}
//               className="relative p-2 text-gray-600 hover:text-gray-900 lg:hidden"
//             >
//               <FiShoppingCart className="w-5 h-5" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Pharmacy Info - Simple Row */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-start gap-3">
//             <img 
//               src={pharmacy.image || 'https://via.placeholder.com/60'} 
//               alt={pharmacy.name}
//               className="w-14 h-14 rounded-lg object-cover bg-gray-100"
//             />
//             <div className="flex-1 min-w-0">
//               <h1 className="text-lg font-bold text-gray-900 truncate">{pharmacy.name}</h1>
//               <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
//                 <div className="flex items-center gap-1">
//                   <FiMapPin className="w-4 h-4 flex-shrink-0" />
//                   <span className="truncate max-w-[200px]">{pharmacy.address}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <FiClock className="w-4 h-4 flex-shrink-0" />
//                   <span>{pharmacy.deliveryTime || '15-20 min'}</span>
//                 </div>
//               </div>
//             </div>
//             <a
//               href={`tel:${pharmacy.phone}`}
//               className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
//             >
//               <FiPhone className="w-5 h-5" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column - Medicines */}
//           <div className="flex-1">
//             {/* Search Bar */}
//             <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search medicines..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Medicines Grid */}
//             {medicineLoading ? (
//               <div className="text-center py-8">Loading medicines...</div>
//             ) : filteredMedicines.length > 0 ? (
//               <>
//                 <p className="text-sm text-gray-600 mb-3">{filteredMedicines.length} medicines available</p>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {filteredMedicines.map((medicine) => (
//                     <MedicineCard
//                       key={medicine._id}
//                       medicine={medicine}
//                       onAddToCart={addToCart}
//                       cart={cart}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//                 <p className="text-gray-500">No medicines found</p>
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="mt-2 text-blue-600 hover:text-blue-700"
//                   >
//                     Clear search
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart (Desktop) */}
//           <div className="hidden lg:block lg:w-80">
//             <div className="bg-white rounded-lg border border-gray-200 sticky top-20">
//               <div className="p-4 border-b border-gray-200">
//                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
//                   <FiShoppingCart className="w-5 h-5" />
//                   Your Cart ({cartItemCount})
//                 </h3>
//               </div>
              
//               <div className="p-4">
//                 {pharmacyCartItems.length === 0 ? (
//                   <p className="text-gray-500 text-center py-4">Your cart is empty</p>
//                 ) : (
//                   <>
//                     <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
//                       {pharmacyCartItems.map((item) => (
//                         <div key={item._id} className="flex gap-2 text-sm">
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-gray-900 truncate">{item.name}</p>
//                             <p className="text-gray-600">Rs. {item.discountedPrice || item.price}</p>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <button
//                               onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
//                               className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                             >
//                               -
//                             </button>
//                             <span className="w-6 text-center">{item.quantity}</span>
//                             <button
//                               onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
//                               className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-3">
//                       <div className="flex justify-between font-bold mb-3">
//                         <span>Total:</span>
//                         <span className="text-blue-600">Rs. {cartTotal.toFixed(2)}</span>
//                       </div>
//                       <Link
//                         to="/booking"
//                         className="block w-full py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
//                       >
//                         Checkout
//                       </Link>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Cart Bottom Bar */}
//       {cartItemCount > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
//           <button
//             onClick={() => setShowMobileCart(true)}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
//           >
//             View Cart ({cartItemCount}) • Rs. {cartTotal.toFixed(2)}
//           </button>
//         </div>
//       )}

//       {/* Mobile Cart Modal */}
//       {showMobileCart && (
//         <div className="lg:hidden fixed inset-0 z-50">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileCart(false)} />
//           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between">
//               <h3 className="font-bold">Your Cart ({cartItemCount})</h3>
//               <button onClick={() => setShowMobileCart(false)}>
//                 <FiArrowLeft className="w-5 h-5 rotate-90" />
//               </button>
//             </div>
            
//             <div className="p-4">
//               {pharmacyCartItems.map((item) => (
//                 <div key={item._id} className="flex gap-3 py-3 border-b border-gray-100">
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-900">{item.name}</p>
//                     <p className="text-blue-600">Rs. {item.discountedPrice || item.price}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
//                       className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
//                       className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="mt-4 pt-3 border-t border-gray-200">
//                 <div className="flex justify-between font-bold mb-3">
//                   <span>Total:</span>
//                   <span className="text-blue-600">Rs. {cartTotal.toFixed(2)}</span>
//                 </div>
//                 <Link
//                   to="/booking"
//                   onClick={() => setShowMobileCart(false)}
//                   className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-medium"
//                 >
//                   Checkout
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Add bottom padding for mobile cart bar */}
//       {cartItemCount > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;


















//---------------------------------//
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// // Simple icon imports
// import { FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiClock, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
// import { MdLocalPharmacy } from 'react-icons/md';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [showMobileCart, setShowMobileCart] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [tempTabletQuantity, setTempTabletQuantity] = useState(1);

//   // Helper function to detect medicine form type
//   const isTabletForm = (form) => {
//     if (!form) return false;
//     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
//     return tabletForms.some(t => form?.toLowerCase().includes(t));
//   };

//   // Get tablets per unit (default to 10)
//   const getTabletsPerUnit = (item) => {
//     return item.tabletsPerUnit || 10;
//   };

//   // Get price per tablet
//   const getPricePerTablet = (item) => {
//     const unitPrice = item.discountedPrice || item.price || 0;
//     return unitPrice / getTabletsPerUnit(item);
//   };

//   // Calculate item total
//   const calculateItemTotal = (item) => {
//     if (isTabletForm(item.form) && item.tabletQuantity) {
//       return getPricePerTablet(item) * item.tabletQuantity;
//     }
//     return (item.discountedPrice || item.price || 0) * (item.quantity || 1);
//   };

//   // Get pharmacy cart items
//   const pharmacyCartItems = cart.filter(item => {
//     // Check various ways item could be associated with this pharmacy
//     return item.pharmacyId === id || 
//            (item.selectedPharmacy && item.selectedPharmacy._id === id) ||
//            (item.pharmacy && item.pharmacy._id === id) ||
//            (item.pharmacyIds && item.pharmacyIds.includes(id));
//   });
  
//   const cartTotal = pharmacyCartItems.reduce((sum, item) => {
//     return sum + calculateItemTotal(item);
//   }, 0);

//   const cartItemCount = pharmacyCartItems.reduce((sum, item) => {
//     if (isTabletForm(item.form) && item.tabletQuantity) {
//       return sum + 1; // Count as one item in cart
//     }
//     return sum + (item.quantity || 1);
//   }, 0);

//   // Get display quantity text
//   const getQuantityDisplay = (item) => {
//     if (isTabletForm(item.form) && item.tabletQuantity) {
//       return `${item.tabletQuantity} tablet${item.tabletQuantity > 1 ? 's' : ''}`;
//     }
//     return `${item.quantity || 1} unit${item.quantity > 1 ? 's' : ''}`;
//   };

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error:', err);
//         setError('Error loading pharmacy');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) fetchPharmacyDetails();
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formatted = data.data.map(med => ({
//             ...med,
//             _id: `${id}_${med._id}`,
//             id: `${id}_${med._id}`,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name,
//             tabletsPerUnit: med.tabletsPerUnit || 10
//           }));
//           setPharmacyMedicines(formatted);
//         }
//       } catch (err) {
//         console.error('Error:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) fetchMedicines();
//   }, [id, pharmacy]);

//   // Filter medicines based on search
//   const filteredMedicines = pharmacyMedicines.filter(medicine => 
//     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const addToCart = (medicine) => {
//     const existingItem = cart.find(item => item._id === medicine._id);
    
//     if (existingItem) {
//       // If exists and is tablet form, update tablet quantity
//       if (isTabletForm(medicine.form)) {
//         const tabletsPerUnit = getTabletsPerUnit(medicine);
//         const newTabletQuantity = (existingItem.tabletQuantity || existingItem.quantity * tabletsPerUnit) + tabletsPerUnit;
//         const newUnits = Math.ceil(newTabletQuantity / tabletsPerUnit);
        
//         setCart(cart.map(item =>
//           item._id === medicine._id
//             ? { 
//                 ...item, 
//                 quantity: newUnits,
//                 tabletQuantity: newTabletQuantity,
//                 totalTablets: newTabletQuantity
//               }
//             : item
//         ));
//       } else {
//         // For non-tablet items, increase unit quantity
//         setCart(cart.map(item =>
//           item._id === medicine._id
//             ? { ...item, quantity: (item.quantity || 1) + 1 }
//             : item
//         ));
//       }
//     } else {
//       // Add new item
//       const newItem = { 
//         ...medicine, 
//         quantity: 1,
//         tabletQuantity: isTabletForm(medicine.form) ? getTabletsPerUnit(medicine) : null,
//         totalTablets: isTabletForm(medicine.form) ? getTabletsPerUnit(medicine) : null,
//         pharmacyId: id,
//         selectedPharmacy: pharmacy
//       };
//       setCart([...cart, newItem]);
//     }
//   };

//   const updateCartQuantity = (medicineId, newQuantity, isTablet = false) => {
//     const item = cart.find(item => item._id === medicineId);
//     if (!item) return;

//     if (isTablet && isTabletForm(item.form)) {
//       // Update tablet quantity
//       const tabletsPerUnit = getTabletsPerUnit(item);
//       if (newQuantity < 1) {
//         setCart(cart.filter(item => item._id !== medicineId));
//       } else {
//         const newUnits = Math.ceil(newQuantity / tabletsPerUnit);
//         setCart(cart.map(item =>
//           item._id === medicineId 
//             ? { 
//                 ...item, 
//                 quantity: newUnits,
//                 tabletQuantity: newQuantity,
//                 totalTablets: newQuantity
//               } 
//             : item
//         ));
//       }
//     } else {
//       // Update unit quantity
//       if (newQuantity < 1) {
//         setCart(cart.filter(item => item._id !== medicineId));
//       } else if (isTabletForm(item.form) && item.tabletQuantity) {
//         // For tablet items, update both unit and tablet quantity
//         const tabletsPerUnit = getTabletsPerUnit(item);
//         setCart(cart.map(item =>
//           item._id === medicineId 
//             ? { 
//                 ...item, 
//                 quantity: newQuantity,
//                 tabletQuantity: newQuantity * tabletsPerUnit,
//                 totalTablets: newQuantity * tabletsPerUnit
//               } 
//             : item
//         ));
//       } else {
//         // For non-tablet items
//         setCart(cart.map(item =>
//           item._id === medicineId ? { ...item, quantity: newQuantity } : item
//         ));
//       }
//     }
//   };

//   const openTabletEditor = (item) => {
//     setEditingItem(item._id);
//     setTempTabletQuantity(item.tabletQuantity || (item.quantity * getTabletsPerUnit(item)));
//   };

//   const saveTabletQuantity = (itemId) => {
//     updateCartQuantity(itemId, tempTabletQuantity, true);
//     setEditingItem(null);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(cart.filter(item => item._id !== medicineId));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading pharmacy...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
//           <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-600 mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Browse Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Simple Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-14">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//               aria-label="Go back"
//             >
//               <FiArrowLeft className="w-5 h-5 mr-1" />
//               <span className="text-sm sm:text-base">Back</span>
//             </button>
            
//             <button
//               onClick={() => setShowMobileCart(!showMobileCart)}
//               className="relative p-2 text-gray-600 hover:text-gray-900 lg:hidden"
//               aria-label="View cart"
//             >
//               <FiShoppingCart className="w-5 h-5" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Pharmacy Info - Simple Row */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-start gap-3">
//             <img 
//               src={pharmacy.image || 'https://via.placeholder.com/60'} 
//               alt={pharmacy.name}
//               className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/60';
//               }}
//             />
//             <div className="flex-1 min-w-0">
//               <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{pharmacy.name}</h1>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
//                 <div className="flex items-center gap-1">
//                   <FiMapPin className="w-4 h-4 flex-shrink-0" />
//                   <span className="truncate max-w-[150px] sm:max-w-[300px]">{pharmacy.address}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <FiClock className="w-4 h-4 flex-shrink-0" />
//                   <span>{pharmacy.deliveryTime || '15-20 min'}</span>
//                 </div>
//               </div>
//             </div>
//             <a
//               href={`tel:${pharmacy.phone}`}
//               className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex-shrink-0"
//               aria-label="Call pharmacy"
//             >
//               <FiPhone className="w-5 h-5" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column - Medicines */}
//           <div className="flex-1">
//             {/* Search Bar */}
//             <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search medicines by name, generic, or description..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* Medicines Grid */}
//             {medicineLoading ? (
//               <div className="text-center py-12">
//                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                 <p className="mt-3 text-gray-600">Loading medicines...</p>
//               </div>
//             ) : filteredMedicines.length > 0 ? (
//               <>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
//                 </p>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//                   {filteredMedicines.map((medicine) => (
//                     <MedicineCard
//                       key={medicine._id}
//                       medicine={medicine}
//                       onAddToCart={addToCart}
//                       cart={cart}
//                       context="pharmacy"
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//                 <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg mb-2">No medicines found</p>
//                 {searchTerm && (
//                   <>
//                     <p className="text-sm text-gray-400 mb-3">No results for "{searchTerm}"</p>
//                     <button
//                       onClick={() => setSearchTerm('')}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                     >
//                       Clear search
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart (Desktop) */}
//           <div className="hidden lg:block lg:w-80">
//             <div className="bg-white rounded-lg border border-gray-200 sticky top-20 shadow-sm">
//               <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
//                   <FiShoppingCart className="w-5 h-5 text-blue-600" />
//                   Your Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})
//                 </h3>
//               </div>
              
//               <div className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
//                 {pharmacyCartItems.length === 0 ? (
//                   <div className="text-center py-8">
//                     <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">Your cart is empty</p>
//                     <p className="text-xs text-gray-400 mt-1">Add medicines to get started</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-4 mb-4">
//                       {pharmacyCartItems.map((item) => {
//                         const isTablet = isTabletForm(item.form);
//                         const isEditing = editingItem === item._id;
//                         const tabletsPerUnit = getTabletsPerUnit(item);
                        
//                         return (
//                           <div key={item._id} className="border-b border-gray-100 pb-3 last:border-0">
//                             <div className="flex gap-2">
//                               {/* Item image */}
//                               <img 
//                                 src={item.image || 'https://via.placeholder.com/40'} 
//                                 alt={item.name}
//                                 className="w-10 h-10 rounded object-cover bg-gray-100 flex-shrink-0"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = 'https://via.placeholder.com/40';
//                                 }}
//                               />
                              
//                               <div className="flex-1 min-w-0">
//                                 <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                                
//                                 {/* Price and quantity info */}
//                                 <div className="flex items-center justify-between mt-1">
//                                   <p className="text-blue-600 font-semibold text-sm">
//                                     Rs. {calculateItemTotal(item).toFixed(2)}
//                                   </p>
                                  
//                                   {isTablet && (
//                                     <span className="text-xs text-gray-500">
//                                       Rs. {getPricePerTablet(item).toFixed(2)}/tab
//                                     </span>
//                                   )}
//                                 </div>
                                
//                                 {/* Quantity controls */}
//                                 {isTablet ? (
//                                   <div className="mt-2">
//                                     {isEditing ? (
//                                       <div className="flex items-center gap-2">
//                                         <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden bg-blue-50">
//                                           <button
//                                             onClick={() => setTempTabletQuantity(prev => Math.max(1, prev - 1))}
//                                             className="w-8 h-8 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
//                                           >
//                                             <FiMinus className="w-3 h-3" />
//                                           </button>
//                                           <span className="w-10 text-center font-medium text-sm">
//                                             {tempTabletQuantity}
//                                           </span>
//                                           <button
//                                             onClick={() => setTempTabletQuantity(prev => prev + 1)}
//                                             className="w-8 h-8 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
//                                           >
//                                             <FiPlus className="w-3 h-3" />
//                                           </button>
//                                         </div>
//                                         <button
//                                           onClick={() => saveTabletQuantity(item._id)}
//                                           className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                                         >
//                                           Save
//                                         </button>
//                                         <button
//                                           onClick={() => setEditingItem(null)}
//                                           className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
//                                         >
//                                           Cancel
//                                         </button>
//                                       </div>
//                                     ) : (
//                                       <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-2">
//                                           <span className="text-sm font-medium bg-blue-50 px-2 py-1 rounded">
//                                             {item.tabletQuantity || item.quantity * tabletsPerUnit} tabs
//                                           </span>
//                                           <button
//                                             onClick={() => openTabletEditor(item)}
//                                             className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                                           >
//                                             Edit
//                                           </button>
//                                         </div>
//                                         <p className="text-xs text-gray-500">
//                                           ({item.quantity} unit{item.quantity > 1 ? 's' : ''})
//                                         </p>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center justify-between mt-2">
//                                     <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                                       <button
//                                         onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
//                                         className="w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
//                                       >
//                                         <FiMinus className="w-3 h-3" />
//                                       </button>
//                                       <span className="w-8 text-center font-medium text-sm">
//                                         {item.quantity || 1}
//                                       </span>
//                                       <button
//                                         onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
//                                         className="w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
//                                       >
//                                         <FiPlus className="w-3 h-3" />
//                                       </button>
//                                     </div>
//                                     <button
//                                       onClick={() => removeFromCart(item._id)}
//                                       className="text-red-500 hover:text-red-700 transition-colors p-1"
//                                       aria-label="Remove item"
//                                     >
//                                       <FiTrash2 className="w-4 h-4" />
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
                    
//                     {/* Cart Summary */}
//                     <div className="border-t border-gray-200 pt-3 mt-2">
//                       <div className="flex justify-between items-center mb-3">
//                         <span className="text-gray-600">Subtotal:</span>
//                         <span className="font-bold text-lg text-blue-600">Rs. {cartTotal.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
//                         <span>Delivery:</span>
//                         <span className="text-green-600 font-medium">Free</span>
//                       </div>
//                       <Link
//                         to="/booking"
//                         className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
//                       >
//                         Proceed to Checkout
//                       </Link>
//                       <p className="text-xs text-gray-400 text-center mt-3">
//                         {pharmacyCartItems.length} item{pharmacyCartItems.length > 1 ? 's' : ''} • Free delivery
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Cart Bottom Bar */}
//       {cartItemCount > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
//           <button
//             onClick={() => setShowMobileCart(true)}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-between px-4"
//           >
//             <span>View Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})</span>
//             <span className="font-bold">Rs. {cartTotal.toFixed(2)}</span>
//           </button>
//         </div>
//       )}

//       {/* Mobile Cart Modal */}
//       {showMobileCart && (
//         <div className="lg:hidden fixed inset-0 z-50">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileCart(false)} />
//           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//               <h3 className="font-bold text-lg">Your Cart ({pharmacyCartItems.length})</h3>
//               <button 
//                 onClick={() => setShowMobileCart(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 aria-label="Close cart"
//               >
//                 <FiArrowLeft className="w-5 h-5 rotate-90" />
//               </button>
//             </div>
            
//             <div className="p-4">
//               {pharmacyCartItems.map((item) => {
//                 const isTablet = isTabletForm(item.form);
//                 const isEditing = editingItem === item._id;
//                 const tabletsPerUnit = getTabletsPerUnit(item);
                
//                 return (
//                   <div key={item._id} className="flex gap-3 py-4 border-b border-gray-100">
//                     <img 
//                       src={item.image || 'https://via.placeholder.com/50'} 
//                       alt={item.name}
//                       className="w-12 h-12 rounded object-cover bg-gray-100 flex-shrink-0"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://via.placeholder.com/50';
//                       }}
//                     />
                    
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-gray-900">{item.name}</p>
//                       <p className="text-blue-600 font-semibold mt-1">
//                         Rs. {calculateItemTotal(item).toFixed(2)}
//                       </p>
                      
//                       {isTablet && (
//                         <p className="text-xs text-gray-500 mt-1">
//                           Rs. {getPricePerTablet(item).toFixed(2)} per tablet • {tabletsPerUnit} tabs/unit
//                         </p>
//                       )}
                      
//                       {/* Mobile quantity controls */}
//                       <div className="mt-3">
//                         {isTablet ? (
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <span className="text-sm bg-blue-50 px-3 py-1.5 rounded-lg">
//                                 {item.tabletQuantity || item.quantity * tabletsPerUnit} tablets
//                               </span>
//                               <button
//                                 onClick={() => {
//                                   setEditingItem(item._id);
//                                   setTempTabletQuantity(item.tabletQuantity || item.quantity * tabletsPerUnit);
//                                 }}
//                                 className="text-sm text-blue-600 font-medium"
//                               >
//                                 Edit
//                               </button>
//                             </div>
//                             <button
//                               onClick={() => removeFromCart(item._id)}
//                               className="text-red-500 p-2"
//                             >
//                               <FiTrash2 className="w-5 h-5" />
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                               <button
//                                 onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
//                                 className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//                               >
//                                 <FiMinus className="w-4 h-4" />
//                               </button>
//                               <span className="w-10 text-center font-medium">{item.quantity || 1}</span>
//                               <button
//                                 onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
//                                 className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//                               >
//                                 <FiPlus className="w-4 h-4" />
//                               </button>
//                             </div>
//                             <button
//                               onClick={() => removeFromCart(item._id)}
//                               className="text-red-500 p-2"
//                             >
//                               <FiTrash2 className="w-5 h-5" />
//                             </button>
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Tablet editor modal within mobile cart */}
//                       {isEditing && isTablet && (
//                         <div className="mt-3 p-3 bg-blue-50 rounded-lg">
//                           <p className="text-sm font-medium mb-2">Adjust tablets:</p>
//                           <div className="flex items-center gap-3">
//                             <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden bg-white">
//                               <button
//                                 onClick={() => setTempTabletQuantity(prev => Math.max(1, prev - 1))}
//                                 className="w-10 h-10 bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
//                               >
//                                 <FiMinus className="w-4 h-4" />
//                               </button>
//                               <span className="w-12 text-center font-medium">{tempTabletQuantity}</span>
//                               <button
//                                 onClick={() => setTempTabletQuantity(prev => prev + 1)}
//                                 className="w-10 h-10 bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
//                               >
//                                 <FiPlus className="w-4 h-4" />
//                               </button>
//                             </div>
//                             <button
//                               onClick={() => saveTabletQuantity(item._id)}
//                               className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={() => setEditingItem(null)}
//                               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                           <p className="text-xs text-gray-600 mt-2">
//                             Total: Rs. {(getPricePerTablet(item) * tempTabletQuantity).toFixed(2)}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
              
//               {/* Mobile Cart Total */}
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-600">Subtotal:</span>
//                   <span className="font-bold text-lg">Rs. {cartTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
//                   <span>Delivery:</span>
//                   <span className="text-green-600">Free</span>
//                 </div>
//                 <Link
//                   to="/booking"
//                   onClick={() => setShowMobileCart(false)}
//                   className="block w-full py-4 bg-blue-600 text-white text-center rounded-lg font-medium text-lg"
//                 >
//                   Checkout • Rs. {cartTotal.toFixed(2)}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Add bottom padding for mobile cart bar */}
//       {cartItemCount > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;




































//------------------cart not working------------------
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MedicineCard from './MedicineCard.jsx';

// Simple icon imports
import { FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiClock, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { MdLocalPharmacy } from 'react-icons/md';

const PharmacyDetailPage = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [tempTabletQuantity, setTempTabletQuantity] = useState(1);

  // Helper function to detect medicine form type
  const isTabletForm = (form) => {
    if (!form) return false;
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return tabletForms.some(t => form?.toLowerCase().includes(t));
  };

  // Get tablets per unit (default to 10)
  const getTabletsPerUnit = (item) => {
    return item.tabletsPerUnit || 10;
  };

  // Get price per tablet
  const getPricePerTablet = (item) => {
    const unitPrice = item.discountedPrice || item.price || 0;
    return unitPrice / getTabletsPerUnit(item);
  };

  // Calculate item total
  const calculateItemTotal = (item) => {
    if (isTabletForm(item.form) && item.tabletQuantity) {
      return getPricePerTablet(item) * item.tabletQuantity;
    }
    return (item.discountedPrice || item.price || 0) * (item.quantity || 1);
  };

  // Get pharmacy cart items
  const pharmacyCartItems = cart.filter(item => {
    // Check various ways item could be associated with this pharmacy
    return item.pharmacyId === id || 
           (item.selectedPharmacy && item.selectedPharmacy._id === id) ||
           (item.pharmacy && item.pharmacy._id === id) ||
           (item.pharmacyIds && item.pharmacyIds.includes(id));
  });
  
  const cartTotal = pharmacyCartItems.reduce((sum, item) => {
    return sum + calculateItemTotal(item);
  }, 0);

  const cartItemCount = pharmacyCartItems.reduce((sum, item) => {
    if (isTabletForm(item.form) && item.tabletQuantity) {
      return sum + 1; // Count as one item in cart
    }
    return sum + (item.quantity || 1);
  }, 0);

  // Get display quantity text
  const getQuantityDisplay = (item) => {
    if (isTabletForm(item.form) && item.tabletQuantity) {
      return `${item.tabletQuantity} tablet${item.tabletQuantity > 1 ? 's' : ''}`;
    }
    return `${item.quantity || 1} unit${item.quantity > 1 ? 's' : ''}`;
  };

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setPharmacy(data.data);
        } else {
          setError('Pharmacy not found');
          navigate('/pharmacies');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error loading pharmacy');
        navigate('/pharmacies');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchPharmacyDetails();
  }, [id, navigate]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setMedicineLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
        const data = await response.json();
        
        if (data.success) {
          const formatted = data.data.map(med => ({
            ...med,
            _id: `${id}_${med._id}`,
            id: `${id}_${med._id}`,
            pharmacyId: id,
            pharmacyName: pharmacy?.name,
            tabletsPerUnit: med.tabletsPerUnit || 10,
            // Ensure form field exists (default to 'tablet' if not specified)
            form: med.form || 'tablet'
          }));
          setPharmacyMedicines(formatted);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setMedicineLoading(false);
      }
    };
    
    if (id && pharmacy) fetchMedicines();
  }, [id, pharmacy]);

  // Filter medicines based on search
  const filteredMedicines = pharmacyMedicines.filter(medicine => 
    medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FIXED: Add to cart function
  const addToCart = (medicine) => {
    console.log('Adding to cart:', medicine); // Debug log
    
    // Create a unique ID for the cart item
    const cartItemId = medicine._id || `${id}_${medicine.id || Date.now()}`;
    
    const existingItem = cart.find(item => item._id === cartItemId);
    
    if (existingItem) {
      // If item exists, update quantity
      const tabletsPerUnit = getTabletsPerUnit(medicine);
      
      if (isTabletForm(medicine.form)) {
        // For tablet items
        const newTabletQuantity = (existingItem.tabletQuantity || existingItem.quantity * tabletsPerUnit) + tabletsPerUnit;
        const newUnits = Math.ceil(newTabletQuantity / tabletsPerUnit);
        
        setCart(cart.map(item =>
          item._id === cartItemId
            ? { 
                ...item, 
                quantity: newUnits,
                tabletQuantity: newTabletQuantity,
                totalTablets: newTabletQuantity
              }
            : item
        ));
      } else {
        // For non-tablet items
        setCart(cart.map(item =>
          item._id === cartItemId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ));
      }
    } else {
      // Add new item
      const tabletsPerUnit = getTabletsPerUnit(medicine);
      const newItem = { 
        ...medicine,
        _id: cartItemId,
        id: cartItemId,
        quantity: 1,
        tabletQuantity: isTabletForm(medicine.form) ? tabletsPerUnit : null,
        totalTablets: isTabletForm(medicine.form) ? tabletsPerUnit : null,
        pharmacyId: id,
        selectedPharmacy: pharmacy ? {
          _id: pharmacy._id,
          name: pharmacy.name,
          address: pharmacy.address,
          phone: pharmacy.phone
        } : null
      };
      
      console.log('New cart item:', newItem); // Debug log
      setCart([...cart, newItem]);
    }
    
    // Show success message (optional)
    // You can add a toast notification here if you want
  };

  const updateCartQuantity = (medicineId, newQuantity, isTablet = false) => {
    const item = cart.find(item => item._id === medicineId);
    if (!item) return;

    if (isTablet && isTabletForm(item.form)) {
      // Update tablet quantity
      const tabletsPerUnit = getTabletsPerUnit(item);
      if (newQuantity < 1) {
        setCart(cart.filter(item => item._id !== medicineId));
      } else {
        const newUnits = Math.ceil(newQuantity / tabletsPerUnit);
        setCart(cart.map(item =>
          item._id === medicineId 
            ? { 
                ...item, 
                quantity: newUnits,
                tabletQuantity: newQuantity,
                totalTablets: newQuantity
              } 
            : item
        ));
      }
    } else {
      // Update unit quantity
      if (newQuantity < 1) {
        setCart(cart.filter(item => item._id !== medicineId));
      } else if (isTabletForm(item.form) && item.tabletQuantity) {
        // For tablet items, update both unit and tablet quantity
        const tabletsPerUnit = getTabletsPerUnit(item);
        setCart(cart.map(item =>
          item._id === medicineId 
            ? { 
                ...item, 
                quantity: newQuantity,
                tabletQuantity: newQuantity * tabletsPerUnit,
                totalTablets: newQuantity * tabletsPerUnit
              } 
            : item
        ));
      } else {
        // For non-tablet items
        setCart(cart.map(item =>
          item._id === medicineId ? { ...item, quantity: newQuantity } : item
        ));
      }
    }
  };

  const openTabletEditor = (item) => {
    setEditingItem(item._id);
    setTempTabletQuantity(item.tabletQuantity || (item.quantity * getTabletsPerUnit(item)));
  };

  const saveTabletQuantity = (itemId) => {
    updateCartQuantity(itemId, tempTabletQuantity, true);
    setEditingItem(null);
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item._id !== medicineId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 #174047 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pharmacy...</p>
        </div>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Not Found</h3>
          <p className="text-gray-600 mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/pharmacies')}
            className="px-4 py-2 #174047 text-white rounded-lg  transition-colors"
          >
            Browse Pharmacies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate('/pharmacies')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5 mr-1" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
            
            <button
              onClick={() => setShowMobileCart(!showMobileCart)}
              className="relative p-2 text-gray-600 hover:text-gray-900 lg:hidden"
              aria-label="View cart"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Pharmacy Info - Simple Row */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <img 
              src={pharmacy.image || 'https://via.placeholder.com/60'} 
              alt={pharmacy.name}
              className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/60';
              }}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{pharmacy.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <FiMapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate max-w-[150px] sm:max-w-[300px]">{pharmacy.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="w-4 h-4 flex-shrink-0" />
                  <span>{pharmacy.deliveryTime || '15-20 min'}</span>
                </div>
              </div>
            </div>
            <a
              href={`tel:${pharmacy.phone}`}
              className="p-2 bg-blue-50#174047 rounded-lg hover:bg-blue-100 transition-colors flex-shrink-0"
              aria-label="Call pharmacy"
            >
              <FiPhone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Medicines */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search medicines by name, generic, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Medicines Grid */}
            {medicineLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 var(--primary-color) border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading medicines...</p>
              </div>
            ) : filteredMedicines.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredMedicines.map((medicine) => (
                    <MedicineCard
                      key={medicine._id}
                      medicine={medicine}
                      onAddToCart={addToCart}
                      cart={cart}
                      context="pharmacy"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No medicines found</p>
                {searchTerm && (
                  <>
                    <p className="text-sm text-gray-400 mb-3">No results for "{searchTerm}"</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Clear search
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Cart (Desktop) */}
          <div className="hidden lg:block lg:w-80">
            <div className="bg-white rounded-lg border border-gray-200 sticky top-20 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FiShoppingCart className="w-5 h-5 text-blue-600" />
                  Your Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})
                </h3>
              </div>
              
              <div className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {pharmacyCartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-xs text-gray-400 mt-1">Add medicines to get started</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {pharmacyCartItems.map((item) => {
                        const isTablet = isTabletForm(item.form);
                        const isEditing = editingItem === item._id;
                        const tabletsPerUnit = getTabletsPerUnit(item);
                        
                        return (
                          <div key={item._id} className="border-b border-gray-100 pb-3 last:border-0">
                            <div className="flex gap-2">
                              {/* Item image */}
                              <img 
                                src={item.image || 'https://via.placeholder.com/40'} 
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover bg-gray-100 flex-shrink-0"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/40';
                                }}
                              />
                              
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                                
                                {/* Price and quantity info */}
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-blue-600 font-semibold text-sm">
                                    Rs. {calculateItemTotal(item).toFixed(2)}
                                  </p>
                                  
                                  {isTablet && (
                                    <span className="text-xs text-gray-500">
                                      Rs. {getPricePerTablet(item).toFixed(2)}/tab
                                    </span>
                                  )}
                                </div>
                                
                                {/* Quantity controls */}
                                {isTablet ? (
                                  <div className="mt-2">
                                    {isEditing ? (
                                      <div className="flex items-center gap-2">
                                        <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden bg-blue-50">
                                          <button
                                            onClick={() => setTempTabletQuantity(prev => Math.max(1, prev - 1))}
                                            className="w-8 h-8 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
                                          >
                                            <FiMinus className="w-3 h-3" />
                                          </button>
                                          <span className="w-10 text-center font-medium text-sm">
                                            {tempTabletQuantity}
                                          </span>
                                          <button
                                            onClick={() => setTempTabletQuantity(prev => prev + 1)}
                                            className="w-8 h-8 bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center"
                                          >
                                            <FiPlus className="w-3 h-3" />
                                          </button>
                                        </div>
                                        <button
                                          onClick={() => saveTabletQuantity(item._id)}
                                          className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => setEditingItem(null)}
                                          className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium bg-blue-50 px-2 py-1 rounded">
                                            {item.tabletQuantity || item.quantity * tabletsPerUnit} tabs
                                          </span>
                                          <button
                                            onClick={() => openTabletEditor(item)}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                          >
                                            Edit
                                          </button>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                          ({item.quantity} unit{item.quantity > 1 ? 's' : ''})
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                      <button
                                        onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
                                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                      >
                                        <FiMinus className="w-3 h-3" />
                                      </button>
                                      <span className="w-8 text-center font-medium text-sm">
                                        {item.quantity || 1}
                                      </span>
                                      <button
                                        onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
                                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                      >
                                        <FiPlus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => removeFromCart(item._id)}
                                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                                      aria-label="Remove item"
                                    >
                                      <FiTrash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Cart Summary */}
                    <div className="border-t border-gray-200 pt-3 mt-2">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-bold text-lg text-blue-600">Rs. {cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                        <span>Delivery:</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <Link
                        to="/booking"
                        className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                      >
                        Proceed to Checkout
                      </Link>
                      <p className="text-xs text-gray-400 text-center mt-3">
                        {pharmacyCartItems.length} item{pharmacyCartItems.length > 1 ? 's' : ''} • Free delivery
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Bottom Bar */}
      {cartItemCount > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
          <button
            onClick={() => setShowMobileCart(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-between px-4"
          >
            <span>View Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})</span>
            <span className="font-bold">Rs. {cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Mobile Cart Modal */}
      {showMobileCart && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileCart(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Your Cart ({pharmacyCartItems.length})</h3>
              <button 
                onClick={() => setShowMobileCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <FiArrowLeft className="w-5 h-5 rotate-90" />
              </button>
            </div>
            
            <div className="p-4">
              {pharmacyCartItems.map((item) => {
                const isTablet = isTabletForm(item.form);
                const isEditing = editingItem === item._id;
                const tabletsPerUnit = getTabletsPerUnit(item);
                
                return (
                  <div key={item._id} className="flex gap-3 py-4 border-b border-gray-100">
                    <img 
                      src={item.image || 'https://via.placeholder.com/50'} 
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover bg-gray-100 flex-shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-blue-600 font-semibold mt-1">
                        Rs. {calculateItemTotal(item).toFixed(2)}
                      </p>
                      
                      {isTablet && (
                        <p className="text-xs text-gray-500 mt-1">
                          Rs. {getPricePerTablet(item).toFixed(2)} per tablet • {tabletsPerUnit} tabs/unit
                        </p>
                      )}
                      
                      {/* Mobile quantity controls */}
                      <div className="mt-3">
                        {isTablet ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm bg-blue-50 px-3 py-1.5 rounded-lg">
                                {item.tabletQuantity || item.quantity * tabletsPerUnit} tablets
                              </span>
                              <button
                                onClick={() => {
                                  setEditingItem(item._id);
                                  setTempTabletQuantity(item.tabletQuantity || item.quantity * tabletsPerUnit);
                                }}
                                className="text-sm text-blue-600 font-medium"
                              >
                                Edit
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-500 p-2"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-medium">{item.quantity || 1}</span>
                              <button
                                onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-500 p-2"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Tablet editor modal within mobile cart */}
                      {isEditing && isTablet && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium mb-2">Adjust tablets:</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() => setTempTabletQuantity(prev => Math.max(1, prev - 1))}
                                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">{tempTabletQuantity}</span>
                              <button
                                onClick={() => setTempTabletQuantity(prev => prev + 1)}
                                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => saveTabletQuantity(item._id)}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            Total: Rs. {(getPricePerTablet(item) * tempTabletQuantity).toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Mobile Cart Total */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold text-lg">Rs. {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <span>Delivery:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <Link
                  to="/booking"
                  onClick={() => setShowMobileCart(false)}
                  className="block w-full py-4 bg-blue-600 text-white text-center rounded-lg font-medium text-lg"
                >
                  Checkout • Rs. {cartTotal.toFixed(2)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add bottom padding for mobile cart bar */}
      {cartItemCount > 0 && <div className="lg:hidden h-20"></div>}
    </div>
  );
};

export default PharmacyDetailPage;
































// cart logic update
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';

// // Simple icon imports
// import { FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiClock, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
// import { MdLocalPharmacy } from 'react-icons/md';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [showMobileCart, setShowMobileCart] = useState(false);

//   // Get pharmacy cart items
//   const pharmacyCartItems = cart.filter(item => {
//     return item.pharmacyId === id || 
//            (item.selectedPharmacy && item.selectedPharmacy._id === id);
//   });
  
//   const cartTotal = pharmacyCartItems.reduce((sum, item) => {
//     const price = item.discountedPrice || item.price || 0;
//     return sum + (price * (item.quantity || 1));
//   }, 0);

//   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//         } else {
//           setError('Pharmacy not found');
//           navigate('/pharmacies');
//         }
//       } catch (err) {
//         console.error('Error:', err);
//         setError('Error loading pharmacy');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) fetchPharmacyDetails();
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formatted = data.data.map(med => ({
//             ...med,
//             _id: `${id}_${med._id}`,
//             id: `${id}_${med._id}`,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name,
//             tabletsPerUnit: med.tabletsPerUnit || 10,
//             form: med.form || 'tablet'
//           }));
//           console.log('Formatted medicines:', formatted);
//           setPharmacyMedicines(formatted);
//         }
//       } catch (err) {
//         console.error('Error:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) fetchMedicines();
//   }, [id, pharmacy]);

//   // Filter medicines based on search
//   const filteredMedicines = pharmacyMedicines.filter(medicine => 
//     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // DIRECT ADD TO CART FUNCTION
//   const addToCartDirect = (medicine) => {
//     console.log('=== ADD TO CART DIRECT ===');
//     console.log('Medicine:', medicine);
//     console.log('Current cart:', cart);
    
//     if (!medicine) {
//       alert('No medicine data');
//       return;
//     }

//     // Create cart item
//     const cartItem = {
//       _id: medicine._id,
//       id: medicine._id,
//       name: medicine.name,
//       price: medicine.price || 0,
//       discountedPrice: medicine.discountedPrice,
//       image: medicine.image,
//       quantity: 1,
//       pharmacyId: id,
//       selectedPharmacy: pharmacy ? {
//         _id: pharmacy._id,
//         name: pharmacy.name
//       } : null
//     };
    
//     // Check if item exists
//     const existingIndex = cart.findIndex(item => item._id === cartItem._id);
    
//     let newCart;
//     if (existingIndex >= 0) {
//       // Update existing
//       newCart = [...cart];
//       newCart[existingIndex] = {
//         ...newCart[existingIndex],
//         quantity: (newCart[existingIndex].quantity || 1) + 1
//       };
//     } else {
//       // Add new
//       newCart = [...cart, cartItem];
//     }
    
//     console.log('New cart:', newCart);
//     setCart(newCart);
//     alert(`${medicine.name} added to cart!`);
//   };

//   const updateCartQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       setCart(cart.filter(item => item._id !== medicineId));
//     } else {
//       setCart(cart.map(item =>
//         item._id === medicineId ? { ...item, quantity: newQuantity } : item
//       ));
//     }
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(cart.filter(item => item._id !== medicineId));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading pharmacy...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
//           <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-600 mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button
//             onClick={() => navigate('/pharmacies')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Browse Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Simple Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-14">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <FiArrowLeft className="w-5 h-5 mr-1" />
//               <span className="text-sm sm:text-base">Back</span>
//             </button>
            
//             <button
//               onClick={() => setShowMobileCart(!showMobileCart)}
//               className="relative p-2 text-gray-600 hover:text-gray-900 lg:hidden"
//             >
//               <FiShoppingCart className="w-5 h-5" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Pharmacy Info */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-start gap-3">
//             <img 
//               src={pharmacy.image || 'https://via.placeholder.com/60'} 
//               alt={pharmacy.name}
//               className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/60';
//               }}
//             />
//             <div className="flex-1 min-w-0">
//               <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{pharmacy.name}</h1>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
//                 <div className="flex items-center gap-1">
//                   <FiMapPin className="w-4 h-4 flex-shrink-0" />
//                   <span className="truncate max-w-[150px] sm:max-w-[300px]">{pharmacy.address}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <FiClock className="w-4 h-4 flex-shrink-0" />
//                   <span>{pharmacy.deliveryTime || '15-20 min'}</span>
//                 </div>
//               </div>
//             </div>
//             <a
//               href={`tel:${pharmacy.phone}`}
//               className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex-shrink-0"
//             >
//               <FiPhone className="w-5 h-5" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Column - Medicines */}
//           <div className="flex-1">
//             {/* Search Bar */}
//             <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search medicines..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* TEST BUTTONS - Direct add to cart buttons */}
//             {medicineLoading ? (
//               <div className="text-center py-12">
//                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                 <p className="mt-3 text-gray-600">Loading medicines...</p>
//               </div>
//             ) : filteredMedicines.length > 0 ? (
//               <>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
//                 </p>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
//                   {filteredMedicines.map((medicine) => (
//                     <div key={medicine._id} className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto">
//                       <div className="relative h-24 bg-gray-50">
//                         <img
//                           src={medicine.image}
//                           alt={medicine.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                       </div>
//                       <div className="p-1.5">
//                         <h3 className="text-xs font-semibold text-gray-800 line-clamp-1">{medicine.name}</h3>
//                         <div className="flex justify-between items-center mb-1.5">
//                           <span className="text-sm font-bold text-green-600">
//                             Rs. {(medicine.discountedPrice || medicine.price || 0).toFixed(2)}
//                           </span>
//                         </div>
                        
//                         {/* TEST BUTTON - Direct add to cart */}
//                         <button
//                           onClick={() => addToCartDirect(medicine)}
//                           className="w-full py-1 px-1.5 rounded text-[10px] font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
//                         >
//                           TEST ADD TO CART
//                         </button>
                        
//                         {/* Original details button */}
//                         <Link
//                           to={`/medicine/${medicine._id}`}
//                           className="block w-full mt-1 py-1 px-1.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 text-center"
//                         >
//                           Details
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
//                 <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg mb-2">No medicines found</p>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart (Desktop) */}
//           <div className="hidden lg:block lg:w-80">
//             <div className="bg-white rounded-lg border border-gray-200 sticky top-20 shadow-sm">
//               <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
//                   <FiShoppingCart className="w-5 h-5 text-blue-600" />
//                   Your Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})
//                 </h3>
//               </div>
              
//               <div className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
//                 {pharmacyCartItems.length === 0 ? (
//                   <div className="text-center py-8">
//                     <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">Your cart is empty</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-4 mb-4">
//                       {pharmacyCartItems.map((item) => (
//                         <div key={item._id} className="border-b border-gray-100 pb-3">
//                           <div className="flex gap-2">
//                             <img 
//                               src={item.image || 'https://via.placeholder.com/40'} 
//                               alt={item.name}
//                               className="w-10 h-10 rounded object-cover bg-gray-100"
//                             />
//                             <div className="flex-1">
//                               <p className="font-medium text-sm truncate">{item.name}</p>
//                               <p className="text-blue-600 font-semibold text-sm">
//                                 Rs. {((item.discountedPrice || item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                               </p>
//                               <div className="flex items-center justify-between mt-2">
//                                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                                   <button
//                                     onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
//                                     className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//                                   >
//                                     <FiMinus className="w-3 h-3" />
//                                   </button>
//                                   <span className="w-8 text-center text-sm">{item.quantity || 1}</span>
//                                   <button
//                                     onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
//                                     className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//                                   >
//                                     <FiPlus className="w-3 h-3" />
//                                   </button>
//                                 </div>
//                                 <button
//                                   onClick={() => removeFromCart(item._id)}
//                                   className="text-red-500 p-1"
//                                 >
//                                   <FiTrash2 className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-3">
//                       <div className="flex justify-between items-center mb-3">
//                         <span className="text-gray-600">Total:</span>
//                         <span className="font-bold text-lg text-blue-600">Rs. {cartTotal.toFixed(2)}</span>
//                       </div>
//                       <Link
//                         to="/booking"
//                         className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
//                       >
//                         Checkout
//                       </Link>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Cart Bottom Bar */}
//       {cartItemCount > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
//           <button
//             onClick={() => setShowMobileCart(true)}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-between px-4"
//           >
//             <span>View Cart ({cartItemCount} items)</span>
//             <span className="font-bold">Rs. {cartTotal.toFixed(2)}</span>
//           </button>
//         </div>
//       )}

//       {/* Mobile Cart Modal */}
//       {showMobileCart && (
//         <div className="lg:hidden fixed inset-0 z-50">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileCart(false)} />
//           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//               <h3 className="font-bold text-lg">Your Cart ({cartItemCount})</h3>
//               <button onClick={() => setShowMobileCart(false)} className="p-2">
//                 <FiArrowLeft className="w-5 h-5 rotate-90" />
//               </button>
//             </div>
            
//             <div className="p-4">
//               {pharmacyCartItems.map((item) => (
//                 <div key={item._id} className="flex gap-3 py-4 border-b border-gray-100">
//                   <img 
//                     src={item.image || 'https://via.placeholder.com/50'} 
//                     alt={item.name}
//                     className="w-12 h-12 rounded object-cover bg-gray-100"
//                   />
//                   <div className="flex-1">
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-blue-600 font-semibold mt-1">
//                       Rs. {((item.discountedPrice || item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                     </p>
//                     <div className="flex items-center justify-between mt-2">
//                       <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                         <button
//                           onClick={() => updateCartQuantity(item._id, (item.quantity || 1) - 1)}
//                           className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//                         >
//                           <FiMinus className="w-4 h-4" />
//                         </button>
//                         <span className="w-10 text-center">{item.quantity || 1}</span>
//                         <button
//                           onClick={() => updateCartQuantity(item._id, (item.quantity || 1) + 1)}
//                           className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//                         >
//                           <FiPlus className="w-4 h-4" />
//                         </button>
//                       </div>
//                       <button
//                         onClick={() => removeFromCart(item._id)}
//                         className="text-red-500 p-2"
//                       >
//                         <FiTrash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-gray-600">Total:</span>
//                   <span className="font-bold text-lg">Rs. {cartTotal.toFixed(2)}</span>
//                 </div>
//                 <Link
//                   to="/booking"
//                   onClick={() => setShowMobileCart(false)}
//                   className="block w-full py-4 bg-blue-600 text-white text-center rounded-lg font-medium text-lg"
//                 >
//                   Checkout
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Add bottom padding for mobile cart bar */}
//       {cartItemCount > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;