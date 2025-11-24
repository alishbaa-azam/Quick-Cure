import React, { useState } from "react";
import "./doctor_registration.css";

import {
  FaUserMd,
  FaGraduationCap,
  FaBriefcase,
  FaComments,
  FaLock,
} from "react-icons/fa";

const DoctorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    cnic: "",
    address: "",
    city: "",
    country: "",
    file: null,

    qualification: "",
    specialization: "",
    institute: "",
    passingYear: "",

    experienceYears: "",
    currentHospital: "",
    designation: "",
    licenseNumber: "",

    onlineFee: 1500,
    consultationHours: "",
    availableDays: [],

    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const steps = [
    { icon: <FaUserMd />, label: "Personal" },
    { icon: <FaGraduationCap />, label: "Education" },
    { icon: <FaBriefcase />, label: "Professional" },
    { icon: <FaComments />, label: "Consultation" },
    { icon: <FaLock />, label: "Security" },
  ];

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newDays = checked
          ? [...prev.availableDays, value]
          : prev.availableDays.filter((day) => day !== value);
        return { ...prev, availableDays: newDays };
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }

    if (name === "password") evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) setPasswordStrength("Weak");
    else if (password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
      setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  };

  // ✅ Validation per step
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Enter a valid email";
      if (!formData.phone.trim()) newErrors.phone = "Phone number required";
      else if (!/^[0-9]{10,15}$/.test(formData.phone))
        newErrors.phone = "Invalid phone number";
      if (!formData.gender) newErrors.gender = "Gender required";
      if (!formData.dob) newErrors.dob = "Date of birth required";
      if (!formData.cnic.trim()) newErrors.cnic = "CNIC required";
      else if (!/^[0-9]{13}$/.test(formData.cnic))
        newErrors.cnic = "CNIC must be 13 digits";
      if (!formData.address.trim()) newErrors.address = "Address required";
      if (!formData.city.trim()) newErrors.city = "City required";
      if (!formData.country.trim()) newErrors.country = "Country required";
    } else if (step === 2) {
      if (!formData.qualification) newErrors.qualification = "Qualification required";
      if (!formData.specialization) newErrors.specialization = "Specialization required";
      if (!formData.institute.trim()) newErrors.institute = "Institute required";
      if (!formData.passingYear) newErrors.passingYear = "Passing year required";
    } else if (step === 3) {
     if (!formData.experienceYears.trim())
  newErrors.experienceYears = "Experience duration required";
      if (!formData.currentHospital.trim())
        newErrors.currentHospital = "Current hospital required";
      if (!formData.designation.trim())
        newErrors.designation = "Designation required";
      if (!formData.licenseNumber.trim())
        newErrors.licenseNumber = "License number required";
    } else if (step === 4) {
      if (!formData.onlineFee) newErrors.onlineFee = "Fee required";
      if (!formData.consultationHours.trim())
        newErrors.consultationHours = "Consultation hours required";
      if (formData.availableDays.length === 0)
        newErrors.availableDays = "Select at least one available day";
    } else if (step === 5) {
      if (!formData.password.trim()) newErrors.password = "Password required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, steps.length));
  };
  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ✅ Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form autoComplete="off">
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="error">{errors.fullName}</span>}
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="0xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="input-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  
                </select>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </div>

              <div className="input-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                {errors.dob && <span className="error">{errors.dob}</span>}
              </div>

              <div className="input-group">
                <label>CNIC / ID Number</label>
                <input
                  type="text"
                  name="cnic"
                  placeholder="XXXXXXXXXXXXX"
                  value={formData.cnic}
                  onChange={handleChange}
                />
                {errors.cnic && <span className="error">{errors.cnic}</span>}
              </div>

              <div className="input-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street #, Area, City"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>

              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>

              <div className="input-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                />
                {errors.country && <span className="error">{errors.country}</span>}
              </div>

              <div className="input-group">
                <label>Profile Picture</label>
                <input type="file" name="file" onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="next-btn" onClick={handleNext}>
                Save & Continue →
              </button>
            </div>
          </form>
        );

      case 2:
        return (
          <div className="form-grid">
            <div className="input-group">
              <label>Qualification</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              >
                <option value="">Select Qualification</option>
                <option>MBBS</option>
                <option>MD</option>
                <option>FCPS</option>
                <option>PhD</option>
                <option>Other</option>
              </select>
              {errors.qualification && <span className="error">{errors.qualification}</span>}
            </div>

            <div className="input-group">
              <label>Specialization</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              >
                <option value="">Select Specialization</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>Neurologist</option>
                <option>Pediatrician</option>
                <option>Psychiatrist</option>
                <option>General Physician</option>
              </select>
              {errors.specialization && <span className="error">{errors.specialization}</span>}
            </div>

            <div className="input-group">
              <label>Institute</label>
              <input
                type="text"
                name="institute"
                placeholder="e.g. King Edward Medical University"
                value={formData.institute}
                onChange={handleChange}
              />
              {errors.institute && <span className="error">{errors.institute}</span>}
            </div>

            <div className="input-group">
              <label>Year of Passing</label>
              <input
                type="date"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
              />
              {errors.passingYear && <span className="error">{errors.passingYear}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="prev-btn" onClick={handlePrevious}>
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-grid">
            <div className="input-group">
              <label>Years of Experience</label>
              <input
                type="text"
                name="experienceYears"
                placeholder="Enter you years of experience"
                value={formData.experienceYears}
                onChange={handleChange}
              />

              {errors.experienceYears && <span className="error">{errors.experienceYears}</span>}
            </div>

            <div className="input-group">
              <label>Current Hospital</label>
              <input
                type="text"
                name="currentHospital"
                placeholder="e.g. Mayo Hospital"
                value={formData.currentHospital}
                onChange={handleChange}
              />
              {errors.currentHospital && <span className="error">{errors.currentHospital}</span>}
            </div>

            <div className="input-group">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="e.g. Consultant"
                value={formData.designation}
                onChange={handleChange}
              />
              {errors.designation && <span className="error">{errors.designation}</span>}
            </div>

            <div className="input-group">
              <label>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="PMC-XXXXXX"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
              {errors.licenseNumber && <span className="error">{errors.licenseNumber}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="prev-btn" onClick={handlePrevious}>
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-grid">
            <div className="input-group">
              <label>Online Consultation Fee (PKR)</label>
              <input
                type="number"
                name="onlineFee"
                value={formData.onlineFee}
                onChange={handleChange}
              />
              {errors.onlineFee && <span className="error">{errors.onlineFee}</span>}
            </div>

            <div className="input-group">
              <label>Consultation Hours</label>
              <input
                type="text"
                name="consultationHours"
                placeholder="e.g. 9AM - 5PM"
                value={formData.consultationHours}
                onChange={handleChange}
              />
              {errors.consultationHours && (
                <span className="error">{errors.consultationHours}</span>
              )}
            </div>

            <div className="input-group">
              <label>Available Days</label>
              <div className="checkbox-group">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                    />{" "}
                    {day}
                  </label>
                ))}
              </div>
              {errors.availableDays && <span className="error">{errors.availableDays}</span>}
            </div>

            <div className="form-actions space-top">
              <button type="button" className="prev-btn" onClick={handlePrevious}>
                ← Previous
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-grid">
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter strong password"
                value={formData.password}
                onChange={handleChange}
              />
              {passwordStrength && (
                <span className={`strength ${passwordStrength.toLowerCase()}`}>
                  {passwordStrength}
                </span>
              )}
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-actions space-top">
              <button type="button" className="prev-btn" onClick={handlePrevious}>
                ← Previous
              </button>
              <button
                type="button"
                className="next-btn"
                onClick={() => alert("Form submitted successfully!")}
              >
                Submit ✅
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="doctor-registration-page">
      <div className="doctor-registration-container">
        <div className="header-section1">
          <h1>Join Our Medical Team</h1>
          <p>Start your journey with us in just a few steps</p>
        </div>

        {/* Progress Stepper */}
        <div className="stepper">
          {steps.map((s, index) => (
            <div key={index} className="step-item">
              <div
                className={`step-circle ${step >= index + 1 ? "active" : ""}`}
              >
                {s.icon}
              </div>
              <p className="step-label">{s.label}</p>
              {index < steps.length - 1 && (
                <div
                  className={`step-line ${step > index + 1 ? "active" : ""}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="form-card">
          <h2>{steps[step - 1].label} Information</h2>
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
