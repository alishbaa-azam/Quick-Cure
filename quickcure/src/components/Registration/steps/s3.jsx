import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCity, FaMapPin } from 'react-icons/fa';

const Step3Location = ({ register, errors, formValues, setValue }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [allCitiesData, setAllCitiesData] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoadingProvinces(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/ArslanAmeer/pakistan-cities/master/provinces.json'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }
        
        const data = await response.json();
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setProvinces(data);
        } else {
          // If it's an object, convert to array
          const provincesArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            name: value
          }));
          setProvinces(provincesArray);
        }
        
      } catch (error) {
        console.error('Error fetching provinces:', error);
        // Fallback data
        setProvinces([
          { id: '1', name: 'Punjab' },
          { id: '2', name: 'Sindh' },
          { id: '3', name: 'Khyber Pakhtunkhwa' },
          { id: '4', name: 'Balochistan' },
          { id: '5', name: 'Islamabad Capital Territory' },
          { id: '6', name: 'Gilgit-Baltistan' },
          { id: '7', name: 'Azad Jammu & Kashmir' }
        ]);
      } finally {
        setLoadingProvinces(false);
      }
    };

    const fetchAllCities = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/ArslanAmeer/pakistan-cities/master/cities.json'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        
        const data = await response.json();
        setAllCitiesData(data);
        
      } catch (error) {
        console.error('Error fetching cities:', error);
        // Fallback data
        setAllCitiesData([
          { id: 101, name: 'Lahore', province_id: 1 },
          { id: 102, name: 'Faisalabad', province_id: 1 },
          { id: 103, name: 'Rawalpindi', province_id: 1 },
          { id: 104, name: 'Multan', province_id: 1 },
          { id: 105, name: 'Gujranwala', province_id: 1 },
          { id: 201, name: 'Karachi', province_id: 2 },
          { id: 202, name: 'Hyderabad', province_id: 2 },
          { id: 203, name: 'Sukkur', province_id: 2 },
          { id: 204, name: 'Larkana', province_id: 2 },
          { id: 301, name: 'Peshawar', province_id: 3 },
          { id: 302, name: 'Mardan', province_id: 3 },
          { id: 303, name: 'Abbottabad', province_id: 3 },
          { id: 304, name: 'Swat', province_id: 3 },
          { id: 401, name: 'Quetta', province_id: 4 },
          { id: 402, name: 'Turbat', province_id: 4 },
          { id: 403, name: 'Khuzdar', province_id: 4 },
          { id: 501, name: 'Islamabad', province_id: 5 },
          { id: 601, name: 'Gilgit', province_id: 6 },
          { id: 602, name: 'Skardu', province_id: 6 },
          { id: 701, name: 'Muzaffarabad', province_id: 7 },
          { id: 702, name: 'Mirpur', province_id: 7 }
        ]);
      }
    };

    fetchProvinces();
    fetchAllCities();
  }, []);

  useEffect(() => {
    if (!formValues.province || allCitiesData.length === 0) {
      setCities([]);
      return;
    }

    try {
      setLoadingCities(true);
      
      // Convert province value to number for comparison
      const selectedProvinceId = parseInt(formValues.province);
      
      // Filter cities for selected province
      const filteredCities = allCitiesData.filter(city => {
        // Handle different possible data structures
        if (city.province_id !== undefined) {
          return city.province_id === selectedProvinceId;
        } else if (city.provinceId !== undefined) {
          return city.provinceId === selectedProvinceId;
        } else if (city.province !== undefined) {
          return parseInt(city.province) === selectedProvinceId;
        }
        return false;
      });
      
      setCities(filteredCities);
      
    } catch (error) {
      console.error('Error filtering cities:', error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  }, [formValues.province, allCitiesData]);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  const handleProvinceChange = (e) => {
    setValue('province', e.target.value);
    setValue('city', '');
  };

  // Get selected province name for preview
  const getSelectedProvinceName = () => {
    if (!formValues.province) return '';
    const province = provinces.find(p => p.id.toString() === formValues.province);
    return province ? province.name : '';
  };

  // Get selected city name for preview
  const getSelectedCityName = () => {
    if (!formValues.city) return '';
    const city = cities.find(c => c.id.toString() === formValues.city);
    return city ? city.name : '';
  };

  return (
    <div className="space-y-6">
      {/* Province Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Province *
        </label>
        <div className="relative">
          {loadingProvinces ? (
            <div className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--primary-color)] mr-2"></div>
              <span>Loading provinces...</span>
            </div>
          ) : (
            <>
              <select
                {...register('province', {
                  required: 'Province is required',
                  onChange: handleProvinceChange
                })}
                className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('province')}`}
              >
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-3 text-gray-400">
                <FaMapMarkerAlt />
              </div>
              <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </>
          )}
        </div>
        {errors.province && (
          <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
        )}
        {provinces.length === 0 && !loadingProvinces && (
          <p className="text-sm text-gray-500 mt-1">No provinces loaded. Please refresh the page.</p>
        )}
      </div>

      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <div className="relative">
          {formValues.province && loadingCities ? (
            <div className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--primary-color)] mr-2"></div>
              <span>Loading cities...</span>
            </div>
          ) : (
            <>
              <select
                {...register('city', {
                  required: 'City is required',
                  disabled: !formValues.province || loadingCities
                })}
                className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('city')} ${!formValues.province || loadingCities ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">
                  {formValues.province ? 'Select City' : 'First select province'}
                </option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-3 text-gray-400">
                <FaCity />
              </div>
              <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </>
          )}
        </div>
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
        {formValues.province && cities.length === 0 && !loadingCities && (
          <p className="text-sm text-gray-500 mt-1">
            No cities found for this province. Please select another province.
          </p>
        )}
        {!formValues.province && (
          <p className="text-sm text-gray-500 mt-1">
            Please select a province first to see available cities.
          </p>
        )}
      </div>

      {/* Complete Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Complete Address *
        </label>
        <div className="relative">
          <textarea
            {...register('completeAddress', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Please provide complete address' }
            })}
            rows="3"
            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('completeAddress')}`}
            placeholder="House/Shop number, Street, Area, Landmark"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaMapPin />
          </div>
        </div>
        {errors.completeAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.completeAddress.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Please provide complete address including house/shop number, street, area, and landmark
        </p>
      </div>

      {/* Selected Location Preview */}
      {formValues.province && formValues.city && cities.length > 0 && (
        <div className="p-4 bg-[var(--bg-light)]/30 rounded-lg border border-[var(--accent-color)]/20">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-[var(--primary-color)] mr-3" />
            <div>
              <p className="font-medium text-gray-900">Selected Location</p>
              <p className="text-sm text-gray-600">
                {getSelectedProvinceName()} → {getSelectedCityName()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Debug information (remove in production) */}
      <div className="text-xs text-gray-400 mt-4">
        <p>Debug Info:</p>
        <p>Provinces loaded: {provinces.length}</p>
        <p>Cities loaded for selected province: {cities.length}</p>
        <p>Selected Province: {formValues.province}</p>
        <p>Selected City: {formValues.city}</p>
      </div>
    </div>
  );
};

export default Step3Location;