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
  FaMapPin as FaMapMarker
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

  // Handle manual city-based location
  const handleManualLocation = () => {
    if (!manualCity.trim()) {
      setLocationError('Please enter a city name');
      return;
    }
    setSelectedCity(manualCity.trim());
    setIsNearMeMode(true);
    setUserLocation(null);
    setShowManualLocation(false);
    // Fetch pharmacies filtered by the entered city
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
        <div className="text-lg text-[#2c6774] flex items-center gap-2">
          <FaSyncAlt className="animate-spin" />
          {isLocating ? 'Getting your location...' : 'Loading pharmacies...'}
        </div>
      </div>
    );
  }

  if (error && pharmacies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <FaSadTear className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={() => { setError(null); fetchAllPharmacies(); }}
          className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-2">
          <FaSyncAlt /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Trusted Pharmacy</h1>
            <p className="text-[#c0d3dc] text-lg">Get authentic medicines delivered from verified pharmacies near you</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {isNearMeMode && userLocation && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-700">
                  <FaMapMarkerAlt />
                  <span className="text-sm">Showing pharmacies within {maxDistance} km of your location</span>
                </div>
                <button onClick={exitNearMeMode} className="text-sm text-green-700 hover:text-green-900 underline">
                  Exit Near Me Mode
                </button>
              </div>
            )}
            
            {isNearMeMode && !userLocation && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700">
                  <FaMapMarkerAlt />
                  <span className="text-sm">Showing pharmacies in selected area</span>
                </div>
                <button onClick={exitNearMeMode} className="text-sm text-blue-700 hover:text-blue-900 underline">
                  Exit Near Me Mode
                </button>
              </div>
            )}

            {/* Location Permission Denied - Show manual input */}
            {showManualLocation && !isNearMeMode && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-700 mb-2">
                  <FaExclamationTriangle />
                  <span className="text-sm font-medium">Location Error</span>
                </div>
                <p className="text-sm text-yellow-700 mb-3">{locationError}</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter your city name..."
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
                    onKeyDown={(e) => e.key === 'Enter' && handleManualLocation()}
                  />
                  <button
                    onClick={handleManualLocation}
                    className="px-4 py-2 bg-[#2c6774] text-white rounded-lg text-sm font-medium hover:bg-[#1e4e56]"
                  >
                    Search
                  </button>
                  <button
                    onClick={handleNearMe}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search pharmacies by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isNearMeMode}
                    className={`w-full px-5 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm ${isNearMeMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  <FaSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => !isNearMeMode && setShowFilters(!showFilters)}
                  disabled={isNearMeMode}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    showFilters && !isNearMeMode ? 'bg-[#2c6774] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${isNearMeMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaFilter /> Filters
                </button>
                <button
                  onClick={handleNearMe}
                  disabled={isLocating}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md ${
                    isNearMeMode ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white hover:from-[#1e4e56] hover:to-[#174047]'
                  } ${isLocating ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <FaMapMarkerAlt /> {isLocating ? 'Locating...' : isNearMeMode ? 'Near Me Active' : 'Near Me'}
                </button>
              </div>
            </div>

            {isNearMeMode && userLocation && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Radius: {maxDistance} km
                </label>
                <input
                  type="range" min="1" max="20" value={maxDistance}
                  onChange={(e) => {
                    const newDistance = parseInt(e.target.value);
                    setMaxDistance(newDistance);
                    if (userLocation) fetchNearbyPharmacies(userLocation.lat, userLocation.lng, newDistance);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2c6774]"
                />
              </div>
            )}

            {showFilters && !isNearMeMode && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">City</label>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]">
                      <option value="all">All Cities</option>
                      {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]">
                      <option value="name">Name</option>
                      <option value="rating">Highest Rated</option>
                      <option value="delivery">Fastest Delivery</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-600">{pharmacies.length} results</span>
                  <button onClick={clearAllFilters} className="text-xs text-[#2c6774] hover:text-[#1e4e56] font-medium">
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isNearMeMode ? 'Nearby Pharmacies' : 'Available Pharmacies'}
          </h2>
          <p className="text-gray-600 mt-2">
            {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
            {isNearMeMode && !userLocation && selectedCity !== 'all' && ` in ${selectedCity}`}
            {isNearMeMode && userLocation && ` • Within ${maxDistance} km`}
          </p>
        </div>

        {/* Pharmacy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {pharmacies.map((pharmacy) => {
            const distance = pharmacy.distance ? pharmacy.distance / 1000 : 0;
            const deliveryRadius = getDeliveryRadius(pharmacy);
            return (
              <div key={pharmacy._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-36">
                  <img src={pharmacy.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60'}
                    alt={pharmacy.name} className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#2c6774] text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <FaMapMarker className="w-3 h-3" /> {pharmacy.city}
                    </span>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{pharmacy.name}</h3>
                  <div className="mb-2">
                    <div className="flex items-start text-gray-600">
                      <FaMapMarkerAlt className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                      <div className="text-xs leading-tight">{pharmacy.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs mb-2">
                    <FaClock className="w-3 h-3 text-gray-400 mr-1" />
                    <span>{pharmacy.deliveryTime || '15-20 mins'}</span>
                    {isNearMeMode && userLocation && distance > 0 && (
                      <>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <FaLocationArrow className="w-3 h-3" /> {distance.toFixed(1)} km
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mb-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1 w-fit">
                      <FaShippingFast className="w-3 h-3" />
                      Radius: {deliveryRadius} km
                    </span>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/pharmacies/${pharmacy._id}`}
                      className="block w-full bg-gradient-to-r from-[#2c6774] to-[#174047] text-white text-center py-2 rounded text-xs font-semibold transition-all hover:from-[#1e4e56] hover:to-[#174047]">
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
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200 shadow-sm">
            <FaSadTear className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {isNearMeMode ? 'No pharmacies nearby' : 'No pharmacies found'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {isNearMeMode ? 'Try a different city or increase the search radius.' : 'Try adjusting your search criteria'}
            </p>
            <button onClick={clearAllFilters}
              className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded text-sm font-semibold">
              {isNearMeMode ? 'Show All Pharmacies' : 'Clear Filters'}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Need Specific Medicines?</h3>
          <p className="text-[#c0d3dc] mb-4 max-w-md mx-auto">Search our complete medicine database from all partner pharmacies</p>
          <Link to="/medicines" className="inline-flex items-center bg-white text-[#2c6774] px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-all">
            <FaSearch className="mr-2" /> Search All Medicines
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;