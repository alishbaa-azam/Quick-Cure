import React from 'react';
import { FaBuilding, FaFileAlt } from 'react-icons/fa';

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

export default Step1BasicInfo;