import React, { useState, useEffect } from 'react';
import { 
  MapPin, Truck, 
  Phone, Mail, Building, CheckCircle,
  Save, AlertCircle, ExternalLink, Loader, Upload, X
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const SettingsPage = () => {
  const { pharmacy, pharmacyId: contextPharmacyId, refetchPharmacy } = useOutletContext();
  const [loading, setLoading] = useState(!pharmacy);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pharmacyId, setPharmacyId] = useState(contextPharmacyId);
  const [showMapPreview, setShowMapPreview] = useState(false);
  
  const [pharmacySettings, setPharmacySettings] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    deliveryRadius: 5,
    minimumOrderAmount: 0,
    deliveryFee: 0,
    freeDeliveryThreshold: 0,
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const getGoogleMapsEmbedUrl = (address) => {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const getGoogleMapsLink = (address) => {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  };

  useEffect(() => {
    if (pharmacy) {
      setLoading(false);
      setPharmacySettings({
        name: pharmacy.name || '',
        email: pharmacy.email || '',
        phone: pharmacy.phone || '',
        address: pharmacy.address || '',
        description: pharmacy.description || '',
        deliveryRadius: pharmacy.deliveryRadius || 5,
        minimumOrderAmount: pharmacy.minimumOrderAmount || 0,
        deliveryFee: pharmacy.deliveryFee || 0,
        freeDeliveryThreshold: pharmacy.freeDeliveryThreshold || 0,
      });
      
      // Set logo preview if exists - like LabsPage
      if (pharmacy.logo) {
        setLogoPreview(`http://localhost:5000/uploads/${pharmacy.logo}`);
      }
    } else {
      setLoading(true);
    }
  }, [pharmacy]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPharmacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        message.error('Only JPEG, PNG, and WEBP images are allowed');
        e.target.value = '';
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error('Image size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) {
      message.error('Please select an image first');
      return;
    }

    if (!pharmacyId) {
      message.error('Pharmacy ID not found');
      console.error('Pharmacy ID is missing:', pharmacyId);
      return;
    }

    setIsUploadingLogo(true);
    
    try {
      console.log('Uploading logo for pharmacy:', pharmacyId);
      
      const formData = new FormData();
      formData.append('image', logoFile);
      formData.append('type', 'logo');
      
      // Try different endpoints
      let response;
      let uploaded = false;
      
      // Try first endpoint
      try {
        response = await axios.post(
          `http://localhost:5000/api/pharmacies/${pharmacyId}/upload-image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        uploaded = true;
      } catch (error) {
        console.log('First endpoint failed, trying second...');
        
        // Try second endpoint
        try {
          const formData2 = new FormData();
          formData2.append('logo', logoFile);
          
          response = await axios.post(
            `http://localhost:5000/api/pharmacies/${pharmacyId}/upload`,
            formData2,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          uploaded = true;
        } catch (error2) {
          console.log('Second endpoint failed, trying third...');
          
          // Try third endpoint - update pharmacy with logo
          const reader = new FileReader();
          const base64Promise = new Promise((resolve) => {
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(logoFile);
          });
          
          const base64Image = await base64Promise;
          
          response = await axios.put(
            `http://localhost:5000/api/pharmacies/${pharmacyId}`,
            {
              ...pharmacySettings,
              logo: base64Image
            }
          );
          uploaded = true;
        }
      }
      
      console.log('Upload response:', response?.data);
      
      if (response?.data?.success) {
        message.success('Logo uploaded successfully!');
        setLogoFile(null);
        
        // Update logo preview
        if (response.data.data?.logo) {
          setLogoPreview(`http://localhost:5000/uploads/${response.data.data.logo}`);
        }
        
        // Refetch pharmacy data
        if (refetchPharmacy) {
          await refetchPharmacy();
        }
      } else {
        message.error(response?.data?.message || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      
      if (error.code === 'ERR_NETWORK') {
        message.error('Cannot connect to server. Please check your connection.');
      } else if (error.response?.status === 404) {
        message.error('Upload endpoint not found. Please contact support.');
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to upload logo. Please try again.');
      }
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleRemoveLogo = async () => {
    if (!pharmacyId) {
      message.error('Pharmacy ID not found');
      return;
    }

    try {
      let response;
      
      // Try different delete endpoints
      try {
        response = await axios.delete(
          `http://localhost:5000/api/pharmacies/${pharmacyId}/image?type=logo`
        );
      } catch (error) {
        console.log('First delete endpoint failed, trying second...');
        
        try {
          response = await axios.delete(
            `http://localhost:5000/api/pharmacies/${pharmacyId}/logo`
          );
        } catch (error2) {
          console.log('Second delete endpoint failed, trying update...');
          
          // Update pharmacy without logo
          response = await axios.put(
            `http://localhost:5000/api/pharmacies/${pharmacyId}`,
            {
              ...pharmacySettings,
              logo: null
            }
          );
        }
      }
      
      if (response?.data?.success) {
        message.success('Logo removed successfully!');
        setLogoPreview(null);
        setLogoFile(null);
        
        if (refetchPharmacy) {
          await refetchPharmacy();
        }
      } else {
        message.error(response?.data?.message || 'Failed to remove logo');
      }
    } catch (error) {
      console.error('Error removing logo:', error);
      message.error('Failed to remove logo');
    }
  };

  const handleSave = async () => {
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
      };
      
      console.log('Saving settings with data:', updateData);
      
      const response = await axios.put(
        `http://localhost:5000/api/pharmacies/${pharmacyId}`,
        updateData
      );
      
      console.log('Save response:', response.data);
      
      if (response.data?.success) {
        setSaveSuccess(true);
        message.success('Settings saved successfully!');
        if (refetchPharmacy) {
          await refetchPharmacy();
        }
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
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pharmacy Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Building className="text-[#2c6774]" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Pharmacy Information</h2>
            </div>
            
            {/* Logo Upload Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pharmacy Logo
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Logo Preview */}
                <div className="relative">
                  {logoPreview ? (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Pharmacy Logo"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://cdn-icons-png.flaticon.com/512/2965/2965358.png";
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Remove logo"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Upload className="mx-auto text-gray-400 mb-1" size={32} />
                        <p className="text-xs text-gray-500">No logo</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Upload Controls */}
                <div className="flex-1">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer font-medium text-sm"
                  >
                    <Upload size={18} />
                    Choose Image
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPEG, PNG, WEBP (Max 5MB)
                  </p>
                  {logoFile && (
                    <button
                      type="button"
                      onClick={handleLogoUpload}
                      disabled={isUploadingLogo}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#174047] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploadingLogo ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload Logo
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
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
                    placeholder="Enter your complete pharmacy address"
                  />
                </div>
              </div>
              
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
                      
                      <a
                        href={getGoogleMapsLink(pharmacySettings.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink size={14} />
                        View larger map in Google Maps
                      </a>
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

        {/* Right Column - Info Box */}
        <div className="space-y-6">
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
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Upload className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-green-800">Logo Guidelines</p>
                <p className="text-xs text-green-600 mt-1">
                  Upload a high-quality logo that represents your pharmacy. 
                  Recommended size: 500x500 pixels. This will be displayed on your pharmacy profile.
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