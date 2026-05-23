import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaMinus, FaPlus, FaBox, FaFlask } from 'react-icons/fa';

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
          setIsPharmacy(user.role === 'pharmacy');
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

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-all duration-150 w-full max-w-[200px] mx-auto flex flex-col h-full">
      {/* Image Section */}
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
        
        {isOutOfStock && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
            Out of Stock
          </div>
        )}
        
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
      
      {/* Info Section */}
      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 mb-0.5">
          {medicine.name}
        </h3>
        
        {medicine.genericName && (
          <p className="text-[10px] text-gray-500 line-clamp-1 mb-1">
            {medicine.genericName}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-sm font-bold text-green-600">
            Rs. {finalPrice.toFixed(2)}
          </span>
          {isDiscounted && (
            <span className="text-[10px] text-gray-500 line-through">
              Rs. {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Form-specific info */}
        {isTablet && (
          <div className="text-[8px] text-gray-500 mb-1 flex items-center gap-1 bg-purple-50 p-1 rounded">
            <FaBox className="w-2.5 h-2.5 text-purple-600" />
            <span className="font-medium">{getTabletsPerStrip()} tabs/strip</span>
          </div>
        )}

        {isSyrup && (
          <div className="text-[8px] text-gray-500 mb-1 flex items-center gap-1 bg-blue-50 p-1 rounded">
            <FaFlask className="w-2.5 h-2.5 text-blue-600" />
            <span className="font-medium">{medicine.volume || '60ml'}</span>
          </div>
        )}

        {/* Stock indicator */}
        {!isOutOfStock && (
          <p className="text-[9px] text-gray-400 mb-1">
            {stockQty <= 5 ? `Only ${stockQty} left` : 'In Stock'}
          </p>
        )}
        
        {/* Add to Cart / Quantity Controls */}
        <div className="mt-auto">
          {!isOutOfStock && isInCart ? (
            <div className="flex items-center border border-[var(--primary-color)] rounded overflow-hidden">
              <button
                onClick={handleDecrement}
                className="w-8 h-7 bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--secondary-color)] transition-colors"
              >
                <FaMinus size={10} />
              </button>
              <span className="flex-1 text-center text-xs font-semibold text-[var(--primary-color)]">
                {currentCartQty}
              </span>
              <button
                onClick={handleIncrement}
                disabled={currentCartQty >= stockQty}
                className="w-8 h-7 bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--secondary-color)] disabled:opacity-50 transition-colors"
              >
                <FaPlus size={10} />
              </button>
            </div>
          ) : (
            <div className="flex gap-1">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPharmacy}
                className={`flex-1 py-1.5 text-[10px] font-medium rounded transition-colors ${
                  isOutOfStock || isPharmacy
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : isPharmacy ? 'Not Allowed' : 'Add to Cart'}
              </button>
              
              <Link
                to={isAggregatedView ? `/medicine/${encodeURIComponent(medicine.name)}` : `/medicine/${medicine._id || medicine.id}`}
                className="bg-gray-100 text-gray-700 py-1.5 px-2 rounded hover:bg-gray-200 transition-colors text-[10px] font-medium text-center"
              >
                Detail
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;