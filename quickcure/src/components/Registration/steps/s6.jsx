import React from 'react';

const Step6Review = ({ register, errors, formValues, labTypes, isSubmitting }) => {
  const getFieldErrorStyle = (fieldName) => {
    return errors[fieldName] ? 'border-red-300' : 'border-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
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
              <p className="font-medium">{formValues.operationalHours || 'Not provided'}</p>
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
      </div>

      {/* Terms and Conditions */}
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

      {/* Submit Button */}
      {/* <button
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
      </button> */}
    </div>
  );
};

export default Step6Review;