import React, { useState } from 'react';
import testimonialData from './TestimonialData';
import './TestimonialCarousel.css';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonialData[currentIndex];

  return (
    <div className="testimonial-carousel">
      <div className="carousel-container">
        <div className="carousel-header">
          <h2>Testimonial</h2>
          <h3>What our Customers Say</h3>
        </div>

        <div className="carousel-content">
          <button className="arrow-btn left-arrow" onClick={prevTestimonial}>
            ‹
          </button>

          <div className="testimonial-card">
            <div className="testimonial-text">
              <p>"{currentTestimonial.text}"</p>
            </div>
            <div className="author-info">
              <h4 className="author-name">{currentTestimonial.author}</h4>
              <p className="author-position">{currentTestimonial.position}</p>
            </div>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={index < currentTestimonial.rating ? 'star filled' : 'star'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button className="arrow-btn right-arrow" onClick={nextTestimonial}>
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {testimonialData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;