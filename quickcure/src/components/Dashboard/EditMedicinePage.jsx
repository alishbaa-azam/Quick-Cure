// EditMedicinePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Save, X, Upload, Image as ImageIcon, 
  ArrowLeft, AlertCircle, CheckCircle, Package, Edit
} from 'lucide-react';
import { message } from 'antd';
import { pharmacyAPI } from '../../services/pharmacyAPI';

const EditMedicinePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Medicine forms
  const medicineForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Spray'];
  const packSizeOptions = ['50ml Bottle', '100ml Bottle', '150ml Bottle', '200ml Bottle', '10 Tablets', '20 Tablets', '30 Tablets', '50 Tablets', '100 Tablets'];

  // Form state
  const [medicineForm, setMedicineForm] = useState({
    name: '',
    genericName: '',
    description: '',
    detailedDescription: '',
    price: '',
    discountedPrice: '',
    discountPercentage: 0,
    inStock: true,
    stockQuantity: '',
    reorderLevel: 10,
    category: '',
    dosage: 'As prescribed',
    strength: '',
    form: 'Tablet',
    manufacturer: '',
    image: null,
    sideEffects: [],
    uses: [],
    precautions: [],
    instructions: [],
    storageInstructions: 'Store in a cool, dry place away from direct sunlight',
    tags: [],
    isFeatured: false,
    sku: '',
    barcode: '',
    packSizes: [],
    expiryDate: '',
    tabletsPerUnit: 10
  });

  // Fetch medicine data
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setFetchLoading(true);
        const pharmacyId = localStorage.getItem('pharmacyId');
        
        if (!pharmacyId) {
          message.error('Pharmacy ID not found');
          navigate('/PharmacyDashboard/products');
          return;
        }

        // Check if medicine data is passed via location state
        if (location.state?.medicine) {
          const med = location.state.medicine;
          populateForm(med);
          setFetchLoading(false);
          return;
        }

        // If not, fetch from API
        const response = await pharmacyAPI.getInventory(pharmacyId);
        if (response.data?.success) {
          const medicine = response.data.data.find(m => m._id === id);
          if (medicine) {
            populateForm(medicine);
          } else {
            message.error('Medicine not found');
            navigate('/PharmacyDashboard/products');
          }
        } else {
          message.error('Failed to fetch medicine data');
          navigate('/PharmacyDashboard/products');
        }
      } catch (error) {
        console.error('Error fetching medicine:', error);
        message.error('Failed to load medicine data');
        navigate('/PharmacyDashboard/products');
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
      detailedDescription: med.detailedDescription || '',
      price: med.price || '',
      discountedPrice: med.discountedPrice || '',
      discountPercentage: med.discountPercentage || 0,
      inStock: med.inStock !== false,
      stockQuantity: med.stockQuantity || med.stock || '',
      reorderLevel: med.reorderLevel || 10,
      category: med.category || '',
      dosage: med.dosage || 'As prescribed',
      strength: med.strength || '',
      form: med.form || 'Tablet',
      manufacturer: med.manufacturer || '',
      image: med.image || null,
      sideEffects: med.sideEffects || [],
      uses: med.uses || [],
      precautions: med.precautions || [],
      instructions: med.instructions || [],
      storageInstructions: med.storageInstructions || 'Store in a cool, dry place away from direct sunlight',
      tags: med.tags || [],
      isFeatured: med.isFeatured || false,
      sku: med.sku || '',
      barcode: med.barcode || '',
      packSizes: med.packSizes || [],
      expiryDate: med.expiryDate ? new Date(med.expiryDate).toISOString().split('T')[0] : '',
      tabletsPerUnit: med.tabletsPerUnit || 10
    });
    
    if (med.image) {
      setImagePreview(med.image);
    }
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'packSizes' && e.target.options) {
      const options = e.target.options;
      const selected = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }
      setMedicineForm(prev => ({ ...prev, packSizes: selected }));
    } else if (name === 'sideEffects' || name === 'uses' || name === 'precautions' || name === 'instructions' || name === 'tags') {
      const items = value.split(',').map(item => item.trim()).filter(item => item);
      setMedicineForm(prev => ({ ...prev, [name]: items }));
    } else {
      setMedicineForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Auto-calculate discount percentage
    if (name === 'price' || name === 'discountedPrice') {
      const price = parseFloat(name === 'price' ? value : medicineForm.price) || 0;
      const discountedPrice = parseFloat(name === 'discountedPrice' ? value : medicineForm.discountedPrice) || 0;
      if (price > 0 && discountedPrice > 0) {
        const discountPercentage = Math.round(((price - discountedPrice) / price) * 100);
        setMedicineForm(prev => ({ ...prev, discountPercentage }));
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setMedicineForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pharmacyId = localStorage.getItem('pharmacyId');
      if (!pharmacyId) {
        message.error('Pharmacy ID not found');
        return;
      }

      const medicineData = {
        name: medicineForm.name,
        genericName: medicineForm.genericName,
        description: medicineForm.description,
        detailedDescription: medicineForm.detailedDescription,
        price: parseFloat(medicineForm.price) || 0,
        discountedPrice: parseFloat(medicineForm.discountedPrice) || null,
        discountPercentage: medicineForm.discountPercentage,
        inStock: medicineForm.inStock,
        stockQuantity: parseInt(medicineForm.stockQuantity) || 0,
        reorderLevel: parseInt(medicineForm.reorderLevel) || 10,
        category: medicineForm.category,
        dosage: medicineForm.dosage,
        strength: medicineForm.strength,
        form: medicineForm.form,
        manufacturer: medicineForm.manufacturer,
        image: medicineForm.image,
        sideEffects: medicineForm.sideEffects,
        uses: medicineForm.uses,
        precautions: medicineForm.precautions,
        instructions: medicineForm.instructions,
        storageInstructions: medicineForm.storageInstructions,
        tags: medicineForm.tags,
        isFeatured: medicineForm.isFeatured,
        sku: medicineForm.sku,
        barcode: medicineForm.barcode,
        packSizes: medicineForm.packSizes,
        expiryDate: medicineForm.expiryDate,
        tabletsPerUnit: parseInt(medicineForm.tabletsPerUnit) || 10
      };

      await pharmacyAPI.updateMedicine(pharmacyId, id, medicineData);
      message.success('Medicine updated successfully!');
      navigate('/PharmacyDashboard/products');
      
    } catch (error) {
      console.error('Error updating medicine:', error);
      message.error(error.response?.data?.message || 'Failed to update medicine');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Rs 0';
    return `Rs ${parseFloat(amount).toLocaleString()}`;
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
            onClick={() => navigate('/PharmacyDashboard/products')}
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
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'basic' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Basic Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'pricing' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pricing & Stock
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'details' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('additional')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'additional' ? 'border-[#2c6774] text-[#2c6774]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Additional Info
          </button>
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
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Gaviscon Suspension"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Generic Name
                  </label>
                  <input
                    type="text"
                    name="genericName"
                    value={medicineForm.genericName}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Aluminium Hydroxide"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={medicineForm.manufacturer}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Reckitt Benckiser"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={medicineForm.category}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., Antacid"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form
                  </label>
                  <select
                    name="form"
                    value={medicineForm.form}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  >
                    {medicineForms.map(form => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Strength
                  </label>
                  <input
                    type="text"
                    name="strength"
                    value={medicineForm.strength}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., 500mg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={medicineForm.sku}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={medicineForm.barcode}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={medicineForm.description}
                  onChange={handleFormChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="Brief description of the medicine..."
                />
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
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
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
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={medicineForm.discountPercentage}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={medicineForm.stockQuantity}
                    onChange={handleFormChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={medicineForm.reorderLevel}
                    onChange={handleFormChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tablets Per Unit
                  </label>
                  <input
                    type="number"
                    name="tabletsPerUnit"
                    value={medicineForm.tabletsPerUnit}
                    onChange={handleFormChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={medicineForm.expiryDate}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={medicineForm.inStock}
                      onChange={handleFormChange}
                      className="w-4 h-4 text-[#2c6774] rounded border-gray-300 focus:ring-[#2c6774]"
                    />
                    <span className="text-sm text-gray-700">In Stock</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pack Sizes (Hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  name="packSizes"
                  multiple
                  value={medicineForm.packSizes}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent h-32"
                >
                  {packSizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={medicineForm.dosage}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., As prescribed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  name="detailedDescription"
                  value={medicineForm.detailedDescription}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="Additional details about the medicine..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uses (comma separated)
                </label>
                <input
                  type="text"
                  name="uses"
                  value={medicineForm.uses.join(', ')}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., Heartburn, Acid Indigestion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Side Effects (comma separated)
                </label>
                <input
                  type="text"
                  name="sideEffects"
                  value={medicineForm.sideEffects.join(', ')}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., Constipation, Diarrhea, Nausea"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precautions (comma separated)
                </label>
                <input
                  type="text"
                  name="precautions"
                  value={medicineForm.precautions.join(', ')}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., Consult doctor if symptoms persist"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions (comma separated)
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={medicineForm.instructions.join(', ')}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., Take after meals, Shake well before use"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Instructions
                </label>
                <input
                  type="text"
                  name="storageInstructions"
                  value={medicineForm.storageInstructions}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Additional Info Tab */}
          {activeTab === 'additional' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={medicineForm.tags.join(', ')}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c6774] focus:border-transparent"
                  placeholder="e.g., prescription, over-the-counter, pediatric"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={medicineForm.isFeatured}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-[#2c6774] rounded border-gray-300 focus:ring-[#2c6774]"
                  />
                  <span className="text-sm text-gray-700">Featured Product</span>
                </label>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Summary</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-blue-800">
                      <div>
                        <span className="font-medium">Name:</span> {medicineForm.name || 'Not set'}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {medicineForm.category || 'Not set'}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> {formatCurrency(medicineForm.price)}
                      </div>
                      <div>
                        <span className="font-medium">Stock:</span> {medicineForm.stockQuantity || 0} units
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/PharmacyDashboard/products')}
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