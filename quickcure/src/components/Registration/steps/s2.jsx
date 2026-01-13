

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Step2ContactDetails = ({ register, errors, formValues, getValues }) => {
  const [existingEmails, setExistingEmails] = useState([]);
  const [emailValidationLoading, setEmailValidationLoading] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch existing emails from API (you'll need to implement this)
  useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/get-existing-emails');
        const data = await response.json();
        setExistingEmails(data.emails || []);
      } catch (error) {
        console.error('Error fetching existing emails:', error);
      }
    };
    
    fetchExistingEmails();
  }, []);

  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  // Email validation function
  const validateEmail = async (email) => {
    if (!email) return 'Email is required';
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    
    // Check if email already exists
    if (existingEmails.includes(email.toLowerCase())) {
      return 'This email is already registered. Please use a different email.';
    }
    
    // Optional: Add API validation for real-time checking
    setEmailValidationLoading(true);
    setEmailValidationError('');
    
    try {
      const response = await fetch(`/api/check-email-exists?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.exists) {
        return 'This email is already registered. Please use a different email.';
      }
    } catch (error) {
      console.error('Error checking email:', error);
      // Don't block form submission if validation API fails
      return true; // Return true to allow form submission
    } finally {
      setEmailValidationLoading(false);
    }
    
    return true; // Email is valid and doesn't exist
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
        /* Style for dropdown selected option */
        select option:checked {
          background-color: #10b981 !important; /* green-500 */
          color: white !important;
        }
        
        select option:hover {
          background-color: #d1fae5 !important; /* green-100 */
        }
        
        /* For multiple selects */
        select option:checked,
        select option:checked:focus,
        select option:checked:hover {
          background-color: #10b981 !important;
          color: white !important;
        }
        
        /* Style for dropdown when open */
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
                // Clear validation error on change
                if (errors.email) {
                  errors.email = undefined;
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

export default Step2ContactDetails;