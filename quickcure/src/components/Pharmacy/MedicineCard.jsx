import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaMinus, FaPlus, FaBox, FaFlask, FaStore } from 'react-icons/fa';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { isRoleRestricted, getRestrictionMessage } from '../../utils/roleRestrictions';

const MedicineCard = ({ medicine, context = 'all-medicines' }) => {
  const navigate = useNavigate();
  
  const { 
    cart,
    addToCart,
    updateQuantity,
    getItemQuantity, 
    getCartItem,
  } = useCart();
  
  const [isPharmacy, setIsPharmacy] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const medicineId = getMedicineId();
  const pharmacyId = getPharmacyId();

  const currentCartQty = medicineId && pharmacyId ? getItemQuantity(medicineId, pharmacyId) : 0;
  
  const getStockQuantity = () => {
    if (context === 'all-medicines' && medicine.availableAt && medicine.availableAt.length > 0) {
      const selectedPharmacy = medicine.availableAt[0];
      return selectedPharmacy?.stockQuantity || 0;
    }
    return medicine.stockQuantity || medicine.stock || 0;
  };

  const stockQty = getStockQuantity();

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

  const finalPrice = getEffectivePrice();
  const originalPrice = getOriginalPrice();
  const isDiscounted = originalPrice > finalPrice;
  const discountPercentage = isDiscounted ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;
  const isTablet = isTabletForm(medicine.form);
  const isSyrup = isSyrupForm(medicine.form);
  const isOutOfStock = stockQty <= 0;
  const isInCart = currentCartQty > 0;

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          // Mark as restricted if user is pharmacy, doctor, lab, or admin
          const restrictedRoles = ['pharmacy', 'doctor', 'lab', 'admin'];
          setIsPharmacy(restrictedRoles.includes(user.role));
        } else {
          setIsLoggedIn(false);
          setIsPharmacy(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setIsPharmacy(false);
      }
    };
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener('userChanged', handleAuthChange);
    return () => window.removeEventListener('userChanged', handleAuthChange);
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate('/login', { 
        state: { redirectTo: window.location.pathname, message: 'Please login to add to cart' } 
      });
      return;
    }

    if (isPharmacy) return;

    if (isOutOfStock) return;

    if (!medicineId || !pharmacyId) return;

    const medicineToAdd = {
      ...medicine,
      id: medicineId,
      _id: medicineId,
      pharmacyId: pharmacyId,
      pharmacyName: medicine.pharmacyName || medicine.availableAt?.[0]?.pharmacyName || 'Pharmacy',
      selectedPharmacy: { _id: pharmacyId, name: medicine.pharmacyName || medicine.availableAt?.[0]?.pharmacyName || 'Pharmacy' },
      stockQuantity: stockQty,
      maxStock: stockQty,
      tabletsPerStrip: getTabletsPerStrip(),
      tabletsPerUnit: getTabletsPerStrip()
    };

    addToCart(medicineToAdd, pharmacyId, { quantity: 1 });
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!medicineId || !pharmacyId) return;
    if (currentCartQty >= stockQty) return;
    updateQuantity(medicineId, pharmacyId, currentCartQty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!medicineId || !pharmacyId) return;
    // Decrement: if new quantity would be 0, it auto-removes via updateQuantity
    updateQuantity(medicineId, pharmacyId, currentCartQty - 1);
  };

  const isAggregatedView = context === 'all-medicines';
  const maxStock = stockQty;
  const isDisabled = isOutOfStock || isPharmacy || !isLoggedIn;

  // Stock status
  const getStockStatus = () => {
    if (isOutOfStock) return { text: 'Out of Stock', color: 'bg-red-500 text-white' };
    if (stockQty <= 5) return { text: 'Low Stock', color: 'bg-orange-500 text-white' };
    return { text: 'In Stock', color: 'bg-green-500 text-white' };
  };

  const stockStatus = getStockStatus();
  const hasDiscount = isDiscounted && discountPercentage > 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
          }}
        />
        
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
            {discountPercentage}% OFF
          </div>
        )}
        
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${stockStatus.color}`}>
          {stockStatus.text}
        </div>
        
        {isAggregatedView && medicine.availableAtCount > 1 && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
            {medicine.availableAtCount} stores
          </div>
        )}

        {medicine.form && (
          <div className="absolute bottom-2 right-2">
            {isTablet && (
              <div className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <FaBox className="w-3 h-3" /> {medicine.form}
              </div>
            )}
            {isSyrup && (
              <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <FaFlask className="w-3 h-3" /> {medicine.form}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-3">
        <h3 className="font-bold text-gray-800 line-clamp-1 text-sm">
          {medicine.name}
        </h3>
        
        {medicine.genericName && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            {medicine.genericName}
          </p>
        )}
        
        {/* Pharmacy Name */}
        {(medicine.pharmacyName || (medicine.availableAt && medicine.availableAt.length > 0)) && (
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
            <FaStore className="w-3 h-3 text-[#2c6774]" />
            <span className="line-clamp-1 font-bold">
              {medicine.pharmacyName || medicine.availableAt[0]?.pharmacyName || 'Pharmacy'}
            </span>
          </div>
        )}
        
        {/* Description */}
        {medicine.description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {medicine.description}
          </p>
        )}
        
        {/* Price Section */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#2c6774]">
            Rs. {finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              Rs. {originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Medicine Details Chips */}
        <div className="flex flex-wrap gap-1 mt-2">
          {isTablet && (
            <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
              {getTabletsPerStrip()} tabs/strip
            </span>
          )}
          {isSyrup && (
            <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
              {medicine.volume || '60ml'}
            </span>
          )}
          {!isOutOfStock && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              Stock: {stockQty}
            </span>
          )}
        </div>
        
        {/* Action Section */}
        <div className="flex gap-2 mt-3">
          {!isOutOfStock && isInCart ? (
            // Show + - buttons when item is in cart
            <div className="flex-1 flex items-center border border-[#2c6774] rounded-lg overflow-hidden bg-white">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 bg-[#f0f6f7] hover:bg-[#e0eaec] flex items-center justify-center transition-colors"
              >
                <FiMinus className="w-3 h-3 text-[#2c6774]" />
              </button>
              <div className="flex-1 text-center font-semibold text-[#2c6774] text-sm">
                {currentCartQty}
              </div>
              <button
                onClick={handleIncrement}
                disabled={currentCartQty >= maxStock}
                className={`w-8 h-8 bg-[#f0f6f7] hover:bg-[#e0eaec] flex items-center justify-center transition-colors ${
                  currentCartQty >= maxStock ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiPlus className="w-3 h-3 text-[#2c6774]" />
              </button>
            </div>
          ) : (
            // Show Add to Cart button when not in cart
            <button
              onClick={handleAddToCart}
              disabled={isDisabled}
              className={`flex-1 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1 ${
                isDisabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#2c6774] text-white hover:bg-[#1e4e56] active:scale-95 shadow-sm hover:shadow'
              }`}
            >
              <FiShoppingCart className="w-3.5 h-3.5" />
              {isOutOfStock ? 'Out of Stock' : isPharmacy ? 'Not Allowed' : 'Add to Cart'}
            </button>
          )}
          
          <Link
            to={isAggregatedView ? `/medicine/${encodeURIComponent(medicine.name)}` : `/medicine/${medicine._id || medicine.id}`}
            className="px-3 py-2 rounded-lg font-medium text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;