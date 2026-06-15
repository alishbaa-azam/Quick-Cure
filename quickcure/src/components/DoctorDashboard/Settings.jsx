import React, { useState, useEffect } from 'react';
import { Save, Camera, Clock, Plus, Trash2, AlertCircle, CheckCircle, Loader, User, Stethoscope, Award, Briefcase, DollarSign } from 'lucide-react';
import { updateDoctorProfile } from '../../api/doctorApi';

const Settings = ({ doctorId, doctorData, onProfileUpdate }) => {
  const [settings, setSettings] = useState({
    name: "",
    speciality: "",
    qualification: "",
    experience: "",
    fee: "",
    services: [],
    availability: [],
    image: null,
    currentImageUrl: null
  });

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  
  const API_URL = "http://localhost:5000";
  const id = doctorId || (JSON.parse(localStorage.getItem('user') || '{}').id || JSON.parse(localStorage.getItem('user') || '{}')._id);

  useEffect(() => {
    if (!id) {
      console.error('No doctor ID available');
      setInitialLoad(false);
      return;
    }

    if (doctorData) {
      const availability = doctorData.availability || [];
      setSettings({
        name: doctorData.name || doctorData.fullName || "",
        speciality: doctorData.speciality || doctorData.specialization || "",
        qualification: doctorData.qualification || "",
        experience: doctorData.experience || "",
        fee: doctorData.fee || "",
        services: doctorData.services || [],
        availability: availability,
        image: null,
        currentImageUrl: doctorData.image || null
      });
      setImagePreview(doctorData.image ? `${API_URL}${doctorData.image}` : null);
      setInitialLoad(false);
      return;
    }
    setInitialLoad(false);
  }, [id, doctorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fee') {
      setSettings(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }));
      return;
    }
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleServicesChange = (e) => {
    const servicesArray = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setSettings(prev => ({ ...prev, services: servicesArray }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setStatusMessage({ type: 'error', text: 'Only image files (jpeg, jpg, png, webp, gif) are allowed' });
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setSettings(prev => ({ ...prev, image: file }));
    }
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...settings.availability];
    updatedAvailability[index] = { ...updatedAvailability[index], [field]: value };
    setSettings(prev => ({ ...prev, availability: updatedAvailability }));
  };

  const addAvailabilitySlot = () => {
    setSettings(prev => ({
      ...prev,
      availability: [...prev.availability, { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true }]
    }));
  };

  const removeAvailabilitySlot = (index) => {
    setSettings(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!settings.name || !settings.speciality || !settings.fee) {
      setStatusMessage({ type: 'error', text: 'Name, Speciality, and Fee are required fields' });
      return;
    }

    if (!id) {
      setStatusMessage({ type: 'error', text: 'Doctor ID not found. Please login again.' });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: '', text: '' });
    
    try {
      const formData = new FormData();
      formData.append('name', settings.name.trim());
      formData.append('speciality', settings.speciality.trim());
      formData.append('qualification', settings.qualification.trim());
      formData.append('experience', settings.experience.trim());
      formData.append('fee', settings.fee);
      formData.append('services', JSON.stringify(settings.services));
      formData.append('availability', JSON.stringify(settings.availability));
      
      if (settings.image && typeof settings.image !== 'string') {
        formData.append('image', settings.image);
      }

      const result = await updateDoctorProfile(id, formData);

      if (result.success) {
        setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
        if (onProfileUpdate) onProfileUpdate();
      } else {
        if (result.status === 404) {
          setStatusMessage({ type: 'error', text: `Doctor not found (ID: ${id}). Please check if the doctor exists.` });
        } else if (result.status === 400) {
          setStatusMessage({ type: 'error', text: `Validation error: ${result.error || 'Please check your input'}` });
        } else if (result.status === 401) {
          setStatusMessage({ type: 'error', text: 'Unauthorized. Please login again.' });
        } else {
          setStatusMessage({ type: 'error', text: result.error || 'Failed to update profile' });
        }
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#174047]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#174047] animate-spin"></div>
        </div>
      </div>
    );
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#174047]">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your professional profile and availability</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#174047] to-[#2c6774] p-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User size={20} />
            Edit Profile
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {statusMessage.text && (
            <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${
              statusMessage.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {statusMessage.text}
            </div>
          )}

          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#2c6774] shadow-lg">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/default-doctor.jpg'; }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2c6774] to-[#174047] flex items-center justify-center text-white text-2xl font-bold">
                    {(settings.name || 'D').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <Camera size={14} className="text-[#2c6774]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]" />
              <p className="text-xs text-gray-400 mt-1">Max 5MB. JPEG, JPG, PNG, WEBP, GIF</p>
            </div>
          </div>

          {/* Name & Speciality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-[#2c6774]" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" name="name" value={settings.name} onChange={handleChange} required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Stethoscope size={14} className="text-[#2c6774]" />
                Specialization <span className="text-red-500">*</span>
              </label>
              <input type="text" name="speciality" value={settings.speciality} onChange={handleChange} required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm" />
            </div>
          </div>

          {/* Qualification & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Award size={14} className="text-[#2c6774]" />
                Qualification
              </label>
              <input type="text" name="qualification" value={settings.qualification} onChange={handleChange}
                placeholder="e.g., MBBS, MD"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Briefcase size={14} className="text-[#2c6774]" />
                Experience
              </label>
              <input type="text" name="experience" value={settings.experience} onChange={handleChange}
                placeholder="e.g., 10 years"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm" />
            </div>
          </div>

          {/* Fee */}
          <div className="md:w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#2c6774]" />
              Consultation Fee <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm font-medium">PKR</span>
              </div>
              <input type="text" name="fee" value={settings.fee} onChange={handleChange} required
                placeholder="Enter amount"
                className="w-full pl-14 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm" />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Services</label>
            <textarea name="services" value={settings.services.join(', ')} onChange={handleServicesChange}
              placeholder="Enter services separated by commas"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm" rows="2" />
            <p className="text-xs text-gray-400 mt-1">Separate multiple services with commas</p>
          </div>
          
          {/* Availability Section */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
              <div>
                <h4 className="text-base font-bold text-[#174047] flex items-center gap-2">
                  <Clock size={18} className="text-[#2c6774]" />
                  Available Time Slots
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">Set your weekly working hours</p>
              </div>
              <button type="button" onClick={addAvailabilitySlot}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm font-medium transition-colors shadow-sm">
                <Plus size={16} />
                Add Time Slot
              </button>
            </div>
            
            <div className="space-y-3">
              {settings.availability.map((slot, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Day</label>
                    <select value={slot.day} onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774] bg-white">
                      {weekDays.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Time</label>
                    <input type="time" value={slot.startTime} onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">End Time</label>
                    <input type="time" value={slot.endTime} onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2c6774]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`available-${index}`} checked={slot.isAvailable}
                        onChange={(e) => handleAvailabilityChange(index, 'isAvailable', e.target.checked)}
                        className="w-4 h-4 text-[#2c6774] focus:ring-[#2c6774] rounded" />
                      <label htmlFor={`available-${index}`} className="text-sm text-gray-600">Available</label>
                    </div>
                  </div>
                  <div className="flex justify-end lg:justify-start">
                    <button type="button" onClick={() => removeAvailabilitySlot(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove slot">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              
              {settings.availability.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <Clock size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500 text-sm font-medium">No availability slots added yet</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Add Time Slot" to set your working hours</p>
                </div>
              )}
            </div>
            
            {/* Schedule Summary */}
            {settings.availability.filter(s => s.isAvailable).length > 0 && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle size={16} />
                  Available Schedule Summary
                </p>
                <div className="mt-2 space-y-1">
                  {settings.availability.filter(s => s.isAvailable).map((slot, idx) => (
                    <p key={idx} className="text-xs text-emerald-700">
                      {slot.day}: {slot.startTime} - {slot.endTime}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t">
            <button type="submit" disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl hover:from-[#1e4e56] hover:to-[#0f2c33] text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg">
              {loading ? (
                <><Loader className="animate-spin" size={18} /> Saving Changes...</>
              ) : (
                <><Save size={18} /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;