import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

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

const getTabletsPerStrip = (item) => item.tabletsPerUnit || item.tabletsPerStrip || 10;

const getPerTabletPrice = (item) => {
  const stripPrice = item.discountedPrice || item.price || 0;
  return stripPrice / getTabletsPerStrip(item);
};

const calculateItemTotal = (item) => {
  const price = item.discountedPrice || item.price || 0;
  if (isTabletForm(item.form)) return price * (item.quantity || 1);
  return price * (item.quantity || 1);
};

const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
  } catch (error) {}
  return null;
};

const getUserCartKey = () => {
  const user = getCurrentUser();
  return user?._id || user?.id ? `medicineCart_${user._id || user.id}` : 'medicineCart_guest';
};

export const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [deliverySettings, setDeliverySettings] = useState({
    baseDeliveryCharge: 50, perKmCharge: 10, freeDeliveryThreshold: 500,
    preparationTime: 15, averageDeliverySpeed: 20
  });

  const [pharmacyDeliveryCache, setPharmacyDeliveryCache] = useState({});

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartKey = getUserCartKey();
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) setCartState(JSON.parse(savedCart));
        
        const savedDeliverySettings = localStorage.getItem('deliverySettings');
        if (savedDeliverySettings) setDeliverySettings(JSON.parse(savedDeliverySettings));
        
        setIsInitialized(true);
      } catch (error) {
        setIsInitialized(true);
      }
    };
    
    loadCart();
    
    const handleAuthChange = () => {
      const cartKey = getUserCartKey();
      const savedCart = localStorage.getItem(cartKey);
      setCartState(savedCart ? JSON.parse(savedCart) : []);
    };
    
    window.addEventListener('userChanged', handleAuthChange);
    return () => window.removeEventListener('userChanged', handleAuthChange);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      const cartKey = getUserCartKey();
      if (cart.length > 0) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
      } else {
        localStorage.removeItem(cartKey);
      }
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (error) {}
  }, [cart, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('deliverySettings', JSON.stringify(deliverySettings));
    } catch (error) {}
  }, [deliverySettings, isInitialized]);

  const setCart = useCallback((newCartOrUpdater) => {
    if (typeof newCartOrUpdater === 'function') {
      setCartState(prev => newCartOrUpdater(prev));
    } else {
      setCartState(newCartOrUpdater);
    }
  }, []);

  const fetchPharmacyDeliverySettings = useCallback(async (pharmacyId) => {
    if (pharmacyDeliveryCache[pharmacyId]) return pharmacyDeliveryCache[pharmacyId];
    
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/${pharmacyId}`);
      const data = await response.json();
      
      if (data.success && data.data.deliverySettings) {
        const settings = data.data.deliverySettings;
        setPharmacyDeliveryCache(prev => ({ ...prev, [pharmacyId]: settings }));
        return settings;
      }
    } catch (error) {}
    
    return { baseDeliveryCharge: 50, perKmCharge: 10, freeDeliveryThreshold: 500, preparationTime: 15, averageDeliverySpeed: 20 };
  }, [pharmacyDeliveryCache]);

  const updateDeliverySettings = useCallback((settings) => {
    setDeliverySettings(prev => ({ ...prev, ...settings }));
  }, []);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 2.5;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return parseFloat((R * c).toFixed(1));
  }, []);

  const calculateDeliveryCharge = useCallback((distance, orderValue, pharmacySettings = null) => {
    const settings = pharmacySettings || deliverySettings;
    let deliveryCharge = 0;
    if (orderValue < settings.freeDeliveryThreshold) {
      if (distance <= 3) {
        deliveryCharge = settings.baseDeliveryCharge;
      } else {
        deliveryCharge = settings.baseDeliveryCharge + ((distance - 3) * settings.perKmCharge);
      }
    }
    return { deliveryCharge, freeDeliveryThreshold: settings.freeDeliveryThreshold, distance };
  }, [deliverySettings]);

  const calculateDeliveryTime = useCallback((distance, pharmacySettings = null) => {
    const settings = pharmacySettings || deliverySettings;
    const travelTime = (distance / settings.averageDeliverySpeed) * 60;
    const totalMinutes = Math.round(travelTime + settings.preparationTime);
    const minTime = Math.max(15, totalMinutes - 5);
    const maxTime = totalMinutes + 10;
    return `${minTime}-${maxTime} min`;
  }, [deliverySettings]);

  const getDeliveryFeeForPharmacy = useCallback((pharmacyId, subtotal, distance = 2.5) => {
    const settings = pharmacyDeliveryCache[pharmacyId] || deliverySettings;
    const { deliveryCharge } = calculateDeliveryCharge(distance, subtotal, settings);
    return { deliveryFee: deliveryCharge, freeDeliveryThreshold: settings.freeDeliveryThreshold, settings };
  }, [pharmacyDeliveryCache, deliverySettings, calculateDeliveryCharge]);

  const getCartDeliveryFee = useCallback((subtotal) => {
    const { deliveryCharge } = calculateDeliveryCharge(2.5, subtotal);
    return { deliveryFee: deliveryCharge, freeDeliveryThreshold: deliverySettings.freeDeliveryThreshold };
  }, [deliverySettings, calculateDeliveryCharge]);

  const getPharmacyCartItems = useCallback((pharmacyId) => {
    return cart.filter(item => item.pharmacyId === pharmacyId || item.selectedPharmacy?._id === pharmacyId);
  }, [cart]);

  const getItemQuantity = useCallback((medicineId, pharmacyId) => {
    const item = cart.find(i => 
      (i.id === medicineId || i._id === medicineId) && 
      (i.pharmacyId === pharmacyId || i.selectedPharmacy?._id === pharmacyId)
    );
    return item?.quantity || 0;
  }, [cart]);

  const isAtMaxStock = useCallback((medicine, pharmacyId) => {
    const stockQty = medicine.stockQuantity || medicine.stock || 0;
    if (stockQty <= 0) return true;
    const currentQty = getItemQuantity(medicine._id || medicine.id, pharmacyId);
    return currentQty >= stockQty;
  }, [getItemQuantity]);

  // ✅ FIXED: Add to cart with proper stock validation
  const addToCart = useCallback((medicine, pharmacyId, options = {}) => {
    const { quantity = 1 } = options;

    setCartState(prevCart => {
      const medicineId = medicine._id || medicine.id;
      
      if (!medicineId) {
        console.error('CRITICAL: Cannot add to cart - medicine has no ID.', medicine);
        return prevCart;
      }
      
      const stockQty = Math.floor(medicine.stockQuantity || medicine.stock || 999);
      const tabletsPerStrip = medicine.tabletsPerUnit || medicine.tabletsPerStrip || 10;
      
      const existingIndex = prevCart.findIndex(item => 
        (item.id === medicineId || item._id === medicineId) && 
        (item.pharmacyId === pharmacyId || item.selectedPharmacy?._id === pharmacyId)
      );
      
      const existingItem = existingIndex > -1 ? prevCart[existingIndex] : null;
      
      // ✅ FIXED: Check both instock and inStock
      const isOutOfStock = medicine.instock === false || medicine.inStock === false;
      if (isOutOfStock) {
        console.warn('Medicine out of stock');
        return prevCart;
      }
      
      const currentQty = existingItem?.quantity || 0;
      if (currentQty >= stockQty && stockQty > 0) {
        console.warn('Max stock reached');
        return prevCart;
      }

      const newCart = [...prevCart];
      const totalUnitsAfterAdd = currentQty + quantity;
      
      if (totalUnitsAfterAdd > stockQty && stockQty > 0) {
        console.warn('Cannot exceed stock');
        return prevCart;
      }

      if (existingItem) {
        newCart[existingIndex] = {
          ...existingItem,
          quantity: totalUnitsAfterAdd,
          totalTablets: isTabletForm(medicine.form) ? totalUnitsAfterAdd * tabletsPerStrip : null
        };
      } else {
        const newItem = {
          id: medicineId,
          _id: medicineId,
          name: medicine.name,
          price: medicine.price || 0,
          discountedPrice: medicine.discountedPrice,
          image: medicine.image,
          description: medicine.description,
          form: medicine.form,
          quantity: quantity,
          totalTablets: isTabletForm(medicine.form) ? quantity * tabletsPerStrip : null,
          pharmacyId: pharmacyId,
          selectedPharmacy: medicine.selectedPharmacy || { _id: pharmacyId, name: medicine.pharmacyName },
          tabletsPerStrip: tabletsPerStrip,
          tabletsPerUnit: tabletsPerStrip,
          maxStock: stockQty,
          volume: medicine.volume || '60ml',
          inStock: medicine.inStock !== false && medicine.instock !== false, // ✅ ADDED
          instock: medicine.instock !== false && medicine.inStock !== false   // ✅ ADDED
        };
        
        newCart.push(newItem);
      }
      
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((medicineId, pharmacyId, newQuantity) => {
    setCartState(prevCart => {
      // If newQuantity is 0 or less, remove the item entirely
      if (newQuantity <= 0) {
        return prevCart.filter(item => 
          !((item.id === medicineId || item._id === medicineId) && 
            (item.pharmacyId === pharmacyId || item.selectedPharmacy?._id === pharmacyId))
        );
      }

      return prevCart.map(item => {
        if ((item.id === medicineId || item._id === medicineId) && 
            (item.pharmacyId === pharmacyId || item.selectedPharmacy?._id === pharmacyId)) {
          
          const tabletsPerStrip = item.tabletsPerStrip || item.tabletsPerUnit || 10;
          const maxStock = item.maxStock || 999;
          
          if (newQuantity > maxStock) return item;
          
          return {
            ...item,
            quantity: newQuantity,
            totalTablets: isTabletForm(item.form) ? newQuantity * tabletsPerStrip : null
          };
        }
        return item;
      });
    });
  }, []);

  const removeFromCart = useCallback((medicineId, pharmacyId) => {
    setCartState(prevCart => prevCart.filter(item => 
      !((item.id === medicineId || item._id === medicineId) && 
        (item.pharmacyId === pharmacyId || item.selectedPharmacy?._id === pharmacyId))
    ));
  }, []);

  const clearCart = useCallback(() => setCartState([]), []);

  const getCartSubtotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }, [cart]);

  const getPharmacySubtotal = useCallback((pharmacyId) => {
    return getPharmacyCartItems(pharmacyId).reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }, [cart, getPharmacyCartItems]);

  const getCartTotal = useCallback(() => {
    const subtotal = getCartSubtotal();
    const { deliveryFee } = getCartDeliveryFee(subtotal);
    return subtotal + deliveryFee;
  }, [getCartSubtotal, getCartDeliveryFee]);

  const getPharmacyTotal = useCallback((pharmacyId, distance = 2.5) => {
    const subtotal = getPharmacySubtotal(pharmacyId);
    const { deliveryFee } = getDeliveryFeeForPharmacy(pharmacyId, subtotal, distance);
    return subtotal + deliveryFee;
  }, [getPharmacySubtotal, getDeliveryFeeForPharmacy]);

  const getTotalItemCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cart]);

  const getCartItem = useCallback((medicineId, pharmacyId) => {
    return cart.find(item => 
      (item.id === medicineId || item._id === medicineId) && 
      (item.pharmacyId === pharmacyId || item.selectedPharmacy?._id === pharmacyId)
    );
  }, [cart]);

  const value = {
    cart, setCart, isInitialized,
    deliverySettings, updateDeliverySettings, fetchPharmacyDeliverySettings, pharmacyDeliveryCache,
    calculateDistance, calculateDeliveryCharge, calculateDeliveryTime,
    getDeliveryFeeForPharmacy, getCartDeliveryFee,
    addToCart, updateQuantity, removeFromCart, clearCart,
    getPharmacyCartItems, getItemQuantity, isAtMaxStock, getCartItem,
    getCartSubtotal, getPharmacySubtotal, getCartTotal, getPharmacyTotal, getTotalItemCount,
    calculateItemTotal, getPerTabletPrice, isTabletForm, isSyrupForm
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export { calculateItemTotal, getPerTabletPrice, isTabletForm };