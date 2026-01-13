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











//This code is perfectly working
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
//         const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
        
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/stats');
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
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
//           <div key={pharmacy._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
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
//                   to={`/pharmacies/${pharmacy._id}`}
//                   className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors"
//                 >
//                   View Details
//                 </Link>
//                 <Link
//                   to={`/pharmacies/${pharmacy._id}`}
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









//-------------New Layout----------------------------------------------------------------------
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
        
//         const params = new URLSearchParams();
//         if (selectedCity !== 'all') params.append('city', selectedCity);
//         if (filterOpen) params.append('open', 'true');
//         if (searchTerm) params.append('search', searchTerm);
//         params.append('sort', sortBy);
        
//         const queryString = params.toString();
//         const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
        
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/stats');
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
//         const data = await response.json();
        
//         if (data.success) {
//           setCities(['all', ...data.data]);
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
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="text-lg text-[#0A2463]">Loading pharmacies...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-blue-50">
//         <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Pharmacies</h3>
//         <p className="text-gray-600 mb-4">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-[#0A2463] text-white rounded-lg hover:bg-[#0a1e4d] transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-[#0A2463] to-[#1E40AF] text-white">
//         <div className="container mx-auto px-4 py-12">
//           <div className="max-w-3xl">
//             <h1 className="text-4xl font-bold mb-4">Find Your Trusted Pharmacy</h1>
//             <p className="text-blue-100 text-lg mb-8">
//               Get authentic medicines delivered or ready for pickup from verified pharmacies across Pakistan
//             </p>
            
//             {/* Quick Stats */}
//             <div className="flex flex-wrap gap-6 mb-8">
//               <div className="flex items-center">
//                 <div className="bg-white/20 p-2 rounded-lg mr-3">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">{stats.totalPharmacies}+</div>
//                   <div className="text-sm text-blue-200">Pharmacies</div>
//                 </div>
//               </div>
              
//               <div className="flex items-center">
//                 <div className="bg-white/20 p-2 rounded-lg mr-3">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">{stats.avgDelivery}</div>
//                   <div className="text-sm text-blue-200">Avg. Delivery</div>
//                 </div>
//               </div>
              
//               <div className="flex items-center">
//                 <div className="bg-white/20 p-2 rounded-lg mr-3">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">{stats.authenticity}</div>
//                   <div className="text-sm text-blue-200">Authentic</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 -mt-8">
//         {/* Search Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search pharmacies by name, location, or medicine..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0A2463] focus:ring-2 focus:ring-blue-100"
//                 />
//                 <svg 
//                   className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
            
//             <div className="flex gap-3">
//               <button 
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-5 py-3 border-2 rounded-xl flex items-center transition-colors ${
//                   showFilters 
//                     ? 'bg-[#0A2463] text-white border-[#0A2463]' 
//                     : 'border-gray-300 text-gray-700 hover:border-[#0A2463] hover:text-[#0A2463]'
//                 }`}
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//                 </svg>
//                 Filters
//               </button>
              
//               <button 
//                 onClick={handleNearMe}
//                 className="px-5 py-3 bg-gradient-to-r from-[#3E92CC] to-[#0A2463] text-white rounded-xl hover:opacity-90 transition-opacity flex items-center"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 Near Me
//               </button>
//             </div>
//           </div>

//           {/* Filters Dropdown */}
//           {showFilters && (
//             <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* City Filter */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by City</label>
//                   <div className="flex flex-wrap gap-2">
//                     {cities.slice(0, 6).map(city => (
//                       <button
//                         key={city}
//                         onClick={() => setSelectedCity(city)}
//                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                           selectedCity === city 
//                             ? 'bg-[#0A2463] text-white' 
//                             : 'bg-white text-gray-700 border border-gray-300 hover:border-[#3E92CC]'
//                         }`}
//                       >
//                         {city === 'all' ? 'All Cities' : city}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Sort By */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#0A2463]"
//                   >
//                     <option value="distance">Nearest First</option>
//                     <option value="rating">Highest Rated</option>
//                     <option value="delivery">Fastest Delivery</option>
//                     <option value="name">Name (A-Z)</option>
//                   </select>
//                 </div>

//                 {/* Open Status */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
//                   <div className="flex items-center">
//                     <button
//                       onClick={toggleOpenFilter}
//                       className={`px-4 py-2.5 rounded-lg flex items-center transition-colors ${
//                         filterOpen 
//                           ? 'bg-green-100 text-green-800 border-2 border-green-300' 
//                           : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {filterOpen ? (
//                         <>
//                           <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Open Now
//                         </>
//                       ) : (
//                         'Show Open Only'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-6 flex justify-between items-center">
//                 <span className="text-sm text-gray-600">
//                   Showing {pharmacies.length} results
//                   {selectedCity !== 'all' && ` in ${selectedCity}`}
//                   {filterOpen && ' (Open Now)'}
//                 </span>
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-sm text-[#0A2463] hover:text-[#0a1e4d] font-medium"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Available Pharmacies</h2>
//           <p className="text-gray-600 mt-1">
//             {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
//           </p>
//         </div>

//         {/* Pharmacy Grid - Matching Image Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {pharmacies.map((pharmacy) => (
//             <div 
//               key={pharmacy._id} 
//               className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col"
//             >
//               {/* Pharmacy Image Header */}
//               <div className="relative h-48">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = `https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80&text=${encodeURIComponent(pharmacy.name)}`;
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
//                 {/* Status Badge */}
//                 <div className="absolute top-4 right-4">
//                   <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
//                     pharmacy.open 
//                       ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
//                       : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
//                   }`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
                
//                 {/* Distance Badge */}
//                 <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
//                   <span className="text-sm font-bold text-white">{pharmacy.distance}</span>
//                 </div>
//               </div>

//               {/* Pharmacy Content */}
//               <div className="p-6 flex-1 flex flex-col">
//                 <div className="mb-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
//                     <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
//                       <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       <span className="font-bold text-gray-800">{pharmacy.rating || '4.0'}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center text-gray-600 mb-3">
//                     <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm">{pharmacy.city}</span>
//                     <span className="mx-2">•</span>
//                     <span className="text-sm">{pharmacy.area || 'City Area'}</span>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {pharmacy.address}
//                   </p>
//                 </div>

//                 {/* Services Tags */}
//                 <div className="mb-6">
//                   <div className="flex items-center text-gray-700 mb-2">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                     <span className="text-sm font-medium">Services</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {['Delivery', 'Pickup', '24/7'].map((service) => (
//                       <span 
//                         key={service} 
//                         className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg"
//                       >
//                         {service}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Footer with Single Button */}
//                 <div className="mt-auto pt-4 border-t border-gray-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <span className="font-medium text-gray-800">{pharmacy.deliveryTime || '15-20 mins'}</span>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       Delivery Fee: <span className="font-bold">${pharmacy.deliveryFee || '2.99'}</span>
//                     </div>
//                   </div>
                  
//                   {/* Single Action Button */}
//                   <Link
//                     to={`/pharmacies/${pharmacy._id}`}
//                     className="block w-full bg-gradient-to-r from-[#3E92CC] to-[#0A2463] text-white text-center py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
//                   >
//                     Browse Medicines
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {pharmacies.length === 0 && !loading && (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
//             <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">No pharmacies found</h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               Try adjusting your search or filters. You can also browse all medicines directly.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={clearAllFilters}
//                 className="px-6 py-3 bg-[#0A2463] text-white rounded-xl hover:bg-[#0a1e4d] transition-colors font-medium"
//               >
//                 Clear All Filters
//               </button>
//               <Link
//                 to="/medicines"
//                 className="px-6 py-3 bg-white border-2 border-[#0A2463] text-[#0A2463] rounded-xl hover:bg-blue-50 transition-colors font-medium"
//               >
//                 Browse All Medicines
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* CTA Section */}
//         <div className="bg-gradient-to-r from-[#0A2463] to-[#3E92CC] rounded-2xl p-8 md:p-12 text-white mb-12">
//           <div className="max-w-2xl mx-auto text-center">
//             <h2 className="text-3xl font-bold mb-4">Need Medicines Quickly?</h2>
//             <p className="text-blue-100 text-lg mb-8">
//               Search directly from thousands of verified medicines. Get instant delivery or pickup options.
//             </p>
//             <Link
//               to="/medicines"
//               className="inline-flex items-center bg-white text-[#0A2463] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors text-lg"
//             >
//               <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               Search All Medicines
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;

























//--------------New try of layout--------------------------------------------------
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
        
//         const params = new URLSearchParams();
//         if (selectedCity !== 'all') params.append('city', selectedCity);
//         if (filterOpen) params.append('open', 'true');
//         if (searchTerm) params.append('search', searchTerm);
//         params.append('sort', sortBy);
        
//         const queryString = params.toString();
//         const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
        
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/stats');
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
//         const data = await response.json();
        
//         if (data.success) {
//           setCities(['all', ...data.data]);
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
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-lg text-[#2c6774]">Loading pharmacies...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
//         <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Pharmacies</h3>
//         <p className="text-gray-600 mb-4">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section with refined gradient */}
//       <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
//         <div className="container mx-auto px-4 py-12">
//           <div className="max-w-3xl">
//             <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Trusted Pharmacy</h1>
//             <p className="text-[#c0d3dc] text-lg mb-8">
//               Get authentic medicines delivered or ready for pickup from verified pharmacies
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats Cards */}
//       <div className="container mx-auto px-4 -mt-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border border-[#c0d3dc]/20">
//             <div className="flex items-center">
//               <div className="bg-[#2c6774]/10 p-3 rounded-lg mr-4">
//                 <svg className="w-6 h-6 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{stats.totalPharmacies}+</div>
//                 <div className="text-sm text-gray-600">Trusted Pharmacies</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border border-[#c0d3dc]/20">
//             <div className="flex items-center">
//               <div className="bg-[#2c6774]/10 p-3 rounded-lg mr-4">
//                 <svg className="w-6 h-6 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{stats.avgDelivery}</div>
//                 <div className="text-sm text-gray-600">Average Delivery</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border border-[#c0d3dc]/20">
//             <div className="flex items-center">
//               <div className="bg-[#2c6774]/10 p-3 rounded-lg mr-4">
//                 <svg className="w-6 h-6 text-[#2c6774]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{stats.authenticity}</div>
//                 <div className="text-sm text-gray-600">Authentic Medicines</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4">
//         {/* Search Section - More compact */}
//         <div className="mb-8">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
//             <div className="flex flex-col lg:flex-row items-center gap-4">
//               {/* Compact Search Bar */}
//               <div className="flex-1 w-full">
//                 <div className="relative max-w-2xl mx-auto lg:mx-0">
//                   <input
//                     type="text"
//                     placeholder="Search pharmacies..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-[#2c6774]"
//                   />
//                   <svg 
//                     className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//               </div>
              
//               {/* Action Buttons - Compact */}
//               <div className="flex gap-3 w-full lg:w-auto">
//                 <button 
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`flex-1 lg:flex-none px-4 py-3 border rounded-lg flex items-center justify-center gap-2 ${
//                     showFilters 
//                       ? 'bg-[#2c6774] text-white border-[#2c6774]' 
//                       : 'border-gray-300 text-gray-700 hover:border-[#2c6774] hover:text-[#2c6774]'
//                   }`}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//                   </svg>
//                   <span className="hidden sm:inline">Filters</span>
//                 </button>
                
//                 <button 
//                   onClick={handleNearMe}
//                   className="flex-1 lg:flex-none px-4 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span className="hidden sm:inline">Near Me</span>
//                 </button>
//               </div>
//             </div>

//             {/* Filters Dropdown - More organized */}
//             {showFilters && (
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* City Filter */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                       City
//                     </label>
//                     <div className="flex flex-wrap gap-2">
//                       {cities.slice(0, 5).map(city => (
//                         <button
//                           key={city}
//                           onClick={() => setSelectedCity(city)}
//                           className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
//                             selectedCity === city 
//                               ? 'bg-[#2c6774] text-white' 
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {city === 'all' ? 'All Cities' : city}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Sort By */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
//                       </svg>
//                       Sort By
//                     </label>
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#2c6774] focus:border-[#2c6774]"
//                     >
//                       <option value="distance">Nearest First</option>
//                       <option value="rating">Highest Rated</option>
//                       <option value="delivery">Fastest Delivery</option>
//                       <option value="name">Name (A-Z)</option>
//                     </select>
//                   </div>

//                   {/* Open Status */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       Status
//                     </label>
//                     <button
//                       onClick={toggleOpenFilter}
//                       className={`px-4 py-2.5 rounded-lg flex items-center transition-colors ${
//                         filterOpen 
//                           ? 'bg-green-50 text-green-700 border border-green-300' 
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {filterOpen ? (
//                         <>
//                           <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Open Now
//                         </>
//                       ) : (
//                         'Show Open Only'
//                       )}
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
//                   <span className="text-sm text-gray-600">
//                     Showing {pharmacies.length} pharmacies
//                   </span>
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-sm text-[#2c6774] hover:text-[#1e4e56] font-medium"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Results Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">Available Pharmacies</h2>
//           <p className="text-gray-600 mt-1">
//             {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
//             {selectedCity !== 'all' && ` in ${selectedCity}`}
//             {filterOpen && ' • Open Now'}
//           </p>
//         </div>

//         {/* Pharmacy Grid - Professional Design */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {pharmacies.map((pharmacy) => (
//             <div 
//               key={pharmacy._id} 
//               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col group"
//             >
//               {/* Pharmacy Image Header */}
//               <div className="relative h-48">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
//                 {/* Status Badge */}
//                 <div className="absolute top-4 left-4">
//                   <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
//                     pharmacy.open 
//                       ? 'bg-green-500 text-white' 
//                       : 'bg-gray-600 text-white'
//                   }`}>
//                     {pharmacy.open ? 'OPEN NOW' : 'CLOSED'}
//                   </span>
//                 </div>
                
//                 {/* Rating Badge */}
//                 <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
//                   <div className="flex items-center gap-1">
//                     <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span className="font-bold text-gray-900">{pharmacy.rating || '4.0'}</span>
//                   </div>
//                 </div>
                
//                 {/* City Badge */}
//                 <div className="absolute bottom-4 left-4">
//                   <span className="bg-[#2c6774] text-white px-3 py-1.5 rounded-lg text-sm font-medium">
//                     {pharmacy.city}
//                   </span>
//                 </div>
//               </div>

//               {/* Pharmacy Content */}
//               <div className="p-5 flex-1 flex flex-col">
//                 <div className="mb-4">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{pharmacy.name}</h3>
                  
//                   <div className="flex items-center text-gray-600 mb-3">
//                     <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm truncate">{pharmacy.address}</span>
//                   </div>
                  
//                   <div className="flex items-center text-gray-600 mb-4">
//                     <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="text-sm font-medium">{pharmacy.deliveryTime || '15-20 mins'}</span>
//                     {pharmacy.distance && (
//                       <>
//                         <span className="mx-2 text-gray-300">•</span>
//                         <span className="text-sm text-gray-500">{pharmacy.distance}</span>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Services Tags */}
//                 <div className="mb-4 flex-1">
//                   <div className="flex flex-wrap gap-2">
//                     {pharmacy.services ? pharmacy.services.slice(0, 3).map((service, index) => (
//                       <span 
//                         key={index} 
//                         className="px-3 py-1.5 bg-[#2c6774]/10 text-[#2c6774] text-xs font-medium rounded-lg"
//                       >
//                         {service}
//                       </span>
//                     )) : (
//                       <>
//                         <span className="px-3 py-1.5 bg-[#2c6774]/10 text-[#2c6774] text-xs font-medium rounded-lg">
//                           Delivery
//                         </span>
//                         <span className="px-3 py-1.5 bg-[#2c6774]/10 text-[#2c6774] text-xs font-medium rounded-lg">
//                           Pickup
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Single Action Button */}
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <Link
//                     to={`/pharmacies/${pharmacy._id}`}
//                     className="block w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white text-center py-3 rounded-lg font-semibold transition-colors"
//                   >
//                     Browse Medicines
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {pharmacies.length === 0 && !loading && (
//           <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
//             <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">No pharmacies found</h3>
//             <p className="text-gray-600 mb-6">
//               Try adjusting your search or filters to find what you're looking for.
//             </p>
//             <button
//               onClick={clearAllFilters}
//               className="px-5 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors font-medium"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}

//         {/* Compact CTA Section */}
//         <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-xl p-6 md:p-8 text-white mb-8">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="text-center md:text-left">
//               <h3 className="text-xl font-bold mb-2">Can't find your pharmacy?</h3>
//               <p className="text-[#c0d3dc]">Browse our complete medicine catalog</p>
//             </div>
//             <Link
//               to="/medicines"
//               className="inline-flex items-center bg-white text-[#2c6774] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               Search Medicines
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;
























//-----------------------New Card Style-----------------
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

//   // UI-only data for features
//   const features = [
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: 'Verified Pharmacies',
//       description: 'All pharmacies are certified and authenticated'
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: 'Fast Delivery',
//       description: 'Get medicines delivered within 30 minutes'
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
//         </svg>
//       ),
//       title: '24/7 Support',
//       description: 'Round-the-clock customer support available'
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       title: 'Secure Payments',
//       description: 'Safe and encrypted payment methods'
//     }
//   ];

//   // Fetch pharmacies from API
//   useEffect(() => {
//     const fetchPharmacies = async () => {
//       try {
//         setLoading(true);
        
//         const params = new URLSearchParams();
//         if (selectedCity !== 'all') params.append('city', selectedCity);
//         if (filterOpen) params.append('open', 'true');
//         if (searchTerm) params.append('search', searchTerm);
//         params.append('sort', sortBy);
        
//         const queryString = params.toString();
//         const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
        
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/stats');
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
//         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
//         const data = await response.json();
        
//         if (data.success) {
//           setCities(['all', ...data.data]);
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
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-lg text-[#2c6774]">Loading pharmacies...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
//         <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Pharmacies</h3>
//         <p className="text-gray-600 mb-4">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-3xl">
//             <h1 className="text-2xl md:text-3xl font-bold mb-3">Find Your Trusted Pharmacy</h1>
//             <p className="text-[#c0d3dc] text-sm md:text-base">
//               Get authentic medicines delivered or ready for pickup from verified pharmacies
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats Cards - Updated to 5 */}
//       <div className="container mx-auto px-4 -mt-4 mb-6">
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//           <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//             <div className="text-xl font-bold text-[#2c6774]">{stats.totalPharmacies}+</div>
//             <div className="text-xs text-gray-600 mt-1">Pharmacies</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//             <div className="text-xl font-bold text-[#2c6774]">{stats.openPharmacies || '150+'}</div>
//             <div className="text-xs text-gray-600 mt-1">Open Now</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//             <div className="text-xl font-bold text-[#2c6774]">{stats.avgDelivery}</div>
//             <div className="text-xs text-gray-600 mt-1">Avg Delivery</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//             <div className="text-xl font-bold text-[#2c6774]">{stats.authenticity}</div>
//             <div className="text-xs text-gray-600 mt-1">Authentic</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
//             <div className="text-xl font-bold text-[#2c6774]">{stats.cities || '25+'}</div>
//             <div className="text-xs text-gray-600 mt-1">Cities</div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 pb-8">
//         {/* Search Section */}
//         <div className="mb-6">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search pharmacies by name or location..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full px-4 py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2c6774] focus:border-[#2c6774] text-sm"
//                   />
//                   <svg 
//                     className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => setShowFilters(!showFilters)}
//                   className={`px-3 py-2.5 border rounded-lg flex items-center gap-1 text-sm ${
//                     showFilters 
//                       ? 'bg-[#2c6774] text-white border-[#2c6774]' 
//                       : 'border-gray-300 text-gray-700 hover:border-[#2c6774] hover:text-[#2c6774]'
//                   }`}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//                   </svg>
//                   Filters
//                 </button>
                
//                 <button 
//                   onClick={handleNearMe}
//                   className="px-3 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] flex items-center gap-1 text-sm"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   Near Me
//                 </button>
//               </div>
//             </div>

//             {/* Filters Dropdown */}
//             {showFilters && (
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-2">City</label>
//                     <div className="flex flex-wrap gap-1">
//                       {cities.slice(0, 5).map(city => (
//                         <button
//                           key={city}
//                           onClick={() => setSelectedCity(city)}
//                           className={`px-2 py-1 rounded text-xs ${
//                             selectedCity === city 
//                               ? 'bg-[#2c6774] text-white' 
//                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                           }`}
//                         >
//                           {city === 'all' ? 'All' : city}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774] focus:border-[#2c6774]"
//                     >
//                       <option value="distance">Nearest First</option>
//                       <option value="rating">Highest Rated</option>
//                       <option value="delivery">Fastest Delivery</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
//                     <button
//                       onClick={toggleOpenFilter}
//                       className={`px-3 py-1.5 rounded flex items-center gap-1 text-sm ${
//                         filterOpen 
//                           ? 'bg-green-50 text-green-700 border border-green-300' 
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {filterOpen ? 'Open Now' : 'Show Open Only'}
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="mt-3 flex justify-between items-center">
//                   <span className="text-xs text-gray-600">
//                     {pharmacies.length} results
//                   </span>
//                   <button
//                     onClick={clearAllFilters}
//                     className="text-xs text-[#2c6774] hover:text-[#1e4e56] font-medium"
//                   >
//                     Clear filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Results Header */}
//         <div className="mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">Available Pharmacies</h2>
//           <p className="text-sm text-gray-600">
//             {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
//             {selectedCity !== 'all' && ` in ${selectedCity}`}
//             {filterOpen && ' • Open Now'}
//           </p>
//         </div>

//         {/* COMPACT PHARMACY CARDS - Fixed width issue */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
//           {pharmacies.map((pharmacy) => (
//             <div 
//               key={pharmacy._id} 
//               className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow transition-all duration-200 flex flex-col"
//             >
//               {/* Pharmacy Image - Smaller */}
//               <div className="relative h-36">
//                 <img 
//                   src={pharmacy.image} 
//                   alt={pharmacy.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
//                 <div className="absolute top-3 left-3 flex items-center gap-2">
//                   <span className={`px-2 py-0.5 rounded text-xs font-medium ${
//                     pharmacy.open 
//                       ? 'bg-green-500 text-white' 
//                       : 'bg-gray-600 text-white'
//                   }`}>
//                     {pharmacy.open ? 'OPEN' : 'CLOSED'}
//                   </span>
//                 </div>
                
//                 <div className="absolute top-3 right-3">
//                   <div className="flex items-center bg-white/90 px-2 py-0.5 rounded">
//                     <svg className="w-3 h-3 text-yellow-500 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span className="text-xs font-bold">{pharmacy.rating || '4.0'}</span>
//                   </div>
//                 </div>
                
//                 <div className="absolute bottom-3 left-3">
//                   <span className="bg-[#2c6774] text-white px-2 py-0.5 rounded text-xs font-medium">
//                     {pharmacy.city}
//                   </span>
//                 </div>
//               </div>

//               {/* Pharmacy Content - More compact */}
//               <div className="p-3 flex-1 flex flex-col">
//                 <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{pharmacy.name}</h3>
                
//                 <div className="flex items-start text-gray-600 mb-2">
//                   <svg className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   </svg>
//                   <span className="text-xs line-clamp-2">{pharmacy.address}</span>
//                 </div>
                
//                 <div className="flex items-center text-gray-600 text-xs mb-2">
//                   <svg className="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span>{pharmacy.deliveryTime || '15-20 mins'}</span>
//                   {pharmacy.distance && (
//                     <>
//                       <span className="mx-1 text-gray-300">•</span>
//                       <span className="text-gray-500">{pharmacy.distance}</span>
//                     </>
//                   )}
//                 </div>

//                 {/* Compact Services Tags */}
//                 <div className="mb-3">
//                   <div className="flex flex-wrap gap-1">
//                     <span className="px-2 py-0.5 bg-[#2c6774]/10 text-[#2c6774] text-xs rounded">
//                       Delivery
//                     </span>
//                     <span className="px-2 py-0.5 bg-[#2c6774]/10 text-[#2c6774] text-xs rounded">
//                       Pickup
//                     </span>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <div className="mt-auto">
//                   <Link
//                     to={`/pharmacies/${pharmacy._id}`}
//                     className="block w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white text-center py-2 rounded text-xs font-medium transition-colors"
//                   >
//                     View Pharmacy
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {pharmacies.length === 0 && !loading && (
//           <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
//             <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-lg font-bold text-gray-800 mb-1">No pharmacies found</h3>
//             <p className="text-gray-600 text-sm mb-4">Try adjusting your search criteria</p>
//             <button
//               onClick={clearAllFilters}
//               className="px-4 py-2 bg-[#2c6774] text-white rounded text-sm hover:bg-[#1e4e56] transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}

//         {/* Why Choose Us Section */}
//         <div className="bg-gradient-to-br from-[#174047]/5 via-[#2c6774]/5 to-[#5c878f]/5 rounded-xl p-6 mb-8 border border-[#c0d3dc]/20">
//           <div className="text-center mb-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-2">Why Choose Our Platform?</h2>
//             <p className="text-gray-600 text-sm max-w-2xl mx-auto">
//               We connect you with the best pharmacies to ensure you get quality medicines with convenience
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow transition-shadow">
//                 <div className="text-[#2c6774] mb-2">
//                   {feature.icon}
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h3>
//                 <p className="text-xs text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Compact CTA Section */}
//         <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-lg p-5 text-white">
//           <div className="text-center">
//             <h3 className="text-base font-bold mb-1">Need Specific Medicines?</h3>
//             <p className="text-[#c0d3dc] text-xs mb-3">
//               Search our complete medicine database from all partner pharmacies
//             </p>
//             <Link
//               to="/medicines"
//               className="inline-flex items-center bg-white text-[#2c6774] px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               Browse All Medicines
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;

















































//--------------------Perfect New style Approved by me-------------
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

  // UI-only data for features
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Verified Pharmacies',
      description: 'All pharmacies are certified and authenticated'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Get medicines delivered within 30 minutes'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support available'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Safe and encrypted payment methods'
    }
  ];

  // Fetch pharmacies from API
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        
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
          setCities(['all', ...data.data]);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-[#2c6774]">Loading pharmacies...</div>
      </div>
    );
  }

  // Error state
  if (error && pharmacies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Pharmacies</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Updated Header Section - Taller */}
      <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
        <div className="container mx-auto px-4 py-16 md:py-20"> {/* Increased padding */}
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight"> {/* Larger text */}
              Find Your Trusted Pharmacy
            </h1>
            <p className="text-[#c0d3dc] text-lg md:text-xl leading-relaxed"> {/* Larger paragraph */}
              Get authentic medicines delivered or ready for pickup from verified pharmacies across multiple cities
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards - Updated to 5 */}
      <div className="container mx-auto px-4 -mt-8 mb-8"> {/* Adjusted negative margin */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.totalPharmacies}+</div>
            <div className="text-sm text-gray-600 mt-2">Pharmacies</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.openPharmacies || '150+'}</div>
            <div className="text-sm text-gray-600 mt-2">Open Now</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.avgDelivery}</div>
            <div className="text-sm text-gray-600 mt-2">Avg Delivery</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.authenticity}</div>
            <div className="text-sm text-gray-600 mt-2">Authentic</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.cities || '25+'}</div>
            <div className="text-sm text-gray-600 mt-2">Cities</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Search Section - Updated button styles */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search pharmacies by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm transition-all duration-300"
                  />
                  <svg 
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 ${
                    showFilters 
                      ? 'bg-[#2c6774] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                </button>
                
                <button 
                  onClick={handleNearMe}
                  className="px-5 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-semibold hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Near Me
                </button>
              </div>
            </div>

            {/* Filters Dropdown - Updated button styles */}

{showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">City</label>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(cities)).slice(0, 5).map(city => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-2 py-1 rounded text-xs ${
                            selectedCity === city 
                              ? 'bg-[#2c6774] text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {city === 'all' ? 'All Cities' : city}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774] focus:border-[#2c6774]"
                    >
                      <option value="distance">Nearest First</option>
                      <option value="rating">Highest Rated</option>
                      <option value="delivery">Fastest Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                    <button
                      onClick={toggleOpenFilter}
                      className={`px-3 py-1.5 rounded flex items-center gap-1 text-sm ${
                        filterOpen 
                          ? 'bg-green-50 text-green-700 border border-green-300' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filterOpen ? 'Open Now' : 'Show Open Only'}
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-600">
                    {pharmacies.length} results
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#2c6774] hover:text-[#1e4e56] font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Pharmacies</h2>
          <p className="text-gray-600 mt-2">
            {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
            {selectedCity !== 'all' && ` in ${selectedCity}`}
            {filterOpen && ' • Open Now'}
          </p>
        </div>

        {/* COMPACT PHARMACY CARDS - Updated button styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {pharmacies.map((pharmacy) => (
            <div 
              key={pharmacy._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Pharmacy Image - Smaller */}
              <div className="relative h-36">
                <img 
                  src={pharmacy.image} 
                  alt={pharmacy.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    pharmacy.open 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {pharmacy.open ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
                
                <div className="absolute top-3 right-3">
                  <div className="flex items-center bg-white/90 px-2 py-0.5 rounded shadow-sm">
                    <svg className="w-3 h-3 text-yellow-500 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold">{pharmacy.rating || '4.0'}</span>
                  </div>
                </div>
                
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#2c6774] text-white px-2 py-0.5 rounded text-xs font-medium shadow-sm">
                    {pharmacy.city}
                  </span>
                </div>
              </div>

              {/* Pharmacy Content - More compact */}
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{pharmacy.name}</h3>
                
                <div className="flex items-start text-gray-600 mb-2">
                  <svg className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-xs line-clamp-2">{pharmacy.address}</span>
                </div>
                
                <div className="flex items-center text-gray-600 text-xs mb-2">
                  <svg className="w-3 h-3 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{pharmacy.deliveryTime || '15-20 mins'}</span>
                  {pharmacy.distance && (
                    <>
                      <span className="mx-1 text-gray-300">•</span>
                      <span className="text-gray-500">{pharmacy.distance}</span>
                    </>
                  )}
                </div>

                {/* Compact Services Tags */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-[#2c6774]/10 text-[#2c6774] text-xs rounded transition-colors duration-300 hover:bg-[#2c6774] hover:text-white cursor-default">
                      Delivery
                    </span>
                    <span className="px-2 py-0.5 bg-[#2c6774]/10 text-[#2c6774] text-xs rounded transition-colors duration-300 hover:bg-[#2c6774] hover:text-white cursor-default">
                      Pickup
                    </span>
                  </div>
                </div>

                {/* Action Button - Updated with gradient */}
                <div className="mt-auto">
                  <Link
                    to={`/pharmacies/${pharmacy._id}`}
                    className="block w-full bg-gradient-to-r from-[#2c6774] to-[#174047] text-white text-center py-2 rounded text-xs font-semibold transition-all duration-300 hover:from-[#1e4e56] hover:to-[#174047] transform hover:-translate-y-0.5 shadow-sm hover:shadow"
                  >
                    View Pharmacy
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Updated button styles */}
        {pharmacies.length === 0 && !loading && (
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200 shadow-sm">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No pharmacies found</h3>
            <p className="text-gray-600 text-sm mb-4">Try adjusting your search criteria</p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded text-sm font-semibold transition-all duration-300 hover:from-[#1e4e56] hover:to-[#174047] transform hover:-translate-y-0.5"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-[#174047]/5 via-[#2c6774]/5 to-[#5c878f]/5 rounded-xl p-6 mb-8 border border-[#c0d3dc]/20">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Why Choose Our Platform?</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              We connect you with the best pharmacies to ensure you get quality medicines with convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-[#2c6774] mb-2">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compact CTA Section - Updated with gradient from second code */}
        <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-xl p-8 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#5c878f] rounded-full -translate-y-24 translate-x-12 opacity-20"></div>
          <div className="relative z-10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">Need Specific Medicines?</h3>
              <p className="text-[#c0d3dc] mb-6 max-w-md mx-auto">
                Search our complete medicine database from all partner pharmacies with prescription support
              </p>
              <Link
                to="/medicines"
                className="inline-flex items-center bg-white text-[#2c6774] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search All Medicines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;