import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FaArrowLeft, FaTrash, FaTimes, FaPlus, 
  FaMinus, FaCheckCircle, FaReceipt, FaHistory, FaExclamationCircle,
  FaBox, FaBoxes, FaFlask, FaPills, FaBan, FaShoppingCart,
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStickyNote,
  FaStore, FaTruck, FaWallet, FaCreditCard, FaShieldAlt
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const MedicineBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const { 
    cart, 
    setCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getCartDeliveryFee,
    getPharmacyCartItems,
    getCartTotal,
    getTotalItemCount,
    calculateItemTotal,
    getPerTabletPrice,
    isTabletForm: contextIsTabletForm,
    isSyrupForm: contextIsSyrupForm,
    getItemQuantity,
    isInitialized: cartInitialized
  } = useCart();
  
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(() => {
    const urlPharmacy = searchParams.get('pharmacy');
    return urlPharmacy || null;
  });
  const [filteredCart, setFilteredCart] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [orders, setOrders] = useState([]);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);
  const [pharmacyError, setPharmacyError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [validatingStock, setValidatingStock] = useState(false);
  const formRef = useRef(null);

  const isTabletForm = (form) => {
    if (!form) return false;
    const tabletForms = ['tablet', 'capsule', 'caplet', 'pill'];
    return tabletForms.some(t => form.toLowerCase().includes(t));
  };

  const isSyrupForm = (form) => {
    if (!form) return false;
    const syrupForms = ['syrup', 'suspension', 'drops', 'liquid', 'solution'];
    return syrupForms.some(s => form.toLowerCase().includes(s));
  };

  const getFormIcon = (item) => {
    if (isTabletForm(item.form)) return <FaBoxes className="text-blue-500" />;
    if (isSyrupForm(item.form)) return <FaFlask className="text-green-500" />;
    return <FaBox className="text-gray-500" />;
  };

  const getQuantityDisplay = (item) => {
    const qty = item.quantity || 1;
    if (isTabletForm(item.form)) {
      return `${qty} strip${qty > 1 ? 's' : ''}`;
    }
    if (isSyrupForm(item.form)) {
      return `${qty} bottle${qty > 1 ? 's' : ''}`;
    }
    return `${qty} unit${qty > 1 ? 's' : ''}`;
  };

  const getPricePerTabletForItem = (item) => {
    const stripPrice = item.discountedPrice || item.price || 0;
    const tabletsPerStrip = item.tabletsPerStrip || item.tabletsPerUnit || 10;
    return stripPrice / tabletsPerStrip;
  };

  const getUserOrdersKey = (userId) => {
    return userId ? `medicineOrders_${userId}` : 'medicineOrders_guest';
  };

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

  const getPharmacyIdForItem = (item) => {
    if (item.selectedPharmacy && item.selectedPharmacy._id) {
      return item.selectedPharmacy._id;
    }
    if (item.pharmacy && item.pharmacy._id) {
      return item.pharmacy._id;
    }
    if (item.pharmacyId) {
      return item.pharmacyId;
    }
    if (item.pharmacyIds && item.pharmacyIds.length > 0) {
      return item.pharmacyIds[0];
    }
    return null;
  };

  const getMedicineIdForItem = (item) => {
    const rawId = item.id || item._id;
    if (rawId && rawId.includes('_')) {
      return rawId.split('_')[1];
    }
    return rawId;
  };

  const getOrderPharmacyId = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return null;
    
    if (selectedPharmacy) {
      return selectedPharmacy;
    }
    
    return getPharmacyIdForItem(orderItems[0]);
  };

  const getMaxStockForItem = (item) => {
    return item.maxStock || item.stockQuantity || item.stock || 999;
  };

  const canIncrementQuantity = (item) => {
    const maxStock = getMaxStockForItem(item);
    return (item.quantity || 1) < maxStock;
  };

  const validateStockWithBackend = async () => {
    const itemsToValidate = filteredCart;
    
    if (!itemsToValidate || itemsToValidate.length === 0) {
      return false;
    }

    setValidatingStock(true);
    
    try {
      for (const item of itemsToValidate) {
        const pharmacyId = getPharmacyIdForItem(item);
        const medicineId = getMedicineIdForItem(item);
        
        if (!pharmacyId || !medicineId) {
          console.warn(`⚠️ Missing IDs for ${item.name}, skipping validation`);
          continue;
        }
        
        try {
          const response = await fetch(`http://localhost:5000/api/pharmacies/${pharmacyId}/medicines/${medicineId}`);
          
          if (!response.ok) {
            console.error(`❌ API error for ${item.name}: ${response.status}`);
            continue;
          }
          
          const data = await response.json();
          
          if (data.success && data.data) {
            const medicineData = data.data;
            const currentStock = medicineData.stockQuantity || medicineData.stock || 0;
            const requestedQuantity = item.quantity || 1;
            
            console.log(`📦 ${item.name}: Stock=${currentStock}, Requested=${requestedQuantity}`);
            
            if (currentStock <= 0) {
              alert(`❌ ${item.name} is out of stock at the selected pharmacy!`);
              setValidatingStock(false);
              return false;
            }
            
            if (requestedQuantity > currentStock) {
              alert(`⚠️ Only ${currentStock} unit${currentStock > 1 ? 's' : ''} of ${item.name} available!\n\nYou requested: ${requestedQuantity}`);
              setValidatingStock(false);
              return false;
            }
            
            console.log(`✅ ${item.name}: ${requestedQuantity}/${currentStock} available`);
          }
        } catch (error) {
          console.error(`❌ Network error for ${item.name}:`, error);
        }
      }
      
      setValidatingStock(false);
      return true;
    } catch (error) {
      console.error('❌ Validation process error:', error);
      setValidatingStock(false);
      return true;
    }
  };

  const loadUserData = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      const ordersKey = getUserOrdersKey(user._id || user.id);
      const savedOrders = localStorage.getItem(ordersKey);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error('Error parsing saved orders:', error);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
    
    setIsInitialized(true);
  };

  const saveUserOrders = (user, ordersData) => {
    if (!user) return;
    const ordersKey = getUserOrdersKey(user._id || user.id);
    localStorage.setItem(ordersKey, JSON.stringify(ordersData));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    loadUserData();
    fetchPharmacies();
    
    const handleAuthChange = () => {
      loadUserData();
    };
    
    window.addEventListener('userChanged', handleAuthChange);
    return () => {
      window.removeEventListener('userChanged', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const urlPharmacy = searchParams.get('pharmacy');
    if (urlPharmacy) {
      setSelectedPharmacy(urlPharmacy);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isInitialized || !currentUser) return;
    saveUserOrders(currentUser, orders);
  }, [orders, currentUser, isInitialized]);

  useEffect(() => {
    filterCartByPharmacy(selectedPharmacy);
  }, [cart, selectedPharmacy]);

  const generateUniqueOrderId = () => {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `ORD-${timestamp}-${randomPart}`;
  };

  const fetchPharmacies = async () => {
    setLoadingPharmacies(true);
    try {
      const response = await fetch('http://localhost:5000/api/pharmacies');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.success) {
        setPharmacies(data.data);
        setPharmacyError(null);
      } else {
        setPharmacyError('Failed to load pharmacies.');
        setPharmacies([]);
      }
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      setPharmacyError('Cannot connect to server.');
      setPharmacies([]);
    } finally {
      setLoadingPharmacies(false);
    }
  };

  const getUniquePharmaciesFromCart = () => {
    const pharmacyMap = new Map();
    const safeCart = cart || [];
    
    safeCart.forEach(item => {
      const pharmacyId = getPharmacyIdForItem(item);
      if (pharmacyId && !pharmacyMap.has(pharmacyId)) {
        const pharmacy = pharmacies.find(p => p._id === pharmacyId);
        if (pharmacy) {
          pharmacyMap.set(pharmacyId, pharmacy);
        } else {
          pharmacyMap.set(pharmacyId, { _id: pharmacyId, name: 'Pharmacy' });
        }
      }
    });
    
    return Array.from(pharmacyMap.values());
  };

  const filterCartByPharmacy = (pharmacyId) => {
    const safeCart = cart || [];
    
    if (!pharmacyId) {
      setFilteredCart([]);
      return;
    }
    
    const filtered = safeCart.filter(item => {
      const itemPharmacyId = getPharmacyIdForItem(item);
      return itemPharmacyId === pharmacyId;
    });
    
    setFilteredCart(filtered);
  };

  const getPharmacyNameForItem = (item) => {
    if (item.selectedPharmacy && item.selectedPharmacy.name) return item.selectedPharmacy.name;
    if (item.pharmacy && item.pharmacy.name) return item.pharmacy.name;
    if (item.pharmacyTag) return item.pharmacyTag;
    if (item.pharmacyId) {
      const pharmacy = pharmacies.find(p => p._id === item.pharmacyId);
      return pharmacy ? pharmacy.name : 'Pharmacy';
    }
    return 'Pharmacy';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., user@example.com)";
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      setPatientInfo({ ...patientInfo, [name]: value });
      if (value.trim()) {
        const error = validateEmail(value);
        setEmailError(error);
      } else {
        setEmailError('');
      }
    } else {
      setPatientInfo({ ...patientInfo, [name]: value });
    }
  };

  const handleRemoveFromCart = (item) => {
    const medicineId = item.id || item._id;
    const pharmacyId = getPharmacyIdForItem(item);
    removeFromCart(medicineId, pharmacyId);
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    const maxStock = getMaxStockForItem(item);
    if (newQuantity > maxStock) {
      alert(`Cannot exceed available stock (${maxStock} units)`);
      return;
    }
    
    const medicineId = item.id || item._id;
    const pharmacyId = getPharmacyIdForItem(item);
    
    updateQuantity(medicineId, pharmacyId, newQuantity);
  };

  const calculateItemTotalForDisplay = (item) => {
    return calculateItemTotal(item);
  };

  // Calculate subtotal from filtered cart only (selected pharmacy items)
  const subtotal = filteredCart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  
  // Calculate delivery fee based on filtered cart subtotal
  const { deliveryFee, freeDeliveryThreshold } = getCartDeliveryFee(subtotal);
  const finalTotal = subtotal + deliveryFee;

  const placeOrderToBackend = async (orderData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, error: 'Please login first' };
      }

      const orderPharmacyId = getOrderPharmacyId(orderData.cart);
      
      const calculatedSubtotal = subtotal;
      const calculatedDeliveryFee = deliveryFee;
      const calculatedTotal = finalTotal;
      const calculatedTax = calculatedSubtotal * 0.05;

      const generatedOrderId = generateUniqueOrderId();

      const backendOrder = {
        orderId: generatedOrderId,
        orderNumber: generatedOrderId,
        
        patient: {
          name: orderData.patientInfo.name,
          email: orderData.patientInfo.email,
          phone: orderData.patientInfo.phone,
          address: orderData.patientInfo.address
        },
        
        patientInfo: {
          name: orderData.patientInfo.name,
          email: orderData.patientInfo.email,
          phone: orderData.patientInfo.phone,
          address: orderData.patientInfo.address,
          notes: orderData.patientInfo.notes || ''
        },
        
        medicines: orderData.cart.map(item => {
          const actualMedicineId = getMedicineIdForItem(item);
          const pharmacyId = getPharmacyIdForItem(item);
          const price = item.discountedPrice || item.price || 0;
          const isTablet = isTabletForm(item.form);
          const tabletsPerStrip = item.tabletsPerStrip || item.tabletsPerUnit || 10;
          const quantity = item.quantity || 1;
          
          return {
            medicineId: actualMedicineId,
            pharmacyId: pharmacyId,
            name: item.name,
            quantity: quantity,
            quantityType: isTablet ? 'strips' : (isSyrupForm(item.form) ? 'bottles' : 'units'),
            price: price,
            total: price * quantity,
            tabletQuantity: isTablet ? quantity * tabletsPerStrip : null,
            tabletsPerStrip: tabletsPerStrip,
            form: item.form || 'tablet',
            isTablet: isTablet
          };
        }),
        
        cart: orderData.cart.map(item => {
          const actualMedicineId = getMedicineIdForItem(item);
          const pharmacyId = getPharmacyIdForItem(item);
          const price = item.discountedPrice || item.price || 0;
          const isTablet = isTabletForm(item.form);
          const tabletsPerStrip = item.tabletsPerStrip || item.tabletsPerUnit || 10;
          const quantity = item.quantity || 1;
          
          return {
            medicineId: actualMedicineId,
            pharmacyId: pharmacyId,
            name: item.name,
            quantity: quantity,
            price: price,
            total: price * quantity,
            tabletQuantity: isTablet ? quantity * tabletsPerStrip : null,
            tabletsPerStrip: tabletsPerStrip,
            form: item.form,
            isTablet: isTablet
          };
        }),
        
        items: orderData.cart.map(item => {
          const actualMedicineId = getMedicineIdForItem(item);
          const pharmacyId = getPharmacyIdForItem(item);
          const price = item.discountedPrice || item.price || 0;
          const isTablet = isTabletForm(item.form);
          const tabletsPerStrip = item.tabletsPerStrip || item.tabletsPerUnit || 10;
          const quantity = item.quantity || 1;
          
          return {
            medicine: actualMedicineId,
            pharmacy: pharmacyId,
            pharmacyId: pharmacyId,
            name: item.name,
            quantity: quantity,
            price: price,
            itemTotal: price * quantity,
            tabletQuantity: isTablet ? quantity * tabletsPerStrip : null,
            tabletsPerStrip: tabletsPerStrip,
            form: item.form,
            isTablet: isTablet
          };
        }),
        
        pharmacyId: orderPharmacyId ? String(orderPharmacyId) : null,
        subtotal: Number(calculatedSubtotal) || 0,
        deliveryFee: Number(calculatedDeliveryFee) || 0,
        deliveryCharge: Number(calculatedDeliveryFee) || 0,
        totalAmount: Number(calculatedTotal) || 0,
        total: Number(calculatedTotal) || 0,
        finalAmount: Number(calculatedTotal) || 0,
        taxAmount: Number(calculatedTax) || 0,
        
        status: 'pending',
        payment: {
          method: 'cod',
          status: 'pending',
          amount: calculatedTotal
        },
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        
        deliveryInfo: {
          address: orderData.patientInfo.address
        },
        
        userId: currentUser?._id || currentUser?.id,
        notes: orderData.patientInfo.notes || '',
        pharmacyNotes: '',
        
        requiresPrescription: false,
        prescriptionVerified: null,
        prescriptionDetails: {}
      };

      console.log('📤 Sending order:', {
        orderId: backendOrder.orderId,
        pharmacyId: backendOrder.pharmacyId,
        medicinesCount: backendOrder.medicines.length
      });

      const response = await fetch('http://localhost:5000/api/medicine-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(backendOrder)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('✅ Order placed:', result.data.orderNumber);
        return { success: true, order: result.data };
      } else {
        console.error('❌ Order failed:', result);
        return { success: false, error: result.message || 'Failed to place order' };
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      return { success: false, error: error.message || 'Network error' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please login to place an order');
      navigate('/login', {
        state: {
          redirectTo: '/booking',
          message: 'Please login to place an order'
        }
      });
      return;
    }
    
    if (!selectedPharmacy) {
      alert('Please select a pharmacy to place your order.');
      return;
    }
    
    if (patientInfo.email.trim()) {
      const error = validateEmail(patientInfo.email);
      if (error) {
        setEmailError(error);
        return;
      }
    }
    
    if (!filteredCart || filteredCart.length === 0) {
      alert('Your cart is empty for the selected pharmacy. Please add medicines before booking.');
      return;
    }
    
    const isStockValid = await validateStockWithBackend();
    if (!isStockValid) {
      return;
    }
    
    setPlacingOrder(true);
    
    const orderNumber = generateUniqueOrderId();
    const orderItems = filteredCart;
    const orderPharmacyId = getOrderPharmacyId(orderItems);
    
    const orderData = {
      orderNumber,
      patientInfo: { ...patientInfo },
      cart: orderItems.map(item => ({
        id: item.id || item._id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        tabletsPerStrip: item.tabletsPerStrip || item.tabletsPerUnit || 10,
        form: item.form,
        price: item.price || item.discountedPrice || 0,
        discountedPrice: item.discountedPrice,
        pharmacyIds: item.pharmacyIds || [],
        selectedPharmacy: item.selectedPharmacy || null,
        pharmacyTag: item.pharmacyTag || null
      })),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: finalTotal,
      selectedPharmacy,
      status: 'Processing',
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString(),
      userId: currentUser._id || currentUser.id,
      pharmacyId: orderPharmacyId
    };
    
    const backendResult = await placeOrderToBackend(orderData);
    
    if (backendResult.success) {
      setOrders(prevOrders => [orderData, ...prevOrders]);
      
      if (currentUser) {
        const ordersKey = getUserOrdersKey(currentUser._id || currentUser.id);
        const updatedOrders = [orderData, ...orders];
        localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
      }
      
      const orderId = backendResult.order?._id || backendResult.order?.orderId || orderData.orderNumber;
      
      setCurrentOrder(orderData);
      
      // Remove only the ordered items from cart (not the entire cart)
      const updatedCart = cart.filter(item => !filteredCart.includes(item));
      setCart(updatedCart);
      
      if (finalTotal > 0) {
        navigate('/payment', {
          state: {
            bookingType: 'medicine_order',
            bookingId: orderId,
            amount: finalTotal,
            customerName: patientInfo.name,
            customerEmail: patientInfo.email,
            customerPhone: patientInfo.phone
          }
        });
      } else {
        setShowOrderConfirmation(true);
      }
      
      setPatientInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
      });
      setEmailError('');
      setSelectedPharmacy(null);
      
    } else {
      alert(`Failed to place order: ${backendResult.error}`);
    }
    
    setPlacingOrder(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePharmacyChange = (pharmacyId) => {
    setSelectedPharmacy(pharmacyId);
    filterCartByPharmacy(pharmacyId);
  };

  const closeOrderConfirmation = () => {
    setShowOrderConfirmation(false);
    setCurrentOrder(null);
    navigate('/pharmacies');
  };

  const viewOrderHistory = () => {
    navigate('/orders');
  };

  const safeCart = cart || [];
  const isLoggedIn = !!currentUser;

  if (!isInitialized || !cartInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPills className="w-6 h-6 text-[var(--primary-color)] animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
            <FaExclamationCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">Login Required</h2>
          <p className="text-gray-600 text-center mb-8">Please login to view your cart and place orders.</p>
          <button
            onClick={() => navigate('/login', { state: { redirectTo: '/booking' } })}
            className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold text-lg"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (safeCart.length === 0 && !showOrderConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg">
            <FaShoppingCart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Hello, <span className="font-semibold text-[var(--primary-color)]">{currentUser?.name || currentUser?.email?.split('@')[0] || 'there'}</span>!<br />
            Start adding medicines to your cart.
          </p>
          <button
            onClick={() => navigate('/pharmacies')}
            className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold text-lg"
          >
            Browse Pharmacies
          </button>
        </div>
      </div>
    );
  }

  const cartPharmacies = getUniquePharmaciesFromCart();

  return (
    <div ref={formRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      {/* Stock Validation Loading Overlay */}
      {validatingStock && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaPills className="w-6 h-6 text-[var(--primary-color)] animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Verifying Stock</h3>
              <p className="text-gray-600 text-center text-sm">
                Checking real-time availability of medicines...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && currentOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg animate-bounce">
                  <FaCheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
                <p className="text-gray-600">Your order has been placed successfully</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-8 border border-gray-200/50">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 font-medium">Order Number</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
                    {currentOrder.orderNumber}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: 'Patient Name', value: currentOrder.patientInfo.name, icon: FaUser },
                    { label: 'Phone', value: currentOrder.patientInfo.phone, icon: FaPhone },
                    { label: 'Subtotal', value: `Rs. ${(currentOrder.subtotal || currentOrder.total).toFixed(2)}`, icon: FaWallet },
                    { 
                      label: 'Delivery Fee', 
                      value: (currentOrder.deliveryFee || 0) === 0 ? 'FREE' : `Rs. ${(currentOrder.deliveryFee || 0).toFixed(2)}`,
                      icon: FaTruck,
                      highlight: (currentOrder.deliveryFee || 0) === 0
                    },
                    { label: 'Total Amount', value: `Rs. ${currentOrder.total.toFixed(2)}`, icon: FaCreditCard, bold: true },
                    { label: 'Status', value: currentOrder.status, icon: FaShieldAlt, status: true },
                    { label: 'Date', value: currentOrder.date, icon: FaHistory }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200/50 last:border-0">
                      <span className="text-gray-600 flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        {item.label}:
                      </span>
                      <span className={`font-medium ${item.bold ? 'text-xl text-[var(--primary-color)]' : ''} ${item.highlight ? 'text-green-600' : ''} ${item.status ? 'text-green-600' : ''}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={closeOrderConfirmation}
                  className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-4 px-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold text-lg"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-3 hover:bg-white/60 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Go back"
            >
              <FaArrowLeft className="w-5 h-5 text-[var(--primary-color)]" />
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
                Book Your Medicines
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, <span className="font-semibold text-[var(--primary-color)]">{currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}</span>
              </p>
            </div>
          </div>
        </div>

        {loadingPharmacies && (
          <div className="mb-4 p-4 bg-blue-50/80 backdrop-blur-sm text-blue-700 rounded-2xl text-sm border border-blue-200/50 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Loading pharmacy information...
          </div>
        )}
        
        {pharmacyError && (
          <div className="mb-4 p-4 bg-yellow-50/80 backdrop-blur-sm text-yellow-700 rounded-2xl text-sm border border-yellow-200/50 flex items-center gap-3">
            <FaExclamationCircle className="w-5 h-5" />
            {pharmacyError}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <FaShoppingCart className="text-[var(--primary-color)]" />
                  Selected Medicines
                </h2>
                <span className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  {filteredCart.length} items
                </span>
              </div>
              
              {/* Pharmacy Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaStore className="text-[var(--primary-color)]" />
                  Select Pharmacy <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPharmacy || ''}
                  onChange={(e) => handlePharmacyChange(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all duration-300 text-gray-700 font-medium cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_1rem]"
                  required
                >
                  <option value="" disabled>-- Select a pharmacy --</option>
                  {cartPharmacies.map(pharmacy => {
                    const pharmacyItems = safeCart.filter(item => {
                      const itemPharmacyId = getPharmacyIdForItem(item);
                      return itemPharmacyId === pharmacy._id;
                    }).length;
                    
                    return (
                      <option key={pharmacy._id} value={pharmacy._id}>
                        🏪 {pharmacy.name} ({pharmacyItems} items)
                      </option>
                    );
                  })}
                </select>
                {!selectedPharmacy && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <FaExclamationCircle className="w-3 h-3" />
                    Please select a pharmacy to view items and place order
                  </p>
                )}
              </div>
              
              {filteredCart.length === 0 ? (
                <div className="text-center py-16 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                  <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Please select a pharmacy to view items and place order.</p>
                  {/* <p className="text-sm text-gray-400">Select a different pharmacy or add medicines to cart</p> */}
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {filteredCart.map((item, index) => {
                      const pharmacyName = getPharmacyNameForItem(item);
                      const itemId = item.id || item._id;
                      const maxStock = getMaxStockForItem(item);
                      const isTablet = isTabletForm(item.form);
                      const isSyrup = isSyrupForm(item.form);
                      const price = item.discountedPrice || item.price || 0;
                      const itemTotal = price * (item.quantity || 1);
                      
                      return (
                        <div 
                          key={itemId} 
                          className="group bg-white rounded-2xl border border-gray-200/50 hover:border-[var(--primary-color)]/30 hover:shadow-lg transition-all duration-300 overflow-hidden animate-fadeIn"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="p-5 flex items-center gap-5">
                            {/* Image */}
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-14 max-w-14 object-contain"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                                }}
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-800 text-base truncate">{item.name}</h3>
                                  <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                                    <FaStore className="w-3 h-3" />
                                    {pharmacyName}
                                  </p>
                                  <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-lg font-bold text-[var(--primary-color)]">
                                      Rs. {price.toFixed(2)}
                                    </span>
                                    {item.discountedPrice && item.discountedPrice < item.price && (
                                      <span className="text-sm text-gray-400 line-through">
                                        Rs. {item.price.toFixed(2)}
                                      </span>
                                    )}
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                      {getQuantityDisplay(item)}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveFromCart(item)}
                                  className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1 border border-gray-200/50">
                                  <button
                                    onClick={() => handleUpdateQuantity(item, (item.quantity || 1) - 1)}
                                    className="w-9 h-9 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center justify-center text-gray-600"
                                  >
                                    <FaMinus className="w-3 h-3" />
                                  </button>
                                  <span className="w-10 text-center font-semibold text-gray-800 text-sm">
                                    {item.quantity || 1}
                                  </span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item, (item.quantity || 1) + 1)}
                                    className={`w-9 h-9 rounded-lg transition-all duration-200 flex items-center justify-center ${
                                      canIncrementQuantity(item)
                                        ? 'hover:bg-white hover:shadow-sm text-gray-600' 
                                        : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                    disabled={!canIncrementQuantity(item)}
                                  >
                                    <FaPlus className="w-3 h-3" />
                                  </button>
                                </div>
                                <span className="font-bold text-green-600 text-lg">
                                  Rs. {itemTotal.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Cart Summary */}
                  <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200/50">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600">Subtotal ({filteredCart.length} items):</span>
                        <span className="font-semibold text-gray-800">Rs. {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600 flex items-center gap-2">
                          <FaTruck className="text-[var(--primary-color)]" />
                          Delivery Charge:
                        </span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600 font-semibold">FREE</span>
                        ) : (
                          <span className="font-semibold text-gray-800">Rs. {deliveryFee.toFixed(2)}</span>
                        )}
                      </div>
                      {deliveryFee > 0 && (
                        <div className="text-xs text-gray-500 text-right">
                          Free delivery on orders over Rs. {freeDeliveryThreshold}
                        </div>
                      )}
                      <div className="border-t-2 border-gray-200/50 pt-4 mt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total:</span>
                          <span className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
                            Rs. {finalTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Customer Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/50">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
                  <FaUser className="text-[var(--primary-color)]" />
                  Customer Information
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={patientInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all duration-300 text-gray-700 placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={patientInfo.email}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-3.5 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all duration-300 text-gray-700 placeholder-gray-400 ${
                        emailError ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="example@gmail.com"
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {emailError}
                      </p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaPhone className="text-gray-400" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={patientInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all duration-300 text-gray-700 placeholder-gray-400"
                      maxLength="11"
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      required
                      value={patientInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                      placeholder="House #, Street, Area, City"
                    />
                  </div>
                  
                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FaStickyNote className="text-gray-400" />
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={patientInfo.notes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                      placeholder="Any special instructions or delivery notes..."
                    />
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold text-base order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!!emailError || !selectedPharmacy || filteredCart.length === 0 || placingOrder || validatingStock}
                      className={`flex-1 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-base order-1 sm:order-2 ${
                        emailError || !selectedPharmacy || filteredCart.length === 0 || placingOrder || validatingStock
                          ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                          : 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {validatingStock ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Verifying...
                        </span>
                      ) : placingOrder ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Placing...
                        </span>
                      ) : (
                        `Place Order - Rs. ${finalTotal.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default MedicineBooking;
