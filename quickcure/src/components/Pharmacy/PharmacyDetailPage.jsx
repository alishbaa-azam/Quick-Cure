// Order placing now 15/4/26
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiShoppingCart, FiMapPin, FiPhone, FiClock, FiMinus, FiPlus, FiTrash2, FiShare2 } from 'react-icons/fi';
import { MdLocalPharmacy } from 'react-icons/md';
import { FaCheck, FaExclamationTriangle, FaExclamationCircle, FaPhoneAlt, FaBox, FaBan, FaFlask } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

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
    isAtMaxStock,
    calculateItemTotal,
    isTabletForm: contextIsTabletForm,
    isSyrupForm,
    isInitialized: cartInitialized
  } = useCart();
  
  const isTabletForm = (form) => {
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return form && tabletForms.some(t => form.toLowerCase().includes(t));
  };
  
  const isSyrupFormLocal = (form) => {
    const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
    return form && syrupForms.some(s => form.toLowerCase().includes(s));
  };
  
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pharmacyMedicines, setPharmacyMedicines] = useState([]);
  const [medicineLoading, setMedicineLoading] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPharmacyUser, setIsPharmacyUser] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
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
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
    return null;
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
        console.error('Error initializing auth:', error);
        setIsLoggedIn(false);
        setIsPharmacyUser(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    const handleAuthChange = () => {
      initializeAuth();
    };

    window.addEventListener('userChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('userChanged', handleAuthChange);
    };
  }, []);

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

  useEffect(() => {
    const calculateDistance = () => {
      if (pharmacy?.latitude && pharmacy?.longitude) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude;
              const userLng = position.coords.longitude;
              
              const distance = calculateHaversineDistance(
                userLat, userLng,
                pharmacy.latitude, pharmacy.longitude
              );
              
              setDeliveryInfo(prev => ({
                ...prev,
                distance: distance
              }));
            },
            (error) => {
              console.log('Geolocation error or denied:', error);
            }
          );
        }
      }
    };
    
    if (pharmacy) {
      calculateDistance();
    }
  }, [pharmacy]);

  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setMedicineLoading(true);
        const response = await fetch(`http://localhost:5000/api/pharmacies/${id}/medicines`);
        const data = await response.json();
        
        if (data.success) {
          // ✅ FIXED: Use med.instock (lowercase 'n') to correctly read stock status
          const formatted = data.data.map(med => ({
            ...med,
            _id: `${id}_${med._id}`,
            id: `${id}_${med._id}`,
            pharmacyId: id,
            pharmacyName: pharmacy?.name,
            tabletsPerUnit: med.tabletsPerUnit || med.tabletsPerStrip || 10,
            tabletsPerStrip: med.tabletsPerUnit || med.tabletsPerStrip || 10,
            form: med.form || 'tablet',
            stockQuantity: Math.floor(med.stockQuantity || 0), // Ensure integer
            volume: med.volume || '60ml',
            inStock: med.inStock !== false && (med.stockQuantity || 0) > 0, // ✅ FIXED: med.instock
            reorderLevel: med.reorderLevel || 10
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

  const pharmacyCartItems = getPharmacyCartItems(id);
  
  const subtotal = getPharmacySubtotal(id);
  const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(id, subtotal, deliveryInfo.distance);
  const finalTotal = subtotal + deliveryFee;
  
  const cartItemCount = pharmacyCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const getCartQuantityForMedicine = (medicineId) => {
    return getItemQuantity(medicineId, id);
  };

  const getMaxAllowedQuantity = (medicine) => {
    const stockQty = medicine.stockQuantity || 0;
    if (!medicine.inStock || stockQty <= 0) return 0;
    
    const currentInCart = getCartQuantityForMedicine(medicine._id);
    return Math.max(0, stockQty - currentInCart);
  };

  const isStockAvailable = (medicine, requestedQuantity) => {
    const maxAllowed = getMaxAllowedQuantity(medicine);
    return requestedQuantity <= maxAllowed;
  };

  const filteredMedicines = pharmacyMedicines.filter(medicine => 
    medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (medicine.genericName && medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddToCartClick = (medicine) => {
    const user = getCurrentUser();
    
    if (!user) {
      navigate('/login', { 
        state: { 
          redirectTo: `/pharmacy/${id}`,
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

      addToCart(selectedMedicine, id, {
        quantity: popupQuantity
      });
      
      const unitText = isSyrupFormLocal(selectedMedicine.form) ? 'bottle' : 'unit';
      setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${selectedMedicine.name} added to cart successfully!`);
      setShowSuccessModal(true);
      setShowQuantityPopup(false);
      setSelectedMedicine(null);
    }
  };

  const handleRemoveFromCart = (medicineId) => {
    removeFromCart(medicineId, id);
  };

  const handleCheckout = () => {
    if (pharmacyCartItems.length === 0) {
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
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setShowLinkCopiedModal(true);
          setTimeout(() => setShowLinkCopiedModal(false), 2000);
        })
        .catch(console.error);
    }
  };

  const handleCallPharmacy = () => {
    setShowCallPharmacyModal(true);
  };

  const confirmCallPharmacy = () => {
    const phoneNumber = pharmacy?.phone || '1800-123-4567';
    window.location.href = `tel:${phoneNumber}`;
    setShowCallPharmacyModal(false);
  };

  const getPerTabletPrice = (medicine) => {
    const stripPrice = medicine.discountedPrice || medicine.price || 0;
    const tabletsPerStrip = medicine.tabletsPerUnit || medicine.tabletsPerStrip || 10;
    return stripPrice / tabletsPerStrip;
  };

  const getStockStatus = (medicine) => {
    const stockQty = medicine.stockQuantity || 0;
    const reorderLvl = medicine.reorderLevel || 10;
    const currentInCart = getCartQuantityForMedicine(medicine._id);
    const available = stockQty - currentInCart;
    
    if (!medicine.inStock || stockQty <= 0) {
      return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    } else if (available <= 0) {
      return { text: 'Max in Cart', color: 'text-orange-600 bg-orange-50' };
    } else if (stockQty <= reorderLvl) {
      return { text: `Only ${available} left`, color: 'text-yellow-600 bg-yellow-50' };
    } else {
      return { text: `${available} in stock`, color: 'text-green-600 bg-green-50' };
    }
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

  const getItemTotalPrice = (item) => {
    return calculateItemTotal(item);
  };

  const getDisplayQuantity = (item) => {
    const qty = item.quantity || 1;
    if (isTabletForm(item.form)) {
      return `${qty} strip${qty > 1 ? 's' : ''}`;
    } else if (isSyrupFormLocal(item.form)) {
      return `${qty} bottle${qty > 1 ? 's' : ''}`;
    }
    return `${qty} unit${qty > 1 ? 's' : ''}`;
  };

  const QuantityPopup = () => {
    if (!selectedMedicine) return null;
    const maxUnitQty = getMaxAllowedQuantity(selectedMedicine);
    const unitLabel = isSyrupFormLocal(selectedMedicine.form) ? 'bottle' : 'unit';
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Select Quantity</h3>
              <button onClick={() => setShowQuantityPopup(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedMedicine.name}</p>
            
            {maxUnitQty <= 5 && maxUnitQty > 0 && (
              <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-700 flex items-center">
                  <FaExclamationTriangle className="mr-1" />
                  Only {maxUnitQty} {unitLabel}{maxUnitQty > 1 ? 's' : ''} available
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Number of {unitLabel}s
                </span>
                <span className="text-xs text-gray-400">
                  Max: {maxUnitQty}
                </span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPopupQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                  disabled={popupQuantity <= 1}
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-12 text-center font-medium text-lg">
                  {popupQuantity}
                </span>
                <button
                  onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                  disabled={popupQuantity >= maxUnitQty}
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-lg font-bold text-[var(--primary-color)]">
                Rs. {((selectedMedicine.discountedPrice || selectedMedicine.price || 0) * popupQuantity).toFixed(2)}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setShowQuantityPopup(false)} className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmAddToCart} className="flex-1 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)]">
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
            <FaCheck className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Success!</h3>
          <p className="text-gray-600 text-center mb-6">{successMessage}</p>
          <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const PharmacyErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
            <FaExclamationTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Not Allowed</h3>
          <p className="text-gray-600 text-center mb-6">{successMessage}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setShowPharmacyErrorModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              OK
            </button>
            <button onClick={() => { setShowPharmacyErrorModal(false); navigate('/login'); }} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium">
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100">
            <FaExclamationCircle className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Your Cart is Empty</h3>
          <p className="text-gray-600 text-center mb-6">You need to add items to your cart before proceeding to checkout.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => setShowEmptyCartModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Continue Shopping
            </button>
            <button onClick={() => { setShowEmptyCartModal(false); navigate('/medicines'); }} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium">
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
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 mx-4">
          <div className="p-6">
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
              <p className="text-sm text-gray-500 text-center mt-2">{pharmacy?.name || 'Pharmacy Support'}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowCallPharmacyModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button onClick={confirmCallPharmacy} className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center">
                <FaPhoneAlt className="mr-2" /> Call Now
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
            <FaCheck className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Link Copied!</h3>
          <p className="text-gray-600 text-center">Pharmacy link has been copied to clipboard.</p>
        </div>
      </div>
    </div>
  );

  if (loading || !isInitialized || !cartInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
          <button onClick={() => navigate('/pharmacies')} className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors">
            Browse Pharmacies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showSuccessModal && <SuccessModal />}
      {showPharmacyErrorModal && <PharmacyErrorModal />}
      {showEmptyCartModal && <EmptyCartModal />}
      {showCallPharmacyModal && <CallPharmacyModal />}
      {showLinkCopiedModal && <LinkCopiedModal />}
      {showQuantityPopup && <QuantityPopup />}

      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button onClick={() => navigate('/pharmacies')} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <FiArrowLeft className="w-5 h-5 mr-1" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <button onClick={handleShare} className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors">
                <FiShare2 className="w-5 h-5" />
              </button>
              <button onClick={() => setShowMobileCart(!showMobileCart)} className="relative p-2 text-gray-600 hover:text-gray-900 lg:hidden">
                <FiShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <img 
              src={pharmacy.image || 'https://via.placeholder.com/60'} 
              alt={pharmacy.name}
              className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/60'; }}
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
            <button onClick={handleCallPharmacy} className="p-2 bg-blue-50 text-[var(--primary-color)] rounded-lg hover:bg-blue-100 transition-colors flex-shrink-0">
              <FiPhone className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>

            {medicineLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading medicines...</p>
              </div>
            ) : filteredMedicines.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-3">{filteredMedicines.length} medicine{filteredMedicines.length > 1 ? 's' : ''} available</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMedicines.map((medicine) => {
                    const stockStatus = getStockStatus(medicine);
                    const isDisabled = isAddButtonDisabled(medicine);
                    const buttonText = getAddButtonText(medicine);
                    const currentInCart = getCartQuantityForMedicine(medicine._id);
                    const isTablet = isTabletForm(medicine.form);
                    const isSyrup = isSyrupFormLocal(medicine.form);
                    const tabletsPerStrip = medicine.tabletsPerUnit || medicine.tabletsPerStrip || 10;
                    const stockQty = medicine.stockQuantity || 0;
                    
                    return (
                      <div key={medicine._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col">
                        <div className="relative h-32 bg-gray-50 flex items-center justify-center p-2">
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400'; }}
                          />
                          {medicine.discountedPrice && medicine.price > medicine.discountedPrice && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                              {Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100)}% OFF
                            </div>
                          )}
                          {medicine.form && (
                            <div className={`absolute bottom-2 right-2 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${isTablet ? 'bg-purple-500' : 'bg-green-500'}`}>
                              {isTablet ? <FaBox className="w-3 h-3" /> : <FaFlask className="w-3 h-3" />}
                              {medicine.form}
                            </div>
                          )}
                        </div>
                        
                        <div className="p-3 flex-1 flex flex-col">
                          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">{medicine.name}</h3>
                          <div className="min-h-[1.25rem] mb-1">
                            {medicine.genericName ? (
                              <p className="text-xs text-gray-500 line-clamp-1">{medicine.genericName}</p>
                            ) : (
                              <p className="text-xs text-gray-400 italic">Generic name not specified</p>
                            )}
                          </div>
                        
                          <div className={`mb-2 px-2 py-1 rounded text-xs font-medium inline-block ${stockStatus.color}`}>
                            {stockStatus.text}
                            {currentInCart > 0 && medicine.inStock && (
                              <span className="ml-1">({currentInCart} in cart)</span>
                            )}
                          </div>

                          <div className="mb-2 flex-1">
                            <p className="text-xs text-gray-600 line-clamp-2">{medicine.description}</p>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center flex-wrap gap-1">
                              <span className="text-base font-bold text-green-600">
                                Rs. {(medicine.discountedPrice || medicine.price || 0).toFixed(2)}
                              </span>
                              {medicine.discountedPrice && medicine.price > medicine.discountedPrice && (
                                <span className="text-xs text-gray-500 line-through">Rs. {medicine.price.toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                          
                          {isSyrup && (
                            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 bg-blue-50 p-1.5 rounded">
                              <FaFlask className="w-3 h-3 text-blue-600" />
                              <span className="font-medium">{medicine.volume || '60ml'}</span>
                              <span className="text-gray-400">•</span>
                              <span>{medicine.form || 'syrup'}</span>
                            </div>
                          )}

                          {isTablet && (
                            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 bg-purple-50 p-1.5 rounded">
                              <FaBox className="w-3 h-3 text-purple-600" />
                              <span className="font-medium">{tabletsPerStrip} tablets/strip</span>
                              <span className="text-gray-400">•</span>
                              <span>Rs. {getPerTabletPrice(medicine).toFixed(2)}/tab</span>
                            </div>
                          )}
                          
                          {/* Stock display as integer */}
                          <div className="text-[10px] text-gray-500 mb-1">
                            📦 Stock: {stockQty} {isTablet ? 'strip' : isSyrup ? 'bottle' : 'unit'}{stockQty !== 1 ? 's' : ''}
                          </div>
                          
                          <div className="flex gap-2 mt-auto">
                            <button
                              onClick={() => handleAddToCartClick(medicine)}
                              disabled={isDisabled}
                              className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                                isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                              }`}
                            >
                              {isDisabled && !isPharmacyUser && !medicine.inStock ? (
                                <><FaBan className="w-3 h-3" />{buttonText}</>
                              ) : buttonText}
                            </button>
                            <Link to={`/medicine/${medicine._id}`} className="flex-1 bg-gray-100 text-gray-700 py-2 px-2 rounded hover:bg-gray-200 transition-colors text-xs font-medium text-center">
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <MdLocalPharmacy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No medicines found</p>
                {searchTerm && <p className="text-gray-400">Try adjusting your search</p>}
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:w-80">
            <div className="bg-white rounded-lg border border-gray-200 sticky top-20 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FiShoppingCart className="w-5 h-5 text-[var(--primary-color)]" />
                  Your Cart ({pharmacyCartItems.length} {pharmacyCartItems.length === 1 ? 'item' : 'items'})
                </h3>
              </div>
              
              <div className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {pharmacyCartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-4">
                      {pharmacyCartItems.map((item) => (
                        <div key={item._id} className="border-b border-gray-100 pb-3">
                          <div className="flex gap-2">
                            <img src={item.image || 'https://via.placeholder.com/40'} alt={item.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                            <div className="flex-1">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              <p className="text-[var(--primary-color)] font-semibold text-sm">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
                              {isTabletForm(item.form) && item.totalTablets && (
                                <p className="text-xs text-gray-500">{item.totalTablets} tablets total</p>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">Qty: {getDisplayQuantity(item)}</span>
                                <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors">
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Delivery:</span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600 font-medium">FREE</span>
                        ) : (
                          <span className="font-medium">Rs. {deliveryFee.toFixed(2)}</span>
                        )}
                      </div>
                      {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
                        <p className="text-xs text-gray-500 mb-2">
                          Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} for FREE delivery
                        </p>
                      )}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-bold">Total:</span>
                        <span className="font-bold text-lg text-[var(--primary-color)]">Rs. {finalTotal.toFixed(2)}</span>
                      </div>
                      <button onClick={handleCheckout} className="w-full py-3 bg-[var(--primary-color)] text-white text-center rounded-lg hover:bg-[var(--secondary-color)] transition-colors">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartItemCount > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
          <button onClick={() => setShowMobileCart(true)} className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-medium hover:bg-[var(--secondary-color)] flex items-center justify-between px-4">
            <span>View Cart ({cartItemCount} items)</span>
            <span className="font-bold">Rs. {finalTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {showMobileCart && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileCart(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Your Cart ({cartItemCount})</h3>
              <button onClick={() => setShowMobileCart(false)} className="p-2">
                <FiArrowLeft className="w-5 h-5 rotate-90" />
              </button>
            </div>
            
            <div className="p-4">
              {pharmacyCartItems.map((item) => (
                <div key={item._id} className="flex gap-3 py-4 border-b border-gray-100">
                  <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-[var(--primary-color)] font-semibold mt-1">Rs. {getItemTotalPrice(item).toFixed(2)}</p>
                    {isTabletForm(item.form) && item.totalTablets && (
                      <p className="text-xs text-gray-500">{item.totalTablets} tablets total</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Qty: {getDisplayQuantity(item)}</span>
                      <button onClick={() => { handleRemoveFromCart(item._id); if (pharmacyCartItems.length === 1) setShowMobileCart(false); }} className="text-red-500 p-2 hover:bg-red-50 rounded transition-colors">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Delivery:</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    <span className="font-medium">Rs. {deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                {deliveryFee > 0 && freeDeliveryThreshold > subtotal && (
                  <p className="text-xs text-gray-500 mb-2">
                    Add Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)} for FREE delivery
                  </p>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-bold">Total:</span>
                  <span className="font-bold text-lg text-[var(--primary-color)]">Rs. {finalTotal.toFixed(2)}</span>
                </div>
                <button onClick={() => { setShowMobileCart(false); handleCheckout(); }} className="w-full py-4 bg-[var(--primary-color)] text-white text-center rounded-lg font-medium text-lg">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {cartItemCount > 0 && <div className="lg:hidden h-20"></div>}
    </div>
  );
};

export default PharmacyDetailPage;