import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, X, Upload, Package, AlertCircle
} from 'lucide-react';
import { message } from 'antd';
import { pharmacyAPI } from '../../services/pharmacyAPI';

const AddMedicinePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [pharmacyId, setPharmacyId] = useState(null);

  // Form state - simplified
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
    tabletsPerUnit: 10,
    volume: '60ml',
    weight: ''
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Get pharmacyId on component mount
  useEffect(() => {
    const id = localStorage.getItem('pharmacyId');
    if (id) {
      setPharmacyId(id);
    }
  }, []);

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
        message.error('Image size should be less than 2MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        message.error('Please upload a valid image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        const compressed = await compressImage(base64, 400, 0.6);
        setImagePreview(compressed);
        setMedicineForm(prev => ({ ...prev, image: compressed }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form changes
  const handleFormChange = (e) => {
    let { name, value, type, checked } = e.target;
    
    if (name === 'price' || name === 'discountedPrice') {
      if (value.includes('.') && value.split('.')[1].length > 2) return;
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
      if (!pharmacyId) {
        message.error('Pharmacy ID not found');
        return;
      }

      const stockQty = Math.floor(parseInt(medicineForm.stockQuantity) || 0);

      const medicineData = {
        name: medicineForm.name,
        genericName: medicineForm.genericName,
        description: medicineForm.description || `${medicineForm.name}`,
        price: parseFloat(medicineForm.price) || 0,
        discountedPrice: parseFloat(medicineForm.discountedPrice) || null,
        discountPercentage: medicineForm.discountPercentage,
        stockQuantity: stockQty,
        category: medicineForm.category || 'General',
        dosage: medicineForm.dosage,
        strength: medicineForm.strength,
        form: medicineForm.form,
        manufacturer: medicineForm.manufacturer,
        image: medicineForm.image,
        sideEffects: medicineForm.sideEffects ? medicineForm.sideEffects.split(',').map(item => item.trim()).filter(item => item) : [],
        uses: medicineForm.uses ? medicineForm.uses.split(',').map(item => item.trim()).filter(item => item) : [],
        precautions: medicineForm.precautions ? medicineForm.precautions.split(',').map(item => item.trim()).filter(item => item) : [],
        instructions: medicineForm.instructions ? medicineForm.instructions.split(',').map(item => item.trim()).filter(item => item) : [],
        storageInstructions: medicineForm.storageInstructions,
        tabletsPerUnit: medicineForm.form?.toLowerCase().includes('tablet') || medicineForm.form?.toLowerCase().includes('capsule') 
          ? Math.floor(parseInt(medicineForm.tabletsPerUnit) || 10) : 10,
        tabletsPerStrip: medicineForm.form?.toLowerCase().includes('tablet') || medicineForm.form?.toLowerCase().includes('capsule') 
          ? Math.floor(parseInt(medicineForm.tabletsPerUnit) || 10) : 10,
        volume: medicineForm.form?.toLowerCase().includes('syrup') || medicineForm.form?.toLowerCase().includes('drops') || 
                medicineForm.form?.toLowerCase().includes('injection') || medicineForm.form?.toLowerCase().includes('liquid') 
          ? medicineForm.volume : undefined,
        weight: medicineForm.form?.toLowerCase().includes('cream') || medicineForm.form?.toLowerCase().includes('ointment') || 
                medicineForm.form?.toLowerCase().includes('powder') 
          ? medicineForm.weight : undefined,
      };

      await pharmacyAPI.addMedicine(pharmacyId, medicineData);
      message.success('Medicine added successfully!');
      navigate(`/pharmacy/dashboard/${pharmacyId}/products`);
      
    } catch (error) {
      console.error('Error adding medicine:', error);
      message.error(error.response?.data?.message || 'Failed to add medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button type="button"
            onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Medicine</h1>
            <p className="text-sm text-gray-600 mt-1">Add a new medicine to your pharmacy inventory</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name</label>
                <input
                  type="text"
                  name="genericName"
                  value={medicineForm.genericName}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., Paracetamol"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={medicineForm.manufacturer}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., GSK"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={medicineForm.category}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., Pain Relief"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Strength</label>
                <input
                  type="text"
                  name="strength"
                  value={medicineForm.strength}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., 500mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Form</label>
                <select
                  name="form"
                  value={medicineForm.form}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                >
                  {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'].map(form => (
                    <option key={form} value={form}>{form}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Package className="text-gray-400" size={24} />
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      <Upload size={14} />
                      Upload
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Pricing & Stock <span className="text-red-500">*</span></h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (Rs)</label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={medicineForm.discountedPrice}
                  onChange={handleFormChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., 90.00"
                />
              </div>
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
            </div>
          </div>

          {/* Optional Details */}
          <div className="border-t pt-6">
            <details>
              <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                Additional Details (optional)
              </summary>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input type="text" name="dosage" value={medicineForm.dosage} onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" value={medicineForm.description} onChange={handleFormChange} rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Uses</label>
                  <input type="text" name="uses" value={medicineForm.uses} onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Fever, Headache" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Side Effects</label>
                  <input type="text" name="sideEffects" value={medicineForm.sideEffects} onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Nausea, Drowsiness" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precautions</label>
                  <input type="text" name="precautions" value={medicineForm.precautions} onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Do not exceed dose" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <input type="text" name="instructions" value={medicineForm.instructions} onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Take with food" />
                </div>
              </div>
            </details>
          </div>
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
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Medicine
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicinePage;