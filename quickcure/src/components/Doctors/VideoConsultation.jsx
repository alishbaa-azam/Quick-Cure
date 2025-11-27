import React, { useState } from "react";
import "./VideoConsultation.css";

export default function VideoConsultation({ doctor, hospital, speciality, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [selectedDate, setSelectedDate] = useState("21 Nov");
  const [selectedTime, setSelectedTime] = useState("06:00 PM");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setPhoneNumber(value);
  };

  const handlePatientNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) setPatientName(value);
  };

  // Updated function to call backend API
  const handleBookAppointment = async () => {
    if (!phoneNumber.trim() || !patientName.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (!/^\d+$/.test(phoneNumber)) {
      alert("Phone number should contain only digits!");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(patientName)) {
      alert("Patient name should contain only letters!");
      return;
    }

    const appointmentData = {
      doctor: doctor.name,
      speciality,
      type: hospital.name,
      fee: hospital.fee,
      date: selectedDate,
      time: selectedTime,
      phoneNumber,
      patientName,
      promoCode
    };

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Appointment booked successfully with ${doctor.name}!`);
        onClose();
      } else {
        alert(data.message || "Error booking appointment");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const isBookDisabled = !phoneNumber || !patientName;

  return (
    <div className="video-consultation-modal-overlay">
      <div className="video-consultation-modal">
        <div className="modal-header">
          <h1>Book Appointment Now</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="booking-content">
          <div className="booking-form">
            <div className="consultation-type-section">
              <h3>Video Consultation</h3>
              <p className="consultation-location">Online</p>
            </div>

            <div className="datetime-section">
              <div className="datetime-display">
                <span className="date-time">{selectedDate} - {selectedTime} | </span>
                <button className="change-datetime-btn">Change Date & Time</button>
              </div>
            </div>

            <div className="form-fields">
              <div className="form-field">
                <div className="phone-input-single-box">
                  <select className="country-code-select">
                    <option>+92</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="phone-number-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <input
                  type="text"
                  placeholder="Add Patient Name"
                  value={patientName}
                  onChange={handlePatientNameChange}
                  className="patient-input"
                />
              </div>

              <div className="form-field">
                <input
                  type="text"
                  placeholder="Add Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
              </div>
            </div>

            <button
              className="book-video-call-btn"
              onClick={handleBookAppointment}
              disabled={isBookDisabled}
              style={{ opacity: isBookDisabled ? 0.6 : 1, cursor: isBookDisabled ? "not-allowed" : "pointer" }}
            >
              Book A Video Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
