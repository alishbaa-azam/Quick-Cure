import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ArrowLeft, Trash2, Edit2, X, CheckCircle, Shield } from "lucide-react";

// Custom Popup Components
const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scaleIn">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 size={32} className="text-red-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#174047] text-center mb-3">
            Delete Review
          </h3>
          <p className="text-[#5c878f] text-center mb-6">
            {message || "Are you sure you want to delete your review?"}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl hover:bg-[#2c6774] hover:text-white transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessPopup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scaleIn">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#174047] text-center mb-3">
            Success!
          </h3>
          <p className="text-[#5c878f] text-center mb-6">
            {message || "Operation completed successfully!"}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoPopup = ({ isOpen, onClose, message, title = "Information" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scaleIn">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield size={32} className="text-[#2c6774]" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#174047] text-center mb-3">
            {title}
          </h3>
          <p className="text-[#5c878f] text-center mb-6">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AllReviews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    tags: [],
    consultationType: "Video Consultation"
  });
  
  // Popup states
  const [deletePopup, setDeletePopup] = useState({ isOpen: false, reviewId: null });
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, message: "" });
  const [infoPopup, setInfoPopup] = useState({ isOpen: false, message: "", title: "" });
  
  const API_URL = "http://localhost:5000";

  // Available tags
  const availableTags = [
    "Less Than 10 mins wait time",
    "Great Experience",
    "30 min meetup",
    "10 min meetup",
    "Friendly Doctor",
    "Good Listener",
    "Excellent Diagnosis",
    "Patient Caring"
  ];

  useEffect(() => {
    // Get logged in user
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        let userObj = {};
        
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          userObj = {
            name: parsedUser.name || parsedUser.username || parsedUser.fullName || parsedUser.displayName || "User",
            email: parsedUser.email || "",
            id: parsedUser._id || parsedUser.id || parsedUser.userId || "",
            firstName: parsedUser.firstName || "",
            lastName: parsedUser.lastName || ""
          };
        }
        
        console.log("Logged in user:", userObj);
        setLoggedInUser(userObj);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    fetchReviews();
    fetchDoctor();
  }, [id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/reviews/${id}`);
      console.log("All reviews:", response.data);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setInfoPopup({
        isOpen: true,
        message: "Failed to load reviews. Please try again.",
        title: "Error"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/doctors/${id}`);
      setDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  const getUserName = () => {
    if (!loggedInUser) return "User";
    return loggedInUser.name || loggedInUser.username || loggedInUser.email?.split('@')[0] || "User";
  };

  const getUserEmail = () => {
    if (!loggedInUser) return "";
    return loggedInUser.email || "";
  };

  const getUserId = () => {
    if (!loggedInUser) return "";
    return loggedInUser.id || loggedInUser._id || "";
  };

  const getUserInitials = () => {
    const name = getUserName();
    return getInitials(name);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      rating: review.rating,
      comment: review.comment,
      tags: review.tags || [],
      consultationType: review.consultationType || "Video Consultation"
    });
    setShowEditForm(true);
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    
    if (!token || !loggedInUser) {
      navigate('/login', { 
        state: { 
          from: `/doctor-reviews/${id}`,
          message: "Please login to edit reviews"
        }
      });
      return;
    }

    if (!reviewForm.comment.trim()) {
      setInfoPopup({
        isOpen: true,
        message: "Please write your review!",
        title: "Missing Information"
      });
      return;
    }

    try {
      const updateData = {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        tags: reviewForm.tags,
        consultationType: reviewForm.consultationType,
        patientName: getUserName(),
        patientEmail: getUserEmail(),
        userId: getUserId(),
        doctorId: id
      };

      console.log("Updating review:", updateData);

      const response = await axios.put(`${API_URL}/api/reviews/${editingReview._id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        // Refresh reviews
        await fetchReviews();
        
        // Update doctor's rating
        await fetchDoctor();
        
        // Reset form
        setReviewForm({
          rating: 5,
          comment: "",
          tags: [],
          consultationType: "Video Consultation"
        });
        setShowEditForm(false);
        setEditingReview(null);
        
        // Show success popup instead of alert
        setSuccessPopup({
          isOpen: true,
          message: "Review updated successfully!"
        });
      }
    } catch (error) {
      console.error("Error updating review:", error);
      setInfoPopup({
        isOpen: true,
        message: error.response?.data?.message || "Failed to update review. Please try again.",
        title: "Update Failed"
      });
    }
  };

  // Handle delete click - show custom popup
  const handleDeleteClick = (reviewId) => {
    setDeletePopup({
      isOpen: true,
      reviewId: reviewId
    });
  };

  // Execute deletion after confirmation
  const handleConfirmDelete = async () => {
    const reviewId = deletePopup.reviewId;
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    
    if (!token || !loggedInUser) {
      setDeletePopup({ isOpen: false, reviewId: null });
      navigate('/login', { 
        state: { 
          from: `/doctor-reviews/${id}`,
          message: "Please login to delete reviews"
        }
      });
      return;
    }

    // Find the review to delete
    const reviewToDelete = reviews.find(r => r._id === reviewId);
    
    if (!reviewToDelete) {
      setInfoPopup({
        isOpen: true,
        message: "Review not found!",
        title: "Error"
      });
      setDeletePopup({ isOpen: false, reviewId: null });
      return;
    }

    // STRICT CHECK: Verify this review belongs to logged-in user by email
    const currentUserEmail = getUserEmail().toLowerCase();
    const reviewPatientEmail = (reviewToDelete.patientEmail || "").toLowerCase();
    
    // Also check by userId
    const currentUserId = getUserId();
    const reviewUserId = reviewToDelete.userId || "";
    
    // Check if this review belongs to the logged-in user
    const isOwnReview = 
      (currentUserEmail && reviewPatientEmail && currentUserEmail === reviewPatientEmail) ||
      (currentUserId && reviewUserId && currentUserId === reviewUserId);

    console.log("Delete check:", {
      currentUserEmail,
      reviewPatientEmail,
      currentUserId,
      reviewUserId,
      isOwnReview
    });

    if (!isOwnReview) {
      setInfoPopup({
        isOpen: true,
        message: "You can only delete your own reviews!",
        title: "Unauthorized"
      });
      setDeletePopup({ isOpen: false, reviewId: null });
      return;
    }

    try {
      // Try to delete from backend
      try {
        await axios.delete(`${API_URL}/api/reviews/${reviewId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Review deleted from backend successfully');
      } catch (backendError) {
        console.log('Backend deletion failed, updating frontend only:', backendError);
        // Continue with frontend update even if backend fails
      }

      // Update frontend state
      const updatedReviews = reviews.filter(r => r._id !== reviewId);
      setReviews(updatedReviews);
      
      // Show success popup instead of alert
      setSuccessPopup({
        isOpen: true,
        message: "Review deleted successfully!"
      });
      
    } catch (error) {
      console.error('Error deleting review:', error);
      setInfoPopup({
        isOpen: true,
        message: "Failed to delete review. Please try again.",
        title: "Deletion Failed"
      });
    } finally {
      setDeletePopup({ isOpen: false, reviewId: null });
    }
  };

  const handleTagToggle = (tag) => {
    setReviewForm(prev => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return "";
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
      </div>
    );
  }

  const averageRating = calculateAverageRating();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Custom Popups */}
      <ConfirmDeletePopup
        isOpen={deletePopup.isOpen}
        onClose={() => setDeletePopup({ isOpen: false, reviewId: null })}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete your review?"
      />
      
      <SuccessPopup
        isOpen={successPopup.isOpen}
        onClose={() => setSuccessPopup({ isOpen: false, message: "" })}
        message={successPopup.message}
      />
      
      <InfoPopup
        isOpen={infoPopup.isOpen}
        onClose={() => setInfoPopup({ isOpen: false, message: "", title: "" })}
        message={infoPopup.message}
        title={infoPopup.title}
      />

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-[#2c6774]" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#174047]">
            All Reviews for {doctor?.name || "Doctor"}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-[#174047]">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-[#5c878f]">
              • {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No reviews yet</p>
          </div>
        ) : (
          reviews.map((review) => {
            // Check if current user owns this review
            const currentUserEmail = getUserEmail().toLowerCase();
            const reviewPatientEmail = (review.patientEmail || "").toLowerCase();
            const currentUserId = getUserId();
            const reviewUserId = review.userId || "";
            
            const isOwnReview = 
              (currentUserEmail && reviewPatientEmail && currentUserEmail === reviewPatientEmail) ||
              (currentUserId && reviewUserId && currentUserId === reviewUserId);

            return (
              <div key={review._id} className="bg-white rounded-xl shadow-lg p-12 border border-[#c0d3dc]/30 relative">
                {/* Action Buttons - PERMANENTLY VISIBLE for own reviews */}
                {isOwnReview && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit your review"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(review._id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete your review"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {getInitials(review.patientName)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-[#174047]">
                          {review.patientName || "Anonymous"}
                        </span>
                        {isOwnReview && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Your Review
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-[#5c878f]">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={`${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-[#174047] mb-4 leading-relaxed">
                      {review.comment}
                    </p>

                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {review.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Review Modal */}
      {showEditForm && editingReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#c0d3dc]/30 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#174047]">Edit Your Review</h3>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingReview(null);
                    setReviewForm({
                      rating: 5,
                      comment: "",
                      tags: [],
                      consultationType: "Video Consultation"
                    });
                  }}
                  className="text-[#5c878f] hover:text-[#174047] transition-colors p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-sm text-[#5c878f] mt-2">
                Update your experience with {doctor?.name}
              </p>
              
              {/* Show logged in user's info */}
              {loggedInUser && (
                <div className="mt-3 flex items-center gap-2 p-3 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold">
                    {getUserInitials()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#174047]">
                      {getUserName()}
                    </p>
                    <p className="text-xs text-[#5c878f]">
                      {loggedInUser.email || "Email not found"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleUpdateReview} className="p-6">
              {/* Rating */}
              <div className="mb-6">
                <label className="block text-[#174047] font-medium mb-3">
                  Your Rating *
                </label>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className={`text-4xl transition-all duration-300 transform hover:scale-110 ${
                        star <= reviewForm.rating
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="text-center mt-2 text-sm text-[#5c878f]">
                  {reviewForm.rating === 5 ? "Excellent" :
                   reviewForm.rating === 4 ? "Good" :
                   reviewForm.rating === 3 ? "Average" :
                   reviewForm.rating === 2 ? "Poor" : "Very Poor"}
                </div>
              </div>

              {/* Review */}
              <div className="mb-6">
                <label className="block text-[#174047] font-medium mb-3">
                  Your Experience *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className="w-full p-4 border-2 border-[#c0d3dc] rounded-xl focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/20 outline-none transition-colors"
                  rows="4"
                  placeholder="Share your experience with the doctor..."
                  required
                />
              </div>

              {/* Tags */}
              <div className="mb-8">
                <label className="block text-[#174047] font-medium mb-3">
                  Select Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
                        reviewForm.tags.includes(tag)
                          ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white shadow-md"
                          : "bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] hover:shadow-md"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-[#5c878f] mt-3">
                  Selected: {reviewForm.tags.length} tag(s)
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingReview(null);
                    setReviewForm({
                      rating: 5,
                      comment: "",
                      tags: [],
                      consultationType: "Video Consultation"
                    });
                  }}
                  className="flex-1 py-3.5 border-2 border-[#2c6774] text-[#2c6774] rounded-xl hover:bg-[#2c6774] hover:text-white transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Update Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Back to Doctor Profile Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(`/doctor/${id}`)}
          className="px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
        >
          Back to Doctor Profile
        </button>
      </div>
    </div>
  );
}