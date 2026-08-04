import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faSearch, 
  faFolderOpen,
  faTimes,
  faPills,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faFilter,
  faSort,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import MedicineCard from './MedicineCard.jsx';
import { useCart } from '../../contexts/CartContext';
import CartSidebar from './CartSidebar.jsx';

const MedicinePage = () => {
  const navigate = useNavigate();
  
  const { 
    cart, 
    setCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItemCount,
    getCartSubtotal,
    getCartDeliveryFee,
    getCartTotal,
    getPharmacySubtotal,
    getDeliveryFeeForPharmacy,
    pharmacyDeliveryCache,
    calculateItemTotal,
    isTabletForm,
    isSyrupForm,
    isInitialized: cartInitialized
  } = useCart();
  
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState({
    totalMedicines: 0,
    inStockMedicines: 0
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [showCart, setShowCart] = useState(false);

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
      const user = getCurrentUser();
      setCurrentUser(user);
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
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        
        const queryString = params.toString();
        const url = `http://localhost:5000/api/pharmacies/medicines/all${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          const formattedMedicines = data.data.map(medicine => {
            const isGrouped = medicine.availableAt && Array.isArray(medicine.availableAt);
            
            if (isGrouped) {
              return {
                _id: medicine.name,
                id: medicine.name,
                name: medicine.name,
                genericName: medicine.genericName,
                description: medicine.description,
                category: medicine.category,
                price: medicine.lowestPrice || 0,
                discountedPrice: medicine.lowestDiscountedPrice,
                discountPercentage: 0, 
                image: medicine.image,
                inStock: medicine.availableAt.some(pharmacy => pharmacy.inStock),
                prescriptionRequired: medicine.prescriptionRequired || false,
                availableAtCount: medicine.availableAt.length,
                availableAt: medicine.availableAt,
                form: medicine.form,
                tabletsPerUnit: medicine.tabletsPerUnit || 10,
                volume: medicine.volume
              };
            } else {
              const discountPercentage = medicine.discountedPrice && medicine.price > 0
                ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100)
                : 0;
              
              return {
                _id: medicine.id || `${medicine.pharmacyId}_${medicine._id}`,
                id: medicine.id || `${medicine.pharmacyId}_${medicine._id}`,
                name: medicine.name,
                genericName: medicine.genericName,
                description: medicine.description,
                category: medicine.category,
                price: medicine.price,
                discountedPrice: medicine.discountedPrice,
                discountPercentage: discountPercentage,
                image: medicine.image,
                inStock: medicine.inStock,
                prescriptionRequired: medicine.prescriptionRequired || false,
                pharmacyId: medicine.pharmacyId,
                pharmacyName: medicine.pharmacyName,
                form: medicine.form,
                tabletsPerUnit: medicine.tabletsPerUnit || 10,
                stockQuantity: medicine.stockQuantity || 0,
                volume: medicine.volume
              };
            }
          });
          
          setMedicines(formattedMedicines);
        } else {
          setError('Failed to fetch medicines');
        }
      } catch (err) {
        console.error('Error fetching medicines:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedicines();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies/medicines/categories');
        const data = await response.json();
        
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies/medicines/stats');
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    
    fetchCategories();
    fetchStats();
  }, []);

  const handleAddToCart = (medicine) => {
    let pharmacyId;
    
    if (medicine.pharmacyId) {
      pharmacyId = medicine.pharmacyId;
    } else if (medicine.availableAt && medicine.availableAt.length > 0) {
      pharmacyId = medicine.availableAt[0].pharmacyId || medicine.availableAt[0]._id;
    } else {
      console.error('No pharmacy ID found for medicine:', medicine);
      return;
    }
    
    addToCart(medicine, pharmacyId, { 
      quantity: medicine.selectedQuantity || 1, 
      quantityType: medicine.selectedQuantityType || 'unit',
      tabletQuantity: medicine.selectedTabletQuantity || null
    });
  };

  const cartCount = getTotalItemCount();
  
  const handleCartUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item._id, item.pharmacyId);
    } else {
      updateQuantity(item._id, item.pharmacyId, newQuantity);
    }
  };
  
  const handleCartRemoveFromCart = (medicineId) => {
    const item = cart.find(i => i._id === medicineId || i.id === medicineId);
    if (item) {
      removeFromCart(medicineId, item.pharmacyId);
    }
  };
  
  const handleCartCheckout = () => {
    setShowCart(false);
    navigate('/booking');
  };

  if (loading && medicines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading medicines...</div>
        </div>
      </div>
    );
  }

  if (error && medicines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Medicines</h3>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        
        {/* Header Section with Title and Cart Icon */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary-color)] flex items-center gap-2">
                <FontAwesomeIcon icon={faPills} className="text-[var(--primary-color)]" />
                All Medicines
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {stats.totalMedicines} available
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {stats.inStockMedicines} medicines in stock across all pharmacies
              </p>
            </div>
            
            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Open cart"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="w-7 h-7 text-[var(--primary-color)]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search & Filter Section - Now under the heading */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search medicines by name, generic name, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
              
              {/* Category Filter */}
              {categories.length > 1 && (
                <div className="md:w-68">
{/* <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200 cursor-pointer"
                  >
                    <option value="all brands">
                      <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
                      All Categories
                    </option>
                    {categories.filter(c => c !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>      
                               */}
                <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200 cursor-pointer"
>
  <option value="all" className="hover:bg-green-500 hover:text-white transition-colors duration-200">
    <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
    All Categories
  </option>
  {categories.filter(c => c !== 'all').map(category => (
    <option 
      key={category} 
      value={category}
      className="hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-200 px-2 py-1"
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </option>
  ))}
</select>
                </div>
              )}
            </div>
            
            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <FontAwesomeIcon icon={faFilter} className="text-sm text-gray-400" />
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:text-blue-900 ml-1"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-xs" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-purple-900 ml-1"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-xs" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-800">{medicines.length}</span> medicines
            {medicines.length > 0 && ` (${stats.inStockMedicines} in stock)`}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FontAwesomeIcon icon={faSort} className="text-gray-400" />
            <span>Sort by:</span>
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
              <option>Relevance</option>
              <option>Name A-Z</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Medicine Grid */}
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {medicines.map(medicine => (
              <MedicineCard
                key={medicine._id}
                medicine={medicine}
                context="all-medicines"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FontAwesomeIcon icon={faPills} className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No medicines found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? "Try adjusting your search or filter criteria"
                : "No medicines are currently available"}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-2.5 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
        
        {/* Stats Footer */}
        {stats.totalMedicines > 0 && medicines.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              {/* <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                <span>{stats.inStockMedicines} in stock</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                <span>{stats.totalMedicines - stats.inStockMedicines} out of stock</span>
              </div> */}
              <div className="border-l border-gray-200 pl-6">
                <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400 mr-1" />
                Total: {stats.totalMedicines} medicines
              </div>
              <div className="border-l border-gray-200 pl-6">
                Showing: {medicines.length} items
              </div>
            </div>
          </div>
        )}
        
        {/* Cart Sidebar */}
        <CartSidebar
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          cartItems={cart}
          cartItemCount={cartCount}
          subtotal={getCartSubtotal()}
          deliveryFee={getCartDeliveryFee(getCartSubtotal()).deliveryFee}
          freeDeliveryThreshold={getCartDeliveryFee(getCartSubtotal()).freeDeliveryThreshold}
          finalTotal={getCartTotal()}
          onUpdateQuantity={handleCartUpdateQuantity}
          onRemoveFromCart={handleCartRemoveFromCart}
          onCheckout={handleCartCheckout}
          getItemTotalPrice={calculateItemTotal}
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
    </div>
  );
};

export default MedicinePage;