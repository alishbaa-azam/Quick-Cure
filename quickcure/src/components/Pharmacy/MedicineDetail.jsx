// //-------------------Login corrected------------
// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { 
// //   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
// //   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
// //   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
// //   FaTruck, FaCheckCircle, FaShoppingBag,
// //   FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
// //   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
// //   FaChevronRight, FaChevronLeft, FaTimes, FaExclamationCircle,
// //   FaCheck, FaInfo, FaBan
// // } from 'react-icons/fa';

// // const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
  
// //   const [medicine, setMedicine] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [activeSection, setActiveSection] = useState('overview');
// //   const [relatedMedicines, setRelatedMedicines] = useState([]);
// //   const [isAggregatedView, setIsAggregatedView] = useState(false);
// //   const [pharmacyId, setPharmacyId] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// //   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  
// //   // Modal states
// //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');

// //   // Check login status from localStorage - same as pharmacy dashboard
// //   useEffect(() => {
// //     const checkAuth = () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const userStr = localStorage.getItem('user');
        
// //         if (token && userStr) {
// //           const user = JSON.parse(userStr);
// //           setIsLoggedIn(true);
// //           // Check if user is pharmacy (same logic as pharmacy dashboard)
// //           setIsPharmacyUser(user.role === 'pharmacy');
// //         } else {
// //           setIsLoggedIn(false);
// //           setIsPharmacyUser(false);
// //         }
// //       } catch (error) {
// //         console.error('Error checking auth:', error);
// //         setIsLoggedIn(false);
// //         setIsPharmacyUser(false);
// //       }
// //     };

// //     checkAuth();

// //     // Listen for storage changes
// //     const handleStorageChange = () => {
// //       checkAuth();
// //     };

// //     window.addEventListener('storage', handleStorageChange);
    
// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //     };
// //   }, []);

// //   const requireLogin = (actionType) => {
// //     if (!isLoggedIn) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: `Please login to ${actionType}` 
// //         } 
// //       });
// //       return false;
// //     }
// //     return true;
// //   };

// //   // Fix: Checkout button logic - show modal instead of alert
// //   const handleCheckout = () => {
// //     if (cart.length === 0) {
// //       setShowEmptyCartModal(true);
// //       return;
// //     }
    
// //     if (!isLoggedIn) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: '/booking',
// //           message: 'Please login to proceed to checkout' 
// //         } 
// //       });
// //       return;
// //     }
    
// //     // Check if pharmacy user trying to checkout
// //     if (isPharmacyUser) {
// //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }
    
// //     navigate('/booking');
// //   };

// //   // Fix: Add to cart button logic - prevent adding without login and check pharmacy role
// //   const addToCart = () => {
// //     // Direct check from localStorage (same as pharmacy dashboard)
// //     const token = localStorage.getItem('token');
// //     const userStr = localStorage.getItem('user');
    
// //     if (!token || !userStr) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Please login to add items to cart' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Parse user data
// //     let user = null;
// //     try {
// //       user = JSON.parse(userStr);
// //     } catch (error) {
// //       console.error('Error parsing user data:', error);
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Session expired. Please login again.' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Check if pharmacy user (same logic as pharmacy dashboard)
// //     if (user && user.role === 'pharmacy') {
// //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }

// //     if (!medicine || !selectedPharmacy) return;
    
// //     const cartItem = {
// //       ...medicine,
// //       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
// //       quantity: quantity,
// //       selectedPharmacy: selectedPharmacy,
// //       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
// //     };
    
// //     setCart(prevCart => {
// //       const existingItem = prevCart.find(item => item.id === cartItem.id);
// //       if (existingItem) {
// //         return prevCart.map(item =>
// //           item.id === cartItem.id
// //             ? { ...item, quantity: item.quantity + quantity }
// //             : item
// //         );
// //       }
// //       return [...prevCart, cartItem];
// //     });
    
// //     // Show success modal
// //     setSuccessMessage(`${quantity} ${medicine.name} added to cart successfully!`);
// //     setShowSuccessModal(true);
// //   };

// //   // Fix: Call Pharmacy button logic - show modal instead of alert
// //   const handleCallPharmacy = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
// //     setShowCallPharmacyModal(true);
// //   };

// //   // Actual call function after confirmation
// //   const confirmCallPharmacy = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
// //     window.location.href = `tel:${phoneNumber}`;
// //     setShowCallPharmacyModal(false);
// //   };

// //   // Share function with modal confirmation
// //   const handleShare = () => {
// //     if (navigator.share) {
// //       navigator.share({
// //         title: medicine?.name,
// //         text: `Check out ${medicine?.name} on Pharmacy App`,
// //         url: window.location.href,
// //       })
// //       .catch(console.error);
// //     } else {
// //       // Fallback: Copy to clipboard
// //       navigator.clipboard.writeText(window.location.href)
// //         .then(() => {
// //           setShowLinkCopiedModal(true);
// //           setTimeout(() => setShowLinkCopiedModal(false), 2000);
// //         })
// //         .catch(console.error);
// //     }
// //   };

// //   // Close all modals
// //   const closeAllModals = () => {
// //     setShowEmptyCartModal(false);
// //     setShowCallPharmacyModal(false);
// //     setShowLinkCopiedModal(false);
// //     setShowSuccessModal(false);
// //     setShowPharmacyErrorModal(false);
// //   };

// //   // Modal components

// // const EmptyCartModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowEmptyCartModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
// //           <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
// //         <p className="text-gray-600 text-center mb-6">
// //           You need to add items to your cart before proceeding to checkout.
// //         </p>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => setShowEmptyCartModal(false)}
// //             className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //           >
// //             Continue Shopping
// //           </button>
// //           <button
// //             onClick={() => {
// //               setShowEmptyCartModal(false);
// //               navigate('/medicines');
// //             }}
// //             className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //           >
// //             Browse Medicines
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const CallPharmacyModal = () => {
// //   const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
  
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div 
// //         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //         onClick={() => setShowCallPharmacyModal(false)}
// //       />
      
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
// //         <div className="p-6">
// //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
// //             <FaPhoneAlt className="w-8 h-8 text-blue-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
// //           <p className="text-gray-600 text-center mb-4">
// //             Do you want to call this pharmacy?
// //           </p>
// //           <div className="bg-blue-50 rounded-lg p-4 mb-6">
// //             <div className="flex items-center justify-center">
// //               <FaPhoneAlt className="text-blue-500 mr-3" />
// //               <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
// //             </div>
// //             <p className="text-sm text-gray-500 text-center mt-2">
// //               {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
// //             </p>
// //           </div>
// //           <div className="flex gap-3">
// //             <button
// //               onClick={() => setShowCallPharmacyModal(false)}
// //               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={confirmCallPharmacy}
// //               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
// //             >
// //               <FaPhoneAlt className="mr-2" />
// //               Call Now
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const LinkCopiedModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowLinkCopiedModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// //           <FaCheck className="w-8 h-8 text-green-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
// //         <p className="text-gray-600 text-center">
// //           Medicine link has been copied to clipboard.
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const SuccessModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowSuccessModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// //           <FaCheck className="w-8 h-8 text-green-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
// //         <p className="text-gray-600 text-center mb-6">
// //           {successMessage}
// //         </p>
// //         <button
// //           onClick={() => setShowSuccessModal(false)}
// //           className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //         >
// //           Continue Shopping
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const PharmacyErrorModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowPharmacyErrorModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
// //           <FaExclamationTriangle className="w-8 h-8 text-red-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
// //         <p className="text-gray-600 text-center mb-6">
// //           {successMessage}
// //         </p>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => setShowPharmacyErrorModal(false)}
// //             className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //           >
// //             OK
// //           </button>
// //           <button
// //             onClick={() => {
// //               setShowPharmacyErrorModal(false);
// //               navigate('/login');
// //             }}
// //             className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //           >
// //             Switch Account
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// //   useEffect(() => {
// //     const fetchMedicineDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const idParts = id.split('_');
        
// //         if (idParts.length === 2) {
// //           await fetchPharmacyMedicine(idParts[0], idParts[1]);
// //         } else {
// //           await fetchAggregatedMedicine(id);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching medicine:', err);
// //         setError('Error loading medicine details');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (id) {
// //       fetchMedicineDetails();
// //     }
// //   }, [id]);

// //   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
// //       );
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const medicineData = data.data;
// //         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
// //           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
// //           : 0;
        
// //         const medicineDetails = {
// //           _id: medicineId,
// //           id: `${pharmacyId}_${medicineId}`,
// //           name: medicineData.name,
// //           genericName: medicineData.genericName,
// //           description: medicineData.description,
// //           detailedDescription: medicineData.detailedDescription || medicineData.description,
// //           category: medicineData.category,
// //           price: medicineData.price,
// //           discountedPrice: medicineData.discountedPrice,
// //           discountPercentage: discountPercentage,
// //           dosage: medicineData.dosage || 'As prescribed',
// //           strength: medicineData.strength,
// //           form: medicineData.form,
// //           manufacturer: medicineData.manufacturer,
// //           image: medicineData.image,
// //           prescriptionRequired: medicineData.prescriptionRequired || false,
// //           inStock: medicineData.inStock !== false,
// //           sideEffects: medicineData.sideEffects || [],
// //           uses: medicineData.uses || [],
// //           precautions: medicineData.precautions || [],
// //           instructions: medicineData.instructions || [],
// //           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
// //           pharmacyId: pharmacyId,
// //           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
// //           pharmacyAddress: medicineData.pharmacy?.address,
// //           pharmacyCity: medicineData.pharmacy?.city,
// //           pharmacyPhone: medicineData.pharmacy?.phone,
// //           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
// //           pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
// //           availableAtPharmacies: [{
// //             _id: pharmacyId,
// //             name: medicineData.pharmacy?.name || 'Pharmacy',
// //             city: medicineData.pharmacy?.city,
// //             distance: medicineData.pharmacy?.distance || '2.5 km',
// //             deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
// //             rating: medicineData.pharmacy?.rating || 4.2
// //           }]
// //         };
        
// //         setMedicine(medicineDetails);
// //         setPharmacyId(pharmacyId);
// //         setIsAggregatedView(false);
// //         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
// //         if (medicineData.category) {
// //           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
// //         }
// //       } else {
// //         setError(data.message || 'Medicine not found');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching pharmacy medicine:', err);
// //       setError('Error loading medicine details from pharmacy');
// //     }
// //   };

// //   const fetchAggregatedMedicine = async (medicineName) => {
// //     try {
// //       const encodedName = encodeURIComponent(medicineName);
// //       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const medicineDetails = {
// //           _id: medicineName,
// //           id: medicineName,
// //           name: data.data.medicine.name,
// //           genericName: data.data.medicine.genericName,
// //           description: data.data.medicine.description,
// //           detailedDescription: data.data.medicine.detailedDescription,
// //           category: data.data.medicine.category,
// //           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
// //           discountedPrice: data.data.stats?.lowestDiscountedPrice,
// //           discountPercentage: 0,
// //           dosage: data.data.medicine.dosage,
// //           strength: data.data.medicine.strength,
// //           form: data.data.medicine.form,
// //           manufacturer: data.data.medicine.manufacturer,
// //           image: data.data.medicine.image,
// //           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
// //           inStock: data.data.stats?.totalPharmacies > 0,
// //           sideEffects: data.data.medicine.sideEffects || [],
// //           uses: data.data.medicine.uses || [],
// //           precautions: data.data.medicine.precautions || [],
// //           instructions: data.data.medicine.instructions || [],
// //           storageInstructions: data.data.medicine.storageInstructions,
// //           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
// //             _id: pharmacy.pharmacyId,
// //             name: pharmacy.pharmacyName,
// //             city: pharmacy.pharmacyCity,
// //             distance: pharmacy.distance || '2.5 km',
// //             deliveryTime: pharmacy.deliveryTime || '30-45 min',
// //             rating: pharmacy.rating || 4.0,
// //             price: pharmacy.price,
// //             discountedPrice: pharmacy.discountedPrice,
// //             discountPercentage: pharmacy.discountPercentage || 0,
// //             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
// //           })) || [],
// //           stats: data.data.stats
// //         };
        
// //         setMedicine(medicineDetails);
// //         setIsAggregatedView(true);
        
// //         if (data.data.availableAt?.length > 0) {
// //           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
// //         }
        
// //         if (data.data.medicine.category) {
// //           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
// //         }
// //       } else {
// //         setError('Medicine not found in aggregated data');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching aggregated medicine:', err);
// //       setError('Error loading aggregated medicine details');
// //     }
// //   };

// //   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
// //       );
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const filtered = data.data
// //           .filter(med => med._id !== excludeMedicineId)
// //           .map(med => ({
// //             _id: `${pharmacyId}_${med._id}`,
// //             name: med.name,
// //             description: med.description,
// //             price: med.price,
// //             discountedPrice: med.discountedPrice,
// //             discountPercentage: med.discountedPrice && med.price > 0
// //               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
// //               : 0,
// //             image: med.image,
// //             category: med.category,
// //             rating: 4.2
// //           }));
        
// //         setRelatedMedicines(filtered);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching related pharmacy medicines:', err);
// //     }
// //   };

// //   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const filtered = data.data
// //           .filter(med => med.name !== excludeMedicineName)
// //           .map(med => ({
// //             _id: med.name,
// //             name: med.name,
// //             description: med.description,
// //             price: med.lowestPrice || med.price || 0,
// //             discountedPrice: med.lowestDiscountedPrice,
// //             discountPercentage: 0,
// //             image: med.image,
// //             category: med.category,
// //             rating: 4.0
// //           }));
        
// //         setRelatedMedicines(filtered);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching related aggregated medicines:', err);
// //     }
// //   };

// //   // Fix: Related medicines navigation
// //   const nextRelated = () => {
// //     if (relatedMedicines.length <= 2) return;
// //     setCurrentRelatedIndex(prev => 
// //       prev + 2 >= relatedMedicines.length ? 0 : prev + 2
// //     );
// //   };

// //   const prevRelated = () => {
// //     if (relatedMedicines.length <= 2) return;
// //     setCurrentRelatedIndex(prev => 
// //       prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
// //     );
// //   };

// //   const quantityInCart = medicine ? 
// //     cart.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
// //     : 0;

// //   const removeFromCart = () => {
// //     if (!medicine || !selectedPharmacy) return;
// //     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
// //     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    
// //     // Show success modal for removal
// //     setSuccessMessage(`${medicine.name} removed from cart`);
// //     setShowSuccessModal(true);
// //   };

// //   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
// //   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

// //   const toggleFavorite = () => {
// //     // Direct check from localStorage
// //     const token = localStorage.getItem('token');
// //     const userStr = localStorage.getItem('user');
    
// //     if (!token || !userStr) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Please login to add to wishlist' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Parse user data
// //     let user = null;
// //     try {
// //       user = JSON.parse(userStr);
// //     } catch (error) {
// //       console.error('Error parsing user data:', error);
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Session expired. Please login again.' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Check if pharmacy user
// //     if (user && user.role === 'pharmacy') {
// //       setSuccessMessage('Pharmacy accounts cannot add to wishlist. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }
    
// //     if (!medicine) return;
// //     setIsFavorite(!isFavorite);
    
// //     // Show success modal for wishlist
// //     setSuccessMessage(!isFavorite 
// //       ? 'Added to wishlist' 
// //       : 'Removed from wishlist'
// //     );
// //     setShowSuccessModal(true);
// //   };

// //   const calculateFinalPrice = () => {
// //     if (!medicine) return 0;
// //     if (medicine.discountedPrice) return medicine.discountedPrice;
// //     if (medicine.discountPercentage > 0) {
// //       return medicine.price * (1 - medicine.discountPercentage / 100);
// //     }
// //     return medicine.price;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="max-w-6xl mx-auto px-4 py-8">
// //           <div className="animate-pulse">
// //             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
// //             <div className="grid lg:grid-cols-3 gap-8">
// //               <div className="lg:col-span-2 space-y-6">
// //                 <div className="h-96 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-64 bg-gray-200 rounded-xl"></div>
// //               </div>
// //               <div className="space-y-6">
// //                 <div className="h-32 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-48 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-24 bg-gray-200 rounded-xl"></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !medicine) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
// //           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
// //             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
// //           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
// //           <button 
// //             onClick={() => navigate(-1)}
// //             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
// //           >
// //             <FaArrowLeft className="mr-2" />
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const finalPrice = calculateFinalPrice();
// //   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
// //   const availablePharmacies = medicine.availableAtPharmacies || [];
// //   const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Modals */}
// //       {showEmptyCartModal && <EmptyCartModal />}
// //       {showCallPharmacyModal && <CallPharmacyModal />}
// //       {showLinkCopiedModal && <LinkCopiedModal />}
// //       {showSuccessModal && <SuccessModal />}
// //       {showPharmacyErrorModal && <PharmacyErrorModal />}

// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-6xl mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
// //             >
// //               <FaArrowLeft className="mr-2" />
// //               Back
// //             </button>
            
// //             <div className="flex items-center space-x-4">
// //               <button 
// //                 onClick={toggleFavorite}
// //                 className="p-2 text-gray-600 hover:text-red-500 transition-colors"
// //               >
// //                 <FaHeart className={isFavorite ? "text-red-500 fill-red-500" : ""} />
// //               </button>
// //               <button 
// //                 onClick={handleShare}
// //                 className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
// //               >
// //                 <FaShareAlt />
// //               </button>
// //               <button
// //                 onClick={handleCheckout}
// //                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
// //                   cart.length === 0 
// //                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// //                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
// //                 }`}
// //               >
// //                 <FaShoppingCart className="mr-2" />
// //                 Checkout ({cart.length})
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-6xl mx-auto px-4 py-6">
// //         {/* Breadcrumb */}
// //         <div className="flex items-center text-sm text-gray-600 mb-6">
// //           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
// //           <FaChevronRight className="mx-2" size={10} />
// //           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
// //           <FaChevronRight className="mx-2" size={10} />
// //           <span className="font-medium text-gray-900">{medicine.name}</span>
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-6">
// //           {/* Left Column - Product Info */}
// //           <div className="lg:col-span-2">
// //             {/* Product Card */}
// //             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
// //               <div className="grid md:grid-cols-2 gap-8">
// //                 {/* Product Image */}
// //                 <div className="flex flex-col">
// //                   <div className="relative">
// //                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64 overflow-hidden">
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <img
// //                           src={medicine.image}
// //                           alt={medicine.name}
// //                           className="max-h-52 max-w-full object-contain"
// //                           onError={(e) => {
// //                             e.target.onerror = null;
// //                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
// //                           }}
// //                         />
// //                         {/* Fix: Save % badge on top-left of image */}
// //                         {isDiscounted && (
// //                           <div className="absolute top-0 left-0">
// //                             <span className="bg-red-500 text-white px-3 py-1 rounded-br-lg rounded-tl-xl text-sm font-bold shadow-md">
// //                               Save {medicine.discountPercentage}%
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {/* Pharmacy tag */}
// //                     <div className="mt-4">
// //                       <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
// //                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Product Details */}
// //                 <div>
// //                   <div className="mb-4">
// //                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
// //                     {medicine.genericName && (
// //                       <p className="text-gray-600">
// //                         <span className="font-medium">Generic:</span> {medicine.genericName}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* Price Section */}
// //                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
// //                     <div className="flex items-end mb-2">
// //                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
// //                         Rs. {finalPrice.toFixed(2)}
// //                       </span>
// //                       {isDiscounted && medicine.price > finalPrice && (
// //                         <span className="ml-3 text-lg text-gray-500 line-through">
// //                           Rs. {medicine.price.toFixed(2)}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
// //                   </div>

// //                   {/* Key Features */}
// //                   <div className="grid grid-cols-2 gap-3 mb-6">
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Form</div>
// //                         <div className="font-medium">{medicine.form}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Manufacturer</div>
// //                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaPills className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Strength</div>
// //                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Prescription</div>
// //                         <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
// //                           {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Stock Status */}
// //                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
// //                     <div className="flex items-center">
// //                       {medicine.inStock ? (
// //                         <>
// //                           <FaCheckCircle className="text-green-500 mr-3" />
// //                           <div>
// //                             <div className="font-medium text-green-700">In Stock</div>
// //                             <div className="text-sm text-green-600">Available for delivery</div>
// //                           </div>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <FaExclamationTriangle className="text-red-500 mr-3" />
// //                           <div>
// //                             <div className="font-medium text-red-700">Out of Stock</div>
// //                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
// //                           </div>
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Tabs Section */}
// //             <div className="bg-white rounded-xl shadow-md mb-6">
// //               {/* Tab Navigation */}
// //               <div className="border-b">
// //                 <div className="flex overflow-x-auto">
// //                   {[
// //                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
// //                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
// //                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
// //                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
// //                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
// //                   ].map((tab) => (
// //                     <button
// //                       key={tab.id}
// //                       onClick={() => setActiveSection(tab.id)}
// //                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
// //                         activeSection === tab.id
// //                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
// //                           : 'border-transparent text-gray-500 hover:text-gray-700'
// //                       }`}
// //                     >
// //                       <span className="mr-2">{tab.icon}</span>
// //                       {tab.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Tab Content */}
// //               <div className="p-6 max-h-[400px] overflow-y-auto">
// //                 {activeSection === 'overview' && (
// //                   <div className="space-y-6">
// //                     <div>
// //                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
// //                       <p className="text-gray-700 leading-relaxed">
// //                         {medicine.detailedDescription || medicine.description}
// //                       </p>
// //                     </div>
// //                     {medicine.storageInstructions && (
// //                       <div className="bg-blue-50 p-4 rounded-lg">
// //                         <div className="flex items-start">
// //                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
// //                           <div>
// //                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
// //                             <p className="text-gray-700">{medicine.storageInstructions}</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'uses' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
// //                     {medicine.uses && medicine.uses.length > 0 ? (
// //                       <ul className="space-y-3">
// //                         {medicine.uses.map((use, index) => (
// //                           <li key={index} className="flex items-start">
// //                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
// //                             <span className="text-gray-700">{use}</span>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific uses listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'sideEffects' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
// //                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
// //                       <div className="bg-yellow-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.sideEffects.map((effect, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{effect}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific side effects listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'precautions' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
// //                     {medicine.precautions && medicine.precautions.length > 0 ? (
// //                       <div className="bg-red-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.precautions.map((precaution, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{precaution}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific precautions listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'instructions' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
// //                     {medicine.instructions && medicine.instructions.length > 0 ? (
// //                       <div className="bg-green-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.instructions.map((instruction, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{instruction}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-700">Take as directed by your physician.</p>
// //                     )}
// //                     <div className="mt-6">
// //                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
// //                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Related Medicines - Fixed with arrows */}
// //             {relatedMedicines.length > 0 && (
// //               <div className="bg-white rounded-xl shadow-md p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
// //                   <div className="flex items-center space-x-2">
// //                     <button 
// //                       onClick={prevRelated}
// //                       disabled={relatedMedicines.length <= 2}
// //                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       <FaChevronLeft />
// //                     </button>
// //                     <button 
// //                       onClick={nextRelated}
// //                       disabled={relatedMedicines.length <= 2}
// //                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       <FaChevronRight />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   {visibleRelatedMedicines.map(relatedMed => (
// //                     <Link
// //                       key={relatedMed._id}
// //                       to={`/medicine/${relatedMed._id}`}
// //                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
// //                     >
// //                       <div className="flex">
// //                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
// //                           <img
// //                             src={relatedMed.image}
// //                             alt={relatedMed.name}
// //                             className="max-h-16 max-w-16 object-contain"
// //                           />
// //                         </div>
// //                         <div className="flex-1">
// //                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
// //                             {relatedMed.name}
// //                           </h3>
// //                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
// //                           <div className="flex items-center justify-between">
// //                             <div>
// //                               <span className="font-bold text-[var(--secondary-color)]">
// //                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
// //                               </span>
// //                               {relatedMed.discountedPrice && (
// //                                 <span className="ml-2 text-sm text-gray-500 line-through">
// //                                   Rs.{relatedMed.price}
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </Link>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Column - Action Panel */}
// //           <div className="lg:col-span-1">
// //             <div className="sticky top-6 space-y-6">
// //               {/* Pharmacy Selection */}
// //               {isAggregatedView && availablePharmacies.length > 0 && (
// //                 <div className="bg-white rounded-xl shadow-md p-5">
// //                   <div className="flex items-center mb-4">
// //                     <FaStore className="text-[var(--primary-color)] mr-2" />
// //                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
// //                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
// //                   </div>
// //                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
// //                     {availablePharmacies.map(pharmacy => (
// //                       <button
// //                         key={pharmacy._id}
// //                         onClick={() => setSelectedPharmacy(pharmacy)}
// //                         className={`w-full text-left p-4 rounded-lg border transition-all ${
// //                           selectedPharmacy?._id === pharmacy._id
// //                             ? 'border-[var(--primary-color)] bg-blue-50'
// //                             : 'border-gray-200 hover:border-gray-300'
// //                         }`}
// //                       >
// //                         <div className="flex justify-between items-start mb-2">
// //                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
// //                           <div className="flex items-center">
// //                             {[1, 2, 3, 4, 5].map((star) => (
// //                               <span 
// //                                 key={star} 
// //                                 className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
// //                               >
// //                                 ★
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <div className="flex items-center text-sm text-gray-600">
// //                             <FaMapMarkerAlt className="mr-2" />
// //                             {pharmacy.city} • {pharmacy.distance}
// //                           </div>
// //                           <div className="flex items-center text-sm text-gray-600">
// //                             <FaClock className="mr-2" />
// //                             {/*Dynamic delivery time from backend */}
// //                             {pharmacy.deliveryTime}
// //                           </div>
// //                           <div className="flex items-center justify-between mt-3">
// //                             <div className="flex items-center">
// //                               <FaTag className="text-green-500 mr-2" />
// //                               <span className="font-bold text-[var(--secondary-color)]">
// //                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
// //                               </span>
// //                               {pharmacy.discountPercentage > 0 && (
// //                                 <span className="ml-2 text-sm text-red-500">
// //                                   ({pharmacy.discountPercentage}% OFF)
// //                                 </span>
// //                               )}
// //                             </div>
// //                             {selectedPharmacy?._id === pharmacy._id && (
// //                               <FaCheckCircle className="text-green-500" />
// //                             )}
// //                           </div>
// //                         </div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Order Summary */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
// //                 {/* Quantity Selector */}
// //                 <div className="mb-6">
// //                   <div className="flex items-center justify-between mb-3">
// //                     <span className="text-gray-700">Quantity</span>
// //                     <span className="text-sm text-gray-500">Max: 10 units</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <button
// //                       onClick={decrementQuantity}
// //                       disabled={quantity <= 1}
// //                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                     >
// //                       <FaMinus />
// //                     </button>
// //                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
// //                       {quantity}
// //                     </div>
// //                     <button
// //                       onClick={incrementQuantity}
// //                       disabled={quantity >= 10}
// //                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                     >
// //                       <FaPlus />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Price Breakdown */}
// //                 <div className="space-y-3 mb-6">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Price ({quantity} units)</span>
// //                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Delivery</span>
// //                     <span className="text-green-600 font-medium">FREE</span>
// //                   </div>
// //                   {medicine.discountPercentage > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Discount</span>
// //                       <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
// //                     </div>
// //                   )}
// //                   <div className="border-t pt-3">
// //                     <div className="flex justify-between font-bold text-lg">
// //                       <span>Total Amount</span>
// //                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="space-y-3">
// //                   {quantityInCart > 0 ? (
// //                     <div className="space-y-3">
// //                       <button
// //                         onClick={addToCart}
// //                         className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
// //                           medicine.inStock && (!isAggregatedView || selectedPharmacy)
// //                             ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// //                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                         }`}
// //                         disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
// //                       >
// //                         <FaShoppingCart className="mr-2" />
// //                         Add More to Cart
// //                       </button>
// //                       <div className="text-center text-sm text-gray-600">
// //                         Already {quantityInCart} in cart
// //                       </div>
// //                       <button
// //                         onClick={removeFromCart}
// //                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
// //                       >
// //                         <FaTrash className="mr-2" />
// //                         Remove from Cart
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <button
// //                       onClick={addToCart}
// //                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy) || isPharmacyUser}
// //                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
// //                         medicine.inStock && (!isAggregatedView || selectedPharmacy) && !isPharmacyUser
// //                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// //                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                       }`}
// //                     >
// //                       {isPharmacyUser ? (
// //                         <>
// //                           <FaBan className="mr-2" />
// //                           Not Allowed
// //                         </>
// //                       ) : medicine.inStock ? (
// //                         (isAggregatedView && !selectedPharmacy ? (
// //                           <>
// //                             <FaStore className="mr-2" />
// //                             Select Pharmacy
// //                           </>
// //                         ) : (
// //                           <>
// //                             <FaShoppingCart className="mr-2" />
// //                             Add to Cart
// //                           </>
// //                         ))
// //                       ) : (
// //                         <>
// //                           <FaBan className="mr-2" />
// //                           Out of Stock
// //                         </>
// //                       )}
// //                     </button>
// //                   )}
                  
// //                   {medicine.prescriptionRequired && (
// //                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                       <div className="flex items-start">
// //                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
// //                         <p className="text-sm text-yellow-800">
// //                           This medicine requires a valid prescription. Upload prescription during checkout.
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Delivery Info */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <div className="flex items-center mb-4">
// //                   <FaTruck className="text-[var(--primary-color)] mr-2" />
// //                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
// //                 </div>
// //                 <div className="space-y-3">
// //                   <div className="flex items-center">
// //                     <FaClock className="text-gray-400 mr-3" />
// //                     <div>
// //                       <div className="font-medium">Delivery Time</div>
// //                       {/*Dynamic delivery time */}
// //                       <div className="text-sm text-gray-600">
// //                         {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Need Help */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <div className="flex items-center mb-4">
// //                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
// //                   <h3 className="font-bold text-gray-900">Need Help?</h3>
// //                 </div>
// //                 <p className="text-gray-600 text-sm mb-4">
// //                   Our pharmacists are available 24/7 to answer your questions.
// //                 </p>
// //                 <button 
// //                   onClick={handleCallPharmacy}
// //                   className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
// //                 >
// //                   <FaPhoneAlt className="mr-2" />
// //                   Call Pharmacy
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Safety Footer */}
// //         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
// //           <div className="flex flex-col md:flex-row items-center justify-between">
// //             <div className="flex items-center mb-4 md:mb-0">
// //               <FaShieldAlt className="text-white text-2xl mr-4" />
// //               <div>
// //                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
// //                 <p className="text-white/90 text-sm">Your health is our priority</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center space-x-6">
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">10K+</div>
// //                 <div className="text-white/80 text-sm">Happy Customers</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">24/7</div>
// //                 <div className="text-white/80 text-sm">Pharmacy Support</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">100%</div>
// //                 <div className="text-white/80 text-sm">Authentic Medicines</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MedicineDetail;














// //------------------Cart Persistence check-------------------//
// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { 
// //   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
// //   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
// //   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
// //   FaTruck, FaCheckCircle, FaShoppingBag,
// //   FaMinus, FaPlus, FaTrash, FaHeart, FaShareAlt,
// //   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
// //   FaChevronRight, FaChevronLeft, FaTimes, FaExclamationCircle,
// //   FaCheck, FaInfo, FaBan
// // } from 'react-icons/fa';

// // const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
  
// //   const [medicine, setMedicine] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [activeSection, setActiveSection] = useState('overview');
// //   const [relatedMedicines, setRelatedMedicines] = useState([]);
// //   const [isAggregatedView, setIsAggregatedView] = useState(false);
// //   const [pharmacyId, setPharmacyId] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// //   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  
// //   // Modal states
// //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [currentUser, setCurrentUser] = useState(null);

// //   // Get user-specific cart key
// //   const getUserCartKey = (userId) => {
// //     return userId ? `medicineCart_${userId}` : 'medicineCart';
// //   };

// //   // Get user-specific orders key
// //   const getUserOrdersKey = (userId) => {
// //     return userId ? `medicineOrders_${userId}` : 'medicineOrders';
// //   };

// //   // Get current user from localStorage
// //   const getCurrentUser = () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       if (userStr) {
// //         const user = JSON.parse(userStr);
// //         return user;
// //       }
// //     } catch (error) {
// //       console.error('Error getting user:', error);
// //     }
// //     return null;
// //   };

// //   // Check login status from localStorage - same as pharmacy dashboard
// //   useEffect(() => {
// //     const checkAuth = () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const userStr = localStorage.getItem('user');
        
// //         if (token && userStr) {
// //           const user = JSON.parse(userStr);
// //           setIsLoggedIn(true);
// //           setCurrentUser(user);
// //           // Check if user is pharmacy (same logic as pharmacy dashboard)
// //           setIsPharmacyUser(user.role === 'pharmacy');
// //         } else {
// //           setIsLoggedIn(false);
// //           setCurrentUser(null);
// //           setIsPharmacyUser(false);
// //         }
// //       } catch (error) {
// //         console.error('Error checking auth:', error);
// //         setIsLoggedIn(false);
// //         setCurrentUser(null);
// //         setIsPharmacyUser(false);
// //       }
// //     };

// //     checkAuth();

// //     // Listen for storage changes
// //     const handleStorageChange = () => {
// //       checkAuth();
// //     };

// //     window.addEventListener('storage', handleStorageChange);
    
// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //     };
// //   }, []);

// //   // Fix: Checkout button logic - show modal instead of alert
// //   const handleCheckout = () => {
// //     if (cart.length === 0) {
// //       setShowEmptyCartModal(true);
// //       return;
// //     }
    
// //     if (!isLoggedIn) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: '/booking',
// //           message: 'Please login to proceed to checkout' 
// //         } 
// //       });
// //       return;
// //     }
    
// //     // Check if pharmacy user trying to checkout
// //     if (isPharmacyUser) {
// //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }
    
// //     navigate('/booking');
// //   };

// //   // Fix: Add to cart button logic - prevent adding without login and check pharmacy role
// //   const addToCart = () => {
// //     // Direct check from localStorage (same as pharmacy dashboard)
// //     const token = localStorage.getItem('token');
// //     const userStr = localStorage.getItem('user');
    
// //     if (!token || !userStr) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Please login to add items to cart' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Parse user data
// //     let user = null;
// //     try {
// //       user = JSON.parse(userStr);
// //       setCurrentUser(user);
// //     } catch (error) {
// //       console.error('Error parsing user data:', error);
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Session expired. Please login again.' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Check if pharmacy user (same logic as pharmacy dashboard)
// //     if (user && user.role === 'pharmacy') {
// //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }

// //     if (!medicine || !selectedPharmacy) return;
    
// //     const cartItem = {
// //       ...medicine,
// //       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
// //       quantity: quantity,
// //       selectedPharmacy: selectedPharmacy,
// //       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
// //     };
    
// //     setCart(prevCart => {
// //       const existingItem = prevCart.find(item => item.id === cartItem.id);
// //       if (existingItem) {
// //         return prevCart.map(item =>
// //           item.id === cartItem.id
// //             ? { ...item, quantity: item.quantity + quantity }
// //             : item
// //         );
// //       }
// //       return [...prevCart, cartItem];
// //     });
    
// //     // Save to user-specific cart
// //     const userId = user._id || user.id;
// //     if (userId) {
// //       const cartKey = getUserCartKey(userId);
// //       const existingCart = cart || [];
// //       const updatedCart = [...existingCart, cartItem];
// //       localStorage.setItem(cartKey, JSON.stringify(updatedCart));
// //     }
    
// //     // Show success modal
// //     setSuccessMessage(`${quantity} ${medicine.name} added to cart successfully!`);
// //     setShowSuccessModal(true);
// //   };

// //   // Fix: Call Pharmacy button logic - show modal instead of alert
// //   const handleCallPharmacy = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
// //     setShowCallPharmacyModal(true);
// //   };

// //   // Actual call function after confirmation
// //   const confirmCallPharmacy = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
// //     window.location.href = `tel:${phoneNumber}`;
// //     setShowCallPharmacyModal(false);
// //   };

// //   // Share function with modal confirmation
// //   const handleShare = () => {
// //     if (navigator.share) {
// //       navigator.share({
// //         title: medicine?.name,
// //         text: `Check out ${medicine?.name} on Pharmacy App`,
// //         url: window.location.href,
// //       })
// //       .catch(console.error);
// //     } else {
// //       // Fallback: Copy to clipboard
// //       navigator.clipboard.writeText(window.location.href)
// //         .then(() => {
// //           setShowLinkCopiedModal(true);
// //           setTimeout(() => setShowLinkCopiedModal(false), 2000);
// //         })
// //         .catch(console.error);
// //     }
// //   };

// //   // Close all modals
// //   const closeAllModals = () => {
// //     setShowEmptyCartModal(false);
// //     setShowCallPharmacyModal(false);
// //     setShowLinkCopiedModal(false);
// //     setShowSuccessModal(false);
// //     setShowPharmacyErrorModal(false);
// //   };

// //   // Modal components

// // const EmptyCartModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowEmptyCartModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
// //           <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
// //         <p className="text-gray-600 text-center mb-6">
// //           You need to add items to your cart before proceeding to checkout.
// //         </p>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => setShowEmptyCartModal(false)}
// //             className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //           >
// //             Continue Shopping
// //           </button>
// //           <button
// //             onClick={() => {
// //               setShowEmptyCartModal(false);
// //               navigate('/medicines');
// //             }}
// //             className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //           >
// //             Browse Medicines
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const CallPharmacyModal = () => {
// //   const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
  
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div 
// //         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //         onClick={() => setShowCallPharmacyModal(false)}
// //       />
      
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
// //         <div className="p-6">
// //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
// //             <FaPhoneAlt className="w-8 h-8 text-blue-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
// //           <p className="text-gray-600 text-center mb-4">
// //             Do you want to call this pharmacy?
// //           </p>
// //           <div className="bg-blue-50 rounded-lg p-4 mb-6">
// //             <div className="flex items-center justify-center">
// //               <FaPhoneAlt className="text-blue-500 mr-3" />
// //               <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
// //             </div>
// //             <p className="text-sm text-gray-500 text-center mt-2">
// //               {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
// //             </p>
// //           </div>
// //           <div className="flex gap-3">
// //             <button
// //               onClick={() => setShowCallPharmacyModal(false)}
// //               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={confirmCallPharmacy}
// //               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
// //             >
// //               <FaPhoneAlt className="mr-2" />
// //               Call Now
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const LinkCopiedModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowLinkCopiedModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// //           <FaCheck className="w-8 h-8 text-green-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
// //         <p className="text-gray-600 text-center">
// //           Medicine link has been copied to clipboard.
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const SuccessModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowSuccessModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// //           <FaCheck className="w-8 h-8 text-green-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
// //         <p className="text-gray-600 text-center mb-6">
// //           {successMessage}
// //         </p>
// //         <button
// //           onClick={() => setShowSuccessModal(false)}
// //           className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //         >
// //           Continue Shopping
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const PharmacyErrorModal = () => (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //     <div 
// //       className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //       onClick={() => setShowPharmacyErrorModal(false)}
// //     />
    
// //     <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //       <div className="p-6">
// //         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
// //           <FaExclamationTriangle className="w-8 h-8 text-red-500" />
// //         </div>
// //         <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
// //         <p className="text-gray-600 text-center mb-6">
// //           {successMessage}
// //         </p>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => setShowPharmacyErrorModal(false)}
// //             className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //           >
// //             OK
// //           </button>
// //           <button
// //             onClick={() => {
// //               setShowPharmacyErrorModal(false);
// //               navigate('/login');
// //             }}
// //             className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //           >
// //             Switch Account
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// //   useEffect(() => {
// //     const fetchMedicineDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const idParts = id.split('_');
        
// //         if (idParts.length === 2) {
// //           await fetchPharmacyMedicine(idParts[0], idParts[1]);
// //         } else {
// //           await fetchAggregatedMedicine(id);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching medicine:', err);
// //         setError('Error loading medicine details');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (id) {
// //       fetchMedicineDetails();
// //     }
// //   }, [id]);

// //   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
// //       );
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const medicineData = data.data;
// //         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
// //           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
// //           : 0;
        
// //         const medicineDetails = {
// //           _id: medicineId,
// //           id: `${pharmacyId}_${medicineId}`,
// //           name: medicineData.name,
// //           genericName: medicineData.genericName,
// //           description: medicineData.description,
// //           detailedDescription: medicineData.detailedDescription || medicineData.description,
// //           category: medicineData.category,
// //           price: medicineData.price,
// //           discountedPrice: medicineData.discountedPrice,
// //           discountPercentage: discountPercentage,
// //           dosage: medicineData.dosage || 'As prescribed',
// //           strength: medicineData.strength,
// //           form: medicineData.form,
// //           manufacturer: medicineData.manufacturer,
// //           image: medicineData.image,
// //           prescriptionRequired: medicineData.prescriptionRequired || false,
// //           inStock: medicineData.inStock !== false,
// //           sideEffects: medicineData.sideEffects || [],
// //           uses: medicineData.uses || [],
// //           precautions: medicineData.precautions || [],
// //           instructions: medicineData.instructions || [],
// //           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
// //           pharmacyId: pharmacyId,
// //           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
// //           pharmacyAddress: medicineData.pharmacy?.address,
// //           pharmacyCity: medicineData.pharmacy?.city,
// //           pharmacyPhone: medicineData.pharmacy?.phone,
// //           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
// //           pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
// //           availableAtPharmacies: [{
// //             _id: pharmacyId,
// //             name: medicineData.pharmacy?.name || 'Pharmacy',
// //             city: medicineData.pharmacy?.city,
// //             distance: medicineData.pharmacy?.distance || '2.5 km',
// //             deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
// //             rating: medicineData.pharmacy?.rating || 4.2
// //           }]
// //         };
        
// //         setMedicine(medicineDetails);
// //         setPharmacyId(pharmacyId);
// //         setIsAggregatedView(false);
// //         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
// //         if (medicineData.category) {
// //           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
// //         }
// //       } else {
// //         setError(data.message || 'Medicine not found');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching pharmacy medicine:', err);
// //       setError('Error loading medicine details from pharmacy');
// //     }
// //   };

// //   const fetchAggregatedMedicine = async (medicineName) => {
// //     try {
// //       const encodedName = encodeURIComponent(medicineName);
// //       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const medicineDetails = {
// //           _id: medicineName,
// //           id: medicineName,
// //           name: data.data.medicine.name,
// //           genericName: data.data.medicine.genericName,
// //           description: data.data.medicine.description,
// //           detailedDescription: data.data.medicine.detailedDescription,
// //           category: data.data.medicine.category,
// //           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
// //           discountedPrice: data.data.stats?.lowestDiscountedPrice,
// //           discountPercentage: 0,
// //           dosage: data.data.medicine.dosage,
// //           strength: data.data.medicine.strength,
// //           form: data.data.medicine.form,
// //           manufacturer: data.data.medicine.manufacturer,
// //           image: data.data.medicine.image,
// //           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
// //           inStock: data.data.stats?.totalPharmacies > 0,
// //           sideEffects: data.data.medicine.sideEffects || [],
// //           uses: data.data.medicine.uses || [],
// //           precautions: data.data.medicine.precautions || [],
// //           instructions: data.data.medicine.instructions || [],
// //           storageInstructions: data.data.medicine.storageInstructions,
// //           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
// //             _id: pharmacy.pharmacyId,
// //             name: pharmacy.pharmacyName,
// //             city: pharmacy.pharmacyCity,
// //             distance: pharmacy.distance || '2.5 km',
// //             deliveryTime: pharmacy.deliveryTime || '30-45 min',
// //             rating: pharmacy.rating || 4.0,
// //             price: pharmacy.price,
// //             discountedPrice: pharmacy.discountedPrice,
// //             discountPercentage: pharmacy.discountPercentage || 0,
// //             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
// //           })) || [],
// //           stats: data.data.stats
// //         };
        
// //         setMedicine(medicineDetails);
// //         setIsAggregatedView(true);
        
// //         if (data.data.availableAt?.length > 0) {
// //           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
// //         }
        
// //         if (data.data.medicine.category) {
// //           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
// //         }
// //       } else {
// //         setError('Medicine not found in aggregated data');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching aggregated medicine:', err);
// //       setError('Error loading aggregated medicine details');
// //     }
// //   };

// //   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
// //       );
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const filtered = data.data
// //           .filter(med => med._id !== excludeMedicineId)
// //           .map(med => ({
// //             _id: `${pharmacyId}_${med._id}`,
// //             name: med.name,
// //             description: med.description,
// //             price: med.price,
// //             discountedPrice: med.discountedPrice,
// //             discountPercentage: med.discountedPrice && med.price > 0
// //               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
// //               : 0,
// //             image: med.image,
// //             category: med.category,
// //             rating: 4.2
// //           }));
        
// //         setRelatedMedicines(filtered);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching related pharmacy medicines:', err);
// //     }
// //   };

// //   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const filtered = data.data
// //           .filter(med => med.name !== excludeMedicineName)
// //           .map(med => ({
// //             _id: med.name,
// //             name: med.name,
// //             description: med.description,
// //             price: med.lowestPrice || med.price || 0,
// //             discountedPrice: med.lowestDiscountedPrice,
// //             discountPercentage: 0,
// //             image: med.image,
// //             category: med.category,
// //             rating: 4.0
// //           }));
        
// //         setRelatedMedicines(filtered);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching related aggregated medicines:', err);
// //     }
// //   };

// //   // Fix: Related medicines navigation
// //   const nextRelated = () => {
// //     if (relatedMedicines.length <= 2) return;
// //     setCurrentRelatedIndex(prev => 
// //       prev + 2 >= relatedMedicines.length ? 0 : prev + 2
// //     );
// //   };

// //   const prevRelated = () => {
// //     if (relatedMedicines.length <= 2) return;
// //     setCurrentRelatedIndex(prev => 
// //       prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
// //     );
// //   };

// //   const quantityInCart = medicine ? 
// //     cart.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
// //     : 0;

// //   const removeFromCart = () => {
// //     if (!medicine || !selectedPharmacy) return;
// //     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    
// //     // Update state
// //     setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    
// //     // Update user-specific localStorage
// //     const user = getCurrentUser();
// //     if (user) {
// //       const userId = user._id || user.id;
// //       const cartKey = getUserCartKey(userId);
// //       const savedCart = localStorage.getItem(cartKey);
      
// //       if (savedCart) {
// //         try {
// //           let cart = JSON.parse(savedCart);
// //           cart = cart.filter(item => item.id !== itemId);
// //           localStorage.setItem(cartKey, JSON.stringify(cart));
// //         } catch (error) {
// //           console.error('Error updating cart in localStorage:', error);
// //         }
// //       }
// //     }
    
// //     // Show success modal for removal
// //     setSuccessMessage(`${medicine.name} removed from cart`);
// //     setShowSuccessModal(true);
// //   };

// //   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
// //   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

// //   const toggleFavorite = () => {
// //     // Direct check from localStorage
// //     const token = localStorage.getItem('token');
// //     const userStr = localStorage.getItem('user');
    
// //     if (!token || !userStr) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Please login to add to wishlist' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Parse user data
// //     let user = null;
// //     try {
// //       user = JSON.parse(userStr);
// //     } catch (error) {
// //       console.error('Error parsing user data:', error);
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Session expired. Please login again.' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Check if pharmacy user
// //     if (user && user.role === 'pharmacy') {
// //       setSuccessMessage('Pharmacy accounts cannot add to wishlist. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }
    
// //     if (!medicine) return;
// //     setIsFavorite(!isFavorite);
    
// //     // Show success modal for wishlist
// //     setSuccessMessage(!isFavorite 
// //       ? 'Added to wishlist' 
// //       : 'Removed from wishlist'
// //     );
// //     setShowSuccessModal(true);
// //   };

// //   const calculateFinalPrice = () => {
// //     if (!medicine) return 0;
// //     if (medicine.discountedPrice) return medicine.discountedPrice;
// //     if (medicine.discountPercentage > 0) {
// //       return medicine.price * (1 - medicine.discountPercentage / 100);
// //     }
// //     return medicine.price;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="max-w-6xl mx-auto px-4 py-8">
// //           <div className="animate-pulse">
// //             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
// //             <div className="grid lg:grid-cols-3 gap-8">
// //               <div className="lg:col-span-2 space-y-6">
// //                 <div className="h-96 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-64 bg-gray-200 rounded-xl"></div>
// //               </div>
// //               <div className="space-y-6">
// //                 <div className="h-32 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-48 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-24 bg-gray-200 rounded-xl"></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !medicine) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
// //           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
// //             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
// //           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
// //           <button 
// //             onClick={() => navigate(-1)}
// //             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
// //           >
// //             <FaArrowLeft className="mr-2" />
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const finalPrice = calculateFinalPrice();
// //   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
// //   const availablePharmacies = medicine.availableAtPharmacies || [];
// //   const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Modals */}
// //       {showEmptyCartModal && <EmptyCartModal />}
// //       {showCallPharmacyModal && <CallPharmacyModal />}
// //       {showLinkCopiedModal && <LinkCopiedModal />}
// //       {showSuccessModal && <SuccessModal />}
// //       {showPharmacyErrorModal && <PharmacyErrorModal />}

// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-6xl mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
// //             >
// //               <FaArrowLeft className="mr-2" />
// //               Back
// //             </button>
            
// //             <div className="flex items-center space-x-4">
// //               <button 
// //                 onClick={toggleFavorite}
// //                 className="p-2 text-gray-600 hover:text-red-500 transition-colors"
// //               >
// //                 <FaHeart className={isFavorite ? "text-red-500 fill-red-500" : ""} />
// //               </button>
// //               <button 
// //                 onClick={handleShare}
// //                 className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
// //               >
// //                 <FaShareAlt />
// //               </button>
// //               <button
// //                 onClick={handleCheckout}
// //                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
// //                   cart.length === 0 
// //                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// //                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
// //                 }`}
// //               >
// //                 <FaShoppingCart className="mr-2" />
// //                 Checkout ({cart.length})
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-6xl mx-auto px-4 py-6">
// //         {/* Breadcrumb */}
// //         <div className="flex items-center text-sm text-gray-600 mb-6">
// //           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
// //           <FaChevronRight className="mx-2" size={10} />
// //           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
// //           <FaChevronRight className="mx-2" size={10} />
// //           <span className="font-medium text-gray-900">{medicine.name}</span>
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-6">
// //           {/* Left Column - Product Info */}
// //           <div className="lg:col-span-2">
// //             {/* Product Card */}
// //             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
// //               <div className="grid md:grid-cols-2 gap-8">
// //                 {/* Product Image */}
// //                 <div className="flex flex-col">
// //                   <div className="relative">
// //                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64 overflow-hidden">
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <img
// //                           src={medicine.image}
// //                           alt={medicine.name}
// //                           className="max-h-52 max-w-full object-contain"
// //                           onError={(e) => {
// //                             e.target.onerror = null;
// //                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
// //                           }}
// //                         />
// //                         {/* Fix: Save % badge on top-left of image */}
// //                         {isDiscounted && (
// //                           <div className="absolute top-0 left-0">
// //                             <span className="bg-red-500 text-white px-3 py-1 rounded-br-lg rounded-tl-xl text-sm font-bold shadow-md">
// //                               Save {medicine.discountPercentage}%
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {/* Pharmacy tag */}
// //                     <div className="mt-4">
// //                       <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
// //                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Product Details */}
// //                 <div>
// //                   <div className="mb-4">
// //                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
// //                     {medicine.genericName && (
// //                       <p className="text-gray-600">
// //                         <span className="font-medium">Generic:</span> {medicine.genericName}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* Price Section */}
// //                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
// //                     <div className="flex items-end mb-2">
// //                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
// //                         Rs. {finalPrice.toFixed(2)}
// //                       </span>
// //                       {isDiscounted && medicine.price > finalPrice && (
// //                         <span className="ml-3 text-lg text-gray-500 line-through">
// //                           Rs. {medicine.price.toFixed(2)}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
// //                   </div>

// //                   {/* Key Features */}
// //                   <div className="grid grid-cols-2 gap-3 mb-6">
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Form</div>
// //                         <div className="font-medium">{medicine.form}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Manufacturer</div>
// //                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaPills className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Strength</div>
// //                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaPrescriptionBottle className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Prescription</div>
// //                         <div className={`font-medium ${medicine.prescriptionRequired ? 'text-red-600' : 'text-green-600'}`}>
// //                           {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Stock Status */}
// //                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
// //                     <div className="flex items-center">
// //                       {medicine.inStock ? (
// //                         <>
// //                           <FaCheckCircle className="text-green-500 mr-3" />
// //                           <div>
// //                             <div className="font-medium text-green-700">In Stock</div>
// //                             <div className="text-sm text-green-600">Available for delivery</div>
// //                           </div>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <FaExclamationTriangle className="text-red-500 mr-3" />
// //                           <div>
// //                             <div className="font-medium text-red-700">Out of Stock</div>
// //                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
// //                           </div>
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Tabs Section */}
// //             <div className="bg-white rounded-xl shadow-md mb-6">
// //               {/* Tab Navigation */}
// //               <div className="border-b">
// //                 <div className="flex overflow-x-auto">
// //                   {[
// //                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
// //                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
// //                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
// //                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
// //                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
// //                   ].map((tab) => (
// //                     <button
// //                       key={tab.id}
// //                       onClick={() => setActiveSection(tab.id)}
// //                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
// //                         activeSection === tab.id
// //                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
// //                           : 'border-transparent text-gray-500 hover:text-gray-700'
// //                       }`}
// //                     >
// //                       <span className="mr-2">{tab.icon}</span>
// //                       {tab.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Tab Content */}
// //               <div className="p-6 max-h-[400px] overflow-y-auto">
// //                 {activeSection === 'overview' && (
// //                   <div className="space-y-6">
// //                     <div>
// //                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
// //                       <p className="text-gray-700 leading-relaxed">
// //                         {medicine.detailedDescription || medicine.description}
// //                       </p>
// //                     </div>
// //                     {medicine.storageInstructions && (
// //                       <div className="bg-blue-50 p-4 rounded-lg">
// //                         <div className="flex items-start">
// //                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
// //                           <div>
// //                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
// //                             <p className="text-gray-700">{medicine.storageInstructions}</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'uses' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
// //                     {medicine.uses && medicine.uses.length > 0 ? (
// //                       <ul className="space-y-3">
// //                         {medicine.uses.map((use, index) => (
// //                           <li key={index} className="flex items-start">
// //                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
// //                             <span className="text-gray-700">{use}</span>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific uses listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'sideEffects' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
// //                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
// //                       <div className="bg-yellow-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.sideEffects.map((effect, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{effect}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific side effects listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'precautions' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
// //                     {medicine.precautions && medicine.precautions.length > 0 ? (
// //                       <div className="bg-red-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.precautions.map((precaution, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{precaution}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific precautions listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'instructions' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
// //                     {medicine.instructions && medicine.instructions.length > 0 ? (
// //                       <div className="bg-green-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.instructions.map((instruction, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{instruction}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-700">Take as directed by your physician.</p>
// //                     )}
// //                     <div className="mt-6">
// //                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
// //                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Related Medicines - Fixed with arrows */}
// //             {relatedMedicines.length > 0 && (
// //               <div className="bg-white rounded-xl shadow-md p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
// //                   <div className="flex items-center space-x-2">
// //                     <button 
// //                       onClick={prevRelated}
// //                       disabled={relatedMedicines.length <= 2}
// //                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       <FaChevronLeft />
// //                     </button>
// //                     <button 
// //                       onClick={nextRelated}
// //                       disabled={relatedMedicines.length <= 2}
// //                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       <FaChevronRight />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   {visibleRelatedMedicines.map(relatedMed => (
// //                     <Link
// //                       key={relatedMed._id}
// //                       to={`/medicine/${relatedMed._id}`}
// //                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
// //                     >
// //                       <div className="flex">
// //                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
// //                           <img
// //                             src={relatedMed.image}
// //                             alt={relatedMed.name}
// //                             className="max-h-16 max-w-16 object-contain"
// //                           />
// //                         </div>
// //                         <div className="flex-1">
// //                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
// //                             {relatedMed.name}
// //                           </h3>
// //                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
// //                           <div className="flex items-center justify-between">
// //                             <div>
// //                               <span className="font-bold text-[var(--secondary-color)]">
// //                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
// //                               </span>
// //                               {relatedMed.discountedPrice && (
// //                                 <span className="ml-2 text-sm text-gray-500 line-through">
// //                                   Rs.{relatedMed.price}
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </Link>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Column - Action Panel */}
// //           <div className="lg:col-span-1">
// //             <div className="sticky top-6 space-y-6">
// //               {/* Pharmacy Selection */}
// //               {isAggregatedView && availablePharmacies.length > 0 && (
// //                 <div className="bg-white rounded-xl shadow-md p-5">
// //                   <div className="flex items-center mb-4">
// //                     <FaStore className="text-[var(--primary-color)] mr-2" />
// //                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
// //                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
// //                   </div>
// //                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
// //                     {availablePharmacies.map(pharmacy => (
// //                       <button
// //                         key={pharmacy._id}
// //                         onClick={() => setSelectedPharmacy(pharmacy)}
// //                         className={`w-full text-left p-4 rounded-lg border transition-all ${
// //                           selectedPharmacy?._id === pharmacy._id
// //                             ? 'border-[var(--primary-color)] bg-blue-50'
// //                             : 'border-gray-200 hover:border-gray-300'
// //                         }`}
// //                       >
// //                         <div className="flex justify-between items-start mb-2">
// //                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
// //                           <div className="flex items-center">
// //                             {[1, 2, 3, 4, 5].map((star) => (
// //                               <span 
// //                                 key={star} 
// //                                 className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
// //                               >
// //                                 ★
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <div className="flex items-center text-sm text-gray-600">
// //                             <FaMapMarkerAlt className="mr-2" />
// //                             {pharmacy.city} • {pharmacy.distance}
// //                           </div>
// //                           <div className="flex items-center text-sm text-gray-600">
// //                             <FaClock className="mr-2" />
// //                             {/*Dynamic delivery time from backend */}
// //                             {pharmacy.deliveryTime}
// //                           </div>
// //                           <div className="flex items-center justify-between mt-3">
// //                             <div className="flex items-center">
// //                               <FaTag className="text-green-500 mr-2" />
// //                               <span className="font-bold text-[var(--secondary-color)]">
// //                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
// //                               </span>
// //                               {pharmacy.discountPercentage > 0 && (
// //                                 <span className="ml-2 text-sm text-red-500">
// //                                   ({pharmacy.discountPercentage}% OFF)
// //                                 </span>
// //                               )}
// //                             </div>
// //                             {selectedPharmacy?._id === pharmacy._id && (
// //                               <FaCheckCircle className="text-green-500" />
// //                             )}
// //                           </div>
// //                         </div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Order Summary */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
// //                 {/* Quantity Selector */}
// //                 <div className="mb-6">
// //                   <div className="flex items-center justify-between mb-3">
// //                     <span className="text-gray-700">Quantity</span>
// //                     <span className="text-sm text-gray-500">Max: 10 units</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <button
// //                       onClick={decrementQuantity}
// //                       disabled={quantity <= 1}
// //                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                     >
// //                       <FaMinus />
// //                     </button>
// //                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
// //                       {quantity}
// //                     </div>
// //                     <button
// //                       onClick={incrementQuantity}
// //                       disabled={quantity >= 10}
// //                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                     >
// //                       <FaPlus />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Price Breakdown */}
// //                 <div className="space-y-3 mb-6">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Price ({quantity} units)</span>
// //                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Delivery</span>
// //                     <span className="text-green-600 font-medium">FREE</span>
// //                   </div>
// //                   {medicine.discountPercentage > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Discount</span>
// //                       <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
// //                     </div>
// //                   )}
// //                   <div className="border-t pt-3">
// //                     <div className="flex justify-between font-bold text-lg">
// //                       <span>Total Amount</span>
// //                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="space-y-3">
// //                   {quantityInCart > 0 ? (
// //                     <div className="space-y-3">
// //                       <button
// //                         onClick={addToCart}
// //                         className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
// //                           medicine.inStock && (!isAggregatedView || selectedPharmacy)
// //                             ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// //                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                         }`}
// //                         disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
// //                       >
// //                         <FaShoppingCart className="mr-2" />
// //                         Add More to Cart
// //                       </button>
// //                       <div className="text-center text-sm text-gray-600">
// //                         Already {quantityInCart} in cart
// //                       </div>
// //                       <button
// //                         onClick={removeFromCart}
// //                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
// //                       >
// //                         <FaTrash className="mr-2" />
// //                         Remove from Cart
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <button
// //                       onClick={addToCart}
// //                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy) || isPharmacyUser}
// //                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
// //                         medicine.inStock && (!isAggregatedView || selectedPharmacy) && !isPharmacyUser
// //                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// //                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                       }`}
// //                     >
// //                       {isPharmacyUser ? (
// //                         <>
// //                           <FaBan className="mr-2" />
// //                           Not Allowed
// //                         </>
// //                       ) : medicine.inStock ? (
// //                         (isAggregatedView && !selectedPharmacy ? (
// //                           <>
// //                             <FaStore className="mr-2" />
// //                             Select Pharmacy
// //                           </>
// //                         ) : (
// //                           <>
// //                             <FaShoppingCart className="mr-2" />
// //                             Add to Cart
// //                           </>
// //                         ))
// //                       ) : (
// //                         <>
// //                           <FaBan className="mr-2" />
// //                           Out of Stock
// //                         </>
// //                       )}
// //                     </button>
// //                   )}
                  
// //                   {medicine.prescriptionRequired && (
// //                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                       <div className="flex items-start">
// //                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
// //                         <p className="text-sm text-yellow-800">
// //                           This medicine requires a valid prescription. Upload prescription during checkout.
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Delivery Info */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <div className="flex items-center mb-4">
// //                   <FaTruck className="text-[var(--primary-color)] mr-2" />
// //                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
// //                 </div>
// //                 <div className="space-y-3">
// //                   <div className="flex items-center">
// //                     <FaClock className="text-gray-400 mr-3" />
// //                     <div>
// //                       <div className="font-medium">Delivery Time</div>
// //                       {/*Dynamic delivery time */}
// //                       <div className="text-sm text-gray-600">
// //                         {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Need Help */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <div className="flex items-center mb-4">
// //                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
// //                   <h3 className="font-bold text-gray-900">Need Help?</h3>
// //                 </div>
// //                 <p className="text-gray-600 text-sm mb-4">
// //                   Our pharmacists are available 24/7 to answer your questions.
// //                 </p>
// //                 <button 
// //                   onClick={handleCallPharmacy}
// //                   className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
// //                 >
// //                   <FaPhoneAlt className="mr-2" />
// //                   Call Pharmacy
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Safety Footer */}
// //         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
// //           <div className="flex flex-col md:flex-row items-center justify-between">
// //             <div className="flex items-center mb-4 md:mb-0">
// //               <FaShieldAlt className="text-white text-2xl mr-4" />
// //               <div>
// //                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
// //                 <p className="text-white/90 text-sm">Your health is our priority</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center space-x-6">
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">10K+</div>
// //                 <div className="text-white/80 text-sm">Happy Customers</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">24/7</div>
// //                 <div className="text-white/80 text-sm">Pharmacy Support</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">100%</div>
// //                 <div className="text-white/80 text-sm">Authentic Medicines</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MedicineDetail;

















// //--------------works perfect with all prescription restrictions and wishlist
// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { 
// //   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
// //   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
// //   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
// //   FaTruck, FaCheckCircle, FaShoppingBag,
// //   FaMinus, FaPlus, FaTrash, FaShareAlt,
// //   FaPrescriptionBottle, FaTemperatureLow, FaUserMd,
// //   FaChevronRight, FaChevronLeft, FaTimes, FaExclamationCircle,
// //   FaCheck, FaInfo, FaBan
// // } from 'react-icons/fa';

// // const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
  
// //   const [medicine, setMedicine] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [activeSection, setActiveSection] = useState('overview');
// //   const [relatedMedicines, setRelatedMedicines] = useState([]);
// //   const [isAggregatedView, setIsAggregatedView] = useState(false);
// //   const [pharmacyId, setPharmacyId] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// //   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [isInitialized, setIsInitialized] = useState(false);
  
// //   // Modal states
// //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');

// //   // ================================
// //   // AUTH EVENT HANDLERS (ADD THESE)
// //   // ================================
// //   const handleLoginSuccess = (userData) => {
// //     // User data save karein localStorage mein
// //     localStorage.setItem('user', JSON.stringify(userData));
// //     localStorage.setItem('token', userData.token);
    
// //     // Event trigger karein taaki sab components update ho jaayein
// //     window.dispatchEvent(new CustomEvent('userChanged'));
    
// //     // Redirect karein
// //     navigate('/');
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('user');
// //     localStorage.removeItem('token');
    
// //     // Event trigger karein
// //     window.dispatchEvent(new CustomEvent('userChanged'));
    
// //     navigate('/login');
// //   };
// //   // ================================

// //   // Get user-specific cart key
// //   const getUserCartKey = () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       if (userStr) {
// //         const user = JSON.parse(userStr);
// //         return user._id || user.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
// //       }
// //     } catch (error) {
// //       console.error('Error getting user cart key:', error);
// //     }
// //     return 'medicineCart_guest';
// //   };

// //   // Get current user
// //   const getCurrentUser = () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       if (userStr) {
// //         return JSON.parse(userStr);
// //       }
// //     } catch (error) {
// //       console.error('Error getting user:', error);
// //     }
// //     return null;
// //   };

// //   // Load cart from localStorage
// //   const loadUserCart = () => {
// //     try {
// //       const user = getCurrentUser();
// //       const cartKey = getUserCartKey();
// //       const savedCart = localStorage.getItem(cartKey);
// //       if (savedCart) {
// //         return JSON.parse(savedCart);
// //       }
// //     } catch (error) {
// //       console.error('Error loading cart:', error);
// //     }
// //     return [];
// //   };

// //   // Save cart to localStorage
// //   const saveUserCart = (cart) => {
// //     try {
// //       const cartKey = getUserCartKey();
// //       if (cart && cart.length > 0) {
// //         localStorage.setItem(cartKey, JSON.stringify(cart));
// //       } else {
// //         localStorage.removeItem(cartKey);
// //       }
      
// //       // Dispatch cart update event
// //       window.dispatchEvent(new CustomEvent('cartUpdated', {
// //         detail: { cart }
// //       }));
// //     } catch (error) {
// //       console.error('Error saving cart:', error);
// //     }
// //   };

// //   // Initialize cart and auth state
// //   useEffect(() => {
// //     const initializeCart = () => {
// //       try {
// //         // Check login status
// //         const user = getCurrentUser();
        
// //         if (user) {
// //           setIsLoggedIn(true);
// //           setIsPharmacyUser(user.role === 'pharmacy');
          
// //           // Load user-specific cart
// //           const loadedCart = loadUserCart();
// //           setCartItems(loadedCart);
// //           if (setCart) {
// //             setCart(loadedCart);
// //           }
// //         } else {
// //           setIsLoggedIn(false);
// //           setIsPharmacyUser(false);
// //           setCartItems([]);
// //           if (setCart) {
// //             setCart([]);
// //           }
// //         }
        
// //         setIsInitialized(true);
// //       } catch (error) {
// //         console.error('Error initializing cart:', error);
// //         setIsLoggedIn(false);
// //         setIsPharmacyUser(false);
// //         setCartItems([]);
// //         if (setCart) {
// //           setCart([]);
// //         }
// //         setIsInitialized(true);
// //       }
// //     };

// //     initializeCart();

// //     // Listen for auth changes
// //     const handleAuthChange = () => {
// //       initializeCart();
// //     };

// //     // Listen for cart updates
// //     const handleCartUpdate = (e) => {
// //       const loadedCart = loadUserCart();
// //       setCartItems(loadedCart);
// //       if (setCart) {
// //         setCart(loadedCart);
// //       }
// //     };

// //     window.addEventListener('userChanged', handleAuthChange);
// //     window.addEventListener('cartUpdated', handleCartUpdate);
    
// //     return () => {
// //       window.removeEventListener('userChanged', handleAuthChange);
// //       window.removeEventListener('cartUpdated', handleCartUpdate);
// //     };
// //   }, [setCart]);

// //   // Checkout button logic
// //   const handleCheckout = () => {
// //     if (cartItems.length === 0) {
// //       setShowEmptyCartModal(true);
// //       return;
// //     }
    
// //     if (!isLoggedIn) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: '/booking',
// //           message: 'Please login to proceed to checkout' 
// //         } 
// //       });
// //       return;
// //     }
    
// //     if (isPharmacyUser) {
// //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }
    
// //     navigate('/booking');
// //   };

// //   // Add to cart button logic
// //   const addToCart = () => {
// //     // Direct check from localStorage
// //     const user = getCurrentUser();
    
// //     if (!user) {
// //       navigate('/login', { 
// //         state: { 
// //           redirectTo: `/medicine/${id}`,
// //           message: 'Please login to add items to cart' 
// //         } 
// //       });
// //       return;
// //     }

// //     // Check if pharmacy user
// //     if (user && user.role === 'pharmacy') {
// //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }

// //     if (!medicine || !selectedPharmacy) return;
    
// //     const cartItem = {
// //       ...medicine,
// //       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
// //       quantity: quantity,
// //       selectedPharmacy: selectedPharmacy,
// //       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name
// //     };
    
// //     // Load current cart
// //     let currentCart = loadUserCart();
    
// //     // Check if item already exists
// //     const existingIndex = currentCart.findIndex(item => item.id === cartItem.id);
    
// //     if (existingIndex > -1) {
// //       // Update quantity if item exists
// //       currentCart[existingIndex].quantity = (currentCart[existingIndex].quantity || 1) + quantity;
// //     } else {
// //       // Add new item
// //       currentCart.push(cartItem);
// //     }
    
// //     // Save updated cart
// //     saveUserCart(currentCart);
    
// //     // Update state
// //     setCartItems(currentCart);
// //     if (setCart) {
// //       setCart(currentCart);
// //     }
    
// //     // Show success modal
// //     setSuccessMessage(`${quantity} ${medicine.name} added to cart successfully!`);
// //     setShowSuccessModal(true);
// //   };

// //   // Call Pharmacy button logic
// //   const handleCallPharmacy = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
// //     setShowCallPharmacyModal(true);
// //   };

// //   // Actual call function after confirmation
// //   const confirmCallPharmacy = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
// //     window.location.href = `tel:${phoneNumber}`;
// //     setShowCallPharmacyModal(false);
// //   };

// //   // Share function with modal confirmation
// //   const handleShare = () => {
// //     if (navigator.share) {
// //       navigator.share({
// //         title: medicine?.name,
// //         text: `Check out ${medicine?.name} on Pharmacy App`,
// //         url: window.location.href,
// //       })
// //       .catch(console.error);
// //     } else {
// //       // Fallback: Copy to clipboard
// //       navigator.clipboard.writeText(window.location.href)
// //         .then(() => {
// //           setShowLinkCopiedModal(true);
// //           setTimeout(() => setShowLinkCopiedModal(false), 2000);
// //         })
// //         .catch(console.error);
// //     }
// //   };

// //   // Close all modals
// //   const closeAllModals = () => {
// //     setShowEmptyCartModal(false);
// //     setShowCallPharmacyModal(false);
// //     setShowLinkCopiedModal(false);
// //     setShowSuccessModal(false);
// //     setShowPharmacyErrorModal(false);
// //   };

// //   // Modal components
// //   const EmptyCartModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div 
// //         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //         onClick={() => setShowEmptyCartModal(false)}
// //       />
      
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
// //         <div className="p-6">
// //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
// //             <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
// //           <p className="text-gray-600 text-center mb-6">
// //             You need to add items to your cart before proceeding to checkout.
// //           </p>
// //           <div className="flex gap-3">
// //             <button
// //               onClick={() => setShowEmptyCartModal(false)}
// //               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //             >
// //               Continue Shopping
// //             </button>
// //             <button
// //               onClick={() => {
// //                 setShowEmptyCartModal(false);
// //                 navigate('/medicines');
// //               }}
// //               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //             >
// //               Browse Medicines
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const CallPharmacyModal = () => {
// //     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    
// //     return (
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //         <div 
// //           className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //           onClick={() => setShowCallPharmacyModal(false)}
// //         />
        
// //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
// //           <div className="p-6">
// //             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
// //               <FaPhoneAlt className="w-8 h-8 text-blue-500" />
// //             </div>
// //             <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
// //             <p className="text-gray-600 text-center mb-4">
// //               Do you want to call this pharmacy?
// //             </p>
// //             <div className="bg-blue-50 rounded-lg p-4 mb-6">
// //               <div className="flex items-center justify-center">
// //                 <FaPhoneAlt className="text-blue-500 mr-3" />
// //                 <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
// //               </div>
// //               <p className="text-sm text-gray-500 text-center mt-2">
// //                 {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
// //               </p>
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => setShowCallPharmacyModal(false)}
// //                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={confirmCallPharmacy}
// //                 className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
// //               >
// //                 <FaPhoneAlt className="mr-2" />
// //                 Call Now
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const LinkCopiedModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div 
// //         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //         onClick={() => setShowLinkCopiedModal(false)}
// //       />
      
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //         <div className="p-6">
// //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// //             <FaCheck className="w-8 h-8 text-green-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
// //           <p className="text-gray-600 text-center">
// //             Medicine link has been copied to clipboard.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const SuccessModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div 
// //         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //         onClick={() => setShowSuccessModal(false)}
// //       />
      
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //         <div className="p-6">
// //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// //             <FaCheck className="w-8 h-8 text-green-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
// //           <p className="text-gray-600 text-center mb-6">
// //             {successMessage}
// //           </p>
// //           <button
// //             onClick={() => setShowSuccessModal(false)}
// //             className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //           >
// //             Continue Shopping
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const PharmacyErrorModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div 
// //         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
// //         onClick={() => setShowPharmacyErrorModal(false)}
// //       />
      
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100">
// //         <div className="p-6">
// //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
// //             <FaExclamationTriangle className="w-8 h-8 text-red-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
// //           <p className="text-gray-600 text-center mb-6">
// //             {successMessage}
// //           </p>
// //           <div className="flex gap-3">
// //             <button
// //               onClick={() => setShowPharmacyErrorModal(false)}
// //               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //             >
// //               OK
// //             </button>
// //             <button
// //               onClick={() => {
// //                 setShowPharmacyErrorModal(false);
// //                 navigate('/login');
// //               }}
// //               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
// //             >
// //               Switch Account
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   useEffect(() => {
// //     const fetchMedicineDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const idParts = id.split('_');
        
// //         if (idParts.length === 2) {
// //           await fetchPharmacyMedicine(idParts[0], idParts[1]);
// //         } else {
// //           await fetchAggregatedMedicine(id);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching medicine:', err);
// //         setError('Error loading medicine details');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (id) {
// //       fetchMedicineDetails();
// //     }
// //   }, [id]);

// //   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
// //       );
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const medicineData = data.data;
// //         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
// //           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
// //           : 0;
        
// //         const medicineDetails = {
// //           _id: medicineId,
// //           id: `${pharmacyId}_${medicineId}`,
// //           name: medicineData.name,
// //           genericName: medicineData.genericName,
// //           description: medicineData.description,
// //           detailedDescription: medicineData.detailedDescription || medicineData.description,
// //           category: medicineData.category,
// //           price: medicineData.price,
// //           discountedPrice: medicineData.discountedPrice,
// //           discountPercentage: discountPercentage,
// //           dosage: medicineData.dosage || 'As prescribed',
// //           strength: medicineData.strength,
// //           form: medicineData.form,
// //           manufacturer: medicineData.manufacturer,
// //           image: medicineData.image,
// //           prescriptionRequired: medicineData.prescriptionRequired || false,
// //           inStock: medicineData.inStock !== false,
// //           sideEffects: medicineData.sideEffects || [],
// //           uses: medicineData.uses || [],
// //           precautions: medicineData.precautions || [],
// //           instructions: medicineData.instructions || [],
// //           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
// //           pharmacyId: pharmacyId,
// //           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
// //           pharmacyAddress: medicineData.pharmacy?.address,
// //           pharmacyCity: medicineData.pharmacy?.city,
// //           pharmacyPhone: medicineData.pharmacy?.phone,
// //           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
// //           pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
// //           availableAtPharmacies: [{
// //             _id: pharmacyId,
// //             name: medicineData.pharmacy?.name || 'Pharmacy',
// //             city: medicineData.pharmacy?.city,
// //             distance: medicineData.pharmacy?.distance || '2.5 km',
// //             deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
// //             rating: medicineData.pharmacy?.rating || 4.2
// //           }]
// //         };
        
// //         setMedicine(medicineDetails);
// //         setPharmacyId(pharmacyId);
// //         setIsAggregatedView(false);
// //         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
// //         if (medicineData.category) {
// //           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
// //         }
// //       } else {
// //         setError(data.message || 'Medicine not found');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching pharmacy medicine:', err);
// //       setError('Error loading medicine details from pharmacy');
// //     }
// //   };

// //   const fetchAggregatedMedicine = async (medicineName) => {
// //     try {
// //       const encodedName = encodeURIComponent(medicineName);
// //       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const medicineDetails = {
// //           _id: medicineName,
// //           id: medicineName,
// //           name: data.data.medicine.name,
// //           genericName: data.data.medicine.genericName,
// //           description: data.data.medicine.description,
// //           detailedDescription: data.data.medicine.detailedDescription,
// //           category: data.data.medicine.category,
// //           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
// //           discountedPrice: data.data.stats?.lowestDiscountedPrice,
// //           discountPercentage: 0,
// //           dosage: data.data.medicine.dosage,
// //           strength: data.data.medicine.strength,
// //           form: data.data.medicine.form,
// //           manufacturer: data.data.medicine.manufacturer,
// //           image: data.data.medicine.image,
// //           prescriptionRequired: data.data.medicine.prescriptionRequired || false,
// //           inStock: data.data.stats?.totalPharmacies > 0,
// //           sideEffects: data.data.medicine.sideEffects || [],
// //           uses: data.data.medicine.uses || [],
// //           precautions: data.data.medicine.precautions || [],
// //           instructions: data.data.medicine.instructions || [],
// //           storageInstructions: data.data.medicine.storageInstructions,
// //           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
// //             _id: pharmacy.pharmacyId,
// //             name: pharmacy.pharmacyName,
// //             city: pharmacy.pharmacyCity,
// //             distance: pharmacy.distance || '2.5 km',
// //             deliveryTime: pharmacy.deliveryTime || '30-45 min',
// //             rating: pharmacy.rating || 4.0,
// //             price: pharmacy.price,
// //             discountedPrice: pharmacy.discountedPrice,
// //             discountPercentage: pharmacy.discountPercentage || 0,
// //             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
// //           })) || [],
// //           stats: data.data.stats
// //         };
        
// //         setMedicine(medicineDetails);
// //         setIsAggregatedView(true);
        
// //         if (data.data.availableAt?.length > 0) {
// //           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
// //         }
        
// //         if (data.data.medicine.category) {
// //           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
// //         }
// //       } else {
// //         setError('Medicine not found in aggregated data');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching aggregated medicine:', err);
// //       setError('Error loading aggregated medicine details');
// //     }
// //   };

// //   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
// //       );
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const filtered = data.data
// //           .filter(med => med._id !== excludeMedicineId)
// //           .map(med => ({
// //             _id: `${pharmacyId}_${med._id}`,
// //             name: med.name,
// //             description: med.description,
// //             price: med.price,
// //             discountedPrice: med.discountedPrice,
// //             discountPercentage: med.discountedPrice && med.price > 0
// //               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
// //               : 0,
// //             image: med.image,
// //             category: med.category,
// //             rating: 4.2
// //           }));
        
// //         setRelatedMedicines(filtered);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching related pharmacy medicines:', err);
// //     }
// //   };

// //   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
// //       const data = await response.json();
      
// //       if (data.success) {
// //         const filtered = data.data
// //           .filter(med => med.name !== excludeMedicineName)
// //           .map(med => ({
// //             _id: med.name,
// //             name: med.name,
// //             description: med.description,
// //             price: med.lowestPrice || med.price || 0,
// //             discountedPrice: med.lowestDiscountedPrice,
// //             discountPercentage: 0,
// //             image: med.image,
// //             category: med.category,
// //             rating: 4.0
// //           }));
        
// //         setRelatedMedicines(filtered);
// //       }
// //     } catch (err) {
// //       console.error('Error fetching related aggregated medicines:', err);
// //     }
// //   };

// //   // Related medicines navigation
// //   const nextRelated = () => {
// //     if (relatedMedicines.length <= 2) return;
// //     setCurrentRelatedIndex(prev => 
// //       prev + 2 >= relatedMedicines.length ? 0 : prev + 2
// //     );
// //   };

// //   const prevRelated = () => {
// //     if (relatedMedicines.length <= 2) return;
// //     setCurrentRelatedIndex(prev => 
// //       prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
// //     );
// //   };

// //   const quantityInCart = medicine ? 
// //     cartItems.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
// //     : 0;

// //   const removeFromCart = () => {
// //     if (!medicine || !selectedPharmacy) return;
// //     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    
// //     // Load current cart
// //     let currentCart = loadUserCart();
    
// //     // Remove item
// //     currentCart = currentCart.filter(item => item.id !== itemId);
    
// //     // Save updated cart
// //     saveUserCart(currentCart);
    
// //     // Update state
// //     setCartItems(currentCart);
// //     if (setCart) {
// //       setCart(currentCart);
// //     }
    
// //     // Show success modal for removal
// //     setSuccessMessage(`${medicine.name} removed from cart`);
// //     setShowSuccessModal(true);
// //   };

// //   const incrementQuantity = () => quantity < 10 && setQuantity(prev => prev + 1);
// //   const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

// //   // const toggleFavorite = () => {
// //   //   // Direct check from localStorage
// //   //   const user = getCurrentUser();
    
// //   //   if (!user) {
// //   //     navigate('/login', { 
// //   //       state: { 
// //   //         redirectTo: `/medicine/${id}`,
// //   //         message: 'Please login to add to wishlist' 
// //   //       } 
// //   //     });
// //   //     return;
// //   //   }

// //     // Check if pharmacy user
// //   //   if (user && user.role === 'pharmacy') {
// //   //     setSuccessMessage('Pharmacy accounts cannot add to wishlist. Please use a regular customer account.');
// //   //     setShowPharmacyErrorModal(true);
// //   //     return;
// //   //   }
    
// //   //   if (!medicine) return;
// //   //   setIsFavorite(!isFavorite);
    
// //   //   // Show success modal for wishlist
// //   //   setSuccessMessage(!isFavorite 
// //   //     ? 'Added to wishlist' 
// //   //     : 'Removed from wishlist'
// //   //   );
// //   //   setShowSuccessModal(true);
// //   // };

// //   const calculateFinalPrice = () => {
// //     if (!medicine) return 0;
// //     if (medicine.discountedPrice) return medicine.discountedPrice;
// //     if (medicine.discountPercentage > 0) {
// //       return medicine.price * (1 - medicine.discountPercentage / 100);
// //     }
// //     return medicine.price;
// //   };

// //   if (!isInitialized) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="max-w-6xl mx-auto px-4 py-8">
// //           <div className="animate-pulse">
// //             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
// //             <div className="grid lg:grid-cols-3 gap-8">
// //               <div className="lg:col-span-2 space-y-6">
// //                 <div className="h-96 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-64 bg-gray-200 rounded-xl"></div>
// //               </div>
// //               <div className="space-y-6">
// //                 <div className="h-32 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-48 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-24 bg-gray-200 rounded-xl"></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <div className="max-w-6xl mx-auto px-4 py-8">
// //           <div className="animate-pulse">
// //             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
// //             <div className="grid lg:grid-cols-3 gap-8">
// //               <div className="lg:col-span-2 space-y-6">
// //                 <div className="h-96 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-64 bg-gray-200 rounded-xl"></div>
// //               </div>
// //               <div className="space-y-6">
// //                 <div className="h-32 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-48 bg-gray-200 rounded-xl"></div>
// //                 <div className="h-24 bg-gray-200 rounded-xl"></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !medicine) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
// //           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
// //             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
// //           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
// //           <button 
// //             onClick={() => navigate(-1)}
// //             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
// //           >
// //             <FaArrowLeft className="mr-2" />
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const finalPrice = calculateFinalPrice();
// //   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
// //   const availablePharmacies = medicine.availableAtPharmacies || [];
// //   const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Modals */}
// //       {showEmptyCartModal && <EmptyCartModal />}
// //       {showCallPharmacyModal && <CallPharmacyModal />}
// //       {showLinkCopiedModal && <LinkCopiedModal />}
// //       {showSuccessModal && <SuccessModal />}
// //       {showPharmacyErrorModal && <PharmacyErrorModal />}

// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-6xl mx-auto px-4 py-4">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
// //             >
// //               <FaArrowLeft className="mr-2" />
// //               Back
// //             </button>
            
// //             <div className="flex items-center space-x-4">
// //               <button 
// //                 onClick={handleShare}
// //                 className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
// //               >
// //                 <FaShareAlt />
// //               </button>
// //               <button
// //                 onClick={handleCheckout}
// //                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
// //                   cartItems.length === 0 
// //                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// //                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
// //                 }`}
// //               >
// //                 <FaShoppingCart className="mr-2" />
// //                 Checkout ({cartItems.length})
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-6xl mx-auto px-4 py-6">
// //         {/* Breadcrumb */}
// //         <div className="flex items-center text-sm text-gray-600 mb-6">
// //           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
// //           <FaChevronRight className="mx-2" size={10} />
// //           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
// //           <FaChevronRight className="mx-2" size={10} />
// //           <span className="font-medium text-gray-900">{medicine.name}</span>
// //         </div>

// //         <div className="grid lg:grid-cols-3 gap-6">
// //           {/* Left Column - Product Info */}
// //           <div className="lg:col-span-2">
// //             {/* Product Card */}
// //             <div className="bg-white rounded-xl shadow-md p-6 mb-6">
// //               <div className="grid md:grid-cols-2 gap-8">
// //                 {/* Product Image */}
// //                 <div className="flex flex-col">
// //                   <div className="relative">
// //                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-64 overflow-hidden">
// //                       <div className="w-full h-full flex items-center justify-center">
// //                         <img
// //                           src={medicine.image}
// //                           alt={medicine.name}
// //                           className="max-h-52 max-w-full object-contain"
// //                           onError={(e) => {
// //                             e.target.onerror = null;
// //                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
// //                           }}
// //                         />
// //                         {/* Fix: Save % badge on top-left of image */}
// //                         {isDiscounted && (
// //                           <div className="absolute top-0 left-0">
// //                             <span className="bg-red-500 text-white px-3 py-1 rounded-br-lg rounded-tl-xl text-sm font-bold shadow-md">
// //                               Save {medicine.discountPercentage}%
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {/* Pharmacy tag */}
// //                     <div className="mt-4">
// //                       <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
// //                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Product Details */}
// //                 <div>
// //                   <div className="mb-4">
// //                     <h1 className="text-2xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
// //                     {medicine.genericName && (
// //                       <p className="text-gray-600">
// //                         <span className="font-medium">Generic:</span> {medicine.genericName}
// //                       </p>
// //                     )}
// //                   </div>

// //                   {/* Price Section */}
// //                   <div className="mb-6 p-4 bg-blue-50 rounded-lg">
// //                     <div className="flex items-end mb-2">
// //                       <span className="text-3xl font-bold text-[var(--secondary-color)]">
// //                         Rs. {finalPrice.toFixed(2)}
// //                       </span>
// //                       {isDiscounted && medicine.price > finalPrice && (
// //                         <span className="ml-3 text-lg text-gray-500 line-through">
// //                           Rs. {medicine.price.toFixed(2)}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-600">Inclusive of all taxes</p>
// //                   </div>

// //                   {/* Key Features */}
// //                   <div className="grid grid-cols-2 gap-3 mb-6">
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaCapsules className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Form</div>
// //                         <div className="font-medium">{medicine.form}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaIndustry className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Manufacturer</div>
// //                         <div className="font-medium">{medicine.manufacturer || 'Not specified'}</div>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center p-3 bg-gray-50 rounded-lg">
// //                       <FaPills className="text-[var(--primary-color)] mr-3" />
// //                       <div>
// //                         <div className="text-sm text-gray-600">Strength</div>
// //                         <div className="font-medium">{medicine.strength || 'Not specified'}</div>
// //                       </div>
// //                     </div>
                    
// //                   </div>

// //                   {/* Stock Status */}
// //                   <div className={`mb-6 p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
// //                     <div className="flex items-center">
// //                       {medicine.inStock ? (
// //                         <>
// //                           <FaCheckCircle className="text-green-500 mr-3" />
// //                           <div>
// //                             <div className="font-medium text-green-700">In Stock</div>
// //                             <div className="text-sm text-green-600">Available for delivery</div>
// //                           </div>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <FaExclamationTriangle className="text-red-500 mr-3" />
// //                           <div>
// //                             <div className="font-medium text-red-700">Out of Stock</div>
// //                             <div className="text-sm text-red-600">Check nearby pharmacies</div>
// //                           </div>
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Tabs Section */}
// //             <div className="bg-white rounded-xl shadow-md mb-6">
// //               {/* Tab Navigation */}
// //               <div className="border-b">
// //                 <div className="flex overflow-x-auto">
// //                   {[
// //                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
// //                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
// //                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
// //                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
// //                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
// //                   ].map((tab) => (
// //                     <button
// //                       key={tab.id}
// //                       onClick={() => setActiveSection(tab.id)}
// //                       className={`flex items-center px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
// //                         activeSection === tab.id
// //                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
// //                           : 'border-transparent text-gray-500 hover:text-gray-700'
// //                       }`}
// //                     >
// //                       <span className="mr-2">{tab.icon}</span>
// //                       {tab.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Tab Content */}
// //               <div className="p-6 max-h-[400px] overflow-y-auto">
// //                 {activeSection === 'overview' && (
// //                   <div className="space-y-6">
// //                     <div>
// //                       <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
// //                       <p className="text-gray-700 leading-relaxed">
// //                         {medicine.detailedDescription || medicine.description}
// //                       </p>
// //                     </div>
// //                     {medicine.storageInstructions && (
// //                       <div className="bg-blue-50 p-4 rounded-lg">
// //                         <div className="flex items-start">
// //                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3" />
// //                           <div>
// //                             <h4 className="font-bold text-gray-900 mb-1">Storage Instructions</h4>
// //                             <p className="text-gray-700">{medicine.storageInstructions}</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'uses' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Therapeutic Uses</h3>
// //                     {medicine.uses && medicine.uses.length > 0 ? (
// //                       <ul className="space-y-3">
// //                         {medicine.uses.map((use, index) => (
// //                           <li key={index} className="flex items-start">
// //                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
// //                             <span className="text-gray-700">{use}</span>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific uses listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'sideEffects' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Possible Side Effects</h3>
// //                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
// //                       <div className="bg-yellow-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.sideEffects.map((effect, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{effect}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific side effects listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'precautions' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Safety Precautions</h3>
// //                     {medicine.precautions && medicine.precautions.length > 0 ? (
// //                       <div className="bg-red-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.precautions.map((precaution, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{precaution}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-500 italic">No specific precautions listed.</p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeSection === 'instructions' && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-gray-900">Usage Instructions</h3>
// //                     {medicine.instructions && medicine.instructions.length > 0 ? (
// //                       <div className="bg-green-50 p-4 rounded-lg">
// //                         <ul className="space-y-3">
// //                           {medicine.instructions.map((instruction, index) => (
// //                             <li key={index} className="flex items-start">
// //                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
// //                               <span className="text-gray-700">{instruction}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     ) : (
// //                       <p className="text-gray-700">Take as directed by your physician.</p>
// //                     )}
// //                     <div className="mt-6">
// //                       <h4 className="font-bold text-gray-900 mb-2">Dosage</h4>
// //                       <p className="text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Related Medicines - Fixed with arrows */}
// //             {relatedMedicines.length > 0 && (
// //               <div className="bg-white rounded-xl shadow-md p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
// //                   <div className="flex items-center space-x-2">
// //                     <button 
// //                       onClick={prevRelated}
// //                       disabled={relatedMedicines.length <= 2}
// //                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       <FaChevronLeft />
// //                     </button>
// //                     <button 
// //                       onClick={nextRelated}
// //                       disabled={relatedMedicines.length <= 2}
// //                       className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       <FaChevronRight />
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   {visibleRelatedMedicines.map(relatedMed => (
// //                     <Link
// //                       key={relatedMed._id}
// //                       to={`/medicine/${relatedMed._id}`}
// //                       className="group border border-gray-200 rounded-lg p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
// //                     >
// //                       <div className="flex">
// //                         <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
// //                           <img
// //                             src={relatedMed.image}
// //                             alt={relatedMed.name}
// //                             className="max-h-16 max-w-16 object-contain"
// //                           />
// //                         </div>
// //                         <div className="flex-1">
// //                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 line-clamp-1">
// //                             {relatedMed.name}
// //                           </h3>
// //                           <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
// //                           <div className="flex items-center justify-between">
// //                             <div>
// //                               <span className="font-bold text-[var(--secondary-color)]">
// //                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
// //                               </span>
// //                               {relatedMed.discountedPrice && (
// //                                 <span className="ml-2 text-sm text-gray-500 line-through">
// //                                   Rs.{relatedMed.price}
// //                                 </span>
// //                               )}
// //                             </div>
// //                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)]" />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </Link>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Column - Action Panel */}
// //           <div className="lg:col-span-1">
// //             <div className="sticky top-6 space-y-6">
// //               {/* Pharmacy Selection */}
// //               {isAggregatedView && availablePharmacies.length > 0 && (
// //                 <div className="bg-white rounded-xl shadow-md p-5">
// //                   <div className="flex items-center mb-4">
// //                     <FaStore className="text-[var(--primary-color)] mr-2" />
// //                     <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
// //                     <span className="ml-auto text-sm text-gray-600">{availablePharmacies.length} options</span>
// //                   </div>
// //                   <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
// //                     {availablePharmacies.map(pharmacy => (
// //                       <button
// //                         key={pharmacy._id}
// //                         onClick={() => setSelectedPharmacy(pharmacy)}
// //                         className={`w-full text-left p-4 rounded-lg border transition-all ${
// //                           selectedPharmacy?._id === pharmacy._id
// //                             ? 'border-[var(--primary-color)] bg-blue-50'
// //                             : 'border-gray-200 hover:border-gray-300'
// //                         }`}
// //                       >
// //                         <div className="flex justify-between items-start mb-2">
// //                           <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
// //                           <div className="flex items-center">
// //                             {[1, 2, 3, 4, 5].map((star) => (
// //                               <span 
// //                                 key={star} 
// //                                 className={star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}
// //                               >
// //                                 ★
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <div className="flex items-center text-sm text-gray-600">
// //                             <FaMapMarkerAlt className="mr-2" />
// //                             {pharmacy.city} • {pharmacy.distance}
// //                           </div>
// //                           <div className="flex items-center text-sm text-gray-600">
// //                             <FaClock className="mr-2" />
// //                             {/*Dynamic delivery time from backend */}
// //                             {pharmacy.deliveryTime}
// //                           </div>
// //                           <div className="flex items-center justify-between mt-3">
// //                             <div className="flex items-center">
// //                               <FaTag className="text-green-500 mr-2" />
// //                               <span className="font-bold text-[var(--secondary-color)]">
// //                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
// //                               </span>
// //                               {pharmacy.discountPercentage > 0 && (
// //                                 <span className="ml-2 text-sm text-red-500">
// //                                   ({pharmacy.discountPercentage}% OFF)
// //                                 </span>
// //                               )}
// //                             </div>
// //                             {selectedPharmacy?._id === pharmacy._id && (
// //                               <FaCheckCircle className="text-green-500" />
// //                             )}
// //                           </div>
// //                         </div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Order Summary */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                
// //                 {/* Quantity Selector */}
// //                 <div className="mb-6">
// //                   <div className="flex items-center justify-between mb-3">
// //                     <span className="text-gray-700">Quantity</span>
// //                     <span className="text-sm text-gray-500">Max: 10 units</span>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <button
// //                       onClick={decrementQuantity}
// //                       disabled={quantity <= 1}
// //                       className="w-12 h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                     >
// //                       <FaMinus />
// //                     </button>
// //                     <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-lg">
// //                       {quantity}
// //                     </div>
// //                     <button
// //                       onClick={incrementQuantity}
// //                       disabled={quantity >= 10}
// //                       className="w-12 h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                     >
// //                       <FaPlus />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Price Breakdown */}
// //                 <div className="space-y-3 mb-6">
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Price ({quantity} units)</span>
// //                     <span className="font-medium">Rs. {(finalPrice * quantity).toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span className="text-gray-600">Delivery</span>
// //                     <span className="text-green-600 font-medium">FREE</span>
// //                   </div>
// //                   {medicine.discountPercentage > 0 && (
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Discount</span>
// //                       <span className="text-red-600 font-medium">-Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}</span>
// //                     </div>
// //                   )}
// //                   <div className="border-t pt-3">
// //                     <div className="flex justify-between font-bold text-lg">
// //                       <span>Total Amount</span>
// //                       <span className="text-[var(--secondary-color)]">Rs. {(finalPrice * quantity).toFixed(2)}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="space-y-3">
// //                   {quantityInCart > 0 ? (
// //                     <div className="space-y-3">
// //                       <button
// //                         onClick={addToCart}
// //                         className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
// //                           medicine.inStock && (!isAggregatedView || selectedPharmacy)
// //                             ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// //                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                         }`}
// //                         disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
// //                       >
// //                         <FaShoppingCart className="mr-2" />
// //                         Add More to Cart
// //                       </button>
// //                       <div className="text-center text-sm text-gray-600">
// //                         Already {quantityInCart} in cart
// //                       </div>
// //                       <button
// //                         onClick={removeFromCart}
// //                         className="w-full py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
// //                       >
// //                         <FaTrash className="mr-2" />
// //                         Remove from Cart
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <button
// //                       onClick={addToCart}
// //                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy) || isPharmacyUser}
// //                       className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
// //                         medicine.inStock && (!isAggregatedView || selectedPharmacy) && !isPharmacyUser
// //                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// //                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //                       }`}
// //                     >
// //                       {isPharmacyUser ? (
// //                         <>
// //                           <FaBan className="mr-2" />
// //                           Not Allowed
// //                         </>
// //                       ) : medicine.inStock ? (
// //                         (isAggregatedView && !selectedPharmacy ? (
// //                           <>
// //                             <FaStore className="mr-2" />
// //                             Select Pharmacy
// //                           </>
// //                         ) : (
// //                           <>
// //                             <FaShoppingCart className="mr-2" />
// //                             Add to Cart
// //                           </>
// //                         ))
// //                       ) : (
// //                         <>
// //                           <FaBan className="mr-2" />
// //                           Out of Stock
// //                         </>
// //                       )}
// //                     </button>
// //                   )}
                  
// //                   {medicine.prescriptionRequired && (
// //                     <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                       <div className="flex items-start">
// //                         <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
// //                         <p className="text-sm text-yellow-800">
// //                           This medicine requires a valid prescription. Upload prescription during checkout.
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Delivery Info */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <div className="flex items-center mb-4">
// //                   <FaTruck className="text-[var(--primary-color)] mr-2" />
// //                   <h3 className="font-bold text-gray-900">Delivery Information</h3>
// //                 </div>
// //                 <div className="space-y-3">
// //                   <div className="flex items-center">
// //                     <FaClock className="text-gray-400 mr-3" />
// //                     <div>
// //                       <div className="font-medium">Delivery Time</div>
// //                       {/*Dynamic delivery time */}
// //                       <div className="text-sm text-gray-600">
// //                         {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Need Help */}
// //               <div className="bg-white rounded-xl shadow-md p-5">
// //                 <div className="flex items-center mb-4">
// //                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
// //                   <h3 className="font-bold text-gray-900">Need Help?</h3>
// //                 </div>
// //                 <p className="text-gray-600 text-sm mb-4">
// //                   Our pharmacists are available 24/7 to answer your questions.
// //                 </p>
// //                 <button 
// //                   onClick={handleCallPharmacy}
// //                   className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors"
// //                 >
// //                   <FaPhoneAlt className="mr-2" />
// //                   Call Pharmacy
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Safety Footer */}
// //         <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-6">
// //           <div className="flex flex-col md:flex-row items-center justify-between">
// //             <div className="flex items-center mb-4 md:mb-0">
// //               <FaShieldAlt className="text-white text-2xl mr-4" />
// //               <div>
// //                 <h3 className="text-white font-bold text-lg">100% Safe & Secure</h3>
// //                 <p className="text-white/90 text-sm">Your health is our priority</p>
// //               </div>
// //             </div>
// //             <div className="flex items-center space-x-6">
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">10K+</div>
// //                 <div className="text-white/80 text-sm">Happy Customers</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">24/7</div>
// //                 <div className="text-white/80 text-sm">Pharmacy Support</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-white font-bold text-xl">100%</div>
// //                 <div className="text-white/80 text-sm">Authentic Medicines</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MedicineDetail;



























// // predvription removes
// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { 
//   FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
//   FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
//   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
//   FaTruck, FaCheckCircle,
//   FaMinus, FaPlus, FaTrash, FaShareAlt,
//   FaTemperatureLow, FaUserMd,
//   FaChevronRight, FaChevronLeft, FaExclamationCircle,
//   FaCheck, FaBan, FaBox, FaBoxes, FaFlask
// } from 'react-icons/fa';

// const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState('overview');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [tabletQuantity, setTabletQuantity] = useState(1);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
//   const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [quantityType, setQuantityType] = useState('unit'); // 'unit' or 'tablet'
  
//   // Medicine form types
//   const isTabletForm = (form) => {
//     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
//     return form && tabletForms.some(t => form.toLowerCase().includes(t));
//   };

//   const isLiquidForm = (form) => {
//     const liquidForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
//     return form && liquidForms.some(l => form.toLowerCase().includes(l));
//   };

//   // Modal states
//   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
//   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
//   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

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
//   const getUserCartKey = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         return user._id || user.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
//       }
//     } catch (error) {
//       console.error('Error getting user cart key:', error);
//     }
//     return 'medicineCart_guest';
//   };

//   // Get current user
//   const getCurrentUser = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         return JSON.parse(userStr);
//       }
//     } catch (error) {
//       console.error('Error getting user:', error);
//     }
//     return null;
//   };

//   // Load cart from localStorage
//   const loadUserCart = () => {
//     try {
//       const user = getCurrentUser();
//       const cartKey = getUserCartKey();
//       const savedCart = localStorage.getItem(cartKey);
//       if (savedCart) {
//         return JSON.parse(savedCart);
//       }
//     } catch (error) {
//       console.error('Error loading cart:', error);
//     }
//     return [];
//   };

//   // Save cart to localStorage
//   const saveUserCart = (cart) => {
//     try {
//       const cartKey = getUserCartKey();
//       if (cart && cart.length > 0) {
//         localStorage.setItem(cartKey, JSON.stringify(cart));
//       } else {
//         localStorage.removeItem(cartKey);
//       }
      
//       window.dispatchEvent(new CustomEvent('cartUpdated', {
//         detail: { cart }
//       }));
//     } catch (error) {
//       console.error('Error saving cart:', error);
//     }
//   };

//   // Initialize cart and auth state
//   useEffect(() => {
//     const initializeCart = () => {
//       try {
//         const user = getCurrentUser();
        
//         if (user) {
//           setIsLoggedIn(true);
//           setIsPharmacyUser(user.role === 'pharmacy');
          
//           const loadedCart = loadUserCart();
//           setCartItems(loadedCart);
//           if (setCart) {
//             setCart(loadedCart);
//           }
//         } else {
//           setIsLoggedIn(false);
//           setIsPharmacyUser(false);
//           setCartItems([]);
//           if (setCart) {
//             setCart([]);
//           }
//         }
        
//         setIsInitialized(true);
//       } catch (error) {
//         console.error('Error initializing cart:', error);
//         setIsLoggedIn(false);
//         setIsPharmacyUser(false);
//         setCartItems([]);
//         if (setCart) {
//           setCart([]);
//         }
//         setIsInitialized(true);
//       }
//     };

//     initializeCart();

//     const handleAuthChange = () => {
//       initializeCart();
//     };

//     const handleCartUpdate = (e) => {
//       const loadedCart = loadUserCart();
//       setCartItems(loadedCart);
//       if (setCart) {
//         setCart(loadedCart);
//       }
//     };

//     window.addEventListener('userChanged', handleAuthChange);
//     window.addEventListener('cartUpdated', handleCartUpdate);
    
//     return () => {
//       window.removeEventListener('userChanged', handleAuthChange);
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//     };
//   }, [setCart]);

//   // Checkout button logic
//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       setShowEmptyCartModal(true);
//       return;
//     }
    
//     if (!isLoggedIn) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: '/booking',
//           message: 'Please login to proceed to checkout' 
//         } 
//       });
//       return;
//     }
    
//     if (isPharmacyUser) {
//       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
//       setShowPharmacyErrorModal(true);
//       return;
//     }
    
//     navigate('/booking');
//   };

//   // Add to cart button logic
//   const addToCart = () => {
//     const user = getCurrentUser();
    
//     if (!user) {
//       navigate('/login', { 
//         state: { 
//           redirectTo: `/medicine/${id}`,
//           message: 'Please login to add items to cart' 
//         } 
//       });
//       return;
//     }

//     if (user && user.role === 'pharmacy') {
//       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
//       setShowPharmacyErrorModal(true);
//       return;
//     }

//     if (!medicine || !selectedPharmacy) return;
    
//     // Calculate total tablets if applicable
//     const tabletsPerUnit = medicine.tabletsPerUnit || 10; // Default 10 if not specified
//     const totalTablets = isTabletForm(medicine.form) && quantityType === 'tablet' 
//       ? tabletQuantity 
//       : quantity * tabletsPerUnit;
    
//     const cartItem = {
//       ...medicine,
//       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
//       quantity: quantity,
//       tabletQuantity: isTabletForm(medicine.form) ? tabletQuantity : null,
//       totalTablets: totalTablets,
//       quantityType: quantityType,
//       selectedPharmacy: selectedPharmacy,
//       pharmacyTag: medicine.pharmacyName || selectedPharmacy.name,
//       tabletsPerUnit: medicine.tabletsPerUnit || 10
//     };
    
//     let currentCart = loadUserCart();
    
//     const existingIndex = currentCart.findIndex(item => item.id === cartItem.id);
    
//     if (existingIndex > -1) {
//       // For existing item, update based on quantity type
//       if (isTabletForm(medicine.form)) {
//         currentCart[existingIndex].tabletQuantity = (currentCart[existingIndex].tabletQuantity || 0) + tabletQuantity;
//         currentCart[existingIndex].totalTablets = (currentCart[existingIndex].totalTablets || 0) + totalTablets;
//         currentCart[existingIndex].quantity = Math.ceil(currentCart[existingIndex].totalTablets / tabletsPerUnit);
//       } else {
//         currentCart[existingIndex].quantity = (currentCart[existingIndex].quantity || 1) + quantity;
//       }
//     } else {
//       currentCart.push(cartItem);
//     }
    
//     saveUserCart(currentCart);
    
//     setCartItems(currentCart);
//     if (setCart) {
//       setCart(currentCart);
//     }
    
//     const quantityText = isTabletForm(medicine.form) && quantityType === 'tablet'
//       ? `${tabletQuantity} tablets`
//       : `${quantity} unit${quantity > 1 ? 's' : ''}`;
    
//     setSuccessMessage(`${quantityText} of ${medicine.name} added to cart successfully!`);
//     setShowSuccessModal(true);
//   };

//   // Call Pharmacy button logic
//   const handleCallPharmacy = () => {
//     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
//     setShowCallPharmacyModal(true);
//   };

//   // Actual call function after confirmation
//   const confirmCallPharmacy = () => {
//     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
//     window.location.href = `tel:${phoneNumber}`;
//     setShowCallPharmacyModal(false);
//   };

//   // Share function with modal confirmation
//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: medicine?.name,
//         text: `Check out ${medicine?.name} on Pharmacy App`,
//         url: window.location.href,
//       })
//       .catch(console.error);
//     } else {
//       navigator.clipboard.writeText(window.location.href)
//         .then(() => {
//           setShowLinkCopiedModal(true);
//           setTimeout(() => setShowLinkCopiedModal(false), 2000);
//         })
//         .catch(console.error);
//     }
//   };

//   // Modal components
//   const EmptyCartModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={() => setShowEmptyCartModal(false)}
//       />
      
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
//         <div className="p-6">
//           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
//             <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
//           <p className="text-gray-600 text-center mb-6">
//             You need to add items to your cart before proceeding to checkout.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() => setShowEmptyCartModal(false)}
//               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => {
//                 setShowEmptyCartModal(false);
//                 navigate('/medicines');
//               }}
//               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//             >
//               Browse Medicines
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CallPharmacyModal = () => {
//     const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={() => setShowCallPharmacyModal(false)}
//         />
        
//         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
//           <div className="p-6">
//             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
//               <FaPhoneAlt className="w-8 h-8 text-blue-500" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
//             <p className="text-gray-600 text-center mb-4">
//               Do you want to call this pharmacy?
//             </p>
//             <div className="bg-blue-50 rounded-lg p-4 mb-6">
//               <div className="flex items-center justify-center">
//                 <FaPhoneAlt className="text-blue-500 mr-3" />
//                 <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
//               </div>
//               <p className="text-sm text-gray-500 text-center mt-2">
//                 {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={() => setShowCallPharmacyModal(false)}
//                 className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmCallPharmacy}
//                 className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
//               >
//                 <FaPhoneAlt className="mr-2" />
//                 Call Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const LinkCopiedModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={() => setShowLinkCopiedModal(false)}
//       />
      
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
//         <div className="p-6">
//           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
//             <FaCheck className="w-8 h-8 text-green-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
//           <p className="text-gray-600 text-center">
//             Medicine link has been copied to clipboard.
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   const SuccessModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={() => setShowSuccessModal(false)}
//       />
      
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
//         <div className="p-6">
//           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
//             <FaCheck className="w-8 h-8 text-green-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
//           <p className="text-gray-600 text-center mb-6">
//             {successMessage}
//           </p>
//           <button
//             onClick={() => setShowSuccessModal(false)}
//             className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const PharmacyErrorModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={() => setShowPharmacyErrorModal(false)}
//       />
      
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
//         <div className="p-6">
//           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
//             <FaExclamationTriangle className="w-8 h-8 text-red-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
//           <p className="text-gray-600 text-center mb-6">
//             {successMessage}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() => setShowPharmacyErrorModal(false)}
//               className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               OK
//             </button>
//             <button
//               onClick={() => {
//                 setShowPharmacyErrorModal(false);
//                 navigate('/login');
//               }}
//               className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
//             >
//               Switch Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     const fetchMedicineDetails = async () => {
//       try {
//         setLoading(true);
//         const idParts = id.split('_');
        
//         if (idParts.length === 2) {
//           await fetchPharmacyMedicine(idParts[0], idParts[1]);
//         } else {
//           await fetchAggregatedMedicine(id);
//         }
//       } catch (err) {
//         console.error('Error fetching medicine:', err);
//         setError('Error loading medicine details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (id) {
//       fetchMedicineDetails();
//     }
//   }, [id]);

//   const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineData = data.data;
//         const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
//           ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
//           : 0;
        
//         const medicineDetails = {
//           _id: medicineId,
//           id: `${pharmacyId}_${medicineId}`,
//           name: medicineData.name,
//           genericName: medicineData.genericName,
//           description: medicineData.description,
//           detailedDescription: medicineData.detailedDescription || medicineData.description,
//           category: medicineData.category,
//           price: medicineData.price,
//           discountedPrice: medicineData.discountedPrice,
//           discountPercentage: discountPercentage,
//           dosage: medicineData.dosage || 'As prescribed',
//           strength: medicineData.strength,
//           form: medicineData.form,
//           manufacturer: medicineData.manufacturer,
//           image: medicineData.image,
//           inStock: medicineData.inStock !== false,
//           sideEffects: medicineData.sideEffects || [],
//           uses: medicineData.uses || [],
//           precautions: medicineData.precautions || [],
//           instructions: medicineData.instructions || [],
//           storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//           tabletsPerUnit: medicineData.tabletsPerUnit || 10, // Default to 10 tablets per unit
//           pharmacyId: pharmacyId,
//           pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
//           pharmacyAddress: medicineData.pharmacy?.address,
//           pharmacyCity: medicineData.pharmacy?.city,
//           pharmacyPhone: medicineData.pharmacy?.phone,
//           pharmacyRating: medicineData.pharmacy?.rating || 4.2,
//           pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
//           availableAtPharmacies: [{
//             _id: pharmacyId,
//             name: medicineData.pharmacy?.name || 'Pharmacy',
//             city: medicineData.pharmacy?.city,
//             distance: medicineData.pharmacy?.distance || '2.5 km',
//             deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
//             rating: medicineData.pharmacy?.rating || 4.2,
//             price: medicineData.price,
//             discountedPrice: medicineData.discountedPrice,
//             discountPercentage: discountPercentage
//           }]
//         };
        
//         setMedicine(medicineDetails);
//         setPharmacyId(pharmacyId);
//         setIsAggregatedView(false);
//         setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
//         if (medicineData.category) {
//           fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
//         }
//       } else {
//         setError(data.message || 'Medicine not found');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacy medicine:', err);
//       setError('Error loading medicine details from pharmacy');
//     }
//   };

//   const fetchAggregatedMedicine = async (medicineName) => {
//     try {
//       const encodedName = encodeURIComponent(medicineName);
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const medicineDetails = {
//           _id: medicineName,
//           id: medicineName,
//           name: data.data.medicine.name,
//           genericName: data.data.medicine.genericName,
//           description: data.data.medicine.description,
//           detailedDescription: data.data.medicine.detailedDescription,
//           category: data.data.medicine.category,
//           price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
//           discountedPrice: data.data.stats?.lowestDiscountedPrice,
//           discountPercentage: 0,
//           dosage: data.data.medicine.dosage,
//           strength: data.data.medicine.strength,
//           form: data.data.medicine.form,
//           manufacturer: data.data.medicine.manufacturer,
//           image: data.data.medicine.image,
//           inStock: data.data.stats?.totalPharmacies > 0,
//           sideEffects: data.data.medicine.sideEffects || [],
//           uses: data.data.medicine.uses || [],
//           precautions: data.data.medicine.precautions || [],
//           instructions: data.data.medicine.instructions || [],
//           storageInstructions: data.data.medicine.storageInstructions,
//           tabletsPerUnit: data.data.medicine.tabletsPerUnit || 10,
//           availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
//             _id: pharmacy.pharmacyId,
//             name: pharmacy.pharmacyName,
//             city: pharmacy.pharmacyCity,
//             distance: pharmacy.distance || '2.5 km',
//             deliveryTime: pharmacy.deliveryTime || '30-45 min',
//             rating: pharmacy.rating || 4.0,
//             price: pharmacy.price,
//             discountedPrice: pharmacy.discountedPrice,
//             discountPercentage: pharmacy.discountPercentage || 0,
//             uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
//           })) || [],
//           stats: data.data.stats
//         };
        
//         setMedicine(medicineDetails);
//         setIsAggregatedView(true);
        
//         if (data.data.availableAt?.length > 0) {
//           setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
//         }
        
//         if (data.data.medicine.category) {
//           fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//         }
//       } else {
//         setError('Medicine not found in aggregated data');
//       }
//     } catch (err) {
//       console.error('Error fetching aggregated medicine:', err);
//       setError('Error loading aggregated medicine details');
//     }
//   };

//   const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med._id !== excludeMedicineId)
//           .map(med => ({
//             _id: `${pharmacyId}_${med._id}`,
//             name: med.name,
//             description: med.description,
//             price: med.price,
//             discountedPrice: med.discountedPrice,
//             discountPercentage: med.discountedPrice && med.price > 0
//               ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
//               : 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.2,
//             form: med.form,
//             tabletsPerUnit: med.tabletsPerUnit || 10
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related pharmacy medicines:', err);
//     }
//   };

//   const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await response.json();
      
//       if (data.success) {
//         const filtered = data.data
//           .filter(med => med.name !== excludeMedicineName)
//           .map(med => ({
//             _id: med.name,
//             name: med.name,
//             description: med.description,
//             price: med.lowestPrice || med.price || 0,
//             discountedPrice: med.lowestDiscountedPrice,
//             discountPercentage: 0,
//             image: med.image,
//             category: med.category,
//             rating: 4.0,
//             form: med.form,
//             tabletsPerUnit: med.tabletsPerUnit || 10
//           }));
        
//         setRelatedMedicines(filtered);
//       }
//     } catch (err) {
//       console.error('Error fetching related aggregated medicines:', err);
//     }
//   };

//   // Related medicines navigation
//   const nextRelated = () => {
//     if (relatedMedicines.length <= 2) return;
//     setCurrentRelatedIndex(prev => 
//       prev + 2 >= relatedMedicines.length ? 0 : prev + 2
//     );
//   };

//   const prevRelated = () => {
//     if (relatedMedicines.length <= 2) return;
//     setCurrentRelatedIndex(prev => 
//       prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
//     );
//   };

//   const quantityInCart = medicine ? 
//     cartItems.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
//     : 0;

//   const tabletQuantityInCart = medicine ? 
//     cartItems.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.tabletQuantity || 0 
//     : 0;

//   const removeFromCart = () => {
//     if (!medicine || !selectedPharmacy) return;
//     const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    
//     let currentCart = loadUserCart();
//     currentCart = currentCart.filter(item => item.id !== itemId);
//     saveUserCart(currentCart);
    
//     setCartItems(currentCart);
//     if (setCart) {
//       setCart(currentCart);
//     }
    
//     setSuccessMessage(`${medicine.name} removed from cart`);
//     setShowSuccessModal(true);
//   };

//   const incrementQuantity = () => {
//     if (quantityType === 'unit') {
//       setQuantity(prev => Math.min(prev + 1, 10));
//     }
//   };
  
//   const decrementQuantity = () => {
//     if (quantityType === 'unit') {
//       setQuantity(prev => Math.max(prev - 1, 1));
//     }
//   };

//   const incrementTabletQuantity = () => {
//     if (quantityType === 'tablet') {
//       setTabletQuantity(prev => Math.min(prev + 1, 100)); // Max 100 tablets
//     }
//   };
  
//   const decrementTabletQuantity = () => {
//     if (quantityType === 'tablet') {
//       setTabletQuantity(prev => Math.max(prev - 1, 1));
//     }
//   };

//   const calculateFinalPrice = () => {
//     if (!medicine) return 0;
    
//     let unitPrice = medicine.discountedPrice || medicine.price;
    
//     if (isTabletForm(medicine.form) && quantityType === 'tablet') {
//       const tabletsPerUnit = medicine.tabletsPerUnit || 10;
//       return (unitPrice / tabletsPerUnit) * tabletQuantity;
//     }
    
//     return unitPrice * quantity;
//   };

//   const calculatePerTabletPrice = () => {
//     if (!medicine) return 0;
//     const unitPrice = medicine.discountedPrice || medicine.price;
//     const tabletsPerUnit = medicine.tabletsPerUnit || 10;
//     return unitPrice / tabletsPerUnit;
//   };

//   const getFormIcon = () => {
//     if (!medicine) return <FaPills />;
//     if (isTabletForm(medicine.form)) return <FaBoxes />;
//     if (isLiquidForm(medicine.form)) return <FaFlask />;
//     return <FaPills />;
//   };

//   if (!isInitialized) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="h-96 bg-gray-200 rounded-xl"></div>
//                 <div className="h-64 bg-gray-200 rounded-xl"></div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-32 bg-gray-200 rounded-xl"></div>
//                 <div className="h-48 bg-gray-200 rounded-xl"></div>
//                 <div className="h-24 bg-gray-200 rounded-xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="h-96 bg-gray-200 rounded-xl"></div>
//                 <div className="h-64 bg-gray-200 rounded-xl"></div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-32 bg-gray-200 rounded-xl"></div>
//                 <div className="h-48 bg-gray-200 rounded-xl"></div>
//                 <div className="h-24 bg-gray-200 rounded-xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !medicine) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 mx-4">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
//             <FaExclamationTriangle className="w-10 h-10 text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
//           <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
//           <button 
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
//           >
//             <FaArrowLeft className="mr-2" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const finalPrice = calculateFinalPrice();
//   const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
//   const availablePharmacies = medicine.availableAtPharmacies || [];
//   const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);
//   const perTabletPrice = calculatePerTabletPrice();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Modals */}
//       {showEmptyCartModal && <EmptyCartModal />}
//       {showCallPharmacyModal && <CallPharmacyModal />}
//       {showLinkCopiedModal && <LinkCopiedModal />}
//       {showSuccessModal && <SuccessModal />}
//       {showPharmacyErrorModal && <PharmacyErrorModal />}

//       {/* Header */}
//       <div className="bg-white shadow-sm border-b sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium text-sm sm:text-base"
//             >
//               <FaArrowLeft className="mr-2" />
//               <span className="hidden sm:inline">Back</span>
//             </button>
            
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <button 
//                 onClick={handleShare}
//                 className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
//                 aria-label="Share"
//               >
//                 <FaShareAlt size={18} />
//               </button>
//               <button
//                 onClick={handleCheckout}
//                 className={`flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
//                   cartItems.length === 0 
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                     : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
//                 }`}
//               >
//                 <FaShoppingCart className="mr-1 sm:mr-2" size={16} />
//                 <span className="hidden xs:inline">Checkout</span> ({cartItems.length})
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
//         {/* Breadcrumb - Hidden on mobile */}
//         <div className="hidden sm:flex items-center text-sm text-gray-600 mb-6">
//           <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
//           <FaChevronRight className="mx-2" size={10} />
//           <span className="font-medium text-gray-900 truncate max-w-xs">{medicine.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
//           {/* Left Column - Product Info */}
//           <div className="lg:col-span-2 space-y-4 sm:space-y-6">
//             {/* Product Card - Improved responsive design */}
//             <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
//               <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
//                 {/* Product Image */}
//                 <div className="sm:w-2/5">
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-48 sm:h-64 overflow-hidden">
//                       <div className="w-full h-full flex items-center justify-center">
//                         <img
//                           src={medicine.image}
//                           alt={medicine.name}
//                           className="max-h-40 sm:max-h-52 max-w-full object-contain"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
//                           }}
//                         />
//                         {isDiscounted && (
//                           <div className="absolute top-0 left-0">
//                             <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-br-lg rounded-tl-xl text-xs sm:text-sm font-bold shadow-md">
//                               Save {medicine.discountPercentage}%
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="mt-3">
//                       <span className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium truncate max-w-full">
//                         {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Details - Improved layout */}
//                 <div className="sm:w-3/5">
//                   <div className="mb-3 sm:mb-4">
//                     <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{medicine.name}</h1>
//                     {medicine.genericName && (
//                       <p className="text-sm sm:text-base text-gray-600">
//                         <span className="font-medium">Generic:</span> {medicine.genericName}
//                       </p>
//                     )}
//                   </div>

//                   {/* Price Section */}
//                   <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
//                     <div className="flex items-end mb-2 flex-wrap">
//                       <span className="text-2xl sm:text-3xl font-bold text-[var(--secondary-color)]">
//                         Rs. {finalPrice.toFixed(2)}
//                       </span>
//                       {isDiscounted && medicine.price > finalPrice && (
//                         <span className="ml-2 sm:ml-3 text-base sm:text-lg text-gray-500 line-through">
//                           Rs. {medicine.price.toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-600">Inclusive of all taxes</p>
//                     {isTabletForm(medicine.form) && (
//                       <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                         Per tablet: Rs. {perTabletPrice.toFixed(2)}
//                       </p>
//                     )}
//                   </div>

//                   {/* Key Features - Grid adjusts for mobile */}
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//                     <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
//                       <div className="text-[var(--primary-color)] mr-2 sm:mr-3 text-lg sm:text-xl">
//                         {getFormIcon()}
//                       </div>
//                       <div className="min-w-0">
//                         <div className="text-xs sm:text-sm text-gray-600">Form</div>
//                         <div className="font-medium text-sm sm:text-base truncate">{medicine.form}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
//                       <FaIndustry className="text-[var(--primary-color)] mr-2 sm:mr-3 text-sm sm:text-base" />
//                       <div className="min-w-0">
//                         <div className="text-xs sm:text-sm text-gray-600">Manufacturer</div>
//                         <div className="font-medium text-sm sm:text-base truncate">{medicine.manufacturer || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
//                       <FaPills className="text-[var(--primary-color)] mr-2 sm:mr-3 text-sm sm:text-base" />
//                       <div className="min-w-0">
//                         <div className="text-xs sm:text-sm text-gray-600">Strength</div>
//                         <div className="font-medium text-sm sm:text-base truncate">{medicine.strength || 'Not specified'}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
//                       <FaBox className="text-[var(--primary-color)] mr-2 sm:mr-3 text-sm sm:text-base" />
//                       <div className="min-w-0">
//                         <div className="text-xs sm:text-sm text-gray-600">Per Unit</div>
//                         <div className="font-medium text-sm sm:text-base truncate">{medicine.tabletsPerUnit || 1} {isTabletForm(medicine.form) ? 'tablets' : 'unit'}</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Status */}
//                   <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
//                     <div className="flex items-center">
//                       {medicine.inStock ? (
//                         <>
//                           <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
//                           <div>
//                             <div className="font-medium text-green-700 text-sm sm:text-base">In Stock</div>
//                             <div className="text-xs sm:text-sm text-green-600">Available for delivery</div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <FaExclamationTriangle className="text-red-500 mr-3 flex-shrink-0" />
//                           <div>
//                             <div className="font-medium text-red-700 text-sm sm:text-base">Out of Stock</div>
//                             <div className="text-xs sm:text-sm text-red-600">Check nearby pharmacies</div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs Section - Scrollable on mobile */}
//             <div className="bg-white rounded-xl shadow-md mb-4 sm:mb-6">
//               {/* Tab Navigation - Horizontal scroll on mobile */}
//               <div className="border-b overflow-x-auto">
//                 <div className="flex whitespace-nowrap px-2">
//                   {[
//                     { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
//                     { id: 'uses', label: 'Uses', icon: <FaPills /> },
//                     { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
//                     { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
//                     { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveSection(tab.id)}
//                       className={`flex items-center px-3 sm:px-6 py-3 sm:py-4 font-medium whitespace-nowrap border-b-2 transition-colors text-xs sm:text-sm ${
//                         activeSection === tab.id
//                           ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-1 sm:mr-2 text-sm sm:text-base">{tab.icon}</span>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Tab Content */}
//               <div className="p-4 sm:p-6 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
//                 {activeSection === 'overview' && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div>
//                       <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Product Description</h3>
//                       <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
//                         {medicine.detailedDescription || medicine.description}
//                       </p>
//                     </div>
//                     {medicine.storageInstructions && (
//                       <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
//                         <div className="flex items-start">
//                           <FaTemperatureLow className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                           <div>
//                             <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Storage Instructions</h4>
//                             <p className="text-sm sm:text-base text-gray-700">{medicine.storageInstructions}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'uses' && (
//                   <div className="space-y-3 sm:space-y-4">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-900">Therapeutic Uses</h3>
//                     {medicine.uses && medicine.uses.length > 0 ? (
//                       <ul className="space-y-2 sm:space-y-3">
//                         {medicine.uses.map((use, index) => (
//                           <li key={index} className="flex items-start text-sm sm:text-base">
//                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
//                             <span className="text-gray-700">{use}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-sm sm:text-base text-gray-500 italic">No specific uses listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'sideEffects' && (
//                   <div className="space-y-3 sm:space-y-4">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-900">Possible Side Effects</h3>
//                     {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
//                       <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
//                         <ul className="space-y-2 sm:space-y-3">
//                           {medicine.sideEffects.map((effect, index) => (
//                             <li key={index} className="flex items-start text-sm sm:text-base">
//                               <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{effect}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-sm sm:text-base text-gray-500 italic">No specific side effects listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'precautions' && (
//                   <div className="space-y-3 sm:space-y-4">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-900">Safety Precautions</h3>
//                     {medicine.precautions && medicine.precautions.length > 0 ? (
//                       <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
//                         <ul className="space-y-2 sm:space-y-3">
//                           {medicine.precautions.map((precaution, index) => (
//                             <li key={index} className="flex items-start text-sm sm:text-base">
//                               <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{precaution}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-sm sm:text-base text-gray-500 italic">No specific precautions listed.</p>
//                     )}
//                   </div>
//                 )}

//                 {activeSection === 'instructions' && (
//                   <div className="space-y-3 sm:space-y-4">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-900">Usage Instructions</h3>
//                     {medicine.instructions && medicine.instructions.length > 0 ? (
//                       <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
//                         <ul className="space-y-2 sm:space-y-3">
//                           {medicine.instructions.map((instruction, index) => (
//                             <li key={index} className="flex items-start text-sm sm:text-base">
//                               <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
//                               <span className="text-gray-700">{instruction}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className="text-sm sm:text-base text-gray-700">Take as directed by your physician.</p>
//                     )}
//                     <div className="mt-4 sm:mt-6">
//                       <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Dosage</h4>
//                       <p className="text-sm sm:text-base text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Medicines - Improved for mobile */}
//             {relatedMedicines.length > 0 && (
//               <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
//                 <div className="flex items-center justify-between mb-4 sm:mb-6">
//                   <h2 className="text-lg sm:text-xl font-bold text-gray-900">Related Products</h2>
//                   <div className="flex items-center space-x-2">
//                     <button 
//                       onClick={prevRelated}
//                       disabled={relatedMedicines.length <= 2}
//                       className="p-1.5 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       aria-label="Previous"
//                     >
//                       <FaChevronLeft size={14} />
//                     </button>
//                     <button 
//                       onClick={nextRelated}
//                       disabled={relatedMedicines.length <= 2}
//                       className="p-1.5 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                       aria-label="Next"
//                     >
//                       <FaChevronRight size={14} />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 gap-3 sm:gap-4">
//                   {visibleRelatedMedicines.map(relatedMed => (
//                     <Link
//                       key={relatedMed._id}
//                       to={`/medicine/${relatedMed._id}`}
//                       className="group border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
//                     >
//                       <div className="flex">
//                         <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
//                           <img
//                             src={relatedMed.image}
//                             alt={relatedMed.name}
//                             className="max-h-12 sm:max-h-16 max-w-12 sm:max-w-16 object-contain"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 text-sm sm:text-base truncate">
//                             {relatedMed.name}
//                           </h3>
//                           <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex flex-col sm:flex-row sm:items-center">
//                               <span className="font-bold text-[var(--secondary-color)] text-sm sm:text-base">
//                                 Rs.{relatedMed.discountedPrice || relatedMed.price}
//                               </span>
//                               {relatedMed.discountedPrice && (
//                                 <span className="sm:ml-2 text-xs sm:text-sm text-gray-500 line-through">
//                                   Rs.{relatedMed.price}
//                                 </span>
//                               )}
//                             </div>
//                             <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)] text-xs sm:text-sm" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Action Panel - Sticky on desktop */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-20 space-y-4 sm:space-y-6">
//               {/* Pharmacy Selection - Scrollable on mobile */}
//               {isAggregatedView && availablePharmacies.length > 0 && (
//                 <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
//                   <div className="flex items-center mb-3 sm:mb-4">
//                     <FaStore className="text-[var(--primary-color)] mr-2" />
//                     <h3 className="font-bold text-gray-900 text-sm sm:text-base">Select Pharmacy</h3>
//                     <span className="ml-auto text-xs sm:text-sm text-gray-600">{availablePharmacies.length} options</span>
//                   </div>
//                   <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-1 sm:pr-2">
//                     {availablePharmacies.map(pharmacy => (
//                       <button
//                         key={pharmacy._id}
//                         onClick={() => setSelectedPharmacy(pharmacy)}
//                         className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all ${
//                           selectedPharmacy?._id === pharmacy._id
//                             ? 'border-[var(--primary-color)] bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className="flex justify-between items-start mb-1 sm:mb-2">
//                           <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
//                             {pharmacy.name}
//                           </h4>
//                           <div className="flex items-center ml-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <span 
//                                 key={star} 
//                                 className={`text-xs ${star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}`}
//                               >
//                                 ★
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="space-y-1 sm:space-y-2">
//                           <div className="flex items-center text-xs sm:text-sm text-gray-600">
//                             <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
//                             <span className="truncate">{pharmacy.city} • {pharmacy.distance}</span>
//                           </div>
//                           <div className="flex items-center text-xs sm:text-sm text-gray-600">
//                             <FaClock className="mr-2 flex-shrink-0" />
//                             <span className="truncate">{pharmacy.deliveryTime}</span>
//                           </div>
//                           <div className="flex items-center justify-between mt-2 sm:mt-3">
//                             <div className="flex items-center">
//                               <FaTag className="text-green-500 mr-2 flex-shrink-0 text-xs sm:text-sm" />
//                               <span className="font-bold text-[var(--secondary-color)] text-sm sm:text-base">
//                                 Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
//                               </span>
//                               {pharmacy.discountPercentage > 0 && (
//                                 <span className="ml-1 sm:ml-2 text-xs text-red-500 whitespace-nowrap">
//                                   ({pharmacy.discountPercentage}% OFF)
//                                 </span>
//                               )}
//                             </div>
//                             {selectedPharmacy?._id === pharmacy._id && (
//                               <FaCheckCircle className="text-green-500 flex-shrink-0" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Order Summary - Improved for tablets/syrups */}
//               <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
//                 <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Order Summary</h3>
                
//                 {/* Quantity Type Selector - For tablets only */}
//                 {isTabletForm(medicine.form) && (
//                   <div className="mb-4 sm:mb-6">
//                     <div className="flex items-center justify-between mb-2 sm:mb-3">
//                       <span className="text-sm sm:text-base text-gray-700">Buy by</span>
//                     </div>
//                     <div className="flex rounded-lg border border-gray-300 overflow-hidden">
//                       <button
//                         onClick={() => setQuantityType('unit')}
//                         className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
//                           quantityType === 'unit'
//                             ? 'bg-[var(--primary-color)] text-white'
//                             : 'bg-white text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         Unit ({medicine.tabletsPerUnit || 10} tablets)
//                       </button>
//                       <button
//                         onClick={() => setQuantityType('tablet')}
//                         className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
//                           quantityType === 'tablet'
//                             ? 'bg-[var(--primary-color)] text-white'
//                             : 'bg-white text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         Tablet
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Quantity Selector */}
//                 <div className="mb-4 sm:mb-6">
//                   <div className="flex items-center justify-between mb-2 sm:mb-3">
//                     <span className="text-sm sm:text-base text-gray-700">
//                       {quantityType === 'unit' ? 'Quantity (Units)' : 'Quantity (Tablets)'}
//                     </span>
//                     <span className="text-xs sm:text-sm text-gray-500">
//                       Max: {quantityType === 'unit' ? '10 units' : '100 tablets'}
//                     </span>
//                   </div>
                  
//                   {quantityType === 'unit' ? (
//                     <div className="flex items-center">
//                       <button
//                         onClick={decrementQuantity}
//                         disabled={quantity <= 1}
//                         className="w-10 sm:w-12 h-10 sm:h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                       >
//                         <FaMinus size={12} />
//                       </button>
//                       <div className="w-14 sm:w-16 h-10 sm:h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-sm sm:text-base">
//                         {quantity}
//                       </div>
//                       <button
//                         onClick={incrementQuantity}
//                         disabled={quantity >= 10}
//                         className="w-10 sm:w-12 h-10 sm:h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                       >
//                         <FaPlus size={12} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center">
//                       <button
//                         onClick={decrementTabletQuantity}
//                         disabled={tabletQuantity <= 1}
//                         className="w-10 sm:w-12 h-10 sm:h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                       >
//                         <FaMinus size={12} />
//                       </button>
//                       <div className="w-14 sm:w-16 h-10 sm:h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-sm sm:text-base">
//                         {tabletQuantity}
//                       </div>
//                       <button
//                         onClick={incrementTabletQuantity}
//                         disabled={tabletQuantity >= 100}
//                         className="w-10 sm:w-12 h-10 sm:h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                       >
//                         <FaPlus size={12} />
//                       </button>
//                     </div>
//                   )}
                  
//                   {isTabletForm(medicine.form) && quantityType === 'tablet' && (
//                     <p className="text-xs text-gray-500 mt-2">
//                       {Math.ceil(tabletQuantity / (medicine.tabletsPerUnit || 10))} unit(s) needed
//                     </p>
//                   )}
//                 </div>

//                 {/* Price Breakdown */}
//                 <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-600">
//                       {quantityType === 'unit' 
//                         ? `Price (${quantity} unit${quantity > 1 ? 's' : ''})` 
//                         : `Price (${tabletQuantity} tablet${tabletQuantity > 1 ? 's' : ''})`}
//                     </span>
//                     <span className="font-medium">Rs. {finalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm sm:text-base">
//                     <span className="text-gray-600">Delivery</span>
//                     <span className="text-green-600 font-medium">FREE</span>
//                   </div>
//                   {medicine.discountPercentage > 0 && (
//                     <div className="flex justify-between text-sm sm:text-base">
//                       <span className="text-gray-600">Discount</span>
//                       <span className="text-red-600 font-medium">
//                         -Rs. {((medicine.price - finalPrice) * quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   )}
//                   <div className="border-t pt-2 sm:pt-3">
//                     <div className="flex justify-between font-bold text-base sm:text-lg">
//                       <span>Total Amount</span>
//                       <span className="text-[var(--secondary-color)]">Rs. {finalPrice.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   {quantityInCart > 0 ? (
//                     <div className="space-y-3">
//                       <button
//                         onClick={addToCart}
//                         className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm sm:text-base ${
//                           medicine.inStock && (!isAggregatedView || selectedPharmacy)
//                             ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                         }`}
//                         disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
//                       >
//                         <FaShoppingCart className="mr-2" />
//                         Add More to Cart
//                       </button>
//                       <div className="text-center text-xs sm:text-sm text-gray-600">
//                         {isTabletForm(medicine.form) 
//                           ? `${tabletQuantityInCart} tablets in cart` 
//                           : `${quantityInCart} unit${quantityInCart > 1 ? 's' : ''} in cart`}
//                       </div>
//                       <button
//                         onClick={removeFromCart}
//                         className="w-full py-2.5 sm:py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center text-sm sm:text-base"
//                       >
//                         <FaTrash className="mr-2" />
//                         Remove from Cart
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={addToCart}
//                       disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy) || isPharmacyUser}
//                       className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm sm:text-base ${
//                         medicine.inStock && (!isAggregatedView || selectedPharmacy) && !isPharmacyUser
//                           ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
//                           : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                       }`}
//                     >
//                       {isPharmacyUser ? (
//                         <>
//                           <FaBan className="mr-2" />
//                           Not Allowed
//                         </>
//                       ) : medicine.inStock ? (
//                         (isAggregatedView && !selectedPharmacy ? (
//                           <>
//                             <FaStore className="mr-2" />
//                             Select Pharmacy
//                           </>
//                         ) : (
//                           <>
//                             <FaShoppingCart className="mr-2" />
//                             Add to Cart
//                           </>
//                         ))
//                       ) : (
//                         <>
//                           <FaBan className="mr-2" />
//                           Out of Stock
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
//                 <div className="flex items-center mb-3 sm:mb-4">
//                   <FaTruck className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900 text-sm sm:text-base">Delivery Information</h3>
//                 </div>
//                 <div className="space-y-2 sm:space-y-3">
//                   <div className="flex items-center">
//                     <FaClock className="text-gray-400 mr-3 flex-shrink-0" />
//                     <div className="text-sm sm:text-base">
//                       <div className="font-medium">Delivery Time</div>
//                       <div className="text-gray-600">
//                         {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Need Help */}
//               <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
//                 <div className="flex items-center mb-3 sm:mb-4">
//                   <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
//                   <h3 className="font-bold text-gray-900 text-sm sm:text-base">Need Help?</h3>
//                 </div>
//                 <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
//                   Our pharmacists are available 24/7 to answer your questions.
//                 </p>
//                 <button 
//                   onClick={handleCallPharmacy}
//                   className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
//                 >
//                   <FaPhoneAlt className="mr-2" />
//                   Call Pharmacy
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Safety Footer - Responsive */}
//         <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-4 sm:p-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="flex items-center">
//               <FaShieldAlt className="text-white text-xl sm:text-2xl mr-3 sm:mr-4" />
//               <div>
//                 <h3 className="text-white font-bold text-base sm:text-lg">100% Safe & Secure</h3>
//                 <p className="text-white/90 text-xs sm:text-sm">Your health is our priority</p>
//               </div>
//             </div>
//             <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
//               <div className="text-center">
//                 <div className="text-white font-bold text-lg sm:text-xl">10K+</div>
//                 <div className="text-white/80 text-xs sm:text-sm">Happy Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-lg sm:text-xl">24/7</div>
//                 <div className="text-white/80 text-xs sm:text-sm">Pharmacy Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-lg sm:text-xl">100%</div>
//                 <div className="text-white/80 text-xs sm:text-sm">Authentic Medicines</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineDetail;


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
  FaIndustry, FaCapsules, FaExclamationTriangle, FaShieldAlt,
  FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
  FaTruck, FaCheckCircle,
  FaMinus, FaPlus, FaTrash, FaShareAlt,
  FaTemperatureLow, FaUserMd,
  FaChevronRight, FaChevronLeft, FaExclamationCircle,
  FaCheck, FaBan, FaBox, FaBoxes, FaFlask
} from 'react-icons/fa';

const MedicineDetail = ({ cart, setCart, favorites, setFavorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [isAggregatedView, setIsAggregatedView] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPharmacyUser, setIsPharmacyUser] = useState(false);
  const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Medicine form types
  const isTabletForm = (form) => {
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return form && tabletForms.some(t => form.toLowerCase().includes(t));
  };

  const isLiquidForm = (form) => {
    const liquidForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
    return form && liquidForms.some(l => form.toLowerCase().includes(l));
  };

  // Modal states
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
  const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
  const getUserCartKey = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user._id || user.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
      }
    } catch (error) {
      console.error('Error getting user cart key:', error);
    }
    return 'medicineCart_guest';
  };

  // Get current user
  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
    return null;
  };

  // Load cart from localStorage
  const loadUserCart = () => {
    try {
      const user = getCurrentUser();
      const cartKey = getUserCartKey();
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    return [];
  };

  // Save cart to localStorage
  const saveUserCart = (cart) => {
    try {
      const cartKey = getUserCartKey();
      if (cart && cart.length > 0) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
      } else {
        localStorage.removeItem(cartKey);
      }
      
      window.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { cart }
      }));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Initialize cart and auth state
  useEffect(() => {
    const initializeCart = () => {
      try {
        const user = getCurrentUser();
        
        if (user) {
          setIsLoggedIn(true);
          setIsPharmacyUser(user.role === 'pharmacy');
          
          const loadedCart = loadUserCart();
          setCartItems(loadedCart);
          if (setCart) {
            setCart(loadedCart);
          }
        } else {
          setIsLoggedIn(false);
          setIsPharmacyUser(false);
          setCartItems([]);
          if (setCart) {
            setCart([]);
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing cart:', error);
        setIsLoggedIn(false);
        setIsPharmacyUser(false);
        setCartItems([]);
        if (setCart) {
          setCart([]);
        }
        setIsInitialized(true);
      }
    };

    initializeCart();

    const handleAuthChange = () => {
      initializeCart();
    };

    const handleCartUpdate = (e) => {
      const loadedCart = loadUserCart();
      setCartItems(loadedCart);
      if (setCart) {
        setCart(loadedCart);
      }
    };

    window.addEventListener('userChanged', handleAuthChange);
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('userChanged', handleAuthChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [setCart]);

  // Checkout button logic
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartModal(true);
      return;
    }
    
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          redirectTo: '/booking',
          message: 'Please login to proceed to checkout' 
        } 
      });
      return;
    }
    
    if (isPharmacyUser) {
      setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }
    
    navigate('/booking');
  };

  // Add to cart button logic
  const addToCart = () => {
    const user = getCurrentUser();
    
    if (!user) {
      navigate('/login', { 
        state: { 
          redirectTo: `/medicine/${id}`,
          message: 'Please login to add items to cart' 
        } 
      });
      return;
    }

    if (user && user.role === 'pharmacy') {
      setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }

    if (!medicine || !selectedPharmacy) return;
    
    const cartItem = {
      ...medicine,
      id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
      quantity: quantity,
      selectedPharmacy: selectedPharmacy,
      pharmacyTag: medicine.pharmacyName || selectedPharmacy.name,
    };
    
    let currentCart = loadUserCart();
    
    const existingIndex = currentCart.findIndex(item => item.id === cartItem.id);
    
    if (existingIndex > -1) {
      currentCart[existingIndex].quantity = (currentCart[existingIndex].quantity || 1) + quantity;
    } else {
      currentCart.push(cartItem);
    }
    
    saveUserCart(currentCart);
    
    setCartItems(currentCart);
    if (setCart) {
      setCart(currentCart);
    }
    
    setSuccessMessage(`${quantity} unit${quantity > 1 ? 's' : ''} of ${medicine.name} added to cart successfully!`);
    setShowSuccessModal(true);
  };

  // Call Pharmacy button logic
  const handleCallPharmacy = () => {
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    setShowCallPharmacyModal(true);
  };

  // Actual call function after confirmation
  const confirmCallPharmacy = () => {
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    window.location.href = `tel:${phoneNumber}`;
    setShowCallPharmacyModal(false);
  };

  // Share function with modal confirmation
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: medicine?.name,
        text: `Check out ${medicine?.name} on Pharmacy App`,
        url: window.location.href,
      })
      .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setShowLinkCopiedModal(true);
          setTimeout(() => setShowLinkCopiedModal(false), 2000);
        })
        .catch(console.error);
    }
  };

  // Modal components
  const EmptyCartModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowEmptyCartModal(false)}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
            <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
          <p className="text-gray-600 text-center mb-6">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowEmptyCartModal(false)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                setShowEmptyCartModal(false);
                navigate('/medicines');
              }}
              className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
            >
              Browse Medicines
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CallPharmacyModal = () => {
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCallPharmacyModal(false)}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
          <div className="p-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
              <FaPhoneAlt className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
            <p className="text-gray-600 text-center mb-4">
              Do you want to call this pharmacy?
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center">
                <FaPhoneAlt className="text-blue-500 mr-3" />
                <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">
                {selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowCallPharmacyModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmCallPharmacy}
                className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center"
              >
                <FaPhoneAlt className="mr-2" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LinkCopiedModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowLinkCopiedModal(false)}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
            <FaCheck className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
          <p className="text-gray-600 text-center">
            Medicine link has been copied to clipboard.
          </p>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowSuccessModal(false)}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
            <FaCheck className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
          <p className="text-gray-600 text-center mb-6">
            {successMessage}
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const PharmacyErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowPharmacyErrorModal(false)}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
            <FaExclamationTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
          <p className="text-gray-600 text-center mb-6">
            {successMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowPharmacyErrorModal(false)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              OK
            </button>
            <button
              onClick={() => {
                setShowPharmacyErrorModal(false);
                navigate('/login');
              }}
              className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        setLoading(true);
        const idParts = id.split('_');
        
        if (idParts.length === 2) {
          await fetchPharmacyMedicine(idParts[0], idParts[1]);
        } else {
          await fetchAggregatedMedicine(id);
        }
      } catch (err) {
        console.error('Error fetching medicine:', err);
        setError('Error loading medicine details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMedicineDetails();
    }
  }, [id]);

  const fetchPharmacyMedicine = async (pharmacyId, medicineId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`
      );
      const data = await response.json();
      
      if (data.success) {
        const medicineData = data.data;
        const discountPercentage = medicineData.discountedPrice && medicineData.price > 0
          ? Math.round(((medicineData.price - medicineData.discountedPrice) / medicineData.price) * 100)
          : 0;
        
        const medicineDetails = {
          _id: medicineId,
          id: `${pharmacyId}_${medicineId}`,
          name: medicineData.name,
          genericName: medicineData.genericName,
          description: medicineData.description,
          detailedDescription: medicineData.detailedDescription || medicineData.description,
          category: medicineData.category,
          price: medicineData.price,
          discountedPrice: medicineData.discountedPrice,
          discountPercentage: discountPercentage,
          dosage: medicineData.dosage || 'As prescribed',
          strength: medicineData.strength,
          form: medicineData.form,
          manufacturer: medicineData.manufacturer,
          image: medicineData.image,
          inStock: medicineData.inStock !== false,
          sideEffects: medicineData.sideEffects || [],
          uses: medicineData.uses || [],
          precautions: medicineData.precautions || [],
          instructions: medicineData.instructions || [],
          storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
          pharmacyId: pharmacyId,
          pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
          pharmacyAddress: medicineData.pharmacy?.address,
          pharmacyCity: medicineData.pharmacy?.city,
          pharmacyPhone: medicineData.pharmacy?.phone,
          pharmacyRating: medicineData.pharmacy?.rating || 4.2,
          pharmacyDeliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
          availableAtPharmacies: [{
            _id: pharmacyId,
            name: medicineData.pharmacy?.name || 'Pharmacy',
            city: medicineData.pharmacy?.city,
            distance: medicineData.pharmacy?.distance || '2.5 km',
            deliveryTime: medicineData.pharmacy?.deliveryTime || '30-45 min',
            rating: medicineData.pharmacy?.rating || 4.2,
            price: medicineData.price,
            discountedPrice: medicineData.discountedPrice,
            discountPercentage: discountPercentage
          }]
        };
        
        setMedicine(medicineDetails);
        setPharmacyId(pharmacyId);
        setIsAggregatedView(false);
        setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
        if (medicineData.category) {
          fetchRelatedPharmacyMedicines(pharmacyId, medicineData.category, medicineId);
        }
      } else {
        setError(data.message || 'Medicine not found');
      }
    } catch (err) {
      console.error('Error fetching pharmacy medicine:', err);
      setError('Error loading medicine details from pharmacy');
    }
  };

  const fetchAggregatedMedicine = async (medicineName) => {
    try {
      const encodedName = encodeURIComponent(medicineName);
      const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
      const data = await response.json();
      
      if (data.success) {
        const medicineDetails = {
          _id: medicineName,
          id: medicineName,
          name: data.data.medicine.name,
          genericName: data.data.medicine.genericName,
          description: data.data.medicine.description,
          detailedDescription: data.data.medicine.detailedDescription,
          category: data.data.medicine.category,
          price: data.data.stats?.lowestPrice || data.data.medicine.price || 0,
          discountedPrice: data.data.stats?.lowestDiscountedPrice,
          discountPercentage: 0,
          dosage: data.data.medicine.dosage,
          strength: data.data.medicine.strength,
          form: data.data.medicine.form,
          manufacturer: data.data.medicine.manufacturer,
          image: data.data.medicine.image,
          inStock: data.data.stats?.totalPharmacies > 0,
          sideEffects: data.data.medicine.sideEffects || [],
          uses: data.data.medicine.uses || [],
          precautions: data.data.medicine.precautions || [],
          instructions: data.data.medicine.instructions || [],
          storageInstructions: data.data.medicine.storageInstructions,
          availableAtPharmacies: data.data.availableAt?.map(pharmacy => ({
            _id: pharmacy.pharmacyId,
            name: pharmacy.pharmacyName,
            city: pharmacy.pharmacyCity,
            distance: pharmacy.distance || '2.5 km',
            deliveryTime: pharmacy.deliveryTime || '30-45 min',
            rating: pharmacy.rating || 4.0,
            price: pharmacy.price,
            discountedPrice: pharmacy.discountedPrice,
            discountPercentage: pharmacy.discountPercentage || 0,
            uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`
          })) || [],
          stats: data.data.stats
        };
        
        setMedicine(medicineDetails);
        setIsAggregatedView(true);
        
        if (data.data.availableAt?.length > 0) {
          setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        }
        
        if (data.data.medicine.category) {
          fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
        }
      } else {
        setError('Medicine not found in aggregated data');
      }
    } catch (err) {
      console.error('Error fetching aggregated medicine:', err);
      setError('Error loading aggregated medicine details');
    }
  };

  const fetchRelatedPharmacyMedicines = async (pharmacyId, category, excludeMedicineId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pharmacies/${pharmacyId}/medicines?category=${category}`
      );
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data
          .filter(med => med._id !== excludeMedicineId)
          .map(med => ({
            _id: `${pharmacyId}_${med._id}`,
            name: med.name,
            description: med.description,
            price: med.price,
            discountedPrice: med.discountedPrice,
            discountPercentage: med.discountedPrice && med.price > 0
              ? Math.round(((med.price - med.discountedPrice) / med.price) * 100)
              : 0,
            image: med.image,
            category: med.category,
            rating: 4.2,
            form: med.form,
          }));
        
        setRelatedMedicines(filtered);
      }
    } catch (err) {
      console.error('Error fetching related pharmacy medicines:', err);
    }
  };

  const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data
          .filter(med => med.name !== excludeMedicineName)
          .map(med => ({
            _id: med.name,
            name: med.name,
            description: med.description,
            price: med.lowestPrice || med.price || 0,
            discountedPrice: med.lowestDiscountedPrice,
            discountPercentage: 0,
            image: med.image,
            category: med.category,
            rating: 4.0,
            form: med.form,
          }));
        
        setRelatedMedicines(filtered);
      }
    } catch (err) {
      console.error('Error fetching related aggregated medicines:', err);
    }
  };

  // Related medicines navigation
  const nextRelated = () => {
    if (relatedMedicines.length <= 2) return;
    setCurrentRelatedIndex(prev => 
      prev + 2 >= relatedMedicines.length ? 0 : prev + 2
    );
  };

  const prevRelated = () => {
    if (relatedMedicines.length <= 2) return;
    setCurrentRelatedIndex(prev => 
      prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2
    );
  };

  const quantityInCart = medicine ? 
    cartItems.find(item => item.id === (isAggregatedView ? selectedPharmacy?.uniqueId : medicine.id))?.quantity || 0 
    : 0;

  const removeFromCart = () => {
    if (!medicine || !selectedPharmacy) return;
    const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    
    let currentCart = loadUserCart();
    currentCart = currentCart.filter(item => item.id !== itemId);
    saveUserCart(currentCart);
    
    setCartItems(currentCart);
    if (setCart) {
      setCart(currentCart);
    }
    
    setSuccessMessage(`${medicine.name} removed from cart`);
    setShowSuccessModal(true);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  // FIXED: Calculate final price with proper discount for quantity
  const calculateFinalPrice = () => {
    if (!medicine) return 0;
    
    // Get price per unit after discount
    let pricePerUnit = medicine.price;
    
    // Apply discount if available
    if (medicine.discountedPrice && medicine.discountedPrice < medicine.price) {
      pricePerUnit = medicine.discountedPrice;
    } else if (medicine.discountPercentage && medicine.discountPercentage > 0) {
      pricePerUnit = medicine.price * (1 - medicine.discountPercentage / 100);
    }
    
    // Total price = price per unit × quantity
    return pricePerUnit * quantity;
  };

  // Calculate discount amount for multiple quantities
  const calculateDiscountAmount = () => {
    if (!medicine) return 0;
    if (!medicine.discountedPrice && !medicine.discountPercentage) return 0;
    
    const originalTotal = medicine.price * quantity;
    const discountedTotal = calculateFinalPrice();
    
    return originalTotal - discountedTotal;
  };

  const getFormIcon = () => {
    if (!medicine) return <FaPills />;
    if (isTabletForm(medicine.form)) return <FaBoxes />;
    if (isLiquidForm(medicine.form)) return <FaFlask />;
    return <FaPills />;
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-xl"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-xl"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 mx-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const finalPrice = calculateFinalPrice();
  const discountAmount = calculateDiscountAmount();
  const isDiscounted = medicine.discountedPrice || medicine.discountPercentage > 0;
  const availablePharmacies = medicine.availableAtPharmacies || [];
  const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);
  
  // Get per unit price after discount
  const discountedPricePerUnit = medicine.discountedPrice || (medicine.discountPercentage ? medicine.price * (1 - medicine.discountPercentage / 100) : medicine.price);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      {showEmptyCartModal && <EmptyCartModal />}
      {showCallPharmacyModal && <CallPharmacyModal />}
      {showLinkCopiedModal && <LinkCopiedModal />}
      {showSuccessModal && <SuccessModal />}
      {showPharmacyErrorModal && <PharmacyErrorModal />}

      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium text-sm sm:text-base"
            >
              <FaArrowLeft className="mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors"
                aria-label="Share"
              >
                <FaShareAlt size={18} />
              </button>
              <button
                onClick={handleCheckout}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  cartItems.length === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
                }`}
              >
                <FaShoppingCart className="mr-1 sm:mr-2" size={16} />
                <span className="hidden xs:inline">Checkout</span> ({cartItems.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
          <FaChevronRight className="mx-2" size={10} />
          <Link to="/medicines" className="hover:text-[var(--primary-color)]">Medicines</Link>
          <FaChevronRight className="mx-2" size={10} />
          <span className="font-medium text-gray-900 truncate max-w-xs">{medicine.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Product Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {/* Product Image */}
                <div className="sm:w-2/5">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-48 sm:h-64 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="max-h-40 sm:max-h-52 max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                          }}
                        />
                        {isDiscounted && (
                          <div className="absolute top-0 left-0">
                            <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-br-lg rounded-tl-xl text-xs sm:text-sm font-bold shadow-md">
                              Save {medicine.discountPercentage || Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium truncate max-w-full">
                        {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="sm:w-3/5">
                  <div className="mb-3 sm:mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{medicine.name}</h1>
                    {medicine.genericName && (
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-medium">Generic:</span> {medicine.genericName}
                      </p>
                    )}
                  </div>

                  {/* Price Section - Shows per unit price only */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-end flex-wrap">
                        <span className="text-2xl sm:text-3xl font-bold text-[var(--secondary-color)]">
                          Rs. {discountedPricePerUnit.toFixed(2)}
                        </span>
                        {medicine.price > discountedPricePerUnit && (
                          <span className="ml-2 sm:ml-3 text-base sm:text-lg text-gray-500 line-through">
                            Rs. {medicine.price.toFixed(2)}
                          </span>
                        )}
                        {medicine.discountPercentage > 0 && (
                          <span className="ml-2 text-sm text-red-500 font-semibold">
                            ({medicine.discountPercentage}% OFF)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">Per unit price</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="text-[var(--primary-color)] mr-2 sm:mr-3 text-lg sm:text-xl">
                        {getFormIcon()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Form</div>
                        <div className="font-medium text-sm sm:text-base truncate">{medicine.form}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <FaIndustry className="text-[var(--primary-color)] mr-2 sm:mr-3 text-sm sm:text-base" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Manufacturer</div>
                        <div className="font-medium text-sm sm:text-base truncate">{medicine.manufacturer || 'Not specified'}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <FaPills className="text-[var(--primary-color)] mr-2 sm:mr-3 text-sm sm:text-base" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-600">Strength</div>
                        <div className="font-medium text-sm sm:text-base truncate">{medicine.strength || 'Not specified'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${medicine.inStock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center">
                      {medicine.inStock ? (
                        <>
                          <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-green-700 text-sm sm:text-base">In Stock</div>
                            <div className="text-xs sm:text-sm text-green-600">Available for delivery</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="text-red-500 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-red-700 text-sm sm:text-base">Out of Stock</div>
                            <div className="text-xs sm:text-sm text-red-600">Check nearby pharmacies</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-xl shadow-md mb-4 sm:mb-6">
              <div className="border-b overflow-x-auto">
                <div className="flex whitespace-nowrap px-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
                    { id: 'uses', label: 'Uses', icon: <FaPills /> },
                    { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> },
                    { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> },
                    { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id)}
                      className={`flex items-center px-3 sm:px-6 py-3 sm:py-4 font-medium whitespace-nowrap border-b-2 transition-colors text-xs sm:text-sm ${
                        activeSection === tab.id
                          ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="mr-1 sm:mr-2 text-sm sm:text-base">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                {activeSection === 'overview' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Product Description</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {medicine.detailedDescription || medicine.description}
                      </p>
                    </div>
                    {medicine.storageInstructions && (
                      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-start">
                          <FaTemperatureLow className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Storage Instructions</h4>
                            <p className="text-sm sm:text-base text-gray-700">{medicine.storageInstructions}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'uses' && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Therapeutic Uses</h3>
                    {medicine.uses && medicine.uses.length > 0 ? (
                      <ul className="space-y-2 sm:space-y-3">
                        {medicine.uses.map((use, index) => (
                          <li key={index} className="flex items-start text-sm sm:text-base">
                            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{use}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-500 italic">No specific uses listed.</p>
                    )}
                  </div>
                )}

                {activeSection === 'sideEffects' && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Possible Side Effects</h3>
                    {medicine.sideEffects && medicine.sideEffects.length > 0 ? (
                      <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                        <ul className="space-y-2 sm:space-y-3">
                          {medicine.sideEffects.map((effect, index) => (
                            <li key={index} className="flex items-start text-sm sm:text-base">
                              <FaExclamationTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-500 italic">No specific side effects listed.</p>
                    )}
                  </div>
                )}

                {activeSection === 'precautions' && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Safety Precautions</h3>
                    {medicine.precautions && medicine.precautions.length > 0 ? (
                      <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                        <ul className="space-y-2 sm:space-y-3">
                          {medicine.precautions.map((precaution, index) => (
                            <li key={index} className="flex items-start text-sm sm:text-base">
                              <FaShieldAlt className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{precaution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-500 italic">No specific precautions listed.</p>
                    )}
                  </div>
                )}

                {activeSection === 'instructions' && (
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Usage Instructions</h3>
                    {medicine.instructions && medicine.instructions.length > 0 ? (
                      <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                        <ul className="space-y-2 sm:space-y-3">
                          {medicine.instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start text-sm sm:text-base">
                              <FaUserMd className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-700">Take as directed by your physician.</p>
                    )}
                    <div className="mt-4 sm:mt-6">
                      <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Dosage</h4>
                      <p className="text-sm sm:text-base text-gray-700">{medicine.dosage || 'As prescribed by your doctor'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Medicines */}
            {relatedMedicines.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Related Products</h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={prevRelated}
                      disabled={relatedMedicines.length <= 2}
                      className="p-1.5 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronLeft size={14} />
                    </button>
                    <button 
                      onClick={nextRelated}
                      disabled={relatedMedicines.length <= 2}
                      className="p-1.5 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight size={14} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {visibleRelatedMedicines.map(relatedMed => (
                    <Link
                      key={relatedMed._id}
                      to={`/medicine/${relatedMed._id}`}
                      className="group border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-[var(--primary-color)] hover:shadow-md transition-all"
                    >
                      <div className="flex">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                          <img
                            src={relatedMed.image}
                            alt={relatedMed.name}
                            className="max-h-12 sm:max-h-16 max-w-12 sm:max-w-16 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 group-hover:text-[var(--primary-color)] mb-1 text-sm sm:text-base truncate">
                            {relatedMed.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{relatedMed.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <span className="font-bold text-[var(--secondary-color)] text-sm sm:text-base">
                                Rs.{relatedMed.discountedPrice || relatedMed.price}
                              </span>
                              {relatedMed.discountedPrice && (
                                <span className="sm:ml-2 text-xs sm:text-sm text-gray-500 line-through">
                                  Rs.{relatedMed.price}
                                </span>
                              )}
                            </div>
                            <FaChevronRight className="text-gray-400 group-hover:text-[var(--primary-color)] text-xs sm:text-sm" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Action Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4 sm:space-y-6">
              {/* Pharmacy Selection */}
              {isAggregatedView && availablePharmacies.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <FaStore className="text-[var(--primary-color)] mr-2" />
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Select Pharmacy</h3>
                    <span className="ml-auto text-xs sm:text-sm text-gray-600">{availablePharmacies.length} options</span>
                  </div>
                  <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-1 sm:pr-2">
                    {availablePharmacies.map(pharmacy => (
                      <button
                        key={pharmacy._id}
                        onClick={() => setSelectedPharmacy(pharmacy)}
                        className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all ${
                          selectedPharmacy?._id === pharmacy._id
                            ? 'border-[var(--primary-color)] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                            {pharmacy.name}
                          </h4>
                          <div className="flex items-center ml-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span 
                                key={star} 
                                className={`text-xs ${star <= pharmacy.rating ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                            <span className="truncate">{pharmacy.city} • {pharmacy.distance}</span>
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-600">
                            <FaClock className="mr-2 flex-shrink-0" />
                            <span className="truncate">{pharmacy.deliveryTime}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2 sm:mt-3">
                            <div className="flex items-center">
                              <FaTag className="text-green-500 mr-2 flex-shrink-0 text-xs sm:text-sm" />
                              <span className="font-bold text-[var(--secondary-color)] text-sm sm:text-base">
                                Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}
                              </span>
                              {pharmacy.discountPercentage > 0 && (
                                <span className="ml-1 sm:ml-2 text-xs text-red-500 whitespace-nowrap">
                                  ({pharmacy.discountPercentage}% OFF)
                                </span>
                              )}
                            </div>
                            {selectedPharmacy?._id === pharmacy._id && (
                              <FaCheckCircle className="text-green-500 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary - Shows total price with discount */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Order Summary</h3>

                {/* Quantity Selector */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-sm sm:text-base text-gray-700">Quantity (Units)</span>
                    <span className="text-xs sm:text-sm text-gray-500">Max: 10 units</span>
                  </div>
                  
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-l-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <FaMinus size={12} />
                    </button>
                    <div className="w-14 sm:w-16 h-10 sm:h-12 border-y border-gray-300 bg-white flex items-center justify-center font-medium text-sm sm:text-base">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown - Shows total with discount */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Original Price ({quantity} unit{quantity > 1 ? 's' : ''})</span>
                    <span className="font-medium">Rs. {(medicine.price * quantity).toFixed(2)}</span>
                  </div>
                  
                  {(medicine.discountPercentage > 0 || (medicine.discountedPrice && medicine.discountedPrice < medicine.price)) && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">
                        Discount {medicine.discountPercentage > 0 ? `(${medicine.discountPercentage}% OFF)` : ''}
                      </span>
                      <span className="text-red-600 font-medium">
                        -Rs. {discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  
                  <div className="border-t pt-2 sm:pt-3">
                    <div className="flex justify-between font-bold text-base sm:text-lg">
                      <span>Total Amount</span>
                      <span className="text-[var(--secondary-color)]">Rs. {finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {quantityInCart > 0 ? (
                    <div className="space-y-3">
                      <button
                        onClick={addToCart}
                        className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm sm:text-base ${
                          medicine.inStock && (!isAggregatedView || selectedPharmacy)
                            ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy)}
                      >
                        <FaShoppingCart className="mr-2" />
                        Add More to Cart
                      </button>
                      <div className="text-center text-xs sm:text-sm text-gray-600">
                        {quantityInCart} unit{quantityInCart > 1 ? 's' : ''} in cart
                      </div>
                      <button
                        onClick={removeFromCart}
                        className="w-full py-2.5 sm:py-3 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center text-sm sm:text-base"
                      >
                        <FaTrash className="mr-2" />
                        Remove from Cart
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={addToCart}
                      disabled={!medicine.inStock || (isAggregatedView && !selectedPharmacy) || isPharmacyUser}
                      className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm sm:text-base ${
                        medicine.inStock && (!isAggregatedView || selectedPharmacy) && !isPharmacyUser
                          ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isPharmacyUser ? (
                        <>
                          <FaBan className="mr-2" />
                          Not Allowed
                        </>
                      ) : medicine.inStock ? (
                        (isAggregatedView && !selectedPharmacy ? (
                          <>
                            <FaStore className="mr-2" />
                            Select Pharmacy
                          </>
                        ) : (
                          <>
                            <FaShoppingCart className="mr-2" />
                            Add to Cart
                          </>
                        ))
                      ) : (
                        <>
                          <FaBan className="mr-2" />
                          Out of Stock
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaTruck className="text-[var(--primary-color)] mr-2" />
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Delivery Information</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-3 flex-shrink-0" />
                    <div className="text-sm sm:text-base">
                      <div className="font-medium">Delivery Time</div>
                      <div className="text-gray-600">
                        {selectedPharmacy?.deliveryTime || medicine.pharmacyDeliveryTime || '30-45 minutes'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaPhoneAlt className="text-[var(--primary-color)] mr-2" />
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Need Help?</h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Our pharmacists are available 24/7 to answer your questions.
                </p>
                <button 
                  onClick={handleCallPharmacy}
                  className="w-full flex items-center justify-center py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  <FaPhoneAlt className="mr-2" />
                  Call Pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Footer */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-4 sm:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <FaShieldAlt className="text-white text-xl sm:text-2xl mr-3 sm:mr-4" />
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg">100% Safe & Secure</h3>
                <p className="text-white/90 text-xs sm:text-sm">Your health is our priority</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-white font-bold text-lg sm:text-xl">10K+</div>
                <div className="text-white/80 text-xs sm:text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg sm:text-xl">24/7</div>
                <div className="text-white/80 text-xs sm:text-sm">Pharmacy Support</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg sm:text-xl">100%</div>
                <div className="text-white/80 text-xs sm:text-sm">Authentic Medicines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;