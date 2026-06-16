// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // // // import { FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiClock, FiMinus, FiPlus, FiTrash2, FiShare2 } from 'react-icons/fi';
// // // // // // import { MdLocalPharmacy } from 'react-icons/md';
// // // // // // import { FaCheck, FaExclamationTriangle, FaExclamationCircle, FaPhoneAlt, FaBox, FaBan, FaFlask } from 'react-icons/fa';
// // // // // // import { useCart } from '../../contexts/CartContext';

// // // // // // const PharmacyDetailPage = () => {
// // // // // //   const { id } = useParams();
// // // // // //   const navigate = useNavigate();
  
// // // // // //   const { 
// // // // // //     cart, 
// // // // // //     setCart,
// // // // // //     addToCart, 
// // // // // //     removeFromCart, 
// // // // // //     updateQuantity,
// // // // // //     getPharmacyCartItems,
// // // // // //     getPharmacySubtotal,
// // // // // //     getDeliveryFeeForPharmacy,
// // // // // //     getItemQuantity,
// // // // // //     isAtMaxStock,
// // // // // //     calculateItemTotal,
// // // // // //     isTabletForm: contextIsTabletForm,
// // // // // //     isSyrupForm,
// // // // // //     isInitialized: cartInitialized
// // // // // //   } = useCart();
  
// // // // // //   const isTabletForm = (form) => {
// // // // // //     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
// // // // // //     return form && tabletForms.some(t => form.toLowerCase().includes(t));
// // // // // //   };
  
// // // // // //   const isSyrupFormLocal = (form) => {
// // // // // //     const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
// // // // // //     return form && syrupForms.some(s => form.toLowerCase().includes(s));
// // // // // //   };
  
// // // // // //   const [pharmacy, setPharmacy] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // //   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
// // // // // //   const [medicineLoading, setMedicineLoading] = useState(false);
// // // // // //   const [showMobileCart, setShowMobileCart] = useState(false);
  
// // // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // // // //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// // // // // //   const [isInitialized, setIsInitialized] = useState(false);
  
// // // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // // // // //   const [successMessage, setSuccessMessage] = useState('');
// // // // // //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// // // // // //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// // // // // //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// // // // // //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
// // // // // //   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
// // // // // //   const [selectedMedicine, setSelectedMedicine] = useState(null);
// // // // // //   const [popupQuantity, setPopupQuantity] = useState(1);

// // // // // //   const [deliveryInfo, setDeliveryInfo] = useState({
// // // // // //     distance: 0,
// // // // // //     estimatedTime: '15-20 min'
// // // // // //   });

// // // // // //   const getCurrentUser = () => {
// // // // // //     try {
// // // // // //       const userStr = localStorage.getItem('user');
// // // // // //       if (userStr) {
// // // // // //         return JSON.parse(userStr);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error getting user:', error);
// // // // // //     }
// // // // // //     return null;
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     const initializeAuth = () => {
// // // // // //       try {
// // // // // //         const user = getCurrentUser();
        
// // // // // //         if (user) {
// // // // // //           setIsLoggedIn(true);
// // // // // //           setIsPharmacyUser(user.role === 'pharmacy');
// // // // // //         } else {
// // // // // //           setIsLoggedIn(false);
// // // // // //           setIsPharmacyUser(false);
// // // // // //         }
        
// // // // // //         setIsInitialized(true);
// // // // // //       } catch (error) {
// // // // // //         console.error('Error initializing auth:', error);
// // // // // //         setIsLoggedIn(false);
// // // // // //         setIsPharmacyUser(false);
// // // // // //         setIsInitialized(true);
// // // // // //       }
// // // // // //     };

// // // // // //     initializeAuth();

// // // // // //     const handleAuthChange = () => {
// // // // // //       initializeAuth();
// // // // // //     };

// // // // // //     window.addEventListener('userChanged', handleAuthChange);
    
// // // // // //     return () => {
// // // // // //       window.removeEventListener('userChanged', handleAuthChange);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const fetchPharmacyDetails = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
// // // // // //         const data = await response.json();
        
// // // // // //         if (data.success) {
// // // // // //           setPharmacy(data.data);
// // // // // //           if (data.data.deliveryInfo) {
// // // // // //             setDeliveryInfo(prev => ({
// // // // // //               ...prev,
// // // // // //               distance: data.data.deliveryInfo.distance || 0,
// // // // // //               estimatedTime: data.data.deliveryTime || '15-20 min'
// // // // // //             }));
// // // // // //           }
// // // // // //         } else {
// // // // // //           setError('Pharmacy not found');
// // // // // //           navigate('/pharmacies');
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error('Error:', err);
// // // // // //         setError('Error loading pharmacy');
// // // // // //         navigate('/pharmacies');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
    
// // // // // //     if (id) fetchPharmacyDetails();
// // // // // //   }, [id, navigate]);

// // // // // //   useEffect(() => {
// // // // // //     const calculateDistance = () => {
// // // // // //       if (pharmacy?.latitude && pharmacy?.longitude) {
// // // // // //         if (navigator.geolocation) {
// // // // // //           navigator.geolocation.getCurrentPosition(
// // // // // //             (position) => {
// // // // // //               const userLat = position.coords.latitude;
// // // // // //               const userLng = position.coords.longitude;
              
// // // // // //               const distance = calculateHaversineDistance(
// // // // // //                 userLat, userLng,
// // // // // //                 pharmacy.latitude, pharmacy.longitude
// // // // // //               );
              
// // // // // //               setDeliveryInfo(prev => ({
// // // // // //                 ...prev,
// // // // // //                 distance: distance
// // // // // //               }));
// // // // // //             },
// // // // // //             (error) => {
// // // // // //               console.log('Geolocation error or denied:', error);
// // // // // //             }
// // // // // //           );
// // // // // //         }
// // // // // //       }
// // // // // //     };
    
// // // // // //     if (pharmacy) {
// // // // // //       calculateDistance();
// // // // // //     }
// // // // // //   }, [pharmacy]);

// // // // // //   const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
// // // // // //     const R = 6371;
// // // // // //     const dLat = (lat2 - lat1) * Math.PI / 180;
// // // // // //     const dLon = (lon2 - lon1) * Math.PI / 180;
// // // // // //     const a = 
// // // // // //       Math.sin(dLat/2) * Math.sin(dLat/2) +
// // // // // //       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// // // // // //       Math.sin(dLon/2) * Math.sin(dLon/2);
// // // // // //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// // // // // //     return R * c;
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     const fetchMedicines = async () => {
// // // // // //       try {
// // // // // //         setMedicineLoading(true);
// // // // // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
// // // // // //         const data = await response.json();
        
// // // // // //         if (data.success) {
// // // // // //           // ✅ FIXED: Use med.instock (lowercase 'n') to correctly read stock status
// // // // // //           const formatted = data.data.map(med => ({
// // // // // //             ...med,
// // // // // //             _id: `${id}_${med._id}`,
// // // // // //             id: `${id}_${med._id}`,
// // // // // //             pharmacyId: id,
// // // // // //             pharmacyName: pharmacy?.name,
// // // // // //             tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
// // // // // //             tabletsPerStrip: med.tabletsPerUnit || med.tabletsPerStrip || 10,
// // // // // //             form: med.form || 'tablet',
// // // // // //             stockQuantity: Math.floor(med.stockQuantity || 0), // Ensure integer
// // // // // //             volume: med.volume || '60ml',
// // // // // //             inStock: med.inStock !== false && (med.stockQuantity || 0) > 0, // ✅ FIXED: med.instock
// // // // // //             reorderLevel: med.reorderLevel || 10
// // // // // //           }));
// // // // // //           setPharmacyMedicines(formatted);
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error('Error:', err);
// // // // // //       } finally {
// // // // // //         setMedicineLoading(false);
// // // // // //       }
// // // // // //     };
    
// // // // // //     if (id && pharmacy) fetchMedicines();
// // // // // //   }, [id, pharmacy]);

// // // // // //   const pharmacyCartItems = getPharmacyCartItems(id);
  
// // // // // //   const subtotal = getPharmacySubtotal(id);
// // // // // //   const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
// // // // // //   const finalTotal = subtotal + deliveryFee;
  
// // // // // //   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

// // // // // //   const getCartQuantityForMedicine = (medicineId) => {
// // // // // //     return getItemQuantity(medicineId, id);
// // // // // //   };

// // // // // //   const getMaxAllowedQuantity = (medicine) => {
// // // // // //     const stockQty = medicine.stockQuantity || 0;
// // // // // //     if (!medicine.inStock || stockQty <= 0) return 0;
    
// // // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // // //     return Math.max(0, stockQty - currentInCart);
// // // // // //   };

// // // // // //   const isStockAvailable = (medicine, requestedQuantity) => {
// // // // // //     const maxAllowed = getMaxAllowedQuantity(medicine);
// // // // // //     return requestedQuantity <= maxAllowed;
// // // // // //   };

// // // // // //   const filteredMedicines = pharmacyMedicines.filter(medicine => 
// // // // // //     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // //     (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
// // // // // //   );

// // // // // //   const handleAddToCartClick = (medicine) => {
// // // // // //     const user = getCurrentUser();
    
// // // // // //     if (!user) {
// // // // // //       navigate('/login', { 
// // // // // //         state: { 
// // // // // //           redirectTo: `/pharmacy/${id}`,
// // // // // //           message: 'Please login to add items to cart' 
// // // // // //         } 
// // // // // //       });
// // // // // //       return;
// // // // // //     }

// // // // // //     if (user && user.role === 'pharmacy') {
// // // // // //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// // // // // //       setShowPharmacyErrorModal(true);
// // // // // //       return;
// // // // // //     }

// // // // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
// // // // // //       setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
// // // // // //       setShowSuccessModal(true);
// // // // // //       return;
// // // // // //     }

// // // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // // //     if (currentInCart >= (medicine.stockQuantity || 0)) {
// // // // // //       setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
// // // // // //       setShowSuccessModal(true);
// // // // // //       return;
// // // // // //     }

// // // // // //     if (isTabletForm(medicine.form)) {
// // // // // //       addToCart(medicine, id, { quantity: 1 });
// // // // // //       setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
// // // // // //       setShowSuccessModal(true);
// // // // // //       return;
// // // // // //     }

// // // // // //     setSelectedMedicine(medicine);
// // // // // //     setPopupQuantity(1);
// // // // // //     setShowQuantityPopup(true);
// // // // // //   };

// // // // // //   const confirmAddToCart = () => {
// // // // // //     if (selectedMedicine) {
// // // // // //       if (!isStockAvailable(selectedMedicine, popupQuantity)) {
// // // // // //         const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
// // // // // //         setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
// // // // // //         setShowSuccessModal(true);
// // // // // //         setShowQuantityPopup(false);
// // // // // //         setSelectedMedicine(null);
// // // // // //         return;
// // // // // //       }

// // // // // //       addToCart(selectedMedicine, id, {
// // // // // //         quantity: popupQuantity
// // // // // //       });
      
// // // // // //       const unitText = isSyrupFormLocal(selectedMedicine.form) ? 'bottle' : 'unit';
// // // // // //       setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart successfully!`);
// // // // // //       setShowSuccessModal(true);
// // // // // //       setShowQuantityPopup(false);
// // // // // //       setSelectedMedicine(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleRemoveFromCart = (medicineId) => {
// // // // // //     removeFromCart(medicineId, id);
// // // // // //   };

// // // // // //   const handleCheckout = () => {
// // // // // //     if (pharmacyCartItems.length === 0) {
// // // // // //       setShowEmptyCartModal(true);
// // // // // //       return;
// // // // // //     }
    
// // // // // //     if (!isLoggedIn) {
// // // // // //       navigate('/login', { 
// // // // // //         state: { 
// // // // // //           redirectTo: '/booking',
// // // // // //           message: 'Please login to proceed to checkout' 
// // // // // //         } 
// // // // // //       });
// // // // // //       return;
// // // // // //     }
    
// // // // // //     if (isPharmacyUser) {
// // // // // //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// // // // // //       setShowPharmacyErrorModal(true);
// // // // // //       return;
// // // // // //     }
    
// // // // // //     navigate(`/booking?pharmacy=${id}`);
// // // // // //   };

// // // // // //   const handleShare = () => {
// // // // // //     const shareUrl = window.location.href;
// // // // // //     if (navigator.share) {
// // // // // //       navigator.share({
// // // // // //         title: pharmacy?.name || 'Pharmacy',
// // // // // //         text: `Check out ${pharmacy?.name} on Pharmacy App`,
// // // // // //         url: shareUrl,
// // // // // //       }).catch(console.error);
// // // // // //     } else {
// // // // // //       navigator.clipboard.writeText(shareUrl)
// // // // // //         .then(() => {
// // // // // //           setShowLinkCopiedModal(true);
// // // // // //           setTimeout(() => setShowLinkCopiedModal(false), 2000);
// // // // // //         })
// // // // // //         .catch(console.error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleCallPharmacy = () => {
// // // // // //     setShowCallPharmacyModal(true);
// // // // // //   };

// // // // // //   const confirmCallPharmacy = () => {
// // // // // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // // // // //     window.location.href = `tel:${phoneNumber}`;
// // // // // //     setShowCallPharmacyModal(false);
// // // // // //   };

// // // // // //   const getPerTabletPrice = (medicine) => {
// // // // // //     const stripPrice = medicine.discountedPrice || medicine.price || 0;
// // // // // //     const tabletsPerStrip = medicine.tabletsPerUnit || medicine.tabletsPerStrip || 10;
// // // // // //     return stripPrice / tabletsPerStrip;
// // // // // //   };

// // // // // //   const getStockStatus = (medicine) => {
// // // // // //     const stockQty = medicine.stockQuantity || 0;
// // // // // //     const reorderLvl = medicine.reorderLevel || 10;
// // // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // // //     const available = stockQty - currentInCart;
    
// // // // // //     if (!medicine.inStock || stockQty <= 0) {
// // // // // //       return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
// // // // // //     } else if (available <= 0) {
// // // // // //       return { text: 'Max in Cart', color: 'text-orange-600 bg-orange-50' };
// // // // // //     } else if (stockQty <= reorderLvl) {
// // // // // //       return { text: `Only ${available} left`, color: 'text-yellow-600 bg-yellow-50' };
// // // // // //     } else {
// // // // // //       return { text: `${available} in stock`, color: 'text-green-600 bg-green-50' };
// // // // // //     }
// // // // // //   };

// // // // // //   const isAddButtonDisabled = (medicine) => {
// // // // // //     if (isPharmacyUser) return true;
// // // // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
    
// // // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // // //     return currentInCart >= (medicine.stockQuantity || 0);
// // // // // //   };

// // // // // //   const getAddButtonText = (medicine) => {
// // // // // //     if (isPharmacyUser) return 'Not Allowed';
// // // // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
    
// // // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // // //     if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
    
// // // // // //     return 'Add to Cart';
// // // // // //   };

// // // // // //   const getItemTotalPrice = (item) => {
// // // // // //     return calculateItemTotal(item);
// // // // // //   };

// // // // // //   const getDisplayQuantity = (item) => {
// // // // // //     const qty = item.quantity || 1;
// // // // // //     if (isTabletForm(item.form)) {
// // // // // //       return `${qty} strip${qty > 1 ? 's' : ''}`;
// // // // // //     } else if (isSyrupFormLocal(item.form)) {
// // // // // //       return `${qty} bottle${qty > 1 ? 's' : ''}`;
// // // // // //     }
// // // // // //     return `${qty} unit${qty > 1 ? 's' : ''}`;
// // // // // //   };

// // // // // //   const QuantityPopup = () => {
// // // // // //     if (!selectedMedicine) return null;
// // // // // //     const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
// // // // // //     const unitLabel = isSyrupFormLocal(selectedMedicine.form) ? 'bottle' : 'unit';
    
// // // // // //     return (
// // // // // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
// // // // // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
// // // // // //           <div className="p-6">
// // // // // //             <div className="flex justify-between items-center mb-4">
// // // // // //               <h3 className="text-lg font-bold text-gray-900">Select Quantity</h3>
// // // // // //               <button onClick={() => setShowQuantityPopup(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
// // // // // //             </div>
// // // // // //             <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
// // // // // //             {maxUnitQty <= 5 && maxUnitQty > 0 && (
// // // // // //               <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
// // // // // //                 <p className="text-xs text-yellow-700 flex items-center">
// // // // // //                   <FaExclamationTriangle className="mr-1" />
// // // // // //                   Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             <div className="mb-4">
// // // // // //               <div className="flex items-center justify-between mb-2">
// // // // // //                 <span className="text-sm text-gray-600">
// // // // // //                   Number of {unitLabel}s
// // // // // //                 </span>
// // // // // //                 <span className="text-xs text-gray-400">
// // // // // //                   Max: {maxUnitQty}
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //               <div className="flex items-center justify-center gap-4">
// // // // // //                 <button
// // // // // //                   onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
// // // // // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
// // // // // //                   disabled={popupQuantity <= 1}
// // // // // //                 >
// // // // // //                   <FiMinus size={16} />
// // // // // //                 </button>
// // // // // //                 <span className="w-12 text-center font-medium text-lg">
// // // // // //                   {popupQuantity}
// // // // // //                 </span>
// // // // // //                 <button
// // // // // //                   onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
// // // // // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
// // // // // //                   disabled={popupQuantity >= maxUnitQty}
// // // // // //                 >
// // // // // //                   <FiPlus size={16} />
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
            
// // // // // //             <div className="bg-blue-50 rounded-lg p-3 mb-4">
// // // // // //               <p className="text-lg font-bold text-[var(--primary-color)]">
// // // // // //                 Rs. {((selectedMedicine.discountedPrice || selectedMedicine.price || 0) * popupQuantity).toFixed(2)}
// // // // // //               </p>
// // // // // //             </div>
            
// // // // // //             <div className="flex gap-3">
// // // // // //               <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //               <button onClick={confirmAddToCart} className="flex-1 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)]">
// // // // // //                 Add to Cart
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   };

// // // // // //   const SuccessModal = () => (
// // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
// // // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
// // // // // //         <div className="p-6">
// // // // // //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// // // // // //             <FaCheck className="w-8 h-8 text-green-500" />
// // // // // //           </div>
// // // // // //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
// // // // // //           <p className="text-gray-600 text-center mb-6">{successMessage}</p>
// // // // // //           <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium">
// // // // // //             Continue Shopping
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   const PharmacyErrorModal = () => (
// // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
// // // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
// // // // // //         <div className="p-6">
// // // // // //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
// // // // // //             <FaExclamationTriangle className="w-8 h-8 text-red-500" />
// // // // // //           </div>
// // // // // //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
// // // // // //           <p className="text-gray-600 text-center mb-6">{successMessage}</p>
// // // // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // // // //             <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
// // // // // //               OK
// // // // // //             </button>
// // // // // //             <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium">
// // // // // //               Switch Account
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   const EmptyCartModal = () => (
// // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
// // // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
// // // // // //         <div className="p-6">
// // // // // //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
// // // // // //             <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
// // // // // //           </div>
// // // // // //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
// // // // // //           <p className="text-gray-600 text-center mb-6">You need to add items to your cart before proceeding to checkout.</p>
// // // // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // // // //             <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
// // // // // //               Continue Shopping
// // // // // //             </button>
// // // // // //             <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium">
// // // // // //               Browse Medicines
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   const CallPharmacyModal = () => {
// // // // // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // // // // //     return (
// // // // // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
// // // // // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
// // // // // //           <div className="p-6">
// // // // // //             <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
// // // // // //               <FaPhoneAlt className="w-8 h-8 text-blue-500" />
// // // // // //             </div>
// // // // // //             <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
// // // // // //             <p className="text-gray-600 text-center mb-4">Do you want to call this pharmacy?</p>
// // // // // //             <div className="bg-blue-50 rounded-lg p-4 mb-6">
// // // // // //               <div className="flex items-center justify-center">
// // // // // //                 <FaPhoneAlt className="text-blue-500 mr-3" />
// // // // // //                 <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
// // // // // //               </div>
// // // // // //               <p className="text-sm text-gray-500 text-center mt-2">{pharmacy?.name || 'Pharmacy Support'}</p>
// // // // // //             </div>
// // // // // //             <div className="flex flex-col sm:flex-row gap-3">
// // // // // //               <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //               <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center">
// // // // // //                 <FaPhoneAlt className="mr-2" /> Call Now
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   };

// // // // // //   const LinkCopiedModal = () => (
// // // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
// // // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
// // // // // //         <div className="p-6">
// // // // // //           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
// // // // // //             <FaCheck className="w-8 h-8 text-green-500" />
// // // // // //           </div>
// // // // // //           <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
// // // // // //           <p className="text-gray-600 text-center">Pharmacy link has been copied to clipboard.</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );

// // // // // //   if (loading || !isInitialized || !cartInitialized) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <div className="text-center">
// // // // // //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
// // // // // //           <p className="mt-4 text-gray-600">Loading pharmacy...</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error || !pharmacy) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center p-4">
// // // // // //         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
// // // // // //           <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // // // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Pharmacy Not Found</h3>
// // // // // //           <p className="text-gray-600 mb-4">{error || 'The pharmacy you are looking for does not exist.'}</p>
// // // // // //           <button onClick={() => navigate('/pharmacies')} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors">
// // // // // //             Browse Pharmacies
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // //       {showSuccessModal && <SuccessModal />}
// // // // // //       {showPharmacyErrorModal && <PharmacyErrorModal />}
// // // // // //       {showEmptyCartModal && <EmptyCartModal />}
// // // // // //       {showCallPharmacyModal && <CallPharmacyModal />}
// // // // // //       {showLinkCopiedModal && <LinkCopiedModal />}
// // // // // //       {showQuantityPopup && <QuantityPopup />}

// // // // // //       <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
// // // // // //         <div className="max-w-7xl mx-auto px-4">
// // // // // //           <div className="flex items-center justify-between h-14">
// // // // // //             <button onClick={() => navigate('/pharmacies')} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
// // // // // //               <FiArrowLeft className="w-5 h-5 mr-1" />
// // // // // //               <span className="text-sm sm:text-base">Back</span>
// // // // // //             </button>
// // // // // //             <div className="flex items-center gap-2">
// // // // // //               <button onClick={handleShare} className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors">
// // // // // //                 <FiShare2 className="w-5 h-5" />
// // // // // //               </button>
// // // // // //               <button onClick={() => setShowMobileCart(!showMobileCart)} className="relative p-2 text-gray-600 hover:text-gray-900 lg:hidden">
// // // // // //                 <FiShoppingCart className="w-5 h-5" />
// // // // // //                 {cartItemCount > 0 && (
// // // // // //                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// // // // // //                     {cartItemCount}
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <div className="bg-white border-b border-gray-200">
// // // // // //         <div className="max-w-7xl mx-auto px-4 py-4">
// // // // // //           <div className="flex items-start gap-3">
// // // // // //             <img 
// // // // // //               src={pharmacy.image || 'https://via.placeholder.com/60'} 
// // // // // //               alt={pharmacy.name}
// // // // // //               className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
// // // // // //               onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60'; }}
// // // // // //             />
// // // // // //             <div className="flex-1 min-w-0">
// // // // // //               <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{pharmacy.name}</h1>
// // // // // //               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mt-1">
// // // // // //                 <div className="flex items-center gap-1">
// // // // // //                   <FiMapPin className="w-4 h-4 flex-shrink-0" />
// // // // // //                   <span className="truncate max-w-[150px] sm:max-w-[300px]">{pharmacy.address}</span>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center gap-1">
// // // // // //                   <FiClock className="w-4 h-4 flex-shrink-0" />
// // // // // //                   <span>{pharmacy.deliveryTime || '15-20 min'}</span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <button onClick={handleCallPharmacy} className="p-2 bg-blue-50 text-[var(--primary-color)] rounded-lg hover:bg-blue-100 transition-colors flex-shrink-0">
// // // // // //               <FiPhone className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="max-w-7xl mx-auto px-4 py-4">
// // // // // //         <div className="flex flex-col lg:flex-row gap-6">
// // // // // //           <div className="flex-1">
// // // // // //             <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
// // // // // //               <div className="relative">
// // // // // //                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   placeholder="Search medicines..."
// // // // // //                   value={searchTerm}
// // // // // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                   className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {medicineLoading ? (
// // // // // //               <div className="text-center py-12">
// // // // // //                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
// // // // // //                 <p className="mt-3 text-gray-600">Loading medicines...</p>
// // // // // //               </div>
// // // // // //             ) : filteredMedicines.length > 0 ? (
// // // // // //               <>
// // // // // //                 <p className="text-sm text-gray-600 mb-3">{filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available</p>
// // // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // //                   {filteredMedicines.map((medicine) => {
// // // // // //                     const stockStatus = getStockStatus(medicine);
// // // // // //                     const isDisabled = isAddButtonDisabled(medicine);
// // // // // //                     const buttonText = getAddButtonText(medicine);
// // // // // //                     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // // //                     const isTablet = isTabletForm(medicine.form);
// // // // // //                     const isSyrup = isSyrupFormLocal(medicine.form);
// // // // // //                     const tabletsPerStrip = medicine.tabletsPerUnit || medicine.tabletsPerStrip || 10;
// // // // // //                     const stockQty = medicine.stockQuantity || 0;
                    
// // // // // //                     return (
// // // // // //                       <div key={medicine._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col">
// // // // // //                         <div className="relative h-32 bg-gray-50 flex items-center justify-center p-2">
// // // // // //                           <img
// // // // // //                             src={medicine.image}
// // // // // //                             alt={medicine.name}
// // // // // //                             className="w-full h-full object-contain"
// // // // // //                             onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
// // // // // //                           />
// // // // // //                           {medicine.discountedPrice && medicine.price > medicine.discountedPrice && (
// // // // // //                             <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
// // // // // //                               {Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100)}% OFF
// // // // // //                             </div>
// // // // // //                           )}
// // // // // //                           {medicine.form && (
// // // // // //                             <div className={`absolute bottom-2 right-2 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${isTablet ? 'bg-purple-500' : 'bg-green-500'}`}>
// // // // // //                               {isTablet ? <FaBox className="w-3 h-3" /> : <FaFlask className="w-3 h-3" />}
// // // // // //                               {medicine.form}
// // // // // //                             </div>
// // // // // //                           )}
// // // // // //                         </div>
                        
// // // // // //                         <div className="p-3 flex-1 flex flex-col">
// // // // // //                           <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">{medicine.name}</h3>
// // // // // //                           <div className="min-h-[1.25rem] mb-1">
// // // // // //                             {medicine.genericName ? (
// // // // // //                               <p className="text-xs text-gray-500 line-clamp-1">{medicine.genericName}</p>
// // // // // //                             ) : (
// // // // // //                               <p className="text-xs text-gray-400 italic">Generic name not specified</p>
// // // // // //                             )}
// // // // // //                           </div>
                        
// // // // // //                           <div className={`mb-2 px-2 py-1 rounded text-xs font-medium inline-block ${stockStatus.color}`}>
// // // // // //                             {stockStatus.text}
// // // // // //                             {currentInCart > 0 && medicine.inStock && (
// // // // // //                               <span className="ml-1">({currentInCart} in cart)</span>
// // // // // //                             )}
// // // // // //                           </div>

// // // // // //                           <div className="mb-2 flex-1">
// // // // // //                             <p className="text-xs text-gray-600 line-clamp-2">{medicine.description}</p>
// // // // // //                           </div>

// // // // // //                           <div className="flex items-center justify-between mb-2">
// // // // // //                             <div className="flex items-center flex-wrap gap-1">
// // // // // //                               <span className="text-base font-bold text-green-600">
// // // // // //                                 Rs. {(medicine.discountedPrice || medicine.price || 0).toFixed(2)}
// // // // // //                               </span>
// // // // // //                               {medicine.discountedPrice && medicine.price > medicine.discountedPrice && (
// // // // // //                                 <span className="text-xs text-gray-500 line-through">Rs. {medicine.price.toFixed(2)}</span>
// // // // // //                               )}
// // // // // //                             </div>
// // // // // //                           </div>
                          
// // // // // //                           {isSyrup && (
// // // // // //                             <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 bg-blue-50 p-1.5 rounded">
// // // // // //                               <FaFlask className="w-3 h-3 text-blue-600" />
// // // // // //                               <span className="font-medium">{medicine.volume || '60ml'}</span>
// // // // // //                               <span className="text-gray-400">•</span>
// // // // // //                               <span>{medicine.form || 'syrup'}</span>
// // // // // //                             </div>
// // // // // //                           )}

// // // // // //                           {isTablet && (
// // // // // //                             <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 bg-purple-50 p-1.5 rounded">
// // // // // //                               <FaBox className="w-3 h-3 text-purple-600" />
// // // // // //                               <span className="font-medium">{tabletsPerStrip} tablets/strip</span>
// // // // // //                               <span className="text-gray-400">•</span>
// // // // // //                               <span>Rs. {getPerTabletPrice(medicine).toFixed(2)}/tab</span>
// // // // // //                             </div>
// // // // // //                           )}
                          
// // // // // //                           {/* Stock display as integer */}
// // // // // //                           <div className="text-[10px] text-gray-500 mb-1">
// // // // // //                             📦 Stock: {stockQty} {isTablet ? 'strip' : isSyrup ? 'bottle' : 'unit'}{stockQty !== 1 ? 's' : ''}
// // // // // //                           </div>
                          
// // // // // //                           <div className="flex gap-2 mt-auto">
// // // // // //                             <button
// // // // // //                               onClick={() => handleAddToCartClick(medicine)}
// // // // // //                               disabled={isDisabled}
// // // // // //                               className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
// // // // // //                                 isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
// // // // // //                               }`}
// // // // // //                             >
// // // // // //                               {isDisabled && !isPharmacyUser && !medicine.inStock ? (
// // // // // //                                 <><FaBan className="w-3 h-3" />{buttonText}</>
// // // // // //                               ) : buttonText}
// // // // // //                             </button>
// // // // // //                             <Link to={`/medicine/${medicine._id}`} className="flex-1 bg-gray-100 text-gray-700 py-2 px-2 rounded hover:bg-gray-200 transition-colors text-xs font-medium text-center">
// // // // // //                               Details
// // // // // //                             </Link>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     );
// // // // // //                   })}
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
// // // // // //                 <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // // // // //                 <p className="text-gray-500 text-lg mb-2">No medicines found</p>
// // // // // //                 {searchTerm && <p className="text-gray-400">Try adjusting your search</p>}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <div className="hidden lg:block lg:w-80">
// // // // // //             <div className="bg-white rounded-lg border border-gray-200 sticky top-20 shadow-sm">
// // // // // //               <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
// // // // // //                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
// // // // // //                   <FiShoppingCart className="w-5 h-5 text-[var(--primary-color)]" />
// // // // // //                   Your Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})
// // // // // //                 </h3>
// // // // // //               </div>
              
// // // // // //               <div className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
// // // // // //                 {pharmacyCartItems.length === 0 ? (
// // // // // //                   <div className="text-center py-8">
// // // // // //                     <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
// // // // // //                     <p className="text-gray-500">Your cart is empty</p>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     <div className="space-y-4 mb-4">
// // // // // //                       {pharmacyCartItems.map((item) => (
// // // // // //                         <div key={item._id} className="border-b border-gray-100 pb-3">
// // // // // //                           <div className="flex gap-2">
// // // // // //                             <img src={item.image || 'https://via.placeholder.com/40'} alt={item.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
// // // // // //                             <div className="flex-1">
// // // // // //                               <p className="font-medium text-sm truncate">{item.name}</p>
// // // // // //                               <p className="text-[var(--primary-color)] font-semibold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// // // // // //                               {isTabletForm(item.form) && item.totalTablets && (
// // // // // //                                 <p className="text-xs text-gray-500">{item.totalTablets} tablets total</p>
// // // // // //                               )}
// // // // // //                               <div className="flex items-center justify-between mt-2">
// // // // // //                                 <span className="text-xs text-gray-500">Qty: {getDisplayQuantity(item)}</span>
// // // // // //                                 <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors">
// // // // // //                                   <FiTrash2 className="w-4 h-4" />
// // // // // //                                 </button>
// // // // // //                               </div>
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
                    
// // // // // //                     <div className="border-t border-gray-200 pt-3">
// // // // // //                       <div className="flex justify-between items-center mb-2">
// // // // // //                         <span className="text-gray-600">Subtotal:</span>
// // // // // //                         <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
// // // // // //                       </div>
// // // // // //                       <div className="flex justify-between items-center mb-2">
// // // // // //                         <span className="text-gray-600">Delivery:</span>
// // // // // //                         {deliveryFee === 0 ? (
// // // // // //                           <span className="text-green-600 font-medium">FREE</span>
// // // // // //                         ) : (
// // // // // //                           <span className="font-medium">Rs. {deliveryFee.toFixed(2)}</span>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                       {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// // // // // //                         <p className="text-xs text-gray-500 mb-2">
// // // // // //                           Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} for FREE delivery
// // // // // //                         </p>
// // // // // //                       )}
// // // // // //                       <div className="flex justify-between items-center mb-3">
// // // // // //                         <span className="text-gray-600 font-bold">Total:</span>
// // // // // //                         <span className="font-bold text-lg text-[var(--primary-color)]">Rs. {finalTotal.toFixed(2)}</span>
// // // // // //                       </div>
// // // // // //                       <button onClick={handleCheckout} className="w-full py-3 bg-[var(--primary-color)] text-white text-center rounded-lg hover:bg-[var(--secondary-color)] transition-colors">
// // // // // //                         Checkout
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {cartItemCount > 0 && (
// // // // // //         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
// // // // // //           <button onClick={() => setShowMobileCart(true)} className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium hover:bg-[var(--secondary-color)] flex items-center justify-between px-4">
// // // // // //             <span>View Cart ({cartItemCount} items)</span>
// // // // // //             <span className="font-bold">Rs. {finalTotal.toFixed(2)}</span>
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {showMobileCart && (
// // // // // //         <div className="lg:hidden fixed inset-0 z-50">
// // // // // //           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileCart(false)} />
// // // // // //           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
// // // // // //             <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
// // // // // //               <h3 className="font-bold text-lg">Your Cart ({cartItemCount})</h3>
// // // // // //               <button onClick={() => setShowMobileCart(false)} className="p-2">
// // // // // //                 <FiArrowLeft className="w-5 h-5 rotate-90" />
// // // // // //               </button>
// // // // // //             </div>
            
// // // // // //             <div className="p-4">
// // // // // //               {pharmacyCartItems.map((item) => (
// // // // // //                 <div key={item._id} className="flex gap-3 py-4 border-b border-gray-100">
// // // // // //                   <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
// // // // // //                   <div className="flex-1">
// // // // // //                     <p className="font-medium">{item.name}</p>
// // // // // //                     <p className="text-[var(--primary-color)] font-semibold mt-1">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// // // // // //                     {isTabletForm(item.form) && item.totalTablets && (
// // // // // //                       <p className="text-xs text-gray-500">{item.totalTablets} tablets total</p>
// // // // // //                     )}
// // // // // //                     <div className="flex items-center justify-between mt-2">
// // // // // //                       <span className="text-xs text-gray-500">Qty: {getDisplayQuantity(item)}</span>
// // // // // //                       <button onClick={() => { handleRemoveFromCart(item._id); if (pharmacyCartItems.length === 1) setShowMobileCart(false); }} className="text-red-500 p-2 hover:bg-red-50 rounded transition-colors">
// // // // // //                         <FiTrash2 className="w-5 h-5" />
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
              
// // // // // //               <div className="mt-4 pt-4 border-t border-gray-200">
// // // // // //                 <div className="flex justify-between items-center mb-2">
// // // // // //                   <span className="text-gray-600">Subtotal:</span>
// // // // // //                   <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
// // // // // //                 </div>
// // // // // //                 <div className="flex justify-between items-center mb-2">
// // // // // //                   <span className="text-gray-600">Delivery:</span>
// // // // // //                   {deliveryFee === 0 ? (
// // // // // //                     <span className="text-green-600 font-medium">FREE</span>
// // // // // //                   ) : (
// // // // // //                     <span className="font-medium">Rs. {deliveryFee.toFixed(2)}</span>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //                 {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// // // // // //                   <p className="text-xs text-gray-500 mb-2">
// // // // // //                     Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} for FREE delivery
// // // // // //                   </p>
// // // // // //                 )}
// // // // // //                 <div className="flex justify-between items-center mb-4">
// // // // // //                   <span className="text-gray-600 font-bold">Total:</span>
// // // // // //                   <span className="font-bold text-lg text-[var(--primary-color)]">Rs. {finalTotal.toFixed(2)}</span>
// // // // // //                 </div>
// // // // // //                 <button onClick={() => { setShowMobileCart(false); handleCheckout(); }} className="w-full py-4 bg-[var(--primary-color)] text-white text-center rounded-lg font-medium text-lg">
// // // // // //                   Checkout
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
      
// // // // // //       {cartItemCount > 0 && <div className="lg:hidden h-20"></div>}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PharmacyDetailPage;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // // import { 
// // // // //   FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone,FiPackage,
// // // // //   FiClock, FiMinus, FiPlus, FiTrash2, FiShare2, FiTag, 
// // // // //   FiCheckCircle, FiAlertCircle, FiTruck, FiHeart
// // // // // } from 'react-icons/fi';
// // // // // import { MdLocalPharmacy, MdVerified, MdDeliveryDining } from 'react-icons/md';
// // // // // import { FaBox, FaFlask, FaPhoneAlt, FaBan, FaUser, FaUserPlus } from 'react-icons/fa';
// // // // // import { useCart } from '../../contexts/CartContext';

// // // // // // Check login function
// // // // // const checkUserLoggedIn = () => {
// // // // //   const token = localStorage.getItem("token");
// // // // //   const user = localStorage.getItem("user");
// // // // //   return !!(token && user);
// // // // // };

// // // // // // Login Popup Component with blur effect
// // // // // const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
// // // // //   if (!isOpen) return null;

// // // // //   return (
// // // // //     <div className="fixed inset-0 z-50">
// // // // //       <div 
// // // // //         className="absolute inset-0 bg-black/30 backdrop-blur-md"
// // // // //         onClick={onClose}
// // // // //       />
// // // // //       <div className="absolute inset-0 flex items-center justify-center p-4">
// // // // //         <div 
// // // // //           className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-scaleUp"
// // // // //           onClick={(e) => e.stopPropagation()}
// // // // //         >
// // // // //           <div className="p-6">
// // // // //             <div className="flex justify-between items-start mb-4">
// // // // //               <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
// // // // //               <button
// // // // //                 onClick={onClose}
// // // // //                 className="text-gray-400 hover:text-gray-600 transition"
// // // // //               >
// // // // //                 ✕
// // // // //               </button>
// // // // //             </div>
// // // // //             <p className="text-gray-600 mb-6">
// // // // //               {message || "Please login to add items to cart and place orders."}
// // // // //             </p>
// // // // //             <div className="flex gap-3 justify-end">
// // // // //               <button
// // // // //                 onClick={onClose}
// // // // //                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={onConfirm}
// // // // //                 className="px-4 py-2 text-white rounded-lg transition"
// // // // //                 style={{
// // // // //                   background: "var(--primary-color)",
// // // // //                 }}
// // // // //                 onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
// // // // //                 onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
// // // // //               >
// // // // //                 Go to Login
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const PharmacyDetailPage = () => {
// // // // //   const { id } = useParams();
// // // // //   const navigate = useNavigate();
  
// // // // //   const { 
// // // // //     cart, 
// // // // //     addToCart, 
// // // // //     removeFromCart, 
// // // // //     getPharmacyCartItems,
// // // // //     getPharmacySubtotal,
// // // // //     getDeliveryFeeForPharmacy,
// // // // //     getItemQuantity,
// // // // //     calculateItemTotal,
// // // // //     isInitialized: cartInitialized
// // // // //   } = useCart();
  
// // // // //   // Helper functions for medicine forms
// // // // //   const isTabletForm = (form) => {
// // // // //     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
// // // // //     return form && tabletForms.some(t => form.toLowerCase().includes(t));
// // // // //   };
  
// // // // //   const isSyrupForm = (form) => {
// // // // //     const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
// // // // //     return form && syrupForms.some(s => form.toLowerCase().includes(s));
// // // // //   };
  
// // // // //   // State variables
// // // // //   const [pharmacy, setPharmacy] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
// // // // //   const [medicineLoading, setMedicineLoading] = useState(false);
// // // // //   const [showMobileCart, setShowMobileCart] = useState(false);
  
// // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // // //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// // // // //   const [isInitialized, setIsInitialized] = useState(false);
// // // // //   const [showLoginPopup, setShowLoginPopup] = useState(false);
// // // // //   const [pendingAction, setPendingAction] = useState(null);
  
// // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // // // //   const [successMessage, setSuccessMessage] = useState('');
// // // // //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// // // // //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// // // // //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// // // // //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
// // // // //   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
// // // // //   const [selectedMedicine, setSelectedMedicine] = useState(null);
// // // // //   const [popupQuantity, setPopupQuantity] = useState(1);

// // // // //   const [deliveryInfo, setDeliveryInfo] = useState({
// // // // //     distance: 0,
// // // // //     estimatedTime: '15-20 min'
// // // // //   });

// // // // //   const getCurrentUser = () => {
// // // // //     try {
// // // // //       const userStr = localStorage.getItem('user');
// // // // //       if (userStr) return JSON.parse(userStr);
// // // // //     } catch (error) {
// // // // //       console.error('Error getting user:', error);
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   // Initialize authentication
// // // // //   useEffect(() => {
// // // // //     const initializeAuth = () => {
// // // // //       try {
// // // // //         const loggedIn = checkUserLoggedIn();
// // // // //         const user = getCurrentUser();
        
// // // // //         setIsLoggedIn(loggedIn);
// // // // //         setIsPharmacyUser(user?.role === 'pharmacy');
// // // // //         setIsInitialized(true);
// // // // //       } catch (error) {
// // // // //         console.error('Error initializing auth:', error);
// // // // //         setIsLoggedIn(false);
// // // // //         setIsPharmacyUser(false);
// // // // //         setIsInitialized(true);
// // // // //       }
// // // // //     };

// // // // //     initializeAuth();

// // // // //     const handleAuthChange = () => {
// // // // //       initializeAuth();
// // // // //     };

// // // // //     window.addEventListener('userChanged', handleAuthChange);
// // // // //     window.addEventListener('storage', handleAuthChange);
    
// // // // //     return () => {
// // // // //       window.removeEventListener('userChanged', handleAuthChange);
// // // // //       window.removeEventListener('storage', handleAuthChange);
// // // // //     };
// // // // //   }, []);

// // // // //   // Fetch pharmacy details
// // // // //   useEffect(() => {
// // // // //     const fetchPharmacyDetails = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
// // // // //         const data = await response.json();
        
// // // // //         if (data.success) {
// // // // //           setPharmacy(data.data);
// // // // //           if (data.data.deliveryInfo) {
// // // // //             setDeliveryInfo(prev => ({
// // // // //               ...prev,
// // // // //               distance: data.data.deliveryInfo.distance || 0,
// // // // //               estimatedTime: data.data.deliveryTime || '15-20 min'
// // // // //             }));
// // // // //           }
// // // // //         } else {
// // // // //           setError('Pharmacy not found');
// // // // //           navigate('/pharmacies');
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error('Error:', err);
// // // // //         setError('Error loading pharmacy');
// // // // //         navigate('/pharmacies');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
    
// // // // //     if (id) fetchPharmacyDetails();
// // // // //   }, [id, navigate]);

// // // // //   // Calculate distance using geolocation
// // // // //   useEffect(() => {
// // // // //     if (pharmacy?.latitude && pharmacy?.longitude && navigator.geolocation) {
// // // // //       navigator.geolocation.getCurrentPosition(
// // // // //         (position) => {
// // // // //           const distance = calculateHaversineDistance(
// // // // //             position.coords.latitude, position.coords.longitude,
// // // // //             pharmacy.latitude, pharmacy.longitude
// // // // //           );
// // // // //           setDeliveryInfo(prev => ({ ...prev, distance }));
// // // // //         },
// // // // //         (error) => console.log('Geolocation error:', error)
// // // // //       );
// // // // //     }
// // // // //   }, [pharmacy]);

// // // // //   const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
// // // // //     const R = 6371;
// // // // //     const dLat = (lat2 - lat1) * Math.PI / 180;
// // // // //     const dLon = (lon2 - lon1) * Math.PI / 180;
// // // // //     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
// // // // //               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// // // // //               Math.sin(dLon/2) * Math.sin(dLon/2);
// // // // //     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// // // // //   };

// // // // //   // Fetch medicines for this pharmacy
// // // // //   useEffect(() => {
// // // // //     const fetchMedicines = async () => {
// // // // //       if (!id || !pharmacy) return;
// // // // //       try {
// // // // //         setMedicineLoading(true);
// // // // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
// // // // //         const data = await response.json();
        
// // // // //         if (data.success) {
// // // // //           const formatted = data.data.map(med => ({
// // // // //             ...med,
// // // // //             _id: `${id}_${med._id}`,
// // // // //             id: `${id}_${med._id}`,
// // // // //             pharmacyId: id,
// // // // //             pharmacyName: pharmacy?.name,
// // // // //             tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
// // // // //             form: med.form || 'tablet',
// // // // //             stockQuantity: Math.floor(med.stockQuantity || 0),
// // // // //             volume: med.volume || '60ml',
// // // // //             inStock: med.inStock !== false && (med.stockQuantity || 0) > 0,
// // // // //             reorderLevel: med.reorderLevel || 10
// // // // //           }));
// // // // //           setPharmacyMedicines(formatted);
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error('Error fetching medicines:', err);
// // // // //       } finally {
// // // // //         setMedicineLoading(false);
// // // // //       }
// // // // //     };
    
// // // // //     fetchMedicines();
// // // // //   }, [id, pharmacy]);

// // // // //   // Cart calculations
// // // // //   const pharmacyCartItems = getPharmacyCartItems(id);
// // // // //   const subtotal = getPharmacySubtotal(id);
// // // // //   const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
// // // // //   const finalTotal = subtotal + deliveryFee;
// // // // //   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

// // // // //   const getCartQuantityForMedicine = (medicineId) => getItemQuantity(medicineId, id);
  
// // // // //   const getMaxAllowedQuantity = (medicine) => {
// // // // //     const stockQty = medicine.stockQuantity || 0;
// // // // //     if (!medicine.inStock || stockQty <= 0) return 0;
// // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // //     return Math.max(0, stockQty - currentInCart);
// // // // //   };

// // // // //   const isStockAvailable = (medicine, requestedQuantity) => requestedQuantity <= getMaxAllowedQuantity(medicine);

// // // // //   // Filter medicines based on search
// // // // //   const filteredMedicines = pharmacyMedicines.filter(medicine => 
// // // // //     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //     (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
// // // // //   );

// // // // //   const handleLoginRedirect = () => {
// // // // //     const currentPath = window.location.pathname;
// // // // //     const searchParams = window.location.search;
// // // // //     const fullUrl = `${currentPath}${searchParams}`;
// // // // //     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&pharmacyId=${id}`);
// // // // //     setShowLoginPopup(false);
// // // // //   };

// // // // //   // Add to cart handlers
// // // // //   const handleAddToCartClick = (medicine) => {
// // // // //     if (!isLoggedIn) {
// // // // //       setPendingAction({ type: 'addToCart', medicine });
// // // // //       setShowLoginPopup(true);
// // // // //       return;
// // // // //     }

// // // // //     if (isPharmacyUser) {
// // // // //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// // // // //       setShowPharmacyErrorModal(true);
// // // // //       return;
// // // // //     }

// // // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
// // // // //       setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
// // // // //       setShowSuccessModal(true);
// // // // //       return;
// // // // //     }

// // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // //     if (currentInCart >= (medicine.stockQuantity || 0)) {
// // // // //       setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
// // // // //       setShowSuccessModal(true);
// // // // //       return;
// // // // //     }

// // // // //     if (isTabletForm(medicine.form)) {
// // // // //       addToCart(medicine, id, { quantity: 1 });
// // // // //       setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
// // // // //       setShowSuccessModal(true);
// // // // //       return;
// // // // //     }

// // // // //     setSelectedMedicine(medicine);
// // // // //     setPopupQuantity(1);
// // // // //     setShowQuantityPopup(true);
// // // // //   };

// // // // //   const confirmAddToCart = () => {
// // // // //     if (selectedMedicine) {
// // // // //       if (!isStockAvailable(selectedMedicine, popupQuantity)) {
// // // // //         const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
// // // // //         setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
// // // // //         setShowSuccessModal(true);
// // // // //         setShowQuantityPopup(false);
// // // // //         setSelectedMedicine(null);
// // // // //         return;
// // // // //       }

// // // // //       addToCart(selectedMedicine, id, { quantity: popupQuantity });
// // // // //       const unitText = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// // // // //       setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart!`);
// // // // //       setShowSuccessModal(true);
// // // // //       setShowQuantityPopup(false);
// // // // //       setSelectedMedicine(null);
// // // // //     }
// // // // //   };

// // // // //   const handleRemoveFromCart = (medicineId) => removeFromCart(medicineId, id);

// // // // //   const handleCheckout = () => {
// // // // //     if (!isLoggedIn) {
// // // // //       setPendingAction('checkout');
// // // // //       setShowLoginPopup(true);
// // // // //       return;
// // // // //     }
    
// // // // //     if (pharmacyCartItems.length === 0) {
// // // // //       setShowEmptyCartModal(true);
// // // // //       return;
// // // // //     }
    
// // // // //     if (isPharmacyUser) {
// // // // //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// // // // //       setShowPharmacyErrorModal(true);
// // // // //       return;
// // // // //     }
    
// // // // //     navigate(`/booking?pharmacy=${id}`);
// // // // //   };

// // // // //   const handleShare = () => {
// // // // //     const shareUrl = window.location.href;
// // // // //     if (navigator.share) {
// // // // //       navigator.share({
// // // // //         title: pharmacy?.name || 'Pharmacy',
// // // // //         text: `Check out ${pharmacy?.name} on Pharmacy App`,
// // // // //         url: shareUrl,
// // // // //       }).catch(console.error);
// // // // //     } else {
// // // // //       navigator.clipboard.writeText(shareUrl).then(() => {
// // // // //         setShowLinkCopiedModal(true);
// // // // //         setTimeout(() => setShowLinkCopiedModal(false), 2000);
// // // // //       }).catch(console.error);
// // // // //     }
// // // // //   };

// // // // //   const handleCallPharmacy = () => setShowCallPharmacyModal(true);
// // // // //   const confirmCallPharmacy = () => {
// // // // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // // // //     window.location.href = `tel:${phoneNumber}`;
// // // // //     setShowCallPharmacyModal(false);
// // // // //   };

// // // // //   const getPerTabletPrice = (medicine) => {
// // // // //     const stripPrice = medicine.discountedPrice || medicine.price || 0;
// // // // //     const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// // // // //     return stripPrice / tabletsPerStrip;
// // // // //   };

// // // // //   const getStockStatus = (medicine) => {
// // // // //     const stockQty = medicine.stockQuantity || 0;
// // // // //     const reorderLvl = medicine.reorderLevel || 10;
// // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // //     const available = stockQty - currentInCart;
    
// // // // //     if (!medicine.inStock || stockQty <= 0) return { text: 'Out of Stock', color: 'bg-rose-100 text-rose-700' };
// // // // //     if (available <= 0) return { text: 'Max in Cart', color: 'bg-amber-100 text-amber-700' };
// // // // //     if (stockQty <= reorderLvl) return { text: `Only ${available} left`, color: 'bg-amber-100 text-amber-700' };
// // // // //     return { text: 'In Stock', color: 'bg-emerald-100 text-emerald-700' };
// // // // //   };

// // // // //   const isAddButtonDisabled = (medicine) => {
// // // // //     if (isPharmacyUser) return true;
// // // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
// // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // //     return currentInCart >= (medicine.stockQuantity || 0);
// // // // //   };

// // // // //   const getAddButtonText = (medicine) => {
// // // // //     if (isPharmacyUser) return 'Not Allowed';
// // // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
// // // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // //     if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
// // // // //     return 'Add to Cart';
// // // // //   };

// // // // //   const getItemTotalPrice = (item) => calculateItemTotal(item);
// // // // //   const getDisplayQuantity = (item) => {
// // // // //     const qty = item.quantity || 1;
// // // // //     if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
// // // // //     if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
// // // // //     return `${qty} unit${qty > 1 ? 's' : ''}`;
// // // // //   };

// // // // //   // Modal Components
// // // // //   const QuantityPopupModal = () => {
// // // // //     if (!selectedMedicine) return null;
// // // // //     const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
// // // // //     const unitLabel = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// // // // //     const price = selectedMedicine.discountedPrice || selectedMedicine.price || 0;
    
// // // // //     return (
// // // // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
// // // // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // // //           <div className="p-6">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //               <h3 className="text-xl font-bold text-gray-900">Select Quantity</h3>
// // // // //               <button onClick={() => setShowQuantityPopup(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
// // // // //             </div>
// // // // //             <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
// // // // //             {maxUnitQty <= 5 && maxUnitQty > 0 && (
// // // // //               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
// // // // //                 <p className="text-xs text-amber-700 flex items-center gap-1">
// // // // //                   <FiAlertCircle className="w-4 h-4" />
// // // // //                   Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
// // // // //                 </p>
// // // // //               </div>
// // // // //             )}
            
// // // // //             <div className="mb-6">
// // // // //               <div className="flex items-center justify-between mb-3">
// // // // //                 <span className="text-sm text-gray-600">Number of {unitLabel}s</span>
// // // // //                 <span className="text-xs text-gray-400">Max: {maxUnitQty}</span>
// // // // //               </div>
// // // // //               <div className="flex items-center justify-center gap-6">
// // // // //                 <button
// // // // //                   onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
// // // // //                   disabled={popupQuantity <= 1}
// // // // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// // // // //                 >
// // // // //                   <FiMinus size={18} />
// // // // //                 </button>
// // // // //                 <span className="w-12 text-center font-semibold text-xl">{popupQuantity}</span>
// // // // //                 <button
// // // // //                   onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
// // // // //                   disabled={popupQuantity >= maxUnitQty}
// // // // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// // // // //                 >
// // // // //                   <FiPlus size={18} />
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
// // // // //               <p className="text-sm text-gray-600 mb-1">Total Price</p>
// // // // //               <p className="text-2xl font-bold text-teal-700">Rs. {(price * popupQuantity).toFixed(2)}</p>
// // // // //             </div>
            
// // // // //             <div className="flex gap-3">
// // // // //               <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button onClick={confirmAddToCart} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// // // // //                 Add to Cart
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   const SuccessModal = () => (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
// // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // // //         <div className="p-6 text-center">
// // // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // // // //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// // // // //           </div>
// // // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
// // // // //           <p className="text-gray-600 mb-6">{successMessage}</p>
// // // // //           <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// // // // //             Continue Shopping
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );

// // // // //   const PharmacyErrorModal = () => (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
// // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // // //         <div className="p-6 text-center">
// // // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// // // // //             <FiAlertCircle className="w-8 h-8 text-amber-500" />
// // // // //           </div>
// // // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
// // // // //           <p className="text-gray-600 mb-6">{successMessage}</p>
// // // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // // //             <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // // // //               OK
// // // // //             </button>
// // // // //             <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// // // // //               Switch Account
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );

// // // // //   const EmptyCartModal = () => (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
// // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// // // // //         <div className="p-6 text-center">
// // // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// // // // //             <FiShoppingCart className="w-8 h-8 text-amber-500" />
// // // // //           </div>
// // // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
// // // // //           <p className="text-gray-600 mb-6">Add some medicines to your cart before proceeding to checkout.</p>
// // // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // // //             <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // // // //               Continue Shopping
// // // // //             </button>
// // // // //             <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// // // // //               Browse Medicines
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );

// // // // //   const CallPharmacyModal = () => {
// // // // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // // // //     return (
// // // // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
// // // // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// // // // //           <div className="p-6 text-center">
// // // // //             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
// // // // //               <FaPhoneAlt className="w-8 h-8 text-teal-600" />
// // // // //             </div>
// // // // //             <h3 className="text-xl font-bold text-gray-900 mb-2">Call Pharmacy</h3>
// // // // //             <p className="text-gray-600 mb-4">Do you want to call this pharmacy?</p>
// // // // //             <div className="bg-teal-50 rounded-xl p-4 mb-6">
// // // // //               <p className="text-lg font-semibold text-teal-700">{phoneNumber}</p>
// // // // //               <p className="text-sm text-gray-500 mt-1">{pharmacy?.name}</p>
// // // // //             </div>
// // // // //             <div className="flex flex-col sm:flex-row gap-3">
// // // // //               <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium flex items-center justify-center gap-2">
// // // // //                 <FaPhoneAlt className="w-4 h-4" /> Call Now
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   const LinkCopiedModal = () => (
// // // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
// // // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // // //         <div className="p-6 text-center">
// // // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // // // //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// // // // //           </div>
// // // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Link Copied!</h3>
// // // // //           <p className="text-gray-600">Pharmacy link has been copied to clipboard.</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );

// // // // //   // Loading state
// // // // //   if (loading || !isInitialized || !cartInitialized) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
// // // // //           <p className="mt-4 text-teal-700 font-medium">Loading pharmacy...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error || !pharmacy) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
// // // // //         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
// // // // //           <MdLocalPharmacy className="w-20 h-20 text-teal-300 mx-auto mb-4" />
// // // // //           <h3 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h3>
// // // // //           <p className="text-gray-500 mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
// // // // //           <button onClick={() => navigate('/pharmacies')} className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium">
// // // // //             Browse Pharmacies
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
// // // // //       {/* Modals */}
// // // // //       <LoginPopup
// // // // //         isOpen={showLoginPopup}
// // // // //         onClose={() => {
// // // // //           setShowLoginPopup(false);
// // // // //           setPendingAction(null);
// // // // //         }}
// // // // //         onConfirm={handleLoginRedirect}
// // // // //         message="Please login to add items to cart and place orders."
// // // // //       />
// // // // //       {showSuccessModal && <SuccessModal />}
// // // // //       {showPharmacyErrorModal && <PharmacyErrorModal />}
// // // // //       {showEmptyCartModal && <EmptyCartModal />}
// // // // //       {showCallPharmacyModal && <CallPharmacyModal />}
// // // // //       {showLinkCopiedModal && <LinkCopiedModal />}
// // // // //       {showQuantityPopup && <QuantityPopupModal />}

// // // // //       {/* Header */}
// // // // //       <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 shadow-sm">
// // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // //           <div className="flex items-center justify-between h-16">
// // // // //             <button 
// // // // //               onClick={() => navigate('/pharmacies')} 
// // // // //               className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors group"
// // // // //             >
// // // // //               <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
// // // // //               <span className="text-sm font-medium hidden sm:inline">Back to Pharmacies</span>
// // // // //             </button>
// // // // //             <div className="flex items-center gap-3">
// // // // //               <button 
// // // // //                 onClick={handleShare} 
// // // // //                 className="p-2 text-gray-500 hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50"
// // // // //               >
// // // // //                 <FiShare2 className="w-5 h-5" />
// // // // //               </button>
// // // // //               <button 
// // // // //                 onClick={() => setShowMobileCart(!showMobileCart)} 
// // // // //                 className="relative p-2 text-gray-500 hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50 lg:hidden"
// // // // //               >
// // // // //                 <FiShoppingCart className="w-5 h-5" />
// // // // //                 {cartItemCount > 0 && (
// // // // //                   <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
// // // // //                     {cartItemCount}
// // // // //                   </span>
// // // // //                 )}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* Pharmacy Info Hero - Gradient Header */}
// // // // //       <div
// // // // //         className="rounded-b-3xl p-8 shadow-xl"
// // // // //         style={{
// // // // //           background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
// // // // //           color: "var(--white)",
// // // // //         }}
// // // // //       >
// // // // //         <div className="max-w-7xl mx-auto">
// // // // //           <div className="flex flex-col sm:flex-row items-center gap-6">
// // // // //             <div className="relative group">
// // // // //               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
// // // // //               <img 
// // // // //                 src={pharmacy.image || 'https://via.placeholder.com/100'} 
// // // // //                 alt={pharmacy.name}
// // // // //                 className="relative w-24 h-24 rounded-2xl object-cover bg-white shadow-lg ring-4 ring-white/30"
// // // // //                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
// // // // //               />
// // // // //               <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
// // // // //                 <MdVerified className="w-4 h-4 text-white" />
// // // // //               </div>
// // // // //             </div>
// // // // //             <div className="flex-1 text-center sm:text-left">
// // // // //               <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{pharmacy.name}</h1>
// // // // //               <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2">
// // // // //                 <FiMapPin className="w-4 h-4" />
// // // // //                 {pharmacy.address}
// // // // //               </p>
// // // // //               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
// // // // //                 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white/20">
// // // // //                   <FiClock /> {deliveryInfo.estimatedTime}
// // // // //                 </span>
// // // // //                 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white/20">
// // // // //                   <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km away
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button 
// // // // //               onClick={handleCallPharmacy} 
// // // // //               className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium"
// // // // //             >
// // // // //               <FaPhoneAlt className="w-4 h-4" />
// // // // //               <span>Call Pharmacy</span>
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Login reminder */}
// // // // //           {!isLoggedIn && (
// // // // //             <div className="mt-6 flex justify-center">
// // // // //               <div className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-full">
// // // // //                 <span className="text-yellow-300">⚠</span>
// // // // //                 <span>Login to add items to cart and place orders</span>
// // // // //                 <button
// // // // //                   onClick={() => setShowLoginPopup(true)} 
// // // // //                   className="ml-2 px-3 py-1 text-xs bg-white/30 hover:bg-white/40 rounded-full transition"
// // // // //                 >
// // // // //                   Login
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Main Content */}
// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // //         <div className="flex flex-col lg:flex-row gap-8">
// // // // //           {/* Medicines Grid */}
// // // // //           <div className="flex-1">
// // // // //             {/* Search Bar */}
// // // // //             <div className="mt-8 mb-10 max-w-xl relative">
// // // // //               <FiSearch className="absolute left-4 top-4 text-gray-500" />
// // // // //               <input
// // // // //                 type="text"
// // // // //                 placeholder="Search medicines by name, generic name, or description"
// // // // //                 className="w-full rounded-2xl py-3.5 pl-12 pr-4 outline-none border focus:ring-2"
// // // // //                 style={{
// // // // //                   borderColor: "var(--accent-color)",
// // // // //                   background: "white",
// // // // //                 }}
// // // // //                 value={searchTerm}
// // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // //               />
// // // // //             </div>

// // // // //             {/* Results count */}
// // // // //             {!medicineLoading && filteredMedicines.length > 0 && (
// // // // //               <div className="flex items-center justify-between mb-6">
// // // // //                 <p className="text-sm text-gray-500 flex items-center gap-2">
// // // // //                   <FiPackage className="w-4 h-4" />
// // // // //                   {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
// // // // //                 </p>
// // // // //                 <div className="flex items-center gap-2 text-sm text-gray-400">
// // // // //                   <FiTag className="w-4 h-4" />
// // // // //                   <span>100% Authentic Medicines</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Medicines Grid */}
// // // // //             {medicineLoading ? (
// // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                 {[...Array(6)].map((_, i) => (
// // // // //                   <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse">
// // // // //                     <div className="h-32 bg-gray-100 rounded-xl mb-4"></div>
// // // // //                     <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
// // // // //                     <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
// // // // //                     <div className="h-8 bg-gray-100 rounded w-1/3 mb-3"></div>
// // // // //                     <div className="h-10 bg-gray-100 rounded"></div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             ) : filteredMedicines.length > 0 ? (
// // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                 {filteredMedicines.map((medicine) => {
// // // // //                   const stockStatus = getStockStatus(medicine);
// // // // //                   const isDisabled = isAddButtonDisabled(medicine);
// // // // //                   const buttonText = getAddButtonText(medicine);
// // // // //                   const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // // //                   const isTablet = isTabletForm(medicine.form);
// // // // //                   const isSyrup = isSyrupForm(medicine.form);
// // // // //                   const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// // // // //                   const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
// // // // //                   const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
                  
// // // // //                   return (
// // // // //                     <div
// // // // //                       key={medicine._id}
// // // // //                       className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
// // // // //                     >
// // // // //                       <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
// // // // //                         <img
// // // // //                           src={medicine.image}
// // // // //                           alt={medicine.name}
// // // // //                           className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
// // // // //                           onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
// // // // //                         />
// // // // //                         {hasDiscount && (
// // // // //                           <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
// // // // //                             {discountPercent}% OFF
// // // // //                           </div>
// // // // //                         )}
// // // // //                         <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
// // // // //                           {stockStatus.text}
// // // // //                         </div>
// // // // //                       </div>
                      
// // // // //                       <div className="p-5">
// // // // //                         <div className="flex items-start justify-between gap-2 mb-2">
// // // // //                           <h3 className="font-bold text-gray-800 line-clamp-1 text-lg">{medicine.name}</h3>
// // // // //                           <div className="flex items-center gap-1">
// // // // //                             {isTablet && <FaBox className="w-4 h-4 text-purple-500" />}
// // // // //                             {isSyrup && <FaFlask className="w-4 h-4 text-green-500" />}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         {medicine.genericName && (
// // // // //                           <p className="text-xs text-gray-500 mb-3 line-clamp-1">{medicine.genericName}</p>
// // // // //                         )}
                        
// // // // //                         <div className="flex items-baseline gap-2 mb-4">
// // // // //                           <span className="text-2xl font-bold text-teal-700">Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</span>
// // // // //                           {hasDiscount && (
// // // // //                             <span className="text-sm text-gray-400 line-through">Rs. {medicine.price.toFixed(2)}</span>
// // // // //                           )}
// // // // //                         </div>

// // // // //                         {/* Medicine details */}
// // // // //                         <div className="flex flex-wrap gap-2 mb-4">
// // // // //                           {isTablet && (
// // // // //                             <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full flex items-center gap-1">
// // // // //                               <FaBox className="w-3 h-3" /> {tabletsPerStrip} tabs/strip
// // // // //                             </span>
// // // // //                           )}
// // // // //                           {isSyrup && (
// // // // //                             <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1">
// // // // //                               <FaFlask className="w-3 h-3" /> {medicine.volume}
// // // // //                             </span>
// // // // //                           )}
// // // // //                           <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
// // // // //                             Stock: {medicine.stockQuantity}
// // // // //                           </span>
// // // // //                         </div>

// // // // //                         <div className="flex gap-3">
// // // // //                           <button
// // // // //                             onClick={() => handleAddToCartClick(medicine)}
// // // // //                             disabled={isDisabled}
// // // // //                             className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
// // // // //                               isDisabled 
// // // // //                                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// // // // //                                 : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow-sm hover:shadow'
// // // // //                             }`}
// // // // //                           >
// // // // //                             <FiShoppingCart className="w-4 h-4" />
// // // // //                             {buttonText}
// // // // //                           </button>
// // // // //                           <Link 
// // // // //                             to={`/medicine/${medicine._id}`} 
// // // // //                             className="px-5 py-3 rounded-xl font-medium text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
// // // // //                           >
// // // // //                             Details
// // // // //                           </Link>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
// // // // //                 <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
// // // // //                   <MdLocalPharmacy className="w-12 h-12 text-teal-300" />
// // // // //                 </div>
// // // // //                 <p className="text-gray-500 text-xl mb-2">No medicines found</p>
// // // // //                 {searchTerm && <p className="text-gray-400">Try adjusting your search term</p>}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Cart Sidebar - Desktop */}
// // // // //           <div className="hidden lg:block lg:w-96">
// // // // //             <div className="sticky top-24">
// // // // //               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
// // // // //                 <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-5">
// // // // //                   <h3 className="font-bold text-white text-xl flex items-center gap-2">
// // // // //                     <FiShoppingCart className="w-5 h-5" />
// // // // //                     Your Cart
// // // // //                     <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
// // // // //                       {pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'}
// // // // //                     </span>
// // // // //                   </h3>
// // // // //                 </div>
                
// // // // //                 <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
// // // // //                   {pharmacyCartItems.length === 0 ? (
// // // // //                     <div className="text-center py-12">
// // // // //                       <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // //                         <FiShoppingCart className="w-10 h-10 text-gray-300" />
// // // // //                       </div>
// // // // //                       <p className="text-gray-400 font-medium">Your cart is empty</p>
// // // // //                       <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <>
// // // // //                       <div className="space-y-4 mb-6">
// // // // //                         {pharmacyCartItems.map((item) => (
// // // // //                           <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
// // // // //                             <img 
// // // // //                               src={item.image || 'https://via.placeholder.com/50'} 
// // // // //                               alt={item.name} 
// // // // //                               className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
// // // // //                             />
// // // // //                             <div className="flex-1">
// // // // //                               <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
// // // // //                               <p className="text-teal-600 font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// // // // //                               {isTabletForm(item.form) && item.totalTablets && (
// // // // //                                 <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
// // // // //                               )}
// // // // //                               <div className="flex items-center justify-between mt-2">
// // // // //                                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
// // // // //                                   {getDisplayQuantity(item)}
// // // // //                                 </span>
// // // // //                                 <button 
// // // // //                                   onClick={() => handleRemoveFromCart(item._id)} 
// // // // //                                   className="text-rose-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition-colors"
// // // // //                                 >
// // // // //                                   <FiTrash2 className="w-4 h-4" />
// // // // //                                 </button>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         ))}
// // // // //                       </div>
                      
// // // // //                       <div className="border-t border-gray-100 pt-5 space-y-3">
// // // // //                         <div className="flex justify-between text-sm">
// // // // //                           <span className="text-gray-500">Subtotal</span>
// // // // //                           <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
// // // // //                         </div>
// // // // //                         <div className="flex justify-between text-sm">
// // // // //                           <span className="text-gray-500">Delivery Fee</span>
// // // // //                           {deliveryFee === 0 ? (
// // // // //                             <span className="text-emerald-600 font-semibold">FREE</span>
// // // // //                           ) : (
// // // // //                             <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
// // // // //                           )}
// // // // //                         </div>
// // // // //                         {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// // // // //                           <div className="bg-teal-50 rounded-xl p-3">
// // // // //                             <p className="text-xs text-teal-700 flex items-center gap-1">
// // // // //                               <FiTruck className="w-3 h-3" />
// // // // //                               Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
// // // // //                             </p>
// // // // //                           </div>
// // // // //                         )}
// // // // //                         <div className="flex justify-between pt-3 border-t border-gray-100">
// // // // //                           <span className="font-bold text-gray-800">Total</span>
// // // // //                           <span className="font-bold text-2xl text-teal-600">Rs. {finalTotal.toFixed(2)}</span>
// // // // //                         </div>
// // // // //                         <button 
// // // // //                           onClick={handleCheckout} 
// // // // //                           className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold text-center shadow-sm"
// // // // //                         >
// // // // //                           Proceed to Checkout
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Mobile Cart Bottom Bar */}
// // // // //       {cartItemCount > 0 && (
// // // // //         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-40">
// // // // //           <button 
// // // // //             onClick={() => setShowMobileCart(true)} 
// // // // //             className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-semibold flex items-center justify-between px-6 shadow-md"
// // // // //           >
// // // // //             <span className="flex items-center gap-2">
// // // // //               <FiShoppingCart className="w-5 h-5" />
// // // // //               View Cart ({cartItemCount} items)
// // // // //             </span>
// // // // //             <span className="font-bold text-xl">Rs. {finalTotal.toFixed(2)}</span>
// // // // //           </button>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Mobile Cart Drawer */}
// // // // //       {showMobileCart && (
// // // // //         <div className="lg:hidden fixed inset-0 z-50">
// // // // //           <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileCart(false)} />
// // // // //           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slideUp">
// // // // //             <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex justify-between items-center">
// // // // //               <h3 className="font-bold text-xl text-gray-800">Your Cart ({cartItemCount})</h3>
// // // // //               <button onClick={() => setShowMobileCart(false)} className="p-2 text-gray-400 hover:text-gray-600">
// // // // //                 <FiArrowLeft className="w-5 h-5 rotate-90" />
// // // // //               </button>
// // // // //             </div>
            
// // // // //             <div className="p-6">
// // // // //               {pharmacyCartItems.map((item) => (
// // // // //                 <div key={item._id} className="flex gap-4 py-4 border-b border-gray-100">
// // // // //                   <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
// // // // //                   <div className="flex-1">
// // // // //                     <p className="font-semibold text-gray-800">{item.name}</p>
// // // // //                     <p className="text-teal-600 font-bold">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// // // // //                     {isTabletForm(item.form) && item.totalTablets && (
// // // // //                       <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
// // // // //                     )}
// // // // //                     <div className="flex items-center justify-between mt-2">
// // // // //                       <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
// // // // //                         {getDisplayQuantity(item)}
// // // // //                       </span>
// // // // //                       <button onClick={() => handleRemoveFromCart(item._id)} className="text-rose-400 p-2 rounded-full hover:bg-rose-50">
// // // // //                         <FiTrash2 className="w-5 h-5" />
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
              
// // // // //               <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
// // // // //                 <div className="flex justify-between">
// // // // //                   <span className="text-gray-500">Subtotal</span>
// // // // //                   <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
// // // // //                 </div>
// // // // //                 <div className="flex justify-between">
// // // // //                   <span className="text-gray-500">Delivery Fee</span>
// // // // //                   {deliveryFee === 0 ? (
// // // // //                     <span className="text-emerald-600 font-semibold">FREE</span>
// // // // //                   ) : (
// // // // //                     <span className="font-semibold">Rs. {deliveryFee.toFixed(2)}</span>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// // // // //                   <div className="bg-teal-50 rounded-xl p-3">
// // // // //                     <p className="text-xs text-teal-700 flex items-center gap-1">
// // // // //                       <FiTruck className="w-3 h-3" />
// // // // //                       Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 )}
// // // // //                 <div className="flex justify-between pt-3">
// // // // //                   <span className="font-bold text-gray-800">Total</span>
// // // // //                   <span className="font-bold text-2xl text-teal-600">Rs. {finalTotal.toFixed(2)}</span>
// // // // //                 </div>
// // // // //                 <button 
// // // // //                   onClick={() => { setShowMobileCart(false); handleCheckout(); }} 
// // // // //                   className="w-full py-4 bg-teal-600 text-white rounded-xl font-semibold text-center"
// // // // //                 >
// // // // //                   Checkout
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
      
// // // // //       {/* Spacer for mobile bottom bar */}
// // // // //       {cartItemCount > 0 && <div className="lg:hidden h-24"></div>}

// // // // //       {/* CSS Animations */}
// // // // //       <style jsx>{`
// // // // //         @keyframes scaleUp {
// // // // //           from {
// // // // //             opacity: 0;
// // // // //             transform: scale(0.95);
// // // // //           }
// // // // //           to {
// // // // //             opacity: 1;
// // // // //             transform: scale(1);
// // // // //           }
// // // // //         }
// // // // //         @keyframes slideUp {
// // // // //           from {
// // // // //             transform: translateY(100%);
// // // // //           }
// // // // //           to {
// // // // //             transform: translateY(0);
// // // // //           }
// // // // //         }
// // // // //         .animate-scaleUp {
// // // // //           animation: scaleUp 0.2s ease-out;
// // // // //         }
// // // // //         .animate-slideUp {
// // // // //           animation: slideUp 0.3s ease-out;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PharmacyDetailPage;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // // import { 
// // // //   FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiPackage, FiArrowLeft, 
// // // //   FiClock, FiMinus, FiPlus, FiTrash2, FiShare2, FiTag, 
// // // //   FiCheckCircle, FiAlertCircle, FiTruck, FiHeart, FiStar
// // // // } from 'react-icons/fi';
// // // // import { MdLocalPharmacy, MdVerified, MdDeliveryDining } from 'react-icons/md';
// // // // import { FaBox, FaFlask, FaPhoneAlt, FaBan } from 'react-icons/fa';
// // // // import { useCart } from '../../contexts/CartContext';

// // // // // Check login function
// // // // const checkUserLoggedIn = () => {
// // // //   const token = localStorage.getItem("token");
// // // //   const user = localStorage.getItem("user");
// // // //   return !!(token && user);
// // // // };

// // // // // Login Popup Component with blur effect
// // // // const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
// // // //   if (!isOpen) return null;

// // // //   return (
// // // //     <div className="fixed inset-0 z-50">
// // // //       <div 
// // // //         className="absolute inset-0 bg-black/30 backdrop-blur-md"
// // // //         onClick={onClose}
// // // //       />
// // // //       <div className="absolute inset-0 flex items-center justify-center p-4">
// // // //         <div 
// // // //           className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-scaleUp"
// // // //           onClick={(e) => e.stopPropagation()}
// // // //         >
// // // //           <div className="p-6">
// // // //             <div className="flex justify-between items-start mb-4">
// // // //               <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
// // // //               <button
// // // //                 onClick={onClose}
// // // //                 className="text-gray-400 hover:text-gray-600 transition"
// // // //               >
// // // //                 ✕
// // // //               </button>
// // // //             </div>
// // // //             <p className="text-gray-600 mb-6">
// // // //               {message || "Please login to add items to cart and place orders."}
// // // //             </p>
// // // //             <div className="flex gap-3 justify-end">
// // // //               <button
// // // //                 onClick={onClose}
// // // //                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={onConfirm}
// // // //                 className="px-4 py-2 text-white rounded-lg transition"
// // // //                 style={{
// // // //                   background: "var(--primary-color)",
// // // //                 }}
// // // //                 onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
// // // //                 onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
// // // //               >
// // // //                 Go to Login
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const PharmacyDetailPage = () => {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();
  
// // // //   const { 
// // // //     addToCart, 
// // // //     removeFromCart, 
// // // //     getPharmacyCartItems,
// // // //     getPharmacySubtotal,
// // // //     getDeliveryFeeForPharmacy,
// // // //     getItemQuantity,
// // // //     calculateItemTotal,
// // // //     isInitialized: cartInitialized
// // // //   } = useCart();
  
// // // //   // Helper functions for medicine forms
// // // //   const isTabletForm = (form) => {
// // // //     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
// // // //     return form && tabletForms.some(t => form.toLowerCase().includes(t));
// // // //   };
  
// // // //   const isSyrupForm = (form) => {
// // // //     const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
// // // //     return form && syrupForms.some(s => form.toLowerCase().includes(s));
// // // //   };
  
// // // //   // State variables
// // // //   const [pharmacy, setPharmacy] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
// // // //   const [medicineLoading, setMedicineLoading] = useState(false);
// // // //   const [showCart, setShowCart] = useState(false);
  
// // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// // // //   const [isInitialized, setIsInitialized] = useState(false);
// // // //   const [showLoginPopup, setShowLoginPopup] = useState(false);
  
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // // //   const [successMessage, setSuccessMessage] = useState('');
// // // //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// // // //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// // // //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// // // //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
// // // //   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
// // // //   const [selectedMedicine, setSelectedMedicine] = useState(null);
// // // //   const [popupQuantity, setPopupQuantity] = useState(1);

// // // //   const [deliveryInfo, setDeliveryInfo] = useState({
// // // //     distance: 0,
// // // //     estimatedTime: '15-20 min'
// // // //   });

// // // //   const getCurrentUser = () => {
// // // //     try {
// // // //       const userStr = localStorage.getItem('user');
// // // //       if (userStr) return JSON.parse(userStr);
// // // //     } catch (error) {
// // // //       console.error('Error getting user:', error);
// // // //     }
// // // //     return null;
// // // //   };

// // // //   // Initialize authentication
// // // //   useEffect(() => {
// // // //     const initializeAuth = () => {
// // // //       try {
// // // //         const loggedIn = checkUserLoggedIn();
// // // //         const user = getCurrentUser();
        
// // // //         setIsLoggedIn(loggedIn);
// // // //         setIsPharmacyUser(user?.role === 'pharmacy');
// // // //         setIsInitialized(true);
// // // //       } catch (error) {
// // // //         console.error('Error initializing auth:', error);
// // // //         setIsLoggedIn(false);
// // // //         setIsPharmacyUser(false);
// // // //         setIsInitialized(true);
// // // //       }
// // // //     };

// // // //     initializeAuth();
// // // //     window.addEventListener('userChanged', initializeAuth);
// // // //     window.addEventListener('storage', initializeAuth);
    
// // // //     return () => {
// // // //       window.removeEventListener('userChanged', initializeAuth);
// // // //       window.removeEventListener('storage', initializeAuth);
// // // //     };
// // // //   }, []);

// // // //   // Fetch pharmacy details
// // // //   useEffect(() => {
// // // //     const fetchPharmacyDetails = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
// // // //         const data = await response.json();
        
// // // //         if (data.success) {
// // // //           setPharmacy(data.data);
// // // //           if (data.data.deliveryInfo) {
// // // //             setDeliveryInfo(prev => ({
// // // //               ...prev,
// // // //               distance: data.data.deliveryInfo.distance || 0,
// // // //               estimatedTime: data.data.deliveryTime || '15-20 min'
// // // //             }));
// // // //           }
// // // //         } else {
// // // //           setError('Pharmacy not found');
// // // //           navigate('/pharmacies');
// // // //         }
// // // //       } catch (err) {
// // // //         console.error('Error:', err);
// // // //         setError('Error loading pharmacy');
// // // //         navigate('/pharmacies');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
    
// // // //     if (id) fetchPharmacyDetails();
// // // //   }, [id, navigate]);

// // // //   // Calculate distance using geolocation
// // // //   useEffect(() => {
// // // //     if (pharmacy?.latitude && pharmacy?.longitude && navigator.geolocation) {
// // // //       navigator.geolocation.getCurrentPosition(
// // // //         (position) => {
// // // //           const distance = calculateHaversineDistance(
// // // //             position.coords.latitude, position.coords.longitude,
// // // //             pharmacy.latitude, pharmacy.longitude
// // // //           );
// // // //           setDeliveryInfo(prev => ({ ...prev, distance }));
// // // //         },
// // // //         (error) => console.log('Geolocation error:', error)
// // // //       );
// // // //     }
// // // //   }, [pharmacy]);

// // // //   const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
// // // //     const R = 6371;
// // // //     const dLat = (lat2 - lat1) * Math.PI / 180;
// // // //     const dLon = (lon2 - lon1) * Math.PI / 180;
// // // //     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
// // // //               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// // // //               Math.sin(dLon/2) * Math.sin(dLon/2);
// // // //     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// // // //   };

// // // //   // Fetch medicines for this pharmacy
// // // //   useEffect(() => {
// // // //     const fetchMedicines = async () => {
// // // //       if (!id || !pharmacy) return;
// // // //       try {
// // // //         setMedicineLoading(true);
// // // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
// // // //         const data = await response.json();
        
// // // //         if (data.success) {
// // // //           const formatted = data.data.map(med => ({
// // // //             ...med,
// // // //             _id: `${id}_${med._id}`,
// // // //             id: `${id}_${med._id}`,
// // // //             pharmacyId: id,
// // // //             pharmacyName: pharmacy?.name,
// // // //             tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
// // // //             form: med.form || 'tablet',
// // // //             stockQuantity: Math.floor(med.stockQuantity || 0),
// // // //             volume: med.volume || '60ml',
// // // //             inStock: med.inStock !== false && (med.stockQuantity || 0) > 0,
// // // //             reorderLevel: med.reorderLevel || 10
// // // //           }));
// // // //           setPharmacyMedicines(formatted);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error('Error fetching medicines:', err);
// // // //       } finally {
// // // //         setMedicineLoading(false);
// // // //       }
// // // //     };
    
// // // //     fetchMedicines();
// // // //   }, [id, pharmacy]);

// // // //   // Cart calculations
// // // //   const pharmacyCartItems = getPharmacyCartItems(id);
// // // //   const subtotal = getPharmacySubtotal(id);
// // // //   const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
// // // //   const finalTotal = subtotal + deliveryFee;
// // // //   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

// // // //   const getCartQuantityForMedicine = (medicineId) => getItemQuantity(medicineId, id);
  
// // // //   const getMaxAllowedQuantity = (medicine) => {
// // // //     const stockQty = medicine.stockQuantity || 0;
// // // //     if (!medicine.inStock || stockQty <= 0) return 0;
// // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // //     return Math.max(0, stockQty - currentInCart);
// // // //   };

// // // //   const isStockAvailable = (medicine, requestedQuantity) => requestedQuantity <= getMaxAllowedQuantity(medicine);

// // // //   // Filter medicines based on search
// // // //   const filteredMedicines = pharmacyMedicines.filter(medicine => 
// // // //     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
// // // //   );

// // // //   const handleLoginRedirect = () => {
// // // //     const currentPath = window.location.pathname;
// // // //     const searchParams = window.location.search;
// // // //     const fullUrl = `${currentPath}${searchParams}`;
// // // //     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&pharmacyId=${id}`);
// // // //     setShowLoginPopup(false);
// // // //   };

// // // //   // Add to cart handlers
// // // //   const handleAddToCartClick = (medicine) => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginPopup(true);
// // // //       return;
// // // //     }

// // // //     if (isPharmacyUser) {
// // // //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// // // //       setShowPharmacyErrorModal(true);
// // // //       return;
// // // //     }

// // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
// // // //       setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
// // // //       setShowSuccessModal(true);
// // // //       return;
// // // //     }

// // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // //     if (currentInCart >= (medicine.stockQuantity || 0)) {
// // // //       setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
// // // //       setShowSuccessModal(true);
// // // //       return;
// // // //     }

// // // //     if (isTabletForm(medicine.form)) {
// // // //       addToCart(medicine, id, { quantity: 1 });
// // // //       setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
// // // //       setShowSuccessModal(true);
// // // //       return;
// // // //     }

// // // //     setSelectedMedicine(medicine);
// // // //     setPopupQuantity(1);
// // // //     setShowQuantityPopup(true);
// // // //   };

// // // //   const confirmAddToCart = () => {
// // // //     if (selectedMedicine) {
// // // //       if (!isStockAvailable(selectedMedicine, popupQuantity)) {
// // // //         const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
// // // //         setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
// // // //         setShowSuccessModal(true);
// // // //         setShowQuantityPopup(false);
// // // //         setSelectedMedicine(null);
// // // //         return;
// // // //       }

// // // //       addToCart(selectedMedicine, id, { quantity: popupQuantity });
// // // //       const unitText = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// // // //       setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart!`);
// // // //       setShowSuccessModal(true);
// // // //       setShowQuantityPopup(false);
// // // //       setSelectedMedicine(null);
// // // //     }
// // // //   };

// // // //   const handleRemoveFromCart = (medicineId) => removeFromCart(medicineId, id);

// // // //   const handleCheckout = () => {
// // // //     if (!isLoggedIn) {
// // // //       setShowLoginPopup(true);
// // // //       return;
// // // //     }
    
// // // //     if (pharmacyCartItems.length === 0) {
// // // //       setShowEmptyCartModal(true);
// // // //       return;
// // // //     }
    
// // // //     if (isPharmacyUser) {
// // // //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// // // //       setShowPharmacyErrorModal(true);
// // // //       return;
// // // //     }
    
// // // //     navigate(`/booking?pharmacy=${id}`);
// // // //   };

// // // //   const handleShare = () => {
// // // //     const shareUrl = window.location.href;
// // // //     if (navigator.share) {
// // // //       navigator.share({
// // // //         title: pharmacy?.name || 'Pharmacy',
// // // //         text: `Check out ${pharmacy?.name} on Pharmacy App`,
// // // //         url: shareUrl,
// // // //       }).catch(console.error);
// // // //     } else {
// // // //       navigator.clipboard.writeText(shareUrl).then(() => {
// // // //         setShowLinkCopiedModal(true);
// // // //         setTimeout(() => setShowLinkCopiedModal(false), 2000);
// // // //       }).catch(console.error);
// // // //     }
// // // //   };

// // // //   const handleCallPharmacy = () => setShowCallPharmacyModal(true);
// // // //   const confirmCallPharmacy = () => {
// // // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // // //     window.location.href = `tel:${phoneNumber}`;
// // // //     setShowCallPharmacyModal(false);
// // // //   };

// // // //   const getPerTabletPrice = (medicine) => {
// // // //     const stripPrice = medicine.discountedPrice || medicine.price || 0;
// // // //     const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// // // //     return stripPrice / tabletsPerStrip;
// // // //   };

// // // //   const getStockStatus = (medicine) => {
// // // //     const stockQty = medicine.stockQuantity || 0;
// // // //     const reorderLvl = medicine.reorderLevel || 10;
// // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // //     const available = stockQty - currentInCart;
    
// // // //     if (!medicine.inStock || stockQty <= 0) return { text: 'Out of Stock', color: 'bg-rose-100 text-rose-700' };
// // // //     if (available <= 0) return { text: 'Max in Cart', color: 'bg-amber-100 text-amber-700' };
// // // //     if (stockQty <= reorderLvl) return { text: `Only ${available} left`, color: 'bg-amber-100 text-amber-700' };
// // // //     return { text: 'In Stock', color: 'bg-emerald-100 text-emerald-700' };
// // // //   };

// // // //   const isAddButtonDisabled = (medicine) => {
// // // //     if (isPharmacyUser) return true;
// // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
// // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // //     return currentInCart >= (medicine.stockQuantity || 0);
// // // //   };

// // // //   const getAddButtonText = (medicine) => {
// // // //     if (isPharmacyUser) return 'Not Allowed';
// // // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
// // // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // //     if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
// // // //     return 'Add to Cart';
// // // //   };

// // // //   const getItemTotalPrice = (item) => calculateItemTotal(item);
// // // //   const getDisplayQuantity = (item) => {
// // // //     const qty = item.quantity || 1;
// // // //     if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
// // // //     if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
// // // //     return `${qty} unit${qty > 1 ? 's' : ''}`;
// // // //   };

// // // //   // Modal Components
// // // //   const QuantityPopupModal = () => {
// // // //     if (!selectedMedicine) return null;
// // // //     const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
// // // //     const unitLabel = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// // // //     const price = selectedMedicine.discountedPrice || selectedMedicine.price || 0;
    
// // // //     return (
// // // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
// // // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // //           <div className="p-6">
// // // //             <div className="flex justify-between items-center mb-4">
// // // //               <h3 className="text-xl font-bold text-gray-900">Select Quantity</h3>
// // // //               <button onClick={() => setShowQuantityPopup(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
// // // //             </div>
// // // //             <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
// // // //             {maxUnitQty <= 5 && maxUnitQty > 0 && (
// // // //               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
// // // //                 <p className="text-xs text-amber-700 flex items-center gap-1">
// // // //                   <FiAlertCircle className="w-4 h-4" />
// // // //                   Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
// // // //                 </p>
// // // //               </div>
// // // //             )}
            
// // // //             <div className="mb-6">
// // // //               <div className="flex items-center justify-between mb-3">
// // // //                 <span className="text-sm text-gray-600">Number of {unitLabel}s</span>
// // // //                 <span className="text-xs text-gray-400">Max: {maxUnitQty}</span>
// // // //               </div>
// // // //               <div className="flex items-center justify-center gap-6">
// // // //                 <button
// // // //                   onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
// // // //                   disabled={popupQuantity <= 1}
// // // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// // // //                 >
// // // //                   <FiMinus size={18} />
// // // //                 </button>
// // // //                 <span className="w-12 text-center font-semibold text-xl">{popupQuantity}</span>
// // // //                 <button
// // // //                   onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
// // // //                   disabled={popupQuantity >= maxUnitQty}
// // // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// // // //                 >
// // // //                   <FiPlus size={18} />
// // // //                 </button>
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
// // // //               <p className="text-sm text-gray-600 mb-1">Total Price</p>
// // // //               <p className="text-2xl font-bold text-teal-700">Rs. {(price * popupQuantity).toFixed(2)}</p>
// // // //             </div>
            
// // // //             <div className="flex gap-3">
// // // //               <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
// // // //                 Cancel
// // // //               </button>
// // // //               <button onClick={confirmAddToCart} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// // // //                 Add to Cart
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const SuccessModal = () => (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
// // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // //         <div className="p-6 text-center">
// // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // // //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// // // //           </div>
// // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
// // // //           <p className="text-gray-600 mb-6">{successMessage}</p>
// // // //           <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// // // //             Continue Shopping
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   const PharmacyErrorModal = () => (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
// // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // //         <div className="p-6 text-center">
// // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// // // //             <FiAlertCircle className="w-8 h-8 text-amber-500" />
// // // //           </div>
// // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
// // // //           <p className="text-gray-600 mb-6">{successMessage}</p>
// // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // //             <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // // //               OK
// // // //             </button>
// // // //             <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// // // //               Switch Account
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   const EmptyCartModal = () => (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
// // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// // // //         <div className="p-6 text-center">
// // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// // // //             <FiShoppingCart className="w-8 h-8 text-amber-500" />
// // // //           </div>
// // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
// // // //           <p className="text-gray-600 mb-6">Add some medicines to your cart before proceeding to checkout.</p>
// // // //           <div className="flex flex-col sm:flex-row gap-3">
// // // //             <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // // //               Continue Shopping
// // // //             </button>
// // // //             <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// // // //               Browse Medicines
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   const CallPharmacyModal = () => {
// // // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // // //     return (
// // // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
// // // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// // // //           <div className="p-6 text-center">
// // // //             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
// // // //               <FaPhoneAlt className="w-8 h-8 text-teal-600" />
// // // //             </div>
// // // //             <h3 className="text-xl font-bold text-gray-900 mb-2">Call Pharmacy</h3>
// // // //             <p className="text-gray-600 mb-4">Do you want to call this pharmacy?</p>
// // // //             <div className="bg-teal-50 rounded-xl p-4 mb-6">
// // // //               <p className="text-lg font-semibold text-teal-700">{phoneNumber}</p>
// // // //               <p className="text-sm text-gray-500 mt-1">{pharmacy?.name}</p>
// // // //             </div>
// // // //             <div className="flex flex-col sm:flex-row gap-3">
// // // //               <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // // //                 Cancel
// // // //               </button>
// // // //               <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium flex items-center justify-center gap-2">
// // // //                 <FaPhoneAlt className="w-4 h-4" /> Call Now
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   const LinkCopiedModal = () => (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
// // // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // // //         <div className="p-6 text-center">
// // // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // // //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// // // //           </div>
// // // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Link Copied!</h3>
// // // //           <p className="text-gray-600">Pharmacy link has been copied to clipboard.</p>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   // Loading state
// // // //   if (loading || !isInitialized || !cartInitialized) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
// // // //           <p className="mt-4 text-teal-700 font-medium">Loading pharmacy...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error || !pharmacy) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
// // // //         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
// // // //           <MdLocalPharmacy className="w-20 h-20 text-teal-300 mx-auto mb-4" />
// // // //           <h3 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h3>
// // // //           <p className="text-gray-500 mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
// // // //           <button onClick={() => navigate('/pharmacies')} className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium">
// // // //             Browse Pharmacies
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
// // // //       {/* Modals */}
// // // //       <LoginPopup
// // // //         isOpen={showLoginPopup}
// // // //         onClose={() => setShowLoginPopup(false)}
// // // //         onConfirm={handleLoginRedirect}
// // // //         message="Please login to add items to cart and place orders."
// // // //       />
// // // //       {showSuccessModal && <SuccessModal />}
// // // //       {showPharmacyErrorModal && <PharmacyErrorModal />}
// // // //       {showEmptyCartModal && <EmptyCartModal />}
// // // //       {showCallPharmacyModal && <CallPharmacyModal />}
// // // //       {showLinkCopiedModal && <LinkCopiedModal />}
// // // //       {showQuantityPopup && <QuantityPopupModal />}

// // // //       {/* Header - Only Cart Icon */}
// // // //       <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 shadow-sm">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //           <div className="flex items-center justify-end h-16">
// // // //             <div className="flex items-center gap-3">
// // // //               <button 
// // // //                 onClick={handleShare} 
// // // //                 className="p-2 text-gray-500 hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50"
// // // //               >
// // // //                 <FiShare2 className="w-5 h-5" />
// // // //               </button>
// // // //               <button 
// // // //                 onClick={() => setShowCart(true)} 
// // // //                 className="relative p-2 text-gray-500 hover:text-teal-600 transition-colors rounded-full hover:bg-teal-50"
// // // //               >
// // // //                 <FiShoppingCart className="w-5 h-5" />
// // // //                 {cartItemCount > 0 && (
// // // //                   <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
// // // //                     {cartItemCount}
// // // //                   </span>
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Pharmacy Info Hero - Gradient Header */}
// // // //       <div
// // // //         className="rounded-b-3xl p-8 shadow-xl"
// // // //         style={{
// // // //           background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
// // // //           color: "var(--white)",
// // // //         }}
// // // //       >
// // // //         <div className="max-w-7xl mx-auto">
// // // //           <div className="flex flex-col sm:flex-row items-center gap-6">
// // // //             <div className="relative group">
// // // //               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
// // // //               <img 
// // // //                 src={pharmacy.image || 'https://via.placeholder.com/100'} 
// // // //                 alt={pharmacy.name}
// // // //                 className="relative w-24 h-24 rounded-2xl object-cover bg-white shadow-lg ring-4 ring-white/30"
// // // //                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
// // // //               />
// // // //               <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
// // // //                 <MdVerified className="w-4 h-4 text-white" />
// // // //               </div>
// // // //             </div>
// // // //             <div className="flex-1 text-center sm:text-left">
// // // //               <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
// // // //                 <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{pharmacy.name}</h1>
// // // //                 <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-sm">
// // // //                   <FiStar className="w-3 h-3 fill-current" />
// // // //                   <span>4.8</span>
// // // //                 </div>
// // // //               </div>
// // // //               <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2">
// // // //                 <FiMapPin className="w-4 h-4" />
// // // //                 {pharmacy.address}
// // // //               </p>
// // // //               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
// // // //                 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white/20">
// // // //                   <FiClock /> {deliveryInfo.estimatedTime}
// // // //                 </span>
// // // //                 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white/20">
// // // //                   <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km away
// // // //                 </span>
// // // //                 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm bg-white/20">
// // // //                   <FiTag /> {pharmacy.discount || 10}% off on all medicines
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //             <button 
// // // //               onClick={handleCallPharmacy} 
// // // //               className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium"
// // // //             >
// // // //               <FaPhoneAlt className="w-4 h-4" />
// // // //               <span>Call</span>
// // // //             </button>
// // // //           </div>

// // // //           {/* Login reminder */}
// // // //           {!isLoggedIn && (
// // // //             <div className="mt-6 flex justify-center">
// // // //               <div className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-full">
// // // //                 <span className="text-yellow-300">⚠</span>
// // // //                 <span>Login to add items to cart</span>
// // // //                 <button
// // // //                   onClick={() => setShowLoginPopup(true)} 
// // // //                   className="ml-2 px-3 py-1 text-xs bg-white/30 hover:bg-white/40 rounded-full transition"
// // // //                 >
// // // //                   Login
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         {/* Search Bar */}
// // // //         <div className="mb-10 max-w-xl mx-auto relative">
// // // //           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search medicines by name, generic name, or description..."
// // // //             className="w-full rounded-2xl py-4 pl-12 pr-4 outline-none border focus:ring-2 focus:ring-teal-300 transition-shadow bg-white"
// // // //             style={{
// // // //               borderColor: "var(--accent-color)",
// // // //             }}
// // // //             value={searchTerm}
// // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // //           />
// // // //         </div>

// // // //         {/* Results count */}
// // // //         {!medicineLoading && filteredMedicines.length > 0 && (
// // // //           <div className="flex items-center justify-between mb-6">
// // // //             <p className="text-sm text-gray-500 flex items-center gap-2">
// // // //               <FiPackage className="w-4 h-4" />
// // // //               {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
// // // //             </p>
// // // //             <div className="flex items-center gap-2 text-sm text-gray-400">
// // // //               <FiTag className="w-4 h-4" />
// // // //               <span>100% Authentic</span>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Medicines Grid - Beautiful Cards */}
// // // //         {medicineLoading ? (
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //             {[...Array(8)].map((_, i) => (
// // // //               <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse">
// // // //                 <div className="h-36 bg-gray-100 rounded-xl mb-4"></div>
// // // //                 <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
// // // //                 <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
// // // //                 <div className="h-8 bg-gray-100 rounded w-1/3 mb-3"></div>
// // // //                 <div className="h-10 bg-gray-100 rounded"></div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ) : filteredMedicines.length > 0 ? (
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //             {filteredMedicines.map((medicine) => {
// // // //               const stockStatus = getStockStatus(medicine);
// // // //               const isDisabled = isAddButtonDisabled(medicine);
// // // //               const buttonText = getAddButtonText(medicine);
// // // //               const currentInCart = getCartQuantityForMedicine(medicine._id);
// // // //               const isTablet = isTabletForm(medicine.form);
// // // //               const isSyrup = isSyrupForm(medicine.form);
// // // //               const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// // // //               const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
// // // //               const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
              
// // // //               return (
// // // //                 <div
// // // //                   key={medicine._id}
// // // //                   className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
// // // //                 >
// // // //                   {/* Image Section */}
// // // //                   <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
// // // //                     <img
// // // //                       src={medicine.image}
// // // //                       alt={medicine.name}
// // // //                       className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
// // // //                       onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
// // // //                     />
// // // //                     {hasDiscount && (
// // // //                       <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
// // // //                         {discountPercent}% OFF
// // // //                       </div>
// // // //                     )}
// // // //                     <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
// // // //                       {stockStatus.text}
// // // //                     </div>
// // // //                     {/* Medicine Form Badge */}
// // // //                     <div className="absolute bottom-3 right-3">
// // // //                       {isTablet && (
// // // //                         <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
// // // //                           <FaBox className="w-3 h-3" /> Tablet
// // // //                         </div>
// // // //                       )}
// // // //                       {isSyrup && (
// // // //                         <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
// // // //                           <FaFlask className="w-3 h-3" /> Syrup
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   {/* Content Section */}
// // // //                   <div className="p-4">
// // // //                     <h3 className="font-bold text-gray-800 line-clamp-1 text-base">{medicine.name}</h3>
// // // //                     {medicine.genericName && (
// // // //                       <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{medicine.genericName}</p>
// // // //                     )}
                    
// // // //                     {/* Description */}
// // // //                     <p className="text-xs text-gray-400 mt-2 line-clamp-2">{medicine.description}</p>
                    
// // // //                     {/* Price Section */}
// // // //                     <div className="mt-3 flex items-baseline gap-2">
// // // //                       <span className="text-xl font-bold text-teal-700">Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</span>
// // // //                       {hasDiscount && (
// // // //                         <span className="text-xs text-gray-400 line-through">Rs. {medicine.price.toFixed(2)}</span>
// // // //                       )}
// // // //                     </div>

// // // //                     {/* Medicine Details Chips */}
// // // //                     <div className="flex flex-wrap gap-1.5 mt-3">
// // // //                       {isTablet && (
// // // //                         <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
// // // //                           {tabletsPerStrip} tabs/strip
// // // //                         </span>
// // // //                       )}
// // // //                       {isSyrup && (
// // // //                         <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
// // // //                           {medicine.volume}
// // // //                         </span>
// // // //                       )}
// // // //                       <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
// // // //                         Stock: {medicine.stockQuantity}
// // // //                       </span>
// // // //                     </div>
                    
// // // //                     {/* Action Buttons */}
// // // //                     <div className="flex gap-2 mt-4">
// // // //                       <button
// // // //                         onClick={() => handleAddToCartClick(medicine)}
// // // //                         disabled={isDisabled}
// // // //                         className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
// // // //                           isDisabled 
// // // //                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// // // //                             : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow-sm hover:shadow'
// // // //                         }`}
// // // //                       >
// // // //                         <FiShoppingCart className="w-4 h-4" />
// // // //                         {buttonText}
// // // //                       </button>
// // // //                       <Link 
// // // //                         to={`/medicine/${medicine._id}`} 
// // // //                         className="px-4 py-2.5 rounded-xl font-medium text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
// // // //                       >
// // // //                         Details
// // // //                       </Link>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         ) : (
// // // //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
// // // //             <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
// // // //               <MdLocalPharmacy className="w-12 h-12 text-teal-300" />
// // // //             </div>
// // // //             <p className="text-gray-500 text-xl mb-2">No medicines found</p>
// // // //             {searchTerm && <p className="text-gray-400">Try adjusting your search term</p>}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* Cart Sidebar Drawer */}
// // // //       {showCart && (
// // // //         <div className="fixed inset-0 z-50">
// // // //           <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
// // // //           <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slideInRight">
// // // //             <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex justify-between items-center">
// // // //               <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
// // // //                 <FiShoppingCart className="w-5 h-5 text-teal-600" />
// // // //                 Your Cart
// // // //                 <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-sm font-normal">
// // // //                   {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
// // // //                 </span>
// // // //               </h3>
// // // //               <button onClick={() => setShowCart(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
// // // //                 ✕
// // // //               </button>
// // // //             </div>
            
// // // //             <div className="p-6">
// // // //               {pharmacyCartItems.length === 0 ? (
// // // //                 <div className="text-center py-12">
// // // //                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //                     <FiShoppingCart className="w-10 h-10 text-gray-300" />
// // // //                   </div>
// // // //                   <p className="text-gray-400 font-medium">Your cart is empty</p>
// // // //                   <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
// // // //                 </div>
// // // //               ) : (
// // // //                 <>
// // // //                   <div className="space-y-4 mb-6">
// // // //                     {pharmacyCartItems.map((item) => (
// // // //                       <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
// // // //                         <img 
// // // //                           src={item.image || 'https://via.placeholder.com/50'} 
// // // //                           alt={item.name} 
// // // //                           className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
// // // //                         />
// // // //                         <div className="flex-1">
// // // //                           <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
// // // //                           <p className="text-teal-600 font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// // // //                           {isTabletForm(item.form) && item.totalTablets && (
// // // //                             <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
// // // //                           )}
// // // //                           <div className="flex items-center justify-between mt-2">
// // // //                             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
// // // //                               {getDisplayQuantity(item)}
// // // //                             </span>
// // // //                             <button 
// // // //                               onClick={() => handleRemoveFromCart(item._id)} 
// // // //                               className="text-rose-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition-colors"
// // // //                             >
// // // //                               <FiTrash2 className="w-4 h-4" />
// // // //                             </button>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
                  
// // // //                   <div className="border-t border-gray-100 pt-5 space-y-3">
// // // //                     <div className="flex justify-between text-sm">
// // // //                       <span className="text-gray-500">Subtotal</span>
// // // //                       <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between text-sm">
// // // //                       <span className="text-gray-500">Delivery Fee</span>
// // // //                       {deliveryFee === 0 ? (
// // // //                         <span className="text-emerald-600 font-semibold">FREE</span>
// // // //                       ) : (
// // // //                         <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
// // // //                       )}
// // // //                     </div>
// // // //                     {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// // // //                       <div className="bg-teal-50 rounded-xl p-3">
// // // //                         <p className="text-xs text-teal-700 flex items-center gap-1">
// // // //                           <FiTruck className="w-3 h-3" />
// // // //                           Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
// // // //                         </p>
// // // //                       </div>
// // // //                     )}
// // // //                     <div className="flex justify-between pt-3 border-t border-gray-100">
// // // //                       <span className="font-bold text-gray-800">Total</span>
// // // //                       <span className="font-bold text-2xl text-teal-600">Rs. {finalTotal.toFixed(2)}</span>
// // // //                     </div>
// // // //                     <button 
// // // //                       onClick={() => { setShowCart(false); handleCheckout(); }} 
// // // //                       className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold text-center"
// // // //                     >
// // // //                       Proceed to Checkout
// // // //                     </button>
// // // //                   </div>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* CSS Animations */}
// // // //       <style jsx>{`
// // // //         @keyframes scaleUp {
// // // //           from {
// // // //             opacity: 0;
// // // //             transform: scale(0.95);
// // // //           }
// // // //           to {
// // // //             opacity: 1;
// // // //             transform: scale(1);
// // // //           }
// // // //         }
// // // //         @keyframes slideInRight {
// // // //           from {
// // // //             transform: translateX(100%);
// // // //           }
// // // //           to {
// // // //             transform: translateX(0);
// // // //           }
// // // //         }
// // // //         .animate-scaleUp {
// // // //           animation: scaleUp 0.2s ease-out;
// // // //         }
// // // //         .animate-slideInRight {
// // // //           animation: slideInRight 0.3s ease-out;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PharmacyDetailPage;

// // // import React, { useState, useEffect } from 'react';
// // // import { Link, useParams, useNavigate } from 'react-router-dom';
// // // import { 
// // //   FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiPackage,
// // //   FiClock, FiMinus, FiPlus, FiTrash2, FiShare2, FiTag, 
// // //   FiCheckCircle, FiAlertCircle, FiTruck, FiStar, FiX
// // // } from 'react-icons/fi';
// // // import { MdLocalPharmacy, MdVerified, MdDeliveryDining } from 'react-icons/md';
// // // import { FaBox, FaFlask, FaPhoneAlt, FaMinus, FaPlus } from 'react-icons/fa';
// // // import { useCart } from '../../contexts/CartContext';

// // // // Check login function
// // // const checkUserLoggedIn = () => {
// // //   const token = localStorage.getItem("token");
// // //   const user = localStorage.getItem("user");
// // //   return !!(token && user);
// // // };

// // // // Login Popup Component with blur effect
// // // const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="fixed inset-0 z-50">
// // //       <div 
// // //         className="absolute inset-0 bg-black/30 backdrop-blur-md"
// // //         onClick={onClose}
// // //       />
// // //       <div className="absolute inset-0 flex items-center justify-center p-4">
// // //         <div 
// // //           className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-scaleUp"
// // //           onClick={(e) => e.stopPropagation()}
// // //         >
// // //           <div className="p-6">
// // //             <div className="flex justify-between items-start mb-4">
// // //               <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
// // //               <button
// // //                 onClick={onClose}
// // //                 className="text-gray-400 hover:text-gray-600 transition"
// // //               >
// // //                 <FiX size={20} />
// // //               </button>
// // //             </div>
// // //             <p className="text-gray-600 mb-6">
// // //               {message || "Please login to add items to cart and place orders."}
// // //             </p>
// // //             <div className="flex gap-3 justify-end">
// // //               <button
// // //                 onClick={onClose}
// // //                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={onConfirm}
// // //                 className="px-4 py-2 text-white rounded-lg transition"
// // //                 style={{
// // //                   background: "var(--primary-color)",
// // //                 }}
// // //                 onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
// // //                 onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
// // //               >
// // //                 Go to Login
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const PharmacyDetailPage = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
  
// // //   const { 
// // //     addToCart, 
// // //     removeFromCart, 
// // //     updateQuantity,
// // //     getPharmacyCartItems,
// // //     getPharmacySubtotal,
// // //     getDeliveryFeeForPharmacy,
// // //     getItemQuantity,
// // //     calculateItemTotal,
// // //     isInitialized: cartInitialized
// // //   } = useCart();
  
// // //   // Helper functions for medicine forms
// // //   const isTabletForm = (form) => {
// // //     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
// // //     return form && tabletForms.some(t => form.toLowerCase().includes(t));
// // //   };
  
// // //   const isSyrupForm = (form) => {
// // //     const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
// // //     return form && syrupForms.some(s => form.toLowerCase().includes(s));
// // //   };
  
// // //   // State variables
// // //   const [pharmacy, setPharmacy] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
// // //   const [medicineLoading, setMedicineLoading] = useState(false);
// // //   const [showCart, setShowCart] = useState(false);
  
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// // //   const [isInitialized, setIsInitialized] = useState(false);
// // //   const [showLoginPopup, setShowLoginPopup] = useState(false);
  
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// // //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// // //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// // //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
// // //   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
// // //   const [selectedMedicine, setSelectedMedicine] = useState(null);
// // //   const [popupQuantity, setPopupQuantity] = useState(1);

// // //   const [deliveryInfo, setDeliveryInfo] = useState({
// // //     distance: 0,
// // //     estimatedTime: '15-20 min'
// // //   });

// // //   const getCurrentUser = () => {
// // //     try {
// // //       const userStr = localStorage.getItem('user');
// // //       if (userStr) return JSON.parse(userStr);
// // //     } catch (error) {
// // //       console.error('Error getting user:', error);
// // //     }
// // //     return null;
// // //   };

// // //   // Initialize authentication
// // //   useEffect(() => {
// // //     const initializeAuth = () => {
// // //       try {
// // //         const loggedIn = checkUserLoggedIn();
// // //         const user = getCurrentUser();
        
// // //         setIsLoggedIn(loggedIn);
// // //         setIsPharmacyUser(user?.role === 'pharmacy');
// // //         setIsInitialized(true);
// // //       } catch (error) {
// // //         console.error('Error initializing auth:', error);
// // //         setIsLoggedIn(false);
// // //         setIsPharmacyUser(false);
// // //         setIsInitialized(true);
// // //       }
// // //     };

// // //     initializeAuth();
// // //     window.addEventListener('userChanged', initializeAuth);
// // //     window.addEventListener('storage', initializeAuth);
    
// // //     return () => {
// // //       window.removeEventListener('userChanged', initializeAuth);
// // //       window.removeEventListener('storage', initializeAuth);
// // //     };
// // //   }, []);

// // //   // Fetch pharmacy details
// // //   useEffect(() => {
// // //     const fetchPharmacyDetails = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
// // //         const data = await response.json();
        
// // //         if (data.success) {
// // //           setPharmacy(data.data);
// // //           if (data.data.deliveryInfo) {
// // //             setDeliveryInfo(prev => ({
// // //               ...prev,
// // //               distance: data.data.deliveryInfo.distance || 0,
// // //               estimatedTime: data.data.deliveryTime || '15-20 min'
// // //             }));
// // //           }
// // //         } else {
// // //           setError('Pharmacy not found');
// // //           navigate('/pharmacies');
// // //         }
// // //       } catch (err) {
// // //         console.error('Error:', err);
// // //         setError('Error loading pharmacy');
// // //         navigate('/pharmacies');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
    
// // //     if (id) fetchPharmacyDetails();
// // //   }, [id, navigate]);

// // //   // Calculate distance using geolocation
// // //   useEffect(() => {
// // //     if (pharmacy?.latitude && pharmacy?.longitude && navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         (position) => {
// // //           const distance = calculateHaversineDistance(
// // //             position.coords.latitude, position.coords.longitude,
// // //             pharmacy.latitude, pharmacy.longitude
// // //           );
// // //           setDeliveryInfo(prev => ({ ...prev, distance }));
// // //         },
// // //         (error) => console.log('Geolocation error:', error)
// // //       );
// // //     }
// // //   }, [pharmacy]);

// // //   const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
// // //     const R = 6371;
// // //     const dLat = (lat2 - lat1) * Math.PI / 180;
// // //     const dLon = (lon2 - lon1) * Math.PI / 180;
// // //     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
// // //               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// // //               Math.sin(dLon/2) * Math.sin(dLon/2);
// // //     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// // //   };

// // //   // Fetch medicines for this pharmacy
// // //   useEffect(() => {
// // //     const fetchMedicines = async () => {
// // //       if (!id || !pharmacy) return;
// // //       try {
// // //         setMedicineLoading(true);
// // //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
// // //         const data = await response.json();
        
// // //         if (data.success) {
// // //           const formatted = data.data.map(med => ({
// // //             ...med,
// // //             _id: `${id}_${med._id}`,
// // //             id: `${id}_${med._id}`,
// // //             pharmacyId: id,
// // //             pharmacyName: pharmacy?.name,
// // //             tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
// // //             form: med.form || 'tablet',
// // //             stockQuantity: Math.floor(med.stockQuantity || 0),
// // //             volume: med.volume || '60ml',
// // //             inStock: med.inStock !== false && (med.stockQuantity || 0) > 0,
// // //             reorderLevel: med.reorderLevel || 10
// // //           }));
// // //           setPharmacyMedicines(formatted);
// // //         }
// // //       } catch (err) {
// // //         console.error('Error fetching medicines:', err);
// // //       } finally {
// // //         setMedicineLoading(false);
// // //       }
// // //     };
    
// // //     fetchMedicines();
// // //   }, [id, pharmacy]);

// // //   // Cart calculations
// // //   const pharmacyCartItems = getPharmacyCartItems(id);
// // //   const subtotal = getPharmacySubtotal(id);
// // //   const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
// // //   const finalTotal = subtotal + deliveryFee;
// // //   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

// // //   const getCartQuantityForMedicine = (medicineId) => getItemQuantity(medicineId, id);
  
// // //   const getMaxAllowedQuantity = (medicine) => {
// // //     const stockQty = medicine.stockQuantity || 0;
// // //     if (!medicine.inStock || stockQty <= 0) return 0;
// // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // //     return Math.max(0, stockQty - currentInCart);
// // //   };

// // //   const isStockAvailable = (medicine, requestedQuantity) => requestedQuantity <= getMaxAllowedQuantity(medicine);

// // //   // Filter medicines based on search
// // //   const filteredMedicines = pharmacyMedicines.filter(medicine => 
// // //     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
// // //   );

// // //   const handleLoginRedirect = () => {
// // //     const currentPath = window.location.pathname;
// // //     const searchParams = window.location.search;
// // //     const fullUrl = `${currentPath}${searchParams}`;
// // //     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&pharmacyId=${id}`);
// // //     setShowLoginPopup(false);
// // //   };

// // //   // Add to cart handlers
// // //   const handleAddToCartClick = (medicine) => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginPopup(true);
// // //       return;
// // //     }

// // //     if (isPharmacyUser) {
// // //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// // //       setShowPharmacyErrorModal(true);
// // //       return;
// // //     }

// // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
// // //       setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
// // //       setShowSuccessModal(true);
// // //       return;
// // //     }

// // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // //     if (currentInCart >= (medicine.stockQuantity || 0)) {
// // //       setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
// // //       setShowSuccessModal(true);
// // //       return;
// // //     }

// // //     if (isTabletForm(medicine.form)) {
// // //       addToCart(medicine, id, { quantity: 1 });
// // //       setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
// // //       setShowSuccessModal(true);
// // //       return;
// // //     }

// // //     setSelectedMedicine(medicine);
// // //     setPopupQuantity(1);
// // //     setShowQuantityPopup(true);
// // //   };

// // //   const confirmAddToCart = () => {
// // //     if (selectedMedicine) {
// // //       if (!isStockAvailable(selectedMedicine, popupQuantity)) {
// // //         const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
// // //         setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
// // //         setShowSuccessModal(true);
// // //         setShowQuantityPopup(false);
// // //         setSelectedMedicine(null);
// // //         return;
// // //       }

// // //       addToCart(selectedMedicine, id, { quantity: popupQuantity });
// // //       const unitText = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// // //       setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart!`);
// // //       setShowSuccessModal(true);
// // //       setShowQuantityPopup(false);
// // //       setSelectedMedicine(null);
// // //     }
// // //   };

// // //   const handleUpdateQuantity = (medicineId, newQuantity) => {
// // //     const medicine = pharmacyCartItems.find(item => item._id === medicineId);
// // //     if (medicine) {
// // //       const maxStock = medicine.stockQuantity || 0;
// // //       if (newQuantity > maxStock) {
// // //         setSuccessMessage(`Cannot exceed available stock of ${maxStock} units.`);
// // //         setShowSuccessModal(true);
// // //         return;
// // //       }
// // //       if (newQuantity < 1) {
// // //         removeFromCart(medicineId, id);
// // //       } else {
// // //         updateQuantity(medicineId, id, newQuantity);
// // //       }
// // //     }
// // //   };

// // //   const handleRemoveFromCart = (medicineId) => removeFromCart(medicineId, id);

// // //   const handleCheckout = () => {
// // //     if (!isLoggedIn) {
// // //       setShowLoginPopup(true);
// // //       return;
// // //     }
    
// // //     if (pharmacyCartItems.length === 0) {
// // //       setShowEmptyCartModal(true);
// // //       return;
// // //     }
    
// // //     if (isPharmacyUser) {
// // //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// // //       setShowPharmacyErrorModal(true);
// // //       return;
// // //     }
    
// // //     navigate(`/booking?pharmacy=${id}`);
// // //   };

// // //   const handleShare = () => {
// // //     const shareUrl = window.location.href;
// // //     if (navigator.share) {
// // //       navigator.share({
// // //         title: pharmacy?.name || 'Pharmacy',
// // //         text: `Check out ${pharmacy?.name} on Pharmacy App`,
// // //         url: shareUrl,
// // //       }).catch(console.error);
// // //     } else {
// // //       navigator.clipboard.writeText(shareUrl).then(() => {
// // //         setShowLinkCopiedModal(true);
// // //         setTimeout(() => setShowLinkCopiedModal(false), 2000);
// // //       }).catch(console.error);
// // //     }
// // //   };

// // //   const handleCallPharmacy = () => setShowCallPharmacyModal(true);
// // //   const confirmCallPharmacy = () => {
// // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // //     window.location.href = `tel:${phoneNumber}`;
// // //     setShowCallPharmacyModal(false);
// // //   };

// // //   const getPerTabletPrice = (medicine) => {
// // //     const stripPrice = medicine.discountedPrice || medicine.price || 0;
// // //     const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// // //     return stripPrice / tabletsPerStrip;
// // //   };

// // //   const getStockStatus = (medicine) => {
// // //     const stockQty = medicine.stockQuantity || 0;
// // //     const reorderLvl = medicine.reorderLevel || 10;
// // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // //     const available = stockQty - currentInCart;
    
// // //     if (!medicine.inStock || stockQty <= 0) return { text: 'Out of Stock', color: 'bg-rose-100 text-rose-700' };
// // //     if (available <= 0) return { text: 'Max in Cart', color: 'bg-amber-100 text-amber-700' };
// // //     if (stockQty <= reorderLvl) return { text: `Only ${available} left`, color: 'bg-amber-100 text-amber-700' };
// // //     return { text: 'In Stock', color: 'bg-emerald-100 text-emerald-700' };
// // //   };

// // //   const isAddButtonDisabled = (medicine) => {
// // //     if (isPharmacyUser) return true;
// // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
// // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // //     return currentInCart >= (medicine.stockQuantity || 0);
// // //   };

// // //   const getAddButtonText = (medicine) => {
// // //     if (isPharmacyUser) return 'Not Allowed';
// // //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
// // //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// // //     if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
// // //     return 'Add to Cart';
// // //   };

// // //   const getItemTotalPrice = (item) => calculateItemTotal(item);
// // //   const getDisplayQuantity = (item) => {
// // //     const qty = item.quantity || 1;
// // //     if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
// // //     if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
// // //     return `${qty} unit${qty > 1 ? 's' : ''}`;
// // //   };

// // //   // Modal Components
// // //   const QuantityPopupModal = () => {
// // //     if (!selectedMedicine) return null;
// // //     const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
// // //     const unitLabel = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// // //     const price = selectedMedicine.discountedPrice || selectedMedicine.price || 0;
    
// // //     return (
// // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
// // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // //           <div className="p-6">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h3 className="text-xl font-bold text-gray-900">Select Quantity</h3>
// // //               <button onClick={() => setShowQuantityPopup(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
// // //             </div>
// // //             <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
// // //             {maxUnitQty <= 5 && maxUnitQty > 0 && (
// // //               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
// // //                 <p className="text-xs text-amber-700 flex items-center gap-1">
// // //                   <FiAlertCircle className="w-4 h-4" />
// // //                   Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
// // //                 </p>
// // //               </div>
// // //             )}
            
// // //             <div className="mb-6">
// // //               <div className="flex items-center justify-between mb-3">
// // //                 <span className="text-sm text-gray-600">Number of {unitLabel}s</span>
// // //                 <span className="text-xs text-gray-400">Max: {maxUnitQty}</span>
// // //               </div>
// // //               <div className="flex items-center justify-center gap-6">
// // //                 <button
// // //                   onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
// // //                   disabled={popupQuantity <= 1}
// // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// // //                 >
// // //                   <FiMinus size={18} />
// // //                 </button>
// // //                 <span className="w-12 text-center font-semibold text-xl">{popupQuantity}</span>
// // //                 <button
// // //                   onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
// // //                   disabled={popupQuantity >= maxUnitQty}
// // //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// // //                 >
// // //                   <FiPlus size={18} />
// // //                 </button>
// // //               </div>
// // //             </div>
            
// // //             <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
// // //               <p className="text-sm text-gray-600 mb-1">Total Price</p>
// // //               <p className="text-2xl font-bold text-teal-700">Rs. {(price * popupQuantity).toFixed(2)}</p>
// // //             </div>
            
// // //             <div className="flex gap-3">
// // //               <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
// // //                 Cancel
// // //               </button>
// // //               <button onClick={confirmAddToCart} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// // //                 Add to Cart
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   const SuccessModal = () => (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
// // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // //         <div className="p-6 text-center">
// // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// // //           </div>
// // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
// // //           <p className="text-gray-600 mb-6">{successMessage}</p>
// // //           <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// // //             Continue Shopping
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   const PharmacyErrorModal = () => (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
// // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // //         <div className="p-6 text-center">
// // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// // //             <FiAlertCircle className="w-8 h-8 text-amber-500" />
// // //           </div>
// // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
// // //           <p className="text-gray-600 mb-6">{successMessage}</p>
// // //           <div className="flex flex-col sm:flex-row gap-3">
// // //             <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // //               OK
// // //             </button>
// // //             <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// // //               Switch Account
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   const EmptyCartModal = () => (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
// // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// // //         <div className="p-6 text-center">
// // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// // //             <FiShoppingCart className="w-8 h-8 text-amber-500" />
// // //           </div>
// // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
// // //           <p className="text-gray-600 mb-6">Add some medicines to your cart before proceeding to checkout.</p>
// // //           <div className="flex flex-col sm:flex-row gap-3">
// // //             <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // //               Continue Shopping
// // //             </button>
// // //             <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// // //               Browse Medicines
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   const CallPharmacyModal = () => {
// // //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// // //     return (
// // //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
// // //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// // //           <div className="p-6 text-center">
// // //             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
// // //               <FaPhoneAlt className="w-8 h-8 text-teal-600" />
// // //             </div>
// // //             <h3 className="text-xl font-bold text-gray-900 mb-2">Call Pharmacy</h3>
// // //             <p className="text-gray-600 mb-4">Do you want to call this pharmacy?</p>
// // //             <div className="bg-teal-50 rounded-xl p-4 mb-6">
// // //               <p className="text-lg font-semibold text-teal-700">{phoneNumber}</p>
// // //               <p className="text-sm text-gray-500 mt-1">{pharmacy?.name}</p>
// // //             </div>
// // //             <div className="flex flex-col sm:flex-row gap-3">
// // //               <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// // //                 Cancel
// // //               </button>
// // //               <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium flex items-center justify-center gap-2">
// // //                 <FaPhoneAlt className="w-4 h-4" /> Call Now
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   const LinkCopiedModal = () => (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
// // //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// // //         <div className="p-6 text-center">
// // //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// // //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// // //           </div>
// // //           <h3 className="text-xl font-bold text-gray-900 mb-2">Link Copied!</h3>
// // //           <p className="text-gray-600">Pharmacy link has been copied to clipboard.</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   // Loading state
// // //   if (loading || !isInitialized || !cartInitialized) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
// // //           <p className="mt-4 text-teal-700 font-medium">Loading pharmacy...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !pharmacy) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
// // //         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
// // //           <MdLocalPharmacy className="w-20 h-20 text-teal-300 mx-auto mb-4" />
// // //           <h3 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h3>
// // //           <p className="text-gray-500 mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
// // //           <button onClick={() => navigate('/pharmacies')} className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium">
// // //             Browse Pharmacies
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
// // //       {/* Modals */}
// // //       <LoginPopup
// // //         isOpen={showLoginPopup}
// // //         onClose={() => setShowLoginPopup(false)}
// // //         onConfirm={handleLoginRedirect}
// // //         message="Please login to add items to cart and place orders."
// // //       />
// // //       {showSuccessModal && <SuccessModal />}
// // //       {showPharmacyErrorModal && <PharmacyErrorModal />}
// // //       {showEmptyCartModal && <EmptyCartModal />}
// // //       {showCallPharmacyModal && <CallPharmacyModal />}
// // //       {showLinkCopiedModal && <LinkCopiedModal />}
// // //       {showQuantityPopup && <QuantityPopupModal />}

// // //       {/* Pharmacy Info Hero - Gradient Header with Buttons */}
// // //       <div
// // //         className="rounded-b-3xl p-6 sm:p-8 shadow-xl"
// // //         style={{
// // //           background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
// // //           color: "var(--white)",
// // //         }}
// // //       >
// // //         <div className="max-w-7xl mx-auto">
// // //           {/* Top Row with Share and Cart Buttons */}
// // //           <div className="flex justify-end items-center gap-3 mb-4">
// // //             <button 
// // //               onClick={handleShare} 
// // //               className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
// // //               title="Share Pharmacy"
// // //             >
// // //               <FiShare2 className="w-5 h-5" />
// // //             </button>
// // //             <button 
// // //               onClick={() => setShowCart(true)} 
// // //               className="relative p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
// // //               title="View Cart"
// // //             >
// // //               <FiShoppingCart className="w-5 h-5" />
// // //               {cartItemCount > 0 && (
// // //                 <span className="absolute -top-1 -right-1 bg-amber-400 text-teal-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
// // //                   {cartItemCount}
// // //                 </span>
// // //               )}
// // //             </button>
// // //           </div>

// // //           {/* Pharmacy Info */}
// // //           <div className="flex flex-col sm:flex-row items-center gap-6">
// // //             <div className="relative group">
// // //               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
// // //               <img 
// // //                 src={pharmacy.image || 'https://via.placeholder.com/100'} 
// // //                 alt={pharmacy.name}
// // //                 className="relative w-24 h-24 rounded-2xl object-cover bg-white shadow-lg ring-4 ring-white/30"
// // //                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
// // //               />
// // //               <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
// // //                 <MdVerified className="w-4 h-4 text-white" />
// // //               </div>
// // //             </div>
// // //             <div className="flex-1 text-center sm:text-left">
// // //               <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
// // //                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{pharmacy.name}</h1>
// // //                 <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-sm">
// // //                   <FiStar className="w-3 h-3 fill-current" />
// // //                   <span>4.8</span>
// // //                 </div>
// // //               </div>
// // //               <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm">
// // //                 <FiMapPin className="w-4 h-4" />
// // //                 {pharmacy.address}
// // //               </p>
// // //               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
// // //                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
// // //                   <FiClock /> {deliveryInfo.estimatedTime}
// // //                 </span>
// // //                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
// // //                   <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km
// // //                 </span>
// // //                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
// // //                   <FiTag /> {pharmacy.discount || 10}% off
// // //                 </span>
// // //               </div>
// // //             </div>
// // //             <button 
// // //               onClick={handleCallPharmacy} 
// // //               className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium text-sm"
// // //             >
// // //               <FaPhoneAlt className="w-4 h-4" />
// // //               <span>Call</span>
// // //             </button>
// // //           </div>

// // //           {/* Login reminder */}
// // //           {!isLoggedIn && (
// // //             <div className="mt-5 flex justify-center">
// // //               <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/20 px-3 py-1.5 rounded-full">
// // //                 <span className="text-yellow-300">⚠</span>
// // //                 <span>Login to add items to cart</span>
// // //                 <button
// // //                   onClick={() => setShowLoginPopup(true)} 
// // //                   className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded-full transition"
// // //                 >
// // //                   Login
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {/* Search Bar */}
// // //         <div className="mb-10 max-w-xl mx-auto relative">
// // //           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //           <input
// // //             type="text"
// // //             placeholder="Search medicines by name, generic name, or description..."
// // //             className="w-full rounded-2xl py-4 pl-12 pr-4 outline-none border focus:ring-2 focus:ring-teal-300 transition-shadow bg-white"
// // //             style={{
// // //               borderColor: "var(--accent-color)",
// // //             }}
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //         </div>

// // //         {/* Results count */}
// // //         {!medicineLoading && filteredMedicines.length > 0 && (
// // //           <div className="flex items-center justify-between mb-6">
// // //             <p className="text-sm text-gray-500 flex items-center gap-2">
// // //               <FiPackage className="w-4 h-4" />
// // //               {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
// // //             </p>
// // //             <div className="flex items-center gap-2 text-sm text-gray-400">
// // //               <FiTag className="w-4 h-4" />
// // //               <span>100% Authentic</span>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Medicines Grid - 3-4 cards per row responsive */}
// // //         {medicineLoading ? (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
// // //             {[...Array(8)].map((_, i) => (
// // //               <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
// // //                 <div className="h-32 bg-gray-100 rounded-lg mb-4"></div>
// // //                 <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
// // //                 <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
// // //                 <div className="h-8 bg-gray-100 rounded w-1/3 mb-3"></div>
// // //                 <div className="h-10 bg-gray-100 rounded"></div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ) : filteredMedicines.length > 0 ? (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
// // //             {filteredMedicines.map((medicine) => {
// // //               const stockStatus = getStockStatus(medicine);
// // //               const isDisabled = isAddButtonDisabled(medicine);
// // //               const buttonText = getAddButtonText(medicine);
// // //               const currentInCart = getCartQuantityForMedicine(medicine._id);
// // //               const isTablet = isTabletForm(medicine.form);
// // //               const isSyrup = isSyrupForm(medicine.form);
// // //               const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// // //               const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
// // //               const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
              
// // //               return (
// // //                 <div
// // //                   key={medicine._id}
// // //                   className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
// // //                 >
// // //                   {/* Image Section */}
// // //                   <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3">
// // //                     <img
// // //                       src={medicine.image}
// // //                       alt={medicine.name}
// // //                       className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
// // //                       onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
// // //                     />
// // //                     {hasDiscount && (
// // //                       <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
// // //                         {discountPercent}% OFF
// // //                       </div>
// // //                     )}
// // //                     <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
// // //                       {stockStatus.text}
// // //                     </div>
// // //                     {/* Medicine Form Badge */}
// // //                     <div className="absolute bottom-2 right-2">
// // //                       {isTablet && (
// // //                         <div className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
// // //                           <FaBox className="w-3 h-3" /> Tablet
// // //                         </div>
// // //                       )}
// // //                       {isSyrup && (
// // //                         <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
// // //                           <FaFlask className="w-3 h-3" /> Syrup
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>
                  
// // //                   {/* Content Section */}
// // //                   <div className="p-3">
// // //                     <h3 className="font-bold text-gray-800 line-clamp-1 text-sm">{medicine.name}</h3>
// // //                     {medicine.genericName && (
// // //                       <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{medicine.genericName}</p>
// // //                     )}
                    
// // //                     {/* Description */}
// // //                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">{medicine.description}</p>
                    
// // //                     {/* Price Section */}
// // //                     <div className="mt-2 flex items-baseline gap-2">
// // //                       <span className="text-lg font-bold text-teal-700">Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</span>
// // //                       {hasDiscount && (
// // //                         <span className="text-xs text-gray-400 line-through">Rs. {medicine.price.toFixed(2)}</span>
// // //                       )}
// // //                     </div>

// // //                     {/* Medicine Details Chips */}
// // //                     <div className="flex flex-wrap gap-1 mt-2">
// // //                       {isTablet && (
// // //                         <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
// // //                           {tabletsPerStrip} tabs/strip
// // //                         </span>
// // //                       )}
// // //                       {isSyrup && (
// // //                         <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
// // //                           {medicine.volume}
// // //                         </span>
// // //                       )}
// // //                       <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
// // //                         Stock: {medicine.stockQuantity}
// // //                       </span>
// // //                     </div>
                    
// // //                     {/* Action Buttons */}
// // //                     <div className="flex gap-2 mt-3">
// // //                       <button
// // //                         onClick={() => handleAddToCartClick(medicine)}
// // //                         disabled={isDisabled}
// // //                         className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
// // //                           isDisabled 
// // //                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// // //                             : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow-sm hover:shadow'
// // //                         }`}
// // //                       >
// // //                         <FiShoppingCart className="w-3.5 h-3.5" />
// // //                         {buttonText}
// // //                       </button>
// // //                       <Link 
// // //                         to={`/medicine/${medicine._id}`} 
// // //                         className="px-3 py-2 rounded-lg font-medium text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
// // //                       >
// // //                         Details
// // //                       </Link>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         ) : (
// // //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
// // //             <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <MdLocalPharmacy className="w-10 h-10 text-teal-300" />
// // //             </div>
// // //             <p className="text-gray-500 text-lg mb-2">No medicines found</p>
// // //             {searchTerm && <p className="text-gray-400">Try adjusting your search term</p>}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Cart Sidebar Drawer with Quantity Controls */}
// // //       {showCart && (
// // //         <div className="fixed inset-0 z-50">
// // //           <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
// // //           <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slideInRight">
// // //             <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center">
// // //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// // //                 <FiShoppingCart className="w-5 h-5 text-teal-600" />
// // //                 Your Cart
// // //                 <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-normal">
// // //                   {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
// // //                 </span>
// // //               </h3>
// // //               <button onClick={() => setShowCart(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
// // //                 <FiX size={20} />
// // //               </button>
// // //             </div>
            
// // //             <div className="p-5">
// // //               {pharmacyCartItems.length === 0 ? (
// // //                 <div className="text-center py-12">
// // //                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                     <FiShoppingCart className="w-10 h-10 text-gray-300" />
// // //                   </div>
// // //                   <p className="text-gray-400 font-medium">Your cart is empty</p>
// // //                   <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
// // //                 </div>
// // //               ) : (
// // //                 <>
// // //                   <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
// // //                     {pharmacyCartItems.map((item) => {
// // //                       const currentQty = item.quantity || 1;
// // //                       const maxStock = item.stockQuantity || 0;
// // //                       return (
// // //                         <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
// // //                           <img 
// // //                             src={item.image || 'https://via.placeholder.com/50'} 
// // //                             alt={item.name} 
// // //                             className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
// // //                           />
// // //                           <div className="flex-1">
// // //                             <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
// // //                             <p className="text-teal-600 font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// // //                             {isTabletForm(item.form) && item.totalTablets && (
// // //                               <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
// // //                             )}
                            
// // //                             {/* Quantity Controls */}
// // //                             <div className="flex items-center justify-between mt-2">
// // //                               <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
// // //                                 <button
// // //                                   onClick={() => handleUpdateQuantity(item._id, currentQty - 1)}
// // //                                   className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors"
// // //                                   disabled={currentQty <= 1}
// // //                                 >
// // //                                   <FaMinus className="w-3 h-3 text-gray-600" />
// // //                                 </button>
// // //                                 <span className="text-sm font-medium text-gray-700 min-w-[30px] text-center">
// // //                                   {currentQty}
// // //                                 </span>
// // //                                 <button
// // //                                   onClick={() => handleUpdateQuantity(item._id, currentQty + 1)}
// // //                                   className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors"
// // //                                   disabled={currentQty >= maxStock}
// // //                                 >
// // //                                   <FaPlus className="w-3 h-3 text-gray-600" />
// // //                                 </button>
// // //                               </div>
// // //                               <button 
// // //                                 onClick={() => handleRemoveFromCart(item._id)} 
// // //                                 className="text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
// // //                               >
// // //                                 <FiTrash2 className="w-4 h-4" />
// // //                               </button>
// // //                             </div>
// // //                             {currentQty >= maxStock && (
// // //                               <p className="text-xs text-amber-600 mt-1">Max stock reached</p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       );
// // //                     })}
// // //                   </div>
                  
// // //                   <div className="border-t border-gray-100 pt-4 space-y-3">
// // //                     <div className="flex justify-between text-sm">
// // //                       <span className="text-gray-500">Subtotal</span>
// // //                       <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
// // //                     </div>
// // //                     <div className="flex justify-between text-sm">
// // //                       <span className="text-gray-500">Delivery Fee</span>
// // //                       {deliveryFee === 0 ? (
// // //                         <span className="text-emerald-600 font-semibold">FREE</span>
// // //                       ) : (
// // //                         <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
// // //                       )}
// // //                     </div>
// // //                     {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// // //                       <div className="bg-teal-50 rounded-lg p-2">
// // //                         <p className="text-xs text-teal-700 flex items-center gap-1">
// // //                           <FiTruck className="w-3 h-3" />
// // //                           Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
// // //                         </p>
// // //                       </div>
// // //                     )}
// // //                     <div className="flex justify-between pt-2 border-t border-gray-100">
// // //                       <span className="font-bold text-gray-800">Total</span>
// // //                       <span className="font-bold text-xl text-teal-600">Rs. {finalTotal.toFixed(2)}</span>
// // //                     </div>
// // //                     <button 
// // //                       onClick={() => { setShowCart(false); handleCheckout(); }} 
// // //                       className="w-full py-3.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold text-center"
// // //                     >
// // //                       Proceed to Checkout
// // //                     </button>
// // //                   </div>
// // //                 </>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* CSS Animations */}
// // //       <style jsx>{`
// // //         @keyframes scaleUp {
// // //           from {
// // //             opacity: 0;
// // //             transform: scale(0.95);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: scale(1);
// // //           }
// // //         }
// // //         @keyframes slideInRight {
// // //           from {
// // //             transform: translateX(100%);
// // //           }
// // //           to {
// // //             transform: translateX(0);
// // //           }
// // //         }
// // //         .animate-scaleUp {
// // //           animation: scaleUp 0.2s ease-out;
// // //         }
// // //         .animate-slideInRight {
// // //           animation: slideInRight 0.3s ease-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default PharmacyDetailPage;


// // import React, { useState, useEffect } from 'react';
// // import { Link, useParams, useNavigate } from 'react-router-dom';
// // import { 
// //   FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiPackage,
// //   FiClock, FiMinus, FiPlus, FiTrash2, FiShare2, FiTag, 
// //   FiCheckCircle, FiAlertCircle, FiTruck, FiStar, FiX
// // } from 'react-icons/fi';
// // import { MdLocalPharmacy, MdVerified, MdDeliveryDining } from 'react-icons/md';
// // import { FaBox, FaFlask, FaPhoneAlt, FaMinus, FaPlus } from 'react-icons/fa';
// // import { useCart } from '../../contexts/CartContext';

// // // Check login function
// // const checkUserLoggedIn = () => {
// //   const token = localStorage.getItem("token");
// //   const user = localStorage.getItem("user");
// //   return !!(token && user);
// // };

// // // Login Popup Component with blur effect
// // const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50">
// //       <div 
// //         className="absolute inset-0 bg-black/30 backdrop-blur-md"
// //         onClick={onClose}
// //       />
// //       <div className="absolute inset-0 flex items-center justify-center p-4">
// //         <div 
// //           className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-scaleUp"
// //           onClick={(e) => e.stopPropagation()}
// //         >
// //           <div className="p-6">
// //             <div className="flex justify-between items-start mb-4">
// //               <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
// //               <button
// //                 onClick={onClose}
// //                 className="text-gray-400 hover:text-gray-600 transition"
// //               >
// //                 <FiX size={20} />
// //               </button>
// //             </div>
// //             <p className="text-gray-600 mb-6">
// //               {message || "Please login to add items to cart and place orders."}
// //             </p>
// //             <div className="flex gap-3 justify-end">
// //               <button
// //                 onClick={onClose}
// //                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={onConfirm}
// //                 className="px-4 py-2 text-white rounded-lg transition"
// //                 style={{
// //                   background: "var(--primary-color)",
// //                 }}
// //                 onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
// //                 onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
// //               >
// //                 Go to Login
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const PharmacyDetailPage = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
  
// //   const { 
// //     cart,
// //     setCart,
// //     addToCart, 
// //     removeFromCart, 
// //     getPharmacyCartItems,
// //     getPharmacySubtotal,
// //     getDeliveryFeeForPharmacy,
// //     getItemQuantity,
// //     calculateItemTotal,
// //     isInitialized: cartInitialized
// //   } = useCart();
  
// //   // Helper functions for medicine forms
// //   const isTabletForm = (form) => {
// //     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
// //     return form && tabletForms.some(t => form.toLowerCase().includes(t));
// //   };
  
// //   const isSyrupForm = (form) => {
// //     const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
// //     return form && syrupForms.some(s => form.toLowerCase().includes(s));
// //   };
  
// //   // State variables
// //   const [pharmacy, setPharmacy] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
// //   const [medicineLoading, setMedicineLoading] = useState(false);
// //   const [showCart, setShowCart] = useState(false);
  
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
// //   const [isInitialized, setIsInitialized] = useState(false);
// //   const [showLoginPopup, setShowLoginPopup] = useState(false);
  
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
// //   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
// //   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
// //   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
// //   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
// //   const [selectedMedicine, setSelectedMedicine] = useState(null);
// //   const [popupQuantity, setPopupQuantity] = useState(1);

// //   const [deliveryInfo, setDeliveryInfo] = useState({
// //     distance: 0,
// //     estimatedTime: '15-20 min'
// //   });

// //   const getCurrentUser = () => {
// //     try {
// //       const userStr = localStorage.getItem('user');
// //       if (userStr) return JSON.parse(userStr);
// //     } catch (error) {
// //       console.error('Error getting user:', error);
// //     }
// //     return null;
// //   };

// //   // Initialize authentication
// //   useEffect(() => {
// //     const initializeAuth = () => {
// //       try {
// //         const loggedIn = checkUserLoggedIn();
// //         const user = getCurrentUser();
        
// //         setIsLoggedIn(loggedIn);
// //         setIsPharmacyUser(user?.role === 'pharmacy');
// //         setIsInitialized(true);
// //       } catch (error) {
// //         console.error('Error initializing auth:', error);
// //         setIsLoggedIn(false);
// //         setIsPharmacyUser(false);
// //         setIsInitialized(true);
// //       }
// //     };

// //     initializeAuth();
// //     window.addEventListener('userChanged', initializeAuth);
// //     window.addEventListener('storage', initializeAuth);
    
// //     return () => {
// //       window.removeEventListener('userChanged', initializeAuth);
// //       window.removeEventListener('storage', initializeAuth);
// //     };
// //   }, []);

// //   // Fetch pharmacy details
// //   useEffect(() => {
// //     const fetchPharmacyDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
// //         const data = await response.json();
        
// //         if (data.success) {
// //           setPharmacy(data.data);
// //           if (data.data.deliveryInfo) {
// //             setDeliveryInfo(prev => ({
// //               ...prev,
// //               distance: data.data.deliveryInfo.distance || 0,
// //               estimatedTime: data.data.deliveryTime || '15-20 min'
// //             }));
// //           }
// //         } else {
// //           setError('Pharmacy not found');
// //           navigate('/pharmacies');
// //         }
// //       } catch (err) {
// //         console.error('Error:', err);
// //         setError('Error loading pharmacy');
// //         navigate('/pharmacies');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (id) fetchPharmacyDetails();
// //   }, [id, navigate]);

// //   // Calculate distance using geolocation
// //   useEffect(() => {
// //     if (pharmacy?.latitude && pharmacy?.longitude && navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const distance = calculateHaversineDistance(
// //             position.coords.latitude, position.coords.longitude,
// //             pharmacy.latitude, pharmacy.longitude
// //           );
// //           setDeliveryInfo(prev => ({ ...prev, distance }));
// //         },
// //         (error) => console.log('Geolocation error:', error)
// //       );
// //     }
// //   }, [pharmacy]);

// //   const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371;
// //     const dLat = (lat2 - lat1) * Math.PI / 180;
// //     const dLon = (lon2 - lon1) * Math.PI / 180;
// //     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
// //               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// //               Math.sin(dLon/2) * Math.sin(dLon/2);
// //     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// //   };

// //   // Fetch medicines for this pharmacy
// //   useEffect(() => {
// //     const fetchMedicines = async () => {
// //       if (!id || !pharmacy) return;
// //       try {
// //         setMedicineLoading(true);
// //         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
// //         const data = await response.json();
        
// //         if (data.success) {
// //           const formatted = data.data.map(med => ({
// //             ...med,
// //             _id: `${id}_${med._id}`,
// //             id: `${id}_${med._id}`,
// //             pharmacyId: id,
// //             pharmacyName: pharmacy?.name,
// //             tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
// //             form: med.form || 'tablet',
// //             stockQuantity: Math.floor(med.stockQuantity || 0),
// //             volume: med.volume || '60ml',
// //             inStock: med.inStock !== false && (med.stockQuantity || 0) > 0,
// //             reorderLevel: med.reorderLevel || 10
// //           }));
// //           setPharmacyMedicines(formatted);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching medicines:', err);
// //       } finally {
// //         setMedicineLoading(false);
// //       }
// //     };
    
// //     fetchMedicines();
// //   }, [id, pharmacy]);

// //   // Cart calculations
// //   const pharmacyCartItems = getPharmacyCartItems(id);
// //   const subtotal = getPharmacySubtotal(id);
// //   const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
// //   const finalTotal = subtotal + deliveryFee;
// //   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

// //   const getCartQuantityForMedicine = (medicineId) => getItemQuantity(medicineId, id);
  
// //   const getMaxAllowedQuantity = (medicine) => {
// //     const stockQty = medicine.stockQuantity || 0;
// //     if (!medicine.inStock || stockQty <= 0) return 0;
// //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// //     return Math.max(0, stockQty - currentInCart);
// //   };

// //   const isStockAvailable = (medicine, requestedQuantity) => requestedQuantity <= getMaxAllowedQuantity(medicine);

// //   // Filter medicines based on search
// //   const filteredMedicines = pharmacyMedicines.filter(medicine => 
// //     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
// //   );

// //   const handleLoginRedirect = () => {
// //     const currentPath = window.location.pathname;
// //     const searchParams = window.location.search;
// //     const fullUrl = `${currentPath}${searchParams}`;
// //     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&pharmacyId=${id}`);
// //     setShowLoginPopup(false);
// //   };

// //   // Add to cart handlers
// //   const handleAddToCartClick = (medicine) => {
// //     if (!isLoggedIn) {
// //       setShowLoginPopup(true);
// //       return;
// //     }

// //     if (isPharmacyUser) {
// //       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }

// //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
// //       setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
// //       setShowSuccessModal(true);
// //       return;
// //     }

// //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// //     if (currentInCart >= (medicine.stockQuantity || 0)) {
// //       setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
// //       setShowSuccessModal(true);
// //       return;
// //     }

// //     if (isTabletForm(medicine.form)) {
// //       addToCart(medicine, id, { quantity: 1 });
// //       setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
// //       setShowSuccessModal(true);
// //       return;
// //     }

// //     setSelectedMedicine(medicine);
// //     setPopupQuantity(1);
// //     setShowQuantityPopup(true);
// //   };

// //   const confirmAddToCart = () => {
// //     if (selectedMedicine) {
// //       if (!isStockAvailable(selectedMedicine, popupQuantity)) {
// //         const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
// //         setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
// //         setShowSuccessModal(true);
// //         setShowQuantityPopup(false);
// //         setSelectedMedicine(null);
// //         return;
// //       }

// //       addToCart(selectedMedicine, id, { quantity: popupQuantity });
// //       const unitText = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// //       setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart!`);
// //       setShowSuccessModal(true);
// //       setShowQuantityPopup(false);
// //       setSelectedMedicine(null);
// //     }
// //   };

// //   // Fixed: Update quantity function that properly updates the cart
// //   const handleUpdateQuantity = (medicineId, newQuantity) => {
// //     // Find the item in cart
// //     const cartItems = getPharmacyCartItems(id);
// //     const item = cartItems.find(item => item._id === medicineId);
    
// //     if (item) {
// //       const maxStock = item.stockQuantity || 0;
      
// //       if (newQuantity > maxStock) {
// //         setSuccessMessage(`Cannot exceed available stock of ${maxStock} units.`);
// //         setShowSuccessModal(true);
// //         return;
// //       }
      
// //       if (newQuantity < 1) {
// //         // Remove item if quantity becomes 0
// //         removeFromCart(medicineId, id);
// //       } else {
// //         // Update the quantity in cart
// //         // Since updateQuantity might not be available, we'll manually update the cart
// //         const updatedCart = { ...cart };
        
// //         if (updatedCart[id] && updatedCart[id][medicineId]) {
// //           updatedCart[id][medicineId].quantity = newQuantity;
// //           setCart(updatedCart);
          
// //           // Also update localStorage
// //           localStorage.setItem('cart', JSON.stringify(updatedCart));
// //         }
// //       }
// //     }
// //   };

// //   const handleRemoveFromCart = (medicineId) => removeFromCart(medicineId, id);

// //   const handleCheckout = () => {
// //     if (!isLoggedIn) {
// //       setShowLoginPopup(true);
// //       return;
// //     }
    
// //     if (pharmacyCartItems.length === 0) {
// //       setShowEmptyCartModal(true);
// //       return;
// //     }
    
// //     if (isPharmacyUser) {
// //       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
// //       setShowPharmacyErrorModal(true);
// //       return;
// //     }
    
// //     navigate(`/booking?pharmacy=${id}`);
// //   };

// //   const handleShare = () => {
// //     const shareUrl = window.location.href;
// //     if (navigator.share) {
// //       navigator.share({
// //         title: pharmacy?.name || 'Pharmacy',
// //         text: `Check out ${pharmacy?.name} on Pharmacy App`,
// //         url: shareUrl,
// //       }).catch(console.error);
// //     } else {
// //       navigator.clipboard.writeText(shareUrl).then(() => {
// //         setShowLinkCopiedModal(true);
// //         setTimeout(() => setShowLinkCopiedModal(false), 2000);
// //       }).catch(console.error);
// //     }
// //   };

// //   const handleCallPharmacy = () => setShowCallPharmacyModal(true);
// //   const confirmCallPharmacy = () => {
// //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// //     window.location.href = `tel:${phoneNumber}`;
// //     setShowCallPharmacyModal(false);
// //   };

// //   const getPerTabletPrice = (medicine) => {
// //     const stripPrice = medicine.discountedPrice || medicine.price || 0;
// //     const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// //     return stripPrice / tabletsPerStrip;
// //   };

// //   const getStockStatus = (medicine) => {
// //     const stockQty = medicine.stockQuantity || 0;
// //     const reorderLvl = medicine.reorderLevel || 10;
// //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// //     const available = stockQty - currentInCart;
    
// //     if (!medicine.inStock || stockQty <= 0) return { text: 'Out of Stock', color: 'bg-rose-100 text-rose-700' };
// //     if (available <= 0) return { text: 'Max in Cart', color: 'bg-amber-100 text-amber-700' };
// //     if (stockQty <= reorderLvl) return { text: `Only ${available} left`, color: 'bg-amber-100 text-amber-700' };
// //     return { text: 'In Stock', color: 'bg-emerald-100 text-emerald-700' };
// //   };

// //   const isAddButtonDisabled = (medicine) => {
// //     if (isPharmacyUser) return true;
// //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
// //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// //     return currentInCart >= (medicine.stockQuantity || 0);
// //   };

// //   const getAddButtonText = (medicine) => {
// //     if (isPharmacyUser) return 'Not Allowed';
// //     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
// //     const currentInCart = getCartQuantityForMedicine(medicine._id);
// //     if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
// //     return 'Add to Cart';
// //   };

// //   const getItemTotalPrice = (item) => calculateItemTotal(item);
// //   const getDisplayQuantity = (item) => {
// //     const qty = item.quantity || 1;
// //     if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
// //     if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
// //     return `${qty} unit${qty > 1 ? 's' : ''}`;
// //   };

// //   // Modal Components
// //   const QuantityPopupModal = () => {
// //     if (!selectedMedicine) return null;
// //     const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
// //     const unitLabel = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
// //     const price = selectedMedicine.discountedPrice || selectedMedicine.price || 0;
    
// //     return (
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
// //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// //           <div className="p-6">
// //             <div className="flex justify-between items-center mb-4">
// //               <h3 className="text-xl font-bold text-gray-900">Select Quantity</h3>
// //               <button onClick={() => setShowQuantityPopup(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
// //             </div>
// //             <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
// //             {maxUnitQty <= 5 && maxUnitQty > 0 && (
// //               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
// //                 <p className="text-xs text-amber-700 flex items-center gap-1">
// //                   <FiAlertCircle className="w-4 h-4" />
// //                   Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
// //                 </p>
// //               </div>
// //             )}
            
// //             <div className="mb-6">
// //               <div className="flex items-center justify-between mb-3">
// //                 <span className="text-sm text-gray-600">Number of {unitLabel}s</span>
// //                 <span className="text-xs text-gray-400">Max: {maxUnitQty}</span>
// //               </div>
// //               <div className="flex items-center justify-center gap-6">
// //                 <button
// //                   onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
// //                   disabled={popupQuantity <= 1}
// //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// //                 >
// //                   <FiMinus size={18} />
// //                 </button>
// //                 <span className="w-12 text-center font-semibold text-xl">{popupQuantity}</span>
// //                 <button
// //                   onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
// //                   disabled={popupQuantity >= maxUnitQty}
// //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
// //                 >
// //                   <FiPlus size={18} />
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
// //               <p className="text-sm text-gray-600 mb-1">Total Price</p>
// //               <p className="text-2xl font-bold text-teal-700">Rs. {(price * popupQuantity).toFixed(2)}</p>
// //             </div>
            
// //             <div className="flex gap-3">
// //               <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
// //                 Cancel
// //               </button>
// //               <button onClick={confirmAddToCart} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const SuccessModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// //         <div className="p-6 text-center">
// //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
// //           <p className="text-gray-600 mb-6">{successMessage}</p>
// //           <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
// //             Continue Shopping
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const PharmacyErrorModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// //         <div className="p-6 text-center">
// //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// //             <FiAlertCircle className="w-8 h-8 text-amber-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
// //           <p className="text-gray-600 mb-6">{successMessage}</p>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// //               OK
// //             </button>
// //             <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// //               Switch Account
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const EmptyCartModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// //         <div className="p-6 text-center">
// //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
// //             <FiShoppingCart className="w-8 h-8 text-amber-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
// //           <p className="text-gray-600 mb-6">Add some medicines to your cart before proceeding to checkout.</p>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// //               Continue Shopping
// //             </button>
// //             <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
// //               Browse Medicines
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const CallPharmacyModal = () => {
// //     const phoneNumber = pharmacy?.phone || '1800-123-4567';
// //     return (
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
// //         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
// //           <div className="p-6 text-center">
// //             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
// //               <FaPhoneAlt className="w-8 h-8 text-teal-600" />
// //             </div>
// //             <h3 className="text-xl font-bold text-gray-900 mb-2">Call Pharmacy</h3>
// //             <p className="text-gray-600 mb-4">Do you want to call this pharmacy?</p>
// //             <div className="bg-teal-50 rounded-xl p-4 mb-6">
// //               <p className="text-lg font-semibold text-teal-700">{phoneNumber}</p>
// //               <p className="text-sm text-gray-500 mt-1">{pharmacy?.name}</p>
// //             </div>
// //             <div className="flex flex-col sm:flex-row gap-3">
// //               <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
// //                 Cancel
// //               </button>
// //               <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium flex items-center justify-center gap-2">
// //                 <FaPhoneAlt className="w-4 h-4" /> Call Now
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const LinkCopiedModal = () => (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
// //       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
// //         <div className="p-6 text-center">
// //           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
// //             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-900 mb-2">Link Copied!</h3>
// //           <p className="text-gray-600">Pharmacy link has been copied to clipboard.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // Loading state
// //   if (loading || !isInitialized || !cartInitialized) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
// //           <p className="mt-4 text-teal-700 font-medium">Loading pharmacy...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !pharmacy) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
// //         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
// //           <MdLocalPharmacy className="w-20 h-20 text-teal-300 mx-auto mb-4" />
// //           <h3 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h3>
// //           <p className="text-gray-500 mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
// //           <button onClick={() => navigate('/pharmacies')} className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium">
// //             Browse Pharmacies
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
// //       {/* Modals */}
// //       <LoginPopup
// //         isOpen={showLoginPopup}
// //         onClose={() => setShowLoginPopup(false)}
// //         onConfirm={handleLoginRedirect}
// //         message="Please login to add items to cart and place orders."
// //       />
// //       {showSuccessModal && <SuccessModal />}
// //       {showPharmacyErrorModal && <PharmacyErrorModal />}
// //       {showEmptyCartModal && <EmptyCartModal />}
// //       {showCallPharmacyModal && <CallPharmacyModal />}
// //       {showLinkCopiedModal && <LinkCopiedModal />}
// //       {showQuantityPopup && <QuantityPopupModal />}

// //       {/* Pharmacy Info Hero - Gradient Header with Buttons */}
// //       <div
// //         className="rounded-b-3xl p-6 sm:p-8 shadow-xl"
// //         style={{
// //           background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
// //           color: "var(--white)",
// //         }}
// //       >
// //         <div className="max-w-7xl mx-auto">
// //           {/* Top Row with Share and Cart Buttons */}
// //           <div className="flex justify-end items-center gap-3 mb-4">
// //             <button 
// //               onClick={handleShare} 
// //               className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
// //               title="Share Pharmacy"
// //             >
// //               <FiShare2 className="w-5 h-5" />
// //             </button>
// //             <button 
// //               onClick={() => setShowCart(true)} 
// //               className="relative p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
// //               title="View Cart"
// //             >
// //               <FiShoppingCart className="w-5 h-5" />
// //               {cartItemCount > 0 && (
// //                 <span className="absolute -top-1 -right-1 bg-amber-400 text-teal-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
// //                   {cartItemCount}
// //                 </span>
// //               )}
// //             </button>
// //           </div>

// //           {/* Pharmacy Info */}
// //           <div className="flex flex-col sm:flex-row items-center gap-6">
// //             <div className="relative group">
// //               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
// //               <img 
// //                 src={pharmacy.image || 'https://via.placeholder.com/100'} 
// //                 alt={pharmacy.name}
// //                 className="relative w-24 h-24 rounded-2xl object-cover bg-white shadow-lg ring-4 ring-white/30"
// //                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
// //               />
// //               <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
// //                 <MdVerified className="w-4 h-4 text-white" />
// //               </div>
// //             </div>
// //             <div className="flex-1 text-center sm:text-left">
// //               <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
// //                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{pharmacy.name}</h1>
// //                 <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-sm">
// //                   <FiStar className="w-3 h-3 fill-current" />
// //                   <span>4.8</span>
// //                 </div>
// //               </div>
// //               <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm">
// //                 <FiMapPin className="w-4 h-4" />
// //                 {pharmacy.address}
// //               </p>
// //               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
// //                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
// //                   <FiClock /> {deliveryInfo.estimatedTime}
// //                 </span>
// //                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
// //                   <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km
// //                 </span>
// //                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
// //                   <FiTag /> {pharmacy.discount || 10}% off
// //                 </span>
// //               </div>
// //             </div>
// //             <button 
// //               onClick={handleCallPharmacy} 
// //               className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium text-sm"
// //             >
// //               <FaPhoneAlt className="w-4 h-4" />
// //               <span>Call</span>
// //             </button>
// //           </div>

// //           {/* Login reminder */}
// //           {!isLoggedIn && (
// //             <div className="mt-5 flex justify-center">
// //               <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/20 px-3 py-1.5 rounded-full">
// //                 <span className="text-yellow-300">⚠</span>
// //                 <span>Login to add items to cart</span>
// //                 <button
// //                   onClick={() => setShowLoginPopup(true)} 
// //                   className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded-full transition"
// //                 >
// //                   Login
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Search Bar */}
// //         <div className="mb-10 max-w-xl mx-auto relative">
// //           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
// //           <input
// //             type="text"
// //             placeholder="Search medicines by name, generic name, or description..."
// //             className="w-full rounded-2xl py-4 pl-12 pr-4 outline-none border focus:ring-2 focus:ring-teal-300 transition-shadow bg-white"
// //             style={{
// //               borderColor: "var(--accent-color)",
// //             }}
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>

// //         {/* Results count */}
// //         {!medicineLoading && filteredMedicines.length > 0 && (
// //           <div className="flex items-center justify-between mb-6">
// //             <p className="text-sm text-gray-500 flex items-center gap-2">
// //               <FiPackage className="w-4 h-4" />
// //               {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
// //             </p>
// //             <div className="flex items-center gap-2 text-sm text-gray-400">
// //               <FiTag className="w-4 h-4" />
// //               <span>100% Authentic</span>
// //             </div>
// //           </div>
// //         )}

// //         {/* Medicines Grid - 3-4 cards per row responsive */}
// //         {medicineLoading ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
// //             {[...Array(8)].map((_, i) => (
// //               <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
// //                 <div className="h-32 bg-gray-100 rounded-lg mb-4"></div>
// //                 <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
// //                 <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
// //                 <div className="h-8 bg-gray-100 rounded w-1/3 mb-3"></div>
// //                 <div className="h-10 bg-gray-100 rounded"></div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : filteredMedicines.length > 0 ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
// //             {filteredMedicines.map((medicine) => {
// //               const stockStatus = getStockStatus(medicine);
// //               const isDisabled = isAddButtonDisabled(medicine);
// //               const buttonText = getAddButtonText(medicine);
// //               const currentInCart = getCartQuantityForMedicine(medicine._id);
// //               const isTablet = isTabletForm(medicine.form);
// //               const isSyrup = isSyrupForm(medicine.form);
// //               const tabletsPerStrip = medicine.tabletsPerUnit || 10;
// //               const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
// //               const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
              
// //               return (
// //                 <div
// //                   key={medicine._id}
// //                   className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
// //                 >
// //                   {/* Image Section */}
// //                   <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3">
// //                     <img
// //                       src={medicine.image}
// //                       alt={medicine.name}
// //                       className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
// //                       onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
// //                     />
// //                     {hasDiscount && (
// //                       <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
// //                         {discountPercent}% OFF
// //                       </div>
// //                     )}
// //                     <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
// //                       {stockStatus.text}
// //                     </div>
// //                     {/* Medicine Form Badge */}
// //                     <div className="absolute bottom-2 right-2">
// //                       {isTablet && (
// //                         <div className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
// //                           <FaBox className="w-3 h-3" /> Tablet
// //                         </div>
// //                       )}
// //                       {isSyrup && (
// //                         <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
// //                           <FaFlask className="w-3 h-3" /> Syrup
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
                  
// //                   {/* Content Section */}
// //                   <div className="p-3">
// //                     <h3 className="font-bold text-gray-800 line-clamp-1 text-sm">{medicine.name}</h3>
// //                     {medicine.genericName && (
// //                       <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{medicine.genericName}</p>
// //                     )}
                    
// //                     {/* Description */}
// //                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">{medicine.description}</p>
                    
// //                     {/* Price Section */}
// //                     <div className="mt-2 flex items-baseline gap-2">
// //                       <span className="text-lg font-bold text-teal-700">Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</span>
// //                       {hasDiscount && (
// //                         <span className="text-xs text-gray-400 line-through">Rs. {medicine.price.toFixed(2)}</span>
// //                       )}
// //                     </div>

// //                     {/* Medicine Details Chips */}
// //                     <div className="flex flex-wrap gap-1 mt-2">
// //                       {isTablet && (
// //                         <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
// //                           {tabletsPerStrip} tabs/strip
// //                         </span>
// //                       )}
// //                       {isSyrup && (
// //                         <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
// //                           {medicine.volume}
// //                         </span>
// //                       )}
// //                       <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
// //                         Stock: {medicine.stockQuantity}
// //                       </span>
// //                     </div>
                    
// //                     {/* Action Buttons */}
// //                     <div className="flex gap-2 mt-3">
// //                       <button
// //                         onClick={() => handleAddToCartClick(medicine)}
// //                         disabled={isDisabled}
// //                         className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
// //                           isDisabled 
// //                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
// //                             : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow-sm hover:shadow'
// //                         }`}
// //                       >
// //                         <FiShoppingCart className="w-3.5 h-3.5" />
// //                         {buttonText}
// //                       </button>
// //                       <Link 
// //                         to={`/medicine/${medicine._id}`} 
// //                         className="px-3 py-2 rounded-lg font-medium text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
// //                       >
// //                         Details
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         ) : (
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
// //             <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <MdLocalPharmacy className="w-10 h-10 text-teal-300" />
// //             </div>
// //             <p className="text-gray-500 text-lg mb-2">No medicines found</p>
// //             {searchTerm && <p className="text-gray-400">Try adjusting your search term</p>}
// //           </div>
// //         )}
// //       </div>

// //       {/* Cart Sidebar Drawer with Working Quantity Controls */}
// //       {showCart && (
// //         <div className="fixed inset-0 z-50">
// //           <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
// //           <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slideInRight">
// //             <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center">
// //               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
// //                 <FiShoppingCart className="w-5 h-5 text-teal-600" />
// //                 Your Cart
// //                 <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-normal">
// //                   {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
// //                 </span>
// //               </h3>
// //               <button onClick={() => setShowCart(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
// //                 <FiX size={20} />
// //               </button>
// //             </div>
            
// //             <div className="p-5">
// //               {pharmacyCartItems.length === 0 ? (
// //                 <div className="text-center py-12">
// //                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <FiShoppingCart className="w-10 h-10 text-gray-300" />
// //                   </div>
// //                   <p className="text-gray-400 font-medium">Your cart is empty</p>
// //                   <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
// //                 </div>
// //               ) : (
// //                 <>
// //                   <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
// //                     {pharmacyCartItems.map((item) => {
// //                       const currentQty = item.quantity || 1;
// //                       const maxStock = item.stockQuantity || 0;
// //                       return (
// //                         <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
// //                           <img 
// //                             src={item.image || 'https://via.placeholder.com/50'} 
// //                             alt={item.name} 
// //                             className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
// //                           />
// //                           <div className="flex-1">
// //                             <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
// //                             <p className="text-teal-600 font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
// //                             {isTabletForm(item.form) && item.totalTablets && (
// //                               <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
// //                             )}
                            
// //                             {/* Working Quantity Controls */}
// //                             <div className="flex items-center justify-between mt-2">
// //                               <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
// //                                 <button
// //                                   onClick={() => handleUpdateQuantity(item._id, currentQty - 1)}
// //                                   className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors"
// //                                   disabled={currentQty <= 1}
// //                                 >
// //                                   <FaMinus className="w-3 h-3 text-gray-600" />
// //                                 </button>
// //                                 <span className="text-sm font-medium text-gray-700 min-w-[30px] text-center">
// //                                   {currentQty}
// //                                 </span>
// //                                 <button
// //                                   onClick={() => handleUpdateQuantity(item._id, currentQty + 1)}
// //                                   className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors"
// //                                   disabled={currentQty >= maxStock}
// //                                 >
// //                                   <FaPlus className="w-3 h-3 text-gray-600" />
// //                                 </button>
// //                               </div>
// //                               <button 
// //                                 onClick={() => handleRemoveFromCart(item._id)} 
// //                                 className="text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
// //                               >
// //                                 <FiTrash2 className="w-4 h-4" />
// //                               </button>
// //                             </div>
// //                             {currentQty >= maxStock && maxStock > 0 && (
// //                               <p className="text-xs text-amber-600 mt-1">Max stock reached</p>
// //                             )}
// //                           </div>
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
                  
// //                   <div className="border-t border-gray-100 pt-4 space-y-3">
// //                     <div className="flex justify-between text-sm">
// //                       <span className="text-gray-500">Subtotal</span>
// //                       <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span className="text-gray-500">Delivery Fee</span>
// //                       {deliveryFee === 0 ? (
// //                         <span className="text-emerald-600 font-semibold">FREE</span>
// //                       ) : (
// //                         <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
// //                       )}
// //                     </div>
// //                     {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
// //                       <div className="bg-teal-50 rounded-lg p-2">
// //                         <p className="text-xs text-teal-700 flex items-center gap-1">
// //                           <FiTruck className="w-3 h-3" />
// //                           Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
// //                         </p>
// //                       </div>
// //                     )}
// //                     <div className="flex justify-between pt-2 border-t border-gray-100">
// //                       <span className="font-bold text-gray-800">Total</span>
// //                       <span className="font-bold text-xl text-teal-600">Rs. {finalTotal.toFixed(2)}</span>
// //                     </div>
// //                     <button 
// //                       onClick={() => { setShowCart(false); handleCheckout(); }} 
// //                       className="w-full py-3.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold text-center"
// //                     >
// //                       Proceed to Checkout
// //                     </button>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* CSS Animations */}
// //       <style jsx>{`
// //         @keyframes scaleUp {
// //           from {
// //             opacity: 0;
// //             transform: scale(0.95);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: scale(1);
// //           }
// //         }
// //         @keyframes slideInRight {
// //           from {
// //             transform: translateX(100%);
// //           }
// //           to {
// //             transform: translateX(0);
// //           }
// //         }
// //         .animate-scaleUp {
// //           animation: scaleUp 0.2s ease-out;
// //         }
// //         .animate-slideInRight {
// //           animation: slideInRight 0.3s ease-out;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default PharmacyDetailPage;


// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { 
//   FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiPackage,
//   FiClock, FiMinus, FiPlus, FiTrash2, FiShare2, FiTag, 
//   FiCheckCircle, FiAlertCircle, FiTruck, FiStar, FiX
// } from 'react-icons/fi';
// import { MdLocalPharmacy, MdVerified, MdDeliveryDining } from 'react-icons/md';
// import { FaBox, FaFlask, FaPhoneAlt, FaMinus, FaPlus } from 'react-icons/fa';
// import { useCart } from '../../contexts/CartContext';

// // Check login function
// const checkUserLoggedIn = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   return !!(token && user);
// };

// // Login Popup Component with blur effect
// const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       <div 
//         className="absolute inset-0 bg-black/30 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <div className="absolute inset-0 flex items-center justify-center p-4">
//         <div 
//           className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-scaleUp"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition"
//               >
//                 <FiX size={20} />
//               </button>
//             </div>
//             <p className="text-gray-600 mb-6">
//               {message || "Please login to add items to cart and place orders."}
//             </p>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="px-4 py-2 text-white rounded-lg transition"
//                 style={{
//                   background: "var(--primary-color)",
//                 }}
//                 onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
//                 onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
//               >
//                 Go to Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PharmacyDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const { 
//     cart,
//     setCart,
//     addToCart, 
//     removeFromCart, 
//     updateQuantity,
//     getPharmacyCartItems,
//     getPharmacySubtotal,
//     getDeliveryFeeForPharmacy,
//     getItemQuantity,
//     calculateItemTotal,
//     isInitialized: cartInitialized
//   } = useCart();
  
//   // Helper functions for medicine forms
//   const isTabletForm = (form) => {
//     const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
//     return form && tabletForms.some(t => form.toLowerCase().includes(t));
//   };
  
//   const isSyrupForm = (form) => {
//     const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
//     return form && syrupForms.some(s => form.toLowerCase().includes(s));
//   };
  
//   // State variables
//   const [pharmacy, setPharmacy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
//   const [medicineLoading, setMedicineLoading] = useState(false);
//   const [showCart, setShowCart] = useState(false);
  
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
  
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
//   const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
//   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
//   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
//   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [popupQuantity, setPopupQuantity] = useState(1);

//   const [deliveryInfo, setDeliveryInfo] = useState({
//     distance: 0,
//     estimatedTime: '15-20 min'
//   });

//   const getCurrentUser = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) return JSON.parse(userStr);
//     } catch (error) {
//       console.error('Error getting user:', error);
//     }
//     return null;
//   };

//   // Initialize authentication
//   useEffect(() => {
//     const initializeAuth = () => {
//       try {
//         const loggedIn = checkUserLoggedIn();
//         const user = getCurrentUser();
        
//         setIsLoggedIn(loggedIn);
//         setIsPharmacyUser(user?.role === 'pharmacy');
//         setIsInitialized(true);
//       } catch (error) {
//         console.error('Error initializing auth:', error);
//         setIsLoggedIn(false);
//         setIsPharmacyUser(false);
//         setIsInitialized(true);
//       }
//     };

//     initializeAuth();
//     window.addEventListener('userChanged', initializeAuth);
//     window.addEventListener('storage', initializeAuth);
    
//     return () => {
//       window.removeEventListener('userChanged', initializeAuth);
//       window.removeEventListener('storage', initializeAuth);
//     };
//   }, []);

//   // Fetch pharmacy details
//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacy(data.data);
//           if (data.data.deliveryInfo) {
//             setDeliveryInfo(prev => ({
//               ...prev,
//               distance: data.data.deliveryInfo.distance || 0,
//               estimatedTime: data.data.deliveryTime || '15-20 min'
//             }));
//           }
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

//   // Calculate distance using geolocation
//   useEffect(() => {
//     if (pharmacy?.latitude && pharmacy?.longitude && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const distance = calculateHaversineDistance(
//             position.coords.latitude, position.coords.longitude,
//             pharmacy.latitude, pharmacy.longitude
//           );
//           setDeliveryInfo(prev => ({ ...prev, distance }));
//         },
//         (error) => console.log('Geolocation error:', error)
//       );
//     }
//   }, [pharmacy]);

//   const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//               Math.sin(dLon/2) * Math.sin(dLon/2);
//     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   };

//   // Fetch medicines for this pharmacy
//   useEffect(() => {
//     const fetchMedicines = async () => {
//       if (!id || !pharmacy) return;
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
//             tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
//             form: med.form || 'tablet',
//             stockQuantity: Math.floor(med.stockQuantity || 0),
//             volume: med.volume || '60ml',
//             inStock: med.inStock !== false && (med.stockQuantity || 0) > 0,
//             reorderLevel: med.reorderLevel || 10
//           }));
//           setPharmacyMedicines(formatted);
//         }
//       } catch (err) {
//         console.error('Error fetching medicines:', err);
//       } finally {
//         setMedicineLoading(false);
//       }
//     };
    
//     fetchMedicines();
//   }, [id, pharmacy]);

//   // Cart calculations
//   const pharmacyCartItems = getPharmacyCartItems(id);
//   const subtotal = getPharmacySubtotal(id);
//   const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
//   const finalTotal = subtotal + deliveryFee;
//   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

//   const getCartQuantityForMedicine = (medicineId) => getItemQuantity(medicineId, id);
  
//   const getMaxAllowedQuantity = (medicine) => {
//     const stockQty = medicine.stockQuantity || 0;
//     if (!medicine.inStock || stockQty <= 0) return 0;
//     const currentInCart = getCartQuantityForMedicine(medicine._id);
//     return Math.max(0, stockQty - currentInCart);
//   };

//   const isStockAvailable = (medicine, requestedQuantity) => requestedQuantity <= getMaxAllowedQuantity(medicine);

//   // Filter medicines based on search
//   const filteredMedicines = pharmacyMedicines.filter(medicine => 
//     medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleLoginRedirect = () => {
//     const currentPath = window.location.pathname;
//     const searchParams = window.location.search;
//     const fullUrl = `${currentPath}${searchParams}`;
//     navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&pharmacyId=${id}`);
//     setShowLoginPopup(false);
//   };

//   // Add to cart handlers
//   const handleAddToCartClick = (medicine) => {
//     if (!isLoggedIn) {
//       setShowLoginPopup(true);
//       return;
//     }

//     if (isPharmacyUser) {
//       setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
//       setShowPharmacyErrorModal(true);
//       return;
//     }

//     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
//       setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
//       setShowSuccessModal(true);
//       return;
//     }

//     const currentInCart = getCartQuantityForMedicine(medicine._id);
//     if (currentInCart >= (medicine.stockQuantity || 0)) {
//       setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
//       setShowSuccessModal(true);
//       return;
//     }

//     if (isTabletForm(medicine.form)) {
//       addToCart(medicine, id, { quantity: 1 });
//       setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
//       setShowSuccessModal(true);
//       return;
//     }

//     setSelectedMedicine(medicine);
//     setPopupQuantity(1);
//     setShowQuantityPopup(true);
//   };

//   const confirmAddToCart = () => {
//     if (selectedMedicine) {
//       if (!isStockAvailable(selectedMedicine, popupQuantity)) {
//         const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
//         setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
//         setShowSuccessModal(true);
//         setShowQuantityPopup(false);
//         setSelectedMedicine(null);
//         return;
//       }

//       addToCart(selectedMedicine, id, { quantity: popupQuantity });
//       const unitText = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
//       setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart!`);
//       setShowSuccessModal(true);
//       setShowQuantityPopup(false);
//       setSelectedMedicine(null);
//     }
//   };

//   // FIXED: Update quantity function - using updateQuantity from CartContext
//   const handleUpdateQuantity = (item, newQuantity) => {
//     const maxStock = item.maxStock || item.stockQuantity || 0;
    
//     if (newQuantity > maxStock) {
//       setSuccessMessage(`Cannot exceed available stock of ${maxStock} units.`);
//       setShowSuccessModal(true);
//       return;
//     }
    
//     if (newQuantity < 1) {
//       // Remove item if quantity becomes 0
//       removeFromCart(item._id, id);
//     } else {
//       // Use the context's updateQuantity which handles state correctly
//       updateQuantity(item._id, id, newQuantity);
//     }
//   };

//   const handleRemoveFromCart = (medicineId) => removeFromCart(medicineId, id);

//   const handleCheckout = () => {
//     if (!isLoggedIn) {
//       setShowLoginPopup(true);
//       return;
//     }
    
//     if (pharmacyCartItems.length === 0) {
//       setShowEmptyCartModal(true);
//       return;
//     }
    
//     if (isPharmacyUser) {
//       setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
//       setShowPharmacyErrorModal(true);
//       return;
//     }
    
//     navigate(`/booking?pharmacy=${id}`);
//   };

//   const handleShare = () => {
//     const shareUrl = window.location.href;
//     if (navigator.share) {
//       navigator.share({
//         title: pharmacy?.name || 'Pharmacy',
//         text: `Check out ${pharmacy?.name} on Pharmacy App`,
//         url: shareUrl,
//       }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(shareUrl).then(() => {
//         setShowLinkCopiedModal(true);
//         setTimeout(() => setShowLinkCopiedModal(false), 2000);
//       }).catch(console.error);
//     }
//   };

//   const handleCallPharmacy = () => setShowCallPharmacyModal(true);
//   const confirmCallPharmacy = () => {
//     const phoneNumber = pharmacy?.phone || '1800-123-4567';
//     window.location.href = `tel:${phoneNumber}`;
//     setShowCallPharmacyModal(false);
//   };

//   const getPerTabletPrice = (medicine) => {
//     const stripPrice = medicine.discountedPrice || medicine.price || 0;
//     const tabletsPerStrip = medicine.tabletsPerUnit || 10;
//     return stripPrice / tabletsPerStrip;
//   };

//   const getStockStatus = (medicine) => {
//     const stockQty = medicine.stockQuantity || 0;
//     const reorderLvl = medicine.reorderLevel || 10;
//     const currentInCart = getCartQuantityForMedicine(medicine._id);
//     const available = stockQty - currentInCart;
    
//     if (!medicine.inStock || stockQty <= 0) return { text: 'Out of Stock', color: 'bg-rose-100 text-rose-700' };
//     if (available <= 0) return { text: 'Max in Cart', color: 'bg-amber-100 text-amber-700' };
//     if (stockQty <= reorderLvl) return { text: `Only ${available} left`, color: 'bg-amber-100 text-amber-700' };
//     return { text: 'In Stock', color: 'bg-emerald-100 text-emerald-700' };
//   };

//   const isAddButtonDisabled = (medicine) => {
//     if (isPharmacyUser) return true;
//     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
//     const currentInCart = getCartQuantityForMedicine(medicine._id);
//     return currentInCart >= (medicine.stockQuantity || 0);
//   };

//   const getAddButtonText = (medicine) => {
//     if (isPharmacyUser) return 'Not Allowed';
//     if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
//     const currentInCart = getCartQuantityForMedicine(medicine._id);
//     if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
//     return 'Add to Cart';
//   };

//   const getItemTotalPrice = (item) => calculateItemTotal(item);
//   const getDisplayQuantity = (item) => {
//     const qty = item.quantity || 1;
//     if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
//     if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
//     return `${qty} unit${qty > 1 ? 's' : ''}`;
//   };

//   // Modal Components
//   const QuantityPopupModal = () => {
//     if (!selectedMedicine) return null;
//     const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
//     const unitLabel = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
//     const price = selectedMedicine.discountedPrice || selectedMedicine.price || 0;
    
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
//         <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-900">Select Quantity</h3>
//               <button onClick={() => setShowQuantityPopup(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
//             </div>
//             <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
//             {maxUnitQty <= 5 && maxUnitQty > 0 && (
//               <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
//                 <p className="text-xs text-amber-700 flex items-center gap-1">
//                   <FiAlertCircle className="w-4 h-4" />
//                   Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
//                 </p>
//               </div>
//             )}
            
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-sm text-gray-600">Number of {unitLabel}s</span>
//                 <span className="text-xs text-gray-400">Max: {maxUnitQty}</span>
//               </div>
//               <div className="flex items-center justify-center gap-6">
//                 <button
//                   onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
//                   disabled={popupQuantity <= 1}
//                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
//                 >
//                   <FiMinus size={18} />
//                 </button>
//                 <span className="w-12 text-center font-semibold text-xl">{popupQuantity}</span>
//                 <button
//                   onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
//                   disabled={popupQuantity >= maxUnitQty}
//                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
//                 >
//                   <FiPlus size={18} />
//                 </button>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
//               <p className="text-sm text-gray-600 mb-1">Total Price</p>
//               <p className="text-2xl font-bold text-teal-700">Rs. {(price * popupQuantity).toFixed(2)}</p>
//             </div>
            
//             <div className="flex gap-3">
//               <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
//                 Cancel
//               </button>
//               <button onClick={confirmAddToCart} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const SuccessModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
//         <div className="p-6 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
//             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
//           <p className="text-gray-600 mb-6">{successMessage}</p>
//           <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const PharmacyErrorModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
//         <div className="p-6 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
//             <FiAlertCircle className="w-8 h-8 text-amber-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
//           <p className="text-gray-600 mb-6">{successMessage}</p>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
//               OK
//             </button>
//             <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
//               Switch Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const EmptyCartModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
//         <div className="p-6 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
//             <FiShoppingCart className="w-8 h-8 text-amber-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
//           <p className="text-gray-600 mb-6">Add some medicines to your cart before proceeding to checkout.</p>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
//               Continue Shopping
//             </button>
//             <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
//               Browse Medicines
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CallPharmacyModal = () => {
//     const phoneNumber = pharmacy?.phone || '1800-123-4567';
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
//         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
//           <div className="p-6 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
//               <FaPhoneAlt className="w-8 h-8 text-teal-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Call Pharmacy</h3>
//             <p className="text-gray-600 mb-4">Do you want to call this pharmacy?</p>
//             <div className="bg-teal-50 rounded-xl p-4 mb-6">
//               <p className="text-lg font-semibold text-teal-700">{phoneNumber}</p>
//               <p className="text-sm text-gray-500 mt-1">{pharmacy?.name}</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
//                 Cancel
//               </button>
//               <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium flex items-center justify-center gap-2">
//                 <FaPhoneAlt className="w-4 h-4" /> Call Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const LinkCopiedModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
//         <div className="p-6 text-center">
//           <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
//             <FiCheckCircle className="w-8 h-8 text-emerald-500" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Link Copied!</h3>
//           <p className="text-gray-600">Pharmacy link has been copied to clipboard.</p>
//         </div>
//       </div>
//     </div>
//   );

//   // Loading state
//   if (loading || !isInitialized || !cartInitialized) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-teal-700 font-medium">Loading pharmacy...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !pharmacy) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//           <MdLocalPharmacy className="w-20 h-20 text-teal-300 mx-auto mb-4" />
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h3>
//           <p className="text-gray-500 mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
//           <button onClick={() => navigate('/pharmacies')} className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium">
//             Browse Pharmacies
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
//       {/* Modals */}
//       <LoginPopup
//         isOpen={showLoginPopup}
//         onClose={() => setShowLoginPopup(false)}
//         onConfirm={handleLoginRedirect}
//         message="Please login to add items to cart and place orders."
//       />
//       {showSuccessModal && <SuccessModal />}
//       {showPharmacyErrorModal && <PharmacyErrorModal />}
//       {showEmptyCartModal && <EmptyCartModal />}
//       {showCallPharmacyModal && <CallPharmacyModal />}
//       {showLinkCopiedModal && <LinkCopiedModal />}
//       {showQuantityPopup && <QuantityPopupModal />}

//       {/* Pharmacy Info Hero - Gradient Header with Buttons */}
//       <div
//         className="rounded-b-3xl p-6 sm:p-8 shadow-xl"
//         style={{
//           background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
//           color: "var(--white)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Top Row with Share and Cart Buttons */}
//           <div className="flex justify-end items-center gap-3 mb-4">
//             <button 
//               onClick={handleShare} 
//               className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
//               title="Share Pharmacy"
//             >
//               <FiShare2 className="w-5 h-5" />
//             </button>
//             <button 
//               onClick={() => setShowCart(true)} 
//               className="relative p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
//               title="View Cart"
//             >
//               <FiShoppingCart className="w-5 h-5" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-amber-400 text-teal-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Pharmacy Info */}
//           <div className="flex flex-col sm:flex-row items-center gap-6">
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
//               <img 
//                 src={pharmacy.image || 'https://via.placeholder.com/100'} 
//                 alt={pharmacy.name}
//                 className="relative w-24 h-24 rounded-2xl object-cover bg-white shadow-lg ring-4 ring-white/30"
//                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
//               />
//               <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
//                 <MdVerified className="w-4 h-4 text-white" />
//               </div>
//             </div>
//             <div className="flex-1 text-center sm:text-left">
//               <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
//                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{pharmacy.name}</h1>
//                 <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-sm">
//                   <FiStar className="w-3 h-3 fill-current" />
//                   <span>4.8</span>
//                 </div>
//               </div>
//               <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm">
//                 <FiMapPin className="w-4 h-4" />
//                 {pharmacy.address}
//               </p>
//               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
//                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
//                   <FiClock /> {deliveryInfo.estimatedTime}
//                 </span>
//                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
//                   <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km
//                 </span>
//                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
//                   <FiTag /> {pharmacy.discount || 10}% off
//                 </span>
//               </div>
//             </div>
//             <button 
//               onClick={handleCallPharmacy} 
//               className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium text-sm"
//             >
//               <FaPhoneAlt className="w-4 h-4" />
//               <span>Call</span>
//             </button>
//           </div>

//           {/* Login reminder */}
//           {!isLoggedIn && (
//             <div className="mt-5 flex justify-center">
//               <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/20 px-3 py-1.5 rounded-full">
//                 <span className="text-yellow-300">⚠</span>
//                 <span>Login to add items to cart</span>
//                 <button
//                   onClick={() => setShowLoginPopup(true)} 
//                   className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded-full transition"
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search Bar */}
//         <div className="mb-10 max-w-xl mx-auto relative">
//           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search medicines by name, generic name, or description..."
//             className="w-full rounded-2xl py-4 pl-12 pr-4 outline-none border focus:ring-2 focus:ring-teal-300 transition-shadow bg-white"
//             style={{
//               borderColor: "var(--accent-color)",
//             }}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Results count */}
//         {!medicineLoading && filteredMedicines.length > 0 && (
//           <div className="flex items-center justify-between mb-6">
//             <p className="text-sm text-gray-500 flex items-center gap-2">
//               <FiPackage className="w-4 h-4" />
//               {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
//             </p>
//             <div className="flex items-center gap-2 text-sm text-gray-400">
//               <FiTag className="w-4 h-4" />
//               <span>100% Authentic</span>
//             </div>
//           </div>
//         )}

//         {/* Medicines Grid - 3-4 cards per row responsive */}
//         {medicineLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
//                 <div className="h-32 bg-gray-100 rounded-lg mb-4"></div>
//                 <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
//                 <div className="h-8 bg-gray-100 rounded w-1/3 mb-3"></div>
//                 <div className="h-10 bg-gray-100 rounded"></div>
//               </div>
//             ))}
//           </div>
//         ) : filteredMedicines.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {filteredMedicines.map((medicine) => {
//               const stockStatus = getStockStatus(medicine);
//               const isDisabled = isAddButtonDisabled(medicine);
//               const buttonText = getAddButtonText(medicine);
//               const currentInCart = getCartQuantityForMedicine(medicine._id);
//               const isTablet = isTabletForm(medicine.form);
//               const isSyrup = isSyrupForm(medicine.form);
//               const tabletsPerStrip = medicine.tabletsPerUnit || 10;
//               const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
//               const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
              
//               return (
//                 <div
//                   key={medicine._id}
//                   className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                 >
//                   {/* Image Section */}
//                   <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3">
//                     <img
//                       src={medicine.image}
//                       alt={medicine.name}
//                       className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
//                       onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
//                     />
//                     {hasDiscount && (
//                       <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
//                         {discountPercent}% OFF
//                       </div>
//                     )}
//                     <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
//                       {stockStatus.text}
//                     </div>
//                     {/* Medicine Form Badge */}
//                     <div className="absolute bottom-2 right-2">
//                       {isTablet && (
//                         <div className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
//                           <FaBox className="w-3 h-3" /> Tablet
//                         </div>
//                       )}
//                       {isSyrup && (
//                         <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
//                           <FaFlask className="w-3 h-3" /> Syrup
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Content Section */}
//                   <div className="p-3">
//                     <h3 className="font-bold text-gray-800 line-clamp-1 text-sm">{medicine.name}</h3>
//                     {medicine.genericName && (
//                       <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{medicine.genericName}</p>
//                     )}
                    
//                     {/* Description */}
//                     <p className="text-xs text-gray-400 mt-1 line-clamp-2">{medicine.description}</p>
                    
//                     {/* Price Section */}
//                     <div className="mt-2 flex items-baseline gap-2">
//                       <span className="text-lg font-bold text-teal-700">Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</span>
//                       {hasDiscount && (
//                         <span className="text-xs text-gray-400 line-through">Rs. {medicine.price.toFixed(2)}</span>
//                       )}
//                     </div>

//                     {/* Medicine Details Chips */}
//                     <div className="flex flex-wrap gap-1 mt-2">
//                       {isTablet && (
//                         <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
//                           {tabletsPerStrip} tabs/strip
//                         </span>
//                       )}
//                       {isSyrup && (
//                         <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
//                           {medicine.volume}
//                         </span>
//                       )}
//                       <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
//                         Stock: {medicine.stockQuantity}
//                       </span>
//                     </div>
                    
//                     {/* Action Buttons */}
//                     <div className="flex gap-2 mt-3">
//                       <button
//                         onClick={() => handleAddToCartClick(medicine)}
//                         disabled={isDisabled}
//                         className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
//                           isDisabled 
//                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                             : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow-sm hover:shadow'
//                         }`}
//                       >
//                         <FiShoppingCart className="w-3.5 h-3.5" />
//                         {buttonText}
//                       </button>
//                       <Link 
//                         to={`/medicine/${medicine._id}`} 
//                         className="px-3 py-2 rounded-lg font-medium text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
//                       >
//                         Details
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
//             <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
//               <MdLocalPharmacy className="w-10 h-10 text-teal-300" />
//             </div>
//             <p className="text-gray-500 text-lg mb-2">No medicines found</p>
//             {searchTerm && <p className="text-gray-400">Try adjusting your search term</p>}
//           </div>
//         )}
//       </div>

//       {/* Cart Sidebar Drawer with Working Quantity Controls */}
//       {showCart && (
//         <div className="fixed inset-0 z-50">
//           <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
//           <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slideInRight">
//             <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center">
//               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 <FiShoppingCart className="w-5 h-5 text-teal-600" />
//                 Your Cart
//                 <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-normal">
//                   {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
//                 </span>
//               </h3>
//               <button onClick={() => setShowCart(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
//                 <FiX size={20} />
//               </button>
//             </div>
            
//             <div className="p-5">
//               {pharmacyCartItems.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <FiShoppingCart className="w-10 h-10 text-gray-300" />
//                   </div>
//                   <p className="text-gray-400 font-medium">Your cart is empty</p>
//                   <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
//                     {pharmacyCartItems.map((item) => {
//                       const currentQty = item.quantity || 1;
//                       const maxStock = item.maxStock || item.stockQuantity || 0;
//                       return (
//                         <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
//                           <img 
//                             src={item.image || 'https://via.placeholder.com/50'} 
//                             alt={item.name} 
//                             className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
//                           />
//                           <div className="flex-1">
//                             <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
//                             <p className="text-teal-600 font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
//                             {isTabletForm(item.form) && item.totalTablets && (
//                               <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
//                             )}
                            
//                             {/* Working Quantity Controls */}
//                             <div className="flex items-center justify-between mt-2">
//                               <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
//                                 <button
//                                   onClick={() => handleUpdateQuantity(item, currentQty - 1)}
//                                   className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors"
//                                   disabled={currentQty <= 1}
//                                 >
//                                   <FaMinus className="w-3 h-3 text-gray-600" />
//                                 </button>
//                                 <span className="text-sm font-medium text-gray-700 min-w-[30px] text-center">
//                                   {currentQty}
//                                 </span>
//                                 <button
//                                   onClick={() => handleUpdateQuantity(item, currentQty + 1)}
//                                   className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors"
//                                   disabled={currentQty >= maxStock}
//                                 >
//                                   <FaPlus className="w-3 h-3 text-gray-600" />
//                                 </button>
//                               </div>
//                               <button 
//                                 onClick={() => handleRemoveFromCart(item._id)} 
//                                 className="text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
//                               >
//                                 <FiTrash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                             {currentQty >= maxStock && maxStock > 0 && (
//                               <p className="text-xs text-amber-600 mt-1">Max stock reached</p>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
                  
//                   <div className="border-t border-gray-100 pt-4 space-y-3">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Subtotal</span>
//                       <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Delivery Fee</span>
//                       {deliveryFee === 0 ? (
//                         <span className="text-emerald-600 font-semibold">FREE</span>
//                       ) : (
//                         <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
//                       )}
//                     </div>
//                     {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
//                       <div className="bg-teal-50 rounded-lg p-2">
//                         <p className="text-xs text-teal-700 flex items-center gap-1">
//                           <FiTruck className="w-3 h-3" />
//                           Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
//                         </p>
//                       </div>
//                     )}
//                     <div className="flex justify-between pt-2 border-t border-gray-100">
//                       <span className="font-bold text-gray-800">Total</span>
//                       <span className="font-bold text-xl text-teal-600">Rs. {finalTotal.toFixed(2)}</span>
//                     </div>
//                     <button 
//                       onClick={() => { setShowCart(false); handleCheckout(); }} 
//                       className="w-full py-3.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-semibold text-center"
//                     >
//                       Proceed to Checkout
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes scaleUp {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }
//         .animate-scaleUp {
//           animation: scaleUp 0.2s ease-out;
//         }
//         .animate-slideInRight {
//           animation: slideInRight 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PharmacyDetailPage;

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiPackage,
  FiClock, FiMinus, FiPlus, FiTrash2, FiShare2, FiTag, 
  FiCheckCircle, FiAlertCircle, FiTruck, FiStar, FiX
} from 'react-icons/fi';
import { MdLocalPharmacy, MdVerified, MdDeliveryDining } from 'react-icons/md';
import { FaBox, FaFlask, FaPhoneAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

// Check login function
const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!(token && user);
};

// Login Popup Component with blur effect
const LoginPopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-scaleUp"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">Login Required</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {message || "Please login to add items to cart and place orders."}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-white rounded-lg transition"
                style={{
                  background: "var(--primary-color)",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "var(--hover-color)"}
                onMouseOut={(e) => e.currentTarget.style.background = "var(--primary-color)"}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PharmacyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    cart,
    setCart,
    addToCart, 
    removeFromCart, 
    updateQuantity,
    getPharmacyCartItems,
    getPharmacySubtotal,
    getDeliveryFeeForPharmacy,
    getItemQuantity,
    calculateItemTotal,
    isInitialized: cartInitialized
  } = useCart();
  
  // Helper functions for medicine forms
  const isTabletForm = (form) => {
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return form && tabletForms.some(t => form.toLowerCase().includes(t));
  };
  
  const isSyrupForm = (form) => {
    const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
    return form && syrupForms.some(s => form.toLowerCase().includes(s));
  };
  
  // State variables
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPharmacyUser, setIsPharmacyUser] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
  const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [popupQuantity, setPopupQuantity] = useState(1);

  const [deliveryInfo, setDeliveryInfo] = useState({
    distance: 0,
    estimatedTime: '15-20 min'
  });

  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) return JSON.parse(userStr);
    } catch (error) {
      console.error('Error getting user:', error);
    }
    return null;
  };

  // Initialize authentication
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const loggedIn = checkUserLoggedIn();
        const user = getCurrentUser();
        
        setIsLoggedIn(loggedIn);
        setIsPharmacyUser(user?.role === 'pharmacy');
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsLoggedIn(false);
        setIsPharmacyUser(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
    window.addEventListener('userChanged', initializeAuth);
    window.addEventListener('storage', initializeAuth);
    
    return () => {
      window.removeEventListener('userChanged', initializeAuth);
      window.removeEventListener('storage', initializeAuth);
    };
  }, []);

  // Fetch pharmacy details
  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setPharmacy(data.data);
          if (data.data.deliveryInfo) {
            setDeliveryInfo(prev => ({
              ...prev,
              distance: data.data.deliveryInfo.distance || 0,
              estimatedTime: data.data.deliveryTime || '15-20 min'
            }));
          }
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

  // Calculate distance using geolocation
  useEffect(() => {
    if (pharmacy?.latitude && pharmacy?.longitude && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const distance = calculateHaversineDistance(
            position.coords.latitude, position.coords.longitude,
            pharmacy.latitude, pharmacy.longitude
          );
          setDeliveryInfo(prev => ({ ...prev, distance }));
        },
        (error) => console.log('Geolocation error:', error)
      );
    }
  }, [pharmacy]);

  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  // Fetch medicines for this pharmacy
  useEffect(() => {
    const fetchMedicines = async () => {
      if (!id || !pharmacy) return;
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
            tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
            form: med.form || 'tablet',
            stockQuantity: Math.floor(med.stockQuantity || 0),
            volume: med.volume || '60ml',
            inStock: med.inStock !== false && (med.stockQuantity || 0) > 0,
            reorderLevel: med.reorderLevel || 10
          }));
          setPharmacyMedicines(formatted);
        }
      } catch (err) {
        console.error('Error fetching medicines:', err);
      } finally {
        setMedicineLoading(false);
      }
    };
    
    fetchMedicines();
  }, [id, pharmacy]);

  // Cart calculations
  const pharmacyCartItems = getPharmacyCartItems(id);
  const subtotal = getPharmacySubtotal(id);
  const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
  const finalTotal = subtotal + deliveryFee;
  const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const getCartQuantityForMedicine = (medicineId) => getItemQuantity(medicineId, id);
  
  const getMaxAllowedQuantity = (medicine) => {
    const stockQty = medicine.stockQuantity || 0;
    if (!medicine.inStock || stockQty <= 0) return 0;
    const currentInCart = getCartQuantityForMedicine(medicine._id);
    return Math.max(0, stockQty - currentInCart);
  };

  const isStockAvailable = (medicine, requestedQuantity) => requestedQuantity <= getMaxAllowedQuantity(medicine);

  // Filter medicines based on search
  const filteredMedicines = pharmacyMedicines.filter(medicine => 
    medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLoginRedirect = () => {
    const currentPath = window.location.pathname;
    const searchParams = window.location.search;
    const fullUrl = `${currentPath}${searchParams}`;
    navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&pharmacyId=${id}`);
    setShowLoginPopup(false);
  };

  // Add to cart handlers
  const handleAddToCartClick = (medicine) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    if (isPharmacyUser) {
      setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }

    if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) {
      setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
      setShowSuccessModal(true);
      return;
    }

    const currentInCart = getCartQuantityForMedicine(medicine._id);
    if (currentInCart >= (medicine.stockQuantity || 0)) {
      setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
      setShowSuccessModal(true);
      return;
    }

    if (isTabletForm(medicine.form)) {
      addToCart(medicine, id, { quantity: 1 });
      setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
      setShowSuccessModal(true);
      return;
    }

    setSelectedMedicine(medicine);
    setPopupQuantity(1);
    setShowQuantityPopup(true);
  };

  const confirmAddToCart = () => {
    if (selectedMedicine) {
      if (!isStockAvailable(selectedMedicine, popupQuantity)) {
        const maxAllowed = getMaxAllowedQuantity(selectedMedicine);
        setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
        setShowSuccessModal(true);
        setShowQuantityPopup(false);
        setSelectedMedicine(null);
        return;
      }

      addToCart(selectedMedicine, id, { quantity: popupQuantity });
      const unitText = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
      setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart!`);
      setShowSuccessModal(true);
      setShowQuantityPopup(false);
      setSelectedMedicine(null);
    }
  };

  // FIXED: Update quantity function - using updateQuantity from CartContext
  const handleUpdateQuantity = (item, newQuantity) => {
    const maxStock = item.maxStock || item.stockQuantity || 0;
    
    if (newQuantity > maxStock) {
      setSuccessMessage(`Cannot exceed available stock of ${maxStock} units.`);
      setShowSuccessModal(true);
      return;
    }
    
    if (newQuantity < 1) {
      // Remove item if quantity becomes 0
      removeFromCart(item._id, id);
    } else {
      // Use the context's updateQuantity which handles state correctly
      updateQuantity(item._id, id, newQuantity);
    }
  };

  const handleRemoveFromCart = (medicineId) => removeFromCart(medicineId, id);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    
    if (pharmacyCartItems.length === 0) {
      setShowEmptyCartModal(true);
      return;
    }
    
    if (isPharmacyUser) {
      setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.');
      setShowPharmacyErrorModal(true);
      return;
    }
    
    navigate(`/booking?pharmacy=${id}`);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: pharmacy?.name || 'Pharmacy',
        text: `Check out ${pharmacy?.name} on Pharmacy App`,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShowLinkCopiedModal(true);
        setTimeout(() => setShowLinkCopiedModal(false), 2000);
      }).catch(console.error);
    }
  };

  const handleCallPharmacy = () => setShowCallPharmacyModal(true);
  const confirmCallPharmacy = () => {
    const phoneNumber = pharmacy?.phone || '1800-123-4567';
    window.location.href = `tel:${phoneNumber}`;
    setShowCallPharmacyModal(false);
  };

  const getPerTabletPrice = (medicine) => {
    const stripPrice = medicine.discountedPrice || medicine.price || 0;
    const tabletsPerStrip = medicine.tabletsPerUnit || 10;
    return stripPrice / tabletsPerStrip;
  };

  const getStockStatus = (medicine) => {
    const stockQty = medicine.stockQuantity || 0;
    const reorderLvl = medicine.reorderLevel || 10;
    const currentInCart = getCartQuantityForMedicine(medicine._id);
    const available = stockQty - currentInCart;
    
    if (!medicine.inStock || stockQty <= 0) return { text: 'Out of Stock', color: 'bg-rose-100 text-rose-700' };
    if (available <= 0) return { text: 'Max in Cart', color: 'bg-amber-100 text-amber-700' };
    if (stockQty <= reorderLvl) return { text: `Only ${available} left`, color: 'bg-amber-100 text-amber-700' };
    return { text: 'In Stock', color: 'bg-emerald-100 text-emerald-700' };
  };

  const isAddButtonDisabled = (medicine) => {
    if (isPharmacyUser) return true;
    if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return true;
    const currentInCart = getCartQuantityForMedicine(medicine._id);
    return currentInCart >= (medicine.stockQuantity || 0);
  };

  const getAddButtonText = (medicine) => {
    if (isPharmacyUser) return 'Not Allowed';
    if (!medicine.inStock || (medicine.stockQuantity || 0) <= 0) return 'Out of Stock';
    const currentInCart = getCartQuantityForMedicine(medicine._id);
    if (currentInCart >= (medicine.stockQuantity || 0)) return 'Max Added';
    return 'Add to Cart';
  };

  const getItemTotalPrice = (item) => calculateItemTotal(item);
  const getDisplayQuantity = (item) => {
    const qty = item.quantity || 1;
    if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
    if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
    return `${qty} unit${qty > 1 ? 's' : ''}`;
  };

  // Modal Components
  const QuantityPopupModal = () => {
    if (!selectedMedicine) return null;
    const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
    const unitLabel = isSyrupForm(selectedMedicine.form) ? 'bottle' : 'unit';
    const price = selectedMedicine.discountedPrice || selectedMedicine.price || 0;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Select Quantity</h3>
              <button onClick={() => setShowQuantityPopup(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
            {maxUnitQty <= 5 && maxUnitQty > 0 && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-amber-700 flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />
                  Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
                </p>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Number of {unitLabel}s</span>
                <span className="text-xs text-gray-400">Max: {maxUnitQty}</span>
              </div>
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
                  disabled={popupQuantity <= 1}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  <FiMinus size={18} />
                </button>
                <span className="w-12 text-center font-semibold text-xl">{popupQuantity}</span>
                <button
                  onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
                  disabled={popupQuantity >= maxUnitQty}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  <FiPlus size={18} />
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Price</p>
              <p className="text-2xl font-bold text-teal-700">Rs. {(price * popupQuantity).toFixed(2)}</p>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <button onClick={confirmAddToCart} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiCheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600 mb-6">{successMessage}</p>
          <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const PharmacyErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <FiAlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
          <p className="text-gray-600 mb-6">{successMessage}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
              OK
            </button>
            <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
              Switch Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyCartModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <FiShoppingCart className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
          <p className="text-gray-600 mb-6">Add some medicines to your cart before proceeding to checkout.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
              Continue Shopping
            </button>
            <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium">
              Browse Medicines
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CallPharmacyModal = () => {
    const phoneNumber = pharmacy?.phone || '1800-123-4567';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleUp">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
              <FaPhoneAlt className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Pharmacy</h3>
            <p className="text-gray-600 mb-4">Do you want to call this pharmacy?</p>
            <div className="bg-teal-50 rounded-xl p-4 mb-6">
              <p className="text-lg font-semibold text-teal-700">{phoneNumber}</p>
              <p className="text-sm text-gray-500 mt-1">{pharmacy?.name}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
                Cancel
              </button>
              <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium flex items-center justify-center gap-2">
                <FaPhoneAlt className="w-4 h-4" /> Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LinkCopiedModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiCheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Link Copied!</h3>
          <p className="text-gray-600">Pharmacy link has been copied to clipboard.</p>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading || !isInitialized || !cartInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#9fbfc5]/30 via-white to-[#c0d3dc]/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#2c6774] font-medium">Loading pharmacy...</p>
        </div>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#9fbfc5]/30 via-white to-[#c0d3dc]/30 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <MdLocalPharmacy className="w-20 h-20 text-[#5c878f] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy Not Found</h3>
          <p className="text-gray-500 mb-6">{error || 'The pharmacy you are looking for does not exist.'}</p>
          <button onClick={() => navigate('/pharmacies')} className="px-6 py-3 bg-[#2c6774] text-white rounded-xl hover:bg-[#1e4e56] transition-colors font-medium">
            Browse Pharmacies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9fbfc5]/30 via-white to-[#c0d3dc]/30">
      {/* Modals */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onConfirm={handleLoginRedirect}
        message="Please login to add items to cart and place orders."
      />
      {showSuccessModal && <SuccessModal />}
      {showPharmacyErrorModal && <PharmacyErrorModal />}
      {showEmptyCartModal && <EmptyCartModal />}
      {showCallPharmacyModal && <CallPharmacyModal />}
      {showLinkCopiedModal && <LinkCopiedModal />}
      {showQuantityPopup && <QuantityPopupModal />}

      {/* Pharmacy Info Hero - Gradient Header with Buttons */}
      <div
        className="rounded-b-3xl p-6 sm:p-8 shadow-xl"
        style={{
          background: "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
          color: "var(--white)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Row with Share and Cart Buttons */}
          <div className="flex justify-end items-center gap-3 mb-4">
            <button 
              onClick={handleShare} 
              className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
              title="Share Pharmacy"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowCart(true)} 
              className="relative p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/20"
              title="View Cart"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-[#2c6774] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Pharmacy Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src={pharmacy.image || 'https://via.placeholder.com/100'} 
                alt={pharmacy.name}
                className="relative w-24 h-24 rounded-2xl object-cover bg-white shadow-lg ring-4 ring-white/30"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100'; }}
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 ring-2 ring-white">
                <MdVerified className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{pharmacy.name}</h1>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  <FiStar className="w-3 h-3 fill-current" />
                  <span>4.8</span>
                </div>
              </div>
              <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm">
                <FiMapPin className="w-4 h-4" />
                {pharmacy.address}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
                  <FiClock /> {deliveryInfo.estimatedTime}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
                  <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
                  <FiTag /> {pharmacy.discount || 10}% off
                </span>
              </div>
            </div>
            <button 
              onClick={handleCallPharmacy} 
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium text-sm"
            >
              <FaPhoneAlt className="w-4 h-4" />
              <span>Call</span>
            </button>
          </div>

          {/* Login reminder */}
          {!isLoggedIn && (
            <div className="mt-5 flex justify-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/20 px-3 py-1.5 rounded-full">
                <span className="text-yellow-300">⚠</span>
                <span>Login to add items to cart</span>
                <button
                  onClick={() => setShowLoginPopup(true)} 
                  className="ml-2 px-2 py-0.5 text-xs bg-white/30 hover:bg-white/40 rounded-full transition"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-10 max-w-xl mx-auto relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search medicines by name, generic name, or description..."
            className="w-full rounded-2xl py-4 pl-12 pr-4 outline-none border focus:ring-2 focus:ring-[#5c878f] transition-shadow bg-white"
            style={{
              borderColor: "var(--accent-color)",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Results count */}
        {!medicineLoading && filteredMedicines.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <FiPackage className="w-4 h-4" />
              {filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FiTag className="w-4 h-4" />
              <span>100% Authentic</span>
            </div>
          </div>
        )}

        {/* Medicines Grid - 3-4 cards per row responsive */}
        {medicineLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
                <div className="h-32 bg-gray-100 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-3"></div>
                <div className="h-8 bg-gray-100 rounded w-1/3 mb-3"></div>
                <div className="h-10 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMedicines.map((medicine) => {
              const stockStatus = getStockStatus(medicine);
              const isDisabled = isAddButtonDisabled(medicine);
              const buttonText = getAddButtonText(medicine);
              const currentInCart = getCartQuantityForMedicine(medicine._id);
              const isTablet = isTabletForm(medicine.form);
              const isSyrup = isSyrupForm(medicine.form);
              const tabletsPerStrip = medicine.tabletsPerUnit || 10;
              const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
              const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
              
              return (
                <div
                  key={medicine._id}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3">
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
                    />
                    {hasDiscount && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                        {discountPercent}% OFF
                      </div>
                    )}
                    <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
                      {stockStatus.text}
                    </div>
                    {/* Medicine Form Badge */}
                    <div className="absolute bottom-2 right-2">
                      {isTablet && (
                        <div className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <FaBox className="w-3 h-3" /> Tablet
                        </div>
                      )}
                      {isSyrup && (
                        <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <FaFlask className="w-3 h-3" /> Syrup
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 line-clamp-1 text-sm">{medicine.name}</h3>
                    {medicine.genericName && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{medicine.genericName}</p>
                    )}
                    
                    {/* Description */}
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{medicine.description}</p>
                    
                    {/* Price Section */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#2c6774]">Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</span>
                      {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through">Rs. {medicine.price.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Medicine Details Chips */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {isTablet && (
                        <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                          {tabletsPerStrip} tabs/strip
                        </span>
                      )}
                      {isSyrup && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                          {medicine.volume}
                        </span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Stock: {medicine.stockQuantity}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleAddToCartClick(medicine)}
                        disabled={isDisabled}
                        className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
                          isDisabled 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-[#2c6774] text-white hover:bg-[#1e4e56] active:scale-95 shadow-sm hover:shadow'
                        }`}
                      >
                        <FiShoppingCart className="w-3.5 h-3.5" />
                        {buttonText}
                      </button>
                      <Link 
                        to={`/medicine/${medicine._id}`} 
                        className="px-3 py-2 rounded-lg font-medium text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-[#9fbfc5]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdLocalPharmacy className="w-10 h-10 text-[#5c878f]" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No medicines found</p>
            {searchTerm && <p className="text-gray-400">Try adjusting your search term</p>}
          </div>
        )}
      </div>

      {/* Cart Sidebar Drawer with Working Quantity Controls */}
      {showCart && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slideInRight">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5 text-[#2c6774]" />
                Your Cart
                <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-normal">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                </span>
              </h3>
              <button onClick={() => setShowCart(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-5">
              {pharmacyCartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiShoppingCart className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-medium">Your cart is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
                    {pharmacyCartItems.map((item) => {
                      const currentQty = item.quantity || 1;
                      const maxStock = item.maxStock || item.stockQuantity || 0;
                      return (
                        <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-100">
                          <img 
                            src={item.image || 'https://via.placeholder.com/50'} 
                            alt={item.name} 
                            className="w-14 h-14 rounded-xl object-cover bg-gray-50" 
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                            <p className="text-[#2c6774] font-bold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
                            {isTabletForm(item.form) && item.totalTablets && (
                              <p className="text-xs text-gray-400">{item.totalTablets} tablets total</p>
                            )}
                            
                            {/* Working Quantity Controls */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                                <button
                                  onClick={() => handleUpdateQuantity(item, currentQty - 1)}
                                  className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors"
                                  disabled={currentQty <= 1}
                                >
                                  <FaMinus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="text-sm font-medium text-gray-700 min-w-[30px] text-center">
                                  {currentQty}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item, currentQty + 1)}
                                  className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors"
                                  disabled={currentQty >= maxStock}
                                >
                                  <FaPlus className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                              <button 
                                onClick={() => handleRemoveFromCart(item._id)} 
                                className="text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {currentQty >= maxStock && maxStock > 0 && (
                              <p className="text-xs text-amber-600 mt-1">Max stock reached</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-semibold">FREE</span>
                      ) : (
                        <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                    {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
                      <div className="bg-[#9fbfc5]/20 rounded-lg p-2">
                        <p className="text-xs text-[#2c6774] flex items-center gap-1">
                          <FiTruck className="w-3 h-3" />
                          Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="font-bold text-gray-800">Total</span>
                      <span className="font-bold text-xl text-[#2c6774]">Rs. {finalTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => { setShowCart(false); handleCheckout(); }} 
                      className="w-full py-3.5 bg-[#2c6774] text-white rounded-xl hover:bg-[#1e4e56] transition-all font-semibold text-center"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PharmacyDetailPage;