// TestimonialCarousel.jsx
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

const API_BASE_URL = 'http://localhost:5000';
const API_ENDPOINT = `${API_BASE_URL}/api/patient-testimonials`;

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      
      if (data.success) {
        setTestimonials(data.data);
        setError(null);
      } else {
        setError('Failed to load testimonials');
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      setSubmitting(true);
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });

      const data = await response.json();

      if (data.success) {
        await fetchTestimonials();
        setShowForm(false);
        setCurrentIndex(0);
        alert('Thank you for your feedback!');
      } else {
        alert(data.message || 'Failed to submit testimonial');
      }
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      alert('Unable to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-[60px] px-5 font-sans min-h-[500px] flex items-center justify-center mb-[100px]">
        <div className="max-w-[800px] w-full text-center">
          <div className="mb-10">
            <h2 className="text-base font-normal tracking-[3px] mb-2.5 uppercase opacity-90" style={{color: '#2c6774'}}>Testimonial</h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-5" style={{color: '#2c6774'}}>What our Customers Say</h3>
          </div>
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-[60px] px-5 font-sans min-h-[500px] flex items-center justify-center mb-[100px]">
        <div className="max-w-[800px] w-full text-center">
          <div className="mb-10">
            <h2 className="text-base font-normal tracking-[3px] mb-2.5 uppercase opacity-90" style={{color: '#2c6774'}}>Testimonial</h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-5" style={{color: '#2c6774'}}>What our Customers Say</h3>
          </div>
          <div className="text-center py-10 text-red-500">{error}</div>
          <button 
            onClick={fetchTestimonials} 
            className="mt-2.5 px-4 py-2 text-white rounded-md cursor-pointer transition-all"
            style={{backgroundColor: '#2c6774'}}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-[60px] px-5 font-sans min-h-[500px] flex items-center justify-center mb-[100px]">
      <div className="max-w-[800px] w-full text-center">
        <div className="mb-10">
          <h2 className="text-base font-normal tracking-[3px] mb-2.5 uppercase opacity-90" style={{color: '#2c6774'}}>Testimonial</h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-5" style={{color: '#2c6774'}}>What our Customers Say</h3>
        </div>

        {testimonials.length > 0 ? (
          <>
            <div className="flex items-center justify-between gap-5 mb-[30px] flex-col sm:flex-row">
              <button 
                onClick={prevTestimonial}
                className="hidden sm:flex w-[50px] h-[50px] rounded-full text-2xl cursor-pointer transition-all duration-300 hover:scale-110 items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: '#f5f5f5', 
                  border: '2px solid #2c6774', 
                  color: '#2c6774'
                }}
              >
                ‹
              </button>

              <div 
                className="rounded-[15px] p-10 flex-1 max-w-[600px] shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  background: 'white',
                  border: '2px solid #2c6774',
                  boxShadow: '0 8px 32px rgba(44, 103, 116, 0.1)'
                }}
              >
                <div className="mb-[30px]">
                  <p className="text-lg leading-relaxed italic text-gray-700">
                    "{currentTestimonial.comment}"
                  </p>
                </div>
                <div className="mb-5">
                  <h4 className="text-xl font-bold mb-1" style={{color: '#2c6774'}}>
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm opacity-80" style={{color: '#2c6774'}}>
                    {new Date(currentTestimonial.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index} 
                      className={`text-2xl transition-colors duration-200 ${
                        index < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={nextTestimonial}
                className="hidden sm:flex w-[50px] h-[50px] rounded-full text-2xl cursor-pointer transition-all duration-300 hover:scale-110 items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: '#f5f5f5', 
                  border: '2px solid #2c6774', 
                  color: '#2c6774'
                }}
              >
                ›
              </button>
            </div>

            <div className="flex justify-center gap-2.5 mt-[30px]">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentIndex ? 'scale-110' : 'opacity-50'
                  }`}
                  style={{
                    backgroundColor: index === currentIndex ? '#2c6774' : '#9fbfc5'
                  }}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <div 
            className="text-center py-10 text-gray-600 rounded-[15px] my-5"
            style={{background: 'rgba(0, 0, 0, 0.05)'}}
          >
            <p>No testimonials yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* Write a Review Button - Updated with #2c6774 color */}
        <button 
          onClick={() => setShowForm(!showForm)}
          className="mt-[30px] px-6 py-3 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 mx-auto hover:-translate-y-0.5"
          style={{
            backgroundColor: '#2c6774',
            color: 'white',
            boxShadow: '0 2px 10px rgba(44, 103, 116, 0.3)',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1a4a55';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(44, 103, 116, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2c6774';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(44, 103, 116, 0.3)';
          }}
        >
          {showForm ? '✍️ Cancel' : '✍️ Write a Review'}
        </button>

        {showForm && (
          <ReviewForm 
            onSubmit={handleSubmitReview}
            onCancel={() => setShowForm(false)}
            isSubmitting={submitting}
          />
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel;