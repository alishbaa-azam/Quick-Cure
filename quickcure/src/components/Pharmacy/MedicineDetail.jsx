// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaShoppingCart, FaStore, FaTag, FaPills, FaChevronLeft,
//   FaIndustry, FaExclamationTriangle, FaShieldAlt,
//   FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock,
//   FaTruck, FaCheckCircle, FaMinus, FaPlus, FaTrash, FaShareAlt,
//   FaUserMd, FaChevronRight, FaCheck, FaBan,
//   FaPrescriptionBottle, FaHeart, FaStar, FaLeaf, FaMedal,
//   FaBox, FaClipboardList, FaTemperatureLow, FaCalendarAlt, FaDollarSign,
//   FaRegStar, FaRegHeart, FaWhatsapp, FaArrowDown
// } from 'react-icons/fa';
// import { useCart } from '../../contexts/CartContext';
// import CartSidebar from './CartSidebar';
// import MedicineCard from './MedicineCard';

// const MedicineDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     getItemQuantity,
//     calculateItemTotal,
//     getPharmacyCartItems,
//     getPharmacySubtotal,
//     getDeliveryFeeForPharmacy,
//     fetchPharmacyDeliverySettings,
//     calculateDistance: contextCalculateDistance,
//     calculateDeliveryTime: contextCalculateDeliveryTime,
//     isInitialized: cartInitialized
//   } = useCart();

//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('specification');
//   const [relatedMedicines, setRelatedMedicines] = useState([]);
//   const [isAggregatedView, setIsAggregatedView] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isPharmacyUser, setIsPharmacyUser] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   // Refs for section scrolling
//   const descriptionRef = useRef(null);
//   const specificationsRef = useRef(null);
//   const usageRef = useRef(null);
//   const precautionsRef = useRef(null);
//   const additionalRef = useRef(null);
//   const relatedRef = useRef(null);

//   const [stockInfo, setStockInfo] = useState({
//     inStock: false,
//     stockQuantity: 0,
//     reorderLevel: 10,
//     stockStatus: 'Out of Stock',
//     needsReorder: false
//   });

//   const [deliveryInfo, setDeliveryInfo] = useState({
//     deliveryCharge: 50,
//     freeDeliveryThreshold: 500,
//     estimatedDeliveryTime: '30-45 min',
//     distance: 0,
//     baseDeliveryCharge: 50,
//     perKmCharge: 10,
//     preparationTime: 15,
//     averageDeliverySpeed: 20
//   });

//   const [userLocation, setUserLocation] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [pharmacySettings, setPharmacySettings] = useState(null);

//   const [showCart, setShowCart] = useState(false);
//   const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
//   const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const pharmacyCartItems = getPharmacyCartItems ? getPharmacyCartItems(pharmacyId) : [];
//   const cartSubtotal = getPharmacySubtotal ? getPharmacySubtotal(pharmacyId) : 0;
//   const cartDeliveryInfo = getDeliveryFeeForPharmacy && pharmacyId
//     ? getDeliveryFeeForPharmacy(pharmacyId, cartSubtotal, deliveryInfo.distance)
//     : { deliveryFee: 0, freeDeliveryThreshold: 500 };
//   const cartDeliveryFee = cartDeliveryInfo.deliveryFee || 0;
//   const cartFreeDeliveryThreshold = cartDeliveryInfo.freeDeliveryThreshold || 500;
//   const cartFinalTotal = cartSubtotal + cartDeliveryFee;
//   const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

//   const handleCartUpdateQuantity = (item, newQuantity) => {
//     const maxStock = item.maxStock || item.stockQuantity || 0;
//     if (newQuantity > maxStock) return;
//     if (newQuantity < 1) removeFromCart(item._id, pharmacyId);
//     else updateQuantity(item._id, pharmacyId, newQuantity);
//   };
//   const handleCartRemoveFromCart = (medicineId) => removeFromCart(medicineId, pharmacyId);
//   const handleCartCheckout = () => { setShowCart(false); handleCheckout(); };

//   const isTabletForm = (form) => {
//     if (!form) return false;
//     return ['tablet', 'capsule', 'caplet', 'pill'].some(t => form?.toLowerCase().includes(t));
//   };

//   const isSyrupForm = (form) => {
//     if (!form) return false;
//     return ['syrup', 'suspension', 'drops', 'liquid', 'solution'].some(s => form?.toLowerCase().includes(s));
//   };

//   const getUnitLabel = () => {
//     if (!medicine) return 'unit';
//     if (isTabletForm(medicine.form)) return 'strip';
//     if (isSyrupForm(medicine.form)) return 'bottle';
//     return 'unit';
//   };

//   const getUnitDisplayText = () => {
//     if (!medicine) return { singular: 'unit', plural: 'units' };
//     if (isTabletForm(medicine.form)) return { singular: 'strip', plural: 'strips' };
//     if (isSyrupForm(medicine.form)) return { singular: 'bottle', plural: 'bottles' };
//     return { singular: 'unit', plural: 'units' };
//   };

//   const getCurrentUser = () => {
//     try {
//       const userStr = localStorage.getItem('user');
//       if (userStr) return JSON.parse(userStr);
//     } catch {}
//     return null;
//   };

//   const getUserLocation = () =>
//     new Promise((resolve, reject) => {
//       const saved = localStorage.getItem('userLocation');
//       if (saved) {
//         try { const p = JSON.parse(saved); if (p.lat && p.lng) { resolve(p); return; } } catch {}
//       }
//       if (!navigator.geolocation) { reject(new Error('Geolocation not supported')); return; }
//       setLocationLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//           localStorage.setItem('userLocation', JSON.stringify(loc));
//           setUserLocation(loc); setLocationLoading(false); resolve(loc);
//         },
//         () => { setLocationLoading(false); reject(new Error('Unable to get location')); },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
//       );
//     });

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     if (contextCalculateDistance) return contextCalculateDistance(lat1, lon1, lat2, lon2);
//     if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5;
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
//     return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1));
//   };

//   const calculateDeliveryTime = (distance, settings) => {
//     if (contextCalculateDeliveryTime) return contextCalculateDeliveryTime(distance, settings);
//     const s = settings || { averageDeliverySpeed: 20, preparationTime: 15 };
//     const total = Math.round((distance / s.averageDeliverySpeed) * 60 + s.preparationTime);
//     return `${Math.max(15, total - 5)}-${total + 10} min`;
//   };

//   const calculateDeliveryCharge = (distance, orderValue, settings) => {
//     const s = settings || { baseDeliveryCharge: 50, perKmCharge: 10, freeDeliveryThreshold: 500 };
//     let charge = 0;
//     if (orderValue < s.freeDeliveryThreshold) {
//       charge = distance <= 3 ? s.baseDeliveryCharge : s.baseDeliveryCharge + (distance - 3) * s.perKmCharge;
//     }
//     return { deliveryCharge: Math.round(charge), freeDeliveryThreshold: s.freeDeliveryThreshold, distance };
//   };

//   const getAvailableStock = () => {
//     if (!medicine || !selectedPharmacy) return 0;
//     const stockQty = isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
//     const medId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     const pharmId = isAggregatedView ? selectedPharmacy._id : pharmacyId;
//     return Math.max(0, Math.floor(stockQty - getItemQuantity(medId, pharmId)));
//   };

//   const isMedicineInStock = () => {
//     const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
//     return total > 0 && getAvailableStock() > 0;
//   };

//   const isMaxStockReached = () => {
//     const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
//     return total > 0 && getAvailableStock() <= 0;
//   };

//   const isStockAvailable = (q) => getAvailableStock() > 0 && q <= getAvailableStock();
//   const getMaxAllowedQuantity = () => Math.max(0, getAvailableStock());

//   const getStockStatusDisplay = () => {
//     const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
//     const avail = getAvailableStock();
//     const u = getUnitDisplayText();
//     if (total <= 0) return { text: 'Out of Stock', cls: 'text-red-600 bg-red-50', dot: '#EF4444' };
//     if (avail <= 0) return { text: 'Max quantity in cart', cls: 'text-orange-600 bg-orange-50', dot: '#F59E0B' };
//     if (avail <= stockInfo.reorderLevel) return { text: `Low Stock — ${avail} ${avail === 1 ? u.singular : u.plural} left`, cls: 'text-yellow-600 bg-yellow-50', dot: '#F59E0B' };
//     return { text: `In Stock — ${avail} ${avail === 1 ? u.singular : u.plural} available`, cls: 'text-green-600 bg-green-50', dot: '#10B981' };
//   };

//   useEffect(() => {
//     const init = () => {
//       try {
//         const user = getCurrentUser();
//         setIsLoggedIn(!!user);
//         setIsPharmacyUser(user?.role === 'pharmacy');
//       } catch { setIsLoggedIn(false); setIsPharmacyUser(false); }
//       setIsInitialized(true);
//     };
//     init();
//     window.addEventListener('userChanged', init);
//     return () => window.removeEventListener('userChanged', init);
//   }, []);

//   useEffect(() => {
//     getUserLocation().then(setUserLocation).catch(() => {});
//   }, []);

//   const fetchAndUpdateDeliverySettings = async (pharmId) => {
//     if (!pharmId || !fetchPharmacyDeliverySettings) return null;
//     try { const s = await fetchPharmacyDeliverySettings(pharmId); setPharmacySettings(s); return s; } catch { return null; }
//   };

//   const updateDeliveryInfo = (distance, orderValue, settings) => {
//     const calc = calculateDeliveryCharge(distance, orderValue, settings);
//     const time = calculateDeliveryTime(distance, settings);
//     setDeliveryInfo({
//       deliveryCharge: calc.deliveryCharge,
//       freeDeliveryThreshold: calc.freeDeliveryThreshold,
//       estimatedDeliveryTime: time, distance,
//       baseDeliveryCharge: settings?.baseDeliveryCharge || 50,
//       perKmCharge: settings?.perKmCharge || 10,
//       preparationTime: settings?.preparationTime || 15,
//       averageDeliverySpeed: settings?.averageDeliverySpeed || 20
//     });
//   };

//   const fetchPharmacyMedicine = async (pharmIdParam, medIdParam) => {
//     const res = await fetch(`http://localhost:5000/api/pharmacies/${pharmIdParam}/medicines/${medIdParam}`);
//     const data = await res.json();
//     if (!data.success) { setError(data.message || 'Medicine not found'); return; }
//     const md = data.data;
//     const unitPrice = md.price || 0;
//     const discountedUnitPrice = md.discountedPrice || unitPrice;
//     const discountPercentage = discountedUnitPrice && unitPrice > discountedUnitPrice
//       ? Math.round(((unitPrice - discountedUnitPrice) / unitPrice) * 100) : 0;
//     let distance = 2.5;
//     if (md.pharmacy?.location?.coordinates && userLocation) {
//       const [lng, lat] = md.pharmacy.location.coordinates;
//       distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
//     }
//     const settings = await fetchAndUpdateDeliverySettings(pharmIdParam);
//     const stockQty = Math.floor(md.stockQuantity || 0);
//     const reorderLvl = md.reorderLevel || 10;
//     const inStock = md.instock !== false && stockQty > 0;
//     const tabletsPerStrip = md.tabletsPerUnit || md.tabletsPerStrip || 10;
//     const volume = md.volume || md.ml || '60ml';
//     const estimatedDeliveryTime = calculateDeliveryTime(distance, settings);

//     const medicineDetails = {
//       _id: medIdParam, id: `${pharmIdParam}_${medIdParam}`,
//       name: md.name, genericName: md.genericName,
//       description: md.description, detailedDescription: md.detailedDescription || md.description,
//       category: md.category, price: unitPrice,
//       discountedPrice: discountedUnitPrice, discountPercentage,
//       dosage: md.dosage || 'As prescribed', strength: md.strength, form: md.form,
//       manufacturer: md.manufacturer, image: md.image,
//       inStock, instock: inStock,
//       sideEffects: md.sideEffects || [], uses: md.uses || [],
//       precautions: md.precautions || [], instructions: md.instructions || [],
//       storageInstructions: md.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
//       tabletsPerStrip, tabletsPerUnit: tabletsPerStrip, volume,
//       stockQuantity: stockQty, reorderLevel: reorderLvl,
//       pharmacyId: pharmIdParam, pharmacyName: md.pharmacy?.name || 'Pharmacy',
//       pharmacyAddress: md.pharmacy?.address, pharmacyCity: md.pharmacy?.city,
//       pharmacyPhone: md.pharmacy?.phone, pharmacyDeliveryTime: estimatedDeliveryTime,
//       requiresPrescription: md.requiresPrescription || false,
//       availableAtPharmacies: [{
//         _id: pharmIdParam, name: md.pharmacy?.name || 'Pharmacy',
//         city: md.pharmacy?.city, distance: `${distance} km`,
//         deliveryTime: estimatedDeliveryTime, price: unitPrice,
//         discountedPrice: discountedUnitPrice, discountPercentage,
//         uniqueId: `${pharmIdParam}_${medIdParam}`,
//         stockQuantity: stockQty, inStock, instock: inStock,
//         tabletsPerStrip, volume
//       }]
//     };

//     setMedicine(medicineDetails);
//     setPharmacyId(pharmIdParam);
//     setIsAggregatedView(false);
//     setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
//     setStockInfo({ inStock, stockQuantity: stockQty, reorderLevel: reorderLvl, stockStatus: inStock ? (stockQty > reorderLvl ? 'In Stock' : 'Low Stock') : 'Out of Stock', needsReorder: inStock && stockQty <= reorderLvl });
//     updateDeliveryInfo(distance, discountedUnitPrice, settings);
//     if (md.category) fetchRelatedPharmacyMedicines(pharmIdParam, md.category, medIdParam);
//   };

//   const fetchAggregatedMedicine = async (medicineName) => {
//     const res = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodeURIComponent(medicineName)}`);
//     const data = await res.json();
//     if (!data.success) { setError('Medicine not found'); return; }
//     const stats = data.data.stats || {};
//     const lowestPrice = stats.lowestPrice || data.data.medicine.price || 0;
//     const lowestDiscountedPrice = stats.lowestDiscountedPrice || lowestPrice;
//     const discountPercentage = lowestDiscountedPrice && lowestPrice > lowestDiscountedPrice
//       ? Math.round(((lowestPrice - lowestDiscountedPrice) / lowestPrice) * 100) : 0;
//     const hasStock = data.data.availableAt?.some(p => p.instock !== false && (p.stockQuantity || 0) > 0) || false;
//     const tabletsPerStrip = data.data.medicine.tabletsPerUnit || data.data.medicine.tabletsPerStrip || 10;
//     const volume = data.data.medicine.volume || '60ml';

//     const medicineDetails = {
//       _id: medicineName, id: medicineName,
//       name: data.data.medicine.name, genericName: data.data.medicine.genericName,
//       description: data.data.medicine.description, detailedDescription: data.data.medicine.detailedDescription,
//       category: data.data.medicine.category, price: lowestPrice,
//       discountedPrice: lowestDiscountedPrice, discountPercentage,
//       dosage: data.data.medicine.dosage, strength: data.data.medicine.strength,
//       form: data.data.medicine.form, manufacturer: data.data.medicine.manufacturer,
//       image: data.data.medicine.image, inStock: hasStock, instock: hasStock,
//       sideEffects: data.data.medicine.sideEffects || [], uses: data.data.medicine.uses || [],
//       precautions: data.data.medicine.precautions || [], instructions: data.data.medicine.instructions || [],
//       storageInstructions: data.data.medicine.storageInstructions,
//       tabletsPerStrip, tabletsPerUnit: tabletsPerStrip, volume,
//       requiresPrescription: data.data.medicine.requiresPrescription || false,
//       availableAtPharmacies: data.data.availableAt?.map(p => {
//         const pp = p.price || 0;
//         const pd = p.discountedPrice || pp;
//         const pdp = pd && pp > pd ? Math.round(((pp - pd) / pp) * 100) : 0;
//         const sq = Math.floor(p.stockQuantity || 0);
//         const pis = p.instock !== false && sq > 0;
//         return {
//           _id: p.pharmacyId, name: p.pharmacyName, city: p.pharmacyCity,
//           distance: p.distance || '2.5 km', deliveryTime: p.deliveryTime || '30-45 min',
//           price: pp, discountedPrice: pd, discountPercentage: pdp,
//           uniqueId: p.uniqueId || `${p.pharmacyId}_${medicineName}`,
//           stockQuantity: sq, inStock: pis, instock: pis, tabletsPerStrip, volume
//         };
//       }) || [],
//       stats
//     };

//     setMedicine(medicineDetails);
//     setIsAggregatedView(true);
//     if (data.data.availableAt?.length > 0) {
//       const first = medicineDetails.availableAtPharmacies.find(p => p.inStock);
//       setSelectedPharmacy(first || medicineDetails.availableAtPharmacies[0]);
//     }
//     setStockInfo({ inStock: hasStock, stockQuantity: 0, reorderLevel: 10, stockStatus: hasStock ? 'Available' : 'Out of Stock', needsReorder: false });
//     setDeliveryInfo({ deliveryCharge: 50, freeDeliveryThreshold: 500, estimatedDeliveryTime: '30-45 min', distance: 2.5, baseDeliveryCharge: 50, perKmCharge: 10, preparationTime: 15, averageDeliverySpeed: 20 });
//     if (data.data.medicine.category) fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
//   };

//   useEffect(() => {
//     const run = async () => {
//       if (!pharmacyId || !medicine || !selectedPharmacy) return;
//       let dist = deliveryInfo.distance;
//       if (userLocation) dist = calculateDistance(userLocation.lat, userLocation.lng, 31.5, 74.3);
//       const s = await fetchAndUpdateDeliverySettings(pharmacyId);
//       updateDeliveryInfo(dist, calculateFinalPrice(), s);
//     };
//     run();
//   }, [pharmacyId, selectedPharmacy, userLocation, medicine]);

//   useEffect(() => {
//     const run = async () => {
//       try {
//         setLoading(true);
//         const parts = id.split('_');
//         if (parts.length === 2) await fetchPharmacyMedicine(parts[0], parts[1]);
//         else await fetchAggregatedMedicine(id);
//       } catch { setError('Error loading medicine details'); }
//       finally { setLoading(false); }
//     };
//     if (id) run();
//   }, [id, userLocation]);

//   const fetchRelatedPharmacyMedicines = async (pharmIdParam, category, excludeId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/pharmacies/${pharmIdParam}/medicines?category=${category}`);
//       const data = await res.json();
//       if (data.success) {
//         setRelatedMedicines(data.data.filter(m => m._id !== excludeId).map(m => {
//           const mp = m.price || 0; const md = m.discountedPrice || mp;
//           return {
//             _id: `${pharmIdParam}_${m._id}`, name: m.name, description: m.description,
//             price: mp, discountedPrice: md,
//             discountPercentage: md && mp > md ? Math.round(((mp - md) / mp) * 100) : 0,
//             image: m.image, category: m.category, form: m.form,
//             tabletsPerStrip: m.tabletsPerUnit || 10, volume: m.volume || '60ml'
//           };
//         }));
//       }
//     } catch {}
//   };

//   const fetchRelatedAggregatedMedicines = async (category, excludeName) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
//       const data = await res.json();
//       if (data.success) {
//         setRelatedMedicines(data.data.filter(m => m.name !== excludeName).map(m => {
//           const mp = m.lowestPrice || m.price || 0; const md = m.lowestDiscountedPrice || mp;
//           return {
//             _id: m.name, name: m.name, description: m.description,
//             price: mp, discountedPrice: md,
//             discountPercentage: md && mp > md ? Math.round(((mp - md) / mp) * 100) : 0,
//             image: m.image, category: m.category, form: m.form,
//             tabletsPerStrip: m.tabletsPerUnit || 10, volume: m.volume || '60ml'
//           };
//         }));
//       }
//     } catch {}
//   };

//   const getCartQuantityForMedicine = () => {
//     if (!medicine || !selectedPharmacy) return 0;
//     const cartItemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     const pharmId = isAggregatedView ? selectedPharmacy._id : pharmacyId;
//     return getItemQuantity(cartItemId, pharmId);
//   };
//   const quantityInCart = getCartQuantityForMedicine();

//   const handleAddToCart = () => {
//     const user = getCurrentUser();
//     if (!user) { navigate('/login', { state: { redirectTo: `/medicine/${id}`, message: 'Please login to add items to cart' } }); return; }
//     if (user.role === 'pharmacy') { setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.'); setShowPharmacyErrorModal(true); return; }
//     if (!medicine || !selectedPharmacy) return;
//     if (!isMedicineInStock()) { setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`); setShowSuccessModal(true); return; }
//     if (!isStockAvailable(quantity)) {
//       const avail = getAvailableStock(); const u = getUnitDisplayText();
//       setSuccessMessage(`Only ${avail} ${avail === 1 ? u.singular : u.plural} available. Please reduce quantity.`);
//       setShowSuccessModal(true); return;
//     }
//     addToCart({
//       ...medicine,
//       id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
//       _id: isAggregatedView ? selectedPharmacy.uniqueId : medicine._id,
//       selectedPharmacy: { _id: selectedPharmacy._id, name: selectedPharmacy.name },
//       pharmacyName: selectedPharmacy.name,
//       pharmacyId: isAggregatedView ? selectedPharmacy._id : pharmacyId,
//       stockQuantity: isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity,
//       maxStock: isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity,
//       tabletsPerStrip: medicine.tabletsPerStrip || 10,
//       tabletsPerUnit: medicine.tabletsPerStrip || 10,
//       volume: medicine.volume || '60ml',
//       inStock: isAggregatedView ? selectedPharmacy.inStock : medicine.inStock,
//       instock: isAggregatedView ? selectedPharmacy.instock : medicine.instock
//     }, isAggregatedView ? selectedPharmacy._id : pharmacyId, { quantity });
//   };

//   const handleUpdateCartQuantity = (newQ) => {
//     if (!medicine || !selectedPharmacy || newQ < 1) return;
//     const maxStock = isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity;
//     if (newQ > maxStock) return;
//     const mId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
//     const pId = isAggregatedView ? selectedPharmacy._id : pharmacyId;
//     updateQuantity(mId, pId, newQ);
//   };

//   const handleRemoveFromCart = () => {
//     if (!medicine || !selectedPharmacy) return;
//     removeFromCart(isAggregatedView ? selectedPharmacy.uniqueId : medicine.id, isAggregatedView ? selectedPharmacy._id : pharmacyId);
//   };

//   const handleCheckout = () => {
//     if ((cart?.length || 0) === 0) { navigate('/medicines'); return; }
//     if (!isLoggedIn) { navigate('/login', { state: { redirectTo: '/booking', message: 'Please login to checkout' } }); return; }
//     if (isPharmacyUser) { setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.'); setShowPharmacyErrorModal(true); return; }
//     navigate('/booking');
//   };

//   const handleCallPharmacy = () => setShowCallPharmacyModal(true);
//   const confirmCallPharmacy = () => { window.location.href = `tel:${medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567'}`; setShowCallPharmacyModal(false); };

//   const handleShare = () => {
//     if (navigator.share) { navigator.share({ title: medicine?.name, url: window.location.href }).catch(() => {}); }
//     else { navigator.clipboard.writeText(window.location.href).then(() => { setShowLinkCopiedModal(true); setTimeout(() => setShowLinkCopiedModal(false), 2000); }).catch(() => {}); }
//   };

//   const incrementQuantity = () => {
//     const max = getMaxAllowedQuantity();
//     const nq = Math.min(quantity + 1, max);
//     setQuantity(nq);
//     if (quantityInCart > 0) handleUpdateCartQuantity(nq);
//   };
//   const decrementQuantity = () => {
//     const nq = Math.max(quantity - 1, 1);
//     setQuantity(nq);
//     if (quantityInCart > 0) handleUpdateCartQuantity(nq);
//   };

//   const calculateFinalPrice = () => !medicine ? 0 : (medicine.discountedPrice || medicine.price || 0) * quantity;
//   const calculateOriginalPrice = () => !medicine ? 0 : (medicine.price || 0) * quantity;
//   const calculatePerTabletPrice = () => !medicine ? 0 : (medicine.discountedPrice || medicine.price || 0) / (medicine.tabletsPerStrip || 10);
//   const hasDiscount = () => medicine && medicine.discountedPrice && medicine.price > medicine.discountedPrice;
//   const isButtonDisabled = () => {
//     if (isPharmacyUser || !selectedPharmacy) return true;
//     const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
//     return total <= 0 || isMaxStockReached();
//   };

//   // Sync quantity with cart quantity whenever it changes
//   useEffect(() => {
//     if (medicine && selectedPharmacy) {
//       const cartQty = getCartQuantityForMedicine();
//       if (cartQty > 0 && quantity !== cartQty) {
//         setQuantity(cartQty);
//       } else if (cartQty === 0 && quantity === 0) {
//         setQuantity(1);
//       }
//     }
//   }, [medicine, selectedPharmacy, quantityInCart]);

//   useEffect(() => {
//     if (medicine && selectedPharmacy) {
//       const mx = getMaxAllowedQuantity();
//       if (quantity > mx && mx > 0) setQuantity(Math.max(1, mx));
//     }
//   }, [selectedPharmacy, stockInfo.stockQuantity, quantityInCart]);

//   const finalPrice = calculateFinalPrice();
//   const originalTotalPrice = calculateOriginalPrice();
//   const isDiscounted = hasDiscount();
//   const availablePharmacies = medicine?.availableAtPharmacies || [];
//   const visibleRelated = relatedMedicines.slice(0, 3);
//   const perTabletPrice = calculatePerTabletPrice();
//   const tabletsPerStrip = medicine?.tabletsPerStrip || 10;
//   const maxQuantity = getMaxAllowedQuantity();
//   // Use total item count (sum of quantities) for consistent cart badge
//   const cartCount = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
//   const availableStock = getAvailableStock();
//   const stockStatus = getStockStatusDisplay();
//   const totalStock = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
//   const unitLabel = getUnitLabel();
//   const unitDisplayText = getUnitDisplayText();
//   const volume = medicine?.volume || '60ml';
//   const isTablet = isTabletForm(medicine?.form);
//   const isSyrup = isSyrupForm(medicine?.form);

//   let deliveryFee = deliveryInfo.deliveryCharge;
//   let freeDeliveryThreshold = deliveryInfo.freeDeliveryThreshold;
//   if (getDeliveryFeeForPharmacy && pharmacyId) {
//     const dc = getDeliveryFeeForPharmacy(pharmacyId, finalPrice, deliveryInfo.distance);
//     deliveryFee = dc.deliveryFee; freeDeliveryThreshold = dc.freeDeliveryThreshold;
//   } else {
//     deliveryFee = finalPrice >= deliveryInfo.freeDeliveryThreshold ? 0 : deliveryInfo.deliveryCharge;
//   }
//   const finalTotal = finalPrice + deliveryFee;

//   // Scroll to section function
//   const scrollToSection = (ref) => {
//     if (ref && ref.current) {
//       const yOffset = -80;
//       const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
//       window.scrollTo({ top: y, behavior: 'smooth' });
//     }
//   };

//   // Handle back navigation - determine where to go based on where we came from
//   const handleBack = () => {
//     // Check if we have state from the previous page
//     const from = location.state?.from;
    
//     if (from) {
//       // If we have a specific 'from' path in state, go there
//       navigate(from);
//     } else {
//       // Otherwise try to go back one step in history
//       // If we can't go back (no history), go to medicines
//       if (window.history.length > 1) {
//         navigate(-1);
//       } else {
//         navigate('/medicines');
//       }
//     }
//   };

//   const Modal = ({ onBgClick, iconEl, title, body, children, iconBg }) => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onBgClick}>
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
//       <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
//         <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ background: iconBg }}>{iconEl}</div>
//         <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
//         <p className="text-gray-600 text-center mb-6">{body}</p>
//         {children}
//       </div>
//     </div>
//   );

//   if (!isInitialized || !cartInitialized || loading) return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8f0f2 0%, #d1e0e4 100%)' }}>
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#2c6774', borderTopColor: 'transparent' }}></div>
//         <p className="mt-6 text-gray-600 font-medium" style={{ color: '#174047' }}>Loading medicine details...</p>
//       </div>
//     </div>
//   );

//   if (error || !medicine) return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e8f0f2 0%, #d1e0e4 100%)' }}>
//       <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl p-8">
//         <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
//           <FaExclamationTriangle className="w-12 h-12 text-red-500" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
//         <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
//         <button onClick={() => navigate('/medicines')} className="px-8 py-3 text-white rounded-xl transition-colors shadow-lg" style={{ backgroundColor: '#2c6774' }}>
//           Browse Medicines
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f8f9 0%, #e8f0f2 100%)' }}>
//       {/* Modals */}
//       {showCallPharmacyModal && (
//         <Modal onBgClick={() => setShowCallPharmacyModal(false)} iconEl={<FaPhoneAlt className="text-[#2c6774]" size={26} />} iconBg="#E8F0F2" title="Call Pharmacy" body="Do you want to call this pharmacy for assistance?">
//           <div className="rounded-xl p-4 mb-6" style={{ background: '#E8F0F2' }}>
//             <div className="flex items-center justify-center">
//               <FaPhoneAlt className="text-[#2c6774] mr-3" />
//               <span className="text-lg font-semibold text-gray-900">{medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567'}</span>
//             </div>
//             <p className="text-sm text-gray-500 text-center mt-2">{selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}</p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setShowCallPharmacyModal(false)}>Cancel</button>
//             <button className="flex-1 py-3 text-white rounded-xl transition-colors flex items-center justify-center" style={{ backgroundColor: '#2c6774' }} onClick={confirmCallPharmacy}><FaPhoneAlt className="mr-2" />Call Now</button>
//           </div>
//         </Modal>
//       )}

//       {showLinkCopiedModal && (
//         <Modal onBgClick={() => setShowLinkCopiedModal(false)} iconEl={<FaCheck className="text-green-500" size={26} />} iconBg="#D1FAE5" title="Link Copied!" body="Medicine link has been copied to your clipboard." />
//       )}

//       {showSuccessModal && (
//         <Modal onBgClick={() => setShowSuccessModal(false)} iconEl={<FaCheck className="text-green-500" size={26} />} iconBg="#D1FAE5" title="Success!" body={successMessage}>
//           <button className="w-full py-3 text-white rounded-xl transition-colors" style={{ backgroundColor: '#2c6774' }} onClick={() => setShowSuccessModal(false)}>Continue Shopping</button>
//         </Modal>
//       )}

//       {showPharmacyErrorModal && (
//         <Modal onBgClick={() => setShowPharmacyErrorModal(false)} iconEl={<FaBan className="text-red-500" size={26} />} iconBg="#FEE2E2" title="Not Allowed" body={successMessage}>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setShowPharmacyErrorModal(false)}>OK</button>
//             <button className="flex-1 py-3 text-white rounded-xl transition-colors" style={{ backgroundColor: '#2c6774' }} onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }}>Switch Account</button>
//           </div>
//         </Modal>
//       )}

//       {/* Simple Clean Header */}
//       <div className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-14 sm:h-16">
//             <button 
//               onClick={handleBack} 
//               className="text-gray-600 hover:text-[#2c6774] transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-50"
//             >
//               <FaChevronLeft size={20} />
//             </button>
            
//             <div className="flex-1 text-center">
//               <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs inline-block">{medicine.name}</span>
//             </div>

//             <div className="flex items-center gap-1 sm:gap-2">
//               <button onClick={handleShare} className="p-2 text-gray-600 hover:text-[#2c6774] transition-colors rounded-lg hover:bg-gray-50">
//                 <FaShareAlt size={18} />
//               </button>
//               <button 
//                 onClick={() => setShowCart(true)} 
//                 className={`relative p-2 rounded-lg transition-colors ${cartCount === 0 ? 'text-gray-400' : 'text-[#2c6774] hover:bg-gray-50'}`}
//               >
//                 <FaShoppingCart size={20} />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
//         {/* Product Card */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//           <div className="p-5 sm:p-7 md:p-8">
//             <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
//               {/* Image Section */}
//               <div className="w-full lg:w-2/5">
//                 <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center" style={{ minHeight: '240px' }}>
//                   <img
//                     src={medicine.image}
//                     alt={medicine.name}
//                     className="max-h-48 sm:max-h-56 object-contain"
//                     onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
//                   />
//                   {isDiscounted && (
//                     <div className="absolute top-3 left-3">
//                       <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
//                         {medicine.discountPercentage}% OFF
//                       </span>
//                     </div>
//                   )}
//                   {medicine.requiresPrescription && (
//                     <div className="absolute top-3 right-3">
//                       <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
//                         <FaPrescriptionBottle className="inline mr-1" size={12} />
//                         Rx
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Product Details */}
//               <div className="w-full lg:w-3/5">
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{medicine.name}</h1>
//                     {medicine.strength && (
//                       <p className="text-sm text-gray-500 font-medium mt-0.5">{medicine.strength}</p>
//                     )}
//                     <p className="text-xs text-gray-400 mt-1">by {medicine.manufacturer || 'Not specified'}</p>
//                   </div>
//                   {/* <button 
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                     className="flex-shrink-0 p-2 rounded-full hover:bg-gray-50 transition-colors"
//                   >
//                     {isWishlisted ? (
//                       <FaHeart className="text-red-500" size={20} />
//                     ) : (
//                       <FaRegHeart className="text-gray-400 hover:text-red-400" size={20} />
//                     )}
//                   </button> */}
//                 </div>

//                 {/* Pricing */}
//                 <div className="mt-3 flex items-baseline gap-3">
//                   <span className="text-2xl sm:text-3xl font-bold text-[#2c6774]">Rs. {finalPrice.toFixed(2)}</span>
//                   {isDiscounted && (
//                     <span className="text-base sm:text-lg text-gray-400 line-through">Rs. {originalTotalPrice.toFixed(2)}</span>
//                   )}
//                   {isDiscounted && (
//                     <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">Save {medicine.discountPercentage}%</span>
//                   )}
//                 </div>

//                 {/* Unit Info */}
//                 <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
//                   <span className="text-gray-500">Pack size:</span>
//                   <span className="font-semibold text-gray-800">
//                     {isTablet ? `${tabletsPerStrip} tablets` : isSyrup ? volume : `1 ${unitLabel}`}
//                   </span>
//                   {isTablet && (
//                     <span className="text-xs text-gray-400">(Rs. {perTabletPrice.toFixed(2)}/tablet)</span>
//                   )}
//                 </div>

//                 {/* Stock Status */}
//                 <div className="mt-3 flex flex-wrap items-center gap-3">
//                   <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${stockStatus.cls}`}>
//                     <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: stockStatus.dot }} />
//                     {stockStatus.text}
//                   </div>
//                   {quantityInCart > 0 && (
//                     <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-lg">
//                       {quantityInCart} in cart
//                     </span>
//                   )}
//                 </div>

//                 {/* Quantity Control - Shows cart quantity when in cart */}
//                 <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
//                   {isMedicineInStock() && !isMaxStockReached() && !isPharmacyUser && (
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
//                         <button 
//                           onClick={decrementQuantity} 
//                           disabled={quantity <= 1} 
//                           className="w-9 h-9 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center transition-colors"
//                         >
//                           <FaMinus size={12} className="text-gray-600" />
//                         </button>
//                         <div className="w-12 h-9 flex items-center justify-center font-semibold text-gray-800">{quantity}</div>
//                         <button 
//                           onClick={incrementQuantity} 
//                           disabled={quantity >= maxQuantity || maxQuantity <= 0} 
//                           className="w-9 h-9 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center transition-colors"
//                         >
//                           <FaPlus size={12} className="text-gray-600" />
//                         </button>
//                       </div>
//                       {isTablet && (
//                         <span className="text-xs text-gray-500">{quantity * tabletsPerStrip} tablets total</span>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 {/* <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
//                   {quantityInCart > 0 ? (
//                     <>
                      
//                       <div className="flex items-center gap-2 flex-1">
//                         <div className="flex items-center border-2 border-[#2c6774] rounded-lg overflow-hidden bg-white">
//                           <button 
//                             onClick={decrementQuantity} 
//                             disabled={quantity <= 1} 
//                             className="w-10 h-10 bg-[#2c6774] hover:bg-[#1e4e56] disabled:opacity-50 flex items-center justify-center transition-colors"
//                           >
//                             <FaMinus size={12} className="text-white" />
//                           </button>
//                           <div className="w-14 h-10 flex items-center justify-center font-bold text-gray-800 text-base">{quantity}</div>
//                           <button 
//                             onClick={incrementQuantity} 
//                             disabled={quantity >= maxQuantity || maxQuantity <= 0} 
//                             className="w-10 h-10 bg-[#2c6774] hover:bg-[#1e4e56] disabled:opacity-50 flex items-center justify-center transition-colors"
//                           >
//                             <FaPlus size={12} className="text-white" />
//                           </button>
//                         </div>
//                         <button
//                           onClick={handleRemoveFromCart}
//                           className="px-3 py-2 border-2 border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm"
//                           title="Remove from cart"
//                         >
//                           <FaTrash size={14} />
//                         </button>
//                       </div>
//                       <button
//                         onClick={handleCheckout}
//                         className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all text-sm bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
//                       >
//                         <FaShoppingCart className="inline mr-2" /> Checkout
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isButtonDisabled() || isPharmacyUser}
//                       className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all text-sm ${
//                         !isButtonDisabled() && !isPharmacyUser
//                           ? 'hover:opacity-90 shadow-md hover:shadow-lg'
//                           : 'bg-gray-300 cursor-not-allowed shadow-none'
//                       }`}
//                       style={!isButtonDisabled() && !isPharmacyUser ? { backgroundColor: '#2c6774' } : {}}
//                     >
//                       {isPharmacyUser ? (
//                         <><FaBan className="inline mr-2" /> Not Allowed</>
//                       ) : totalStock <= 0 ? (
//                         <><FaBan className="inline mr-2" /> Out of Stock</>
//                       ) : isMaxStockReached() ? (
//                         <><FaBan className="inline mr-2" /> Max Added</>
//                       ) : (
//                         <><FaShoppingCart className="inline mr-2" /> Add to Cart</>
//                       )}
//                     </button>
//                   )}
//                 </div> */}

//                 {/* Delivery Info Cards */}
//                 {/* <div className="mt-5 grid grid-cols-3 gap-2.5">
//                   <div className="bg-gray-50 rounded-lg p-3 text-center">
//                     <div className="flex justify-center mb-1">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                         <FaClock className="text-[#2c6774]" size={14} />
//                       </div>
//                     </div>
//                     <p className="text-[10px] text-gray-500">Delivery</p>
//                     <p className="text-xs font-semibold text-gray-800">{deliveryInfo.estimatedDeliveryTime}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-3 text-center">
//                     <div className="flex justify-center mb-1">
//                       <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//                         <FaTruck className="text-green-600" size={14} />
//                       </div>
//                     </div>
//                     <p className="text-[10px] text-gray-500">Delivery Fee</p>
//                     <p className="text-xs font-semibold text-gray-800">{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-3 text-center">
//                     <div className="flex justify-center mb-1">
//                       <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
//                         <FaPhoneAlt className="text-purple-600" size={14} />
//                       </div>
//                     </div>
//                     <p className="text-[10px] text-gray-500">Support</p>
//                     <button onClick={handleCallPharmacy} className="text-xs font-semibold text-[#2c6774] hover:underline">Call</button>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pharmacy Selection */}
//         {isAggregatedView && availablePharmacies.length > 1 && (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mt-5">
//             <h3 className="font-bold text-gray-900 mb-3 flex items-center text-base">
//               <FaStore className="text-[#2c6774] mr-2" size={18} />
//               Available Pharmacies
//               <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{availablePharmacies.length} options</span>
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
//               {availablePharmacies.map(pharm => {
//                 const isSelected = selectedPharmacy?._id === pharm._id;
//                 const inStock = pharm.inStock && (pharm.stockQuantity || 0) > 0;
//                 return (
//                   <button
//                     key={pharm._id}
//                     onClick={() => setSelectedPharmacy(pharm)}
//                     disabled={!inStock}
//                     className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
//                       isSelected
//                         ? 'border-[#2c6774] bg-[#f0f6f7] shadow-md'
//                         : inStock
//                           ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//                           : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
//                     }`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <span className="font-semibold text-gray-800 text-sm">{pharm.name}</span>
//                       {!inStock && (
//                         <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">OOS</span>
//                       )}
//                       {isSelected && <FaCheckCircle className="text-green-500" size={16} />}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
//                       <span><FaMapMarkerAlt className="inline mr-1" size={11} />{pharm.distance}</span>
//                       <span><FaClock className="inline mr-1" size={11} />{pharm.deliveryTime}</span>
//                     </div>
//                     <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
//                       <span className="font-bold text-[#2c6774]">Rs. {(pharm.discountedPrice || pharm.price).toFixed(2)}</span>
//                       {pharm.discountPercentage > 0 && (
//                         <span className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-semibold">-{pharm.discountPercentage}%</span>
//                       )}
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Section Navigation Buttons */}
//         <div className="mt-5 flex flex-wrap gap-2">
//           <button
//             onClick={() => scrollToSection(descriptionRef)}
//             className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
//           >
//             <FaInfoCircle size={14} className="text-[#2c6774]" />
//             Description
//           </button>
//           <button
//             onClick={() => scrollToSection(specificationsRef)}
//             className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
//           >
//             <FaClipboardList size={14} className="text-[#2c6774]" />
//             Specifications
//           </button>
//           <button
//             onClick={() => scrollToSection(usageRef)}
//             className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
//           >
//             <FaUserMd size={14} className="text-[#2c6774]" />
//             Usage & Safety
//           </button>
//           <button
//             onClick={() => scrollToSection(precautionsRef)}
//             className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
//           >
//             <FaShieldAlt size={14} className="text-[#2c6774]" />
//             Precautions
//           </button>
//           <button
//             onClick={() => scrollToSection(additionalRef)}
//             className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
//           >
//             <FaPrescriptionBottle size={14} className="text-[#2c6774]" />
//             Additional Info
//           </button>
//           {relatedMedicines.length > 0 && (
//             <button
//               onClick={() => scrollToSection(relatedRef)}
//               className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
//             >
//               <FaLeaf size={14} className="text-[#2c6774]" />
//               Related
//             </button>
//           )}
//         </div>

//         {/* Details Section - Sequential Layout with Refs */}
//         <div className="mt-5 space-y-4">
//           {/* Product Description */}
//           <div ref={descriptionRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
//             <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center">
//               <FaInfoCircle className="text-[#2c6774] mr-2" size={16} />
//               About this medicine
//             </h3>
//             <p className="text-sm text-gray-700 leading-relaxed">{medicine.detailedDescription || medicine.description || 'No description available.'}</p>
//           </div>

//           {/* Specifications Grid */}
//           <div ref={specificationsRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
//             <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
//               <FaClipboardList className="text-[#2c6774] mr-2" size={16} />
//               Specifications
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-sm text-gray-500">Generic Name</span>
//                 <span className="text-sm font-medium text-gray-800 text-right">{medicine.genericName || 'N/A'}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-sm text-gray-500">Category</span>
//                 <span className="text-sm font-medium text-gray-800 text-right">{medicine.category || 'N/A'}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-sm text-gray-500">Dosage Form</span>
//                 <span className="text-sm font-medium text-gray-800 text-right">{medicine.form || 'N/A'}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-sm text-gray-500">Strength</span>
//                 <span className="text-sm font-medium text-gray-800 text-right">{medicine.strength || 'N/A'}</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-50">
//                 <span className="text-sm text-gray-500">Manufacturer</span>
//                 <span className="text-sm font-medium text-gray-800 text-right">{medicine.manufacturer || 'N/A'}</span>
//               </div>
//               <div className="flex justify-between py-2">
//                 <span className="text-sm text-gray-500">Requires Prescription</span>
//                 <span className="text-sm font-medium text-gray-800 text-right">{medicine.requiresPrescription ? 'Yes' : 'No'}</span>
//               </div>
//             </div>
//           </div>

//           {/* Usage & Safety */}
//           <div ref={usageRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
//             <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
//               <FaUserMd className="text-[#2c6774] mr-2" size={16} />
//               Usage & Safety
//             </h3>
            
//             {medicine.dosage && (
//               <div className="mb-3 bg-blue-50 rounded-lg p-3">
//                 <p className="text-xs font-semibold text-blue-700 mb-0.5">Dosage</p>
//                 <p className="text-sm text-gray-700">{medicine.dosage}</p>
//               </div>
//             )}
            
//             {medicine.uses?.length > 0 && (
//               <div className="mb-3 bg-green-50 rounded-lg p-3">
//                 <p className="text-xs font-semibold text-green-700 mb-1">Indications</p>
//                 <ul className="space-y-0.5">
//                   {medicine.uses.map((use, i) => (
//                     <li key={i} className="flex items-start text-sm text-gray-700">
//                       <span className="text-green-500 mr-2">✓</span>
//                       <span>{use}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             {medicine.sideEffects?.length > 0 && (
//               <div className="bg-red-50 rounded-lg p-3">
//                 <p className="text-xs font-semibold text-red-700 mb-1">Side Effects</p>
//                 <ul className="space-y-0.5">
//                   {medicine.sideEffects.map((effect, i) => (
//                     <li key={i} className="flex items-start text-sm text-gray-700">
//                       <span className="text-red-400 mr-2">•</span>
//                       <span>{effect}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Precautions */}
//           <div ref={precautionsRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
//             <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
//               <FaShieldAlt className="text-[#2c6774] mr-2" size={16} />
//               Precautions
//             </h3>
//             {medicine.precautions?.length > 0 ? (
//               <div className="space-y-2">
//                 {medicine.precautions.map((p, i) => (
//                   <div key={i} className="flex items-start bg-yellow-50 rounded-lg p-3 border border-yellow-100">
//                     <FaExclamationTriangle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
//                     <span className="text-sm text-gray-700">{p}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500 italic bg-gray-50 rounded-lg p-3 text-center">No specific precautions listed.</p>
//             )}
//           </div>

//           {/* Additional Information */}
//           <div ref={additionalRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
//             <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
//               <FaPrescriptionBottle className="text-[#2c6774] mr-2" size={16} />
//               Additional Information
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-xs text-gray-500">Storage</p>
//                 <p className="text-sm font-medium text-gray-800">{medicine.storageInstructions || 'Store in a cool, dry place'}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-xs text-gray-500">Pregnancy Warning</p>
//                 <p className="text-sm font-medium text-gray-800">Consult your physician</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-xs text-gray-500">Pack Size</p>
//                 <p className="text-sm font-medium text-gray-800">
//                   {isTablet ? `${tabletsPerStrip} tablets/strip` : isSyrup ? volume : '1 unit'}
//                 </p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-xs text-gray-500">Price per Unit</p>
//                 <p className="text-sm font-medium text-gray-800">Rs. {(medicine.discountedPrice || medicine.price || 0).toFixed(2)}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedMedicines.length > 0 && (
//           <div ref={relatedRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mt-5 scroll-mt-20">
//             <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center">
//               <FaLeaf className="text-[#2c6774] mr-2" size={16} />
//               You Might Also Like
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {visibleRelated.map(rel => (
//                 <MedicineCard
//                   key={rel._id}
//                   medicine={rel}
//                   context="all-medicines"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Trust Strip */}
//         <div className="mt-5 rounded-2xl p-5 shadow-lg" style={{ background: 'linear-gradient(135deg, #2c6774 0%, #174047 100%)' }}>
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
//                 <FaShieldAlt className="text-white text-lg" />
//               </div>
//               <div>
//                 <h3 className="text-white font-bold text-sm">100% Safe & Secure</h3>
//                 <p className="text-white/80 text-xs">Your health is our priority</p>
//               </div>
//             </div>
//             <div className="flex gap-6">
//               <div className="text-center">
//                 <div className="text-white font-bold text-lg">10K+</div>
//                 <div className="text-white/70 text-[10px]">Happy Customers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-lg">24/7</div>
//                 <div className="text-white/70 text-[10px]">Support</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-white font-bold text-lg">100%</div>
//                 <div className="text-white/70 text-[10px]">Authentic</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cart Sidebar */}
//       <CartSidebar
//         isOpen={showCart}
//         onClose={() => setShowCart(false)}
//         cartItems={pharmacyCartItems}
//         cartItemCount={cartItemCount}
//         subtotal={cartSubtotal}
//         deliveryFee={cartDeliveryFee}
//         freeDeliveryThreshold={cartFreeDeliveryThreshold}
//         finalTotal={cartFinalTotal}
//         onUpdateQuantity={handleCartUpdateQuantity}
//         onRemoveFromCart={handleCartRemoveFromCart}
//         onCheckout={handleCartCheckout}
//         getItemTotalPrice={calculateItemTotal || ((item) => (item.discountedPrice || item.price || 0) * (item.quantity || 1))}
//         getDisplayQuantity={(item) => {
//           const qty = item.quantity || 1;
//           if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
//           if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
//           return `${qty} unit${qty > 1 ? 's' : ''}`;
//         }}
//         isTabletForm={isTabletForm}
//         getPharmacySubtotal={getPharmacySubtotal}
//         getDeliveryFeeForPharmacy={getDeliveryFeeForPharmacy}
//         pharmacyDeliveryCache={pharmacyDeliveryCache}
//       />
//     </div>
//   );
// };

// export default MedicineDetail;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaShoppingCart, FaStore, FaTag, FaPills, FaChevronLeft,
  FaIndustry, FaExclamationTriangle, FaShieldAlt,
  FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock,
  FaTruck, FaCheckCircle, FaMinus, FaPlus, FaTrash, FaShareAlt,
  FaUserMd, FaChevronRight, FaCheck, FaBan,
  FaPrescriptionBottle, FaHeart, FaStar, FaLeaf, FaMedal,
  FaBox, FaClipboardList, FaTemperatureLow, FaCalendarAlt, FaDollarSign,
  FaRegStar, FaRegHeart, FaWhatsapp, FaArrowDown
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import CartSidebar from './CartSidebar';
import MedicineCard from './MedicineCard';

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    calculateItemTotal,
    getPharmacyCartItems,
    getPharmacySubtotal,
    getDeliveryFeeForPharmacy,
    fetchPharmacyDeliverySettings,
    calculateDistance: contextCalculateDistance,
    calculateDeliveryTime: contextCalculateDeliveryTime,    
    pharmacyDeliveryCache,
    isInitialized: cartInitialized
  } = useCart();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('specification');
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [isAggregatedView, setIsAggregatedView] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPharmacyUser, setIsPharmacyUser] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Refs for section scrolling
  const descriptionRef = useRef(null);
  const specificationsRef = useRef(null);
  const usageRef = useRef(null);
  const precautionsRef = useRef(null);
  const additionalRef = useRef(null);
  const relatedRef = useRef(null);

  const [stockInfo, setStockInfo] = useState({
    inStock: false,
    stockQuantity: 0,
    reorderLevel: 10,
    stockStatus: 'Out of Stock',
    needsReorder: false
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryCharge: 50,
    freeDeliveryThreshold: 500,
    estimatedDeliveryTime: '30-45 min',
    distance: 0,
    baseDeliveryCharge: 50,
    perKmCharge: 10,
    preparationTime: 15,
    averageDeliverySpeed: 20
  });

  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [pharmacySettings, setPharmacySettings] = useState(null);

  const [showCart, setShowCart] = useState(false);
  const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
  const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  // Removed popup modals - no popups when adding to cart
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
  // const [successMessage, setSuccessMessage] = useState('');

  // Global cart calculations
  const cartSubtotal = getCartSubtotal();
  const { deliveryFee: cartDeliveryFee, freeDeliveryThreshold: cartFreeDeliveryThreshold } = getCartDeliveryFee(cartSubtotal);
  const cartFinalTotal = getCartTotal();
  const cartItemCount = getTotalItemCount();

  const handleCartUpdateQuantity = (item, newQuantity) => {
    if (!item) return;
    const itemPharmacyId = item.pharmacyId || item.selectedPharmacy?._id;
    if (!itemPharmacyId) return;

    const maxStock = item.maxStock || item.stockQuantity || 0;
    if (newQuantity > maxStock) return;
    if (newQuantity < 1) removeFromCart(item._id, itemPharmacyId);
    else updateQuantity(item._id, itemPharmacyId, newQuantity);
  };
  
  const handleCartRemoveFromCart = (medicineId) => {
    const item = cart.find(i => i._id === medicineId || i.id === medicineId);
    if (item) {
      const itemPharmacyId = item.pharmacyId || item.selectedPharmacy?._id;
      if (itemPharmacyId) {
        removeFromCart(medicineId, itemPharmacyId);
      }
    }
  };
  
  const handleCartCheckout = () => { 
    setShowCart(false); 
    handleCheckout(); 
  };

  const isTabletForm = (form) => {
    if (!form) return false;
    return ['tablet', 'capsule', 'caplet', 'pill'].some(t => form?.toLowerCase().includes(t));
  };

  const isSyrupForm = (form) => {
    if (!form) return false;
    return ['syrup', 'suspension', 'drops', 'liquid', 'solution'].some(s => form?.toLowerCase().includes(s));
  };

  const getUnitLabel = () => {
    if (!medicine) return 'unit';
    if (isTabletForm(medicine.form)) return 'strip';
    if (isSyrupForm(medicine.form)) return 'bottle';
    return 'unit';
  };

  const getUnitDisplayText = () => {
    if (!medicine) return { singular: 'unit', plural: 'units' };
    if (isTabletForm(medicine.form)) return { singular: 'strip', plural: 'strips' };
    if (isSyrupForm(medicine.form)) return { singular: 'bottle', plural: 'bottles' };
    return { singular: 'unit', plural: 'units' };
  };

  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) return JSON.parse(userStr);
    } catch {
      return null;
    }
    return null;
  };

  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      const saved = localStorage.getItem('userLocation');
      if (saved) {
        try { 
          const p = JSON.parse(saved); 
          if (p.lat && p.lng) { 
            setUserLocation(p);
            resolve(p); 
            return; 
          } 
        } catch {}
      }
      if (!navigator.geolocation) { 
        reject(new Error('Geolocation not supported')); 
        return; 
      }
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          localStorage.setItem('userLocation', JSON.stringify(loc));
          setUserLocation(loc); 
          setLocationLoading(false); 
          resolve(loc);
        },
        () => { 
          setLocationLoading(false); 
          reject(new Error('Unable to get location')); 
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (contextCalculateDistance) return contextCalculateDistance(lat1, lon1, lat2, lon2);
    if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1));
  };

  const calculateDeliveryTime = (distance, settings) => {
    if (contextCalculateDeliveryTime) return contextCalculateDeliveryTime(distance, settings);
    const s = settings || { averageDeliverySpeed: 20, preparationTime: 15 };
    const total = Math.round((distance / s.averageDeliverySpeed) * 60 + s.preparationTime);
    return `${Math.max(15, total - 5)}-${total + 10} min`;
  };

  const calculateDeliveryCharge = (distance, orderValue, settings) => {
    const s = settings || { baseDeliveryCharge: 50, perKmCharge: 10, freeDeliveryThreshold: 500 };
    let charge = 0;
    if (orderValue < s.freeDeliveryThreshold) {
      charge = distance <= 3 ? s.baseDeliveryCharge : s.baseDeliveryCharge + (distance - 3) * s.perKmCharge;
    }
    return { deliveryCharge: Math.round(charge), freeDeliveryThreshold: s.freeDeliveryThreshold, distance };
  };

  const getAvailableStock = () => {
    if (!medicine || !selectedPharmacy) return 0;
    const stockQty = isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
    const medId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    const pharmId = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    const inCart = getItemQuantity(medId, pharmId);
    return Math.max(0, Math.floor(stockQty - (inCart || 0)));
  };

  const isMedicineInStock = () => {
    const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
    return total > 0 && getAvailableStock() > 0;
  };

  const isMaxStockReached = () => {
    const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
    return total > 0 && getAvailableStock() <= 0;
  };

  const isStockAvailable = (q) => getAvailableStock() > 0 && q <= getAvailableStock();
  const getMaxAllowedQuantity = () => Math.max(0, getAvailableStock());

  const getStockStatusDisplay = () => {
    const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
    const avail = getAvailableStock();
    const u = getUnitDisplayText();
    if (total <= 0) return { text: 'Out of Stock', cls: 'text-red-600 bg-red-50', dot: '#EF4444' };
    if (avail <= 0) return { text: 'Max quantity in cart', cls: 'text-orange-600 bg-orange-50', dot: '#F59E0B' };
    if (avail <= stockInfo.reorderLevel) return { text: `Low Stock — ${avail} ${avail === 1 ? u.singular : u.plural} left`, cls: 'text-yellow-600 bg-yellow-50', dot: '#F59E0B' };
    return { text: `In Stock — ${avail} ${avail === 1 ? u.singular : u.plural} available`, cls: 'text-green-600 bg-green-50', dot: '#10B981' };
  };

  useEffect(() => {
    const init = () => {
      try {
        const user = getCurrentUser();
        setIsLoggedIn(!!user);
        setIsPharmacyUser(user?.role === 'pharmacy');
      } catch { 
        setIsLoggedIn(false); 
        setIsPharmacyUser(false); 
      }
      setIsInitialized(true);
    };
    init();
    window.addEventListener('userChanged', init);
    return () => window.removeEventListener('userChanged', init);
  }, []);

  useEffect(() => {
    getUserLocation().then(setUserLocation).catch(() => {});
  }, []);

  const fetchAndUpdateDeliverySettings = async (pharmId) => {
    if (!pharmId || !fetchPharmacyDeliverySettings) return null;
    try { 
      const s = await fetchPharmacyDeliverySettings(pharmId); 
      setPharmacySettings(s); 
      return s; 
    } catch { 
      return null; 
    }
  };

  const updateDeliveryInfo = (distance, orderValue, settings) => {
    const calc = calculateDeliveryCharge(distance, orderValue, settings);
    const time = calculateDeliveryTime(distance, settings);
    setDeliveryInfo({
      deliveryCharge: calc.deliveryCharge,
      freeDeliveryThreshold: calc.freeDeliveryThreshold,
      estimatedDeliveryTime: time, 
      distance,
      baseDeliveryCharge: settings?.baseDeliveryCharge || 50,
      perKmCharge: settings?.perKmCharge || 10,
      preparationTime: settings?.preparationTime || 15,
      averageDeliverySpeed: settings?.averageDeliverySpeed || 20
    });
  };

  const fetchPharmacyMedicine = async (pharmIdParam, medIdParam) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pharmacies/${pharmIdParam}/medicines/${medIdParam}`);
      const data = await res.json();
      if (!data.success) { 
        setError(data.message || 'Medicine not found'); 
        return; 
      }
      const md = data.data;
      const unitPrice = md.price || 0;
      const discountedUnitPrice = md.discountedPrice || unitPrice;
      const discountPercentage = discountedUnitPrice && unitPrice > discountedUnitPrice
        ? Math.round(((unitPrice - discountedUnitPrice) / unitPrice) * 100) : 0;
      let distance = 2.5;
      if (md.pharmacy?.location?.coordinates && userLocation) {
        const [lng, lat] = md.pharmacy.location.coordinates;
        distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
      }
      const settings = await fetchAndUpdateDeliverySettings(pharmIdParam);
      const stockQty = Math.floor(md.stockQuantity || 0);
      const reorderLvl = md.reorderLevel || 10;
      const inStock = md.instock !== false && stockQty > 0;
      const tabletsPerStrip = md.tabletsPerUnit || md.tabletsPerStrip || 10;
      const volume = md.volume || md.ml || '60ml';

      const medicineDetails = {
        _id: medIdParam, 
        id: `${pharmIdParam}_${medIdParam}`,
        name: md.name, 
        genericName: md.genericName,
        description: md.description, 
        detailedDescription: md.detailedDescription || md.description,
        category: md.category, 
        price: unitPrice,
        discountedPrice: discountedUnitPrice, 
        discountPercentage,
        dosage: md.dosage || 'As prescribed', 
        strength: md.strength, 
        form: md.form,
        manufacturer: md.manufacturer, 
        image: md.image,
        inStock, 
        instock: inStock,
        sideEffects: md.sideEffects || [], 
        uses: md.uses || [],
        precautions: md.precautions || [], 
        instructions: md.instructions || [],
        storageInstructions: md.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
        tabletsPerStrip, 
        tabletsPerUnit: tabletsPerStrip, 
        volume,
        stockQuantity: stockQty, 
        reorderLevel: reorderLvl,
        pharmacyId: pharmIdParam, 
        pharmacyName: md.pharmacy?.name || 'Pharmacy',
        pharmacyAddress: md.pharmacy?.address, 
        pharmacyCity: md.pharmacy?.city,
        pharmacyPhone: md.pharmacy?.phone, 
        pharmacyDeliveryTime: calculateDeliveryTime(distance, settings),
        requiresPrescription: md.requiresPrescription || false,
        availableAtPharmacies: [{
          _id: pharmIdParam, 
          name: md.pharmacy?.name || 'Pharmacy',
          city: md.pharmacy?.city, 
          distance: `${distance} km`,
          deliveryTime: calculateDeliveryTime(distance, settings), 
          price: unitPrice,
          discountedPrice: discountedUnitPrice, 
          discountPercentage,
          uniqueId: `${pharmIdParam}_${medIdParam}`,
          stockQuantity: stockQty, 
          inStock, 
          instock: inStock,
          tabletsPerStrip, 
          volume
        }]
      };

      setMedicine(medicineDetails);
      setPharmacyId(pharmIdParam);
      setIsAggregatedView(false);
      setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
      setStockInfo({ 
        inStock, 
        stockQuantity: stockQty, 
        reorderLevel: reorderLvl, 
        stockStatus: inStock ? (stockQty > reorderLvl ? 'In Stock' : 'Low Stock') : 'Out of Stock', 
        needsReorder: inStock && stockQty <= reorderLvl 
      });
      updateDeliveryInfo(distance, discountedUnitPrice, settings);
      if (md.category) fetchRelatedPharmacyMedicines(pharmIdParam, md.category, medIdParam);
    } catch (err) {
      console.error('Error fetching pharmacy medicine:', err);
      setError('Failed to load medicine details');
    }
  };

  const fetchAggregatedMedicine = async (medicineName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodeURIComponent(medicineName)}`);
      const data = await res.json();
      if (!data.success) { 
        setError('Medicine not found'); 
        return; 
      }
      const stats = data.data.stats || {};
      const lowestPrice = stats.lowestPrice || data.data.medicine.price || 0;
      const lowestDiscountedPrice = stats.lowestDiscountedPrice || lowestPrice;
      const discountPercentage = lowestDiscountedPrice && lowestPrice > lowestDiscountedPrice
        ? Math.round(((lowestPrice - lowestDiscountedPrice) / lowestPrice) * 100) : 0;
      const hasStock = data.data.availableAt?.some(p => p.instock !== false && (p.stockQuantity || 0) > 0) || false;
      const tabletsPerStrip = data.data.medicine.tabletsPerUnit || data.data.medicine.tabletsPerStrip || 10;
      const volume = data.data.medicine.volume || '60ml';

      const medicineDetails = {
        _id: medicineName, 
        id: medicineName,
        name: data.data.medicine.name, 
        genericName: data.data.medicine.genericName,
        description: data.data.medicine.description, 
        detailedDescription: data.data.medicine.detailedDescription,
        category: data.data.medicine.category, 
        price: lowestPrice,
        discountedPrice: lowestDiscountedPrice, 
        discountPercentage,
        dosage: data.data.medicine.dosage, 
        strength: data.data.medicine.strength,
        form: data.data.medicine.form, 
        manufacturer: data.data.medicine.manufacturer,
        image: data.data.medicine.image, 
        inStock: hasStock, 
        instock: hasStock,
        sideEffects: data.data.medicine.sideEffects || [], 
        uses: data.data.medicine.uses || [],
        precautions: data.data.medicine.precautions || [], 
        instructions: data.data.medicine.instructions || [],
        storageInstructions: data.data.medicine.storageInstructions,
        tabletsPerStrip, 
        tabletsPerUnit: tabletsPerStrip, 
        volume,
        requiresPrescription: data.data.medicine.requiresPrescription || false,
        availableAtPharmacies: data.data.availableAt?.map(p => {
          const pp = p.price || 0;
          const pd = p.discountedPrice || pp;
          const pdp = pd && pp > pd ? Math.round(((pp - pd) / pp) * 100) : 0;
          const sq = Math.floor(p.stockQuantity || 0);
          const pis = p.instock !== false && sq > 0;
          return {
            _id: p.pharmacyId, 
            name: p.pharmacyName, 
            city: p.pharmacyCity,
            distance: p.distance || '2.5 km', 
            deliveryTime: p.deliveryTime || '30-45 min',
            price: pp, 
            discountedPrice: pd, 
            discountPercentage: pdp,
            uniqueId: p.uniqueId || `${p.pharmacyId}_${medicineName}`,
            stockQuantity: sq, 
            inStock: pis, 
            instock: pis, 
            tabletsPerStrip, 
            volume
          };
        }) || [],
        stats
      };

      setMedicine(medicineDetails);
      setIsAggregatedView(true);
      if (data.data.availableAt?.length > 0) {
        const first = medicineDetails.availableAtPharmacies.find(p => p.inStock);
        setSelectedPharmacy(first || medicineDetails.availableAtPharmacies[0]);
      }
      setStockInfo({ 
        inStock: hasStock, 
        stockQuantity: 0, 
        reorderLevel: 10, 
        stockStatus: hasStock ? 'Available' : 'Out of Stock', 
        needsReorder: false 
      });
      setDeliveryInfo({ 
        deliveryCharge: 50, 
        freeDeliveryThreshold: 500, 
        estimatedDeliveryTime: '30-45 min', 
        distance: 2.5, 
        baseDeliveryCharge: 50, 
        perKmCharge: 10, 
        preparationTime: 15, 
        averageDeliverySpeed: 20 
      });
      if (data.data.medicine.category) fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
    } catch (err) {
      console.error('Error fetching aggregated medicine:', err);
      setError('Failed to load medicine details');
    }
  };

  useEffect(() => {
    const run = async () => {
      if (!pharmacyId || !medicine || !selectedPharmacy) return;
      let dist = deliveryInfo.distance;
      if (userLocation) {
        const [lat, lng] = [userLocation.lat, userLocation.lng];
        // Use a default pharmacy location or get from medicine
        const pharmacyLat = 31.5;
        const pharmacyLng = 74.3;
        dist = calculateDistance(lat, lng, pharmacyLat, pharmacyLng);
      }
      const s = await fetchAndUpdateDeliverySettings(pharmacyId);
      updateDeliveryInfo(dist, calculateFinalPrice(), s);
    };
    run();
  }, [pharmacyId, selectedPharmacy, userLocation, medicine]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const parts = id ? id.split('_') : [];
        if (parts.length === 2) {
          await fetchPharmacyMedicine(parts[0], parts[1]);
        } else {
          await fetchAggregatedMedicine(id);
        }
      } catch (err) {
        console.error('Error loading medicine:', err);
        setError('Error loading medicine details');
      } finally { 
        setLoading(false); 
      }
    };
    if (id) run();
  }, [id, userLocation]);

  const fetchRelatedPharmacyMedicines = async (pharmIdParam, category, excludeId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pharmacies/${pharmIdParam}/medicines?category=${category}`);
      const data = await res.json();
      if (data.success) {
        setRelatedMedicines(data.data.filter(m => m._id !== excludeId).map(m => {
          const mp = m.price || 0; 
          const md = m.discountedPrice || mp;
          return {
            _id: `${pharmIdParam}_${m._id}`, 
            name: m.name, 
            description: m.description,
            price: mp, 
            discountedPrice: md,
            discountPercentage: md && mp > md ? Math.round(((mp - md) / mp) * 100) : 0,
            image: m.image, 
            category: m.category, 
            form: m.form,
            tabletsPerStrip: m.tabletsPerUnit || 10, 
            volume: m.volume || '60ml'
          };
        }));
      }
    } catch (err) {
      console.error('Error fetching related medicines:', err);
    }
  };

  const fetchRelatedAggregatedMedicines = async (category, excludeName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
      const data = await res.json();
      if (data.success) {
        setRelatedMedicines(data.data.filter(m => m.name !== excludeName).map(m => {
          const mp = m.lowestPrice || m.price || 0; 
          const md = m.lowestDiscountedPrice || mp;
          return {
            _id: m.name, 
            name: m.name, 
            description: m.description,
            price: mp, 
            discountedPrice: md,
            discountPercentage: md && mp > md ? Math.round(((mp - md) / mp) * 100) : 0,
            image: m.image, 
            category: m.category, 
            form: m.form,
            tabletsPerStrip: m.tabletsPerUnit || 10, 
            volume: m.volume || '60ml'
          };
        }));
      }
    } catch (err) {
      console.error('Error fetching related aggregated medicines:', err);
    }
  };

  const getCartQuantityForMedicine = () => {
    if (!medicine || !selectedPharmacy) return 0;
    const cartItemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    const pharmId = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    return getItemQuantity(cartItemId, pharmId) || 0;
  };
  const quantityInCart = getCartQuantityForMedicine();

  const handleAddToCart = () => {
    const user = getCurrentUser();
    if (!user) { 
      navigate('/login', { state: { redirectTo: `/medicine/${id}`, message: 'Please login to add items to cart' } }); 
      return; 
    }
    if (user.role === 'pharmacy') { 
      setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.'); 
      setShowPharmacyErrorModal(true); 
      return; 
    }
    if (!medicine || !selectedPharmacy) return;
    if (!isMedicineInStock()) { 
      setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`); 
      setShowSuccessModal(true); 
      return; 
    }
    if (!isStockAvailable(quantity)) {
      const avail = getAvailableStock(); 
      const u = getUnitDisplayText();
      setSuccessMessage(`Only ${avail} ${avail === 1 ? u.singular : u.plural} available. Please reduce quantity.`);
      setShowSuccessModal(true); 
      return;
    }
    addToCart({
      ...medicine,
      id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
      _id: isAggregatedView ? selectedPharmacy.uniqueId : medicine._id,
      selectedPharmacy: { _id: selectedPharmacy._id, name: selectedPharmacy.name },
      pharmacyName: selectedPharmacy.name,
      pharmacyId: isAggregatedView ? selectedPharmacy._id : pharmacyId,
      stockQuantity: isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity,
      maxStock: isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity,
      tabletsPerStrip: medicine.tabletsPerStrip || 10,
      tabletsPerUnit: medicine.tabletsPerStrip || 10,
      volume: medicine.volume || '60ml',
      inStock: isAggregatedView ? selectedPharmacy.inStock : medicine.inStock,
      instock: isAggregatedView ? selectedPharmacy.instock : medicine.instock
    }, isAggregatedView ? selectedPharmacy._id : pharmacyId, { quantity });
  };

  const handleUpdateCartQuantity = (newQ) => {
    if (!medicine || !selectedPharmacy || newQ < 1) return;
    const maxStock = isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity;
    if (newQ > maxStock) return;
    const mId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    const pId = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    updateQuantity(mId, pId, newQ);
  };

  const handleRemoveFromCart = () => {
    if (!medicine || !selectedPharmacy) return;
    removeFromCart(
      isAggregatedView ? selectedPharmacy.uniqueId : medicine.id, 
      isAggregatedView ? selectedPharmacy._id : pharmacyId
    );
  };

  const handleCheckout = () => {
    if ((cart?.length || 0) === 0) { 
      navigate('/medicines'); 
      return; 
    }
    if (!isLoggedIn) { 
      navigate('/login', { state: { redirectTo: '/booking', message: 'Please login to checkout' } }); 
      return; 
    }
    if (isPharmacyUser) { 
      setSuccessMessage('Pharmacy accounts cannot checkout. Please use a regular customer account.'); 
      setShowPharmacyErrorModal(true); 
      return; 
    }
    navigate('/booking');
  };

  const handleCallPharmacy = () => setShowCallPharmacyModal(true);
  const confirmCallPharmacy = () => { 
    window.location.href = `tel:${medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567'}`; 
    setShowCallPharmacyModal(false); 
  };

  const handleShare = () => {
    if (navigator.share) { 
      navigator.share({ title: medicine?.name, url: window.location.href }).catch(() => {}); 
    } else { 
      navigator.clipboard.writeText(window.location.href).then(() => { 
        setShowLinkCopiedModal(true); 
        setTimeout(() => setShowLinkCopiedModal(false), 2000); 
      }).catch(() => {}); 
    }
  };

  const incrementQuantity = () => {
    const max = getMaxAllowedQuantity();
    const nq = Math.min(quantity + 1, max);
    setQuantity(nq);
    if (quantityInCart > 0) handleUpdateCartQuantity(nq);
  };
  
  const decrementQuantity = () => {
    const nq = Math.max(quantity - 1, 1);
    setQuantity(nq);
    if (quantityInCart > 0) handleUpdateCartQuantity(nq);
  };

  const calculateFinalPrice = () => {
    if (!medicine) return 0;
    const price = medicine.discountedPrice || medicine.price || 0;
    return price * (quantity || 1);
  };
  
  const calculateOriginalPrice = () => {
    if (!medicine) return 0;
    return (medicine.price || 0) * (quantity || 1);
  };
  
  const calculatePerTabletPrice = () => {
    if (!medicine) return 0;
    const price = medicine.discountedPrice || medicine.price || 0;
    const tablets = medicine.tabletsPerStrip || 10;
    return price / tablets;
  };
  
  const hasDiscount = () => medicine && medicine.discountedPrice && medicine.price > medicine.discountedPrice;
  
  const isButtonDisabled = () => {
    if (isPharmacyUser || !selectedPharmacy) return true;
    const total = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
    return total <= 0 || isMaxStockReached();
  };

  // Sync quantity with cart quantity whenever it changes
  useEffect(() => {
    if (medicine && selectedPharmacy) {
      const cartQty = getCartQuantityForMedicine();
      if (cartQty > 0 && quantity !== cartQty) {
        setQuantity(cartQty);
      } else if (cartQty === 0 && quantity === 0) {
        setQuantity(1);
      }
    }
  }, [medicine, selectedPharmacy, quantityInCart]);

  useEffect(() => {
    if (medicine && selectedPharmacy) {
      const mx = getMaxAllowedQuantity();
      if (quantity > mx && mx > 0) setQuantity(Math.max(1, mx));
    }
  }, [selectedPharmacy, stockInfo.stockQuantity, quantityInCart]);

  const finalPrice = calculateFinalPrice();
  const originalTotalPrice = calculateOriginalPrice();
  const isDiscounted = hasDiscount();
  const availablePharmacies = medicine?.availableAtPharmacies || [];
  const visibleRelated = relatedMedicines.slice(0, 3);
  const perTabletPrice = calculatePerTabletPrice();
  const tabletsPerStrip = medicine?.tabletsPerStrip || 10;
  const maxQuantity = getMaxAllowedQuantity();
  // Use total item count (sum of quantities) for consistent cart badge
  const cartCount = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  const availableStock = getAvailableStock();
  const stockStatus = getStockStatusDisplay();
  const totalStock = isAggregatedView ? (selectedPharmacy?.stockQuantity || 0) : (stockInfo.stockQuantity || 0);
  const unitLabel = getUnitLabel();
  const unitDisplayText = getUnitDisplayText();
  const volume = medicine?.volume || '60ml';
  const isTablet = isTabletForm(medicine?.form);
  const isSyrup = isSyrupForm(medicine?.form);

  let deliveryFee = deliveryInfo.deliveryCharge;
  let freeDeliveryThreshold = deliveryInfo.freeDeliveryThreshold;
  if (getDeliveryFeeForPharmacy && pharmacyId) {
    const dc = getDeliveryFeeForPharmacy(pharmacyId, finalPrice, deliveryInfo.distance);
    deliveryFee = dc.deliveryFee; 
    freeDeliveryThreshold = dc.freeDeliveryThreshold;
  } else {
    deliveryFee = finalPrice >= deliveryInfo.freeDeliveryThreshold ? 0 : deliveryInfo.deliveryCharge;
  }
  const finalTotal = finalPrice + deliveryFee;

  // Scroll to section function
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      const yOffset = -80;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle back navigation
  const handleBack = () => {
    const from = location.state?.from;
    if (from) {
      navigate(from);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/medicines');
      }
    }
  };

  // Modal Component
  const Modal = ({ onBgClick, iconEl, title, body, children, iconBg }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onBgClick}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ background: iconBg }}>{iconEl}</div>
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{body}</p>
        {children}
      </div>
    </div>
  );

  // Loading State
  if (!isInitialized || !cartInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8f0f2 0%, #d1e0e4 100%)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#2c6774', borderTopColor: 'transparent' }}></div>
          <p className="mt-6 text-gray-600 font-medium" style={{ color: '#174047' }}>Loading medicine details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e8f0f2 0%, #d1e0e4 100%)' }}>
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl p-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate('/medicines')} 
            className="px-8 py-3 text-white rounded-xl transition-colors shadow-lg hover:opacity-90" 
            style={{ backgroundColor: '#2c6774' }}
          >
            Browse Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f8f9 0%, #e8f0f2 100%)' }}>
      {/* Modals */}
      {showCallPharmacyModal && (
        <Modal onBgClick={() => setShowCallPharmacyModal(false)} iconEl={<FaPhoneAlt className="text-[#2c6774]" size={26} />} iconBg="#E8F0F2" title="Call Pharmacy" body="Do you want to call this pharmacy for assistance?">
          <div className="rounded-xl p-4 mb-6" style={{ background: '#E8F0F2' }}>
            <div className="flex items-center justify-center">
              <FaPhoneAlt className="text-[#2c6774] mr-3" />
              <span className="text-lg font-semibold text-gray-900">{medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567'}</span>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">{selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setShowCallPharmacyModal(false)}>Cancel</button>
            <button className="flex-1 py-3 text-white rounded-xl transition-colors flex items-center justify-center" style={{ backgroundColor: '#2c6774' }} onClick={confirmCallPharmacy}><FaPhoneAlt className="mr-2" />Call Now</button>
          </div>
        </Modal>
      )}

      {showLinkCopiedModal && (
        <Modal onBgClick={() => setShowLinkCopiedModal(false)} iconEl={<FaCheck className="text-green-500" size={26} />} iconBg="#D1FAE5" title="Link Copied!" body="Medicine link has been copied to your clipboard." />
      )}

      {/* Removed success and error modals - no popups when adding to cart */}

      {/* Simple Clean Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <button 
              onClick={handleBack} 
              className="text-gray-600 hover:text-[#2c6774] transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-50"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs inline-block">{medicine?.name || 'Medicine'}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={handleShare} className="p-2 text-gray-600 hover:text-[#2c6774] transition-colors rounded-lg hover:bg-gray-50">
                <FaShareAlt size={18} />
              </button>
              <button 
                onClick={() => setShowCart(true)} 
                className={`relative p-2 rounded-lg transition-colors ${cartCount === 0 ? 'text-gray-400' : 'text-[#2c6774] hover:bg-gray-50'}`}
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-5 sm:p-7 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Image Section */}
              <div className="w-full lg:w-2/5">
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center" style={{ minHeight: '240px' }}>
                  <img
                    src={medicine?.image || 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'}
                    alt={medicine?.name || 'Medicine'}
                    className="max-h-48 sm:max-h-56 object-contain"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
                  />
                  {isDiscounted && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                        {medicine?.discountPercentage || 0}% OFF
                      </span>
                    </div>
                  )}
                  {medicine?.requiresPrescription && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md">
                        <FaPrescriptionBottle className="inline mr-1" size={12} />
                        Rx
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-3/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{medicine?.name || 'Medicine'}</h1>
                    {medicine?.strength && (
                      <p className="text-sm text-gray-500 font-medium mt-0.5">{medicine.strength}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">by {medicine?.manufacturer || 'Not specified'}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#2c6774]">Rs. {finalPrice.toFixed(2)}</span>
                  {isDiscounted && (
                    <span className="text-base sm:text-lg text-gray-400 line-through">Rs. {originalTotalPrice.toFixed(2)}</span>
                  )}
                  {isDiscounted && (
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">Save {medicine?.discountPercentage || 0}%</span>
                  )}
                </div>

                {/* Unit Info */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-500">Pack size:</span>
                  <span className="font-semibold text-gray-800">
                    {isTablet ? `${tabletsPerStrip} tablets` : isSyrup ? volume : `1 ${unitLabel}`}
                  </span>
                  {isTablet && (
                    <span className="text-xs text-gray-400">(Rs. {perTabletPrice.toFixed(2)}/tablet)</span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${stockStatus.cls}`}>
                    <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: stockStatus.dot }} />
                    {stockStatus.text}
                  </div>
                  {quantityInCart > 0 && (
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-lg">
                      {quantityInCart} in cart
                    </span>
                  )}
                </div>

                {/* Quantity Control */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {isMedicineInStock() && !isMaxStockReached() && !isPharmacyUser && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button 
                          onClick={decrementQuantity} 
                          disabled={quantity <= 1} 
                          className="w-9 h-9 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center transition-colors"
                        >
                          <FaMinus size={12} className="text-gray-600" />
                        </button>
                        <div className="w-12 h-9 flex items-center justify-center font-semibold text-gray-800">{quantity}</div>
                        <button 
                          onClick={incrementQuantity} 
                          disabled={quantity >= maxQuantity || maxQuantity <= 0} 
                          className="w-9 h-9 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center transition-colors"
                        >
                          <FaPlus size={12} className="text-gray-600" />
                        </button>
                      </div>
                      {isTablet && (
                        <span className="text-xs text-gray-500">{quantity * tabletsPerStrip} tablets total</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  {quantityInCart > 0 ? (
                    <>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex items-center border-2 border-[#2c6774] rounded-lg overflow-hidden bg-white">
                          <button 
                            onClick={decrementQuantity} 
                            disabled={quantity <= 1} 
                            className="w-10 h-10 bg-[#2c6774] hover:bg-[#1e4e56] disabled:opacity-50 flex items-center justify-center transition-colors"
                          >
                            <FaMinus size={12} className="text-white" />
                          </button>
                          <div className="w-14 h-10 flex items-center justify-center font-bold text-gray-800 text-base">{quantity}</div>
                          <button 
                            onClick={incrementQuantity} 
                            disabled={quantity >= maxQuantity || maxQuantity <= 0} 
                            className="w-10 h-10 bg-[#2c6774] hover:bg-[#1e4e56] disabled:opacity-50 flex items-center justify-center transition-colors"
                          >
                            <FaPlus size={12} className="text-white" />
                          </button>
                        </div>
                        <button
                          onClick={handleRemoveFromCart}
                          className="px-3 py-2 border-2 border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm"
                          title="Remove from cart"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all text-sm bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
                      >
                        <FaShoppingCart className="inline mr-2" /> Checkout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={isButtonDisabled() || isPharmacyUser}
                      className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all text-sm ${
                        !isButtonDisabled() && !isPharmacyUser
                          ? 'hover:opacity-90 shadow-md hover:shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed shadow-none'
                      }`}
                      style={!isButtonDisabled() && !isPharmacyUser ? { backgroundColor: '#2c6774' } : {}}
                    >
                      {isPharmacyUser ? (
                        <><FaBan className="inline mr-2" /> Not Allowed</>
                      ) : totalStock <= 0 ? (
                        <><FaBan className="inline mr-2" /> Out of Stock</>
                      ) : isMaxStockReached() ? (
                        <><FaBan className="inline mr-2" /> Max Added</>
                      ) : (
                        <><FaShoppingCart className="inline mr-2" /> Add to Cart</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Selection */}
        {isAggregatedView && availablePharmacies.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mt-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center text-base">
              <FaStore className="text-[#2c6774] mr-2" size={18} />
              Available Pharmacies
              <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{availablePharmacies.length} options</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {availablePharmacies.map(pharm => {
                const isSelected = selectedPharmacy?._id === pharm._id;
                const inStock = pharm.inStock && (pharm.stockQuantity || 0) > 0;
                return (
                  <button
                    key={pharm._id}
                    onClick={() => setSelectedPharmacy(pharm)}
                    disabled={!inStock}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[#2c6774] bg-[#f0f6f7] shadow-md'
                        : inStock
                          ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                          : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-gray-800 text-sm">{pharm.name}</span>
                      {!inStock && (
                        <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">OOS</span>
                      )}
                      {isSelected && <FaCheckCircle className="text-green-500" size={16} />}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
                      <span><FaMapMarkerAlt className="inline mr-1" size={11} />{pharm.distance}</span>
                      <span><FaClock className="inline mr-1" size={11} />{pharm.deliveryTime}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-bold text-[#2c6774]">Rs. {(pharm.discountedPrice || pharm.price).toFixed(2)}</span>
                      {pharm.discountPercentage > 0 && (
                        <span className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-semibold">-{pharm.discountPercentage}%</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section Navigation Buttons */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => scrollToSection(descriptionRef)}
            className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
          >
            <FaInfoCircle size={14} className="text-[#2c6774]" />
            Description
          </button>
          <button
            onClick={() => scrollToSection(specificationsRef)}
            className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
          >
            <FaClipboardList size={14} className="text-[#2c6774]" />
            Specifications
          </button>
          <button
            onClick={() => scrollToSection(usageRef)}
            className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
          >
            <FaUserMd size={14} className="text-[#2c6774]" />
            Usage & Safety
          </button>
          <button
            onClick={() => scrollToSection(precautionsRef)}
            className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
          >
            <FaShieldAlt size={14} className="text-[#2c6774]" />
            Precautions
          </button>
          <button
            onClick={() => scrollToSection(additionalRef)}
            className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
          >
            <FaPrescriptionBottle size={14} className="text-[#2c6774]" />
            Additional Info
          </button>
          {relatedMedicines.length > 0 && (
            <button
              onClick={() => scrollToSection(relatedRef)}
              className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-[#2c6774] hover:bg-[#f0f6f7] transition-all border border-gray-200 shadow-sm flex items-center gap-2"
            >
              <FaLeaf size={14} className="text-[#2c6774]" />
              Related
            </button>
          )}
        </div>

        {/* Details Section - Sequential Layout with Refs */}
        <div className="mt-5 space-y-4">
          {/* Product Description */}
          <div ref={descriptionRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
            <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center">
              <FaInfoCircle className="text-[#2c6774] mr-2" size={16} />
              About this medicine
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{medicine?.detailedDescription || medicine?.description || 'No description available.'}</p>
          </div>

          {/* Specifications Grid */}
          <div ref={specificationsRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <FaClipboardList className="text-[#2c6774] mr-2" size={16} />
              Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Generic Name</span>
                <span className="text-sm font-medium text-gray-800 text-right">{medicine?.genericName || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-medium text-gray-800 text-right">{medicine?.category || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Dosage Form</span>
                <span className="text-sm font-medium text-gray-800 text-right">{medicine?.form || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Strength</span>
                <span className="text-sm font-medium text-gray-800 text-right">{medicine?.strength || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Manufacturer</span>
                <span className="text-sm font-medium text-gray-800 text-right">{medicine?.manufacturer || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Requires Prescription</span>
                <span className="text-sm font-medium text-gray-800 text-right">{medicine?.requiresPrescription ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Usage & Safety */}
          <div ref={usageRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <FaUserMd className="text-[#2c6774] mr-2" size={16} />
              Usage & Safety
            </h3>
            
            {medicine?.dosage && (
              <div className="mb-3 bg-blue-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-700 mb-0.5">Dosage</p>
                <p className="text-sm text-gray-700">{medicine.dosage}</p>
              </div>
            )}
            
            {medicine?.uses?.length > 0 && (
              <div className="mb-3 bg-green-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-700 mb-1">Indications</p>
                <ul className="space-y-0.5">
                  {medicine.uses.map((use, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {medicine?.sideEffects?.length > 0 && (
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-700 mb-1">Side Effects</p>
                <ul className="space-y-0.5">
                  {medicine.sideEffects.map((effect, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="text-red-400 mr-2">•</span>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Precautions */}
          <div ref={precautionsRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <FaShieldAlt className="text-[#2c6774] mr-2" size={16} />
              Precautions
            </h3>
            {medicine?.precautions?.length > 0 ? (
              <div className="space-y-2">
                {medicine.precautions.map((p, i) => (
                  <div key={i} className="flex items-start bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                    <FaExclamationTriangle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-sm text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic bg-gray-50 rounded-lg p-3 text-center">No specific precautions listed.</p>
            )}
          </div>

          {/* Additional Information */}
          <div ref={additionalRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 scroll-mt-20">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <FaPrescriptionBottle className="text-[#2c6774] mr-2" size={16} />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Storage</p>
                <p className="text-sm font-medium text-gray-800">{medicine?.storageInstructions || 'Store in a cool, dry place'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Pregnancy Warning</p>
                <p className="text-sm font-medium text-gray-800">Consult your physician</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Pack Size</p>
                <p className="text-sm font-medium text-gray-800">
                  {isTablet ? `${tabletsPerStrip} tablets/strip` : isSyrup ? volume : '1 unit'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Price per Unit</p>
                <p className="text-sm font-medium text-gray-800">Rs. {(medicine?.discountedPrice || medicine?.price || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedMedicines.length > 0 && (
          <div ref={relatedRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mt-5 scroll-mt-20">
            <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center">
              <FaLeaf className="text-[#2c6774] mr-2" size={16} />
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleRelated.map(rel => (
                <MedicineCard
                  key={rel._id}
                  medicine={rel}
                  context="all-medicines"
                />
              ))}
            </div>
          </div>
        )}

        {/* Trust Strip */}
        <div className="mt-5 rounded-2xl p-5 shadow-lg" style={{ background: 'linear-gradient(135deg, #2c6774 0%, #174047 100%)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <FaShieldAlt className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">100% Safe & Secure</h3>
                <p className="text-white/80 text-xs">Your health is our priority</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-white font-bold text-lg">10K+</div>
                <div className="text-white/70 text-[10px]">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">24/7</div>
                <div className="text-white/70 text-[10px]">Support</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">100%</div>
                <div className="text-white/70 text-[10px]">Authentic</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cart}
        cartItemCount={cartItemCount}
        subtotal={cartSubtotal}
        deliveryFee={cartDeliveryFee}
        freeDeliveryThreshold={cartFreeDeliveryThreshold}
        finalTotal={cartFinalTotal}
        onUpdateQuantity={handleCartUpdateQuantity}
        onRemoveFromCart={handleCartRemoveFromCart}
        onCheckout={handleCartCheckout}
        getItemTotalPrice={calculateItemTotal || ((item) => (item.discountedPrice || item.price || 0) * (item.quantity || 1))}
        getDisplayQuantity={(item) => {
          const qty = item.quantity || 1;
          if (isTabletForm(item.form)) return `${qty} strip${qty > 1 ? 's' : ''}`;
          if (isSyrupForm(item.form)) return `${qty} bottle${qty > 1 ? 's' : ''}`;
          return `${qty} unit${qty > 1 ? 's' : ''}`;
        }}
        isTabletForm={isTabletForm}
        getPharmacySubtotal={getPharmacySubtotal}
        getDeliveryFeeForPharmacy={getDeliveryFeeForPharmacy}
        pharmacyDeliveryCache={pharmacyDeliveryCache}
      />
    </div>
  );
};

export default MedicineDetail;