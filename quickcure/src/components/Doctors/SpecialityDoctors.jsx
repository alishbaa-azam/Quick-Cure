// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Star } from "lucide-react";

// // Capitalize helper
// const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// // Function to calculate average rating
// const calculateAverageRating = (reviews) => {
//   if (!reviews || reviews.length === 0) return 0;
//   const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
//   return total / reviews.length;
// };

// // Star Rating Component with Tailwind
// const StarRating = ({ rating, totalReviews }) => {
//   return (
//     <div className="flex items-center gap-1">
//       <div className="flex">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             className={`w-5 h-5 ${
//               star <= rating
//                 ? "text-yellow-400 fill-yellow-400"
//                 : "text-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//       <span className="ml-2 font-semibold text-[#174047]">
//         {rating?.toFixed(1) || "0.0"}
//       </span>
//       {totalReviews > 0 && (
//         <span className="ml-2 text-sm text-[#5c878f]">
//           ({totalReviews} reviews)
//         </span>
//       )}
//     </div>
//   );
// };

// export default function SpecialityDoctors() {
//   const { specialityName } = useParams();
//   const navigate = useNavigate();

//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch Doctors by speciality with reviews
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `http://localhost:5000/api/doctors/speciality/${specialityName}`
//         );
        
//         // Fetch reviews for each doctor
//         const doctorsWithReviews = await Promise.all(
//           response.data.map(async (doctor) => {
//             try {
//               const reviewsResponse = await axios.get(
//                 `http://localhost:5000/api/reviews/${doctor._id}`
//               );
//               const reviews = reviewsResponse.data || [];
//               const averageRating = calculateAverageRating(reviews);
              
//               return {
//                 ...doctor,
//                 reviews: reviews,
//                 averageRating: averageRating,
//                 totalReviews: reviews.length
//               };
//             } catch (err) {
//               console.error(`Failed to fetch reviews for doctor ${doctor._id}:`, err);
//               return {
//                 ...doctor,
//                 reviews: [],
//                 averageRating: 0,
//                 totalReviews: 0
//               };
//             }
//           })
//         );
        
//         setDoctors(doctorsWithReviews);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load doctors.");
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [specialityName]);

//   const handleBookAppointment = (doctor) => {
//     navigate(`/book-appointment/${doctor._id}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto border-[#2c6774]"></div>
//           <p className="mt-4 text-gray-600">Loading doctors...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-6 py-2 rounded-lg font-medium transition-colors bg-[#2c6774] text-white hover:bg-[#1e4e56]"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!doctors.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             No doctors found for {capitalize(specialityName.replace(/-/g, " "))}
//           </h2>
//           <p className="text-gray-500">Try searching for another speciality</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredDoctors = doctors.filter((doc) =>
//     doc.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white px-4 py-6 md:px-16 lg:px-20">
//       {/* Page Title */}
//       <h1 className="text-xl md:text-2xl font-semibold mb-8 text-[#174047]">
//         {capitalize(specialityName.replace(/-/g, " "))} Specialists in Pakistan | Top{" "}
//         {capitalize(specialityName.replace(/-/g, " "))}s
//       </h1>

//       {/* Search Bar */}
//       <div className="w-full flex justify-center mb-8">
//         <div className="relative w-full max-w-xl">
//           <input
//             type="text"
//             placeholder="Search doctors by name..."
//             className="w-full px-4 py-3 pl-12 border-2 border-[#174047] rounded-lg focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 text-base"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//             <svg
//               className="w-5 h-5 text-[#2c6774]"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Doctors List */}
//       <div className="flex flex-col gap-8">
//         {filteredDoctors.length > 0 ? (
//           filteredDoctors.map((doctor) => (
//             <div 
//               key={doctor._id} 
//               className="relative p-6 rounded-xl bg-white shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex flex-col lg:flex-row gap-6">
//                 {/* Doctor Image and Basic Info */}
//                 <div className="flex flex-col lg:flex-row gap-6 flex-1">
//                   {/* Doctor Image */}
//                   <div className="shrink-0">
//                     <div className="relative">
//                       <img
//                         src={`http://localhost:5000${doctor.image}`}
//                         alt={doctor.name}
//                         className="w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border-4 border-[#5c878f]"
//                         onError={(e) => {
//                           e.target.src = "/default-doctor.jpg";
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Doctor Info */}
//                   <div className="flex-1">
//                     <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
//                       <div className="flex-1">
//                         <h2 
//                           className="text-xl md:text-2xl font-semibold text-[#2c6774] mb-2 cursor-pointer hover:underline"
//                           onClick={() => navigate(`/doctor/${doctor._id}`)}
//                         >
//                           {doctor.name}
//                         </h2>
                        
//                         {/* Rating Display */}
//                         <div className="mb-3">
//                           <StarRating 
//                             rating={doctor.averageRating} 
//                             totalReviews={doctor.totalReviews}
//                           />
//                         </div>
                        
//                         <p className="text-lg font-medium text-[#2c6774] mb-1">
//                           {doctor.speciality}
//                         </p>
//                         <p className="text-gray-600 mb-4">{doctor.qualification}</p>

//                         {/* Stats */}
//                         {/* <div className="flex flex-wrap gap-8 mb-4"> */}
//                           <div>
//                             <p className="font-semibold text-sm text-[#174047] mb-1">
//                               Experience
//                             </p>
//                             <p className="font-bold text-gray-800">
//                               {doctor.experience}
//                             </p>
//                           </div>
//                         {/* </div> */}
//                       </div>
                      
//                       {/* Consultation Fee Display - Moved above buttons */}
//                       <div className="lg:absolute lg:right-6 lg:top-6 lg:w-64">
//                         <div className="mb-4">
//                           <div className="text-center bg-linear-to-r from-[#f2f9fa] to-[#e8f4f7] p-4 rounded-lg border border-[#9fbfc5]">
//                             <div className="text-3xl font-bold text-[#174047]">
//                               Rs. {doctor.fee || "N/A"}
//                             </div>
//                             <div className="text-sm text-gray-600 mt-1">
//                               Consultation Fee
//                             </div>
//                           </div>
//                         </div>

//                         {/* Buttons Container */}
//                         <div className="flex flex-col gap-3">
//                           <button
//                             onClick={() => handleBookAppointment(doctor)}
//                             className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-[#2c6774] hover:bg-[#1e4e56] transition-colors duration-300"
//                           >
//                             Book Appointment
//                           </button>

//                           <button
//                             onClick={() => navigate(`/doctor/${doctor._id}`)}
//                             className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-[#174047] hover:bg-[#1e4e56] transition-colors duration-300"
//                           >
//                             View Profile
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Services */}
//               <div className="mt-6">
//                 <h3 className="font-semibold text-[#174047] mb-2">Services & Specializations</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {doctor.services?.map((service, index) => (
//                     <span 
//                       key={index} 
//                       className="px-3 py-2 text-sm rounded-full font-medium bg-[#9fbfc5] text-[#174047]"
//                     >
//                       {service}
//                     </span>
//                   ))}
//                   {(!doctor.services || doctor.services.length === 0) && (
//                     <span className="text-gray-500 text-sm">No services listed</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-12">
//             <h3 className="text-2xl font-semibold text-gray-700 mb-2">
//               No doctors found
//             </h3>
//             <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
//             <button
//               onClick={() => setSearchQuery("")}
//               className="px-6 py-2 rounded-lg font-medium transition-colors bg-[#2c6774] text-white hover:bg-[#1e4e56]"
//             >
//               Clear Search
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Results Count */}
//       {filteredDoctors.length > 0 && (
//         <div className="mt-8 text-center">
//           <p className="text-gray-600">
//             Showing <span className="font-bold text-[#2c6774]">
//               {filteredDoctors.length}
//             </span> of{" "}
//             <span className="font-bold text-[#174047]">
//               {doctors.length}
//             </span>{" "}
//             doctors
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";

// Add this function at the top (after imports)
const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!(token && user); // Returns true if both exist
};

// Capitalize helper
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  return total / reviews.length;
};

// Star Rating Component with Tailwind
const StarRating = ({ rating, totalReviews }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="ml-2 font-semibold text-[#174047]">
        {rating?.toFixed(1) || "0.0"}
      </span>
      {totalReviews > 0 && (
        <span className="ml-2 text-sm text-[#5c878f]">
          ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};

export default function SpecialityDoctors() {
  const { specialityName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = checkUserLoggedIn();
    setIsLoggedIn(loggedIn);
    
    // Listen for login changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      setIsLoggedIn(checkUserLoggedIn());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch Doctors by speciality with reviews
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/doctors/speciality/${specialityName}`
        );
        
        // Fetch reviews for each doctor
        const doctorsWithReviews = await Promise.all(
          response.data.map(async (doctor) => {
            try {
              const reviewsResponse = await axios.get(
                `http://localhost:5000/api/reviews/${doctor._id}`
              );
              const reviews = reviewsResponse.data || [];
              const averageRating = calculateAverageRating(reviews);
              
              return {
                ...doctor,
                reviews: reviews,
                averageRating: averageRating,
                totalReviews: reviews.length
              };
            } catch (err) {
              console.error(`Failed to fetch reviews for doctor ${doctor._id}:`, err);
              return {
                ...doctor,
                reviews: [],
                averageRating: 0,
                totalReviews: 0
              };
            }
          })
        );
        
        setDoctors(doctorsWithReviews);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialityName]);

  // MODIFIED: handleBookAppointment with login check
  const handleBookAppointment = (doctor) => {
    if (!isLoggedIn) {
      // Save current page URL and doctor ID for redirect after login
      const currentPath = location.pathname;
      const searchParams = location.search;
      const fullUrl = `${currentPath}${searchParams}`;
      
      // Redirect to login page with return URL and doctor ID
      navigate(`/login?redirect=${encodeURIComponent(fullUrl)}&doctorId=${doctor._id}`);
      return;
    }
    
    // If logged in, proceed to booking
    navigate(`/book-appointment/${doctor._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto border-[#2c6774]"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 rounded-lg font-medium transition-colors bg-[#2c6774] text-white hover:bg-[#1e4e56]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!doctors.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No doctors found for {capitalize(specialityName.replace(/-/g, " "))}
          </h2>
          <p className="text-gray-500">Try searching for another speciality</p>
        </div>
      </div>
    );
  }

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-16 lg:px-20">
      {/* Page Title */}
      <h1 className="text-xl md:text-2xl font-semibold mb-8 text-[#174047]">
        {capitalize(specialityName.replace(/-/g, " "))} Specialists in Pakistan | Top{" "}
        {capitalize(specialityName.replace(/-/g, " "))}s
      </h1>

      {/* Search Bar */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search doctors by name..."
            className="w-full px-4 py-3 pl-12 border-2 border-[#174047] rounded-lg focus:outline-none focus:border-[#2c6774] focus:ring-2 focus:ring-[#2c6774] focus:ring-opacity-20 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-[#2c6774]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="flex flex-col gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div 
              key={doctor._id} 
              className="relative p-6 rounded-xl bg-white shadow-lg border border-[#c0d3dc] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Doctor Image and Basic Info */}
                <div className="flex flex-col lg:flex-row gap-6 flex-1">
                  {/* Doctor Image */}
                  <div className="shrink-0">
                    <div className="relative">
                      <img
                        src={`http://localhost:5000${doctor.image}`}
                        alt={doctor.name}
                        className="w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border-4 border-[#5c878f]"
                        onError={(e) => {
                          e.target.src = "/default-doctor.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <h2 
                          className="text-xl md:text-2xl font-semibold text-[#2c6774] mb-2 cursor-pointer hover:underline"
                          onClick={() => navigate(`/doctor/${doctor._id}`)}
                        >
                          {doctor.name}
                        </h2>
                        
                        {/* Rating Display */}
                        <div className="mb-3">
                          <StarRating 
                            rating={doctor.averageRating} 
                            totalReviews={doctor.totalReviews}
                          />
                        </div>
                        
                        <p className="text-lg font-medium text-[#2c6774] mb-1">
                          {doctor.speciality}
                        </p>
                        <p className="text-gray-600 mb-4">{doctor.qualification}</p>

                        {/* Stats */}
                        <div>
                          <p className="font-semibold text-sm text-[#174047] mb-1">
                            Experience
                          </p>
                          <p className="font-bold text-gray-800">
                            {doctor.experience}
                          </p>
                        </div>
                      </div>
                      
                      {/* Consultation Fee Display */}
                      <div className="lg:absolute lg:right-6 lg:top-6 lg:w-64">
                        <div className="mb-4">
                          <div className="text-center bg-linear-to-r from-[#f2f9fa] to-[#e8f4f7] p-4 rounded-lg border border-[#9fbfc5]">
                            <div className="text-3xl font-bold text-[#174047]">
                              Rs. {doctor.fee || "N/A"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Consultation Fee
                            </div>
                          </div>
                        </div>

                        {/* Buttons Container */}
                        <div className="flex flex-col gap-3">
                          {/* MODIFIED: Book Appointment Button */}
                          <button
                            onClick={() => handleBookAppointment(doctor)}
                            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-300 ${
                              isLoggedIn 
                                ? "bg-[#2c6774] hover:bg-[#1e4e56]"
                                : "bg-gray-400 hover:bg-gray-500 cursor-pointer"
                            }`}
                          >
                            {isLoggedIn ? "Book Appointment" : "Login to Book"}
                          </button>

                          <button
                            onClick={() => navigate(`/doctor/${doctor._id}`)}
                            className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-[#174047] hover:bg-[#1e4e56] transition-colors duration-300"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mt-6">
                <h3 className="font-semibold text-[#174047] mb-2">Services & Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.services?.map((service, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-2 text-sm rounded-full font-medium bg-[#9fbfc5] text-[#174047]"
                    >
                      {service}
                    </span>
                  ))}
                  {(!doctor.services || doctor.services.length === 0) && (
                    <span className="text-gray-500 text-sm">No services listed</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 rounded-lg font-medium transition-colors bg-[#2c6774] text-white hover:bg-[#1e4e56]"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      {filteredDoctors.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold text-[#2c6774]">
              {filteredDoctors.length}
            </span> of{" "}
            <span className="font-bold text-[#174047]">
              {doctors.length}
            </span>{" "}
            doctors
          </p>
        </div>
      )}
    </div>
  );
}