import React, { useState } from "react";
import "./HospitalAppointment.css";

export default function HospitalAppointment({ doctor, hospital, speciality, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [isOutOfCity, setIsOutOfCity] = useState(false);
  const [selectedDate, setSelectedDate] = useState("24 Nov");
  const [selectedTime, setSelectedTime] = useState("06:45 PM");
  
  const getCityFromHospitalName = (hospitalName) => {
    
    const parts = hospitalName.split(',');
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    
    return "Quetta";
  };

  const getCityAndLocation = (hospitalName) => {
    const city = getCityFromHospitalName(hospitalName);
    return {
      city: city,
      location: `${city} City, ${city}`
    };
  };

  const { city, location } = getCityAndLocation(hospital.name);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handlePatientNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setPatientName(value);
    }
  };

  const handleBookAppointment = () => {
    if (!phoneNumber.trim() || !patientName.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const appointmentData = {
      doctor: doctor.name,
      speciality: speciality,
      hospital: hospital.name,
      fee: hospital.fee,
      date: selectedDate,
      time: selectedTime,
      phoneNumber,
      patientName,
      isOutOfCity
    };

    console.log("Hospital Appointment Data:", appointmentData);
    alert(`Appointment booked successfully at ${hospital.name}!`);
    onClose();
  };

  const isBookDisabled = !phoneNumber || !patientName;

  return (
    <div className="hospital-appointment-modal-overlay">
      <div className="hospital-appointment-modal">
        <div className="modal-header">
          <h1>Book Appointment Now</h1>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="booking-content">
          <div className="booking-form">
            {/* Hospital Info Section */}
            <div className="hospital-info-section">
              <h3>{hospital.name}</h3>
              <p className="hospital-location">{location}</p>
            </div>

            {/* Date & Time Section */}
            <div className="datetime-section">
              <div className="datetime-display">
                <span className="date-time">{selectedDate} - {selectedTime} | </span>
                <button className="change-datetime-btn">Change Date & Time</button>
              </div>
            </div>

            {/* Form Fields */}
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
                    placeholder="Add Phone Number"
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
            </div>

            {/* Checkbox Section */}
            <div className="checkbox-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isOutOfCity}
                  onChange={(e) => setIsOutOfCity(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkmark"></span>
                Are you booking from outside {city}?
              </label>
              
              {isOutOfCity && (
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Get contact details and clinic direction in message</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Priority customer support if needed</span>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="divider-line"></div>

            {/* Book Button */}
            <button
              className="book-appointment-btn"
              onClick={handleBookAppointment}
              disabled={isBookDisabled}
              style={{ 
                opacity: isBookDisabled ? 0.6 : 1, 
                cursor: isBookDisabled ? "not-allowed" : "pointer" 
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}