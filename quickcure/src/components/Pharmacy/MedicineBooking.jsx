// order placing now 15/4/26
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FaArrowLeft, FaTrash, FaTimes, FaPlus, 
  FaMinus, FaCheckCircle, FaReceipt, FaHistory, FaExclamationCircle,
  FaBox, FaBoxes, FaFlask, FaPills, FaBan
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
    return urlPharmacy || 'all';
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
    
    if (selectedPharmacy && selectedPharmacy !== 'all') {
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

  // ✅ FIXED: Simple stock validation - ONLY check stockQuantity, ignore inStock flag
  const validateStockWithBackend = async () => {
    const itemsToValidate = selectedPharmacy === 'all' ? cart : filteredCart;
    
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
            // If API fails, skip validation for this item
            continue;
          }
          
          const data = await response.json();
          
          if (data.success && data.data) {
            const medicineData = data.data;
            
            // 🔥 FIXED: ONLY check stockQuantity, completely ignore inStock flag
            const currentStock = medicineData.stockQuantity || medicineData.stock || 0;
            const requestedQuantity = item.quantity || 1;
            
            console.log(`📦 ${item.name}: Stock=${currentStock}, Requested=${requestedQuantity}`);
            
            // Only fail if actual stock is 0
            if (currentStock <= 0) {
              alert(`❌ ${item.name} is out of stock at the selected pharmacy!`);
              setValidatingStock(false);
              return false;
            }
            
            // Check if requested quantity is available
            if (requestedQuantity > currentStock) {
              alert(`⚠️ Only ${currentStock} unit${currentStock > 1 ? 's' : ''} of ${item.name} available!\n\nYou requested: ${requestedQuantity}`);
              setValidatingStock(false);
              return false;
            }
            
            console.log(`✅ ${item.name}: ${requestedQuantity}/${currentStock} available`);
          }
        } catch (error) {
          console.error(`❌ Network error for ${item.name}:`, error);
          // Continue with other items if one fails
        }
      }
      
      setValidatingStock(false);
      return true;
    } catch (error) {
      console.error('❌ Validation process error:', error);
      setValidatingStock(false);
      return true; // Allow order if validation fails
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
    
    if (pharmacyId === 'all') {
      setFilteredCart(safeCart);
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

  const subtotal = getCartSubtotal();
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
    
    if (patientInfo.email.trim()) {
      const error = validateEmail(patientInfo.email);
      if (error) {
        setEmailError(error);
        return;
      }
    }
    
    if (!cart || cart.length === 0) {
      alert('Your cart is empty. Please add medicines before booking.');
      return;
    }
    
    // ✅ Validate stock before placing order
    const isStockValid = await validateStockWithBackend();
    if (!isStockValid) {
      return;
    }
    
    setPlacingOrder(true);
    
    const orderNumber = generateUniqueOrderId();
    const orderItems = selectedPharmacy === 'all' ? cart : filteredCart;
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
      
      setCurrentOrder(orderData);
      setShowOrderConfirmation(true);
      
      clearCart();
      
      setPatientInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
      });
      setEmailError('');
      setSelectedPharmacy('all');
      
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <FaExclamationCircle className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Login Required</h2>
          <p className="text-gray-600 text-center mb-6">Please login to view your cart and place orders.</p>
          <button
            onClick={() => navigate('/login', { state: { redirectTo: '/booking' } })}
            className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (safeCart.length === 0 && !showOrderConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <FaBox className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Hello, {currentUser?.name || currentUser?.email?.split('@')[0] || 'there'}! Start adding medicines to your cart.
          </p>
          <button
            onClick={() => navigate('/pharmacies')}
            className="w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-medium"
          >
            Browse Pharmacies
          </button>
        </div>
      </div>
    );
  }

  const cartPharmacies = getUniquePharmaciesFromCart();

  return (
    <div ref={formRef} className="container mx-auto px-4 py-8">
      {/* Stock Validation Loading Overlay */}
      {validatingStock && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Verifying Stock</h3>
              <p className="text-gray-600 text-center text-sm">
                Checking real-time availability of medicines...
              </p>
            </div>
          </div>
        </div>
      )}

      {showOrderConfirmation && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
                <p className="text-gray-600">Your order has been placed successfully</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="text-xl font-bold text-[var(--primary-color)]">{currentOrder.orderNumber}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient Name:</span>
                    <span className="font-medium">{currentOrder.patientInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{currentOrder.patientInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">Rs. {(currentOrder.subtotal || currentOrder.total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className={`font-medium ${(currentOrder.deliveryFee || 0) === 0 ? 'text-green-600' : ''}`}>
                      {(currentOrder.deliveryFee || 0) === 0 ? 'FREE' : `Rs. ${(currentOrder.deliveryFee || 0).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-[var(--primary-color)]">Rs. {currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">{currentOrder.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{currentOrder.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={closeOrderConfirmation}
                  className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color)] transition-colors font-semibold"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={viewOrderHistory}
                  className="w-full border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <FaHistory /> View Order History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft className="w-5 h-5 text-[var(--primary-color)]" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">Book Your Medicines</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Welcome, <span className="font-medium">{currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}</span>
            </p>
          </div>
        </div>
        
        {orders.length > 0 && (
          <button
            onClick={viewOrderHistory}
            className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors text-sm sm:text-base"
          >
            <FaReceipt className="mr-2" />
            Order History ({orders.length})
          </button>
        )}
      </div>

      {loadingPharmacies && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
          Loading pharmacy information...
        </div>
      )}
      
      {pharmacyError && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
          {pharmacyError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            Selected Medicines <span className="text-sm font-normal text-gray-500 ml-2">({filteredCart.length} items)</span>
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Pharmacy
            </label>
            <select
              value={selectedPharmacy}
              onChange={(e) => handlePharmacyChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
            >
              <option value="all">All Pharmacies ({safeCart.length} items)</option>
              {cartPharmacies.map(pharmacy => {
                const pharmacyItems = safeCart.filter(item => {
                  const itemPharmacyId = getPharmacyIdForItem(item);
                  return itemPharmacyId === pharmacy._id;
                }).length;
                
                return (
                  <option key={pharmacy._id} value={pharmacy._id}>
                    {pharmacy.name} ({pharmacyItems} items)
                  </option>
                );
              })}
            </select>
          </div>
          
          {filteredCart.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No items found for the selected pharmacy.</p>
              <button
                onClick={() => handlePharmacyChange('all')}
                className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium"
              >
                Show all items
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {filteredCart.map(item => {
                  const pharmacyName = getPharmacyNameForItem(item);
                  const itemId = item.id || item._id;
                  const maxStock = getMaxStockForItem(item);
                  const isTablet = isTabletForm(item.form);
                  const isSyrup = isSyrupForm(item.form);
                  const price = item.discountedPrice || item.price || 0;
                  const itemTotal = price * (item.quantity || 1);
                  
                  return (
                    <div key={itemId} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-12 max-w-12 object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?w=400';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                            <button
                              onClick={() => handleRemoveFromCart(item)}
                              className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-0.5">Rs. {price.toFixed(2)} each</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                              <button
                                onClick={() => handleUpdateQuantity(item, (item.quantity || 1) - 1)}
                                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <FaMinus className="w-2.5 h-2.5" />
                              </button>
                              <span className="w-10 text-center font-medium text-sm">{item.quantity || 1}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item, (item.quantity || 1) + 1)}
                                className={`w-8 h-8 flex items-center justify-center ${
                                  canIncrementQuantity(item)
                                    ? 'bg-gray-100 hover:bg-gray-200' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                disabled={!canIncrementQuantity(item)}
                              >
                                <FaPlus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                            <span className="font-semibold text-green-600 text-sm">Rs. {itemTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal ({filteredCart.length} items):</span>
                    <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Delivery Charge:</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span className="font-medium">Rs. {deliveryFee.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="border-t pt-3 mt-3 border-gray-200">
                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-[var(--secondary-color)]">Rs. {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
          <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={patientInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={patientInfo.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@gmail.com"
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={patientInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                  maxLength="11"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  value={patientInfo.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                  placeholder="House #, Street, Area, City"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={patientInfo.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors bg-white text-sm sm:text-base"
                  placeholder="Any special instructions or delivery notes..."
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-[var(--primary-color)] text-[var(--primary-color)] py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!!emailError || filteredCart.length === 0 || placingOrder || validatingStock}
                className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold text-sm sm:text-base order-1 sm:order-2 ${
                  emailError || filteredCart.length === 0 || placingOrder || validatingStock
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                    : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] shadow-sm'
                }`}
              >
                {validatingStock ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying Stock...
                  </span>
                ) : placingOrder ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
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
  );
};

export default MedicineBooking;