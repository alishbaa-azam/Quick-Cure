import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaShoppingCart, FaStore, FaTag, FaPills, 
  FaIndustry, FaExclamationTriangle, FaShieldAlt,
  FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaClock, 
  FaTruck, FaCheckCircle,
  FaMinus, FaPlus, FaTrash, FaShareAlt,
  FaTemperatureLow, FaUserMd,
  FaChevronRight, FaChevronLeft, FaExclamationCircle,
  FaCheck, FaBan, FaBox, FaBoxes, FaFlask, FaLocationArrow
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

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
    getDeliveryFeeForPharmacy,
    fetchPharmacyDeliverySettings,
    calculateDistance: contextCalculateDistance,
    calculateDeliveryTime: contextCalculateDeliveryTime,
    isInitialized: cartInitialized
  } = useCart();
  
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
  const [isInitialized, setIsInitialized] = useState(false);
  
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
  
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [showCallPharmacyModal, setShowCallPharmacyModal] = useState(false);
  const [showLinkCopiedModal, setShowLinkCopiedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPharmacyErrorModal, setShowPharmacyErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isTabletForm = (form) => {
    if (!form) return false;
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return tabletForms.some(t => form?.toLowerCase().includes(t));
  };

  const isSyrupForm = (form) => {
    if (!form) return false;
    const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
    return syrupForms.some(s => form?.toLowerCase().includes(s));
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
    } catch (error) {
      console.error('Error getting user:', error);
    }
    return null;
  };

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const parsed = JSON.parse(savedLocation);
          if (parsed.lat && parsed.lng) {
            resolve(parsed);
            return;
          }
        } catch (e) {}
      }
      
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      setLocationLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          localStorage.setItem('userLocation', JSON.stringify(location));
          setUserLocation(location);
          setLocationLoading(false);
          resolve(location);
        },
        (error) => {
          setLocationLoading(false);
          reject(new Error('Unable to get location'));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (contextCalculateDistance) return contextCalculateDistance(lat1, lon1, lat2, lon2);
    if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5;
    
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return parseFloat((R * c).toFixed(1));
  };

  const calculateDeliveryTime = (distance, settings) => {
    if (contextCalculateDeliveryTime) return contextCalculateDeliveryTime(distance, settings);
    
    const pharmacySettings = settings || { averageDeliverySpeed: 20, preparationTime: 15 };
    const travelTime = (distance / pharmacySettings.averageDeliverySpeed) * 60;
    const totalMinutes = Math.round(travelTime + pharmacySettings.preparationTime);
    const minTime = Math.max(15, totalMinutes - 5);
    const maxTime = totalMinutes + 10;
    
    return `${minTime}-${maxTime} min`;
  };

  const calculateDeliveryCharge = (distance, orderValue, settings) => {
    const deliverySettings = settings || {
      baseDeliveryCharge: 50, perKmCharge: 10, freeDeliveryThreshold: 500
    };
    
    let deliveryCharge = 0;
    if (orderValue < deliverySettings.freeDeliveryThreshold) {
      if (distance <= 3) {
        deliveryCharge = deliverySettings.baseDeliveryCharge;
      } else {
        deliveryCharge = deliverySettings.baseDeliveryCharge + ((distance - 3) * deliverySettings.perKmCharge);
      }
    }
    
    return {
      deliveryCharge: Math.round(deliveryCharge),
      freeDeliveryThreshold: deliverySettings.freeDeliveryThreshold,
      distance
    };
  };

  const getAvailableStock = () => {
    if (!medicine || !selectedPharmacy) return 0;
    
    const stockQty = isAggregatedView 
      ? (selectedPharmacy.stockQuantity || 0)
      : (stockInfo.stockQuantity || 0);
      
    const pharmacyIdToUse = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    const medicineId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    
    const cartQty = getItemQuantity(medicineId, pharmacyIdToUse);
    return Math.max(0, Math.floor(stockQty - cartQty));
  };

  const isMedicineInStock = () => {
    const availableStock = getAvailableStock();
    const totalStock = isAggregatedView 
      ? (selectedPharmacy?.stockQuantity || 0)
      : (stockInfo.stockQuantity || 0);
    return totalStock > 0 && availableStock > 0;
  };

  const isMaxStockReached = () => {
    const availableStock = getAvailableStock();
    const totalStock = isAggregatedView 
      ? (selectedPharmacy?.stockQuantity || 0)
      : (stockInfo.stockQuantity || 0);
    return totalStock > 0 && availableStock <= 0;
  };

  const isStockAvailable = (requestedQuantity) => {
    const availableStock = getAvailableStock();
    return availableStock > 0 && requestedQuantity <= availableStock;
  };

  const getMaxAllowedQuantity = () => {
    return Math.max(0, getAvailableStock());
  };

  const getStockStatusDisplay = () => {
    const totalStock = isAggregatedView 
      ? (selectedPharmacy?.stockQuantity || 0)
      : (stockInfo.stockQuantity || 0);
    const availableStock = getAvailableStock();
    const unitText = getUnitDisplayText();
    
    if (totalStock <= 0) {
      return {
        text: 'Out of Stock',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: <FaBan className="text-red-500 mr-3 flex-shrink-0" />
      };
    }
    
    if (availableStock <= 0) {
      return {
        text: 'Max in Cart',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: <FaExclamationTriangle className="text-orange-500 mr-3 flex-shrink-0" />
      };
    }
    
    if (availableStock <= stockInfo.reorderLevel) {
      return {
        text: `Low Stock - Only ${availableStock} ${availableStock === 1 ? unitText.singular : unitText.plural} left`,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: <FaExclamationTriangle className="text-yellow-500 mr-3 flex-shrink-0" />
      };
    }
    
    return {
      text: `In Stock (${availableStock} ${availableStock === 1 ? unitText.singular : unitText.plural} available)`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
    };
  };

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const user = getCurrentUser();
        if (user) {
          setIsLoggedIn(true);
          setIsPharmacyUser(user.role === 'pharmacy');
        } else {
          setIsLoggedIn(false);
          setIsPharmacyUser(false);
        }
        setIsInitialized(true);
      } catch (error) {
        setIsLoggedIn(false);
        setIsPharmacyUser(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
    window.addEventListener('userChanged', initializeAuth);
    return () => window.removeEventListener('userChanged', initializeAuth);
  }, []);

  useEffect(() => {
    getUserLocation().then(setUserLocation).catch(err => console.log('Location not available:', err.message));
  }, []);

  const fetchAndUpdateDeliverySettings = async (pharmId) => {
    if (!pharmId || !fetchPharmacyDeliverySettings) return null;
    try {
      const settings = await fetchPharmacyDeliverySettings(pharmId);
      setPharmacySettings(settings);
      return settings;
    } catch (err) {
      return null;
    }
  };

  const updateDeliveryInfo = (distance, orderValue, settings) => {
    const deliveryCalc = calculateDeliveryCharge(distance, orderValue, settings);
    const estimatedTime = calculateDeliveryTime(distance, settings);
    
    setDeliveryInfo({
      deliveryCharge: deliveryCalc.deliveryCharge,
      freeDeliveryThreshold: deliveryCalc.freeDeliveryThreshold,
      estimatedDeliveryTime: estimatedTime,
      distance: distance,
      baseDeliveryCharge: settings?.baseDeliveryCharge || 50,
      perKmCharge: settings?.perKmCharge || 10,
      preparationTime: settings?.preparationTime || 15,
      averageDeliverySpeed: settings?.averageDeliverySpeed || 20
    });
  };

  const fetchPharmacyMedicine = async (pharmacyIdParam, medicineIdParam) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/${pharmacyIdParam}/medicines/${medicineIdParam}`);
      const data = await response.json();
      
      if (data.success) {
        const medicineData = data.data;
        const unitPrice = medicineData.price || 0;
        const discountedUnitPrice = medicineData.discountedPrice || unitPrice;
        const discountPercentage = discountedUnitPrice && unitPrice > discountedUnitPrice
          ? Math.round(((unitPrice - discountedUnitPrice) / unitPrice) * 100) : 0;
        
        let distance = 2.5;
        let estimatedDeliveryTime = '30-45 min';
        
        const pharmacyLocation = medicineData.pharmacy?.location;
        if (pharmacyLocation?.coordinates && userLocation) {
          const [pharmLng, pharmLat] = pharmacyLocation.coordinates;
          distance = calculateDistance(userLocation.lat, userLocation.lng, pharmLat, pharmLng);
        }
        
        const settings = await fetchAndUpdateDeliverySettings(pharmacyIdParam);
        const stockQty = Math.floor(medicineData.stockQuantity || 0);
        const reorderLvl = medicineData.reorderLevel || 10;
        // ✅ FIXED: Use instock (lowercase 'n')
        const inStock = medicineData.instock !== false && stockQty > 0;
        const tabletsPerStrip = medicineData.tabletsPerUnit || medicineData.tabletsPerStrip || 10;
        const volume = medicineData.volume || medicineData.ml || '60ml';
        
        const medicineDetails = {
          _id: medicineIdParam,
          id: `${pharmacyIdParam}_${medicineIdParam}`,
          name: medicineData.name,
          genericName: medicineData.genericName,
          description: medicineData.description,
          detailedDescription: medicineData.detailedDescription || medicineData.description,
          category: medicineData.category,
          price: unitPrice,
          discountedPrice: discountedUnitPrice,
          discountPercentage: discountPercentage,
          dosage: medicineData.dosage || 'As prescribed',
          strength: medicineData.strength,
          form: medicineData.form,
          manufacturer: medicineData.manufacturer,
          image: medicineData.image,
          inStock: inStock,
          instock: inStock, // ✅ ADDED for compatibility
          sideEffects: medicineData.sideEffects || [],
          uses: medicineData.uses || [],
          precautions: medicineData.precautions || [],
          instructions: medicineData.instructions || [],
          storageInstructions: medicineData.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
          tabletsPerStrip: tabletsPerStrip,
          tabletsPerUnit: tabletsPerStrip,
          volume: volume,
          stockQuantity: stockQty,
          reorderLevel: reorderLvl,
          pharmacyId: pharmacyIdParam,
          pharmacyName: medicineData.pharmacy?.name || 'Pharmacy',
          pharmacyAddress: medicineData.pharmacy?.address,
          pharmacyCity: medicineData.pharmacy?.city,
          pharmacyPhone: medicineData.pharmacy?.phone,
          pharmacyDeliveryTime: estimatedDeliveryTime,
          availableAtPharmacies: [{
            _id: pharmacyIdParam,
            name: medicineData.pharmacy?.name || 'Pharmacy',
            city: medicineData.pharmacy?.city,
            distance: `${distance} km`,
            deliveryTime: estimatedDeliveryTime,
            price: unitPrice,
            discountedPrice: discountedUnitPrice,
            discountPercentage: discountPercentage,
            uniqueId: `${pharmacyIdParam}_${medicineIdParam}`,
            stockQuantity: stockQty,
            inStock: inStock,
            instock: inStock, // ✅ ADDED for compatibility
            tabletsPerStrip: tabletsPerStrip,
            volume: volume
          }]
        };
        
        setMedicine(medicineDetails);
        setPharmacyId(pharmacyIdParam);
        setIsAggregatedView(false);
        setSelectedPharmacy(medicineDetails.availableAtPharmacies[0]);
        
        setStockInfo({
          inStock: inStock,
          stockQuantity: stockQty,
          reorderLevel: reorderLvl,
          stockStatus: inStock ? (stockQty > reorderLvl ? 'In Stock' : 'Low Stock') : 'Out of Stock',
          needsReorder: inStock && stockQty <= reorderLvl
        });
        
        updateDeliveryInfo(distance, discountedUnitPrice, settings);
        
        if (medicineData.category) {
          fetchRelatedPharmacyMedicines(pharmacyIdParam, medicineData.category, medicineIdParam);
        }
      } else {
        setError(data.message || 'Medicine not found');
      }
    } catch (err) {
      setError('Error loading medicine details from pharmacy');
    }
  };

  const fetchAggregatedMedicine = async (medicineName) => {
    try {
      const encodedName = encodeURIComponent(medicineName);
      const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/${encodedName}`);
      const data = await response.json();
      
      if (data.success) {
        const statsData = data.data.stats || {};
        const lowestPrice = statsData.lowestPrice || data.data.medicine.price || 0;
        const lowestDiscountedPrice = statsData.lowestDiscountedPrice || lowestPrice;
        const discountPercentage = lowestDiscountedPrice && lowestPrice > lowestDiscountedPrice
          ? Math.round(((lowestPrice - lowestDiscountedPrice) / lowestPrice) * 100) : 0;
        
        // ✅ FIXED: Use instock (lowercase 'n')
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
          discountPercentage: discountPercentage,
          dosage: data.data.medicine.dosage,
          strength: data.data.medicine.strength,
          form: data.data.medicine.form,
          manufacturer: data.data.medicine.manufacturer,
          image: data.data.medicine.image,
          inStock: hasStock,
          instock: hasStock, // ✅ ADDED for compatibility
          sideEffects: data.data.medicine.sideEffects || [],
          uses: data.data.medicine.uses || [],
          precautions: data.data.medicine.precautions || [],
          instructions: data.data.medicine.instructions || [],
          storageInstructions: data.data.medicine.storageInstructions,
          tabletsPerStrip: tabletsPerStrip,
          tabletsPerUnit: tabletsPerStrip,
          volume: volume,
          availableAtPharmacies: data.data.availableAt?.map(pharmacy => {
            const pharmPrice = pharmacy.price || 0;
            const pharmDiscountedPrice = pharmacy.discountedPrice || pharmPrice;
            const pharmDiscountPercentage = pharmDiscountedPrice && pharmPrice > pharmDiscountedPrice
              ? Math.round(((pharmPrice - pharmDiscountedPrice) / pharmPrice) * 100) : 0;
            const pharmStockQty = Math.floor(pharmacy.stockQuantity || 0);
            // ✅ FIXED: Use instock (lowercase 'n')
            const pharmInStock = pharmacy.instock !== false && pharmStockQty > 0;
            
            return {
              _id: pharmacy.pharmacyId,
              name: pharmacy.pharmacyName,
              city: pharmacy.pharmacyCity,
              distance: pharmacy.distance || '2.5 km',
              deliveryTime: pharmacy.deliveryTime || '30-45 min',
              price: pharmPrice,
              discountedPrice: pharmDiscountedPrice,
              discountPercentage: pharmDiscountPercentage,
              uniqueId: pharmacy.uniqueId || `${pharmacy.pharmacyId}_${medicineName}`,
              stockQuantity: pharmStockQty,
              inStock: pharmInStock,
              instock: pharmInStock, // ✅ ADDED for compatibility
              tabletsPerStrip: tabletsPerStrip,
              volume: volume
            };
          }) || [],
          stats: statsData
        };
        
        setMedicine(medicineDetails);
        setIsAggregatedView(true);
        
        if (data.data.availableAt?.length > 0) {
          const firstInStock = medicineDetails.availableAtPharmacies.find(p => p.inStock);
          setSelectedPharmacy(firstInStock || medicineDetails.availableAtPharmacies[0]);
        }
        
        setStockInfo({
          inStock: hasStock,
          stockQuantity: 0,
          reorderLevel: 10,
          stockStatus: hasStock ? 'Available' : 'Out of Stock',
          needsReorder: false
        });
        
        setDeliveryInfo({
          deliveryCharge: 50, freeDeliveryThreshold: 500, estimatedDeliveryTime: '30-45 min',
          distance: 2.5, baseDeliveryCharge: 50, perKmCharge: 10, preparationTime: 15, averageDeliverySpeed: 20
        });
        
        if (data.data.medicine.category) {
          fetchRelatedAggregatedMedicines(data.data.medicine.category, medicineName);
        }
      } else {
        setError('Medicine not found in aggregated data');
      }
    } catch (err) {
      setError('Error loading aggregated medicine details');
    }
  };

  useEffect(() => {
    const updateDeliveryForCurrentPharmacy = async () => {
      if (!pharmacyId || !medicine || !selectedPharmacy) return;
      
      let distance = deliveryInfo.distance;
      if (userLocation) {
        distance = calculateDistance(userLocation.lat, userLocation.lng, 31.5, 74.3);
      }
      
      const settings = await fetchAndUpdateDeliverySettings(pharmacyId);
      const orderValue = calculateFinalPrice();
      updateDeliveryInfo(distance, orderValue, settings);
    };
    
    updateDeliveryForCurrentPharmacy();
  }, [pharmacyId, selectedPharmacy, userLocation, medicine]);

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
        setError('Error loading medicine details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchMedicineDetails();
  }, [id, userLocation]);

  const fetchRelatedPharmacyMedicines = async (pharmacyIdParam, category, excludeMedicineId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/${pharmacyIdParam}/medicines?category=${category}`);
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data
          .filter(med => med._id !== excludeMedicineId)
          .map(med => {
            const medPrice = med.price || 0;
            const medDiscountedPrice = med.discountedPrice || medPrice;
            const medDiscountPercentage = medDiscountedPrice && medPrice > medDiscountedPrice
              ? Math.round(((medPrice - medDiscountedPrice) / medPrice) * 100) : 0;
            
            return {
              _id: `${pharmacyIdParam}_${med._id}`,
              name: med.name,
              description: med.description,
              price: medPrice,
              discountedPrice: medDiscountedPrice,
              discountPercentage: medDiscountPercentage,
              image: med.image,
              category: med.category,
              form: med.form,
              tabletsPerStrip: med.tabletsPerUnit || 10,
              volume: med.volume || '60ml'
            };
          });
        
        setRelatedMedicines(filtered);
      }
    } catch (err) {}
  };

  const fetchRelatedAggregatedMedicines = async (category, excludeMedicineName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/medicines/all?category=${category}`);
      const data = await response.json();
      
      if (data.success) {
        const filtered = data.data
          .filter(med => med.name !== excludeMedicineName)
          .map(med => {
            const medPrice = med.lowestPrice || med.price || 0;
            const medDiscountedPrice = med.lowestDiscountedPrice || medPrice;
            const medDiscountPercentage = medDiscountedPrice && medPrice > medDiscountedPrice
              ? Math.round(((medPrice - medDiscountedPrice) / medPrice) * 100) : 0;
            
            return {
              _id: med.name,
              name: med.name,
              description: med.description,
              price: medPrice,
              discountedPrice: medDiscountedPrice,
              discountPercentage: medDiscountPercentage,
              image: med.image,
              category: med.category,
              form: med.form,
              tabletsPerStrip: med.tabletsPerUnit || 10,
              volume: med.volume || '60ml'
            };
          });
        
        setRelatedMedicines(filtered);
      }
    } catch (err) {}
  };

  const nextRelated = () => {
    if (relatedMedicines.length <= 2) return;
    setCurrentRelatedIndex(prev => prev + 2 >= relatedMedicines.length ? 0 : prev + 2);
  };

  const prevRelated = () => {
    if (relatedMedicines.length <= 2) return;
    setCurrentRelatedIndex(prev => prev - 2 < 0 ? Math.max(0, relatedMedicines.length - 2) : prev - 2);
  };

  const getCartQuantityForMedicine = () => {
    if (!medicine || !selectedPharmacy) return 0;
    const cartItemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    const pharmacyIdToUse = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    return getItemQuantity(cartItemId, pharmacyIdToUse);
  };

  const quantityInCart = getCartQuantityForMedicine();

  // ✅ FIXED: Add to cart with proper instock property
  const handleAddToCart = () => {
    const user = getCurrentUser();
    
    if (!user) {
      navigate('/login', { 
        state: { redirectTo: `/medicine/${id}`, message: 'Please login to add items to cart' } 
      });
      return;
    }

    if (user && user.role === 'pharmacy') {
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
      const availableStock = getAvailableStock();
      const unitText = getUnitDisplayText();
      setSuccessMessage(`Only ${availableStock} ${availableStock === 1 ? unitText.singular : unitText.plural} available in stock. Please reduce quantity.`);
      setShowSuccessModal(true);
      return;
    }
    
    const medicineForCart = {
      ...medicine,
      id: isAggregatedView ? selectedPharmacy.uniqueId : medicine.id,
      _id: isAggregatedView ? selectedPharmacy.uniqueId : medicine._id,
      selectedPharmacy: {
        _id: selectedPharmacy._id,
        name: selectedPharmacy.name
      },
      pharmacyName: selectedPharmacy.name,
      pharmacyId: isAggregatedView ? selectedPharmacy._id : pharmacyId,
      stockQuantity: isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity,
      maxStock: isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity,
      tabletsPerStrip: medicine.tabletsPerStrip || 10,
      tabletsPerUnit: medicine.tabletsPerStrip || 10,
      volume: medicine.volume || '60ml',
      inStock: isAggregatedView ? selectedPharmacy.inStock : medicine.inStock, // ✅ ADDED
      instock: isAggregatedView ? selectedPharmacy.instock : medicine.instock  // ✅ ADDED
    };
    
    const pharmacyIdToUse = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    
    addToCart(medicineForCart, pharmacyIdToUse, { quantity });
    
    const unitLabel = getUnitLabel();
    setSuccessMessage(`${quantity} ${unitLabel}${quantity > 1 ? 's' : ''} of ${medicine.name} added to cart successfully!`);
    setShowSuccessModal(true);
  };

  const handleUpdateCartQuantity = (newQuantity) => {
    if (!medicine || !selectedPharmacy) return;
    
    const medicineId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    const pharmacyIdToUse = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    
    if (newQuantity < 1) return;
    
    const maxStock = isAggregatedView ? (selectedPharmacy.stockQuantity || 0) : stockInfo.stockQuantity;
    if (newQuantity > maxStock) return;
    
    updateQuantity(medicineId, pharmacyIdToUse, newQuantity);
  };

  const handleRemoveFromCart = () => {
    if (!medicine || !selectedPharmacy) return;
    
    const itemId = isAggregatedView ? selectedPharmacy.uniqueId : medicine.id;
    const pharmacyIdToUse = isAggregatedView ? selectedPharmacy._id : pharmacyId;
    
    removeFromCart(itemId, pharmacyIdToUse);
    setSuccessMessage(`${medicine.name} removed from cart`);
    setShowSuccessModal(true);
  };

  const handleCheckout = () => {
    const cartCount = cart?.length || 0;
    
    if (cartCount === 0) {
      setShowEmptyCartModal(true);
      return;
    }
    
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: '/booking', message: 'Please login to proceed to checkout' } });
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
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    window.location.href = `tel:${phoneNumber}`;
    setShowCallPharmacyModal(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: medicine?.name,
        text: `Check out ${medicine?.name} on Pharmacy App`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setShowLinkCopiedModal(true);
          setTimeout(() => setShowLinkCopiedModal(false), 2000);
        })
        .catch(console.error);
    }
  };

  const incrementQuantity = () => {
    const maxQty = getMaxAllowedQuantity();
    const newQty = Math.min(quantity + 1, maxQty);
    setQuantity(newQty);
    if (quantityInCart > 0) handleUpdateCartQuantity(newQty);
  };
  
  const decrementQuantity = () => {
    const newQty = Math.max(quantity - 1, 1);
    setQuantity(newQty);
    if (quantityInCart > 0) handleUpdateCartQuantity(newQty);
  };

  const calculateFinalPrice = () => {
    if (!medicine) return 0;
    const unitPrice = medicine.discountedPrice || medicine.price || 0;
    return unitPrice * quantity;
  };
  
  const calculateOriginalPrice = () => {
    if (!medicine) return 0;
    return (medicine.price || 0) * quantity;
  };

  const calculatePerTabletPrice = () => {
    if (!medicine) return 0;
    const unitPrice = medicine.discountedPrice || medicine.price || 0;
    const tabletsPerStrip = medicine.tabletsPerStrip || 10;
    return unitPrice / tabletsPerStrip;
  };

  const hasDiscount = () => {
    if (!medicine) return false;
    const discounted = medicine.discountedPrice;
    const original = medicine.price || 0;
    return discounted && original > discounted;
  };

  const getButtonText = () => {
    if (isPharmacyUser) return 'Not Allowed';
    if (!isMedicineInStock() && !isMaxStockReached()) return 'Out of Stock';
    if (isMaxStockReached()) return 'Max Added';
    return 'Add to Cart';
  };

  const isButtonDisabled = () => {
    if (isPharmacyUser) return true;
    if (!selectedPharmacy) return true;
    
    const totalStock = isAggregatedView 
      ? (selectedPharmacy?.stockQuantity || 0)
      : (stockInfo.stockQuantity || 0);
      
    if (totalStock <= 0) return true;
    if (isMaxStockReached()) return true;
    
    return false;
  };

  const getFormIcon = () => {
    if (!medicine) return <FaPills />;
    if (isTabletForm(medicine.form)) return <FaBoxes />;
    if (isSyrupForm(medicine.form)) return <FaFlask />;
    return <FaPills />;
  };

  const getPreviousPageInfo = () => {
    const state = location.state;
    if (state?.from === 'pharmacy' && state?.pharmacyId) {
      return { name: 'Pharmacy Details', path: `/pharmacy/${state.pharmacyId}` };
    }
    return { name: 'Medicines', path: '/medicines' };
  };
  const previousPage = getPreviousPageInfo();

  const finalPrice = calculateFinalPrice();
  const originalTotalPrice = calculateOriginalPrice();
  const isDiscounted = hasDiscount();
  const availablePharmacies = medicine?.availableAtPharmacies || [];
  const visibleRelatedMedicines = relatedMedicines.slice(currentRelatedIndex, currentRelatedIndex + 2);
  const perTabletPrice = calculatePerTabletPrice();
  const tabletsPerStrip = medicine?.tabletsPerStrip || 10;
  const maxQuantity = getMaxAllowedQuantity();
  const cartCount = cart?.length || 0;
  const availableStock = getAvailableStock();
  const stockStatusDisplay = getStockStatusDisplay();
  const totalStock = isAggregatedView 
    ? (selectedPharmacy?.stockQuantity || 0)
    : (stockInfo.stockQuantity || 0);
  const unitLabel = getUnitLabel();
  const unitDisplayText = getUnitDisplayText();
  const volume = medicine?.volume || '60ml';
  const isTablet = isTabletForm(medicine?.form);
  const isSyrup = isSyrupForm(medicine?.form);

  useEffect(() => {
    if (medicine && selectedPharmacy) {
      const maxUnit = getMaxAllowedQuantity();
      if (quantity > maxUnit) setQuantity(Math.max(1, maxUnit));
    }
  }, [selectedPharmacy, stockInfo.stockQuantity, quantityInCart]);

  const orderValue = finalPrice;
  
  let deliveryFee = deliveryInfo.deliveryCharge;
  let freeDeliveryThreshold = deliveryInfo.freeDeliveryThreshold;
  
  if (getDeliveryFeeForPharmacy && pharmacyId) {
    const deliveryCalc = getDeliveryFeeForPharmacy(pharmacyId, orderValue, deliveryInfo.distance);
    deliveryFee = deliveryCalc.deliveryFee;
    freeDeliveryThreshold = deliveryCalc.freeDeliveryThreshold;
  } else {
    deliveryFee = orderValue >= deliveryInfo.freeDeliveryThreshold ? 0 : deliveryInfo.deliveryCharge;
  }
  
  const finalTotal = orderValue + deliveryFee;

  // Modal Components
  const EmptyCartModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEmptyCartModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
          <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
        <p className="text-gray-600 text-center mb-6">You need to add items to your cart before proceeding to checkout.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Continue Shopping</button>
          <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)]">Browse Medicines</button>
        </div>
      </div>
    </div>
  );

  const CallPharmacyModal = () => {
    const phoneNumber = medicine?.pharmacyPhone || selectedPharmacy?.phone || '1800-123-4567';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCallPharmacyModal(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <FaPhoneAlt className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Call Pharmacy</h3>
          <p className="text-gray-600 text-center mb-4">Do you want to call this pharmacy?</p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center">
              <FaPhoneAlt className="text-blue-500 mr-3" />
              <span className="text-lg font-semibold text-gray-900">{phoneNumber}</span>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">{selectedPharmacy?.name || medicine?.pharmacyName || 'Pharmacy Support'}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] flex items-center justify-center"><FaPhoneAlt className="mr-2" />Call Now</button>
          </div>
        </div>
      </div>
    );
  };

  const LinkCopiedModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkCopiedModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100"><FaCheck className="w-8 h-8 text-green-500" /></div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
        <p className="text-gray-600 text-center">Medicine link has been copied to clipboard.</p>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100"><FaCheck className="w-8 h-8 text-green-500" /></div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
        <p className="text-gray-600 text-center mb-6">{successMessage}</p>
        <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)]">Continue Shopping</button>
      </div>
    </div>
  );

  const PharmacyErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100"><FaExclamationTriangle className="w-8 h-8 text-red-500" /></div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
        <p className="text-gray-600 text-center mb-6">{successMessage}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">OK</button>
          <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)]">Switch Account</button>
        </div>
      </div>
    </div>
  );

  if (!isInitialized || !cartInitialized || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicine details...</p>
        </div>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Medicine Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'The medicine you are looking for does not exist.'}</p>
          <button onClick={() => navigate(-1)} className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] flex items-center justify-center mx-auto">
            <FaArrowLeft className="mr-2" />Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showEmptyCartModal && <EmptyCartModal />}
      {showCallPharmacyModal && <CallPharmacyModal />}
      {showLinkCopiedModal && <LinkCopiedModal />}
      {showSuccessModal && <SuccessModal />}
      {showPharmacyErrorModal && <PharmacyErrorModal />}

      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors">
              <FaArrowLeft className="mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={handleShare} className="p-2 text-gray-600 hover:text-[var(--primary-color)]"><FaShareAlt size={18} /></button>
              <button onClick={handleCheckout} className={`flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium ${cartCount === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'}`}>
                <FaShoppingCart className="mr-1 sm:mr-2" size={16} />
                <span className="hidden xs:inline">Checkout</span> ({cartCount})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="hidden sm:flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[var(--primary-color)]">Home</Link>
          <FaChevronRight className="mx-2" size={10} />
          <Link to={previousPage.path} className="hover:text-[var(--primary-color)]">{previousPage.name}</Link>
          <FaChevronRight className="mx-2" size={10} />
          <span className="font-medium text-gray-900 truncate max-w-xs">{medicine.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="sm:w-2/5">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-50 to-[var(--bg-light)] rounded-xl p-4 flex items-center justify-center h-48 sm:h-64">
                      <img src={medicine.image} alt={medicine.name} className="max-h-40 sm:max-h-52 max-w-full object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }} />
                      {isDiscounted && (
                        <div className="absolute top-0 left-0">
                          <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-br-lg rounded-tl-xl text-xs sm:text-sm font-bold shadow-md">Save {medicine.discountPercentage}%</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium truncate max-w-full">
                        {medicine.pharmacyName || selectedPharmacy?.name || 'Pharmacy'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:w-3/5">
                  <div className="mb-3 sm:mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{medicine.name}</h1>
                    {medicine.genericName && <p className="text-sm sm:text-base text-gray-600"><span className="font-medium">Generic:</span> {medicine.genericName}</p>}
                  </div>

                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-end mb-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-bold text-[var(--secondary-color)]">Rs. {finalPrice.toFixed(2)}</span>
                      {isDiscounted && <span className="ml-2 sm:ml-3 text-base sm:text-lg text-gray-500 line-through">Rs. {originalTotalPrice.toFixed(2)}</span>}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Price per {unitLabel}: Rs. {(medicine.discountedPrice || medicine.price).toFixed(2)}</p>
                    {isTablet && <p className="text-xs sm:text-sm text-gray-600 mt-1">Per tablet: Rs. {perTabletPrice.toFixed(2)}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="text-[var(--primary-color)] mr-2 sm:mr-3">{getFormIcon()}</div>
                      <div><div className="text-xs sm:text-sm text-gray-600">Form</div><div className="font-medium text-sm sm:text-base">{medicine.form}</div></div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <FaIndustry className="text-[var(--primary-color)] mr-2 sm:mr-3" />
                      <div><div className="text-xs sm:text-sm text-gray-600">Manufacturer</div><div className="font-medium text-sm sm:text-base">{medicine.manufacturer || 'Not specified'}</div></div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <FaPills className="text-[var(--primary-color)] mr-2 sm:mr-3" />
                      <div><div className="text-xs sm:text-sm text-gray-600">Strength</div><div className="font-medium text-sm sm:text-base">{medicine.strength || 'Not specified'}</div></div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <FaBox className="text-[var(--primary-color)] mr-2 sm:mr-3" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600">Per {unitLabel}</div>
                        <div className="font-medium text-sm sm:text-base">
                          {isTablet ? `${tabletsPerStrip} tablets` : isSyrup ? volume : `1 ${unitLabel}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border ${stockStatusDisplay.bgColor} ${stockStatusDisplay.borderColor}`}>
                    <div className="flex items-center">
                      {stockStatusDisplay.icon}
                      <div>
                        <div className={`font-medium text-sm sm:text-base ${stockStatusDisplay.color}`}>{stockStatusDisplay.text}</div>
                        {totalStock > 0 && availableStock > 0 && (
                          <div className="text-xs sm:text-sm text-gray-600">Total stock: {totalStock} {totalStock === 1 ? unitDisplayText.singular : unitDisplayText.plural}{quantityInCart > 0 && ` • ${quantityInCart} in cart`}</div>
                        )}
                        {quantityInCart > 0 && <div className="text-xs sm:text-sm text-blue-600 mt-1">🛒 {quantityInCart} {quantityInCart === 1 ? unitDisplayText.singular : unitDisplayText.plural} in your cart</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md">
              <div className="border-b overflow-x-auto">
                <div className="flex whitespace-nowrap px-2">
                  {[{ id: 'overview', label: 'Overview', icon: <FaInfoCircle /> }, { id: 'uses', label: 'Uses', icon: <FaPills /> }, { id: 'sideEffects', label: 'Side Effects', icon: <FaExclamationTriangle /> }, { id: 'precautions', label: 'Safety Info', icon: <FaShieldAlt /> }, { id: 'instructions', label: 'Instructions', icon: <FaUserMd /> }].map(tab => (
                    <button key={tab.id} onClick={() => setActiveSection(tab.id)} className={`flex items-center px-3 sm:px-6 py-3 sm:py-4 font-medium border-b-2 transition-colors text-xs sm:text-sm ${activeSection === tab.id ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                      <span className="mr-1 sm:mr-2">{tab.icon}</span>{tab.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-6 max-h-[300px] overflow-y-auto">
                {activeSection === 'overview' && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Product Description</h3>
                    <p className="text-gray-700">{medicine.detailedDescription || medicine.description}</p>
                    {medicine.storageInstructions && (
                      <div className="bg-blue-50 p-3 rounded-lg mt-4">
                        <div className="flex items-start"><FaTemperatureLow className="text-blue-500 mt-1 mr-3" /><div><h4 className="font-bold">Storage Instructions</h4><p>{medicine.storageInstructions}</p></div></div>
                      </div>
                    )}
                  </div>
                )}
                {activeSection === 'uses' && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Therapeutic Uses</h3>
                    {medicine.uses?.length > 0 ? <ul className="space-y-2">{medicine.uses.map((use, i) => <li key={i} className="flex items-start"><FaCheckCircle className="text-green-500 mt-1 mr-3" /><span>{use}</span></li>)}</ul> : <p className="text-gray-500 italic">No specific uses listed.</p>}
                  </div>
                )}
                {activeSection === 'sideEffects' && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Possible Side Effects</h3>
                    {medicine.sideEffects?.length > 0 ? <div className="bg-yellow-50 p-3 rounded-lg"><ul className="space-y-2">{medicine.sideEffects.map((effect, i) => <li key={i} className="flex items-start"><FaExclamationTriangle className="text-yellow-600 mt-1 mr-3" /><span>{effect}</span></li>)}</ul></div> : <p className="text-gray-500 italic">No specific side effects listed.</p>}
                  </div>
                )}
                {activeSection === 'precautions' && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Safety Precautions</h3>
                    {medicine.precautions?.length > 0 ? <div className="bg-red-50 p-3 rounded-lg"><ul className="space-y-2">{medicine.precautions.map((precaution, i) => <li key={i} className="flex items-start"><FaShieldAlt className="text-red-600 mt-1 mr-3" /><span>{precaution}</span></li>)}</ul></div> : <p className="text-gray-500 italic">No specific precautions listed.</p>}
                  </div>
                )}
                {activeSection === 'instructions' && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Usage Instructions</h3>
                    {medicine.instructions?.length > 0 ? <div className="bg-green-50 p-3 rounded-lg"><ul className="space-y-2">{medicine.instructions.map((instruction, i) => <li key={i} className="flex items-start"><FaUserMd className="text-green-600 mt-1 mr-3" /><span>{instruction}</span></li>)}</ul></div> : <p>Take as directed by your physician.</p>}
                    <div className="mt-4"><h4 className="font-bold">Dosage</h4><p>{medicine.dosage || 'As prescribed by your doctor'}</p></div>
                  </div>
                )}
              </div>
            </div>

            {relatedMedicines.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Related Products</h2>
                  <div className="flex space-x-2">
                    <button onClick={prevRelated} disabled={relatedMedicines.length <= 2} className="p-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"><FaChevronLeft size={14} /></button>
                    <button onClick={nextRelated} disabled={relatedMedicines.length <= 2} className="p-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"><FaChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {visibleRelatedMedicines.map(relatedMed => {
                    const isRelatedTablet = isTabletForm(relatedMed.form);
                    const isRelatedSyrup = isSyrupForm(relatedMed.form);
                    return (
                      <Link key={relatedMed._id} to={`/medicine/${relatedMed._id}`} className="group border rounded-lg p-3 hover:border-[var(--primary-color)] hover:shadow-md">
                        <div className="flex">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <img src={relatedMed.image} alt={relatedMed.name} className="max-h-12 object-contain" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium group-hover:text-[var(--primary-color)]">{relatedMed.name}</h3>
                            <p className="text-xs text-gray-600 line-clamp-2">{relatedMed.description}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-bold text-[var(--secondary-color)]">Rs. {(relatedMed.discountedPrice || relatedMed.price).toFixed(2)}</span>
                              {relatedMed.discountedPrice && relatedMed.price > relatedMed.discountedPrice && <span className="text-xs text-gray-500 line-through">Rs. {relatedMed.price.toFixed(2)}</span>}
                              <FaChevronRight className="text-gray-400" />
                            </div>
                            {isRelatedTablet && <p className="text-[10px] text-gray-500 mt-1">{relatedMed.tabletsPerStrip || 10} tabs/strip</p>}
                            {isRelatedSyrup && <p className="text-[10px] text-gray-500 mt-1">{relatedMed.volume || '60ml'}</p>}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {isAggregatedView && availablePharmacies.length > 1 && (
                <div className="bg-white rounded-xl shadow-md p-5">
                  <div className="flex items-center mb-3">
                    <FaStore className="text-[var(--primary-color)] mr-2" />
                    <h3 className="font-bold text-gray-900">Select Pharmacy</h3>
                    <span className="ml-auto text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{availablePharmacies.length} options</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {availablePharmacies.map(pharmacy => {
                      const isSelected = selectedPharmacy?._id === pharmacy._id;
                      const isPharmacyInStock = pharmacy.inStock && (pharmacy.stockQuantity || 0) > 0;
                      return (
                        <button 
                          key={pharmacy._id} 
                          onClick={() => setSelectedPharmacy(pharmacy)} 
                          disabled={!isPharmacyInStock}
                          className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                            isSelected 
                              ? 'border-[var(--primary-color)] bg-blue-50 shadow-sm' 
                              : isPharmacyInStock 
                                ? 'border-gray-200 hover:border-gray-300 hover:shadow-sm' 
                                : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-800">{pharmacy.name}</h4>
                            {!isPharmacyInStock && <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">OOS</span>}
                            {isSelected && <FaCheckCircle className="text-green-500" />}
                          </div>
                          <div className="text-xs text-gray-600 mt-1.5 space-y-0.5">
                            <div className="flex items-center"><FaMapMarkerAlt className="w-3 mr-1.5" />{pharmacy.city} • {pharmacy.distance}</div>
                            <div className="flex items-center"><FaClock className="w-3 mr-1.5" />{pharmacy.deliveryTime}</div>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                            <div className="flex items-center">
                              <FaTag className="text-green-500 mr-1.5" size={12} />
                              <span className="font-bold text-[var(--secondary-color)]">Rs. {(pharmacy.discountedPrice || pharmacy.price).toFixed(2)}</span>
                              {pharmacy.discountPercentage > 0 && (
                                <span className="ml-2 text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-{pharmacy.discountPercentage}%</span>
                              )}
                            </div>
                          </div>
                          {isPharmacyInStock && (
                            <p className="text-xs text-gray-500 mt-1">📦 Stock: {pharmacy.stockQuantity || 0} {pharmacy.stockQuantity === 1 ? unitDisplayText.singular : unitDisplayText.plural}</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                  <FaShoppingCart className="mr-2 text-[var(--primary-color)]" />
                  Order Summary
                </h3>
                
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Per {unitLabel} Contains:</span>
                    <span className="font-bold text-gray-900 text-lg">
                      {isTablet ? `${tabletsPerStrip} tablets` : isSyrup ? volume : '1 unit'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {isTablet ? 'tablets per strip' : isSyrup ? 'per bottle' : 'per unit'}
                  </p>
                  {isTablet && (
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-blue-200/50">
                      <span className="text-sm text-gray-700">Price per tablet:</span>
                      <span className="font-semibold text-green-600">Rs. {perTabletPrice.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {isMedicineInStock() && !isMaxStockReached() && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Number of {unitLabel}s</label>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Max: {maxQuantity}</span>
                    </div>
                    <div className="flex items-center">
                      <button onClick={decrementQuantity} disabled={quantity <= 1} className="w-12 h-12 rounded-l-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center">
                        <FaMinus size={14} />
                      </button>
                      <div className="w-16 h-12 border-y border-gray-300 bg-white flex items-center justify-center font-semibold text-lg">{quantity}</div>
                      <button onClick={incrementQuantity} disabled={quantity >= maxQuantity} className="w-12 h-12 rounded-r-xl border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center">
                        <FaPlus size={14} />
                      </button>
                    </div>
                    {isTablet && <p className="text-xs text-gray-500 mt-2">Total: {quantity * tabletsPerStrip} tablets</p>}
                  </div>
                )}

                <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-xl">
                  {isDiscounted && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="text-gray-500 line-through">Rs. {originalTotalPrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{isDiscounted ? 'Discounted Price:' : 'Price:'}</span>
                    <span className="font-semibold text-green-600">Rs. {finalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Delivery Fee:</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span className="font-medium text-gray-700">Rs. {deliveryFee.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {deliveryFee > 0 && (
                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                      Add Rs. {(freeDeliveryThreshold - finalPrice).toFixed(2)} more for FREE delivery
                    </div>
                  )}
                  
                  {isDiscounted && (
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="text-gray-600">You Save:</span>
                      <span className="text-red-600 font-medium">Rs. {(originalTotalPrice - finalPrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                    <span className="font-bold text-gray-800">Total Amount:</span>
                    <span className="font-bold text-xl text-[var(--secondary-color)]">Rs. {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {quantityInCart > 0 ? (
                    <>
                      <button onClick={handleCheckout} className="w-full py-3 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] font-medium flex items-center justify-center shadow-sm">
                        <FaShoppingCart className="mr-2" />Proceed to Checkout
                      </button>
                      <button onClick={handleRemoveFromCart} className="w-full py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 font-medium flex items-center justify-center">
                        <FaTrash className="mr-2" />Remove from Cart
                      </button>
                    </>
                  ) : (
                    <button onClick={handleAddToCart} disabled={isButtonDisabled()} className={`w-full py-3 rounded-xl font-medium flex items-center justify-center shadow-sm ${!isButtonDisabled() ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                      {isPharmacyUser ? <><FaBan className="mr-2" />Not Allowed</> : totalStock <= 0 ? <><FaBan className="mr-2" />Out of Stock</> : isMaxStockReached() ? <><FaBan className="mr-2" />Max Added</> : <><FaShoppingCart className="mr-2" />Add to Cart</>}
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3"><FaTruck className="text-[var(--primary-color)]" /></div>
                  <h3 className="font-bold text-gray-900">Delivery Information</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center"><FaClock className="text-gray-400 mr-3 w-5" /><div><div className="font-medium text-gray-800">Estimated Delivery</div><div className="text-gray-600 text-sm">{deliveryInfo.estimatedDeliveryTime}</div></div></div>
                  {deliveryInfo.distance > 0 && <div className="flex items-center"><FaLocationArrow className="text-gray-400 mr-3 w-5" /><div><div className="font-medium text-gray-800">Distance</div><div className="text-gray-600 text-sm">{deliveryInfo.distance} km from pharmacy</div></div></div>}
                  <div className="flex items-center"><FaTruck className="text-gray-400 mr-3 w-5" /><div><div className="font-medium text-gray-800">Delivery Charge</div><div className="text-gray-600 text-sm">Rs. {deliveryInfo.deliveryCharge} (Free above Rs. {deliveryInfo.freeDeliveryThreshold})</div></div></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex items-center mb-3"><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3"><FaPhoneAlt className="text-green-600" /></div><h3 className="font-bold text-gray-900">Need Help?</h3></div>
                <p className="text-gray-600 text-sm mb-4">Our pharmacists are available 24/7 to assist you.</p>
                <button onClick={handleCallPharmacy} className="w-full py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-xl hover:bg-blue-50 font-medium flex items-center justify-center"><FaPhoneAlt className="mr-2" />Call Pharmacy</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl p-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center"><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4"><FaShieldAlt className="text-white text-xl" /></div><div><h3 className="text-white font-bold text-lg">100% Safe & Secure</h3><p className="text-white/90 text-sm">Your health is our priority</p></div></div>
            <div className="flex gap-8">
              <div className="text-center"><div className="text-white font-bold text-xl">10K+</div><div className="text-white/80 text-xs">Happy Customers</div></div>
              <div className="text-center"><div className="text-white font-bold text-xl">24/7</div><div className="text-white/80 text-xs">Support</div></div>
              <div className="text-center"><div className="text-white font-bold text-xl">100%</div><div className="text-white/80 text-xs">Authentic</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;