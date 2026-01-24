// import React from 'react';
// import { Link } from 'react-router-dom';
// import { medicines } from './medicines.js';
// import MedicineCard from './MedicineCard';

// const MedicinePage = ({ cart, setCart }) => {
//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-[var(--primary-color)]">Pharmacy Store</h1>
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/booking"
//             className={`bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
//               cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             Book Now ({cart.length})
//           </Link>
//         </div>
//       </div>

//       {/* Medicine Grid */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {medicines.map(medicine => (
//           <MedicineCard
//             key={medicine.id}
//             medicine={medicine}
//             onAddToCart={addToCart}
//           />
//         ))}
//       </div> */}


// {/* Medicine Grid - Compact layout */}
// <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//   {medicines.map(medicine => (
//     <MedicineCard
//       key={medicine.id}
//       medicine={medicine}
//       onAddToCart={addToCart}
//     />
//   ))}
// </div>


//       {/* Empty State */}
//       {medicines.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No medicines available at the moment.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicinePage;




//The below code is with search bar.

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { medicines } from './medicines.js';
// import MedicineCard from './MedicineCard.jsx';

// const MedicinePage = ({ cart, setCart }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredMedicines = medicines.filter(medicine =>
//     medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-[var(--primary-color)]">Medicines</h1>
//         <div className="flex items-center space-x-4">
//           {/* Search Bar */}
//           <div className="relative mx-4">
//             <input
//               type="text"
//               placeholder="Search medicines..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
//             />
//             <svg 
//               className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
          
//           <Link
//             to="/booking"
//             className={`bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
//               cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             Book Now ({cart.length})
//           </Link>
//         </div>
//       </div>

//       {/* Medicine Grid - Compact layout */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//         {filteredMedicines.map(medicine => (
//           <MedicineCard
//             key={medicine.id}
//             medicine={medicine}
//             onAddToCart={addToCart}
//           />
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredMedicines.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No medicines found matching your search.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicinePage;






















// The below code is mobile responsive with search bar.
// import React, { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import Fuse from 'fuse.js'; // For fuzzy search
// import { medicines } from './medicines.js';
// import MedicineCard from './MedicineCard.jsx';

// const MedicinePage = ({ cart, setCart }) => {
//   const [searchTerm, setSearchTerm] = useState('');


//   // Memoize the Fuse instance with BETTER configuration for medicine names
//   const fuse = useMemo(() => {
//     const fuseOptions = {
//       keys: [
//         { name: 'name', weight: 2 }, // Give name more importance
//         'description', 
//         'manufacturer', 
//         'category'
//       ],
//       threshold: 0.5, // INCREASED from 0.4 to 0.5 (more tolerant)
//       includeScore: true,
//       ignoreLocation: true,
//       minMatchCharLength: 2,
//       shouldSort: true,
//       // ADD these for better medicine name matching:
//       useExtendedSearch: true,
//       distance: 100, // How far apart characters can be
//       includeMatches: true,
//       // Fuzzy matching parameters:
//       findAllMatches: true,
//       isCaseSensitive: false,
//     };
//     return new Fuse(medicines, fuseOptions);
//   }, []);

//   const filteredMedicines = useMemo(() => {
//     if (!searchTerm.trim()) return medicines;
    
//     const results = fuse.search(searchTerm);
//     return results.map(result => result.item);
//   }, [searchTerm, fuse]);


//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === medicine.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === medicine.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] order-1 md:order-1 w-full md:w-auto text-center md:text-left">Medicines</h1>
        
//         {/* Search Bar - Now properly centered on desktop, full width on mobile */}
//         <div className="relative order-2 md:order-2 w-full md:w-auto md:flex-1 md:max-w-md mx-0 md:mx-4">
//           <input
//             type="text"
//             placeholder="Search medicines..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full"
//           />
//           <svg 
//             className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
        
//         {/* Book Now Button */}
//         <div className="order-3 md:order-3 w-full md:w-auto text-center md:text-right">
//           <Link
//             to="/booking"
//             className={`bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block ${
//               cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             Book Now ({cart.length})
//           </Link>
//         </div>
//       </div>

//       {/* Medicine Grid - Compact layout */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
//         {filteredMedicines.map(medicine => (
//           <MedicineCard
//             key={medicine.id}
//             medicine={medicine}
//             onAddToCart={addToCart}
//           />
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredMedicines.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No medicines found matching your search.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicinePage;








//The below code is with backend integration.
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import MedicineCard from './MedicineCard.jsx';

// const MedicinePage = ({ cart, setCart }) => {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categories, setCategories] = useState(['all']);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [stats, setStats] = useState({
//     totalMedicines: 0,
//     inStockMedicines: 0
//   });

//   // Fetch medicines from backend
//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         setLoading(true);
        
//         const params = new URLSearchParams();
//         if (searchTerm) params.append('search', searchTerm);
//         if (selectedCategory !== 'all') params.append('category', selectedCategory);
//         params.append('limit', 100); // Get more medicines
        
//         const queryString = params.toString();
//         const url = `http://localhost:5000/api/medicines${queryString ? `?${queryString}` : ''}`;
        
//         const response = await fetch(url);
//         const data = await response.json();
        
//         if (data.success) {
//          const formattedMedicines = data.data.map(medicine => ({
//           _id: medicine.id || medicine.name, // Use name as ID for now
//           name: medicine.name,
//           genericName: medicine.genericName,
//           description: medicine.description,
//           category: medicine.category,
//           // Use aggregated price stats
//           price: medicine.priceStats?.lowestPrice || 0,
//           discountedPrice: medicine.priceStats?.lowestDiscountedPrice,
//           discountPercentage: medicine.priceStats?.discountPercentage || 0,
//           image: medicine.image,
//           inStock: medicine.availableAtCount > 0, // Available if at least one pharmacy has it
//           prescriptionRequired: medicine.prescriptionRequired || false,
//           // Keep original fields for compatibility
//           availableAtPharmacies: medicine.availableAt || []
//         }));
        
//         setMedicines(formattedMedicines);
//       } else {
//         setError('Failed to fetch medicines');
//       }
//     } catch (err) {
//       console.error('Error fetching medicines:', err);
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };
    
//     fetchMedicines();
//   }, [searchTerm, selectedCategory]);

//   // Fetch categories and stats
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/medicines/categories');
//         const data = await response.json();
        
//         if (data.success) {
//           setCategories(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     };
    
//     const fetchStats = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/medicines/stats');
//         const data = await response.json();
        
//         if (data.success) {
//           setStats(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//       }
//     };
    
//     fetchCategories();
//     fetchStats();
//   }, []);

//   const addToCart = (medicine) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item._id === medicine._id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item._id === medicine._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...medicine, quantity: 1 }];
//     });
//   };

//   if (loading && medicines.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading medicines...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error && medicines.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Medicines</h3>
//           <p className="text-gray-500">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header with Stats */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)]">Medicines</h1>
//           <p className="text-gray-600 mt-1">
//             {stats.totalMedicines} medicines available • {stats.inStockMedicines} in stock
//           </p>
//         </div>
        
//         {/* Search Bar */}
//         <div className="relative w-full md:w-auto md:flex-1 md:max-w-md">
//           <input
//             type="text"
//             placeholder="Search medicines..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent w-full"
//           />
//           <svg 
//             className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
        
//         {/* Cart Button */}
//         <div className="w-full md:w-auto">
//           <Link
//             to="/booking"
//             className={`bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block w-full md:w-auto text-center ${
//               cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             View Cart ({cart.length})
//           </Link>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div className="mb-6">
//         <div className="flex flex-wrap gap-2">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 selectedCategory === category
//                   ? 'bg-[var(--primary-color)] text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {category === 'all' ? 'All Categories' : category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Medicine Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//         {medicines.map(medicine => (
//           <MedicineCard
//             key={medicine._id}
//             medicine={medicine}
//             onAddToCart={addToCart}
//             context="all-medicines"
//           />
//         ))}
//       </div>

//       {/* Empty State */}
//       {medicines.length === 0 && !loading && (
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//           </svg>
//           <p className="text-gray-500 text-lg">No medicines found</p>
//           {searchTerm && (
//             <p className="text-gray-400 mt-2">Try a different search term</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicinePage;


























//-------------------------New logic with aggregate medicinePage.jsx-------------------------
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MedicineCard from './MedicineCard.jsx';

const MedicinePage = ({ cart, setCart }) => {
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

  // Fetch medicines from backend - UPDATED ENDPOINT
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        
        const queryString = params.toString();
        // CHANGED: Use the new aggregated endpoint
        const url = `http://localhost:5000/api/pharmacies/medicines/all${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          // Transform data for MedicineCard
          const formattedMedicines = data.data.map(medicine => {
            // Check if it's already aggregated (grouped by name) or individual entries
            const isGrouped = medicine.availableAt && Array.isArray(medicine.availableAt);
            
            if (isGrouped) {
              // Grouped aggregated view (medicine name with multiple pharmacies)
              return {
                _id: medicine.name, // Use name as ID
                name: medicine.name,
                genericName: medicine.genericName,
                description: medicine.description,
                category: medicine.category,
                price: medicine.lowestPrice || 0,
                discountedPrice: medicine.lowestDiscountedPrice,
                discountPercentage: 0, // Will calculate below
                image: medicine.image,
                inStock: medicine.availableAt.some(pharmacy => pharmacy.inStock),
                prescriptionRequired: medicine.prescriptionRequired || false,
                availableAtCount: medicine.availableAt.length,
                availableAt: medicine.availableAt
              };
            } else {
              // Individual medicine entries from all pharmacies
              const discountPercentage = medicine.discountedPrice && medicine.price > 0
                ? Math.round(((medicine.price - medicine.discountedPrice) / medicine.price) * 100)
                : 0;
              
              return {
                _id: medicine.id || `${medicine.pharmacyId}_${medicine._id}`,
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
                pharmacyName: medicine.pharmacyName
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

  // Fetch categories and stats - UPDATED ENDPOINTS
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

  const addToCart = (medicine) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === medicine._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1, id: medicine._id }];
    });
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
            className="mt-4 px-6 py-2 bg-(--primary-color) text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        
        {/* Cart Button */}
        <div className="w-full md:w-auto">
          <Link
            to="/booking"
            className={`bg-(--primary-color) text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block w-full md:w-auto text-center ${
              cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            View Cart ({cart.length})
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-(--primary-color) text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {medicines.map(medicine => (
          <MedicineCard
            key={medicine._id}
            medicine={medicine}
            onAddToCart={addToCart}
            context="all-medicines"
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
        </div>
      )}
    </div>
  );
};

export default MedicinePage;