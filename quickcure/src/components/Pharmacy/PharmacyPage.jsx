// import React from 'react';
// import { Link } from 'react-router-dom';

// const PharmacyPage = () => {
//   // Sample pharmacy data
//   const pharmacies = [
//     {
//       id: 1,
//       name: 'Apollo Pharmacy',
//       address: '123 Health Street, Medical City',
//       distance: '0.5 km',
//       rating: 4.8,
//       deliveryTime: '15-20 mins',
//       open: true,
//       image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500'
//     },
//     {
//       id: 2,
//       name: 'MedPlus',
//       address: '456 Wellness Avenue, Health District',
//       distance: '1.2 km',
//       rating: 4.5,
//       deliveryTime: '20-25 mins',
//       open: true,
//       image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=500'
//     },
//     {
//       id: 3,
//       name: 'Wellness Forever',
//       address: '789 Cure Road, Pharma Town',
//       distance: '0.8 km',
//       rating: 4.7,
//       deliveryTime: '10-15 mins',
//       open: true,
//       image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=500'
//     },
//     {
//       id: 4,
//       name: 'Fortis Pharmacy',
//       address: '321 Recovery Lane, Hospital Area',
//       distance: '2.0 km',
//       rating: 4.9,
//       deliveryTime: '25-30 mins',
//       open: false,
//       image: 'https://images.unsplash.com/photo-1516549655669-df565bc5d8b7?auto=format&fit=crop&w=500'
//     },
//     {
//       id: 5,
//       name: 'Guardian Pharmacy',
//       address: '654 Medicine Boulevard',
//       distance: '1.5 km',
//       rating: 4.6,
//       deliveryTime: '15-20 mins',
//       open: true,
//       image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500'
//     },
//     {
//       id: 6,
//       name: 'Health & Glow',
//       address: '987 Pharma Street, Care Zone',
//       distance: '0.3 km',
//       rating: 4.4,
//       deliveryTime: '5-10 mins',
//       open: true,
//       image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=500'
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-[var(--primary-color)]">Find Nearby Pharmacies</h1>
//           <p className="text-gray-600 mt-2">Browse medicines from trusted pharmacies around you</p>
//         </div>
        
//         {/* Direct Access to Medicine Page */}
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/medicines"
//             className="bg-white border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//             Browse All Medicines
//           </Link>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">{pharmacies.length}</div>
//             <div className="text-gray-600">Pharmacies Nearby</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">24/7</div>
//             <div className="text-gray-600">Emergency Service</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">30 mins</div>
//             <div className="text-gray-600">Avg. Delivery</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">100%</div>
//             <div className="text-gray-600">Authentic Medicines</div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search pharmacies by name or location..."
//                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
//               />
//               <svg 
//                 className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
//               <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//               </svg>
//               Filters
//             </button>
//             <button className="px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Near Me
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Pharmacies Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {pharmacies.map((pharmacy) => (
//           <div key={pharmacy.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//             {/* Pharmacy Image */}
//             <div className="relative h-48">
//               <img 
//                 src={pharmacy.image} 
//                 alt={pharmacy.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-4 left-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                 </span>
//               </div>
//               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                 <span className="text-sm font-medium text-gray-800">{pharmacy.distance}</span>
//               </div>
//             </div>

//             {/* Pharmacy Info */}
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
//                 <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
//                   <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   <span className="text-sm font-bold">{pharmacy.rating}</span>
//                 </div>
//               </div>

//               <p className="text-gray-600 mb-4 flex items-center">
//                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 {pharmacy.address}
//               </p>

//               <div className="flex items-center text-gray-600 mb-6">
//                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span className="font-medium">Delivery: {pharmacy.deliveryTime}</span>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-3">
//                 <Link
//                   to={`/pharmacies/${pharmacy.id}`}
//                   className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
//                 >
//                   View Details
//                 </Link>
//                 <Link
//                   to={`/pharmacies/${pharmacy.id}/medicines`}
//                   className="flex-1 bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
//                 >
//                   Browse Medicines
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-[var(--primary-color)] to-blue-600 rounded-2xl p-8 text-white text-center">
//         <h2 className="text-2xl font-bold mb-4">Can't find your pharmacy?</h2>
//         <p className="mb-6 opacity-90">Browse our complete medicine catalog from all partner pharmacies</p>
//         <Link
//           to="/medicines"
//           className="inline-flex items-center bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
//         >
//           Explore All Medicines
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;




















//Below is Pakistani pharmacies included

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { pharmacies as pharmacyData } from './pharmacyData.js';

// const PharmacyPage = () => {
//   // Use imported pharmacy data
//   const [pharmacies, setPharmacies] = useState(pharmacyData);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState('distance');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCity, setSelectedCity] = useState('all');

//   // Cities for filtering
//   const cities = ['all', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Multan'];

//   // Filter pharmacies based on search, city, and open status
//   const filteredPharmacies = pharmacies.filter(pharmacy => {
//     const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCity = selectedCity === 'all' || pharmacy.city === selectedCity;
//     const matchesOpenStatus = !filterOpen || pharmacy.open;
    
//     return matchesSearch && matchesCity && matchesOpenStatus;
//   });

//   // Sort pharmacies
//   const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
//     switch(sortBy) {
//       case 'rating':
//         return b.rating - a.rating;
//       case 'name':
//         return a.name.localeCompare(b.name);
//       case 'delivery':
//         const aTime = parseInt(a.deliveryTime);
//         const bTime = parseInt(b.deliveryTime);
//         return aTime - bTime;
//       case 'distance':
//       default:
//         const aDist = parseFloat(a.distance);
//         const bDist = parseFloat(b.distance);
//         return aDist - bDist;
//     }
//   });

//   // Handle "Near Me" button click
//   const handleNearMe = () => {
//     // Sort by distance
//     setSortBy('distance');
//     // In a real app, you would get user's location and calculate distances
//     alert('Showing pharmacies nearest to your location');
//   };

//   // Handle city filter change
//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//   };

//   // Toggle open filter
//   const toggleOpenFilter = () => {
//     setFilterOpen(!filterOpen);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-[var(--primary-color)]">Find Nearby Pharmacies</h1>
//           <p className="text-gray-600 mt-2">Browse medicines from trusted pharmacies across Pakistan</p>
//         </div>
        
//         {/* Direct Access to Medicine Page */}
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/medicines"
//             className="bg-white border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             Browse All Medicines
//           </Link>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">{pharmacies.length}</div>
//             <div className="text-gray-600">Pharmacies Across Pakistan</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">24/7</div>
//             <div className="text-gray-600">Emergency Service</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">30 mins</div>
//             <div className="text-gray-600">Avg. Delivery</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">100%</div>
//             <div className="text-gray-600">Authentic Medicines</div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search pharmacies by name or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
//               />
//               <svg 
//                 className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className={`px-4 py-3 border rounded-lg flex items-center ${showFilters ? 'bg-blue-50 border-[var(--primary-color)]' : 'border-gray-300 hover:bg-gray-50'}`}
//             >
//               <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//               </svg>
//               Filters
//             </button>
//             <button 
//               onClick={handleNearMe}
//               className="px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Near Me
//             </button>
//           </div>
//         </div>

//         {/* Filters Dropdown */}
//         {showFilters && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* City Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Filter by City</label>
//                 <div className="flex flex-wrap gap-2">
//                   {cities.map(city => (
//                     <button
//                       key={city}
//                       onClick={() => handleCityChange(city)}
//                       className={`px-3 py-1 rounded-full text-sm ${selectedCity === city ? 'bg-[var(--primary-color)] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
//                     >
//                       {city === 'all' ? 'All Cities' : city}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Sort By */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
//                 >
//                   <option value="distance">Nearest First</option>
//                   <option value="rating">Highest Rated</option>
//                   <option value="delivery">Fastest Delivery</option>
//                   <option value="name">Name (A-Z)</option>
//                 </select>
//               </div>

//               {/* Open Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <div className="flex items-center">
//                   <button
//                     onClick={toggleOpenFilter}
//                     className={`px-4 py-2 rounded-lg flex items-center ${filterOpen ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'}`}
//                   >
//                     {filterOpen ? (
//                       <>
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                         Open Now
//                       </>
//                     ) : (
//                       'Show Open Only'
//                     )}
//                   </button>
//                   {filterOpen && (
//                     <button
//                       onClick={() => setFilterOpen(false)}
//                       className="ml-2 text-sm text-gray-500 hover:text-gray-700"
//                     >
//                       Clear
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Results Count */}
//       <div className="mb-4">
//         <p className="text-gray-600">
//           Showing <span className="font-bold">{sortedPharmacies.length}</span> of {pharmacies.length} pharmacies
//           {selectedCity !== 'all' && ` in ${selectedCity}`}
//           {filterOpen && ' (Open Now)'}
//         </p>
//       </div>

//       {/* Pharmacies Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {sortedPharmacies.map((pharmacy) => (
//           <div key={pharmacy.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//             {/* Pharmacy Image */}
//             <div className="relative h-48">
//               <img 
//                 src={pharmacy.image} 
//                 alt={pharmacy.name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-4 left-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                 </span>
//               </div>
//               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                 <span className="text-sm font-medium text-gray-800">{pharmacy.distance}</span>
//               </div>
//               <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
//                 <span className="text-sm font-medium text-white">{pharmacy.city}</span>
//               </div>
//             </div>

//             {/* Pharmacy Info */}
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
//                 <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
//                   <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   <span className="text-sm font-bold">{pharmacy.rating}</span>
//                 </div>
//               </div>

//               <p className="text-gray-600 mb-4 flex items-center">
//                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 {pharmacy.address}
//               </p>

//               <div className="flex items-center text-gray-600 mb-6">
//                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span className="font-medium">Delivery: {pharmacy.deliveryTime}</span>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-3">
//                 <Link
//                   to={`/pharmacies/${pharmacy.id}`}
//                   className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
//                 >
//                   View Details
//                 </Link>
//                 <Link
//                   to={`/pharmacies/${pharmacy.id}`}
//                   className="flex-1 bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
//                 >
//                   Browse Medicines
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {sortedPharmacies.length === 0 && (
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">No pharmacies found</h3>
//           <p className="text-gray-500">Try adjusting your search or filters</p>
//           <button
//             onClick={() => {
//               setSearchTerm('');
//               setSelectedCity('all');
//               setFilterOpen(false);
//             }}
//             className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Clear All Filters
//           </button>
//         </div>
//       )}

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-[var(--primary-color)] to-blue-600 rounded-2xl p-8 text-white text-center">
//         <h2 className="text-2xl font-bold mb-4">Can't find your pharmacy?</h2>
//         <p className="mb-6 opacity-90">Browse our complete medicine catalog from all partner pharmacies</p>
//         <Link
//           to="/medicines"
//           className="inline-flex items-center bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
//         >
//           Explore All Medicines
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;















// This code is perfectly working
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const PharmacyPage = () => {
//   // State for pharmacies fetched from API
//   const [pharmacies, setPharmacies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Stats state
//   const [stats, setStats] = useState({
//     totalPharmacies: 0,
//     openPharmacies: 0,
//     cities: 0,
//     emergencyService: '24/7',
//     avgDelivery: '30 mins',
//     authenticity: '100%'
//   });
  
//   // Cities state (fetched from API)
//   const [cities, setCities] = useState(['all']);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState('distance');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCity, setSelectedCity] = useState('all');

//   // Fetch pharmacies from API
//   useEffect(() => {
//     const fetchPharmacies = async () => {
//       try {
//         setLoading(true);
        
//         // Build query parameters
//         const params = new URLSearchParams();
//         if (selectedCity !== 'all') params.append('city', selectedCity);
//         if (filterOpen) params.append('open', 'true');
//         if (searchTerm) params.append('search', searchTerm);
//         params.append('sort', sortBy);
        
//         const queryString = params.toString();
//         const url = `http://localhost:5000/api/pharmacydata${queryString ? `?${queryString}` : ''}`;
        
//         const response = await fetch(url);
//         const data = await response.json();
        
//         if (data.success) {
//           setPharmacies(data.data);
//         } else {
//           setError('Failed to fetch pharmacies');
//         }
//       } catch (err) {
//         console.error('Error fetching pharmacies:', err);
//         setError('Error connecting to server');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchPharmacies();
//   }, [selectedCity, filterOpen, searchTerm, sortBy]);

//   // Fetch stats from API
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/pharmacydata/stats');
//         const data = await response.json();
        
//         if (data.success) {
//           setStats(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//       }
//     };
    
//     fetchStats();
//   }, []);

//   // Fetch cities from API
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/pharmacydata/cities');
//         const data = await response.json();
        
//         if (data.success) {
//           setCities(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching cities:', err);
//       }
//     };
    
//     fetchCities();
//   }, []);

//   // Handle "Near Me" button click
//   const handleNearMe = () => {
//     setSortBy('distance');
//     alert('Showing pharmacies nearest to your location');
//   };

//   // Handle city filter change
//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//   };

//   // Toggle open filter
//   const toggleOpenFilter = () => {
//     setFilterOpen(!filterOpen);
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setSelectedCity('all');
//     setFilterOpen(false);
//     setSortBy('distance');
//   };

//   // Loading state
//   if (loading && pharmacies.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-600">Loading pharmacies...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && pharmacies.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Pharmacies</h3>
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
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-[var(--primary-color)]">Find Nearby Pharmacies</h1>
//           <p className="text-gray-600 mt-2">Browse medicines from trusted pharmacies across Pakistan</p>
//         </div>
        
//         {/* Direct Access to Medicine Page */}
//         <div className="flex items-center space-x-4">
//           <Link
//             to="/medicines"
//             className="bg-white border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             Browse All Medicines
//           </Link>
//         </div>
//       </div>

//       {/* Stats Bar */}
//       <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.totalPharmacies}</div>
//             <div className="text-gray-600">Pharmacies Across Pakistan</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.emergencyService}</div>
//             <div className="text-gray-600">Emergency Service</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.avgDelivery}</div>
//             <div className="text-gray-600">Avg. Delivery</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.authenticity}</div>
//             <div className="text-gray-600">Authentic Medicines</div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search pharmacies by name or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
//               />
//               <svg 
//                 className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className={`px-4 py-3 border rounded-lg flex items-center ${showFilters ? 'bg-blue-50 border-[var(--primary-color)]' : 'border-gray-300 hover:bg-gray-50'}`}
//             >
//               <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//               </svg>
//               Filters
//             </button>
//             <button 
//               onClick={handleNearMe}
//               className="px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 flex items-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Near Me
//             </button>
//           </div>
//         </div>

//         {/* Filters Dropdown */}
//         {showFilters && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* City Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Filter by City</label>
//                 <div className="flex flex-wrap gap-2">
//                   {cities.map(city => (
//                     <button
//                       key={city}
//                       onClick={() => handleCityChange(city)}
//                       className={`px-3 py-1 rounded-full text-sm ${selectedCity === city ? 'bg-[var(--primary-color)] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
//                     >
//                       {city === 'all' ? 'All Cities' : city}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Sort By */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
//                 >
//                   <option value="distance">Nearest First</option>
//                   <option value="rating">Highest Rated</option>
//                   <option value="delivery">Fastest Delivery</option>
//                   <option value="name">Name (A-Z)</option>
//                 </select>
//               </div>

//               {/* Open Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <div className="flex items-center">
//                   <button
//                     onClick={toggleOpenFilter}
//                     className={`px-4 py-2 rounded-lg flex items-center ${filterOpen ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'}`}
//                   >
//                     {filterOpen ? (
//                       <>
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                         Open Now
//                       </>
//                     ) : (
//                       'Show Open Only'
//                     )}
//                   </button>
//                   {filterOpen && (
//                     <button
//                       onClick={() => setFilterOpen(false)}
//                       className="ml-2 text-sm text-gray-500 hover:text-gray-700"
//                     >
//                       Clear
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Results Count */}
//       <div className="mb-4">
//         <p className="text-gray-600">
//           Showing <span className="font-bold">{pharmacies.length}</span> of {stats.totalPharmacies} pharmacies
//           {selectedCity !== 'all' && ` in ${selectedCity}`}
//           {filterOpen && ' (Open Now)'}
//         </p>
//       </div>

//       {/* Pharmacies Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {pharmacies.map((pharmacy) => (
//           <div key={pharmacy.id || pharmacy._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//             {/* Pharmacy Image */}
//             <div className="relative h-48">
//               <img 
//                 src={pharmacy.image} 
//                 alt={pharmacy.name}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
//                 }}
//               />
//               <div className="absolute top-4 left-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                 </span>
//               </div>
//               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                 <span className="text-sm font-medium text-gray-800">{pharmacy.distance}</span>
//               </div>
//               <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
//                 <span className="text-sm font-medium text-white">{pharmacy.city}</span>
//               </div>
//             </div>

//             {/* Pharmacy Info */}
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
//                 <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
//                   <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   <span className="text-sm font-bold">{pharmacy.rating || '4.0'}</span>
//                 </div>
//               </div>

//               <p className="text-gray-600 mb-4 flex items-center">
//                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 {pharmacy.address}
//               </p>

//               <div className="flex items-center text-gray-600 mb-6">
//                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span className="font-medium">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-3">
//                 <Link
//                   to={`/pharmacies/${pharmacy.id || pharmacy._id}`}
//                   className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
//                 >
//                   View Details
//                 </Link>
//                 <Link
//                   to={`/pharmacies/${pharmacy.id || pharmacy._id}`}
//                   className="flex-1 bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
//                 >
//                   Browse Medicines
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {pharmacies.length === 0 && !loading && (
//         <div className="text-center py-12">
//           <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">No pharmacies found</h3>
//           <p className="text-gray-500">Try adjusting your search or filters</p>
//           <button
//             onClick={clearAllFilters}
//             className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Clear All Filters
//           </button>
//         </div>
//       )}

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-[var(--primary-color)] to-blue-600 rounded-2xl p-8 text-white text-center">
//         <h2 className="text-2xl font-bold mb-4">Can't find your pharmacy?</h2>
//         <p className="mb-6 opacity-90">Browse our complete medicine catalog from all partner pharmacies</p>
//         <Link
//           to="/medicines"
//           className="inline-flex items-center bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
//         >
//           Explore All Medicines
//           <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;













//This is with the current backend  API Structure
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PharmacyPage = () => {
  // State for pharmacies fetched from API
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Stats state
  const [stats, setStats] = useState({
    totalPharmacies: 0,
    openPharmacies: 0,
    cities: 0,
    emergencyService: '24/7',
    avgDelivery: '30 mins',
    authenticity: '100%'
  });
  
  // Cities state (fetched from API)
  const [cities, setCities] = useState(['all']);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');

  // Fetch pharmacies from API
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams();
        if (selectedCity !== 'all') params.append('city', selectedCity);
        if (filterOpen) params.append('open', 'true');
        if (searchTerm) params.append('search', searchTerm);
        params.append('sort', sortBy);
        
        const queryString = params.toString();
        const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setPharmacies(data.data);
        } else {
          setError('Failed to fetch pharmacies');
        }
      } catch (err) {
        console.error('Error fetching pharmacies:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPharmacies();
  }, [selectedCity, filterOpen, searchTerm, sortBy]);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies/stats');
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    
    fetchStats();
  }, []);

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies/cities');
        const data = await response.json();
        
        if (data.success) {
          setCities(data.data);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };
    
    fetchCities();
  }, []);

  // Handle "Near Me" button click
  const handleNearMe = () => {
    setSortBy('distance');
    alert('Showing pharmacies nearest to your location');
  };

  // Handle city filter change
  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  // Toggle open filter
  const toggleOpenFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setFilterOpen(false);
    setSortBy('distance');
  };

  // Loading state
  if (loading && pharmacies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading pharmacies...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && pharmacies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Pharmacies</h3>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--primary-color)]">Find Nearby Pharmacies</h1>
          <p className="text-gray-600 mt-2">Browse medicines from trusted pharmacies across Pakistan</p>
        </div>
        
        {/* Direct Access to Medicine Page */}
        <div className="flex items-center space-x-4">
          <Link
            to="/medicines"
            className="bg-white border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse All Medicines
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.totalPharmacies}</div>
            <div className="text-gray-600">Pharmacies Across Pakistan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.emergencyService}</div>
            <div className="text-gray-600">Emergency Service</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.avgDelivery}</div>
            <div className="text-gray-600">Avg. Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.authenticity}</div>
            <div className="text-gray-600">Authentic Medicines</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pharmacies by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
              <svg 
                className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 border rounded-lg flex items-center ${showFilters ? 'bg-blue-50 border-[var(--primary-color)]' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
            <button 
              onClick={handleNearMe}
              className="px-4 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Near Me
            </button>
          </div>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by City</label>
                <div className="flex flex-wrap gap-2">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => handleCityChange(city)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedCity === city ? 'bg-[var(--primary-color)] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                    >
                      {city === 'all' ? 'All Cities' : city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                >
                  <option value="distance">Nearest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="delivery">Fastest Delivery</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* Open Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex items-center">
                  <button
                    onClick={toggleOpenFilter}
                    className={`px-4 py-2 rounded-lg flex items-center ${filterOpen ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'}`}
                  >
                    {filterOpen ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Open Now
                      </>
                    ) : (
                      'Show Open Only'
                    )}
                  </button>
                  {filterOpen && (
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-bold">{pharmacies.length}</span> of {stats.totalPharmacies} pharmacies
          {selectedCity !== 'all' && ` in ${selectedCity}`}
          {filterOpen && ' (Open Now)'}
        </p>
      </div>

      {/* Pharmacies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {pharmacies.map((pharmacy) => (
          <div key={pharmacy._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Pharmacy Image */}
            <div className="relative h-48">
              <img 
                src={pharmacy.image} 
                alt={pharmacy.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=500';
                }}
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${pharmacy.open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-800">{pharmacy.distance}</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                <span className="text-sm font-medium text-white">{pharmacy.city}</span>
              </div>
            </div>

            {/* Pharmacy Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
                <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold">{pharmacy.rating || '4.0'}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {pharmacy.address}
              </p>

              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Delivery: {pharmacy.deliveryTime || '15-20 mins'}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Link
                  to={`/pharmacies/${pharmacy._id}`}
                  className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to={`/pharmacies/${pharmacy._id}`}
                  className="flex-1 bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                >
                  Browse Medicines
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {pharmacies.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No pharmacies found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
          <button
            onClick={clearAllFilters}
            className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Can't find your pharmacy?</h2>
        <p className="mb-6 opacity-90">Browse our complete medicine catalog from all partner pharmacies</p>
        <Link
          to="/medicines"
          className="inline-flex items-center bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Explore All Medicines
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PharmacyPage;