//--------------error fixed----------------
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
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
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   // FIXED: Simple remove from cart function
//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   // Clear Cart Modal Component
//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                       </svg>
//                       <span className="text-sm text-gray-600">Stock updated today</span>
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card - FIXED VERSION */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items - COMPACT VERSION WITHOUT BADGE */}
//                       <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             {/* Medicine Image - WITHOUT BADGE */}
//                             <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             {/* Medicine Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
//                               <p className="text-xs text-gray-600">Rs. {(item.discountedPrice || item.price || 0) * item.quantity}</p>
//                             </div>
                            
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Decrease quantity"
//                               >
//                                 -
//                               </button>
//                               <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                                 aria-label="Remove item"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {calculateTotal()}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {calculateTotal()}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-red-300 text-red-600 rounded-xl hover:border-red-400 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span>Clear Cart</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {calculateTotal()}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Mobile padding for bottom cart bar */
//         @media (max-width: 1024px) {
//           .pb-safe {
//             padding-bottom: 5rem;
//           }
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;











// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
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
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const formatPrice = (price) => {
//     // Format price to avoid long decimal numbers
//     if (typeof price === 'number') {
//       return price.toFixed(2);
//     }
//     return '0.00';
//   };

//   // Clear Cart Modal Component
//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     {/* REMOVED: Stock updated today section */}
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items */}
//                       <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             {/* Medicine Image */}
//                             <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             {/* Medicine Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
//                               <p className="text-xs text-gray-600">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
//                             </div>
                            
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Decrease quantity"
//                               >
//                                 -
//                               </button>
//                               <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                                 aria-label="Remove item"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {formatPrice(calculateTotal())}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-[#2c6774] text-[#2c6774] rounded-xl hover:border-[#1e4e56] hover:bg-[#2c6774]/5 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span>Clear Cart</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {formatPrice(calculateTotal())}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Mobile padding for bottom cart bar */
//         @media (max-width: 1024px) {
//           .pb-safe {
//             padding-bottom: 5rem;
//           }
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;






//---------------------- Liked this UI----------------------------
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
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
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       // Check if the item has pharmacyId property that matches current pharmacy
//       if (item.pharmacyId) {
//         return item.pharmacyId === id;
//       }
      
//       // If no pharmacy-specific properties, include it
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   // FIXED: Simplified clearCart function
//   const clearCart = () => {
//     setCart(prevCart => {
//       // Filter out items that belong to this specific pharmacy
//       return prevCart.filter(item => {
//         // Check pharmacyId property
//         if (item.pharmacyId === id) {
//           return false;
//         }
        
//         // Check pharmacyIds array
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
        
//         // Check availableAtPharmacies array
//         if (item.availableAtPharmacies) {
//           const hasThisPharmacy = item.availableAtPharmacies.some(pharmacy => {
//             return (typeof pharmacy === 'string' && pharmacy === id) ||
//                    (pharmacy && pharmacy._id === id);
//           });
//           if (hasThisPharmacy) {
//             return false;
//           }
//         }
        
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const formatPrice = (price) => {
//     // Format price to avoid long decimal numbers
//     if (typeof price === 'number') {
//       return price.toFixed(2);
//     }
//     return '0.00';
//   };

//   // Clear Cart Modal Component - FIXED
//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy?.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-2xl shadow-lg">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Overview
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//                 Medicines ({pharmacyMedicines.length})
//               </div>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors border-b-2 ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-[#2c6774]' 
//                   : 'text-gray-600 border-transparent hover:text-[#2c6774] hover:border-gray-200'
//               }`}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//                 Services
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Category Filters */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {categories.map(category => (
//                         <button
//                           key={category.id}
//                           onClick={() => setSelectedCategory(category.id)}
//                           className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                             selectedCategory === category.id
//                               ? 'bg-[#2c6774] text-white shadow-md'
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
//                           }`}
//                         >
//                           {getCategoryIcon(category.icon)}
//                           {category.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items */}
//                       <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             {/* Medicine Image */}
//                             <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             {/* Medicine Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
//                               <p className="text-xs text-gray-600">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
//                             </div>
                            
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Decrease quantity"
//                               >
//                                 -
//                               </button>
//                               <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                                 aria-label="Remove item"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {formatPrice(calculateTotal())}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-[#2c6774] text-[#2c6774] rounded-xl hover:border-[#1e4e56] hover:bg-[#2c6774]/5 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span>Clear Cart</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {formatPrice(calculateTotal())}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Mobile padding for bottom cart bar */
//         @media (max-width: 1024px) {
//           .pb-safe {
//             padding-bottom: 5rem;
//           }
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;

















// ------------- User friendly not much guzara hai bss
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('medicines'); // Changed default to medicines
//   const [showClearCartModal, setShowClearCartModal] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
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
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       // Check if the item has pharmacyId property that matches current pharmacy
//       if (item.pharmacyId) {
//         return item.pharmacyId === id;
//       }
      
//       // If no pharmacy-specific properties, include it
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       // Filter out items that belong to this specific pharmacy
//       return prevCart.filter(item => {
//         // Check pharmacyId property
//         if (item.pharmacyId === id) {
//           return false;
//         }
        
//         // Check pharmacyIds array
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
        
//         // Check availableAtPharmacies array
//         if (item.availableAtPharmacies) {
//           const hasThisPharmacy = item.availableAtPharmacies.some(pharmacy => {
//             return (typeof pharmacy === 'string' && pharmacy === id) ||
//                    (pharmacy && pharmacy._id === id);
//           });
//           if (hasThisPharmacy) {
//             return false;
//           }
//         }
        
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const formatPrice = (price) => {
//     if (typeof price === 'number') {
//       return price.toFixed(2);
//     }
//     return '0.00';
//   };

//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-6">
//               <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Are you sure you want to remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-2">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy?.name}
//               </p>
//             </div>
            
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-8 h-8 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
//           <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-6 py-3 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Clear Cart Modal */}
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div className="max-w-3xl">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-6 transition-colors group"
//               >
//                 <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-6">
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl ring-2 ring-white/20">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div>
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white">{pharmacy.name}</h1>
//                     <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-4">
//                     <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
//                       <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-sm ml-1">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="text-sm">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <span className="text-sm">{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-4">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacyMedicines.length}</div>
//                 <div className="text-sm text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-32">
//                 <div className="text-2xl font-bold text-white mb-1">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-sm text-[#c0d3dc]">Service Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Tabs - Made more prominent */}
//         <div className="container mx-auto px-4 -mb-6 relative z-20">
//           <div className="flex bg-white rounded-t-2xl shadow-lg overflow-hidden">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 flex flex-col items-center justify-center ${
//                 activeTab === 'overview' 
//                   ? 'bg-[#2c6774] text-white shadow-inner' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <span className="text-sm">Overview</span>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 flex flex-col items-center justify-center ${
//                 activeTab === 'medicines' 
//                   ? 'bg-[#2c6774] text-white shadow-inner' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//               <span className="text-sm">Medicines ({pharmacyMedicines.length})</span>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-all duration-300 flex flex-col items-center justify-center ${
//                 activeTab === 'services' 
//                   ? 'bg-[#2c6774] text-white shadow-inner' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               <span className="text-sm">Services</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* Pharmacy Overview */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">About {pharmacy.name}</h2>
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Address</p>
//                             <p className="text-gray-600">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-5 h-5 text-[#2c6774] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700">Delivery Time</p>
//                             <p className="text-gray-600">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
//                         <p className="text-gray-600 leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Opening Hours */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
//                   <div className="space-y-4">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774]">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-8">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//                   <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines by name, generic name, or description..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500"
//                         />
//                         <svg 
//                           className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-3">
//                       {/* Category Dropdown */}
//                       <div className="relative">
//                         <button
//                           onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                           className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-xl transition-colors"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                           </svg>
//                           <span>Filter by Category</span>
//                           {selectedCategory !== 'all' && (
//                             <span className="bg-[#2c6774] text-white text-xs px-2 py-1 rounded-full">
//                               {selectedCategoryName}
//                             </span>
//                           )}
//                         </button>
                        
//                         {showCategoryDropdown && (
//                           <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
//                             {categories.map(category => (
//                               <button
//                                 key={category.id}
//                                 onClick={() => {
//                                   setSelectedCategory(category.id);
//                                   setShowCategoryDropdown(false);
//                                 }}
//                                 className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left ${
//                                   selectedCategory === category.id 
//                                     ? 'bg-[#2c6774]/10 text-[#2c6774]' 
//                                     : 'text-gray-700'
//                                 }`}
//                               >
//                                 <div className="w-5 h-5">
//                                   {getCategoryIcon(category.icon)}
//                                 </div>
//                                 <span className="font-medium">{category.name}</span>
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
                      
//                       <button
//                         onClick={() => {
//                           setSearchTerm('');
//                           setSelectedCategory('all');
//                         }}
//                         className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-2"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Reset
//                       </button>
//                     </div>
//                   </div>

//                   {/* Selected Category Badge */}
//                   {selectedCategory !== 'all' && (
//                     <div className="flex items-center gap-2 mb-4">
//                       <span className="text-sm text-gray-600">Filtered by:</span>
//                       <div className="flex items-center gap-2 bg-[#2c6774]/10 text-[#2c6774] px-3 py-1.5 rounded-lg">
//                         {getCategoryIcon(categories.find(c => c.id === selectedCategory)?.icon)}
//                         <span className="font-medium">{selectedCategoryName}</span>
//                         <button
//                           onClick={() => setSelectedCategory('all')}
//                           className="ml-2 text-[#2c6774] hover:text-[#174047]"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 mt-1">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${selectedCategoryName}`}
//                       </p>
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-16 bg-white rounded-2xl">
//                       <div className="flex justify-center">
//                         <div className="w-12 h-12 border-4 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-4 text-gray-600">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                       {filteredMedicines.map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//                       <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">No Medicines Found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'No medicines match your search criteria' 
//                           : 'This pharmacy currently has no medicines listed'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors"
//                         >
//                           Clear Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-8">
//                 {/* Services */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//                         <div className="w-10 h-10 rounded-lg bg-[#2c6774]/10 flex items-center justify-center mr-4 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-5 h-5 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Services */}
//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-red-800 mb-2">24/7 Emergency Service</h3>
//                       <p className="text-red-600">Available for urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call Emergency Line
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6 space-y-6">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-6 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-8">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 mb-2">Your cart is empty</p>
//                       <p className="text-gray-500 text-sm">Add medicines to get started</p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Cart Items */}
//                       <div className="space-y-2 max-h-72 overflow-y-auto mb-6 pr-2">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                             {/* Medicine Image */}
//                             <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             {/* Medicine Details */}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-sm">{item.name}</p>
//                               <p className="text-xs text-gray-600">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
//                             </div>
                            
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Decrease quantity"
//                               >
//                                 -
//                               </button>
//                               <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-1 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                                 aria-label="Remove item"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Summary */}
//                       <div className="space-y-3 border-t pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold">
//                             <span>Total:</span>
//                             <span className="text-[#2c6774]">Rs. {formatPrice(calculateTotal())}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Checkout Button */}
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <Link
//                           to="/booking"
//                           className={`flex-1 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm md:text-base ${
//                             getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                           }`}
//                           onClick={(e) => {
//                             if (getPharmacyCartItems().length === 0) e.preventDefault();
//                           }}
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={() => setShowClearCartModal(true)}
//                           className="px-4 py-3 border border-[#2c6774] text-[#2c6774] rounded-xl hover:border-[#1e4e56] hover:bg-[#2c6774]/5 transition-colors flex items-center justify-center gap-2"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           <span>Clear Cart</span>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-2xl p-6 text-white">
//                 <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center"
//                   >
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span className="text-sm">Call Pharmacy</span>
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-xl font-medium transition-colors text-center">
//                     <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">Directions</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Delivery Time</p>
//                       <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col items-center text-center">
//                     <svg className="w-6 h-6 text-[#2c6774] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <div>
//                       <p className="font-medium text-gray-800 text-sm">Free Delivery</p>
//                       <p className="text-gray-600 text-sm">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-6 md:p-12 overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#5c878f] rounded-full -translate-y-20 md:-translate-y-32 translate-x-10 md:translate-x-16 opacity-20"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//               <div className="text-center lg:text-left">
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-sm md:text-base max-w-lg">
//                   Browse our complete network of trusted pharmacies
//                 </p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 md:px-8 md:py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center text-sm md:text-base"
//               >
//                 Explore All Pharmacies
//                 <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-40">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-[#2c6774] text-white rounded-full flex items-center justify-center font-bold">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Rs. {formatPrice(calculateTotal())}</p>
//                   <p className="text-xs text-gray-500">Total for {pharmacy.name}</p>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300"
//             >
//               Checkout
//             </Link>
//           </div>
//         </div>
//       )}

//       {/* Add custom animations */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         /* Close dropdown when clicking outside */
//         .dropdown-close-area {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 40;
//         }
//       `}</style>
      
//       {/* Add bottom padding on mobile when cart has items */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-20"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;









// Redesigning
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const categoryDropdownRef = useRef(null);
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('medicines');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: 'medkit' },
//     { id: 'painkiller', name: 'Pain Relief', icon: 'bandage' },
//     { id: 'fever', name: 'Fever & Cold', icon: 'thermometer' },
//     { id: 'vitamin', name: 'Vitamins', icon: 'capsule' },
//     { id: 'chronic', name: 'Chronic Care', icon: 'heart' },
//     { id: 'skincare', name: 'Skin Care', icon: 'skin' },
//     { id: 'babycare', name: 'Baby Care', icon: 'baby' },
//     { id: 'antibiotic', name: 'Antibiotics', icon: 'shield' },
//     { id: 'cardiac', name: 'Cardiac Care', icon: 'activity' },
//     { id: 'diabetes', name: 'Diabetes', icon: 'blood' }
//   ];

//   const getCategoryIcon = (iconName) => {
//     const icons = {
//       medkit: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//         </svg>
//       ),
//       bandage: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//         </svg>
//       ),
//       thermometer: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0v4h-1m6-8a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       capsule: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       ),
//       heart: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       ),
//       skin: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       baby: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       shield: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       activity: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//         </svg>
//       ),
//       blood: (
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       )
//     };
//     return icons[iconName] || icons.medkit;
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
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setShowCategoryDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const getPharmacyCartItems = () => {
//     return cart.filter(item => {
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       if (item.pharmacyId) {
//         return item.pharmacyId === id;
//       }
      
//       return true;
//     });
//   };

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const uniqueId = `${medicine.name}_${id}`;
//       const existingItem = prevCart.find(item => item.id === uniqueId);
      
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === uniqueId
//             ? { 
//                 ...item, 
//                 quantity: item.quantity + 1
//               }
//             : item
//         );
//       }
      
//       return [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }];
//     });
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         if (item.pharmacyId === id) {
//           return false;
//         }
        
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
        
//         if (item.availableAtPharmacies) {
//           const hasThisPharmacy = item.availableAtPharmacies.some(pharmacy => {
//             return (typeof pharmacy === 'string' && pharmacy === id) ||
//                    (pharmacy && pharmacy._id === id);
//           });
//           if (hasThisPharmacy) {
//             return false;
//           }
//         }
        
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     const pharmacyCartItems = getPharmacyCartItems();
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const formatPrice = (price) => {
//     if (typeof price === 'number') {
//       return price.toFixed(2);
//     }
//     return '0.00';
//   };

//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-5">
//               <div className="w-14 h-14 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
//                 <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </div>
//               <p className="text-center text-gray-700">
//                 Remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-1">
//                 This will clear {getPharmacyCartItems().length} item(s) from {pharmacy?.name}
//               </p>
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors text-sm"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-14 h-14 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-7 h-7 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-5 text-base text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md w-full text-center">
//           <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.73 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-bold text-white mb-1">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] text-sm mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-2 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-4 py-2.5 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2.5 bg-transparent border border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300 text-sm"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-5 pb-6 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
//             <div className="max-w-3xl flex-1">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-3 transition-colors group text-sm"
//               >
//                 <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shadow-md ring-1 ring-white/20 flex-shrink-0">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//                     <h1 className="text-xl font-bold text-white truncate">{pharmacy.name}</h1>
//                     <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-2 text-sm">
//                     <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-2 text-xs">
//                     <div className="flex items-center bg-white/10 backdrop-blur-sm rounded px-1.5 py-1">
//                       <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-white">{pharmacy.rating || '4.0'}</span>
//                       <span className="text-[#c0d3dc] text-xs ml-0.5">({pharmacy.totalReviews || 0})</span>
//                     </div>
                    
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span>Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11111.314 0z" />
//                         </svg>
//                         <span>{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-2 mt-3 lg:mt-0">
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-16">
//                 <div className="text-base font-bold text-white mb-0.5">{pharmacyMedicines.length}</div>
//                 <div className="text-xs text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-16">
//                 <div className="text-base font-bold text-white mb-0.5">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-xs text-[#c0d3dc]">Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* User-Friendly Navigation Tabs */}
//         <div className="container mx-auto px-4 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-lg shadow-md border-b border-gray-200 scrollbar-hide">
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex items-center px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//               <span>Medicines</span>
//               <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
//                 activeTab === 'medicines' ? 'bg-[#2c6774] text-white' : 'bg-gray-200 text-gray-700'
//               }`}>
//                 {pharmacyMedicines.length}
//               </span>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex items-center px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               Overview
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex items-center px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               Services
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-5">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-5">
//             {activeTab === 'overview' && (
//               <div className="space-y-5">
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                   <h2 className="text-lg font-bold text-gray-900 mb-4">About {pharmacy.name}</h2>
//                   <div className="space-y-5">
//                     <div>
//                       <h3 className="font-semibold text-gray-800 mb-3">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <div className="flex items-start">
//                           <svg className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm">Address</p>
//                             <p className="text-gray-600 text-sm">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline text-sm">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline text-sm">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <svg className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <div>
//                             <p className="font-medium text-gray-700 text-sm">Delivery Time</p>
//                             <p className="text-gray-600 text-sm">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
//                         <p className="text-gray-600 text-sm leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                   <h2 className="text-lg font-bold text-gray-900 mb-4">Opening Hours</h2>
//                   <div className="space-y-2">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 text-sm capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774] text-sm">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-5">
//                 {/* Medicine Search and Filter - Redesigned */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                   <div className="flex flex-col md:flex-row gap-3 mb-3">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-4 py-2 pl-10 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500 text-sm"
//                         />
//                         <svg 
//                           className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                         {searchTerm && (
//                           <button
//                             onClick={() => setSearchTerm('')}
//                             className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//                           >
//                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-2" ref={categoryDropdownRef}>
//                       <div className="relative">
//                         <button
//                           onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                           className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium w-full md:w-auto"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                           </svg>
//                           <span className="truncate max-w-[120px]">
//                             {selectedCategory === 'all' ? 'All Categories' : 
//                               categories.find(c => c.id === selectedCategory)?.name}
//                           </span>
//                           {selectedCategory !== 'all' && (
//                             <span className="ml-auto bg-[#2c6774] text-white text-xs px-1.5 py-0.5 rounded-full">
//                               {categories.find(c => c.id === selectedCategory)?.name.split(' ')[0]}
//                             </span>
//                           )}
//                         </button>
                        
//                         {showCategoryDropdown && (
//                           <div className="absolute top-full left-0 mt-1 w-full md:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
//                             <div className="p-1">
//                               <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
//                                 Categories
//                               </div>
//                               {categories.map(category => (
//                                 <button
//                                   key={category.id}
//                                   onClick={() => {
//                                     setSelectedCategory(category.id);
//                                     setShowCategoryDropdown(false);
//                                   }}
//                                   className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
//                                     selectedCategory === category.id
//                                       ? 'bg-[#2c6774] text-white'
//                                       : 'text-gray-700 hover:bg-gray-100'
//                                   }`}
//                                 >
//                                   {getCategoryIcon(category.icon)}
//                                   <span className="flex-1 text-left">{category.name}</span>
//                                   {selectedCategory === category.id && (
//                                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                     </svg>
//                                   )}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
                      
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm flex items-center gap-1"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                           Clear
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Active Filters Display */}
//                   {(searchTerm || selectedCategory !== 'all') && (
//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="text-xs text-gray-600">Active filters:</span>
//                       {selectedCategory !== 'all' && (
//                         <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#2c6774]/10 text-[#2c6774] rounded text-xs">
//                           {categories.find(c => c.id === selectedCategory)?.name}
//                           <button
//                             onClick={() => setSelectedCategory('all')}
//                             className="ml-1 text-[#2c6774] hover:text-[#174047]"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       )}
//                       {searchTerm && (
//                         <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                           "{searchTerm}"
//                           <button
//                             onClick={() => setSearchTerm('')}
//                             className="ml-1 text-gray-500 hover:text-gray-700"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex justify-between items-center mb-4">
//                     <div>
//                       <h2 className="text-lg font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 text-xs mt-0.5">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     <div className="text-xs text-gray-500 hidden sm:block">
//                       Showing {Math.min(filteredMedicines.length, 12)} of {pharmacyMedicines.length}
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-10 bg-white rounded-lg">
//                       <div className="flex justify-center">
//                         <div className="w-8 h-8 border-3 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-3 text-gray-600 text-sm">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                       {filteredMedicines.slice(0, 12).map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
//                       <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                         </svg>
//                       </div>
//                       <h3 className="text-base font-bold text-gray-800 mb-1">No Medicines Found</h3>
//                       <p className="text-gray-600 text-sm max-w-md mx-auto mb-4">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'Try adjusting your search or filter' 
//                           : 'No medicines available at the moment'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-4 py-2 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors text-sm"
//                         >
//                           Clear All Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
                  
//                   {/* Load More Button */}
//                   {filteredMedicines.length > 12 && (
//                     <div className="text-center mt-5">
//                       <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm font-medium">
//                         Load More Medicines ({filteredMedicines.length - 12} more)
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-5">
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
//                   <h2 className="text-lg font-bold text-gray-900 mb-4">Services Offered</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
//                         <div className="w-8 h-8 rounded bg-[#2c6774]/10 flex items-center justify-center mr-3 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <svg className="w-4 h-4 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                         <span className="font-medium text-gray-800 text-sm">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-5">
//                   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                     <div>
//                       <h3 className="text-lg font-bold text-red-800 mb-1">24/7 Emergency Service</h3>
//                       <p className="text-red-600 text-sm">Urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap text-sm"
//                     >
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Emergency Call
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-4 space-y-4">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-3 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-sm font-bold flex items-center gap-1.5">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       Your Order ({getPharmacyCartItems().length})
//                     </h3>
//                     {getPharmacyCartItems().length > 0 && (
//                       <button
//                         onClick={() => setShowClearCartModal(true)}
//                         className="text-white/80 hover:text-white text-xs flex items-center gap-0.5"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="p-3">
//                   {getPharmacyCartItems().length === 0 ? (
//                     <div className="text-center py-4">
//                       <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                         </svg>
//                       </div>
//                       <p className="text-gray-600 text-xs mb-0.5">Your cart is empty</p>
//                       <p className="text-gray-500 text-xs">Add medicines from above</p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="space-y-1.5 max-h-56 overflow-y-auto mb-3 pr-1">
//                         {getPharmacyCartItems().map((item) => (
//                           <div key={item.id} className="flex items-center gap-2 p-1.5 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
//                             <div className="w-7 h-7 rounded bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-xs">{item.name}</p>
//                               <p className="text-gray-600 text-xs">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
//                             </div>
                            
//                             <div className="flex items-center gap-1">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-xs"
//                               >
//                                 -
//                               </button>
//                               <span className="w-5 text-center font-medium text-xs">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-xs"
//                               >
//                                 +
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-0.5 w-5 h-5 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors text-xs"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="space-y-1.5 border-t pt-3">
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
//                         </div>
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-2">
//                           <div className="flex justify-between items-center font-bold text-[#2c6774] text-sm">
//                             <span>Total:</span>
//                             <span>Rs. {formatPrice(calculateTotal())}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <Link
//                         to="/booking"
//                         className={`w-full mt-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-2 px-3 rounded-lg font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm ${
//                           getPharmacyCartItems().length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                         }`}
//                         onClick={(e) => {
//                           if (getPharmacyCartItems().length === 0) e.preventDefault();
//                         }}
//                       >
//                         Proceed to Checkout
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-lg p-3 text-white">
//                 <h3 className="text-xs font-bold mb-2">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-1.5">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-1.5 rounded font-medium transition-colors text-center text-xs"
//                   >
//                     <svg className="w-3.5 h-3.5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     Call Pharmacy
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-1.5 rounded font-medium transition-colors text-center text-xs">
//                     <svg className="w-3.5 h-3.5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     Get Directions
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
//                 <h3 className="text-xs font-bold text-gray-900 mb-2">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="flex items-center gap-1.5">
//                     <div className="w-6 h-6 rounded bg-[#2c6774]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-3 h-3 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800 text-xs">Delivery Time</p>
//                       <p className="text-gray-600 text-xs">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-1.5">
//                     <div className="w-6 h-6 rounded bg-[#2c6774]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-3 h-3 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800 text-xs">Free Delivery</p>
//                       <p className="text-gray-600 text-xs">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-6 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-lg p-4 relative overflow-hidden">
//           <div className="relative z-10">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//               <div className="text-center sm:text-left">
//                 <h3 className="text-sm font-bold text-white mb-0.5">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-xs">Browse our complete network</p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-3 py-1.5 rounded font-bold hover:bg-gray-100 transition-all duration-300 text-center text-xs"
//               >
//                 Explore All
//                 <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {getPharmacyCartItems().length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-2 z-40">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <div className="w-9 h-9 bg-[#2c6774] text-white rounded-lg flex items-center justify-center font-bold text-sm">
//                   {getPharmacyCartItems().length}
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                   {getPharmacyCartItems().reduce((sum, item) => sum + item.quantity, 0)}
//                 </div>
//               </div>
//               <div>
//                 <p className="font-bold text-gray-900 text-sm">Rs. {formatPrice(calculateTotal())}</p>
//                 <p className="text-xs text-gray-500">{pharmacy.name}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={() => setShowClearCartModal(true)}
//                 className="p-1.5 text-gray-500 hover:text-red-500"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </button>
//               <Link
//                 to="/booking"
//                 className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-3 py-2 rounded-lg font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm"
//               >
//                 Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add custom styles */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
      
//       {/* Bottom padding for mobile */}
//       {getPharmacyCartItems().length > 0 && <div className="lg:hidden h-14"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;







//------------------------React Icons-----------------//

import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MedicineCard from './MedicineCard.jsx';
import { FaBaby, FaCapsules } from 'react-icons/fa';
import { 
  FiArrowLeft, FiSearch, FiX, FiChevronDown, FiCheck, 
  FiShoppingCart, FiClock, FiMapPin, FiPhone, FiMail, 
  FiPackage, FiTrash2, FiPlus, FiMinus, FiNavigation,
  FiHome, FiFileText, FiBriefcase, FiAlertCircle,
  FiActivity, FiHeart, FiDroplet, FiShield,
  FiThermometer, FiStar, FiTruck
} from 'react-icons/fi';
import { 
  GiMedicinePills, GiPill,
} from 'react-icons/gi';
import { MdLocalPharmacy, MdOutlineEmergency } from 'react-icons/md';
import { TbMedicineSyrup } from 'react-icons/tb';

const PharmacyDetailPage = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryDropdownRef = useRef(null);
  
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('medicines');
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // State to track which medicines are in cart for this pharmacy
  const [pharmacyCartItems, setPharmacyCartItems] = useState([]);

  const categories = [
    { id: 'all', name: 'All Medicines', icon: <GiMedicinePills /> },
    { id: 'painkiller', name: 'Pain Relief', icon: <GiPill /> },
    { id: 'fever', name: 'Fever & Cold', icon: <FiThermometer /> },
    { id: 'vitamin', name: 'Vitamins', icon: <FaCapsules /> },
    { id: 'chronic', name: 'Chronic Care', icon: <FiHeart /> },
    { id: 'skincare', name: 'Skin Care', icon: <FiDroplet /> },
    { id: 'babycare', name: 'Baby Care', icon: <FaBaby /> },
    { id: 'antibiotic', name: 'Antibiotics', icon: <FiShield /> },
    { id: 'cardiac', name: 'Cardiac Care', icon: <FiActivity /> },
    { id: 'diabetes', name: 'Diabetes', icon: <TbMedicineSyrup /> }
  ];

  // Update pharmacy cart items whenever cart changes
  useEffect(() => {
    const items = cart.filter(item => {
      // Check if item belongs to this pharmacy
      if (item.pharmacyId === id) {
        return true;
      }
      
      // Check if item has pharmacyIds array
      if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
        return item.pharmacyIds.includes(id);
      }
      
      // Check if item has availableAtPharmacies array
      if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
        return item.availableAtPharmacies.some(pharmacy => {
          return (typeof pharmacy === 'string' && pharmacy === id) ||
                 (pharmacy && pharmacy._id === id);
        });
      }
      
      return false;
    });
    
    setPharmacyCartItems(items);
  }, [cart, id]);

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
        console.error('Error fetching pharmacy:', err);
        setError('Error loading pharmacy details');
        navigate('/pharmacies');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPharmacyDetails();
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchPharmacyMedicines = async () => {
      try {
        setMedicineLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
        const data = await response.json();
        
        if (data.success) {
          const formattedMedicines = data.data.map(med => ({
            _id: `${id}_${med._id}`,
            name: med.name,
            genericName: med.genericName,
            description: med.description,
            category: med.category,
            price: med.price,
            discountedPrice: med.discountedPrice,
            discountPercentage: med.discountPercentage || 0,
            image: med.image,
            inStock: med.inStock,
            stockQuantity: med.stockQuantity,
            prescriptionRequired: med.prescriptionRequired || false,
            pharmacyId: id,
            pharmacyName: pharmacy?.name
          }));
          
          setPharmacyMedicines(formattedMedicines);
        }
      } catch (err) {
        console.error('Error fetching pharmacy medicines:', err);
      } finally {
        setMedicineLoading(false);
      }
    };
    
    if (id && pharmacy) {
      fetchPharmacyMedicines();
    }
  }, [id, pharmacy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMedicines = pharmacyMedicines.filter(medicine => {
    if (!medicine) return false;
    
    const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') {
      return matchesSearch;
    }
    
    let matchesCategory = false;
    if (medicine.category) {
      matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
                       medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
    } else {
      const categoryKeywords = {
        'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
        'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
        'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
        'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
        'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
        'babycare': ['baby', 'infant', 'pediatric', 'child'],
        'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
        'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
        'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
      };
      
      const keywords = categoryKeywords[selectedCategory] || [];
      matchesCategory = keywords.some(keyword => 
        medicine.name?.toLowerCase().includes(keyword) || 
        medicine.description?.toLowerCase().includes(keyword) ||
        medicine.genericName?.toLowerCase().includes(keyword)
      );
    }
    
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine) => {
    const uniqueId = `${medicine.name}_${id}`;
    
    // Check if already in cart for this pharmacy
    const existingItem = cart.find(item => 
      item.id === uniqueId && item.pharmacyId === id
    );
    
    if (existingItem) {
      setCart(prevCart => 
        prevCart.map(item =>
          item.id === uniqueId && item.pharmacyId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { 
        ...medicine, 
        id: uniqueId,
        _id: medicine._id,
        quantity: 1,
        price: medicine.price || 0,
        discountedPrice: medicine.discountedPrice,
        name: medicine.name,
        image: medicine.image,
        pharmacyId: id,
        pharmacyName: pharmacy.name
      }]);
    }
  };

  const clearCart = () => {
    setCart(prevCart => {
      return prevCart.filter(item => {
        // Remove only items from this specific pharmacy
        if (item.pharmacyId === id) {
          return false;
        }
        
        if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
          return false;
        }
        
        if (item.availableAtPharmacies) {
          const hasThisPharmacy = item.availableAtPharmacies.some(pharmacy => {
            return (typeof pharmacy === 'string' && pharmacy === id) ||
                   (pharmacy && pharmacy._id === id);
          });
          if (hasThisPharmacy) {
            return false;
          }
        }
        
        return true;
      });
    });
    setShowClearCartModal(false);
  };

  const removeFromCart = (medicineId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(medicineId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return pharmacyCartItems.reduce((sum, item) => {
      const price = item.discountedPrice || item.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return '0.00';
  };

  const ClearCartModal = () => {
    if (!showClearCartModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-scaleIn">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Clear Cart</h3>
              <button
                onClick={() => setShowClearCartModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-5">
              <div className="w-14 h-14 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                <FiTrash2 className="w-7 h-7 text-red-600" />
              </div>
              <p className="text-center text-gray-700">
                Remove all items from your cart?
              </p>
              <p className="text-center text-sm text-gray-500 mt-1">
                This will clear {pharmacyCartItems.length} item(s) from {pharmacy?.name}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowClearCartModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={clearCart}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
        <div className="relative">
          <div className="w-14 h-14 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 bg-[#2c6774] rounded-full"></div>
          </div>
        </div>
        <p className="mt-5 text-base text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/20 flex items-center justify-center">
            <FiAlertCircle className="w-8 h-8 text-red-300" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Pharmacy Not Found</h3>
          <p className="text-[#c0d3dc] text-sm mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => navigate('/pharmacies')}
              className="px-4 py-2.5 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm"
            >
              Back to Pharmacies
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 bg-transparent border border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ClearCartModal />
      
      {/* Pharmacy Header */}
      <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
        <div className="container mx-auto px-4 pt-5 pb-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
            <div className="max-w-3xl flex-1">
              <button 
                onClick={() => navigate('/pharmacies')}
                className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-3 transition-colors group text-sm"
              >
                <FiArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Back to Pharmacies
              </button>
              
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shadow-md ring-1 ring-white/20 flex-shrink-0">
                  <img 
                    src={pharmacy.image} 
                    alt={pharmacy.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-xl font-bold text-white truncate">{pharmacy.name}</h1>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
                      {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-[#c0d3dc] mb-2 text-sm">
                    <FiMapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span className="truncate">{pharmacy.address}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="flex items-center text-[#c0d3dc]">
                      <FiClock className="w-3 h-3 mr-1" />
                      <span>Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
                    </div>
                    
                    {pharmacy.distance && (
                      <div className="flex items-center text-[#c0d3dc]">
                        <FiMapPin className="w-3 h-3 mr-1" />
                        <span>{pharmacy.distance} away</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-2 mt-3 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-16">
                <div className="text-base font-bold text-white mb-0.5">{pharmacyMedicines.length}</div>
                <div className="text-xs text-[#c0d3dc]">Medicines</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-16">
                <div className="text-base font-bold text-white mb-0.5">{pharmacy.open ? '24/7' : 'Today'}</div>
                <div className="text-xs text-[#c0d3dc]">Hours</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* User-Friendly Navigation Tabs */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex overflow-x-auto bg-white rounded-t-lg shadow-md border-b border-gray-200 scrollbar-hide">
            <button
              onClick={() => setActiveTab('medicines')}
              className={`flex items-center px-4 sm:px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
                activeTab === 'medicines' 
                  ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
                  : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
              }`}
            >
              <GiMedicinePills className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Medicines</span>
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'medicines' ? 'bg-[#2c6774] text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {pharmacyMedicines.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 sm:px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
                activeTab === 'overview' 
                  ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
                  : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
              }`}
            >
              <FiFileText className="w-4 h-4 mr-2 flex-shrink-0" />
              Overview
            </button>
            
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center px-4 sm:px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
                activeTab === 'services' 
                  ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
                  : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
              }`}
            >
              <FiBriefcase className="w-4 h-4 mr-2 flex-shrink-0" />
              Services
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-5">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">About {pharmacy.name}</h2>
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3">Pharmacy Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex items-start">
                          <FiMapPin className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700 text-xs sm:text-sm">Address</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{pharmacy.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FiPhone className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700 text-xs sm:text-sm">Contact</p>
                            <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline text-xs sm:text-sm">
                              {pharmacy.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FiMail className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700 text-xs sm:text-sm">Email</p>
                            <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline text-xs sm:text-sm">
                              {pharmacy.email}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FiClock className="w-4 h-4 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700 text-xs sm:text-sm">Delivery Time</p>
                            <p className="text-gray-600 text-xs sm:text-sm">{pharmacy.deliveryTime || '15-20 minutes'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {pharmacy.description && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pharmacy.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Opening Hours</h2>
                  <div className="space-y-2">
                    {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                        <span className="font-medium text-gray-700 text-xs sm:text-sm capitalize">{day}</span>
                        <span className="font-semibold text-[#2c6774] text-xs sm:text-sm">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medicines' && (
              <div className="space-y-4 sm:space-y-5">
                {/* Medicine Search and Filter */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search medicines..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-2 pl-10 pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500 text-sm"
                        />
                        <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            <FiX className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2" ref={categoryDropdownRef}>
                      <div className="relative flex-1 sm:flex-none">
                        <button
                          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium w-full sm:w-auto justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <FiChevronDown className="w-4 h-4" />
                            <span className="truncate max-w-[100px] sm:max-w-[120px]">
                              {selectedCategory === 'all' ? 'All Categories' : 
                                categories.find(c => c.id === selectedCategory)?.name}
                            </span>
                          </div>
                          {selectedCategory !== 'all' && (
                            <span className="ml-auto bg-[#2c6774] text-white text-xs px-1.5 py-0.5 rounded-full">
                              {categories.find(c => c.id === selectedCategory)?.name.split(' ')[0]}
                            </span>
                          )}
                        </button>
                        
                        {showCategoryDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                            <div className="p-1">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                                Categories
                              </div>
                              {categories.map(category => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    setSelectedCategory(category.id);
                                    setShowCategoryDropdown(false);
                                  }}
                                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
                                    selectedCategory === category.id
                                      ? 'bg-[#2c6774] text-white'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  <span className="flex-shrink-0">{category.icon}</span>
                                  <span className="flex-1 text-left">{category.name}</span>
                                  {selectedCategory === category.id && (
                                    <FiCheck className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {(searchTerm || selectedCategory !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                          }}
                          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm flex items-center gap-1"
                        >
                          <FiX className="w-4 h-4" />
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(searchTerm || selectedCategory !== 'all') && (
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs text-gray-600">Active filters:</span>
                      {selectedCategory !== 'all' && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#2c6774]/10 text-[#2c6774] rounded text-xs">
                          {categories.find(c => c.id === selectedCategory)?.name}
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className="ml-1 text-[#2c6774] hover:text-[#174047]"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      {searchTerm && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          "{searchTerm}"
                          <button
                            onClick={() => setSearchTerm('')}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Medicine Results */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">Available Medicines</h2>
                      <p className="text-gray-600 text-xs mt-0.5">
                        {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
                        {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      Showing {Math.min(filteredMedicines.length, 12)} of {pharmacyMedicines.length}
                    </div>
                  </div>

                  {medicineLoading ? (
                    <div className="text-center py-10 bg-white rounded-lg">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 border-3 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
                      </div>
                      <p className="mt-3 text-gray-600 text-sm">Loading medicines...</p>
                    </div>
                  ) : filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                      {filteredMedicines.slice(0, 12).map((medicine) => (
                        <MedicineCard
                          key={medicine._id}
                          medicine={medicine}
                          onAddToCart={addToCart}
                          context="pharmacy-detail"
                          cart={cart}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                        <GiMedicinePills className="w-7 h-7 text-gray-400" />
                      </div>
                      <h3 className="text-base font-bold text-gray-800 mb-1">No Medicines Found</h3>
                      <p className="text-gray-600 text-sm max-w-md mx-auto mb-4">
                        {searchTerm || selectedCategory !== 'all' 
                          ? 'Try adjusting your search or filter' 
                          : 'No medicines available at the moment'}
                      </p>
                      {(searchTerm || selectedCategory !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                          }}
                          className="px-4 py-2 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors text-sm"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Load More Button */}
                  {filteredMedicines.length > 12 && (
                    <div className="text-center mt-5">
                      <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm font-medium">
                        Load More Medicines ({filteredMedicines.length - 12} more)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-4 sm:space-y-5">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Services Offered</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {pharmacy.services && pharmacy.services.map((service, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="w-8 h-8 rounded bg-[#2c6774]/10 flex items-center justify-center mr-3 group-hover:bg-[#2c6774]/20 transition-colors">
                          <FiCheck className="w-4 h-4 text-[#2c6774]" />
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-red-800 mb-1">24/7 Emergency Service</h3>
                      <p className="text-red-600 text-xs sm:text-sm">Urgent medicine needs at any time</p>
                    </div>
                    <a 
                      href={`tel:${pharmacy.phone}`}
                      className="flex items-center bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap text-sm w-full sm:w-auto justify-center"
                    >
                      <FiPhone className="w-4 h-4 mr-2" />
                      Emergency Call
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Cart & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-3 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      <FiShoppingCart className="w-4 h-4" />
                      Your Order ({pharmacyCartItems.length})
                    </h3>
                    {pharmacyCartItems.length > 0 && (
                      <button
                        onClick={() => setShowClearCartModal(true)}
                        className="text-white/80 hover:text-white text-xs flex items-center gap-0.5"
                      >
                        <FiTrash2 className="w-3 h-3" />
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-3">
                  {pharmacyCartItems.length === 0 ? (
                    <div className="text-center py-4">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                        <FiShoppingCart className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-xs mb-0.5">Your cart is empty</p>
                      <p className="text-gray-500 text-xs">Add medicines from above</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto mb-3 pr-1">
                        {pharmacyCartItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 p-1.5 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                            <div className="w-7 h-7 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate text-xs">{item.name}</p>
                              <p className="text-gray-600 text-xs">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-xs"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="w-5 text-center font-medium text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-xs"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-0.5 w-5 h-5 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors text-xs"
                              >
                                <FiX className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5 border-t pt-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">Delivery:</span>
                          <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between items-center font-bold text-[#2c6774] text-sm">
                            <span>Total:</span>
                            <span>Rs. {formatPrice(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/booking"
                        className={`w-full mt-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-2 px-3 rounded-lg font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm ${
                          pharmacyCartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={(e) => {
                          if (pharmacyCartItems.length === 0) {
                            e.preventDefault();
                          } else {
                            // Ensure we only pass items from this pharmacy
                            const pharmacyItems = cart.filter(item => 
                              item.pharmacyId === id || 
                              (item.pharmacyIds && item.pharmacyIds.includes(id))
                            );
                            
                            if (pharmacyItems.length !== pharmacyCartItems.length) {
                              // Update cart to only include items from this pharmacy
                              const otherItems = cart.filter(item => 
                                !(item.pharmacyId === id || 
                                (item.pharmacyIds && item.pharmacyIds.includes(id)))
                              );
                              setCart(pharmacyItems);
                            }
                          }
                        }}
                      >
                        Proceed to Checkout
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-lg p-3 text-white">
                <h3 className="text-xs font-bold mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  <a 
                    href={`tel:${pharmacy.phone}`}
                    className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-1.5 rounded font-medium transition-colors text-center text-xs"
                  >
                    <FiPhone className="w-3.5 h-3.5 mb-0.5" />
                    Call Pharmacy
                  </a>
                  
                  <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-1.5 rounded font-medium transition-colors text-center text-xs">
                    <FiNavigation className="w-3.5 h-3.5 mb-0.5" />
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <h3 className="text-xs font-bold text-gray-900 mb-2">Delivery Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded bg-[#2c6774]/10 flex items-center justify-center flex-shrink-0">
                      <FiClock className="w-3 h-3 text-[#2c6774]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs">Delivery Time</p>
                      <p className="text-gray-600 text-xs">{pharmacy.deliveryTime || '15-20 mins'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded bg-[#2c6774]/10 flex items-center justify-center flex-shrink-0">
                      <FiTruck className="w-3 h-3 text-[#2c6774]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs">Free Delivery</p>
                      <p className="text-gray-600 text-xs">On all orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-6 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-lg p-4 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-white mb-0.5">Need a different pharmacy?</h3>
                <p className="text-[#c0d3dc] text-xs">Browse our complete network</p>
              </div>
              <Link
                to="/pharmacies"
                className="inline-flex items-center bg-white text-[#2c6774] px-3 py-1.5 rounded font-bold hover:bg-gray-100 transition-all duration-300 text-center text-xs"
              >
                Explore All
                <FiArrowLeft className="w-3 h-3 ml-1.5 transform rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Cart Bar */}
      {pharmacyCartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-2 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-9 h-9 bg-[#2c6774] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  {pharmacyCartItems.length}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {pharmacyCartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Rs. {formatPrice(calculateTotal())}</p>
                <p className="text-xs text-gray-500">{pharmacy.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowClearCartModal(true)}
                className="p-1.5 text-gray-500 hover:text-red-500"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
              <Link
                to="/booking"
                className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-3 py-2 rounded-lg font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-sm"
                onClick={() => {
                  // Ensure only items from this pharmacy are in cart when proceeding
                  const otherItems = cart.filter(item => 
                    !(item.pharmacyId === id || 
                    (item.pharmacyIds && item.pharmacyIds.includes(id)))
                  );
                  
                  if (otherItems.length > 0) {
                    // Update cart to only include items from this pharmacy
                    setCart(pharmacyCartItems);
                  }
                }}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Responsive breakpoints */
        @media (max-width: 639px) {
          .container {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
        
        @media (min-width: 475px) and (max-width: 639px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        /* Fix medicine cards grid spacing */
        .grid-cols-1.xs\\:grid-cols-2.md\\:grid-cols-3 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        @media (min-width: 475px) {
          .grid-cols-1.xs\\:grid-cols-2.md\\:grid-cols-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        @media (min-width: 768px) {
          .grid-cols-1.xs\\:grid-cols-2.md\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        
        /* Fix gap between cards */
        .grid-cols-1.xs\\:grid-cols-2.md\\:grid-cols-3.gap-3 {
          gap: 0.75rem;
        }
      `}</style>
      
      {/* Bottom padding for mobile */}
      {pharmacyCartItems.length > 0 && <div className="lg:hidden h-16"></div>}
    </div>
  );
};

export default PharmacyDetailPage;





















//----------------------//
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';
// import { FaBaby, FaCapsules } from 'react-icons/fa';
// import { 
//   FiArrowLeft, FiSearch, FiX, FiChevronDown, FiCheck, 
//   FiShoppingCart, FiClock, FiMapPin, FiPhone, FiMail, 
//   FiPackage, FiTrash2, FiPlus, FiMinus, FiNavigation,
//   FiHome, FiFileText, FiBriefcase, FiAlertCircle,
//   FiActivity, FiHeart, FiDroplet, FiShield,
//   FiThermometer, FiStar, FiTruck
// } from 'react-icons/fi';
// import { 
//   GiMedicinePills, GiPill,
// } from 'react-icons/gi';
// import { MdLocalPharmacy, MdOutlineEmergency } from 'react-icons/md';
// import { TbMedicineSyrup } from 'react-icons/tb';

// const PharmacyDetailPage = ({ cart, setCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const categoryDropdownRef = useRef(null);
  
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('medicines');
//   const [showClearCartModal, setShowClearCartModal] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
//   // State to track which medicines are in cart for this pharmacy
//   const [pharmacyCartItems, setPharmacyCartItems] = useState([]);

//   const categories = [
//     { id: 'all', name: 'All Medicines', icon: <GiMedicinePills /> },
//     { id: 'painkiller', name: 'Pain Relief', icon: <GiPill /> },
//     { id: 'fever', name: 'Fever & Cold', icon: <FiThermometer /> },
//     { id: 'vitamin', name: 'Vitamins', icon: <FaCapsules /> },
//     { id: 'chronic', name: 'Chronic Care', icon: <FiHeart /> },
//     { id: 'skincare', name: 'Skin Care', icon: <FiDroplet /> },
//     { id: 'babycare', name: 'Baby Care', icon: <FaBaby /> },
//     { id: 'antibiotic', name: 'Antibiotics', icon: <FiShield /> },
//     { id: 'cardiac', name: 'Cardiac Care', icon: <FiActivity /> },
//     { id: 'diabetes', name: 'Diabetes', icon: <TbMedicineSyrup /> }
//   ];

//   // Update pharmacy cart items whenever cart changes
//   useEffect(() => {
//     const items = cart.filter(item => {
//       // Check if item belongs to this pharmacy
//       if (item.pharmacyId === id) {
//         return true;
//       }
      
//       // Check if item has pharmacyIds array
//       if (item.pharmacyIds && Array.isArray(item.pharmacyIds)) {
//         return item.pharmacyIds.includes(id);
//       }
      
//       // Check if item has availableAtPharmacies array
//       if (item.availableAtPharmacies && Array.isArray(item.availableAtPharmacies)) {
//         return item.availableAtPharmacies.some(pharmacy => {
//           return (typeof pharmacy === 'string' && pharmacy === id) ||
//                  (pharmacy && pharmacy._id === id);
//         });
//       }
      
//       return false;
//     });
    
//     setPharmacyCartItems(items);
//   }, [cart, id]);

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
//         console.error('Error fetching pharmacy:', err);
//         setError('Error loading pharmacy details');
//         navigate('/pharmacies');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchPharmacyDetails();
//     }
//   }, [id, navigate]);

//   useEffect(() => {
//     const fetchPharmacyMedicines = async () => {
//       try {
//         setMedicineLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
//         const data = await response.json();
        
//         if (data.success) {
//           const formattedMedicines = data.data.map(med => ({
//             _id: `${id}_${med._id}`,
//             name: med.name,
//             genericName: med.genericName,
//             description: med.description,
//             category: med.category,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountPercentage || 0,
//             image: med.image,
//             inStock: med.inStock,
//             stockQuantity: med.stockQuantity,
//             prescriptionRequired: med.prescriptionRequired || false,
//             pharmacyId: id,
//             pharmacyName: pharmacy?.name
//           }));
          
//           setPharmacyMedicines(formattedMedicines);
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacy medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     if (id && pharmacy) {
//       fetchPharmacyMedicines();
//     }
//   }, [id, pharmacy]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setShowCategoryDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const filteredMedicines = pharmacyMedicines.filter(medicine => {
//     if (!medicine) return false;
    
//     const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          medicine.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (selectedCategory === 'all') {
//       return matchesSearch;
//     }
    
//     let matchesCategory = false;
//     if (medicine.category) {
//       matchesCategory = medicine.category.toLowerCase() === selectedCategory.toLowerCase() ||
//                        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase());
//     } else {
//       const categoryKeywords = {
//         'painkiller': ['pain', 'ache', 'analgesic', 'relief', 'ibuprofen', 'paracetamol', 'aspirin'],
//         'fever': ['fever', 'cold', 'flu', 'temperature', 'fever', 'cold', 'allergy'],
//         'vitamin': ['vitamin', 'supplement', 'mineral', 'multivitamin', 'calcium'],
//         'chronic': ['chronic', 'long-term', 'maintenance', 'blood pressure', 'cholesterol'],
//         'skincare': ['skin', 'cream', 'ointment', 'dermatology', 'lotion', 'gel'],
//         'babycare': ['baby', 'infant', 'pediatric', 'child'],
//         'antibiotic': ['antibiotic', 'infection', 'bacterial', 'amoxicillin', 'azithromycin'],
//         'cardiac': ['heart', 'cardiac', 'blood pressure', 'cholesterol', 'hypertension'],
//         'diabetes': ['diabetes', 'insulin', 'blood sugar', 'metformin', 'glucose']
//       };
      
//       const keywords = categoryKeywords[selectedCategory] || [];
//       matchesCategory = keywords.some(keyword => 
//         medicine.name?.toLowerCase().includes(keyword) || 
//         medicine.description?.toLowerCase().includes(keyword) ||
//         medicine.genericName?.toLowerCase().includes(keyword)
//       );
//     }
    
//     return matchesSearch && matchesCategory;
//   });

//   const addToCart = (medicine) => {
//     const uniqueId = `${medicine.name}_${id}`;
    
//     // Check if already in cart for this pharmacy
//     const existingItem = cart.find(item => 
//       item.id === uniqueId && item.pharmacyId === id
//     );
    
//     if (existingItem) {
//       setCart(prevCart => 
//         prevCart.map(item =>
//           item.id === uniqueId && item.pharmacyId === id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart(prevCart => [...prevCart, { 
//         ...medicine, 
//         id: uniqueId,
//         _id: medicine._id,
//         quantity: 1,
//         price: medicine.price || 0,
//         discountedPrice: medicine.discountedPrice,
//         name: medicine.name,
//         image: medicine.image,
//         pharmacyId: id,
//         pharmacyName: pharmacy.name
//       }]);
//     }
//   };

//   const clearCart = () => {
//     setCart(prevCart => {
//       return prevCart.filter(item => {
//         // Remove only items from this specific pharmacy
//         if (item.pharmacyId === id) {
//           return false;
//         }
        
//         if (item.pharmacyIds && item.pharmacyIds.includes(id)) {
//           return false;
//         }
        
//         if (item.availableAtPharmacies) {
//           const hasThisPharmacy = item.availableAtPharmacies.some(pharmacy => {
//             return (typeof pharmacy === 'string' && pharmacy === id) ||
//                    (pharmacy && pharmacy._id === id);
//           });
//           if (hasThisPharmacy) {
//             return false;
//           }
//         }
        
//         return true;
//       });
//     });
//     setShowClearCartModal(false);
//   };

//   const removeFromCart = (medicineId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== medicineId));
//   };

//   const updateQuantity = (medicineId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(medicineId);
//       return;
//     }
    
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === medicineId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     return pharmacyCartItems.reduce((sum, item) => {
//       const price = item.discountedPrice || item.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   };

//   const formatPrice = (price) => {
//     if (typeof price === 'number') {
//       return price.toFixed(2);
//     }
//     return '0.00';
//   };

//   const ClearCartModal = () => {
//     if (!showClearCartModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-scaleIn">
//           <div className="p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-900">Clear Cart</h3>
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <FiX className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
            
//             <div className="mb-5">
//               <div className="w-14 h-14 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
//                 <FiTrash2 className="w-7 h-7 text-red-600" />
//               </div>
//               <p className="text-center text-gray-700">
//                 Remove all items from your cart?
//               </p>
//               <p className="text-center text-sm text-gray-500 mt-1">
//                 This will clear {pharmacyCartItems.length} item(s) from {pharmacy?.name}
//               </p>
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowClearCartModal(false)}
//                 className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={clearCart}
//                 className="flex-1 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-lg font-medium hover:from-[#1e4e56] hover:to-[#2c6774] transition-colors text-sm"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="relative">
//           <div className="w-14 h-14 border-4 border-[#c0d3dc] border-t-transparent rounded-full animate-spin"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-7 h-7 bg-[#2c6774] rounded-full"></div>
//           </div>
//         </div>
//         <p className="mt-5 text-base text-[#c0d3dc] font-medium">Loading pharmacy details...</p>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#174047] to-[#2c6774]">
//         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md w-full text-center">
//           <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/20 flex items-center justify-center">
//             <FiAlertCircle className="w-8 h-8 text-red-300" />
//           </div>
//           <h3 className="text-lg font-bold text-white mb-1">Pharmacy Not Found</h3>
//           <p className="text-[#c0d3dc] text-sm mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <div className="flex gap-2 justify-center">
//             <button
//               onClick={() => navigate('/pharmacies')}
//               className="px-4 py-2.5 bg-white text-[#174047] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-sm"
//             >
//               Back to Pharmacies
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2.5 bg-transparent border border-white/30 text-white rounded-lg font-semibold hover:border-white transition-all duration-300 text-sm"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <ClearCartModal />
      
//       {/* Pharmacy Header */}
//       <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f]">
//         <div className="container mx-auto px-4 pt-5 pb-6 relative z-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
//             <div className="max-w-3xl flex-1">
//               <button 
//                 onClick={() => navigate('/pharmacies')}
//                 className="inline-flex items-center text-[#c0d3dc] hover:text-white mb-3 transition-colors group text-sm"
//               >
//                 <FiArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
//                 Back to Pharmacies
//               </button>
              
//               <div className="flex items-start gap-3">
//                 <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shadow-md ring-1 ring-white/20 flex-shrink-0">
//                   <img 
//                     src={pharmacy.image} 
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                     }}
//                   />
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//                     <h1 className="text-xl font-bold text-white truncate">{pharmacy.name}</h1>
//                     <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${pharmacy.open ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}>
//                       {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center text-[#c0d3dc] mb-2 text-sm">
//                     <FiMapPin className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
//                     <span className="truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-2 text-xs">
//                     <div className="flex items-center text-[#c0d3dc]">
//                       <FiClock className="w-3 h-3 mr-1" />
//                       <span>Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
                    
//                     {pharmacy.distance && (
//                       <div className="flex items-center text-[#c0d3dc]">
//                         <FiMapPin className="w-3 h-3 mr-1" />
//                         <span>{pharmacy.distance} away</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats */}
//             <div className="flex gap-2 mt-3 lg:mt-0">
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-16">
//                 <div className="text-base font-bold text-white mb-0.5">{pharmacyMedicines.length}</div>
//                 <div className="text-xs text-[#c0d3dc]">Medicines</div>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-16">
//                 <div className="text-base font-bold text-white mb-0.5">{pharmacy.open ? '24/7' : 'Today'}</div>
//                 <div className="text-xs text-[#c0d3dc]">Hours</div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* User-Friendly Navigation Tabs */}
//         <div className="container mx-auto px-4 relative z-20">
//           <div className="flex overflow-x-auto bg-white rounded-t-lg shadow-md border-b border-gray-200 scrollbar-hide">
//             <button
//               onClick={() => setActiveTab('medicines')}
//               className={`flex items-center px-4 sm:px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
//                 activeTab === 'medicines' 
//                   ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <GiMedicinePills className="w-4 h-4 mr-2 flex-shrink-0" />
//               <span>Medicines</span>
//               <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
//                 activeTab === 'medicines' ? 'bg-[#2c6774] text-white' : 'bg-gray-200 text-gray-700'
//               }`}>
//                 {pharmacyMedicines.length}
//               </span>
//             </button>
            
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`flex items-center px-4 sm:px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
//                 activeTab === 'overview' 
//                   ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <FiFileText className="w-4 h-4 mr-2 flex-shrink-0" />
//               Overview
//             </button>
            
//             <button
//               onClick={() => setActiveTab('services')}
//               className={`flex items-center px-4 sm:px-5 py-3 font-semibold whitespace-nowrap transition-all duration-200 relative min-w-max ${
//                 activeTab === 'services' 
//                   ? 'text-[#2c6774] border-b-2 border-[#2c6774]' 
//                   : 'text-gray-600 hover:text-[#2c6774] hover:bg-gray-50'
//               }`}
//             >
//               <FiBriefcase className="w-4 h-4 mr-2 flex-shrink-0" />
//               Services
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-2 sm:px-4 py-4">
//         <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
//           {/* Left Column - Main Content */}
//           <div className="lg:w-2/3 space-y-3 sm:space-y-4">
//             {activeTab === 'overview' && (
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
//                   <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">About {pharmacy.name}</h2>
//                   <div className="space-y-3 sm:space-y-4">
//                     <div>
//                       <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2">Pharmacy Details</h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         <div className="flex items-start">
//                           <FiMapPin className="w-3.5 h-3.5 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-xs sm:text-sm">Address</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{pharmacy.address}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <FiPhone className="w-3.5 h-3.5 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-xs sm:text-sm">Contact</p>
//                             <a href={`tel:${pharmacy.phone}`} className="text-[#2c6774] hover:text-[#174047] hover:underline text-xs sm:text-sm">
//                               {pharmacy.phone}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <FiMail className="w-3.5 h-3.5 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-xs sm:text-sm">Email</p>
//                             <a href={`mailto:${pharmacy.email}`} className="text-[#2c6774] hover:text-[#174047] hover:underline text-xs sm:text-sm">
//                               {pharmacy.email}
//                             </a>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <FiClock className="w-3.5 h-3.5 text-[#2c6774] mt-0.5 mr-2 flex-shrink-0" />
//                           <div>
//                             <p className="font-medium text-gray-700 text-xs sm:text-sm">Delivery Time</p>
//                             <p className="text-gray-600 text-xs sm:text-sm">{pharmacy.deliveryTime || '15-20 minutes'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {pharmacy.description && (
//                       <div>
//                         <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
//                         <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pharmacy.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
//                   <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Opening Hours</h2>
//                   <div className="space-y-1">
//                     {pharmacy.openingHours && Object.entries(pharmacy.openingHours).map(([day, hours]) => (
//                       <div key={day} className="flex justify-between items-center py-1.5 px-2 sm:px-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
//                         <span className="font-medium text-gray-700 text-xs sm:text-sm capitalize">{day}</span>
//                         <span className="font-semibold text-[#2c6774] text-xs sm:text-sm">{hours}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'medicines' && (
//               <div className="space-y-3 sm:space-y-4">
//                 {/* Medicine Search and Filter */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
//                   <div className="flex flex-col sm:flex-row gap-2 mb-2">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <input
//                           type="text"
//                           placeholder="Search medicines..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full px-3 sm:px-4 py-1.5 sm:py-2 pl-9 pr-7 sm:pr-8 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774] text-gray-900 placeholder-gray-500 text-xs sm:text-sm"
//                         />
//                         <FiSearch className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
//                         {searchTerm && (
//                           <button
//                             onClick={() => setSearchTerm('')}
//                             className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             <FiX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-1.5 sm:gap-2" ref={categoryDropdownRef}>
//                       <div className="relative flex-1 sm:flex-none">
//                         <button
//                           onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                           className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto justify-between"
//                         >
//                           <div className="flex items-center gap-1.5 sm:gap-2">
//                             <FiChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                             <span className="truncate max-w-[80px] sm:max-w-[120px] text-xs sm:text-sm">
//                               {selectedCategory === 'all' ? 'All Categories' : 
//                                 categories.find(c => c.id === selectedCategory)?.name}
//                             </span>
//                           </div>
//                           {selectedCategory !== 'all' && (
//                             <span className="ml-1 bg-[#2c6774] text-white text-xs px-1 py-0.5 rounded-full">
//                               {categories.find(c => c.id === selectedCategory)?.name.split(' ')[0]}
//                             </span>
//                           )}
//                         </button>
                        
//                         {showCategoryDropdown && (
//                           <div className="absolute top-full left-0 mt-1 w-full sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
//                             <div className="p-1">
//                               <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 sm:px-3 py-1.5 sm:py-2">
//                                 Categories
//                               </div>
//                               {categories.map(category => (
//                                 <button
//                                   key={category.id}
//                                   onClick={() => {
//                                     setSelectedCategory(category.id);
//                                     setShowCategoryDropdown(false);
//                                   }}
//                                   className={`w-full flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded transition-colors ${
//                                     selectedCategory === category.id
//                                       ? 'bg-[#2c6774] text-white'
//                                       : 'text-gray-700 hover:bg-gray-100'
//                                   }`}
//                                 >
//                                   <span className="flex-shrink-0">{category.icon}</span>
//                                   <span className="flex-1 text-left">{category.name}</span>
//                                   {selectedCategory === category.id && (
//                                     <FiCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                                   )}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
                      
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-xs sm:text-sm flex items-center gap-1"
//                         >
//                           <FiX className="w-3 h-3 sm:w-4 sm:h-4" />
//                           Clear
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Active Filters Display */}
//                   {(searchTerm || selectedCategory !== 'all') && (
//                     <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5">
//                       <span className="text-xs text-gray-600">Active filters:</span>
//                       {selectedCategory !== 'all' && (
//                         <div className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#2c6774]/10 text-[#2c6774] rounded text-xs">
//                           {categories.find(c => c.id === selectedCategory)?.name}
//                           <button
//                             onClick={() => setSelectedCategory('all')}
//                             className="ml-0.5 text-[#2c6774] hover:text-[#174047]"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       )}
//                       {searchTerm && (
//                         <div className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                           "{searchTerm}"
//                           <button
//                             onClick={() => setSearchTerm('')}
//                             className="ml-0.5 text-gray-500 hover:text-gray-700"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Medicine Results */}
//                 <div>
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-3 gap-1">
//                     <div>
//                       <h2 className="text-base sm:text-lg font-bold text-gray-900">Available Medicines</h2>
//                       <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
//                         {medicineLoading ? 'Loading...' : `${filteredMedicines.length} medicines found`}
//                         {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
//                       </p>
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       Showing {Math.min(filteredMedicines.length, 12)} of {pharmacyMedicines.length}
//                     </div>
//                   </div>

//                   {medicineLoading ? (
//                     <div className="text-center py-6 sm:py-8 bg-white rounded-lg">
//                       <div className="flex justify-center">
//                         <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-3 border-[#c0d3dc] border-t-[#2c6774] rounded-full animate-spin"></div>
//                       </div>
//                       <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm">Loading medicines...</p>
//                     </div>
//                   ) : filteredMedicines.length > 0 ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
//                       {filteredMedicines.slice(0, 12).map((medicine) => (
//                         <MedicineCard
//                           key={medicine._id}
//                           medicine={medicine}
//                           onAddToCart={addToCart}
//                           context="pharmacy-detail"
//                           cart={cart}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-6 sm:py-8 bg-white rounded-lg shadow-sm border border-gray-200">
//                       <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 rounded-full bg-gray-100 flex items-center justify-center">
//                         <GiMedicinePills className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400" />
//                       </div>
//                       <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">No Medicines Found</h3>
//                       <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto mb-3 sm:mb-4">
//                         {searchTerm || selectedCategory !== 'all' 
//                           ? 'Try adjusting your search or filter' 
//                           : 'No medicines available at the moment'}
//                       </p>
//                       {(searchTerm || selectedCategory !== 'all') && (
//                         <button
//                           onClick={() => {
//                             setSearchTerm('');
//                             setSelectedCategory('all');
//                           }}
//                           className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2c6774] text-white rounded-lg font-medium hover:bg-[#1e4e56] transition-colors text-xs sm:text-sm"
//                         >
//                           Clear All Filters
//                         </button>
//                       )}
//                     </div>
//                   )}
                  
//                   {/* Load More Button */}
//                   {filteredMedicines.length > 12 && (
//                     <div className="text-center mt-3 sm:mt-4">
//                       <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium">
//                         Load More Medicines ({filteredMedicines.length - 12} more)
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'services' && (
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
//                   <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Services Offered</h2>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
//                     {pharmacy.services && pharmacy.services.map((service, index) => (
//                       <div key={index} className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
//                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-[#2c6774]/10 flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-[#2c6774]/20 transition-colors">
//                           <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#2c6774]" />
//                         </div>
//                         <span className="font-medium text-gray-800 text-xs sm:text-sm">{service}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-3 sm:p-4">
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
//                     <div>
//                       <h3 className="text-sm sm:text-base font-bold text-red-800 mb-0.5 sm:mb-1">24/7 Emergency Service</h3>
//                       <p className="text-red-600 text-xs sm:text-sm">Urgent medicine needs at any time</p>
//                     </div>
//                     <a 
//                       href={`tel:${pharmacy.phone}`}
//                       className="flex items-center bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap text-xs sm:text-sm w-full sm:w-auto justify-center"
//                     >
//                       <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//                       Emergency Call
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Cart & Quick Actions */}
//           <div className="lg:w-1/3">
//             <div className="sticky top-2 sm:top-4 space-y-2 sm:space-y-3">
//               {/* Order Summary Card */}
//               <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] p-2 sm:p-3 text-white">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-xs sm:text-sm font-bold flex items-center gap-1">
//                       <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
//                       Your Order ({pharmacyCartItems.length})
//                     </h3>
//                     {pharmacyCartItems.length > 0 && (
//                       <button
//                         onClick={() => setShowClearCartModal(true)}
//                         className="text-white/80 hover:text-white text-xs flex items-center gap-0.5"
//                       >
//                         <FiTrash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="p-2 sm:p-3">
//                   {pharmacyCartItems.length === 0 ? (
//                     <div className="text-center py-3 sm:py-4">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 sm:mb-2 rounded-full bg-gray-100 flex items-center justify-center">
//                         <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
//                       </div>
//                       <p className="text-gray-600 text-xs mb-0.5">Your cart is empty</p>
//                       <p className="text-gray-500 text-xs">Add medicines from above</p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="space-y-1 max-h-48 sm:max-h-56 overflow-y-auto mb-2 sm:mb-3 pr-1">
//                         {pharmacyCartItems.map((item) => (
//                           <div key={item.id} className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
//                             <div className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-gray-200 overflow-hidden flex-shrink-0">
//                               {item.image && (
//                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
                            
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-gray-800 truncate text-xs">{item.name}</p>
//                               <p className="text-gray-600 text-xs">Rs. {formatPrice((item.discountedPrice || item.price || 0) * item.quantity)}</p>
//                             </div>
                            
//                             <div className="flex items-center gap-0.5">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-xs"
//                               >
//                                 <FiMinus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                               </button>
//                               <span className="w-4 sm:w-5 text-center font-medium text-xs">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition-colors text-xs"
//                               >
//                                 <FiPlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                               </button>
//                               <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-0.5 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors text-xs"
//                               >
//                                 <FiX className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="space-y-1 border-t pt-2">
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-gray-600">Subtotal:</span>
//                           <span className="font-semibold">Rs. {formatPrice(calculateTotal())}</span>
//                         </div>
//                         <div className="flex justify-between items-center text-xs">
//                           <span className="text-gray-600">Delivery:</span>
//                           <span className="font-semibold text-green-600">Free</span>
//                         </div>
//                         <div className="border-t pt-1.5">
//                           <div className="flex justify-between items-center font-bold text-[#2c6774] text-sm">
//                             <span>Total:</span>
//                             <span>Rs. {formatPrice(calculateTotal())}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <Link
//                         to="/booking"
//                         className={`w-full mt-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg font-semibold text-center hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-xs sm:text-sm ${
//                           pharmacyCartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//                         }`}
//                         onClick={(e) => {
//                           if (pharmacyCartItems.length === 0) {
//                             e.preventDefault();
//                           } else {
//                             // Ensure we only pass items from this pharmacy
//                             const pharmacyItems = cart.filter(item => 
//                               item.pharmacyId === id || 
//                               (item.pharmacyIds && item.pharmacyIds.includes(id))
//                             );
                            
//                             if (pharmacyItems.length !== pharmacyCartItems.length) {
//                               // Update cart to only include items from this pharmacy
//                               const otherItems = cart.filter(item => 
//                                 !(item.pharmacyId === id || 
//                                 (item.pharmacyIds && item.pharmacyIds.includes(id)))
//                               );
//                               setCart(pharmacyItems);
//                             }
//                           }
//                         }}
//                       >
//                         Proceed to Checkout
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-r from-[#5c878f] to-[#2c6774] rounded-lg p-2 sm:p-3 text-white">
//                 <h3 className="text-xs font-bold mb-1.5 sm:mb-2">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
//                   <a 
//                     href={`tel:${pharmacy.phone}`}
//                     className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-1 sm:py-1.5 rounded font-medium transition-colors text-center text-xs"
//                   >
//                     <FiPhone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mb-0.5" />
//                     Call Pharmacy
//                   </a>
                  
//                   <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm py-1 sm:py-1.5 rounded font-medium transition-colors text-center text-xs">
//                     <FiNavigation className="w-3 h-3 sm:w-3.5 sm:h-3.5 mb-0.5" />
//                     Get Directions
//                   </button>
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3">
//                 <h3 className="text-xs font-bold text-gray-900 mb-1.5 sm:mb-2">Delivery Information</h3>
//                 <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
//                   <div className="flex items-center gap-1 sm:gap-1.5">
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#2c6774]/10 flex items-center justify-center flex-shrink-0">
//                       <FiClock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2c6774]" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800 text-xs">Delivery Time</p>
//                       <p className="text-gray-600 text-xs">{pharmacy.deliveryTime || '15-20 mins'}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-1 sm:gap-1.5">
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#2c6774]/10 flex items-center justify-center flex-shrink-0">
//                       <FiTruck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#2c6774]" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800 text-xs">Free Delivery</p>
//                       <p className="text-gray-600 text-xs">On all orders</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Banner */}
//         <div className="mt-4 sm:mt-6 bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-lg p-3 sm:p-4 relative overflow-hidden">
//           <div className="relative z-10">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
//               <div className="text-center sm:text-left">
//                 <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">Need a different pharmacy?</h3>
//                 <p className="text-[#c0d3dc] text-xs">Browse our complete network</p>
//               </div>
//               <Link
//                 to="/pharmacies"
//                 className="inline-flex items-center bg-white text-[#2c6774] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded font-bold hover:bg-gray-100 transition-all duration-300 text-center text-xs"
//               >
//                 Explore All
//                 <FiArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 transform rotate-180" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Cart Bar */}
//       {pharmacyCartItems.length > 0 && (
//         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-1.5 sm:p-2 z-40">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1.5 sm:gap-2">
//               <div className="relative">
//                 <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#2c6774] text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm">
//                   {pharmacyCartItems.length}
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                   {pharmacyCartItems.reduce((sum, item) => sum + item.quantity, 0)}
//                 </div>
//               </div>
//               <div>
//                 <p className="font-bold text-gray-900 text-xs sm:text-sm">Rs. {formatPrice(calculateTotal())}</p>
//                 <p className="text-gray-500 text-xs">{pharmacy.name}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 sm:gap-1.5">
//               <button
//                 onClick={() => setShowClearCartModal(true)}
//                 className="p-1 text-gray-500 hover:text-red-500"
//               >
//                 <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//               </button>
//               <Link
//                 to="/booking"
//                 className="bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold hover:from-[#1e4e56] hover:to-[#2c6774] transition-all duration-300 text-xs sm:text-sm"
//                 onClick={() => {
//                   // Ensure only items from this pharmacy are in cart when proceeding
//                   const otherItems = cart.filter(item => 
//                     !(item.pharmacyId === id || 
//                     (item.pharmacyIds && item.pharmacyIds.includes(id)))
//                   );
                  
//                   if (otherItems.length > 0) {
//                     // Update cart to only include items from this pharmacy
//                     setCart(pharmacyCartItems);
//                   }
//                 }}
//               >
//                 Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add custom styles */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.2s ease-out;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
      
//       {/* Bottom padding for mobile */}
//       {pharmacyCartItems.length > 0 && <div className="lg:hidden h-14 sm:h-16"></div>}
//     </div>
//   );
// };

// export default PharmacyDetailPage;