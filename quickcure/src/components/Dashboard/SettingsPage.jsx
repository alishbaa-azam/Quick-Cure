
//----------Updated
// import React, { useState, useEffect } from 'react';
// import { 
//   Settings, MapPin, Clock, Truck, 
//   Phone, Mail, Building, CheckCircle,
//   Upload, Image as ImageIcon, Save,
//   Shield, Globe, CreditCard, AlertCircle
// } from 'lucide-react';
// import { pharmacyAPI } from '../../../../../Unused files/F/Services/api';
// import { message } from 'antd';

// const SettingsPage = () => {
//   const [pharmacySettings, setPharmacySettings] = useState({
//     // Pharmacy Info
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
    
//     // Operation Hours
//     openingTime: '09:00',
//     closingTime: '23:00',
//     workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    
//     // Services
//     emergencyDelivery: true,
//     deliveryRadius: 5,
    
//     // Images
//     logo: null,
//     banner: null,
    
//     // Other settings
//     currency: 'PKR',
//     timezone: 'Asia/Karachi',
//     taxRate: 17,
//   });

//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [logoPreview, setLogoPreview] = useState('');
//   const [bannerPreview, setBannerPreview] = useState('');

//   // Load pharmacy settings
//   useEffect(() => {
//     fetchPharmacySettings();
//   }, []);

//   const fetchPharmacySettings = async () => {
//     try {
//       const response = await pharmacyAPI.getProfile();
//       if (response.data) {
//         setPharmacySettings(response.data);
//         if (response.data.logo) {
//           setLogoPreview(response.data.logo);
//         }
//         if (response.data.banner) {
//           setBannerPreview(response.data.banner);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching pharmacy settings:', error);
//       message.error('Failed to load pharmacy settings');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPharmacySettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleDayToggle = (day) => {
//     setPharmacySettings(prev => ({
//       ...prev,
//       workingDays: prev.workingDays.includes(day)
//         ? prev.workingDays.filter(d => d !== day)
//         : [...prev.workingDays, day]
//     }));
//   };

//   const handleImageUpload = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === 'logo') {
//         setLogoPreview(reader.result);
//         setPharmacySettings(prev => ({
//           ...prev,
//           logo: reader.result
//         }));
//       } else {
//         setBannerPreview(reader.result);
//         setPharmacySettings(prev => ({
//           ...prev,
//           banner: reader.result
//         }));
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       await pharmacyAPI.updateProfile(pharmacySettings);
//       setSaveSuccess(true);
//       message.success('Settings saved successfully');
      
//       setTimeout(() => {
//         setSaveSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error saving settings:', error);
//       message.error('Failed to save settings');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const timeOptions = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 30) {
//       const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
//       timeOptions.push(time);
//     }
//   }

//   const formatTimeDisplay = (time) => {
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const displayHour = hour % 12 || 12;
//     return `${displayHour}:${minutes} ${ampm}`;
//   };

//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pharmacy Settings</h1>
//           <p className="text-gray-600">Manage your pharmacy preferences and configurations</p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium disabled:opacity-50"
//         >
//           {isSaving ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               Saving...
//             </>
//           ) : (
//             <>
//               <Save size={18} />
//               Save All Changes
//             </>
//           )}
//         </button>
//       </div>

//       {saveSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex items-center gap-2">
//             <CheckCircle className="text-green-600" size={20} />
//             <span className="text-green-800 font-medium">Settings saved successfully!</span>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Pharmacy Information */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//               <Building className="text-[#2c6774]" size={20} />
//               <h2 className="text-lg font-semibold text-gray-900">Pharmacy Information</h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pharmacy Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={pharmacySettings.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="Enter pharmacy name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pharmacy Email *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="email"
//                     name="email"
//                     value={pharmacySettings.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="contact@pharmacy.com"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={pharmacySettings.phone}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="+92 300 1234567"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Radius *
//                 </label>
//                 <div className="relative">
//                   <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <select
//                     name="deliveryRadius"
//                     value={pharmacySettings.deliveryRadius}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                   >
//                     <option value="3">3 km</option>
//                     <option value="5">5 km</option>
//                     <option value="10">10 km</option>
//                     <option value="15">15 km</option>
//                     <option value="20">20 km</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pharmacy Address *
//                 </label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <textarea
//                     name="address"
//                     value={pharmacySettings.address}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="123 Main Street, City, Country"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Operation Hours */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//               <Clock className="text-[#2c6774]" size={20} />
//               <h2 className="text-lg font-semibold text-gray-900">Operation Hours</h2>
//             </div>
            
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Opening Time *
//                   </label>
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     <select
//                       name="openingTime"
//                       value={pharmacySettings.openingTime}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                     >
//                       {timeOptions.map(time => (
//                         <option key={time} value={time}>{formatTimeDisplay(time)}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Closing Time *
//                   </label>
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                     <select
//                       name="closingTime"
//                       value={pharmacySettings.closingTime}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                     >
//                       {timeOptions.map(time => (
//                         <option key={time} value={time}>{formatTimeDisplay(time)}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Working Days *
//                 </label>
//                 <div className="flex flex-wrap gap-3">
//                   {days.map((day) => (
//                     <button
//                       key={day}
//                       type="button"
//                       onClick={() => handleDayToggle(day)}
//                       className={`px-4 py-2.5 rounded-lg border transition-all ${
//                         pharmacySettings.workingDays.includes(day)
//                           ? 'bg-[#2c6774] text-white border-[#2c6774]'
//                           : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {day}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                 <div className="flex items-start gap-3">
//                   <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
//                   <div>
//                     <p className="text-sm text-blue-800 font-medium">
//                       Current Operation Hours: {formatTimeDisplay(pharmacySettings.openingTime)} - {formatTimeDisplay(pharmacySettings.closingTime)}
//                     </p>
//                     <p className="text-xs text-blue-600 mt-1">
//                       {pharmacySettings.workingDays.join(', ')}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Services */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div>
//                     <p className="font-medium">Emergency Delivery (24/7)</p>
//                     <p className="text-sm text-gray-500">Available round the clock</p>
//                   </div>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="emergencyDelivery"
//                     checked={pharmacySettings.emergencyDelivery}
//                     onChange={handleInputChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2c6774]"></div>
//                 </label>
//               </div>
              
//               <div className="p-3 border border-gray-300 rounded-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                   <p className="font-medium">Standard Delivery</p>
//                 </div>
//                 <p className="text-sm text-gray-500">
//                   Available within {pharmacySettings.deliveryRadius} km radius during operation hours
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Pharmacy Images */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Images</h2>
            
//             {/* Logo Upload */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pharmacy Logo
//               </label>
//               <div className="flex items-center gap-4">
//                 <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
//                   {logoPreview ? (
//                     <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <ImageIcon className="text-gray-400" size={24} />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <label className="cursor-pointer">
//                     <div className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors text-sm font-medium">
//                       <Upload size={16} />
//                       <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, 'logo')}
//                       className="hidden"
//                     />
//                   </label>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Recommended: 200x200px, PNG or JPG
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Banner Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pharmacy Banner
//               </label>
//               <div className="mb-3">
//                 <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
//                   {bannerPreview ? (
//                     <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <ImageIcon className="text-gray-400" size={32} />
//                   )}
//                 </div>
//               </div>
//               <label className="cursor-pointer">
//                 <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
//                   <Upload size={16} />
//                   <span>{bannerPreview ? 'Change Banner' : 'Upload Banner'}</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e, 'banner')}
//                   className="hidden"
//                 />
//               </label>
//               <p className="text-xs text-gray-500 mt-2">
//                 Recommended: 1200x300px, PNG or JPG
//               </p>
//             </div>
//           </div>

//           {/* Other Settings */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Settings</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Currency
//                 </label>
//                 <select
//                   name="currency"
//                   value={pharmacySettings.currency}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 >
//                   <option value="PKR">Pakistani Rupee (PKR)</option>
//                   <option value="USD">US Dollar (USD)</option>
//                   <option value="EUR">Euro (EUR)</option>
//                   <option value="GBP">British Pound (GBP)</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tax Rate (%)
//                 </label>
//                 <input
//                   type="number"
//                   name="taxRate"
//                   value={pharmacySettings.taxRate}
//                   onChange={handleInputChange}
//                   min="0"
//                   max="100"
//                   step="0.1"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Info Box */}
//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
//               <div>
//                 <p className="text-sm font-medium text-amber-800">Settings Information</p>
//                 <p className="text-xs text-amber-600 mt-1">
//                   Changes will be applied immediately. Make sure to test all features after saving.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;



































// api attached
// import React, { useState, useEffect } from 'react';
// import { 
//   Settings, MapPin, Clock, Truck, 
//   Phone, Mail, Building, CheckCircle,
//   Upload, Image as ImageIcon, Save,
//   Shield, Globe, CreditCard, AlertCircle,
//   X, Loader
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';

// const SettingsPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
  
//   const [pharmacySettings, setPharmacySettings] = useState({
//     // Pharmacy Info
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     description: '',
    
//     // Operation Hours
//     openingTime: '09:00',
//     closingTime: '23:00',
//     workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//     is24Hours: false,
    
//     // Services
//     emergencyDelivery: true,
//     deliveryRadius: 5,
//     minimumOrderAmount: 0,
//     deliveryFee: 0,
//     freeDeliveryThreshold: 0,
    
//     // Images
//     logo: null,
//     banner: null,
    
//     // Other settings
//     currency: 'PKR',
//     timezone: 'Asia/Karachi',
//     taxRate: 17,
//     isActive: true,
    
//     // Contact Info
//     whatsapp: '',
//     facebook: '',
//     instagram: '',
//   });

//   const [logoPreview, setLogoPreview] = useState('');
//   const [bannerPreview, setBannerPreview] = useState('');
//   const [logoFile, setLogoFile] = useState(null);
//   const [bannerFile, setBannerFile] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   // Get pharmacy ID from localStorage
//   useEffect(() => {
//     const storedPharmacyId = localStorage.getItem('pharmacyId');
//     if (storedPharmacyId) {
//       setPharmacyId(storedPharmacyId);
//       fetchPharmacySettings(storedPharmacyId);
//     } else {
//       message.error('Pharmacy ID not found. Please login again.');
//       setLoading(false);
//     }
//   }, []);

//   // Fetch pharmacy settings from API
//   const fetchPharmacySettings = async (id) => {
//     try {
//       setLoading(true);
//       const response = await pharmacyAPI.getPharmacyProfile(id);
      
//       if (response.data?.success) {
//         const data = response.data.data;
        
//         // Map API response to settings state
//         setPharmacySettings({
//           name: data.name || '',
//           email: data.email || '',
//           phone: data.phone || '',
//           address: data.address || '',
//           description: data.description || '',
//           openingTime: data.openingTime || '09:00',
//           closingTime: data.closingTime || '23:00',
//           workingDays: data.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//           is24Hours: data.is24Hours || false,
//           emergencyDelivery: data.emergencyDelivery !== undefined ? data.emergencyDelivery : true,
//           deliveryRadius: data.deliveryRadius || 5,
//           minimumOrderAmount: data.minimumOrderAmount || 0,
//           deliveryFee: data.deliveryFee || 0,
//           freeDeliveryThreshold: data.freeDeliveryThreshold || 0,
//           logo: data.logo || null,
//           banner: data.banner || null,
//           currency: data.currency || 'PKR',
//           timezone: data.timezone || 'Asia/Karachi',
//           taxRate: data.taxRate || 17,
//           isActive: data.isActive !== undefined ? data.isActive : true,
//           whatsapp: data.whatsapp || '',
//           facebook: data.facebook || '',
//           instagram: data.instagram || '',
//         });
        
//         // Set image previews
//         if (data.logo) {
//           setLogoPreview(data.logo);
//         }
//         if (data.banner) {
//           setBannerPreview(data.banner);
//         }
//       } else {
//         message.error(response.data?.message || 'Failed to load pharmacy settings');
//       }
//     } catch (error) {
//       console.error('Error fetching pharmacy settings:', error);
      
//       if (error.code === 'ERR_NETWORK') {
//         message.error('Cannot connect to server. Please check your connection.');
//       } else if (error.response?.data?.message) {
//         message.error(error.response.data.message);
//       } else {
//         message.error('Failed to load pharmacy settings');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPharmacySettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleDayToggle = (day) => {
//     setPharmacySettings(prev => ({
//       ...prev,
//       workingDays: prev.workingDays.includes(day)
//         ? prev.workingDays.filter(d => d !== day)
//         : [...prev.workingDays, day]
//     }));
//   };

//   const handleImageUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       message.error('Image size should be less than 5MB');
//       return;
//     }

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       message.error('Only JPEG, PNG, WEBP images are allowed');
//       return;
//     }

//     setUploadingImage(true);
    
//     try {
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (type === 'logo') {
//           setLogoPreview(reader.result);
//         } else {
//           setBannerPreview(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
      
//       // Upload to server
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('type', type);
      
//       const response = await pharmacyAPI.uploadImage(pharmacyId, formData);
      
//       if (response.data?.success) {
//         const imageUrl = response.data.data.url;
//         setPharmacySettings(prev => ({
//           ...prev,
//           [type]: imageUrl
//         }));
//         message.success(`${type === 'logo' ? 'Logo' : 'Banner'} uploaded successfully`);
//       } else {
//         message.error('Failed to upload image');
//         // Reset preview on error
//         if (type === 'logo') {
//           setLogoPreview(pharmacySettings.logo);
//         } else {
//           setBannerPreview(pharmacySettings.banner);
//         }
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       message.error('Failed to upload image');
//       // Reset preview on error
//       if (type === 'logo') {
//         setLogoPreview(pharmacySettings.logo);
//       } else {
//         setBannerPreview(pharmacySettings.banner);
//       }
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSave = async () => {
//     // Validation
//     if (!pharmacySettings.name.trim()) {
//       message.error('Pharmacy name is required');
//       return;
//     }
    
//     if (!pharmacySettings.email.trim()) {
//       message.error('Email is required');
//       return;
//     }
    
//     if (!pharmacySettings.phone.trim()) {
//       message.error('Phone number is required');
//       return;
//     }
    
//     if (!pharmacySettings.address.trim()) {
//       message.error('Address is required');
//       return;
//     }
    
//     setIsSaving(true);
    
//     try {
//       // Prepare data for API
//       const updateData = {
//         name: pharmacySettings.name,
//         email: pharmacySettings.email,
//         phone: pharmacySettings.phone,
//         address: pharmacySettings.address,
//         description: pharmacySettings.description,
//         openingTime: pharmacySettings.openingTime,
//         closingTime: pharmacySettings.closingTime,
//         workingDays: pharmacySettings.workingDays,
//         is24Hours: pharmacySettings.is24Hours,
//         emergencyDelivery: pharmacySettings.emergencyDelivery,
//         deliveryRadius: Number(pharmacySettings.deliveryRadius),
//         minimumOrderAmount: Number(pharmacySettings.minimumOrderAmount),
//         deliveryFee: Number(pharmacySettings.deliveryFee),
//         freeDeliveryThreshold: Number(pharmacySettings.freeDeliveryThreshold),
//         logo: pharmacySettings.logo,
//         banner: pharmacySettings.banner,
//         currency: pharmacySettings.currency,
//         timezone: pharmacySettings.timezone,
//         taxRate: Number(pharmacySettings.taxRate),
//         isActive: pharmacySettings.isActive,
//         whatsapp: pharmacySettings.whatsapp,
//         facebook: pharmacySettings.facebook,
//         instagram: pharmacySettings.instagram,
//       };
      
//       const response = await pharmacyAPI.updatePharmacyProfile(pharmacyId, updateData);
      
//       if (response.data?.success) {
//         setSaveSuccess(true);
//         message.success('Settings saved successfully');
        
//         setTimeout(() => {
//           setSaveSuccess(false);
//         }, 3000);
//       } else {
//         message.error(response.data?.message || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Error saving settings:', error);
      
//       if (error.code === 'ERR_NETWORK') {
//         message.error('Cannot connect to server. Please check your connection.');
//       } else if (error.response?.data?.message) {
//         message.error(error.response.data.message);
//       } else {
//         message.error('Failed to save settings');
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const timeOptions = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 30) {
//       const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
//       timeOptions.push(time);
//     }
//   }

//   const formatTimeDisplay = (time) => {
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const displayHour = hour % 12 || 12;
//     return `${displayHour}:${minutes} ${ampm}`;
//   };

//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading settings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pharmacy Settings</h1>
//           <p className="text-gray-600">Manage your pharmacy preferences and configurations</p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSaving ? (
//             <>
//               <Loader className="w-5 h-5 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             <>
//               <Save size={18} />
//               Save All Changes
//             </>
//           )}
//         </button>
//       </div>

//       {saveSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
//           <div className="flex items-center gap-2">
//             <CheckCircle className="text-green-600" size={20} />
//             <span className="text-green-800 font-medium">Settings saved successfully!</span>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Pharmacy Information */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//               <Building className="text-[#2c6774]" size={20} />
//               <h2 className="text-lg font-semibold text-gray-900">Pharmacy Information</h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pharmacy Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={pharmacySettings.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="Enter pharmacy name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="email"
//                     name="email"
//                     value={pharmacySettings.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="contact@pharmacy.com"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={pharmacySettings.phone}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="+92 300 1234567"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Radius (km) *
//                 </label>
//                 <div className="relative">
//                   <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="number"
//                     name="deliveryRadius"
//                     value={pharmacySettings.deliveryRadius}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="50"
//                     step="1"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Minimum Order Amount
//                 </label>
//                 <div className="relative">
//                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="number"
//                     name="minimumOrderAmount"
//                     value={pharmacySettings.minimumOrderAmount}
//                     onChange={handleInputChange}
//                     min="0"
//                     step="50"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   />
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Address *
//                 </label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <textarea
//                     name="address"
//                     value={pharmacySettings.address}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="123 Main Street, City, Country"
//                   />
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={pharmacySettings.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="Tell customers about your pharmacy..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Operation Hours */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//               <Clock className="text-[#2c6774]" size={20} />
//               <h2 className="text-lg font-semibold text-gray-900">Operation Hours</h2>
//             </div>
            
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                 <input
//                   type="checkbox"
//                   name="is24Hours"
//                   checked={pharmacySettings.is24Hours}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-[#2c6774] rounded focus:ring-[#2c6774]"
//                 />
//                 <label className="text-sm font-medium text-gray-700">
//                   24/7 Operation (Open all day)
//                 </label>
//               </div>
              
//               {!pharmacySettings.is24Hours && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Opening Time *
//                     </label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                       <select
//                         name="openingTime"
//                         value={pharmacySettings.openingTime}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                       >
//                         {timeOptions.map(time => (
//                           <option key={time} value={time}>{formatTimeDisplay(time)}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Closing Time *
//                     </label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                       <select
//                         name="closingTime"
//                         value={pharmacySettings.closingTime}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                       >
//                         {timeOptions.map(time => (
//                           <option key={time} value={time}>{formatTimeDisplay(time)}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Working Days *
//                 </label>
//                 <div className="flex flex-wrap gap-3">
//                   {days.map((day) => (
//                     <button
//                       key={day}
//                       type="button"
//                       onClick={() => handleDayToggle(day)}
//                       className={`px-4 py-2.5 rounded-lg border transition-all ${
//                         pharmacySettings.workingDays.includes(day)
//                           ? 'bg-[#2c6774] text-white border-[#2c6774]'
//                           : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {day.slice(0, 3)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                 <div className="flex items-start gap-3">
//                   <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
//                   <div>
//                     <p className="text-sm text-blue-800 font-medium">
//                       Current Operation Hours: {pharmacySettings.is24Hours ? '24/7 Open' : `${formatTimeDisplay(pharmacySettings.openingTime)} - ${formatTimeDisplay(pharmacySettings.closingTime)}`}
//                     </p>
//                     <p className="text-xs text-blue-600 mt-1">
//                       {pharmacySettings.workingDays.join(', ')}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Services */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Services & Pricing</h2>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div>
//                     <p className="font-medium">Emergency Delivery (24/7)</p>
//                     <p className="text-sm text-gray-500">Available round the clock</p>
//                   </div>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="emergencyDelivery"
//                     checked={pharmacySettings.emergencyDelivery}
//                     onChange={handleInputChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2c6774]"></div>
//                 </label>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Fee (Rs)
//                 </label>
//                 <input
//                   type="number"
//                   name="deliveryFee"
//                   value={pharmacySettings.deliveryFee}
//                   onChange={handleInputChange}
//                   min="0"
//                   step="50"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Free Delivery on Orders Above (Rs)
//                 </label>
//                 <input
//                   type="number"
//                   name="freeDeliveryThreshold"
//                   value={pharmacySettings.freeDeliveryThreshold}
//                   onChange={handleInputChange}
//                   min="0"
//                   step="100"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pharmacy Images */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Images</h2>
            
//             {/* Logo Upload */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pharmacy Logo
//               </label>
//               <div className="flex items-center gap-4">
//                 <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
//                   {logoPreview ? (
//                     <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <ImageIcon className="text-gray-400" size={24} />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <label className="cursor-pointer">
//                     <div className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors text-sm font-medium">
//                       {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
//                       <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, 'logo')}
//                       className="hidden"
//                       disabled={uploadingImage}
//                     />
//                   </label>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Recommended: 200x200px, PNG or JPG (Max 5MB)
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Banner Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pharmacy Banner
//               </label>
//               <div className="mb-3">
//                 <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
//                   {bannerPreview ? (
//                     <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <ImageIcon className="text-gray-400" size={32} />
//                   )}
//                 </div>
//               </div>
//               <label className="cursor-pointer">
//                 <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
//                   {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
//                   <span>{bannerPreview ? 'Change Banner' : 'Upload Banner'}</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e, 'banner')}
//                   className="hidden"
//                   disabled={uploadingImage}
//                 />
//               </label>
//               <p className="text-xs text-gray-500 mt-2">
//                 Recommended: 1200x300px, PNG or JPG (Max 5MB)
//               </p>
//             </div>
//           </div>

//           {/* Other Settings */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Settings</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Currency
//                 </label>
//                 <select
//                   name="currency"
//                   value={pharmacySettings.currency}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 >
//                   <option value="PKR">Pakistani Rupee (PKR)</option>
//                   <option value="USD">US Dollar (USD)</option>
//                   <option value="EUR">Euro (EUR)</option>
//                   <option value="GBP">British Pound (GBP)</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tax Rate (%)
//                 </label>
//                 <input
//                   type="number"
//                   name="taxRate"
//                   value={pharmacySettings.taxRate}
//                   onChange={handleInputChange}
//                   min="0"
//                   max="100"
//                   step="0.1"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
              
//               <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
//                 <div>
//                   <p className="font-medium">Active Pharmacy</p>
//                   <p className="text-sm text-gray-500">Accept new orders</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     checked={pharmacySettings.isActive}
//                     onChange={handleInputChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   WhatsApp
//                 </label>
//                 <input
//                   type="text"
//                   name="whatsapp"
//                   value={pharmacySettings.whatsapp}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="https://wa.me/923001234567"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Facebook
//                 </label>
//                 <input
//                   type="text"
//                   name="facebook"
//                   value={pharmacySettings.facebook}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="https://facebook.com/pharmacy"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Instagram
//                 </label>
//                 <input
//                   type="text"
//                   name="instagram"
//                   value={pharmacySettings.instagram}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="https://instagram.com/pharmacy"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Info Box */}
//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
//               <div>
//                 <p className="text-sm font-medium text-amber-800">Settings Information</p>
//                 <p className="text-xs text-amber-600 mt-1">
//                   Changes will be applied immediately. Make sure to test all features after saving.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;































// trying upload image with new logic
// import React, { useState, useEffect } from 'react';
// import { 
//   Settings, MapPin, Clock, Truck, 
//   Phone, Mail, Building, CheckCircle,
//   Upload, Image as ImageIcon, Save,
//   Shield, Globe, CreditCard, AlertCircle,
//   X, Loader
// } from 'lucide-react';
// import { pharmacyAPI } from '../../services/pharmacyAPI';
// import { message } from 'antd';

// const SettingsPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [pharmacyId, setPharmacyId] = useState(null);
  
//   const [pharmacySettings, setPharmacySettings] = useState({
//     // Pharmacy Info
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     description: '',
    
//     // Operation Hours
//     openingTime: '09:00',
//     closingTime: '23:00',
//     workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//     is24Hours: false,
    
//     // Services
//     emergencyDelivery: true,
//     deliveryRadius: 5,
//     minimumOrderAmount: 0,
//     deliveryFee: 0,
//     freeDeliveryThreshold: 0,
    
//     // Images
//     logo: null,
//     banner: null,
    
//     // Other settings
//     currency: 'PKR',
//     timezone: 'Asia/Karachi',
//     taxRate: 17,
//     isActive: true,
    
//     // Contact Info
//     whatsapp: '',
//     facebook: '',
//     instagram: '',
//   });

//   const [logoPreview, setLogoPreview] = useState('');
//   const [bannerPreview, setBannerPreview] = useState('');
//   const [uploadingImage, setUploadingImage] = useState(false);

//   // Get pharmacy ID from localStorage
//   useEffect(() => {
//     const storedPharmacyId = localStorage.getItem('pharmacyId');
//     if (storedPharmacyId) {
//       setPharmacyId(storedPharmacyId);
//       fetchPharmacySettings(storedPharmacyId);
//     } else {
//       message.error('Pharmacy ID not found. Please login again.');
//       setLoading(false);
//     }
//   }, []);

//   // Fetch pharmacy settings from API
//   const fetchPharmacySettings = async (id) => {
//     try {
//       setLoading(true);
//       const response = await pharmacyAPI.getPharmacyProfile(id);
      
//       if (response.data?.success) {
//         const data = response.data.data;
        
//         // Map API response to settings state
//         setPharmacySettings({
//           name: data.name || '',
//           email: data.email || '',
//           phone: data.phone || '',
//           address: data.address || '',
//           description: data.description || '',
//           openingTime: data.openingTime || '09:00',
//           closingTime: data.closingTime || '23:00',
//           workingDays: data.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//           is24Hours: data.is24Hours || false,
//           emergencyDelivery: data.emergencyDelivery !== undefined ? data.emergencyDelivery : true,
//           deliveryRadius: data.deliveryRadius || 5,
//           minimumOrderAmount: data.minimumOrderAmount || 0,
//           deliveryFee: data.deliveryFee || 0,
//           freeDeliveryThreshold: data.freeDeliveryThreshold || 0,
//           logo: data.logo || null,
//           banner: data.banner || null,
//           currency: data.currency || 'PKR',
//           timezone: data.timezone || 'Asia/Karachi',
//           taxRate: data.taxRate || 17,
//           isActive: data.isActive !== undefined ? data.isActive : true,
//           whatsapp: data.whatsapp || '',
//           facebook: data.facebook || '',
//           instagram: data.instagram || '',
//         });
        
//         // Set image previews
//         if (data.logo) {
//           setLogoPreview(data.logo);
//         }
//         if (data.banner) {
//           setBannerPreview(data.banner);
//         }
//       } else {
//         message.error(response.data?.message || 'Failed to load pharmacy settings');
//       }
//     } catch (error) {
//       console.error('Error fetching pharmacy settings:', error);
      
//       if (error.code === 'ERR_NETWORK') {
//         message.error('Cannot connect to server. Please check your connection.');
//       } else if (error.response?.data?.message) {
//         message.error(error.response.data.message);
//       } else {
//         message.error('Failed to load pharmacy settings');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPharmacySettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleDayToggle = (day) => {
//     setPharmacySettings(prev => ({
//       ...prev,
//       workingDays: prev.workingDays.includes(day)
//         ? prev.workingDays.filter(d => d !== day)
//         : [...prev.workingDays, day]
//     }));
//   };

//   // Updated handleImageUpload - Using base64 like AddMedicinePage
//   const handleImageUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       message.error('Image size should be less than 5MB');
//       return;
//     }

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       message.error('Only JPEG, PNG, WEBP images are allowed');
//       return;
//     }

//     setUploadingImage(true);
    
//     try {
//       // Create preview immediately (same as AddMedicinePage)
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (type === 'logo') {
//           setLogoPreview(reader.result);
//         } else {
//           setBannerPreview(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
      
//       // Convert to base64 (same as AddMedicinePage)
//       const base64Image = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.readAsDataURL(file);
//       });
      
//       // Update state with base64 image (no server upload needed)
//       setPharmacySettings(prev => ({
//         ...prev,
//         [type]: base64Image
//       }));
      
//       message.success(`${type === 'logo' ? 'Logo' : 'Banner'} selected. Click Save to update.`);
      
//     } catch (error) {
//       console.error('Error processing image:', error);
//       message.error('Failed to process image');
      
//       // Reset preview on error
//       if (type === 'logo') {
//         setLogoPreview(pharmacySettings.logo);
//       } else {
//         setBannerPreview(pharmacySettings.banner);
//       }
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSave = async () => {
//     // Validation
//     if (!pharmacySettings.name.trim()) {
//       message.error('Pharmacy name is required');
//       return;
//     }
    
//     if (!pharmacySettings.email.trim()) {
//       message.error('Email is required');
//       return;
//     }
    
//     if (!pharmacySettings.phone.trim()) {
//       message.error('Phone number is required');
//       return;
//     }
    
//     if (!pharmacySettings.address.trim()) {
//       message.error('Address is required');
//       return;
//     }
    
//     setIsSaving(true);
    
//     try {
//       // Prepare data for API
//       const updateData = {
//         name: pharmacySettings.name,
//         email: pharmacySettings.email,
//         phone: pharmacySettings.phone,
//         address: pharmacySettings.address,
//         description: pharmacySettings.description,
//         openingTime: pharmacySettings.openingTime,
//         closingTime: pharmacySettings.closingTime,
//         workingDays: pharmacySettings.workingDays,
//         is24Hours: pharmacySettings.is24Hours,
//         emergencyDelivery: pharmacySettings.emergencyDelivery,
//         deliveryRadius: Number(pharmacySettings.deliveryRadius),
//         minimumOrderAmount: Number(pharmacySettings.minimumOrderAmount),
//         deliveryFee: Number(pharmacySettings.deliveryFee),
//         freeDeliveryThreshold: Number(pharmacySettings.freeDeliveryThreshold),
//         logo: pharmacySettings.logo,
//         banner: pharmacySettings.banner,
//         currency: pharmacySettings.currency,
//         timezone: pharmacySettings.timezone,
//         taxRate: Number(pharmacySettings.taxRate),
//         isActive: pharmacySettings.isActive,
//         whatsapp: pharmacySettings.whatsapp,
//         facebook: pharmacySettings.facebook,
//         instagram: pharmacySettings.instagram,
//       };
      
//       const response = await pharmacyAPI.updatePharmacyProfile(pharmacyId, updateData);
      
//       if (response.data?.success) {
//         setSaveSuccess(true);
//         message.success('Settings saved successfully');
        
//         setTimeout(() => {
//           setSaveSuccess(false);
//         }, 3000);
//       } else {
//         message.error(response.data?.message || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Error saving settings:', error);
      
//       if (error.code === 'ERR_NETWORK') {
//         message.error('Cannot connect to server. Please check your connection.');
//       } else if (error.response?.data?.message) {
//         message.error(error.response.data.message);
//       } else {
//         message.error('Failed to save settings');
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const timeOptions = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 30) {
//       const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
//       timeOptions.push(time);
//     }
//   }

//   const formatTimeDisplay = (time) => {
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const displayHour = hour % 12 || 12;
//     return `${displayHour}:${minutes} ${ampm}`;
//   };

//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading settings...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pharmacy Settings</h1>
//           <p className="text-gray-600">Manage your pharmacy preferences and configurations</p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSaving ? (
//             <>
//               <Loader className="w-5 h-5 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             <>
//               <Save size={18} />
//               Save All Changes
//             </>
//           )}
//         </button>
//       </div>

//       {saveSuccess && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
//           <div className="flex items-center gap-2">
//             <CheckCircle className="text-green-600" size={20} />
//             <span className="text-green-800 font-medium">Settings saved successfully!</span>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Pharmacy Information */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//               <Building className="text-[#2c6774]" size={20} />
//               <h2 className="text-lg font-semibold text-gray-900">Pharmacy Information</h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pharmacy Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={pharmacySettings.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="Enter pharmacy name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="email"
//                     name="email"
//                     value={pharmacySettings.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="contact@pharmacy.com"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={pharmacySettings.phone}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="+92 300 1234567"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Radius (km) *
//                 </label>
//                 <div className="relative">
//                   <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="number"
//                     name="deliveryRadius"
//                     value={pharmacySettings.deliveryRadius}
//                     onChange={handleInputChange}
//                     min="0"
//                     max="50"
//                     step="1"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Minimum Order Amount
//                 </label>
//                 <div className="relative">
//                   <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="number"
//                     name="minimumOrderAmount"
//                     value={pharmacySettings.minimumOrderAmount}
//                     onChange={handleInputChange}
//                     min="0"
//                     step="50"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   />
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Address *
//                 </label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <textarea
//                     name="address"
//                     value={pharmacySettings.address}
//                     onChange={handleInputChange}
//                     rows="3"
//                     className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                     placeholder="123 Main Street, City, Country"
//                   />
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={pharmacySettings.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="Tell customers about your pharmacy..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Operation Hours */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-6">
//               <Clock className="text-[#2c6774]" size={20} />
//               <h2 className="text-lg font-semibold text-gray-900">Operation Hours</h2>
//             </div>
            
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                 <input
//                   type="checkbox"
//                   name="is24Hours"
//                   checked={pharmacySettings.is24Hours}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-[#2c6774] rounded focus:ring-[#2c6774]"
//                 />
//                 <label className="text-sm font-medium text-gray-700">
//                   24/7 Operation (Open all day)
//                 </label>
//               </div>
              
//               {!pharmacySettings.is24Hours && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Opening Time *
//                     </label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                       <select
//                         name="openingTime"
//                         value={pharmacySettings.openingTime}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                       >
//                         {timeOptions.map(time => (
//                           <option key={time} value={time}>{formatTimeDisplay(time)}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Closing Time *
//                     </label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                       <select
//                         name="closingTime"
//                         value={pharmacySettings.closingTime}
//                         onChange={handleInputChange}
//                         className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
//                       >
//                         {timeOptions.map(time => (
//                           <option key={time} value={time}>{formatTimeDisplay(time)}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Working Days *
//                 </label>
//                 <div className="flex flex-wrap gap-3">
//                   {days.map((day) => (
//                     <button
//                       key={day}
//                       type="button"
//                       onClick={() => handleDayToggle(day)}
//                       className={`px-4 py-2.5 rounded-lg border transition-all ${
//                         pharmacySettings.workingDays.includes(day)
//                           ? 'bg-[#2c6774] text-white border-[#2c6774]'
//                           : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {day.slice(0, 3)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                 <div className="flex items-start gap-3">
//                   <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
//                   <div>
//                     <p className="text-sm text-blue-800 font-medium">
//                       Current Operation Hours: {pharmacySettings.is24Hours ? '24/7 Open' : `${formatTimeDisplay(pharmacySettings.openingTime)} - ${formatTimeDisplay(pharmacySettings.closingTime)}`}
//                     </p>
//                     <p className="text-xs text-blue-600 mt-1">
//                       {pharmacySettings.workingDays.join(', ')}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Services */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Services & Pricing</h2>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div>
//                     <p className="font-medium">Emergency Delivery (24/7)</p>
//                     <p className="text-sm text-gray-500">Available round the clock</p>
//                   </div>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="emergencyDelivery"
//                     checked={pharmacySettings.emergencyDelivery}
//                     onChange={handleInputChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2c6774]"></div>
//                 </label>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Fee (Rs)
//                 </label>
//                 <input
//                   type="number"
//                   name="deliveryFee"
//                   value={pharmacySettings.deliveryFee}
//                   onChange={handleInputChange}
//                   min="0"
//                   step="50"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Free Delivery on Orders Above (Rs)
//                 </label>
//                 <input
//                   type="number"
//                   name="freeDeliveryThreshold"
//                   value={pharmacySettings.freeDeliveryThreshold}
//                   onChange={handleInputChange}
//                   min="0"
//                   step="100"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pharmacy Images */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Images</h2>
            
//             {/* Logo Upload */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pharmacy Logo
//               </label>
//               <div className="flex items-center gap-4">
//                 <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
//                   {logoPreview ? (
//                     <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <ImageIcon className="text-gray-400" size={24} />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <label className="cursor-pointer">
//                     <div className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors text-sm font-medium">
//                       {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
//                       <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, 'logo')}
//                       className="hidden"
//                       disabled={uploadingImage}
//                     />
//                   </label>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Recommended: 200x200px, PNG or JPG (Max 5MB)
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Banner Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pharmacy Banner
//               </label>
//               <div className="mb-3">
//                 <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
//                   {bannerPreview ? (
//                     <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <ImageIcon className="text-gray-400" size={32} />
//                   )}
//                 </div>
//               </div>
//               <label className="cursor-pointer">
//                 <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
//                   {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
//                   <span>{bannerPreview ? 'Change Banner' : 'Upload Banner'}</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e, 'banner')}
//                   className="hidden"
//                   disabled={uploadingImage}
//                 />
//               </label>
//               <p className="text-xs text-gray-500 mt-2">
//                 Recommended: 1200x300px, PNG or JPG (Max 5MB)
//               </p>
//             </div>
//           </div>

//           {/* Other Settings */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Settings</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Currency
//                 </label>
//                 <select
//                   name="currency"
//                   value={pharmacySettings.currency}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 >
//                   <option value="PKR">Pakistani Rupee (PKR)</option>
//                   <option value="USD">US Dollar (USD)</option>
//                   <option value="EUR">Euro (EUR)</option>
//                   <option value="GBP">British Pound (GBP)</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tax Rate (%)
//                 </label>
//                 <input
//                   type="number"
//                   name="taxRate"
//                   value={pharmacySettings.taxRate}
//                   onChange={handleInputChange}
//                   min="0"
//                   max="100"
//                   step="0.1"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                 />
//               </div>
              
//               <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
//                 <div>
//                   <p className="font-medium">Active Pharmacy</p>
//                   <p className="text-sm text-gray-500">Accept new orders</p>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     checked={pharmacySettings.isActive}
//                     onChange={handleInputChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   WhatsApp
//                 </label>
//                 <input
//                   type="text"
//                   name="whatsapp"
//                   value={pharmacySettings.whatsapp}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="https://wa.me/923001234567"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Facebook
//                 </label>
//                 <input
//                   type="text"
//                   name="facebook"
//                   value={pharmacySettings.facebook}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="https://facebook.com/pharmacy"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Instagram
//                 </label>
//                 <input
//                   type="text"
//                   name="instagram"
//                   value={pharmacySettings.instagram}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
//                   placeholder="https://instagram.com/pharmacy"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Info Box */}
//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
//               <div>
//                 <p className="text-sm font-medium text-amber-800">Settings Information</p>
//                 <p className="text-xs text-amber-600 mt-1">
//                   Changes will be applied immediately. Make sure to test all features after saving.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
































// Working perfectly with pic update
import React, { useState, useEffect } from 'react';
import { 
  Settings, MapPin, Clock, Truck, 
  Phone, Mail, Building, CheckCircle,
  Upload, Image as ImageIcon, Save,
  Shield, Globe, CreditCard, AlertCircle,
  X, Loader
} from 'lucide-react';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(null);
  
  const [pharmacySettings, setPharmacySettings] = useState({
    // Pharmacy Info
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    
    // Operation Hours
    openingTime: '09:00',
    closingTime: '23:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    is24Hours: false,
    
    // Services
    emergencyDelivery: true,
    deliveryRadius: 5,
    minimumOrderAmount: 0,
    deliveryFee: 0,
    freeDeliveryThreshold: 0,
    
    // Images
    logo: null,
    banner: null,
    image: null, // Added for main image
    
    // Other settings
    currency: 'PKR',
    timezone: 'Asia/Karachi',
    taxRate: 17,
    isActive: true,
    
    // Contact Info
    whatsapp: '',
    facebook: '',
    instagram: '',
  });

  const [logoPreview, setLogoPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Get pharmacy ID from localStorage
  useEffect(() => {
    const storedPharmacyId = localStorage.getItem('pharmacyId');
    if (storedPharmacyId) {
      setPharmacyId(storedPharmacyId);
      fetchPharmacySettings(storedPharmacyId);
    } else {
      message.error('Pharmacy ID not found. Please login again.');
      setLoading(false);
    }
  }, []);

  // Fetch pharmacy settings from API
  const fetchPharmacySettings = async (id) => {
    try {
      setLoading(true);
      const response = await pharmacyAPI.getPharmacyProfile(id);
      
      if (response.data?.success) {
        const data = response.data.data;
        
        // Map API response to settings state
        setPharmacySettings({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          description: data.description || '',
          openingTime: data.openingTime || '09:00',
          closingTime: data.closingTime || '23:00',
          workingDays: data.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          is24Hours: data.is24Hours || false,
          emergencyDelivery: data.emergencyDelivery !== undefined ? data.emergencyDelivery : true,
          deliveryRadius: data.deliveryRadius || 5,
          minimumOrderAmount: data.minimumOrderAmount || 0,
          deliveryFee: data.deliveryFee || 0,
          freeDeliveryThreshold: data.freeDeliveryThreshold || 0,
          logo: data.logo || null,
          banner: data.banner || data.bannerImage || null,
          image: data.image || data.logo || null,
          currency: data.currency || 'PKR',
          timezone: data.timezone || 'Asia/Karachi',
          taxRate: data.taxRate || 17,
          isActive: data.isActive !== undefined ? data.isActive : true,
          whatsapp: data.whatsapp || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
        });
        
        // Set image previews
        if (data.logo || data.image) {
          setLogoPreview(data.logo || data.image);
        }
        if (data.banner || data.bannerImage) {
          setBannerPreview(data.banner || data.bannerImage);
        }
      } else {
        message.error(response.data?.message || 'Failed to load pharmacy settings');
      }
    } catch (error) {
      console.error('Error fetching pharmacy settings:', error);
      
      if (error.code === 'ERR_NETWORK') {
        message.error('Cannot connect to server. Please check your connection.');
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to load pharmacy settings');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPharmacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDayToggle = (day) => {
    setPharmacySettings(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  // Updated image upload function with proper field mapping
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      message.error('Image size should be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('Only JPEG, PNG, WEBP images are allowed');
      return;
    }

    setUploadingImage(true);
    
    try {
      // Convert to base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      
      // Update preview and state with proper field mapping
      if (type === 'logo') {
        setLogoPreview(base64Image);
        setPharmacySettings(prev => ({
          ...prev,
          logo: base64Image,
          image: base64Image // Also update main image for customer cards
        }));
      } else {
        setBannerPreview(base64Image);
        setPharmacySettings(prev => ({
          ...prev,
          banner: base64Image,
          bannerImage: base64Image // Update both banner fields
        }));
      }
      
      message.success(`${type === 'logo' ? 'Logo' : 'Banner'} selected. Click Save to update.`);
      
    } catch (error) {
      console.error('Error processing image:', error);
      message.error('Failed to process image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!pharmacySettings.name.trim()) {
      message.error('Pharmacy name is required');
      return;
    }
    
    if (!pharmacySettings.email.trim()) {
      message.error('Email is required');
      return;
    }
    
    if (!pharmacySettings.phone.trim()) {
      message.error('Phone number is required');
      return;
    }
    
    if (!pharmacySettings.address.trim()) {
      message.error('Address is required');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Prepare data for API with proper image fields
      const updateData = {
        name: pharmacySettings.name,
        email: pharmacySettings.email,
        phone: pharmacySettings.phone,
        address: pharmacySettings.address,
        description: pharmacySettings.description,
        openingTime: pharmacySettings.openingTime,
        closingTime: pharmacySettings.closingTime,
        workingDays: pharmacySettings.workingDays,
        is24Hours: pharmacySettings.is24Hours,
        emergencyDelivery: pharmacySettings.emergencyDelivery,
        deliveryRadius: Number(pharmacySettings.deliveryRadius),
        minimumOrderAmount: Number(pharmacySettings.minimumOrderAmount),
        deliveryFee: Number(pharmacySettings.deliveryFee),
        freeDeliveryThreshold: Number(pharmacySettings.freeDeliveryThreshold),
        // Critical: Send all image fields for customer side visibility
        logo: pharmacySettings.logo,
        image: pharmacySettings.logo, // Main image for customer cards
        banner: pharmacySettings.banner,
        bannerImage: pharmacySettings.banner, // Banner image for detail page
        currency: pharmacySettings.currency,
        timezone: pharmacySettings.timezone,
        taxRate: Number(pharmacySettings.taxRate),
        isActive: pharmacySettings.isActive,
        whatsapp: pharmacySettings.whatsapp,
        facebook: pharmacySettings.facebook,
        instagram: pharmacySettings.instagram,
      };
      
      const response = await pharmacyAPI.updatePharmacyProfile(pharmacyId, updateData);
      
      if (response.data?.success) {
        setSaveSuccess(true);
        message.success('Settings saved successfully! Images will be updated on customer side.');
        
        // Refresh the data to get updated URLs
        fetchPharmacySettings(pharmacyId);
        
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else {
        message.error(response.data?.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      
      if (error.code === 'ERR_NETWORK') {
        message.error('Cannot connect to server. Please check your connection.');
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to save settings');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(time);
    }
  }

  const formatTimeDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pharmacy Settings</h1>
          <p className="text-gray-600">Manage your pharmacy preferences and configurations</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save All Changes
            </>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-green-800 font-medium">Settings saved successfully! Images will appear on customer side.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pharmacy Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Building className="text-[#2c6774]" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Pharmacy Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={pharmacySettings.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  placeholder="Enter pharmacy name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={pharmacySettings.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                    placeholder="contact@pharmacy.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={pharmacySettings.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Radius (km) *
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="deliveryRadius"
                    value={pharmacySettings.deliveryRadius}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    step="1"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Amount
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    name="minimumOrderAmount"
                    value={pharmacySettings.minimumOrderAmount}
                    onChange={handleInputChange}
                    min="0"
                    step="50"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea
                    name="address"
                    value={pharmacySettings.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                    placeholder="123 Main Street, City, Country"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={pharmacySettings.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  placeholder="Tell customers about your pharmacy..."
                />
              </div>
            </div>
          </div>

          {/* Operation Hours */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="text-[#2c6774]" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Operation Hours</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  name="is24Hours"
                  checked={pharmacySettings.is24Hours}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#2c6774] rounded focus:ring-[#2c6774]"
                />
                <label className="text-sm font-medium text-gray-700">
                  24/7 Operation (Open all day)
                </label>
              </div>
              
              {!pharmacySettings.is24Hours && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="openingTime"
                        value={pharmacySettings.openingTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
                      >
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{formatTimeDisplay(time)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="closingTime"
                        value={pharmacySettings.closingTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors appearance-none"
                      >
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{formatTimeDisplay(time)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Days *
                </label>
                <div className="flex flex-wrap gap-3">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-4 py-2.5 rounded-lg border transition-all ${
                        pharmacySettings.workingDays.includes(day)
                          ? 'bg-[#2c6774] text-white border-[#2c6774]'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Current Operation Hours: {pharmacySettings.is24Hours ? '24/7 Open' : `${formatTimeDisplay(pharmacySettings.openingTime)} - ${formatTimeDisplay(pharmacySettings.closingTime)}`}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {pharmacySettings.workingDays.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Services */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Services & Pricing</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div>
                    <p className="font-medium">Emergency Delivery (24/7)</p>
                    <p className="text-sm text-gray-500">Available round the clock</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emergencyDelivery"
                    checked={pharmacySettings.emergencyDelivery}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2c6774]"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Fee (Rs)
                </label>
                <input
                  type="number"
                  name="deliveryFee"
                  value={pharmacySettings.deliveryFee}
                  onChange={handleInputChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Delivery on Orders Above (Rs)
                </label>
                <input
                  type="number"
                  name="freeDeliveryThreshold"
                  value={pharmacySettings.freeDeliveryThreshold}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Pharmacy Images */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Images</h2>
            <p className="text-sm text-gray-500 mb-4">These images will appear on the customer side</p>
            
            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pharmacy Logo (Shows on Pharmacy Cards)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-400" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors text-sm font-medium">
                      {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
                      <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 200x200px, PNG or JPG (Max 5MB)
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    This logo will appear on pharmacy cards in the customer view
                  </p>
                </div>
              </div>
            </div>
            
            {/* Banner Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pharmacy Banner (Shows on Pharmacy Details Page)
              </label>
              <div className="mb-3">
                <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-400" size={32} />
                  )}
                </div>
              </div>
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
                  <span>{bannerPreview ? 'Change Banner' : 'Upload Banner'}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: 1200x300px, PNG or JPG (Max 5MB)
              </p>
              <p className="text-xs text-green-600 mt-1">
                This banner will appear on the pharmacy details page
              </p>
            </div>
          </div>

          {/* Other Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  name="currency"
                  value={pharmacySettings.currency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                >
                  <option value="PKR">Pakistani Rupee (PKR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  name="taxRate"
                  value={pharmacySettings.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                <div>
                  <p className="font-medium">Active Pharmacy</p>
                  <p className="text-sm text-gray-500">Accept new orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={pharmacySettings.isActive}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={pharmacySettings.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  placeholder="https://wa.me/923001234567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={pharmacySettings.facebook}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  placeholder="https://facebook.com/pharmacy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={pharmacySettings.instagram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                  placeholder="https://instagram.com/pharmacy"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-amber-800">Settings Information</p>
                <p className="text-xs text-amber-600 mt-1">
                  Changes will be applied immediately. The logo will appear on pharmacy cards and the banner on the pharmacy details page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;