import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, useOutletContext } from 'react-router-dom';
import { 
  Save, X, Upload, Image as ImageIcon, 
  ArrowLeft, AlertCircle, CheckCircle, Package, Edit
} from 'lucide-react';
import { message } from 'antd';
import { pharmacyAPI } from '../../services/pharmacyAPI';

const EditMedicinePage = () => {
  const navigate = useNavigate();
  const { medicineId: id } = useParams();
  const location = useLocation();
  const outletContext = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [pharmacyId, setPharmacyId] = useState(outletContext?.pharmacyId || localStorage.getItem('pharmacyId'));
  
  // Medicine forms
  const medicineForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'];
  const volumeOptions = ['50ml', '60ml', '100ml', '120ml', '150ml', '200ml', '250ml', '500ml'];
  const weightOptions = ['5g', '10g', '15g', '20g', '25g', '30g', '50g', '100g', '150g', '200g', '250g', '500g'];

  // Form state
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    genericName: '',
    description: '',
    price: '',
    discountedPrice: '',
    discountPercentage: 0,
    stockQuantity: '',
    category: '',
    dosage: 'As prescribed',
    strength: '',
    form: 'Tablet',
    manufacturer: '',
    image: null,
    sideEffects: '',
    uses: '',
    precautions: '',
    instructions: '',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    isFeatured: false,
    tabletsPerUnit: 10,
    tabletsPerStrip: 10,
    volume: '60ml',
    weight: ''
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Sync pharmacyId from outlet context
  useEffect(() => {
    if (outletContext?.pharmacyId) {
      setPharmacyId(outletContext.pharmacyId);
      localStorage.setItem('pharmacyId', outletContext.pharmacyId);
    } else {
      const stored = localStorage.getItem('pharmacyId');
      if (stored) setPharmacyId(stored);
    }
  }, [outletContext?.pharmacyId]);

  // Check if current form is tablet/capsule type
  const isTabletOrCapsule = () => {
    const form = medicineForm.form?.toLowerCase() || '';
    return form.includes('tablet') || form.includes('capsule');
  };

  // Check if current form is syrup/liquid type
  const isSyrupOrLiquid = () => {
    const form = medicineForm.form?.toLowerCase() || '';
    return form.includes('syrup') || form.includes('suspension') || 
           form.includes('liquid') || form.includes('solution') || 
           form.includes('drops') || form.includes('injection') || form.includes('spray');
  };

  const isCreamOrOintment = () => {
    const form = medicineForm.form?.toLowerCase() || '';
    return form.includes('cream') || form.includes('ointment');
  };

  const isPowder = () => {
    const form = medicineForm.form?.toLowerCase() || '';
    return form.includes('powder');
  };

  // Fetch medicine data
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setFetchLoading(true);
        const pid = localStorage.getItem('pharmacyId');
        
        if (!pid) {
          message.error('Pharmacy ID not found');
          navigate('/');
          return;
        }

        setPharmacyId(pid);

        // Check if medicine data is passed via location state
        if (location.state?.medicine) {
          const med = location.state.medicine;
          populateForm(med);
          setFetchLoading(false);
          return;
        }

        // If not, fetch from API
        const response = await pharmacyAPI.getInventory(pid);
        if (response.data?.success) {
          const medicine = response.data.data.find(m => m._id === id);
          if (medicine) {
            populateForm(medicine);
          } else {
            message.error('Medicine not found');
            navigate(`/pharmacy/dashboard/${pid}/products`);
          }
        } else {
          message.error('Failed to fetch medicine data');
          navigate(`/pharmacy/dashboard/${pid}/products`);
        }
      } catch (error) {
        console.error('Error fetching medicine:', error);
        message.error('Failed to load medicine data');
        const pid = localStorage.getItem('pharmacyId');
        navigate(`/pharmacy/dashboard/${pid}/products`);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchMedicine();
  }, [id, location, navigate]);

  const populateForm = (med) => {
    setMedicineForm({
      name: med.name || '',
      genericName: med.genericName || '',
      description: med.description || '',
      price: med.price || '',
      discountedPrice: med.discountedPrice || '',
      discountPercentage: med.discountPercentage || 0,
      stockQuantity: med.stockQuantity || med.stock || '',
      category: med.category || '',
      dosage: med.dosage || 'As prescribed',
      strength: med.strength || '',
      form: med.form || 'Tablet',
      manufacturer: med.manufacturer || '',
      image: med.image || null,
      sideEffects: Array.isArray(med.sideEffects) ? med.sideEffects.join(', ') : (med.sideEffects || ''),
      uses: Array.isArray(med.uses) ? med.uses.join(', ') : (med.uses || ''),
      precautions: Array.isArray(med.precautions) ? med.precautions.join(', ') : (med.precautions || ''),
      instructions: Array.isArray(med.instructions) ? med.instructions.join(', ') : (med.instructions || ''),
      storageInstructions: med.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
      isFeatured: med.isFeatured || false,
      tabletsPerUnit: med.tabletsPerUnit || 10,
      tabletsPerStrip: med.tabletsPerStrip || med.tabletsPerUnit || 10,
      volume: med.volume || '60ml',
      weight: med.weight || ''
    });
    
    if (med.image) {
      setImagePreview(med.image);
    }
  };

  // Compress image before storing
  const compressImage = (base64String, maxWidth = 400, quality = 0.6) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 2MB. Please upload a smaller image or compress it.' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please upload a valid image file (JPEG, PNG, GIF, WebP)' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        const compressed = await compressImage(base64, 400, 0.6);
        setImagePreview(compressed);
        setMedicineForm(prev => ({ ...prev, image: compressed }));
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: null }));
        }
      };
      reader.onerror = () => {
        setErrors(prev => ({ ...prev, image: 'Failed to read image file. Please try again.' }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setMedicineForm(prev => ({ ...prev, image: null }));
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Restrict price and discountedPrice to 2 decimal places
    if (name === 'price' || name === 'discountedPrice') {
      if (value.includes('.') && value.split('.')[1].length > 2) {
        return;
      }
    }
    
    setMedicineForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    // Auto-calculate discount percentage
    if (name === 'price' || name === 'discountedPrice') {
      const price = parseFloat(name === 'price' ? value : medicineForm.price) || 0;
      const discountedPrice = parseFloat(name === 'discountedPrice' ? value : medicineForm.discountedPrice) || 0;
      if (price > 0 && discountedPrice >= 0 && discountedPrice <= price) {
        const discountPercentage = Math.round(((price - discountedPrice) / price) * 100);
        setMedicineForm(prev => ({ ...prev, discountPercentage }));
      } else if (price > 0 && discountedPrice === 0) {
        setMedicineForm(prev => ({ ...prev, discountPercentage: 0 }));
      }
    }

    // Sync tabletsPerStrip with tabletsPerUnit
    if (name === 'tabletsPerUnit') {
      setMedicineForm(prev => ({ ...prev, tabletsPerStrip: parseInt(value) || 10 }));
    }
  };

  // Simplified validation - only name, price, stock required
  const validateForm = () => {
    const newErrors = {};
    if (!medicineForm.name?.trim()) newErrors.name = 'Product name is required';
    if (!medicineForm.price || parseFloat(medicineForm.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!medicineForm.stockQuantity && medicineForm.stockQuantity !== 0) {
      newErrors.stockQuantity = 'Stock quantity is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      message.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);

    try {
      const pid = localStorage.getItem('pharmacyId');
      if (!pid) {
        message.error('Pharmacy ID not found');
        return;
      }

      const stockQty = Math.floor(parseInt(medicineForm.stockQuantity) || 0);
      const tabletsPerUnitValue = isTabletOrCapsule() ? Math.floor(parseInt(medicineForm.tabletsPerUnit) || 10) : 10;

      const medicineData = {
        name: medicineForm.name,
        genericName: medicineForm.genericName,
        description: medicineForm.description,
        price: parseFloat(medicineForm.price) || 0,
        discountedPrice: parseFloat(medicineForm.discountedPrice) || null,
        discountPercentage: medicineForm.discountPercentage,
        stockQuantity: stockQty,
        category: medicineForm.category,
        dosage: medicineForm.dosage,
        strength: medicineForm.strength,
        form: medicineForm.form,
        manufacturer: medicineForm.manufacturer,
        image: medicineForm.image,
        sideEffects: medicineForm.sideEffects.split(',').map(item => item.trim()).filter(item => item),
        uses: medicineForm.uses.split(',').map(item => item.trim()).filter(item => item),
        precautions: medicineForm.precautions.split(',').map(item => item.trim()).filter(item => item),
        instructions: medicineForm.instructions.split(',').map(item => item.trim()).filter(item => item),
        storageInstructions: medicineForm.storageInstructions,
        isFeatured: medicineForm.isFeatured,
        tabletsPerUnit: tabletsPerUnitValue,
        tabletsPerStrip: tabletsPerUnitValue,
        volume: isSyrupOrLiquid() ? medicineForm.volume : undefined,
        weight: (isCreamOrOintment() || isPowder()) ? medicineForm.weight : undefined,
      };

      await pharmacyAPI.updateMedicine(pid, id, medicineData);
      message.success('Medicine updated successfully!');
      navigate(`/pharmacy/dashboard/${pid}/products`);
      
    } catch (error) {
      console.error('Error updating medicine:', error);
      message.error(error.response?.data?.message || 'Failed to update medicine');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2c6774] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicine data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Medicine</h1>
            <p className="text-sm text-gray-600 mt-1">Update the medicine details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-gray-200 flex flex-wrap gap-4">
          {['basic', 'pricing', 'details'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors capitalize ${
                activeTab === tab ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'basic' ? 'Basic Information' : 
               tab === 'pricing' ? 'Pricing & Stock' : 
               'Details'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={medicineForm.name}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Panadol Tablets"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generic Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="genericName"
                    value={medicineForm.genericName}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.genericName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Paracetamol"
                  />
                  {errors.genericName && <p className="text-red-500 text-xs mt-1">{errors.genericName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={medicineForm.manufacturer}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.manufacturer ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., GSK"
                  />
                  {errors.manufacturer && <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={medicineForm.category}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Pain Relief"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="form"
                    value={medicineForm.form}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.form ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {medicineForms.map(form => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                  {errors.form && <p className="text-red-500 text-xs mt-1">{errors.form}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strength <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="strength"
                    value={medicineForm.strength}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.strength ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 500mg"
                  />
                  {errors.strength && <p className="text-red-500 text-xs mt-1">{errors.strength}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className={`w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-50 ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}>
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <Package className="text-gray-400" size={32} />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Upload size={16} />
                      <span>Upload New Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.image && (
                  <div className="flex items-start gap-2 mt-2">
                    <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-red-500 text-xs">{errors.image}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPEG, PNG, GIF, WebP. Maximum size: 2MB. Images will be automatically compressed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={medicineForm.description}
                  onChange={handleFormChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of the medicine..."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>
          )}

          {/* Pricing & Stock Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (Rs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={medicineForm.price}
                    onChange={handleFormChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 100.00"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discounted Price (Rs)
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={medicineForm.discountedPrice}
                    onChange={handleFormChange}
                    min="0"
                    max={medicineForm.price || undefined}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., 90.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount %
                  </label>
                  <input
                    type="text"
                    value={`${medicineForm.discountPercentage}%`}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={medicineForm.stockQuantity}
                    onChange={handleFormChange}
                    min="0"
                    step="1"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 100"
                  />
                  {errors.stockQuantity && <p className="text-red-500 text-xs mt-1">{errors.stockQuantity}</p>}
                </div>
                {isTabletOrCapsule() && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tablets Per Strip <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="tabletsPerUnit"
                      value={medicineForm.tabletsPerUnit}
                      onChange={handleFormChange}
                      min="1"
                      max="30"
                      step="1"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                        errors.tabletsPerUnit ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 10"
                    />
                    {errors.tabletsPerUnit && <p className="text-red-500 text-xs mt-1">{errors.tabletsPerUnit}</p>}
                  </div>
                )}
                {isSyrupOrLiquid() && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Volume <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="volume"
                      value={medicineForm.volume}
                      onChange={handleFormChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                        errors.volume ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {volumeOptions.map(vol => (
                        <option key={vol} value={vol}>{vol}</option>
                      ))}
                    </select>
                    {errors.volume && <p className="text-red-500 text-xs mt-1">{errors.volume}</p>}
                  </div>
                )}

              {(isCreamOrOintment() || isPowder()) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isCreamOrOintment() ? "Grams Per Tube" : "Grams Per Pack"} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="weight"
                    value={medicineForm.weight || ''}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                      errors.weight ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select weight</option>
                    {weightOptions.map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                  {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                </div>
              )}
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={medicineForm.dosage}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.dosage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 1-2 tablets every 4-6 hours"
                />
                {errors.dosage && <p className="text-red-500 text-xs mt-1">{errors.dosage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uses <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="uses"
                  value={medicineForm.uses}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.uses ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Fever, Headache, Pain relief"
                />
                {errors.uses && <p className="text-red-500 text-xs mt-1">{errors.uses}</p>}
                <p className="text-xs text-gray-500 mt-1">Separate multiple uses with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Side Effects <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sideEffects"
                  value={medicineForm.sideEffects}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.sideEffects ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Nausea, Drowsiness"
                />
                {errors.sideEffects && <p className="text-red-500 text-xs mt-1">{errors.sideEffects}</p>}
                <p className="text-xs text-gray-500 mt-1">Separate multiple side effects with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precautions <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="precautions"
                  value={medicineForm.precautions}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.precautions ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Do not exceed recommended dose"
                />
                {errors.precautions && <p className="text-red-500 text-xs mt-1">{errors.precautions}</p>}
                <p className="text-xs text-gray-500 mt-1">Separate multiple precautions with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={medicineForm.instructions}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.instructions ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Take with food, Shake well before use"
                />
                {errors.instructions && <p className="text-red-500 text-xs mt-1">{errors.instructions}</p>}
                <p className="text-xs text-gray-500 mt-1">Separate multiple instructions with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Instructions <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="storageInstructions"
                  value={medicineForm.storageInstructions}
                  onChange={handleFormChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent ${
                    errors.storageInstructions ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.storageInstructions && <p className="text-red-500 text-xs mt-1">{errors.storageInstructions}</p>}
              </div>
            </div>
          )}

        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products`)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Update Medicine
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMedicinePage;