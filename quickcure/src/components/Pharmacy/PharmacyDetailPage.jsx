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
import CartSidebar from './CartSidebar';

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
    getTotalItemCount,
    getCartSubtotal,
    getCartDeliveryFee,
    getCartTotal,
    pharmacyDeliveryCache,
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
  const cartSubtotal = getCartSubtotal();
  const { deliveryFee: cartDeliveryFee, freeDeliveryThreshold: cartFreeDeliveryThreshold } = getCartDeliveryFee(cartSubtotal);
  const cartFinalTotal = getCartTotal();
  const cartItemCount = getTotalItemCount();

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

  // Add to cart handlers - NO POPUP
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
      // Just show error without success modal - maybe use a toast instead
      return;
    }

    const currentInCart = getCartQuantityForMedicine(medicine._id);
    if (currentInCart >= (medicine.stockQuantity || 0)) {
      return;
    }

    if (isTabletForm(medicine.form)) {
      addToCart(medicine, id, { quantity: 1 });
      // No success modal - just update the UI
      return;
    }

    setSelectedMedicine(medicine);
    setPopupQuantity(1);
    setShowQuantityPopup(true);
  };

  const confirmAddToCart = () => {
    if (selectedMedicine) {
      if (!isStockAvailable(selectedMedicine, popupQuantity)) {
        setShowQuantityPopup(false);
        setSelectedMedicine(null);
        return;
      }

      addToCart(selectedMedicine, id, { quantity: popupQuantity });
      setShowQuantityPopup(false);
      setSelectedMedicine(null);
      // No success modal - just update the UI
    }
  };

  // FIXED: Update quantity function - using updateQuantity from CartContext
  const handleUpdateQuantity = (item, newQuantity) => {
    const maxStock = item.maxStock || item.stockQuantity || 0;
    
    if (newQuantity > maxStock) {
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

  const PharmacyErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPharmacyErrorModal(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleUp">
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <FiAlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Not Allowed</h3>
          <p className="text-gray-600 mb-6">Pharmacy accounts cannot add items to cart. Please use a regular customer account.</p>
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
                {/* <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  <FiStar className="w-3 h-3 fill-current" />
                  <span>4.8</span>
                </div> */}
              </div>
              <p className="opacity-90 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm">
                <FiMapPin className="w-4 h-4" />
                {pharmacy.address}
              </p>
              {/* <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
                  <FiClock /> {deliveryInfo.estimatedTime}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
                  <MdDeliveryDining /> {deliveryInfo.distance.toFixed(1)} km
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20">
                  <FiTag /> {pharmacy.discount }% off
                </span> 
              </div> */}
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
              const currentInCart = getCartQuantityForMedicine(medicine._id);
              const isTablet = isTabletForm(medicine.form);
              const isSyrup = isSyrupForm(medicine.form);
              const tabletsPerStrip = medicine.tabletsPerUnit || 10;
              const hasDiscount = medicine.discountedPrice && medicine.price > medicine.discountedPrice;
              const discountPercent = hasDiscount ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100) : 0;
              const maxStock = medicine.stockQuantity || 0;
              const isDisabled = isAddButtonDisabled(medicine);
              
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
                    
                    {/* Action Section - Show + - buttons when in cart, else Add button */}
                    <div className="flex gap-2 mt-3">
                      {currentInCart > 0 ? (
                        // Show + - buttons when item is in cart
                        <div className="flex-1 flex items-center border border-[#2c6774] rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => handleUpdateQuantity(medicine, currentInCart - 1)}
                            className="w-8 h-8 bg-[#f0f6f7] hover:bg-[#e0eaec] flex items-center justify-center transition-colors"
                          >
                            <FiMinus className="w-3 h-3 text-[#2c6774]" />
                          </button>
                          <div className="flex-1 text-center font-semibold text-[#2c6774] text-sm">
                            {currentInCart}
                          </div>
                          <button
                            onClick={() => handleUpdateQuantity(medicine, currentInCart + 1)}
                            disabled={currentInCart >= maxStock}
                            className={`w-8 h-8 bg-[#f0f6f7] hover:bg-[#e0eaec] flex items-center justify-center transition-colors ${
                              currentInCart >= maxStock ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <FiPlus className="w-3 h-3 text-[#2c6774]" />
                          </button>
                        </div>
                      ) : (
                        // Show Add to Cart button when not in cart
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
                          Add to Cart
                        </button>
                      )}
                      
                      <Link 
                        to={`/medicine/${medicine._id}`} 
                        className="px-3 py-2 rounded-lg font-medium text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
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

      {/* Cart Sidebar Drawer - Reusable Component */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cart}
        cartItemCount={cartItemCount}
        subtotal={cartSubtotal}
        deliveryFee={cartDeliveryFee}
        freeDeliveryThreshold={cartFreeDeliveryThreshold}
        finalTotal={cartFinalTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
        getItemTotalPrice={getItemTotalPrice}
        getDisplayQuantity={getDisplayQuantity}
        isTabletForm={isTabletForm}
        getPharmacySubtotal={getPharmacySubtotal}
        getDeliveryFeeForPharmacy={getDeliveryFeeForPharmacy}
        pharmacyDeliveryCache={pharmacyDeliveryCache}
      />

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