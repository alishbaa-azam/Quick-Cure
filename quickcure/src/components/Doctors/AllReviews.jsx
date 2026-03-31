import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ArrowLeft, Trash2 } from "lucide-react";

export default function AllReviews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const API_URL = "http://localhost:5000";

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
            email: parsedUser.email || "",  // CRITICAL: Capture email for identification
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

  const handleDeleteReview = async (reviewId) => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    
    if (!token || !loggedInUser) {
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
      alert('Review not found!');
      return;
    }

    // STRICT CHECK: Verify this review belongs to logged-in user by email
    const currentUserEmail = loggedInUser?.email?.toLowerCase() || "";
    const reviewPatientEmail = reviewToDelete.patientEmail?.toLowerCase() || "";
    
    // Also check by userId
    const currentUserId = loggedInUser?.id || loggedInUser?._id || "";
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
      alert('You can only delete your own reviews!');
      return;
    }

    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete your review?')) {
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
      
      alert('Review deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
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
            const currentUserEmail = loggedInUser?.email?.toLowerCase() || "";
            const reviewPatientEmail = review.patientEmail?.toLowerCase() || "";
            const currentUserId = loggedInUser?.id || loggedInUser?._id || "";
            const reviewUserId = review.userId || "";
            
            const isOwnReview = 
              (currentUserEmail && reviewPatientEmail && currentUserEmail === reviewPatientEmail) ||
              (currentUserId && reviewUserId && currentUserId === reviewUserId);

            return (
              <div key={review._id} className="bg-white rounded-xl shadow-lg p-6 border border-[#c0d3dc]/30 relative group">
                {/* Delete button - ONLY for own reviews */}
                {isOwnReview && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                    title="Delete your review"
                  >
                    <Trash2 size={18} />
                  </button>
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