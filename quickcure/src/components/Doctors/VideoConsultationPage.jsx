import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import doctorsData from "./doctorsData";
import "./VideoConsultationPage.css";

export default function VideoConsultationPage() {
  const { doctorId } = useParams();
  const doctor = doctorsData
    .flatMap(spec => spec.doctors)
    .find(doc => doc.id === Number(doctorId));

  const bookBtnRef = useRef(null);
  const [underline, setUnderline] = useState(false);

  if (!doctor) return <h2>Doctor not found</h2>;

  const videoHospital = doctor.hospitals.find(h =>
    h.name.toLowerCase().includes("video consultation")
  );

  const handleCardClick = () => {
    const yOffset = -50;
    const y = bookBtnRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleBooking = () => {
    const phone = document.getElementById("vc-phone").value.trim();
    const name = document.getElementById("vc-name").value.trim();

    if (!phone || !name) {
      alert("Please fill all required fields!");
      setUnderline(true);
    } else {
      setUnderline(false);
      alert("Booking Confirmed!");
    }
  };

  // Reviews data from the screenshot
  const reviews = [
    {
      id: 1,
      initials: "S",
      date: "14/09/2024",
      content: "I am satisfied with the doctor. The doctor was nice. She was attentive when I was telling her my issues related to my health. I'll continue the treatment with her. She was love, May Allah pak give her jazz a khair.",
      tags: ["Great Experience", "10 min meetup"],
      type: "Video Consultation"
    },
    {
      id: 2,
      initials: "A.P",
      date: "12/09/2024",
      content: "I am satisfied with the doctor. I'm really happy with this doctor and highly recommend them to everyone. From now on, I'll be continuing my treatment here.",
      tags: ["10 min wait time", "Great Experience", "20 min meetup"],
      type: "Video Consultation"
    },
    {
      id: 3,
      initials: "m.a",
      date: "30/08/2024",
      content: "I am satisfied with the doctor. highly satisfied with the doctor, doctor response listening everything was up to the mark",
      tags: ["Less Than 10 mins wait time", "Great Experience", "20 min meetup"],
      type: "Video Consultation"
    }
  ];

  return (
    <div className="vc-page">
      {/* Booking Section */}
      <div className="booking-section">
        <div className="vc-section booking-card">
          <h2 className="vc-heading">
            Get <span>Confirmed</span> Appointment Online
          </h2>
          
          {/* Step 1 — Hospital */}
          <h3 className="vc-step">1. Select Hospital/Clinic</h3>
          <div className="vc-card active" onClick={handleCardClick}>
            <h4>{videoHospital.name}</h4>
            <p className="price">Rs. {videoHospital.fee}</p>
            <p className="available">{videoHospital.availability}</p>
            <p className="location">Online</p>
          </div>

          {/* Step 2 — Date & Time */}
          <h3 className="vc-step">2. Select Date & Time</h3>
          <div className="vc-row date-time-row">
            <select className="vc-select">
              <option>Tue - 25 Nov</option>
              <option>Wed - 26 Nov</option>
              <option>Thu - 27 Nov</option>
              <option>Fri - 28 Nov</option>
              <option>Sat - 29 Nov</option>
              <option>Sun - 30 Nov</option>
              <option>Mon - 01 Dec</option>
              <option>Tue - 02 Dec</option>
              <option>Wed - 03 Dec</option>
              <option>Thu - 04 Dec</option>
              <option>Fri - 05 Dec</option>
              <option>Sat - 06 Dec</option>
              <option>Sun - 07 Dec</option>
            </select>
            <select className="vc-select">
              <option>06:00 PM</option>
              <option>06:30 PM</option>
              <option>07:00 PM</option>
              <option>07:30 PM</option>
              <option>08:00 PM</option>
              <option>08:30 PM</option>
              <option>09:00 PM</option>
              <option>09:30 PM</option>
              <option>10:00 PM</option>
              <option>10:15 PM</option>
              <option>10:45 PM</option>
              <option>11:00 PM</option>
              <option>11:30 PM</option>
            </select>
          </div>

          {/* Patient Info */}
          <div className="vc-row">
            <input
              id="vc-phone"
              type="text"
              className="vc-input"
              placeholder="Add Phone Number"
            />
            <input
              id="vc-name"
              type="text"
              className="vc-input"
              placeholder="Add Patient Name"
            />
          </div>

          <input
            type="text"
            className="vc-input promo"
            placeholder="Add Promo Code"
          />

          <button
            className="vc-book-btn"
            onClick={handleBooking}
            ref={bookBtnRef}
          >
            Book Video Consultation
          </button>
        </div>
      </div>

      {/* Reviews Section - Exact match to screenshot */}
      <div className="reviews-section">
        <div className="reviews-card">
          <div className="reviews-header">
            <h2 className="reviews-title"> 960 Reviews</h2>
            <div className="rating-summary">
              <div className="average-rating">
                <div className="stars">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <div className="rating-subtext"> 5/5 Average rating based on 960 reviews.</div>
              </div>
              
              <div className="rating-details-grid">
                <div className="rating-row">
                  <div className="rating-category">
                    <div className="rating-label">Wait Time</div>
                    <div className="rating-value">11 mins</div>
                  </div>
                  <div className="rating-category">
                    <div className="rating-label">Avg. Time to Patient</div>
                    <div className="rating-value">12 mins</div>
                  </div>
                </div>
                
                <div className="rating-column">
                  <div className="rating-category vertical">
                    <div className="rating-label">Patient Satisfaction</div>
                    <div className="rating-value">4.8/5</div>
                  </div>
                  <div className="rating-category vertical">
                    <div className="rating-label">Diagnosis</div>
                    <div className="rating-value">4.8/5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-avatar">
                    <div className="avatar-circle">{review.initials}</div>
                  </div>
                  <div className="reviewer-info">
                    <span className="reviewer-initials">{review.initials}</span>
                    <span className="review-date">- {review.date}</span>
                  </div>
                </div>
                
                <div className="review-content">
                  <p>{review.content}</p>
                </div>
                
                <div className="review-tags">
                  {review.tags.map((tag, index) => (
                    <div key={index} className="review-tag">
                      {tag}
                    </div>
                  ))}
                </div>
                
                <div className="consultation-type">
                  {review.type}
                </div>
                
                <div className="review-divider"></div>
              </div>
            ))}
          </div>

          <div className="reviews-actions">
            <button className="view-reviews-btn">View All Reviews</button>
            <button className="post-review-btn">Post a Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import doctorsData from "./doctorsData";
// import "./VideoConsultationPage.css";

// export default function VideoConsultationPage() {
//   const { doctorId } = useParams();
//   const doctor = doctorsData
//     .flatMap(spec => spec.doctors)
//     .find(doc => doc.id === Number(doctorId));

//   const bookBtnRef = useRef(null);
//   const [underline, setUnderline] = useState(false);

//   if (!doctor) return <h2>Doctor not found</h2>;

//   const videoHospital = doctor.hospitals.find(h =>
//     h.name.toLowerCase().includes("video consultation")
//   );

//   const handleCardClick = () => {
//     const yOffset = -50;
//     const y = bookBtnRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
//     window.scrollTo({ top: y, behavior: "smooth" });
//   };

//   const handleBooking = () => {
//     const phone = document.getElementById("vc-phone").value.trim();
//     const name = document.getElementById("vc-name").value.trim();

//     if (!phone || !name) {
//       alert("Please fill all required fields!");
//       setUnderline(true);
//     } else {
//       setUnderline(false);
//       alert("Booking Confirmed!");
//     }
//   };

//   return (
//     <div className="vc-page">

//       <h2 className="vc-heading">
//         Get <span>Confirmed</span> Appointment Online
//       </h2>

//       {/* SINGLE CARD CONTAINING ENTIRE BOOKING SECTION */}
//       <div className="vc-section booking-card">
        
//         {/* Step 1 — Hospital */}
//         <h3 className="vc-step">1. Select Hospital/Clinic</h3>
//         <div className="vc-card active" onClick={handleCardClick}>
//           <h4>{videoHospital.name}</h4>
//           <p className="price">Rs. {videoHospital.fee}</p>
//           <p className="available">{videoHospital.availability}</p>
//           <p className="location">Online</p>
//         </div>

//         {/* Step 2 — Date & Time */}
//         <h3 className="vc-step">2. Select Date & Time</h3>
//         <div className="vc-row date-time-row">
//           <select className="vc-select">
//             <option>Tue - 25 Nov</option>
//             <option>Wed - 26 Nov</option>
//             <option>Thu - 27 Nov</option>
//             <option>Fri - 28 Nov</option>
//             <option>Sat - 29 Nov</option>
//             <option>Sun - 30 Nov</option>
//             <option>Mon - 01 Dec</option>
//             <option>Tue - 02 Dec</option>
//             <option>Wed - 03 Dec</option>
//             <option>Thu - 04 Dec</option>
//             <option>Fri - 05 Dec</option>
//             <option>Sat - 06 Dec</option>
//             <option>Sun - 07 Dec</option>
//           </select>
//           <select className="vc-select">
//             <option>06:00 PM</option>
//             <option>06:30 PM</option>
//             <option>07:00 PM</option>
//             <option>07:30 PM</option>
//             <option>08:00 PM</option>
//             <option>08:30 PM</option>
//             <option>09:00 PM</option>
//             <option>09:30 PM</option>
//             <option>10:00 PM</option>
//             <option>10:15 PM</option>
//             <option>10:45 PM</option>
//             <option>11:00 PM</option>
//             <option>11:30 PM</option>
//           </select>
//         </div>

//         {/* Patient Info */}
//         <div className="vc-row">
//           <input
//             id="vc-phone"
//             type="text"
//             className="vc-input"
//             placeholder="Add Phone Number"
//           />
//           <input
//             id="vc-name"
//             type="text"
//             className="vc-input"
//             placeholder="Add Patient Name"
//           />
//         </div>

//         <input
//           type="text"
//           className="vc-input promo"
//           placeholder="Add Promo Code"
//         />

//         <button
//           className="vc-book-btn"
//           onClick={handleBooking}
//           ref={bookBtnRef}
//         >
//           Book Video Consultation
//         </button>
//       </div>
//     </div>
//   );
// }

// VideoConsultationPage.jsx
// import React, { useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import doctorsData from "./doctorsData";
// import "./VideoConsultationPage.css";

// export default function VideoConsultationPage() {
//   const { doctorId } = useParams();
//   const doctor = doctorsData
//     .flatMap(spec => spec.doctors)
//     .find(doc => doc.id === Number(doctorId));

//   const bookBtnRef = useRef(null);
//   const [underline, setUnderline] = useState(false);

//   if (!doctor) return <h2>Doctor not found</h2>;

//   const videoHospital = doctor.hospitals.find(h =>
//     h.name.toLowerCase().includes("video consultation")
//   );

//   const handleCardClick = () => {
//     const yOffset = -50;
//     const y = bookBtnRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
//     window.scrollTo({ top: y, behavior: "smooth" });
//   };

//   const handleBooking = () => {
//     const phone = document.getElementById("vc-phone").value.trim();
//     const name = document.getElementById("vc-name").value.trim();

//     if (!phone || !name) {
//       alert("Please fill all required fields!");
//       setUnderline(true);
//     } else {
//       setUnderline(false);
//       alert("Booking Confirmed!");
//     }
//   };

//   // Reviews data from the screenshot
//   const reviews = [
//     {
//       id: 1,
//       initials: "S",
//       date: "14/09/2024",
//       content: "I am satisfied with the doctor. The doctor was nice. She was attentive when I was telling her my issues related to my health. I'll continue the treatment with her. She was love, May Allah pak give her jazz a khair.",
//       tags: ["Great Experience", "10 min meetup"],
//       type: "Video Consultation"
//     },
//     {
//       id: 2,
//       initials: "A.P",
//       date: "12/09/2024",
//       content: "I am satisfied with the doctor. I'm really happy with this doctor and highly recommend them to everyone. From now on, I'll be continuing my treatment here.",
//       tags: ["10 min wait time", "Great Experience", "20 min meetup"],
//       type: "Video Consultation"
//     },
//     {
//       id: 3,
//       initials: "m.a",
//       date: "30/08/2024",
//       content: "I am satisfied with the doctor. highly satisfied with the doctor, doctor response listening everything was up to the mark",
//       tags: ["Less Than 10 mins wait time", "Great Experience", "20 min meetup"],
//       type: "Video Consultation"
//     }
//   ];

//   return (
//     <div className="vc-page">
//       {/* Booking Section */}
//       <div className="booking-section">
//         <h2 className="vc-heading">
//           Get <span>Confirmed</span> Appointment Online
//         </h2>

//         <div className="vc-section booking-card">
          
//           {/* Step 1 — Hospital */}
//           <h3 className="vc-step">1. Select Hospital/Clinic</h3>
//           <div className="vc-card active" onClick={handleCardClick}>
//             <h4>{videoHospital.name}</h4>
//             <p className="price">Rs. {videoHospital.fee}</p>
//             <p className="available">{videoHospital.availability}</p>
//             <p className="location">Online</p>
//           </div>

//           {/* Step 2 — Date & Time */}
//           <h3 className="vc-step">2. Select Date & Time</h3>
//           <div className="vc-row date-time-row">
//             <select className="vc-select">
//               <option>Tue - 25 Nov</option>
//               <option>Wed - 26 Nov</option>
//               <option>Thu - 27 Nov</option>
//               <option>Fri - 28 Nov</option>
//               <option>Sat - 29 Nov</option>
//               <option>Sun - 30 Nov</option>
//               <option>Mon - 01 Dec</option>
//               <option>Tue - 02 Dec</option>
//               <option>Wed - 03 Dec</option>
//               <option>Thu - 04 Dec</option>
//               <option>Fri - 05 Dec</option>
//               <option>Sat - 06 Dec</option>
//               <option>Sun - 07 Dec</option>
//             </select>
//             <select className="vc-select">
//               <option>06:00 PM</option>
//               <option>06:30 PM</option>
//               <option>07:00 PM</option>
//               <option>07:30 PM</option>
//               <option>08:00 PM</option>
//               <option>08:30 PM</option>
//               <option>09:00 PM</option>
//               <option>09:30 PM</option>
//               <option>10:00 PM</option>
//               <option>10:15 PM</option>
//               <option>10:45 PM</option>
//               <option>11:00 PM</option>
//               <option>11:30 PM</option>
//             </select>
//           </div>

//           {/* Patient Info */}
//           <div className="vc-row">
//             <input
//               id="vc-phone"
//               type="text"
//               className="vc-input"
//               placeholder="Add Phone Number"
//             />
//             <input
//               id="vc-name"
//               type="text"
//               className="vc-input"
//               placeholder="Add Patient Name"
//             />
//           </div>

//           <input
//             type="text"
//             className="vc-input promo"
//             placeholder="Add Promo Code"
//           />

//           <button
//             className="vc-book-btn"
//             onClick={handleBooking}
//             ref={bookBtnRef}
//           >
//             Book Video Consultation
//           </button>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="reviews-section">
//         <div className="reviews-card">
//           <div className="reviews-header">
//             <h2 className="reviews-title"> 971 Reviews</h2>
//             <div className="rating-summary">
//               <div className="average-rating">5/5 Average rating based on 971 reviews.</div>
              
//               <div className="rating-details">
//                 <div className="rating-category">
//                   <div className="rating-label">Wait Time</div>
//                   <div className="rating-value">11 mins</div>
//                 </div>
                
//                 <div className="rating-category">
//                   <div className="rating-label">Avg. Time to Patient</div>
//                   <div className="rating-value">12 mins</div>
//                 </div>
                
//                 <div className="rating-category">
//                   <div className="rating-label">Patient Satisfaction</div>
//                   <div className="rating-value">4.8/5</div>
//                 </div>
                
//                 <div className="rating-category">
//                   <div className="rating-label">Diagnosis</div>
//                   <div className="rating-value">4.8/5</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="divider"></div>

//           <div className="reviews-list">
//             {reviews.map(review => (
//               <div key={review.id} className="review-item">
//                 <div className="review-header">
//                   <span className="reviewer-initials">{review.initials}</span>
//                   <span className="review-date">- {review.date}</span>
//                 </div>
                
//                 <div className="review-content">
//                   <p>{review.content}</p>
//                 </div>
                
//                 <div className="review-tags">
//                   {review.tags.map((tag, index) => (
//                     <div key={index} className="review-tag">
//                       {tag}
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="consultation-type">
//                   {review.type}
//                 </div>
                
//                 <div className="review-divider"></div>
//               </div>
//             ))}
//           </div>

//           <div className="reviews-actions">
//             <button className="view-reviews-btn">View All Reviews</button>
//             <button className="post-review-btn">Post a Review</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


