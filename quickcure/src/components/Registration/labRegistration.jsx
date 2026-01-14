import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import { 
  FaHospital, 
  FaUser, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaFileUpload, 
  FaCheck,
  FaBuilding,
  FaFileAlt,
  FaEye,
  FaEyeSlash,
  FaCity,
  FaMapPin,
  FaCalendarAlt,
  FaClock,
  FaHome,
  FaAmbulance
} from 'react-icons/fa';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Step 1 Component
const Step1BasicInfo = ({ register, errors, formValues, labTypes }) => {
  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Laboratory Name <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            {...register('labName', {
              required: 'Lab name is required',
              minLength: { value: 3, message: 'Minimum 3 characters' }
            })}
            type="text"
            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('labName')}`}
            placeholder="Enter lab name"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaBuilding />
          </div>
        </div>
        {errors.labName && (
          <p className="mt-1 text-sm text-red-600">{errors.labName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registration Number <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            {...register('registrationNumber', {
              required: 'Registration number is required',
              pattern: {
                value: /^[A-Z]{2,5}-?\d{4,8}$/,
                message: 'Format: PBHL-12345 or similar'
              }
            })}
            type="text"
            className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('registrationNumber')}`}
            placeholder="PBHL-12345"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            <FaFileAlt />
          </div>
        </div>
        {errors.registrationNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.registrationNumber.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Government-issued registration/license number
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lab Type<span className="text-red-600">*</span>
        </label>
        <select
          {...register('labType', { required: 'Please select lab type' })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('labType')}`}
        >
          <option value="">Select lab type</option>
          {labTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        {errors.labType && (
          <p className="mt-1 text-sm text-red-600">{errors.labType.message}</p>
        )}
      </div>
    </div>
  );
};

// Step 2 Component
const Step2ContactDetails = ({ register, errors, formValues, getValues, setError, clearErrors }) => {
  const [existingEmails, setExistingEmails] = useState([]);
  const [emailValidationLoading, setEmailValidationLoading] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        const response = await api.get('/labreg/existing-emails');
        setExistingEmails(response.data.emails || []);
      } catch (error) {
        console.error('Error fetching existing emails:', error);
        // Fallback to empty array if API fails
        setExistingEmails([]);
      }
    };
    
    fetchExistingEmails();
  }, []);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  const validateEmail = async (email) => {
    if (!email) return 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    
    if (existingEmails.includes(email.toLowerCase())) {
      return 'This email is already registered. Please use a different email.';
    }
    
    setEmailValidationLoading(true);
    setEmailValidationError('');
    
    try {
      const response = await api.get(`/labreg/check-email?email=${encodeURIComponent(email)}`);
      
      if (response.data.exists) {
        return 'This email is already registered. Please use a different email.';
      }
    } catch (error) {
      console.error('Error checking email:', error);
      // If API fails, still return true but log error
      return true;
    } finally {
      setEmailValidationLoading(false);
    }
    
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="space-y-6">
      <style jsx global>{`
        select option:checked {
          background-color: #10b981 !important;
          color: white !important;
        }
        
        select option:hover {
          background-color: #d1fae5 !important;
        }
        
        select option:checked,
        select option:checked:focus,
        select option:checked:hover {
          background-color: #10b981 !important;
          color: white !important;
        }
        
        select:focus option:checked {
          background-color: #10b981 !important;
          color: white !important;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person *
          </label>
          <input
            {...register('contactPerson', {
              required: 'Contact person is required',
              minLength: {
                value: 2,
                message: 'Contact person must be at least 2 characters'
              }
            })}
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('contactPerson')}`}
            placeholder="Full name"
          />
          {errors.contactPerson && (
            <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation *
          </label>
          <div className="relative">
            <select
              {...register('designation', {
                required: 'Designation is required'
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('designation')}`}
              defaultValue=""
            >
              <option value="" disabled>Select designation</option>
              <option value="Lab Director">Lab Director</option>
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
              <option value="Lab Technician">Lab Technician</option>
              <option value="Pathologist">Pathologist</option>
              <option value="Administrator">Administrator</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.designation && (
            <p className="mt-1 text-sm text-red-600">{errors.designation.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <input
            {...register('email', {
              required: 'Email is required',
              validate: validateEmail,
              onChange: () => {
                if (errors.email) {
                  clearErrors('email');
                }
                setEmailValidationError('');
              }
            })}
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${
              getFieldErrorStyle('email') || emailValidationError ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="admin@lab.com"
          />
          {emailValidationLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
        {emailValidationError && !errors.email && (
          <p className="mt-1 text-sm text-red-600">{emailValidationError}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Must be a valid email address that hasn't been registered before
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { 
                  value: 8, 
                  message: 'Password must be at least 8 characters' 
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: 'Must include uppercase, lowercase, number, and special character'
                }
              })}
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('password')}`}
              placeholder="Create strong password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
          <div className="mt-1 text-xs text-gray-500">
            <ul className="list-disc list-inside">
              <li>At least 8 characters</li>
              <li>Uppercase and lowercase letters</li>
              <li>At least one number</li>
              <li>At least one special character (@$!%*?&)</li>
            </ul>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => {
                  const password = getValues('password');
                  return value === password || 'Passwords do not match';
                }
              })}
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('confirmPassword')}`}
              placeholder="Re-enter password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <select
              {...register('countryCode', {
                required: 'Country code is required'
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('countryCode')}`}
              defaultValue="+92"
            >
              <option value="+92">Pakistan (+92)</option>
              <option value="+1">USA (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+91">India (+91)</option>
              <option value="+971">UAE (+971)</option>
              <option value="+966">Saudi Arabia (+966)</option>
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <input
              {...register('mobileNumber', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^3\d{9}$/,
                  message: 'Enter a valid 10-digit Pakistani number starting with 3'
                },
                validate: (value) => {
                  const countryCode = getValues('countryCode');
                  if (countryCode === '+92' && !/^3\d{9}$/.test(value)) {
                    return 'Pakistani numbers must start with 3 and be 10 digits';
                  }
                  return true;
                }
              })}
              type="tel"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('mobileNumber')}`}
              placeholder="3XXXXXXXXXX"
              maxLength="10"
            />
          </div>
        </div>
        {errors.mobileNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
        )}
        {errors.countryCode && (
          <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Enter your 10-digit mobile number without country code
        </p>
      </div>
    </div>
  );
};

// Step 3 Component
const Step3Location = ({ register, errors, formValues, setValue }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoadingProvinces(true);
        // Try to fetch from your API first
        const response = await api.get('/labreg/location-data');
        
        if (response.data && response.data.provinces) {
          setProvinces(response.data.provinces);
        } else {
          // Fallback to GitHub API if your API doesn't have data
          const githubResponse = await fetch(
            'https://raw.githubusercontent.com/ArslanAmeer/pakistan-cities/master/provinces.json'
          );
          
          if (githubResponse.ok) {
            const data = await githubResponse.json();
            if (Array.isArray(data)) {
              setProvinces(data);
            } else {
              const provincesArray = Object.entries(data).map(([key, value]) => ({
                id: key,
                name: value
              }));
              setProvinces(provincesArray);
            }
          } else {
            // Static fallback
            setProvinces([
              { id: '1', name: 'Punjab' },
              { id: '2', name: 'Sindh' },
              { id: '3', name: 'Khyber Pakhtunkhwa' },
              { id: '4', name: 'Balochistan' },
              { id: '5', name: 'Islamabad Capital Territory' },
              { id: '6', name: 'Gilgit-Baltistan' },
              { id: '7', name: 'Azad Jammu & Kashmir' }
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
        // Static fallback
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

    fetchLocationData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formValues.province) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        
        // Try to fetch from your API
        const response = await api.get(`/labreg/cities/${formValues.province}`);
        
        if (response.data && response.data.cities) {
          setCities(response.data.cities);
        } else {
          // Fallback to filter from all cities
          const allCitiesResponse = await fetch(
            'https://raw.githubusercontent.com/ArslanAmeer/pakistan-cities/master/cities.json'
          );
          
          if (allCitiesResponse.ok) {
            const allCities = await allCitiesResponse.json();
            const selectedProvinceId = parseInt(formValues.province);
            const filteredCities = allCities.filter(city => {
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
          } else {
            // Static fallback
            const staticCities = getStaticCitiesByProvince(formValues.province);
            setCities(staticCities);
          }
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        // Static fallback
        const staticCities = getStaticCitiesByProvince(formValues.province);
        setCities(staticCities);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [formValues.province]);

  const getStaticCitiesByProvince = (provinceId) => {
    const cityMap = {
      '1': [ // Punjab
        { id: 101, name: 'Lahore' },
        { id: 102, name: 'Faisalabad' },
        { id: 103, name: 'Rawalpindi' },
        { id: 104, name: 'Multan' },
        { id: 105, name: 'Gujranwala' },
      ],
      '2': [ // Sindh
        { id: 201, name: 'Karachi' },
        { id: 202, name: 'Hyderabad' },
        { id: 203, name: 'Sukkur' },
        { id: 204, name: 'Larkana' },
      ],
      '3': [ // KPK
        { id: 301, name: 'Peshawar' },
        { id: 302, name: 'Mardan' },
        { id: 303, name: 'Abbottabad' },
        { id: 304, name: 'Swat' },
      ],
      '4': [ // Balochistan
        { id: 401, name: 'Quetta' },
        { id: 402, name: 'Turbat' },
        { id: 403, name: 'Khuzdar' },
      ],
      '5': [ // Islamabad
        { id: 501, name: 'Islamabad' },
      ],
      '6': [ // Gilgit-Baltistan
        { id: 601, name: 'Gilgit' },
        { id: 602, name: 'Skardu' },
      ],
      '7': [ // AJK
        { id: 701, name: 'Muzaffarabad' },
        { id: 702, name: 'Mirpur' },
      ]
    };
    
    return cityMap[provinceId] || [];
  };

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  const handleProvinceChange = (e) => {
    setValue('province', e.target.value, { shouldValidate: true });
    setValue('city', '', { shouldValidate: true });
  };

  const getSelectedProvinceName = () => {
    if (!formValues.province) return '';
    const province = provinces.find(p => p.id.toString() === formValues.province);
    return province ? province.name : '';
  };

  const getSelectedCityName = () => {
    if (!formValues.city) return '';
    const city = cities.find(c => c.id.toString() === formValues.city);
    return city ? city.name : '';
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

// Step 4 Component
const Step4BusinessInfo = ({ register, errors, formValues, setValue }) => {
  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  const timeOptions = [
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Established *
          </label>
          <div className="relative">
            <select
              {...register('establishmentYear', {
                required: 'Year is required',
                min: { value: 1900, message: 'Enter valid year' },
                max: { value: currentYear, message: 'Cannot be future year' }
              })}
              className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('establishmentYear')}`}
              defaultValue=""
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaCalendarAlt />
            </div>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.establishmentYear && (
            <p className="mt-1 text-sm text-red-600">{errors.establishmentYear.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Branches *
          </label>
          <div className="relative">
            <select
              {...register('numberOfBranches', { required: true })}
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white"
              defaultValue=""
            >
              <option value="">Select number of branches</option>
              <option value="1">1 (Single Branch)</option>
              <option value="2">2 Branches</option>
              <option value="3">3 Branches</option>
              <option value="4">4 Branches</option>
              <option value="5">5 Branches</option>
              <option value="6-10">6-10 Branches</option>
              <option value="10+">More than 10</option>
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaBuilding />
            </div>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.numberOfBranches && (
            <p className="mt-1 text-sm text-red-600">Please select number of branches</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Operational Hours *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <select
              {...register('operationalHoursFrom', {
                required: 'Start time is required'
              })}
              className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('operationalHoursFrom')}`}
              defaultValue=""
            >
              <option value="">Opening Time</option>
              {timeOptions.map((time) => (
                <option key={`from-${time}`} value={time}>{time}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaClock />
            </div>
          </div>
          
          <div className="relative">
            <select
              {...register('operationalHoursTo', {
                required: 'Closing time is required'
              })}
              className={`w-full px-4 py-3 pl-11 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent appearance-none bg-white ${getFieldErrorStyle('operationalHoursTo')}`}
              defaultValue=""
            >
              <option value="">Closing Time</option>
              {timeOptions.map((time) => (
                <option key={`to-${time}`} value={time}>{time}</option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <FaClock />
            </div>
          </div>
        </div>
        {(errors.operationalHoursFrom || errors.operationalHoursTo) && (
          <p className="mt-1 text-sm text-red-600">
            {errors.operationalHoursFrom?.message || errors.operationalHoursTo?.message}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Select opening and closing times
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Services
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              {...register('hasHomeCollection')}
              className="w-5 h-5 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
            />
            <div className="flex items-center">
              <FaHome className="mr-2 text-[var(--accent-color)]" />
              <span>Home Sample Collection</span>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              {...register('hasAmbulance')}
              className="w-5 h-5 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
            />
            <div className="flex items-center">
              <FaAmbulance className="mr-2 text-[var(--accent-color)]" />
              <span>Ambulance Service</span>
            </div>
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Select additional services your lab provides
        </p>
      </div>
    </div>
  );
};

// Step 5 Component
const Step5Documents = ({ register, errors, setValue }) => {
  const [files, setFiles] = useState({
    registrationCertificate: null,
    cnicFront: null,
    cnicBack: null
  });

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only');
        e.target.value = '';
        return;
      }
      
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      // For form submission, we'll handle the files separately in onSubmit
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registration Certificate *
        </label>
        <div className="relative">
          <input
            {...register('registrationCertificate', {
              required: 'Registration certificate is required'
            })}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'registrationCertificate')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('registrationCertificate')}`}
          />
        </div>
        {errors.registrationCertificate && (
          <p className="mt-1 text-sm text-red-600">{errors.registrationCertificate.message}</p>
        )}
        {files.registrationCertificate && (
          <p className="mt-1 text-sm text-green-600">
            File selected: {files.registrationCertificate.name}
          </p>
        )}
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <FaFileUpload className="mr-2 text-[var(--accent-color)]" />
          <span>Upload government-issued registration certificate (PDF, JPG, PNG up to 5MB)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Owner CNIC (Front) *
          </label>
          <div className="relative">
            <input
              {...register('cnicFront', {
                required: 'CNIC front is required'
              })}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'cnicFront')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('cnicFront')}`}
            />
          </div>
          {errors.cnicFront && (
            <p className="mt-1 text-sm text-red-600">{errors.cnicFront.message}</p>
          )}
          {files.cnicFront && (
            <p className="mt-1 text-sm text-green-600">
              File selected: {files.cnicFront.name}
            </p>
          )}
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <FaUser className="mr-2 text-[var(--accent-color)]" />
            <span>Scanned copy of CNIC front (JPG, PNG up to 5MB)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNIC (Back) - Optional
          </label>
          <div className="relative">
            <input
              {...register('cnicBack')}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'cnicBack')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
            />
          </div>
          {files.cnicBack && (
            <p className="mt-1 text-sm text-green-600">
              File selected: {files.cnicBack.name}
            </p>
          )}
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <FaUser className="mr-2 text-[var(--accent-color)]" />
            <span>Scanned copy of CNIC back (Optional)</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-amber-800">Important Notes</h3>
            <ul className="mt-2 text-sm text-amber-700 space-y-1">
              <li>• All documents must be clear and readable</li>
              <li>• Maximum file size: 5MB per document</li>
              <li>• Approval may take 24-48 hours</li>
              <li>• Fake documents will lead to permanent ban</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 6 Component
const Step6Review = ({ register, errors, formValues, labTypes, isSubmitting }) => {
  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-[var(--primary-color)] mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Lab Name</p>
              <p className="font-medium">{formValues.labName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration Number</p>
              <p className="font-medium">{formValues.registrationNumber || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lab Type</p>
              <p className="font-medium">
                {labTypes.find(t => t.id === formValues.labType)?.name || 'Not selected'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-[var(--primary-color)] mb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Contact Person</p>
              <p className="font-medium">{formValues.contactPerson || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium">{formValues.designation || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formValues.email || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-medium">
                {formValues.mobileNumber ? `+92 ${formValues.mobileNumber}` : 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-[var(--primary-color)] mb-2">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Year Established</p>
              <p className="font-medium">{formValues.establishmentYear || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Branches</p>
              <p className="font-medium">{formValues.numberOfBranches || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Operational Hours</p>
              <p className="font-medium">
                {formValues.operationalHoursFrom && formValues.operationalHoursTo 
                  ? `${formValues.operationalHoursFrom} - ${formValues.operationalHoursTo}`
                  : 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Additional Services</p>
              <p className="font-medium">
                {[
                  formValues.hasHomeCollection && 'Home Collection',
                  formValues.hasAmbulance && 'Ambulance'
                ].filter(Boolean).join(', ') || 'None'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-[var(--primary-color)] mb-2">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{formValues.completeAddress || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('termsAccepted', {
              required: 'You must accept the terms'
            })}
            className={`mt-1 w-5 h-5 rounded focus:ring-[var(--primary-color)] ${getFieldErrorStyle('termsAccepted')}`}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              I agree to the Terms and Conditions and Privacy Policy
            </p>
            {errors.termsAccepted && (
              <p className="mt-1 text-red-600">{errors.termsAccepted.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('commissionAgreed', {
              required: 'You must agree to commission'
            })}
            className={`mt-1 w-5 h-5 rounded focus:ring-[var(--primary-color)] ${getFieldErrorStyle('commissionAgreed')}`}
          />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              I agree to the 15% commission on all bookings through the platform
            </p>
            <p className="text-gray-500 mt-1">
              Commission applies only on successful bookings. No registration or monthly fees.
            </p>
            {errors.commissionAgreed && (
              <p className="mt-1 text-red-600">{errors.commissionAgreed.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const LabRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState({
    registrationCertificate: null,
    cnicFront: null,
    cnicBack: null
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: <FaHospital /> },
    { id: 2, title: 'Contact', icon: <FaUser /> },
    { id: 3, title: 'Location', icon: <FaMapMarkerAlt /> },
    { id: 4, title: 'Business', icon: <FaBriefcase /> },
    { id: 5, title: 'Documents', icon: <FaFileUpload /> },
    { id: 6, title: 'Review', icon: <FaCheck /> }
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    reset,
    clearErrors,
    setError
  } = useForm({
    mode: 'onChange'
  });

  const formValues = watch();

  const stepRequirements = {
    1: ['labName', 'registrationNumber', 'labType'],
    2: ['email', 'password', 'confirmPassword', 'contactPerson', 'designation', 'mobileNumber'],
    3: ['province', 'city', 'completeAddress'],
    4: ['establishmentYear', 'numberOfBranches', 'operationalHoursFrom', 'operationalHoursTo'],
    5: ['registrationCertificate', 'cnicFront'],
    6: ['termsAccepted', 'commissionAgreed']
  };

  const validateStep = async (step) => {
    const fields = stepRequirements[step];
    if (!fields) return true;
    
    const result = await trigger(fields);
    return result;
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

  const goToStep = async (stepNumber) => {
    let canGo = true;
    for (let i = 1; i < stepNumber; i++) {
      if (!completedSteps.includes(i)) {
        const isValid = await validateStep(i);
        if (!isValid) {
          canGo = false;
          break;
        }
        setCompletedSteps(prev => [...new Set([...prev, i])]);
      }
    }
    
    if (canGo) {
      setCurrentStep(stepNumber);
      window.scrollTo(0, 0);
    }
  };

  const handleFileChange = (fieldName, file) => {
    setFiles(prev => ({ ...prev, [fieldName]: file }));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all form data
      Object.keys(data).forEach(key => {
        if (key !== 'registrationCertificate' && key !== 'cnicFront' && key !== 'cnicBack') {
          formData.append(key, data[key]);
        }
      });
      
      // Append files if they exist
      if (files.registrationCertificate) {
        formData.append('registrationCertificate', files.registrationCertificate);
      }
      if (files.cnicFront) {
        formData.append('cnicFront', files.cnicFront);
      }
      if (files.cnicBack) {
        formData.append('cnicBack', files.cnicBack);
      }
      
      // Submit to API
      const response = await api.post('/labreg/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        alert('Registration submitted successfully! Admin will review within 24-48 hours.');
        
        // Reset form
        reset();
        setCurrentStep(1);
        setCompletedSteps([]);
        setFiles({
          registrationCertificate: null,
          cnicFront: null,
          cnicBack: null
        });
      } else {
        alert(`Registration failed: ${response.data.message || 'Please try again.'}`);
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.message || 'Registration failed. Please try again.';
        alert(`Error: ${errorMessage}`);
      } else if (error.request) {
        // Request made but no response
        alert('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        alert('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepCompleted = (step) => completedSteps.includes(step);

  const getStepColor = (step) => {
    if (currentStep === step) return 'bg-[var(--primary-color)] text-white';
    if (isStepCompleted(step)) return 'bg-[var(--accent-color)] text-white';
    return 'bg-gray-200 text-gray-500';
  };

  const labTypes = [
    { id: 'diagnostic', name: 'Diagnostic Center' },
    { id: 'hospital', name: 'Hospital Laboratory' },
    { id: 'independent', name: 'Independent Lab' },
    { id: 'research', name: 'Research Lab' },
    { id: 'radiology', name: 'Radiology Center' },
    { id: 'specialized', name: 'Specialized Test Lab' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-light)]/20 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--secondary-color)] mb-2">
            Lab Registration - Pakistan
          </h1>
          <p className="text-gray-600">
            Register your diagnostic laboratory with our network
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => goToStep(step.id)}
                  className="flex flex-col items-center"
                  disabled={!isStepCompleted(step.id - 1) && step.id > 1}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getStepColor(step.id)}`}>
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium ${currentStep === step.id ? 'text-[var(--primary-color)]' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    isStepCompleted(step.id) ? 'bg-[var(--accent-color)]' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white">
            <h2 className="text-xl font-bold">
              {steps[currentStep - 1]?.title}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {currentStep === 1 && (
              <Step1BasicInfo
                register={register}
                errors={errors}
                formValues={formValues}
                labTypes={labTypes}
              />
            )}

            {currentStep === 2 && (
              <Step2ContactDetails
                register={register}
                errors={errors}
                formValues={formValues}
                getValues={getValues}
                setError={setError}
                clearErrors={clearErrors}
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
              <Step4BusinessInfo
                register={register}
                errors={errors}
                formValues={formValues}
                setValue={setValue}
              />
            )}

            {currentStep === 5 && (
              <Step5Documents
                register={register}
                errors={errors}
                setValue={setValue}
              />
            )}

            {currentStep === 6 && (
              <Step6Review
                register={register}
                errors={errors}
                formValues={formValues}
                labTypes={labTypes}
                isSubmitting={isSubmitting}
              />
            )}

            {currentStep < 6 ? (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-[var(--primary-color)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentStep === 1}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--hover-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-colors"
                >
                  Continue
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-medium hover:bg-[var(--hover-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Registration...
                    </div>
                  ) : (
                    'Submit Registration Request'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500 mb-2">
            Step {currentStep} of {steps.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help? Call <span className="text-[var(--primary-color)] font-medium">+92 300 1234567</span> or email{' '}
            <a href="mailto:support@labconnect.com" className="text-[var(--primary-color)] hover:text-[var(--hover-color)]">
              support@labconnect.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabRegistrationForm;