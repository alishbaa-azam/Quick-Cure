// components/Payment/StripePaymentModal.jsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51STVEU99Q3pKqx1GOFn5Uc9kMxZWvwTI8gp7diY0vzydqp8J2cOOLqEF4AXTkr3TV9FtaKSWwUtH6IFjkRp7sHLn002UYmHC6v');

// ========================
// PAYMENT API HELPER
// ========================
const paymentAPI = {
  createPaymentIntent: async (data) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  confirmPayment: async (paymentIntentId) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/payments/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ paymentIntentId })
    });
    return res.json();
  }
};

// ========================
// CHECKOUT FORM (inner component that needs Elements context)
// ========================
const CheckoutForm = ({ amount, onSuccess, onError, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [elementReady, setElementReady] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Payment system is still loading. Please wait...');
      return;
    }
    
    if (!elementReady) {
      setErrorMessage('Payment form is still loading. Please wait a moment...');
      return;
    }

    setProcessing(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: window.location.origin + '/payment-confirmation'
        }
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
        onError?.(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm with backend
        const result = await paymentAPI.confirmPayment(paymentIntent.id);
        if (result.success) {
          onSuccess?.(result.data);
        } else {
          setErrorMessage('Payment verification failed');
          onError?.(new Error('Payment verification failed'));
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong');
      onError?.(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">Rs. {amount?.toLocaleString() || 0}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">10% Commission</p>
            <p className="text-sm text-[#2c6774]">QuickCure fee included</p>
          </div>
        </div>
      </div>

      {/* Payment Element */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <PaymentElement onReady={() => {
          console.log('Payment Element ready');
          setElementReady(true);
        }} />
      </div>

      {/* Loading overlay when element not ready */}
      {!elementReady && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-[#2c6774] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Loading payment form...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={processing}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !elementReady || processing}
          className="flex-1 px-4 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            `Pay Rs. ${amount?.toLocaleString() || 0}`
          )}
        </button>
      </div>
    </form>
  );
};

// ========================
// STANDALONE PAYMENT MODAL  
// ========================
const StripePaymentModal = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess,
  amount,
  bookingType,
  bookingId,
  customerName = '',
  customerEmail = '',
  customerPhone = ''
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [renderKey, setRenderKey] = useState(0);

  // Reset and create payment intent when modal opens
  useEffect(() => {
    if (isOpen && amount && bookingType && bookingId) {
      initializePayment();
    } else {
      // Reset state when modal closes
      setClientSecret(null);
      setLoading(false);
      setError('');
    }
  }, [isOpen]);

  const initializePayment = async () => {
    setLoading(true);
    setError('');
    setClientSecret(null);

    try {
      const result = await paymentAPI.createPaymentIntent({
        bookingType,
        bookingId,
        amount: Math.round(amount),
        customerName,
        customerEmail,
        customerPhone
      });

      if (result.success) {
        // Increment key to force full remount of Elements tree
        setRenderKey(prev => prev + 1);
        setClientSecret(result.data.clientSecret);
      } else {
        setError(result.message || 'Failed to initialize payment');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to payment server');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
              <p className="text-sm text-gray-600 mt-1">
                {bookingType === 'appointment' ? 'Doctor Appointment' : 
                 bookingType === 'lab_booking' ? 'Lab Test Booking' : 
                 'Medicine Order'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Initializing payment...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={initializePayment}
                className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a]"
              >
                Try Again
              </button>
            </div>
          ) : clientSecret ? (
            <Elements 
              key={`stripe-elements-${renderKey}`}
              stripe={stripePromise} 
              options={{ 
                clientSecret,
                developerTools: {
                  assistant: {
                    enabled: false,
                  },
                },
              }}
            >
              <CheckoutForm
                amount={amount}
                onSuccess={(data) => {
                  onPaymentSuccess?.(data);
                }}
                onError={(err) => {
                  console.error('Payment error:', err);
                }}
                onClose={onClose}
              />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Unable to load payment form</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-2 justify-center text-xs text-gray-500">
            <span>10% QuickCure commission applies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentModal;

// Export API helper for direct use
export { paymentAPI };