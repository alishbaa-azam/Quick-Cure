// src/components/doctor/Reviews.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Calendar, User, Search, Filter, ChevronDown, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const API_URL = "http://localhost:5000";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, positive, negative
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0
  });

  // Get doctor ID from localStorage
  const getDoctorId = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed._id || parsed.id;
    }
    return null;
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const doctorId = getDoctorId();
      
      if (!doctorId) {
        console.error("Doctor ID not found");
        return;
      }

      const response = await axios.get(`${API_URL}/api/reviews/doctor/${doctorId}`);
      console.log("Fetched reviews:", response.data);
      
      if (response.data.success) {
        setReviews(response.data.reviews);
        calculateStats(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    if (!reviewsData || reviewsData.length === 0) return;

    const total = reviewsData.length;
    const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
    const average = (sum / total).toFixed(1);

    const fiveStar = reviewsData.filter(r => r.rating === 5).length;
    const fourStar = reviewsData.filter(r => r.rating === 4).length;
    const threeStar = reviewsData.filter(r => r.rating === 3).length;
    const twoStar = reviewsData.filter(r => r.rating === 2).length;
    const oneStar = reviewsData.filter(r => r.rating === 1).length;

    setStats({
      averageRating: average,
      totalReviews: total,
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return "";
    }
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "??";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredReviews = reviews.filter(review => {
    // Apply search filter
    const matchesSearch = review.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply rating filter
    if (filter === 'positive') return review.rating >= 4 && matchesSearch;
    if (filter === 'negative') return review.rating <= 2 && matchesSearch;
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2c6774] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-[#174047] mb-4 flex items-center gap-2">
          <MessageSquare size={28} className="text-[#2c6774]" />
          Patient Reviews
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 p-5 rounded-xl border border-[#c0d3dc]/30">
            <div className="text-3xl font-bold text-[#174047] mb-1">{stats.averageRating}</div>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={`${
                    star <= Math.floor(stats.averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#5c878f]">Average Rating</p>
          </div>

          <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 p-5 rounded-xl border border-[#c0d3dc]/30">
            <div className="text-3xl font-bold text-[#174047] mb-1">{stats.totalReviews}</div>
            <p className="text-sm text-[#5c878f]">Total Reviews</p>
          </div>

          <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 p-5 rounded-xl border border-[#c0d3dc]/30">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.fiveStar + stats.fourStar}</div>
            <p className="text-sm text-[#5c878f]">Positive Reviews</p>
          </div>

          <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 p-5 rounded-xl border border-[#c0d3dc]/30">
            <div className="text-3xl font-bold text-orange-600 mb-1">{stats.threeStar + stats.twoStar + stats.oneStar}</div>
            <p className="text-sm text-[#5c878f]">Needs Attention</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold text-[#174047] mb-3">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats[`${rating}Star`];
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-[#5c878f]">{rating}</span>
                      <Star size={14} className="text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#174047] w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tags Summary */}
          <div>
            <h3 className="text-lg font-semibold text-[#174047] mb-3">Common Feedback</h3>
            <div className="flex flex-wrap gap-2">
              {reviews.flatMap(r => r.tags || []).reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
              }, {}) && Object.entries(
                reviews.flatMap(r => r.tags || []).reduce((acc, tag) => {
                  acc[tag] = (acc[tag] || 0) + 1;
                  return acc;
                }, {})
              ).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([tag, count]) => (
                <div
                  key={tag}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] rounded-full text-sm border border-[#2c6774]/20"
                >
                  {tag} <span className="font-bold text-[#2c6774] ml-1">({count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                filter === 'all' 
                  ? 'bg-[#2c6774] text-white' 
                  : 'bg-gray-100 text-[#174047] hover:bg-gray-200'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('positive')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                filter === 'positive' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              <ThumbsUp size={16} />
              Positive
            </button>
            <button
              onClick={() => setFilter('negative')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                filter === 'negative' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}
            >
              <ThumbsDown size={16} />
              Needs Attention
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]/20 focus:border-[#2c6774]"
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 mb-2">No reviews found</p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'Try adjusting your search' : 'Be the first to get a review!'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {getInitials(review.patientName || "Anonymous")}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-[#174047] text-lg">
                          {review.patientName || "Anonymous Patient"}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {review.consultationType || "Video Consultation"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 md:mt-0">
                        <Calendar size={14} />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

                    {/* Tags */}
                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {review.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;