// components/Payment/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Stripe publishable key
// const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51STVEU99Q3pKqx1GOFn5Uc9kMxZWvwTI8gp7diY0vzydqp8J2cOOLqEF4AXTkr3TV9FtaKSWwUtH6IFjkRp7sHLn002UYmHC6v';
// const stripePromise = loadStripe(stripeKey);
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51STVEU99Q3pKqx1GOFn5Uc9kMxZWvwTI8gp7diY0vzydqp8J2cOOLqEF4AXTkr3TV9FtaKSWwUtH6IFjkRp7sHLn002UYmHC6v';
const stripePromise = loadStripe(stripeKey, {
  developerTools: {
    assistant: {
      enabled: false,
    },
  },
});

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
// BOOKING TYPE LABELS
// ========================
const bookingLabels = {
  appointment: 'Doctor Appointment',
  lab_booking: 'Lab Test Booking',
  medicine_order: 'Medicine Order'
};

const bookingIcons = {
  appointment: '🩺',
  lab_booking: '🔬',
  medicine_order: ''
};

// ========================
// CHECKOUT FORM
// ========================
const CheckoutForm = ({ amount, bookingType, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [elementReady, setElementReady] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Payment system is loading. Please wait...');
      return;
    }
    if (!elementReady) {
      setErrorMessage('Payment form is loading. Please wait a moment...');
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
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const result = await paymentAPI.confirmPayment(paymentIntent.id);
        if (result.success) {
          onPaymentSuccess(result.data);
        } else {
          setErrorMessage('Payment verification failed');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6" style={{ border: `1px solid var(--bg-light)` }}>
        <PaymentElement onReady={() => {
          console.log('Payment Element ready');
          setElementReady(true);
        }} />
        {!elementReady && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: `var(--primary-color) var(--primary-color) var(--primary-color) transparent` }}></div>
              <span className="text-sm" style={{ color: `var(--accent-color)` }}>Loading payment form...</span>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
          <p className="text-sm" style={{ color: '#dc2626' }}>{errorMessage}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!stripe || !elementReady || processing}
          className="flex-1 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
          style={{ backgroundColor: `var(--primary-color)`, color: `var(--white)` }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--hover-color)`}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `var(--primary-color)`}
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
// PAYMENT PAGE
// ========================
const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const bookingType = state?.bookingType || 'appointment';
  const amount = state?.amount || 0;
  const bookingId = state?.bookingId || '';
  const customerName = state?.customerName || '';
  const customerEmail = state?.customerEmail || '';
  const customerPhone = state?.customerPhone || '';

  useEffect(() => {
    console.log('Payment page loaded with state:', state);
    if (!state || !state.bookingType || !state.bookingId || !state.amount) {
      console.warn('Invalid payment request - missing booking info');
      setError('Booking information is missing. Please start your booking again.');
      setLoading(false);
      return;
    }
    initializePayment();
  }, []);

  const initializePayment = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Creating payment intent:', { bookingType, bookingId, amount });
      const result = await paymentAPI.createPaymentIntent({
        bookingType,
        bookingId,
        amount: Math.round(amount),
        customerName,
        customerEmail,
        customerPhone
      });

      console.log('Payment intent result:', result);

      if (result.success) {
        setRenderKey(prev => prev + 1);
        setClientSecret(result.data.clientSecret);
      } else {
        setError(result.message || 'Failed to initialize payment');
      }
    } catch (err) {
      console.error('Payment initialization error:', err);
      setError(err.message || 'Failed to connect to payment server. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handlePaymentSuccess = (data) => {
    console.log('Payment success:', data);
    setPaymentSuccess(true);
    
    // Dispatch events to refresh orders/bookings in user dashboard and lab dashboard
    window.dispatchEvent(new CustomEvent('ordersUpdated'));
    window.dispatchEvent(new CustomEvent('labTestsUpdated'));
    window.dispatchEvent(new CustomEvent('bookingsUpdated'));
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToDashboard = () => {
    navigate('/userdashboard');
  };

  // Success View
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, var(--bg-light) 0%, #ffffff 100%)` }}>
        <div className="max-w-md w-full rounded-2xl shadow-xl p-8 text-center" style={{ backgroundColor: `var(--white)` }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--bg-light)` }}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: `var(--primary-color)` }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: `var(--secondary-color)` }}>Payment Successful!</h1>
          <p className="mb-2" style={{ color: `var(--accent-color)` }}>Your {bookingLabels[bookingType] || 'booking'} is confirmed.</p>
          {customerName && <p className="text-sm mb-6" style={{ color: `var(--accent-color)` }}>Thank you, {customerName}!</p>}
          
          <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: `var(--bg-light)`, border: `1px solid var(--accent-color)` }}>
            <p className="font-semibold" style={{ color: `var(--secondary-color)` }}>Rs. {amount?.toLocaleString()}</p>
            <p className="text-sm" style={{ color: `var(--primary-color)` }}>Paid successfully</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoToDashboard}
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              style={{ backgroundColor: `var(--primary-color)`, color: `var(--white)` }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--hover-color)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `var(--primary-color)`}
            >
              Go to Dashboard
            </button>
            <button
              onClick={handleBackToHome}
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200"
              style={{ border: `2px solid var(--primary-color)`, color: `var(--primary-color)`, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--bg-light)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Error View
  if (error && !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)' }}>
        <div className="max-w-md w-full rounded-2xl shadow-xl p-8 text-center" style={{ backgroundColor: `var(--white)` }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#fecaca' }}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#dc2626' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: `var(--secondary-color)` }}>Payment Error</h1>
          <p className="mb-6" style={{ color: `var(--accent-color)` }}>{error}</p>
          <div className="space-y-3">
            <button
              onClick={initializePayment}
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              style={{ backgroundColor: `var(--primary-color)`, color: `var(--white)` }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--hover-color)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `var(--primary-color)`}
            >
              Try Again
            </button>
            <button
              onClick={handleBackToHome}
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200"
              style={{ border: `2px solid var(--bg-light)`, color: `var(--accent-color)`, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--bg-light)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, var(--bg-light) 0%, #ffffff 100%)` }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: `var(--primary-color) var(--primary-color) var(--primary-color) transparent` }}></div>
          <p className="text-lg" style={{ color: `var(--accent-color)` }}>Initializing payment...</p>
        </div>
      </div>
    );
  }

  // Payment Form
  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(135deg, var(--bg-light) 0%, #ffffff 100%)` }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{bookingIcons[bookingType]}</div>
          <h1 className="text-3xl font-bold" style={{ color: `var(--secondary-color)` }}>Complete Payment</h1>
          <p className="mt-1" style={{ color: `var(--accent-color)` }}>{bookingLabels[bookingType] || 'Payment'}</p>
        </div>

        {/* Booking Summary Card */}
        <div className="rounded-2xl shadow-lg p-6 mb-6" style={{ backgroundColor: `var(--white)`, border: `1px solid var(--bg-light)` }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: `var(--secondary-color)` }}>Booking Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2" style={{ borderBottom: `1px solid var(--bg-light)` }}>
              <span style={{ color: `var(--accent-color)` }}>Type</span>
              <span className="font-medium" style={{ color: `var(--secondary-color)` }}>{bookingLabels[bookingType] || 'Booking'}</span>
            </div>
            {customerName && (
              <div className="flex justify-between items-center py-2" style={{ borderBottom: `1px solid var(--bg-light)` }}>
                <span style={{ color: `var(--accent-color)` }}>Customer</span>
                <span className="font-medium" style={{ color: `var(--secondary-color)` }}>{customerName}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span style={{ color: `var(--accent-color)` }}>Total Amount</span>
              <span className="text-2xl font-bold" style={{ color: `var(--primary-color)` }}>Rs. {amount?.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg text-xs text-center" style={{ backgroundColor: `var(--bg-light)`, color: `var(--secondary-color)` }}>
            <span>10% QuickCure commission included</span>
          </div>
        </div>

        {/* Stripe Payment Form */}
        {clientSecret ? (
          <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: `var(--white)`, border: `1px solid var(--bg-light)` }}>
            <Elements key={`payment-${renderKey}`} stripe={stripePromise} options={{ 
              clientSecret,
              developerTools: {
                assistant: {
                  enabled: false,
                },
              },
            }}>
              <CheckoutForm
                amount={amount}
                bookingType={bookingType}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl shadow-lg" style={{ backgroundColor: `var(--white)`, border: `1px solid var(--bg-light)` }}>
            <p style={{ color: `var(--accent-color)` }}>Unable to load payment form</p>
            <button
              onClick={initializePayment}
              className="mt-4 px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              style={{ backgroundColor: `var(--primary-color)`, color: `var(--white)` }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--hover-color)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `var(--primary-color)`}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;