import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCheckCircle, 
  FaShippingFast, 
  FaHeadset, 
  FaShieldAlt,
  FaExclamationTriangle,
  FaSadTear,
  FaMapPin,
  FaSyncAlt,
  FaLocationArrow,
  FaTruck
} from 'react-icons/fa';

const PharmacyPage = () => {
  // State for pharmacies
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Separate states for Near Me mode
  const [isNearMeMode, setIsNearMeMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5); // km
  
  // Stats state
  const [stats, setStats] = useState({
    totalPharmacies: 0,
    cities: 0,
    avgDelivery: '30 mins',
    authenticity: '100%'
  });
  
  // Cities state
  const [cities, setCities] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');

  // Calculate delivery fee based on distance
  const calculateDeliveryFee = (distanceInKm) => {
    if (!distanceInKm && distanceInKm !== 0) return 0;
    
    // Base rate: Rs. 150 for 5 km
    const baseRate = 150;
    const baseDistance = 5;
    
    // Calculate fee: (distance / baseDistance) * baseRate
    let fee = (distanceInKm / baseDistance) * baseRate;
    
    // Round to nearest integer
    return Math.round(fee);
  };

  // Format delivery fee with currency
  const formatDeliveryFee = (distanceInKm) => {
    const fee = calculateDeliveryFee(distanceInKm);
    return `Rs. ${fee}`;
  };

  // Get delivery radius from pharmacy settings
  const getDeliveryRadius = (pharmacy) => {
    return pharmacy.deliveryRadius || 5;
  };

  // UI-only data for features
  const features = [
    {
      icon: <FaCheckCircle className="w-6 h-6" />,
      title: 'Verified Pharmacies',
      description: 'All pharmacies are certified and authenticated'
    },
    {
      icon: <FaShippingFast className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Get medicines delivered within 30 minutes'
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support available'
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Safe and encrypted payment methods'
    }
  ];

  // Function to truncate address
  const truncateAddress = (address, maxLines = 2) => {
    if (!address) return '';
    
    const words = address.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (const word of words) {
      if (currentLine.length + word.length + 1 <= 30) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (lines.length < maxLines - 1) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine += '...';
          break;
        }
      }
    }
    
    if (currentLine && lines.length < maxLines) {
      lines.push(currentLine);
    }
    
    return lines.slice(0, maxLines).join(' ');
  };

  // Get user's location for viewing nearby pharmacies
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'Unknown location error';
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  // Fetch nearby pharmacies
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

  // Fetch regular pharmacies (all approved)
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

  // Handle "Near Me" button click
  const handleNearMe = async () => {
    try {
      setLocationError(null);
      const location = await getUserLocation();
      setUserLocation(location);
      await fetchNearbyPharmacies(location.lat, location.lng, maxDistance);
    } catch (err) {
      setLocationError(err.message);
      setError(err.message);
    }
  };

  // Exit Near Me mode
  const exitNearMeMode = () => {
    setIsNearMeMode(false);
    setUserLocation(null);
    setLocationError(null);
    fetchAllPharmacies();
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSortBy('distance');
    
    if (isNearMeMode) {
      exitNearMeMode();
    } else {
      fetchAllPharmacies();
    }
  };

  // Initial load and filter changes
  useEffect(() => {
    if (!isNearMeMode) {
      fetchAllPharmacies();
    }
  }, [selectedCity, searchTerm, sortBy]);

  // Fetch stats
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

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies/cities');
        const data = await response.json();
        
        if (data.success) {
          setCities(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };
    
    fetchCities();
  }, []);

  // Loading state
  if (loading && pharmacies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-[#2c6774] flex items-center gap-2">
          <FaSyncAlt className="animate-spin" />
          Loading pharmacies...
        </div>
      </div>
    );
  }

  // Error state
  if (error && pharmacies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <FaExclamationTriangle className="w-16 h-16 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchAllPharmacies();
          }}
          className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors flex items-center gap-2"
        >
          <FaSyncAlt />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#5c878f] text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Find Your Trusted Pharmacy
            </h1>
            <p className="text-[#c0d3dc] text-lg md:text-xl leading-relaxed">
              Get authentic medicines delivered or ready for pickup from verified pharmacies
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.totalPharmacies || 0}</div>
            <div className="text-sm text-gray-600 mt-2">Pharmacies</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.avgDelivery}</div>
            <div className="text-sm text-gray-600 mt-2">Avg Delivery</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.authenticity}</div>
            <div className="text-sm text-gray-600 mt-2">Authentic</div>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#2c6774]">{stats.cities || 0}</div>
            <div className="text-sm text-gray-600 mt-2">Cities</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {/* Near Me Mode Banner */}
            {isNearMeMode && userLocation && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-700">
                  <FaMapMarkerAlt />
                  <span className="text-sm">
                    Showing pharmacies within {maxDistance} km of your location
                  </span>
                </div>
                <button
                  onClick={exitNearMeMode}
                  className="text-sm text-green-700 hover:text-green-900 underline"
                >
                  Exit Near Me Mode
                </button>
              </div>
            )}

            {/* Location Error */}
            {locationError && !isNearMeMode && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-700">
                  <FaExclamationTriangle />
                  <span className="text-sm">{locationError}</span>
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
                    className={`w-full px-5 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] text-sm ${
                      isNearMeMode ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                  <FaSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => !isNearMeMode && setShowFilters(!showFilters)}
                  disabled={isNearMeMode}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    showFilters && !isNearMeMode
                      ? 'bg-[#2c6774] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${isNearMeMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaFilter />
                  Filters
                </button>
                
                {/* Near Me Button */}
                <button 
                  onClick={handleNearMe}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md ${
                    isNearMeMode
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white hover:from-[#1e4e56] hover:to-[#174047]'
                  }`}
                >
                  <FaMapMarkerAlt />
                  {isNearMeMode ? 'Near Me Active' : 'Near Me'}
                </button>
              </div>
            </div>

            {/* Distance Slider - Only in Near Me mode */}
            {isNearMeMode && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Radius: {maxDistance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDistance}
                  onChange={(e) => {
                    const newDistance = parseInt(e.target.value);
                    setMaxDistance(newDistance);
                    if (userLocation) {
                      fetchNearbyPharmacies(userLocation.lat, userLocation.lng, newDistance);
                    }
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2c6774]"
                />
                {/* Delivery fee info */}
                <p className="text-xs text-gray-500 mt-2">
                  Delivery fee for {maxDistance} km: {formatDeliveryFee(maxDistance)}
                </p>
              </div>
            )}

            {/* Filters - Only when NOT in Near Me mode */}
            {showFilters && !isNearMeMode && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                    >
                      <option value="all">All Cities</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2c6774]"
                    >
                      <option value="name">Name</option>
                      <option value="rating">Highest Rated</option>
                      <option value="delivery">Fastest Delivery</option>
                    </select>
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
          <h2 className="text-2xl font-bold text-gray-900">
            {isNearMeMode ? 'Nearby Pharmacies' : 'Available Pharmacies'}
          </h2>
          <p className="text-gray-600 mt-2">
            {pharmacies.length} pharmacy{pharmacies.length !== 1 ? 's' : ''} found
            {selectedCity !== 'all' && !isNearMeMode && ` in ${selectedCity}`}
            {isNearMeMode && ` • Within ${maxDistance} km`}
          </p>
        </div>

        {/* Pharmacy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {pharmacies.map((pharmacy) => {
            // Calculate distance-based delivery fee for this pharmacy
            const distance = pharmacy.distance ? pharmacy.distance / 1000 : 0;
            const deliveryFee = calculateDeliveryFee(distance);
            const deliveryRadius = getDeliveryRadius(pharmacy);
            
            return (
              <div 
                key={pharmacy._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative h-36">
                  <img 
                    src={pharmacy.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60'} 
                    alt={pharmacy.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=60';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#2c6774] text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                      <FaMapPin className="w-3 h-3" />
                      {pharmacy.city}
                    </span>
                  </div>
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{pharmacy.name}</h3>
                  
                  <div className="mb-2 min-h-[2.5rem] max-h-[2.5rem] overflow-hidden">
                    <div className="flex items-start text-gray-600">
                      <FaMapMarkerAlt className="w-3 h-3 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                      <div className="text-xs leading-tight">
                        {truncateAddress(pharmacy.address)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-xs mb-2">
                    <FaClock className="w-3 h-3 text-gray-400 mr-1" />
                    <span>{pharmacy.deliveryTime || '15-20 mins'}</span>
                    {/* Show distance only in Near Me mode */}
                    {isNearMeMode && distance > 0 && (
                      <>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <FaLocationArrow className="w-3 h-3" />
                          {distance.toFixed(1)} km
                        </span>
                      </>
                    )}
                  </div>

                  {/* Delivery Info - Distance based */}
                  <div className="mb-3 space-y-1">
                    <span className="px-2 py-0.5 bg-[#2c6774]/10 text-[#2c6774] text-xs rounded flex items-center gap-1 w-fit">
                      <FaShippingFast className="w-3 h-3" />
                      Delivery: {isNearMeMode && distance > 0 
                        ? `Rs. ${deliveryFee}` 
                        : `Rs. ${pharmacy.deliveryFee || 100}+`}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1 w-fit">
                      <FaTruck className="w-3 h-3" />
                      Radius: {deliveryRadius} km
                    </span>
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={`/pharmacies/${pharmacy._id}`}
                      className="block w-full bg-gradient-to-r from-[#2c6774] to-[#174047] text-white text-center py-2 rounded text-xs font-semibold transition-all duration-300 hover:from-[#1e4e56] hover:to-[#174047]"
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
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200 shadow-sm">
            <FaSadTear className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {isNearMeMode ? 'No pharmacies nearby' : 'No pharmacies found'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {isNearMeMode 
                ? 'Try increasing the search radius or check back later.'
                : 'Try adjusting your search criteria'
              }
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded text-sm font-semibold"
            >
              {isNearMeMode ? 'Show All Pharmacies' : 'Clear Filters'}
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-xl p-8 text-white overflow-hidden relative mb-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#5c878f] rounded-full -translate-y-24 translate-x-12 opacity-20"></div>
          <div className="relative z-10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">Need Specific Medicines?</h3>
              <p className="text-[#c0d3dc] mb-6 max-w-md mx-auto">
                Search our complete medicine database from all partner pharmacies
              </p>
              <Link
                to="/medicines"
                className="inline-flex items-center bg-white text-[#2c6774] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                <FaSearch className="mr-3" />
                Search All Medicines
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-[#174047]/5 via-[#2c6774]/5 to-[#5c878f]/5 rounded-xl p-6 border border-[#c0d3dc]/20">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Why Choose Our Platform?</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              We connect you with the best pharmacies for quality medicines
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-[#2c6774] mb-2">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;