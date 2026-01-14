// The below code has API integration and connected with backend
import React, { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
      else if (!/^[0-9]{11}$/.test(formData.phone))
        newErrors.phone = "Invalid phone number or number must be 11 digits";
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

  // ✅ API Integration - Submit Form
const handleSubmit = async () => {
  // Clear previous messages
  setSubmitSuccess(false);
  setSubmitError("");
  
  // Validate final step
  if (!validateStep()) {
    return;
  }

  setIsSubmitting(true);

  try {
    // Create FormData for file upload
    const formDataToSend = new FormData();
    
    // Append all form fields to match backend model
    // Personal Information
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('cnic', formData.cnic);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('country', formData.country);
    
    // Education Information
    formDataToSend.append('qualification', formData.qualification);
    formDataToSend.append('specialization', formData.specialization);
    formDataToSend.append('institute', formData.institute);
    formDataToSend.append('passingYear', formData.passingYear);
    
    // Professional Information
    formDataToSend.append('experienceYears', formData.experienceYears);
    formDataToSend.append('currentHospital', formData.currentHospital);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('licenseNumber', formData.licenseNumber);
    
    // Consultation Information
    formDataToSend.append('onlineFee', formData.onlineFee.toString());
    formDataToSend.append('consultationHours', formData.consultationHours);
    
    // ✅ FIX: Append each day separately
    formData.availableDays.forEach(day => {
      formDataToSend.append('availableDays[]', day);
    });
    
    // Security Information
    formDataToSend.append('password', formData.password);
    
    // Append profile picture file if exists
    if (formData.file) {
      formDataToSend.append('profilePicture', formData.file);
    }

    console.log('Sending registration request...');
    console.log('Available days:', formData.availableDays);
    
    // Debug: Show what's in FormData
    console.log('FormData contents:');
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ', pair[1]);
    }
    
    // Send to backend API
    const response = await fetch('http://localhost:5000/api/doctor-registration/register', {
      method: 'POST',
      body: formDataToSend,
    });

    const data = await response.json();
    console.log('Response:', data)

    if (response.ok) {
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
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
      setStep(1);
      
      // Show success message
      alert(`✅ ${data.message}`);
      
      // If you want to store token for auto-login
      if (data.data && data.data.token) {
        localStorage.setItem('doctorToken', data.data.token);
        console.log('Token saved for future use');
      }
    } else {
      setSubmitError(data.message || 'Registration failed');
      
      // Show validation errors if any
      if (data.errors) {
        console.error('Validation errors:', data.errors);
        let errorMessages = data.errors.map(err => {
          if (err.path === 'availableDays') {
            return 'Please select at least one available day';
          }
          return err.msg;
        }).join(', ');
        alert(`❌ ${errorMessages}`);
      } else {
        alert(`❌ ${data.message || 'Registration failed. Please try again.'}`);
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
    setSubmitError('Network error. Please check your connection.');
    alert('❌ Network error. Please check your connection and try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  // ✅ Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa] no-spinner"
                  maxLength="11"
                  pattern="[0-9]{11}"
                  inputMode="numeric"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">CNIC / ID Number</label>
                <input
                  type="text"
                  name="cnic"
                  placeholder="XXXXXXXXXXXXX"
                  value={formData.cnic}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 13);
                    setFormData({
                      ...formData,
                      cnic: value
                    });
                  }}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  maxLength="13"
                />
                {errors.cnic && <span className="text-red-500 text-sm mt-1">{errors.cnic}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street #, Area, City"
                  value={formData.address}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                />
                {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-[#174047] mb-1">Profile Picture</label>
                <input 
                  type="file" 
                  name="file" 
                  onChange={handleChange}
                  className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Upload JPG, PNG or JPEG (max 5MB)</p>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </form>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Qualification</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              >
                <option value="">Select Qualification</option>
                <option>MBBS</option>
                <option>MD</option>
                <option>FCPS</option>
                <option>PhD</option>
                <option>Other</option>
              </select>
              {errors.qualification && <span className="text-red-500 text-sm mt-1">{errors.qualification}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Specialization</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              >
                <option value="">Select Specialization</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>Neurologist</option>
                <option>Pediatrician</option>
                <option>Psychiatrist</option>
                <option>General Physician</option>
              </select>
              {errors.specialization && <span className="text-red-500 text-sm mt-1">{errors.specialization}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Institute</label>
              <input
                type="text"
                name="institute"
                placeholder="e.g. King Edward Medical University"
                value={formData.institute}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.institute && <span className="text-red-500 text-sm mt-1">{errors.institute}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Year of Passing</label>
              <input
                type="date"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.passingYear && <span className="text-red-500 text-sm mt-1">{errors.passingYear}</span>}
            </div>

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Years of Experience</label>
              <input
                type="text"
                name="experienceYears"
                placeholder="e.g., 5 years"
                value={formData.experienceYears}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.experienceYears && <span className="text-red-500 text-sm mt-1">{errors.experienceYears}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Current Hospital</label>
              <input
                type="text"
                name="currentHospital"
                placeholder="e.g. Mayo Hospital"
                value={formData.currentHospital}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.currentHospital && <span className="text-red-500 text-sm mt-1">{errors.currentHospital}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="e.g. Consultant"
                value={formData.designation}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.designation && <span className="text-red-500 text-sm mt-1">{errors.designation}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="PMC-XXXXXX"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.licenseNumber && <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>}
            </div>

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Online Consultation Fee (PKR)</label>
              <input
                type="number"
                name="onlineFee"
                value={formData.onlineFee}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
                min="0"
              />
              {errors.onlineFee && <span className="text-red-500 text-sm mt-1">{errors.onlineFee}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Online Consultation Hours</label>
              <input
                type="text"
                name="consultationHours"
                placeholder="e.g. 9AM - 5PM"
                value={formData.consultationHours}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.consultationHours && (
                <span className="text-red-500 text-sm mt-1">{errors.consultationHours}</span>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-medium text-[#174047] mb-1">Available Days</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <label key={day} className="flex items-center gap-2 text-[#174047] font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded"
                    />
                    {day}
                  </label>
                ))}
              </div>
              {errors.availableDays && <span className="text-red-500 text-sm mt-1">{errors.availableDays}</span>}
            </div>

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button 
                type="button" 
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter strong password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {passwordStrength && (
                <span className={`text-sm mt-1 ${
                  passwordStrength === "Weak" ? "text-red-500" :
                  passwordStrength === "Medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  Strength: {passwordStrength}
                </span>
              )}
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-[#174047] mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="px-3 py-2 border border-[#c0d3dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] focus:border-transparent bg-[#f8f9fa]"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Status Messages */}
            {submitSuccess && (
              <div className="md:col-span-2 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">✅ Registration successful! Please check your email for verification.</p>
              </div>
            )}
            
            {submitError && (
              <div className="md:col-span-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">❌ {submitError}</p>
              </div>
            )}

            <div className="flex justify-between mt-8 col-span-1 md:col-span-2">
              <button 
                type="button" 
                className="bg-[#c0d3dc] hover:bg-[#9fbfc5] text-[#174047] px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
              <button
                type="button"
                className="bg-[#2c6774] hover:bg-[#1e4e56] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fbfc5] p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 md:p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2c6774] mb-2">Join Our Medical Team</h1>
          <p className="text-[#174047]">Start your journey with us in just a few steps</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-start relative mb-8">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= index + 1 
                    ? "bg-[#2c6774] text-white scale-110" 
                    : "bg-[#c0d3dc] text-[#174047]"
                }`}
              >
                {s.icon}
              </div>
              <p className="text-sm font-medium text-[#174047] mt-2 text-center">{s.label}</p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-6 left-5/8 w-5/6 h-1 transition-colors duration-300 ${
                    step > index + 1 ? "bg-[#2c6774]" : "bg-[#c0d3dc]"
                  }`}
                  style={{ top: '33%', transform: 'translateY(-50%)' }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#2c6774] text-center mb-6">
            {steps[step - 1].label} Information
          </h2>
          {renderStepContent()}
        </div>

        {/* Debug info (remove in production) */}
        <div className="mt-4 text-xs text-gray-500">
          <p>Backend URL: http://localhost:5000/api/doctor-registration/register</p>
          <p>Step: {step} of {steps.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;