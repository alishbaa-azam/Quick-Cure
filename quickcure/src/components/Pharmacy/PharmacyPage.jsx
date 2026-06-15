// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   FaSearch, 
// //   FaFilter, 
// //   FaMapMarkerAlt, 
// //   FaClock, 
// //   FaShippingFast, 
// //   FaExclamationTriangle,
// //   FaSadTear,
// //   FaMapPin,
// //   FaSyncAlt,
// //   FaLocationArrow,
// //   FaMapPin as FaMapMarker
// // } from 'react-icons/fa';

// // const PharmacyPage = () => {
// //   const [pharmacies, setPharmacies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
  
// //   const [isNearMeMode, setIsNearMeMode] = useState(false);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [locationError, setLocationError] = useState(null);
// //   const [maxDistance, setMaxDistance] = useState(5);
// //   const [showManualLocation, setShowManualLocation] = useState(false);
// //   const [manualCity, setManualCity] = useState('');
// //   const [isLocating, setIsLocating] = useState(false);
  
// //   const [cities, setCities] = useState([]);
  
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [sortBy, setSortBy] = useState('distance');
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [selectedCity, setSelectedCity] = useState('all');

// //   const getDeliveryRadius = (pharmacy) => pharmacy.deliveryRadius || 5;

// //   const getUserLocation = () => {
// //     return new Promise((resolve, reject) => {
// //       if (!navigator.geolocation) {
// //         reject(new Error('Geolocation is not supported'));
// //         return;
// //       }
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
// //         (error) => {
// //           let msg = 'Unable to get location';
// //           if (error.code === error.PERMISSION_DENIED) msg = 'Location permission denied. Please enable location access or enter your city manually.';
// //           else if (error.code === error.POSITION_UNAVAILABLE) msg = 'Location unavailable. Try entering your city manually.';
// //           else if (error.code === error.TIMEOUT) msg = 'Location request timed out. Try entering your city manually.';
// //           else msg = 'Unknown location error. Try entering your city manually.';
// //           reject(new Error(msg));
// //         },
// //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
// //       );
// //     });
// //   };

// //   const fetchNearbyPharmacies = async (lat, lng, distance) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await fetch(
// //         `http://localhost:5000/api/pharmacies/nearby?lat=${lat}&lng=${lng}&maxDistance=${distance * 1000}`
// //       );
// //       const data = await response.json();
// //       if (data.success) {
// //         setPharmacies(data.data);
// //         setIsNearMeMode(true);
// //         setShowManualLocation(false);
// //       } else {
// //         setError(data.message || 'Failed to fetch nearby pharmacies');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching nearby pharmacies:', err);
// //       setError('Error connecting to server');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAllPharmacies = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const params = new URLSearchParams();
// //       if (selectedCity !== 'all') params.append('city', selectedCity);
// //       if (searchTerm) params.append('search', searchTerm);
// //       if (sortBy && sortBy !== 'distance') params.append('sort', sortBy);
// //       const queryString = params.toString();
// //       const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
// //       const response = await fetch(url);
// //       const data = await response.json();
// //       if (data.success) {
// //         setPharmacies(data.data);
// //         setIsNearMeMode(false);
// //       } else {
// //         setError(data.message || 'Failed to fetch pharmacies');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching pharmacies:', err);
// //       setError('Error connecting to server');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleNearMe = async () => {
// //     try {
// //       setLocationError(null);
// //       setError(null);
// //       setIsLocating(true);
// //       const location = await getUserLocation();
// //       setUserLocation(location);
// //       await fetchNearbyPharmacies(location.lat, location.lng, maxDistance);
// //     } catch (err) {
// //       setLocationError(err.message);
// //       setShowManualLocation(true);
// //     } finally {
// //       setIsLocating(false);
// //     }
// //   };

// //   // Handle manual city-based location
// //   const handleManualLocation = () => {
// //     if (!manualCity.trim()) {
// //       setLocationError('Please enter a city name');
// //       return;
// //     }
// //     setSelectedCity(manualCity.trim());
// //     setIsNearMeMode(true);
// //     setUserLocation(null);
// //     setShowManualLocation(false);
// //     // Fetch pharmacies filtered by the entered city
// //     fetchPharmaciesByCity(manualCity.trim());
// //   };

// //   const fetchPharmaciesByCity = async (city) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await fetch(`http://localhost:5000/api/pharmacies?city=${encodeURIComponent(city)}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         setPharmacies(data.data);
// //         setIsNearMeMode(true);
// //         setLocationError(null);
// //       } else {
// //         setError(`No pharmacies found in ${city}`);
// //       }
// //     } catch (err) {
// //       setError('Error fetching pharmacies');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const exitNearMeMode = () => {
// //     setIsNearMeMode(false);
// //     setUserLocation(null);
// //     setLocationError(null);
// //     setShowManualLocation(false);
// //     setManualCity('');
// //     setSelectedCity('all');
// //     fetchAllPharmacies();
// //   };

// //   const clearAllFilters = () => {
// //     setSearchTerm('');
// //     setSelectedCity('all');
// //     setSortBy('distance');
// //     if (isNearMeMode) exitNearMeMode();
// //     else fetchAllPharmacies();
// //   };

// //   useEffect(() => {
// //     if (!isNearMeMode) fetchAllPharmacies();
// //   }, [selectedCity, searchTerm, sortBy]);

// //   useEffect(() => {
// //     const fetchCities = async () => {
// //       try {
// //         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
// //         const data = await response.json();
// //         if (data.success) setCities(data.data || []);
// //       } catch (err) {}
// //     };
// //     fetchCities();
// //   }, []);

// //   if (loading && pharmacies.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-lg text-[#2c6774] flex items-center gap-2">
// //           <FaSyncAlt className="animate-spin" />
// //           {isLocating ? 'Getting your location...' : 'Loading pharmacies...'}
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && pharmacies.length === 0) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
// //         <FaSadTear className="w-16 h-16 text-gray-400 mb-4" />
// //         <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
// //         <p className="text-gray-600 mb-4">{error}</p>
// //         <button onClick={() => { setError(null); fetchAllPharmacies(); }}
// //           className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-2">
// //           <FaSyncAlt /> Try Again
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
// //         <div className="container mx-auto px-4 py-12 md:py-16">
// //           <div className="max-w-3xl">
// //             <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Trusted Pharmacy</h1>
// //             <p className="text-[#c0d3dc] text-lg">Get authentic medicines delivered from verified pharmacies near you</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 pb-8">
// //         {/* Search Section */}
// //         <div className="mb-8">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
// //             {isNearMeMode && userLocation && (
// //               <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
// //                 <div className="flex items-center gap-2 text-green-700">
// //                   <FaMapMarkerAlt />
// //                   <span className="text-sm">Showing pharmacies within {maxDistance} km of your location</span>
// //                 </div>
// //                 <button onClick={exitNearMeMode} className="text-sm text-green-700 hover:text-green-900 underline">
// //                   Exit Near Me Mode
// //                 </button>
// //               </div>
// //             )}
            
// //             {isNearMeMode && !userLocation && (
// //               <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
// //                 <div className="flex items-center gap-2 text-blue-700">
// //                   <FaMapMarkerAlt />
// //                   <span className="text-sm">Showing pharmacies in selected area</span>
// //                 </div>
// //                 <button onClick={exitNearMeMode} className="text-sm text-blue-700 hover:text-blue-900 underline">
// //                   Exit Near Me Mode
// //                 </button>
// //               </div>
// //             )}

// //             {/* Location Permission Denied - Show manual input */}
// //             {showManualLocation && !isNearMeMode && (
// //               <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                 <div className="flex items-center gap-2 text-yellow-700 mb-2">
// //                   <FaExclamationTriangle />
// //                   <span className="text-sm font-medium">Location Error</span>
// //                 </div>
// //                 <p className="text-sm text-yellow-700 mb-3">{locationError}</p>
// //                 <div className="flex gap-2">
// //                   <input
// //                     type="text"
// //                     placeholder="Enter your city name..."
// //                     value={manualCity}
// //                     onChange={(e) => setManualCity(e.target.value)}
// //                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
// //                     onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
// //                   />
// //                   <button
// //                     onClick={handleManualLocation}
// //                     className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#1e4e56]"
// //                   >
// //                     Search
// //                   </button>
// //                   <button
// //                     onClick={handleNearMe}
// //                     className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
// //                   >
// //                     Retry
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="flex-1">
// //                 <div className="relative">
// //                   <input
// //                     type="text"
// //                     placeholder="Search pharmacies by name or location..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     disabled={isNearMeMode}
// //                     className={`w-full px-5 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm ${isNearMeMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
// //                   />
// //                   <FaSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
// //                 </div>
// //               </div>
// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => !isNearMeMode && setShowFilters(!showFilters)}
// //                   disabled={isNearMeMode}
// //                   className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
// //                     showFilters && !isNearMeMode ? 'bg-[#2c6774] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //                   } ${isNearMeMode ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                 >
// //                   <FaFilter /> Filters
// //                 </button>
// //                 <button
// //                   onClick={handleNearMe}
// //                   disabled={isLocating}
// //                   className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md ${
// //                     isNearMeMode ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white hover:from-[#1e4e56] hover:to-[#174047]'
// //                   } ${isLocating ? 'opacity-50 cursor-wait' : ''}`}
// //                 >
// //                   <FaMapMarkerAlt /> {isLocating ? 'Locating...' : isNearMeMode ? 'Near Me Active' : 'Near Me'}
// //                 </button>
// //               </div>
// //             </div>

// //             {isNearMeMode && userLocation && (
// //               <div className="mt-4 pt-4 border-t border-gray-200">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Search Radius: {maxDistance} km
// //                 </label>
// //                 <input
// //                   type="range" min="1" max="20" value={maxDistance}
// //                   onChange={(e) => {
// //                     const newDistance = parseInt(e.target.value);
// //                     setMaxDistance(newDistance);
// //                     if (userLocation) fetchNearbyPharmacies(userLocation.lat, userLocation.lng, newDistance);
// //                   }}
// //                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2c6774]"
// //                 />
// //               </div>
// //             )}

// //             {showFilters && !isNearMeMode && (
// //               <div className="mt-4 pt-4 border-t border-gray-200">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-xs font-medium text-gray-700 mb-2">City</label>
// //                     <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]">
// //                       <option value="all">All Cities</option>
// //                       {cities.map(city => <option key={city} value={city}>{city}</option>)}
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
// //                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]">
// //                       <option value="name">Name</option>
// //                       <option value="rating">Highest Rated</option>
// //                       <option value="delivery">Fastest Delivery</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="mt-3 flex justify-between items-center">
// //                   <span className="text-xs text-gray-600">{pharmacies.length} results</span>
// //                   <button onClick={clearAllFilters} className="text-xs text-[#2c6774] hover:text-[#1e4e56] font-medium">
// //                     Clear filters
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Results Header */}
// //         <div className="mb-6">
// //           <h2 className="text-2xl font-bold text-gray-900">
// //             {isNearMeMode ? 'Nearby Pharmacies' : 'Available Pharmacies'}
// //           </h2>
// //           <p className="text-gray-600 mt-2">
// //             {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
// //             {isNearMeMode && !userLocation && selectedCity !== 'all' && ` in ${selectedCity}`}
// //             {isNearMeMode && userLocation && ` • Within ${maxDistance} km`}
// //           </p>
// //         </div>

// //         {/* Pharmacy Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
// //           {pharmacies.map((pharmacy) => {
// //             const distance = pharmacy.distance ? pharmacy.distance / 1000 : 0;
// //             const deliveryRadius = getDeliveryRadius(pharmacy);
// //             return (
// //               <div key={pharmacy._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all flex flex-col">
// //                 <div className="relative h-36">
// //                   <img src={pharmacy.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60'}
// //                     alt={pharmacy.name} className="w-full h-full object-cover"
// //                     onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60'; }} />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
// //                   <div className="absolute bottom-3 left-3">
// //                     <span className="bg-[#2c6774] text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
// //                       <FaMapMarker className="w-3 h-3" /> {pharmacy.city}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="p-3 flex-1 flex flex-col">
// //                   <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{pharmacy.name}</h3>
// //                   <div className="mb-2">
// //                     <div className="flex items-start text-gray-600">
// //                       <FaMapMarkerAlt className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
// //                       <div className="text-xs leading-tight">{pharmacy.address}</div>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center text-gray-600 text-xs mb-2">
// //                     <FaClock className="w-3 h-3 text-gray-400 mr-1" />
// //                     <span>{pharmacy.deliveryTime || '15-20 mins'}</span>
// //                     {isNearMeMode && userLocation && distance > 0 && (
// //                       <>
// //                         <span className="mx-1 text-gray-300">•</span>
// //                         <span className="flex items-center gap-1">
// //                           <FaLocationArrow className="w-3 h-3" /> {distance.toFixed(1)} km
// //                         </span>
// //                       </>
// //                     )}
// //                   </div>
// //                   <div className="mb-3">
// //                     <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1 w-fit">
// //                       <FaShippingFast className="w-3 h-3" />
// //                       Radius: {deliveryRadius} km
// //                     </span>
// //                   </div>
// //                   <div className="mt-auto">
// //                     <Link to={`/pharmacies/${pharmacy._id}`}
// //                       className="block w-full bg-gradient-to-r from-[#2c6774] to-[#174047] text-white text-center py-2 rounded text-xs font-semibold transition-all hover:from-[#1e4e56] hover:to-[#174047]">
// //                       View Pharmacy
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Empty State */}
// //         {pharmacies.length === 0 && !loading && (
// //           <div className="text-center py-8 bg-white rounded-xl border border-gray-200 shadow-sm">
// //             <FaSadTear className="w-12 h-12 text-gray-300 mx-auto mb-3" />
// //             <h3 className="text-lg font-bold text-gray-800 mb-1">
// //               {isNearMeMode ? 'No pharmacies nearby' : 'No pharmacies found'}
// //             </h3>
// //             <p className="text-gray-600 text-sm mb-4">
// //               {isNearMeMode ? 'Try a different city or increase the search radius.' : 'Try adjusting your search criteria'}
// //             </p>
// //             <button onClick={clearAllFilters}
// //               className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded text-sm font-semibold">
// //               {isNearMeMode ? 'Show All Pharmacies' : 'Clear Filters'}
// //             </button>
// //           </div>
// //         )}

// //         {/* CTA */}
// //         <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-xl p-6 text-white text-center">
// //           <h3 className="text-xl font-bold mb-2">Need Specific Medicines?</h3>
// //           <p className="text-[#c0d3dc] mb-4 max-w-md mx-auto">Search our complete medicine database from all partner pharmacies</p>
// //           <Link to="/medicines" className="inline-flex items-center bg-white text-[#2c6774] px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-all">
// //             <FaSearch className="mr-2" /> Search All Medicines
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PharmacyPage;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaSearch, 
//   FaFilter, 
//   FaMapMarkerAlt, 
//   FaClock, 
//   FaShippingFast, 
//   FaExclamationTriangle,
//   FaSadTear,
//   FaMapPin,
//   FaSyncAlt,
//   FaLocationArrow,
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
//   FaChevronDown,
//   FaChevronUp,
//   FaTimes,
//   FaStore,
//   FaTruck,
//   FaPhoneAlt,
//   FaRegClock
// } from 'react-icons/fa';

// const PharmacyPage = () => {
//   const [pharmacies, setPharmacies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [isNearMeMode, setIsNearMeMode] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [maxDistance, setMaxDistance] = useState(5);
//   const [showManualLocation, setShowManualLocation] = useState(false);
//   const [manualCity, setManualCity] = useState('');
//   const [isLocating, setIsLocating] = useState(false);
  
//   const [cities, setCities] = useState([]);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('distance');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCity, setSelectedCity] = useState('all');

//   const getDeliveryRadius = (pharmacy) => pharmacy.deliveryRadius || 5;

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
//     return (
//       <div className="flex items-center gap-0.5">
//         {[...Array(fullStars)].map((_, i) => (
//           <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
//         ))}
//         {hasHalfStar && <FaStarHalfAlt className="w-3.5 h-3.5 text-yellow-400" />}
//         {[...Array(emptyStars)].map((_, i) => (
//           <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
//         ))}
//         <span className="ml-1.5 text-xs font-medium text-gray-600">{rating.toFixed(1)}</span>
//       </div>
//     );
//   };

//   const getUserLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported'));
//         return;
//       }
//       navigator.geolocation.getCurrentPosition(
//         (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
//         (error) => {
//           let msg = 'Unable to get location';
//           if (error.code === error.PERMISSION_DENIED) msg = 'Location permission denied. Please enable location access or enter your city manually.';
//           else if (error.code === error.POSITION_UNAVAILABLE) msg = 'Location unavailable. Try entering your city manually.';
//           else if (error.code === error.TIMEOUT) msg = 'Location request timed out. Try entering your city manually.';
//           else msg = 'Unknown location error. Try entering your city manually.';
//           reject(new Error(msg));
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//       );
//     });
//   };

//   const fetchNearbyPharmacies = async (lat, lng, distance) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/nearby?lat=${lat}&lng=${lng}&maxDistance=${distance * 1000}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setPharmacies(data.data);
//         setIsNearMeMode(true);
//         setShowManualLocation(false);
//       } else {
//         setError(data.message || 'Failed to fetch nearby pharmacies');
//       }
//     } catch (err) {
//       console.error('Error fetching nearby pharmacies:', err);
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllPharmacies = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params = new URLSearchParams();
//       if (selectedCity !== 'all') params.append('city', selectedCity);
//       if (searchTerm) params.append('search', searchTerm);
//       if (sortBy && sortBy !== 'distance') params.append('sort', sortBy);
//       const queryString = params.toString();
//       const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.success) {
//         setPharmacies(data.data);
//         setIsNearMeMode(false);
//       } else {
//         setError(data.message || 'Failed to fetch pharmacies');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNearMe = async () => {
//     try {
//       setLocationError(null);
//       setError(null);
//       setIsLocating(true);
//       const location = await getUserLocation();
//       setUserLocation(location);
//       await fetchNearbyPharmacies(location.lat, location.lng, maxDistance);
//     } catch (err) {
//       setLocationError(err.message);
//       setShowManualLocation(true);
//     } finally {
//       setIsLocating(false);
//     }
//   };

//   const handleManualLocation = () => {
//     if (!manualCity.trim()) {
//       setLocationError('Please enter a city name');
//       return;
//     }
//     setSelectedCity(manualCity.trim());
//     setIsNearMeMode(true);
//     setUserLocation(null);
//     setShowManualLocation(false);
//     fetchPharmaciesByCity(manualCity.trim());
//   };

//   const fetchPharmaciesByCity = async (city) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/pharmacies?city=${encodeURIComponent(city)}`);
//       const data = await response.json();
//       if (data.success) {
//         setPharmacies(data.data);
//         setIsNearMeMode(true);
//         setLocationError(null);
//       } else {
//         setError(`No pharmacies found in ${city}`);
//       }
//     } catch (err) {
//       setError('Error fetching pharmacies');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exitNearMeMode = () => {
//     setIsNearMeMode(false);
//     setUserLocation(null);
//     setLocationError(null);
//     setShowManualLocation(false);
//     setManualCity('');
//     setSelectedCity('all');
//     fetchAllPharmacies();
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setSelectedCity('all');
//     setSortBy('distance');
//     if (isNearMeMode) exitNearMeMode();
//     else fetchAllPharmacies();
//   };

//   useEffect(() => {
//     if (!isNearMeMode) fetchAllPharmacies();
//   }, [selectedCity, searchTerm, sortBy]);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
//         const data = await response.json();
//         if (data.success) setCities(data.data || []);
//       } catch (err) {}
//     };
//     fetchCities();
//   }, []);

//   if (loading && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 flex items-center gap-2">
//             <FaSyncAlt className="animate-spin" />
//             {isLocating ? 'Getting your location...' : 'Loading pharmacies...'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
//           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaSadTear className="w-10 h-10 text-red-400" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Pharmacies</h3>
//           <p className="text-gray-500 mb-6">{error}</p>
//           <button
//             onClick={() => { setError(null); fetchAllPharmacies(); }}
//             className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors inline-flex items-center gap-2"
//           >
//             <FaSyncAlt /> Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
//         <div className="container mx-auto px-4 py-16 md:py-20">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Trusted Pharmacy</h1>
//             <p className="text-[#c0d3dc] text-lg">Get authentic medicines delivered from verified pharmacies near you</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 pb-12">
//         {/* Search Section */}
//         <div className="max-w-4xl mx-auto -mt-8 mb-8">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//             <div className="p-6">
//               {/* Mode Indicator */}
//               {isNearMeMode && (
//                 <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-green-700">
//                     <FaMapMarkerAlt className="text-green-600" />
//                     <span className="text-sm">
//                       {userLocation ? `Showing pharmacies within ${maxDistance} km of your location` : `Showing pharmacies in ${selectedCity}`}
//                     </span>
//                   </div>
//                   <button
//                     onClick={exitNearMeMode}
//                     className="text-sm text-green-700 hover:text-green-900 font-medium"
//                   >
//                     Exit Mode
//                   </button>
//                 </div>
//               )}

//               {/* Manual Location Input */}
//               {showManualLocation && !isNearMeMode && (
//                 <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-sm text-yellow-800 mb-3">{locationError}</p>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter your city name..."
//                       value={manualCity}
//                       onChange={(e) => setManualCity(e.target.value)}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                       onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
//                     />
//                     <button
//                       onClick={handleManualLocation}
//                       className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#174047] transition-colors"
//                     >
//                       Search
//                     </button>
//                     <button
//                       onClick={handleNearMe}
//                       className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
//                     >
//                       Retry
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Search Bar */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="flex-1 relative">
//                   <input
//                     type="text"
//                     placeholder="Search pharmacies by name or location..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     disabled={isNearMeMode}
//                     className={`w-full px-4 py-3 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm ${isNearMeMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                   />
//                   <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-sm" />
//                 </div>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => !isNearMeMode && setShowFilters(!showFilters)}
//                     disabled={isNearMeMode}
//                     className={`px-5 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
//                       showFilters && !isNearMeMode
//                         ? 'bg-[#2c6774] text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     } ${isNearMeMode ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     <FaFilter size={14} /> Filters
//                   </button>
                  
//                   <button
//                     onClick={handleNearMe}
//                     disabled={isLocating}
//                     className={`px-5 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
//                       isNearMeMode
//                         ? 'bg-green-600 text-white'
//                         : 'bg-[#2c6774] text-white hover:bg-[#174047]'
//                     } ${isLocating ? 'opacity-50 cursor-wait' : ''}`}
//                   >
//                     <FaLocationArrow size={14} /> {isLocating ? 'Locating...' : isNearMeMode ? 'Near Me' : 'Near Me'}
//                   </button>
//                 </div>
//               </div>

//               {/* Radius Slider */}
//               {isNearMeMode && userLocation && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="text-sm font-medium text-gray-700">Search Radius</label>
//                     <span className="text-sm font-semibold text-[#2c6774]">{maxDistance} km</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="1"
//                     max="20"
//                     value={maxDistance}
//                     onChange={(e) => {
//                       const newDistance = parseInt(e.target.value);
//                       setMaxDistance(newDistance);
//                       if (userLocation) fetchNearbyPharmacies(userLocation.lat, userLocation.lng, newDistance);
//                     }}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2c6774]"
//                   />
//                 </div>
//               )}

//               {/* Filters Panel */}
//               {showFilters && !isNearMeMode && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">City</label>
//                       <select
//                         value={selectedCity}
//                         onChange={(e) => setSelectedCity(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white"
//                       >
//                         <option value="all">All Cities</option>
//                         {cities.map(city => (
//                           <option key={city} value={city}>{city}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Sort By</label>
//                       <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white"
//                       >
//                         <option value="name">Name (A-Z)</option>
//                         <option value="rating">Highest Rated</option>
//                         <option value="delivery">Fastest Delivery</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className="text-xs text-gray-500">{pharmacies.length} results</span>
//                     <button
//                       onClick={clearAllFilters}
//                       className="text-xs text-[#2c6774] hover:text-[#174047] font-medium"
//                     >
//                       Clear Filters
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Results Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {isNearMeMode ? 'Nearby Pharmacies' : 'All Pharmacies'}
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} available
//             {isNearMeMode && !userLocation && selectedCity !== 'all' && ` in ${selectedCity}`}
//           </p>
//         </div>

//         {/* Pharmacy Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {pharmacies.map((pharmacy) => {
//             const distance = pharmacy.distance ? pharmacy.distance / 1000 : 0;
//             const deliveryRadius = getDeliveryRadius(pharmacy);
//             const rating = pharmacy.rating || 4.5;
            
//             return (
//               <div
//                 key={pharmacy._id}
//                 className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
//               >
//                 {/* Image */}
//                 <div className="relative h-48 overflow-hidden bg-gray-100">
//                   <img
//                     src={pharmacy.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80'}
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80';
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
//                   <div className="absolute top-3 left-3">
//                     <span className="bg-white/95 backdrop-blur-sm text-[#2c6774] px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
//                       <FaMapPin size={10} /> {pharmacy.city}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4">
//                   <div className="flex items-start justify-between mb-2">
//                     <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1 flex-1">
//                       {pharmacy.name}
//                     </h3>
//                     {renderStars(rating)}
//                   </div>
                  
//                   <div className="mb-3">
//                     <div className="flex items-start text-gray-500 text-xs">
//                       <FaMapMarkerAlt className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
//                       <span className="line-clamp-2">{pharmacy.address}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
//                     <div className="flex items-center gap-1">
//                       <FaRegClock className="w-3 h-3" />
//                       <span>{pharmacy.deliveryTime || '15-20 min'}</span>
//                     </div>
//                     {isNearMeMode && userLocation && distance > 0 && (
//                       <div className="flex items-center gap-1">
//                         <FaLocationArrow className="w-3 h-3" />
//                         <span>{distance.toFixed(1)} km</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="mb-4">
//                     <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
//                       <FaTruck size={10} />
//                       Delivers up to {deliveryRadius} km
//                     </span>
//                   </div>
                  
//                   <Link
//                     to={`/pharmacies/${pharmacy._id}`}
//                     className="block w-full bg-gray-50 hover:bg-[#2c6774] text-gray-700 hover:text-white text-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border border-gray-200 hover:border-transparent"
//                   >
//                     View Pharmacy
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {pharmacies.length === 0 && !loading && (
//           <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaStore className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               {isNearMeMode ? 'No Pharmacies Found Nearby' : 'No Pharmacies Found'}
//             </h3>
//             <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
//               {isNearMeMode
//                 ? 'Try increasing your search radius or enter a different city.'
//                 : 'Try adjusting your search or filter criteria.'}
//             </p>
//             <button
//               onClick={clearAllFilters}
//               className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#174047] transition-colors"
//             >
//               {isNearMeMode ? 'Browse All Pharmacies' : 'Clear Filters'}
//             </button>
//           </div>
//         )}

//         {/* CTA Banner */}
//         <div className="mt-12 bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] rounded-xl overflow-hidden">
//           <div className="px-6 py-8 text-center">
//             <h3 className="text-xl font-bold text-white mb-2">Need Specific Medicines?</h3>
//             <p className="text-[#c0d3dc] text-sm mb-5">
//               Search our complete medicine database from all partner pharmacies
//             </p>
//             <Link
//               to="/medicines"
//               className="inline-flex items-center gap-2 bg-white text-[#2c6774] px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
//             >
//               <FaSearch size={14} /> Search All Medicines
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PharmacyPage;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaSearch, 
//   FaFilter, 
//   FaMapMarkerAlt, 
//   FaClock, 
//   FaShippingFast, 
//   FaExclamationTriangle,
//   FaSadTear,
//   FaMapPin,
//   FaSyncAlt,
//   FaLocationArrow,
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
//   FaTimes,
//   FaStore,
//   FaTruck,
//   FaPhoneAlt,
//   FaRegClock
// } from 'react-icons/fa';

// const PharmacyPage = () => {
//   const [pharmacies, setPharmacies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [isNearMeMode, setIsNearMeMode] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [maxDistance, setMaxDistance] = useState(5);
//   const [showManualLocation, setShowManualLocation] = useState(false);
//   const [manualCity, setManualCity] = useState('');
//   const [isLocating, setIsLocating] = useState(false);
  
//   const [cities, setCities] = useState([]);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('distance');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCity, setSelectedCity] = useState('all');

//   const getDeliveryRadius = (pharmacy) => pharmacy.deliveryRadius || 5;

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
//     return (
//       <div className="flex items-center gap-0.5">
//         {[...Array(fullStars)].map((_, i) => (
//           <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
//         ))}
//         {hasHalfStar && <FaStarHalfAlt className="w-3.5 h-3.5 text-yellow-400" />}
//         {[...Array(emptyStars)].map((_, i) => (
//           <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
//         ))}
//         <span className="ml-1.5 text-xs font-medium text-gray-600">{rating.toFixed(1)}</span>
//       </div>
//     );
//   };

//   const getUserLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported'));
//         return;
//       }
//       navigator.geolocation.getCurrentPosition(
//         (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
//         (error) => {
//           let msg = 'Unable to get location';
//           if (error.code === error.PERMISSION_DENIED) msg = 'Location permission denied. Please enable location access or enter your city manually.';
//           else if (error.code === error.POSITION_UNAVAILABLE) msg = 'Location unavailable. Try entering your city manually.';
//           else if (error.code === error.TIMEOUT) msg = 'Location request timed out. Try entering your city manually.';
//           else msg = 'Unknown location error. Try entering your city manually.';
//           reject(new Error(msg));
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//       );
//     });
//   };

//   const fetchNearbyPharmacies = async (lat, lng, distance) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         `http://localhost:5000/api/pharmacies/nearby?lat=${lat}&lng=${lng}&maxDistance=${distance * 1000}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setPharmacies(data.data);
//         setIsNearMeMode(true);
//         setShowManualLocation(false);
//       } else {
//         setError(data.message || 'Failed to fetch nearby pharmacies');
//       }
//     } catch (err) {
//       console.error('Error fetching nearby pharmacies:', err);
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllPharmacies = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params = new URLSearchParams();
//       if (selectedCity !== 'all') params.append('city', selectedCity);
//       if (searchTerm) params.append('search', searchTerm);
//       if (sortBy && sortBy !== 'distance') params.append('sort', sortBy);
//       const queryString = params.toString();
//       const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.success) {
//         setPharmacies(data.data);
//         setIsNearMeMode(false);
//       } else {
//         setError(data.message || 'Failed to fetch pharmacies');
//       }
//     } catch (err) {
//       console.error('Error fetching pharmacies:', err);
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNearMe = async () => {
//     try {
//       setLocationError(null);
//       setError(null);
//       setIsLocating(true);
//       const location = await getUserLocation();
//       setUserLocation(location);
//       await fetchNearbyPharmacies(location.lat, location.lng, maxDistance);
//     } catch (err) {
//       setLocationError(err.message);
//       setShowManualLocation(true);
//     } finally {
//       setIsLocating(false);
//     }
//   };

//   const handleManualLocation = () => {
//     if (!manualCity.trim()) {
//       setLocationError('Please enter a city name');
//       return;
//     }
//     setSelectedCity(manualCity.trim());
//     setIsNearMeMode(true);
//     setUserLocation(null);
//     setShowManualLocation(false);
//     fetchPharmaciesByCity(manualCity.trim());
//   };

//   const fetchPharmaciesByCity = async (city) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`http://localhost:5000/api/pharmacies?city=${encodeURIComponent(city)}`);
//       const data = await response.json();
//       if (data.success) {
//         setPharmacies(data.data);
//         setIsNearMeMode(true);
//         setLocationError(null);
//       } else {
//         setError(`No pharmacies found in ${city}`);
//       }
//     } catch (err) {
//       setError('Error fetching pharmacies');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exitNearMeMode = () => {
//     setIsNearMeMode(false);
//     setUserLocation(null);
//     setLocationError(null);
//     setShowManualLocation(false);
//     setManualCity('');
//     setSelectedCity('all');
//     fetchAllPharmacies();
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setSelectedCity('all');
//     setSortBy('distance');
//     if (isNearMeMode) exitNearMeMode();
//     else fetchAllPharmacies();
//   };

//   useEffect(() => {
//     if (!isNearMeMode) fetchAllPharmacies();
//   }, [selectedCity, searchTerm, sortBy]);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/pharmacies/cities');
//         const data = await response.json();
//         if (data.success) setCities(data.data || []);
//       } catch (err) {}
//     };
//     fetchCities();
//   }, []);

//   if (loading && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 flex items-center gap-2">
//             <FaSyncAlt className="animate-spin" />
//             {isLocating ? 'Getting your location...' : 'Loading pharmacies...'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error && pharmacies.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
//           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaSadTear className="w-10 h-10 text-red-400" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Pharmacies</h3>
//           <p className="text-gray-500 mb-6">{error}</p>
//           <button
//             onClick={() => { setError(null); fetchAllPharmacies(); }}
//             className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors inline-flex items-center gap-2"
//           >
//             <FaSyncAlt /> Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
//         <div className="container mx-auto px-4 py-16 md:py-20">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Trusted Pharmacy</h1>
//             <p className="text-[#c0d3dc] text-lg">Get authentic medicines delivered from verified pharmacies near you</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 pb-12">
//         {/* Search Section */}
//         <div className="max-w-4xl mx-auto -mt-8 mb-8">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200">
//             <div className="p-6">
//               {/* Mode Indicator */}
//               {isNearMeMode && (
//                 <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-green-700">
//                     <FaMapMarkerAlt className="text-green-600" />
//                     <span className="text-sm">
//                       {userLocation ? `Showing pharmacies within ${maxDistance} km of your location` : `Showing pharmacies in ${selectedCity}`}
//                     </span>
//                   </div>
//                   <button
//                     onClick={exitNearMeMode}
//                     className="text-sm text-green-700 hover:text-green-900 font-medium"
//                   >
//                     Exit Mode
//                   </button>
//                 </div>
//               )}

//               {/* Manual Location Input */}
//               {showManualLocation && !isNearMeMode && (
//                 <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-sm text-yellow-800 mb-3">{locationError}</p>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter your city name..."
//                       value={manualCity}
//                       onChange={(e) => setManualCity(e.target.value)}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                       onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
//                     />
//                     <button
//                       onClick={handleManualLocation}
//                       className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#174047] transition-colors"
//                     >
//                       Search
//                     </button>
//                     <button
//                       onClick={handleNearMe}
//                       className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
//                     >
//                       Retry
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Search Bar */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="flex-1 relative">
//                   <input
//                     type="text"
//                     placeholder="Search pharmacies by name or location..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     disabled={isNearMeMode}
//                     className={`w-full px-4 py-3 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm ${isNearMeMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//                   />
//                   <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-sm" />
//                 </div>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => !isNearMeMode && setShowFilters(!showFilters)}
//                     disabled={isNearMeMode}
//                     className={`px-5 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
//                       showFilters && !isNearMeMode
//                         ? 'bg-[#2c6774] text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     } ${isNearMeMode ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     <FaFilter size={14} /> Filters
//                   </button>
                  
//                   <button
//                     onClick={handleNearMe}
//                     disabled={isLocating}
//                     className={`px-5 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${
//                       isNearMeMode
//                         ? 'bg-green-600 text-white'
//                         : 'bg-[#2c6774] text-white hover:bg-[#174047]'
//                     } ${isLocating ? 'opacity-50 cursor-wait' : ''}`}
//                   >
//                     <FaLocationArrow size={14} /> {isLocating ? 'Locating...' : isNearMeMode ? 'Near Me' : 'Near Me'}
//                   </button>
//                 </div>
//               </div>

//               {/* Radius Slider */}
//               {isNearMeMode && userLocation && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="text-sm font-medium text-gray-700">Search Radius</label>
//                     <span className="text-sm font-semibold text-[#2c6774]">{maxDistance} km</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="1"
//                     max="20"
//                     value={maxDistance}
//                     onChange={(e) => {
//                       const newDistance = parseInt(e.target.value);
//                       setMaxDistance(newDistance);
//                       if (userLocation) fetchNearbyPharmacies(userLocation.lat, userLocation.lng, newDistance);
//                     }}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2c6774]"
//                   />
//                 </div>
//               )}

//               {/* Filters Panel */}
//               {showFilters && !isNearMeMode && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">City</label>
//                       <select
//                         value={selectedCity}
//                         onChange={(e) => setSelectedCity(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white"
//                       >
//                         <option value="all">All Cities</option>
//                         {cities.map(city => (
//                           <option key={city} value={city}>{city}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Sort By</label>
//                       <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white"
//                       >
//                         <option value="name">Name (A-Z)</option>
//                         <option value="rating">Highest Rated</option>
//                         <option value="delivery">Fastest Delivery</option>
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className="text-xs text-gray-500">{pharmacies.length} results</span>
//                     <button
//                       onClick={clearAllFilters}
//                       className="text-xs text-[#2c6774] hover:text-[#174047] font-medium"
//                     >
//                       Clear Filters
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Results Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {isNearMeMode ? 'Nearby Pharmacies' : 'All Pharmacies'}
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} available
//             {isNearMeMode && !userLocation && selectedCity !== 'all' && ` in ${selectedCity}`}
//           </p>
//         </div>

//         {/* Pharmacy Grid - Fixed Card Heights */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {pharmacies.map((pharmacy) => {
//             const distance = pharmacy.distance ? pharmacy.distance / 1000 : 0;
//             const deliveryRadius = getDeliveryRadius(pharmacy);
//             const rating = pharmacy.rating || 4.5;
            
//             return (
//               <div
//                 key={pharmacy._id}
//                 className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
//               >
//                 {/* Image - Fixed Height */}
//                 <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
//                   <img
//                     src={pharmacy.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80'}
//                     alt={pharmacy.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80';
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
//                   <div className="absolute top-3 left-3">
//                     <span className="bg-white/95 backdrop-blur-sm text-[#2c6774] px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
//                       <FaMapPin size={10} /> {pharmacy.city}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content - Flexible but with consistent spacing */}
//                 <div className="p-4 flex flex-col flex-1">
//                   {/* Header with name and rating */}
//                   <div className="flex items-start justify-between gap-2 mb-2 flex-shrink-0">
//                     <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1 flex-1">
//                       {pharmacy.name}
//                     </h3>
//                     <div className="flex-shrink-0">
//                       {renderStars(rating)}
//                     </div>
//                   </div>
                  
//                   {/* Address */}
//                   <div className="mb-3 flex-shrink-0">
//                     <div className="flex items-start text-gray-500 text-xs">
//                       <FaMapMarkerAlt className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
//                       <span className="line-clamp-2 leading-relaxed">{pharmacy.address}</span>
//                     </div>
//                   </div>
                  
//                   {/* Delivery Info */}
//                   <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 flex-shrink-0">
//                     <div className="flex items-center gap-1">
//                       <FaRegClock className="w-3 h-3" />
//                       <span>{pharmacy.deliveryTime || '15-20 min'}</span>
//                     </div>
//                     {isNearMeMode && userLocation && distance > 0 && (
//                       <div className="flex items-center gap-1">
//                         <FaLocationArrow className="w-3 h-3" />
//                         <span>{distance.toFixed(1)} km</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Delivery Radius Badge */}
//                   <div className="mb-4 flex-shrink-0">
//                     <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
//                       <FaTruck size={10} />
//                       Delivers up to {deliveryRadius} km
//                     </span>
//                   </div>
                  
//                   {/* Button - Always at bottom */}
//                   <div className="mt-auto flex-shrink-0">
//                     <Link
//                       to={`/pharmacies/${pharmacy._id}`}
//                       className="block w-full bg-gray-50 hover:bg-[#2c6774] text-gray-700 hover:text-white text-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border border-gray-200 hover:border-transparent"
//                     >
//                       View Pharmacy
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {pharmacies.length === 0 && !loading && (
//           <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaStore className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               {isNearMeMode ? 'No Pharmacies Found Nearby' : 'No Pharmacies Found'}
//             </h3>
//             <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
//               {isNearMeMode
//                 ? 'Try increasing your search radius or enter a different city.'
//                 : 'Try adjusting your search or filter criteria.'}
//             </p>
//             <button
//               onClick={clearAllFilters}
//               className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#174047] transition-colors"
//             >
//               {isNearMeMode ? 'Browse All Pharmacies' : 'Clear Filters'}
//             </button>
//           </div>
//         )}

//         {/* CTA Banner */}
//         {/* <div className="mt-12 bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] rounded-xl overflow-hidden">
//           <div className="px-6 py-8 text-center">
//             <h3 className="text-xl font-bold text-white mb-2">Need Specific Medicines?</h3>
//             <p className="text-[#c0d3dc] text-sm mb-5">
//               Search our complete medicine database from all partner pharmacies
//             </p>
//             <Link
//               to="/medicines"
//               className="inline-flex items-center gap-2 bg-white text-[#2c6774] px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
//             >
//               <FaSearch size={14} /> Search All Medicines
//             </Link>
//           </div>
//         </div> */}
//         <div className="mt-12">
//   <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-2xl p-0.5 shadow-xl">
//     <div className="bg-white rounded-2xl p-8">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="flex items-center gap-4">
//           <div className="w-14 h-14 bg-[#2c6774]/10 rounded-full flex items-center justify-center">
//             <FaSearch className="w-6 h-6 text-[#2c6774]" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-800">Need Specific Medicines?</h3>
//             <p className="text-gray-500 text-sm">
//               Search our complete medicine database from all partner pharmacies
//             </p>
//           </div>
//         </div>
//         <Link
//           to="/medicines"
//           className="inline-flex items-center gap-2 bg-[#2c6774] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#174047] transition-colors shadow-md whitespace-nowrap"
//         >
//           <FaSearch size={14} />
//           Search All Medicines
//         </Link>
//       </div>
//     </div>
//   </div>
// </div>
//       </div>

//       {/* Add these styles to your CSS file or use a CSS module */}
//       <style jsx>{`
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PharmacyPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaClock, 
  FaShippingFast, 
  FaExclamationTriangle,
  FaSadTear,
  FaMapPin,
  FaSyncAlt,
  FaLocationArrow,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTimes,
  FaStore,
  FaTruck,
  FaPhoneAlt,
  FaRegClock,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isNearMeMode, setIsNearMeMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [manualCity, setManualCity] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  
  const [cities, setCities] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');

  const getDeliveryRadius = (pharmacy) => pharmacy.deliveryRadius || 5;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="w-3.5 h-3.5 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
        <span className="ml-1.5 text-xs font-medium text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => {
          let msg = 'Unable to get location';
          if (error.code === error.PERMISSION_DENIED) msg = 'Location permission denied. Please enable location access or enter your city manually.';
          else if (error.code === error.POSITION_UNAVAILABLE) msg = 'Location unavailable. Try entering your city manually.';
          else if (error.code === error.TIMEOUT) msg = 'Location request timed out. Try entering your city manually.';
          else msg = 'Unknown location error. Try entering your city manually.';
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  };

  const fetchNearbyPharmacies = async (lat, lng, distance) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/pharmacies/nearby?lat=${lat}&lng=${lng}&maxDistance=${distance * 1000}`
      );
      const data = await response.json();
      if (data.success) {
        setPharmacies(data.data);
        setIsNearMeMode(true);
        setShowManualLocation(false);
      } else {
        setError(data.message || 'Failed to fetch nearby pharmacies');
      }
    } catch (err) {
      console.error('Error fetching nearby pharmacies:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy && sortBy !== 'distance') params.append('sort', sortBy);
      const queryString = params.toString();
      const url = `http://localhost:5000/api/pharmacies${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setPharmacies(data.data);
        setIsNearMeMode(false);
      } else {
        setError(data.message || 'Failed to fetch pharmacies');
      }
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleNearMe = async () => {
    try {
      setLocationError(null);
      setError(null);
      setIsLocating(true);
      const location = await getUserLocation();
      setUserLocation(location);
      await fetchNearbyPharmacies(location.lat, location.lng, maxDistance);
    } catch (err) {
      setLocationError(err.message);
      setShowManualLocation(true);
    } finally {
      setIsLocating(false);
    }
  };

  const handleManualLocation = () => {
    if (!manualCity.trim()) {
      setLocationError('Please enter a city name');
      return;
    }
    setSelectedCity(manualCity.trim());
    setIsNearMeMode(true);
    setUserLocation(null);
    setShowManualLocation(false);
    fetchPharmaciesByCity(manualCity.trim());
  };

  const fetchPharmaciesByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/pharmacies?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      if (data.success) {
        setPharmacies(data.data);
        setIsNearMeMode(true);
        setLocationError(null);
      } else {
        setError(`No pharmacies found in ${city}`);
      }
    } catch (err) {
      setError('Error fetching pharmacies');
    } finally {
      setLoading(false);
    }
  };

  const exitNearMeMode = () => {
    setIsNearMeMode(false);
    setUserLocation(null);
    setLocationError(null);
    setShowManualLocation(false);
    setManualCity('');
    setSelectedCity('all');
    fetchAllPharmacies();
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSortBy('distance');
    if (isNearMeMode) exitNearMeMode();
    else fetchAllPharmacies();
  };

  useEffect(() => {
    if (!isNearMeMode) fetchAllPharmacies();
  }, [selectedCity, searchTerm, sortBy]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies/cities');
        const data = await response.json();
        if (data.success) setCities(data.data || []);
      } catch (err) {}
    };
    fetchCities();
  }, []);

  if (loading && pharmacies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
          <p className="mt-4 text-gray-600 flex items-center gap-2">
            <FaSyncAlt className="animate-spin" />
            {isLocating ? 'Getting your location...' : 'Loading pharmacies...'}
          </p>
        </div>
      </div>
    );
  }

  if (error && pharmacies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSadTear className="w-10 h-10 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Pharmacies</h3>
          <p className="text-gray-500 mb-6 text-sm">{error}</p>
          <button
            onClick={() => { setError(null); fetchAllPharmacies(); }}
            className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors inline-flex items-center gap-2"
          >
            <FaSyncAlt /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Find Your Trusted Pharmacy
            </h1>
            <p className="text-[#c0d3dc] text-sm sm:text-base md:text-lg">
              Get authentic medicines delivered from verified pharmacies near you
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto -mt-6 md:-mt-8 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-4 sm:p-6">
              {/* Mode Indicator */}
              {isNearMeMode && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-green-700">
                    <FaMapMarkerAlt className="text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      {userLocation ? `Showing pharmacies within ${maxDistance} km of your location` : `Showing pharmacies in ${selectedCity}`}
                    </span>
                  </div>
                  <button
                    onClick={exitNearMeMode}
                    className="text-sm text-green-700 hover:text-green-900 font-medium"
                  >
                    Exit Mode
                  </button>
                </div>
              )}

              {/* Manual Location Input */}
              {showManualLocation && !isNearMeMode && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-3">{locationError}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Enter your city name..."
                      value={manualCity}
                      onChange={(e) => setManualCity(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                      onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleManualLocation}
                        className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#174047] transition-colors"
                      >
                        Search
                      </button>
                      <button
                        onClick={handleNearMe}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search pharmacies by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isNearMeMode}
                    className={`w-full px-4 py-3 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm ${isNearMeMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => !isNearMeMode && setShowFilters(!showFilters)}
                    disabled={isNearMeMode}
                    className={`px-4 sm:px-5 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 text-sm ${
                      showFilters && !isNearMeMode
                        ? 'bg-[#2c6774] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${isNearMeMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <FaFilter size={14} /> Filters
                  </button>
                  
                  <button
                    onClick={handleNearMe}
                    disabled={isLocating}
                    className={`px-4 sm:px-5 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 text-sm ${
                      isNearMeMode
                        ? 'bg-green-600 text-white'
                        : 'bg-[#2c6774] text-white hover:bg-[#174047]'
                    } ${isLocating ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    <FaLocationArrow size={14} /> {isLocating ? 'Locating...' : 'Near Me'}
                  </button>
                </div>
              </div>

              {/* Radius Slider */}
              {isNearMeMode && userLocation && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Search Radius</label>
                    <span className="text-sm font-semibold text-[#2c6774]">{maxDistance} km</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={maxDistance}
                    onChange={(e) => {
                      const newDistance = parseInt(e.target.value);
                      setMaxDistance(newDistance);
                      if (userLocation) fetchNearbyPharmacies(userLocation.lat, userLocation.lng, newDistance);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2c6774]"
                  />
                </div>
              )}

              {/* Filters Panel */}
              {showFilters && !isNearMeMode && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">City</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white"
                      >
                        <option value="all">All Cities</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white"
                      >
                        <option value="name">Name (A-Z)</option>
                        <option value="rating">Highest Rated</option>
                        <option value="delivery">Fastest Delivery</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{pharmacies.length} results</span>
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#2c6774] hover:text-[#174047] font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isNearMeMode ? 'Nearby Pharmacies' : 'All Pharmacies'}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} available
            {isNearMeMode && !userLocation && selectedCity !== 'all' && ` in ${selectedCity}`}
          </p>
        </div>

        {/* Pharmacy Grid - Improved responsive grid with better margins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {pharmacies.map((pharmacy) => {
            const distance = pharmacy.distance ? pharmacy.distance / 1000 : 0;
            const deliveryRadius = getDeliveryRadius(pharmacy);
            const rating = pharmacy.rating || 4.5;
            
            return (
              <div
                key={pharmacy._id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image - Responsive height */}
                <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={pharmacy.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80'}
                    alt={pharmacy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-[#2c6774] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                      <FaMapPin size={10} /> {pharmacy.city}
                    </span>
                  </div>
                </div>

                {/* Content - Responsive padding */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  {/* Header with name and rating */}
                  <div className="flex items-start justify-between gap-2 mb-2 flex-shrink-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight line-clamp-1 flex-1">
                      {pharmacy.name}
                    </h3>
                    <div className="flex-shrink-0">
                      {renderStars(rating)}
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="mb-2 sm:mb-3 flex-shrink-0">
                    <div className="flex items-start text-gray-500 text-xs">
                      <FaMapMarkerAlt className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2 leading-relaxed text-xs">{pharmacy.address}</span>
                    </div>
                  </div>
                  
                  {/* Delivery Info */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs text-gray-500 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <FaRegClock className="w-3 h-3" />
                      <span>{pharmacy.deliveryTime || '15-20 min'}</span>
                    </div>
                    {isNearMeMode && userLocation && distance > 0 && (
                      <div className="flex items-center gap-1">
                        <FaLocationArrow className="w-3 h-3" />
                        <span>{distance.toFixed(1)} km</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Delivery Radius Badge */}
                  <div className="mb-3 sm:mb-4 flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                      <FaTruck size={10} />
                      Delivers up to {deliveryRadius} km
                    </span>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="mt-auto flex-shrink-0">
                    <Link
                      to={`/pharmacies/${pharmacy._id}`}
                      className="block w-full bg-gray-50 hover:bg-[#2c6774] text-gray-700 hover:text-white text-center py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-gray-200 hover:border-transparent"
                    >
                      View Pharmacy
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {pharmacies.length === 0 && !loading && (
          <div className="text-center py-12 sm:py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaStore className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {isNearMeMode ? 'No Pharmacies Found Nearby' : 'No Pharmacies Found'}
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto px-4">
              {isNearMeMode
                ? 'Try increasing your search radius or enter a different city.'
                : 'Try adjusting your search or filter criteria.'}
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#174047] transition-colors"
            >
              {isNearMeMode ? 'Browse All Pharmacies' : 'Clear Filters'}
            </button>
          </div>
        )}

        {/* CTA Banner - Responsive */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] rounded-xl sm:rounded-2xl p-0.5 shadow-xl">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#2c6774]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaSearch className="w-5 h-5 sm:w-6 sm:h-6 text-[#2c6774]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Need Specific Medicines?</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Search our complete medicine database from all partner pharmacies
                    </p>
                  </div>
                </div>
                <Link
                  to="/medicines"
                  className="inline-flex items-center gap-2 bg-[#2c6774] text-white px-5 sm:px-6 py-2 rounded-xl font-semibold hover:bg-[#174047] transition-colors shadow-md whitespace-nowrap text-sm sm:text-base"
                >
                  <FaSearch size={14} />
                  Search All Medicines
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your CSS file or use a CSS module */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Responsive container padding */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 769px) {
          .container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PharmacyPage;