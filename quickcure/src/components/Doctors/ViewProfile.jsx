import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Share2, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  Video,
  ChevronRight,
  Star,
  X,
  CheckCircle,
  Award,
  BriefcaseMedical,
  DollarSign,
  Shield,
  CalendarDays,
  CalendarClock,
  MapPin,
  MessageSquare,
  PhoneCall,
  Heart,
  TrendingUp
} from "lucide-react";

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    tags: [],
    consultationType: "Video Consultation"
  });
  
  const API_URL = "http://localhost:5000";

  const bookBtnRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [todaysAvailability, setTodaysAvailability] = useState(null);
  const [upcomingAvailability, setUpcomingAvailability] = useState([]);
  const [availabilitySchedule, setAvailabilitySchedule] = useState([]);
  const [nextAvailableSlots, setNextAvailableSlots] = useState([]);

  // Available tags for reviews
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

  // Day mapping
  const DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch doctor data from API
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/doctors/${id}`);
        console.log("Doctor data received:", response.data);
        
        const doctorData = response.data;
        setDoctor(doctorData);
        
        // Process and sort availability schedule
        if (doctorData.availability && doctorData.availability.length > 0) {
          // Sort by day order
          const sortedSchedule = [...doctorData.availability].sort((a, b) => {
            return DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
          });
          setAvailabilitySchedule(sortedSchedule);
          
          // Calculate today's availability
          const today = new Date();
          const todayName = DAYS[today.getDay()];
          
          const todaySlot = sortedSchedule.find(slot => 
            slot.day === todayName && slot.isAvailable === true
          );
          
          setTodaysAvailability(todaySlot || null);
          
          // Get upcoming availability (next 7 days)
          const upcoming = [];
          for (let i = 1; i <= 7; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const futureDayName = DAYS[futureDate.getDay()];
            
            const futureSlot = sortedSchedule.find(slot => 
              slot.day === futureDayName && slot.isAvailable === true
            );
            
            if (futureSlot) {
              upcoming.push({
                day: futureDayName,
                shortDay: DAYS_SHORT[futureDate.getDay()],
                date: futureDate,
                startTime: futureSlot.startTime,
                endTime: futureSlot.endTime,
                formattedDate: formatDateForDisplay(futureDate)
              });
            }
          }
          setUpcomingAvailability(upcoming);
          
          // Get next 3 available slots
          const nextSlots = getNextAvailableSlots(sortedSchedule);
          setNextAvailableSlots(nextSlots);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setError("Failed to load doctor profile.");
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  // Fetch reviews for the doctor
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewLoading(true);
        // const response = await axios.get(`${API_URL}/api/reviews/doctor/${id}`);
        const response = await axios.get(`${API_URL}/api/reviews/${id}`);

        console.log("Reviews data received:", response.data);
        setReviews(response.data);
        setReviewLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews([]);
        setReviewLoading(false);
      }
    };

    if (doctor) {
      fetchReviews();
    }
  }, [doctor, id]);

  // Get next available slots
  const getNextAvailableSlots = (schedule) => {
    if (!schedule || schedule.length === 0) return [];
    
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = DAYS[date.getDay()];
      
      const daySchedule = schedule.find(s => 
        s.day === dayName && s.isAvailable === true
      );
      
      if (daySchedule) {
        slots.push({
          date: date,
          day: dayName,
          shortDay: DAYS_SHORT[date.getDay()],
          startTime: daySchedule.startTime,
          endTime: daySchedule.endTime,
          formattedDate: formatDateForDisplay(date)
        });
        
        if (slots.length >= 3) break;
      }
    }
    
    return slots;
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  // Convert 12-hour format to 24-hour format
  const convertTo24Hour = (time12) => {
    if (!time12) return "";
    
    // If already in 24-hour format
    if (!time12.includes('AM') && !time12.includes('PM')) {
      return time12;
    }
    
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    
    let hour = parseInt(hours, 10);
    
    if (modifier === 'PM' && hour < 12) {
      hour += 12;
    }
    
    if (modifier === 'AM' && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  };

  // Convert 24-hour format to 12-hour format
  const convertTo12Hour = (time24) => {
    if (!time24) return "";
    
    // If already in 12-hour format
    if (time24.includes('AM') || time24.includes('PM')) {
      return time24;
    }
    
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    
    return `${hour}:${minutes} ${ampm}`;
  };

  // Generate time slots between start and end time
  const generateTimeSlots = (startTime, endTime) => {
    if (!startTime || !endTime) return [];
    
    const start24 = convertTo24Hour(startTime);
    const end24 = convertTo24Hour(endTime);
    
    const slots = [];
    const [startHour, startMinute] = start24.split(':').map(Number);
    const [endHour, endMinute] = end24.split(':').map(Number);
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const time24 = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      const time12 = convertTo12Hour(time24);
      
      slots.push({
        value: time24,
        label: time12,
        isBooked: false
      });
      
      // Add 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute -= 60;
      }
    }
    
    return slots;
  };

  // Generate date options for the next 14 days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    // If doctor has no availability, return empty
    if (!availabilitySchedule || availabilitySchedule.length === 0) {
      return dates;
    }
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = DAYS[date.getDay()];
      
      // Check if doctor is available on this day
      const daySchedule = availabilitySchedule.find(slot => 
        slot.day === dayName && slot.isAvailable === true
      );
      
      if (daySchedule) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: `${DAYS_SHORT[date.getDay()]}, ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
          day: dayName,
          availability: daySchedule
        });
      }
    }
    
    return dates;
  };

  // Generate time slots when date is selected
  useEffect(() => {
    const generateTimeSlotsForDate = () => {
      if (!selectedDate) {
        setAvailableTimeSlots([]);
        return;
      }

      const date = new Date(selectedDate);
      const dayName = DAYS[date.getDay()];
      
      // Find availability for this day
      const daySchedule = availabilitySchedule.find(slot => 
        slot.day === dayName && slot.isAvailable === true
      );
      
      if (daySchedule) {
        const slots = generateTimeSlots(daySchedule.startTime, daySchedule.endTime);
        setAvailableTimeSlots(slots);
      } else {
        setAvailableTimeSlots([]);
      }
    };
    
    generateTimeSlotsForDate();
  }, [selectedDate, availabilitySchedule]);

  const handleCardClick = () => {
    if (bookBtnRef.current) {
      const yOffset = -50;
      const y = bookBtnRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleBooking = async () => {
    // Validation
    if (!patientName.trim()) {
      alert("Please enter your name!");
      setNameError(true);
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Please enter your phone number!");
      setPhoneError(true);
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time!");
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number!");
      setPhoneError(true);
      return;
    }

    try {
      setBookingLoading(true);
      
      const bookingData = {
        doctorId: doctor._id,
        patientName: patientName,
        patientPhone: phoneNumber,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        consultationType: "video",
        fee: doctor.fee || 1500,
        doctorName: doctor.name,
        doctorSpeciality: doctor.speciality,
        appointmentType: "Video Consultation"
      };

      console.log("Sending booking data:", bookingData);
      const response = await axios.post(`${API_URL}/api/appointments`, bookingData);
      console.log("Booking response:", response.data);
      
      if (response.data.success) {
        alert("Booking Confirmed!");
        setPhoneError(false);
        setNameError(false);
        
        navigate(`/video-consultation/${doctor._id}`, { 
          state: { 
            bookingId: response.data.appointment?._id,
            doctorName: doctor.name,
            appointmentTime: convertTo12Hour(selectedTime),
            appointmentDate: selectedDate,
            fee: doctor.fee
          } 
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `Check out Dr. ${doctor?.name} - ${doctor?.speciality} | ${doctor?.qualification} | Book Appointment Now`;

    if (navigator.share) {
      navigator.share({
        title: `Dr. ${doctor?.name} - ${doctor?.speciality}`,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Profile link copied to clipboard!");
    }
  };

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.comment.trim()) {
      alert("Please write your review!");
      return;
    }

    try {
      const reviewData = {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        tags: reviewForm.tags,
        consultationType: reviewForm.consultationType,
        doctorId: doctor._id,
        doctorName: doctor.name,
        patientName: "Anonymous Patient"
      };

      console.log("Submitting review:", reviewData);
      const response = await axios.post(`${API_URL}/api/reviews/${doctor._id}`, reviewData);
      console.log("Review response:", response.data);
      
      if (response.data.success) {
        alert("Review submitted successfully!");
        
        // Refresh reviews list
        const reviewsResponse = await axios.get(`${API_URL}/api/reviews/${doctor._id}`);
        setReviews(reviewsResponse.data);
        
        // Update doctor's rating and total reviews
        const doctorResponse = await axios.get(`${API_URL}/api/doctors/${id}`);
        setDoctor(doctorResponse.data);
        
        // Reset form and close
        setReviewForm({
          rating: 5,
          comment: "",
          tags: [],
          consultationType: "Video Consultation"
        });
        setShowReviewForm(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "Failed to submit review. Please try again.");
    }
  };

  // Handle tag selection
  const handleTagToggle = (tag) => {
    setReviewForm(prev => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format reviews count
  const formatReviewsCount = (count) => {
    if (!count) return "0 Reviews";
    return `${count} Review${count !== 1 ? 's' : ''}`;
  };

  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (reviews.length === 0) return doctor?.rating || 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
  };

  // Format time range display
  const formatTimeRangeDisplay = (startTime, endTime) => {
    if (!startTime || !endTime) return "Not available";
    
    const start12 = convertTo12Hour(startTime);
    const end12 = convertTo12Hour(endTime);
    
    return `${start12} - ${end12}`;
  };

  // Format experience
  const formatExperience = (exp) => {
    if (!exp) return "Not specified";
    return `${exp} years experience`;
  };

  // Check if doctor is currently available
  const isCurrentlyAvailable = () => {
    if (!todaysAvailability) return false;
    
    const now = new Date();
    const currentTime24 = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const start24 = convertTo24Hour(todaysAvailability.startTime);
    const end24 = convertTo24Hour(todaysAvailability.endTime);
    
    return currentTime24 >= start24 && currentTime24 <= end24;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e8f4f7]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2c6774] border-t-transparent mx-auto"></div>
        <p className="text-[#2c6774] text-lg mt-4 font-medium">Loading doctor profile...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="text-center">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!doctor) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="text-center">
        <h2 className="text-[#2c6774] text-2xl font-bold mb-4">Doctor not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const averageRating = calculateAverageRating();
  const totalReviews = reviews.length || doctor.totalReviews || 0;
  const dateOptions = generateDateOptions();
  const consultationFee = doctor.fee || 1500;
  const currentlyAvailable = isCurrentlyAvailable();
  const hasAvailability = availabilitySchedule.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e8f4f7]">
      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg mx-4 mt-6 p-6 md:mx-6 lg:mx-8 border border-[#c0d3dc]/30">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-40 md:w-48 md:h-48">
              <img 
                src={doctor.image ? `${API_URL}${doctor.image}` : "/default-doctor.jpg"} 
                alt={doctor.name}
                className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src = "/default-doctor.jpg";
                }}
              />
            </div>
            {/* Active Status Badge */}
            <div className={`absolute -bottom-2 -right-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
              doctor.isActive 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
            }`}>
              {doctor.isActive ? "Active" : "Inactive"}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-[#174047] bg-gradient-to-r from-[#174047] to-[#2c6774] bg-clip-text text-transparent">
                  Dr. {doctor.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-[#e8f4f7] text-[#2c6774] rounded-full text-sm font-semibold">
                    {doctor.speciality}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-[#174047]">{averageRating.toFixed(1)}</span>
                    <span className="text-sm text-[#5c878f] ml-1">
                      ({formatReviewsCount(totalReviews)})
                    </span>
                  </div>
                </div>
                
                <p className="text-[#5c878f] mt-3 font-medium flex items-center gap-2">
                  <Award size={18} className="text-[#2c6774]" />
                  {doctor.qualification || "Medical Professional"}
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-[#f2f9fa] to-[#e8f4f7] p-4 rounded-xl border border-[#c0d3dc]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <BriefcaseMedical size={18} className="text-[#2c6774]" />
                      <span className="text-sm text-[#5c878f] font-medium">Experience</span>
                    </div>
                    <p className="text-xl font-bold text-[#174047]">
                      {formatExperience(doctor.experience)}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#f2f9fa] to-[#e8f4f7] p-4 rounded-xl border border-[#c0d3dc]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={18} className="text-[#2c6774]" />
                      <span className="text-sm text-[#5c878f] font-medium">Fee</span>
                    </div>
                    <p className="text-xl font-bold text-[#174047]">
                      Rs. {consultationFee}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#f2f9fa] to-[#e8f4f7] p-4 rounded-xl border border-[#c0d3dc]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Star size={18} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-[#5c878f] font-medium">Rating</span>
                    </div>
                    <p className="text-xl font-bold text-[#174047]">
                      {doctor.rating?.toFixed(1) || "0.0"}/5
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#f2f9fa] to-[#e8f4f7] p-4 rounded-xl border border-[#c0d3dc]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarClock size={18} className="text-[#2c6774]" />
                      <span className="text-sm text-[#5c878f] font-medium">Status</span>
                    </div>
                    <p className={`text-xl font-bold ${currentlyAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                      {currentlyAvailable ? 'Available Now' : 'Available Soon'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Share Button - Beautiful Design */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleShare}
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-[#2c6774]/20 text-[#2c6774] rounded-xl hover:border-[#2c6774] hover:bg-gradient-to-r hover:from-[#2c6774] hover:to-[#1e4e56] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold">Share Profile</span>
                </button>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <Shield size={14} />
                  <span className="font-medium">Verified Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {doctor.services && doctor.services.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#c0d3dc]/30">
            <h3 className="text-xl font-bold text-[#174047] mb-4 flex items-center gap-2">
              <BriefcaseMedical size={22} className="text-[#2c6774]" />
              Services & Specializations
            </h3>
            <div className="flex flex-wrap gap-3">
              {doctor.services.map((service, index) => (
                <div 
                  key={index}
                  className="group px-4 py-2.5 bg-gradient-to-r from-[#f2f9fa] to-[#e8f4f7] border border-[#c0d3dc] text-[#174047] rounded-lg hover:from-[#2c6774] hover:to-[#1e4e56] hover:text-white hover:border-[#2c6774] transition-all duration-300 cursor-default"
                >
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="mx-4 mt-6 md:mx-6 lg:mx-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Reviews & Availability */}
        <div className="lg:col-span-2 space-y-6">
          {/* Availability Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30">
            <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center gap-2">
              <CalendarDays size={22} className="text-[#2c6774]" />
              Doctor's Availability Schedule
            </h2>
            
            {hasAvailability ? (
              <div className="space-y-6">
                {/* Today's Availability */}
                {todaysAvailability && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${currentlyAvailable ? 'bg-green-500 animate-pulse' : 'bg-blue-500'} rounded-full`}></div>
                        <div>
                          <h3 className="font-bold text-green-800 text-lg">Today's Availability</h3>
                          <p className="text-sm text-green-700 mt-1">
                            {formatTimeRangeDisplay(todaysAvailability.startTime, todaysAvailability.endTime)}
                          </p>
                          {currentlyAvailable && (
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <Clock size={12} />
                              Currently accepting appointments
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleCardClick}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Next Available Slots */}
                {nextAvailableSlots.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#174047] mb-4 flex items-center gap-2">
                      <Calendar size={18} className="text-[#2c6774]" />
                      Next Available Slots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {nextAvailableSlots.map((slot, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-blue-800">{slot.shortDay}</span>
                            <div className="flex items-center gap-1 text-blue-600">
                              <CheckCircle size={14} />
                              <span className="text-xs font-medium">Available</span>
                            </div>
                          </div>
                          <p className="text-sm text-blue-700 mb-1">{slot.formattedDate}</p>
                          <div className="text-sm text-blue-700 flex items-center gap-2">
                            <Clock size={14} />
                            {formatTimeRangeDisplay(slot.startTime, slot.endTime)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Weekly Schedule */}
                <div>
                  <h3 className="font-semibold text-[#174047] mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-[#2c6774]" />
                    Weekly Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availabilitySchedule.map((slot, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          slot.isAvailable
                            ? slot.day === (todaysAvailability?.day || '')
                              ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-md"
                              : "border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 hover:border-blue-300 hover:shadow-md"
                            : "border-gray-200 bg-gray-50 opacity-75"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-bold ${
                            slot.isAvailable 
                              ? slot.day === (todaysAvailability?.day || '') 
                                ? "text-green-800" 
                                : "text-blue-800"
                              : "text-gray-500"
                          }`}>
                            {slot.day}
                          </span>
                          {slot.isAvailable ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={16} />
                              <span className="text-xs font-medium">Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-400">
                              <X size={16} />
                              <span className="text-xs">Not Available</span>
                            </div>
                          )}
                        </div>
                        {slot.isAvailable ? (
                          <div className="text-sm flex items-center gap-2">
                            <Clock size={14} className={
                              slot.day === (todaysAvailability?.day || '') 
                                ? "text-green-700" 
                                : "text-blue-700"
                            } />
                            <span className={
                              slot.day === (todaysAvailability?.day || '') 
                                ? "text-green-700 font-medium" 
                                : "text-blue-700"
                            }>
                              {formatTimeRangeDisplay(slot.startTime, slot.endTime)}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">Not Available</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Note */}
                <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-medium mb-2">Important Information:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-500">
                    <li>All times are displayed in 12-hour format (AM/PM)</li>
                    <li>Appointments are confirmed instantly upon booking</li>
                    <li>You will receive a confirmation SMS with details</li>
                    <li>Video consultation link will be shared 15 minutes before appointment</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">No availability schedule set</p>
                <p className="text-sm mt-2">Please contact the clinic for appointment timings</p>
              </div>
            )}
          </div>

          {/* Reviews Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30">
            {/* Reviews Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#174047] mb-4 flex items-center gap-2">
                <Star size={22} className="text-yellow-500 fill-yellow-500" />
                Patient Reviews ({totalReviews})
              </h2>
              
              {/* Rating Summary */}
              <div className="bg-gradient-to-r from-[#f8f9fa] to-[#e8f4f7] rounded-xl p-6 border border-[#c0d3dc]/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#174047] mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={22}
                          className={`${
                            star <= Math.floor(averageRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#5c878f]">
                      Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                  
                  {/* Rating Distribution */}
                  <div className="flex-1">
                    <p className="text-sm text-[#5c878f] mb-3 font-medium">
                      Rating Distribution
                    </p>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => Math.round(r.rating) === rating).length;
                        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-10">
                              <span className="text-sm font-medium text-[#5c878f]">{rating}</span>
                              <Star size={14} className="text-yellow-400" />
                            </div>
                            <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
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
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#c0d3dc]/30 my-6"></div>

            {/* Reviews List */}
            {reviewLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-[#2c6774] border-t-transparent mx-auto"></div>
                <p className="text-[#5c878f] mt-4">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12">
                <Star size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-500 mb-2">No reviews yet</p>
                <p className="text-sm text-gray-400">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review._id} className="border-b border-[#c0d3dc]/30 pb-6 last:border-0">
                    {/* Review Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                        {getInitials(review.patientName || "Anonymous")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-[#174047]">
                            {review.patientName || "Anonymous Patient"}
                          </span>
                          <span className="text-xs text-[#5c878f]">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
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
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-[#174047] mb-3 leading-relaxed">{review.comment}</p>

                    {/* Tags */}
                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {review.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-[#e8f4f7] to-[#d4e9f0] text-[#174047] text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Consultation Type */}
                    <div className="flex items-center gap-2 text-sm text-[#5c878f]">
                      <Video size={14} />
                      {review.consultationType || "Video Consultation"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {reviews.length > 3 && (
                <button 
                  onClick={() => navigate(`/doctor-reviews/${id}`)}
                  className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl hover:bg-[#2c6774] hover:text-white transition-colors font-medium"
                >
                  View All Reviews ({totalReviews})
                </button>
              )}
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30 sticky top-6">
            <h2 className="text-xl font-bold text-[#174047] mb-6">
              Book <span className="text-[#2c6774]">Appointment</span>
            </h2>

            {/* Consultation Fee Display */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-[#f2f9fa] to-[#e8f4f7] p-5 rounded-xl border-2 border-[#2c6774]/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign size={24} className="text-[#2c6774]" />
                  <div className="text-4xl font-bold text-[#174047]">
                    Rs. {consultationFee}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Video Consultation Fee</div>
                <p className="text-xs text-gray-500 mt-2">Inclusive of all charges</p>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#174047] mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-[#2c6774]" />
                Select Date & Time
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#174047] mb-2">
                    Appointment Date *
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime("");
                    }}
                    className="w-full p-3.5 border-2 border-[#c0d3dc] rounded-xl focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/20 outline-none transition-colors bg-white"
                    disabled={!doctor.isActive || !hasAvailability}
                  >
                    <option value="">Choose a date</option>
                    {dateOptions.length > 0 ? (
                      dateOptions.map((date, index) => (
                        <option key={index} value={date.value}>
                          {date.label}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No available dates</option>
                    )}
                  </select>
                  {!doctor.isActive && (
                    <p className="text-sm text-red-500 mt-2">
                      Doctor is currently not accepting appointments
                    </p>
                  )}
                  {!hasAvailability && doctor.isActive && (
                    <p className="text-sm text-yellow-600 mt-2">
                      No availability schedule set. Please contact clinic.
                    </p>
                  )}
                  {selectedDate && doctor.isActive && hasAvailability && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircle size={14} />
                      Available for booking
                    </p>
                  )}
                </div>
                
                {selectedDate && availableTimeSlots.length > 0 && doctor.isActive && (
                  <div>
                    <label className="block text-sm font-medium text-[#174047] mb-2">
                      Select Time Slot *
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                      {availableTimeSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedTime(slot.value)}
                          className={`p-3 border-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            selectedTime === slot.value
                              ? "border-[#2c6774] bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white shadow-md"
                              : "border-[#c0d3dc] text-[#5c878f] hover:border-[#2c6774] hover:text-[#174047]"
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Details */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#174047] mb-4 flex items-center gap-2">
                <User size={18} className="text-[#2c6774]" />
                Patient Details
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-[#5c878f]" size={18} />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => {
                      setPatientName(e.target.value);
                      setNameError(false);
                    }}
                    className={`w-full pl-12 p-3.5 border-2 ${
                      nameError ? "border-red-500" : "border-[#c0d3dc]"
                    } rounded-xl focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/20 outline-none transition-colors`}
                    placeholder="Full Name *"
                    required
                    disabled={!doctor.isActive || !hasAvailability}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-[#5c878f]" size={18} />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setPhoneError(false);
                    }}
                    className={`w-full pl-12 p-3.5 border-2 ${
                      phoneError ? "border-red-500" : "border-[#c0d3dc]"
                    } rounded-xl focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/20 outline-none transition-colors`}
                    placeholder="Phone Number *"
                    maxLength="10"
                    required
                    disabled={!doctor.isActive || !hasAvailability}
                  />
                </div>
              </div>
            </div>

            {/* Book Button */}
            <button
              ref={bookBtnRef}
              onClick={handleBooking}
              disabled={bookingLoading || !selectedDate || !selectedTime || !patientName || !phoneNumber || !doctor.isActive || !hasAvailability}
              className="w-full py-3.5 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {bookingLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Clock size={20} className="animate-spin" />
                  Processing...
                </span>
              ) : !doctor.isActive ? (
                "Doctor Not Available"
              ) : !hasAvailability ? (
                "No Schedule Available"
              ) : (
                "Confirm Appointment"
              )}
            </button>

            {/* Guarantee */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <CheckCircle size={14} />
                <span className="font-medium">Instant Confirmation</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * Confirmation SMS will be sent to your phone
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#c0d3dc]/30 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#174047]">Write a Review</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-[#5c878f] hover:text-[#174047] transition-colors p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-sm text-[#5c878f] mt-2">
                Share your experience with Dr. {doctor.name}
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6">
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

              {/* Consultation Type */}
              <div className="mb-6">
                <label className="block text-[#174047] font-medium mb-3">
                  Consultation Type
                </label>
                <select
                  value={reviewForm.consultationType}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, consultationType: e.target.value })
                  }
                  className="w-full p-3.5 border-2 border-[#c0d3dc] rounded-xl focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/20 outline-none transition-colors"
                >
                  <option value="Video Consultation">Video Consultation</option>
                  <option value="Physical Visit">Physical Visit</option>
                </select>
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
                          : "bg-gradient-to-r from-[#e8f4f7] to-[#d4e9f0] text-[#174047] hover:shadow-md"
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
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1 py-3.5 border-2 border-[#2c6774] text-[#2c6774] rounded-xl hover:bg-[#2c6774] hover:text-white transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}