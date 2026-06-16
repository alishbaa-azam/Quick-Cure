// ReviewForm.jsx
import React, { useState } from 'react';

const ReviewForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    } else if (formData.comment.length < 5) {
      newErrors.comment = 'Comment must be at least 5 characters';
    } else if (formData.comment.length > 500) {
      newErrors.comment = 'Comment cannot exceed 500 characters';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-[15px] p-[30px] max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
          <h3 className="text-2xl font-bold m-0" style={{color: '#2c6774'}}>
            Share Your Experience
          </h3>
          <button 
            onClick={onCancel}
            className="bg-none border-none text-3xl cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-0 w-[30px] h-[30px] flex items-center justify-center"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-gray-800 text-sm">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`p-[10px_12px] border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:border-[#ff9e15] focus:shadow-[0_0_0_3px_rgba(255,158,21,0.1)] ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-800 text-sm">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2.5 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="cursor-pointer relative inline-flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={handleChange}
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <span className={`text-[28px] transition-colors duration-200 ${
                    formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400`}>
                    ★
                  </span>
                </label>
              ))}
            </div>
            {errors.rating && (
              <span className="text-red-500 text-xs mt-1">{errors.rating}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="comment" className="font-semibold text-gray-800 text-sm">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your experience with QuickCure..."
              rows="4"
              className={`p-[10px_12px] border-2 rounded-lg text-sm transition-all duration-300 font-sans focus:outline-none focus:border-[#ff9e15] focus:shadow-[0_0_0_3px_rgba(255,158,21,0.1)] ${
                errors.comment ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <div className="text-xs text-gray-400 text-right">
              {formData.comment.length}/500 characters
            </div>
            {errors.comment && (
              <span className="text-red-500 text-xs mt-1">{errors.comment}</span>
            )}
          </div>

          <div className="flex gap-4 justify-end mt-2.5 sm:flex-row flex-col">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 sm:w-auto w-full"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 bg-[#2c6774] text-white hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 sm:w-auto w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm; 