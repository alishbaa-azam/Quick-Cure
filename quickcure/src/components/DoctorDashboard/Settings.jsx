// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Settings = ({ doctorId, doctorData }) => {
//   const [settings, setSettings] = useState({
//     name: "",
//     speciality: "",
//     qualification: "",
//     experience: "",
//     fee: "",
//     services: [],
//     availability: [],
//     image: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [initialLoad, setInitialLoad] = useState(true);
//   const id = doctorId || (JSON.parse(localStorage.getItem('user') || '{}').id || JSON.parse(localStorage.getItem('user') || '{}')._id);

//   // Fetch doctor's current data on component mount
//   useEffect(() => {
//     if (!doctorId) {
//       setInitialLoad(false);
//       return;
//     }

//     // If doctorData is provided, use it directly
//     if (doctorData) {
//       setSettings({
//         name: doctorData.name || doctorData.fullName || "",
//         speciality: doctorData.speciality || doctorData.specialization || "",
//         qualification: doctorData.qualification || "",
//         experience: doctorData.experience || "",
//         fee: doctorData.fee || "",
//         services: doctorData.services || [],
//         availability: doctorData.availability || [],
//         image: doctorData.image || null
//       });
//       setInitialLoad(false);
//       return;
//     }

//     const fetchDoctorData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
//         const doctorData = response.data;
        
//         setSettings({
//           name: doctorData.name || "",
//           speciality: doctorData.speciality || "",
//           qualification: doctorData.qualification || "",
//           experience: doctorData.experience || "",
//           fee: doctorData.fee || "",
//           services: doctorData.services || [],
//           availability: doctorData.availability || [],
//           image: doctorData.image || null
//         });
//       } catch (error) {
//         console.error('Error fetching doctor data:', error);
//         alert('Failed to load doctor profile');
//       } finally {
//         setInitialLoad(false);
//       }
//     };

//     fetchDoctorData();
//   }, [doctorId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Handle fee input - allow only numbers
//     if (name === 'fee') {
//       const digitsOnly = value.replace(/\D/g, '');
//       setSettings(prev => ({
//         ...prev,
//         [name]: digitsOnly
//       }));
//       return;
//     }
    
//     // For other fields
//     setSettings(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleServicesChange = (e) => {
//     const servicesArray = e.target.value.split(',').map(service => service.trim());
//     setSettings(prev => ({
//       ...prev,
//       services: servicesArray
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB');
//         return;
//       }
      
//       // Check file type
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('Only image files (jpeg, jpg, png, webp, gif) are allowed');
//         return;
//       }
      
//       setSettings(prev => ({
//         ...prev,
//         image: file
//       }));
//     }
//   };

//   const handleAvailabilityChange = (index, field, value) => {
//     const updatedAvailability = [...settings.availability];
//     updatedAvailability[index] = {
//       ...updatedAvailability[index],
//       [field]: value
//     };
//     setSettings(prev => ({
//       ...prev,
//       availability: updatedAvailability
//     }));
//   };

//   const addAvailabilitySlot = () => {
//     setSettings(prev => ({
//       ...prev,
//       availability: [
//         ...prev.availability,
//         { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true }
//       ]
//     }));
//   };

//   const removeAvailabilitySlot = (index) => {
//     const updatedAvailability = settings.availability.filter((_, i) => i !== index);
//     setSettings(prev => ({
//       ...prev,
//       availability: updatedAvailability
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!settings.name || !settings.speciality || !settings.fee) {
//       alert('Name, Speciality, and Fee are required fields');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const formData = new FormData();
      
//       // Append all fields to formData
//       formData.append('name', settings.name);
//       formData.append('speciality', settings.speciality);
//       formData.append('qualification', settings.qualification);
//       formData.append('experience', settings.experience);
//       formData.append('fee', settings.fee);
//       formData.append('services', JSON.stringify(settings.services));
//       formData.append('availability', JSON.stringify(settings.availability));
      
//       if (settings.image && typeof settings.image !== 'string') {
//         formData.append('image', settings.image);
//       }

//       const response = await axios.put(
//         `/api/doctors/${doctorId}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         }
//       );

//       console.log('Settings updated:', response.data);
//       alert('Profile updated successfully!');
      
//       // Update local state with response data
//       const updatedDoctor = response.data;
//       setSettings(prev => ({
//         ...prev,
//         name: updatedDoctor.name,
//         speciality: updatedDoctor.speciality,
//         qualification: updatedDoctor.qualification,
//         experience: updatedDoctor.experience,
//         fee: updatedDoctor.fee,
//         services: updatedDoctor.services,
//         availability: updatedDoctor.availability,
//         image: updatedDoctor.image
//       }));
      
//     } catch (error) {
//       console.error('Error updating doctor:', error);
      
//       if (error.response) {
//         // Server responded with error status
//         if (error.response.status === 400) {
//           alert(`Validation error: ${error.response.data.message}`);
//         } else if (error.response.status === 404) {
//           alert('Doctor not found');
//         } else {
//           alert(`Error: ${error.response.data.message || 'Failed to update profile'}`);
//         }
//       } else if (error.request) {
//         // Request was made but no response received
//         alert('Network error. Please check your connection.');
//       } else {
//         // Something else happened
//         alert('An unexpected error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoad) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 md:space-y-6">
//       <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Profile Settings</h2>
      
//       <div className="bg-white rounded-xl shadow p-4 md:p-6">
//         <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Edit Profile</h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
//           {/* Personal Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="text"
//                 name="name"
//                 value={settings.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Specialization <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="text"
//                 name="speciality"
//                 value={settings.speciality}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               />
//             </div>
//           </div>
          
//           {/* Professional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
//               <input 
//                 type="text"
//                 name="qualification"
//                 value={settings.qualification}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                 placeholder="e.g., MBBS, MD, etc."
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
//               <input 
//                 type="text"
//                 name="experience"
//                 value={settings.experience}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                 placeholder="e.g., 10 years of experience"
//               />
//             </div>
//           </div>
          
//           {/* Fee */}
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
//             <div className="md:w-1/2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Consultation Fee <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <span className="text-gray-500">PKR</span>
//                 </div>
//                 <input 
//                   type="text"
//                   name="fee"
//                   value={settings.fee}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                   placeholder="Enter amount"
//                 />
//               </div>
//             </div>
//           </div>
          
//           {/* Services */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
//             <textarea 
//               name="services"
//               value={settings.services.join(', ')}
//               onChange={handleServicesChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               placeholder="Enter services separated by commas (e.g., General Checkup, Cardiology Consultation, etc.)"
//               rows="2"
//             />
//             <p className="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
//           </div>
          
//           {/* Profile Image */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
//             <div className="flex items-center space-x-4">
//               {settings.image && (
//                 <div className="w-16 h-16 rounded-full overflow-hidden">
//                   <img 
//                     src={typeof settings.image === 'string' ? settings.image : URL.createObjectURL(settings.image)}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <input 
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               />
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Allowed formats: JPEG, JPG, PNG, WEBP, GIF</p>
//           </div>
          
//           {/* Availability Section */}
//           <div className="border-t pt-4">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-md font-bold text-[#174047]">Availability</h4>
//               <button
//                 type="button"
//                 onClick={addAvailabilitySlot}
//                 className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
//               >
//                 + Add Slot
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {settings.availability.map((slot, index) => (
//                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
//                     <select
//                       value={slot.day}
//                       onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
//                     >
//                       <option value="Monday">Monday</option>
//                       <option value="Tuesday">Tuesday</option>
//                       <option value="Wednesday">Wednesday</option>
//                       <option value="Thursday">Thursday</option>
//                       <option value="Friday">Friday</option>
//                       <option value="Saturday">Saturday</option>
//                       <option value="Sunday">Sunday</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
//                     <input 
//                       type="time"
//                       value={slot.startTime}
//                       onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
//                     <input 
//                       type="time"
//                       value={slot.endTime}
//                       onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
//                     />
//                   </div>
                  
//                   <div className="flex items-center space-x-2">
//                     <div className="flex items-center">
//                       <input 
//                         type="checkbox"
//                         checked={slot.isAvailable}
//                         onChange={(e) => handleAvailabilityChange(index, 'isAvailable', e.target.checked)}
//                         className="mr-2"
//                       />
//                       <span className="text-sm">Available</span>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeAvailabilitySlot(index)}
//                       className="ml-auto px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               {settings.availability.length === 0 && (
//                 <p className="text-gray-500 text-sm italic">No availability slots added. Click "Add Slot" to add your working hours.</p>
//               )}
//             </div>
//           </div>
          
//           {/* Submit Button */}
//           <div className="flex justify-end pt-4">
//             <button 
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Settings;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Settings = ({ doctorId, doctorData, onProfileUpdate }) => {
//   const [settings, setSettings] = useState({
//     name: "",
//     speciality: "",
//     qualification: "",
//     experience: "",
//     fee: "",
//     services: [],
//     availability: [], // This will store available time slots
//     image: null,
//     currentImageUrl: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [initialLoad, setInitialLoad] = useState(true);
//   const [imagePreview, setImagePreview] = useState(null);
  
//   const id = doctorId || (JSON.parse(localStorage.getItem('user') || '{}').id || JSON.parse(localStorage.getItem('user') || '{}')._id);
//   const API_URL = "http://localhost:5000";

//   // Fetch doctor's current data on component mount
//   useEffect(() => {
//     if (!doctorId) {
//       setInitialLoad(false);
//       return;
//     }

//     // If doctorData is provided, use it directly
//     if (doctorData) {
//       const availability = doctorData.availability || [];
//       setSettings({
//         name: doctorData.name || doctorData.fullName || "",
//         speciality: doctorData.speciality || doctorData.specialization || "",
//         qualification: doctorData.qualification || "",
//         experience: doctorData.experience || "",
//         fee: doctorData.fee || "",
//         services: doctorData.services || [],
//         availability: availability,
//         image: null,
//         currentImageUrl: doctorData.image || null
//       });
//       setImagePreview(doctorData.image ? `${API_URL}${doctorData.image}` : null);
//       setInitialLoad(false);
//       return;
//     }

//     const fetchDoctorData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/doctors/${doctorId}`);
//         const doctorData = response.data;
//         const availability = doctorData.availability || [];
        
//         setSettings({
//           name: doctorData.name || "",
//           speciality: doctorData.speciality || "",
//           qualification: doctorData.qualification || "",
//           experience: doctorData.experience || "",
//           fee: doctorData.fee || "",
//           services: doctorData.services || [],
//           availability: availability,
//           image: null,
//           currentImageUrl: doctorData.image || null
//         });
//         setImagePreview(doctorData.image ? `${API_URL}${doctorData.image}` : null);
//       } catch (error) {
//         console.error('Error fetching doctor data:', error);
//         alert('Failed to load doctor profile');
//       } finally {
//         setInitialLoad(false);
//       }
//     };

//     fetchDoctorData();
//   }, [doctorId, doctorData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // Handle fee input - allow only numbers
//     if (name === 'fee') {
//       const digitsOnly = value.replace(/\D/g, '');
//       setSettings(prev => ({
//         ...prev,
//         [name]: digitsOnly
//       }));
//       return;
//     }
    
//     // For other fields
//     setSettings(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleServicesChange = (e) => {
//     const servicesArray = e.target.value.split(',').map(service => service.trim()).filter(s => s);
//     setSettings(prev => ({
//       ...prev,
//       services: servicesArray
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('File size must be less than 5MB');
//         return;
//       }
      
//       // Check file type
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('Only image files (jpeg, jpg, png, webp, gif) are allowed');
//         return;
//       }
      
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
      
//       setSettings(prev => ({
//         ...prev,
//         image: file,
//         currentImageUrl: previewUrl
//       }));
//     }
//   };

//   const handleAvailabilityChange = (index, field, value) => {
//     const updatedAvailability = [...settings.availability];
//     updatedAvailability[index] = {
//       ...updatedAvailability[index],
//       [field]: value
//     };
//     setSettings(prev => ({
//       ...prev,
//       availability: updatedAvailability
//     }));
//   };

//   const addAvailabilitySlot = () => {
//     setSettings(prev => ({
//       ...prev,
//       availability: [
//         ...prev.availability,
//         { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true }
//       ]
//     }));
//   };

//   const removeAvailabilitySlot = (index) => {
//     const updatedAvailability = settings.availability.filter((_, i) => i !== index);
//     setSettings(prev => ({
//       ...prev,
//       availability: updatedAvailability
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!settings.name || !settings.speciality || !settings.fee) {
//       alert('Name, Speciality, and Fee are required fields');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const formData = new FormData();
      
//       // Append all fields to formData
//       formData.append('name', settings.name);
//       formData.append('speciality', settings.speciality);
//       formData.append('qualification', settings.qualification);
//       formData.append('experience', settings.experience);
//       formData.append('fee', settings.fee);
//       formData.append('services', JSON.stringify(settings.services));
//       formData.append('availability', JSON.stringify(settings.availability));
      
//       // Only append image if it's a new file (not a string URL)
//       if (settings.image && typeof settings.image !== 'string') {
//         formData.append('image', settings.image);
//       }

//       const response = await axios.put(
//         `${API_URL}/api/doctors/${doctorId}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         }
//       );

//       console.log('Settings updated:', response.data);
//       alert('Profile updated successfully!');
      
//       // Update local state with response data
//       const updatedDoctor = response.data;
//       const updatedAvailability = updatedDoctor.availability || [];
      
//       setSettings(prev => ({
//         ...prev,
//         name: updatedDoctor.name,
//         speciality: updatedDoctor.speciality,
//         qualification: updatedDoctor.qualification,
//         experience: updatedDoctor.experience,
//         fee: updatedDoctor.fee,
//         services: updatedDoctor.services,
//         availability: updatedAvailability,
//         image: null,
//         currentImageUrl: updatedDoctor.image ? `${API_URL}${updatedDoctor.image}` : prev.currentImageUrl
//       }));
      
//       // Call the callback to refresh doctor data in parent component
//       if (onProfileUpdate) {
//         onProfileUpdate();
//       }
      
//     } catch (error) {
//       console.error('Error updating doctor:', error);
      
//       if (error.response) {
//         // Server responded with error status
//         if (error.response.status === 400) {
//           alert(`Validation error: ${error.response.data.message}`);
//         } else if (error.response.status === 404) {
//           alert('Doctor not found');
//         } else {
//           alert(`Error: ${error.response.data.message || 'Failed to update profile'}`);
//         }
//       } else if (error.request) {
//         // Request was made but no response received
//         alert('Network error. Please check your connection.');
//       } else {
//         // Something else happened
//         alert('An unexpected error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoad) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
//       </div>
//     );
//   }

//   // Days of the week for availability
//   const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   return (
//     <div className="space-y-4 md:space-y-6">
//       <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Profile Settings</h2>
      
//       <div className="bg-white rounded-xl shadow p-4 md:p-6">
//         <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Edit Profile</h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
//           {/* Personal Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="text"
//                 name="name"
//                 value={settings.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Specialization <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 type="text"
//                 name="speciality"
//                 value={settings.speciality}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               />
//             </div>
//           </div>
          
//           {/* Professional Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
//               <input 
//                 type="text"
//                 name="qualification"
//                 value={settings.qualification}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                 placeholder="e.g., MBBS, MD, etc."
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
//               <input 
//                 type="text"
//                 name="experience"
//                 value={settings.experience}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                 placeholder="e.g., 10 years of experience"
//               />
//             </div>
//           </div>
          
//           {/* Fee */}
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
//             <div className="md:w-1/2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Consultation Fee <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <span className="text-gray-500">PKR</span>
//                 </div>
//                 <input 
//                   type="text"
//                   name="fee"
//                   value={settings.fee}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                   placeholder="Enter amount"
//                 />
//               </div>
//             </div>
//           </div>
          
//           {/* Services */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
//             <textarea 
//               name="services"
//               value={settings.services.join(', ')}
//               onChange={handleServicesChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//               placeholder="Enter services separated by commas (e.g., General Checkup, Cardiology Consultation, etc.)"
//               rows="2"
//             />
//             <p className="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
//           </div>
          
//           {/* Profile Image */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               {(imagePreview || settings.currentImageUrl) && (
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#2c6774]">
//                   <img 
//                     src={imagePreview || settings.currentImageUrl}
//                     alt="Profile Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <input 
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Allowed formats: JPEG, JPG, PNG, WEBP, GIF</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Availability Section - Only show available slots */}
//           <div className="border-t pt-4">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-md font-bold text-[#174047]">Available Time Slots</h4>
//               <button
//                 type="button"
//                 onClick={addAvailabilitySlot}
//                 className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm font-medium transition-colors"
//               >
//                 + Add Time Slot
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {settings.availability.map((slot, index) => (
//                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg bg-gray-50">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
//                     <select
//                       value={slot.day}
//                       onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
//                     >
//                       {weekDays.map(day => (
//                         <option key={day} value={day}>{day}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
//                     <input 
//                       type="time"
//                       value={slot.startTime}
//                       onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
//                     <input 
//                       type="time"
//                       value={slot.endTime}
//                       onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
//                     />
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <input 
//                         type="checkbox"
//                         id={`available-${index}`}
//                         checked={slot.isAvailable}
//                         onChange={(e) => handleAvailabilityChange(index, 'isAvailable', e.target.checked)}
//                         className="mr-2 w-4 h-4 text-[#2c6774] focus:ring-[#2c6774]"
//                       />
//                       <label htmlFor={`available-${index}`} className="text-sm text-gray-700">Available</label>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeAvailabilitySlot(index)}
//                       className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
              
//               {settings.availability.length === 0 && (
//                 <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                   <p className="text-gray-500 mb-2">No availability slots added yet</p>
//                   <p className="text-sm text-gray-400">Click "Add Time Slot" to set your available working hours</p>
//                 </div>
//               )}
//             </div>
            
//             {/* Display current schedule summary */}
//             {settings.availability.length > 0 && (
//               <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                 <p className="text-sm text-blue-800 font-medium">Schedule Summary:</p>
//                 <div className="mt-2 space-y-1">
//                   {settings.availability.filter(slot => slot.isAvailable).map((slot, idx) => (
//                     <p key={idx} className="text-xs text-blue-700">
//                       {slot.day}: {slot.startTime} - {slot.endTime}
//                     </p>
//                   ))}
//                   {settings.availability.filter(slot => !slot.isAvailable).length > 0 && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Note: {settings.availability.filter(slot => !slot.isAvailable).length} slot(s) marked as unavailable
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Submit Button */}
//           <div className="flex justify-end pt-4 border-t">
//             <button 
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-lg hover:from-[#1e4e56] hover:to-[#174047] text-sm md:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving Changes...
//                 </>
//               ) : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Settings;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  
  const API_URL = "http://localhost:5000";
  
  // Get doctor ID from props or localStorage
  const id = doctorId || (JSON.parse(localStorage.getItem('user') || '{}').id || JSON.parse(localStorage.getItem('user') || '{}')._id);

  // Fetch doctor's current data on component mount
  useEffect(() => {
    if (!id) {
      console.error('No doctor ID available');
      setInitialLoad(false);
      return;
    }

    // If doctorData is provided, use it directly
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

    const fetchDoctorData = async () => {
      try {
        console.log('Fetching doctor data for ID:', id);
        const response = await axios.get(`${API_URL}/api/doctors/${id}`);
        const doctorData = response.data;
        const availability = doctorData.availability || [];
        
        setSettings({
          name: doctorData.name || "",
          speciality: doctorData.speciality || "",
          qualification: doctorData.qualification || "",
          experience: doctorData.experience || "",
          fee: doctorData.fee || "",
          services: doctorData.services || [],
          availability: availability,
          image: null,
          currentImageUrl: doctorData.image || null
        });
        setImagePreview(doctorData.image ? `${API_URL}${doctorData.image}` : null);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        if (error.response?.status === 404) {
          alert('Doctor profile not found. Please check if the doctor ID is correct.');
        } else {
          alert('Failed to load doctor profile. Please try again.');
        }
      } finally {
        setInitialLoad(false);
      }
    };

    fetchDoctorData();
  }, [id, doctorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle fee input - allow only numbers
    if (name === 'fee') {
      const digitsOnly = value.replace(/\D/g, '');
      setSettings(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
      return;
    }
    
    // For other fields
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServicesChange = (e) => {
    const servicesArray = e.target.value.split(',').map(service => service.trim()).filter(s => s);
    setSettings(prev => ({
      ...prev,
      services: servicesArray
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only image files (jpeg, jpg, png, webp, gif) are allowed');
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      setSettings(prev => ({
        ...prev,
        image: file,
        currentImageUrl: previewUrl
      }));
    }
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...settings.availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [field]: value
    };
    setSettings(prev => ({
      ...prev,
      availability: updatedAvailability
    }));
  };

  const addAvailabilitySlot = () => {
    setSettings(prev => ({
      ...prev,
      availability: [
        ...prev.availability,
        { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ]
    }));
  };

  const removeAvailabilitySlot = (index) => {
    const updatedAvailability = settings.availability.filter((_, i) => i !== index);
    setSettings(prev => ({
      ...prev,
      availability: updatedAvailability
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!settings.name || !settings.speciality || !settings.fee) {
      alert('Name, Speciality, and Fee are required fields');
      return;
    }

    if (!id) {
      alert('Doctor ID not found. Please login again.');
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      formData.append('name', settings.name);
      formData.append('speciality', settings.speciality);
      formData.append('qualification', settings.qualification);
      formData.append('experience', settings.experience);
      formData.append('fee', settings.fee);
      formData.append('services', JSON.stringify(settings.services));
      formData.append('availability', JSON.stringify(settings.availability));
      
      // Only append image if it's a new file (not a string URL)
      if (settings.image && typeof settings.image !== 'string') {
        formData.append('image', settings.image);
      }

      console.log('Updating doctor with ID:', id);
      console.log('Form data being sent:', {
        name: settings.name,
        speciality: settings.speciality,
        qualification: settings.qualification,
        experience: settings.experience,
        fee: settings.fee,
        services: settings.services,
        availability: settings.availability
      });

      const response = await axios.put(
        `${API_URL}/api/doctors/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log('Settings updated:', response.data);
      alert('Profile updated successfully!');
      
      // Update local state with response data
      const updatedDoctor = response.data;
      const updatedAvailability = updatedDoctor.availability || [];
      
      setSettings(prev => ({
        ...prev,
        name: updatedDoctor.name,
        speciality: updatedDoctor.speciality,
        qualification: updatedDoctor.qualification,
        experience: updatedDoctor.experience,
        fee: updatedDoctor.fee,
        services: updatedDoctor.services,
        availability: updatedAvailability,
        image: null,
        currentImageUrl: updatedDoctor.image ? `${API_URL}${updatedDoctor.image}` : prev.currentImageUrl
      }));
      
      // Call the callback to refresh doctor data in parent component
      if (onProfileUpdate) {
        onProfileUpdate();
      }
      
    } catch (error) {
      console.error('Error updating doctor:', error);
      
      if (error.response) {
        // Server responded with error status
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        if (error.response.status === 404) {
          alert(`Doctor not found (ID: ${id}). Please check if the doctor exists.`);
        } else if (error.response.status === 400) {
          alert(`Validation error: ${error.response.data.message || 'Please check your input'}`);
        } else if (error.response.status === 401) {
          alert('Unauthorized. Please login again.');
          // Optionally redirect to login
          // navigate('/login');
        } else {
          alert(`Error: ${error.response.data.message || 'Failed to update profile'}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        alert('Network error. Please check if the server is running.');
      } else {
        // Something else happened
        console.error('Error setting up request:', error.message);
        alert('An unexpected error occurred: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c6774]"></div>
      </div>
    );
  }

  // Days of the week for availability
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-[#174047]">Profile Settings</h2>
      
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-[#174047] mb-4 md:mb-6">Edit Profile</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="speciality"
                value={settings.speciality}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
              />
            </div>
          </div>
          
          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
              <input 
                type="text"
                name="qualification"
                value={settings.qualification}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                placeholder="e.g., MBBS, MD, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <input 
                type="text"
                name="experience"
                value={settings.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                placeholder="e.g., 10 years of experience"
              />
            </div>
          </div>
          
          {/* Fee */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">PKR</span>
                </div>
                <input 
                  type="text"
                  name="fee"
                  value={settings.fee}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
            <textarea 
              name="services"
              value={settings.services.join(', ')}
              onChange={handleServicesChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
              placeholder="Enter services separated by commas (e.g., General Checkup, Cardiology Consultation, etc.)"
              rows="2"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
          </div>
          
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {(imagePreview || settings.currentImageUrl) && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#2c6774]">
                  <img 
                    src={imagePreview || settings.currentImageUrl}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/default-doctor.jpg';
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm md:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Allowed formats: JPEG, JPG, PNG, WEBP, GIF</p>
              </div>
            </div>
          </div>
          
          {/* Availability Section - Only show available slots */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-bold text-[#174047]">Available Time Slots</h4>
              <button
                type="button"
                onClick={addAvailabilitySlot}
                className="px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1e4e56] text-sm font-medium transition-colors"
              >
                + Add Time Slot
              </button>
            </div>
            
            <div className="space-y-4">
              {settings.availability.map((slot, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg bg-gray-50">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                    <select
                      value={slot.day}
                      onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                    >
                      {weekDays.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input 
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input 
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774] text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox"
                        id={`available-${index}`}
                        checked={slot.isAvailable}
                        onChange={(e) => handleAvailabilityChange(index, 'isAvailable', e.target.checked)}
                        className="mr-2 w-4 h-4 text-[#2c6774] focus:ring-[#2c6774]"
                      />
                      <label htmlFor={`available-${index}`} className="text-sm text-gray-700">Available</label>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAvailabilitySlot(index)}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              
              {settings.availability.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500 mb-2">No availability slots added yet</p>
                  <p className="text-sm text-gray-400">Click "Add Time Slot" to set your available working hours</p>
                </div>
              )}
            </div>
            
            {/* Display current schedule summary */}
            {settings.availability.filter(slot => slot.isAvailable).length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Available Schedule Summary:</p>
                <div className="mt-2 space-y-1">
                  {settings.availability.filter(slot => slot.isAvailable).map((slot, idx) => (
                    <p key={idx} className="text-xs text-blue-700">
                      {slot.day}: {slot.startTime} - {slot.endTime}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t">
            <button 
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white rounded-lg hover:from-[#1e4e56] hover:to-[#174047] text-sm md:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;