import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaMinus, FaPlus, FaTimes, FaExclamationTriangle, FaShoppingCart, FaCheck, FaTruck, FaBox, FaFlask } from 'react-icons/fa';

const MedicineCard = ({ medicine, context = 'all-medicines' }) => {
  const navigate = useNavigate();
  
  const { 
    cart,
    addToCart,
    getItemQuantity, 
    getCartItem,
    getPharmacySubtotal,
    getDeliveryFeeForPharmacy,
  } = useCart();
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [popupQuantity, setPopupQuantity] = useState(1);
  
  const [isPharmacy, setIsPharmacy] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryFee: 0,
    freeDeliveryThreshold: 500,
    subtotal: 0,
    finalTotal: 0
  });

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

  const getTabletsPerStrip = () => {
    return medicine.tabletsPerUnit || medicine.tabletsPerStrip || 10;
  };

  const getPricePerTablet = () => {
    const stripPrice = getEffectivePrice();
    return stripPrice / getTabletsPerStrip();
  };

  const getPharmacyId = () => {
    if (context === 'all-medicines' && medicine.availableAt && medicine.availableAt.length > 0) {
      return medicine.availableAt[0].pharmacyId || medicine.availableAt[0]._id;
    }
    if (medicine.pharmacyId) {
      return medicine.pharmacyId;
    }
    return medicine.selectedPharmacy?._id || medicine.pharmacy?._id || null;
  };

  const getMedicineId = () => {
    if (context === 'all-medicines' && medicine.availableAt && medicine.availableAt.length > 0) {
      const pharmacyId = getPharmacyId();
      return medicine.uniqueId || `${pharmacyId}_${medicine._id || medicine.name}`;
    }
    return medicine._id || medicine.id;
  };

  const getCurrentCartQuantity = () => {
    const medicineId = getMedicineId();
    const pharmacyId = getPharmacyId();
    if (!medicineId || !pharmacyId) return 0;
    return getItemQuantity(medicineId, pharmacyId);
  };

  const getStockQuantity = () => {
    if (context === 'all-medicines' && medicine.availableAt && medicine.availableAt.length > 0) {
      const selectedPharmacy = medicine.availableAt[0];
      return selectedPharmacy?.stockQuantity || 0;
    }
    return medicine.stockQuantity || medicine.stock || 0;
  };

  const checkIsAvailable = () => {
    const stockQty = getStockQuantity();
    const currentQty = getCurrentCartQuantity();
    return stockQty > currentQty;
  };

  const checkIsMaxStockReached = () => {
    const stockQty = getStockQuantity();
    const currentQty = getCurrentCartQuantity();
    return currentQty >= stockQty && stockQty > 0;
  };

  const getMaxAllowedQuantity = () => {
    const stockQty = getStockQuantity();
    const currentQty = getCurrentCartQuantity();
    return Math.max(0, stockQty - currentQty);
  };

  const isStockAvailable = (requestedQuantity) => {
    const maxAllowed = getMaxAllowedQuantity();
    return requestedQuantity <= maxAllowed;
  };

  const getEffectivePrice = () => {
    if (context === 'all-medicines' && medicine.availableAt && medicine.availableAt.length > 0) {
      const selectedPharmacy = medicine.availableAt[0];
      return selectedPharmacy.discountedPrice || selectedPharmacy.price || 0;
    }
    return medicine.discountedPrice || medicine.price || 0;
  };

  const getOriginalPrice = () => {
    if (context === 'all-medicines' && medicine.availableAt && medicine.availableAt.length > 0) {
      const selectedPharmacy = medicine.availableAt[0];
      return selectedPharmacy.price || 0;
    }
    return medicine.price || 0;
  };

  const checkIsDiscounted = () => {
    const effective = getEffectivePrice();
    const original = getOriginalPrice();
    return effective < original;
  };

  const getDiscountPercentage = () => {
    const effective = getEffectivePrice();
    const original = getOriginalPrice();
    if (original > 0 && effective < original) {
      return Math.round(((original - effective) / original) * 100);
    }
    return 0;
  };

  const getButtonText = () => {
    if (isPharmacy) return 'Not Allowed';
    
    const stockQty = getStockQuantity();
    if (stockQty <= 0) return 'Out of Stock';
    
    if (checkIsMaxStockReached()) return 'Max Added';
    
    return 'Add to Cart';
  };

  const isButtonDisabled = () => {
    if (isPharmacy) return true;
    
    const stockQty = getStockQuantity();
    if (stockQty <= 0) return true;
    
    return checkIsMaxStockReached();
  };

  const calculateDeliveryInfo = () => {
    const pharmacyId = getPharmacyId();
    if (!pharmacyId) return;
    
    const subtotal = getPharmacySubtotal(pharmacyId);
    const { deliveryFee, freeDeliveryThreshold } = getDeliveryFeeForPharmacy(pharmacyId, subtotal, 2.5);
    
    setDeliveryInfo({
      deliveryFee,
      freeDeliveryThreshold,
      subtotal,
      finalTotal: subtotal + deliveryFee
    });
  };

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userStr = localStorage.getItem('user');
        
        if (userStr) {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          setIsPharmacy(user.role === 'pharmacy');
        } else {
          setIsLoggedIn(false);
          setIsPharmacy(false);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoggedIn(false);
        setIsPharmacy(false);
      }
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('userChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('userChanged', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    calculateDeliveryInfo();
  }, [cart]);

  const handleAddToCartClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
      navigate('/login', { 
        state: { 
          redirectTo: window.location.pathname,
          message: 'Please login to add to cart' 
        } 
      });
      return;
    }

    let user = null;
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login', { 
        state: { 
          redirectTo: window.location.pathname,
          message: 'Session expired. Please login again.' 
        } 
      });
      return;
    }

    if (user && user.role === 'pharmacy') {
      setSuccessMessage('Pharmacy accounts cannot add items to cart. Please use a regular customer account.');
      return;
    }

    const stockQty = getStockQuantity();
    if (stockQty <= 0) {
      setSuccessMessage(`Sorry, ${medicine.name} is currently out of stock.`);
      setShowSuccessModal(true);
      return;
    }

    const currentInCart = getCurrentCartQuantity();
    if (currentInCart >= stockQty) {
      setSuccessMessage(`You've already added all available stock of ${medicine.name}.`);
      setShowSuccessModal(true);
      return;
    }

    // For tablets/capsules - directly add strip (no popup)
    if (isTabletForm(medicine.form)) {
      const pharmacyId = getPharmacyId();
      const medicineToAdd = {
        ...medicine,
        id: getMedicineId(),
        _id: getMedicineId(),
        pharmacyId: pharmacyId,
        pharmacyName: medicine.pharmacyName || medicine.availableAt?.[0]?.pharmacyName || 'Pharmacy',
        selectedPharmacy: {
          _id: pharmacyId,
          name: medicine.pharmacyName || medicine.availableAt?.[0]?.pharmacyName || 'Pharmacy'
        },
        stockQuantity: stockQty,
        maxStock: stockQty,
        tabletsPerStrip: getTabletsPerStrip(),
        tabletsPerUnit: getTabletsPerStrip()
      };
      
      addToCart(medicineToAdd, pharmacyId, { quantity: 1 });
      setSuccessMessage(`${medicine.name} (1 strip) added to cart!`);
      setShowSuccessModal(true);
      return;
    }

    // For syrups - show quantity popup
    const maxAllowed = getMaxAllowedQuantity();
    if (maxAllowed <= 0) {
      setSuccessMessage(`Sorry, ${medicine.name} is out of stock.`);
      setShowSuccessModal(true);
      return;
    }
    
    setPopupQuantity(1);
    setShowQuantityPopup(true);
  };

  const confirmAddToCart = () => {
    const pharmacyId = getPharmacyId();
    const maxAllowed = getMaxAllowedQuantity();
    
    if (!isStockAvailable(popupQuantity)) {
      setSuccessMessage(`Cannot add. Only ${maxAllowed} unit${maxAllowed > 1 ? 's' : ''} available.`);
      setShowSuccessModal(true);
      setShowQuantityPopup(false);
      return;
    }
    
    const medicineToAdd = {
      ...medicine,
      id: getMedicineId(),
      _id: getMedicineId(),
      pharmacyId: pharmacyId,
      pharmacyName: medicine.pharmacyName || medicine.availableAt?.[0]?.pharmacyName || 'Pharmacy',
      selectedPharmacy: {
        _id: pharmacyId,
        name: medicine.pharmacyName || medicine.availableAt?.[0]?.pharmacyName || 'Pharmacy'
      },
      stockQuantity: getStockQuantity(),
      maxStock: getStockQuantity(),
      tabletsPerStrip: getTabletsPerStrip(),
      tabletsPerUnit: getTabletsPerStrip()
    };
    
    addToCart(medicineToAdd, pharmacyId, { quantity: popupQuantity });
    
    const unitText = isSyrupForm(medicine.form) ? 'bottle' : 'unit';
    setSuccessMessage(`${popupQuantity} ${unitText}${popupQuantity > 1 ? 's' : ''} of ${medicine.name} added to cart successfully!`);
    setShowSuccessModal(true);
    setShowQuantityPopup(false);
  };

  const goToCheckout = () => {
    setShowSuccessModal(false);
    navigate('/booking');
  };

  const handleViewDetails = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const isAggregatedView = context === 'all-medicines';
  
  const finalPrice = getEffectivePrice();
  const originalPrice = getOriginalPrice();
  const discountPercentage = getDiscountPercentage();
  const isDiscounted = checkIsDiscounted();
  const currentCartQty = getCurrentCartQuantity();
  const stockQty = getStockQuantity();
  const buttonText = getButtonText();
  const buttonDisabled = isButtonDisabled();
  const maxUnitQty = getMaxAllowedQuantity();
  const isTablet = isTabletForm(medicine.form);
  const isSyrup = isSyrupForm(medicine.form);
  const tabletsPerStrip = getTabletsPerStrip();

  return (
    <>
      {/* Quantity Popup Modal - Only for Syrups */}
      {showQuantityPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuantityPopup(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Select Quantity</h3>
                <button onClick={() => setShowQuantityPopup(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <p className="text-sm text-gray-600 mb-4">{medicine.name}</p>
              
              {maxUnitQty <= 5 && maxUnitQty > 0 && (
                <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700 flex items-center">
                    <FaExclamationTriangle className="mr-1" />
                    Only {maxUnitQty} {isSyrup ? 'bottle' : 'unit'}{maxUnitQty > 1 ? 's' : ''} available
                  </p>
                </div>
              )}
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Number of {isSyrup ? 'Bottles' : 'Units'}
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
                    <FaMinus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {popupQuantity}
                  </span>
                  <button
                    onClick={() => setPopupQuantity(prev => Math.min(maxUnitQty, prev + 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                    disabled={popupQuantity >= maxUnitQty}
                  >
                    <FaPlus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-lg font-bold text-[var(--primary-color)]">
                  Rs. {(finalPrice * popupQuantity).toFixed(2)}
                </p>
                {currentCartQty > 0 && (
                  <p className="text-blue-600 mt-1 text-xs">Currently in cart: {currentCartQty} unit(s)</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowQuantityPopup(false)} 
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAddToCart} 
                  className="flex-1 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal with Dynamic Delivery Fee */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100">
                <FaCheck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Added to Cart!</h3>
              <p className="text-gray-600 text-center mb-4">{successMessage}</p>
              
              {cart.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Cart Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">Rs. {deliveryInfo.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 flex items-center gap-1">
                        <FaTruck className="text-gray-400" size={12} />
                        Delivery Fee:
                      </span>
                      {deliveryInfo.deliveryFee === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        <span className="font-medium">Rs. {deliveryInfo.deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                    {deliveryInfo.deliveryFee > 0 && (
                      <p className="text-xs text-gray-500">
                        Add Rs. {(deliveryInfo.freeDeliveryThreshold - deliveryInfo.subtotal).toFixed(2)} for FREE delivery
                      </p>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-[var(--primary-color)]">Rs. {deliveryInfo.finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={goToCheckout}
                  className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FaShoppingCart size={16} />
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Card */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto flex flex-col h-full">
        
        <div className="relative h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
            }}
          />
          
          {isDiscounted && discountPercentage > 0 && (
            <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
              {discountPercentage}% OFF
            </div>
          )}
          
          {stockQty <= 0 ? (
            <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
              Out of Stock
            </div>
          ) : checkIsMaxStockReached() ? (
            <div className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
              Max Added
            </div>
          ) : stockQty - currentCartQty <= 5 ? (
            <div className="absolute top-1 right-1 bg-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
              Only {stockQty - currentCartQty} left
            </div>
          ) : null}
          
          {isAggregatedView && medicine.availableAtCount > 1 && (
            <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
              {medicine.availableAtCount} stores
            </div>
          )}

          {medicine.form && (
            <div className={`absolute bottom-1 right-1 text-white text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-1 ${isTablet ? 'bg-purple-500' : 'bg-green-500'}`}>
              {isTablet ? <FaBox className="w-2.5 h-2.5" /> : <FaFlask className="w-2.5 h-2.5" />}
              {medicine.form}
            </div>
          )}
        </div>
        
        <div className="p-1.5 flex flex-col flex-1">
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5 min-h-[16px]">
            {medicine.name}
          </h3>
          
          <div className="min-h-[14px] mb-0.5">
            <p className="text-[10px] text-gray-500 line-clamp-1">
              {medicine.genericName || '\u00A0'}
            </p>
          </div>
        
          <div className="mb-1.5 min-h-[2.5rem] flex-1">
            <p className="text-[10px] text-gray-600 line-clamp-2">
              {medicine.description || '\u00A0'}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center flex-wrap">
                <span className="text-sm font-bold text-green-600">
                  Rs. {finalPrice.toFixed(2)}
                </span>
                
                {isDiscounted && originalPrice > finalPrice && (
                  <span className="text-[10px] text-gray-500 line-through ml-1">
                    Rs. {originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Updated Tablet Display Section */}
            {isTablet && (
              <div className="text-[8px] text-gray-500 mb-1 flex items-center gap-1 bg-purple-50 p-1 rounded">
                <FaBox className="w-2.5 h-2.5 text-purple-600" />
                <span className="font-medium">{tabletsPerStrip} tabs/strip</span>
                <span className="text-gray-400">•</span>
                <span>Rs. {getPricePerTablet().toFixed(2)}/tab</span>
              </div>
            )}

            {/* Updated Syrup Display Section */}
            {isSyrup && (
              <div className="text-[8px] text-gray-500 mb-1 flex items-center gap-1 bg-blue-50 p-1 rounded">
                <FaFlask className="w-2.5 h-2.5 text-blue-600" />
                <span className="font-medium">{medicine.volume || '60ml'}</span>
                <span className="text-gray-400">•</span>
                <span>{medicine.form || 'bottle'}</span>
              </div>
            )}
            
            {currentCartQty > 0 && (
              <div className="text-[9px] text-blue-600 mb-1 font-medium">
                🛒 {currentCartQty} in cart
              </div>
            )}
            
            <div className="flex space-x-1">
              <button
                onClick={handleAddToCartClick}
                disabled={buttonDisabled}
                className={`flex-1 py-1 px-1.5 rounded text-[10px] font-medium transition-colors ${
                  !buttonDisabled
                    ? 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {buttonText}
              </button>
              
              {isAggregatedView ? (
                <Link
                  to={`/medicine/${encodeURIComponent(medicine.name)}`}
                  onClick={(e) => handleViewDetails(e, `/medicine/${encodeURIComponent(medicine.name)}`)}
                  className="flex-1 bg-gray-100 text-gray-700 py-1 px-1.5 rounded hover:bg-gray-200 transition-colors text-[10px] font-medium text-center"
                >
                  Detail
                </Link>
              ) : (
                <Link
                  to={`/medicine/${medicine._id || medicine.id}`}
                  onClick={(e) => handleViewDetails(e, `/medicine/${medicine._id || medicine.id}`)}
                  className="flex-1 bg-gray-100 text-gray-700 py-1 px-1.5 rounded hover:bg-gray-200 transition-colors text-[10px] font-medium text-center"
                >
                  Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MedicineCard;