// ViewMedicinePage.jsx
import React from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { 
  ArrowLeft, Package, Info, Pill, Building2, Beaker, 
  CheckCircle, AlertCircle, Syringe, Shield, 
  ClipboardList, Thermometer, Star
} from 'lucide-react';
import { message } from 'antd';

const ViewMedicinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const outletContext = useOutletContext();
  const medicine = location.state?.medicine;
  const pharmacyId = outletContext?.pharmacyId || localStorage.getItem('pharmacyId');

  if (!medicine) {
    message.error('Medicine details not found');
    navigate(`/pharmacy/dashboard/${pharmacyId}/products`);
    return null;
  }

  const formatCurrency = (amount) => {
    if (!amount) return 'Rs 0';
    return `Rs ${parseFloat(amount).toLocaleString()}`;
  };

  const getStockStatus = () => {
    const stock = medicine.stockQuantity || medicine.stock || 0;
    
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200', dotColor: 'bg-red-500' };
    if (stock <= 5) return { text: 'Low Stock', color: 'bg-amber-100 text-amber-700 border-amber-200', dotColor: 'bg-amber-500' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-700 border-green-200', dotColor: 'bg-green-500' };
  };

  const stock = medicine.stockQuantity || medicine.stock || 0;
  const stockStatus = getStockStatus();
  const isTabletOrCapsule = medicine.form?.toLowerCase().includes('tablet') || medicine.form?.toLowerCase().includes('capsule');
  const isSyrupOrLiquid = medicine.form?.toLowerCase().includes('syrup') || medicine.form?.toLowerCase().includes('suspension') || 
                          medicine.form?.toLowerCase().includes('liquid') || medicine.form?.toLowerCase().includes('solution') || 
                          medicine.form?.toLowerCase().includes('drops') || medicine.form?.toLowerCase().includes('injection') || 
                          medicine.form?.toLowerCase().includes('spray');
  const isCreamOrOintment = medicine.form?.toLowerCase().includes('cream') || medicine.form?.toLowerCase().includes('ointment');
  const isPowder = medicine.form?.toLowerCase().includes('powder');

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
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Medicine Details</h1>
            <p className="text-sm text-gray-600 mt-1">View complete information about this medicine</p>
          </div>
          {medicine.isFeatured && (
            <span className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg">
              <Star size={16} className="fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium">Featured</span>
            </span>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header with Image and Basic Info */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-36 h-36 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm p-2">
                  {medicine.image ? (
                    <img src={medicine.image} alt={medicine.name} className="w-full h-full object-contain" />
                  ) : (
                    <Package className="w-14 h-14 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{medicine.name}</h2>
                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                      <span>{medicine.genericName}</span>
                      {medicine.manufacturer && (
                        <>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1">
                            <Building2 size={14} />
                            {medicine.manufacturer}
                          </span>
                        </>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border ${stockStatus.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stockStatus.dotColor}`}></span>
                        {stockStatus.text}
                      </span>
                      {medicine.form && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                          <Pill size={12} />
                          {medicine.form}
                        </span>
                      )}
                      {medicine.strength && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border bg-purple-100 text-purple-700 border-purple-200">
                          <Beaker size={12} />
                          {medicine.strength}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {medicine.discountedPrice && medicine.discountedPrice > 0 ? (
                      <>
                        <p className="text-sm text-gray-500 line-through">{formatCurrency(medicine.price)}</p>
                        <p className="text-3xl font-bold text-green-600">{formatCurrency(medicine.discountedPrice)}</p>
                      </>
                    ) : (
                      <p className="text-3xl font-bold text-gray-900">{formatCurrency(medicine.price)}</p>
                    )}
                    {medicine.price > 0 && (
                      <p className="text-xs text-gray-500 mt-1">per unit</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 space-y-6">

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Info size={18} className="text-gray-500" />
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                  <p className="font-medium text-gray-900">{medicine.category || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Form</p>
                  <div className="flex items-center gap-2">
                    <Pill size={16} className="text-gray-500" />
                    <p className="font-medium text-gray-900">{medicine.form || 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Strength</p>
                  <div className="flex items-center gap-2">
                    <Beaker size={16} className="text-gray-500" />
                    <p className="font-medium text-gray-900">{medicine.strength || 'N/A'}</p>
                  </div>
                </div>
                {isTabletOrCapsule && medicine.tabletsPerUnit && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tablets Per Strip</p>
                    <p className="font-medium text-gray-900">{medicine.tabletsPerUnit} tablets</p>
                  </div>
                )}
                {isSyrupOrLiquid && medicine.volume && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Volume</p>
                    <p className="font-medium text-gray-900">{medicine.volume}</p>
                  </div>
                )}
                {(isCreamOrOintment || isPowder) && medicine.weight && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{isCreamOrOintment ? "Grams Per Tube" : "Grams Per Pack"}</p>
                    <p className="font-medium text-gray-900">{medicine.weight}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stock Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Package size={18} className="text-gray-500" />
                Stock Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Stock</p>
                  <p className={`text-2xl font-bold ${stock <= 5 ? 'text-amber-600' : 'text-gray-900'}`}>
                    {stock} units
                  </p>
                  {isTabletOrCapsule && medicine.tabletsPerUnit && (
                    <p className="text-sm text-gray-500 mt-1">
                      ≈ {stock * (medicine.tabletsPerUnit || 10)} tablets total
                    </p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</p>
                  <p className="text-xl font-bold text-gray-900">
                    {medicine.discountedPrice && medicine.discountedPrice > 0 ? formatCurrency(medicine.discountedPrice) : formatCurrency(medicine.price)}
                  </p>
                  {medicine.discountedPrice && medicine.discountedPrice > 0 && (
                    <p className="text-sm text-gray-500 line-through mt-1">{formatCurrency(medicine.price)}</p>
                  )}
                </div>
              </div>

              {/* Stock Progress Bar */}
              {stock > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Stock Level</span>
                    <span>{Math.min(100, Math.round((stock / 100) * 100))}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        stock === 0 ? 'bg-red-500' : 
                        stock <= 5 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.round((stock / 100) * 100))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {medicine.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100">{medicine.description}</p>
              </div>
            )}

            {/* Medical Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Uses */}
              {medicine.uses && medicine.uses.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-500" />
                    Uses
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.uses.map((use, index) => (
                      <span key={index} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dosage */}
              {medicine.dosage && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Syringe size={18} className="text-green-500" />
                    Dosage
                  </h3>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-green-800">{medicine.dosage}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Side Effects */}
              {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-500" />
                    Side Effects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.sideEffects.map((effect, index) => (
                      <span key={index} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Precautions */}
              {medicine.precautions && medicine.precautions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Shield size={18} className="text-amber-500" />
                    Precautions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.precautions.map((precaution, index) => (
                      <span key={index} className="px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm border border-amber-100">
                        {precaution}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instructions */}
              {medicine.instructions && medicine.instructions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <ClipboardList size={18} className="text-purple-500" />
                    Instructions
                  </h3>
                  <ul className="space-y-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
                    {medicine.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Storage Instructions */}
              {medicine.storageInstructions && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Thermometer size={18} className="text-cyan-500" />
                    Storage Instructions
                  </h3>
                  <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
                    <p className="text-cyan-800">{medicine.storageInstructions}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 mb-2">Quick Summary</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">Form:</span>
                      <span className="text-blue-800 ml-2">{medicine.form || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Strength:</span>
                      <span className="text-blue-800 ml-2">{medicine.strength || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Category:</span>
                      <span className="text-blue-800 ml-2">{medicine.category || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Manufacturer:</span>
                      <span className="text-blue-800 ml-2">{medicine.manufacturer || 'N/A'}</span>
                    </div>
                    {isTabletOrCapsule && medicine.tabletsPerUnit && (
                      <div>
                        <span className="text-blue-700 font-medium">Tablets/Strip:</span>
                        <span className="text-blue-800 ml-2">{medicine.tabletsPerUnit}</span>
                      </div>
                    )}
                    {isSyrupOrLiquid && medicine.volume && (
                      <div>
                        <span className="text-blue-700 font-medium">Volume:</span>
                        <span className="text-blue-800 ml-2">{medicine.volume}</span>
                      </div>
                    )}
                    {(isCreamOrOintment || isPowder) && medicine.weight && (
                      <div>
                        <span className="text-blue-700 font-medium">Weight:</span>
                        <span className="text-blue-800 ml-2">{medicine.weight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Last updated: {medicine.updatedAt ? new Date(medicine.updatedAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products`)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => navigate(`/pharmacy/dashboard/${pharmacyId}/products/edit/${medicine._id || medicine.id}`, { state: { medicine } })}
                className="px-6 py-2 bg-[#2c6774] text-white rounded-lg hover:bg-[#1a3a3a] transition-colors flex items-center gap-2"
              >
                Edit Medicine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicinePage;