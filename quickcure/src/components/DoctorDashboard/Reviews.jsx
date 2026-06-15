import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Calendar, User, Search, MessageSquare, ThumbsUp, ThumbsDown, Quote, ChevronDown } from 'lucide-react';

const API_URL = "http://localhost:5000";

const Reviews = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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

  useEffect(() => {
    if (doctorId) {
      fetchReviews();
    }
  }, [doctorId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      if (!doctorId) {
        console.error("Doctor ID not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/api/reviews/${doctorId}`);
      
      // The backend returns the reviews array directly (not wrapped in { success, reviews })
      const reviewsData = Array.isArray(response.data) ? response.data : 
                          response.data.reviews || response.data.data || [];
      
      setReviews(reviewsData);
      calculateStats(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    if (!reviewsData || reviewsData.length === 0) {
      setStats({
        averageRating: 0,
        totalReviews: 0,
        fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0
      });
      return;
    }

    const total = reviewsData.length;
    const sum = reviewsData.reduce((acc, review) => acc + (review.rating || 0), 0);
    const average = (sum / total).toFixed(1);

    setStats({
      averageRating: average,
      totalReviews: total,
      fiveStar: reviewsData.filter(r => r.rating === 5).length,
      fourStar: reviewsData.filter(r => r.rating === 4).length,
      threeStar: reviewsData.filter(r => r.rating === 3).length,
      twoStar: reviewsData.filter(r => r.rating === 2).length,
      oneStar: reviewsData.filter(r => r.rating === 1).length,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ""; }
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "??";
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = (review.patientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (review.comment || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'positive') return (review.rating || 0) >= 4 && matchesSearch;
    if (filter === 'negative') return (review.rating || 0) <= 2 && matchesSearch;
    return matchesSearch;
  });

  const renderStars = (rating, size = 14) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={`${star <= (rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-[#174047] mb-6 flex items-center gap-2">
          <MessageSquare size={24} className="text-[#2c6774]" />
          Patient Reviews
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#174047]/5 to-[#2c6774]/10 p-5 rounded-xl border border-[#2c6774]/20">
            <div className="text-3xl font-bold text-[#174047] mb-2">{stats.averageRating}</div>
            <div className="flex items-center gap-0.5 mb-2">
              {renderStars(parseInt(stats.averageRating), 14)}
            </div>
            <p className="text-xs text-[#5c878f] font-medium">Average Rating</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-xl border border-blue-200/50">
            <div className="text-3xl font-bold text-blue-700 mb-1">{stats.totalReviews}</div>
            <p className="text-xs text-blue-600 font-medium">Total Reviews</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-xl border border-emerald-200/50">
            <div className="text-3xl font-bold text-emerald-700 mb-1">{stats.fiveStar + stats.fourStar}</div>
            <p className="text-xs text-emerald-600 font-medium">Positive Reviews</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-xl border border-amber-200/50">
            <div className="text-3xl font-bold text-amber-700 mb-1">{stats.threeStar + stats.twoStar + stats.oneStar}</div>
            <p className="text-xs text-amber-600 font-medium">Needs Attention</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-[#174047] mb-3">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats[`${rating === 5 ? 'five' : rating === 4 ? 'four' : rating === 3 ? 'three' : rating === 2 ? 'two' : 'one'}Star`];
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-14">
                    <span className="text-sm font-medium text-[#5c878f]">{rating}</span>
                    <Star size={12} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[#174047] w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags Summary */}
        {reviews.flatMap(r => r.tags || []).length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-base font-semibold text-[#174047] mb-3">Common Feedback</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(
                reviews.flatMap(r => r.tags || []).reduce((acc, tag) => {
                  acc[tag] = (acc[tag] || 0) + 1;
                  return acc;
                }, {})
              ).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([tag, count]) => (
                <div key={tag} className="px-3 py-1.5 bg-gradient-to-r from-[#2c6774]/10 to-[#174047]/10 text-[#174047] rounded-full text-sm border border-[#2c6774]/20 font-medium">
                  {tag} <span className="font-bold text-[#2c6774] ml-1">({count})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                filter === 'all' 
                  ? 'bg-[#2c6774] text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('positive')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5 ${
                filter === 'positive' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <ThumbsUp size={14} />
              <span>Positive</span>
            </button>
            <button
              onClick={() => setFilter('negative')}
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5 ${
                filter === 'negative' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              <ThumbsDown size={14} />
              <span>Needs Attention</span>
            </button>
          </div>

          <div className="relative w-full sm:w-48 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]/20 focus:border-[#2c6774] text-sm"
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-base mb-1">No reviews found</p>
            <p className="text-sm text-gray-400">
              {searchTerm ? 'Try adjusting your search' : 'No reviews available yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredReviews.map((review) => (
              <div key={review._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2c6774] to-[#174047] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                    {getInitials(review.patientName || "Anonymous")}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                      <div className="min-w-0">
                        <span className="font-semibold text-[#174047]">
                          {review.patientName || "Anonymous Patient"}
                        </span>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <div className="flex items-center gap-0.5">
                            {renderStars(review.rating, 13)}
                          </div>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                            {review.consultationType || "Video Consultation"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 sm:mt-0">
                        <Calendar size={12} />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>

                    <div className="relative mt-3 pl-4 border-l-2 border-[#2c6774]/20">
                      <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>

                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {review.tags.map((tag, index) => (
                          <span key={index} className="px-2.5 py-1 bg-gradient-to-r from-[#2c6774]/10 to-[#174047]/5 text-[#174047] text-xs rounded-full font-medium">
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