import React from 'react';
import { FaFileUpload, FaUser } from 'react-icons/fa';

const Step5Documents = ({ register, errors }) => {
  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('registrationCertificate')}`}
          />
        </div>
        {errors.registrationCertificate && (
          <p className="mt-1 text-sm text-red-600">{errors.registrationCertificate.message}</p>
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${getFieldErrorStyle('cnicFront')}`}
            />
          </div>
          {errors.cnicFront && (
            <p className="mt-1 text-sm text-red-600">{errors.cnicFront.message}</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
            />
          </div>
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

export default Step5Documents;