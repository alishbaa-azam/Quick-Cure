import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FaStore, 
  FaUser, 
  FaMapMarkerAlt, 
  FaFileUpload, 
  FaCheck,
  FaBuilding,
  FaFileAlt,
  FaCity,
  FaMapPin,
  FaCalendarAlt,
  FaEdit,
  FaEnvelope,
  FaUserTie,
  FaPhone,
  FaIdCard,
  FaSpinner,
  FaCertificate,
  FaCrosshairs,
  FaGlobeAsia,
  FaInfoCircle
} from 'react-icons/fa';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api/pharmacy';

// Pakistan provinces and cities data
const PAKISTAN_DATA = {
  provinces: [
    { id: 'punjab', name: 'Punjab' },
    { id: 'sindh', name: 'Sindh' },
    { id: 'kpk', name: 'Khyber Pakhtunkhwa' },
    { id: 'balochistan', name: 'Balochistan' },
    { id: 'islamabad', name: 'Islamabad Capital Territory' },
    { id: 'gilgit', name: 'Gilgit-Baltistan' },
    { id: 'ajk', name: 'Azad Jammu & Kashmir' }
  ],
  cities: {
    punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Jhang', 'Sheikhupura'],
    sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Jacobabad', 'Shikarpur', 'Dadu', 'Tando Allahyar'],
    kpk: ['Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Kohat', 'Bannu', 'Dera Ismail Khan', 'Charsadda', 'Nowshera', 'Mingora'],
    balochistan: ['Quetta', 'Turbat', 'Khuzdar', 'Gwadar', 'Sibi', 'Zhob', 'Loralai', 'Dera Bugti', 'Chaman', 'Hub'],
    islamabad: ['Islamabad'],
    gilgit: ['Gilgit', 'Skardu', 'Hunza', 'Ghizer', 'Nagar', 'Ghanche', 'Astore', 'Diamer'],
    ajk: ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber', 'Bagh', 'Hattian', 'Haveli']
  }
};

// Step 1 Component - Pharmacy Details
const Step1PharmacyDetails = ({ register, errors, pharmacyTypes, isChecking, setError, clearErrors, formValues }) => {
  const [licenseNumber, setLicenseNumber] = useState(formValues?.licenseNumber || '');
  const [licenseError, setLicenseError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (formValues?.licenseNumber) {
      setLicenseNumber(formValues.licenseNumber);
    }
  }, [formValues?.licenseNumber]);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const checkLicenseNumberExists = async (value) => {
    if (!value || value.length < 5) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/check-license?licenseNumber=${encodeURIComponent(value)}`);
      const data = await response.json();
      
      if (data.exists) {
        setLicenseError('This license number already exists');
        setError('licenseNumber', {
          type: 'manual',
          message: 'License number already exists'
        });
      } else {
        setLicenseError('');
        clearErrors('licenseNumber');
      }
    } catch (error) {
      console.error('Error checking license number:', error);
    }
  };

  const handleLicenseChange = (e) => {
    const value = e.target.value;
    setLicenseNumber(value);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    setLicenseError('');
    clearErrors('licenseNumber');
    
    if (value && value.length >= 5) {
      const timeout = setTimeout(() => {
        checkLicenseNumberExists(value);
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Pharmacy Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('pharmacyName', {
                required: 'Pharmacy name is required',
                minLength: { value: 3, message: 'Pharmacy name must be at least 3 characters' },
                maxLength: { value: 100, message: 'Pharmacy name cannot exceed 100 characters' },
                pattern: { 
                  value: /^[a-zA-Z0-9\s\-&.]+$/, 
                  message: 'Only letters, numbers, spaces, hyphens, ampersands, and periods allowed' 
                }
              })}
              type="text"
              defaultValue={formValues?.pharmacyName || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('pharmacyName')}`}
              placeholder="Enter pharmacy name"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaStore />
            </div>
          </div>
          {errors.pharmacyName && (
            <span className="text-red-500 text-sm mt-1">{errors.pharmacyName.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            License Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('licenseNumber', {
                required: 'License number is required',
                pattern: {
                  value: /^\d{5}-[A-Z]\/\d{2}$/,
                  message: 'Format: 23269-A/20 (5 digits, hyphen, letter, slash, 2 digits)'
                },
                maxLength: { value: 20, message: 'License number too long' },
                onChange: handleLicenseChange
              })}
              type="text"
              defaultValue={formValues?.licenseNumber || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('licenseNumber')}`}
              placeholder="23269-A/20"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaCertificate />
            </div>
            {isChecking && (
              <div className="absolute right-3 top-3">
                <FaSpinner className="animate-spin text-[#2c6774]" />
              </div>
            )}
          </div>
          {errors.licenseNumber && (
            <span className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</span>
          )}
          {licenseError && !errors.licenseNumber && (
            <span className="text-red-500 text-sm mt-1">{licenseError}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Pharmacy Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register('pharmacyType', { 
              required: 'Please select pharmacy type'
            })}
            defaultValue={formValues?.pharmacyType || ''}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('pharmacyType')}`}
          >
            <option value="">Select pharmacy type</option>
            {pharmacyTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          {errors.pharmacyType && (
            <span className="text-red-500 text-sm mt-1">{errors.pharmacyType.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            License Expiry Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('licenseExpiry', { 
                required: 'License expiry date is required',
                validate: value => {
                  const expiryDate = new Date(value);
                  const today = new Date();
                  return expiryDate > today || 'License expiry date must be in the future';
                }
              })}
              type="date"
              defaultValue={formValues?.licenseExpiry || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('licenseExpiry')}`}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaCalendarAlt />
            </div>
          </div>
          {errors.licenseExpiry && (
            <span className="text-red-500 text-sm mt-1">{errors.licenseExpiry.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Year Established <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            {...register('yearEstablished', { 
              required: 'Year is required',
              validate: value => {
                const year = parseInt(value);
                return (year >= 1900 && year <= currentYear) || `Year must be between 1900 and ${currentYear}`;
              }
            })}
            defaultValue={formValues?.yearEstablished || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('yearEstablished')}`}
          >
            <option value="">Select year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <div className="absolute left-3 top-3 text-gray-400">
            <FaCalendarAlt />
          </div>
        </div>
        {errors.yearEstablished && (
          <span className="text-red-500 text-sm mt-1">{errors.yearEstablished.message}</span>
        )}
      </div>
    </div>
  );
};

// Step 2 Component - Contact Information
const Step2ContactInformation = ({ register, errors, isCheckingEmail, setError, clearErrors, formValues }) => {
  const [emailError, setEmailError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const checkEmailExists = async (value) => {
    if (!value || !value.includes('@')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(value)}`);
      const data = await response.json();
      
      if (data.exists) {
        setEmailError('Email already registered');
        setError('email', {
          type: 'manual',
          message: 'Email already registered'
        });
      } else {
        setEmailError('');
        clearErrors('email');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    setEmailError('');
    clearErrors('email');
    
    if (value && value.includes('@')) {
      const timeout = setTimeout(() => {
        checkEmailExists(value);
      }, 500);
      setTypingTimeout(timeout);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Owner Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('ownerName', {
                required: 'Owner name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
                pattern: { 
                  value: /^[a-zA-Z\s]+$/, 
                  message: 'Only letters and spaces allowed' 
                }
              })}
              type="text"
              defaultValue={formValues?.ownerName || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('ownerName')}`}
              placeholder="Full name"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaUserTie />
            </div>
          </div>
          {errors.ownerName && (
            <span className="text-red-500 text-sm mt-1">{errors.ownerName.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Owner CNIC <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('ownerCnic', {
                required: 'CNIC is required',
                pattern: {
                  value: /^[0-9]{5}-[0-9]{7}-[0-9]$/,
                  message: 'Format: 12345-1234567-1 (5-7-1 digits)'
                },
                maxLength: { value: 15, message: 'CNIC too long' }
              })}
              type="text"
              defaultValue={formValues?.ownerCnic || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('ownerCnic')}`}
              placeholder="12345-1234567-1"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <FaIdCard />
            </div>
          </div>
          {errors.ownerCnic && (
            <span className="text-red-500 text-sm mt-1">{errors.ownerCnic.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address'
              },
              maxLength: { value: 100, message: 'Email too long' },
              onChange: handleEmailChange
            })}
            type="email"
            defaultValue={formValues?.email || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('email')}`}
            placeholder="pharmacy@example.com"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaEnvelope />
          </div>
          {isCheckingEmail && (
            <div className="absolute right-3 top-3">
              <FaSpinner className="animate-spin text-[#2c6774]" />
            </div>
          )}
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
        )}
        {emailError && !errors.email && (
          <span className="text-red-500 text-sm mt-1">{emailError}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-[#c0d3dc] bg-[#c0d3dc] text-[#174047] font-medium">
            +92
          </span>
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^3[0-9]{9}$/,
                message: 'Enter a valid Pakistani phone number (3XXXXXXXXX)'
              },
              minLength: { value: 10, message: 'Phone number must be 10 digits' },
              maxLength: { value: 10, message: 'Phone number must be 10 digits' }
            })}
            type="tel"
            defaultValue={formValues?.phone || ''}
            className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] no-spinner ${getFieldErrorStyle('phone')}`}
            placeholder="3XXXXXXXXX"
            maxLength="10"
          />
        </div>
        {errors.phone && (
          <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
        )}
      </div>
    </div>
  );
};

// Step 3 Component - Location with map coordinates
const Step3Location = ({ register, errors, formValues, setValue }) => {
  const [cities, setCities] = useState([]);
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState({
    lat: formValues?.latitude || '',
    lng: formValues?.longitude || ''
  });
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    if (formValues.province) {
      setCities(PAKISTAN_DATA.cities[formValues.province] || []);
    }
  }, [formValues.province]);

  useEffect(() => {
    if (formValues.province && formValues.city) {
      setValue('city', formValues.city);
    }
  }, [formValues.province, formValues.city, setValue]);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    
    setLocating(true);
    setLocationError('');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        setCoords({ lat, lng });
        setValue('latitude', parseFloat(lat));
        setValue('longitude', parseFloat(lng));
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please allow location access or enter coordinates manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please enter coordinates manually.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again or enter coordinates manually.');
            break;
          default:
            setLocationError('An error occurred getting your location. Please enter coordinates manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleLatChange = (e) => {
    const val = e.target.value;
    setCoords(prev => ({ ...prev, lat: val }));
    setValue('latitude', val ? parseFloat(val) : '');
  };

  const handleLngChange = (e) => {
    const val = e.target.value;
    setCoords(prev => ({ ...prev, lng: val }));
    setValue('longitude', val ? parseFloat(val) : '');
  };

  const getCityCoords = (cityName) => {
    const cityCoords = {
      'Karachi': { lat: 24.8607, lng: 67.0011 },
      'Lahore': { lat: 31.5204, lng: 74.3587 },
      'Faisalabad': { lat: 31.4504, lng: 73.1350 },
      'Rawalpindi': { lat: 33.5651, lng: 73.0169 },
      'Islamabad': { lat: 33.6844, lng: 73.0479 },
      'Multan': { lat: 30.1575, lng: 71.5249 },
      'Hyderabad': { lat: 25.3960, lng: 68.3578 },
      'Gujranwala': { lat: 32.1877, lng: 74.1945 },
      'Peshawar': { lat: 34.0150, lng: 71.5249 },
      'Quetta': { lat: 30.1798, lng: 66.9750 },
      'Sialkot': { lat: 32.4927, lng: 74.5319 },
      'Bahawalpur': { lat: 29.3544, lng: 71.6911 },
      'Sargodha': { lat: 32.0836, lng: 72.6711 },
      'Sukkur': { lat: 27.7080, lng: 68.8410 },
      'Larkana': { lat: 27.5644, lng: 68.2055 },
      'Abbottabad': { lat: 34.1558, lng: 73.2126 },
      'Mirpur Khas': { lat: 25.5249, lng: 69.0161 },
      'Swat': { lat: 34.7782, lng: 72.3479 },
      'Gilgit': { lat: 35.9208, lng: 74.3145 },
    };
    return cityCoords[cityName] || null;
  };

  const setLocationFromCity = () => {
    if (formValues.city) {
      const cityCoord = getCityCoords(formValues.city);
      if (cityCoord) {
        setCoords({ lat: cityCoord.lat.toString(), lng: cityCoord.lng.toString() });
        setValue('latitude', cityCoord.lat);
        setValue('longitude', cityCoord.lng);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Map location info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <FaGlobeAsia className="text-blue-500 mt-1 shrink-0" size={20} />
        <div>
          <p className="text-sm font-medium text-blue-800">Location Coordinates Required</p>
          <p className="text-xs text-blue-600 mt-1">
            We need your pharmacy's map location so customers can find you easily. Use the "Detect My Location" button or select a city to auto-fill coordinates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Province <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register('province', { 
                required: 'Province is required'
              })}
              defaultValue={formValues?.province || ''}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('province')}`}
            >
              <option value="">Select Province</option>
              {PAKISTAN_DATA.provinces.map(province => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaMapMarkerAlt />
            </div>
          </div>
          {errors.province && (
            <span className="text-red-500 text-sm mt-1">{errors.province.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register('city', { 
                required: 'City is required',
                disabled: !formValues.province,
                validate: value => {
                  if (!formValues.province) return true;
                  return value !== '' || 'Please select a city';
                }
              })}
              defaultValue={formValues?.city || ''}
              onChange={(e) => {
                const val = e.target.value;
                setValue('city', val);
                // Auto-fill coordinates from city
                setTimeout(() => setLocationFromCity(), 100);
              }}
              className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] appearance-none ${getFieldErrorStyle('city')} ${!formValues.province ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">
                {formValues.province ? 'Select City' : 'First select province'}
              </option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaCity />
            </div>
          </div>
          {errors.city && (
            <span className="text-red-500 text-sm mt-1">{errors.city.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Complete Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Address must be at least 10 characters' },
              maxLength: { value: 200, message: 'Address cannot exceed 200 characters' },
              pattern: { 
                value: /^[a-zA-Z0-9\s,./#-]+$/, 
                message: 'Please enter a valid address' 
              }
            })}
            rows="3"
            defaultValue={formValues?.address || ''}
            className={`w-full px-3 py-2 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('address')}`}
            placeholder="Shop/House number, Street, Area, Landmark"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaMapPin />
          </div>
        </div>
        {errors.address && (
          <span className="text-red-500 text-sm mt-1">{errors.address.message}</span>
        )}
      </div>

      {/* Location Coordinates with Detect button */}
      <div className="border border-[#c0d3dc] rounded-lg p-4 bg-[#f8f9fa]">
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium text-[#174047]">
            Map Location <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={detectLocation}
            disabled={locating}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors text-sm disabled:opacity-50"
          >
            {locating ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaCrosshairs />
            )}
            {locating ? 'Detecting...' : 'Detect My Location'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Latitude</label>
            <input
              type="number"
              step="0.000001"
              placeholder="e.g. 24.8607"
              value={coords.lat}
              onChange={handleLatChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white text-sm ${coords.lat && (parseFloat(coords.lat) < -90 || parseFloat(coords.lat) > 90) ? 'border-red-500' : 'border-gray-300'}`}
            />
            {coords.lat && (parseFloat(coords.lat) < -90 || parseFloat(coords.lat) > 90) && (
              <span className="text-red-500 text-xs mt-1">Invalid latitude (-90 to 90)</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Longitude</label>
            <input
              type="number"
              step="0.000001"
              placeholder="e.g. 67.0011"
              value={coords.lng}
              onChange={handleLngChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white text-sm ${coords.lng && (parseFloat(coords.lng) < -180 || parseFloat(coords.lng) > 180) ? 'border-red-500' : 'border-gray-300'}`}
            />
            {coords.lng && (parseFloat(coords.lng) < -180 || parseFloat(coords.lng) > 180) && (
              <span className="text-red-500 text-xs mt-1">Invalid longitude (-180 to 180)</span>
            )}
          </div>
        </div>
        
        {locationError && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
            {locationError}
          </div>
        )}
        
        {coords.lat && coords.lng && !locationError && (
          <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
            <FaCheck className="text-green-500" />
            Location set to: {parseFloat(coords.lat).toFixed(4)}, {parseFloat(coords.lng).toFixed(4)}
          </div>
        )}

        <input type="hidden" {...register('latitude', { 
          validate: value => {
            if (!value && !coords.lat) return 'Location coordinates are required';
            const lat = parseFloat(value || coords.lat);
            if (isNaN(lat) || lat < -90 || lat > 90) return 'Invalid latitude';
            return true;
          }
        })} />
        <input type="hidden" {...register('longitude', { 
          validate: value => {
            if (!value && !coords.lng) return 'Location coordinates are required';
            const lng = parseFloat(value || coords.lng);
            if (isNaN(lng) || lng < -180 || lng > 180) return 'Invalid longitude';
            return true;
          }
        })} />
        
        <p className="text-xs text-gray-400 mt-2">
          <FaInfoCircle className="inline mr-1" />
          These coordinates help customers find your pharmacy on the map. You can use auto-detect or enter manually.
        </p>
      </div>
    </div>
  );
};

// Step 4 Component - Documents
const Step4Documents = ({ register, errors, setValue: setFormValue, clearErrors, formValues }) => {
  const [fileNames, setFileNames] = useState({
    licenseFile: formValues?.licenseFile?.name || '',
    taxCertificate: formValues?.taxCertificate?.name || '',
    ownerIdProof: formValues?.ownerIdProof?.name || ''
  });

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-500' : 'border-[#c0d3dc]';
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    
    if (clearErrors) {
      clearErrors(fieldName);
    }
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      
      if (!validTypes.includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only');
        e.target.value = '';
        return;
      }
      
      setFileNames(prev => ({ ...prev, [fieldName]: file.name }));
      setFormValue(fieldName, file, { 
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true 
      });
    }
  };

  const validateFile = (value, fieldName) => {
    if (!value) {
      if (fieldName === 'taxCertificate') return true;
      return `${fieldName === 'licenseFile' ? 'License file' : 'Owner ID proof'} is required`;
    }
    
    if (!(value instanceof File)) {
      return 'Invalid file';
    }

    if (value.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB';
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (!validTypes.includes(value.type)) {
      return 'Only PDF, JPG, or PNG files are allowed';
    }

    return true;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Pharmacy License Certificate <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'licenseFile')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('licenseFile')}`}
            />
            <input
              type="hidden"
              {...register('licenseFile', {
                validate: (value) => validateFile(value, 'licenseFile')
              })}
            />
          </div>
          {errors.licenseFile && (
            <span className="text-red-500 text-sm mt-1">{errors.licenseFile.message}</span>
          )}
          {fileNames.licenseFile && (
            <p className="mt-1 text-sm text-[#2c6774] flex items-center">
              <FaCheck className="mr-1" /> Selected: {fileNames.licenseFile}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">Upload pharmacy license certificate (PDF, JPG, PNG, max 5MB)</p>
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-[#174047] mb-1">
            Tax Certificate
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'taxCertificate')}
              className="w-full px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
            />
            <input
              type="hidden"
              {...register('taxCertificate', {
                validate: (value) => validateFile(value, 'taxCertificate')
              })}
            />
          </div>
          {errors.taxCertificate && (
            <span className="text-red-500 text-sm mt-1">{errors.taxCertificate.message}</span>
          )}
          {fileNames.taxCertificate && (
            <p className="mt-1 text-sm text-[#2c6774] flex items-center">
              <FaCheck className="mr-1" /> Selected: {fileNames.taxCertificate}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">Upload tax certificate (Optional, PDF, JPG, PNG, max 5MB)</p>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-[#174047] mb-1">
          Owner ID Proof (CNIC/Passport) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'ownerIdProof')}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] ${getFieldErrorStyle('ownerIdProof')}`}
          />
          <input
            type="hidden"
            {...register('ownerIdProof', {
              validate: (value) => validateFile(value, 'ownerIdProof')
            })}
          />
        </div>
        {errors.ownerIdProof && (
          <span className="text-red-500 text-sm mt-1">{errors.ownerIdProof.message}</span>
        )}
        {fileNames.ownerIdProof && (
          <p className="mt-1 text-sm text-[#2c6774] flex items-center">
            <FaCheck className="mr-1" /> Selected: {fileNames.ownerIdProof}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">Upload owner's CNIC or Passport (PDF, JPG, PNG, max 5MB)</p>
      </div>

      <div className="p-4 bg-[#9fbfc5] bg-opacity-20 border border-[#2c6774] border-opacity-30 rounded-lg">
        <p className="text-sm text-[#174047]">
          <strong className="text-[#2c6774]">Document Requirements:</strong> Upload PDF, JPG, or PNG files (max 5MB each). All documents must be clear and readable.
        </p>
      </div>
    </div>
  );
};

// Step 5 Component - Review
const Step5Review = ({ register, errors, formValues, pharmacyTypes, setCurrentStep, isSubmitting }) => {
  const getFileName = (fileField) => {
    if (!fileField) return 'Not uploaded';
    if (typeof fileField === 'string') return fileField;
    if (fileField instanceof File) return fileField.name;
    if (fileField && fileField.name) return fileField.name;
    return 'Uploaded';
  };

  const getProvinceName = (provinceId) => {
    if (!provinceId) return 'Not selected';
    const province = PAKISTAN_DATA.provinces.find(p => p.id === provinceId);
    return province ? province.name : provinceId;
  };

  const getPharmacyTypeName = (pharmacyTypeId) => {
    if (!pharmacyTypeId) return 'Not selected';
    const pharmacyType = pharmacyTypes.find(t => t.id === pharmacyTypeId);
    return pharmacyType ? pharmacyType.name : pharmacyTypeId;
  };

  const sections = [
    {
      title: 'Pharmacy Details',
      step: 1,
      fields: [
        { label: 'Pharmacy Name', value: formValues?.pharmacyName || 'Not provided' },
        { label: 'License Number', value: formValues?.licenseNumber || 'Not provided' },
        { label: 'Pharmacy Type', value: getPharmacyTypeName(formValues?.pharmacyType) },
        { label: 'License Expiry', value: formValues?.licenseExpiry || 'Not provided' },
        { label: 'Year Established', value: formValues?.yearEstablished || 'Not provided' }
      ]
    },
    {
      title: 'Contact Information',
      step: 2,
      fields: [
        { label: 'Owner Name', value: formValues?.ownerName || 'Not provided' },
        { label: 'Owner CNIC', value: formValues?.ownerCnic || 'Not provided' },
        { label: 'Email', value: formValues?.email || 'Not provided' },
        { label: 'Phone', value: formValues?.phone ? `+92 ${formValues.phone}` : 'Not provided' }
      ]
    },
    {
      title: 'Location',
      step: 3,
      fields: [
        { label: 'Province', value: getProvinceName(formValues?.province) },
        { label: 'City', value: formValues?.city || 'Not selected' },
        { label: 'Complete Address', value: formValues?.address || 'Not provided' }
      ]
    },
    {
      title: 'Documents',
      step: 4,
      fields: [
        { label: 'License Certificate', value: getFileName(formValues?.licenseFile) },
        { label: 'Tax Certificate', value: getFileName(formValues?.taxCertificate) },
        { label: 'Owner ID Proof', value: getFileName(formValues?.ownerIdProof) }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.step} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-[#9fbfc5] bg-opacity-20 px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold text-[#174047]">{section.title}</h3>
            <button
              type="button"
              onClick={() => setCurrentStep(section.step)}
              className="flex items-center text-sm text-[#2c6774] hover:text-[#174047] transition-colors"
              disabled={isSubmitting}
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field, index) => (
              <div key={index}>
                <p className="text-xs text-gray-500">{field.label}</p>
                <p className="text-sm font-medium text-gray-900">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-4 mt-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('termsAccepted', {
              required: 'You must accept the terms to continue'
            })}
            className="mt-0.5 w-5 h-4.5 text-[#2c6774] rounded focus:ring-[#2c6774]"
            disabled={isSubmitting}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              I confirm that all information provided is correct and complete
            </p>
            {errors?.termsAccepted && (
              <span className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</span>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('commissionAgreed', {
              required: 'You must agree to the terms and conditions'
            })}
            className="mt-0.5 w-5 h-4.5 text-[#2c6774] rounded focus:ring-[#2c6774]"
            disabled={isSubmitting}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              I agree to the platform's terms and conditions
            </p>
            {errors?.commissionAgreed && (
              <span className="text-red-500 text-sm mt-1">{errors.commissionAgreed.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const PharmacyRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingLicense, setIsCheckingLicense] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); // Add this state

  const steps = [
    { id: 1, title: 'Pharmacy Details', icon: <FaStore /> },
    { id: 2, title: 'Contact Info', icon: <FaUser /> },
    { id: 3, title: 'Location', icon: <FaMapMarkerAlt /> },
    { id: 4, title: 'Documents', icon: <FaFileUpload /> },
    { id: 5, title: 'Review', icon: <FaCheck /> }
  ];

  const pharmacyTypes = [
    { id: 'retail', name: 'Retail Pharmacy' },
    { id: 'hospital', name: 'Hospital Pharmacy' },
    { id: 'chain', name: 'Chain Pharmacy' },
    { id: 'independent', name: 'Independent Pharmacy' },
    { id: 'compounding', name: 'Compounding Pharmacy' },
    { id: 'online', name: 'Online Pharmacy' }
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    setValue,
    reset,
    getValues,
    setError: setFormError,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {}
  });

  const formValues = watch();

  const stepRequirements = {
    1: ['pharmacyName', 'licenseNumber', 'pharmacyType', 'licenseExpiry', 'yearEstablished'],
    2: ['email', 'ownerName', 'ownerCnic', 'phone'],
    3: ['province', 'city', 'address'],
    4: ['licenseFile', 'ownerIdProof'],
    5: ['termsAccepted', 'commissionAgreed']
  };

  const checkEmail = async (email) => {
    setIsCheckingEmail(true);
    try {
      const response = await fetch(`${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const checkLicense = async (licenseNumber) => {
    setIsCheckingLicense(true);
    try {
      const response = await fetch(`${API_BASE_URL}/check-license?licenseNumber=${encodeURIComponent(licenseNumber)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking license number:', error);
      return false;
    } finally {
      setIsCheckingLicense(false);
    }
  };

  const validateStep = async (step) => {
    const fields = stepRequirements[step];
    if (!fields) return true;
    const result = await trigger(fields);
    return result;
  };

  const isCurrentStepValid = () => {
    const fields = stepRequirements[currentStep];
    if (!fields) return true;
    
    for (const field of fields) {
      if (!formValues[field] || errors[field]) {
        return false;
      }
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber - 1)) {
      setCurrentStep(stepNumber);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const formData = new FormData();
      
      formData.append('pharmacyName', data.pharmacyName);
      formData.append('licenseNumber', data.licenseNumber);
      formData.append('pharmacyType', data.pharmacyType);
      formData.append('licenseExpiry', data.licenseExpiry);
      formData.append('yearEstablished', data.yearEstablished);
      formData.append('ownerName', data.ownerName);
      formData.append('ownerCnic', data.ownerCnic);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('province', data.province);
      formData.append('city', data.city);
      formData.append('address', data.address);
      formData.append('latitude', data.latitude || '');
      formData.append('longitude', data.longitude || '');
      formData.append('termsAccepted', data.termsAccepted);
      formData.append('commissionAgreed', data.commissionAgreed);
      
      if (data.licenseFile) {
        formData.append('licenseFile', data.licenseFile);
      }
      if (data.taxCertificate) {
        formData.append('taxCertificate', data.taxCertificate);
      }
      if (data.ownerIdProof) {
        formData.append('ownerIdProof', data.ownerIdProof);
      }

      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true); // Show success page
        // Reset form after successful submission
        reset();
        setCurrentStep(1);
        setCompletedSteps([]);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepColor = (step) => {
    if (currentStep === step) return 'bg-[#2c6774] text-white scale-110';
    if (completedSteps.includes(step)) return 'bg-[#2c6774] text-white';
    return 'bg-[#c0d3dc] text-[#174047]';
  };

  const canGoToStep = (step) => {
    if (step === 1) return true;
    if (step <= currentStep) return true;
    return completedSteps.includes(step - 1);
  };

  // Success Page Component
  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-fade-in">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#174047] mb-2">Registration Submitted Successfully!</h2>
            
            <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Our admin team will review your application and get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              {/* <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setCurrentStep(1);
                  setCompletedSteps([]);
                  reset();
                }}
                className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
              >
                Register Another Pharmacy
              </button> */}
              
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  // You can also redirect to home page or dashboard here
                  window.location.href = '/'; // Optional: redirect to home
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-[#174047] py-3 px-4 rounded-lg font-semibold transition-all duration-300"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">
            Pharmacy Registration
          </h1>
          <p className="text-[#174047]">
            Register your pharmacy with our network for free medicine delivery
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <p className="text-green-700 font-medium">Registration submitted successfully!</p>
            <p className="text-sm text-green-600">Admin will review your application within 24-48 hours.</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
            <p className="text-red-700 font-medium">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Progress Stepper */}
        <div className="flex justify-between items-start relative mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative flex-1">
              <button
                type="button"
                onClick={() => goToStep(step.id)}
                className={`w-12 h-12 rounded-full z-4 flex items-center justify-center transition-all duration-300 ${getStepColor(step.id)} ${
                  !canGoToStep(step.id) ? 'opacity-100 cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={!canGoToStep(step.id) || isSubmitting}
                title={!canGoToStep(step.id) ? 'Complete previous steps first' : ''}
              >
                {step.icon}
              </button>
              <p className={`text-sm font-medium text-[#174047] mt-2 text-center ${currentStep === step.id ? 'text-[#2c6774]' : ''}`}>
                {step.title}
              </p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-5/8 w-5/6 h-1 z-0 transition-colors duration-300 ${
                    completedSteps.includes(step.id) ? 'bg-[#2c6774]' : 'bg-[#c0d3dc]'
                  }`}
                  style={{ top: '33%', transform: 'translateY(-50%)' }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
            {steps[currentStep - 1]?.title} Information
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <Step1PharmacyDetails
                register={register}
                errors={errors}
                pharmacyTypes={pharmacyTypes}
                isChecking={isCheckingLicense}
                setError={setFormError}
                clearErrors={clearErrors}
                formValues={formValues}
              />
            )}

            {currentStep === 2 && (
              <Step2ContactInformation
                register={register}
                errors={errors}
                isCheckingEmail={isCheckingEmail}
                setError={setFormError}
                clearErrors={clearErrors}
                formValues={formValues}
              />
            )}

            {currentStep === 3 && (
              <Step3Location
                register={register}
                errors={errors}
                formValues={formValues}
                setValue={setValue}
              />
            )}

            {currentStep === 4 && (
              <Step4Documents
                register={register}
                errors={errors}
                setValue={setValue}
                clearErrors={clearErrors}
                formValues={formValues}
              />
            )}

            {currentStep === 5 && (
              <Step5Review
                register={register}
                errors={errors}
                formValues={formValues}
                pharmacyTypes={pharmacyTypes}
                setCurrentStep={setCurrentStep}
                isSubmitting={isSubmitting}
              />
            )}

            {currentStep < 5 ? (
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    ← Previous
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="button"
                  onClick={nextStep}
                  className={`${
                    isCurrentStepValid() 
                      ? 'bg-[#2c6774] hover:bg-[#1e4e56]' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={!isCurrentStepValid() || isSubmitting}
                  title={!isCurrentStepValid() ? 'Please fill all required fields correctly' : ''}
                >
                  Save & Continue →
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="text-xs text-gray-500 text-center mb-2">
            Step {currentStep} of {steps.length}
          </div>
          <div className="w-full bg-[#c0d3dc] rounded-full h-2">
            <div 
              className="bg-[#2c6774] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}
      </style>
    </div>
  );
};

export default PharmacyRegistration;