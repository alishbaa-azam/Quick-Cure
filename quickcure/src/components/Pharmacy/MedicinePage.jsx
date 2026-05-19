// order placing 15/4/26
// src/components/Pharmacy/MedicinePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MedicineCard from './MedicineCard.jsx';
import { useCart } from '../../contexts/CartContext';

const MedicinePage = () => {
  // USE CART CONTEXT
  const { 
    cart, 
    setCart,
    addToCart,
    getTotalItemCount,
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

  // Get current user
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

  // Initialize auth state
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

  // Fetch medicines from backend
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

  // Fetch categories
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

  // ✅ FIXED: Add to cart function - properly passes to context
  const handleAddToCart = (medicine) => {
    console.log('MedicinePage: handleAddToCart called with:', medicine);
    
    // Get pharmacy ID
    let pharmacyId;
    
    if (medicine.pharmacyId) {
      pharmacyId = medicine.pharmacyId;
    } else if (medicine.availableAt && medicine.availableAt.length > 0) {
      pharmacyId = medicine.availableAt[0].pharmacyId || medicine.availableAt[0]._id;
    } else {
      console.error('No pharmacy ID found for medicine:', medicine);
      return;
    }
    
    // ✅ Use context addToCart directly
    addToCart(medicine, pharmacyId, { 
      quantity: medicine.selectedQuantity || 1, 
      quantityType: medicine.selectedQuantityType || 'unit',
      tabletQuantity: medicine.selectedTabletQuantity || null
    });
    
    console.log('MedicinePage: Added to cart via context');
  };

  // Get cart item count from context
  const cartCount = getTotalItemCount();

  // Loading state
  if (loading && medicines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading medicines...</div>
        </div>
      </div>
    );
  }

  // Error state
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
    <div className="container mx-auto px-4 py-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--primary-color)">All Medicines</h1>
          <p className="text-gray-600 mt-1">
            Browse medicines from all pharmacies
            {stats.totalMedicines > 0 && (
              <span className="ml-2 text-sm">
                ({stats.inStockMedicines} in stock)
              </span>
            )}
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-auto md:flex-1 md:max-w-md">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full"
          />
          <svg 
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Category Filter */}
        {categories.length > 1 && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent bg-white"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        )}
        
        {/* Cart Button */}
        <div className="w-full md:w-auto">
          <Link
            to="/booking"
            className={`bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-color)] transition-colors inline-block w-full md:w-auto text-center ${
              cartCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            View Cart ({cartCount})
          </Link>
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {medicines.map(medicine => (
          <MedicineCard
            key={medicine._id}
            medicine={medicine}
            onAddToCart={handleAddToCart}
           volume context="all-medicines"
            // context="all-medicines"
          />
        ))}
      </div>

      {/* Empty State */}
      {medicines.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <p className="text-gray-500 text-lg">No medicines found</p>
          {searchTerm && (
            <p className="text-gray-400 mt-2">Try a different search term</p>
          )}
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium"
            >
              View all categories
            </button>
          )}
        </div>
      )}
      
      {/* Stats Footer */}
      {stats.totalMedicines > 0 && medicines.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span>Total Medicines: {stats.totalMedicines}</span>
            <span>In Stock: {stats.inStockMedicines}</span>
            <span>Showing: {medicines.length} items</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicinePage;