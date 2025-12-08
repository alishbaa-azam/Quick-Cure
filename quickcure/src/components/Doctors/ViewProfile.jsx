import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import doctorsData from "./doctorsData";
import "./ViewProfile.css";

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctorsData
    .flatMap(spec => spec.doctors)
    .find(doc => doc.id === Number(id));

  const specialityName = doctorsData.find(
    (spec) => spec.doctors.some((doc) => doc.id === Number(id)))?.name;

  if (!doctor) {
    return <h2>Doctor not found</h2>;
  }

  const videoHospital = doctor.hospitals.find(h =>
    h.name.toLowerCase().includes("video consultation")
  );

  const bookBtnRef = useRef(null);
  const [underline, setUnderline] = useState(false);

  const handleCardClick = () => {
    const yOffset = -50;
    const y = bookBtnRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleBooking = () => {
    const phone = document.getElementById("profile-phone").value.trim();
    const name = document.getElementById("profile-name").value.trim();

    if (!phone || !name) {
      alert("Please fill all required fields!");
      setUnderline(true);
    } else {
      setUnderline(false);
      alert("Booking Confirmed!");
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: doctor.name,
        text: "Check out this doctor's profile!",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Profile link copied!");
    }
  };

  
  const handlePracticeCardClick = () => {
    console.log("Navigating to Video Consultation page for doctor ID:", doctor.id);
    navigate(`/video-consultation/${doctor.id}`);
  };

  const reviews = [
    {
      id: 1,
      initials: "M.M",
      date: "26/04/2024",
      content: "Very satisfied with the doctor as she has well explained the condition and give the remedies to control the anxiety.",
      tags: ["Less Than 10 mins wait time", "Great Experience", "30 min meetup"],
      type: "Video Consultation"
    },
    {
      id: 2,
      initials: "F",
      date: "29/06/2024",
      content: "She was very polite and sweet! and listened to my every bakwas. It felt like I was talking to my sister, highly recommended!",
      tags: ["Less Than 10 mins wait time", "Great Experience"],
      type: "Video Consultation"
    },
    {
      id: 3,
      initials: "M.U",
      date: "28/12/2023",
      content: "She was super friendly. I was comfortable speaking with her.",
      tags: ["Great Experience", "10 min meetup"],
      type: "Video Consultation"
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <img src={doctor.image} alt={doctor.name} className="profile-img" />
        </div>

        
        <div className="profile-middle">
          <button className="share-btn" onClick={handleShare}>
            Share Profile
          </button>

          <h2 className="profile-name">{doctor.name}</h2>
          <p className="profile-speciality-title">{specialityName}</p>
          <p className="profile-speciality">{doctor.qualification}</p>
          <p className="profile-experience">{doctor.experience} Experience</p>
          <p className="profile-reviews">778 Reviews</p>
        </div>
        
        
        <div className="profile-right">
          <button className="consult-btn" onClick={() => navigate(`/video-consultation/${doctor.id}`)}>
            Consult Online
          </button>
        </div>
      </div>

      
      <div className="profile-main-content">
        <div className="reviews-column">
          <div className="reviews-card">
            <div className="reviews-header">
              <h2 className="reviews-title">778 Reviews</h2>
              <div className="rating-summary">
                <div className="average-rating">
                  <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="rating-subtext">5/6 Average rating based on 778 reviews.</div>
                </div>
                
                <div className="rating-details-grid">
                  <div className="rating-row">
                    <div className="rating-category">
                      <div className="rating-label">Wait Time</div>
                      <div className="rating-value">10 mins</div>
                    </div>
                    <div className="rating-category">
                      <div className="rating-label">Avg. Time to Patient</div>
                      <div className="rating-value">28 mins</div>
                    </div>
                  </div>
                  
                  <div className="rating-column">
                    <div className="rating-category vertical">
                      <div className="rating-label">Patient Satisfaction</div>
                      <div className="rating-value">4.6/5</div>
                    </div>
                    <div className="rating-category vertical">
                      <div className="rating-label">Diagnosis</div>
                      <div className="rating-value">4.6/5</div>
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
                    <p>I am satisfied with the doctor.</p>
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

        <div className="booking-column">
          <div className="booking-section-card">
            <h2 className="vc-heading">
              Get <span>Confirmed</span> Appointment Online
            </h2>
            
            <h3 className="vc-step">1. Select Hospital/Clinic</h3>
            <div className="vc-card active" onClick={handleCardClick}>
              <h4>{videoHospital.name}</h4>
              <p className="price">Rs. {videoHospital.fee}</p>
              <p className="available">{videoHospital.availability}</p>
              <p className="location">Online</p>
            </div>

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

            <div className="vc-row">
              <input
                id="profile-phone"
                type="text"
                className="vc-input"
                placeholder="Add Phone Number"
              />
              <input
                id="profile-name"
                type="text"
                className="vc-input"
                placeholder="Add Patient Name"
              />
            </div>

            <button
              className="vc-book-btn"
              onClick={handleBooking}
              ref={bookBtnRef}
            >
              Book Video Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="practice-timings-section">
        <div 
          className="practice-timings-card clickable-card" 
          onClick={handlePracticeCardClick}
        >
          <h2 className="practice-title">Practice Address and Timings</h2>
          
          
          <div className="video-consultation-section">
            <h3 className="video-consultation-title">Video Consultation</h3>
            <div className="video-consultation-details">
              <p className="video-consultation-location">Online</p>
              <p className="video-consultation-price">Rs. 1,500</p>
            </div>
          </div>

          <div className="available-timings-section">
            <h4 className="available-timings-title">Available Timings</h4>
            
            <div className="timings-grid">
              <div className="timing-item">
                <span className="timing-day">Mon</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-day">Tue</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-day">Wed</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-day">Thu</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-day">Fri</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-day">Sat</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
              <div className="timing-item">
                <span className="timing-day">Sun</span>
                <span className="timing-time">06:00 PM - 11:00 PM</span>
              </div>
            </div>
          </div>

          <div className="divider-line"></div>

          <div className="video-call-section">
            <span className="video-call-text">Video Call</span>
          </div>
        </div>
      </div>
    </div>
  );
}