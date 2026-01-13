import React, { useState } from 'react';
import { FaCalendarAlt, FaBuilding, FaClock, FaHome, FaAmbulance } from 'react-icons/fa';

const Step4BusinessInfo = ({ register, errors, formValues, setValue }) => {
  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // Simple time options
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

export default Step4BusinessInfo;