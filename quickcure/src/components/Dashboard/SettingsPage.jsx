// settingsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Settings, MapPin, Truck, 
  Phone, Mail, Building, CheckCircle,
  Upload, Image as ImageIcon, Save,
  AlertCircle, Loader, ExternalLink
} from 'lucide-react';
import { pharmacyAPI } from '../../services/pharmacyAPI';
import { message } from 'antd';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(null);
  const [showMapPreview, setShowMapPreview] = useState(false);
  
  const [pharmacySettings, setPharmacySettings] = useState({
    // Pharmacy Info
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    
    // Services
    deliveryRadius: 5,
    minimumOrderAmount: 0,
    deliveryFee: 0,
    freeDeliveryThreshold: 0,
    
    // Images
    logo: null,
    banner: null,
    image: null,
    
    // Contact Info
    whatsapp: '',
    facebook: '',
    instagram: '',
  });

  const [logoPreview, setLogoPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Generate Google Maps embed URL from address
  const getGoogleMapsEmbedUrl = (address) => {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // Generate Google Maps link for external view
  const getGoogleMapsLink = (address) => {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

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
        
        setPharmacySettings({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          description: data.description || '',
          deliveryRadius: data.deliveryRadius || 5,
          minimumOrderAmount: data.minimumOrderAmount || 0,
          deliveryFee: data.deliveryFee || 0,
          freeDeliveryThreshold: data.freeDeliveryThreshold || 0,
          logo: data.logo || null,
          banner: data.banner || data.bannerImage || null,
          image: data.image || data.logo || null,
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

  // Image upload function
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      message.error('Image size should be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      message.error('Only JPEG, PNG, WEBP images are allowed');
      return;
    }

    setUploadingImage(true);
    
    try {
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      
      if (type === 'logo') {
        setLogoPreview(base64Image);
        setPharmacySettings(prev => ({
          ...prev,
          logo: base64Image,
          image: base64Image
        }));
      } else {
        setBannerPreview(base64Image);
        setPharmacySettings(prev => ({
          ...prev,
          banner: base64Image,
          bannerImage: base64Image
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
      const updateData = {
        name: pharmacySettings.name,
        email: pharmacySettings.email,
        phone: pharmacySettings.phone,
        address: pharmacySettings.address,
        description: pharmacySettings.description,
        deliveryRadius: Number(pharmacySettings.deliveryRadius),
        minimumOrderAmount: Number(pharmacySettings.minimumOrderAmount),
        deliveryFee: Number(pharmacySettings.deliveryFee),
        freeDeliveryThreshold: Number(pharmacySettings.freeDeliveryThreshold),
        logo: pharmacySettings.logo,
        image: pharmacySettings.logo,
        banner: pharmacySettings.banner,
        bannerImage: pharmacySettings.banner,
        whatsapp: pharmacySettings.whatsapp,
        facebook: pharmacySettings.facebook,
        instagram: pharmacySettings.instagram,
      };
      
      const response = await pharmacyAPI.updatePharmacyProfile(pharmacyId, updateData);
      
      if (response.data?.success) {
        setSaveSuccess(true);
        message.success('Settings saved successfully!');
        
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
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-green-800 font-medium">Settings saved successfully!</span>
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
                    placeholder="Enter your complete pharmacy address (e.g., 123 Main Street, Gulberg, Lahore, Pakistan)"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Address is constant and will only change when you update it
                </p>
              </div>
              
              {/* Google Maps Preview Section */}
              {pharmacySettings.address && (
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      📍 Location Preview on Google Maps
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMapPreview(!showMapPreview)}
                      className="text-sm text-[#2c6774] hover:text-[#174047] font-medium"
                    >
                      {showMapPreview ? 'Hide Map' : 'Show Map'}
                    </button>
                  </div>
                  
                  {showMapPreview && (
                    <div className="space-y-3">
                      {/* Embedded Google Maps */}
                      <div className="rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
                        <iframe
                          title="Pharmacy Location"
                          width="100%"
                          height="250"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src={getGoogleMapsEmbedUrl(pharmacySettings.address)}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      
                      {/* Link to open in Google Maps */}
                      <a
                        href={getGoogleMapsLink(pharmacySettings.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink size={14} />
                        View larger map in Google Maps
                      </a>
                      
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          <MapPin size={14} />
                          <span className="font-medium">Current Address:</span> {pharmacySettings.address}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {!showMapPreview && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin size={14} />
                        <span className="font-medium">Address:</span> {pharmacySettings.address}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowMapPreview(true)}
                        className="mt-2 text-sm text-[#2c6774] hover:text-[#174047]"
                      >
                        Click to preview on map
                      </button>
                    </div>
                  )}
                </div>
              )}
              
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

          {/* Delivery Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="text-[#2c6774]" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Delivery Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Radius (km) *
                </label>
                <input
                  type="number"
                  name="deliveryRadius"
                  value={pharmacySettings.deliveryRadius}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  step="1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum distance for delivery
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Amount (Rs)
                </label>
                <input
                  type="number"
                  name="minimumOrderAmount"
                  value={pharmacySettings.minimumOrderAmount}
                  onChange={handleInputChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c6774]/30 focus:border-[#2c6774] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Delivery Fee (Rs)
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
                <p className="text-xs text-gray-500 mt-1">
                  Base fee (actual fee calculated by distance)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Delivery Threshold (Rs)
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
                <p className="text-xs text-gray-500 mt-1">
                  Orders above this amount get free delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pharmacy Images */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Images</h2>
            <p className="text-sm text-gray-500 mb-4">These images will appear on the customer side</p>
            
            {/* Logo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pharmacy Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
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
                    Recommended: 200x200px, PNG/JPG (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Banner Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pharmacy Banner
              </label>
              <div className="mb-3">
                <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
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
                Recommended: 1200x300px, PNG/JPG (Max 5MB)
              </p>
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-blue-800">📍 Location Information</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your address is constant and will only change when you manually update it. 
                  Click "Show Map" to preview your location on Google Maps.
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