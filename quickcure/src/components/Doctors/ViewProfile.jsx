// import React, { useRef, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   Share2, 
//   Clock, 
//   Calendar, 
//   User, 
//   Phone, 
//   Video,
//   ChevronRight,
//   Star,
//   X,
//   CheckCircle,
//   Award,
//   BriefcaseMedical,
//   DollarSign,
//   Shield,
//   CalendarDays,
//   CalendarClock,
//   MapPin,
//   MessageSquare,
//   PhoneCall,
//   Heart,
//   TrendingUp,
//   BookOpen,
//   Check,
//   Zap
// } from "lucide-react";


// export default function ViewProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [reviewLoading, setReviewLoading] = useState(false);
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [reviewForm, setReviewForm] = useState({
//     rating: 5,
//     comment: "",
//     tags: [],
//     consultationType: "Video Consultation"
//   });
  
//   const API_URL = "http://localhost:5000";

//   const bookBtnRef = useRef(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [phoneError, setPhoneError] = useState(false);
//   const [nameError, setNameError] = useState(false);
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
//   const [todaysAvailability, setTodaysAvailability] = useState(null);
//   const [upcomingAvailability, setUpcomingAvailability] = useState([]);
//   const [availabilitySchedule, setAvailabilitySchedule] = useState([]);
//   const [nextAvailableSlots, setNextAvailableSlots] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Available tags for reviews
//   const availableTags = [
//     "Less Than 10 mins wait time",
//     "Great Experience",
//     "30 min meetup",
//     "10 min meetup",
//     "Friendly Doctor",
//     "Good Listener",
//     "Excellent Diagnosis",
//     "Patient Caring"
//   ];

//   // Day mapping
//   const DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   // Check if user is logged in and get user data - FIXED VERSION
//   useEffect(() => {
//     const checkLoggedInUser = () => {
//       try {
//         const token = localStorage.getItem('token');
//         const userData = localStorage.getItem('user');
        
//         if (token && userData) {
//           const parsedUser = JSON.parse(userData);
          
//           // Debug: Log what we found
//           console.log("Parsed user data from localStorage:", parsedUser);
          
//           // Handle different user data structures
//           let userObj = {};
          
//           if (typeof parsedUser === 'object' && parsedUser !== null) {
//             // Check common user field names
//             userObj = {
//               name: parsedUser.name || parsedUser.username || parsedUser.fullName || parsedUser.displayName || "User",
//               email: parsedUser.email || "",
//               id: parsedUser._id || parsedUser.id || parsedUser.userId || "",
//               // Add other possible fields
//               firstName: parsedUser.firstName || "",
//               lastName: parsedUser.lastName || ""
//             };
            
//             // If we have firstName and lastName but no name, combine them
//             if (!userObj.name && (userObj.firstName || userObj.lastName)) {
//               userObj.name = `${userObj.firstName || ''} ${userObj.lastName || ''}`.trim();
//             }
//           } else {
//             console.warn("User data is not an object:", parsedUser);
//           }
          
//           setLoggedInUser(userObj);
//         } else {
//           console.log("No user data found in localStorage");
//           setLoggedInUser(null);
//         }
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//         setLoggedInUser(null);
//       }
//     };
    
//     checkLoggedInUser();
    
//     // Also check when localStorage changes
//     const handleStorageChange = () => {
//       checkLoggedInUser();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const isAuthenticated = () => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
//     return !!(token && user);
//   };

//   // Get user name safely
//   const getUserName = () => {
//     if (!loggedInUser) return "User";
//     return loggedInUser.name || loggedInUser.username || loggedInUser.email?.split('@')[0] || "User";
//   };

//   // Get user initials
//   const getUserInitials = () => {
//     const name = getUserName();
//     return getInitials(name);
//   };

//   // Fetch doctor data from API
//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/api/doctors/${id}`);
//         console.log("Doctor data received:", response.data);
        
//         const doctorData = response.data;
//         setDoctor(doctorData);
        
//         // Process and sort availability schedule
//         if (doctorData.availability && doctorData.availability.length > 0) {
//           // Sort by day order
//           const sortedSchedule = [...doctorData.availability].sort((a, b) => {
//             return DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
//           });
//           setAvailabilitySchedule(sortedSchedule);
          
//           // Calculate today's availability
//           const today = new Date();
//           const todayName = DAYS[today.getDay()];
          
//           const todaySlot = sortedSchedule.find(slot => 
//             slot.day === todayName && slot.isAvailable === true
//           );
          
//           setTodaysAvailability(todaySlot || null);
          
//           // Get upcoming availability (next 7 days)
//           const upcoming = [];
//           for (let i = 1; i <= 7; i++) {
//             const futureDate = new Date(today);
//             futureDate.setDate(today.getDate() + i);
//             const futureDayName = DAYS[futureDate.getDay()];
            
//             const futureSlot = sortedSchedule.find(slot => 
//               slot.day === futureDayName && slot.isAvailable === true
//             );
            
//             if (futureSlot) {
//               upcoming.push({
//                 day: futureDayName,
//                 shortDay: DAYS_SHORT[futureDate.getDay()],
//                 date: futureDate,
//                 startTime: futureSlot.startTime,
//                 endTime: futureSlot.endTime,
//                 formattedDate: formatDateForDisplay(futureDate)
//               });
//             }
//           }
//           setUpcomingAvailability(upcoming);
          
//           // Get next 3 available slots
//           const nextSlots = getNextAvailableSlots(sortedSchedule);
//           setNextAvailableSlots(nextSlots);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching doctor:", err);
//         setError("Failed to load doctor profile.");
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [id]);

//   // Fetch reviews for the doctor
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setReviewLoading(true);
//         const response = await axios.get(`${API_URL}/api/reviews/${id}`);
//         console.log("Reviews data received:", response.data);
//         setReviews(response.data);
//         setReviewLoading(false);
//       } catch (err) {
//         console.error("Error fetching reviews:", err);
//         setReviews([]);
//         setReviewLoading(false);
//       }
//     };

//     if (doctor) {
//       fetchReviews();
//     }
//   }, [doctor, id]);

//   // Get next available slots
//   const getNextAvailableSlots = (schedule) => {
//     if (!schedule || schedule.length === 0) return [];
    
//     const slots = [];
//     const today = new Date();
    
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       const dayName = DAYS[date.getDay()];
      
//       const daySchedule = schedule.find(s => 
//         s.day === dayName && s.isAvailable === true
//       );
      
//       if (daySchedule) {
//         slots.push({
//           date: date,
//           day: dayName,
//           shortDay: DAYS_SHORT[date.getDay()],
//           startTime: daySchedule.startTime,
//           endTime: daySchedule.endTime,
//           formattedDate: formatDateForDisplay(date)
//         });
        
//         if (slots.length >= 3) break;
//       }
//     }
    
//     return slots;
//   };

//   // Format date for display
//   const formatDateForDisplay = (date) => {
//     const options = { day: 'numeric', month: 'short' };
//     return date.toLocaleDateString('en-US', options);
//   };

//   // Convert 12-hour format to 24-hour format
//   const convertTo24Hour = (time12) => {
//     if (!time12) return "";
    
//     // If already in 24-hour format
//     if (!time12.includes('AM') && !time12.includes('PM')) {
//       return time12;
//     }
    
//     const [time, modifier] = time12.split(' ');
//     let [hours, minutes] = time.split(':');
    
//     let hour = parseInt(hours, 10);
    
//     if (modifier === 'PM' && hour < 12) {
//       hour += 12;
//     }
    
//     if (modifier === 'AM' && hour === 12) {
//       hour = 0;
//     }
    
//     return `${hour.toString().padStart(2, '0')}:${minutes}`;
//   };

//   // Convert 24-hour format to 12-hour format
//   const convertTo12Hour = (time24) => {
//     if (!time24) return "";
    
//     // If already in 12-hour format
//     if (time24.includes('AM') || time24.includes('PM')) {
//       return time24;
//     }
    
//     const [hours, minutes] = time24.split(':');
//     let hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
    
//     hour = hour % 12;
//     hour = hour === 0 ? 12 : hour;
    
//     return `${hour}:${minutes} ${ampm}`;
//   };

//   // Generate time slots between start and end time
//   const generateTimeSlots = (startTime, endTime) => {
//     if (!startTime || !endTime) return [];
    
//     const start24 = convertTo24Hour(startTime);
//     const end24 = convertTo24Hour(endTime);
    
//     const slots = [];
//     const [startHour, startMinute] = start24.split(':').map(Number);
//     const [endHour, endMinute] = end24.split(':').map(Number);
    
//     let currentHour = startHour;
//     let currentMinute = startMinute;
    
//     while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
//       const time24 = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
//       const time12 = convertTo12Hour(time24);
      
//       slots.push({
//         value: time24,
//         label: time12,
//         isBooked: false
//       });
      
//       // Add 30 minutes
//       currentMinute += 30;
//       if (currentMinute >= 60) {
//         currentHour += 1;
//         currentMinute -= 60;
//       }
//     }
    
//     return slots;
//   };

//   // Generate date options for the next 14 days
//   const generateDateOptions = () => {
//     const dates = [];
//     const today = new Date();
    
//     // If doctor has no availability, return empty
//     if (!availabilitySchedule || availabilitySchedule.length === 0) {
//       return dates;
//     }
    
//     for (let i = 0; i < 14; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       const dayName = DAYS[date.getDay()];
      
//       // Check if doctor is available on this day
//       const daySchedule = availabilitySchedule.find(slot => 
//         slot.day === dayName && slot.isAvailable === true
//       );
      
//       if (daySchedule) {
//         dates.push({
//           value: date.toISOString().split('T')[0],
//           label: `${DAYS_SHORT[date.getDay()]}, ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
//           day: dayName,
//           availability: daySchedule
//         });
//       }
//     }
    
//     return dates;
//   };

//   // Generate time slots when date is selected
//   useEffect(() => {
//     const generateTimeSlotsForDate = () => {
//       if (!selectedDate) {
//         setAvailableTimeSlots([]);
//         return;
//       }

//       const date = new Date(selectedDate);
//       const dayName = DAYS[date.getDay()];
      
//       // Find availability for this day
//       const daySchedule = availabilitySchedule.find(slot => 
//         slot.day === dayName && slot.isAvailable === true
//       );
      
//       if (daySchedule) {
//         const slots = generateTimeSlots(daySchedule.startTime, daySchedule.endTime);
//         setAvailableTimeSlots(slots);
//       } else {
//         setAvailableTimeSlots([]);
//       }
//     };
    
//     generateTimeSlotsForDate();
//   }, [selectedDate, availabilitySchedule]);

//   // Handle booking with login check
//   const handleBooking = async () => {
//     // Check if user is logged in
//     if (!isAuthenticated()) {
//       navigate('/login', { 
//         state: { 
//           from: `/doctor/${id}`,
//           message: "Please login to book an appointment",
//           redirectTo: `/book-appointment/${doctor._id}`
//         }
//       });
//       return;
//     }

//     // Validation for logged in users
//     if (!patientName.trim()) {
//       alert("Please enter your name!");
//       setNameError(true);
//       return;
//     }

//     if (!phoneNumber.trim()) {
//       alert("Please enter your phone number!");
//       setPhoneError(true);
//       return;
//     }

//     if (!selectedDate || !selectedTime) {
//       alert("Please select date and time!");
//       return;
//     }

//     // Phone number validation
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       alert("Please enter a valid 10-digit phone number!");
//       setPhoneError(true);
//       return;
//     }

//     try {
//       setBookingLoading(true);
      
//       const bookingData = {
//         doctorId: doctor._id,
//         patientName: patientName,
//         patientPhone: phoneNumber,
//         appointmentDate: selectedDate,
//         appointmentTime: selectedTime,
//         consultationType: "video",
//         fee: doctor.fee || 1500,
//         doctorName: doctor.name,
//         doctorSpeciality: doctor.speciality,
//         appointmentType: "Video Consultation"
//       };

//       console.log("Sending booking data:", bookingData);
//       const response = await axios.post(`${API_URL}/api/appointments`, bookingData);
//       console.log("Booking response:", response.data);
      
//       if (response.data.success) {
//         alert("Booking Confirmed!");
//         setPhoneError(false);
//         setNameError(false);
        
//         navigate(`/video-consultation/${doctor._id}`, { 
//           state: { 
//             bookingId: response.data.appointment?._id,
//             doctorName: doctor.name,
//             appointmentTime: convertTo12Hour(selectedTime),
//             appointmentDate: selectedDate,
//             fee: doctor.fee
//           } 
//         });
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert(error.response?.data?.message || "Booking failed. Please try again.");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const handleQuickBooking = () => {
//     // Check if user is logged in
//     if (!isAuthenticated()) {
//       navigate('/login', { 
//         state: { 
//           from: `/doctor/${id}`,
//           message: "Please login to book an appointment",
//           redirectTo: `/book-appointment/${doctor._id}`
//         }
//       });
//       return;
//     }
    
//     // Navigate to booking page with doctor details
//     navigate(`/book-appointment/${doctor._id}`, {
//       state: {
//         doctorName: doctor.name,
//         doctorSpeciality: doctor.speciality,
//         doctorImage: doctor.image,
//         fee: doctor.fee || 1500,
//         availabilitySchedule: availabilitySchedule
//       }
//     });
//   };

//   const handleShare = () => {
//     const shareUrl = window.location.href;
//     const shareText = `Check out ${doctor?.name} - ${doctor?.speciality} | ${doctor?.qualification} | Book Appointment Now`;

//     if (navigator.share) {
//       navigator.share({
//         title: `${doctor?.name} - ${doctor?.speciality}`,
//         text: shareText,
//         url: shareUrl,
//       });
//     } else {
//       navigator.clipboard.writeText(shareUrl);
//       alert("Profile link copied to clipboard!");
//     }
//   };

//   // Handle review submission with login check - FIXED VERSION
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check if user is logged in
//     if (!isAuthenticated()) {
//       setShowReviewForm(false);
//       navigate('/login', { 
//         state: { 
//           from: `/doctor/${id}`,
//           message: "Please login to write a review"
//         }
//       });
//       return;
//     }

//     if (!reviewForm.comment.trim()) {
//       alert("Please write your review!");
//       return;
//     }

//     try {
//       // Get user name properly
//       const userName = getUserName();
      
//       const reviewData = {
//         rating: reviewForm.rating,
//         comment: reviewForm.comment,
//         tags: reviewForm.tags,
//         consultationType: reviewForm.consultationType,
//         doctorId: doctor._id,
//         doctorName: doctor.name,
//         patientName: userName, // Use actual user name
//         patientEmail: loggedInUser?.email || "",
//         userId: loggedInUser?.id || ""
//       };

//       console.log("Submitting review with user data:", reviewData);
//       const response = await axios.post(`${API_URL}/api/reviews/${doctor._id}`, reviewData);
//       console.log("Review response:", response.data);
      
//       if (response.data.success) {
//         // alert("Review submitted successfully!");
        
//         // Refresh reviews list
//         const reviewsResponse = await axios.get(`${API_URL}/api/reviews/${doctor._id}`);
//         setReviews(reviewsResponse.data);
        
//         // Update doctor's rating and total reviews
//         const doctorResponse = await axios.get(`${API_URL}/api/doctors/${id}`);
//         setDoctor(doctorResponse.data);
        
//         // Reset form and close
//         setReviewForm({
//           rating: 5,
//           comment: "",
//           tags: [],
//           consultationType: "Video Consultation"
//         });
//         setShowReviewForm(false);
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert(error.response?.data?.message || "Failed to submit review. Please try again.");
//     }
//   };

//   // Handle review submission with login check - UPDATED VERSION
// // const handleReviewSubmit = async (e) => {
// //   e.preventDefault();
  
// //   // Check if user is logged in
// //   if (!isAuthenticated()) {
// //     setShowReviewForm(false);
// //     navigate('/login', { 
// //       state: { 
// //         from: `/doctor/${id}`,
// //         message: "Please login to write a review"
// //       }
// //     });
// //     return;
// //   }

// //   if (!reviewForm.comment.trim()) {
// //     alert("Please write your review!");
// //     return;
// //   }

// //   try {
// //     // Get user ID properly - IMPORTANT!
// //     const userId = loggedInUser?.id || loggedInUser?._id || "";
    
// //     if (!userId) {
// //       alert("Unable to get user information. Please login again.");
// //       return;
// //     }

// //     const reviewData = {
// //       rating: reviewForm.rating,
// //       comment: reviewForm.comment,
// //       tags: reviewForm.tags,
// //       consultationType: reviewForm.consultationType,
// //       patientName: getUserName(), // Use actual user name
// //       userId: userId, // Send user ID - REQUIRED by backend
// //       doctorId: doctor._id // Also send doctorId for clarity
// //     };

// //     console.log("Submitting review with user data:", reviewData);
    
// //     // Send POST request with user ID
// //     const response = await axios.post(`${API_URL}/api/reviews/${doctor._id}`, reviewData, {
// //       headers: {
// //         'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send token if needed
// //         'Content-Type': 'application/json'
// //       }
// //     });
    
// //     console.log("Review response:", response.data);
    
// //     if (response.data.success) {
// //       alert("Review submitted successfully!");
      
// //       // Refresh reviews list
// //       const reviewsResponse = await axios.get(`${API_URL}/api/reviews/${doctor._id}`);
// //       setReviews(reviewsResponse.data);
      
// //       // Update doctor's rating and total reviews
// //       const doctorResponse = await axios.get(`${API_URL}/api/doctors/${id}`);
// //       setDoctor(doctorResponse.data);
      
// //       // Reset form and close
// //       setReviewForm({
// //         rating: 5,
// //         comment: "",
// //         tags: [],
// //         consultationType: "Video Consultation"
// //       });
// //       setShowReviewForm(false);
// //     }
// //   } catch (error) {
// //     console.error("Error submitting review:", error);
// //     alert(error.response?.data?.message || "Failed to submit review. Please try again.");
// //   }
// // };
//   // Handle review button click with login check
//   const handleWriteReviewClick = () => {
//     if (!isAuthenticated()) {
//       navigate('/login', { 
//         state: { 
//           from: `/doctor/${id}`,
//           message: "Please login to write a review"
//         }
//       });
//       return;
//     }
//     setShowReviewForm(true);
//   };

//   // Handle "Book This Slot" with login check
//   const handleBookSlotClick = (slot) => {
//     if (!isAuthenticated()) {
//       navigate('/login', { 
//         state: { 
//           from: `/doctor/${id}`,
//           message: "Please login to book an appointment",
//           redirectTo: `/book-appointment/${doctor._id}`
//         }
//       });
//       return;
//     }
    
//     navigate(`/book-appointment/${doctor._id}`, {
//       state: {
//         defaultDate: slot.date.toISOString().split('T')[0],
//         defaultTime: slot.startTime,
//         doctorName: doctor.name,
//         doctorSpeciality: doctor.speciality,
//         fee: doctor.fee
//       }
//     });
//   };

//   // Handle tag selection
//   const handleTagToggle = (tag) => {
//     setReviewForm(prev => {
//       if (prev.tags.includes(tag)) {
//         return { ...prev, tags: prev.tags.filter(t => t !== tag) };
//       } else {
//         return { ...prev, tags: [...prev.tags, tag] };
//       }
//     });
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return "";
      
//       const options = { day: 'numeric', month: 'short', year: 'numeric' };
//       return date.toLocaleDateString('en-US', options);
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "";
//     }
//   };

//   // Get initials from name
//   const getInitials = (name) => {
//     if (!name || typeof name !== 'string') return "??";
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   // Format reviews count
//   const formatReviewsCount = (count) => {
//     if (!count) return "0 Reviews";
//     return `${count} Review${count !== 1 ? 's' : ''}`;
//   };

//   // Calculate average rating from reviews
//   const calculateAverageRating = () => {
//     if (reviews.length === 0) return doctor?.rating || 0;
//     const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
//     return total / reviews.length;
//   };

//   // Format time range display
//   const formatTimeRangeDisplay = (startTime, endTime) => {
//     if (!startTime || !endTime) return "Not available";
    
//     const start12 = convertTo12Hour(startTime);
//     const end12 = convertTo12Hour(endTime);
    
//     return `${start12} - ${end12}`;
//   };

//   // Format experience
//   const formatExperience = (exp) => {
//     if (!exp) return "Not specified";
//     return `${exp}`;
//   };

//   // Check if doctor is currently available
//   const isCurrentlyAvailable = () => {
//     if (!todaysAvailability) return false;
    
//     const now = new Date();
//     const currentTime24 = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
//     const start24 = convertTo24Hour(todaysAvailability.startTime);
//     const end24 = convertTo24Hour(todaysAvailability.endTime);
    
//     return currentTime24 >= start24 && currentTime24 <= end24;
//   };

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e8f4f7]">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2c6774] border-t-transparent mx-auto"></div>
//         <p className="text-[#2c6774] text-lg mt-4 font-medium">Loading doctor profile...</p>
//       </div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
//       <div className="text-center">
//         <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors font-medium"
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   );
  
//   if (!doctor) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
//       <div className="text-center">
//         <h2 className="text-[#2c6774] text-2xl font-bold mb-4">Doctor not found</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] transition-colors font-medium"
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );

//   const authStatus = isAuthenticated();
//   const averageRating = calculateAverageRating();
//   const totalReviews = reviews.length || doctor.totalReviews || 0;
//   const dateOptions = generateDateOptions();
//   const consultationFee = doctor.fee || 1500;
//   const currentlyAvailable = isCurrentlyAvailable();
//   const hasAvailability = availabilitySchedule.length > 0;

//   return (
//     <div className="max-w-7xl mx-auto px-4 pb-36 bg-gradient-to-br from-[#9fbfc5]/10 to-[#c0d3dc]/10">
//       {/* Main Profile Card - Redesigned */}
//       <div className="bg-linear-to-r from-white to-[#f8f9fa] rounded-2xl shadow-xl mx-4 mt-6 p-6 md:mx-6 lg:mx-8 border border-[#c0d3dc]/30">
//         <div className="flex flex-col lg:flex-row items-start gap-8">
//           <div className="lg:w-1/4 flex flex-col items-center lg:items-start">
//             <div className="relative">
//               <div className="w-48 h-48 lg:w-56 lg:h-56  rounded-2xl overflow-hidden border-4 border-[#2c6774] shadow-2xl">
//                 <img 
//                   src={doctor.image ? `${API_URL}${doctor.image}` : "/default-doctor.jpg"} 
//                   alt={doctor.name}
//                   className="w-full h-full object-contain "
//                   onError={(e) => {
//                     e.target.src = "/default-doctor.jpg";
//                   }}
//                 />
//               </div>
//               <div className={`absolute -bottom-3 -right-3 px-5 py-2 rounded-full text-sm font-bold shadow-xl ${
//                 doctor.isActive 
//                   ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white animate-pulse"
//                   : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
//               }`}>
//                 {doctor.isActive ? "Active" : "Inactive"}
//               </div>
//             </div>

//             <div className="mt-6 w-full space-y-2">
//               <button
//                 onClick={handleQuickBooking}
//                 disabled={!doctor.isActive || !hasAvailability}
//                 className={`w-full py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
//                   authStatus
//                     ? "bg-linear-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
//                     : "bg-linear-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
//                 }`}
//               >
//                 <BookOpen size={22} />
//                 <span>{authStatus ? "Book Appointment" : "Login to Book"}</span>
//               </button>
              
//               <button
//                 onClick={handleShare}
//                 className="w-full py-3 bg-linear-to-r from-white to-[#f8f9fa] border-2 border-[#2c6774]/30 text-[#2c6774] rounded-xl hover:border-[#2c6774] hover:bg-gradient-to-r hover:from-[#2c6774] hover:to-[#1e4e56] hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
//               >
//                 <Share2 size={20} />
//                 <span>Share Profile</span>
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-3/4">
//             <div className="mb-6">
//               <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl md:text-4xl font-bold text-[#174047]">
//                     {doctor.name}
//                   </h1>
//                   <div className="flex items-center flex-wrap gap-3 mt-2">
//                     <span className="px-4 py-1.5 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#2c6774] rounded-full text-sm font-semibold border border-[#2c6774]/20">
//                       {doctor.speciality}
//                     </span>
//                     <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
//                       <Star size={16} className="text-yellow-500 fill-yellow-500" />
//                       <span className="font-bold text-[#174047]">{averageRating.toFixed(1)}</span>
//                       <span className="text-sm text-[#5c878f]">
//                         ({formatReviewsCount(totalReviews)})
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
//                       <Shield size={14} />
//                       <span className="text-sm font-medium">Verified</span>
//                     </div>
//                   </div>
                  
//                   <p className="text-[#5c878f] mt-4 font-medium flex items-center gap-2">
//                     <Award size={20} className="text-[#2c6774]" />
//                     {doctor.qualification || "Medical Professional"}
//                   </p>
//                 </div>
                
//                 <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 p-5 rounded-xl border-2 border-[#2c6774]/20">
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="text-3xl font-bold text-[#174047]">
//                       Rs {consultationFee}
//                     </div>
//                   </div>
//                   <div className="text-sm text-[#5c878f]">Consultation Fee</div>
//                   <p className="text-xs text-[#5c878f]/70 mt-1">Inclusive of all charges</p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
//                 <div className="flex items-center gap-2 mb-2">
//                   <BriefcaseMedical size={20} className="text-[#2c6774]" />
//                   <span className="text-sm text-[#5c878f] font-medium">Experience</span>
//                 </div>
//                 <p className="text-2xl font-bold text-[#174047]">
//                   {formatExperience(doctor.experience)}
//                 </p>
//               </div>
              
//               <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
//                 <div className="flex items-center gap-2 mb-2">
//                   <CalendarClock size={20} className="text-[#2c6774]" />
//                   <span className="text-sm text-[#5c878f] font-medium">Status</span>
//                 </div>
//                 <p className={`text-2xl font-bold ${currentlyAvailable ? 'text-green-600' : 'text-amber-600'}`}>
//                   {currentlyAvailable ? 'Available' : 'Soon'}
//                 </p>
//               </div>
              
//               <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Video size={20} className="text-[#2c6774]" />
//                   <span className="text-sm text-[#5c878f] font-medium">Consultation</span>
//                 </div>
//                 <p className="text-2xl font-bold text-[#174047]">
//                   Video
//                 </p>
//               </div>
              
//               <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Zap size={20} className="text-amber-500" />
//                   <span className="text-sm text-[#5c878f] font-medium">Consultation Time</span>
//                 </div>
//                 <p className="text-2xl font-bold text-[#174047]">
//                   15 min
//                 </p>
//               </div>
//             </div>

//             {doctor.services && doctor.services.length > 0 && (
//               <div>
//                 <h3 className="text-xl font-bold text-[#174047] mb-4 flex items-center gap-2">
//                   <BriefcaseMedical size={22} className="text-[#2c6774]" />
//                   Services & Specializations
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {doctor.services.map((service, index) => (
//                     <div 
//                       key={index}
//                       className="group px-4 py-2.5 bg-gradient-to-r from-white to-[#f8f9fa] border border-[#c0d3dc] text-[#174047] rounded-lg hover:from-[#2c6774] hover:to-[#1e4e56] hover:text-white hover:border-[#2c6774] transition-all duration-300 cursor-default"
//                     >
//                       <span className="font-medium">{service}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="mx-4 mt-8 md:mx-6 lg:mx-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Availability & Reviews */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Next Available Slots - Prominent Display */}
//           {nextAvailableSlots.length > 0 && (
//             <div className="bg-linear-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30">
//               <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center gap-2">
//                 <Calendar size={24} className="text-[#2c6774]" />
//                 Next Available Slots
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {nextAvailableSlots.map((slot, index) => (
//                   <div
//                     key={index}
//                     className="bg-white p-5 rounded-xl border-2 border-[#c0d3dc]/30 hover:border-[#2c6774]/50 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="flex justify-between items-center mb-3">
//                       <div className="flex items-center gap-2">
//                         <Calendar size={18} className="text-[#2c6774]" />
//                         <span className="font-bold text-[#174047]">{slot.shortDay}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
//                         <CheckCircle size={14} />
//                         <span className="text-xs font-medium">Available</span>
//                       </div>
//                     </div>
//                     <p className="text-lg font-bold text-[#174047] mb-1">{slot.formattedDate}</p>
//                     <div className="text-sm text-[#5c878f] flex items-center gap-2 mb-4">
//                       <Clock size={16} />
//                       {formatTimeRangeDisplay(slot.startTime, slot.endTime)}
//                     </div>
//                     <button
//                       onClick={() => handleBookSlotClick(slot)}
//                       className={`w-full py-2.5 rounded-lg transition-all duration-300 font-medium text-sm ${
//                         authStatus
//                           ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
//                           : "bg-gradient-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
//                       }`}
//                     >
//                       {authStatus ? "Book This Slot" : "Login to Book"}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Reviews Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30">
//             {/* Reviews Header */}
//             <div className="mb-6">
//               <h2 className="text-xl font-bold text-[#174047] mb-4 flex items-center gap-2">
//                 <Star size={22} className="text-yellow-500 fill-yellow-500" />
//                 Patient Reviews ({totalReviews})
//               </h2>
              
//               {/* Rating Summary */}
//               <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#c0d3dc]/30">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//                   <div className="text-center">
//                     <div className="text-5xl font-bold text-[#174047] mb-2">
//                       {averageRating.toFixed(1)}
//                     </div>
//                     <div className="flex items-center justify-center gap-1 mb-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={22}
//                           className={`${
//                             star <= Math.floor(averageRating)
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-sm text-[#5c878f]">
//                       Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
//                     </p>
//                   </div>
                  
//                   {/* Rating Distribution */}
//                   <div className="flex-1">
//                     <p className="text-sm text-[#5c878f] mb-3 font-medium">
//                       Rating Distribution
//                     </p>
//                     <div className="space-y-2">
//                       {[5, 4, 3, 2, 1].map((rating) => {
//                         const count = reviews.filter(r => Math.round(r.rating) === rating).length;
//                         const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
//                         return (
//                           <div key={rating} className="flex items-center gap-3">
//                             <div className="flex items-center gap-1 w-10">
//                               <span className="text-sm font-medium text-[#5c878f]">{rating}</span>
//                               <Star size={14} className="text-yellow-400" />
//                             </div>
//                             <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
//                               <div 
//                                 className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
//                                 style={{ width: `${percentage}%` }}
//                               />
//                             </div>
//                             <span className="text-sm font-medium text-[#174047] w-8 text-right">
//                               {count}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Reviews List */}
//             {reviewLoading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-3 border-[#2c6774] border-t-transparent mx-auto"></div>
//                 <p className="text-[#5c878f] mt-4">Loading reviews...</p>
//               </div>
//             ) : reviews.length === 0 ? (
//               <div className="text-center py-12">
//                 <Star size={48} className="mx-auto text-gray-300 mb-4" />
//                 <p className="text-lg text-gray-500 mb-2">No reviews yet</p>
//                 <p className="text-sm text-gray-400">Be the first to share your experience!</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {reviews.slice(0, 3).map((review) => (
//                   <div key={review._id} className="border-b border-[#c0d3dc]/30 pb-6 last:border-0">
//                     {/* Review Header */}
//                     <div className="flex items-start gap-3 mb-4">
//                       <div className="w-12 h-12 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
//                         {getInitials(review.patientName || "Anonymous")}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="font-semibold text-[#174047]">
//                             {review.patientName || "Anonymous Patient"}
//                           </span>
//                           <span className="text-xs text-[#5c878f]">
//                             {formatDate(review.createdAt)}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-1 mb-2">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star
//                               key={star}
//                               size={16}
//                               className={`${
//                                 star <= review.rating
//                                   ? "text-yellow-400 fill-yellow-400"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Review Content */}
//                     <p className="text-[#174047] mb-3 leading-relaxed">{review.comment}</p>

//                     {/* Tags */}
//                     {review.tags && review.tags.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {review.tags.map((tag, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] text-xs rounded-full font-medium"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Review Actions */}
//             <div className="mt-8 flex flex-col sm:flex-row gap-3">
//               {reviews.length > 3 && (
//                 <button 
//                   onClick={() => navigate(`/doctor-reviews/${id}`)}
//                   className="px-6 py-3 border-2 border-[#2c6774] text-[#2c6774] rounded-xl hover:bg-[#2c6774] hover:text-white transition-colors font-medium"
//                 >
//                   View All Reviews ({totalReviews})
//                 </button>
//               )}
//               <button
//                 onClick={handleWriteReviewClick}
//                 className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg ${
//                   authStatus
//                     ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
//                     : "bg-gradient-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
//                 }`}
//               >
//                 {authStatus ? "Write a Review" : "Login to Review"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Weekly Schedule */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30 sticky top-6">
//             <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center gap-2">
//               <CalendarDays size={22} className="text-[#2c6774]" />
//               Weekly Schedule
//             </h2>
            
//             {hasAvailability ? (
//               <div className="space-y-3">
//                 {availabilitySchedule.map((slot, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-xl border transition-all duration-300 ${
//                       slot.isAvailable
//                         ? slot.day === (todaysAvailability?.day || '')
//                           ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-md"
//                           : "border-[#c0d3dc]/30 bg-gradient-to-br from-[#9fbfc5]/10 to-[#c0d3dc]/10 hover:border-[#2c6774]/50 hover:shadow-md"
//                         : "border-gray-200 bg-gray-50 opacity-75"
//                     }`}
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <span className={`font-bold ${
//                         slot.isAvailable 
//                           ? slot.day === (todaysAvailability?.day || '') 
//                             ? "text-green-800" 
//                             : "text-[#174047]"
//                           : "text-gray-500"
//                       }`}>
//                         {slot.day}
//                       </span>
//                       {slot.isAvailable ? (
//                         <div className="flex items-center gap-1 text-green-600">
//                           <CheckCircle size={16} />
//                           <span className="text-xs font-medium">Available</span>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-1 text-gray-400">
//                           <X size={16} />
//                           <span className="text-xs">Not Available</span>
//                         </div>
//                       )}
//                     </div>
//                     {slot.isAvailable ? (
//                       <div className="text-sm flex items-center gap-2">
//                         <Clock size={14} className={
//                           slot.day === (todaysAvailability?.day || '') 
//                             ? "text-green-700" 
//                             : "text-[#5c878f]"
//                         } />
//                         <span className={
//                           slot.day === (todaysAvailability?.day || '') 
//                             ? "text-green-700 font-medium" 
//                             : "text-[#5c878f]"
//                         }>
//                           {formatTimeRangeDisplay(slot.startTime, slot.endTime)}
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="text-sm text-gray-500 italic">Not Available</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 text-gray-500">
//                 <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
//                 <p className="text-lg font-medium">No availability schedule set</p>
//               </div>
//             )}

//             {/* Quick Book Button at Bottom */}
//             <div className="mt-8 pt-6 border-t border-[#c0d3dc]/30">
//               <button
//                 onClick={handleQuickBooking}
//                 disabled={!doctor.isActive || !hasAvailability}
//                 className={`w-full py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
//                   authStatus
//                     ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
//                     : "bg-gradient-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
//                 }`}
//               >
//                 <BookOpen size={22} />
//                 <span>{authStatus ? "Book Appointment Now" : "Login to Book"}</span>
//               </button>
//               <p className="text-xs text-[#5c878f] mt-3 text-center">
//                 Instant confirmation • Secure payment • Video consultation
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Review Modal - FIXED VERSION */}
//       {showReviewForm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-[#c0d3dc]/30 p-6">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-bold text-[#174047]">Write a Review</h3>
//                 <button
//                   onClick={() => setShowReviewForm(false)}
//                   className="text-[#5c878f] hover:text-[#174047] transition-colors p-1 hover:bg-gray-100 rounded-lg"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//               <p className="text-sm text-[#5c878f] mt-2">
//                 Share your experience with {doctor.name}
//               </p>
              
//               {/* Show logged in user's name - FIXED */}
//               {authStatus && loggedInUser && (
//                 <div className="mt-3 flex items-center gap-2 p-3 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-lg">
//                   <div className="w-8 h-8 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold">
//                     {getUserInitials()}
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-[#174047]">
//                       Reviewing as: {getUserName()}
//                     </p>
//                     <p className="text-xs text-[#5c878f]">
//                       Your name will be displayed with the review
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <form onSubmit={handleReviewSubmit} className="p-6">
//               {/* Rating */}
//               <div className="mb-6">
//                 <label className="block text-[#174047] font-medium mb-3">
//                   Your Rating *
//                 </label>
//                 <div className="flex justify-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => setReviewForm({ ...reviewForm, rating: star })}
//                       className={`text-4xl transition-all duration-300 transform hover:scale-110 ${
//                         star <= reviewForm.rating
//                           ? "text-yellow-400"
//                           : "text-gray-300 hover:text-yellow-300"
//                       }`}
//                     >
//                       ★
//                     </button>
//                   ))}
//                 </div>
//                 <div className="text-center mt-2 text-sm text-[#5c878f]">
//                   {reviewForm.rating === 5 ? "Excellent" :
//                    reviewForm.rating === 4 ? "Good" :
//                    reviewForm.rating === 3 ? "Average" :
//                    reviewForm.rating === 2 ? "Poor" : "Very Poor"}
//                 </div>
//               </div>

//               {/* Review */}
//               <div className="mb-6">
//                 <label className="block text-[#174047] font-medium mb-3">
//                   Your Experience *
//                 </label>
//                 <textarea
//                   value={reviewForm.comment}
//                   onChange={(e) =>
//                     setReviewForm({ ...reviewForm, comment: e.target.value })
//                   }
//                   className="w-full p-4 border-2 border-[#c0d3dc] rounded-xl focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774]/20 outline-none transition-colors"
//                   rows="4"
//                   placeholder="Share your experience with the doctor..."
//                   required
//                 />
//               </div>

//               {/* Tags */}
//               <div className="mb-8">
//                 <label className="block text-[#174047] font-medium mb-3">
//                   Select Tags (Optional)
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {availableTags.map((tag) => (
//                     <button
//                       key={tag}
//                       type="button"
//                       onClick={() => handleTagToggle(tag)}
//                       className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
//                         reviewForm.tags.includes(tag)
//                           ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white shadow-md"
//                           : "bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] hover:shadow-md"
//                       }`}
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//                 <p className="text-sm text-[#5c878f] mt-3">
//                   Selected: {reviewForm.tags.length} tag(s)
//                 </p>
//               </div>

//               {/* Preview of how review will appear */}
//               <div className="mb-6 p-4 bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl border border-[#c0d3dc]/30">
//                 <h4 className="text-sm font-medium text-[#174047] mb-3">
//                   Preview of your review:
//                 </h4>
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold">
//                     {getUserInitials()}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="font-medium text-[#174047] text-sm">
//                         {getUserName()}
//                       </span>
//                       <div className="flex items-center gap-1">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star
//                             key={star}
//                             size={14}
//                             className={`${
//                               star <= reviewForm.rating
//                                 ? "text-yellow-400 fill-yellow-400"
//                                 : "text-gray-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                     <p className="text-sm text-[#5c878f] line-clamp-2">
//                       {reviewForm.comment || "Your review will appear here..."}
//                     </p>
//                     {reviewForm.tags.length > 0 && (
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         {reviewForm.tags.slice(0, 2).map((tag, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-0.5 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                         {reviewForm.tags.length > 2 && (
//                           <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
//                             +{reviewForm.tags.length - 2} more
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowReviewForm(false)}
//                   className="flex-1 py-3.5 border-2 border-[#2c6774] text-[#2c6774] rounded-xl hover:bg-[#2c6774] hover:text-white transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 py-3.5 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



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
  TrendingUp,
  BookOpen,
  Check,
  Zap,
  Trash2
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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [todaysAvailability, setTodaysAvailability] = useState(null);
  const [upcomingAvailability, setUpcomingAvailability] = useState([]);
  const [availabilitySchedule, setAvailabilitySchedule] = useState([]);
  const [nextAvailableSlots, setNextAvailableSlots] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

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

  // Check if user is logged in and get user data
  useEffect(() => {
    const checkLoggedInUser = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          
          // Handle different user data structures
          let userObj = {
            name: "",
            email: "",
            id: "",
            username: "",
            _id: ""
          };
          
          if (typeof parsedUser === 'object' && parsedUser !== null) {
            // Extract email from various possible locations
            userObj.email = parsedUser.email || 
                           parsedUser.userEmail || 
                           parsedUser.mail || 
                           parsedUser.Email || 
                           "";
            
            // Extract id from various possible locations
            userObj.id = parsedUser.id || 
                        parsedUser._id || 
                        parsedUser.userId || 
                        parsedUser.ID || 
                        "";
            
            userObj._id = parsedUser._id || parsedUser.id || "";
            
            // Extract name
            userObj.name = parsedUser.name || 
                          parsedUser.username || 
                          parsedUser.fullName || 
                          parsedUser.displayName || 
                          parsedUser.userName ||
                          (userObj.email ? userObj.email.split('@')[0] : "User");
            
            userObj.username = parsedUser.username || parsedUser.userName || "";
          }
          
          setLoggedInUser(userObj);
          console.log("Logged in user:", userObj);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setLoggedInUser(null);
      }
    };
    
    checkLoggedInUser();
    
    const handleStorageChange = () => {
      checkLoggedInUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  };

  const getUserName = () => {
    if (!loggedInUser) return "User";
    return loggedInUser.name || loggedInUser.username || "User";
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

  // Fetch doctor data from API
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/doctors/${id}`);
        
        const doctorData = response.data;
        setDoctor(doctorData);
        
        if (doctorData.availability && doctorData.availability.length > 0) {
          const sortedSchedule = [...doctorData.availability].sort((a, b) => {
            return DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
          });
          setAvailabilitySchedule(sortedSchedule);
          
          const today = new Date();
          const todayName = DAYS[today.getDay()];
          
          const todaySlot = sortedSchedule.find(slot => 
            slot.day === todayName && slot.isAvailable === true
          );
          
          setTodaysAvailability(todaySlot || null);
          
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
        const response = await axios.get(`${API_URL}/api/reviews/${id}`);
        console.log("Fetched reviews:", response.data);
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

  const formatDateForDisplay = (date) => {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const convertTo24Hour = (time12) => {
    if (!time12) return "";
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

  const convertTo12Hour = (time24) => {
    if (!time24) return "";
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
      
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute -= 60;
      }
    }
    
    return slots;
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    if (!availabilitySchedule || availabilitySchedule.length === 0) {
      return dates;
    }
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = DAYS[date.getDay()];
      
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

  useEffect(() => {
    const generateTimeSlotsForDate = () => {
      if (!selectedDate) {
        setAvailableTimeSlots([]);
        return;
      }

      const date = new Date(selectedDate);
      const dayName = DAYS[date.getDay()];
      
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

  const handleBooking = async () => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: `/doctor/${id}`,
          message: "Please login to book an appointment",
          redirectTo: `/book-appointment/${doctor._id}`
        }
      });
      return;
    }

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

      const response = await axios.post(`${API_URL}/api/appointments`, bookingData);
      
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

  const handleQuickBooking = () => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: `/doctor/${id}`,
          message: "Please login to book an appointment",
          redirectTo: `/book-appointment/${doctor._id}`
        }
      });
      return;
    }
    
    navigate(`/book-appointment/${doctor._id}`, {
      state: {
        doctorName: doctor.name,
        doctorSpeciality: doctor.speciality,
        doctorImage: doctor.image,
        fee: doctor.fee || 1500,
        availabilitySchedule: availabilitySchedule
      }
    });
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${doctor?.name} - ${doctor?.speciality} | ${doctor?.qualification} | Book Appointment Now`;

    if (navigator.share) {
      navigator.share({
        title: `${doctor?.name} - ${doctor?.speciality}`,
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
    
    if (!isAuthenticated()) {
      setShowReviewForm(false);
      navigate('/login', { 
        state: { 
          from: `/doctor/${id}`,
          message: "Please login to write a review"
        }
      });
      return;
    }

    if (!reviewForm.comment.trim()) {
      alert("Please write your review!");
      return;
    }

    try {
      const userId = getUserId();
      const userEmail = getUserEmail();
      const userName = getUserName();
      
      const token = localStorage.getItem('token');
      
      const reviewData = {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        tags: reviewForm.tags,
        consultationType: reviewForm.consultationType,
        patientName: userName,
        patientEmail: userEmail,
        userId: userId,
        doctorId: doctor._id
      };

      console.log("Submitting review:", reviewData);

      const response = await axios.post(`${API_URL}/api/reviews/${doctor._id}`, reviewData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        // Refresh reviews
        const reviewsResponse = await axios.get(`${API_URL}/api/reviews/${doctor._id}`);
        setReviews(reviewsResponse.data);
        
        // Update doctor's rating
        const doctorResponse = await axios.get(`${API_URL}/api/doctors/${id}`);
        setDoctor(doctorResponse.data);
        
        // Reset form
        setReviewForm({
          rating: 5,
          comment: "",
          tags: [],
          consultationType: "Video Consultation"
        });
        setShowReviewForm(false);
        
        alert("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "Failed to submit review. Please try again.");
    }
  };

  // Handle review deletion - FIXED VERSION
  const handleDeleteReview = async (reviewId) => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: `/doctor/${id}`,
          message: "Please login to delete reviews"
        }
      });
      return;
    }

    const reviewToDelete = reviews.find(r => r._id === reviewId);
    
    if (!reviewToDelete) {
      alert('Review not found!');
      return;
    }

    // Log the review data to debug
    console.log("Review to delete:", reviewToDelete);
    console.log("Current logged in user:", loggedInUser);

    // Check if user owns this review with multiple methods
    const currentUserEmail = getUserEmail().toLowerCase().trim();
    const currentUserId = getUserId().toString();
    const currentUserName = getUserName().toLowerCase().trim();
    
    const reviewEmail = (reviewToDelete.patientEmail || "").toLowerCase().trim();
    const reviewUserId = (reviewToDelete.userId || reviewToDelete.user || "").toString();
    const reviewUserName = (reviewToDelete.patientName || "").toLowerCase().trim();
    
    const emailMatch = currentUserEmail && reviewEmail && currentUserEmail === reviewEmail;
    const idMatch = currentUserId && reviewUserId && currentUserId === reviewUserId;
    const nameMatch = currentUserName && reviewUserName && currentUserName === reviewUserName;
    
    const isOwnReview = emailMatch || idMatch || nameMatch;

    console.log("Ownership check:", { emailMatch, idMatch, nameMatch, isOwnReview });

    if (!isOwnReview) {
      alert('You can only delete your own reviews!');
      return;
    }

    if (!window.confirm('Are you sure you want to delete your review?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Prepare data for backend
      const deleteData = {
        userId: currentUserId,
        doctorId: doctor._id,
        userRole: 'patient',
        userEmail: currentUserEmail,
        userName: currentUserName
      };

      console.log("Sending delete request with data:", deleteData);

      // Make DELETE request with data in body
      const response = await axios.delete(`${API_URL}/api/reviews/${reviewId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: deleteData
      });

      console.log("Delete response:", response.data);

      if (response.data.success) {
        // Update UI after successful deletion
        const updatedReviews = reviews.filter(r => r._id !== reviewId);
        setReviews(updatedReviews);
        
        // Update doctor's rating
        if (doctor) {
          const totalRating = updatedReviews.reduce((sum, r) => sum + (r.rating || 0), 0);
          const averageRating = updatedReviews.length > 0 ? totalRating / updatedReviews.length : 0;
          
          setDoctor({
            ...doctor,
            rating: averageRating,
            totalReviews: updatedReviews.length
          });
        }

        alert('Review deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      
      // Show specific error message
      if (error.response?.status === 403) {
        alert('You are not authorized to delete this review. Please make sure you are logged in with the correct account.');
        console.log("403 Error details:", error.response?.data);
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to delete review. Please try again.');
      }
    }
  };

  const handleWriteReviewClick = () => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: `/doctor/${id}`,
          message: "Please login to write a review"
        }
      });
      return;
    }
    setShowReviewForm(true);
  };

  const handleBookSlotClick = (slot) => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: `/doctor/${id}`,
          message: "Please login to book an appointment",
          redirectTo: `/book-appointment/${doctor._id}`
        }
      });
      return;
    }
    
    navigate(`/book-appointment/${doctor._id}`, {
      state: {
        defaultDate: slot.date.toISOString().split('T')[0],
        defaultTime: slot.startTime,
        doctorName: doctor.name,
        doctorSpeciality: doctor.speciality,
        fee: doctor.fee
      }
    });
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

  const formatReviewsCount = (count) => {
    if (!count) return "0 Reviews";
    return `${count} Review${count !== 1 ? 's' : ''}`;
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return doctor?.rating || 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
  };

  const formatTimeRangeDisplay = (startTime, endTime) => {
    if (!startTime || !endTime) return "Not available";
    
    const start12 = convertTo12Hour(startTime);
    const end12 = convertTo12Hour(endTime);
    
    return `${start12} - ${end12}`;
  };

  const formatExperience = (exp) => {
    if (!exp) return "Not specified";
    return `${exp}`;
  };

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

  const authStatus = isAuthenticated();
  const averageRating = calculateAverageRating();
  const totalReviews = reviews.length || doctor.totalReviews || 0;
  const dateOptions = generateDateOptions();
  const consultationFee = doctor.fee || 1500;
  const currentlyAvailable = isCurrentlyAvailable();
  const hasAvailability = availabilitySchedule.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-36 bg-gradient-to-br from-[#9fbfc5]/10 to-[#c0d3dc]/10">
      {/* Main Profile Card */}
      <div className="bg-linear-to-r from-white to-[#f8f9fa] rounded-2xl shadow-xl mx-4 mt-6 p-6 md:mx-6 lg:mx-8 border border-[#c0d3dc]/30">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-1/4 flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-[#2c6774] shadow-2xl">
                <img 
                  src={doctor.image ? `${API_URL}${doctor.image}` : "/default-doctor.jpg"} 
                  alt={doctor.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "/default-doctor.jpg";
                  }}
                />
              </div>
              <div className={`absolute -bottom-3 -right-3 px-5 py-2 rounded-full text-sm font-bold shadow-xl ${
                doctor.isActive 
                  ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white animate-pulse"
                  : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
              }`}>
                {doctor.isActive ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="mt-6 w-full space-y-2">
              <button
                onClick={handleQuickBooking}
                disabled={!doctor.isActive || !hasAvailability}
                className={`w-full py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                  authStatus
                    ? "bg-linear-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
                    : "bg-linear-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
                }`}
              >
                <BookOpen size={22} />
                <span>{authStatus ? "Book Appointment" : "Login to Book"}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="w-full py-3 bg-linear-to-r from-white to-[#f8f9fa] border-2 border-[#2c6774]/30 text-[#2c6774] rounded-xl hover:border-[#2c6774] hover:bg-gradient-to-r hover:from-[#2c6774] hover:to-[#1e4e56] hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                <span>Share Profile</span>
              </button>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#174047]">
                    {doctor.name}
                  </h1>
                  <div className="flex items-center flex-wrap gap-3 mt-2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#2c6774] rounded-full text-sm font-semibold border border-[#2c6774]/20">
                      {doctor.speciality}
                    </span>
                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-[#174047]">{averageRating.toFixed(1)}</span>
                      <span className="text-sm text-[#5c878f]">
                        ({formatReviewsCount(totalReviews)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                      <Shield size={14} />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </div>
                  
                  <p className="text-[#5c878f] mt-4 font-medium flex items-center gap-2">
                    <Award size={20} className="text-[#2c6774]" />
                    {doctor.qualification || "Medical Professional"}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 p-5 rounded-xl border-2 border-[#2c6774]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-3xl font-bold text-[#174047]">
                      Rs {consultationFee}
                    </div>
                  </div>
                  <div className="text-sm text-[#5c878f]">Consultation Fee</div>
                  <p className="text-xs text-[#5c878f]/70 mt-1">Inclusive of all charges</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <BriefcaseMedical size={20} className="text-[#2c6774]" />
                  <span className="text-sm text-[#5c878f] font-medium">Experience</span>
                </div>
                <p className="text-2xl font-bold text-[#174047]">
                  {formatExperience(doctor.experience)}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarClock size={20} className="text-[#2c6774]" />
                  <span className="text-sm text-[#5c878f] font-medium">Status</span>
                </div>
                <p className={`text-2xl font-bold ${currentlyAvailable ? 'text-green-600' : 'text-amber-600'}`}>
                  {currentlyAvailable ? 'Available' : 'Soon'}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={20} className="text-[#2c6774]" />
                  <span className="text-sm text-[#5c878f] font-medium">Consultation</span>
                </div>
                <p className="text-2xl font-bold text-[#174047]">
                  Video
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-[#c0d3dc]/30 hover:border-[#2c6774]/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={20} className="text-amber-500" />
                  <span className="text-sm text-[#5c878f] font-medium">Consultation Time</span>
                </div>
                <p className="text-2xl font-bold text-[#174047]">
                  15 min
                </p>
              </div>
            </div>

            {doctor.services && doctor.services.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#174047] mb-4 flex items-center gap-2">
                  <BriefcaseMedical size={22} className="text-[#2c6774]" />
                  Services & Specializations
                </h3>
                <div className="flex flex-wrap gap-3">
                  {doctor.services.map((service, index) => (
                    <div 
                      key={index}
                      className="group px-4 py-2.5 bg-gradient-to-r from-white to-[#f8f9fa] border border-[#c0d3dc] text-[#174047] rounded-lg hover:from-[#2c6774] hover:to-[#1e4e56] hover:text-white hover:border-[#2c6774] transition-all duration-300 cursor-default"
                    >
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-4 mt-8 md:mx-6 lg:mx-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Availability & Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Next Available Slots */}
          {nextAvailableSlots.length > 0 && (
            <div className="bg-linear-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30">
              <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center gap-2">
                <Calendar size={24} className="text-[#2c6774]" />
                Next Available Slots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nextAvailableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border-2 border-[#c0d3dc]/30 hover:border-[#2c6774]/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-[#2c6774]" />
                        <span className="font-bold text-[#174047]">{slot.shortDay}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle size={14} />
                        <span className="text-xs font-medium">Available</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-[#174047] mb-1">{slot.formattedDate}</p>
                    <div className="text-sm text-[#5c878f] flex items-center gap-2 mb-4">
                      <Clock size={16} />
                      {formatTimeRangeDisplay(slot.startTime, slot.endTime)}
                    </div>
                    <button
                      onClick={() => handleBookSlotClick(slot)}
                      className={`w-full py-2.5 rounded-lg transition-all duration-300 font-medium text-sm ${
                        authStatus
                          ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
                          : "bg-gradient-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
                      }`}
                    >
                      {authStatus ? "Book This Slot" : "Login to Book"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30">
            {/* Reviews Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#174047] mb-4 flex items-center gap-2">
                <Star size={22} className="text-yellow-500 fill-yellow-500" />
                Patient Reviews ({totalReviews})
              </h2>
              
              {/* Rating Summary */}
              <div className="bg-gradient-to-r from-[#9fbfc5]/10 to-[#c0d3dc]/10 rounded-xl p-6 border border-[#c0d3dc]/30">
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

            {/* Reviews List with Delete Functionality */}
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
                {reviews.slice(0, 3).map((review) => {
                  // Check if current user owns this review
                  const currentUserEmail = getUserEmail().toLowerCase().trim();
                  const currentUserId = getUserId().toString();
                  const currentUserName = getUserName().toLowerCase().trim();
                  
                  const reviewEmail = (review.patientEmail || "").toLowerCase().trim();
                  const reviewUserId = (review.userId || review.user || "").toString();
                  const reviewUserName = (review.patientName || "").toLowerCase().trim();
                  
                  const emailMatch = currentUserEmail && reviewEmail && currentUserEmail === reviewEmail;
                  const idMatch = currentUserId && reviewUserId && currentUserId === reviewUserId;
                  const nameMatch = currentUserName && reviewUserName && currentUserName === reviewUserName;
                  
                  const isOwnReview = emailMatch || idMatch || nameMatch;

                  return (
                    <div key={review._id} className="border-b border-[#c0d3dc]/30 pb-6 last:border-0 relative group">
                      {/* Delete button - ONLY SHOWS FOR OWN REVIEWS */}
                      {isOwnReview && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="absolute top-5 right-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                          title="Delete your review"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}

                      {/* Review Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                          {getInitials(review.patientName || "Anonymous")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-[#174047]">
                              {review.patientName || "Anonymous Patient"}
                              {/* Show "Your Review" badge ONLY for own reviews */}
                              {isOwnReview && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                  Your Review
                                </span>
                              )}
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
                              className="px-3 py-1 bg-gradient-to-r from-[#9fbfc5]/20 to-[#c0d3dc]/20 text-[#174047] text-xs rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                onClick={handleWriteReviewClick}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg ${
                  authStatus
                    ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
                    : "bg-gradient-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
                }`}
              >
                {authStatus ? "Write a Review" : "Login to Review"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Weekly Schedule */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#c0d3dc]/30 sticky top-6">
            <h2 className="text-xl font-bold text-[#174047] mb-6 flex items-center gap-2">
              <CalendarDays size={22} className="text-[#2c6774]" />
              Weekly Schedule
            </h2>
            
            {hasAvailability ? (
              <div className="space-y-3">
                {availabilitySchedule.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      slot.isAvailable
                        ? slot.day === (todaysAvailability?.day || '')
                          ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-md"
                          : "border-[#c0d3dc]/30 bg-gradient-to-br from-[#9fbfc5]/10 to-[#c0d3dc]/10 hover:border-[#2c6774]/50 hover:shadow-md"
                        : "border-gray-200 bg-gray-50 opacity-75"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-bold ${
                        slot.isAvailable 
                          ? slot.day === (todaysAvailability?.day || '') 
                            ? "text-green-800" 
                            : "text-[#174047]"
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
                            : "text-[#5c878f]"
                        } />
                        <span className={
                          slot.day === (todaysAvailability?.day || '') 
                            ? "text-green-700 font-medium" 
                            : "text-[#5c878f]"
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
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">No availability schedule set</p>
              </div>
            )}

            {/* Quick Book Button at Bottom */}
            <div className="mt-8 pt-6 border-t border-[#c0d3dc]/30">
              <button
                onClick={handleQuickBooking}
                disabled={!doctor.isActive || !hasAvailability}
                className={`w-full py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                  authStatus
                    ? "bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white hover:from-[#1e4e56] hover:to-[#174047]"
                    : "bg-gradient-to-r from-[#3a8a9c] to-[#2c6774] text-white hover:from-[#2c6774] hover:to-[#1e4e56]"
                }`}
              >
                <BookOpen size={22} />
                <span>{authStatus ? "Book Appointment Now" : "Login to Book"}</span>
              </button>
              <p className="text-xs text-[#5c878f] mt-3 text-center">
                Instant confirmation • Secure payment • Video consultation
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
                Share your experience with {doctor.name}
              </p>
              
              {/* Show logged in user's info */}
              {authStatus && loggedInUser && (
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



